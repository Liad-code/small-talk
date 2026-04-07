'use client'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { StarRating } from '@/components/ui/StarRating'
import { LockBadge } from '@/components/ui/LockBadge'
import { useProgress } from '@/hooks/useProgress'
import { getSubject } from '@/data/subjects'

const LEVEL_LABELS = ['', 'Easy 🌱', 'Medium 🌟', 'Hard 🚀']
const LEVEL_COLORS = ['', 'from-green-400 to-emerald-500', 'from-blue-400 to-indigo-500', 'from-purple-400 to-pink-500']

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const router = useRouter()
  const subject = getSubject(subjectId)
  const { getLevelProgress, isLevelUnlocked } = useProgress()

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-black text-gray-600">Subject not found</h1>
          <Link href="/" className="mt-4 btn-kid bg-primary inline-block">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Subject hero */}
      <div className={`${subject.color} border-b-4 ${subject.borderColor} py-8 px-4 text-center`}>
        <Link href="/" className="inline-block mb-3 text-gray-500 font-bold text-sm hover:text-gray-700">
          ← Back to Home
        </Link>
        <div className="text-6xl mb-3">{subject.emoji}</div>
        <h1 className={`font-display text-3xl sm:text-4xl font-bold ${subject.textColor}`}>{subject.title}</h1>
        <p className="text-gray-500 font-bold mt-1" dir="rtl">{subject.hebrewTitle}</p>
      </div>

      {/* Level cards */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-black text-gray-700 mb-6 text-center">Choose a Level</h2>
        <div className="grid gap-6">
          {subject.levels.map((lvl, idx) => {
            const level = idx + 1
            const unlocked = isLevelUnlocked(subjectId, level)
            const p = getLevelProgress(subjectId, level)

            return (
              <div key={level} className="relative">
                {!unlocked && <LockBadge />}
                <div className={`bg-gradient-to-r ${LEVEL_COLORS[level]} rounded-3xl p-6 shadow-lg text-white
                                 ${unlocked ? 'opacity-100' : 'opacity-60'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm font-bold opacity-80">Level {level}</div>
                      <div className="text-2xl font-black">{LEVEL_LABELS[level]}</div>
                      <div className="font-bold text-white/80 mt-1">{lvl.title}</div>
                    </div>
                    <StarRating stars={p.stars} size="lg" />
                  </div>
                  <p className="text-white/70 text-sm mb-4">{lvl.description}</p>

                  {/* Action buttons */}
                  {unlocked && (
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => router.push(`/lesson/${subjectId}/${level}`)}
                        className="btn-kid bg-white/20 hover:bg-white/30 border-2 border-white/40 px-4 py-2 text-sm"
                      >
                        📖 Lesson {p.lessonDone ? '✓' : ''}
                      </button>
                      <button
                        onClick={() => router.push(`/quiz/${subjectId}/${level}`)}
                        className="btn-kid bg-white/20 hover:bg-white/30 border-2 border-white/40 px-4 py-2 text-sm disabled:opacity-50"
                        disabled={!p.lessonDone}
                        title={!p.lessonDone ? 'Complete the lesson first!' : ''}
                      >
                        🧠 Quiz {p.quizScore > 0 ? `(${p.quizScore}%)` : ''}
                      </button>
                      <button
                        onClick={() => router.push(`/games/word-match?subject=${subjectId}&level=${level}`)}
                        className="btn-kid bg-white/20 hover:bg-white/30 border-2 border-white/40 px-4 py-2 text-sm disabled:opacity-50"
                        disabled={!p.lessonDone}
                      >
                        🎮 Game {p.gameHighScore > 0 ? `(${p.gameHighScore}pts)` : ''}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
