'use client'
import { useState, useEffect, useCallback } from 'react'
import { pushProgress } from '@/lib/progressSync'

const STORAGE_KEY = 'smalltalk_stepstars'
const CHANGE_EVENT = 'smalltalk-stepstars-change'

export type StarStep = 'step2' | 'step3' | 'step4' | 'step5' | 'step6' | 'step7'

type StepStars = Record<string, number> // step id → total stars (additive, repeatable)

function load(): StepStars {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StepStars) : {}
  } catch {
    return {}
  }
}

/**
 * Award stars to a step (standalone, safe outside React render). `amount` is
 * the number of rounds the child completed (spec 8.11: one star per round).
 */
export function awardStepStar(step: StarStep, amount = 1) {
  if (typeof window === 'undefined') return
  const current = load()
  const next = { ...current, [step]: (current[step] ?? 0) + Math.max(1, Math.floor(amount)) }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  pushProgress({ stepStars: next }) // background server sync when signed in
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Per-step star totals for Steps 2-6 (Step 1 keeps its own store). */
export function useStepStars() {
  const [stars, setStars] = useState<StepStars>({})

  useEffect(() => {
    const refresh = () => setStars(load())
    refresh()
    window.addEventListener(CHANGE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const starsFor = useCallback((step: StarStep) => stars[step] ?? 0, [stars])
  const totalStepStars = Object.values(stars).reduce((sum, n) => sum + n, 0)

  return { starsFor, totalStepStars }
}
