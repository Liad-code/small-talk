'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

type Aux = 'Am' | 'Is' | 'Are'

// am→I; is→he/she/it; are→you/we/they
const AUX_COLORS: Record<Aux, { bg: string; light: string; text: string; border: string }> = {
  Am:  { bg: 'bg-indigo-500',  light: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-300'  },
  Is:  { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
  Are: { bg: 'bg-orange-500',  light: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-300'  },
}

const AUXES: Aux[] = ['Am', 'Is', 'Are']

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
      {/* Forming questions */}
      <div className="bg-cyan-50 border-4 border-cyan-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-cyan-700 text-center mb-1">
          Yes / No Questions
        </h2>
        <p className="font-bold text-cyan-700 text-sm text-center mb-4" dir="rtl">
          Be Going To — שאלות כן / לא
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-cyan-800 mb-4" dir="rtl">
          <p>• שאלות עם be going to מתחילות ב- Am / Is / Are.</p>
          <p>• המבנה: <span dir="ltr" className="font-black">Am / Is / Are + subject + going to + verb?</span></p>
          <p>• אחרי going to הפועל תמיד בצורת הבסיס.</p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-cyan-200 p-3 mb-4 text-center">
          <p className="font-bold text-gray-600 text-base">She is going to sleep.</p>
          <p className="font-display font-black text-cyan-600 text-lg my-1">↓</p>
          <p className="font-display font-black text-cyan-700 text-lg">Is she going to sleep?</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {AUXES.map(a => {
            const c = AUX_COLORS[a]
            const who = a === 'Am' ? 'I' : a === 'Is' ? 'he · she · it' : 'you · we · they'
            return (
              <div key={a} className={`${c.bg} rounded-2xl p-3 text-center`}>
                <div className="font-display font-black text-white text-2xl mb-1">{a}</div>
                <div className="text-white/80 font-bold text-xs">{who}</div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { aux: 'Am' as Aux,  rest: 'I going to swim?' },
            { aux: 'Is' as Aux,  rest: 'he going to swim?' },
            { aux: 'Is' as Aux,  rest: 'she going to swim?' },
            { aux: 'Are' as Aux, rest: 'you going to swim?' },
            { aux: 'Are' as Aux, rest: 'we going to swim?' },
            { aux: 'Are' as Aux, rest: 'they going to swim?' },
          ].map(({ aux, rest }) => (
            <div key={rest} className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-1.5 border-2 border-cyan-100">
              <span className={`font-display font-black text-base ${AUX_COLORS[aux].text}`}>{aux}</span>
              <span className="font-bold text-gray-700 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Short answers */}
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 mb-1">Short Answers</h2>
        <p className="font-bold text-amber-700 text-sm mb-3" dir="rtl">תשובות קצרות</p>

        <div className="flex flex-col gap-3">
          {[
            { q: 'Am I going to go?',         yes: 'Yes, I am.',     no: "No, I'm not."    },
            { q: 'Is he going to drink?',     yes: 'Yes, he is.',    no: "No, he isn't."   },
            { q: 'Is she going to sleep?',    yes: 'Yes, she is.',   no: "No, she isn't."  },
            { q: 'Are you going to go?',      yes: 'Yes, I am.',     no: "No, I'm not."    },
            { q: 'Are they going to swim?',   yes: 'Yes, they are.', no: "No, they aren't." },
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

// ── Ex 1: question builder (Aux + subject + going to + verb) ──────────────────

interface Ex1Subject { text: string; aux: Aux }

interface Ex1Cycle {
  subjects: Ex1Subject[]
  verbs: string[]
}

const EX1_CYCLES: Ex1Cycle[] = [
  {
    subjects: [
      { text: 'you',  aux: 'Are' },
      { text: 'she',  aux: 'Is'  },
      { text: 'I',    aux: 'Am'  },
      { text: 'they', aux: 'Are' },
      { text: 'he',   aux: 'Is'  },
      { text: 'we',   aux: 'Are' },
    ],
    verbs: ['wait', 'eat lunch', 'sleep late', 'swim', 'run fast', 'play tennis'],
  },
]

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX1_CYCLES[cycleIdx]
  const [selAux, setSelAux] = useState<Aux | null>(null)
  const [selSubject, setSelSubject] = useState<Ex1Subject | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedVerbs, setUsedVerbs] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availVerbs = cycle.verbs.filter(v => !usedVerbs.has(v))

  const handleAdd = () => {
    if (!selAux || !selSubject || !selVerb) return
    if (selSubject.aux !== selAux) {
      setError('❌ Try a different aux!')
      return
    }
    const sentence = `${selAux} ${selSubject.text} going to ${selVerb}?`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedVerbs(prev => { const s = new Set(prev); s.add(selVerb); return s })
    setSelAux(null)
    setSelSubject(null)
    setSelVerb(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Cycle {cycleIdx + 1} / {EX1_CYCLES.length}</span>
        <span className="text-cyan-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-3 mb-3 text-sm font-bold text-cyan-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור שאלה.</p>
        <p>3. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
        <p>4. במידה והשאלה לא נכונה, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {/* Aux */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-cyan-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Am/Is/Are</span>
            </div>
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-b-xl p-1 flex flex-col gap-1">
              {AUXES.map(v => {
                const c = AUX_COLORS[v]
                return (
                  <button
                    key={v}
                    onClick={() => setSelAux(v)}
                    className={`text-sm font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${selAux === v ? `${c.bg} text-white ${c.border}` : `${c.light} ${c.text} ${c.border} hover:opacity-80`}`}
                  >
                    {v}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1 flex flex-col gap-1">
              {availSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Verb (going to + base) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">going to +</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1 flex flex-col gap-1">
              {availVerbs.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-sm font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selAux && selSubject && selVerb && !allDone && (
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-cyan-700 text-base flex-1">
            {selAux} {selSubject.text} going to {selVerb}?
          </span>
          <button onClick={handleAdd} className="btn-kid bg-cyan-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-cyan-100 border-2 border-cyan-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-cyan-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-cyan-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great questions!</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 2: Pick the correct short answer ──────────────────────────────────────

type AnswerGroup = 'I' | 'he' | 'she' | 'it' | 'you' | 'we' | 'they'

const ANSWER_BANK: Record<AnswerGroup, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I am.',     no: "No, I'm not."     },
  he:   { yes: 'Yes, he is.',    no: "No, he isn't."    },
  she:  { yes: 'Yes, she is.',   no: "No, she isn't."   },
  it:   { yes: 'Yes, it is.',    no: "No, it isn't."    },
  you:  { yes: 'Yes, you are.',  no: "No, you aren't."  },
  we:   { yes: 'Yes, we are.',   no: "No, we aren't."   },
  they: { yes: 'Yes, they are.', no: "No, they aren't." },
}

const ANSWER_GROUPS: AnswerGroup[] = ['I', 'he', 'she', 'it', 'you', 'we', 'they']

interface Ex2Q { question: string; group: AnswerGroup }

// `group` = the pronoun used in the SHORT ANSWER (not always the subject):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they
const EX2_QUESTIONS: Ex2Q[] = [
  { question: 'Is she going to eat?',           group: 'she'  },
  { question: 'Are you going to wait?',         group: 'I'    },
  { question: 'Am I going to win?',             group: 'you'  },
  { question: 'Is he going to sleep?',          group: 'he'   },
  { question: 'Are they going to swim?',        group: 'they' },
  { question: 'Is it going to rain?',           group: 'it'   },
  { question: 'Are we going to play?',          group: 'we'   },
  { question: 'Is she going to sing?',          group: 'she'  },
  { question: 'Are they going to run?',         group: 'they' },
  { question: 'Is he going to help?',           group: 'he'   },
]

function Ex2() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX2_QUESTIONS[current]
  const isLast = current === EX2_QUESTIONS.length - 1

  const handleClick = (group: AnswerGroup, side: 'yes' | 'no') => {
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
        <span className="text-cyan-500">{current} ✓</span>
      </div>

      <div className="bg-cyan-50 border-4 border-cyan-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-cyan-700">{q.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* YES */}
        <div className="flex flex-col gap-1.5">
          <div className="bg-green-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">YES ✓</span>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {ANSWER_GROUPS.map(g => {
              const isFlashing = flash === `${g}-yes`
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

        {/* NO */}
        <div className="flex flex-col gap-1.5">
          <div className="bg-rose-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">NO ✗</span>
          </div>
          <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {ANSWER_GROUPS.map(g => {
              const isFlashing = flash === `${g}-no`
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

// ── Ex 3: complete with Am / Is / Are ────────────────────────────────────────

interface Ex3Q { after: string; answer: Aux }

const EX3_QUESTIONS: Ex3Q[] = [
  { after: 'he going to listen to his MP3 player?', answer: 'Is'  },
  { after: 'Hadas going to play in the garden?',    answer: 'Is'  },
  { after: 'I going to be late?',                   answer: 'Am'  },
  { after: 'you going to wait?',                    answer: 'Are' },
  { after: 'she going to eat lunch?',               answer: 'Is'  },
  { after: 'they going to swim?',                   answer: 'Are' },
  { after: 'we going to play tennis?',              answer: 'Are' },
  { after: 'it going to rain?',                     answer: 'Is'  },
  { after: 'I going to win the game?',              answer: 'Am'  },
  { after: 'the boys going to run fast?',           answer: 'Are' },
]

function Ex3() {
  const [answers, setAnswers] = useState<Record<number, Aux>>({})
  const [wrongs, setWrongs] = useState<Record<number, Aux>>({})
  const [resetKey, setResetKey] = useState(0)

  const total = EX3_QUESTIONS.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, choice: Aux) => {
    if (answers[idx]) return
    if (choice === EX3_QUESTIONS[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: choice }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: choice }))
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
    <div key={resetKey} className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-cyan-700 text-center mb-1">
          Complete with Am / Is / Are
        </h2>
        <p className="font-bold text-sm text-cyan-600 text-center" dir="rtl">
          בחר את מילת הפתיחה הנכונה — Am / Is / Are
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-cyan-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {EX3_QUESTIONS.map((q, idx) => {
          const chosen = answers[idx]
          return (
            <div key={idx} className="bg-white border-2 border-cyan-200 rounded-2xl px-3 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
                {chosen ? (
                  <span className={`font-display font-black text-base ${AUX_COLORS[chosen].text}`}>{chosen}</span>
                ) : (
                  <span className="text-cyan-300 font-black text-base">___</span>
                )}
                <span className="font-bold text-gray-700 text-base">{q.after}</span>
                {chosen && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
              </div>

              {!chosen && (
                <div className="flex gap-1.5 flex-wrap">
                  {AUXES.map(opt => {
                    const c = AUX_COLORS[opt]
                    const isWrong = wrongs[idx] === opt
                    return (
                      <button
                        key={opt}
                        onClick={() => choose(idx, opt)}
                        className={`font-display font-black text-sm px-3 py-1 rounded-xl border-2 transition-colors active:scale-95 ${
                          isWrong
                            ? 'bg-red-500 text-white border-red-500'
                            : `${c.light} ${c.text} ${c.border} hover:opacity-80`
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד!</p>
          <button onClick={again} className="btn-kid bg-cyan-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BeGoingToYesNoPage() {
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

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/be-going-to" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Be Going To</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Be Going To — Yes / No Questions ❓</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">Be Going To — שאלות כן / לא</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Are you going to wait? · Is he going to eat?</p>
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
        {tab === 'ex1' && (
          <ExWrapper cycles={EX1_CYCLES.length} render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex2' && <Ex2 />}
        {tab === 'ex3' && <Ex3 />}
      </div>
    </div>
  )
}
