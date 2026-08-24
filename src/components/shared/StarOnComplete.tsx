'use client'
import { awardStepStar, useStepStars, type StarStep } from '@/hooks/useStepStars'
import { StarCollect } from '@/components/shared/StarCollect'

/**
 * Drop inside an exercise's completion screen. Renders the celebratory
 * "collect your star" reward (see StarCollect). The star is only granted when
 * the learner taps Collect — nothing is awarded just by rendering.
 */
export function StarOnComplete({ step }: { step: StarStep }) {
  const { starsFor } = useStepStars()
  return (
    <StarCollect
      step={step}
      count={starsFor(step)}
      award={() => awardStepStar(step)}
    />
  )
}
