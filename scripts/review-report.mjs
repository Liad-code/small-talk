/**
 * Reads the review ledger and prints what still needs doing.
 *
 * This is the half of the loop that faces the person fixing pronunciations:
 * the review server collects verdicts, this turns them into a worklist. It
 * replaces the old hand-off, where the only way to learn which words had been
 * rejected was to copy a JSON blob out of a web page and paste it into a chat.
 *
 * Read-only. No API calls, no writes.
 *
 * Run:  node scripts/review-report.mjs
 *       node scripts/review-report.mjs --bad-only     # just the words, comma-separated
 */

import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')
const STATE = path.join(ROOT, 'scripts', 'review-state.json')
const AUDIO_DIR = path.join(ROOT, 'public', 'audio')

const has = name => process.argv.includes(`--${name}`)

/**
 * A verdict belongs to the take that was heard. Comparing the stored
 * fingerprint against the file on disk separates "rejected, still needs a
 * re-roll" from "already re-rolled, waiting on a re-listen" — treating those
 * the same would send the same word round the loop twice.
 */
async function fingerprint(key) {
  try {
    const buf = await readFile(path.join(AUDIO_DIR, `${key}.mp3`))
    return createHash('sha256').update(buf).digest('hex').slice(0, 16)
  } catch { return null }
}

async function main() {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))

  let state = { entries: {} }
  try {
    state = JSON.parse(await readFile(STATE, 'utf8'))
  } catch {
    console.log('No review ledger yet — start one with: npm run audio:review-server')
    return
  }

  const good = [], bad = [], relisten = [], pending = []
  for (const e of entries) {
    const rec = state.entries[e.key]
    if (!rec?.verdict) { pending.push(e); continue }
    const sha = await fingerprint(e.key)
    if (rec.sha && sha && rec.sha !== sha) {
      relisten.push({ ...e, was: rec.verdict, note: rec.note })
      continue
    }
    if (rec.verdict === 'good') good.push(e)
    else bad.push({ ...e, note: rec.note, reviewedAt: rec.reviewedAt })
  }

  if (has('bad-only')) {
    console.log(bad.map(e => e.request).join(','))
    return
  }

  const pct = n => ((n / entries.length) * 100).toFixed(1)
  console.log(`manifest     ${entries.length} entries`)
  console.log(`reviewed     ${good.length + bad.length}  (${pct(good.length + bad.length)}%)`)
  console.log(`  good       ${good.length}`)
  console.log(`  not good   ${bad.length}`)
  console.log(`re-listen    ${relisten.length}`)
  console.log(`not heard    ${pending.length}`)
  if (state.updatedAt) console.log(`last mark    ${state.updatedAt}`)

  if (bad.length) {
    console.log(`\nREJECTED — each needs a re-roll or a pronunciation override:`)
    for (const e of bad) {
      console.log(`  ${e.request.padEnd(22)} [${e.profile}]  sent: ${e.speak}`)
      if (e.note) console.log(`${' '.repeat(26)}you said: ${e.note}`)
    }
    console.log(`\nRe-roll them with:  node scripts/regenerate-rejected.mjs`)
  }

  if (relisten.length) {
    console.log(`\nAWAITING RE-REVIEW — re-rendered since you judged them:`)
    for (const e of relisten) console.log(`  ${e.request.padEnd(22)} (was ${e.was})`)
    console.log(`\nThey show as "needs re-review" at npm run audio:review-server`)
  }

  if (!pending.length && !bad.length && !relisten.length) {
    console.log(`\nEvery string has been listened to and approved.`)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
