'use client'
import { useCallback } from 'react'
import { useMute } from './useMute'
import { toSpokenText, getEnglishVoice } from '@/utils/speakLetterSound'

export function useSpeak() {
  const { isMuted } = useMute()

  const speak = useCallback((text: string, rate = 0.75, pitch = 1.0) => {
    if (isMuted()) return
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    const synth = window.speechSynthesis

    // Unstick synthesis if a previous utterance left it paused/stuck (Chrome bug).
    try { synth.resume() } catch { /* ignore */ }
    synth.cancel()

    // Correct standalone-letter names (e.g. "v" → "vee") for every caller;
    // words and all other text pass through unchanged.
    const u = new SpeechSynthesisUtterance(toSpokenText(text))
    u.lang = 'en-US'
    u.rate = rate
    u.pitch = pitch
    const voice = getEnglishVoice()
    if (voice) u.voice = voice

    // Chrome drops an utterance when speak() fires immediately after cancel();
    // a short delay makes playback reliable (so words like "cake" never go silent).
    window.setTimeout(() => {
      try { synth.resume() } catch { /* ignore */ }
      synth.speak(u)
    }, 60)
  }, [isMuted])

  return speak
}
