/**
 * Generates the app's audio from scripts/audio-manifest.json via ElevenLabs.
 *
 * Idempotent: an entry whose MP3 already exists is skipped, so re-running after
 * adding content only bills for the new strings. Nothing is deleted.
 *
 * Run:
 *   node scripts/build-manifest.mjs                  # refresh the manifest first
 *   node scripts/generate-audio.mjs --dry-run        # cost preview, no API calls
 *   node scripts/generate-audio.mjs --variant=sound  # pilot: just letter+sound
 *   node scripts/generate-audio.mjs --limit=30       # pilot: first N entries
 *   node scripts/generate-audio.mjs                  # everything outstanding
 *   node scripts/generate-audio.mjs --force          # re-render existing files
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'audio')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')

import { VOICE_ID, PROFILES, profileOf, seedFor } from './tts-profiles.mjs'

/**
 * Serial by default. Concurrent requests on a free-tier key trip ElevenLabs'
 * `detected_unusual_activity` heuristic, which returns 401 and temporarily
 * disables access — three parallel workers was enough to trigger it. Raise via
 * --concurrency=N only on a paid plan.
 */
const CONCURRENCY = Number(
  (process.argv.find(a => a.startsWith('--concurrency=')) || '').split('=')[1] || 1
)
/** Small gap between requests, for the same reason. */
const PACE_MS = 250
const MAX_ATTEMPTS = 5

/**
 * Errors where retrying cannot possibly help — a bad key, a plan restriction,
 * an exhausted quota, or text the API rejected. Everything else (including the
 * unusual-activity heuristic, which clears on its own) is retried with backoff.
 */
const FATAL = [/invalid_api_key/, /paid_plan_required/, /quota_exceeded/, /invalid_uid/]

function arg(name, fallback = undefined) {
  const hit = process.argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : fallback
}
const has = name => process.argv.includes(`--${name}`)

async function readApiKey() {
  const raw = await readFile(path.join(ROOT, '.env'), 'utf8')
  const line = raw.split(/\r?\n/).find(l => l.startsWith('ELEVENLABS_API_KEY='))
  if (!line) throw new Error('ELEVENLABS_API_KEY missing from .env')
  return line.slice('ELEVENLABS_API_KEY='.length).trim()
}

async function quota(apiKey) {
  const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
    headers: { 'xi-api-key': apiKey },
  })
  if (!res.ok) throw new Error(`quota check failed: HTTP ${res.status}`)
  const j = await res.json()
  return { used: j.character_count, limit: j.character_limit, tier: j.tier }
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

/**
 * One TTS request with retries. Retries transient failures (429 rate limit,
 * 5xx, network) but fails fast on 401/402/422, where retrying cannot help and
 * would waste quota.
 */
/**
 * Text and context overrides for takes chosen by the melody search, keyed by
 * lowercase REQUEST: `{ "dry": { "text": "dry!", "previousText": "..." } }`.
 *
 * Review rejected 78 words for MELODY rather than pronunciation. For most, a
 * different seed found a good contour. For 16 it could not — their takes were
 * near-identical however often they were re-rolled (all 32 takes of "dry"
 * ROSE, where the approved words fall about 5 semitones). What moved those was
 * an EXCLAMATION MARK, sometimes after a cheerful `previous_text`, which is
 * ElevenLabs' context parameter and is NOT billed as characters.
 *
 * This lives here rather than in spokenText.ts because `previousText` is a
 * REQUEST parameter, not text to speak, so it has no meaning at manifest-build
 * time. Consequence worth knowing: for these words the manifest's `speak`
 * field holds the bare word while the render uses the text below. Machine
 * written by install-melody-takes.mjs, like melody-seeds.json.
 */
let MELODY_TEXT = {}
try {
  MELODY_TEXT = JSON.parse(readFileSync(path.join(ROOT, 'scripts', 'melody-text.json'), 'utf8').replace(/^﻿/, ''))
} catch { /* nothing installed from the melody search yet */ }

/** The exact text and context to send for an entry. */
function requestFor(entry) {
  const ov = MELODY_TEXT[String(entry.request ?? '').toLowerCase()]
  return {
    text: ov?.text ?? entry.speak,
    previousText: ov?.previousText ?? null,
  }
}

async function synthesize(apiKey, text, profile, seed, previousText = null) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`
  let lastErr
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        // `seed` makes the render reproducible — without it the API samples
        // randomly and a re-run can replace good audio with bad.
        body: JSON.stringify({
          text, model_id: profile.model, voice_settings: profile.settings, seed,
          // Context, when the chosen take needed it. Not billed as characters.
          ...(previousText ? { previous_text: previousText } : {}),
        }),
      })
      if (res.ok) return Buffer.from(await res.arrayBuffer())

      const body = (await res.text()).slice(0, 200)
      if (FATAL.some(re => re.test(body))) {
        throw Object.assign(new Error(`HTTP ${res.status} — ${body}`), { fatal: true })
      }
      lastErr = new Error(`HTTP ${res.status} — ${body}`)
      // The unusual-activity lockout is temporary; wait it out rather than
      // abandoning the run, which is what lost 834 entries on the first attempt.
      if (/detected_unusual_activity|429/.test(body) || res.status === 429) {
        await sleep(15000 * attempt)
      }
    } catch (err) {
      if (err.fatal) throw err
      lastErr = err
    }
    if (attempt < MAX_ATTEMPTS) await sleep(1000 * 2 ** (attempt - 1))
  }
  throw lastErr
}

async function main() {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))
  await mkdir(OUT_DIR, { recursive: true })

  const variant = arg('variant')
  const profile = arg('profile')
  const limit = Number(arg('limit', 0))
  const only = arg('only')
  const dryRun = has('dry-run')
  // --only names specific words to re-render after a pronunciation fix, so it
  // implies overwrite. --profile is only a FILTER: combine it with --force when
  // a profile's voice settings change, or it would needlessly re-bill files
  // that are already correct.
  const force = has('force') || Boolean(only)

  let todo = entries
  if (only) {
    const wanted = new Set(only.split(',').map(s => s.trim().toLowerCase()).filter(Boolean))
    todo = todo.filter(e => wanted.has(e.request.toLowerCase()))
    const found = new Set(todo.map(e => e.request.toLowerCase()))
    for (const w of wanted) if (!found.has(w)) console.log(`  note: "${w}" is not in the manifest`)
  }
  if (profile) todo = todo.filter(e => e.profile === profile)
  if (variant) todo = todo.filter(e => (e.variant ?? '') === variant)
  if (!force) todo = todo.filter(e => !existsSync(path.join(OUT_DIR, `${e.key}.mp3`)))
  if (limit > 0) todo = todo.slice(0, limit)

  // <phoneme> markup is not billed, so cost is estimated with tags stripped.
  const chars = todo.reduce((n, e) => n + e.speak.replace(/<[^>]+>/g, '').length, 0)
  const skipped = entries.length - todo.length
  const counts = todo.reduce((acc, e) => ({ ...acc, [e.profile]: (acc[e.profile] ?? 0) + 1 }), {})

  console.log(`manifest ${entries.length} entries — ${todo.length} to render, ${skipped} already present/filtered`)
  console.log(`by profile ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(' ') || '—'}`)
  for (const [name, p] of Object.entries(PROFILES)) {
    console.log(`  ${name.padEnd(7)} ${p.model.padEnd(24)} speed ${p.settings.speed} stability ${p.settings.stability} style ${p.settings.style}`)
  }
  console.log(`spend    ~${chars} characters`)

  if (!todo.length) return console.log('\nnothing to do.')
  if (dryRun) return console.log('\n--dry-run: no API calls made.')

  const apiKey = await readApiKey()
  const before = await quota(apiKey)
  const remaining = before.limit - before.used
  console.log(`account  tier=${before.tier} used=${before.used}/${before.limit}\n`)
  if (chars > remaining) {
    throw new Error(`Need ~${chars} characters but only ${remaining} remain this month. `
      + `Use --limit to render a subset, or upgrade the plan.`)
  }

  let done = 0
  const failures = []
  const queue = [...todo]

  async function worker() {
    while (queue.length) {
      const entry = queue.shift()
      try {
        const { text, previousText } = requestFor(entry)
        const mp3 = await synthesize(apiKey, text, profileOf(entry), seedFor(entry), previousText)
        await writeFile(path.join(OUT_DIR, `${entry.key}.mp3`), mp3)
        done++
        if (done % 25 === 0 || done === todo.length) {
          console.log(`  ${done}/${todo.length}`)
        }
        await sleep(PACE_MS)
      } catch (err) {
        failures.push({ entry, message: err.message })
        if (err.fatal) { queue.length = 0; break }   // plan/quota error: stop burning calls
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  const after = await quota(apiKey)
  console.log(`\nrendered ${done}/${todo.length}`)
  console.log(`spent    ${Math.max(0, after.used - before.used)} characters (counter may lag)`)
  console.log(`left     ${after.limit - after.used} this month`)

  if (failures.length) {
    console.log(`\n${failures.length} FAILED — re-run to retry (existing files are skipped):`)
    for (const f of failures.slice(0, 15)) console.log(`  "${f.entry.speak}" — ${f.message}`)
    process.exitCode = 1
  }
}

main().catch(err => { console.error(`\n${err.message}`); process.exit(1) })
