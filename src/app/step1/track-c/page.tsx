'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'

const EXERCISES = [
  { id: 'c1', label: 'Vowel Sort', emoji: '🗂️', hebrewLabel: 'מיין לפי תנועה' },
  { id: 'c2', label: 'Vowel Fill', emoji: '🔤', hebrewLabel: 'מלא את התנועה החסרה' },
  { id: 'c3', label: 'Beginning Sound', emoji: '🔡', hebrewLabel: 'מה הצליל הפותח?' },
  { id: 'c4', label: 'CVC Template', emoji: '📋', hebrewLabel: 'גרור המילה לתבנית' },
  { id: 'c5', label: 'Word-Image Match', emoji: '🖼️', hebrewLabel: 'התאם מילה לתמונה' },
  { id: 'c6', label: 'Line Matching', emoji: '🔗', hebrewLabel: 'חבר מילה לתמונה' },
  { id: 'c7', label: 'Circle the Image', emoji: '⭕', hebrewLabel: 'סמן את התמונה הנכונה' },
  { id: 'c8', label: "Let's Read Cards", emoji: '📖', hebrewLabel: "בוא נקרא — Let's read" },
  { id: 'c9', label: 'Word Scramble', emoji: '🔀', hebrewLabel: 'סדר את האותיות' },
]

export default function TrackCPage() {
  const { isExerciseDone } = useStep1Progress()

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-green-400 to-emerald-400 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/step1" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Track C — CVC Words</h1>
            <p className="text-white/80 font-bold text-sm" dir="rtl">מילים במבנה CVC — cat, dog, sun</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXERCISES.map((ex, i) => {
            const done = isExerciseDone('C', 'c', ex.id)
            return (
              <Link key={ex.id} href={`/step1/track-c/${ex.id}`} className="no-underline group">
                <div className={`
                  bg-gradient-to-br from-green-50 to-emerald-50
                  border-4 ${done ? 'border-green-400' : 'border-green-200'}
                  rounded-3xl p-4 card-3d flex items-center gap-3
                `}>
                  <span className="text-4xl group-hover:scale-110 transition-transform flex-shrink-0">{ex.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-base text-green-800 leading-tight">
                      {i + 1}. {ex.label}
                    </div>
                    <div className="text-xs font-bold text-green-600 opacity-70" dir="rtl">
                      {ex.hebrewLabel}
                    </div>
                  </div>
                  {done
                    ? <span className="text-2xl flex-shrink-0">⭐</span>
                    : <span className="text-gray-300 font-black text-xl flex-shrink-0">→</span>
                  }
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
