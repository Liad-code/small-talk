'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Types & Data ──────────────────────────────────────────────────────────────

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

const THERE_EX2_R1: ThereEx2Q[] = [
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

const THERE_EX2_R2: ThereEx2Q[] = [
  { after: 'a red bag on the chair.',         answer: 'There is'  },
  { after: 'four books on the shelf.',        answer: 'There are' },
  { after: 'a cat under the table.',          answer: 'There is'  },
  { after: 'many stars in the sky.',          answer: 'There are' },
  { after: 'a big tree in the park.',         answer: 'There is'  },
  { after: 'six children in the room.',       answer: 'There are' },
  { after: 'a dog in the yard.',              answer: 'There is'  },
  { after: 'two chairs near the window.',     answer: 'There are' },
  { after: 'a sandwich in my bag.',           answer: 'There is'  },
  { after: 'many flowers in the garden.',     answer: 'There are' },
]

const EX2_ROUNDS = [THERE_EX2_R1, THERE_EX2_R2]

// ── Ex3 data ──────────────────────────────────────────────────────────────────

interface ThereSubject {
  text: string
  verb: ThereVerb
}

interface ThereEx3Cycle {
  subjects: ThereSubject[]
  places: string[]
}

const EX3_CYCLES: ThereEx3Cycle[] = [
  {
    subjects: [
      { text: 'a cat',      verb: 'There is'  },
      { text: 'two dogs',   verb: 'There are' },
      { text: 'a book',     verb: 'There is'  },
      { text: 'many birds', verb: 'There are' },
      { text: 'a tree',     verb: 'There is'  },
      { text: 'six chairs', verb: 'There are' },
    ],
    places: ['in the park', 'on the table', 'near the school', 'in my bag', 'in the garden', 'on the shelf'],
  },
  {
    subjects: [
      { text: 'a flower',   verb: 'There is'  },
      { text: 'three boys', verb: 'There are' },
      { text: 'an apple',   verb: 'There is'  },
      { text: 'two cats',   verb: 'There are' },
      { text: 'a car',      verb: 'There is'  },
      { text: 'many fish',  verb: 'There are' },
    ],
    places: ['in the room', 'under the tree', 'in the yard', 'near the door', 'on the roof', 'in the classroom'],
  },
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

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = EX2_ROUNDS[cycleIdx]
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flashWrong, setFlashWrong] = useState<ThereVerb | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const question = questions[currentIdx]

  const choose = (val: ThereVerb) => {
    if (flashWrong) return
    if (val === question.answer) {
      const newCompleted = [...completed, `${val} ${question.after}`]
      setCompleted(newCompleted)
      if (currentIdx + 1 < questions.length) {
        setTimeout(() => setCurrentIdx(i => i + 1), 600)
      } else {
        setTimeout(() => setFinished(true), 600)
      }
    } else {
      setFlashWrong(val)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6 pb-16">
        <div className="text-center bounce-in mb-6">
          <div className="text-6xl mb-4">🌟</div>
          <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">סיימת את כל המשפטים!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX2_ROUNDS.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-blue-500">סבב הבא →</button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {questions.map((q, i) => (
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
        <span>Round {cycleIdx + 1} / {EX2_ROUNDS.length}</span>
        <span className="text-sky-500">{currentIdx} / {questions.length} ✓</span>
      </div>

      {/* Word bank */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-5">
        <p className="text-xs font-bold text-sky-500 mb-2 text-center" dir="rtl">בחר את הצורה הנכונה, המעבר לשאלה הבאה אוטומטי.</p>
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

// ── Ex3 ───────────────────────────────────────────────────────────────────────

function Ex3({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX3_CYCLES[cycleIdx]
  const [selSubject, setSelSubject] = useState<ThereSubject | null>(null)
  const [selVerb, setSelVerb] = useState<ThereVerb | null>(null)
  const [selPlace, setSelPlace] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  // Tiles stay PERMANENTLY available — never consumed.
  const allDone = sentences.length === cycle.subjects.length
  const availableSubjects = cycle.subjects
  const availablePlaces = cycle.places

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selPlace) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selVerb} ${selSubject.text} ${selPlace}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null)
    setSelVerb(null)
    setSelPlace(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {EX3_CYCLES.length}</span>
        <span className="text-sky-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-3 text-sm font-bold text-sky-700" dir="rtl">
        <p>1. יש ליצור 6 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Verb column — first */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">There is/are</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(['There is', 'There are'] as ThereVerb[]).map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-sm font-display font-black rounded-lg px-2 py-1 text-center transition-colors border-2 ${
                    selVerb === v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : v === 'There is'
                      ? 'bg-sky-50 text-sky-700 border-sky-300 hover:bg-sky-100'
                      : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Subject column — second */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-sky-500 text-white' : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Place column — third */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Place</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availablePlaces.map(p => (
                <button
                  key={p}
                  onClick={() => setSelPlace(p)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${selPlace === p ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selVerb && selPlace && !allDone && (
        <div className="bg-sky-50 border-2 border-sky-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-sky-700 text-base flex-1">
            {selVerb} {selSubject.text} {selPlace}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-sky-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-sky-100 border-2 border-sky-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-sky-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-sky-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX3_CYCLES.length ? (
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ThereIsPositivePage() {
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

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/there-is" className="text-white/70 font-bold text-sm no-underline hover:text-white">← There is / There are</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Positive ✅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">יש / ישנם — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">There is · There are</p>
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
        {tab === 'ex2' && (
          <ExWrapper
            cycles={EX2_ROUNDS.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3' && (
          <ExWrapper
            cycles={EX3_CYCLES.length}
            render={(c, again, done) => <Ex3 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
