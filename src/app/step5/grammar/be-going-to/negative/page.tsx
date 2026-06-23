'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

type NegAux = 'am not' | "isn't" | "aren't"

// ── Ex1 data: choose the negative auxiliary ───────────────────────────────────

interface Ex1Q {
  before: string
  after: string
  answer: NegAux
}

const EX1_QS: Ex1Q[] = [
  { before: 'My mother', after: 'going to make dinner.',  answer: "isn't"  },
  { before: 'My friends',after: 'going to drink coffee.', answer: "aren't" },
  { before: 'I',         after: 'going to read a book.',  answer: 'am not' },
  { before: 'He',        after: 'going to run today.',    answer: "isn't"  },
  { before: 'We',        after: 'going to play football.',answer: "aren't" },
  { before: 'Dana',      after: 'going to write a letter.',answer: "isn't" },
  { before: 'They',      after: 'going to eat lunch.',    answer: "aren't" },
  { before: 'You',       after: 'going to sleep early.',  answer: "aren't" },
  { before: 'The dog',   after: 'going to swim tomorrow.',answer: "isn't"  },
  { before: 'I',         after: 'going to walk to school.',answer: 'am not'},
  { before: 'Oren',      after: 'going to clean his room.',answer: "isn't" },
  { before: 'The girls', after: 'going to study tonight.',answer: "aren't" },
]

// ── Ex2 data: type-in (neg-aux + going to + verb) ─────────────────────────────

interface Ex2Q {
  subject: string
  base: string
  after: string
  answer: string
}

const EX2_QS: Ex2Q[] = [
  { subject: 'He',        base: 'run',   after: 'tomorrow.',     answer: "isn't going to run"    },
  { subject: 'I',         base: 'write', after: 'a letter.',     answer: 'am not going to write' },
  { subject: 'We',        base: 'make',  after: 'a cake.',       answer: "aren't going to make"  },
  { subject: 'The boys',  base: 'swim',  after: 'today.',        answer: "aren't going to swim"  },
  { subject: 'She',       base: 'stop',  after: 'the car.',      answer: "isn't going to stop"   },
  { subject: 'They',      base: 'play',  after: 'football.',     answer: "aren't going to play"  },
  { subject: 'I',         base: 'read',  after: 'a book.',       answer: 'am not going to read'  },
  { subject: 'Dana',      base: 'eat',   after: 'lunch.',        answer: "isn't going to eat"    },
  { subject: 'You',       base: 'sleep', after: 'early.',        answer: "aren't going to sleep" },
  { subject: 'He',        base: 'study', after: 'tonight.',      answer: "isn't going to study"  },
]

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-2">
          Be Going To — Negative
        </h2>
        <p className="font-bold text-rose-800 text-sm mb-4 text-center" dir="rtl">
          צורת השלילה: am not / isn&apos;t / aren&apos;t + going to + פועל
        </p>

        {/* neg-aux table */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-rose-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">am not</div>
            <div className="text-white/80 font-bold text-sm">I</div>
          </div>
          <div className="bg-red-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">is not</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
          <div className="bg-pink-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">are not</div>
            <div className="text-white/80 font-bold text-sm">you, we, they</div>
          </div>
        </div>

        {/* example sentences */}
        <div className="flex flex-col gap-1.5">
          {[
            { sub: 'I',    neg: 'am not',  rest: 'going to read.' },
            { sub: 'He',   neg: 'is not',  rest: 'going to read.' },
            { sub: 'She',  neg: 'is not',  rest: 'going to read.' },
            { sub: 'They', neg: 'are not', rest: 'going to read.' },
          ].map(({ sub, neg, rest }) => (
            <div key={sub} className="flex items-center gap-1.5 bg-rose-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-rose-700 text-base">{sub}</span>
              <span className="font-black text-base text-red-600">{neg}</span>
              <span className="font-bold text-rose-700 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Short forms */}
      <div className="bg-white border-2 border-rose-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-rose-700 text-lg mb-2 text-center">💬 Short forms</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">לעיתים יש שתי דרכים נכונות לקצר</p>
        <div className="flex flex-col gap-1.5">
          {[
            { full: 'I am not going to sleep', short: "I'm not going to sleep" },
            { full: 'He is not going to play', short: "He's not / He isn't going to play" },
            { full: 'She is not going to eat', short: "She's not / She isn't going to eat" },
            { full: 'They are not going to run', short: "They're not / They aren't going to run" },
            { full: 'We are not going to study', short: "We're not / We aren't going to study" },
          ].map(({ full, short }) => (
            <div key={full} className="flex items-center justify-between bg-rose-50 rounded-xl px-3 py-1.5 gap-2">
              <span className="font-bold text-gray-500 text-sm">{full}</span>
              <span className="font-black text-rose-700 text-sm text-right">{short}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Structure reminder */}
      <div className="bg-white border-2 border-red-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-red-700 text-lg mb-2 text-center">🚫 Remember</h3>
        <p className="font-display font-black text-red-600 text-center text-base mb-2">
          am/is/are + not + going to + verb
        </p>
        <p className="font-bold text-gray-500 text-sm text-center" dir="rtl">
          הפועל אחרי going to נשאר בצורת הבסיס (בלי תוספת)
        </p>
      </div>
    </div>
  )
}

// ── Ex1: choose the negative auxiliary ────────────────────────────────────────

function Ex1() {
  const questions = EX1_QS
  const [answers, setAnswers] = useState<Record<number, NegAux>>({})
  const [wrongs, setWrongs] = useState<Record<number, NegAux>>({})
  const [key, setKey] = useState(0)
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: NegAux) => {
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
        <span>Choose isn&apos;t / am not / aren&apos;t</span>
        <span className="text-rose-500">{answered} / {total} ✓</span>
      </div>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">בחרו את צורת השלילה הנכונה לפי הנושא</p>

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
                    <span className="font-black text-rose-600 bg-rose-100 rounded px-1">{ans}</span>
                  ) : (
                    <span className="text-rose-300 font-black">___</span>
                  )}{' '}
                  {q.after}
                </span>
                {!ans && (
                  <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                    {(["isn't", 'am not', "aren't"] as NegAux[]).map(opt => (
                      <button
                        key={opt}
                        onClick={() => choose(idx, opt)}
                        className={`px-2.5 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                          wrongs[idx] === opt
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
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
          <button onClick={restart} className="btn-kid bg-rose-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: type-in (neg-aux + going to + verb) ──────────────────────────────────

function Ex2() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX2_QS[current]
  const isLast = current === EX2_QS.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/’/g, "'")

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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX2_QS.length} השאלות!</p>
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
        <span>Question {current + 1} / {EX2_QS.length}</span>
        <span className="text-rose-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו את צורת השלילה + going to + פועל (למשל: isn&apos;t going to run)
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the negative form with &quot;going to&quot;
      </p>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-rose-500 mb-1">Base verb:</p>
        <p className="font-black text-rose-800 text-lg">{q.base}</p>
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
            placeholder=""
            className={`border-b-2 font-bold text-base text-center min-w-[200px] focus:outline-none bg-transparent transition-colors ${
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
            className="btn-kid bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BeGoingToNegativePage() {
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

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/be-going-to" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Be Going To</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Be Going To — Negative 🚫</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">עתיד — צורת השלילה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">am/is/are + not + going to + verb</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && <Ex2 />}
      </div>
    </div>
  )
}
