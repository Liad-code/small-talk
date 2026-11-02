/**
 * DELIVERY calibration — not pronunciation.
 *
 * Review marked 78 of 714 words "not good", and the reviewer's verdict was
 * consistent: the words are pronounced CORRECTLY, but the way they are said is
 * "weird and not consistent with the other words".
 *
 * WHAT IS RULED OUT (round 1, 2026-10-28, 72 characters)
 *   Re-roll, a trailing period, stability 1.00, and both together were ALL
 *   rejected. The reviewer's description of every one of them: "too flat,
 *   robotic or lifeless". The control words came back unharmed, so stability
 *   1.00 is harmless — it simply fixes nothing.
 *
 *   Also ruled out by measurement, so do not re-chase these:
 *     - Pace. Rejected words have a median duration of 0.993s against 1.045s
 *       for approved ones — two fully overlapping distributions.
 *     - Capitalisation. ALL-CAPS requests reject at 16.6% vs 6.6% lowercase,
 *       but all 289 are already lowercased in `speak`. A confound: caps words
 *       live in the phonics files. Always check `speak`, never `request`.
 *     - Phonetics. Words with a gliding vowel (diphthong or long vowel, where
 *       a pitch swoop is audible) reject at 13.9% against 12.1% for short
 *       vowels. No effect. The rejections are not predictable from the text.
 *
 * WHAT ROUND 1 ACTUALLY TAUGHT US
 *   The direction was backwards. "Too flat, robotic or lifeless" is a request
 *   for MORE expression, not less — and the existing profiles already hint at
 *   it. The `letter` profile (stability 0.40, style 0.5) was rejected on 2 of
 *   26 letters, 7.7%; the `word` profile (stability 0.75, style 0) on 76 of
 *   614 words, 12.4%. The livelier settings reject at roughly half the rate.
 *
 *   Note that round 1's variant A was a plain re-roll on UNCHANGED word
 *   settings and was still called flat. So the complaint is partly about the
 *   word profile itself, not only about unlucky samples.
 *
 * THE TRADE-OFF ROUND 2 HAS TO WATCH
 *   The word profile was set flat on purpose: it preserves final consonants
 *   /t/ /d/ /k/, which expressive settings smear. That was a real problem,
 *   solved once already. So round 2's controls include APPROVED words ending
 *   in a stop (`book`, `ant`) alongside the general controls (`girl`, `His`).
 *   A setting that adds life but eats the final /k/ of "book" is not a fix.
 *
 *   Second risk, equally real: making these 78 livelier than the 636 approved
 *   words just inverts the inconsistency. That is what the compare page's ⇄
 *   button is for — every candidate is judged against an approved neighbour,
 *   never on its own.
 *
 * Writes only to public/audio/_calibrate/ (gitignored). Never touches the 714
 * live files and never edits a profile — whichever variant wins gets applied
 * deliberately, afterwards, as a separate step.
 *
 *   node scripts/calibrate-delivery.mjs                 # plan only, spends nothing
 *   node scripts/calibrate-delivery.mjs --yes           # render the latest round
 *   node scripts/calibrate-delivery.mjs --round=1 --yes # re-render an older round
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { VOICE_ID, PROFILES } from './tts-profiles.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')
const STATE = path.join(ROOT, 'scripts', 'review-state.json')
const OUT_DIR = path.join(ROOT, 'public', 'audio', '_calibrate')

const PACE_MS = 250
const MAX_ATTEMPTS = 5
const FATAL = [/invalid_api_key/, /paid_plan_required/, /quota_exceeded/, /invalid_uid/]

const WORD = PROFILES.word
const TURBO = 'eleven_turbo_v2'

/** A settings block, written out so each variant reads as one line below. */
const set = (stability, style, speed) => ({
  model: TURBO,
  settings: { stability, similarity_boost: 0.75, style, use_speaker_boost: true, speed },
})

const ROUNDS = {
  1: {
    note: 'flat / period — ALL REJECTED as "too flat, robotic or lifeless"',
    // Reference words got only the settings changes; re-rolling an approved
    // word would have told us nothing.
    controls: { words: ['girl', 'His'], variants: ['C', 'D'] },
    tests: ['am', 'My', 'ball', 'boy', 'arm', 'cloud', 'SKY', 'brown'],
    variants: [
      { id: 'A', name: 'reroll',      label: 'unchanged settings, new seed', profile: WORD,              period: false },
      { id: 'B', name: 'period',      label: 'text + "." ',                  profile: WORD,              period: true  },
      { id: 'C', name: 'flat',        label: 'stability 1.00',               profile: set(1.0, 0, 0.8),  period: false },
      { id: 'D', name: 'flat+period', label: 'stability 1.00, text + "."',   profile: set(1.0, 0, 0.8),  period: true  },
    ],
  },

  2: {
    note: 'the opposite direction — more expression, and natural speed',
    controls: { words: ['girl', 'His', 'book', 'ant'], variants: ['E', 'F', 'G', 'H'] },
    // Six rejected words spanning the clusters, deliberately including two
    // that end in a stop (kid /d/, want /t/) so consonant loss shows up here
    // rather than after 78 words have been replaced.
    // Manifest `request` strings are case-sensitive, so WANT and SKY are caps.
    tests: ['am', 'My', 'kid', 'WANT', 'cloud', 'SKY'],
    variants: [
      // Isolates expression: the letter profile's liveliness at word speed.
      { id: 'E', name: 'lively',       label: 'stability 0.40, style 0.50, speed 0.80', profile: set(0.40, 0.50, 0.80), period: false },
      // Isolates speed: today's settings, but not slowed down.
      { id: 'F', name: 'natural speed', label: 'stability 0.75, style 0, speed 1.00',   profile: set(0.75, 0,    1.00), period: false },
      // Both levers together.
      { id: 'G', name: 'lively+natural', label: 'stability 0.40, style 0.50, speed 1.00', profile: set(0.40, 0.50, 1.00), period: false },
      // A middle setting, in case E and G overshoot into sing-song.
      { id: 'H', name: 'midway',       label: 'stability 0.55, style 0.25, speed 0.95', profile: set(0.55, 0.25, 0.95), period: false },
    ],
  },
}

const sleep = ms => new Promise(r => setTimeout(r, ms))
const has = name => process.argv.includes(`--${name}`)
const arg = (name, fallback) => {
  const hit = process.argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : fallback
}

/** Same FNV-1a the pipeline uses, so these seeds are reproducible too. */
function seed(input) {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0) % 4294967295
}

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
  if (!res.ok) throw new Error(`quota check failed: HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`)
  const j = await res.json()
  return { used: j.character_count, limit: j.character_limit, tier: j.tier }
}

/** Mirrors synthesize() in generate-audio.mjs, including its backoff. */
async function synthesize(apiKey, text, profile, sd) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`
  let lastErr
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, model_id: profile.model, voice_settings: profile.settings, seed: sd }),
      })
      if (res.ok) return Buffer.from(await res.arrayBuffer())

      const body = (await res.text()).slice(0, 200)
      if (FATAL.some(re => re.test(body))) {
        throw Object.assign(new Error(`HTTP ${res.status} — ${body}`), { fatal: true })
      }
      lastErr = new Error(`HTTP ${res.status} — ${body}`)
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

const json = async p => JSON.parse((await readFile(p, 'utf8')).replace(/^﻿/, ''))

async function main() {
  const roundId = String(arg('round', Math.max(...Object.keys(ROUNDS).map(Number))))
  const round = ROUNDS[roundId]
  if (!round) throw new Error(`no round ${roundId}. Known rounds: ${Object.keys(ROUNDS).join(', ')}`)

  const { entries } = await json(MANIFEST)
  const state = await json(STATE)

  const find = w => {
    const e = entries.find(x => x.request === w)
    if (!e) throw new Error(`"${w}" is not in the manifest`)
    return e
  }
  const byId = Object.fromEntries(round.variants.map(v => [v.id, v]))
  const pick = ids => ids.map(id => {
    if (!byId[id]) throw new Error(`round ${roundId} has no variant "${id}"`)
    return byId[id]
  })

  const rows = [
    ...round.controls.words.map(w => ({ entry: find(w), role: 'control', variants: pick(round.controls.variants) })),
    ...round.tests.map(w => ({ entry: find(w), role: 'test', variants: round.variants })),
  ]

  const jobs = []
  for (const row of rows) {
    for (const v of row.variants) {
      const text = row.entry.speak + (v.period ? '.' : '')
      jobs.push({
        id: `${v.id}-${row.entry.key}`,
        word: row.entry.request,
        key: row.entry.key,
        variant: v.id,
        text,
        profile: v.profile,
        seed: seed(`${row.entry.key}#delivery-${v.id}`),
      })
    }
  }

  const chars = jobs.reduce((n, j) => n + j.text.length, 0)

  console.log(`\ndelivery calibration — round ${roundId}`)
  console.log(`  ${round.note}`)
  console.log(`  controls   ${round.controls.words.join(', ')}  (all approved)`)
  console.log(`  tests      ${round.tests.join(', ')}  (all rejected)`)
  for (const v of round.variants) console.log(`    ${v.id}  ${v.name.padEnd(14)} ${v.label}`)
  console.log(`  renders    ${jobs.length}`)
  console.log(`  spend      ~${chars} characters`)

  for (const row of rows) {
    const v = state.entries[row.entry.key]?.verdict ?? 'unheard'
    console.log(`    ${row.entry.request.padEnd(8)} ${row.role.padEnd(8)} currently: ${v}`)
  }

  if (!has('yes')) {
    console.log('\nPlan only — nothing was sent and no quota was spent.')
    console.log(`Render it with:  node scripts/calibrate-delivery.mjs --round=${roundId} --yes\n`)
    return
  }

  const apiKey = await readApiKey()
  const before = await quota(apiKey)
  const remaining = before.limit - before.used
  console.log(`\nquota      ${before.used}/${before.limit} used on "${before.tier}" — ${remaining} left`)
  if (remaining < chars) {
    throw new Error(`Need ~${chars} characters but only ${remaining} remain. Nothing was sent.`)
  }

  await mkdir(OUT_DIR, { recursive: true })

  // Strictly serial. Concurrency trips the free tier's unusual-activity
  // heuristic, which locks the key out with a 401 for a while.
  let done = 0
  for (const job of jobs) {
    const mp3 = await synthesize(apiKey, job.text, job.profile, job.seed)
    await writeFile(path.join(OUT_DIR, `${job.id}.mp3`), mp3)
    done++
    console.log(`  ${String(done).padStart(2)}/${jobs.length}  ${job.variant} ${job.word.padEnd(8)} ${JSON.stringify(job.text)}`)
    await sleep(PACE_MS)
  }

  await writeFile(
    path.join(OUT_DIR, 'delivery-plan.json'),
    JSON.stringify({
      round: Number(roundId),
      note: round.note,
      generated: new Date().toISOString(),
      rows: rows.map(r => ({
        word: r.entry.request,
        key: r.entry.key,
        role: r.role,
        verdict: state.entries[r.entry.key]?.verdict ?? null,
        variants: r.variants.map(v => v.id),
      })),
      variants: round.variants.map(v => ({
        id: v.id, name: v.name, label: v.label,
        period: v.period, stability: v.profile.settings.stability,
      })),
    }, null, 2) + '\n',
  )

  const after = await quota(apiKey)
  console.log(`\nspent      ${Math.max(0, after.used - before.used)} characters (the counter can lag)`)
  console.log(`wrote      ${jobs.length} files to public/audio/_calibrate/`)
  console.log('\nListen at: http://127.0.0.1:4310/audio/_calibrate/compare.html\n')
}

main().catch(err => {
  console.error(`\n${err.message}\n`)
  // exitCode rather than exit(), so an open keep-alive socket from the failed
  // request can drain. process.exit() here trips a libuv assertion on Windows.
  process.exitCode = 1
})
