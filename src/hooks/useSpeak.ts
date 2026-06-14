'use client'
import { useCallback } from 'react'
import { useMute } from './useMute'

// Cache voices — getVoices() is often empty on the first call until the
// browser fires `voiceschanged`.
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

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  // Prefer a high-quality English voice (e.g. Google voices on Android/Chrome)
  // to avoid voiced-consonant devoicing on some system voices.
  return (
    voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) ||
    voices.find(v => v.lang === 'en-US' && !v.localService) ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en-'))
  )
}

export function useSpeak() {
  const { isMuted } = useMute()

  const speak = useCallback((text: string, rate = 0.75, pitch = 1.0) => {
    if (isMuted()) return
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    const synth = window.speechSynthesis

    // Unstick synthesis if a previous utterance left it paused/stuck (Chrome bug).
    try { synth.resume() } catch { /* ignore */ }
    synth.cancel()

    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = rate
    u.pitch = pitch
    const voice = pickVoice(cachedVoices.length ? cachedVoices : synth.getVoices())
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
