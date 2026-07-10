'use client'
import { useState, useEffect, useCallback } from 'react'
import { pushProgress, PROGRESS_REFRESH_EVENT } from '@/lib/progressSync'

const STORAGE_KEY = 'smalltalk_step1'

interface Step1Progress {
  done: Record<string, boolean> // exerciseKey → completed at least once
  stars: number                 // total stars earned (additive, repeatable)
}

function load(): Step1Progress {
  if (typeof window === 'undefined') return { done: {}, stars: 0 }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { done: {}, stars: 0 }
    const parsed = JSON.parse(raw)
    return {
      done: parsed.done ?? {},
      stars: parsed.stars ?? 0,
    }
  } catch {
    return { done: {}, stars: 0 }
  }
}

export function useStep1Progress() {
  const [progress, setProgress] = useState<Step1Progress>({ done: {}, stars: 0 })

  useEffect(() => {
    const refresh = () => setProgress(load())
    refresh()
    window.addEventListener(PROGRESS_REFRESH_EVENT, refresh)
    return () => window.removeEventListener(PROGRESS_REFRESH_EVENT, refresh)
  }, [])

  /** Call this when an exercise is completed — awards 1 star (repeatable) */
  const markExerciseDone = useCallback((track: string, groupId: string, exercise: string) => {
    const key = `${track}_${groupId}_${exercise}`
    setProgress(prev => {
      const next: Step1Progress = {
        done: { ...prev.done, [key]: true },
        stars: prev.stars + 1,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      pushProgress({ step1: next }) // background server sync when signed in
      return next
    })
  }, [])

  const isExerciseDone = useCallback((track: string, groupId: string, exercise: string) => {
    const key = `${track}_${groupId}_${exercise}`
    return progress.done[key] === true
  }, [progress.done])

  return { progress, markExerciseDone, isExerciseDone, step1Stars: progress.stars }
}
