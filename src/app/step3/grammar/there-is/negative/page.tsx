'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Types & Data ──────────────────────────────────────────────────────────────

type NegVerb = "There isn't" | "There aren't"

interface NegQ {
  after: string
  answer: NegVerb
}

// Ex1 rounds
const NEG_EX1_R1: NegQ[] = [
  { after: 'a cat in the room.',             answer: "There isn't"  },
  { after: 'six dogs in the park.',          answer: "There aren't" },
  { after: 'a book on the table.',           answer: "There isn't"  },
  { after: 'many flowers in the garden.',    answer: "There aren't" },
  { after: 'a teacher in school today.',     answer: "There isn't"  },
  { after: 'two chairs near the window.',    answer: "There aren't" },
  { after: 'a bird on the tree.',            answer: "There isn't"  },
  { after: 'any pencils in my bag.',         answer: "There aren't" },
  { after: 'a sandwich in the fridge.',      answer: "There isn't"  },
  { after: 'any dogs in the yard.',          answer: "There aren't" },
]

const NEG_EX1_R2: NegQ[] = [
  { after: 'a cloud in the sky.',            answer: "There isn't"  },
  { after: 'three cats on the roof.',        answer: "There aren't" },
  { after: 'a fish in the bowl.',            answer: "There isn't"  },
  { after: 'many people in the park.',       answer: "There aren't" },
  { after: 'a kite in the sky.',             answer: "There isn't"  },
  { after: 'any chairs in the room.',        answer: "There aren't" },
  { after: 'a dog in the yard.',             answer: "There isn't"  },
  { after: 'two apples on the table.',       answer: "There aren't" },
  { after: 'a pencil on the desk.',          answer: "There isn't"  },
  { after: 'any flowers in the garden.',     answer: "There aren't" },
]

const EX1_ROUNDS = [
  { questions: NEG_EX1_R1 },
  { questions: NEG_EX1_R2 },
]

// Ex2 rounds (auto-advance)
const NEG_EX2_R1: NegQ[] = [
  { after: 'a bird on the tree.',            answer: "There isn't"  },
  { after: 'three books on the shelf.',      answer: "There aren't" },
  { after: 'a cat under the table.',         answer: "There isn't"  },
  { after: 'many children in the room.',     answer: "There aren't" },
  { after: 'a sandwich in my bag.',          answer: "There isn't"  },
  { after: 'six chairs near the door.',      answer: "There aren't" },
  { after: 'a park near our house.',         answer: "There isn't"  },
  { after: 'any dogs in the yard.',          answer: "There aren't" },
  { after: 'a pencil on the desk.',          answer: "There isn't"  },
  { after: 'three dogs in the park.',        answer: "There aren't" },
]

const NEG_EX2_R2: NegQ[] = [
  { after: 'a flower in the garden.',        answer: "There isn't"  },
  { after: 'any people on the street.',      answer: "There aren't" },
  { after: 'a car in the garage.',           answer: "There isn't"  },
  { after: 'two stars in the sky.',          answer: "There aren't" },
  { after: 'a fish in the bowl.',            answer: "There isn't"  },
  { after: 'any cups on the table.',         answer: "There aren't" },
  { after: 'a dog in the house.',            answer: "There isn't"  },
  { after: 'many trees in the park.',        answer: "There aren't" },
  { after: 'a chair near the window.',       answer: "There isn't"  },
  { after: 'any books on the shelf.',        answer: "There aren't" },
]

const EX2_ROUNDS = [NEG_EX2_R1, NEG_EX2_R2]

// Ex3 data
interface NegSubject {
  text: string
  verb: NegVerb
}

interface NegEx3Cycle {
  subjects: NegSubject[]
  places: string[]
}

const EX3_CYCLES: NegEx3Cycle[] = [
  {
    subjects: [
      { text: 'a cat',       verb: "There isn't"  },
      { text: 'many dogs',   verb: "There aren't" },
      { text: 'a book',      verb: "There isn't"  },
      { text: 'six chairs',  verb: "There aren't" },
      { text: 'a tree',      verb: "There isn't"  },
      { text: 'any birds',   verb: "There aren't" },
    ],
    places: ['in the room', 'in the park', 'on the table', 'near the door', 'in the garden', 'on the shelf'],
  },
  {
    subjects: [
      { text: 'a pencil',    verb: "There isn't"  },
      { text: 'three boys',  verb: "There aren't" },
      { text: 'an apple',    verb: "There isn't"  },
      { text: 'two cats',    verb: "There aren't" },
      { text: 'a car',       verb: "There isn't"  },
      { text: 'any fish',    verb: "There aren't" },
    ],
    places: ['in the bag', 'under the tree', 'in the yard', 'near the school', 'on the roof', 'in the classroom'],
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
          className="btn-kid bg-rose-500"
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
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-2">
          There isn&apos;t / There aren&apos;t
        </h2>
        <p className="font-bold text-rose-800 text-sm mb-4 text-center" dir="rtl">
          צורת השלילה של there is / there are
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-sky-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-lg mb-1">There isn&apos;t</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לפני שם עצם ביחיד</div>
            <div className="text-white/70 font-bold text-xs mt-1 italic">There isn&apos;t a teacher in the classroom.</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-lg mb-1">There aren&apos;t</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לפני שם עצם ברבים</div>
            <div className="text-white/70 font-bold text-xs mt-1 italic">There aren&apos;t six pencils on the table.</div>
          </div>
        </div>

        <div className="bg-white border-2 border-rose-200 rounded-2xl p-3 mb-3">
          <p className="font-bold text-rose-700 text-sm text-center">
            There is not = <span className="font-black">There isn&apos;t</span>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            There are not = <span className="font-black">There aren&apos;t</span>
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { verb: "There isn't" as NegVerb,  rest: 'a cat in the room.' },
            { verb: "There aren't" as NegVerb, rest: 'two dogs in the park.' },
            { verb: "There isn't" as NegVerb,  rest: 'a kite in the sky.' },
            { verb: "There aren't" as NegVerb, rest: 'many flowers in the garden.' },
          ].map(({ verb, rest }) => (
            <div key={rest} className="flex items-center gap-1.5 bg-rose-100 rounded-xl px-3 py-1.5">
              <span className={`font-black text-base ${verb === "There isn't" ? 'text-sky-600' : 'text-blue-600'}`}>{verb}</span>
              <span className="font-bold text-rose-800 text-base">{rest}</span>
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
  const [answers, setAnswers] = useState<Record<number, NegVerb>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: NegVerb) => {
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
        <span className="text-rose-500">{answered} / {total} ✓</span>
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
                  {(["There isn't", "There aren't"] as NegVerb[]).map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className={`px-2 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
                        v === "There isn't"
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
                <button onClick={onAgain} className="btn-kid bg-rose-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-rose-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
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
  const [flashWrong, setFlashWrong] = useState<NegVerb | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const question = questions[currentIdx]

  const choose = (val: NegVerb) => {
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
                <button onClick={onAgain} className="btn-kid bg-rose-500">סבב הבא →</button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-rose-500">🔁 Again</button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {questions.map((q, i) => (
            <div key={i} className="bg-rose-100 border-2 border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-rose-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-rose-800 text-base">{q.answer} {q.after}</span>
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
        <span className="text-rose-500">{currentIdx} / {questions.length} ✓</span>
      </div>

      {/* Word bank */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-5">
        <p className="text-xs font-bold text-rose-500 mb-2 text-center" dir="rtl">בחר את הצורה הנכונה, המעבר לשאלה הבאה אוטומטי.</p>
        <div className="flex gap-3 justify-center">
          {(["There isn't", "There aren't"] as NegVerb[]).map(val => (
            <button
              key={val}
              onClick={() => choose(val)}
              className={`px-4 py-2.5 rounded-xl font-display font-black text-sm border-2 transition-all active:scale-95 ${
                flashWrong === val
                  ? 'bg-red-500 text-white border-red-500 scale-95'
                  : val === "There isn't"
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
      <div className="bg-white border-2 border-rose-200 rounded-2xl px-4 py-4 mb-4">
        <p className="text-xl font-bold text-gray-700">
          <span className="bg-rose-100 rounded-lg px-2 py-0.5 text-rose-400">___</span>
          {' '}{question.after}
        </p>
      </div>

      {/* Completed sentences */}
      {completed.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {completed.map((s, i) => (
            <div key={i} className="bg-rose-100 border-2 border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-rose-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-rose-800 text-base">{s}</span>
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
  const [selSubject, setSelSubject] = useState<NegSubject | null>(null)
  const [selVerb, setSelVerb] = useState<NegVerb | null>(null)
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
        <span className="text-rose-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 text-sm font-bold text-rose-700" dir="rtl">
        <p>1. יש ליצור 6 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Verb column — first */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-pink-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">isn&apos;t / aren&apos;t</span>
            </div>
            <div className="bg-pink-50 border-2 border-pink-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(["There isn't", "There aren't"] as NegVerb[]).map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-display font-black rounded-lg px-2 py-1 text-center transition-colors border-2 ${
                    selVerb === v
                      ? 'bg-pink-600 text-white border-pink-600'
                      : v === "There isn't"
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
            <div className="bg-rose-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-rose-500 text-white' : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'}`}
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
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-rose-700 text-base flex-1">
            {selVerb} {selSubject.text} {selPlace}.
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
            {cycleIdx + 1 < EX3_CYCLES.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-rose-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-rose-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
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

export default function ThereIsNegativePage() {
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

      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/there-is" className="text-white/70 font-bold text-sm no-underline hover:text-white">← There is / There are</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Negative ❌</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שלילה — צורת השלילה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">There isn&apos;t · There aren&apos;t</p>
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
