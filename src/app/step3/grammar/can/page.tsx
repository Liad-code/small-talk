'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

// ── Types & Data ──────────────────────────────────────────────────────────────

type CanVerb = 'can' | "can't"

interface CanQ {
  before: string
  after: string
  answer: CanVerb
}

const EX1_QUESTIONS: CanQ[] = [
  { before: 'Lions',     after: 'fly.',          answer: "can't" },
  { before: 'Snakes',    after: 'walk.',         answer: "can't" },
  { before: 'Cats',      after: 'climb the tree.', answer: 'can'  },
  { before: 'Birds',     after: 'fly.',          answer: 'can'   },
  { before: 'Fish',      after: 'swim.',         answer: 'can'   },
  { before: 'A baby',    after: 'ride a bike.',  answer: "can't" },
  { before: 'Dogs',      after: 'run fast.',     answer: 'can'   },
  { before: 'Cats',      after: 'climb trees.',  answer: 'can'   },
  { before: 'Elephants', after: 'jump high.',    answer: "can't" },
  { before: 'Monkeys',   after: 'climb trees.',  answer: 'can'   },
  { before: 'A turtle',  after: 'run fast.',     answer: "can't" },
  { before: 'I',         after: 'read a book.',  answer: 'can'   },
  { before: 'Penguins',  after: 'fly.',          answer: "can't" },
  { before: 'Frogs',     after: 'jump.',         answer: 'can'   },
  { before: 'A snake',   after: 'walk.',         answer: "can't" },
]

// ── Ex2 data (builder) ─────────────────────────────────────────────────────────

interface CanSubject {
  text: string
  verb: CanVerb
}

interface CanEx2Cycle {
  subjects: CanSubject[]
  phrases: string[]
}

const EX2_CYCLES: CanEx2Cycle[] = [
  {
    subjects: [
      { text: 'A fish',   verb: 'can'   },
      { text: 'A bird',   verb: 'can'   },
      { text: 'A dog',    verb: 'can'   },
      { text: 'A baby',   verb: "can't" },
      { text: 'A turtle', verb: "can't" },
    ],
    phrases: ['swim.', 'run.', 'jump.', 'fly high.', 'climb.'],
  },
  {
    subjects: [
      { text: 'I',          verb: 'can'   },
      { text: 'You',        verb: 'can'   },
      { text: 'A frog',     verb: 'can'   },
      { text: 'A snake',    verb: "can't" },
      { text: 'A penguin',  verb: "can't" },
    ],
    phrases: ['read a book.', 'drive a car.', 'jump high.', 'walk.', 'swim.'],
  },
]

// ── Ex3 data (form the can question) ────────────────────────────────────────────

interface CanEx3Cycle {
  subjects: string[]
  verbs: string[]
}

const EX3_CYCLES: CanEx3Cycle[] = [
  {
    subjects: ['you', 'he', 'she', 'they', 'a fish', 'a bird'],
    verbs: ['swim?', 'run?', 'fly?', 'read?', 'jump?', 'climb trees?'],
  },
  {
    subjects: ['we', 'it', 'I', 'a dog', 'a cat', 'penguins'],
    verbs: ['drive a car?', 'walk?', 'sing?', 'play tennis?', 'cook?', 'dance?'],
  },
]

// ── Ex4 data (pick the correct short answer) ────────────────────────────────────

type CanSubjPron = 'I' | 'you' | 'he' | 'she' | 'it' | 'we' | 'they'

interface CanEx4Q {
  question: string
  subject: CanSubjPron
}

const EX4_QUESTIONS: CanEx4Q[] = [
  { question: 'Can he swim?',            subject: 'he'   },
  { question: 'Can you read English?',   subject: 'I'    },
  { question: 'Can she dance?',          subject: 'she'  },
  { question: 'Can they run fast?',      subject: 'they' },
  { question: 'Can a fish fly?',         subject: 'it'   },
  { question: 'Can we play now?',        subject: 'we'   },
  { question: 'Can it climb the tree?',  subject: 'it'   },
  { question: 'Can your friends jump?',  subject: 'they' },
  { question: 'Can he ride a bike?',     subject: 'he'   },
  { question: 'Can you sing a song?',    subject: 'I'    },
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
          className="btn-kid bg-indigo-500"
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
      <div className="bg-indigo-50 border-4 border-indigo-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-indigo-700 text-center mb-2">
          Can 💪
        </h2>
        <p className="font-bold text-indigo-800 text-sm mb-4 text-center" dir="rtl">
          משתמשים ב- can כדי להגיד שמישהו יכול / מסוגל לעשות משהו
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-indigo-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">can</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">יכול / מסוגל</div>
            <div className="text-white/70 font-bold text-xs mt-1">can + verb</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-xl mb-1">can&apos;t</div>
            <div className="text-white/80 font-bold text-sm" dir="rtl">לא יכול / לא מסוגל</div>
            <div className="text-white/70 font-bold text-xs mt-1">can&apos;t + verb</div>
          </div>
        </div>

        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-3 mb-3">
          <p className="font-bold text-indigo-700 text-sm text-center">
            can not = <span className="font-black">can&apos;t</span>
          </p>
          <p className="font-bold text-gray-500 text-sm mt-1 text-center" dir="rtl">
            אחרי can / can&apos;t תמיד בא פועל בצורת הבסיס
          </p>
          <p className="font-bold text-indigo-600 text-sm mt-1 text-center" dir="rtl">
            משתמשים ב- can לזכר, נקבה, יחיד או רבים
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { verb: 'can' as CanVerb,   rest: 'read a book.', subj: 'I' },
            { verb: 'can' as CanVerb,   rest: 'run.',         subj: 'Cats' },
            { verb: "can't" as CanVerb, rest: 'fly.',         subj: 'Fish' },
            { verb: "can't" as CanVerb, rest: 'walk.',        subj: 'A snake' },
          ].map(({ verb, rest, subj }) => (
            <div key={`${subj}-${rest}`} className="flex items-center gap-1.5 bg-indigo-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-indigo-800 text-base">{subj}</span>
              <span className={`font-black text-base ${verb === 'can' ? 'text-indigo-600' : 'text-blue-600'}`}>{verb}</span>
              <span className="font-bold text-indigo-800 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-blue-700 text-center mb-1">
          Yes / No Questions ❓
        </h2>
        <p className="font-bold text-blue-700 text-sm mb-3 text-center" dir="rtl">
          כדי לשאול שאלת כן / לא, מתחילים את המשפט ב- Can
        </p>

        <div className="bg-blue-500 rounded-2xl p-3 text-center mb-4">
          <div className="font-display font-black text-white text-lg mb-1">Can + subject + verb?</div>
          <div className="text-white/80 font-bold text-sm" dir="rtl">משתמשים ב- Can לזכר, נקבה, יחיד או רבים</div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {[
            { stmt: 'He can swim.',   qVerb: 'Can', qRest: 'he swim?' },
            { stmt: 'They can run.',  qVerb: 'Can', qRest: 'they run?' },
          ].map(({ stmt, qVerb, qRest }) => (
            <div key={qRest} className="bg-white rounded-2xl border-2 border-blue-200 p-3">
              <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                <span className="font-bold text-gray-700 text-base">{stmt}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 flex-wrap">
                <span className="text-blue-400 font-black mr-1">→</span>
                <span className="font-display font-black text-base text-blue-600">{qVerb}</span>
                <span className="font-bold text-blue-700 text-base">{qRest}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-display font-black text-xl text-blue-700 mb-2" dir="rtl">תשובות קצרות</h3>
        <div className="flex flex-col gap-3">
          {[
            { q: 'Can he swim?',          yes: 'Yes, he can.', no: "No, he can't." },
            { q: 'Can you read English?', yes: 'Yes, I can.',  no: "No, I can't."  },
          ].map(({ q, yes, no }) => (
            <div key={q} className="bg-white rounded-2xl border-2 border-blue-200 p-3">
              <p className="font-bold text-blue-800 text-base mb-1.5 italic">{q}</p>
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

// ── Ex1 (choose can / can't) ─────────────────────────────────────────────────────

function Ex1() {
  const questions = EX1_QUESTIONS
  const [answers, setAnswers] = useState<Record<number, CanVerb>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: CanVerb) => {
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
      <div className="flex justify-end text-sm font-bold text-gray-400 mb-4">
        <span className="text-indigo-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על can או can&apos;t לפי המציאות</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl px-2 py-1.5 flex items-center gap-2 flex-wrap ${isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <span className="text-base font-bold text-gray-700 flex-1 min-w-0">
                {q.before}{' '}
                {ans ? (
                  <span className="text-green-600">{ans}</span>
                ) : (
                  <span className="bg-indigo-100 rounded px-2 py-0.5 text-indigo-400">___</span>
                )}
                {' '}{q.after}
              </span>
              {!ans && !isWrong ? (
                <div className="flex gap-1.5">
                  {(['can', "can't"] as CanVerb[]).map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        v === 'can'
                          ? 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
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
        </div>
      )}
    </div>
  )
}

// ── Ex2 (builder) ─────────────────────────────────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX2_CYCLES[cycleIdx]
  const [selSubject, setSelSubject] = useState<CanSubject | null>(null)
  const [selVerb, setSelVerb] = useState<CanVerb | null>(null)
  const [selPhrase, setSelPhrase] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  // Tiles stay PERMANENTLY available — never consumed.
  const allDone = sentences.length === cycle.subjects.length
  const availableSubjects = cycle.subjects
  const availablePhrases = cycle.phrases

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selPhrase) return
    // Build + check: the chosen can / can't must match the subject's reality.
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selSubject.text} ${selVerb} ${selPhrase}`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null)
    setSelVerb(null)
    setSelPhrase(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {EX2_CYCLES.length}</span>
        <span className="text-indigo-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 mb-3 text-sm font-bold text-indigo-700" dir="rtl">
        <p>1. יש ליצור 5 משפטים על מנת לסיים את הסבב.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* can / can't column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">can / can&apos;t</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(['can', "can't"] as CanVerb[]).map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-sm font-display font-black rounded-lg px-2 py-1 text-center transition-colors border-2 ${
                    selVerb === v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : v === 'can'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                      : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Phrase column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Phrase</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availablePhrases.map(p => (
                <button
                  key={p}
                  onClick={() => setSelPhrase(p)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${selPhrase === p ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selVerb && selPhrase && !allDone && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-indigo-700 text-base flex-1">
            {selSubject.text} {selVerb} {selPhrase}
          </span>
          <button onClick={handleAdd} className="btn-kid bg-indigo-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-indigo-100 border-2 border-indigo-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-indigo-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-indigo-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX2_CYCLES.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-indigo-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-indigo-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex3 (build the can question) ────────────────────────────────────────────────

function Ex3({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX3_CYCLES[cycleIdx]
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [questions, setQuestions] = useState<string[]>([])
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedVerbs, setUsedVerbs] = useState<Set<string>>(new Set())

  const allDone = questions.length === cycle.subjects.length
  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s))
  const availableVerbs = cycle.verbs.filter(v => !usedVerbs.has(v))

  const handleAdd = () => {
    if (!selSubject || !selVerb) return
    // Always "Can + subject + verb?" — every well-formed question is accepted
    const question = `Can ${selSubject} ${selVerb}`
    setQuestions(prev => [...prev, question])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject); return s })
    setUsedVerbs(prev => { const s = new Set(prev); s.add(selVerb); return s })
    setSelSubject(null)
    setSelVerb(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {EX3_CYCLES.length}</span>
        <span className="text-indigo-500">{questions.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 mb-3 text-sm font-bold text-indigo-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את הסבב.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת לבנות שאלה.</p>
        <p>3. כל שאלה מתחילה ב- Can ומסתיימת בסימן שאלה.</p>
        <p>4. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Can column (fixed) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Can</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              <div className="text-sm font-display font-black rounded-lg px-2 py-1 text-center bg-blue-600 text-white">
                Can
              </div>
            </div>
          </div>

          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject === s ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Verb</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableVerbs.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${selVerb === v ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selVerb && !allDone && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-indigo-700 text-base flex-1">
            Can {selSubject} {selVerb}
          </span>
          <button onClick={handleAdd} className="btn-kid bg-indigo-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {questions.map((s, i) => (
            <div key={i} className="bg-indigo-100 border-2 border-indigo-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-indigo-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-indigo-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great questions!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX3_CYCLES.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-indigo-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-indigo-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex4 (pick the correct short answer) ─────────────────────────────────────────

function Ex4() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX4_QUESTIONS[current]
  const isLast = current === EX4_QUESTIONS.length - 1

  // The short answer always repeats the question's subject: "Yes, he can." / "No, he can't."
  const yesAnswer = `Yes, ${q.subject} can.`
  const noAnswer = `No, ${q.subject} can't.`

  const handleClick = (side: 'yes' | 'no') => {
    if (flash) return
    // Both Yes and No are valid short answers for the subject — accept either
    const tileKey = side
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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX4_QUESTIONS.length} השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-indigo-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div key={key} className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX4_QUESTIONS.length}</span>
        <span className="text-indigo-500">{current} ✓</span>
      </div>

      <div className="bg-indigo-50 border-4 border-indigo-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הנכונה. לכל שאלה ניתן לבחור לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-indigo-700">{q.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="bg-green-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">YES ✓</span>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            <button
              onClick={() => handleClick('yes')}
              className={`text-base font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                flash === 'yes'
                  ? 'bg-green-500 text-white border-green-500 scale-105'
                  : 'bg-white text-green-700 border-green-200 hover:bg-green-100 active:scale-95'
              }`}
            >
              {yesAnswer}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="bg-rose-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">NO ✗</span>
          </div>
          <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            <button
              onClick={() => handleClick('no')}
              className={`text-base font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                flash === 'no'
                  ? 'bg-rose-500 text-white border-rose-500 scale-105'
                  : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-100 active:scale-95'
              }`}
            >
              {noAnswer}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CanPage() {
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

      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Can 💪</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">יכול / לא יכול</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I can swim · Fish can&apos;t fly</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={EX2_CYCLES.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3' && (
          <ExWrapper
            cycles={EX3_CYCLES.length}
            render={(c, again, done) => <Ex3 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex4' && <Ex4 />}
      </div>
    </div>
  )
}
