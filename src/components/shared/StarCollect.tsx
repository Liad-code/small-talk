'use client'
import { useState } from 'react'
import { STEP_STAR_META, trophyTiers } from '@/data/stepStarConfig'

/**
 * The "collect your star" reward moment. Idle = a glowing, bobbing star that
 * begs to be tapped; on tap = a burst of sparkles, a shockwave, a flying "+1",
 * the total count slamming in, a cheer, and a nudge toward the next trophy — so
 * a kid feels a real prize and wants to keep earning stars.
 */

const PRAISE: { he: string; en: string }[] = [
  { he: 'וואו!',        en: 'Wow!' },
  { he: 'כל הכבוד!',    en: 'Well done!' },
  { he: 'כוכב-על!',     en: 'Superstar!' },
  { he: 'מדהים!',       en: 'Amazing!' },
  { he: 'איזה יופי!',   en: 'Fantastic!' },
  { he: 'אלוף/ה!',      en: 'You rock!' },
]

// Deterministic radial burst so there are no hydration surprises.
const BURST = Array.from({ length: 14 }, (_, i) => {
  const ang = (i / 14) * Math.PI * 2 + (i % 2 ? 0.24 : 0)
  const dist = 64 + (i % 4) * 15
  return {
    id: i,
    tx: Math.round(Math.cos(ang) * dist),
    ty: Math.round(Math.sin(ang) * dist),
    delay: (i % 5) * 22,
    dur: 620 + (i % 4) * 130,
    size: 12 + (i % 3) * 6,
    glyph: ['✨', '⭐', '🌟', '💫'][i % 4],
  }
})

function playCollectSound() {
  if (typeof window === 'undefined') return
  try {
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const notes = [784, 988, 1175, 1568, 2093] // G5 B5 D6 G6 C7 — a bright rising sparkle
    notes.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'triangle'
      o.frequency.value = f
      const t = ctx.currentTime + i * 0.06
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.22, t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.28)
      o.start(t); o.stop(t + 0.3)
    })
  } catch { /* audio unavailable */ }
}

export function StarCollect({
  step,
  count,
  award,
  children,
}: {
  step: string
  count: number
  award: () => void
  children?: React.ReactNode   // e.g. Again / Done buttons — shown only AFTER collecting
}) {
  const [collected, setCollected] = useState(false)
  const meta = STEP_STAR_META[step]
  const nextTier = trophyTiers(step).find(t => count < t)

  function collect() {
    if (collected) return
    setCollected(true)
    award()
    playCollectSound()
  }

  if (!collected) {
    return (
      <div className="flex flex-col items-center gap-1.5 mt-3">
        <button
          onClick={collect}
          dir="rtl"
          aria-label="Collect your star"
          className={`relative overflow-hidden rounded-full px-7 py-3.5 font-black text-white text-lg
                      bg-gradient-to-r ${meta.chipBg} border-2 ${meta.ring}
                      shadow-[0_8px_0_rgba(0,0,0,0.12)] active:translate-y-1 active:shadow-[0_3px_0_rgba(0,0,0,0.12)]
                      transition-all star-glow`}
        >
          <span className="pointer-events-none absolute inset-0 star-shine" />
          <span className="relative inline-flex items-center gap-2">
            <span className="text-2xl star-bob inline-block">⭐</span>
            אספו את הכוכב!
          </span>
        </button>
        <span className="text-xs font-bold text-gray-400 star-hint" dir="rtl">👆 לחצו כדי לאסוף</span>
      </div>
    )
  }

  const praise = PRAISE[count % PRAISE.length]

  return (
    <div className="relative flex flex-col items-center mt-3 select-none" dir="rtl">
      {/* Burst stage */}
      <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
        <span className={`absolute rounded-full border-4 ${meta.ring} shockwave`} style={{ width: 60, height: 60 }} />
        <span className="absolute rounded-full bg-white flash" style={{ width: 72, height: 72 }} />
        <span className={`absolute rounded-full ${meta.soft} blur-md`} style={{ width: 58, height: 58 }} />
        {BURST.map(p => {
          const s: Record<string, string | number> = {
            fontSize: p.size,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.dur}ms`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
          }
          return (
            <span key={p.id} className="absolute spark-fly leading-none" style={s as React.CSSProperties}>
              {p.glyph}
            </span>
          )
        })}
        <span className={`relative leading-none star-prize ${meta.star}`} style={{ fontSize: 58 }}>★</span>
        <span className={`absolute font-black text-2xl plus-one ${meta.star}`}>+1</span>
      </div>

      {/* Total count slams in */}
      <div className={`-mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-white font-black
                       bg-gradient-to-r ${meta.chipBg} shadow-lg count-slam`}>
        <span className="text-xl leading-none">★</span>
        <span className="text-2xl leading-none">{count}</span>
      </div>
      <p className="font-black text-gray-700 text-sm mt-1">כוכבי {meta.he}!</p>

      {/* Cheer */}
      <p className={`font-display font-black text-2xl mt-1 praise-in ${meta.star}`}>{praise.he}</p>
      <p className="text-xs font-bold text-gray-400 mt-0.5" dir="ltr">
        {praise.en} · You have {count} {meta.en} star{count === 1 ? '' : 's'}
      </p>

      {/* Nudge toward the next trophy */}
      {nextTier != null ? (
        <p className="text-[13px] font-black text-gray-500 mt-2 trophy-nudge">
          עוד {nextTier - count} כוכבים לגביע הבא 🏆
        </p>
      ) : (
        <p className="text-[13px] font-black text-green-500 mt-2 trophy-nudge">כל הגביעים נאספו! 🎉</p>
      )}

      {children && <div className="mt-4 w-full">{children}</div>}
    </div>
  )
}
