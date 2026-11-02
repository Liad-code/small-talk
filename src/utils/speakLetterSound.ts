/**
 * Track A / Track B letter playback, backed by pre-generated ElevenLabs audio.
 *
 * The letter tables moved to spokenText.ts (they are now build-time
 * vocabulary — the generator decides what to send ElevenLabs) and are
 * re-exported here so existing imports keep working.
 *
 * Gone, along with roughly 60 lines of browser-quirk compensation that only
 * existed because Web Speech behaves differently on every device:
 *   - getEnglishVoice() and the cached voice list / `voiceschanged` listener
 *   - the Chrome cancel()/resume() dance and the 60ms setTimeout
 *   - the onend chaining in speakLetter(), which was unreliable on iOS Safari
 */

export { LETTER_NAMES, SHORT_PHONEMES, toSpokenText, toLetterWithSoundText } from './spokenText'

import { playAudio } from './audioPlayer'

/**
 * Speaks the letter name, or — when `soundMode` is true — the letter name
 * followed by its short phoneme.
 *
 * Both are now single audio files. The old version queued two utterances and
 * chained them with `onend`; the second one frequently never fired on iOS
 * Safari, so children heard the name but not the sound. Baking both into one
 * recording removes that failure mode entirely and guarantees the pause
 * between them sounds the same everywhere.
 */
export function speakLetter(letter: string, isMuted: () => boolean, _soundMode = false): void {
  if (isMuted()) return

  // `soundMode` (letter name + short phoneme) is INTENTIONALLY ignored.
  // That Track B feature is being removed from the app, so its audio is no
  // longer generated. Rather than request a file that does not exist — which
  // would be silent, since there is no fallback engine — we play the letter
  // name. Restore by re-enabling the 'sound' variant in build-manifest.mjs and
  // running `generate-audio.mjs --variant=sound`.
  playAudio(letter)
}
