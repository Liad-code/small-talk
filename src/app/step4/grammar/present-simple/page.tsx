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

export default function PresentSimpleHubPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/step4/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-1">Present Simple 🔄</h1>
          <p className="text-white/80 font-bold text-lg" dir="rtl">הווה פשוט — בחר נושא</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 flex flex-col gap-3">
        <SubCard href="/step4/grammar/present-simple/positive" emoji="✅" title="Positive"
          hebrewTitle="חיוב" description="I play · She plays" color="from-teal-500 to-emerald-600" />
        <SubCard href="/step4/grammar/present-simple/negative" emoji="❌" title="Negative"
          hebrewTitle="שלילה" description="I don't play · She doesn't play" color="from-rose-500 to-red-600" />
        <SubCard href="/step4/grammar/present-simple/yes-no" emoji="❓" title="Yes / No Questions"
          hebrewTitle="שאלות כן/לא" description="Do you play? · Does she play?" color="from-sky-500 to-blue-600" />
        <SubCard href="/step4/grammar/present-simple/wh" emoji="❔" title="Wh Questions"
          hebrewTitle="שאלות Wh" description="Where do you live? · What does he eat?" color="from-amber-500 to-orange-600" />
      </div>
    </div>
  )
}
