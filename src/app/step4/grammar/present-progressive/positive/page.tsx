'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'sort' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5'

type Aux = 'am' | 'is' | 'are'

// ── Sort data: sort base verbs by ing-spelling rule ───────────────────────────

type IngCat = '+ing' | 'e' | 'double'

interface SortVerb {
  base: string
  ing: string
  category: IngCat
}

const SORT_R1: SortVerb[] = [
  { base: 'play',  ing: 'playing',  category: '+ing'   },
  { base: 'read',  ing: 'reading',  category: '+ing'   },
  { base: 'eat',   ing: 'eating',   category: '+ing'   },
  { base: 'write', ing: 'writing',  category: 'e'      },
  { base: 'make',  ing: 'making',   category: 'e'      },
  { base: 'ride',  ing: 'riding',   category: 'e'      },
  { base: 'run',   ing: 'running',  category: 'double' },
  { base: 'stop',  ing: 'stopping', category: 'double' },
  { base: 'swim',  ing: 'swimming', category: 'double' },
]

const SORT_R2: SortVerb[] = [
  { base: 'walk',  ing: 'walking',  category: '+ing'   },
  { base: 'learn', ing: 'learning', category: '+ing'   },
  { base: 'drink', ing: 'drinking', category: '+ing'   },
  { base: 'dance', ing: 'dancing',  category: 'e'      },
  { base: 'bake',  ing: 'baking',   category: 'e'      },
  { base: 'smile', ing: 'smiling',  category: 'e'      },
  { base: 'sit',   ing: 'sitting',  category: 'double' },
  { base: 'hit',   ing: 'hitting',  category: 'double' },
  { base: 'get',   ing: 'getting',  category: 'double' },
]

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({
  cycles,
  render,
}: {
  cycles: number
  render: (cycleIdx: number, onAgain: () => void, onDone: () => void) => React.ReactNode
}) {
  const [cycleIdx, setCycleIdx] = useState(0)
  const [key, setKey] = useState(0)
  const [finished, setFinished] = useState(false)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל התרגולים!</p>
        <button
          onClick={() => { setCycleIdx(0); setKey(k => k + 1); setFinished(false) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div key={key}>
      {render(
        Math.min(cycleIdx, cycles - 1),
        () => { setCycleIdx(i => i + 1); setKey(k => k + 1) },
        () => setFinished(true),
      )}
    </div>
  )
}

// ── Ex1 data: choose full "aux + verb-ing" phrase ─────────────────────────────

interface Ex1Q {
  before: string
  after: string
  correct: string
  wrong: string
}

const EX1_R1: Ex1Q[] = [
  { before: 'I',            after: 'with my dog right now.',  correct: 'am walking',  wrong: 'is walking'   },
  { before: 'Gil',          after: 'football now.',           correct: 'is playing',  wrong: 'are playing'  },
  { before: 'We',           after: 'lunch at the moment.',    correct: 'are eating',  wrong: 'is eating'    },
  { before: 'She',          after: 'a new song now.',         correct: 'is learning', wrong: 'am learning'  },
  { before: 'They',         after: 'water right now.',        correct: 'are drinking',wrong: 'is drinking'  },
  { before: 'My brother',   after: 'in his room now.',        correct: 'is sleeping', wrong: 'are sleeping' },
  { before: 'You',          after: 'the table today.',        correct: 'are cleaning',wrong: 'am cleaning'  },
  { before: 'I',            after: 'my friend at the park.',  correct: 'am meeting',  wrong: 'are meeting'  },
  { before: 'The girls',    after: 'in the garden now.',      correct: 'are playing', wrong: 'is playing'   },
  { before: 'Dana',         after: 'an apple right now.',     correct: 'is eating',   wrong: 'are eating'   },
  { before: 'He',           after: 'to school now.',          correct: 'is walking',  wrong: 'am walking'   },
  { before: 'We',           after: 'English at the moment.',  correct: 'are learning',wrong: 'is learning'  },
  { before: 'The cat',      after: 'on the sofa now.',        correct: 'is sleeping', wrong: 'are sleeping' },
  { before: 'My friends',   after: 'juice right now.',        correct: 'are drinking',wrong: 'am drinking'  },
  { before: 'I',            after: 'my room today.',          correct: 'am cleaning', wrong: 'is cleaning'  },
]

// ── Ex2 data: choose the auxiliary (is/am/are) ────────────────────────────────

interface Ex2Q {
  before: string
  after: string
  answer: Aux
}

const EX2_R1: Ex2Q[] = [
  { before: 'My mother', after: 'making dinner.',         answer: 'is'  },
  { before: 'My friends',after: 'drinking coffee.',       answer: 'are' },
  { before: 'I',         after: 'reading a book.',        answer: 'am'  },
  { before: 'He',        after: 'running in the park.',   answer: 'is'  },
  { before: 'We',        after: 'playing football.',      answer: 'are' },
  { before: 'Dana',      after: 'writing a letter.',      answer: 'is'  },
  { before: 'They',      after: 'eating lunch.',          answer: 'are' },
  { before: 'You',       after: 'sleeping now.',          answer: 'are' },
  { before: 'The dog',   after: 'swimming in the lake.',  answer: 'is'  },
  { before: 'I',         after: 'walking to school.',     answer: 'am'  },
  { before: 'Oren',      after: 'cleaning his room.',     answer: 'is'  },
  { before: 'The girls', after: 'learning English.',      answer: 'are' },
  { before: 'My father', after: 'making a cake.',         answer: 'is'  },
  { before: 'We',        after: 'crying at the movie.',   answer: 'are' },
  { before: 'It',        after: 'raining now.',           answer: 'is'  },
]

// ── Ex3 data: type-in (aux + ing) ─────────────────────────────────────────────

interface Ex3Q {
  subject: string
  base: string
  after: string
  answer: string // full "aux verb-ing"
}

const EX3_QS: Ex3Q[] = [
  { subject: 'He',        base: 'run',   after: 'in the park now.',     answer: 'is running'   },
  { subject: 'I',         base: 'write', after: 'a letter now.',        answer: 'am writing'   },
  { subject: 'We',        base: 'make',  after: 'a cake at the moment.',answer: 'are making'   },
  { subject: 'The boys',  base: 'swim',  after: 'in the lake now.',     answer: 'are swimming' },
  { subject: 'She',       base: 'stop',  after: 'the car now.',         answer: 'is stopping'  },
  { subject: 'They',      base: 'play',  after: 'football today.',      answer: 'are playing'  },
  { subject: 'The baby',  base: 'cry',   after: 'right now.',           answer: 'is crying'    },
  { subject: 'I',         base: 'read',  after: 'a book now.',          answer: 'am reading'   },
  { subject: 'Dana',      base: 'make',  after: 'lunch at the moment.', answer: 'is making'    },
  { subject: 'We',        base: 'run',   after: 'to the bus now.',      answer: 'are running'  },
  { subject: 'He',        base: 'write', after: 'his homework now.',    answer: 'is writing'   },
  { subject: 'You',       base: 'swim',  after: 'very fast today.',     answer: 'are swimming' },
  { subject: 'The girls', base: 'cry',   after: 'now.',                 answer: 'are crying'   },
  { subject: 'I',         base: 'stop',  after: 'my bike now.',         answer: 'am stopping'  },
  { subject: 'She',       base: 'play',  after: 'the piano now.',       answer: 'is playing'   },
]

// ── Ex4 data: 4-part builder ──────────────────────────────────────────────────

interface BuilderSubject {
  text: string
  aux: Aux
}

const EX4_SUBJECTS: BuilderSubject[] = [
  { text: 'I',         aux: 'am'  },
  { text: 'The cats',  aux: 'are' },
  { text: 'The girls', aux: 'are' },
  { text: 'Oren',      aux: 'is'  },
  { text: 'Dana',      aux: 'is'  },
  { text: 'My mother', aux: 'is'  },
]
const EX4_VERBS = ['reading', 'playing', 'eating', 'running', 'sleeping', 'making']
const EX4_TIMES = ['now', 'today', 'at the moment']

// ── Ex5 data: reading-passage fill ────────────────────────────────────────────

interface PassageSeg {
  type: 'text' | 'blank'
  text?: string
  blankIndex?: number
}

interface PassageBlank {
  index: number
  answer: string
}

// Passage: "Now I ___(am playing) in the park. My friend Dan ___(is making) ..."
const EX5_SEGMENTS: PassageSeg[] = [
  { type: 'text', text: 'It is a sunny day. Right now I ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text', text: ' in the park. My friend Dan ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text', text: ' a sandcastle. The girls ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text', text: ' near the tree. My mother ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text', text: ' a sandwich for us. Two dogs ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text', text: ' on the grass. We ' },
  { type: 'blank', blankIndex: 5 },
  { type: 'text', text: ' a wonderful day!' },
]

const EX5_BLANKS: PassageBlank[] = [
  { index: 0, answer: 'am playing' },
  { index: 1, answer: 'is making' },
  { index: 2, answer: 'are reading' },
  { index: 3, answer: 'is making' },
  { index: 4, answer: 'are running' },
  { index: 5, answer: 'are having' },
]

const EX5_WORD_BANK = ['am playing', 'is making', 'are reading', 'are running', 'are having', 'is playing']

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-violet-50 border-4 border-violet-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-violet-700 text-center mb-2">
          Present Progressive
        </h2>
        <p className="font-bold text-violet-800 text-sm mb-2 text-center" dir="rtl">
          בזמן הווה ממושך מתארים פעולות אשר קורות ברגע זה.
        </p>
        <p className="font-display font-black text-purple-600 text-lg mb-4 text-center">
          is / am / are + verb + ing
        </p>

        {/* aux table */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-violet-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">am</div>
            <div className="text-white/80 font-bold text-sm">I</div>
          </div>
          <div className="bg-purple-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">is</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
          <div className="bg-fuchsia-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">are</div>
            <div className="text-white/80 font-bold text-sm">you, we, they</div>
          </div>
        </div>

        {/* example sentences */}
        <div className="flex flex-col gap-1.5 mb-4">
          {[
            { sub: 'I',   aux: 'am' as Aux,  rest: 'drinking.' },
            { sub: 'He',  aux: 'is' as Aux,  rest: 'drinking.' },
            { sub: 'She', aux: 'is' as Aux,  rest: 'drinking.' },
            { sub: 'We',  aux: 'are' as Aux, rest: 'drinking.' },
            { sub: 'They',aux: 'are' as Aux, rest: 'drinking.' },
          ].map(({ sub, aux, rest }) => (
            <div key={sub} className="flex items-center gap-1.5 bg-violet-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-violet-700 text-base">{sub}</span>
              <span className="font-black text-base text-purple-600">{aux}</span>
              <span className="font-bold text-violet-700 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time expressions */}
      <div className="bg-white border-2 border-violet-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-violet-700 text-lg mb-2 text-center">⏰ Time words</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">מילים שמראות שהפעולה קורית עכשיו</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['now', 'right now', 'at the moment', 'today'].map(t => (
            <span key={t} className="bg-violet-100 text-violet-700 font-black rounded-full px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* ING spelling rules */}
      <div className="bg-white border-2 border-purple-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-purple-700 text-lg mb-3 text-center">✏️ ING spelling rules</h3>
        <div className="flex flex-col gap-2">
          {[
            { rule: 'לרוב הפעלים מוסיפים ing', ex: 'play → playing' },
            { rule: 'לפועל שמסתיים ב- e: מורידים את ה-e ומוסיפים ing', ex: 'write → writing, make → making' },
            { rule: 'כאשר הפועל מסתיים ב- cvc (עיצור-תנועה-עיצור): מכפילים את האות האחרונה ומוסיפים ing', ex: 'run → running, stop → stopping' },
          ].map(({ rule, ex }) => (
            <div key={ex} className="bg-purple-50 rounded-xl px-3 py-2">
              <div className="font-bold text-purple-600 text-sm" dir="rtl">{rule}</div>
              <div className="font-black text-purple-800 text-base">{ex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Short forms */}
      <div className="bg-white border-2 border-fuchsia-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-fuchsia-700 text-lg mb-2 text-center">💬 Short forms</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">צורות מקוצרות</p>
        <div className="flex flex-col gap-1.5">
          {[
            { full: 'I am eating', short: "I'm eating" },
            { full: 'He is eating', short: "He's eating" },
            { full: 'She is eating', short: "She's eating" },
            { full: 'They are playing', short: "They're playing" },
            { full: 'We are playing', short: "We're playing" },
          ].map(({ full, short }) => (
            <div key={full} className="flex items-center justify-between bg-fuchsia-50 rounded-xl px-3 py-1.5">
              <span className="font-bold text-gray-500 text-sm">{full}</span>
              <span className="font-black text-fuchsia-700 text-base">{short}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: choose full phrase ───────────────────────────────────────────────────

function Ex1() {
  const questions = EX1_R1
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Record<number, string>>({})
  const [order] = useState<boolean[]>(() => questions.map(() => Math.random() < 0.5))
  const [key, setKey] = useState(0)
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx]) return
    if (val === questions[idx].correct) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrongs(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  const restart = () => { setAnswers({}); setWrongs({}); setKey(k => k + 1) }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={key}>
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Choose the phrase</span>
        <span className="text-violet-500">{answered} / {total} ✓</span>
      </div>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על הצירוף הנכון (פועל עזר + פועל ing)</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const opts = order[idx] ? [q.correct, q.wrong] : [q.wrong, q.correct]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
                <span className="text-base font-bold text-gray-700">
                  {q.before}{' '}
                  {ans ? (
                    <span className="font-black text-violet-600 bg-violet-100 rounded px-1">{q.correct}</span>
                  ) : (
                    <span className="text-violet-300 font-black">___</span>
                  )}{' '}
                  {q.after}
                </span>
                {!ans && (
                  <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                    {opts.map(opt => (
                      <button
                        key={opt}
                        onClick={() => choose(idx, opt)}
                        className={`px-2.5 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
                          wrongs[idx] === opt
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-violet-50 text-violet-700 border-violet-300 hover:bg-violet-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {ans && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-3">{total}/{total} correct!</p>
          <button onClick={restart} className="btn-kid bg-violet-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: choose the auxiliary ─────────────────────────────────────────────────

function Ex2() {
  const questions = EX2_R1
  const [answers, setAnswers] = useState<Record<number, Aux>>({})
  const [wrongs, setWrongs] = useState<Record<number, Aux>>({})
  const [key, setKey] = useState(0)
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: Aux) => {
    if (answers[idx]) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrongs(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  const restart = () => { setAnswers({}); setWrongs({}); setKey(k => k + 1) }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={key}>
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Choose is / am / are</span>
        <span className="text-violet-500">{answered} / {total} ✓</span>
      </div>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">בחרו את פועל העזר הנכון לפי הנושא</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
                <span className="text-base font-bold text-gray-700">
                  {q.before}{' '}
                  {ans ? (
                    <span className="font-black text-violet-600 bg-violet-100 rounded px-1">{ans}</span>
                  ) : (
                    <span className="text-violet-300 font-black">___</span>
                  )}{' '}
                  {q.after}
                </span>
                {!ans && (
                  <div className="flex gap-1.5 ml-auto">
                    {(['is', 'am', 'are'] as Aux[]).map(opt => (
                      <button
                        key={opt}
                        onClick={() => choose(idx, opt)}
                        className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                          wrongs[idx] === opt
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-violet-50 text-violet-700 border-violet-300 hover:bg-violet-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {ans && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-3">{total}/{total} correct!</p>
          <button onClick={restart} className="btn-kid bg-violet-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex3: type-in (aux + ing) ──────────────────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX3_QS[current]
  const isLast = current === EX3_QS.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const submit = () => {
    if (!input.trim()) return
    const trimmed = input.trim().toLowerCase().replace(/\s+/g, ' ')
    if (trimmed === q.answer.toLowerCase()) {
      setStatus('correct')
      setTimeout(() => {
        if (isLast) {
          setFinished(true)
        } else {
          setCurrent(c => c + 1)
          setInput('')
          setStatus('idle')
        }
      }, 600)
    } else {
      setStatus('wrong')
      setTimeout(() => { setStatus('idle'); setInput('') }, 800)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QS.length} השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setInput(''); setStatus('idle'); setFinished(false) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX3_QS.length}</span>
        <span className="text-violet-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו פועל עזר + פועל עם ing (למשל: is running)
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the auxiliary + the -ing verb
      </p>

      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-violet-500 mb-1">Base verb:</p>
        <p className="font-black text-violet-800 text-lg">{q.base}</p>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        status === 'correct' ? 'bg-green-50 border-green-300' :
        'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-700 text-base">{q.subject}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { if (status === 'idle') setInput(e.target.value) }}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder="is running"
            className={`border-b-2 font-bold text-base text-center min-w-[140px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              status === 'correct' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {status === 'correct' && <span className="text-xl">✅</span>}
        </div>
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

// ── Ex4: 4-part builder ───────────────────────────────────────────────────────

function Ex4() {
  const TARGET = 6
  const [selSubject, setSelSubject] = useState<BuilderSubject | null>(null)
  const [selAux, setSelAux] = useState<Aux | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const allDone = sentences.length === TARGET

  const handleAdd = () => {
    if (!selSubject || !selAux || !selVerb || !selTime) return
    if (selSubject.aux !== selAux) {
      setError('❌ Try a different aux (is/am/are)!')
      return
    }
    const sentence = `${selSubject.text} ${selAux} ${selVerb} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null); setSelAux(null); setSelVerb(null); setSelTime(null)
    setError('')
  }

  const restart = () => {
    setSentences([]); setSelSubject(null); setSelAux(null); setSelVerb(null); setSelTime(null); setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-violet-500">{sentences.length} / {TARGET} ✓</span>
      </div>

      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-3 mb-3 text-sm font-bold text-violet-700" dir="rtl">
        <p>1. יש ליצור {TARGET} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה ופועל העזר לא מתאים לנושא, יופיע X אדום.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-violet-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-violet-50 border-2 border-violet-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_SUBJECTS.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-violet-500 text-white' : 'bg-white text-violet-700 border border-violet-200 hover:bg-violet-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Aux */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Aux</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1 flex flex-col gap-1">
              {(['is', 'am', 'are'] as Aux[]).map(a => (
                <button
                  key={a}
                  onClick={() => setSelAux(a)}
                  className={`text-sm font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${selAux === a ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-100'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Verb */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-fuchsia-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-fuchsia-50 border-2 border-fuchsia-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-fuchsia-500 text-white' : 'bg-white text-fuchsia-700 border border-fuchsia-200 hover:bg-fuchsia-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Time</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelTime(t)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selTime === t ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selAux && selVerb && selTime && !allDone && (
        <div className="bg-violet-50 border-2 border-violet-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-violet-700 text-base flex-1">
            {selSubject.text} {selAux} {selVerb} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-violet-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-violet-100 border-2 border-violet-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-violet-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-violet-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <button onClick={restart} className="btn-kid bg-violet-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex5: reading-passage fill ─────────────────────────────────────────────────

function Ex5() {
  const [filled, setFilled] = useState<Record<number, string>>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [dragOverBlank, setDragOverBlank] = useState<number | null>(null)
  const [flashWrong, setFlashWrong] = useState<number | null>(null)
  const allFilled = EX5_BLANKS.every(b => filled[b.index] !== undefined)

  const tryPlace = (blankIdx: number, word: string) => {
    if (filled[blankIdx]) return
    const blank = EX5_BLANKS.find(b => b.index === blankIdx)
    if (!blank) return
    if (word.toLowerCase() === blank.answer.toLowerCase()) {
      setFilled(prev => ({ ...prev, [blankIdx]: blank.answer }))
    } else {
      setFlashWrong(blankIdx)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  const handleDrop = (e: React.DragEvent, blankIdx: number) => {
    e.preventDefault()
    setDragOverBlank(null)
    const word = e.dataTransfer.getData('text/plain') || draggedWord
    if (word) tryPlace(blankIdx, word)
    setDraggedWord(null)
  }

  const restart = () => { setFilled({}); setDraggedWord(null); setDragOverBlank(null); setFlashWrong(null) }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Reading Passage</span>
        <span className="text-violet-500">{Object.keys(filled).length} / {EX5_BLANKS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור צירוף מהבנק אל המקום הריק המתאים
      </p>

      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {EX5_WORD_BANK.map(word => (
            <div
              key={word}
              draggable
              onDragStart={e => { setDraggedWord(word); e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move' }}
              onDragEnd={() => { setDraggedWord(null); setDragOverBlank(null) }}
              className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                draggedWord === word
                  ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105'
                  : 'bg-white text-violet-700 border-violet-300 hover:bg-violet-100'
              }`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-loose">
        {EX5_SEGMENTS.map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{seg.text}</span>
          }
          const blankIdx = seg.blankIndex!
          const val = filled[blankIdx]
          const isFlash = flashWrong === blankIdx
          const isOver = dragOverBlank === blankIdx
          return (
            <span
              key={i}
              data-drop-target="true"
              onDragOver={e => { if (!val) { e.preventDefault(); setDragOverBlank(blankIdx) } }}
              onDragLeave={() => setDragOverBlank(prev => prev === blankIdx ? null : prev)}
              onDrop={e => handleDrop(e, blankIdx)}
              className={`inline-block min-w-[5rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 text-center transition-all ${
                val
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : isFlash
                  ? 'bg-red-200 border-red-400 text-red-700 scale-95'
                  : isOver
                  ? 'bg-violet-100 border-violet-500 text-violet-500 scale-105'
                  : 'bg-violet-50 border-violet-300 text-violet-400'
              }`}
            >
              {val || `(${blankIdx + 1})`}
            </span>
          )
        })}
      </div>

      {allFilled && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Excellent work!</p>
          <button onClick={restart} className="btn-kid bg-blue-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Sort: sort base verbs by ing-spelling rule ────────────────────────────────

function SortExercise({ items, onDone }: { items: SortVerb[]; onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<SortVerb | null>(null)
  const [placed, setPlaced] = useState<Record<IngCat, SortVerb[]>>({ '+ing': [], 'e': [], 'double': [] })
  const [flashWrong, setFlashWrong] = useState<IngCat | null>(null)
  const [usedBases, setUsedBases] = useState<Set<string>>(new Set())
  // Shuffle the word bank so verbs aren't shown grouped by their ing-rule.
  const [shuffledItems] = useState<SortVerb[]>(() => shuffle(items))

  const remaining = shuffledItems.filter(v => !usedBases.has(v.base))
  const allDone = usedBases.size === items.length

  const handleWordClick = (item: SortVerb) => {
    if (usedBases.has(item.base)) return
    setSelectedWord(prev => prev?.base === item.base ? null : item)
  }

  const handleCategoryClick = (cat: IngCat) => {
    if (!selectedWord) return
    if (selectedWord.category === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], selectedWord] }))
      setUsedBases(prev => { const s = new Set(prev); s.add(selectedWord.base); return s })
      setSelectedWord(null)
    } else {
      setFlashWrong(cat)
      setTimeout(() => { setFlashWrong(null); setSelectedWord(null) }, 800)
    }
  }

  const CATS: { id: IngCat; label: string; color: string }[] = [
    { id: '+ing',   label: '+ing',       color: 'border-violet-400 bg-violet-50'    },
    { id: 'e',      label: 'e → ing',    color: 'border-purple-400 bg-purple-50'    },
    { id: 'double', label: 'double + ing', color: 'border-fuchsia-400 bg-fuchsia-50' },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort by spelling</span>
        <span className="text-violet-500">{usedBases.size} / {items.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחץ על פועל ואז על כלל ה-ing הנכון</p>
      {selectedWord ? (
        <p className="text-center font-bold text-violet-500 text-sm mb-3">
          Selected: <span className="font-black">{selectedWord.base}</span> — now click a category
        </p>
      ) : <div className="mb-3" />}

      {/* Word bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(item => (
          <button
            key={item.base}
            onClick={() => handleWordClick(item)}
            className={`px-4 py-2 rounded-xl font-display font-black text-base border-2 transition-all ${
              selectedWord?.base === item.base
                ? 'bg-violet-500 text-white border-violet-500 scale-105'
                : 'bg-white text-violet-700 border-violet-300 hover:bg-violet-50 active:scale-95'
            }`}
          >
            {item.base}
          </button>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category boxes */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[120px] cursor-pointer transition-all ${
                isFlash ? 'border-red-400 bg-red-50' : cat.color
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-violet-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-base text-violet-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.base} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-violet-600 text-sm border border-violet-200">
                    {item.ing}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">All sorted correctly!</p>
          <button onClick={onDone} className="btn-kid bg-violet-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function SortTab() {
  const rounds = [SORT_R1, SORT_R2]
  const [round, setRound] = useState(0)
  const [betweenRounds, setBetweenRounds] = useState(false)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל הסבבים!</p>
        <button
          onClick={() => { setRound(0); setBetweenRounds(false); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-violet-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  if (betweenRounds) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-5xl mb-3">👏</div>
        <p className="font-display font-bold text-2xl text-green-600 mb-1">Round {round + 1} done!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סבב {round + 1} הושלם — ממשיכים לסבב הבא</p>
        <button
          onClick={() => { setRound(r => r + 1); setBetweenRounds(false) }}
          className="btn-kid bg-violet-500"
        >
          סבב הבא →
        </button>
      </div>
    )
  }

  const isLast = round === rounds.length - 1

  return (
    <div key={key}>
      <div className="max-w-xl mx-auto px-4 pt-4 -mb-2">
        <span className="inline-block bg-violet-100 text-violet-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <SortExercise
        key={round}
        items={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PresentProgressivePositivePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'sort',  label: 'Sort' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
    { id: 'ex4',   label: 'Ex 4' },
    { id: 'ex5',   label: 'Ex 5' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar/present-progressive" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Progressive</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Progressive — Positive ✅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">הווה ממושך — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">am / is / are + verb-ing</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
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
        {tab === 'sort' && <SortTab />}
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && <Ex2 />}
        {tab === 'ex3' && <Ex3 />}
        {tab === 'ex4' && <Ex4 />}
        {tab === 'ex5' && <Ex5 />}
      </div>
    </div>
  )
}
