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

export default function Step3GrammarPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step3" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 3</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Grammar 📝</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">בחר נושא כדי ללמוד ולתרגל</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <TopicCard
          href="/step3/grammar/has-have"
          emoji="🤲"
          title="Have / Has"
          hebrewTitle="יש לי / יש לו"
          description="I have · She has · They have"
          color="from-teal-500 to-emerald-600"
          available
        />
        <TopicCard
          href="/step3/grammar/possessive-adjectives"
          emoji="🏠"
          title="Possessive Adjectives"
          hebrewTitle="שמות גוף שייכות"
          description="my, your, his, her, its, our, their"
          color="from-violet-500 to-purple-600"
          available={true}
        />
        <TopicCard
          href="/step3/grammar/nouns"
          emoji="🏷️"
          title="Nouns"
          hebrewTitle="שמות עצם"
          description="Singular and plural nouns"
          color="from-orange-500 to-amber-600"
          available={true}
        />
        <TopicCard
          href="/step3/grammar/there-is"
          emoji="🌍"
          title="There is / There are"
          hebrewTitle="יש / ישנם"
          description="There is a cat · There are two dogs"
          color="from-sky-500 to-blue-600"
          available={true}
        />
        <TopicCard
          href="/step3/grammar/imperative"
          emoji="⚡"
          title="Imperative"
          hebrewTitle="ציווי"
          description="Open the door! · Don't run!"
          color="from-rose-500 to-red-600"
          available={true}
        />
        <TopicCard
          href="/step3/grammar/can"
          emoji="💪"
          title="Can"
          hebrewTitle="יכול"
          description="I can swim · She can't fly"
          color="from-indigo-500 to-blue-600"
          available={true}
        />
      </div>
    </div>
  )
}
