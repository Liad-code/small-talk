'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Data ─────────────────────────────────────────────────────────────────────

const SIGHT_WORDS: { word: string; hebrew: string }[] = [
  { word: 'a',      hebrew: 'א' },
  { word: 'find',   hebrew: 'מצא' },
  { word: 'is',     hebrew: 'פועל עזר' },
  { word: 'not',    hebrew: 'לא' },
  { word: 'three',  hebrew: 'שלוש' },
  { word: 'and',    hebrew: 'ו/וגם' },
  { word: 'for',    hebrew: 'בשביל' },
  { word: 'it',     hebrew: 'זה' },
  { word: 'one',    hebrew: 'אחד' },
  { word: 'to',     hebrew: 'אל/ל' },
  { word: 'away',   hebrew: 'הרחק' },
  { word: 'funny',  hebrew: 'מצחיק' },
  { word: 'jump',   hebrew: 'קפוץ' },
  { word: 'play',   hebrew: 'שחק' },
  { word: 'two',    hebrew: 'שניים' },
  { word: 'big',    hebrew: 'גדול' },
  { word: 'go',     hebrew: 'לך' },
  { word: 'little', hebrew: 'קטן' },
  { word: 'red',    hebrew: 'אדום' },
  { word: 'up',     hebrew: 'למעלה' },
  { word: 'blue',   hebrew: 'כחול' },
  { word: 'help',   hebrew: 'עזור' },
  { word: 'look',   hebrew: 'הסתכל' },
  { word: 'run',    hebrew: 'רוץ' },
  { word: 'we',     hebrew: 'אנחנו' },
  { word: 'can',    hebrew: 'יכול' },
  { word: 'here',   hebrew: 'כאן' },
  { word: 'make',   hebrew: 'עשה' },
  { word: 'where',  hebrew: 'איפה' },
  { word: 'come',   hebrew: 'בוא' },
  { word: 'I',      hebrew: 'אני' },
  { word: 'me',     hebrew: 'אני/אותי' },
  { word: 'see',    hebrew: 'רואה' },
  { word: 'yellow', hebrew: 'צהוב' },
  { word: 'down',   hebrew: 'למטה' },
  { word: 'in',     hebrew: 'ב/בתוך' },
  { word: 'my',     hebrew: 'שלי' },
  { word: 'the',    hebrew: 'ה' },
  { word: 'you',    hebrew: 'את, אתה, אתם, אתן' },
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
    parts: parseSentence('A cat is in the tree.', ['in', 'is']),
    emoji: '🌳',
    hebrew: 'חתול נמצא על העץ.',
  },
  {
    parts: parseSentence('I can run and jump.', ['I', 'can', 'and']),
    emoji: '🏃',
    hebrew: 'אני יכול לרוץ ולקפוץ.',
  },
  {
    parts: parseSentence('The big dog is here.', ['The', 'big', 'here']),
    emoji: '🐕',
    hebrew: 'הכלב הגדול נמצא כאן.',
  },
  {
    parts: parseSentence('We go to school.', ['We', 'go', 'to']),
    emoji: '🏫',
    hebrew: 'אנחנו הולכים לבית הספר.',
  },
  {
    parts: parseSentence('Look at the red ball.', ['Look', 'the', 'red']),
    emoji: '⚽',
    hebrew: 'תסתכל על הכדור האדום.',
  },
  {
    parts: parseSentence('You can help me.', ['You', 'can', 'help', 'me']),
    emoji: '🤝',
    hebrew: 'אתה יכול לעזור לי.',
  },
  {
    parts: parseSentence('Come down and play.', ['Come', 'down', 'and', 'play']),
    emoji: '🎮',
    hebrew: 'בוא למטה ותשחק.',
  },
  {
    parts: parseSentence('My cat is little.', ['My', 'little']),
    emoji: '🐱',
    hebrew: 'החתול שלי קטן.',
  },
  {
    parts: parseSentence('Where is the blue ball?', ['Where', 'the', 'blue']),
    emoji: '💙',
    hebrew: 'איפה הכדור הכחול?',
  },
  {
    parts: parseSentence('You can see the funny dog.', ['You', 'can', 'see', 'the', 'funny']),
    emoji: '😄',
    hebrew: 'אתה יכול לראות את הכלב המצחיק.',
  },
  {
    parts: parseSentence('He can run far away.', ['He', 'can', 'run', 'away']),
    emoji: '🏃',
    hebrew: 'הוא יכול לרוץ רחוק.',
  },
  {
    parts: parseSentence('One big fish is in the water.', ['One', 'big', 'in', 'the']),
    emoji: '🐟',
    hebrew: 'דג גדול אחד נמצא במים.',
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
  { before: 'I see',        after: 'book on the table.', correct: 'a',      wrong: 'to'   },
  { before: 'I can see',    after: 'birds in the tree.', correct: 'three',  wrong: 'and'  },
  { before: 'I can',        after: 'high.',              correct: 'jump',   wrong: 'help' },
  { before: 'I can',        after: 'fast.',              correct: 'run',    wrong: 'here' },
  { before: 'The ball is',  after: '.',                  correct: 'yellow', wrong: 'you'  },
  { before: 'This is',      after: 'book.',              correct: 'my',     wrong: 'make' },
  { before: 'You are',      after: '.',                  correct: 'funny',  wrong: 'see'  },
  { before: 'I want to',    after: 'with you.',          correct: 'play',   wrong: 'big'  },
  { before: 'I',            after: 'read a book.',       correct: 'can',    wrong: 'where' },
  { before: 'This is a',    after: 'dog.',               correct: 'big',    wrong: 'away' },
]

// ── Ex3 data ──────────────────────────────────────────────────────────────────

const EX3_QUESTIONS: Ex2Q[] = [
  { before: 'I',           after: 'see a cat.',  correct: 'can',    wrong: 'the'   },
  { before: 'The dog is',  after: '.',           correct: 'big',    wrong: 'go'    },
  { before: 'Look',        after: 'the sky.',    correct: 'up',     wrong: 'me'    },
  { before: 'I',           after: 'the red ball.', correct: 'see',  wrong: 'two'   },
  { before: 'Come',        after: 'here.',       correct: 'down',   wrong: 'funny' },
  { before: 'The cat is',  after: '.',           correct: 'little', wrong: 'jump'  },
  { before: 'We',          after: 'to the park.', correct: 'go',    wrong: 'is'    },
  { before: 'The sun is',  after: '.',           correct: 'yellow', wrong: 'run'   },
  { before: 'I',           after: 'my friend.',  correct: 'help',   wrong: 'blue'  },
  { before: 'It is',       after: 'to me.',      correct: 'funny',  wrong: 'look'  },
]

// ── Learn Tab ─────────────────────────────────────────────────────────────────

const ROW_COLORS = [
  'bg-emerald-50 border-emerald-200',
  'bg-teal-50 border-teal-200',
  'bg-green-50 border-green-200',
  'bg-cyan-50 border-cyan-200',
]

function LearnTab() {
  // Split 40 words into rows of 4 columns (word | hebrew | word | hebrew)
  const rows: typeof SIGHT_WORDS[] = []
  for (let i = 0; i < SIGHT_WORDS.length; i += 2) {
    rows.push(SIGHT_WORDS.slice(i, i + 2))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5 mb-4">
        <h2 className="font-display font-black text-2xl text-emerald-700 text-center mb-1">
          40 Sight Words
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

function FillInTab({ questions }: { questions: Ex2Q[] }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  // Shuffle option order once per mount
  const [order] = useState<boolean[]>(() => questions.map(() => Math.random() < 0.5))
  const [resetKey, setResetKey] = useState(0)

  const total = questions.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: string) => {
    if (answered[idx]) return
    if (val === questions[idx].correct) {
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
        {questions.map((q, idx) => {
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
    { id: 'ex3',   label: 'Ex 3' },
  ]

  const TAB = 'px-4 py-1.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Step 3
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Sight Words 👁️</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">מילים נפוצות לזיהוי מיידי</p>
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
        {tab === 'ex2'   && <FillInTab questions={EX2_QUESTIONS} />}
        {tab === 'ex3'   && <FillInTab questions={EX3_QUESTIONS} />}
      </div>
    </div>
  )
}
