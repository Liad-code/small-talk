'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { BLENDS } from '@/data/step4/blends'
import { useSpeak } from '@/hooks/useSpeak'

const CARD_COLORS = [
  { bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300', headerColor: 'from-rose-500 to-red-600' },
  { bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300', headerColor: 'from-amber-500 to-orange-600' },
  { bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-300', headerColor: 'from-emerald-500 to-green-600' },
  { bgColor: 'bg-sky-50', textColor: 'text-sky-700', borderColor: 'border-sky-300', headerColor: 'from-sky-500 to-blue-600' },
  { bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-300', headerColor: 'from-violet-500 to-purple-600' },
  { bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-300', headerColor: 'from-teal-500 to-cyan-600' },
]

export default function BlendsPage() {
  const speak = useSpeak()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step4/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Phonics
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Blends 🔡</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">
            לחץ על כל מילה כדי לשמוע אותה
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 space-y-5">
        {BLENDS.map((blend, i) => {
          const c = CARD_COLORS[i % CARD_COLORS.length]
          return (
            <div key={blend.id} className={`${c.bgColor} border-4 ${c.borderColor} rounded-2xl overflow-hidden shadow-sm`}>
              {/* Blend header */}
              <div className={`bg-gradient-to-r ${c.headerColor} px-4 py-2`}>
                <span className="font-display font-black text-2xl text-white leading-none">{blend.label}</span>
              </div>

              {/* Words */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3">
                {blend.words.map(w => (
                  <button
                    key={w.word}
                    onClick={() => speak(w.word.toLowerCase(), 0.8)}
                    className={`
                      bg-white border-4 ${c.borderColor}
                      rounded-2xl p-3 flex flex-col items-center gap-2 text-center
                      hover:scale-105 active:scale-95 transition-transform
                      cursor-pointer select-none shadow-sm
                    `}
                  >
                    <span className="text-5xl leading-none">{w.emoji}</span>
                    <span className={`font-display font-black text-base leading-tight ${c.textColor}`}>
                      {w.word.toLowerCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
