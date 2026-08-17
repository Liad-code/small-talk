/**
 * Shared utility for Track B phonics playback.
 * Plays letter name → short phoneme sound using the preferred TTS voice.
 * Uses onend chaining so the second utterance only starts after the first
 * finishes — required for reliable playback on iOS Safari and Android.
 */

// Short phoneme sounds for each letter of the alphabet
export const SHORT_PHONEMES: Record<string, string> = {
  a: 'ah',   b: 'buh', c: 'kuh', d: 'duh', e: 'eh',
  f: 'fuh',  g: 'guh', h: 'huh', i: 'ih',  j: 'juh',
  k: 'kuh',  l: 'luh', m: 'muh', n: 'nuh', o: 'oh',
  p: 'puh',  q: 'kwuh',r: 'ruh', s: 'suh', t: 'tuh',
  u: 'uh',   v: 'vuh', w: 'wuh', x: 'ks',  y: 'yuh', z: 'zuh',
}

// Letter names that some TTS voices mispronounce when handed a single bare
// character (e.g. "v" is read as the /v/ sound, not the letter name "vee").
// Single source of truth — used by speakLetter() and by toSpokenText() so every
// speech path in the app spells these letters the same way.
export const LETTER_NAMES: Record<string, string> = {
  z: 'zee', g: 'gee', h: 'aitch', w: 'double-u', v: 'vee',
}

/**
 * Normalizes text before it is spoken by ANY TTS path in the app.
 *
 * If `text` is a STANDALONE letter that TTS engines commonly mispronounce
 * (v, z, g, h, w), it is replaced with the explicit English letter-name
 * spelling ("v" → "vee"). This is context-specific: it only ever fires when
 * the whole string is a single A–Z letter, so words that merely CONTAIN the
 * letter ("van", "five", "love", …) and every other input are returned
 * completely unchanged — guaranteeing no regressions for words or other letters.
 *
 * Because this normalization lives at the utterance layer, the fix is engine-
 * and voice-agnostic: it works identically across every browser, OS, and voice
 * provider, since the corrected spelling is what gets handed to the engine.
 */
export function toSpokenText(text: string): string {
  const trimmed = text.trim()
  if (/^[a-z]$/i.test(trimmed)) {
    return LETTER_NAMES[trimmed.toLowerCase()] ?? text
  }
  return text
}

// ── Shared voice selection ────────────────────────────────────────────────────
// One picker used by EVERY speech path in the app (speakLetter, useSpeak,
// VoiceButton) so the whole webapp speaks with the same voice. getVoices() is
// frequently empty on the first call until the browser fires `voiceschanged`,
// so we cache the list and refresh on that event — otherwise a letter tapped
// early falls back to the device default voice, which is often the one that
// mispronounces "V".
let cachedVoices: SpeechSynthesisVoice[] = []
function refreshVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const v = window.speechSynthesis.getVoices()
  if (v.length) cachedVoices = v
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  refreshVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices)
}

/**
 * The single preferred English voice for the whole app. Prefers a high-quality
 * network voice (Google en-US on Android/Chrome/desktop) and otherwise the best
 * available en-US / en-* voice on the device (e.g. a Siri voice on iOS). Falling
 * back to the OS default only as a last resort keeps letter names like "V" clear
 * and the voice identical across every screen in the app.
 */
export function getEnglishVoice(): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !window.speechSynthesis) return undefined
  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices()
  return (
    voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) ||
    voices.find(v => v.lang === 'en-US' && !v.localService) ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en-')) ||
    voices.find(v => v.default)
  )
}

/**
 * Speaks the letter name, then (if soundMode=true) the short phoneme.
 * Sequential playback is guaranteed via onend chaining.
 */
export function speakLetter(letter: string, isMuted: () => boolean, soundMode = false): void {
  if (isMuted() || typeof window === 'undefined') return
  window.speechSynthesis.cancel()

  const voice = getEnglishVoice()
  const lc = letter.toLowerCase()

  const letterName = LETTER_NAMES[lc] ?? letter.toUpperCase()
  const u1 = new SpeechSynthesisUtterance(letterName)
  u1.lang = 'en-US'
  u1.rate = 0.85
  u1.pitch = 1.1
  if (voice) u1.voice = voice

  if (soundMode) {
    const phoneme = SHORT_PHONEMES[lc] ?? lc
    const u2 = new SpeechSynthesisUtterance(phoneme)
    u2.lang = 'en-US'
    u2.rate = 0.8
    u2.pitch = 1.0
    if (voice) u2.voice = voice

    // Chain: only speak u2 after u1 has finished
    u1.onend = () => {
      if (!isMuted()) window.speechSynthesis.speak(u2)
    }
  }

  window.speechSynthesis.speak(u1)
}
