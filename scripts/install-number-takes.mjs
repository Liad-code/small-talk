/**
 * Installs the numbers 20-29 chosen by ear in `_calibrate/numbers.html`.
 *
 * Why this is not install-melody-takes.mjs. That script fixes MELODY on one
 * file per word, by re-rolling a seed at fixed settings. This round fixes a
 * PRONUNCIATION fault — the engine deletes the /t/ of "twenty" by rule, saying
 * "twenny" — and differs in three ways that the other installer cannot express:
 *
 *   1. TWO files per number. The app plays the word ("twenty-three") on the
 *      step 2 numbers grid and the digit ("23") in the quiz below it, and those
 *      are separate recordings. One chosen take goes into both, so the two
 *      stop differing.
 *   2. The fix is in the TEXT, not the seed. Each option is a different
 *      spelling, so the text override is the whole point and must be recorded
 *      for both request strings.
 *   3. Some options used a different model or a slower pace. Those are not
 *      expressible in melody-seeds.json, so this script REFUSES to install one
 *      silently — it prints the override that has to be hand-added to
 *      ENTRY_OVERRIDES in tts-profiles.mjs first.
 *
 *   node scripts/install-number-takes.mjs          # plan only, changes nothing
 *   node scripts/install-number-takes.mjs --yes    # install
 *   node scripts/install-number-takes.mjs --only=26,28
 */

import { readFile, writeFile, copyFile, mkdir, stat, readdir, rename } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const AUDIO_DIR = path.join(ROOT, 'public', 'audio')
const TAKES_DIR = path.join(AUDIO_DIR, '_takes')
const CAL_DIR = path.join(AUDIO_DIR, '_calibrate')
const PLAN = path.join(CAL_DIR, 'options-plan.json')
const ANSWERS = path.join(ROOT, 'scripts', 'calibration-answers.json')
const STATE = path.join(ROOT, 'scripts', 'review-state.json')
const SEEDS = path.join(ROOT, 'scripts', 'melody-seeds.json')
const TEXTS = path.join(ROOT, 'scripts', 'melody-text.json')

// What the renders used when nothing was overridden. An option that departs
// from these needs a hand-written entry override, so they are checked, not
// assumed.
const STOCK_MODEL = 'eleven_turbo_v2'
const STOCK_SPEED = 0.8

const has = n => process.argv.includes(`--${n}`)
const json = async p => JSON.parse((await readFile(p, 'utf8')).replace(/^﻿/, ''))
const sha = async file => createHash('sha256').update(await readFile(file)).digest('hex')

const ONLY = (process.argv.find(a => a.startsWith('--only=')) ?? '').split('=')[1]
const onlySet = ONLY ? new Set(ONLY.split(',').map(s => s.trim())) : null

/** Next free take number for a key, so archives never overwrite each other. */
async function nextTakeNumber(key) {
  const all = await readdir(TAKES_DIR).catch(() => [])
  for (let n = 1; n < 100; n++) if (!all.some(f => f.startsWith(`${key}--take${n}-`))) return n
  return 99
}

async function main() {
  const plan = await json(PLAN)
  const answers = (await json(ANSWERS)).numbers?.answers
  if (!answers) throw new Error('no choices in calibration-answers.json under "numbers"')

  const chosen = []
  const skipped = []
  for (const row of plan.rows) {
    const verdict = answers[row.n]
    const option = typeof verdict === 'number' ? row.options.find(o => o.i === verdict) : null
    if (!option) { skipped.push({ n: row.n, verdict: verdict ?? 'not chosen' }); continue }
    if (onlySet && !onlySet.has(row.n)) { skipped.push({ n: row.n, verdict: 'not in --only' }); continue }
    chosen.push({ row, option })
  }

  console.log(`\ninstall chosen numbers`)
  console.log(`  source           ${path.relative(ROOT, PLAN)} + answers."numbers"`)
  console.log(`  numbers chosen   ${chosen.length} of ${plan.rows.length}`)
  if (skipped.length) console.log(`  not installed    ${skipped.map(s => `${s.n} (${s.verdict})`).join(', ')}`)

  // A chosen option rendered on another model or at another pace cannot be
  // reproduced by a later --force, because nothing in the pipeline records it
  // per entry. Refuse rather than install audio the pipeline would overwrite
  // with something different.
  const needsOverride = chosen.filter(c =>
    (c.option.model && c.option.model !== STOCK_MODEL) ||
    (c.option.speed && c.option.speed !== STOCK_SPEED))
  if (needsOverride.length) {
    console.log('\nThese choices need a hand-written override in scripts/tts-profiles.mjs first:')
    for (const c of needsOverride) {
      console.log(`  ${c.row.n}  model ${c.option.model}  speed ${c.option.speed}  — "${c.option.text}"`)
    }
    console.log('\nNothing was changed. ENTRY_OVERRIDES carries model/profile per request;')
    console.log('a non-stock SPEED has no per-entry mechanism yet and needs one adding.')
    throw new Error(`${needsOverride.length} choice(s) are not reproducible by the pipeline`)
  }

  // Verify every source and destination exists BEFORE touching anything.
  const missing = []
  for (const c of chosen) {
    const src = path.join(CAL_DIR, c.option.file)
    try { await stat(src) } catch { missing.push(path.relative(ROOT, src)) }
    for (const d of [c.row.digit, c.row.wordForm]) {
      const live = path.join(AUDIO_DIR, `${d.key}.mp3`)
      try { await stat(live) } catch { missing.push(path.relative(ROOT, live)) }
    }
  }
  if (missing.length) throw new Error(`these files are missing, nothing was changed:\n  ${missing.join('\n  ')}`)
  console.log(`  files checked    ${chosen.length} takes, ${chosen.length * 2} destinations, all present`)

  for (const c of chosen) {
    console.log(`  ${c.row.n.padEnd(3)} option ${c.option.i}  "${c.option.text}"`)
    console.log(`      -> ${c.row.digit.key}.mp3  and  ${c.row.wordForm.key}.mp3`)
  }

  if (!has('yes')) {
    console.log('\nPlan only — no files changed.')
    console.log('Install with:  node scripts/install-number-takes.mjs --yes\n')
    return
  }

  await mkdir(TAKES_DIR, { recursive: true })

  const state = await json(STATE)
  const stamp = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15)
  await writeFile(path.join(ROOT, 'scripts', `review-state.backup-${stamp}.json`), JSON.stringify(state, null, 2))

  let seeds = {}
  try { seeds = await json(SEEDS) } catch { /* first install */ }
  let texts = {}
  try { texts = await json(TEXTS) } catch { /* first install */ }

  let files = 0
  for (const c of chosen) {
    const src = path.join(CAL_DIR, c.option.file)
    for (const dest of [c.row.digit, c.row.wordForm]) {
      const live = path.join(AUDIO_DIR, `${dest.key}.mp3`)
      const oldSha = await sha(live)
      const n = await nextTakeNumber(dest.key)
      await copyFile(live, path.join(TAKES_DIR, `${dest.key}--take${n}-${oldSha.slice(0, 8)}.mp3`))
      await copyFile(src, live)
      const newSha = await sha(live)

      // Keyed by the REQUEST, lowercased, the same convention seedFor() and
      // requestFor() read. Both forms get the same text and seed, so a
      // re-render reproduces one recording for both.
      const request = dest === c.row.digit ? c.row.n : c.row.word
      seeds[request.toLowerCase()] = c.option.seed
      texts[request.toLowerCase()] = { text: c.option.text, previousText: null }

      state.entries[dest.key] = {
        verdict: 'good',
        note: `${plan.reason ?? 'pronunciation fix'}, round ${c.row.round ?? 1} option ${c.option.i} (${c.option.label}), confirmed by ear`,
        sha: newSha,
        at: new Date().toISOString(),
      }
      files++
      console.log(`  ${request.padEnd(13)} ${oldSha.slice(0, 8)} -> ${newSha.slice(0, 8)}`)
    }
  }

  await writeFile(SEEDS, JSON.stringify(seeds, null, 2) + '\n')
  await writeFile(TEXTS, JSON.stringify(texts, null, 2) + '\n')

  state.updatedAt = new Date().toISOString()
  const tmp = `${STATE}.tmp`
  await writeFile(tmp, JSON.stringify(state, null, 2))
  await rename(tmp, STATE)

  const verdicts = Object.values(state.entries)
  console.log(`\ninstalled        ${files} files for ${chosen.length} numbers`)
  console.log(`archived to      public/audio/_takes/  (every replaced file, so this is reversible)`)
  console.log(`seeds recorded   ${path.relative(ROOT, SEEDS)}  (${Object.keys(seeds).length} words)`)
  console.log(`text overrides   ${path.relative(ROOT, TEXTS)}  (${Object.keys(texts).length} words)`)
  console.log(`ledger           ${verdicts.filter(v => v.verdict === 'good').length} good, ${verdicts.filter(v => v.verdict === 'bad').length} not good`)
  console.log(`\nNow run:  npm run audio:validate\n`)
}

main().catch(err => { console.error(`\n${err.message}\n`); process.exitCode = 1 })
