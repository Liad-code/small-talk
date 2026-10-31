'use client'
import { useEffect, useRef } from 'react'

/**
 * Rendered on an exercise's FINAL round: after a short celebration beat it
 * hands off to the exercise's star screen (spec 25.10 — star first, then the
 * standard Again / Done row; no pre-star Again/Done).
 */
export function AutoFinish({ onFinish, delayMs = 1200 }: { onFinish: () => void; delayMs?: number }) {
  const cb = useRef(onFinish)
  cb.current = onFinish
  useEffect(() => {
    const t = setTimeout(() => cb.current(), delayMs)
    return () => clearTimeout(t)
  }, [delayMs])
  return null
}
