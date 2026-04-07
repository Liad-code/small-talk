'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { useProgress } from '@/hooks/useProgress'
import { SUBJECTS, CATEGORIES } from '@/data/subjects'

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
  const { totalStars, getLevelProgress, isLevelUnlocked } = useProgress()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (totalStars > 0 && !localStorage.getItem(CONFETTI_KEY)) {
      localStorage.setItem(CONFETTI_KEY, '1')
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 4800)
      return () => clearTimeout(t)
    }
  }, [totalStars])

  const starsFor = (id: string, count: number) =>
    Array.from({ length: count }, (_, i) => getLevelProgress(id, i + 1).stars)
      .reduce((a, b) => a + b, 0)

  const pctFor = (id: string, count: number) => {
    const max = count * 3
    return max ? Math.round((starsFor(id, count) / max) * 100) : 0
  }

  const maxTotal = SUBJECTS.reduce((n, s) => n + s.levels.length * 3, 0)
  const globalPct = maxTotal ? Math.round((totalStars / maxTotal) * 100) : 0

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
                {totalStars}
              </div>
              <div className="text-amber-100 font-black text-xs mt-0.5">
                out of {maxTotal} stars
              </div>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <div className="text-white font-black text-2xl leading-none">{globalPct}%</div>
              <div className="text-amber-100 font-bold text-xs mt-0.5">done! 🎉</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBJECT GRID ── */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-10">
        {CATEGORIES.map(cat => (
          <section key={cat.id}>
            {/* Category banner */}
            <div className={`bg-gradient-to-r ${cat.color} rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-md`}>
              <span className="text-4xl">{cat.emoji}</span>
              <div className="text-white">
                <h2 className="text-xl font-black">{cat.title}</h2>
                <p className="text-sm font-bold opacity-80" dir="rtl">{cat.hebrewTitle}</p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SUBJECTS.filter(s => s.category === cat.id).map(subj => {
                const pct = pctFor(subj.id, subj.levels.length)
                const earned = starsFor(subj.id, subj.levels.length)
                const maxStarsForSubj = subj.levels.length * 3

                return (
                  <Link
                    key={subj.id}
                    href={`/subject/${subj.id}`}
                    className={`
                      ${subj.color} border-4 ${subj.borderColor} rounded-3xl p-5 no-underline block
                      hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-xl
                      relative overflow-hidden
                    `}
                  >
                    {/* "Done!" ribbon */}
                    {pct === 100 && (
                      <div className="absolute top-3 right-3 bg-green-400 text-white text-xs font-black rounded-full px-2 py-0.5 shadow-sm">
                        ✓ Done!
                      </div>
                    )}

                    {/* Subject header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{subj.emoji}</span>
                      <div>
                        <div className={`font-black text-lg ${subj.textColor}`}>{subj.title}</div>
                        <div className="text-xs text-gray-500 font-bold" dir="rtl">{subj.hebrewTitle}</div>
                      </div>
                    </div>

                    {/* Level badges */}
                    <div className="flex gap-2 mb-3">
                      {subj.levels.map(lvl => {
                        const lp = getLevelProgress(subj.id, lvl.level)
                        const locked = !isLevelUnlocked(subj.id, lvl.level)
                        return (
                          <div
                            key={lvl.level}
                            className={`flex-1 rounded-xl py-2 px-1 text-center border-2 ${
                              locked
                                ? 'bg-gray-100 border-gray-200 opacity-50'
                                : lp.stars === 3
                                ? 'bg-yellow-50 border-yellow-300'
                                : lp.stars > 0
                                ? 'bg-white/80 border-white'
                                : 'bg-white/50 border-white/60'
                            }`}
                          >
                            <div className="text-xs font-bold text-gray-400 mb-0.5">Lv{lvl.level}</div>
                            {locked
                              ? <div className="text-sm">🔒</div>
                              : <div className="flex justify-center gap-0.5 text-xs leading-none">
                                  {[1, 2, 3].map(s => (
                                    <span key={s} className={lp.stars >= s ? '' : 'opacity-25'}>
                                      {lp.stars >= s ? '⭐' : '☆'}
                                    </span>
                                  ))}
                                </div>
                            }
                          </div>
                        )
                      })}
                    </div>

                    {/* Progress bar */}
                    <div className={subj.textColor}>
                      <div className="w-full bg-white/50 rounded-full h-2.5 overflow-hidden border border-white/60">
                        <div
                          className="h-full rounded-full bg-current progress-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className={`text-xs font-black ${subj.textColor}`}>{pct}%</span>
                      <span className="text-xs font-bold text-gray-400">{earned}/{maxStarsForSubj} ⭐</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
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
