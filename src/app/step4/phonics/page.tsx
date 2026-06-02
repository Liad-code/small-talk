'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { SOUNDS } from '@/data/step4/phonics'

export default function PhonicsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step4" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Step 4
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Phonics 🔤</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">
            לחץ על כל צליל כדי ללמוד את המילים שלו
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">

        {/* Sound grid */}
        <h2 className="font-display text-lg font-bold text-gray-600 mb-3">
          📚 Choose a sound to learn
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-10">
          {SOUNDS.map(s => (
            <Link
              key={s.id}
              href={`/step4/phonics/${s.id}`}
              className={`
                no-underline
                ${s.bgColor} border-4 ${s.borderColor}
                rounded-2xl p-3 flex flex-col items-center gap-1 text-center
                card-3d hover:rotate-1 group transition-transform
              `}
            >
              <span className="text-4xl mb-0.5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 inline-block">
                {s.emoji}
              </span>
              <span className={`font-display font-black text-xl leading-none ${s.textColor}`}>
                {s.label}
              </span>
              {s.subtitle && (
                <span className={`text-sm font-bold ${s.textColor} opacity-80 leading-tight`}>
                  {s.subtitle}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* More phonics */}
        <h2 className="font-display text-lg font-bold text-gray-600 mb-3">
          🎵 More Phonics
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/step4/phonics/blends"
            className="
              no-underline
              bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-cyan-300
              rounded-2xl p-4 flex flex-col items-center gap-1 text-center
              card-3d hover:rotate-1 group transition-transform
            "
          >
            <span className="text-4xl mb-0.5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 inline-block">
              🔡
            </span>
            <span className="font-display font-black text-xl leading-none text-white">
              blends
            </span>
          </Link>
          <Link
            href="/step4/phonics/k-or-c"
            className="
              no-underline
              bg-gradient-to-r from-amber-500 to-orange-500 border-4 border-amber-300
              rounded-2xl p-4 flex flex-col items-center gap-1 text-center
              card-3d hover:rotate-1 group transition-transform
            "
          >
            <span className="text-4xl mb-0.5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 inline-block">
              🔠
            </span>
            <span className="font-display font-black text-xl leading-none text-white">
              k or c
            </span>
          </Link>
        </div>

      </div>
    </div>
  )
}
