'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

type Prep = 'in' | 'on' | 'at'

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({ render }: { render: (onDone: () => void) => React.ReactNode }) {
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את התרגול!</p>
        <button
          onClick={() => { setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-cyan-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return <div key={key}>{render(() => setFinished(true))}</div>
}

// ── LEARN ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-sky-700 text-center mb-1">
          Prepositions of Time
        </h2>
        <p className="font-display font-black text-xl text-sky-600 text-center mb-2" dir="rtl">
          מילות יחס של זמן
        </p>
        <p className="font-bold text-sky-800 text-sm text-center" dir="rtl">
          IN, ON, AT — לכל אחת יש שימוש משלה לפי סוג הזמן
        </p>
      </div>

      {/* IN */}
      <div className="bg-cyan-50 border-4 border-cyan-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-3xl text-cyan-700 text-center mb-2">IN</h3>
        <p className="font-bold text-cyan-800 text-sm text-center mb-3" dir="rtl">
          חודשים, עונות השנה וחלקי היום
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {['months', 'seasons', 'the morning', 'the afternoon', 'the evening'].map(t => (
            <span key={t} className="bg-white border-2 border-cyan-200 rounded-full px-3 py-1 font-bold text-cyan-700 text-sm">{t}</span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-cyan-100 rounded-xl px-3 py-1.5 font-bold text-cyan-700 text-base">We swim <span className="text-cyan-900 underline">in</span> the summer.</div>
          <div className="bg-cyan-100 rounded-xl px-3 py-1.5 font-bold text-cyan-700 text-base">The party is <span className="text-cyan-900 underline">in</span> June.</div>
          <div className="bg-cyan-100 rounded-xl px-3 py-1.5 font-bold text-cyan-700 text-base">The show is <span className="text-cyan-900 underline">in</span> the morning.</div>
        </div>
      </div>

      {/* ON */}
      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-3xl text-sky-700 text-center mb-2">ON</h3>
        <p className="font-bold text-sky-800 text-sm text-center mb-3" dir="rtl">
          ימים בשבוע
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(t => (
            <span key={t} className="bg-white border-2 border-sky-200 rounded-full px-3 py-1 font-bold text-sky-700 text-sm">{t}</span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-sky-100 rounded-xl px-3 py-1.5 font-bold text-sky-700 text-base">I play basketball <span className="text-sky-900 underline">on</span> Monday.</div>
        </div>
      </div>

      {/* AT */}
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-3xl text-blue-700 text-center mb-2">AT</h3>
        <p className="font-bold text-blue-800 text-sm text-center mb-3" dir="rtl">
          שעות מדויקות וחלקים ספציפיים במהלך היום
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {['7:30', '8 o\'clock', 'night', 'lunchtime', 'sunset', 'the moment'].map(t => (
            <span key={t} className="bg-white border-2 border-blue-200 rounded-full px-3 py-1 font-bold text-blue-700 text-sm">{t}</span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">My English lesson is <span className="text-blue-900 underline">at</span> 10 o&apos;clock.</div>
          <div className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">I watch TV <span className="text-blue-900 underline">at</span> night.</div>
        </div>
      </div>
    </div>
  )
}

// ── EX 1: choose in / on / at ───────────────────────────────────────────────────

interface ChoiceQ {
  before: string
  after: string
  answer: Prep
}

const EX1_QUESTIONS: ChoiceQ[] = [
  { before: 'I wake up',          after: '7 o\'clock.',   answer: 'at' },
  { before: 'My tennis is',       after: 'Sunday.',       answer: 'on' },
  { before: 'My birthday is',     after: 'December.',     answer: 'in' },
  { before: 'We have a test',     after: 'Monday.',       answer: 'on' },
  { before: 'It snows',           after: 'the winter.',   answer: 'in' },
  { before: 'I read a book',      after: 'night.',        answer: 'at' },
  { before: 'School starts',      after: '8 o\'clock.',   answer: 'at' },
  { before: 'We play football',   after: 'the afternoon.',answer: 'in' },
  { before: 'My party is',        after: 'Friday.',       answer: 'on' },
  { before: 'The flowers grow',   after: 'the spring.',   answer: 'in' },
  { before: 'I eat dinner',       after: 'the evening.',  answer: 'in' },
  { before: 'We don\'t work',     after: 'Saturday.',     answer: 'on' },
  { before: 'The movie ends',     after: '9 o\'clock.',   answer: 'at' },
  { before: 'It is hot',          after: 'the summer.',   answer: 'in' },
  { before: 'My class is',        after: 'Tuesday.',      answer: 'on' },
]

const PREPS: Prep[] = ['in', 'on', 'at']

function ChoiceExercise({ questions, onDone }: { questions: ChoiceQ[]; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, Prep>>({})

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: Prep) => {
    if (answers[idx]) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => {
        const next = { ...prev }
        delete next[idx]
        return next
      }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-sky-700 text-center mb-1">
          Choose in / on / at
        </h2>
        <p className="font-bold text-sm text-sky-600 text-center" dir="rtl">
          לחצו על מילת היחס הנכונה לפי מילת הזמן
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-sky-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answers[idx]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-sky-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-sky-600 bg-sky-100 rounded px-1">{q.answer}</span>
                ) : (
                  <span className="text-sky-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto">
                  {PREPS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-sky-50 text-sky-700 border-sky-300 hover:bg-sky-100'
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
          <button onClick={onDone} className="btn-kid bg-cyan-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 2: 3-part builder (Subject | in/on/at | Time) ────────────────────────────

interface BuilderItem {
  subject: string
  prep: Prep
  time: string
}

const EX2_ITEMS: BuilderItem[] = [
  { subject: 'I wake up',   prep: 'at', time: '7 o\'clock' },
  { subject: 'My birthday is', prep: 'in', time: 'December' },
  { subject: 'We play',     prep: 'on', time: 'Sunday' },
  { subject: 'She sleeps',  prep: 'at', time: 'night' },
  { subject: 'It snows',    prep: 'in', time: 'winter' },
  { subject: 'We meet',     prep: 'on', time: 'Monday' },
]

function BuilderExercise({ items, onDone }: { items: BuilderItem[]; onDone: () => void }) {
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selPrep, setSelPrep] = useState<Prep | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const goal = items.length
  const allDone = sentences.length >= goal

  const subjects = items.map(i => i.subject)
  const times = items.map(i => i.time)

  const handleAdd = () => {
    if (!selSubject || !selPrep || !selTime) return
    // Find the item that matches the chosen subject + time
    const item = items.find(i => i.subject === selSubject && i.time === selTime)
    if (!item || item.prep !== selPrep) {
      setError('❌ The preposition does not match the time! Try again.')
      return
    }
    const sentence = `${selSubject} ${selPrep} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null)
    setSelPrep(null)
    setSelTime(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-sky-500">{sentences.length} / {goal} ✓</span>
      </div>

      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-3 text-sm font-bold text-sky-700" dir="rtl">
        <p>1. יש ליצור {goal} משפטים על מנת לסיים.</p>
        <p>2. לחץ על מילה אחת מכל עמודה כדי לבנות משפט.</p>
        <p>3. בחר את מילת היחס שמתאימה לזמן, ואז לחץ Add.</p>
        <p>4. אם מילת היחס לא נכונה — יופיע X אדום. תקן ולחץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {subjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${
                    selSubject === s
                      ? 'bg-sky-500 text-white'
                      : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Preposition column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-cyan-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">in/on/at</span>
            </div>
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {PREPS.map(p => (
                <button
                  key={p}
                  onClick={() => setSelPrep(p)}
                  className={`text-base font-display font-black rounded-lg px-2 py-1 text-center transition-colors border-2 ${
                    selPrep === p
                      ? 'bg-cyan-600 text-white border-cyan-600'
                      : 'bg-white text-cyan-700 border-cyan-300 hover:bg-cyan-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Time column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Time</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {times.map(t => (
                <button
                  key={t}
                  onClick={() => setSelTime(t)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${
                    selTime === t
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selPrep && selTime && !allDone && (
        <div className="bg-sky-50 border-2 border-sky-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-sky-700 text-base flex-1">
            {selSubject} {selPrep} {selTime}.
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
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great sentences!</p>
          <button onClick={onDone} className="btn-kid bg-cyan-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function PrepositionsOfTimePage() {
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

      <div className="bg-gradient-to-r from-sky-500 to-cyan-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Grammar
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Prepositions of Time ⏰</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">מילות יחס של זמן — in, on, at</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max mx-auto justify-center">
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
        {tab === 'ex1' && <ExWrapper render={done => <ChoiceExercise questions={EX1_QUESTIONS} onDone={done} />} />}
        {tab === 'ex2' && <ExWrapper render={done => <BuilderExercise items={EX2_ITEMS} onDone={done} />} />}
      </div>
    </div>
  )
}
