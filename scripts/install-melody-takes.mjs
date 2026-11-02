/**
 * Installs the melody-search takes a human confirmed by ear.
 *
 * Review rejected 78 of 714 words for MELODY, not pronunciation: the approved
 * words fall about 5 semitones from start to end, the rejected ones were flat
 * or rising. Settings control how much pitch moves, not its direction, so the
 * fix was re-rolling the seed at IDENTICAL voice settings — which also keeps
 * the timbre matching the 636 files already approved.
 *
 * Takes were shortlisted by a melody model and then CONFIRMED BY EAR in
 * `_calibrate/best.html`; this installs only the ones marked `best` or `2nd`.
 * The model's own score is not a criterion here — it put `PATCH` at 0.95 and
 * the reviewer still rejected it.
 *
 * What it does, per confirmed word:
 *   1. archives the retired file to public/audio/_takes/, so every install is
 *      reversible and the old take can still be played against the new one
 *   2. copies the chosen take over public/audio/<key>.mp3
 *   3. records the winning SEED in scripts/melody-seeds.json — the seed came
 *      out of a search and is not derivable from the key, so without this a
 *      later `--force` would re-render the word and silently discard audio a
 *      human approved
 *   4. marks the word good in the review ledger with the new fingerprint, so
 *      the review page does not flag it as changed-and-unheard
 *
 *   node scripts/install-melody-takes.mjs          # plan only, changes nothing
 *   node scripts/install-melody-takes.mjs --yes    # install
 */

import { readFile, writeFile, copyFile, mkdir, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const AUDIO_DIR = path.join(ROOT, 'public', 'audio')
const TAKES_DIR = path.join(AUDIO_DIR, '_takes')
const CAL_DIR = path.join(AUDIO_DIR, '_calibrate')
const ANSWERS = path.join(ROOT, 'scripts', 'calibration-answers.json')
const STATE = path.join(ROOT, 'scripts', 'review-state.json')
const SEEDS = path.join(ROOT, 'scripts', 'melody-seeds.json')
const TEXTS = path.join(ROOT, 'scripts', 'melody-text.json')

const has = n => process.argv.includes(`--${n}`)
const json = async p => JSON.parse((await readFile(p, 'utf8')).replace(/^﻿/, ''))

const sha = async file => createHash('sha256').update(await readFile(file)).digest('hex')

/** Next free take number for a key, so archives never overwrite each other. */
async function nextTakeNumber(key) {
  for (let n = 1; n < 100; n++) {
    const candidates = `${key}--take${n}-`
    const { readdir } = await import('node:fs/promises')
    const all = await readdir(TAKES_DIR).catch(() => [])
    if (!all.some(f => f.startsWith(candidates))) return n
  }
  return 99
}

/**
 * Three confirmation pages exist, recording picks in different shapes:
 *   best   — "best" / "2nd" / "neither", from best.html
 *   top5   — "m<take>" / "none", from top5.html, which offered the next-best
 *            takes already rendered for the words still rejected
 *   twenty — "m<take>" / "keep" / "none", from twenty.html. That round fixed a
 *            PRONUNCIATION fault (the deleted /t/ of "twenty") on words whose
 *            melody was already approved, so "keep the current one" is a real
 *            answer there and is treated exactly like an unmarked row.
 * All three name a take on a row of their own plan file, so one installer
 * covers them. `--from=` selects which.
 */
const FROM = (process.argv.find(a => a.startsWith('--from=')) ?? '--from=best').split('=')[1]
const PLAN_FILES = { best: 'best-plan.json', top5: 'top5-plan.json', twenty: 'twenty-plan.json' }

/**
 * `--only=TRY,HER` installs just those words. Without it every confirmed word
 * is installed, which on a re-run would archive a file and copy the identical
 * take back over it — harmless but it litters _takes/ with duplicates. Use it
 * when changing a decision about one word.
 */
const ONLY = (process.argv.find(a => a.startsWith('--only=')) ?? '').split('=')[1]
const onlySet = ONLY ? new Set(ONLY.split(',').map(s => s.trim().toLowerCase())) : null

async function main() {
  const planName = PLAN_FILES[FROM]
  if (!planName) throw new Error(`unknown --from=${FROM}; expected one of ${Object.keys(PLAN_FILES).join(', ')}`)
  const planFile = path.join(CAL_DIR, planName)
  const plan = await json(planFile)
  const answers = (await json(ANSWERS))[FROM]?.answers
  if (!answers) throw new Error(`no confirmations in calibration-answers.json under "${FROM}"`)
  console.log(`  source           ${path.relative(ROOT, planFile)} + answers."${FROM}"`)

  const state = await json(STATE)

  const chosen = []
  const skipped = []
  for (const row of plan.rows) {
    const verdict = answers[row.word]
    let take
    if (verdict === 'best') take = row.best
    else if (verdict === '2nd') take = row.runnerUp
    else if (/^m\d+$/.test(verdict ?? '')) {
      const i = Number(verdict.slice(1))
      take = (row.takes ?? []).find(t => t.i === i)
    }
    if (!take) { skipped.push({ word: row.word, verdict: verdict ?? 'unmarked' }); continue }
    if (onlySet && !onlySet.has(row.word.toLowerCase())) { skipped.push({ word: row.word, verdict: 'not in --only' }); continue }
    chosen.push({ ...row, verdict, take })
  }

  console.log(`\ninstall melody takes`)
  console.log(`  plan rows        ${plan.rows.length}`)
  // Grouped by the KIND of answer, not its literal value: "m59" is a take
  // number, so counting those separately says nothing useful.
  const kind = v => (v === 'best' || v === '2nd') ? v : 'a named take'
  const byKind = [...new Set(chosen.map(c => kind(c.verdict)))]
    .map(k => `${chosen.filter(c => kind(c.verdict) === k).length} ${k}`).join(', ')
  console.log(`  confirmed good   ${chosen.length}${byKind ? `  (${byKind})` : ''}`)
  console.log(`  not installed    ${skipped.length}  (${skipped.map(s => s.word).join(', ')})`)

  // Verify every source file exists BEFORE touching anything.
  const missing = []
  for (const c of chosen) {
    const src = path.join(CAL_DIR, `m${c.take.i}-${c.key}.mp3`)
    try { await stat(src) } catch { missing.push(path.relative(ROOT, src)) }
  }
  if (missing.length) throw new Error(`these chosen takes are missing, nothing was changed:\n  ${missing.join('\n  ')}`)
  console.log(`  source takes     all ${chosen.length} present`)

  if (!has('yes')) {
    console.log('\nPlan only — no files changed.')
    console.log('Install with:  node scripts/install-melody-takes.mjs --yes\n')
    return
  }

  await mkdir(TAKES_DIR, { recursive: true })

  // Back up the ledger before editing it. Losing it is the one failure mode
  // the review tooling exists to prevent.
  const stamp = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15)
  await writeFile(path.join(ROOT, 'scripts', `review-state.backup-${stamp}.json`), JSON.stringify(state, null, 2))

  let seeds = {}
  try { seeds = await json(SEEDS) } catch { /* first install */ }
  let texts = {}
  try { texts = await json(TEXTS) } catch { /* first install */ }

  let installed = 0
  for (const c of chosen) {
    const live = path.join(AUDIO_DIR, `${c.key}.mp3`)
    const src = path.join(CAL_DIR, `m${c.take.i}-${c.key}.mp3`)

    const oldSha = await sha(live)
    const n = await nextTakeNumber(c.key)
    await copyFile(live, path.join(TAKES_DIR, `${c.key}--take${n}-${oldSha.slice(0, 8)}.mp3`))

    await copyFile(src, live)
    const newSha = await sha(live)

    seeds[c.word.toLowerCase()] = c.take.seed
    // Some winning takes changed the TEXT SENT ("dry" -> "dry!") and some also
    // needed a cheerful previous_text. Both must be recorded or a re-render
    // would send the bare word and lose the contour a human approved.
    if (c.take.text !== undefined && (c.take.text !== c.speak || c.take.previousText)) {
      texts[c.word.toLowerCase()] = { text: c.take.text, previousText: c.take.previousText ?? null }
    }
    state.entries[c.key] = {
      verdict: 'good',
      note: `${plan.reason ?? 'melody re-roll'}, take ${c.take.i} of ${c.tried ?? c.totalTakes ?? '?'}, confirmed by ear (${c.verdict})`,
      sha: newSha,
      at: new Date().toISOString(),
    }
    installed++
    console.log(`  ${c.word.padEnd(11)} take ${String(c.take.i).padStart(2)}  seed ${String(c.take.seed).padStart(10)}  ${oldSha.slice(0, 8)} -> ${newSha.slice(0, 8)}`)
  }

  await writeFile(SEEDS, JSON.stringify(seeds, null, 2) + '\n')
  await writeFile(TEXTS, JSON.stringify(texts, null, 2) + '\n')

  state.updatedAt = new Date().toISOString()
  const tmp = `${STATE}.tmp`
  await writeFile(tmp, JSON.stringify(state, null, 2))
  const { rename } = await import('node:fs/promises')
  await rename(tmp, STATE)

  const verdicts = Object.values(state.entries)
  console.log(`\ninstalled        ${installed} files`)
  console.log(`archived to      public/audio/_takes/  (every replaced file, so this is reversible)`)
  console.log(`seeds recorded   ${path.relative(ROOT, SEEDS)}  (${Object.keys(seeds).length} words)`)
  console.log(`text overrides   ${path.relative(ROOT, TEXTS)}  (${Object.keys(texts).length} words)`)
  console.log(`ledger           ${verdicts.filter(v => v.verdict === 'good').length} good, ${verdicts.filter(v => v.verdict === 'bad').length} not good`)
  console.log(`\nNow run:  npm run audio:validate\n`)
}

main().catch(err => { console.error(`\n${err.message}\n`); process.exitCode = 1 })
