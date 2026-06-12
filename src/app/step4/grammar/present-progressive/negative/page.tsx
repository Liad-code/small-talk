'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

type NegAux = 'am not' | "isn't" | "aren't"

// ── Ex1 data: choose full "neg-aux + verb-ing" phrase ─────────────────────────

interface Ex1Q {
  before: string
  after: string
  correct: string
  wrong: string
}

const EX1_R1: Ex1Q[] = [
  { before: 'I',          after: 'with my dog now.',          correct: 'am not walking',  wrong: "isn't walking"  },
  { before: 'Gil',        after: 'football now.',             correct: "isn't playing",   wrong: "aren't playing" },
  { before: 'We',         after: 'lunch at the moment.',      correct: "aren't eating",   wrong: "isn't eating"   },
  { before: 'She',        after: 'a song right now.',         correct: "isn't learning",  wrong: 'am not learning'},
  { before: 'They',       after: 'water now.',                correct: "aren't drinking", wrong: "isn't drinking" },
  { before: 'My brother', after: 'now.',                      correct: "isn't sleeping",  wrong: "aren't sleeping"},
  { before: 'You',        after: 'the table today.',          correct: "aren't cleaning", wrong: 'am not cleaning'},
  { before: 'I',          after: 'my friend today.',          correct: 'am not meeting',  wrong: "aren't meeting" },
  { before: 'The girls',  after: 'in the garden now.',        correct: "aren't playing",  wrong: "isn't playing"  },
  { before: 'Dana',       after: 'an apple now.',             correct: "isn't eating",    wrong: "aren't eating"  },
  { before: 'He',         after: 'to school now.',            correct: "isn't walking",   wrong: 'am not walking' },
  { before: 'We',         after: 'English at the moment.',    correct: "aren't learning", wrong: "isn't learning" },
  { before: 'The cat',    after: 'on the sofa now.',          correct: "isn't sleeping",  wrong: "aren't sleeping"},
  { before: 'My friends', after: 'juice now.',                correct: "aren't drinking", wrong: 'am not drinking'},
  { before: 'I',          after: 'my room today.',            correct: 'am not cleaning', wrong: "isn't cleaning" },
]

// ── Ex2 data: choose the negative auxiliary ───────────────────────────────────

interface Ex2Q {
  before: string
  after: string
  answer: NegAux
}

const EX2_R1: Ex2Q[] = [
  { before: 'My mother', after: 'making dinner.',        answer: "isn't"   },
  { before: 'My friends',after: 'drinking coffee.',      answer: "aren't"  },
  { before: 'I',         after: 'reading a book.',       answer: 'am not'  },
  { before: 'He',        after: 'running in the park.',  answer: "isn't"   },
  { before: 'We',        after: 'playing football.',     answer: "aren't"  },
  { before: 'Dana',      after: 'writing a letter.',     answer: "isn't"   },
  { before: 'They',      after: 'eating lunch.',         answer: "aren't"  },
  { before: 'You',       after: 'sleeping now.',         answer: "aren't"  },
  { before: 'The dog',   after: 'swimming now.',         answer: "isn't"   },
  { before: 'I',         after: 'walking to school.',    answer: 'am not'  },
  { before: 'Oren',      after: 'cleaning his room.',    answer: "isn't"   },
  { before: 'The girls', after: 'learning English.',     answer: "aren't"  },
  { before: 'My father', after: 'making a cake.',        answer: "isn't"   },
  { before: 'We',        after: 'crying now.',           answer: "aren't"  },
  { before: 'It',        after: 'raining now.',          answer: "isn't"   },
]

// ── Ex3 data: type-in (neg-aux + ing) ─────────────────────────────────────────

interface Ex3Q {
  subject: string
  base: string
  after: string
  answer: string
}

const EX3_QS: Ex3Q[] = [
  { subject: 'He',        base: 'run',   after: 'in the park now.',      answer: "isn't running"    },
  { subject: 'I',         base: 'write', after: 'a letter now.',         answer: 'am not writing'   },
  { subject: 'We',        base: 'make',  after: 'a cake at the moment.', answer: "aren't making"    },
  { subject: 'The boys',  base: 'swim',  after: 'in the lake now.',      answer: "aren't swimming"  },
  { subject: 'She',       base: 'stop',  after: 'the car now.',          answer: "isn't stopping"   },
  { subject: 'They',      base: 'play',  after: 'football today.',       answer: "aren't playing"   },
  { subject: 'The baby',  base: 'cry',   after: 'now.',                  answer: "isn't crying"     },
  { subject: 'I',         base: 'read',  after: 'a book now.',           answer: 'am not reading'   },
  { subject: 'Dana',      base: 'make',  after: 'lunch now.',            answer: "isn't making"     },
  { subject: 'We',        base: 'run',   after: 'now.',                  answer: "aren't running"   },
  { subject: 'He',        base: 'write', after: 'his homework now.',     answer: "isn't writing"    },
  { subject: 'You',       base: 'swim',  after: 'today.',                answer: "aren't swimming"  },
  { subject: 'The girls', base: 'cry',   after: 'now.',                  answer: "aren't crying"    },
  { subject: 'I',         base: 'stop',  after: 'my bike now.',          answer: 'am not stopping'  },
  { subject: 'She',       base: 'play',  after: 'the piano now.',        answer: "isn't playing"    },
]

// ── Ex4 data: 4-part builder ──────────────────────────────────────────────────

interface BuilderSubject {
  text: string
  aux: NegAux
}

const EX4_SUBJECTS: BuilderSubject[] = [
  { text: 'I',      aux: 'am not' },
  { text: 'they',   aux: "aren't" },
  { text: 'girls',  aux: "aren't" },
  { text: 'Dan',    aux: "isn't"  },
  { text: 'sister', aux: "isn't"  },
  { text: 'father', aux: "isn't"  },
]
const EX4_VERBS = ['reading', 'playing', 'eating', 'running', 'sleeping', 'making']
const EX4_TIMES = ['now', 'today', 'at the moment']

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-2">
          Present Progressive — Negative
        </h2>
        <p className="font-bold text-rose-800 text-sm mb-4 text-center" dir="rtl">
          צורת השלילה: am not / isn&apos;t / aren&apos;t + פועל עם ing
        </p>

        {/* neg-aux table */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-rose-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">am not</div>
            <div className="text-white/80 font-bold text-sm">I</div>
          </div>
          <div className="bg-red-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">isn&apos;t</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
          <div className="bg-pink-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">aren&apos;t</div>
            <div className="text-white/80 font-bold text-sm">you, we, they</div>
          </div>
        </div>

        {/* example sentences */}
        <div className="flex flex-col gap-1.5">
          {[
            { sub: 'I',    neg: 'am not',  rest: 'walking.' },
            { sub: 'He',   neg: "isn't",   rest: 'walking.' },
            { sub: 'She',  neg: "isn't",   rest: 'walking.' },
            { sub: 'We',   neg: "aren't",  rest: 'walking.' },
            { sub: 'They', neg: "aren't",  rest: 'walking.' },
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
            { full: 'I am not reading', short: "I'm not reading" },
            { full: 'He is not playing', short: "He's not / He isn't playing" },
            { full: 'She is not eating', short: "She's not / She isn't eating" },
            { full: 'They are not talking', short: "They're not / They aren't talking" },
            { full: 'We are not running', short: "We're not / We aren't running" },
          ].map(({ full, short }) => (
            <div key={full} className="flex items-center justify-between bg-rose-50 rounded-xl px-3 py-1.5 gap-2">
              <span className="font-bold text-gray-500 text-sm">{full}</span>
              <span className="font-black text-rose-700 text-sm text-right">{short}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ING reminder */}
      <div className="bg-white border-2 border-red-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-red-700 text-lg mb-2 text-center">✏️ ING reminder</h3>
        <div className="flex flex-wrap gap-2 justify-center text-sm">
          {['run → running', 'write → writing', 'stop → stopping', 'cry → crying', 'play → playing'].map(e => (
            <span key={e} className="bg-red-50 text-red-700 font-black rounded-full px-3 py-1">{e}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: choose full phrase ───────────────────────────────────────────────────

function Ex1() {
  const questions = EX1_R1
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Record<number, string>>({})
  const [order] = useState<boolean[]>(() => questions.map(() => Math.random() < 0.5))
  const [key, setKey] = useState(0)
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx]) return
    if (val === questions[idx].correct) {
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
        <span>Choose the phrase</span>
        <span className="text-rose-500">{answered} / {total} ✓</span>
      </div>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על צורת השלילה הנכונה</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const opts = order[idx] ? [q.correct, q.wrong] : [q.wrong, q.correct]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
                <span className="text-base font-bold text-gray-700">
                  {q.before}{' '}
                  {ans ? (
                    <span className="font-black text-rose-600 bg-rose-100 rounded px-1">{q.correct}</span>
                  ) : (
                    <span className="text-rose-300 font-black">___</span>
                  )}{' '}
                  {q.after}
                </span>
                {!ans && (
                  <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                    {opts.map(opt => (
                      <button
                        key={opt}
                        onClick={() => choose(idx, opt)}
                        className={`px-2.5 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
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

// ── Ex2: choose the negative auxiliary ────────────────────────────────────────

function Ex2() {
  const questions = EX2_R1
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

// ── Ex3: type-in (neg-aux + ing) ──────────────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX3_QS[current]
  const isLast = current === EX3_QS.length - 1

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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QS.length} השאלות!</p>
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
        <span>Question {current + 1} / {EX3_QS.length}</span>
        <span className="text-rose-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו את צורת השלילה + פועל עם ing (למשל: isn&apos;t running)
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the negative auxiliary + the -ing verb
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
            placeholder="isn't running"
            className={`border-b-2 font-bold text-base text-center min-w-[150px] focus:outline-none bg-transparent transition-colors ${
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

// ── Ex4: 4-part builder ───────────────────────────────────────────────────────

function Ex4() {
  const TARGET = 6
  const [selSubject, setSelSubject] = useState<BuilderSubject | null>(null)
  const [selAux, setSelAux] = useState<NegAux | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const allDone = sentences.length === TARGET

  const handleAdd = () => {
    if (!selSubject || !selAux || !selVerb || !selTime) return
    if (selSubject.aux !== selAux) {
      setError("❌ Try a different aux (am not/isn't/aren't)!")
      return
    }
    const sentence = `${selSubject.text} ${selAux} ${selVerb} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null); setSelAux(null); setSelVerb(null); setSelTime(null)
    setError('')
  }

  const restart = () => {
    setSentences([]); setSelSubject(null); setSelAux(null); setSelVerb(null); setSelTime(null); setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-rose-500">{sentences.length} / {TARGET} ✓</span>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 text-sm font-bold text-rose-700" dir="rtl">
        <p>1. יש ליצור {TARGET} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה ופועל העזר לא מתאים לנושא, יופיע X אדום.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-rose-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_SUBJECTS.map(s => (
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

          {/* Aux */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-red-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Aux</span>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-b-xl p-1 flex flex-col gap-1">
              {(["isn't", 'am not', "aren't"] as NegAux[]).map(a => (
                <button
                  key={a}
                  onClick={() => setSelAux(a)}
                  className={`text-xs font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${selAux === a ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-700 border-red-300 hover:bg-red-100'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Verb */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-pink-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-pink-50 border-2 border-pink-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_VERBS.map(v => (
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

          {/* Time */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Time</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_TIMES.map(t => (
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

      {selSubject && selAux && selVerb && selTime && !allDone && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-rose-700 text-base flex-1">
            {selSubject.text} {selAux} {selVerb} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-rose-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-rose-100 border-2 border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-rose-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-rose-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <button onClick={restart} className="btn-kid bg-rose-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PresentProgressiveNegativePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
    { id: 'ex4',   label: 'Ex 4' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar/present-progressive" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Progressive</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Progressive — Negative ❌</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">הווה ממושך — צורת השלילה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">am not / isn&apos;t / aren&apos;t + verb-ing</p>
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
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && <Ex2 />}
        {tab === 'ex3' && <Ex3 />}
        {tab === 'ex4' && <Ex4 />}
      </div>
    </div>
  )
}
