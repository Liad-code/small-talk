'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { SOUND_SORT_SETS } from '@/data/step3/soundSortSets'

export default function SoundSortIndexPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/step3/phonics"
            className="text-white/70 font-bold text-sm no-underline hover:text-white"
          >
            ← Phonics
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Sound Sort 🎲</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">
            בחר סט ומיין כל תמונה לעמודת הצליל הנכון
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SOUND_SORT_SETS.map(set => (
            <Link
              key={set.id}
              href={`/step3/phonics/sound-sort/${set.id}`}
              className="
                no-underline
                bg-teal-50 border-4 border-teal-300
                rounded-2xl p-3 flex flex-col items-center gap-1 text-center
                card-3d hover:rotate-1 group transition-transform
              "
            >
              <span className="text-4xl mb-0.5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 inline-block">
                🎲
              </span>
              <span className="font-display font-black text-xl leading-none text-teal-700">
                Sound Sort {set.id}
              </span>
              <span className="text-xs font-bold text-teal-600 opacity-80 leading-tight">
                {set.sounds.map(s => s.label).join(' · ')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
