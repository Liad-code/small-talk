/**
 * The app's single audio output.
 *
 * Everything the app says goes through ONE reusable HTMLAudioElement rather
 * than a new element per sound. That choice solves three problems at once:
 *
 *  - iOS Safari only allows programmatic playback on an element that a user
 *    gesture has already unlocked. Sharing one element means the child's first
 *    tap unlocks audio for the whole session, so later non-gesture playback
 *    (autoplay, sequenced prompts) works. Per-sound elements would each need
 *    their own gesture and would fall silent.
 *  - Assigning `src` cancels whatever is playing, which reproduces the
 *    `speechSynthesis.cancel()` semantics the exercises already depend on.
 *  - No audio objects accumulate across hundreds of taps.
 *
 * There is deliberately NO fallback engine. Pace and voice are baked into the
 * generated MP3s, so pronunciation is byte-identical on every device — which is
 * the whole point of pre-generating. A missing file is therefore a build
 * problem, and the dev-only listener below makes it loud instead of silent.
 */

import { audioUrl } from './audioKey'

let el: HTMLAudioElement | null = null
let lastRequest = ''

function element(): HTMLAudioElement {
  if (el) return el
  el = new Audio()
  el.preload = 'auto'

  if (process.env.NODE_ENV !== 'production') {
    el.addEventListener('error', () => {
      console.error(
        `[audio] no file for "${lastRequest}" (${el?.src}).\n` +
        `Run: node scripts/build-manifest.mjs && node scripts/generate-audio.mjs`
      )
    })
  }
  return el
}

/**
 * Speaks `text`, interrupting anything already playing.
 *
 * @param variant selects an alternate recording of the same request —
 *   `'sound'` is the letter-name-plus-short-phoneme file used by Track B.
 */
export function playAudio(text: string, variant?: string): void {
  if (typeof window === 'undefined') return

  const audio = element()
  const url = audioUrl(text, variant)
  lastRequest = variant ? `${text} (${variant})` : text

  audio.pause()
  // Re-assigning the same src does not reliably restart playback, so a repeat
  // tap on the same letter rewinds instead. Children tap the same card often.
  if (audio.src && new URL(audio.src, window.location.href).pathname === url) {
    audio.currentTime = 0
  } else {
    audio.src = url
  }

  // Rejects when the next tap interrupts this one, or before the first gesture
  // has unlocked audio. Neither is actionable, and neither should throw.
  audio.play().catch(() => {})
}

/** Stops playback — the equivalent of the old `speechSynthesis.cancel()`. */
export function stopAudio(): void {
  if (el) el.pause()
}
