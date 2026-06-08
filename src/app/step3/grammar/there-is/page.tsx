'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function ThereIsHubPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-5">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">There is / There are 🌍</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">יש / ישנם</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        {/* Positive */}
        <Link href="/step3/grammar/there-is/positive" className="no-underline group block">
          <div className="bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl p-5 shadow-md border-4 border-white/40 flex gap-4 items-center">
            <span className="text-4xl transition-transform duration-200 group-hover:scale-110">✅</span>
            <div>
              <div className="font-display font-bold text-lg text-white">Positive</div>
              <div className="text-white/70 font-bold text-sm" dir="rtl">חיוב</div>
              <div className="text-white/80 font-bold text-sm mt-1">There is · There are</div>
            </div>
          </div>
        </Link>
        {/* Negative */}
        <Link href="/step3/grammar/there-is/negative" className="no-underline group block">
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-5 shadow-md border-4 border-white/40 flex gap-4 items-center">
            <span className="text-4xl transition-transform duration-200 group-hover:scale-110">❌</span>
            <div>
              <div className="font-display font-bold text-lg text-white">Negative</div>
              <div className="text-white/70 font-bold text-sm" dir="rtl">שלילה</div>
              <div className="text-white/80 font-bold text-sm mt-1">There isn&apos;t · There aren&apos;t</div>
            </div>
          </div>
        </Link>
        {/* Yes/No */}
        <Link href="/step3/grammar/there-is/yes-no" className="no-underline group block">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 shadow-md border-4 border-white/40 flex gap-4 items-center">
            <span className="text-4xl transition-transform duration-200 group-hover:scale-110">❓</span>
            <div className="flex-1">
              <div className="font-display font-bold text-lg text-white">Yes / No Questions</div>
              <div className="text-white/70 font-bold text-sm" dir="rtl">שאלות כן/לא</div>
              <div className="text-white/80 font-bold text-sm mt-1">Is there? · Are there?</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
