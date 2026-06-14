'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

type Neg = "don't" | "doesn't"

// ── Ex1 data ──────────────────────────────────────────────────────────────────

interface Ex1Q {
  before: string
  after: string
  answer: Neg
}

const EX1_QUESTIONS: Ex1Q[] = [
  { before: 'I',                after: 'walk with my dog every day.',      answer: "don't"   },
  { before: 'Gil',             after: 'play football every week.',         answer: "doesn't" },
  { before: 'We',              after: 'eat pizza every day.',              answer: "don't"   },
  { before: 'She',             after: 'read books every night.',           answer: "doesn't" },
  { before: 'They',            after: 'do homework every day.',            answer: "don't"   },
  { before: 'He',              after: 'drink milk every morning.',         answer: "doesn't" },
  { before: 'You',             after: 'watch TV every evening.',           answer: "don't"   },
  { before: 'Dana',            after: 'sing every week.',                  answer: "doesn't" },
  { before: 'My friends',      after: 'run every morning.',                answer: "don't"   },
  { before: 'The cat',         after: 'sleep on the bed every night.',     answer: "doesn't" },
  { before: 'I',              after: 'study English every day.',           answer: "don't"   },
  { before: 'Tom',             after: 'ride a bike every week.',           answer: "doesn't" },
  { before: 'The boys',        after: 'clean the room every day.',         answer: "don't"   },
  { before: 'My mom',          after: 'cook fish every week.',             answer: "doesn't" },
  { before: 'You and Dan',     after: 'swim every summer.',                answer: "don't"   },
]

// ── Ex2 (builder) data ─────────────────────────────────────────────────────────

interface Ex2Subject {
  text: string
  neg: Neg
}

interface Ex2Cycle {
  subjects: Ex2Subject[]
  verbs: string[]
  times: string[]
}

const EX2_CYCLES: Ex2Cycle[] = [
  {
    subjects: [
      { text: 'He',           neg: "doesn't" },
      { text: 'You',          neg: "don't"   },
      { text: 'The dog',      neg: "doesn't" },
      { text: 'Dan and Dana', neg: "don't"   },
    ],
    verbs: ['read', 'play', 'eat', 'walk'],
    times: ['every day', 'every week'],
  },
  {
    subjects: [
      { text: 'She',          neg: "doesn't" },
      { text: 'We',           neg: "don't"   },
      { text: 'The boy',      neg: "doesn't" },
      { text: 'Tom and Liat', neg: "don't"   },
    ],
    verbs: ['run', 'write', 'clean', 'sleep', 'visit'],
    times: ['every day', 'every week'],
  },
]

// ── Learn ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-1">
          don&apos;t / doesn&apos;t
        </h2>
        <p className="font-bold text-rose-800 text-sm mb-4 text-center" dir="rtl">
          צורת השלילה ב-Present Simple
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-rose-800 mb-4" dir="rtl">
          <p>• שלילה בהווה — do not / does not + פועל בצורת הבסיס</p>
          <p>• צורת הקיצור: don&apos;t / doesn&apos;t</p>
          <p>• אחרי don&apos;t / doesn&apos;t הפועל תמיד ללא s</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-sky-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">don&apos;t</div>
            <div className="text-white/80 font-bold text-sm">I, you, we, they</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">doesn&apos;t</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { neg: "don't" as Neg,   subj: 'I',   rest: 'run every day.' },
            { neg: "doesn't" as Neg, subj: 'She', rest: 'eat an ice cream every day.' },
            { neg: "don't" as Neg,   subj: 'We',  rest: 'walk to school every day.' },
            { neg: "doesn't" as Neg, subj: 'He',  rest: 'read books every week.' },
          ].map(({ neg, subj, rest }) => (
            <div key={subj + rest} className="flex items-center gap-1.5 bg-rose-100 rounded-xl px-3 py-1.5 flex-wrap">
              <span className="font-bold text-rose-800 text-base">{subj}</span>
              <span className={`font-black text-base ${neg === "don't" ? 'text-sky-600' : 'text-blue-600'}`}>{neg}</span>
              <span className="font-bold text-rose-800 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: choose don't / doesn't ─────────────────────────────────────────────────

function Ex1() {
  const [answers, setAnswers] = useState<Record<number, Neg>>({})
  const [wrongs, setWrongs] = useState<Record<number, Neg>>({})
  const [order] = useState<boolean[]>(() => EX1_QUESTIONS.map(() => Math.random() < 0.5))
  const [resetKey, setResetKey] = useState(0)

  const total = EX1_QUESTIONS.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: Neg) => {
    if (answers[idx]) return
    if (val === EX1_QUESTIONS[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrongs(prev => {
        const next = { ...prev }
        delete next[idx]
        return next
      }), 700)
    }
  }

  const again = () => {
    setAnswers({})
    setWrongs({})
    setResetKey(k => k + 1)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={resetKey}>
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-rose-700 text-center mb-1">
          Choose don&apos;t or doesn&apos;t
        </h2>
        <p className="font-bold text-sm text-rose-600 text-center" dir="rtl">
          לחצו על המילה הנכונה לפי הנושא במשפט
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-rose-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX1_QUESTIONS.map((q, idx) => {
          const ans = answers[idx]
          const opts: Neg[] = order[idx] ? ["don't", "doesn't"] : ["doesn't", "don't"]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-rose-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before}{' '}
                {ans ? (
                  <span className="font-black text-rose-600 bg-rose-100 rounded px-1">{q.answer}</span>
                ) : (
                  <span className="text-rose-300 font-black">___</span>
                )}
                {' '}{q.after}
              </span>
              {!ans && (
                <div className="flex gap-1.5 ml-auto">
                  {opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrongs[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : opt === "don't"
                          ? 'bg-sky-50 text-sky-700 border-sky-300 hover:bg-sky-100'
                          : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {ans && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in mt-6">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את כל המשפטים!</p>
          <button onClick={again} className="btn-kid bg-rose-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: builder ────────────────────────────────────────────────────────────────

const EX2_GOAL = 6

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX2_CYCLES[cycleIdx]
  const [selSubject, setSelSubject] = useState<Ex2Subject | null>(null)
  const [selNeg, setSelNeg] = useState<Neg | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const allDone = sentences.length >= EX2_GOAL

  const handleAdd = () => {
    if (!selSubject || !selNeg || !selVerb || !selTime) return
    if (selSubject.neg !== selNeg) {
      setError('❌ Try a different don\'t / doesn\'t!')
      return
    }
    const sentence = `${selSubject.text} ${selNeg} ${selVerb} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null)
    setSelNeg(null)
    setSelVerb(null)
    setSelTime(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Round {cycleIdx + 1} / {EX2_CYCLES.length}</span>
        <span className="text-rose-500">{Math.min(sentences.length, EX2_GOAL)} / {EX2_GOAL} ✓</span>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 text-sm font-bold text-rose-700" dir="rtl">
        <p>1. יש ליצור 6 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-rose-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {cycle.subjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-rose-500 text-white' : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* don't / doesn't column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-pink-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">don&apos;t / doesn&apos;t</span>
            </div>
            <div className="bg-pink-50 border-2 border-pink-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(["don't", "doesn't"] as Neg[]).map(v => (
                <button
                  key={v}
                  onClick={() => setSelNeg(v)}
                  className={`text-xs font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${
                    selNeg === v
                      ? 'bg-pink-600 text-white border-pink-600'
                      : v === "don't"
                      ? 'bg-sky-50 text-sky-700 border-sky-300 hover:bg-sky-100'
                      : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {cycle.verbs.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Time column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Time</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {cycle.times.map(t => (
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

      {selSubject && selNeg && selVerb && selTime && !allDone && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-rose-700 text-base flex-1">
            {selSubject.text} {selNeg} {selVerb} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-rose-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-rose-100 border-2 border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-rose-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-rose-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX2_CYCLES.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-blue-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex3: type the negative form ──────────────────────────────────────────────────

interface Ex3Q {
  positive: string
  answer: string
}

const EX3_QUESTIONS: Ex3Q[] = [
  { positive: 'I play football every day.',          answer: "I don't play football every day."          },
  { positive: 'She eats an apple every day.',        answer: "She doesn't eat an apple every day."        },
  { positive: 'We walk to school every day.',        answer: "We don't walk to school every day."         },
  { positive: 'He reads books every week.',          answer: "He doesn't read books every week."          },
  { positive: 'They watch TV every night.',          answer: "They don't watch TV every night."           },
  { positive: 'The cat drinks milk every morning.',  answer: "The cat doesn't drink milk every morning."  },
  { positive: 'You run every day.',                  answer: "You don't run every day."                   },
  { positive: 'My mom cooks dinner every day.',      answer: "My mom doesn't cook dinner every day."      },
  { positive: 'I clean my room every week.',         answer: "I don't clean my room every week."          },
  { positive: 'Dan plays the guitar every day.',     answer: "Dan doesn't play the guitar every day."     },
]

// normalize apostrophes (straight/curly), whitespace and case for matching
function normalize(s: string): string {
  return s
    .replace(/[‘’ʼ′]/g, "'")
    .replace(/[.!?]+\s*$/, '')   // accept the sentence with or without an ending period
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX3_QUESTIONS[current]
  const isLast = current === EX3_QUESTIONS.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const submit = () => {
    if (!input.trim()) return
    if (normalize(input) === normalize(q.answer)) {
      setStatus('correct')
      setTimeout(() => {
        if (isLast) {
          setFinished(true)
        } else {
          setCurrent(c => c + 1)
          setInput('')
          setStatus('idle')
        }
      }, 700)
    } else {
      setStatus('wrong')
      setTimeout(() => {
        setStatus('idle')
        setInput('')
      }, 800)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  const again = () => {
    setCurrent(0)
    setInput('')
    setStatus('idle')
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QUESTIONS.length} השאלות!</p>
        <button onClick={again} className="btn-kid bg-rose-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX3_QUESTIONS.length}</span>
        <span className="text-rose-500">{current} / {EX3_QUESTIONS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        כתבו את המשפט בצורת השלילה
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Write the negative form
      </p>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-rose-500 mb-1">✅ Positive:</p>
        <p className="font-bold text-rose-800 text-lg">{q.positive}</p>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        status === 'correct' ? 'bg-green-50 border-green-300' :
        'bg-white border-gray-200'
      }`}>
        <p className="text-xs font-bold text-gray-500 mb-3">🚫 Negative:</p>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { if (status === 'idle') setInput(e.target.value) }}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder="type the negative sentence..."
            className={`flex-1 border-b-2 font-bold text-base focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              status === 'correct' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <button
            onClick={submit}
            disabled={status !== 'idle' || !input.trim()}
            className="btn-kid bg-rose-500 !py-1 !px-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶
          </button>
        </div>
        {status === 'correct' && (
          <p className="mt-3 font-bold text-green-600 text-sm">✅ {q.answer}</p>
        )}
      </div>
    </div>
  )
}

// ── Wrapper (2-round flow for builder) ────────────────────────────────────────────

function ExWrapper({
  cycles, render,
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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל הסבבים!</p>
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

// ── Page ────────────────────────────────────────────────────────────────────────

export default function PresentSimpleNegativePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar/present-simple" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Simple</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Simple — Negative ❌</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שלילה בהווה פשוט</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I don&apos;t play · She doesn&apos;t eat</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1'   && <Ex1 />}
        {tab === 'ex2'   && (
          <ExWrapper
            cycles={EX2_CYCLES.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
