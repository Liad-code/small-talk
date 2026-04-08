'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'

const EXERCISES = [
  { id: 'ex1', label: 'Drag to Square', emoji: '🧲', hebrewLabel: 'גרור לריבוע הנכון' },
  { id: 'ex2', label: 'Bubble Pop', emoji: '🫧', hebrewLabel: 'פוצץ את בועת הסבון הנכונה' },
  { id: 'ex3a', label: 'Match Pairs', emoji: '🔗', hebrewLabel: 'התאמה — עמודה ימין ושמאל' },
  { id: 'ex3b', label: 'Bouquet Flowers', emoji: '🌸', hebrewLabel: 'התאמה — פרח ועציץ' },
  { id: 'ex3c', label: 'Maze Paths', emoji: '🌀', hebrewLabel: 'עקוב אחרי הדרך' },
]

export default function GroupHubPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)
  const { isExerciseDone } = useStep1Progress()

  if (!group) return <div className="p-8 text-center text-gray-500">Group not found</div>

  const doneCt = EXERCISES.filter(ex => isExerciseDone('A', groupId, ex.id)).length

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className={`bg-gradient-to-r ${group.color} py-5 px-4`}>
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/step1/track-a" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{group.emoji}</span>
              <h1 className="font-display text-2xl font-bold text-white">
                {group.letters.map(l => l.toUpperCase()).join(' · ')}
              </h1>
            </div>
            <p className="text-white/80 font-bold text-sm">{group.hebrewLabel}</p>
          </div>
          <span className="text-white font-black text-sm">{doneCt}/{EXERCISES.length} ⭐</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="font-bold text-gray-500 text-sm text-center mb-6" dir="rtl">
          בחר תרגיל:
        </p>

        <div className="grid grid-cols-1 gap-4">
          {EXERCISES.map((ex, i) => {
            const done = isExerciseDone('A', groupId, ex.id)
            return (
              <Link key={ex.id} href={`/step1/track-a/${groupId}/${ex.id}`} className="no-underline group">
                <div className={`
                  ${group.bgColor} border-4 ${done ? 'border-green-400' : group.borderColor}
                  rounded-3xl p-5 card-3d flex items-center gap-4
                `}>
                  <span className="text-4xl group-hover:scale-110 transition-transform">{ex.emoji}</span>
                  <div className="flex-1">
                    <div className={`font-display font-bold text-lg ${group.textColor}`}>
                      {i + 1}. {ex.label}
                    </div>
                    <div className={`text-sm font-bold ${group.textColor} opacity-70`} dir="rtl">
                      {ex.hebrewLabel}
                    </div>
                  </div>
                  {done ? (
                    <span className="text-2xl">⭐</span>
                  ) : (
                    <span className="text-gray-300 font-black text-2xl">→</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
