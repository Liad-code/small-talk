/**
 * What text we actually SEND to ElevenLabs for a given request.
 *
 * This module is BUILD-TIME vocabulary: the generator uses it to decide what
 * to synthesize. The browser never needs it — the browser only needs
 * `audioKey()` to work out which file to play. Keeping the two concerns apart
 * means we can improve a pronunciation spelling here WITHOUT renaming any
 * audio file, because filenames derive from the request, not from this text.
 */

/**
 * Exact pronunciation overrides, keyed by the lowercase request string.
 *
 * This is the correction pathway: when a word is heard to be pronounced wrongly
 * during review, its fix goes here — either a respelling or a <phoneme> tag —
 * and only that one recording is re-rendered. Filenames derive from the REQUEST,
 * so adding an override never renames a file or touches a call site.
 *
 * Re-render just the corrected words with:
 *   node scripts/generate-audio.mjs --only=cat,bed
 */
export const PRONUNCIATION_OVERRIDES: Record<string, string> = {
  // HOMOGRAPHS — spelling alone cannot tell the engine which word is meant.
  // "wind" is the weather (/wɪnd/), never "to wind" (/waɪnd/).
  // NOTE: <phoneme> tags are honoured by the English-only models
  // (turbo_v2 / flash_v2). They are NOT reliable on multilingual_v2.
  wind: '<phoneme alphabet="cmu-arpabet" ph="W IH1 N D">wind</phoneme>',

  // Display strings that are a PAIR, not a word. Spoken as two words rather
  // than letting the engine read the slash.
  'up / down': 'up, down',

  // A trailing period changes how the engine shapes the end of an utterance.
  // Confirmed by ear: bare "you" was wrong, "you." is right.
  you: 'you.',

  // Letters whose names came out wrong as both ARPAbet and as plain spellings,
  // but are correct in IPA. Overrides are checked before the letter tables, so
  // these win over LETTER_HOMOPHONE / LETTER_ARPABET.
  k: '<phoneme alphabet="ipa" ph="keɪ">k</phoneme>',
  f: '<phoneme alphabet="ipa" ph="ɛf">f</phoneme>',

  // A capital letter followed by a period is read as the LETTER NAME rather
  // than sounded out as a word. This succeeded for R and N where every
  // spelling, ARPAbet and IPA attempt failed ("en" kept coming out as "in").
  r: 'R.',
  n: 'N.',

  // 25 and 26 alone needed terminal punctuation; their neighbours 24 and 29 are
  // correct without it. Sampling variance, now pinned by seed.
  //
  // DEAD for synthesis since 2026-10-31. All of 20-29 were re-recorded to fix
  // the dropped /t/ of "twenty" ("twenny"), and the text actually sent now comes
  // from scripts/melody-text.json, which wins over this table — 25 is sent as
  // "twen-tee-five". These two entries still shape the `speak` field in the
  // manifest, so removing them would be a no-op for audio, but do not expect a
  // change here to alter what either number sounds like.
  25: 'twenty-five.',
  26: 'twenty-six.',
}

/**
 * Letter names in CMU ARPAbet — the phonetic spelling of each letter's NAME.
 *
 * This replaces guessing at spellings. Rendering "ay" and hoping the engine
 * produces /eɪ/ failed: it produced /aɪ/. ARPAbet states the sound directly, so
 * the engine has nothing to interpret. Verified as honoured on
 * `eleven_turbo_v2`; the tag markup is not billed as characters.
 *
 * Digits are stress markers: 1 = primary stress, 0 = unstressed.
 * Z is the American "zee" (Z IY1); British "zed" would be `Z EH1 D`.
 */
export const LETTER_ARPABET: Record<string, string> = {
  a: 'EY1',        b: 'B IY1',   c: 'S IY1',   d: 'D IY1',  e: 'IY1',
  f: 'EH1 F',      g: 'JH IY1',  h: 'EY1 CH',  i: 'AY1',    j: 'JH EY1',
  k: 'K EY1',      l: 'EH1 L',   m: 'EH1 M',   n: 'EH1 N',  o: 'OW1',
  p: 'P IY1',      q: 'K Y UW1', r: 'AA1 R',   s: 'EH1 S',  t: 'T IY1',
  u: 'Y UW1',      v: 'V IY1',   w: 'D AH1 B AH0 L Y UW1',
  x: 'EH1 K S',    y: 'W AY1',   z: 'Z IY1',
}

/**
 * Letter names that are ordinary English WORDS.
 *
 * Used for the 15 letters whose ARPAbet renders were rejected during review.
 * Phoneme-tag support turned out to be inconsistent across letters — "b" as
 * `B IY1` was accepted while "p" as `P IY1` was not — so for these the safer
 * input is a real dictionary word the engine already knows how to say.
 *
 * The other 11 letters (a, b, d, j, l, o, q, w, x, y, z) passed review with
 * ARPAbet and deliberately keep it: "ay" for A was rejected as /aɪ/ early on,
 * which is exactly the failure a plain spelling reintroduces.
 */
export const LETTER_HOMOPHONE: Record<string, string> = {
  c: 'see',  e: 'ee',   f: 'eff',  g: 'gee',  h: 'aitch',
  i: 'eye',  k: 'kay',  m: 'em',   n: 'en',   p: 'pea',
  r: 'are',  s: 'ess',  t: 'tea',  u: 'you',  v: 'vee',
}

/**
 * The text to send for a single letter: a real word where review preferred one,
 * otherwise the ARPAbet phoneme tag.
 */
export function toLetterTagText(letter: string): string {
  const lc = letter.trim().toLowerCase()
  if (LETTER_HOMOPHONE[lc]) return LETTER_HOMOPHONE[lc]
  const ph = LETTER_ARPABET[lc]
  if (!ph) return letter
  return `<phoneme alphabet="cmu-arpabet" ph="${ph}">${lc}</phoneme>`
}

/**
 * Explicit English letter NAMES for all 26 letters.
 *
 * Handing a bare character to any TTS engine is ambiguous — "a" can come back
 * as the /æ/ sound rather than the name /eɪ/, and "v" is routinely read as a
 * /v/ buzz. Since the app teaches letter names to children who cannot yet
 * read, every letter is spelled out explicitly rather than trusting the engine.
 *
 * STATUS: UNVERIFIED. These spellings have NOT been confirmed by ear. They are
 * approximations of how an English speaker would write each letter name, and at
 * least one was already wrong in practice — "ay" for A was rendered as /aɪ/
 * instead of /eɪ/. Do not treat this table as correct until each entry has been
 * listened to via scripts/build-review-page.mjs, or replaced with <phoneme>
 * tags, which specify the sound directly instead of hoping a spelling lands.
 */
export const LETTER_NAMES: Record<string, string> = {
  a: 'ay',   b: 'bee',  c: 'see',  d: 'dee',  e: 'ee',
  f: 'eff',  g: 'jee',  h: 'aitch', i: 'eye', j: 'jay',
  k: 'kay',  l: 'ell',  m: 'em',   n: 'en',   o: 'oh',
  p: 'pee',  q: 'cue',  r: 'ar',   s: 'ess',  t: 'tee',
  u: 'you',  v: 'vee',  w: 'double-you', x: 'ex', y: 'why', z: 'zee',
}

/** Short phoneme sounds for each letter (Track B). */
export const SHORT_PHONEMES: Record<string, string> = {
  a: 'ah',   b: 'buh', c: 'kuh', d: 'duh', e: 'eh',
  f: 'fuh',  g: 'guh', h: 'huh', i: 'ih',  j: 'juh',
  k: 'kuh',  l: 'luh', m: 'muh', n: 'nuh', o: 'oh',
  p: 'puh',  q: 'kwuh', r: 'ruh', s: 'suh', t: 'tuh',
  u: 'uh',   v: 'vuh', w: 'wuh', x: 'ks',  y: 'yuh', z: 'zuh',
}

/**
 * Maps a request string to the text ElevenLabs should speak.
 *
 * Only STANDALONE single letters are rewritten — words that merely contain a
 * letter ("van", "five") and every other string pass through untouched, so
 * there is no way for this to corrupt a word.
 */
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

/**
 * Spells a number in English.
 *
 * A bare numeral carries no language, so a multilingual voice may read "12" in
 * any language it likes — review found exactly that. Sending "twelve" removes
 * the ambiguity at the source.
 */
export function numberToWords(n: number): string {
  if (!Number.isFinite(n) || n < 0) return String(n)
  if (n < 20) return ONES[n]
  if (n < 100) {
    const t = TENS[Math.floor(n / 10)]
    const r = n % 10
    return r ? `${t}-${ONES[r]}` : t
  }
  if (n < 1000) {
    const h = `${ONES[Math.floor(n / 100)]} hundred`
    const r = n % 100
    return r ? `${h} and ${numberToWords(r)}` : h
  }
  return String(n)
}

/**
 * Normalizes casing and numerals before synthesis.
 *
 * Two failures found during review, both invisible in the text and obvious in
 * the audio:
 *  - ALL-CAPS words are read as ACRONYMS ("GEM" as "G-E-M"), because caps are
 *    how you write an initialism. The app stores many words capitalised for
 *    display, which is a rendering choice, not a pronunciation instruction.
 *  - Numerals get voiced in whatever language the model infers.
 */
function normalizeForSpeech(text: string): string {
  let out = text

  // Lowercase all-caps RUNS only; leaves "Monday" and "I" alone.
  out = out.replace(/\b[A-Z]{2,}\b/g, w => w.toLowerCase())

  // Numerals anywhere in the string: "Group 5" -> "Group five".
  out = out.replace(/\d+/g, d => numberToWords(Number(d)))

  return out
}

export function toSpokenText(text: string): string {
  const trimmed = text.trim()
  const lc = trimmed.toLowerCase()

  // A reviewed correction always wins, including over the letter table.
  if (lc in PRONUNCIATION_OVERRIDES) return PRONUNCIATION_OVERRIDES[lc]

  // Standalone letters go out as phoneme tags, not as respellings.
  if (/^[a-z]$/i.test(trimmed)) {
    return toLetterTagText(lc)
  }

  return normalizeForSpeech(trimmed)
}

/**
 * Which render profile an entry belongs to. Letters and words were tuned
 * separately by ear and use different models and voice settings:
 *   word   — multilingual_v2, flat delivery (keeps final consonants crisp)
 *   letter — turbo_v2 + phoneme tags, happier delivery, slower
 */
export function profileFor(request: string, variant?: string): 'letter' | 'word' {
  if (variant === 'sound') return 'letter'
  return /^[a-z]$/i.test(request.trim()) ? 'letter' : 'word'
}

/**
 * Track B plays a letter name followed by its short sound. Pre-generation lets
 * us bake both into ONE file, which removes the fragile `onend` utterance
 * chaining the Web Speech version needed (and which broke on iOS Safari).
 * The period gives ElevenLabs a natural pause between the two.
 */
export function toLetterWithSoundText(letter: string): string {
  const lc = letter.trim().toLowerCase()
  // Phoneme tag for the NAME (so it is exact), plain text for the short sound.
  const name = toLetterTagText(lc)
  const phoneme = SHORT_PHONEMES[lc] ?? lc
  return `${name}. ${phoneme}.`
}
