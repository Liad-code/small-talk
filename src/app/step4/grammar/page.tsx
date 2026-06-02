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

export default function Step4GrammarPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step4" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 4</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Grammar 📝</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">בחר נושא כדי ללמוד ולתרגל</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <TopicCard
          href="/step4/grammar/present-simple"
          emoji="🔄"
          title="Present Simple"
          hebrewTitle="הווה פשוט"
          description="I play · She plays"
          color="from-teal-500 to-emerald-600"
          available={true}
        />
        <TopicCard
          href="/step4/grammar/present-progressive"
          emoji="🏃"
          title="Present Progressive"
          hebrewTitle="הווה ממושך"
          description="I am playing · She is running"
          color="from-violet-500 to-purple-600"
          available={true}
        />
        <TopicCard
          href="/step4/grammar/mixed"
          emoji="🔀"
          title="Mixed Practice"
          hebrewTitle="תרגול מעורב"
          description="Present Simple vs Progressive"
          color="from-orange-500 to-amber-600"
          available={true}
        />
      </div>
    </div>
  )
}
