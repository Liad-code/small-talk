'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DIGRAPHS } from '@/data/step2/digraphs'

export default function PhonicsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step2" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Step 2
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Phonics 🔤</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">
            לחץ על כל צליל כדי ללמוד את המילים שלו
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">

        {/* Digraph grid */}
        <h2 className="font-display text-lg font-bold text-gray-600 mb-3">
          📚 Choose a sound to learn
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-10">
          {DIGRAPHS.map(dg => (
            <Link
              key={dg.id}
              href={`/step2/phonics/${dg.id}`}
              className={`
                no-underline
                ${dg.bgColor} border-4 ${dg.borderColor}
                rounded-2xl p-3 flex flex-col items-center gap-1 text-center
                card-3d hover:rotate-1 group transition-transform
              `}
            >
              <span className="text-3xl mb-0.5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 inline-block">
                {dg.emoji}
              </span>
              <span className={`font-display font-black text-xl leading-none ${dg.textColor}`}>
                {dg.label}
              </span>
              {dg.subtitle && (
                <span className={`text-xs font-bold ${dg.textColor} opacity-70 leading-tight`}>
                  {dg.subtitle}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Exercises section */}
        <div className="border-t-2 border-dashed border-gray-200 pt-6">
          <h2 className="font-display text-lg font-bold text-gray-600 mb-3">
            🎯 Exercises
          </h2>
          <Link href="/step2/phonics/exercise1" className="no-underline block group">
            <div className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl p-5 text-white card-3d hover:rotate-1">
              <div className="flex items-center gap-4">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 inline-block">🎲</span>
                <div>
                  <div className="font-display font-bold text-xl">Sound Sort</div>
                  <div className="text-white/80 font-bold text-sm">
                    Drag each picture to the right sound category
                  </div>
                  <div className="text-white/60 font-bold text-xs mt-0.5" dir="rtl">
                    מיון צלילים — WHINY A · CH · SH · TH
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
