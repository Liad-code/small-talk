'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function HasHaveMixedPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/has-have" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Have / Has</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Mixed Practice 🔀</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">תרגול מעורב — חיוב, שלילה ושאלות</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-7xl mb-5">🚀</div>
        <h2 className="font-display font-black text-3xl text-violet-700 mb-2">Coming Soon!</h2>
        <p className="font-bold text-gray-500 text-lg mb-1" dir="rtl">בקרוב!</p>
        <p className="font-bold text-gray-400 text-sm" dir="rtl">
          תרגול מעורב של חיוב, שלילה ושאלות have / has
        </p>
        <div className="mt-8">
          <Link
            href="/step3/grammar/has-have"
            className="btn-kid bg-violet-500 no-underline inline-block"
          >
            ← Back to Have / Has
          </Link>
        </div>
      </div>
    </div>
  )
}
