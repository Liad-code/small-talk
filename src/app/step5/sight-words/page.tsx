'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Data ─────────────────────────────────────────────────────────────────────

const SIGHT_WORDS: { word: string; hebrew: string }[] = [
  { word: 'after',   hebrew: 'אחרי' },
  { word: 'again',   hebrew: 'שוב' },
  { word: 'any',     hebrew: 'כלשהו' },
  { word: 'ask',     hebrew: 'לשאול' },
  { word: 'by',      hebrew: 'ליד, באמצעות' },
  { word: 'every',   hebrew: 'כל' },
  { word: 'fly',     hebrew: 'לעוף' },
  { word: 'from',    hebrew: 'מ-' },
  { word: 'give',    hebrew: 'לתת' },
  { word: 'has',     hebrew: 'יש ל-' },
  { word: 'her',     hebrew: 'שלה' },
  { word: 'his',     hebrew: 'שלו' },
  { word: 'just',    hebrew: 'בדיוק' },
  { word: 'know',    hebrew: 'לדעת' },
  { word: 'live',    hebrew: 'לגור' },
  { word: 'of',      hebrew: 'של' },
  { word: 'old',     hebrew: 'ישן/זקן' },
  { word: 'once',    hebrew: 'פעם' },
  { word: 'open',    hebrew: 'לפתוח' },
  { word: 'round',   hebrew: 'עגול' },
  { word: 'put',     hebrew: 'לשים' },
  { word: 'some',    hebrew: 'קצת' },
  { word: 'stop',    hebrew: 'לעצור' },
  { word: 'take',    hebrew: 'לקחת' },
  { word: 'thank',   hebrew: 'להודות' },
  { word: 'them',    hebrew: 'אותם' },
  { word: 'then',    hebrew: 'אז' },
  { word: 'think',   hebrew: 'לחשוב' },
  { word: 'walk',    hebrew: 'ללכת' },
  { word: 'always',  hebrew: 'תמיד' },
  { word: 'because', hebrew: 'כי' },
  { word: 'before',  hebrew: 'לפני' },
  { word: 'best',    hebrew: 'הכי טוב' },
  { word: 'both',    hebrew: 'שניהם' },
  { word: 'buy',     hebrew: 'לקנות' },
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
  const highlightSet = new Set(
    highlightWords.map(w => w.toLowerCase()).filter(w => SIGHT_SET.has(w))
  )
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
    parts: parseSentence('I always walk to school.', ['always', 'walk']),
    emoji: '🚶',
    hebrew: 'אני תמיד הולך לבית הספר.',
  },
  {
    parts: parseSentence('Please open the box.', ['open']),
    emoji: '📦',
    hebrew: 'בבקשה פתח את הקופסה.',
  },
  {
    parts: parseSentence('We buy bread before lunch.', ['buy', 'before']),
    emoji: '🍞',
    hebrew: 'אנחנו קונים לחם לפני ארוחת צהריים',
  },
  {
    parts: parseSentence('She has both books.', ['has', 'both']),
    emoji: '📚',
    hebrew: 'יש לה את שני הספרים.',
  },
  {
    parts: parseSentence('I think this is the best idea.', ['think', 'best']),
    emoji: '💭',
    hebrew: 'אני חושב שזה הרעיון הכי טוב.',
  },
  {
    parts: parseSentence('Take some water.', ['Take', 'some']),
    emoji: '💧',
    hebrew: 'קח קצת מים.',
  },
  {
    parts: parseSentence('We know his old house.', ['know', 'his', 'old']),
    emoji: '🏚️',
    hebrew: 'אנחנו מכירים את הבית הישן שלו.',
  },
  {
    parts: parseSentence('Please give them her book.', ['give', 'them', 'her']),
    emoji: '🎁',
    hebrew: 'בבקשה תן להם את הספר שלה.',
  },
  {
    parts: parseSentence('I walk because it is fun.', ['walk', 'because']),
    emoji: '😄',
    hebrew: 'אני הולך כי זה כיף.',
  },
  {
    parts: parseSentence('Birds fly from every tree.', ['fly', 'from', 'every']),
    emoji: '🐦',
    hebrew: 'ציפורים עפות מכל עץ.',
  },
  {
    parts: parseSentence('Stop and ask again.', ['Stop', 'ask', 'again']),
    emoji: '✋',
    hebrew: 'עצור ושאל שוב.',
  },
  {
    parts: parseSentence('Once a year we put a tree by the door.', ['Once', 'put', 'by']),
    emoji: '🎄',
    hebrew: 'פעם בשנה אנחנו שמים עץ ליד הדלת.',
  },
  {
    parts: parseSentence('The earth is round.', ['round']),
    emoji: '🌍',
    hebrew: 'כדור הארץ עגול.',
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
  { before: 'I',            after: 'to school.',   correct: 'walk',   wrong: 'fly'    },
  { before: 'Please',       after: 'the door.',    correct: 'open',   wrong: 'put'    },
  { before: 'We',           after: 'bread for dinner.', correct: 'buy', wrong: 'ask'   },
  { before: 'She',          after: 'two cats.',    correct: 'has',    wrong: 'them'   },
  { before: 'I',            after: 'this is fun.', correct: 'think',  wrong: 'know'   },
  { before: 'Take',         after: 'water.',       correct: 'some',   wrong: 'any'    },
  { before: 'We',           after: 'in a house.',  correct: 'live',   wrong: 'give'   },
  { before: 'Birds can',    after: 'high.',        correct: 'fly',    wrong: 'walk'   },
  { before: 'This is the',  after: 'cheese cake.', correct: 'best',   wrong: 'old'    },
  { before: 'I play with my friends', after: 'school.', correct: 'after', wrong: 'before' },
]

const EX2_QUESTIONS_R2: Ex2Q[] = [
  { before: 'Please',          after: 'me a pen.',     correct: 'give',  wrong: 'take'   },
  { before: 'I like both of',  after: '.',             correct: 'them',  wrong: 'her'    },
  { before: 'The ball is',     after: '.',             correct: 'round', wrong: 'open'   },
  { before: 'I',              after: 'the answer.',    correct: 'know',  wrong: 'ask'    },
  { before: 'We say',          after: 'you.',          correct: 'thank', wrong: 'before' },
  { before: 'I',              after: 'go to bed late.', correct: 'always', wrong: 'once'  },
  { before: 'Wash your hands', after: 'lunch.',        correct: 'before', wrong: 'after'  },
  { before: 'This is',         after: 'old house.',    correct: 'his',   wrong: 'her'    },
  { before: 'Do you have',     after: 'milk?',         correct: 'any',   wrong: 'some'   },
  { before: 'Please',          after: 'and look.',     correct: 'stop',  wrong: 'fly'    },
]

// ── Ex3 data ──────────────────────────────────────────────────────────────────

const EX3_QUESTIONS: Ex2Q[] = [
  { before: 'We will go to the park',     after: 'school.',        correct: 'after',  wrong: 'before' },
  { before: 'Can you sing the song',      after: ', please?',      correct: 'again',  wrong: 'once'   },
  { before: 'Do you have',                after: 'questions?',     correct: 'any',    wrong: 'both'   },
  { before: 'Brush your teeth',           after: 'you sleep.',     correct: 'before', wrong: 'after'  },
  { before: 'This is the',                after: 'day ever!',      correct: 'best',   wrong: 'old'    },
  { before: 'I want to',                  after: 'a new game.',    correct: 'buy',    wrong: 'walk'   },
  { before: 'I got a letter',             after: 'my friend.',     correct: 'from',   wrong: 'some'   },
  { before: 'I',                          after: 'how to read.',   correct: 'know',   wrong: 'open'   },
  { before: 'Please',                     after: 'the window.',    correct: 'open',   wrong: 'take'   },
  { before: 'We',                         after: 'to school each day.', correct: 'walk', wrong: 'put' },
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
          36 Sight Words
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
  const [round, setRound] = useState(0)
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [order, setOrder] = useState<boolean[]>(() => EX2_QUESTIONS.map(() => Math.random() < 0.5))
  const [resetKey, setResetKey] = useState(0)

  const questions = round === 0 ? EX2_QUESTIONS : EX2_QUESTIONS_R2
  const total = questions.length
  const done = Object.keys(answered).length
  const allDone = done === total
  const isLastRound = round === 1

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

  const nextRound = () => {
    setRound(1)
    setAnswered({})
    setWrong({})
    setOrder(EX2_QUESTIONS_R2.map(() => Math.random() < 0.5))
    setResetKey(k => k + 1)
  }

  const again = () => {
    setRound(0)
    setAnswered({})
    setWrong({})
    setOrder(EX2_QUESTIONS.map(() => Math.random() < 0.5))
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

      <div className="flex justify-between items-center text-sm font-bold text-emerald-500 mb-3">
        <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-0.5">
          {round === 0 ? 'סבב 1' : 'סבב 2'}
        </span>
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

      {allDone && !isLastRound && (
        <div className="text-center bounce-in mt-6">
          <div className="text-5xl mb-2">👏</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את סבב 1!</p>
          <button onClick={nextRound} className="btn-kid bg-emerald-500">סבב הבא →</button>
        </div>
      )}

      {allDone && isLastRound && (
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

// ── Ex 3 Tab ──────────────────────────────────────────────────────────────────

function Ex3Tab() {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [order, setOrder] = useState<boolean[]>(() => EX3_QUESTIONS.map(() => Math.random() < 0.5))
  const [resetKey, setResetKey] = useState(0)

  const questions = EX3_QUESTIONS
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
    setOrder(EX3_QUESTIONS.map(() => Math.random() < 0.5))
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

      <div className="flex justify-between items-center text-sm font-bold text-emerald-500 mb-3">
        <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-0.5">
          תרגיל 3
        </span>
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
          <Link href="/step5" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Step 5
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
        {tab === 'ex2'   && <Ex2Tab />}
        {tab === 'ex3'   && <Ex3Tab />}
      </div>
    </div>
  )
}
