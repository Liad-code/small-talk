'use client'
import { useCallback } from 'react'
import { useMute } from './useMute'
import { playAudio } from '@/utils/audioPlayer'

/**
 * Speaks a word, letter or phrase using the app's pre-generated ElevenLabs
 * audio (Matilda). Pronunciation is therefore identical on every browser,
 * phone and tablet — unlike Web Speech, whose voice varied per device.
 *
 * The signature is unchanged so existing call sites need no edits.
 */
export function useSpeak() {
  const { isMuted } = useMute()

  /**
   * `rate` and `pitch` are accepted but intentionally ignored. Pace is baked
   * into each MP3 at generation time, which is what makes playback identical
   * across devices; applying playbackRate here would reintroduce per-browser
   * resampling differences. Kept in the signature so the ~59 existing call
   * sites continue to compile untouched.
   */
  const speak = useCallback((text: string, _rate = 0.8, _pitch = 1.0) => {
    if (isMuted()) return
    playAudio(text)
  }, [isMuted])

  return speak
}
