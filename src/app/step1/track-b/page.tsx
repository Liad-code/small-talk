'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'

export default function TrackBPage() {
  const { isExerciseDone } = useStep1Progress()

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/step1" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Track B — Short Sounds</h1>
            <p className="text-white/80 font-bold text-sm" dir="rtl">צלילים קצרים — short sound</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* B1 */}
        <section>
          <h2 className="font-display text-xl font-bold text-gray-700 mb-3">📖 Learning</h2>
          <Link href="/step1/track-b/b1" className="no-underline block">
            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 border-4 border-cyan-300 rounded-3xl p-5 card-3d flex items-center gap-4 group">
              <span className="text-5xl group-hover:scale-110 transition-transform">🔊</span>
              <div>
                <div className="font-display font-bold text-lg text-cyan-800">Sound Learning Grid</div>
                <div className="text-sm text-cyan-600 font-bold" dir="rtl">לחץ כדי לשמוע שם האות + הצליל הקצר שלה</div>
              </div>
              {isExerciseDone('B', 'b1', 'learn') && <span className="text-2xl ml-auto">⭐</span>}
            </div>
          </Link>
        </section>

        {/* Sound Box per group */}
        <section>
          <h2 className="font-display text-xl font-bold text-gray-700 mb-3">🎮 Sound Box by Group</h2>
          <div className="space-y-3">
            {LETTER_GROUPS.map(group => {
              const done = isExerciseDone('B', group.id, 'ex1')
              return (
                <Link key={group.id} href={`/step1/track-b/${group.id}/ex1`} className="no-underline">
                  <div className={`
                    ${group.bgColor} border-4 ${done ? 'border-green-400' : group.borderColor}
                    rounded-3xl p-4 card-3d flex items-center gap-3 group
                  `}>
                    <span className="text-3xl group-hover:scale-110 transition-transform">{group.emoji}</span>
                    <div className="flex-1">
                      <div className={`font-display font-bold text-base ${group.textColor}`}>
                        Sound Box — {group.letters.map(l => l.toUpperCase()).join(' · ')}
                      </div>
                      <div className={`text-xs font-bold ${group.textColor} opacity-70`} dir="rtl">
                        שמע את הצליל הקצר — גרור האות לתיבה
                      </div>
                    </div>
                    {done ? <span className="text-2xl">⭐</span> : <span className="text-gray-300 font-black text-xl">→</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
