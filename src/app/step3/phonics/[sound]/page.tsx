'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { getSound } from '@/data/step3/phonics'
import { useSpeak } from '@/hooks/useSpeak'

export default function SoundLearnPage({ params }: { params: { sound: string } }) {
  const id = params.sound
  const speak = useSpeak()
  const s = getSound(id)

  if (!s) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold">Sound not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className={`bg-gradient-to-r ${s.color} px-4 py-5`}>
        <div className="max-w-2xl mx-auto">
          <Link href="/step3/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Phonics
          </Link>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-5xl">{s.emoji}</span>
            <div>
              <h1 className="font-display text-5xl font-bold text-white leading-none">
                {s.label}
              </h1>
              {s.subtitle && (
                <p className="text-white/80 font-black text-2xl">{s.subtitle}</p>
              )}
              <p className="text-white/70 font-bold text-sm" dir="rtl">{s.hebrewLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Word cards */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        {s.note && (
          <div className={`${s.bgColor} border-4 ${s.borderColor} rounded-2xl px-4 py-3 mb-4`}>
            <p className={`font-bold text-sm ${s.textColor} text-center`} dir="rtl">💡 {s.note}</p>
          </div>
        )}
        <p className="text-center text-gray-500 font-bold text-sm mb-5" dir="rtl">
          לחץ על הריבוע כדי לשמוע את המילה 🔊
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {s.words.map(w => (
            <button
              key={w.word}
              onClick={() => speak(w.tts ?? w.word.toLowerCase(), 0.8)}
              className={`
                ${s.bgColor} border-4 ${s.borderColor}
                rounded-2xl p-3 flex flex-col items-center gap-2 text-center
                hover:scale-105 active:scale-95 transition-transform
                cursor-pointer select-none shadow-sm
              `}
            >
              <span className="text-6xl leading-none">{w.emoji}</span>
              <span className={`font-display font-black text-base leading-tight ${s.textColor}`}>
                {w.word.toLowerCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
