'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1'

// ── LEARN ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-violet-50 border-4 border-violet-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-violet-700 text-center mb-1">
          Possessive &quot;s&quot;
        </h2>
        <p className="font-display font-black text-xl text-violet-600 text-center mb-2" dir="rtl">
          שייכות עם &quot;s&quot;
        </p>
        <p className="font-bold text-violet-800 text-sm text-center" dir="rtl">
          על מנת לתאר שייכות יש להוסיף &quot;s&quot; לשם האדם או שם העצם שהחפץ שייך לו.
        </p>
      </div>

      {/* Singular */}
      <div className="bg-purple-50 border-4 border-purple-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-purple-700 text-center mb-1">Singular &rarr; &apos;s</h3>
        <p className="font-bold text-purple-800 text-sm text-center mb-3" dir="rtl">
          ליחיד מוסיפים &apos;s
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="bg-purple-100 rounded-xl px-3 py-1.5 font-bold text-purple-700 text-base">the boy<span className="text-purple-900 underline">&apos;s</span> dog</div>
          <div className="bg-purple-100 rounded-xl px-3 py-1.5 font-bold text-purple-700 text-base">the teacher<span className="text-purple-900 underline">&apos;s</span> pen</div>
        </div>
      </div>

      {/* Plural ending in s */}
      <div className="bg-violet-50 border-4 border-violet-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-violet-700 text-center mb-1">Plural with s &rarr; &apos;</h3>
        <p className="font-bold text-violet-800 text-sm text-center mb-3" dir="rtl">
          למילה ברבים שמסתיימת ב-s יש להוסיף גרש (&apos;) אחרי ה-s
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="bg-violet-100 rounded-xl px-3 py-1.5 font-bold text-violet-700 text-base">my friends<span className="text-violet-900 underline">&apos;</span> bikes</div>
          <div className="bg-violet-100 rounded-xl px-3 py-1.5 font-bold text-violet-700 text-base">the pupils<span className="text-violet-900 underline">&apos;</span> bags</div>
        </div>
      </div>

      {/* Irregular plural */}
      <div className="bg-fuchsia-50 border-4 border-fuchsia-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-fuchsia-700 text-center mb-1">Irregular plural &rarr; &apos;s</h3>
        <p className="font-bold text-fuchsia-800 text-sm text-center mb-3" dir="rtl">
          למילה ברבים אשר לא מסתיימת ב-s נוסיף &apos;s
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="bg-fuchsia-100 rounded-xl px-3 py-1.5 font-bold text-fuchsia-700 text-base">the children<span className="text-fuchsia-900 underline">&apos;s</span> toys</div>
          <div className="bg-fuchsia-100 rounded-xl px-3 py-1.5 font-bold text-fuchsia-700 text-base">the men<span className="text-fuchsia-900 underline">&apos;s</span> hats</div>
        </div>
      </div>
    </div>
  )
}

// ── EX 1: read & translate (reveal Hebrew) ──────────────────────────────────────

interface Phrase {
  english: string
  emoji: string
  hebrew: string
}

const PHRASES: Phrase[] = [
  { english: 'The baby\'s toy',        emoji: '🧸',  hebrew: 'הצעצוע של התינוק' },
  { english: 'The children\'s dog',    emoji: '🐕',  hebrew: 'הכלב של הילדים' },
  { english: 'The girls\' teacher',    emoji: '👩‍🏫', hebrew: 'המורה של הבנות' },
  { english: 'Ben\'s bike',            emoji: '🚲',  hebrew: 'האופניים של בן' },
  { english: 'The cat\'s food',        emoji: '🍽️',  hebrew: 'האוכל של החתול' },
  { english: 'My sister\'s book',      emoji: '📖',  hebrew: 'הספר של אחותי' },
  { english: 'The boys\' ball',        emoji: '⚽',  hebrew: 'הכדור של הבנים' },
  { english: 'The men\'s shoes',       emoji: '👞',  hebrew: 'הנעליים של הגברים' },
  { english: 'The teacher\'s desk',    emoji: '🪑',  hebrew: 'השולחן של המורה' },
  { english: 'The neighbors\' garden', emoji: '🌳',  hebrew: 'הגינה של השכנים' },
  { english: 'Dana\'s phone',          emoji: '📱',  hebrew: 'הטלפון של דנה' },
  { english: 'The women\'s hats',      emoji: '👒',  hebrew: 'הכובעים של הנשים' },
  { english: 'The dog\'s tail',        emoji: '🐶',  hebrew: 'הזנב של הכלב' },
  { english: 'The students\' books',   emoji: '📚',  hebrew: 'הספרים של התלמידים' },
  { english: 'My mom\'s car',          emoji: '🚗',  hebrew: 'המכונית של אמא שלי' },
]

function Ex1Tab() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const toggle = (idx: number) => {
    setRevealed(prev => {
      const s = new Set(prev)
      if (s.has(idx)) s.delete(idx)
      else s.add(idx)
      return s
    })
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-violet-700 text-center mb-1">
          Read &amp; Translate
        </h2>
        <p className="font-bold text-sm text-violet-600 text-center" dir="rtl">
          קרא ותרגם בעל פה. לחץ על ? כדי לראות את התרגום.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PHRASES.map((p, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-violet-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 text-base font-bold leading-relaxed text-gray-700">
                <span className="text-gray-400 font-black text-sm mr-2">{idx + 1}.</span>
                {p.english}
              </div>
              <span className="text-2xl flex-shrink-0">{p.emoji}</span>
              <button
                onClick={() => toggle(idx)}
                aria-label="Show translation"
                className={`flex-shrink-0 w-8 h-8 rounded-full font-display font-black text-base border-2 transition-colors active:scale-95 ${
                  revealed.has(idx)
                    ? 'bg-violet-500 text-white border-violet-500'
                    : 'bg-violet-50 text-violet-600 border-violet-300 hover:bg-violet-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-violet-100 font-bold text-violet-700 text-base text-right" dir="rtl">
                {p.hebrew}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function PossessiveSPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
  ]

  const TAB = 'px-4 py-1.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Grammar
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Possessive &quot;s&quot; 🔑</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שייכות באנגלית — &quot;s&quot;</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && <Ex1Tab />}
      </div>
    </div>
  )
}
