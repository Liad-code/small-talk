'use client'
import { useProgress } from './useProgress'
import { useStep1Progress } from './useStep1Progress'

/** Returns the sum of all stars earned across the main subjects and Step 1 exercises */
export function useCombinedStars() {
  const { totalStars } = useProgress()
  const { step1Stars } = useStep1Progress()
  return totalStars + step1Stars
}
