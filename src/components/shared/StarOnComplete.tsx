'use client'
import { awardStepStar, useStepStars, type StarStep } from '@/hooks/useStepStars'
import { StarCollect } from '@/components/shared/StarCollect'

/**
 * Drop inside an exercise's completion screen. Renders the celebratory
 * "collect your star" reward (see StarCollect). The star is only granted when
 * the learner taps Collect — nothing is awarded just by rendering. After
 * collecting it shows the standard Again / Done row (StarActions), so the
 * completion screen must NOT render its own Again/Done/Start-over buttons.
 */
export function StarOnComplete({ step, onAgain, doneHref }: {
  step: StarStep
  /** Replays the exercise after the star is collected (default: reload). */
  onAgain?: () => void
  /** Done destination (default: the step's main page). */
  doneHref?: string
}) {
  const { starsFor } = useStepStars()
  return (
    <StarCollect
      step={step}
      count={starsFor(step)}
      award={() => awardStepStar(step)}
      onAgain={onAgain}
      doneHref={doneHref}
    />
  )
}
