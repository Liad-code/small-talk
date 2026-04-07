'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Mascot } from '@/components/ui/Mascot'
import { useProgress } from '@/hooks/useProgress'
import { SUBJECTS, CATEGORIES } from '@/data/subjects'

/* Decorative sparkle scattered in the hero */
function Sparkle({ emoji, style }: { emoji: string; style: string }) {
  return (
    <span className={`absolute select-none pointer-events-none text-2xl ${style}`}>
      {emoji}
    </span>
  )
}

export default function HomePage() {
  const { getLevelProgress } = useProgress()

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative text-center py-10 px-4 overflow-hidden">
        {/* Decorative scattered elements */}
        <Sparkle emoji="⭐" style="top-6 left-[8%]  twinkle             text-yellow-400 opacity-70" />
        <Sparkle emoji="✨" style="top-10 right-[12%] twinkle-delay-1    text-purple-400 opacity-60" />
        <Sparkle emoji="⭐" style="top-3  right-[28%] twinkle-delay-2    text-pink-400   opacity-50" />
        <Sparkle emoji="✨" style="top-14 left-[22%]  twinkle-delay-3    text-blue-400   opacity-60" />
        <Sparkle emoji="🌟" style="bottom-4 left-[5%] twinkle-delay-2   text-yellow-300 opacity-50" />
        <Sparkle emoji="✨" style="bottom-6 right-[6%] twinkle-delay-1  text-green-400  opacity-50" />

        {/* Mascot */}
        <div className="flex justify-center mb-2">
          <Mascot size={130} className="float drop-shadow-lg" />
        </div>

        {/* Main heading */}
        <div className="bounce-in">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-gray-800 leading-tight mb-2">
            Welcome to{' '}
            <span className="text-primary relative inline-block">
              Small Talk!
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 2 5 Q 25 1 50 5 Q 75 9 100 5 Q 125 1 150 5 Q 175 9 198 5"
                  stroke="#6C63FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-bold mb-1 slide-up-delay1">
            Learn English the fun way! 🎉
          </p>
          <p className="text-lg text-gray-400 font-bold slide-up-delay2" dir="rtl">
            לומדים אנגלית בכיף!
          </p>
        </div>
      </section>

      {/* ── Category sections ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-12">
        {CATEGORIES.map((cat, catIdx) => {
          const catSubjects = SUBJECTS.filter(s => s.category === cat.id)
          return (
            <section key={cat.id} className={`slide-up`} style={{ animationDelay: `${0.1 + catIdx * 0.1}s` }}>

              {/* Category header */}
              <div className={`bg-gradient-to-r ${cat.color} rounded-3xl p-5 mb-5 shadow-lg relative overflow-hidden`}>
                {/* Decorative blobs inside banner */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 right-20 w-16 h-16 bg-white/10 rounded-full" />

                <div className="relative flex items-center gap-4 flex-wrap sm:flex-nowrap">
                  <span className="text-5xl flex-shrink-0">{cat.emoji}</span>
                  <div className="text-white min-w-0">
                    <h2 className="font-display text-2xl font-bold leading-tight">{cat.title}</h2>
                    <p className="font-bold opacity-90 text-sm" dir="rtl">{cat.hebrewTitle}</p>
                    <p className="text-sm opacity-75 mt-0.5">{cat.description}</p>
                  </div>
                </div>
              </div>

              {/* Subject cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {catSubjects.map((subject, idx) => {
                  const totalLevels = subject.levels.length
                  const doneCount = subject.levels.filter((_, i) => {
                    const p = getLevelProgress(subject.id, i + 1)
                    return p.stars > 0
                  }).length
                  const pct = Math.round((doneCount / totalLevels) * 100)
                  // Alternate subtle tilt direction for a hand-placed feel
                  const tiltClass = idx % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'

                  return (
                    <Link
                      key={subject.id}
                      href={`/subject/${subject.id}`}
                      className={`
                        ${subject.color} border-4 ${subject.borderColor}
                        rounded-3xl p-4 flex flex-col items-center gap-2.5 text-center
                        no-underline card-3d ${tiltClass}
                        group
                      `}
                    >
                      {/* Emoji with subtle scale on hover */}
                      <span className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 inline-block">
                        {subject.emoji}
                      </span>

                      <div>
                        <div className={`font-display font-bold text-base leading-tight ${subject.textColor}`}>
                          {subject.title}
                        </div>
                        <div className="text-xs text-gray-500 font-bold mt-0.5" dir="rtl">
                          {subject.hebrewTitle}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full">
                        <div className="w-full bg-white/70 rounded-full h-2.5 mb-1">
                          <div
                            className="h-full rounded-full bg-current progress-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 font-bold">
                          {doneCount}/{totalLevels} levels
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="text-center py-8 text-gray-400 font-bold text-sm px-4">
        <p>🏫 Small Talk – Made with ❤️ for young English learners</p>
      </footer>
    </div>
  )
}
