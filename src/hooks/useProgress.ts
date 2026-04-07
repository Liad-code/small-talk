'use client'
import { useState, useEffect, useCallback } from 'react'
import type { UserProgress } from '@/types'

const STORAGE_KEY = 'smalltalk_progress'

function load(): UserProgress {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function save(p: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({})

  useEffect(() => {
    setProgress(load())
  }, [])

  const markLessonDone = useCallback((subjectId: string, level: number) => {
    setProgress(prev => {
      const next = {
        ...prev,
        [subjectId]: {
          ...prev[subjectId],
          [level]: { ...prev[subjectId]?.[level], lessonDone: true },
        },
      }
      save(next)
      return next
    })
  }, [])

  const saveQuizScore = useCallback(
    (subjectId: string, level: number, score: number) => {
      const stars = score >= 80 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0
      setProgress(prev => {
        const existing = prev[subjectId]?.[level]
        const next = {
          ...prev,
          [subjectId]: {
            ...prev[subjectId],
            [level]: {
              lessonDone: true,
              quizScore: Math.max(score, existing?.quizScore ?? 0),
              stars:      Math.max(stars, existing?.stars ?? 0),
              gameHighScore: existing?.gameHighScore ?? 0,
            },
          },
        }
        save(next)
        return next
      })
    },
    [],
  )

  const saveGameScore = useCallback(
    (subjectId: string, level: number, score: number) => {
      setProgress(prev => {
        const existing = prev[subjectId]?.[level]
        const next = {
          ...prev,
          [subjectId]: {
            ...prev[subjectId],
            [level]: {
              lessonDone: existing?.lessonDone ?? false,
              quizScore:  existing?.quizScore ?? 0,
              stars:      existing?.stars ?? 0,
              gameHighScore: Math.max(score, existing?.gameHighScore ?? 0),
            },
          },
        }
        save(next)
        return next
      })
    },
    [],
  )

  const getLevelProgress = (subjectId: string, level: number) =>
    progress[subjectId]?.[level] ?? {
      lessonDone: false,
      quizScore: 0,
      stars: 0,
      gameHighScore: 0,
    }

  const isLevelUnlocked = (subjectId: string, level: number): boolean => {
    if (level === 1) return true
    return (progress[subjectId]?.[level - 1]?.stars ?? 0) >= 2
  }

  const totalStars = Object.values(progress).reduce(
    (sum, subj) =>
      sum + Object.values(subj).reduce((s, l) => s + (l.stars ?? 0), 0),
    0,
  )

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }

  return {
    progress,
    markLessonDone,
    saveQuizScore,
    saveGameScore,
    getLevelProgress,
    isLevelUnlocked,
    totalStars,
    resetProgress,
  }
}
