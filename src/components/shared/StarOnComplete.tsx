'use client'
import { useEffect, useRef } from 'react'
import { awardStepStar, type StarStep } from '@/hooks/useStepStars'

/**
 * Drop inside an exercise's completion screen: awards 1 star to the step
 * exactly once per mount (repeatable across attempts) and shows a "+1 ⭐" pill.
 */
export function StarOnComplete({ step }: { step: StarStep }) {
  const awarded = useRef(false)

  useEffect(() => {
    if (awarded.current) return
    awarded.current = true
    awardStepStar(step)
  }, [step])

  return (
    <div className="inline-flex items-center gap-1 bg-yellow-100 border-2 border-yellow-300 rounded-full px-3 py-1 mt-2 bounce-in">
      <span className="text-lg">⭐</span>
      <span className="font-black text-yellow-700 text-sm">+1</span>
    </div>
  )
}
