'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

// ── Data ─────────────────────────────────────────────────────────────────────

const SIGHT_WORDS: { word: string; hebrew: string }[] = [
  { word: 'all',    hebrew: 'הכל' },
  { word: 'am',     hebrew: 'אני' },
  { word: 'are',    hebrew: 'פועל עזר' },
  { word: 'at',     hebrew: 'אצל' },
  { word: 'ate',    hebrew: 'אכל' },
  { word: 'be',     hebrew: 'להיות' },
  { word: 'black',  hebrew: 'שחור' },
  { word: 'brown',  hebrew: 'חום' },
  { word: 'but',    hebrew: 'אבל' },
  { word: 'came',   hebrew: 'בא' },
  { word: 'did',    hebrew: 'עשה' },
  { word: 'do',     hebrew: 'לעשות' },
  { word: 'eat',    hebrew: 'לאכול' },
  { word: 'four',   hebrew: 'ארבע' },
  { word: 'get',    hebrew: 'לקבל' },
  { word: 'good',   hebrew: 'טוב' },
  { word: 'have',   hebrew: 'יש' },
  { word: 'he',     hebrew: 'הוא' },
  { word: 'into',   hebrew: 'לתוך' },
  { word: 'like',   hebrew: 'אוהב' },
  { word: 'must',   hebrew: 'חייב' },
  { word: 'new',    hebrew: 'חדש' },
  { word: 'no',     hebrew: 'לא' },
  { word: 'now',    hebrew: 'עכשיו' },
  { word: 'on',     hebrew: 'על' },
  { word: 'our',    hebrew: 'שלנו' },
  { word: 'out',    hebrew: 'בחוץ' },
  { word: 'please', hebrew: 'בבקשה' },
  { word: 'pretty', hebrew: 'יפה' },
  { word: 'ride',   hebrew: 'לרכוב' },
  { word: 'say',    hebrew: 'לומר' },
  { word: 'she',    hebrew: 'היא' },
  { word: 'so',     hebrew: 'אז' },
  { word: 'soon',   hebrew: 'בקרוב' },
  { word: 'that',   hebrew: 'זה' },
  { word: 'there',  hebrew: 'שם' },
  { word: 'they',   hebrew: 'הם' },
  { word: 'this',   hebrew: 'זה' },
  { word: 'too',    hebrew: 'גם' },
  { word: 'under',  hebrew: 'מתחת' },
  { word: 'want',   hebrew: 'רוצה' },
  { word: 'was',    hebrew: 'היה' },
  { word: 'well',   hebrew: 'טוב' },
  { word: 'what',   hebrew: 'מה' },
  { word: 'white',  hebrew: 'לבן' },
  { word: 'who',    hebrew: 'מי' },
  { word: 'will',   hebrew: 'עתיד' },
  { word: 'with',   hebrew: 'עם' },
  { word: 'yes',    hebrew: 'כן' },
]

// Set of sight word strings (lowercase) for quick lookup
const SIGHT_SET = new Set(SIGHT_WORDS.map(w => w.word.toLowerCase()))

// ── Sentence data ─────────────────────────────────────────────────────────────

interface SentencePart {
  text: string
  highlight: boolean
}

interface Sentence {
  parts: SentencePart[]
  emoji: string
  hebrew: string
}

function parseSentence(raw: string, highlightWords: string[]): SentencePart[] {
  const highlightSet = new Set(highlightWords.map(w => w.toLowerCase()))
  // Split on spaces, preserving punctuation attached to words
  const tokens = raw.split(/(\s+)/)
  const parts: SentencePart[] = []
  for (const token of tokens) {
    if (/^\s+$/.test(token)) {
      if (parts.length > 0) {
        parts[parts.length - 1] = { ...parts[parts.length - 1], text: parts[parts.length - 1].text + token }
      } else {
        parts.push({ text: token, highlight: false })
      }
    } else {
      // Strip punctuation for comparison
      const clean = token.replace(/[^a-zA-Z]/g, '').toLowerCase()
      const highlight = highlightSet.has(clean)
      parts.push({ text: token, highlight })
    }
  }
  return parts
}

const SENTENCES: Sentence[] = [
  {
    parts: parseSentence('I am a good boy.', ['I', 'am', 'good']),
    emoji: '😊',
    hebrew: 'אני ילד טוב.',
  },
  {
    parts: parseSentence('She has a black cat.', ['She', 'black']),
    emoji: '🐈‍⬛',
    hebrew: 'יש לה חתול שחור.',
  },
  {
    parts: parseSentence('They came to play.', ['They', 'came']),
    emoji: '🎉',
    hebrew: 'הם באו לשחק.',
  },
  {
    parts: parseSentence('They are out now.', ['They', 'are', 'out', 'now']),
    emoji: '🏃',
    hebrew: 'הם בחוץ עכשיו.',
  },
  {
    parts: parseSentence('He ate four apples.', ['He', 'ate', 'four']),
    emoji: '🍎',
    hebrew: 'הוא אכל ארבעה תפוחים.',
  },
  {
    parts: parseSentence('Do you want this?', ['Do', 'want', 'this']),
    emoji: '🎁',
    hebrew: 'אתה רוצה את זה?',
  },
  {
    parts: parseSentence('The new bike is white.', ['new', 'white']),
    emoji: '🚲',
    hebrew: 'האופניים החדשים לבנים.',
  },
  {
    parts: parseSentence('Please come now.', ['Please', 'now']),
    emoji: '⏰',
    hebrew: 'בבקשה בוא עכשיו.',
  },
  {
    parts: parseSentence('I like the pretty bird.', ['I', 'like', 'pretty']),
    emoji: '🐦',
    hebrew: 'אני אוהב את הציפור היפה.',
  },
  {
    parts: parseSentence('Our dog is brown.', ['Our', 'brown']),
    emoji: '🐕',
    hebrew: 'הכלב שלנו חום.',
  },
  {
    parts: parseSentence('She will be there soon.', ['She', 'will', 'be', 'there', 'soon']),
    emoji: '🕐',
    hebrew: 'היא תהיה שם בקרוב.',
  },
  {
    parts: parseSentence('What did you eat?', ['What', 'did', 'eat']),
    emoji: '🍽️',
    hebrew: 'מה אכלת?',
  },
]

// ── Ex2 data ──────────────────────────────────────────────────────────────────

interface Ex2Q {
  before: string
  after: string
  correct: string
  wrong: string
}

const EX2_QUESTIONS: Ex2Q[] = [
  { before: 'I',           after: 'a good boy.', correct: 'am',    wrong: 'are'   },
  { before: 'The cat is',  after: '.',           correct: 'black', wrong: 'brown' },
  { before: 'We',          after: 'to school.',  correct: 'came',  wrong: 'do'    },
  { before: '',            after: 'you want this?', correct: 'Do', wrong: 'Did'   },
  { before: 'He',          after: 'four apples.', correct: 'ate',  wrong: 'eat'   },
  { before: 'The bike is', after: '.',           correct: 'white', wrong: 'new'   },
  { before: 'She',         after: 'be there soon.', correct: 'will', wrong: 'was' },
  { before: 'Please come', after: '.',           correct: 'now',   wrong: 'no'    },
  { before: 'Our dog is',  after: '.',           correct: 'brown', wrong: 'good'  },
  { before: '',            after: 'did you eat?', correct: 'What', wrong: 'Who'   },
]

// ── Learn Tab ─────────────────────────────────────────────────────────────────

const ROW_COLORS = [
  'bg-emerald-50 border-emerald-200',
  'bg-teal-50 border-teal-200',
  'bg-green-50 border-green-200',
  'bg-cyan-50 border-cyan-200',
]

function LearnTab() {
  // Split words into rows of 4 columns (word | hebrew | word | hebrew)
  const rows: typeof SIGHT_WORDS[] = []
  for (let i = 0; i < SIGHT_WORDS.length; i += 2) {
    rows.push(SIGHT_WORDS.slice(i, i + 2))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5 mb-4">
        <h2 className="font-display font-black text-2xl text-emerald-700 text-center mb-1">
          49 Sight Words
        </h2>
        <p className="font-bold text-emerald-600 text-sm text-center mb-4" dir="rtl">
          מילים נפוצות שחשוב להכיר
        </p>

        {/* Header row */}
        <div className="grid grid-cols-4 gap-1 mb-2 px-1">
          <div className="font-display font-black text-xs text-emerald-700 text-center uppercase tracking-wide">Word</div>
          <div className="font-bold text-xs text-emerald-600 text-center" dir="rtl">עברית</div>
          <div className="font-display font-black text-xs text-emerald-700 text-center uppercase tracking-wide">Word</div>
          <div className="font-bold text-xs text-emerald-600 text-center" dir="rtl">עברית</div>
        </div>

        {/* Word rows */}
        <div className="flex flex-col gap-1">
          {rows.map((pair, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid grid-cols-4 gap-1 rounded-xl border-2 px-2 py-1.5 ${ROW_COLORS[rowIdx % ROW_COLORS.length]}`}
            >
              {pair.map((item, colIdx) => (
                <>
                  <div key={`w-${colIdx}`} className="font-display font-black text-base text-emerald-800 text-center">
                    {item.word}
                  </div>
                  <div key={`h-${colIdx}`} className="font-bold text-sm text-gray-600 text-center" dir="rtl">
                    {item.hebrew}
                  </div>
                </>
              ))}
              {/* Pad if odd row */}
              {pair.length === 1 && (
                <>
                  <div className="col-span-1" />
                  <div className="col-span-1" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm font-bold text-gray-400" dir="rtl">
        נסו לזכור כמה שיותר מילים!
      </p>
    </div>
  )
}

// ── Ex 1 Tab ──────────────────────────────────────────────────────────────────

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
        <h2 className="font-display font-black text-xl text-emerald-700 text-center mb-1">
          Sight Words in Sentences
        </h2>
        <p className="font-bold text-sm text-emerald-600 text-center" dir="rtl">
          קרא את המשפטים ותרגם אותם לעברית. לחיצה על ? תציג את תרגום המשפט
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {SENTENCES.map((sentence, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-emerald-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 text-base font-bold leading-relaxed text-gray-700">
                <span className="text-gray-400 font-black text-sm mr-2">{idx + 1}.</span>
                {sentence.parts.map((part, pIdx) => (
                  <span
                    key={pIdx}
                    className={
                      part.highlight
                        ? 'font-black text-emerald-600 bg-emerald-100 rounded px-0.5'
                        : 'text-gray-700'
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </div>
              <span className="text-2xl flex-shrink-0">{sentence.emoji}</span>
              <button
                onClick={() => toggle(idx)}
                aria-label="Show translation"
                className={`flex-shrink-0 w-8 h-8 rounded-full font-display font-black text-base border-2 transition-colors active:scale-95 ${
                  revealed.has(idx)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-emerald-100 font-bold text-emerald-700 text-base text-right" dir="rtl">
                {sentence.hebrew}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Ex 2 Tab ──────────────────────────────────────────────────────────────────

function Ex2Tab() {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [order] = useState<boolean[]>(() => EX2_QUESTIONS.map(() => Math.random() < 0.5))
  const [resetKey, setResetKey] = useState(0)

  const total = EX2_QUESTIONS.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: string) => {
    if (answered[idx]) return
    if (val === EX2_QUESTIONS[idx].correct) {
      setAnswered(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => {
        const next = { ...prev }
        delete next[idx]
        return next
      }), 700)
    }
  }

  const again = () => {
    setAnswered({})
    setWrong({})
    setResetKey(k => k + 1)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={resetKey}>
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-emerald-700 text-center mb-1">
          Choose the correct word
        </h2>
        <p className="font-bold text-sm text-emerald-600 text-center" dir="rtl">
          לחצו על המילה הנכונה כדי להשלים את המשפט
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-emerald-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX2_QUESTIONS.map((q, idx) => {
          const isAnswered = answered[idx]
          const opts = order[idx] ? [q.correct, q.wrong] : [q.wrong, q.correct]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-emerald-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before ? q.before + ' ' : ''}
                {isAnswered ? (
                  <span className="font-black text-emerald-600 bg-emerald-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-emerald-300 font-black">___</span>
                )}
                {q.after === '.' || q.after === '?' ? q.after : ' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto">
                  {opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {isAnswered && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in mt-6">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את כל המשפטים!</p>
          <button onClick={again} className="btn-kid bg-emerald-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SightWordsPage() {
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

      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Step 4
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Sight Words 👁️</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">מילות ראייה — מילים נפוצות לזיהוי מיידי</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-3 py-2">
        <div className="flex gap-2 justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${
                tab === t.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1'   && <Ex1Tab />}
        {tab === 'ex2'   && <Ex2Tab />}
      </div>
    </div>
  )
}
