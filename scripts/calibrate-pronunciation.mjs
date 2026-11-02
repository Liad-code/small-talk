/**
 * Pronunciation calibration harness.
 *
 * ROUND 7 — the last five failures, plus a determinism check.
 *
 * CONFIRMED so far (applied in spokenText.ts / tts-profiles.mjs):
 *   crab -> flash model      you -> "you." (trailing period)
 *   m    -> flat settings    k, f -> IPA tag        s -> current ("ess")
 *
 * STILL FAILING, and what is tried here:
 *   e, r, n — every spelling AND the IPA tag were rejected. "en" was heard as
 *     "in", i.e. the vowel is closing to /ɪ/. The untried axes are the OTHER
 *     English-only model (flash, which won for "crab"), CMU-ARPAbet rather than
 *     IPA, and a capital-letter-with-period, which some engines treat as an
 *     explicit letter name.
 *   25, 26 — hyphen and space both rejected, so the separator is not the issue.
 *     Tried on flash, with terminal punctuation, and as ARPAbet.
 *
 * DETERMINISM: the same text and settings produced audio judged wrong in one
 * round and right in the next, so sampling is random per request. `seed` is
 * tested here — if two renders with one seed are byte-identical, every good
 * render can be pinned and re-renders stop being a gamble.
 *
 * Run:  node scripts/calibrate-pronunciation.mjs
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'audio', '_calibrate')
const VOICE_ID = 'XrExE9yKIg1WjnnlVkGX'

const WORD_SET   = { stability: 0.75, similarity_boost: 0.75, style: 0,   use_speaker_boost: true, speed: 0.8  }
const LETTER_SET = { stability: 0.40, similarity_boost: 0.75, style: 0.5, use_speaker_boost: true, speed: 0.70 }

const TURBO = 'eleven_turbo_v2'
const FLASH = 'eleven_flash_v2'
const cmu = (ph, txt) => `<phoneme alphabet="cmu-arpabet" ph="${ph}">${txt}</phoneme>`

const CANDIDATES = [
  // ---- letter E : name is /iː/ --------------------------------------------
  { id: 'E-1-flash-ee',   text: 'ee',              model: FLASH, s: LETTER_SET },
  { id: 'E-2-flash-cmu',  text: cmu('IY1', 'e'),   model: FLASH, s: LETTER_SET },
  { id: 'E-3-turbo-cmu',  text: cmu('IY1', 'e'),   model: TURBO, s: LETTER_SET },
  { id: 'E-4-capital',    text: 'E.',              model: TURBO, s: LETTER_SET },
  { id: 'E-5-flash-flat', text: 'ee',              model: FLASH, s: WORD_SET   },

  // ---- letter R : name is /ɑːr/ -------------------------------------------
  { id: 'R-1-flash-are',  text: 'are',             model: FLASH, s: LETTER_SET },
  { id: 'R-2-flash-cmu',  text: cmu('AA1 R', 'r'), model: FLASH, s: LETTER_SET },
  { id: 'R-3-turbo-cmu',  text: cmu('AA1 R', 'r'), model: TURBO, s: LETTER_SET },
  { id: 'R-4-capital',    text: 'R.',              model: TURBO, s: LETTER_SET },
  { id: 'R-5-flash-flat', text: 'are',             model: FLASH, s: WORD_SET   },

  // ---- letter N : heard as "in", so the /ɛ/ is closing --------------------
  { id: 'N-1-flash-en',   text: 'en',              model: FLASH, s: LETTER_SET },
  { id: 'N-2-flash-cmu',  text: cmu('EH1 N', 'n'), model: FLASH, s: LETTER_SET },
  { id: 'N-3-turbo-cmu',  text: cmu('EH1 N', 'n'), model: TURBO, s: LETTER_SET },
  { id: 'N-4-capital',    text: 'N.',              model: TURBO, s: LETTER_SET },
  { id: 'N-5-ehn',        text: 'ehn',             model: FLASH, s: LETTER_SET },
  { id: 'N-6-flash-flat', text: 'en',              model: FLASH, s: WORD_SET   },

  // ---- 25 / 26 : separator already ruled out ------------------------------
  { id: 'X25-1-flash',    text: 'twenty-five',  model: FLASH, s: WORD_SET },
  { id: 'X25-2-period',   text: 'twenty-five.', model: TURBO, s: WORD_SET },
  { id: 'X25-3-flash-pd', text: 'twenty-five.', model: FLASH, s: WORD_SET },
  { id: 'X26-1-flash',    text: 'twenty-six',   model: FLASH, s: WORD_SET },
  { id: 'X26-2-period',   text: 'twenty-six.',  model: TURBO, s: WORD_SET },
  { id: 'X26-3-flash-pd', text: 'twenty-six.',  model: FLASH, s: WORD_SET },
]

/** Same text + same seed, rendered twice — are they identical? */
const SEED_PROBE = [
  { id: 'seed-A1', text: 'ess', model: TURBO, s: LETTER_SET, seed: 12345 },
  { id: 'seed-A2', text: 'ess', model: TURBO, s: LETTER_SET, seed: 12345 },
  { id: 'seed-B1', text: 'ess', model: TURBO, s: LETTER_SET, seed: 99999 },
  { id: 'noseed-1', text: 'ess', model: TURBO, s: LETTER_SET },
  { id: 'noseed-2', text: 'ess', model: TURBO, s: LETTER_SET },
]

async function readApiKey() {
  const raw = await readFile(path.join(ROOT, '.env'), 'utf8')
  const line = raw.split(/\r?\n/).find(l => l.startsWith('ELEVENLABS_API_KEY='))
  if (!line) throw new Error('ELEVENLABS_API_KEY missing from .env')
  return line.slice('ELEVENLABS_API_KEY='.length).trim()
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function synthesize(apiKey, c) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`
  const body = { text: c.text, model_id: c.model, voice_settings: c.s }
  if (c.seed !== undefined) body.seed = c.seed
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${(await res.text()).slice(0, 120)}`)
  return Buffer.from(await res.arrayBuffer())
}

async function main() {
  const apiKey = await readApiKey()
  await mkdir(OUT_DIR, { recursive: true })

  for (const c of CANDIDATES) {
    try {
      const mp3 = await synthesize(apiKey, c)
      await writeFile(path.join(OUT_DIR, `${c.id}.mp3`), mp3)
      console.log(`  ok   ${c.id.padEnd(15)} ${JSON.stringify(c.text).padEnd(42)} ${c.model === FLASH ? 'flash' : 'turbo'}`)
    } catch (err) {
      console.log(`  FAIL ${c.id.padEnd(15)} ${err.message}`)
    }
    await sleep(400)
  }

  console.log('\n--- determinism probe (is `seed` honoured?) ---')
  const hashes = {}
  for (const c of SEED_PROBE) {
    try {
      const mp3 = await synthesize(apiKey, c)
      hashes[c.id] = createHash('sha256').update(mp3).digest('hex').slice(0, 16)
      console.log(`  ${c.id.padEnd(10)} seed=${String(c.seed ?? '-').padEnd(6)} sha=${hashes[c.id]}`)
    } catch (err) {
      console.log(`  ${c.id.padEnd(10)} FAILED ${err.message}`)
    }
    await sleep(400)
  }
  const sameSeed = hashes['seed-A1'] && hashes['seed-A1'] === hashes['seed-A2']
  const noSeedDiffers = hashes['noseed-1'] && hashes['noseed-1'] !== hashes['noseed-2']
  console.log(`\n  same seed identical : ${sameSeed ? 'YES — renders can be pinned' : 'no'}`)
  console.log(`  no seed differs     : ${noSeedDiffers ? 'YES — confirms sampling is random' : 'no'}`)
}

main().catch(err => { console.error(err.message); process.exit(1) })
