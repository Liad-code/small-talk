'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

type DoDoes = 'Do' | 'Does'

// ── Ex1 data ──────────────────────────────────────────────────────────────────

interface Ex1Q {
  after: string
  answer: DoDoes
}

const EX1_QUESTIONS: Ex1Q[] = [
  { after: 'teachers give tests?',          answer: 'Do'   },
  { after: 'she play the piano?',           answer: 'Does' },
  { after: 'you like ice cream?',           answer: 'Do'   },
  { after: 'he walk to school?',            answer: 'Does' },
  { after: 'they read books every day?',    answer: 'Do'   },
  { after: 'Dana eat breakfast?',           answer: 'Does' },
  { after: 'we have homework today?',       answer: 'Do'   },
  { after: 'the dog run in the park?',      answer: 'Does' },
  { after: 'cats sleep all day?',           answer: 'Do'   },
  { after: 'your mom cook dinner?',         answer: 'Does' },
  { after: 'the boys play football?',       answer: 'Do'   },
  { after: 'Tom ride a bike?',              answer: 'Does' },
  { after: 'you and Dan swim?',             answer: 'Do'   },
  { after: 'it rain in winter?',            answer: 'Does' },
  { after: 'children like games?',          answer: 'Do'   },
]

// ── Ex2 (builder) data ─────────────────────────────────────────────────────────

interface Ex2Subject {
  text: string
  doDoes: DoDoes
}

const EX2_SUBJECTS: Ex2Subject[] = [
  { text: 'girls',  doDoes: 'Do'   },
  { text: 'cats',   doDoes: 'Do'   },
  { text: 'oren',      doDoes: 'Does' },
  { text: 'dana',      doDoes: 'Does' },
  { text: 'my mother', doDoes: 'Does' },
]

const EX2_VERBS = ['read', 'play', 'eat', 'walk']
const EX2_TIMES = ['every day', 'every week']

// ── Ex3 data ──────────────────────────────────────────────────────────────────

// pronoun group → short answers
type Group = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it'

const ANSWER_BANK: Record<Group, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I do.',    no: "No, I don't."    },
  you:  { yes: 'Yes, you do.',  no: "No, you don't."  },
  we:   { yes: 'Yes, we do.',   no: "No, we don't."   },
  they: { yes: 'Yes, they do.', no: "No, they don't." },
  he:   { yes: 'Yes, he does.', no: "No, he doesn't." },
  she:  { yes: 'Yes, she does.',no: "No, she doesn't."},
  it:   { yes: 'Yes, it does.', no: "No, it doesn't." },
}

const GROUPS: Group[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it']

interface Ex3Q {
  question: string
  group: Group
}

// `group` = the pronoun used in the SHORT ANSWER (not the subject of the question):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they, plural noun→they, singular noun→he/she/it
const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Do you like pizza?',          group: 'I'    },
  { question: 'Does she play the piano?',    group: 'she'  },
  { question: 'Do they read every day?',     group: 'they' },
  { question: 'Does he walk to school?',     group: 'he'   },
  { question: 'Do we have homework today?',  group: 'we'   },
  { question: 'Does it rain in winter?',     group: 'it'   },
  { question: 'Do I play well?',             group: 'you'  },
  { question: 'Does Dana eat breakfast?',    group: 'she'  },
  { question: 'Do the boys run fast?',       group: 'they' },
  { question: 'Does the dog like water?',    group: 'it'   },
]

// ── Learn ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-sky-700 text-center mb-1">
          Do / Does
        </h2>
        <p className="font-bold text-sky-700 text-sm text-center mb-4">
          Yes / No Questions
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-sky-800 mb-4" dir="rtl">
          <p>• שאלות כן / לא בהווה — מתחילות ב-Do או Does</p>
          <p>• Do — עם I, you, we, they</p>
          <p>• Does — עם he, she, it</p>
          <p>• הפועל בשאלה תמיד ללא s</p>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <div className="bg-teal-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">Do</div>
            <div className="text-white/80 font-bold text-sm">I, you, we, they + verb?</div>
          </div>
          <div className="bg-violet-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">Does</div>
            <div className="text-white/80 font-bold text-sm">he, she, it + verb?</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { dd: 'Do' as DoDoes,   rest: 'you play football?' },
            { dd: 'Does' as DoDoes, rest: 'he eat breakfast?' },
            { dd: 'Do' as DoDoes,   rest: 'they read books?' },
          ].map(({ dd, rest }) => (
            <div key={rest} className="flex items-center gap-1.5 bg-sky-100 rounded-xl px-3 py-1.5">
              <span className={`font-black text-base ${dd === 'Do' ? 'text-teal-600' : 'text-violet-600'}`}>{dd}</span>
              <span className="font-bold text-sky-800 text-base">{rest}</span>
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
            { q: 'Do you like pizza?',      yes: 'Yes, I do.',    no: "No, I don't." },
            { q: 'Does she play piano?',    yes: 'Yes, she does.', no: "No, she doesn't." },
            { q: 'Do they read books?',     yes: 'Yes, they do.',  no: "No, they don't." },
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

// ── Ex1: choose Do / Does ───────────────────────────────────────────────────────

function Ex1() {
  const [answers, setAnswers] = useState<Record<number, DoDoes>>({})
  const [wrongs, setWrongs] = useState<Record<number, DoDoes>>({})
  const [order] = useState<boolean[]>(() => EX1_QUESTIONS.map(() => Math.random() < 0.5))
  const [resetKey, setResetKey] = useState(0)

  const total = EX1_QUESTIONS.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: DoDoes) => {
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
        <h2 className="font-display font-black text-xl text-sky-700 text-center mb-1">
          Choose Do or Does
        </h2>
        <p className="font-bold text-sm text-sky-600 text-center" dir="rtl">
          לחצו על המילה הנכונה כדי להתחיל את השאלה
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-sky-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX1_QUESTIONS.map((q, idx) => {
          const ans = answers[idx]
          const opts: DoDoes[] = order[idx] ? ['Do', 'Does'] : ['Does', 'Do']
          return (
            <div
              key={idx}
              className="bg-white border-2 border-sky-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {ans ? (
                  <span className="font-black text-sky-600 bg-sky-100 rounded px-1">{q.answer}</span>
                ) : (
                  <span className="text-sky-300 font-black">___</span>
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
                          : opt === 'Do'
                          ? 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100'
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
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in mt-6">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את כל השאלות!</p>
          <button onClick={again} className="btn-kid bg-sky-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: builder ────────────────────────────────────────────────────────────────

const EX2_GOAL = 6

function Ex2() {
  const [selDoDoes, setSelDoDoes] = useState<DoDoes | null>(null)
  const [selSubject, setSelSubject] = useState<Ex2Subject | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [resetKey, setResetKey] = useState(0)

  const allDone = sentences.length >= EX2_GOAL

  const handleAdd = () => {
    if (!selDoDoes || !selSubject || !selVerb || !selTime) return
    if (selSubject.doDoes !== selDoDoes) {
      setError('❌ Try a different Do / Does!')
      return
    }
    const sentence = `${selDoDoes} ${selSubject.text} ${selVerb} ${selTime}?`
    setSentences(prev => [...prev, sentence])
    setSelDoDoes(null)
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
    setError('')
  }

  const again = () => {
    setSentences([])
    setSelDoDoes(null)
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
    setError('')
    setResetKey(k => k + 1)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={resetKey}>
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span dir="rtl">בנה שאלות כן / לא</span>
        <span className="text-sky-500">{Math.min(sentences.length, EX2_GOAL)} / {EX2_GOAL} ✓</span>
      </div>

      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-3 text-sm font-bold text-sky-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור שאלה.</p>
        <p>3. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
        <p>4. במידה והשאלה לא נכונה, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Do / Does column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Do / Does</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(['Do', 'Does'] as DoDoes[]).map(v => (
                <button
                  key={v}
                  onClick={() => setSelDoDoes(v)}
                  className={`text-xs font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${
                    selDoDoes === v
                      ? v === 'Do' ? 'bg-teal-500 text-white border-teal-500' : 'bg-violet-500 text-white border-violet-500'
                      : v === 'Do'
                      ? 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100'
                      : 'bg-violet-50 text-violet-700 border-violet-300 hover:bg-violet-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX2_SUBJECTS.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-pink-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-pink-50 border-2 border-pink-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX2_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-pink-500 text-white' : 'bg-white text-pink-700 border border-pink-200 hover:bg-pink-100'}`}
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
              {EX2_TIMES.map(t => (
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

      {selDoDoes && selSubject && selVerb && selTime && !allDone && (
        <div className="bg-sky-50 border-2 border-sky-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-sky-700 text-base flex-1">
            {selDoDoes} {selSubject.text} {selVerb} {selTime}?
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
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great questions!</p>
          <button onClick={again} className="btn-kid bg-sky-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex3: pick the correct short answer ──────────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX3_QUESTIONS[current]
  const isLast = current === EX3_QUESTIONS.length - 1

  const handleClick = (group: Group, side: 'yes' | 'no') => {
    if (flash) return
    if (group !== q.group) return
    const tileKey = `${group}-${side}`
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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QUESTIONS.length} השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-sky-500"
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
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הקצרה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-sky-700">{q.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="bg-green-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">YES ✓</span>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {GROUPS.map(g => {
              const tileKey = `${g}-yes`
              const isFlashing = flash === tileKey
              return (
                <button
                  key={g}
                  onClick={() => handleClick(g, 'yes')}
                  className={`text-sm font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                    isFlashing
                      ? 'bg-green-500 text-white border-green-500 scale-105'
                      : 'bg-white text-green-700 border-green-200 hover:bg-green-100 active:scale-95'
                  }`}
                >
                  {ANSWER_BANK[g].yes}
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
            {GROUPS.map(g => {
              const tileKey = `${g}-no`
              const isFlashing = flash === tileKey
              return (
                <button
                  key={g}
                  onClick={() => handleClick(g, 'no')}
                  className={`text-sm font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                    isFlashing
                      ? 'bg-rose-500 text-white border-rose-500 scale-105'
                      : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-100 active:scale-95'
                  }`}
                >
                  {ANSWER_BANK[g].no}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function PresentSimpleYesNoPage() {
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
          <Link href="/step4/grammar/present-simple" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Simple</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Simple — Yes/No Questions ❓</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות כן / לא בהווה פשוט</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Do you play? · Does she eat?</p>
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
        {tab === 'ex1'   && <Ex1 />}
        {tab === 'ex2'   && <Ex2 />}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
