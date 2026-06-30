'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

// ── Ex1 (builder) data ───────────────────────────────────────────────────────────

const EX1_SUBJECTS = ['you', 'they', 'he', 'she', 'the boys', 'Dana', 'my teacher', 'the children', 'my friends']
const EX1_VERBS = ['walk to school', 'play basketball', 'eat a pizza', 'swim in the pool', 'read a book', 'drink coffee', 'give homework', 'run fast']   // BASE form
const EX1_TIMES = ['yesterday', 'last week']

// ── Ex2 data (pick correct short answer) ────────────────────────────────────────

// pronoun group → short answers
type Group = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it'

const ANSWER_BANK: Record<Group, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I did.',    no: "No, I didn't."    },
  you:  { yes: 'Yes, you did.',  no: "No, you didn't."  },
  we:   { yes: 'Yes, we did.',   no: "No, we didn't."   },
  they: { yes: 'Yes, they did.', no: "No, they didn't." },
  he:   { yes: 'Yes, he did.',   no: "No, he didn't."   },
  she:  { yes: 'Yes, she did.',  no: "No, she didn't."  },
  it:   { yes: 'Yes, it did.',   no: "No, it didn't."   },
}

const GROUPS: Group[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it']

interface Ex2Q {
  question: string
  group: Group
}

// `group` = the pronoun used in the SHORT ANSWER (not the subject of the question):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they, plural noun→they, singular noun→he/she/it
const EX2_QUESTIONS: Ex2Q[] = [
  { question: 'Did you enjoy the concert?',     group: 'I'    },
  { question: 'Did she play the piano?',        group: 'she'  },
  { question: 'Did they walk to school?',       group: 'they' },
  { question: 'Did he eat breakfast?',          group: 'he'   },
  { question: 'Did we win the game?',           group: 'we'   },
  { question: 'Did it rain last night?',        group: 'it'   },
  { question: 'Did I sing well?',               group: 'you'  },
  { question: 'Did Dana clean her room?',       group: 'she'  },
  { question: 'Did the boys run fast?',         group: 'they' },
  { question: 'Did the dog sleep outside?',     group: 'it'   },
]

// ── Learn ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-blue-700 text-center mb-1">
          Did + base verb
        </h2>
        <p className="font-display font-black text-xl text-indigo-600 text-center mb-4" dir="rtl">
          שאלות כן / לא בעבר פשוט
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-blue-800 mb-4" dir="rtl">
          <p>• שאלות כן / לא בעבר — מתחילות ב-Did</p>
          <p>• המבנה: Did + נושא + פועל בצורת הבסיס</p>
          <p>• Did מתאים לכל הנושאים (I / you / he / she / it / we / they)</p>
          <p>• אחרי Did הפועל תמיד בצורת הבסיס</p>
        </div>

        {/* transformation */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-3 mb-4 text-center">
          <span className="font-bold text-gray-500 text-base">She ate.</span>
          <span className="text-blue-400 font-black mx-2">→</span>
          <span className="font-black text-blue-700 text-lg">Did she eat?</span>
        </div>

        <div className="bg-indigo-600 rounded-2xl p-3 text-center mb-2">
          <div className="font-display font-black text-white text-xl mb-1">Did</div>
          <div className="text-white/80 font-bold text-sm">+ subject + verb</div>
        </div>
        <p className="font-bold text-blue-800 text-sm mb-4 text-center" dir="rtl">
          הצורה זהה לכל הגופים
        </p>

        <p className="font-bold text-blue-800 text-sm mb-2 text-center" dir="rtl">
          הצורה זהה לכל הנושאים
        </p>
        <div className="flex flex-col gap-1.5">
          {['Did I clean?', 'Did you clean?', 'Did he clean?', 'Did she clean?', 'Did it clean?', 'Did we clean?', 'Did they clean?'].map(s => (
            <div key={s} className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">{s}</div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 mb-1">תשובות קצרות</h2>
        <p className="font-bold text-amber-700 text-sm mb-3" dir="rtl">
          בדרך כלל עונים על שאלות כן / לא בעבר בתשובות קצרות עם did / didn&apos;t.
        </p>

        <div className="flex flex-col gap-3">
          {[
            { q: 'Did they walk to school?',   yes: 'Yes, they did.', no: "No, they didn't." },
            { q: 'Did you clean the room?',     yes: 'Yes, I did.',    no: "No, I didn't." },
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

// ── Ex1: builder (Did + subject + base verb + time) ───────────────────────────────

const EX1_GOAL = 6

function Ex1() {
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [resetKey, setResetKey] = useState(0)

  const allDone = sentences.length >= EX1_GOAL

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selTime) return
    const sentence = `Did ${selSubject} ${selVerb} ${selTime}?`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
  }

  const again = () => {
    setSentences([])
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
    setResetKey(k => k + 1)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={resetKey}>
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span dir="rtl">בנה שאלות כן / לא בעבר</span>
        <span className="text-blue-500">{Math.min(sentences.length, EX1_GOAL)} / {EX1_GOAL} ✓</span>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-3 text-sm font-bold text-blue-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את המשימה.</p>
        <p>2. כל שאלה מתחילה ב-Did. בחר נושא, פועל וזמן.</p>
        <p>3. שימו לב: אחרי Did הפועל בצורת הבסיס.</p>
        <p>4. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Did column (fixed) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Did</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              <div className="text-xs font-display font-black rounded-lg px-1 py-1 text-center bg-indigo-600 text-white border-2 border-indigo-600">
                Did
              </div>
              <p className="text-[10px] font-bold text-indigo-500 text-center mt-1" dir="rtl">לכל הנושאים</p>
            </div>
          </div>

          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX1_SUBJECTS.map(s => (
                <button
                  key={s}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject === s ? 'bg-blue-500 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column (base) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX1_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-sky-500 text-white' : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'}`}
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
              {EX1_TIMES.map(t => (
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

      {selSubject && selVerb && selTime && !allDone && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-blue-700 text-base flex-1">
            Did {selSubject} {selVerb} {selTime}?
          </span>
          <button onClick={handleAdd} className="btn-kid bg-blue-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-blue-100 border-2 border-blue-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-blue-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-blue-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great questions!</p>
          <button onClick={again} className="btn-kid bg-blue-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: pick the correct short answer ──────────────────────────────────────────

function Ex2() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX2_QUESTIONS[current]
  const isLast = current === EX2_QUESTIONS.length - 1

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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX2_QUESTIONS.length} השאלות!</p>
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
        <span>Question {current + 1} / {EX2_QUESTIONS.length}</span>
        <span className="text-blue-500">{current} ✓</span>
      </div>

      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הקצרה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-blue-700">{q.question}</p>
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

export default function PastSimpleYesNoPage() {
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

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/past-simple" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Past Simple</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Past Simple — Yes/No Questions ❓</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות כן / לא בעבר פשוט</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Did she wait? · Did they play?</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
      </div>
    </div>
  )
}
