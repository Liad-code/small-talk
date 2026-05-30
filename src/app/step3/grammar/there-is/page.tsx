'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

// ── Data ──────────────────────────────────────────────────────────────────────

type ThereVerb = 'There is' | 'There are'

interface ThereEx1Q {
  after: string
  answer: ThereVerb
}

const THERE_EX1_R1: ThereEx1Q[] = [
  { after: 'two pupils in the classroom.',    answer: 'There are' },
  { after: 'a book on the table.',            answer: 'There is'  },
  { after: 'three pencils in my bag.',        answer: 'There are' },
  { after: 'a cat in the room.',              answer: 'There is'  },
  { after: 'five dogs in the park.',          answer: 'There are' },
  { after: 'a kite in the sky.',              answer: 'There is'  },
  { after: 'many flowers in the garden.',     answer: 'There are' },
  { after: 'a table in the classroom.',       answer: 'There is'  },
  { after: 'two boys at the door.',           answer: 'There are' },
  { after: 'a bird on the tree.',             answer: 'There is'  },
]

const THERE_EX1_R2: ThereEx1Q[] = [
  { after: 'a teacher in the school.',        answer: 'There is'  },
  { after: 'six chairs around the table.',    answer: 'There are' },
  { after: 'a fish in the bowl.',             answer: 'There is'  },
  { after: 'four windows in the room.',       answer: 'There are' },
  { after: 'a sandwich in my bag.',           answer: 'There is'  },
  { after: 'three cats on the roof.',         answer: 'There are' },
  { after: 'a big park near our house.',      answer: 'There is'  },
  { after: 'many shoes at the door.',         answer: 'There are' },
  { after: 'a dog in the yard.',              answer: 'There is'  },
  { after: 'two apples on the table.',        answer: 'There are' },
]

const EX1_ROUNDS = [
  { questions: THERE_EX1_R1 },
  { questions: THERE_EX1_R2 },
]

interface ThereEx2Q {
  after: string
  answer: ThereVerb
}

const THERE_EX2: ThereEx2Q[] = [
  { after: 'a book on the table.',            answer: 'There is'  },
  { after: 'shoes on the floor.',             answer: 'There are' },
  { after: 'a kite in the park.',             answer: 'There is'  },
  { after: 'many children in the school.',    answer: 'There are' },
  { after: 'a cat near the door.',            answer: 'There is'  },
  { after: 'six eggs in the basket.',         answer: 'There are' },
  { after: 'a nice garden near the house.',   answer: 'There is'  },
  { after: 'two birds in the tree.',          answer: 'There are' },
  { after: 'a pencil on the desk.',           answer: 'There is'  },
  { after: 'three dogs in the yard.',         answer: 'There are' },
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
        <h2 className="font-display font-black text-3xl text-sky-700 text-center mb-2">
          There is / There are
        </h2>
        <p className="font-bold text-sky-800 text-sm mb-4 text-center" dir="rtl">
          משתמשים ב- There is או There are כדי להגיד שמשהו נמצא במקום מסוים
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-sky-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">There is</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לפני שם עצם ביחיד</div>
            <div className="text-white/70 font-bold text-xs mt-1">a book, a cat, one dog...</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">There are</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לפני שם עצם ברבים</div>
            <div className="text-white/70 font-bold text-xs mt-1">two dogs, many cats...</div>
          </div>
        </div>

        <div className="bg-white border-2 border-sky-200 rounded-2xl p-3 mb-3">
          <p className="font-bold text-sky-700 text-sm" dir="rtl">
            הצורה המקוצרת של There is היא <span className="font-black">There&apos;s</span>
          </p>
          <p className="font-bold text-gray-500 text-sm mt-1">There&apos;s a book on the table. = There is a book on the table.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { verb: 'There is' as ThereVerb,  rest: 'a cat in the room.' },
            { verb: 'There are' as ThereVerb, rest: 'two dogs in the park.' },
            { verb: 'There is' as ThereVerb,  rest: 'a kite in the sky.' },
            { verb: 'There are' as ThereVerb, rest: 'many flowers in the garden.' },
          ].map(({ verb, rest }) => (
            <div key={rest} className="flex items-center gap-1.5 bg-sky-100 rounded-xl px-3 py-1.5">
              <span className={`font-black text-base ${verb === 'There is' ? 'text-sky-600' : 'text-blue-600'}`}>{verb}</span>
              <span className="font-bold text-sky-800 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1 ───────────────────────────────────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = EX1_ROUNDS[cycleIdx].questions
  const [answers, setAnswers] = useState<Record<number, ThereVerb>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: ThereVerb) => {
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

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על המילה הנכונה</p>

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
                  {(['There is', 'There are'] as ThereVerb[]).map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className={`px-2 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
                        v === 'There is'
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

// ── Ex2 ───────────────────────────────────────────────────────────────────────

function Ex2() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flashWrong, setFlashWrong] = useState<ThereVerb | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const question = THERE_EX2[currentIdx]

  const choose = (val: ThereVerb) => {
    if (val === question.answer) {
      setCompleted(prev => [...prev, `${val} ${question.after}`])
      if (currentIdx + 1 < THERE_EX2.length) {
        setCurrentIdx(i => i + 1)
      } else {
        setFinished(true)
      }
    } else {
      setFlashWrong(val)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  const restart = () => {
    setCurrentIdx(0)
    setCompleted([])
    setFinished(false)
    setFlashWrong(null)
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6 pb-16">
        <div className="text-center bounce-in mb-6">
          <div className="text-6xl mb-4">🌟</div>
          <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">סיימת את כל המשפטים!</p>
          <button onClick={restart} className="btn-kid bg-blue-500">🔁 Again</button>
        </div>
        <div className="flex flex-col gap-1.5">
          {THERE_EX2.map((q, i) => (
            <div key={i} className="bg-sky-100 border-2 border-sky-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-sky-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-sky-800 text-base">{q.answer} {q.after}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Word Bank</span>
        <span className="text-sky-500">{currentIdx} / {THERE_EX2.length} ✓</span>
      </div>

      {/* Word bank */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-5">
        <p className="text-xs font-bold text-sky-500 mb-2 text-center" dir="rtl">לחצו על המילה הנכונה</p>
        <div className="flex gap-3 justify-center">
          {(['There is', 'There are'] as ThereVerb[]).map(val => (
            <button
              key={val}
              onClick={() => choose(val)}
              className={`px-5 py-2.5 rounded-xl font-display font-black text-base border-2 transition-all active:scale-95 ${
                flashWrong === val
                  ? 'bg-red-500 text-white border-red-500 scale-95'
                  : val === 'There is'
                  ? 'bg-white text-sky-700 border-sky-300 hover:bg-sky-100'
                  : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Current question */}
      <div className="bg-white border-2 border-sky-200 rounded-2xl px-4 py-4 mb-4">
        <p className="text-xl font-bold text-gray-700">
          <span className="bg-sky-100 rounded-lg px-2 py-0.5 text-sky-400">___</span>
          {' '}{question.after}
        </p>
      </div>

      {/* Completed sentences */}
      {completed.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {completed.map((s, i) => (
            <div key={i} className="bg-sky-100 border-2 border-sky-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-sky-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-sky-800 text-base">{s}</span>
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ThereIsPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">There is / There are 🌍</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">יש / ישנם — יש כלב / יש שני כלבים</p>
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
        {tab === 'ex2' && <Ex2 />}
      </div>
    </div>
  )
}
