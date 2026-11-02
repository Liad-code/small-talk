/**
 * Verifies every string the app can speak has a real audio file.
 *
 * This is the safety net for the no-fallback design: if playback finds no file
 * the child hears NOTHING, and silence is easy to miss in testing. Running this
 * turns that class of bug into a failed check instead.
 *
 * Run:  node scripts/build-manifest.mjs && node scripts/validate-audio.mjs
 * Exit: 0 = every entry covered, 1 = gaps found
 */

import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const AUDIO_DIR = path.join(ROOT, 'public', 'audio')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')

/** An MP3 starts with an ID3 tag or an MPEG frame sync (0xFF 0xEx/0xFx). */
function looksLikeMp3(head) {
  if (head.length < 3) return false
  if (head[0] === 0x49 && head[1] === 0x44 && head[2] === 0x33) return true   // "ID3"
  return head[0] === 0xff && (head[1] & 0xe0) === 0xe0
}

async function main() {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))

  let present = []
  try {
    present = (await readdir(AUDIO_DIR)).filter(f => f.endsWith('.mp3'))
  } catch {
    console.error(`No audio directory at ${path.relative(ROOT, AUDIO_DIR)} — run generate-audio.mjs first.`)
    process.exit(1)
  }

  const onDisk = new Set(present.map(f => f.replace(/\.mp3$/, '')))
  const missing = entries.filter(e => !onDisk.has(e.key))

  // Files present but not in the manifest. Usually harmless leftovers from
  // renamed content, so reported but not treated as a failure.
  const expected = new Set(entries.map(e => e.key))
  const orphans = [...onDisk].filter(k => !expected.has(k) && !k.startsWith('_'))

  // A zero-length or non-MP3 file plays as silence just like a missing one.
  const corrupt = []
  for (const entry of entries) {
    if (!onDisk.has(entry.key)) continue
    const file = path.join(AUDIO_DIR, `${entry.key}.mp3`)
    const { size } = await stat(file)
    if (size < 1024) { corrupt.push({ entry, why: `${size} bytes` }); continue }
    const fh = await readFile(file)
    if (!looksLikeMp3(fh.subarray(0, 3))) corrupt.push({ entry, why: 'not an MP3' })
  }

  console.log(`manifest entries  ${entries.length}`)
  console.log(`audio files       ${present.length}`)
  console.log(`missing           ${missing.length}`)
  console.log(`corrupt           ${corrupt.length}`)
  console.log(`orphaned          ${orphans.length}`)

  if (missing.length) {
    console.log(`\nMISSING — these strings would be SILENT in the app:`)
    for (const e of missing.slice(0, 30)) {
      console.log(`  "${e.request}" -> ${e.key}.mp3   (${e.sources[0]})`)
    }
    if (missing.length > 30) console.log(`  ...and ${missing.length - 30} more`)
    console.log(`\nFix: node scripts/generate-audio.mjs`)
  }

  if (corrupt.length) {
    console.log(`\nCORRUPT — will also play as silence:`)
    for (const c of corrupt.slice(0, 20)) console.log(`  ${c.entry.key}.mp3 (${c.why}) "${c.entry.request}"`)
    console.log(`\nFix: delete those files and re-run generate-audio.mjs`)
  }

  if (orphans.length) {
    console.log(`\nOrphaned files (safe to delete, no longer referenced):`)
    for (const k of orphans.slice(0, 10)) console.log(`  ${k}.mp3`)
    if (orphans.length > 10) console.log(`  ...and ${orphans.length - 10} more`)
  }

  if (missing.length || corrupt.length) process.exit(1)
  console.log(`\nOK — every spoken string has audio.`)
}

main().catch(err => { console.error(err); process.exit(1) })
