'use client'
import { useCallback } from 'react'
import { useMute } from './useMute'

export function useSpeak() {
  const { isMuted } = useMute()

  const speak = useCallback((text: string, rate = 0.75, pitch = 1.0) => {
    if (isMuted()) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = rate
    u.pitch = pitch
    // Prefer a high-quality English voice (e.g. Google voices on Android/Chrome)
    // to avoid voiced-consonant devoicing on some system voices
    const voices = window.speechSynthesis.getVoices()
    const voice =
      voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) ||
      voices.find(v => v.lang === 'en-US' && !v.localService) ||
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang.startsWith('en-'))
    if (voice) u.voice = voice
    window.speechSynthesis.speak(u)
  }, [isMuted])

  return speak
}
