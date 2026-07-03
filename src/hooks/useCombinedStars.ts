'use client'
import { useProgress } from './useProgress'
import { useStep1Progress } from './useStep1Progress'
import { useStepStars } from './useStepStars'

/** Returns the sum of all stars earned across the main subjects and Steps 1-6 exercises */
export function useCombinedStars() {
  const { totalStars } = useProgress()
  const { step1Stars } = useStep1Progress()
  const { totalStepStars } = useStepStars()
  return totalStars + step1Stars + totalStepStars
}
