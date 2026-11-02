/**
 * Builds the audio manifest: every string the app can ask to speak.
 *
 * Playback has no runtime fallback, so a string missing here becomes a SILENT
 * word in front of a child. The extraction is therefore deliberately
 * over-inclusive — a handful of extra 3-letter words costs ~30 characters,
 * while a miss costs a broken exercise.
 *
 * Costs nothing to run (no API calls). Run it before generating to see the
 * exact character spend.
 *
 * Run:  node scripts/build-manifest.mjs
 * Out:  scripts/audio-manifest.json
 */

import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { audioKey } from '../src/utils/audioKey.ts'
import { toSpokenText, toLetterWithSoundText, LETTER_ARPABET, profileFor } from '../src/utils/spokenText.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'src')
const OUT = path.join(ROOT, 'scripts', 'audio-manifest.json')

/**
 * Object fields whose string values can reach speak(). Derived by reading the
 * arguments at all ~59 call sites (e.g. `speak(tile.word)`,
 * `speak(item.ttsText ?? item.word)`, `speak(current.name)`).
 * Note `english` and `example` are absent: the subject content files in
 * src/data/content are never spoken, which keeps the budget small.
 */
const SPOKEN_FIELDS = ['word', 'ttsText', 'tts', 'name', 'label', 'prep', 'en', 'word1', 'word2']

/**
 * `label` in the phonics/digraph/blend data is a SOUND PATTERN, not a word —
 * "ow / oa", "soft c", "dge", "cr", "TH". Review confirmed the app should not
 * speak these at all, so they are excluded rather than voiced badly.
 * Consequence: if a call site still calls speak() on one, it is silent by
 * design. The dev-only warning in audioPlayer.ts will surface any that remain.
 */
const LABEL_NOT_SPOKEN = /src\/data\/(step2\/digraphs|step3\/phonics|step4\/phonics|step4\/blends)\.ts$/

/**
 * Arrays whose strings are never spoken: sound-set identifiers such as
 * "y-as-i", "kn", "qu" (internal ids), and the building-a-sentence rounds
 * (step2) — that exercise is drag-only with no speak() calls, so its
 * `{ text: '…' }` sentences must not be demanded as audio.
 */
const ARRAY_NOT_SPOKEN = /^(SET_SOUND_IDS|SOUND_IDS|SOUND_SORT_SETS|TRACK_D_KEYS|BUILD_ROUND_\d+|BUILD_ROUNDS)$/

/**
 * `label` inside a PAGE is UI chrome — tab names like "📚 Learn", "🎯 Quiz",
 * "👁️ I Spy". Content labels live in src/data and are still collected.
 */
const isUiLabelFile = rel => rel.startsWith('src/app/')

/** Tailwind/CSS values and ids that share field names with spoken text. */
const NOT_SPEECH = /^(bg|text|border|from|to|via|ring|shadow)-|^#|^group\d|^[a-z]+_[a-z]+$/
const HEBREW = /[֐-׿]/

/** Recursively collect .ts/.tsx files under a directory. */
async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walk(full))
    else if (/\.tsx?$/.test(entry.name)) out.push(full)
  }
  return out
}

/**
 * Files that can contain spoken strings: the step1-4 data modules, plus the
 * step1-4 pages/components themselves (several vocabulary pages declare their
 * word arrays inline rather than importing them).
 */
async function sourceFiles() {
  const dirs = [
    path.join(SRC, 'data', 'step1'), path.join(SRC, 'data', 'step2'),
    path.join(SRC, 'data', 'step3'), path.join(SRC, 'data', 'step4'),
    path.join(SRC, 'app', 'step1'), path.join(SRC, 'app', 'step2'),
    path.join(SRC, 'app', 'step3'), path.join(SRC, 'app', 'step4'),
    path.join(SRC, 'components', 'step1'), path.join(SRC, 'components', 'step3'),
  ]
  const all = []
  for (const d of dirs) {
    try { all.push(...await walk(d)) } catch { /* dir may not exist */ }
  }
  return all
}

/** Every spoken candidate string in one file, with why it was picked up. */
function extract(source, relPath, add) {
  for (const field of SPOKEN_FIELDS) {
    if (field === 'label' && (LABEL_NOT_SPOKEN.test(relPath) || isUiLabelFile(relPath))) continue
    const re = new RegExp(`\\b${field}\\s*:\\s*(['"\`])((?:(?!\\1)[^\\\\]|\\\\.)*?)\\1`, 'g')
    for (const m of source.matchAll(re)) add(m[2], `${relPath} (${field})`)
  }

  // letters: ['t','m','a'] — Track A/B letter groups
  for (const m of source.matchAll(/\bletters\s*:\s*\[([^\]]*)\]/g)) {
    for (const lm of m[1].matchAll(/['"]([^'"]+)['"]/g)) add(lm[1], `${relPath} (letters)`)
  }

  // speak(String(current.digit)) — the numbers pages speak the numeral itself
  for (const m of source.matchAll(/\bdigit\s*:\s*(\d+)/g)) add(m[1], `${relPath} (digit)`)

  // Plain string arrays, e.g. `const DAYS = ['Sunday', 'Monday', ...]`.
  // Field-name matching misses these entirely, yet they ARE spoken —
  // DaysOrder.tsx calls speak(tileId) where tileId comes straight out of such
  // an array. Over-inclusive by design: an unspoken extra word costs a few
  // characters, a missed one is silence in front of a child.
  for (const m of source.matchAll(/\b(?:const|let)\s+([A-Z][A-Z0-9_]*)\s*(?::[^=]+)?=\s*\[([^\]]*)\]/g)) {
    if (ARRAY_NOT_SPOKEN.test(m[1])) continue
    const items = [...m[2].matchAll(/['"]([^'"]+)['"]/g)].map(x => x[1])
    // Only word-like arrays; skips class lists, ids and config strings.
    if (items.length && items.every(s => /^[A-Za-z][A-Za-z' -]{0,24}$/.test(s))) {
      for (const s of items) add(s, `${relPath} (${m[1]})`)
    }
  }

  // Bare literals passed directly, e.g. speak('cat')
  for (const m of source.matchAll(/\bspeak\(\s*(['"])((?:(?!\1)[^\\]|\\.)*?)\1/g)) {
    add(m[2], `${relPath} (literal)`)
  }
}

async function main() {
  const entries = new Map()   // key -> { key, request, speak, variant, sources[] }

  /** Registers a request string (deduped by audioKey). */
  function register(request, source, variant, speakText) {
    const trimmed = (request ?? '').trim()
    if (!trimmed) return
    if (HEBREW.test(trimmed)) return              // nothing Hebrew is ever spoken
    if (NOT_SPEECH.test(trimmed)) return
    if (!/[a-z0-9]/i.test(trimmed)) return        // pure emoji / punctuation
    if (trimmed.length > 80) return               // guards against prose slipping in

    const key = audioKey(trimmed, variant)
    const existing = entries.get(key)
    if (existing) {
      if (!existing.sources.includes(source)) existing.sources.push(source)
      return
    }
    entries.set(key, {
      key,
      request: trimmed,
      speak: speakText ?? toSpokenText(trimmed),
      profile: profileFor(trimmed, variant),
      ...(variant ? { variant } : {}),
      sources: [source],
    })
  }

  const files = await sourceFiles()
  let skippedSilent = 0
  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/')
    const src = await readFile(file, 'utf8')

    // Pages and components only contribute if they can actually speak. Many
    // step3/step4 GRAMMAR pages contain word arrays but never call speak(), and
    // rendering those would bill characters for audio nothing can ever play.
    // Data modules are always scanned: they are shared, and a speaking page may
    // import them.
    const isData = rel.startsWith('src/data/')
    const speaks = /useSpeak|speakLetterSound/.test(src)
    if (!isData && !speaks) { skippedSilent++; continue }

    extract(src, rel, (text, source) => register(text, source))
  }
  console.log(`skipped   ${skippedSilent} files that never call speak()`)

  // Every letter name — the ABC exercises can request any of the 26.
  //
  // The letter-plus-short-sound variant is NOT generated: that Track B feature
  // is being removed from the app, so voicing it would spend characters on
  // audio nothing will play. Re-enable by restoring the second register() call
  // and running `generate-audio.mjs --variant=sound`.
  for (const letter of Object.keys(LETTER_ARPABET)) {
    register(letter, 'alphabet (letter name)')
  }

  const list = [...entries.values()].sort((a, b) => a.key.localeCompare(b.key))
  // <phoneme> markup is not billed (measured: 306 chars of tagged text billed as
  // 37), so cost is estimated on the spoken text with tags stripped.
  const billable = s => s.replace(/<[^>]+>/g, '').length
  const chars = list.reduce((n, e) => n + billable(e.speak), 0)

  await writeFile(OUT, JSON.stringify({ model: 'eleven_multilingual_v2', entries: list }, null, 2))

  console.log(`scanned   ${files.length} files`)
  console.log(`entries   ${list.length}`)
  console.log(`characters ${chars}  (ElevenLabs bills per character)`)
  console.log(`manifest  ${path.relative(ROOT, OUT)}`)

  const longest = list.filter(e => e.speak.length > 20)
  if (longest.length) {
    console.log(`\n${longest.length} entries longer than 20 chars — check none are prose:`)
    for (const e of longest.slice(0, 25)) console.log(`  ${e.speak.length}  "${e.speak}"  <- ${e.sources[0]}`)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
