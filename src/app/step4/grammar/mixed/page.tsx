'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function MixedPracticePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step4/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Mixed Practice 🔀</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">תרגול מעורב</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-7xl mb-5">🚀</div>
        <h2 className="font-display font-black text-3xl text-gray-700 mb-2">Coming Soon!</h2>
        <p className="font-bold text-gray-500 text-lg mb-1" dir="rtl">בקרוב!</p>
        <div className="mt-8">
          <Link href="/step4/grammar" className="btn-kid bg-violet-500 no-underline inline-block">← Back to Grammar</Link>
        </div>
      </div>
    </div>
  )
}
