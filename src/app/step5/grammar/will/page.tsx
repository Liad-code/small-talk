'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

interface SubCardProps {
  href?: string
  emoji: string
  title: string
  hebrewTitle: string
  description: string
  color: string
  available: boolean
}

function SubCard({ href, emoji, title, hebrewTitle, description, color, available }: SubCardProps) {
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

export default function WillHubPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Future: Will 🔮</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">עתיד — will</p>
          <p className="text-white/70 font-bold text-sm mt-0.5">will + verb · I will help · She will help</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <SubCard href="/step5/grammar/will/positive" emoji="✅" title="Positive"
          hebrewTitle="צורת החיוב" description="I will help · She'll go" color="from-blue-500 to-indigo-600" available />
        <SubCard href="/step5/grammar/will/negative" emoji="🚫" title="Negative"
          hebrewTitle="צורת השלילה" description="It will not rain · won't" color="from-rose-500 to-red-600" available />
        <SubCard href="/step5/grammar/will/yes-no" emoji="❓" title="Yes / No Questions"
          hebrewTitle="שאלות כן / לא" description="Will she help?" color="from-emerald-500 to-green-600" available />
        <SubCard href="/step5/grammar/will/wh" emoji="❔" title="Wh Questions"
          hebrewTitle="שאלות Wh" description="When will she come?" color="from-amber-500 to-orange-600" available />
      </div>
    </div>
  )
}
