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

export default function Step2Page() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="text-center py-8 px-4">
        <div className="text-6xl mb-3">🐥</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-purple-700 mb-2">
          Step 2
        </h1>
        <p className="text-xl font-bold text-purple-600 mb-1">Digraphs, Vowel Patterns and Grammar!</p>
      </section>

      {/* 5 topic squares */}
      <div className="max-w-2xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TopicCard
          href="/step2/phonics"
          emoji="🔤"
          title="Phonics"
          hebrewTitle=""
          description="Digraphs and vowel patterns"
          hebrewDesc=""
          color="from-purple-400 to-indigo-500"
          textColor="text-white"
          available
        />
        <TopicCard
          href="/step2/grammar"
          emoji="📝"
          title="Grammar"
          hebrewTitle="דקדוק"
          description="Nouns, verbs, pronouns and more grammar rules!"
          hebrewDesc="שמות עצם, פעלים, שמות גוף ועוד"
          color="from-blue-500 to-cyan-500"
          textColor="text-white"
          available
        />
        <TopicCard
          emoji="✏️"
          title="Spelling"
          hebrewTitle="כתיבה"
          description="Spell words with digraphs correctly."
          hebrewDesc="כתיבת מילים עם צלילי שתי אותיות"
          color="from-green-300 to-emerald-400"
          textColor="text-white"
          available={false}
        />
        <TopicCard
          emoji="🎵"
          title="Rhymes"
          hebrewTitle="חרוזים"
          description="Identify and create rhyming words."
          hebrewDesc="זיהוי ויצירת מילים חורזות"
          color="from-pink-300 to-rose-400"
          textColor="text-white"
          available={false}
        />
        <TopicCard
          href="/step2/vocabulary"
          emoji="📖"
          title="Vocabulary"
          hebrewTitle="אוצר מילים"
          description="Numbers and colors — learn and practice!"
          hebrewDesc="מספרים וצבעים — למידה ותרגול"
          color="from-teal-400 to-emerald-500"
          textColor="text-white"
          available
        />
        <TopicCard
          emoji="🎯"
          title="Review"
          hebrewTitle="חזרה"
          description="Mix of all Step 2 skills."
          hebrewDesc="שילוב כל הנושאים של שלב 2"
          color="from-amber-300 to-orange-400"
          textColor="text-white"
          available={false}
        />
      </div>

      <div className="text-center pb-10 px-4">
        <Link href="/" className="text-sm text-purple-400 font-bold hover:text-purple-600 no-underline inline-block">
          ← Back to all subjects
        </Link>
      </div>
    </div>
  )
}
