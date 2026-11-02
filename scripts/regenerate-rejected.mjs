/**
 * Re-rolls every take that review marked "not good".
 *
 * THE PROBLEM THIS SOLVES: seeds make renders reproducible, which is what stops
 * a re-run from silently ruining approved audio — but it also means asking
 * ElevenLabs for the same text, settings and seed returns the IDENTICAL bytes.
 * Re-rendering a rejected word naively gives you the same rejected word back.
 * So each rejection increments that string's re-roll count (scripts/reroll-seeds.json),
 * which changes its seed, which gets a genuinely different take — and that take
 * is itself reproducible forever after.
 *
 * Nothing is thrown away: the retired take is archived under
 * public/audio/_takes/ so the review page can play old against new.
 *
 * The verdict is NOT cleared here. The review server fingerprints the file it
 * judged, so replacing the file makes the old verdict stale by itself and the
 * word resurfaces as "needs re-review". One less thing to keep in sync.
 *
 * Rendering is delegated to generate-audio.mjs via `--only=`, deliberately: it
 * already handles the API key, retries, the free-tier serial pacing and the
 * quota check, and reusing it means there is exactly one code path that talks
 * to ElevenLabs.
 *
 * Run:  node scripts/regenerate-rejected.mjs          # plan only, no API calls
 *       node scripts/regenerate-rejected.mjs --yes    # actually re-render
 */

import { readFile, writeFile, copyFile, mkdir, rename } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import path from 'node:path'

import { rerollCountFor, seedFor, profileOf } from './tts-profiles.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')
const STATE = path.join(ROOT, 'scripts', 'review-state.json')
const REROLLS = path.join(ROOT, 'scripts', 'reroll-seeds.json')
const AUDIO_DIR = path.join(ROOT, 'public', 'audio')
const TAKES_DIR = path.join(AUDIO_DIR, '_takes')

const has = name => process.argv.includes(`--${name}`)

async function sha8(file) {
  return createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 8)
}

async function main() {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))

  let state
  try {
    state = JSON.parse(await readFile(STATE, 'utf8'))
  } catch {
    console.log('No review ledger yet — nothing has been rejected.')
    console.log('Start a listening pass with: npm run audio:review-server')
    return
  }

  const byKey = new Map(entries.map(e => [e.key, e]))
  const rejected = []
  for (const [key, rec] of Object.entries(state.entries)) {
    if (rec.verdict !== 'bad') continue
    const entry = byKey.get(key)
    if (!entry) { console.log(`  note: ${key} is no longer in the manifest — skipping`); continue }
    const file = path.join(AUDIO_DIR, `${key}.mp3`)
    // Already re-rendered since the rejection: the ledger's fingerprint no
    // longer matches, so this is awaiting a re-listen, not a re-roll. Rolling
    // again here would discard a take nobody has heard.
    if (existsSync(file) && rec.sha && await sha8(file) !== rec.sha.slice(0, 8)) {
      console.log(`  skip: "${entry.request}" was already re-rolled — waiting on your re-listen`)
      continue
    }
    rejected.push({ entry, rec })
  }

  if (!rejected.length) {
    console.log('Nothing to re-roll. Every rejection has already been re-rendered.')
    return
  }

  console.log(`${rejected.length} rejected take${rejected.length === 1 ? '' : 's'} to re-roll:\n`)
  for (const { entry, rec } of rejected) {
    const n = rerollCountFor(entry.request)
    const p = profileOf(entry)
    console.log(`  ${entry.request.padEnd(22)} take ${n + 1} -> ${n + 2}   ${p.model}   seed ${seedFor(entry)} -> (new)`)
    console.log(`${' '.repeat(26)}sent: ${entry.speak}`)
    if (rec.note) console.log(`${' '.repeat(26)}you said: ${rec.note}`)
  }

  const chars = rejected.reduce((n, { entry }) => n + entry.speak.replace(/<[^>]+>/g, '').length, 0)
  console.log(`\nspend  ~${chars} characters`)

  if (!has('yes')) {
    console.log('\nPlan only. Re-run with --yes to call ElevenLabs.')
    return
  }

  // ── archive the takes being retired ────────────────────────────────────────
  await mkdir(TAKES_DIR, { recursive: true })
  for (const { entry } of rejected) {
    const file = path.join(AUDIO_DIR, `${entry.key}.mp3`)
    if (!existsSync(file)) continue
    const n = rerollCountFor(entry.request) + 1
    const dest = path.join(TAKES_DIR, `${entry.key}--take${n}-${await sha8(file)}.mp3`)
    await copyFile(file, dest)
    console.log(`archived ${path.relative(ROOT, dest)}`)
  }

  // ── bump the re-roll counts ────────────────────────────────────────────────
  let counts = {}
  try { counts = JSON.parse(await readFile(REROLLS, 'utf8')) } catch { /* first re-roll */ }
  for (const { entry } of rejected) {
    const k = entry.request.toLowerCase()
    counts[k] = (Number(counts[k]) || 0) + 1
  }
  const tmp = `${REROLLS}.tmp`
  await writeFile(tmp, JSON.stringify(counts, null, 2))
  await rename(tmp, REROLLS)
  console.log(`\nre-roll counts updated in ${path.relative(ROOT, REROLLS)}`)

  // ── render ─────────────────────────────────────────────────────────────────
  // `--only` implies --force, which is what we want: these files exist and must
  // be replaced. It matches on the request string, so the new seed is picked up
  // from the file just written.
  const only = rejected.map(({ entry }) => entry.request).join(',')
  console.log(`\nrendering: generate-audio.mjs --only=${only}\n`)

  const code = await new Promise(resolve => {
    const child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'generate-audio.mjs'), `--only=${only}`], {
      cwd: ROOT, stdio: 'inherit',
    })
    child.on('close', resolve)
  })

  if (code !== 0) {
    console.error(`\ngenerate-audio exited ${code}. The archive and the bumped re-roll counts are`)
    console.error(`already saved, and the files on disk are unchanged, so the rejected takes are`)
    console.error(`still in place and still rejected — nothing was lost.`)
    console.error(`\nTo retry the SAME seed without rolling further:`)
    console.error(`  node scripts/generate-audio.mjs --only=${only}`)
    console.error(`Re-running this script with --yes would roll a different seed again instead.`)
    process.exitCode = 1
    return
  }

  console.log(`\nDone. These words now show as "needs re-review" in the review server —`)
  console.log(`each one's previous take is playable beside it for comparison.`)
}

main().catch(err => { console.error(`\n${err.message}`); process.exit(1) })
