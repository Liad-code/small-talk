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
export function StarOnComplete({ step, rounds = 1, onAgain, doneHref }: {
  step: StarStep
  /** Rounds completed in this run — one star each (spec 8.11). */
  rounds?: number
  /** Replays the exercise after the star is collected (default: reload). */
  onAgain?: () => void
  /** Done destination (default: this topic page, fresh). Single-exercise pages pass their back-link page. */
  doneHref?: string
}) {
  const { starsFor } = useStepStars()
  return (
    <StarCollect
      step={step}
      count={starsFor(step)}
      amount={rounds}
      award={() => awardStepStar(step, rounds)}
      onAgain={onAgain}
      doneHref={doneHref}
    />
  )
}
