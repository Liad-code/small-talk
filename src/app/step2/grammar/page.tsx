'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

interface TopicCardProps {
  href?: string
  emoji: string
  title: string
  hebrewTitle: string
  description: string
  color: string
  available: boolean
}

function TopicCard({ href, emoji, title, hebrewTitle, description, color, available }: TopicCardProps) {
  const inner = (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-5 shadow-md border-4 border-white/40 flex gap-4 items-center ${available ? '' : 'opacity-60'}`}>
      <span className={`text-4xl leading-none inline-block ${available ? 'transition-transform duration-200 group-hover:scale-110' : ''}`}>{emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-display font-bold text-lg text-white leading-tight">{title}</div>
        <div className="text-white/70 font-bold text-sm" dir="rtl">{hebrewTitle}</div>
        <div className="text-white/80 font-bold text-sm mt-1">{description}</div>
      </div>
      {!available && (
        <span className="bg-black/25 text-white text-xs font-black px-2 py-1 rounded-full flex-shrink-0">Soon</span>
      )}
    </div>
  )

  if (!available || !href) return <div>{inner}</div>
  return (
    <Link href={href} className="no-underline group block">
      {inner}
    </Link>
  )
}

export default function GrammarPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step2" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 2</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Grammar 📝</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">בחר נושא כדי ללמוד ולתרגל</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <TopicCard
          href="/step2/grammar/noun-verb"
          emoji="🏷️"
          title="Noun / Verb"
          hebrewTitle="שמות עצם ופעלים"
          description="Learn to tell nouns and verbs apart"
          color="from-emerald-500 to-teal-600"
          available
        />
        <TopicCard
          href="/step2/grammar/pronouns"
          emoji="👤"
          title="Pronouns"
          hebrewTitle="שמות גוף"
          description="I, you, he, she, it, we, they"
          color="from-purple-500 to-indigo-600"
          available
        />
        <TopicCard
          href="/step2/grammar/to-be"
          emoji="🌟"
          title="To Be"
          hebrewTitle="להיות"
          description="am, is, are — I am happy"
          color="from-violet-500 to-purple-600"
          available
        />
        <TopicCard
          emoji="🔖"
          title="Articles"
          hebrewTitle="מילות יידוע"
          description="a, an, the — when to use each"
          color="from-orange-400 to-amber-500"
          available={false}
        />
        <TopicCard
          emoji="📐"
          title="Adjectives"
          hebrewTitle="שמות תואר"
          description="Describe nouns with adjectives"
          color="from-pink-400 to-rose-500"
          available={false}
        />
        <TopicCard
          emoji="📍"
          title="Prepositions"
          hebrewTitle="מילות יחס"
          description="in, on, under, next to..."
          color="from-sky-400 to-blue-500"
          available={false}
        />
      </div>
    </div>
  )
}
