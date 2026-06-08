'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex3'

// ── Types & Data ──────────────────────────────────────────────────────────────

type ThereQVerb = 'Is there' | 'Are there'

interface Ex1Q {
  after: string
  answer: ThereQVerb
}

const EX1_R1: Ex1Q[] = [
  { after: 'a teacher in the classroom?', answer: 'Is there'  },
  { after: 'six pencils on the table?',   answer: 'Are there' },
  { after: 'a cat in the room?',          answer: 'Is there'  },
  { after: 'three books on the shelf?',   answer: 'Are there' },
  { after: 'a dog in the yard?',          answer: 'Is there'  },
  { after: 'many flowers in the garden?', answer: 'Are there' },
  { after: 'a kite in the sky?',          answer: 'Is there'  },
  { after: 'two boys at the door?',       answer: 'Are there' },
  { after: 'a fish in the bowl?',         answer: 'Is there'  },
  { after: 'four windows in the room?',   answer: 'Are there' },
]

const EX1_R2: Ex1Q[] = [
  { after: 'a book on the table?',          answer: 'Is there'  },
  { after: 'five dogs in the park?',        answer: 'Are there' },
  { after: 'an apple on the plate?',        answer: 'Is there'  },
  { after: 'many children in the school?',  answer: 'Are there' },
  { after: 'a bird on the tree?',           answer: 'Is there'  },
  { after: 'three cats on the roof?',       answer: 'Are there' },
  { after: 'a car in the garage?',          answer: 'Is there'  },
  { after: 'two chairs near the window?',   answer: 'Are there' },
  { after: 'a sandwich in my bag?',         answer: 'Is there'  },
  { after: 'six eggs in the basket?',       answer: 'Are there' },
]

const EX1_ROUNDS = [EX1_R1, EX1_R2]

type QType = 'is' | 'are'

interface Ex3Q {
  question: string
  type: QType
}

const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Is there a teacher in the classroom?', type: 'is'  },
  { question: 'Are there six pencils on the table?',  type: 'are' },
  { question: 'Is there a cat in the room?',          type: 'is'  },
  { question: 'Are there three dogs in the park?',    type: 'are' },
  { question: 'Is there a book on the table?',        type: 'is'  },
  { question: 'Are there many flowers in the garden?',type: 'are' },
  { question: 'Is there a kite in the sky?',          type: 'is'  },
  { question: 'Are there two boys at the door?',      type: 'are' },
  { question: 'Is there a fish in the bowl?',         type: 'is'  },
  { question: 'Are there four windows in the room?',  type: 'are' },
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

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">

      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-sky-700 text-center mb-1">
          Is there? / Are there?
        </h2>
        <p className="font-bold text-sky-700 text-sm text-center mb-4">
          Yes / No Questions
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-sky-800 mb-4" dir="rtl">
          <p>• כדי לחבר שאלת כן/לא, מחליפים את סדר המילים.</p>
          <p>• שאלות כן/לא תמיד מתחילות ב- Is או Are.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-sky-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">Is there</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לפני שם עצם ביחיד</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">Are there</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לפני שם עצם ברבים</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              stmt: 'There is', stmtRest: 'a teacher in the classroom.',
              qVerb: 'Is there' as ThereQVerb, qRest: 'a teacher in the classroom?',
            },
            {
              stmt: 'There are', stmtRest: 'six pencils on the table.',
              qVerb: 'Are there' as ThereQVerb, qRest: 'six pencils on the table?',
            },
          ].map(({ stmt, stmtRest, qVerb, qRest }) => (
            <div key={qRest} className="bg-white rounded-2xl border-2 border-sky-200 p-3">
              <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                <span className={`font-black text-base ${stmt === 'There is' ? 'text-sky-600' : 'text-blue-600'}`}>{stmt}</span>
                <span className="font-bold text-gray-700 text-base">{stmtRest}</span>
              </div>
              <div className="flex items-center gap-1 text-sky-600 flex-wrap">
                <span className="text-sky-400 font-black mr-1">→</span>
                <span className={`font-display font-black text-base ${qVerb === 'Is there' ? 'text-sky-600' : 'text-blue-600'}`}>{qVerb}</span>
                <span className="font-bold text-sky-700 text-base">{qRest}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 mb-1">תשובות קצרות</h2>
        <p className="font-bold text-amber-700 text-sm mb-3" dir="rtl">
          בדרך כלל עונים על שאלות כן / לא בתשובות קצרות.
        </p>

        <div className="flex flex-col gap-3">
          {[
            { q: 'Is there a teacher in the classroom?', yes: 'Yes, there is.',  no: "No, there isn't."  },
            { q: 'Are there six pencils on the table?',  yes: 'Yes, there are.', no: "No, there aren't." },
          ].map(({ q, yes, no }) => (
            <div key={q} className="bg-white rounded-2xl border-2 border-amber-200 p-3">
              <p className="font-bold text-amber-800 text-base mb-1.5 italic">{q}</p>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-xl">{yes}</span>
                <span className="bg-rose-100 text-rose-700 font-bold text-sm px-3 py-1 rounded-xl">{no}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: choose Is there / Are there ──────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = EX1_ROUNDS[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, ThereQVerb>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: ThereQVerb) => {
    if (answers[idx] || wrongs.has(idx)) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => { const s = new Set(prev); s.add(idx); return s })
      setTimeout(() => setWrongs(prev => { const s = new Set(prev); s.delete(idx); return s }), 800)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Round {cycleIdx + 1} / {EX1_ROUNDS.length}</span>
        <span className="text-sky-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על המילים הנכונות</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          const display = ans ? `${ans} ${q.after}` : `___ ${q.after}`
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl px-2 py-1.5 flex items-center gap-2 flex-wrap ${isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <span className="text-base font-bold text-gray-700 flex-1 min-w-0">{display}</span>
              {!ans && !isWrong ? (
                <div className="flex gap-1.5">
                  {(['Is there', 'Are there'] as ThereQVerb[]).map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className={`px-2 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
                        v === 'Is there'
                          ? 'border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100'
                          : 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              ) : isWrong ? (
                <span className="font-bold text-sm text-red-500">✗</span>
              ) : (
                <span className="font-bold text-sm text-green-600">✓</span>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">{total}/{total} correct!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX1_ROUNDS.length ? (
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

// ── Ex3: choose the correct short answer ──────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX3_QUESTIONS[current]
  const isLast = current === EX3_QUESTIONS.length - 1

  // YES answers: 'is' → "Yes, there is.", 'are' → "Yes, there are."
  // NO answers:  'is' → "No, there isn't.", 'are' → "No, there aren't."
  const yesAnswers: { type: QType; label: string }[] = [
    { type: 'is',  label: 'Yes, there is.' },
    { type: 'are', label: 'Yes, there are.' },
  ]
  const noAnswers: { type: QType; label: string }[] = [
    { type: 'is',  label: "No, there isn't." },
    { type: 'are', label: "No, there aren't." },
  ]

  const handleClick = (type: QType, side: 'yes' | 'no') => {
    if (flash) return
    if (type !== q.type) return
    const tileKey = `${type}-${side}`
    setFlash(tileKey)
    setTimeout(() => {
      setFlash(null)
      if (isLast) setFinished(true)
      else setCurrent(c => c + 1)
    }, 350)
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל 10 השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div key={key} className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX3_QUESTIONS.length}</span>
        <span className="text-sky-500">{current} ✓</span>
      </div>

      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הנכונה. לכל שאלה ניתן לבחור לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-sky-700">{q.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="bg-green-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">YES ✓</span>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {yesAnswers.map(a => {
              const tileKey = `${a.type}-yes`
              const isFlashing = flash === tileKey
              return (
                <button
                  key={a.type}
                  onClick={() => handleClick(a.type, 'yes')}
                  className={`text-base font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                    isFlashing
                      ? 'bg-green-500 text-white border-green-500 scale-105'
                      : 'bg-white text-green-700 border-green-200 hover:bg-green-100 active:scale-95'
                  }`}
                >
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="bg-rose-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">NO ✗</span>
          </div>
          <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {noAnswers.map(a => {
              const tileKey = `${a.type}-no`
              const isFlashing = flash === tileKey
              return (
                <button
                  key={a.type}
                  onClick={() => handleClick(a.type, 'no')}
                  className={`text-base font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                    isFlashing
                      ? 'bg-rose-500 text-white border-rose-500 scale-105'
                      : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-100 active:scale-95'
                  }`}
                >
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ThereIsYesNoPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex3',   label: 'Ex 3' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/there-is" className="text-white/70 font-bold text-sm no-underline hover:text-white">← There is / There are</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Yes / No Questions ❓</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות כן / לא</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Is there? · Are there?</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && (
          <ExWrapper
            cycles={EX1_ROUNDS.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3' && <Ex3 />}
      </div>
    </div>
  )
}
