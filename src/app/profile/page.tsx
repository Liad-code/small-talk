'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { useStepStars, type StarStep } from '@/hooks/useStepStars'
import { useCombinedStars } from '@/hooks/useCombinedStars'
import { STEP_STAR_META, STEP_ORDER, trophyTiers } from '@/data/stepStarConfig'

const CONFETTI_KEY = 'smalltalk_confetti_shown'

// Deterministic confetti pieces — no Math.random() to avoid hydration issues
const CONFETTI_COLORS = ['#FF6B6B','#FFD700','#4ECDC4','#A29BFE','#FF8B94','#96CEB4','#74B9FF','#FFEAA7','#55EFC4','#FD79A8']
const PIECES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${(i * 1.65 + 1.5) % 100}%`,
  delay: `${((i * 73) % 260) / 100}s`,
  dur: `${2.3 + ((i * 41) % 170) / 100}s`,
  w: `${7 + (i % 9)}px`,
  h: `${6 + ((i + 3) % 8)}px`,
  circle: i % 3 === 0,
}))

export default function ProfilePage() {
  const { step1Stars } = useStep1Progress()
  const { starsFor: stepStarsFor } = useStepStars()
  const combined = useCombinedStars()
  const [showConfetti, setShowConfetti] = useState(false)

  const stepCount = (s: string) => (s === 'step1' ? step1Stars : stepStarsFor(s as StarStep))
  const totalTrophies = STEP_ORDER.reduce(
    (n, s) => n + trophyTiers(s).filter(t => stepCount(s) >= t).length,
    0,
  )

  useEffect(() => {
    if (combined > 0 && !localStorage.getItem(CONFETTI_KEY)) {
      localStorage.setItem(CONFETTI_KEY, '1')
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 4800)
      return () => clearTimeout(t)
    }
  }, [combined])

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(circle, #fde68a28 1px, transparent 1px),
          linear-gradient(150deg, #fffbea 0%, #fff0f9 50%, #edf6ff 100%)
        `,
        backgroundSize: '26px 26px, auto',
      }}
    >
      <Header />

      {/* ── CONFETTI ── */}
      {showConfetti && (
        <>
          <style>{`
            @keyframes confetti-fall {
              from { transform: translateY(-24px) rotate(0deg); opacity: 1; }
              80%  { opacity: 1; }
              to   { transform: translateY(110vh) rotate(840deg); opacity: 0; }
            }
            .cp { animation: confetti-fall linear forwards; position: absolute; top: 0; }
          `}</style>
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {PIECES.map(p => (
              <div
                key={p.id}
                className="cp"
                style={{
                  left: p.left, width: p.w, height: p.h,
                  backgroundColor: p.color,
                  borderRadius: p.circle ? '50%' : '3px',
                  animationDelay: p.delay,
                  animationDuration: p.dur,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── HERO ── */}
      <section className="text-center pt-10 pb-8 px-4">
        <div className="bounce-in">
          <div className="text-6xl mb-2">🏆</div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-1">
            My Trophy Room!
          </h1>
          <p className="text-sm text-gray-400 font-bold mb-7" dir="rtl">חדר הגביעים שלי ✨</p>

          {/* Star hero badge */}
          <div
            className="inline-flex items-center gap-5 rounded-[2rem] px-8 py-5 shadow-2xl border-4 border-amber-300"
            style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)' }}
          >
            <span className="text-5xl drop-shadow-md">⭐</span>
            <div className="text-left">
              <div
                className="font-black text-white drop-shadow-md leading-none"
                style={{ fontSize: '3.5rem' }}
              >
                {combined}
              </div>
              <div className="text-amber-100 font-black text-xs mt-0.5">
                stars · כוכבים
              </div>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <div className="text-white font-black text-2xl leading-none">{totalTrophies} 🏆</div>
              <div className="text-amber-100 font-bold text-xs mt-0.5">trophies</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP STARS & TROPHIES ── */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <h2 className="text-center text-2xl font-black text-gray-700 mb-1">Step Stars &amp; Trophies</h2>
        <p className="text-center text-xs font-bold text-gray-400 mb-6" dir="rtl">
          כוכבי השלבים — כמה כוכבים אספת בכל שלב, וגביע נוסף על כל 10 כוכבים 🏆
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEP_ORDER.map(step => {
            const meta = STEP_STAR_META[step]
            const count = stepCount(step)
            const tiers = trophyTiers(step)
            const pct = Math.min(100, Math.round((count / meta.target) * 100))
            const nextTier = tiers.find(t => count < t)
            return (
              <div key={step} className={`rounded-3xl border-4 ${meta.ring} ${meta.soft} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{meta.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-gray-700 text-base leading-none">{meta.en}</div>
                    <div className="text-xs font-bold text-gray-400" dir="rtl">{meta.he}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-2xl leading-none ${meta.star}`}>★</span>
                    <span className="font-black text-gray-700 text-lg">{count}</span>
                    <span className="text-xs font-bold text-gray-400">/ {meta.target}</span>
                  </div>
                </div>

                <div className="w-full bg-white/70 rounded-full h-2.5 overflow-hidden border border-white mb-1">
                  <div className={`h-full rounded-full bg-gradient-to-r ${meta.chipBg} progress-fill`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-[11px] font-black text-gray-500">{pct}%</span>
                  <span className="text-[11px] font-bold text-gray-400">{count} / {meta.target} ⭐</span>
                </div>

                <div className="flex items-end gap-1.5 flex-wrap">
                  {tiers.map((t, i) => {
                    const earned = count >= t
                    const size = 18 + i * 3
                    return (
                      <div key={t} className="flex flex-col items-center" title={`${t} ⭐`}>
                        <span style={{ fontSize: `${size}px`, filter: earned ? 'none' : 'grayscale(1)', opacity: earned ? 1 : 0.35 }}>🏆</span>
                        <span className="text-[9px] font-bold text-gray-400 leading-none mt-0.5">{t}</span>
                      </div>
                    )
                  })}
                </div>

                {nextTier != null ? (
                  <p className="text-[11px] font-bold text-gray-400 mt-2" dir="rtl">
                    עוד {nextTier - count} כוכבים לגביע הבא 🏆
                  </p>
                ) : (
                  <p className="text-[11px] font-black text-green-500 mt-2" dir="rtl">כל הגביעים נאספו! 🎉</p>
                )}
              </div>
            )
          })}
        </div>
      </div>


      {/* ── BACK BUTTON ── */}
      <div className="text-center pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 rounded-2xl px-6 py-3 font-black text-gray-500 hover:bg-gray-50 transition-colors no-underline text-sm shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
