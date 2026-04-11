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

// Letter names that some TTS voices mispronounce when given a single char
const LETTER_NAMES: Record<string, string> = {
  z: 'zee', g: 'gee', h: 'aitch', w: 'double-u',
}

function getPreferredVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) ||
    voices.find(v => v.lang === 'en-US' && !v.localService) ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en-'))
  )
}

/**
 * Speaks the letter name, then (if soundMode=true) the short phoneme.
 * Sequential playback is guaranteed via onend chaining.
 */
export function speakLetter(letter: string, isMuted: () => boolean, soundMode = false): void {
  if (isMuted() || typeof window === 'undefined') return
  window.speechSynthesis.cancel()

  const voice = getPreferredVoice()
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
