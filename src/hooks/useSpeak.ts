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
    window.speechSynthesis.speak(u)
  }, [isMuted])

  return speak
}
