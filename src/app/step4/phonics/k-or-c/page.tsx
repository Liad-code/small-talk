'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useSpeak } from '@/hooks/useSpeak'

interface Example { word: string; emoji: string }
interface Rule {
  hebrew: string
  examples: Example[]
  bgColor: string
  textColor: string
  borderColor: string
}

const RULES: Rule[] = [
  {
    hebrew: 'כותבים c לפני האותיות a, o, u',
    examples: [
      { word: 'cat', emoji: '🐱' }, { word: 'corn', emoji: '🌽' }, { word: 'cup', emoji: '☕' },
      { word: 'car', emoji: '🚗' }, { word: 'cake', emoji: '🎂' }, { word: 'cow', emoji: '🐄' },
    ],
    bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300',
  },
  {
    hebrew: 'כותבים k לפני האותיות e, i',
    examples: [
      { word: 'key', emoji: '🔑' }, { word: 'kite', emoji: '🪁' }, { word: 'king', emoji: '👑' },
      { word: 'kid', emoji: '🧒' }, { word: 'kiss', emoji: '💋' }, { word: 'kitchen', emoji: '🍳' },
    ],
    bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300',
  },
  {
    hebrew: 'בסוף מילה קצרה אחרי תנועה קצרה כותבים ck',
    examples: [
      { word: 'back', emoji: '🔙' }, { word: 'duck', emoji: '🦆' }, { word: 'sock', emoji: '🧦' },
      { word: 'black', emoji: '⬛' }, { word: 'sick', emoji: '🤒' }, { word: 'lock', emoji: '🔒' },
    ],
    bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-300',
  },
]

export default function KorCPage() {
  const speak = useSpeak()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step4/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Phonics
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">k or c 🔠</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">
            מתי כותבים c ומתי k
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 space-y-5">
        {RULES.map((rule, i) => (
          <div key={i} className={`${rule.bgColor} border-4 ${rule.borderColor} rounded-2xl px-4 py-4`}>
            <p className={`font-display font-black text-lg ${rule.textColor} text-center mb-4`} dir="rtl">
              {rule.hebrew}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {rule.examples.map(ex => (
                <button
                  key={ex.word}
                  onClick={() => speak(ex.word.toLowerCase(), 0.8)}
                  className={`
                    bg-white border-4 ${rule.borderColor}
                    rounded-2xl p-3 flex flex-col items-center gap-2 text-center
                    hover:scale-105 active:scale-95 transition-transform
                    cursor-pointer select-none shadow-sm
                  `}
                >
                  <span className="text-5xl leading-none">{ex.emoji}</span>
                  <span className={`font-display font-black text-base leading-tight ${rule.textColor}`}>
                    {ex.word.toLowerCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
