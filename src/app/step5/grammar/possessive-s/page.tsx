'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

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
          <div className="bg-purple-100 rounded-xl px-3 py-1.5 font-bold text-purple-700 text-base">
            the boy<span className="text-purple-900 underline">&apos;s</span> dog
            <span className="block font-bold text-purple-500 text-sm mt-0.5" dir="rtl">הכלב של הילד</span>
          </div>
          <div className="bg-purple-100 rounded-xl px-3 py-1.5 font-bold text-purple-700 text-base">
            the teacher<span className="text-purple-900 underline">&apos;s</span> pen
            <span className="block font-bold text-purple-500 text-sm mt-0.5" dir="rtl">העט של המורה</span>
          </div>
        </div>
      </div>

      {/* Plural ending in s */}
      <div className="bg-violet-50 border-4 border-violet-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-violet-700 text-center mb-1">Plural with s &rarr; &apos;</h3>
        <p className="font-bold text-violet-800 text-sm text-center mb-3" dir="rtl">
          למילה ברבים שמסתיימת ב-s יש להוסיף גרש (&apos;) אחרי ה-s
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="bg-violet-100 rounded-xl px-3 py-1.5 font-bold text-violet-700 text-base">
            my friends<span className="text-violet-900 underline">&apos;</span> bikes
            <span className="block font-bold text-violet-500 text-sm mt-0.5" dir="rtl">האופניים של החברים שלי</span>
          </div>
          <div className="bg-violet-100 rounded-xl px-3 py-1.5 font-bold text-violet-700 text-base">
            the pupils<span className="text-violet-900 underline">&apos;</span> bags
            <span className="block font-bold text-violet-500 text-sm mt-0.5" dir="rtl">התיקים של התלמידים</span>
          </div>
        </div>
      </div>

      {/* Irregular plural */}
      <div className="bg-fuchsia-50 border-4 border-fuchsia-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-fuchsia-700 text-center mb-1">Irregular plural &rarr; &apos;s</h3>
        <p className="font-bold text-fuchsia-800 text-sm text-center mb-3" dir="rtl">
          למילה ברבים אשר לא מסתיימת ב-s נוסיף &apos;s
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="bg-fuchsia-100 rounded-xl px-3 py-1.5 font-bold text-fuchsia-700 text-base">
            the children<span className="text-fuchsia-900 underline">&apos;s</span> toys
            <span className="block font-bold text-fuchsia-500 text-sm mt-0.5" dir="rtl">הצעצועים של הילדים</span>
          </div>
          <div className="bg-fuchsia-100 rounded-xl px-3 py-1.5 font-bold text-fuchsia-700 text-base">
            the men<span className="text-fuchsia-900 underline">&apos;s</span> hats
            <span className="block font-bold text-fuchsia-500 text-sm mt-0.5" dir="rtl">הכובעים של הגברים</span>
          </div>
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

// ── EX 2: type-in writing (build the possessive phrase) ─────────────────────────

interface Ex2Q { owner: string; object: string; answer: string }

const EX2_QUESTIONS: Ex2Q[] = [
  { owner: 'Dan',         object: 'ball',  answer: "Dan's ball"          },
  { owner: 'the boys',    object: 'bags',  answer: "the boys' bags"      },
  { owner: 'the children', object: 'toys', answer: "the children's toys" },
  { owner: 'Maya',        object: 'book',  answer: "Maya's book"         },
  { owner: 'the girls',   object: 'room',  answer: "the girls' room"     },
  { owner: 'the men',     object: 'hats',  answer: "the men's hats"      },
  { owner: 'the teacher', object: 'pen',   answer: "the teacher's pen"   },
  { owner: 'the dogs',    object: 'food',  answer: "the dogs' food"      },
  { owner: 'the women',   object: 'shoes', answer: "the women's shoes"   },
  { owner: 'Tom',         object: 'bike',  answer: "Tom's bike"          },
]

// normalize whitespace, case, and curly apostrophes for matching
function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ')
}

function Ex2() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [wrongCount, setWrongCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX2_QUESTIONS[current]
  const isLast = current === EX2_QUESTIONS.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const advance = () => {
    if (isLast) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setInput('')
      setStatus('idle')
      setWrongCount(0)
    }
  }

  const submit = () => {
    if (!input.trim()) return
    if (normalize(input) === normalize(q.answer)) {
      setStatus('correct')
      setTimeout(advance, 700)
    } else {
      const next = wrongCount + 1
      setWrongCount(next)
      setStatus('wrong')
      if (next >= 2) {
        // reveal the answer, keep on screen, then auto-advance
        setTimeout(() => {
          setStatus('correct')
          setInput(q.answer)
          setTimeout(advance, 3000)
        }, 600)
      } else {
        // flash red, clear, retry SAME question
        setTimeout(() => { setStatus('idle'); setInput('') }, 900)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  const again = () => {
    setCurrent(0)
    setInput('')
    setStatus('idle')
    setWrongCount(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX2_QUESTIONS.length} השאלות!</p>
        <button onClick={again} className="btn-kid bg-violet-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX2_QUESTIONS.length}</span>
        <span className="text-violet-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        כתבו את צורת השייכות הנכונה.
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Write the correct possessive phrase
      </p>

      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl px-4 py-3 mb-3 flex items-center justify-center gap-3">
        <div className="text-center">
          <p className="text-xs font-bold text-violet-400 mb-0.5">Owner</p>
          <p className="font-black text-violet-800 text-lg">{q.owner}</p>
        </div>
        <span className="text-violet-300 font-black text-2xl">+</span>
        <div className="text-center">
          <p className="text-xs font-bold text-violet-400 mb-0.5">Object</p>
          <p className="font-black text-violet-800 text-lg">{q.object}</p>
        </div>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        status === 'correct' ? 'bg-green-50 border-green-300' :
        'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { if (status === 'idle') setInput(e.target.value) }}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder="..."
            className={`border-b-2 font-bold text-base text-center min-w-[180px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              status === 'correct' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {status === 'correct' && <span className="text-xl">✅</span>}
        </div>
        {status === 'correct' && (
          <p className="mt-2 font-bold text-green-600 text-sm text-center">✔ {q.answer}</p>
        )}
        {status === 'wrong' && (
          <p className="mt-2 font-bold text-red-500 text-sm text-center" dir="rtl">נסו שוב</p>
        )}
      </div>

      {status === 'idle' && (
        <div className="flex justify-center">
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="btn-kid bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function PossessiveSPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
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
        {tab === 'ex2' && <Ex2 />}
      </div>
    </div>
  )
}
