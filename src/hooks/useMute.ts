'use client'
import { useState, useEffect, useCallback } from 'react'

const MUTE_KEY = 'smalltalk_muted'
const MUTE_EVENT = 'smalltalk-mute-change'

export function useMute() {
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    setMuted(localStorage.getItem(MUTE_KEY) === 'true')
    const sync = () => setMuted(localStorage.getItem(MUTE_KEY) === 'true')
    window.addEventListener(MUTE_EVENT, sync)
    return () => window.removeEventListener(MUTE_EVENT, sync)
  }, [])

  const toggleMute = useCallback(() => {
    const next = localStorage.getItem(MUTE_KEY) !== 'true'
    localStorage.setItem(MUTE_KEY, String(next))
    window.dispatchEvent(new Event(MUTE_EVENT))
    setMuted(next)
  }, [])

  /** Call before playing any sound — returns true if audio should be skipped */
  const isMuted = () =>
    typeof window !== 'undefined' && localStorage.getItem(MUTE_KEY) === 'true'

  return { muted, toggleMute, isMuted }
}
