'use client'
import { useState } from 'react'
import { awardStepStar, useStepStars, type StarStep } from '@/hooks/useStepStars'
import { STEP_STAR_META } from '@/data/stepStarConfig'

/**
 * Drop inside an exercise's completion screen. Shows a "Collect your star!"
 * button; tapping it awards 1 star to the step (repeatable across attempts),
 * plays a little pop animation, and then shows how many stars the learner has
 * for THIS step (e.g. "You have 10 Step 2 stars"). The star is only granted on
 * tap — nothing is awarded just by rendering.
 */
export function StarOnComplete({ step }: { step: StarStep }) {
  const { starsFor } = useStepStars()
  const [collected, setCollected] = useState(false)
  const meta = STEP_STAR_META[step]

  function collect() {
    if (collected) return
    setCollected(true)
    awardStepStar(step)
  }

  if (!collected) {
    return (
      <button
        onClick={collect}
        dir="rtl"
        className={`mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-black text-white
                    bg-gradient-to-r ${meta.chipBg} shadow-lg border-2 ${meta.ring}
                    hover:brightness-110 active:scale-95 transition-all bounce-in`}
      >
        <span className="text-2xl star-wiggle inline-block">⭐</span>
        אספו את הכוכב!
      </button>
    )
  }

  const count = starsFor(step)
  return (
    <div className="mt-3 flex flex-col items-center gap-1" dir="rtl">
      <span className={`text-5xl leading-none star-pop ${meta.star}`}>★</span>
      <p className="font-black text-gray-700 text-sm">
        יש לך {count} כוכבי {meta.he}!
      </p>
      <p className="text-xs font-bold text-gray-400" dir="ltr">
        You have {count} {meta.en} star{count === 1 ? '' : 's'}
      </p>
    </div>
  )
}
