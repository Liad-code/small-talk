/**
 * Render profiles — the voice settings behind every generated file.
 *
 * Every value here was chosen by ear during calibration, not guessed. The two
 * profiles exist because letters and words wanted genuinely different
 * treatment, and picking the better option for each beat forcing one setting
 * on both.
 *
 * Trade-off worth remembering: the two profiles use different models, so the
 * voice's timbre shifts slightly between a letter and a word. That was the
 * accepted cost of each sounding right on its own terms.
 */

import { readFileSync } from 'node:fs'

/** Matilda — American, middle-aged female, tagged informative_educational. */
export const VOICE_ID = 'XrExE9yKIg1WjnnlVkGX'

export const PROFILES = {
  /**
   * Words, phrases and digits.
   *
   * Flat delivery, chosen over warmer options because expressiveness erodes
   * final consonants (/t/, /d/, /k/) — the exact sounds Hebrew-speaking
   * learners drop, and therefore the ones the app must articulate clearly.
   * Confirmed by ear: "cat-multi-flat is perfect".
   */
  word: {
    // ENGLISH-ONLY model, and that is the point.
    //
    // eleven_multilingual_v2 was used first and auto-detected the wrong
    // language on ordinary words — "banana", "van", "car", "idea", "zebra" are
    // real words in Spanish/Dutch/Italian and came out in those languages.
    // Calibration missed it because it was done on "cat", which is unambiguous
    // in every language. turbo_v2 cannot switch language, so the whole class of
    // bug is impossible rather than merely unlikely.
    model: 'eleven_turbo_v2',
    settings: {
      stability: 0.75,
      similarity_boost: 0.75,
      style: 0,
      use_speaker_boost: true,
      speed: 0.8,
    },
  },

  /**
   * Single letters, sent as CMU-ARPAbet <phoneme> tags.
   *
   * turbo_v2 both honours phoneme tags and sounds warmer than flash_v2. A
   * happier delivery is wanted here — a letter name has no final consonant to
   * protect the way a word like "cat" does, so expressiveness costs nothing.
   */
  letter: {
    model: 'eleven_turbo_v2',
    settings: {
      stability: 0.40,
      similarity_boost: 0.75,
      style: 0.5,
      use_speaker_boost: true,
      // 0.70 confirmed by ear across A, T and F. This is also ElevenLabs' hard
      // minimum — 0.65 and below return 400 invalid_voice_settings — so slower
      // than this would require offline time-stretching, which proved unnecessary.
      speed: 0.70,
    },
  },
}

/**
 * Per-string exceptions, keyed by the lowercase REQUEST.
 *
 * Some strings simply render better under different conditions, established by
 * listening rather than reasoning. Kept here so the profiles stay meaningful and
 * the exceptions stay visible.
 *
 *   model   — use a different (still English-only) model for this string
 *   profile — borrow the other profile's voice settings
 *   seed    — pin a specific render (see seedFor below)
 */
export const ENTRY_OVERRIDES = {
  // "crab" was consistently wrong on turbo; flash renders it correctly.
  crab: { model: 'eleven_flash_v2' },
  // Letter M's name is a short, two-phoneme word that the expressive letter
  // settings smeared; the flat word settings say it cleanly.
  m: { profile: 'word' },
  // Letter E needed BOTH the other model and the flat settings.
  e: { model: 'eleven_flash_v2', profile: 'word' },
}

/**
 * Files installed directly from an APPROVED calibration render, mapped
 * request -> scripts/_calibrate id.
 *
 * These were approved by ear before `seed` was introduced, so the API sampled
 * them randomly and the exact take cannot be reproduced. Re-rendering would
 * roll a different sample, which is not automatically as good — letter S was
 * judged wrong and then right on identical settings, purely from sampling.
 * Installing the approved take is therefore safer than regenerating it.
 *
 * The pipeline config above still describes how each was produced, so a
 * regeneration lands close. If you DO re-render these, re-listen to them.
 */
export const APPROVED_TAKES = {
  e:  'E-5-flash-flat',
  r:  'R-4-capital',
  n:  'N-4-capital',
  25: 'X25-2-period',
  26: 'X26-2-period',
  // These were re-rendered through the pipeline first, which produced DIFFERENT
  // samples from the ones actually approved — the config was right but the take
  // was a fresh roll. Installed from the approved renders instead.
  crab: 'W-crab-2-flash',
  you:  'W-you-3-period',
  m:    'L-m-4-flat',
  k:    'L-k-2-ipa',
  f:    'L-f-2-ipa',
  // S is the clearest case for doing this: the same text and settings were
  // judged wrong in one round and right in the next. Only the approved take is
  // known good.
  s:    'L-s-1-current',
}

/** Profile (model + settings) for an entry, applying any per-string override. */
export function profileOf(entry) {
  const base = PROFILES[entry.profile] ?? PROFILES.word
  const ov = ENTRY_OVERRIDES[entry.request?.toLowerCase()]
  if (!ov) return base

  const from = ov.profile ? (PROFILES[ov.profile] ?? base) : base
  return { model: ov.model ?? from.model, settings: from.settings }
}

/**
 * Re-roll counts, keyed by the lowercase REQUEST: `{ "banana": 2 }`.
 *
 * Written by regenerate-rejected.mjs, which increments a word's count each time
 * review rejects its current take. A count of 0 (or an absent file) reproduces
 * exactly the seeds this pipeline has always used, so audio already approved is
 * untouched by this mechanism existing.
 *
 * This is the documented "change the number until it sounds right" loop, moved
 * out of ENTRY_OVERRIDES so that hand-authored exceptions stay hand-authored
 * and a machine-driven re-roll never rewrites this file. ENTRY_OVERRIDES still
 * wins over anything here.
 */
let REROLLS = {}
try {
  REROLLS = JSON.parse(readFileSync(new URL('./reroll-seeds.json', import.meta.url), 'utf8'))
} catch { /* no re-rolls yet — every seed is the original derived one */ }

/** How many times a string has been re-rolled. */
export function rerollCountFor(request) {
  return Number(REROLLS[String(request ?? '').toLowerCase()] ?? 0)
}

/**
 * EXACT seeds for takes chosen by the melody search, keyed by lowercase
 * REQUEST: `{ "cloud": 2847193056 }`.
 *
 * Why this exists: review rejected 78 words not for pronunciation but for
 * MELODY — the approved words fall about 5 semitones from start to end, while
 * the rejected ones were flat or rising. Voice settings control how MUCH the
 * pitch moves, not which direction, so no settings change fixes it. What works
 * is re-rolling the seed at IDENTICAL settings until the contour lands, which
 * keeps the timbre matching the 636 files already approved.
 *
 * The winning seed is not derivable from the key — it came out of a search —
 * so it has to be recorded, or a later `--force` would re-render these words
 * with the derived seed and silently throw away audio a human approved.
 *
 * Machine-written by the install step, like reroll-seeds.json. ENTRY_OVERRIDES
 * still wins over anything here.
 */
let MELODY_SEEDS = {}
try {
  MELODY_SEEDS = JSON.parse(readFileSync(new URL('./melody-seeds.json', import.meta.url), 'utf8'))
} catch { /* nothing installed from the melody search yet */ }

/** The chosen seed for a string, or undefined if it has none. */
export function melodySeedFor(request) {
  const v = MELODY_SEEDS[String(request ?? '').toLowerCase()]
  return v === undefined ? undefined : Number(v)
}

/**
 * A stable seed per entry.
 *
 * ElevenLabs sampling is RANDOM: the same text and settings produced audio
 * judged wrong in one review round and right in the next. Deriving the seed from
 * the entry key makes every render reproducible, so re-generating a file cannot
 * silently regress audio that was already approved.
 *
 * The corollary bites when a take is REJECTED: re-rendering with the same seed
 * returns the identical bytes, so a rejected word would come back unchanged.
 * Folding the re-roll count into the hash is what makes "give me a different
 * take" possible while keeping every take reproducible after the fact.
 *
 * A specific seed in ENTRY_OVERRIDES still overrides all of this.
 */
export function seedFor(entry) {
  const ov = ENTRY_OVERRIDES[entry.request?.toLowerCase()]
  if (ov?.seed !== undefined) return ov.seed
  // A seed chosen by the melody search and approved by ear. Must win over the
  // derived seed, or re-rendering would discard the approved take.
  const chosen = melodySeedFor(entry.request)
  if (chosen !== undefined) return chosen
  const reroll = rerollCountFor(entry.request)
  const input = reroll > 0 ? `${entry.key}#${reroll}` : entry.key
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0) % 4294967295
}
