'use client'
import { useState, useEffect, useCallback } from 'react'

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
    setProgress(load())
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
      return next
    })
  }, [])

  const isExerciseDone = useCallback((track: string, groupId: string, exercise: string) => {
    const key = `${track}_${groupId}_${exercise}`
    return progress.done[key] === true
  }, [progress.done])

  return { progress, markExerciseDone, isExerciseDone, step1Stars: progress.stars }
}
