/**
 * Private review server — the listening loop for every generated audio file.
 *
 * WHY THIS EXISTS, rather than the static public/audio-review.html:
 * that page kept its verdicts in the BROWSER's localStorage, so the record of
 * what had been approved lived nowhere but one browser profile. A full pass
 * over 714 strings is hours of listening, and when the session that drove it
 * was lost, so was the only copy of the answers. Here every verdict is written
 * to scripts/review-state.json the instant it is given, which means the work
 * survives a closed tab, a crashed browser, a lost session, and a reboot.
 *
 * It also makes the verdicts READABLE — the old flow required copying a JSON
 * blob out of the page and pasting it back into a conversation. Now the bad
 * list is a file on disk that `node scripts/review-report.mjs` can print.
 *
 * Deliberately NOT part of the Next.js app: this is a local QA tool, it must
 * run without `next dev`, and it must never be reachable from the deployed
 * site. It binds to 127.0.0.1 only.
 *
 * It holds NO ElevenLabs key and makes NO API calls. Marking a word bad records
 * a verdict; regeneration is a separate, deliberate step.
 *
 * Run:  node scripts/review-server.mjs           (http://127.0.0.1:4310)
 *       node scripts/review-server.mjs --port=4400
 */

import { createServer } from 'node:http'
import { readFile, writeFile, rename, readdir, stat, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')
const STATE = path.join(ROOT, 'scripts', 'review-state.json')
const ANSWERS = path.join(ROOT, 'scripts', 'calibration-answers.json')
const AUDIO_DIR = path.join(ROOT, 'public', 'audio')
const TAKES_DIR = path.join(AUDIO_DIR, '_takes')
const APP_DIR = path.join(import.meta.dirname, 'review-app')

const PORT = Number((process.argv.find(a => a.startsWith('--port=')) || '').split('=')[1] || 4310)

/**
 * 127.0.0.1, not 0.0.0.0. The review page lists every string in the app and
 * serves its audio; there is no reason for anything off this machine to reach
 * it, and "private" was the explicit requirement.
 */
const HOST = '127.0.0.1'

// ── state ────────────────────────────────────────────────────────────────────

/**
 * Verdicts, keyed by audioKey.
 *
 *   verdict    'good' | 'bad'
 *   note       optional free text — what was wrong, in the reviewer's words
 *   sha        fingerprint of the MP3 that was JUDGED
 *   reviewedAt ISO timestamp
 *
 * Storing `sha` is what makes a verdict honest. A verdict applies to the take
 * that was heard, not to the filename: once a rejected word is re-rendered the
 * file changes, the sha no longer matches, and the entry resurfaces as
 * "needs re-review" instead of silently keeping a verdict about audio nobody
 * has listened to.
 */
let state = { version: 1, updatedAt: null, entries: {} }

/**
 * Loads the ledger, and REFUSES TO START if one exists but cannot be read.
 *
 * Starting fresh on a parse error would be the worst possible behaviour here:
 * the first verdict given afterwards overwrites the file, so a recoverable
 * problem (a BOM, a truncated write, a bad hand-edit) would destroy every
 * approval instead of reporting itself. Hours of listening are not something
 * to lose to a cheerful log line.
 *
 * A UTF-8 BOM is stripped rather than treated as corruption — Windows editors
 * and PowerShell's `Out-File` add one, and the content behind it is perfectly
 * good JSON.
 */
async function loadState() {
  let raw
  try {
    raw = await readFile(STATE, 'utf8')
  } catch {
    console.log(`state     starting fresh (${path.relative(ROOT, STATE)} will be created)`)
    return
  }

  try {
    const parsed = JSON.parse(raw.replace(/^﻿/, ''))
    if (!parsed || typeof parsed !== 'object' || !parsed.entries) {
      throw new Error('no "entries" object — this does not look like a review ledger')
    }
    state = parsed
    console.log(`state     ${Object.keys(state.entries).length} verdicts loaded from ${path.relative(ROOT, STATE)}`)
  } catch (err) {
    console.error(`\nCannot read ${path.relative(ROOT, STATE)}: ${err.message}`)
    console.error(`\nThat file holds every verdict you have given, so this is refusing to start`)
    console.error(`rather than overwrite it. Move it aside to begin a new pass:`)
    console.error(`  mv ${path.relative(ROOT, STATE)} ${path.relative(ROOT, STATE)}.broken`)
    process.exit(1)
  }
}

/**
 * Writes are serialized through one promise chain and land via temp-file
 * rename, so an interrupted save can never leave a half-written (unparseable)
 * ledger. Losing this file is the one failure mode the whole tool exists to
 * prevent, so it is worth the few extra lines.
 */
let writeChain = Promise.resolve()
function saveState() {
  writeChain = writeChain.then(async () => {
    state.updatedAt = new Date().toISOString()
    const tmp = `${STATE}.tmp`
    await writeFile(tmp, JSON.stringify(state, null, 2))
    await rename(tmp, STATE)
  }).catch(err => console.error(`save failed: ${err.message}`))
  return writeChain
}

/**
 * Answers from the calibration pages (the melody test, the consistency probe).
 *
 * Those pages first kept answers in browser localStorage only, which made them
 * unreadable from outside the browser — exactly the flaw this server exists to
 * prevent for the main review ledger. One file, keyed by page slug, written
 * with the same temp-file-rename discipline.
 */
let answersChain = Promise.resolve()
function saveAnswers(page, answers) {
  answersChain = answersChain.then(async () => {
    let all = {}
    try { all = JSON.parse((await readFile(ANSWERS, 'utf8')).replace(/^﻿/, '')) } catch { all = {} }
    all[page] = { answeredAt: new Date().toISOString(), answers }
    const tmp = `${ANSWERS}.tmp`
    await writeFile(tmp, JSON.stringify(all, null, 2) + '\n')
    await rename(tmp, ANSWERS)
  }).catch(err => console.error(`answers save failed: ${err.message}`))
  return answersChain
}

// ── manifest + audio fingerprints ────────────────────────────────────────────

/** Same grouping as build-review-page.mjs, so review has familiar structure. */
function groupOf(entry) {
  if (entry.variant === 'sound') return 'Letters — name + short sound'
  if (entry.sources.some(s => s.startsWith('alphabet'))) return 'Letters — names'
  const m = entry.sources[0].match(/src\/(?:data|app|components)\/([^/]+(?:\/[^/]+)?)/)
  return m ? m[1] : 'other'
}

/**
 * sha cache keyed by size+mtime, so a page refresh does not re-hash 14 MB of
 * audio. Invalidates itself whenever a file is actually replaced, which is
 * exactly when a verdict needs to go stale.
 */
const shaCache = new Map()
async function fingerprint(key) {
  const file = path.join(AUDIO_DIR, `${key}.mp3`)
  let s
  try { s = await stat(file) } catch { return null }
  const stamp = `${s.size}:${s.mtimeMs}`
  const hit = shaCache.get(key)
  if (hit && hit.stamp === stamp) return hit.sha
  const sha = createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 16)
  shaCache.set(key, { stamp, sha })
  return sha
}

/** Archived earlier takes for one entry, newest first. */
async function takesFor(key) {
  try {
    const all = await readdir(TAKES_DIR)
    return all.filter(f => f.startsWith(`${key}--`) && f.endsWith('.mp3')).sort().reverse()
  } catch { return [] }
}

/**
 * Guards against writing a verdict for a key that does not exist.
 *
 * Without this a typo'd or stale key is accepted and stored forever: it never
 * renders in the UI (nothing matches it), so it can never be corrected, while
 * still sitting in the ledger looking like a real judgement. Read fresh each
 * time so a manifest rebuild mid-session is picked up.
 */
async function isKnownKey(key) {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))
  return entries.some(e => e.key === key)
}

async function buildPayload() {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))
  const takeIndex = new Map()
  try {
    for (const f of await readdir(TAKES_DIR)) {
      if (!f.endsWith('.mp3')) continue
      const key = f.slice(0, f.indexOf('--'))
      if (key) takeIndex.set(key, (takeIndex.get(key) ?? 0) + 1)
    }
  } catch { /* no archive yet */ }

  const out = []
  for (const e of entries) {
    const sha = await fingerprint(e.key)
    const rec = state.entries[e.key]
    // A verdict about a file that has since been replaced is not a verdict
    // about the current audio — surface it for another listen.
    const stale = Boolean(rec?.verdict && sha && rec.sha && rec.sha !== sha)
    out.push({
      key: e.key,
      request: e.request,
      speak: e.speak,
      profile: e.profile,
      group: groupOf(e),
      source: e.sources[0],
      exists: Boolean(sha),
      verdict: stale ? null : (rec?.verdict ?? null),
      note: rec?.note ?? '',
      reviewedAt: rec?.reviewedAt ?? null,
      stale,
      previousVerdict: stale ? rec.verdict : null,
      takes: takeIndex.get(e.key) ?? 0,
    })
  }
  return out
}

// ── http ─────────────────────────────────────────────────────────────────────

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.json': 'application/json; charset=utf-8',
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' })
  res.end(body)
}

function sendJson(res, status, obj) {
  send(res, status, JSON.stringify(obj))
}

async function readBody(req) {
  const chunks = []
  for await (const c of req) chunks.push(c)
  if (!chunks.length) return {}
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { return {} }
}

/** Serves one file, refusing anything that escapes its base directory. */
async function sendFile(res, base, rel) {
  const full = path.resolve(base, rel)
  if (!full.startsWith(path.resolve(base))) return send(res, 403, 'forbidden', 'text/plain')
  try {
    const body = await readFile(full)
    const type = MIME[path.extname(full).toLowerCase()] ?? 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store', 'Content-Length': body.length })
    res.end(body)
  } catch {
    send(res, 404, 'not found', 'text/plain')
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`)
  const route = decodeURIComponent(url.pathname)

  try {
    if (route === '/' || route === '/index.html') return sendFile(res, APP_DIR, 'index.html')

    if (route === '/api/state' && req.method === 'GET') {
      return sendJson(res, 200, { entries: await buildPayload() })
    }

    /** Answers from a calibration page, so they land on disk rather than only
     *  in the browser that recorded them. */
    if (route === '/api/answers' && req.method === 'POST') {
      const { page, answers } = await readBody(req)
      if (typeof page !== 'string' || !/^[a-z0-9-]{1,40}$/.test(page)) {
        return sendJson(res, 400, { error: 'page must be a short slug' })
      }
      if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
        return sendJson(res, 400, { error: 'answers object required' })
      }
      await saveAnswers(page, answers)
      return sendJson(res, 200, { ok: true, saved: Object.keys(answers).length })
    }

    /**
     * One verdict. `verdict: null` clears it, which matters — a reviewer who
     * mis-keys needs a way back, and an un-markable row was a real flaw in the
     * old page.
     */
    if (route === '/api/verdict' && req.method === 'POST') {
      const { key, verdict, note } = await readBody(req)
      if (!key) return sendJson(res, 400, { error: 'key required' })
      if (verdict !== null && verdict !== 'good' && verdict !== 'bad') {
        return sendJson(res, 400, { error: 'verdict must be good, bad or null' })
      }
      if (!await isKnownKey(key)) {
        return sendJson(res, 404, { error: `no manifest entry with key "${key}"` })
      }
      if (verdict === null) {
        delete state.entries[key]
      } else {
        state.entries[key] = {
          verdict,
          note: typeof note === 'string' ? note : (state.entries[key]?.note ?? ''),
          sha: await fingerprint(key),
          reviewedAt: new Date().toISOString(),
        }
      }
      await saveState()
      return sendJson(res, 200, { ok: true, key, verdict })
    }

    /** A note on its own, so a reason can be added without re-judging. */
    if (route === '/api/note' && req.method === 'POST') {
      const { key, note } = await readBody(req)
      if (!key) return sendJson(res, 400, { error: 'key required' })
      const rec = state.entries[key]
      if (!rec) return sendJson(res, 409, { error: 'mark a verdict before adding a note' })
      rec.note = typeof note === 'string' ? note : ''
      await saveState()
      return sendJson(res, 200, { ok: true, key })
    }

    /**
     * Recovers the old static page's flags. That page stored only REJECTIONS,
     * so an imported list can be trusted to mean "bad" while everything absent
     * from it stays pending — being unflagged there could equally mean
     * "approved" or "never reached", and guessing would quietly mark unheard
     * audio as approved.
     */
    if (route === '/api/import' && req.method === 'POST') {
      const { requests } = await readBody(req)
      if (!Array.isArray(requests)) return sendJson(res, 400, { error: 'requests array required' })
      const wanted = new Set(requests.map(r => String(r).trim().toLowerCase()).filter(Boolean))
      const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))
      let imported = 0, skipped = 0, unknown = 0
      const seen = new Set()
      for (const e of entries) {
        const lc = e.request.toLowerCase()
        if (!wanted.has(lc)) continue
        seen.add(lc)
        if (state.entries[e.key]) { skipped++; continue }
        state.entries[e.key] = {
          verdict: 'bad',
          note: 'imported from the old review page',
          sha: await fingerprint(e.key),
          reviewedAt: new Date().toISOString(),
        }
        imported++
      }
      for (const w of wanted) if (!seen.has(w)) unknown++
      await saveState()
      return sendJson(res, 200, { ok: true, imported, skipped, unknown })
    }

    if (route.startsWith('/api/takes/') && req.method === 'GET') {
      return sendJson(res, 200, { takes: await takesFor(route.slice('/api/takes/'.length)) })
    }

    if (route.startsWith('/audio/')) return sendFile(res, AUDIO_DIR, route.slice('/audio/'.length))
    if (route.startsWith('/takes/')) return sendFile(res, TAKES_DIR, route.slice('/takes/'.length))

    return send(res, 404, 'not found', 'text/plain')
  } catch (err) {
    console.error(err)
    return sendJson(res, 500, { error: err.message })
  }
})

await loadState()
await mkdir(TAKES_DIR, { recursive: true })

try {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))
  console.log(`manifest  ${entries.length} entries`)
} catch {
  console.error(`\nNo manifest at ${path.relative(ROOT, MANIFEST)} — run: npm run audio:manifest`)
  process.exit(1)
}

server.listen(PORT, HOST, () => {
  console.log(`\nreview    http://${HOST}:${PORT}`)
  console.log(`verdicts  ${path.relative(ROOT, STATE)}  (saved on every keystroke)`)
  console.log(`\nkeys      J next · K previous · Space replay · G good · B bad · N note`)
  console.log(`stop      Ctrl+C — nothing is lost, every verdict is already on disk\n`)
})
