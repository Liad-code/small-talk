'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

// ── Ex1 (builder) data ───────────────────────────────────────────────────────────

interface Ex1Cycle {
  subjects: string[]
  verbs: string[]      // BASE form (after didn't the verb returns to base)
  times: string[]
}

const EX1_CYCLES: Ex1Cycle[] = [
  {
    subjects: ['I', 'He', 'The dog', 'Dan and Dana'],
    verbs: ['walk', 'play', 'eat', 'sleep'],
    times: ['yesterday', 'last week'],
  },
  {
    subjects: ['She', 'We', 'The boy', 'Tom and Liat'],
    verbs: ['run', 'go', 'clean', 'watch', 'study'],
    times: ['last night', 'last summer'],
  },
]

// ── Ex2 data (type the negative form) ────────────────────────────────────────────

interface Ex2Q {
  positive: string
  answer: string
}

const EX2_QUESTIONS: Ex2Q[] = [
  { positive: 'He walked to school yesterday.',     answer: "He did not walk to school yesterday."     },
  { positive: 'She played football last week.',     answer: "She did not play football last week."     },
  { positive: 'We watched a movie last night.',     answer: "We did not watch a movie last night."     },
  { positive: 'They cleaned the room yesterday.',   answer: "They did not clean the room yesterday."   },
  { positive: 'I studied English last night.',      answer: "I did not study English last night."      },
  { positive: 'He went to the park yesterday.',     answer: "He did not go to the park yesterday."      },
  { positive: 'She ate an apple this morning.',     answer: "She did not eat an apple this morning."    },
  { positive: 'We saw a great show last week.',     answer: "We did not see a great show last week."    },
  { positive: 'Dan ran in the race yesterday.',     answer: "Dan did not run in the race yesterday."    },
  { positive: 'The cat slept on the bed last night.', answer: "The cat did not sleep on the bed last night." },
  { positive: 'I made a cake yesterday.',           answer: "I did not make a cake yesterday."         },
  { positive: 'They took the bus last week.',       answer: "They did not take the bus last week."     },
]

// ── Learn ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-blue-700 text-center mb-1">
          did not / didn&apos;t
        </h2>
        <p className="font-display font-black text-xl text-indigo-600 text-center mb-4" dir="rtl">
          שלילה בעבר פשוט
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-blue-800 mb-4" dir="rtl">
          <p>• שלילה בעבר — did not + פועל בצורת הבסיס</p>
          <p>• אחרי did not הפועל חוזר לצורת הבסיס (בלי -ed ובלי צורת עבר מיוחדת)</p>
          <p>• צורת הקיצור: did not → didn&apos;t</p>
        </div>

        {/* transformation */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-3 mb-4 text-center">
          <span className="font-bold text-gray-500 text-base">He walked to school.</span>
          <span className="text-blue-400 font-black mx-2">→</span>
          <span className="font-black text-blue-700 text-base">He did not walk to school.</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">did not</div>
            <div className="text-white/80 font-bold text-sm">+ base verb</div>
          </div>
          <div className="bg-indigo-600 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">didn&apos;t</div>
            <div className="text-white/80 font-bold text-sm">short form</div>
          </div>
        </div>

        <p className="font-bold text-blue-800 text-sm mb-2 text-center" dir="rtl">
          הצורה זהה לכל הנושאים (I / you / he / she / it / we / they)
        </p>
        <div className="flex flex-col gap-1.5">
          {['I did not sleep.', 'You did not sleep.', 'He did not sleep.', 'She did not sleep.', 'It did not sleep.', 'We did not sleep.', 'They did not sleep.'].map(s => (
            <div key={s} className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">{s}</div>
          ))}
        </div>
      </div>

      {/* base-verb reminder */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center">
        <p className="font-bold text-amber-800 text-sm" dir="rtl">
          ⚠️ זכרו: אחרי <span className="font-black">did not / didn&apos;t</span> הפועל תמיד בצורת הבסיס.
          לא נכון: <span className="font-black">He didn&apos;t walked</span> · נכון: <span className="font-black">He didn&apos;t walk</span>.
        </p>
      </div>
    </div>
  )
}

// ── Ex1: builder (subject + didn't + base verb + time) ───────────────────────────

const EX1_GOAL = 6

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX1_CYCLES[cycleIdx]
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])

  const allDone = sentences.length >= EX1_GOAL

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selTime) return
    const sentence = `${selSubject} didn't ${selVerb} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Round {cycleIdx + 1} / {EX1_CYCLES.length}</span>
        <span className="text-blue-500">{Math.min(sentences.length, EX1_GOAL)} / {EX1_GOAL} ✓</span>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-3 text-sm font-bold text-blue-700" dir="rtl">
        <p>1. יש ליצור 6 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט שלילה בעבר.</p>
        <p>3. שימו לב: אחרי didn&apos;t הפועל בצורת הבסיס.</p>
        <p>4. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {cycle.subjects.map(s => (
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

          {/* didn't column (fixed) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">didn&apos;t</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              <div className="text-xs font-display font-black rounded-lg px-1 py-1 text-center bg-indigo-600 text-white border-2 border-indigo-600">
                didn&apos;t
              </div>
              <p className="text-[10px] font-bold text-indigo-500 text-center mt-1" dir="rtl">לכל הנושאים</p>
            </div>
          </div>

          {/* Verb column (base) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {cycle.verbs.map(v => (
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

      {selSubject && selVerb && selTime && !allDone && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-blue-700 text-base flex-1">
            {selSubject} didn&apos;t {selVerb} {selTime}.
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
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX1_CYCLES.length ? (
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

// ── Ex2: type the negative form ──────────────────────────────────────────────────

// normalize apostrophes (straight/curly), whitespace and case for matching
function normalize(s: string): string {
  return s
    .replace(/[‘’ʼ′]/g, "'")
    .replace(/[.!?]+\s*$/, '')   // accept with or without an ending period
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function Ex2() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX2_QUESTIONS[current]
  const isLast = current === EX2_QUESTIONS.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  // accept both "did not" and "didn't"
  function accepts(value: string): boolean {
    const v = normalize(value)
    const long = normalize(q.answer)                       // did not
    const short = normalize(q.answer.replace(/did not/g, "didn't"))
    return v === long || v === short
  }

  const submit = () => {
    if (!input.trim()) return
    if (accepts(input)) {
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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX2_QUESTIONS.length} השאלות!</p>
        <button onClick={again} className="btn-kid bg-blue-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX2_QUESTIONS.length}</span>
        <span className="text-blue-500">{current} / {EX2_QUESTIONS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        כתבו את המשפט בצורת השלילה בעבר
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Write the negative form (did not / didn&apos;t + base verb)
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-blue-500 mb-1">✅ Positive:</p>
        <p className="font-bold text-blue-800 text-lg">{q.positive}</p>
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
            className="btn-kid bg-blue-500 !py-1 !px-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
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

// ── Wrapper (multi-round flow for builder) ────────────────────────────────────────

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

export default function PastSimpleNegativePage() {
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
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Past Simple — Negative ❌</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שלילה בעבר פשוט</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">He did not walk · She didn&apos;t eat</p>
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
        {tab === 'ex1'   && (
          <ExWrapper
            cycles={EX1_CYCLES.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2'   && <Ex2 />}
      </div>
    </div>
  )
}
