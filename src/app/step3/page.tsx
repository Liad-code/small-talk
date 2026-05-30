'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

interface TopicCardProps {
  href?: string
  emoji: string
  title: string
  hebrewTitle: string
  description: string
  hebrewDesc: string
  color: string
  textColor: string
  available: boolean
}

function TopicCard({ href, emoji, title, hebrewTitle, description, hebrewDesc, color, textColor, available }: TopicCardProps) {
  const inner = (
    <div className={`
      bg-gradient-to-br ${color} rounded-3xl p-6
      shadow-lg border-4 border-white/50
      card-3d flex flex-col gap-3 h-full
      ${available ? 'group-hover:rotate-1' : 'opacity-60'}
    `}>
      <div className="flex items-start justify-between gap-2">
        <span className={`text-6xl leading-none inline-block ${available ? 'transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1' : ''}`}>
          {emoji}
        </span>
        {!available && (
          <span className="bg-black/20 text-white text-xs font-black px-2 py-1 rounded-full flex-shrink-0">
            Soon
          </span>
        )}
      </div>
      <div>
        <h2 className={`font-display font-bold text-xl leading-tight ${textColor}`}>{title}</h2>
        <p className={`font-bold text-sm opacity-80 ${textColor}`} dir="rtl">{hebrewTitle}</p>
      </div>
      <p className={`text-sm font-bold opacity-75 ${textColor}`}>{description}</p>
      <p className={`text-xs font-bold opacity-60 ${textColor}`} dir="rtl">{hebrewDesc}</p>
    </div>
  )

  if (!available || !href) return <div className="h-full">{inner}</div>
  return (
    <Link href={href} className="no-underline group block h-full">
      {inner}
    </Link>
  )
}

export default function Step3Page() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="text-center py-8 px-4">
        <div className="text-6xl mb-3">🦁</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-orange-700 mb-2">
          Step 3
        </h1>
        <p className="text-xl font-bold text-orange-600 mb-1">Grammar, Sight Words and More!</p>
      </section>

      <div className="max-w-2xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TopicCard
          href="/step3/phonics"
          emoji="🔤"
          title="Phonics"
          hebrewTitle=""
          description="Advanced phonics patterns"
          hebrewDesc=""
          color="from-purple-400 to-indigo-500"
          textColor="text-white"
          available
        />
        <TopicCard
          href="/step3/sight-words"
          emoji="👁️"
          title="Sight Words"
          hebrewTitle="מילות ראייה"
          description="Common words to recognize instantly"
          hebrewDesc="מילים נפוצות לזיהוי מיידי"
          color="from-emerald-400 to-green-500"
          textColor="text-white"
          available
        />
        <TopicCard
          href="/step3/grammar"
          emoji="📝"
          title="Grammar"
          hebrewTitle="דקדוק"
          description="Have/has, possessives, nouns and more!"
          hebrewDesc="יש, שייכות, שמות עצם ועוד"
          color="from-blue-500 to-cyan-500"
          textColor="text-white"
          available
        />
      </div>
    </div>
  )
}
