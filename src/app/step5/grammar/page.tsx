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

export default function Step5GrammarPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step5" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 5</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Grammar 📝</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">בחר נושא כדי ללמוד ולתרגל</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <TopicCard href="/step5/grammar/prepositions-of-time" emoji="⏰" title="Prepositions of Time" hebrewTitle="מילות יחס של זמן" description="in, on, at" color="from-sky-500 to-cyan-600" available />
        <TopicCard href="/step5/grammar/nouns" emoji="🧮" title="Nouns: Count & Non-Count" hebrewTitle="שמות עצם ספירים ולא ספירים" description="a book · some water" color="from-orange-500 to-amber-600" available />
        <TopicCard href="/step5/grammar/possessive-s" emoji="🔑" title="Possessive 's" hebrewTitle="שייכות עם 's" description="Dan's ball · the dog's tail" color="from-violet-500 to-purple-600" available />
        <TopicCard href="/step5/grammar/adjectives-and-adverbs" emoji="📐" title="Adjectives & Adverbs" hebrewTitle="שמות תואר ותארי הפועל" description="quick · quickly" color="from-pink-500 to-rose-600" available />
        <TopicCard emoji="⏪" title="To Be: Was / Were" hebrewTitle="פועל היה — was / were" description="I was · They were" color="from-teal-500 to-emerald-600" available={false} />
        <TopicCard emoji="📅" title="Past Simple" hebrewTitle="עבר פשוט" description="I played · She went" color="from-amber-500 to-orange-600" available={false} />
        <TopicCard emoji="💪" title="Can / Could" hebrewTitle="יכול / היה יכול" description="I can · I could" color="from-lime-500 to-green-600" available={false} />
        <TopicCard emoji="🔮" title="Future: Will" hebrewTitle="עתיד — will" description="I will play" color="from-blue-500 to-indigo-600" available={false} />
        <TopicCard emoji="🎯" title="Future: Going To" hebrewTitle="עתיד — going to" description="I am going to play" color="from-cyan-500 to-blue-600" available={false} />
        <TopicCard emoji="🔀" title="Mixed Practice" hebrewTitle="תרגול מעורב" description="All tenses together" color="from-fuchsia-500 to-purple-600" available={false} />
      </div>
    </div>
  )
}
