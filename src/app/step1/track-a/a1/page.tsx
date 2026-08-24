'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { ABCGrid } from '@/components/step1/ABCGrid'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { StarCollect } from '@/components/shared/StarCollect'
import Link from 'next/link'

export default function A1Page() {
  const { markExerciseDone, isExerciseDone, step1Stars } = useStep1Progress()
  const [tapped, setTapped] = useState<Set<string>>(new Set())
  const [pendingCollect, setPendingCollect] = useState(false)
  const done = isExerciseDone('A', 'a1', 'learn')

  function onLetterClick(letter: string) {
    setTapped(prev => {
      const next = new Set(prev)
      next.add(letter)
      if (next.size === 26 && prev.size < 26) {
        setPendingCollect(true)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      {pendingCollect && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl bounce-in">
            <div className="text-6xl mb-2">🎉</div>
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-1">Yay! You did it!</h2>
            <p className="text-lg font-bold text-gray-500" dir="rtl">כל הכבוד!</p>
            <StarCollect step="step1" count={step1Stars} award={() => markExerciseDone('A', 'a1', 'learn')}>
              <button onClick={() => setPendingCollect(false)} className="btn-kid bg-green-500 hover:bg-green-600 w-full">✅ המשך</button>
            </StarCollect>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/step1/track-a" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Letter Learning Grid</h1>
            <p className="text-black font-bold text-lg" dir="rtl">לחץ על כל אות כדי לשמוע את שמה</p>
          </div>
          {done && <span className="text-2xl ml-auto">⭐</span>}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-center font-bold text-gray-500 mb-4 text-sm">
          Tap each letter to hear its name! 🔊 ({tapped.size}/26)
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 progress-fill"
            style={{ width: `${Math.round((tapped.size / 26) * 100)}%` }}
          />
        </div>

        <ABCGrid
          soundMode={false}
          size="md"
          onLetterClick={onLetterClick}
          doneLetter={l => tapped.has(l)}
        />

        {done && (
          <div className="mt-8 text-center bounce-in">
            <div className="text-5xl mb-2">⭐</div>
            <p className="font-display text-xl font-bold text-amber-700" dir="rtl">כל הכבוד! שמעת את כל האותיות!</p>
            <Link href="/step1/track-a" className="btn-kid bg-green-500 mt-4 inline-block no-underline">
              Next exercises →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
