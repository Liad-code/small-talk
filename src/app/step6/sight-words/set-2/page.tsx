'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Data ─────────────────────────────────────────────────────────────────────

const SIGHT_WORDS: { word: string; hebrew: string; emoji: string }[] = [
  { word: 'draw',     hebrew: 'לצייר',        emoji: '🎨' },
  { word: 'drink',    hebrew: 'לשתות',        emoji: '🥤' },
  { word: 'eight',    hebrew: 'שמונה',        emoji: '8️⃣' },
  { word: 'fall',     hebrew: 'ליפול/סתיו',   emoji: '🍂' },
  { word: 'far',      hebrew: 'רחוק',         emoji: '📏' },
  { word: 'full',     hebrew: 'מלא',          emoji: '🫗' },
  { word: 'grow',     hebrew: 'לגדול',        emoji: '🌱' },
  { word: 'hold',     hebrew: 'להחזיק',       emoji: '🤝' },
  { word: 'hot',      hebrew: 'חם',           emoji: '🔥' },
  { word: 'hurt',     hebrew: 'לכאוב/לפצוע',  emoji: '🤕' },
  { word: 'if',       hebrew: 'אם',           emoji: '🔤' },
  { word: 'keep',     hebrew: 'לשמור',        emoji: '🔒' },
  { word: 'kind',     hebrew: 'נחמד/סוג',     emoji: '😊' },
  { word: 'light',    hebrew: 'אור/קל',       emoji: '💡' },
  { word: 'long',     hebrew: 'ארוך',         emoji: '📏' },
  { word: 'much',     hebrew: 'הרבה',         emoji: '🔤' },
  { word: 'never',    hebrew: 'אף פעם',       emoji: '🚫' },
  { word: 'only',     hebrew: 'רק',           emoji: '☝️' },
  { word: 'pick',     hebrew: 'לבחור/לקטוף',  emoji: '🤏' },
  { word: 'seven',    hebrew: 'שבע',          emoji: '7️⃣' },
  { word: 'show',     hebrew: 'להראות/מופע',  emoji: '🎬' },
  { word: 'six',      hebrew: 'שש',           emoji: '6️⃣' },
  { word: 'small',    hebrew: 'קטן',          emoji: '🐜' },
  { word: 'start',    hebrew: 'להתחיל',       emoji: '🏁' },
  { word: 'ten',      hebrew: 'עשר',          emoji: '🔟' },
  { word: 'today',    hebrew: 'היום',         emoji: '📅' },
  { word: 'together', hebrew: 'ביחד',         emoji: '👫' },
  { word: 'try',      hebrew: 'לנסות',        emoji: '💪' },
  { word: 'warm',     hebrew: 'חמים',         emoji: '🌤️' },
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
    parts: parseSentence('I like to draw and drink milk.', ['draw', 'drink']),
    emoji: '🎨',
    hebrew: 'אני אוהב לצייר ולשתות חלב.',
  },
  {
    parts: parseSentence('I have eight red pens.', ['eight']),
    emoji: '8️⃣',
    hebrew: 'יש לי שמונה עטים אדומים.',
  },
  {
    parts: parseSentence('The leaves fall far from the tree.', ['fall', 'far']),
    emoji: '🍂',
    hebrew: 'העלים נופלים רחוק מהעץ.',
  },
  {
    parts: parseSentence('My cup is full.', ['full']),
    emoji: '🫗',
    hebrew: 'הכוס שלי מלאה.',
  },
  {
    parts: parseSentence('Plants grow in warm light.', ['grow', 'warm', 'light']),
    emoji: '🌱',
    hebrew: 'צמחים גדלים באור חמים.',
  },
  {
    parts: parseSentence('Please hold my hot tea.', ['hold', 'hot']),
    emoji: '🔥',
    hebrew: 'בבקשה החזק את התה החם שלי.',
  },
  {
    parts: parseSentence('I never hurt my friends.', ['never', 'hurt']),
    emoji: '🤕',
    hebrew: 'אני אף פעם לא פוגע בחברים שלי.',
  },
  {
    parts: parseSentence('Keep only the small box.', ['keep', 'only', 'small']),
    emoji: '🔒',
    hebrew: 'שמור רק את הקופסה הקטנה.',
  },
  {
    parts: parseSentence('She is a kind girl.', ['kind']),
    emoji: '😊',
    hebrew: 'היא ילדה נחמדה.',
  },
  {
    parts: parseSentence('We will start the show today.', ['start', 'show', 'today']),
    emoji: '🎬',
    hebrew: 'אנחנו נתחיל את המופע היום.',
  },
  {
    parts: parseSentence('I have seven, six, and ten cards.', ['seven', 'six', 'ten']),
    emoji: '🔟',
    hebrew: 'יש לי שבעה, שישה ועשרה קלפים.',
  },
  {
    parts: parseSentence('Pick a long stick.', ['pick', 'long']),
    emoji: '🤏',
    hebrew: 'בחר מקל ארוך.',
  },
  {
    parts: parseSentence('Try to work together.', ['try', 'together']),
    emoji: '👫',
    hebrew: 'נסו לעבוד ביחד.',
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
  { before: 'I like to',       after: 'a picture.',        correct: 'draw',  wrong: 'drink' },
  { before: 'Please',          after: 'some water.',       correct: 'drink', wrong: 'draw'  },
  { before: 'I am',            after: 'years old.',        correct: 'eight', wrong: 'far'   },
  { before: 'Leaves',          after: 'in autumn.',        correct: 'fall',  wrong: 'grow'  },
  { before: 'My house is',     after: 'from school.',      correct: 'far',   wrong: 'full'  },
  { before: 'The glass is',    after: 'of milk.',          correct: 'full',  wrong: 'far'   },
  { before: 'Plants',          after: 'in the sun.',       correct: 'grow',  wrong: 'fall'  },
  { before: 'Please',          after: 'my hand.',          correct: 'hold',  wrong: 'pick'  },
  { before: 'The soup is',     after: '.',                 correct: 'hot',   wrong: 'small' },
  { before: 'Be careful, do not', after: 'yourself.',      correct: 'hurt',  wrong: 'keep'  },
]

const EX2_QUESTIONS_R2: Ex2Q[] = [
  { before: '',                after: 'it rains, stay in.',  correct: 'If',    wrong: 'Try'   },
  { before: 'Please',          after: 'this for me.',        correct: 'keep',  wrong: 'fall'  },
  { before: 'She is very',     after: 'to me.',              correct: 'kind',  wrong: 'long'  },
  { before: 'Turn on the',     after: ', please.',           correct: 'light', wrong: 'show'  },
  { before: 'The snake is',    after: '.',                   correct: 'long',  wrong: 'small' },
  { before: 'Thank you so',    after: '.',                   correct: 'much',  wrong: 'far'   },
  { before: 'I',              after: 'eat candy at night.',  correct: 'never', wrong: 'today' },
  { before: 'I have',          after: 'one pencil.',         correct: 'only',  wrong: 'much'  },
  { before: 'Please',          after: 'a card.',             correct: 'pick',  wrong: 'hold'  },
  { before: 'There are',       after: 'days in a week.',     correct: 'seven', wrong: 'eight' },
]

// ── Ex3 data ──────────────────────────────────────────────────────────────────

const EX3_QUESTIONS: Ex2Q[] = [
  { before: 'Can you',         after: 'me your room?',       correct: 'show',  wrong: 'draw'  },
  { before: 'I have',          after: 'apples in my bag.',   correct: 'six',   wrong: 'long'  },
  { before: 'An ant is very',  after: '.',                   correct: 'small', wrong: 'warm'  },
  { before: 'Let us',          after: 'the game now.',       correct: 'start', wrong: 'keep'  },
  { before: 'I can count to',  after: '.',                   correct: 'ten',   wrong: 'much'  },
  { before: 'We have a test',  after: '.',                   correct: 'today', wrong: 'never' },
  { before: 'We play',         after: 'after school.',       correct: 'together', wrong: 'only' },
  { before: 'Please',          after: 'your best.',          correct: 'try',   wrong: 'fall'  },
  { before: 'The blanket is',  after: 'and soft.',           correct: 'warm',  wrong: 'far'   },
  { before: 'I',              after: 'a happy face.',        correct: 'draw',  wrong: 'drink' },
]

// ── Learn Tab ─────────────────────────────────────────────────────────────────

const ROW_COLORS = [
  'bg-purple-50 border-purple-200',
  'bg-violet-50 border-violet-200',
  'bg-fuchsia-50 border-fuchsia-200',
  'bg-indigo-50 border-indigo-200',
]

function LearnTab() {
  // Split words into rows of 2 (word | hebrew | word | hebrew)
  const rows: typeof SIGHT_WORDS[] = []
  for (let i = 0; i < SIGHT_WORDS.length; i += 2) {
    rows.push(SIGHT_WORDS.slice(i, i + 2))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="bg-purple-50 border-4 border-purple-300 rounded-3xl p-5 mb-4">
        <h2 className="font-display font-black text-2xl text-purple-700 text-center mb-1">
          {SIGHT_WORDS.length} Sight Words
        </h2>
        <p className="font-bold text-purple-600 text-sm text-center mb-4" dir="rtl">
          מילים נפוצות שחשוב להכיר
        </p>

        {/* Header row */}
        <div className="grid grid-cols-4 gap-1 mb-2 px-1">
          <div className="font-display font-black text-xs text-purple-700 text-center uppercase tracking-wide">Word</div>
          <div className="font-bold text-xs text-purple-600 text-center" dir="rtl">עברית</div>
          <div className="font-display font-black text-xs text-purple-700 text-center uppercase tracking-wide">Word</div>
          <div className="font-bold text-xs text-purple-600 text-center" dir="rtl">עברית</div>
        </div>

        {/* Word rows */}
        <div className="flex flex-col gap-1">
          {rows.map((pair, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid grid-cols-4 gap-1 rounded-xl border-2 px-2 py-1.5 ${ROW_COLORS[rowIdx % ROW_COLORS.length]}`}
            >
              {pair.map((item, colIdx) => (
                <div key={colIdx} className="contents">
                  <div className="font-display font-black text-base text-purple-800 text-center">
                    <span className="mr-1">{item.emoji}</span>{item.word}
                  </div>
                  <div className="font-bold text-sm text-gray-600 text-center" dir="rtl">
                    {item.hebrew}
                  </div>
                </div>
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
        <h2 className="font-display font-black text-xl text-purple-700 text-center mb-1">
          Sight Words in Sentences
        </h2>
        <p className="font-bold text-sm text-purple-600 text-center" dir="rtl">
          קרא את המשפטים ותרגם אותם לעברית. לחיצה על ? תציג את תרגום המשפט
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {SENTENCES.map((sentence, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 text-base font-bold leading-relaxed text-gray-700">
                <span className="text-gray-400 font-black text-sm mr-2">{idx + 1}.</span>
                {sentence.parts.map((part, pIdx) => (
                  <span
                    key={pIdx}
                    className={
                      part.highlight
                        ? 'font-black text-purple-600 bg-purple-100 rounded px-0.5'
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
                    ? 'bg-purple-500 text-white border-purple-500'
                    : 'bg-purple-50 text-purple-600 border-purple-300 hover:bg-purple-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-purple-100 font-bold text-purple-700 text-base text-right" dir="rtl">
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
        <h2 className="font-display font-black text-xl text-purple-700 text-center mb-1">
          Choose the correct word
        </h2>
        <p className="font-bold text-sm text-purple-600 text-center" dir="rtl">
          לחצו על המילה הנכונה כדי להשלים את המשפט
        </p>
      </div>

      <div className="flex justify-between items-center text-sm font-bold text-purple-500 mb-3">
        <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-0.5">
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
              className="bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before ? q.before + ' ' : ''}
                {isAnswered ? (
                  <span className="font-black text-purple-600 bg-purple-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-purple-300 font-black">___</span>
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
                          : 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100'
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
          <button onClick={nextRound} className="btn-kid bg-purple-500">סבב הבא →</button>
        </div>
      )}

      {allDone && isLastRound && (
        <div className="text-center bounce-in mt-6">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את כל המשפטים!</p>
          <button onClick={again} className="btn-kid bg-purple-500">🔁 Again</button>
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
        <h2 className="font-display font-black text-xl text-purple-700 text-center mb-1">
          Choose the correct word
        </h2>
        <p className="font-bold text-sm text-purple-600 text-center" dir="rtl">
          לחצו על המילה הנכונה כדי להשלים את המשפט
        </p>
      </div>

      <div className="flex justify-between items-center text-sm font-bold text-purple-500 mb-3">
        <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-0.5">
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
              className="bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before ? q.before + ' ' : ''}
                {isAnswered ? (
                  <span className="font-black text-purple-600 bg-purple-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-purple-300 font-black">___</span>
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
                          : 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100'
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
          <button onClick={again} className="btn-kid bg-purple-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SightWordsSet2Page() {
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
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step6/sight-words" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Sight Words
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Sight Words — Set 2 👁️</h1>
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
                  ? 'bg-purple-500 text-white'
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
