'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'

const EXERCISES = ['ex1', 'ex2', 'ex3a', 'ex3b', 'ex3c']
const EXERCISE_LABELS = ['Drag to Square', 'Bubble Pop', 'Match Pairs', 'Bouquet Flowers', 'Maze Paths']
const EXERCISE_EMOJIS = ['🧲', '🫧', '🔗', '🌸', '🌀']

const A3_EXERCISES = [
  { id: 'ex1', label: 'ABC Fill – Uppercase', emoji: '🔠' },
  { id: 'ex2', label: 'ABC Fill – Lowercase', emoji: '🔡' },
  { id: 'ex3', label: 'Puzzle Match', emoji: '🧩' },
  { id: 'ex4', label: 'In the Kitchen', emoji: '🍳' },
]

function ExBadge({ done }: { done: boolean }) {
  return done ? (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs font-black">✓</span>
  ) : (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-400 text-xs">○</span>
  )
}

export default function TrackAPage() {
  const { isExerciseDone } = useStep1Progress()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-red-400 to-orange-400 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/step1" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Track A — Letter Recognition</h1>
            <p className="text-white/80 font-bold text-sm" dir="rtl">הכרת האותיות — אות גדולה, קטנה ורצף ABC</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">

        {/* A1 — Letter Learning */}
        <section>
          <h2 className="font-display text-xl font-bold text-gray-700 mb-3">📖 Learning</h2>
          <Link
            href="/step1/track-a/a1"
            className="no-underline block"
          >
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-4 border-amber-300 rounded-3xl p-5 card-3d flex items-center gap-4 group">
              <span className="text-5xl group-hover:scale-110 transition-transform duration-200">📚</span>
              <div>
                <div className="font-display font-bold text-lg text-amber-800">Letter Learning Grid</div>
                <div className="text-sm text-amber-600 font-bold" dir="rtl">למד את כל 26 האותיות — לחץ כדי לשמוע</div>
              </div>
              <ExBadge done={isExerciseDone('A', 'a1', 'learn')} />
            </div>
          </Link>
        </section>

        {/* A2 — Group exercises */}
        <section>
          <h2 className="font-display text-xl font-bold text-gray-700 mb-3">🎮 Exercises by Group</h2>
          <div className="space-y-4">
            {LETTER_GROUPS.map(group => {
              const doneCt = EXERCISES.filter(ex => isExerciseDone('A', group.id, ex)).length
              return (
                <div key={group.id} className={`${group.bgColor} border-4 ${group.borderColor} rounded-3xl p-4`}>
                  {/* Group header */}
                  <Link href={`/step1/track-a/${group.id}`} className="no-underline flex items-center gap-3 mb-3 group">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{group.emoji}</span>
                    <div className="flex-1">
                      <div className={`font-display font-bold text-base ${group.textColor}`}>
                        {group.letters.map(l => l.toUpperCase()).join(' · ')}
                      </div>
                      <div className={`text-xs font-bold ${group.textColor} opacity-70`}>{group.hebrewLabel}</div>
                    </div>
                    <span className={`text-xs font-black ${group.textColor}`}>{doneCt}/{EXERCISES.length} ⭐</span>
                  </Link>

                  {/* Exercise pills */}
                  <div className="flex flex-wrap gap-2">
                    {EXERCISES.map((ex, i) => (
                      <Link
                        key={ex}
                        href={`/step1/track-a/${group.id}/${ex}`}
                        className={`
                          no-underline flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold
                          ${isExerciseDone('A', group.id, ex)
                            ? 'bg-green-100 border-2 border-green-400 text-green-700'
                            : `${group.bgColor} border-2 ${group.borderColor} ${group.textColor} hover:opacity-80`}
                          transition-colors
                        `}
                      >
                        <span>{EXERCISE_EMOJIS[i]}</span>
                        <span>{EXERCISE_LABELS[i]}</span>
                        {isExerciseDone('A', group.id, ex) && <span>✓</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* A3 — Full ABC */}
        <section>
          <h2 className="font-display text-xl font-bold text-gray-700 mb-3">🔤 Full ABC Challenges</h2>
          <div className="grid grid-cols-2 gap-3">
            {A3_EXERCISES.map(ex => (
              <Link
                key={ex.id}
                href={`/step1/track-a/a3/${ex.id}`}
                className="no-underline"
              >
                <div className={`
                  bg-gradient-to-br from-indigo-100 to-purple-100 border-4
                  ${isExerciseDone('A', 'a3', ex.id) ? 'border-green-400' : 'border-indigo-300'}
                  rounded-2xl p-4 card-3d flex items-center gap-3 group
                `}>
                  <span className="text-3xl group-hover:scale-110 transition-transform">{ex.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-indigo-800 leading-tight">{ex.label}</div>
                  </div>
                  <ExBadge done={isExerciseDone('A', 'a3', ex.id)} />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
