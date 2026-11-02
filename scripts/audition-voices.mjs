/**
 * Voice audition — Step 1 of the ElevenLabs integration.
 *
 * Generates the SAME diagnostic line with every candidate voice, at the
 * "teaching" voice settings we intend to ship, so the voices are compared
 * under real conditions rather than at ElevenLabs' expressive defaults.
 *
 * Also empirically checks whether `voice_settings.speed` is honored by the
 * model, by rendering one voice twice (1.0 vs 0.8) and comparing file sizes —
 * we must not discover this after generating ~950 files.
 *
 * Run:  node scripts/audition-voices.mjs
 * Out:  public/audio/_samples/*.mp3
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { statSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'audio', '_samples')

/**
 * Diagnostic line. Deliberately short (billed per character) but covers every
 * sound category the app teaches:
 *   "Vee."      isolated letter name TTS engines commonly misread as /v/
 *   "Ah."       a short phoneme, as used by Track B
 *   Cat/Bed/Big final consonants + short-vowel contrast (a / e / i) — exactly
 *               the distinctions Hebrew-speaking learners lose
 *   sentence    natural prosody at slowed pace
 */
const DIAGNOSTIC = 'Vee. Ah. Cat. Bed. Big. I run fast.'

/** Settings tuned for teaching, not for drama. High stability + zero style
 *  keeps final consonants intact; expressive defaults swallow them. */
const TEACHING_SETTINGS = {
  stability: 0.75,
  similarity_boost: 0.75,
  style: 0,
  use_speaker_boost: true,
  speed: 0.8,
}

const MODEL = 'eleven_multilingual_v2'

/** Free-tier premade voices tagged informative_educational, plus Sarah. */
const CANDIDATES = [
  { slug: 'bella',   id: 'hpp4J3VqNfWAUOO0d1Us', note: 'American, professional/bright/warm — closest free match to Ava' },
  { slug: 'matilda', id: 'XrExE9yKIg1WjnnlVkGX', note: 'American, upbeat, educational' },
  { slug: 'alice',   id: 'Xb7hH8MSUJpSbSDYk0k2', note: 'British, professional educator' },
  { slug: 'lily',    id: 'pFZP5JQG7iQjIQuC4Bku', note: 'British, confident' },
  { slug: 'sarah',   id: 'EXAVITQu4vr4xnSDxMaL', note: 'American, mature/reassuring' },
]

/** Reads ELEVENLABS_API_KEY from .env without adding a dotenv dependency. */
async function readApiKey() {
  const raw = await readFile(path.join(ROOT, '.env'), 'utf8')
  const line = raw.split(/\r?\n/).find(l => l.startsWith('ELEVENLABS_API_KEY='))
  if (!line) throw new Error('ELEVENLABS_API_KEY missing from .env')
  return line.slice('ELEVENLABS_API_KEY='.length).trim()
}

/**
 * One TTS request. Returns the MP3 bytes.
 * Throws with the API's own message so quota/plan errors are legible.
 */
async function synthesize(apiKey, voiceId, text, settings) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: settings }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HTTP ${res.status} — ${body.slice(0, 300)}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

async function quota(apiKey) {
  const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
    headers: { 'xi-api-key': apiKey },
  })
  const j = await res.json()
  return { used: j.character_count, limit: j.character_limit, tier: j.tier }
}

async function main() {
  const apiKey = await readApiKey()
  await mkdir(OUT_DIR, { recursive: true })

  const before = await quota(apiKey)
  const planned = DIAGNOSTIC.length * (CANDIDATES.length + 1) // +1 for speed probe
  console.log(`tier=${before.tier}  used=${before.used}/${before.limit}`)
  console.log(`diagnostic line (${DIAGNOSTIC.length} chars): "${DIAGNOSTIC}"`)
  console.log(`this run will spend ~${planned} chars\n`)

  if (before.used + planned > before.limit) {
    throw new Error(`Not enough quota: need ~${planned}, have ${before.limit - before.used}`)
  }

  for (const v of CANDIDATES) {
    const file = path.join(OUT_DIR, `${v.slug}.mp3`)
    try {
      const mp3 = await synthesize(apiKey, v.id, DIAGNOSTIC, TEACHING_SETTINGS)
      await writeFile(file, mp3)
      console.log(`  ok   ${v.slug.padEnd(8)} ${(mp3.length / 1024).toFixed(1)} KB  — ${v.note}`)
    } catch (err) {
      console.log(`  FAIL ${v.slug.padEnd(8)} ${err.message}`)
    }
  }

  // Does `speed` actually do anything on this model? Render Bella at 1.0 and
  // compare byte size against her 0.8 render above. A slower render is a
  // longer file; near-identical sizes mean speed was silently ignored.
  console.log('\nspeed-parameter probe (Bella @ 1.0 vs @ 0.8):')
  try {
    const fast = await synthesize(apiKey, CANDIDATES[0].id, DIAGNOSTIC, { ...TEACHING_SETTINGS, speed: 1.0 })
    await writeFile(path.join(OUT_DIR, 'bella-speed-1.0.mp3'), fast)
    const slowBytes = statSync(path.join(OUT_DIR, 'bella.mp3')).size
    const ratio = slowBytes / fast.length
    console.log(`  1.0 = ${(fast.length / 1024).toFixed(1)} KB   0.8 = ${(slowBytes / 1024).toFixed(1)} KB   ratio ${ratio.toFixed(2)}`)
    console.log(ratio > 1.08
      ? '  => speed IS honored; we can bake the slow pace into the MP3s.'
      : '  => speed appears IGNORED on this model; needs a different approach.')
  } catch (err) {
    console.log(`  probe failed: ${err.message}`)
  }

  const after = await quota(apiKey)
  console.log(`\nspent ${after.used - before.used} chars; ${after.limit - after.used} left this month`)
  console.log(`samples: ${OUT_DIR}`)
}

main().catch(err => { console.error(`\n${err.message}`); process.exit(1) })
