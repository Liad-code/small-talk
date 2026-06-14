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
      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-sky-700 text-center mb-1">
          Yes / No Questions
        </h2>
        <p className="font-bold text-sky-700 text-sm text-center mb-4" dir="rtl">
          הווה מתמשך — שאלות כן / לא
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-sky-800 mb-4" dir="rtl">
          <p>• שאלות בהווה מתמשך מתחילות ב- Am / Is / Are.</p>
          <p>• המבנה: <span dir="ltr" className="font-black">Am / Is / Are + subject + verb-ing?</span></p>
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
            { aux: 'Am' as Aux,  rest: 'I going home?' },
            { aux: 'Is' as Aux,  rest: 'she eating breakfast?' },
            { aux: 'Are' as Aux, rest: 'we cleaning the room?' },
          ].map(({ aux, rest }) => (
            <div key={rest} className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-1.5 border-2 border-sky-100">
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
            { q: 'Am I going home?',          yes: 'Yes, I am.',     no: "No, I'm not."    },
            { q: 'Is she eating breakfast?',  yes: 'Yes, she is.',   no: "No, she isn't."  },
            { q: 'Are we cleaning the room?', yes: 'Yes, we are.',   no: "No, we aren't."  },
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

// ── Ex 1: Choose Am/Is/Are (blank at START) ──────────────────────────────────

interface Ex1Q {
  after: string   // subject + verb-ing + time?
  answer: Aux
}

const EX1_R1: Ex1Q[] = [
  { after: 'she eating breakfast right now?', answer: 'Is'  },
  { after: 'you cleaning your room now?',     answer: 'Are' },
  { after: 'I reading the book now?',         answer: 'Am'  },
  { after: 'he playing football today?',      answer: 'Is'  },
  { after: 'they watching TV now?',           answer: 'Are' },
  { after: 'it raining at the moment?',       answer: 'Is'  },
  { after: 'we going to the park now?',       answer: 'Are' },
  { after: 'I helping you today?',            answer: 'Am'  },
  { after: 'she singing a song now?',         answer: 'Is'  },
  { after: 'you drinking water now?',         answer: 'Are' },
  { after: 'he doing his homework now?',      answer: 'Is'  },
  { after: 'they running in the park today?', answer: 'Are' },
  { after: 'I winning the game now?',         answer: 'Am'  },
  { after: 'we eating lunch at the moment?',  answer: 'Are' },
  { after: 'she writing a letter now?',       answer: 'Is'  },
]

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = EX1_R1
  const [answers, setAnswers] = useState<Record<number, Aux>>({})
  const [wrongs, setWrongs] = useState<Record<number, Aux>>({})
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: Aux) => {
    if (answers[idx]) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrongs(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Round {cycleIdx + 1} / 1</span>
        <span className="text-sky-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">בחרו Am / Is / Are לפי הנושא</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
              {ans ? (
                <span className={`font-display font-black text-base ${AUX_COLORS[ans].text}`}>{ans}</span>
              ) : (
                <span className="text-gray-300 font-black text-base">___</span>
              )}
              <span className="text-base font-bold text-gray-700 flex-1 min-w-0">{q.after}</span>
              {!ans ? (
                <div className="flex gap-1.5">
                  {AUXES.map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className={`px-2.5 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrongs[idx] === v
                          ? 'bg-red-500 text-white border-red-500'
                          : `${AUX_COLORS[v].light} ${AUX_COLORS[v].text} ${AUX_COLORS[v].border} hover:opacity-80`
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
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
            <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 2: 4-part question builder ─────────────────────────────────────────────

interface Ex2Subject { text: string; aux: Aux }

interface Ex2Cycle {
  subjects: Ex2Subject[]
  verbs: string[]
  times: string[]
}

const EX2_CYCLES: Ex2Cycle[] = [
  {
    subjects: [
      { text: 'you',  aux: 'Are' },
      { text: 'she',  aux: 'Is'  },
      { text: 'I',    aux: 'Am'  },
      { text: 'they', aux: 'Are' },
      { text: 'he',   aux: 'Is'  },
      { text: 'we',   aux: 'Are' },
    ],
    verbs: ['reading books', 'eating lunch', 'playing football', 'cleaning the room', 'watching TV', 'drinking water'],
    times: ['now', 'today', 'at the moment', 'right now', 'now', 'today'],
  },
]

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX2_CYCLES[cycleIdx]
  const [selAux, setSelAux] = useState<Aux | null>(null)
  const [selSubject, setSelSubject] = useState<Ex2Subject | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedVerbs, setUsedVerbs] = useState<Set<string>>(new Set())
  const [usedTimes, setUsedTimes] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availVerbs = cycle.verbs.filter(v => !usedVerbs.has(v))
  const availTimes = cycle.times.filter((t, i) => !usedTimes.has(`${t}-${i}`))

  const handleAdd = () => {
    if (!selAux || !selSubject || !selVerb || !selTime) return
    if (selSubject.aux !== selAux) {
      setError('❌ Try a different aux!')
      return
    }
    const sentence = `${selAux} ${selSubject.text} ${selVerb} ${selTime}?`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedVerbs(prev => { const s = new Set(prev); s.add(selVerb); return s })
    setUsedTimes(prev => { const s = new Set(prev); s.add(selTime); return s })
    setSelAux(null)
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Cycle {cycleIdx + 1} / {EX2_CYCLES.length}</span>
        <span className="text-sky-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-3 text-sm font-bold text-sky-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור שאלה.</p>
        <p>3. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
        <p>4. במידה והשאלה לא נכונה, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Aux */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Aux</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1 flex flex-col gap-1">
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

          {/* Verb-ing */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb-ing</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1 flex flex-col gap-1">
              {availVerbs.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}
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
              {availTimes.map((t, i) => (
                <button
                  key={`${t}-${i}`}
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

      {selAux && selSubject && selVerb && selTime && !allDone && (
        <div className="bg-sky-50 border-2 border-sky-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-sky-700 text-base flex-1">
            {selAux} {selSubject.text} {selVerb} {selTime}?
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
          <div className="flex gap-3 justify-center">
            <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 3: Pick the correct short answer ──────────────────────────────────────

type AnswerGroup = 'I' | 'he' | 'she' | 'it' | 'you' | 'we' | 'they'

const ANSWER_BANK: Record<AnswerGroup, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I am.',    no: "No, I'm not."    },
  he:   { yes: 'Yes, he is.',   no: "No, he isn't."   },
  she:  { yes: 'Yes, she is.',  no: "No, she isn't."  },
  it:   { yes: 'Yes, it is.',   no: "No, it isn't."   },
  you:  { yes: 'Yes, you are.', no: "No, you aren't." },
  we:   { yes: 'Yes, we are.',  no: "No, we aren't."  },
  they: { yes: 'Yes, they are.', no: "No, they aren't." },
}

const ANSWER_GROUPS: AnswerGroup[] = ['I', 'he', 'she', 'it', 'you', 'we', 'they']

interface Ex3Q { question: string; group: AnswerGroup }

// `group` = the pronoun used in the SHORT ANSWER (not always the subject):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they
const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Is she eating breakfast now?',     group: 'she'  },
  { question: 'Are you cleaning your room?',      group: 'I'    },
  { question: 'Am I reading the book?',           group: 'you'  },
  { question: 'Is he playing football now?',      group: 'he'   },
  { question: 'Are they watching TV?',            group: 'they' },
  { question: 'Is it raining now?',               group: 'it'   },
  { question: 'Are we going to the park?',        group: 'we'   },
  { question: 'Is she singing a song?',           group: 'she'  },
  { question: 'Are they running now?',            group: 'they' },
  { question: 'Is he doing his homework?',        group: 'he'   },
]

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX3_QUESTIONS[current]
  const isLast = current === EX3_QUESTIONS.length - 1

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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QUESTIONS.length} השאלות!</p>
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
        <span>Question {current + 1} / {EX3_QUESTIONS.length}</span>
        <span className="text-sky-500">{current} ✓</span>
      </div>

      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-sky-700">{q.question}</p>
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PresentProgressiveYesNoPage() {
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
          <Link href="/step4/grammar/present-progressive" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Progressive</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Progressive — Yes/No Questions ❓</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">הווה מתמשך — שאלות כן / לא</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Am I going? · Is she eating? · Are we cleaning?</p>
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
          <ExWrapper cycles={1} render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex2' && (
          <ExWrapper cycles={EX2_CYCLES.length} render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex3' && <Ex3 />}
      </div>
    </div>
  )
}
