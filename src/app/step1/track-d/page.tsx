'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { TRACK_D_CATEGORIES } from '@/data/step1/trackDCategories'

export default function TrackDPage() {
  const { isExerciseDone } = useStep1Progress()

  return (
    <div className="min-h-screen bg-purple-700">
      <Header />

      <div className="bg-gradient-to-r from-purple-800 to-violet-800 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/step1" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Track D — Vocabulary</h1>
            <p className="text-white/80 font-bold text-sm" dir="rtl">אוצר מילים — 24 קטגוריות, קול בלבד</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TRACK_D_CATEGORIES.map(cat => {
            const learned = isExerciseDone('D', cat.id, 'learn')
            const quizzed = isExerciseDone('D', cat.id, 'quiz')
            return (
              <Link key={cat.id} href={`/step1/track-d/${cat.id}`} className="no-underline group">
                <div className={`
                  bg-white/15 border-4 ${(learned || quizzed) ? 'border-green-400' : 'border-white/30'}
                  rounded-3xl p-4 card-3d flex flex-col items-center gap-2 text-center
                  hover:bg-white/25 transition-all
                `}>
                  <span className="text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                  <div>
                    <div className="font-display font-bold text-sm text-white">{cat.title}</div>
                    <div className="text-xs font-bold text-white/70" dir="rtl">{cat.hebrewTitle}</div>
                  </div>
                  <div className="flex gap-1">
                    {learned && <span className="text-sm" title="Learned">📚</span>}
                    {quizzed && <span className="text-sm" title="Quizzed">⭐</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
