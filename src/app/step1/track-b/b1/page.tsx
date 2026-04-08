'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ABCGrid } from '@/components/step1/ABCGrid'
import { useStep1Progress } from '@/hooks/useStep1Progress'

export default function B1Page() {
  const { markExerciseDone, isExerciseDone } = useStep1Progress()
  const [tapped, setTapped] = useState<Set<string>>(new Set())
  const done = isExerciseDone('B', 'b1', 'learn')

  function onLetterClick(letter: string) {
    setTapped(prev => {
      const next = new Set(prev)
      next.add(letter)
      if (next.size === 26 && !done) {
        markExerciseDone('B', 'b1', 'learn')
      }
      return next
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/step1/track-b" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Sound Learning Grid</h1>
            <p className="text-white/80 font-bold text-sm" dir="rtl">לחץ לשמוע שם האות + הצליל הקצר שלה</p>
          </div>
          {done && <span className="text-2xl ml-auto">⭐</span>}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-center font-bold text-gray-500 mb-4 text-sm">
          Tap each letter to hear its name AND short sound! 🔊 ({tapped.size}/26)
        </p>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 progress-fill"
            style={{ width: `${Math.round((tapped.size / 26) * 100)}%` }}
          />
        </div>

        <ABCGrid
          soundMode={true}
          size="md"
          onLetterClick={onLetterClick}
          doneLetter={l => tapped.has(l)}
        />

        {done && (
          <div className="mt-8 text-center bounce-in">
            <div className="text-5xl mb-2">⭐</div>
            <p className="font-display text-xl font-bold text-blue-700" dir="rtl">כל הכבוד!</p>
            <Link href="/step1/track-b" className="btn-kid bg-green-500 mt-4 inline-block no-underline">
              Next →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
