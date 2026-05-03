'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { getDigraph } from '@/data/step2/digraphs'
import { useSpeak } from '@/hooks/useSpeak'

export default function DiGraphLearnPage({ params }: { params: { digraph: string } }) {
  const id = params.digraph
  const speak = useSpeak()
  const dg = getDigraph(id)

  if (!dg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold">Digraph not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className={`bg-gradient-to-r ${dg.color} px-4 py-5`}>
        <div className="max-w-2xl mx-auto">
          <Link href="/step2/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Phonics
          </Link>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-5xl">{dg.emoji}</span>
            <div>
              <h1 className="font-display text-5xl font-bold text-white leading-none">
                {dg.label}
              </h1>
              {dg.subtitle && (
                <p className="text-white/80 font-bold text-base">{dg.subtitle}</p>
              )}
              <p className="text-white/70 font-bold text-sm" dir="rtl">{dg.hebrewLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Word cards */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        <p className="text-center text-gray-500 font-bold text-sm mb-5" dir="rtl">
          לחץ על הריבוע כדי לשמוע את המילה 🔊
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {dg.words.map(w => (
            <button
              key={w.word}
              onClick={() => speak(w.tts ?? w.word.toLowerCase(), 0.8)}
              className={`
                ${dg.bgColor} border-4 ${dg.borderColor}
                rounded-2xl p-3 flex flex-col items-center gap-2 text-center
                hover:scale-105 active:scale-95 transition-transform
                cursor-pointer select-none shadow-sm
              `}
            >
              <span className="text-5xl leading-none">{w.emoji}</span>
              <span className={`font-display font-black text-sm leading-tight ${dg.textColor}`}>
                {w.word.toLowerCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
