'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

interface CardProps {
  href: string
  emoji: string
  title: string
  hebrewTitle: string
  description: string
  color: string
}

function SubCard({ href, emoji, title, hebrewTitle, description, color }: CardProps) {
  return (
    <Link href={href} className="no-underline group block">
      <div className={`bg-gradient-to-br ${color} rounded-2xl p-5 shadow-md border-4 border-white/40 flex gap-4 items-center`}>
        <span className="text-4xl leading-none inline-block transition-transform duration-200 group-hover:scale-110">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display font-bold text-lg text-white leading-tight">{title}</div>
          <div className="text-white/70 font-bold text-sm" dir="rtl">{hebrewTitle}</div>
          <div className="text-white/80 font-bold text-sm mt-1">{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default function AdjectivesAndAdverbsHubPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Adjectives &amp; Adverbs 📐</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">שמות תואר ותארי הפועל — בחר נושא</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <SubCard href="/step5/grammar/adjectives-and-adverbs/adjectives" emoji="📐" title="Adjectives"
          hebrewTitle="שמות תואר" description="big · bigger · the biggest" color="from-pink-500 to-rose-600" />
        <SubCard href="/step5/grammar/adjectives-and-adverbs/adverbs" emoji="🏃" title="Adverbs"
          hebrewTitle="תארי הפועל" description="quietly · happily · fast" color="from-rose-500 to-red-600" />
      </div>
    </div>
  )
}
