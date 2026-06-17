'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5'

type WasWere = 'was' | 'were'
type WasntWerent = "wasn't" | "weren't"
type WasWereCap = 'Was' | 'Were'

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
          className="btn-kid bg-teal-500"
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
      <div className="bg-teal-50 border-4 border-teal-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-teal-700 text-center mb-1">
          To Be — Was / Were
        </h2>
        <p className="font-display font-black text-xl text-teal-600 text-center mb-2" dir="rtl">
          פועל היה — was / were
        </p>
        <p className="font-bold text-teal-800 text-sm text-center" dir="rtl">
          זהו זמן עבר של am / is / are
        </p>
      </div>

      {/* POSITIVE */}
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-emerald-700 text-center mb-1">✅ Positive</h3>
        <p className="font-bold text-emerald-800 text-sm text-center mb-4" dir="rtl">
          חיוב — מתי משתמשים ב-was ומתי ב-were
        </p>

        {/* was / were split */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-teal-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">was</div>
            <div className="text-white/80 font-bold text-sm">I, he, she, it</div>
          </div>
          <div className="bg-emerald-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">were</div>
            <div className="text-white/80 font-bold text-sm">you, we, they</div>
          </div>
        </div>

        {/* singular/plural example list */}
        <div className="flex flex-col gap-1.5 mb-4">
          {[
            { sub: 'I',    aux: 'was'  as WasWere, rest: 'late.' },
            { sub: 'He',   aux: 'was'  as WasWere, rest: 'late.' },
            { sub: 'She',  aux: 'was'  as WasWere, rest: 'late.' },
            { sub: 'It',   aux: 'was'  as WasWere, rest: 'late.' },
            { sub: 'You',  aux: 'were' as WasWere, rest: 'late.' },
            { sub: 'We',   aux: 'were' as WasWere, rest: 'late.' },
            { sub: 'They', aux: 'were' as WasWere, rest: 'late.' },
          ].map(({ sub, aux, rest }) => (
            <div key={sub} className="flex items-center gap-1.5 bg-emerald-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-emerald-700 text-base">{sub}</span>
              <span className="font-black text-base text-teal-600">{aux}</span>
              <span className="font-bold text-emerald-700 text-base">{rest}</span>
            </div>
          ))}
        </div>

        {/* time expressions chips */}
        <h4 className="font-display font-black text-emerald-700 text-base mb-2 text-center">⏪ Time words</h4>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">מילים שמראות שהפעולה קרתה בעבר</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['yesterday', 'last year', 'last Monday', 'a few days ago', 'a week ago', 'in 1990'].map(t => (
            <span key={t} className="bg-white border-2 border-emerald-200 rounded-full px-3 py-1 font-bold text-emerald-700 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* NEGATIVE */}
      <div className="bg-teal-50 border-4 border-teal-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-teal-700 text-center mb-1">❌ Negative</h3>
        <p className="font-bold text-teal-800 text-sm text-center mb-4" dir="rtl">
          שלילה — מוסיפים not אחרי was / were
        </p>

        {/* full → short */}
        <div className="flex flex-col gap-1.5 mb-4">
          {[
            { full: 'was not', short: "wasn't" },
            { full: 'were not', short: "weren't" },
          ].map(({ full, short }) => (
            <div key={full} className="flex items-center justify-between bg-teal-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-gray-500 text-base">{full}</span>
              <span className="text-teal-400 font-black">→</span>
              <span className="font-black text-teal-700 text-lg">{short}</span>
            </div>
          ))}
        </div>

        {/* examples */}
        <div className="flex flex-col gap-1.5">
          <div className="bg-teal-100 rounded-xl px-3 py-1.5 font-bold text-teal-700 text-base">I <span className="text-teal-900 underline">wasn&apos;t</span> at school yesterday.</div>
          <div className="bg-teal-100 rounded-xl px-3 py-1.5 font-bold text-teal-700 text-base">The girls <span className="text-teal-900 underline">weren&apos;t</span> at the mall last night.</div>
        </div>
      </div>

      {/* YES/NO QUESTIONS */}
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-emerald-700 text-center mb-1">❓ Yes / No Questions</h3>
        <p className="font-bold text-emerald-800 text-sm text-center mb-4" dir="rtl">
          שאלות — הופכים את הסדר: Was / Were בהתחלה
        </p>

        {/* inversion examples */}
        <div className="flex flex-col gap-1.5 mb-4">
          {[
            { q: 'Was I tired?' },
            { q: 'Was he late?' },
            { q: 'Was she happy?' },
            { q: 'Was it cold?' },
            { q: 'Were you ready?' },
            { q: 'Were we right?' },
            { q: 'Were they at home?' },
          ].map(({ q }) => (
            <div key={q} className="bg-emerald-100 rounded-xl px-3 py-1.5 font-bold text-emerald-700 text-base">{q}</div>
          ))}
        </div>

        {/* short answers */}
        <h4 className="font-display font-black text-emerald-700 text-base mb-2 text-center">💬 Short answers</h4>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between bg-white border-2 border-emerald-200 rounded-xl px-3 py-1.5">
            <span className="font-bold text-green-600 text-base">Yes, I was.</span>
            <span className="font-bold text-red-500 text-base">No, I wasn&apos;t.</span>
          </div>
          <div className="flex items-center justify-between bg-white border-2 border-emerald-200 rounded-xl px-3 py-1.5">
            <span className="font-bold text-green-600 text-base">Yes, they were.</span>
            <span className="font-bold text-red-500 text-base">No, they weren&apos;t.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── EX 1: choose was / were ─────────────────────────────────────────────────────

interface Ex1Q {
  before: string
  after: string
  answer: WasWere
}

const EX1_QUESTIONS: Ex1Q[] = [
  { before: 'I',          after: 'at home yesterday.',  answer: 'was'  },
  { before: 'They',       after: 'tired.',              answer: 'were' },
  { before: 'She',        after: 'happy.',              answer: 'was'  },
  { before: 'We',         after: 'at school.',          answer: 'were' },
  { before: 'He',         after: 'at the park.',        answer: 'was'  },
  { before: 'You',        after: 'late last Monday.',   answer: 'were' },
  { before: 'It',         after: 'cold last night.',    answer: 'was'  },
  { before: 'The boys',   after: 'in the garden.',      answer: 'were' },
  { before: 'My mother',  after: 'at work.',            answer: 'was'  },
  { before: 'We',         after: 'sick last week.',     answer: 'were' },
  { before: 'Dana',       after: 'at the mall.',        answer: 'was'  },
  { before: 'My friends', after: 'at the party.',       answer: 'were' },
]

const EX1_OPTS: WasWere[] = ['was', 'were']

function ChoiceWasWere({ questions, onDone }: { questions: Ex1Q[]; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, WasWere>>({})

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: WasWere) => {
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
        <h2 className="font-display font-black text-xl text-teal-700 text-center mb-1">
          Choose was / were
        </h2>
        <p className="font-bold text-sm text-teal-600 text-center" dir="rtl">
          לחצו על הצורה הנכונה לפי הנושא
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-teal-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answers[idx]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-teal-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-teal-600 bg-teal-100 rounded px-1">{q.answer}</span>
                ) : (
                  <span className="text-teal-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto">
                  {EX1_OPTS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100'
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
          <button onClick={onDone} className="btn-kid bg-teal-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 2: choose wasn't / weren't ───────────────────────────────────────────────

interface Ex2Q {
  before: string
  after: string
  answer: WasntWerent
}

const EX2_QUESTIONS: Ex2Q[] = [
  { before: 'He',         after: 'at the party.',       answer: "wasn't"  },
  { before: 'We',         after: 'ready.',              answer: "weren't" },
  { before: 'I',          after: 'at school yesterday.',answer: "wasn't"  },
  { before: 'They',       after: 'at home last night.', answer: "weren't" },
  { before: 'She',        after: 'happy.',              answer: "wasn't"  },
  { before: 'You',        after: 'late.',               answer: "weren't" },
  { before: 'It',         after: 'cold.',               answer: "wasn't"  },
  { before: 'The girls',  after: 'at the mall.',        answer: "weren't" },
  { before: 'My father',  after: 'tired.',              answer: "wasn't"  },
  { before: 'We',         after: 'sick last week.',     answer: "weren't" },
  { before: 'Dana',       after: 'in class.',           answer: "wasn't"  },
  { before: 'My friends', after: 'at the game.',        answer: "weren't" },
]

const EX2_OPTS: WasntWerent[] = ["wasn't", "weren't"]

function ChoiceWasntWerent({ questions, onDone }: { questions: Ex2Q[]; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, WasntWerent>>({})

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: WasntWerent) => {
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
        <h2 className="font-display font-black text-xl text-teal-700 text-center mb-1">
          Choose wasn&apos;t / weren&apos;t
        </h2>
        <p className="font-bold text-sm text-teal-600 text-center" dir="rtl">
          בחרו את צורת השלילה הנכונה לפי הנושא
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-teal-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answers[idx]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-teal-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-teal-600 bg-teal-100 rounded px-1">{q.answer}</span>
                ) : (
                  <span className="text-teal-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto">
                  {EX2_OPTS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100'
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
          <button onClick={onDone} className="btn-kid bg-teal-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 3: choose Was / Were (questions) ─────────────────────────────────────────

interface Ex3Q {
  after: string
  answer: WasWereCap
}

const EX3_QUESTIONS: Ex3Q[] = [
  { after: 'you tired?',          answer: 'Were' },
  { after: 'she late?',           answer: 'Was'  },
  { after: 'they at home?',       answer: 'Were' },
  { after: 'he at school?',       answer: 'Was'  },
  { after: 'it cold yesterday?',  answer: 'Was'  },
  { after: 'we right?',           answer: 'Were' },
  { after: 'I too loud?',         answer: 'Was'  },
  { after: 'the boys happy?',     answer: 'Were' },
  { after: 'your sister sick?',   answer: 'Was'  },
  { after: 'you at the party?',   answer: 'Were' },
  { after: 'the food good?',      answer: 'Was'  },
  { after: 'they at the mall?',   answer: 'Were' },
]

const EX3_OPTS: WasWereCap[] = ['Was', 'Were']

function ChoiceWasWereCap({ questions, onDone }: { questions: Ex3Q[]; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, WasWereCap>>({})

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: WasWereCap) => {
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
        <h2 className="font-display font-black text-xl text-teal-700 text-center mb-1">
          Choose Was / Were
        </h2>
        <p className="font-bold text-sm text-teal-600 text-center" dir="rtl">
          השלימו את תחילת השאלה — Was או Were
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-teal-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answers[idx]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-teal-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {isAnswered ? (
                  <span className="font-black text-teal-600 bg-teal-100 rounded px-1">{q.answer}</span>
                ) : (
                  <span className="text-teal-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto">
                  {EX3_OPTS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100'
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
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את כל השאלות!</p>
          <button onClick={onDone} className="btn-kid bg-teal-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 4: 4-part builder (Subject | was/were | rest | time) ─────────────────────

interface BuilderSubject {
  text: string
  form: WasWere
}

const EX4_SUBJECTS: BuilderSubject[] = [
  { text: 'I',    form: 'was'  },
  { text: 'He',   form: 'was'  },
  { text: 'She',  form: 'was'  },
  { text: 'It',   form: 'was'  },
  { text: 'We',   form: 'were' },
  { text: 'You',  form: 'were' },
  { text: 'They', form: 'were' },
]
const EX4_RESTS = ['hungry', 'at school', 'tired', 'happy', 'at home', 'busy']
const EX4_TIMES = ['yesterday', 'last week', 'a week ago']

function Ex4Builder({ onDone }: { onDone: () => void }) {
  const TARGET = 6
  const [selSubject, setSelSubject] = useState<BuilderSubject | null>(null)
  const [selForm, setSelForm] = useState<WasWere | null>(null)
  const [selRest, setSelRest] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const allDone = sentences.length === TARGET

  const handleAdd = () => {
    if (!selSubject || !selForm || !selRest || !selTime) return
    if (selSubject.form !== selForm) {
      setError('❌ Try a different form (was/were)!')
      return
    }
    const sentence = `${selSubject.text} ${selForm} ${selRest} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null); setSelForm(null); setSelRest(null); setSelTime(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-teal-500">{sentences.length} / {TARGET} ✓</span>
      </div>

      <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 mb-3 text-sm font-bold text-teal-700" dir="rtl">
        <p>1. יש ליצור {TARGET} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה ו-was/were לא מתאים לנושא, יופיע X אדום.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-teal-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-teal-50 border-2 border-teal-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_SUBJECTS.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-teal-500 text-white' : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* was / were */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">was/were</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1 flex flex-col gap-1">
              {(['was', 'were'] as WasWere[]).map(f => (
                <button
                  key={f}
                  onClick={() => setSelForm(f)}
                  className={`text-sm font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${selForm === f ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Rest */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-cyan-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">rest</span>
            </div>
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX4_RESTS.map(r => (
                <button
                  key={r}
                  onClick={() => setSelRest(r)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selRest === r ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-100'}`}
                >
                  {r}
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

      {selSubject && selForm && selRest && selTime && !allDone && (
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-teal-700 text-base flex-1">
            {selSubject.text} {selForm} {selRest} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-teal-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-teal-100 border-2 border-teal-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-teal-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-teal-800 text-base">{s}</span>
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <button onClick={onDone} className="btn-kid bg-teal-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 5: reading-passage drag-fill ─────────────────────────────────────────────

interface PassageSeg {
  type: 'text' | 'blank'
  text?: string
  blankIndex?: number
}

interface PassageBlank {
  index: number
  answer: string
}

const EX5_SEGMENTS: PassageSeg[] = [
  { type: 'text', text: 'Yesterday I ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text', text: ' at my grandma’s house. The weather ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text', text: ' sunny. My cousins ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text', text: ' there too. We ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text', text: ' very happy. The food ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text', text: ' delicious. It ' },
  { type: 'blank', blankIndex: 5 },
  { type: 'text', text: ' a wonderful day!' },
]

const EX5_BLANKS: PassageBlank[] = [
  { index: 0, answer: 'was'  },
  { index: 1, answer: 'was'  },
  { index: 2, answer: 'were' },
  { index: 3, answer: 'were' },
  { index: 4, answer: 'was'  },
  { index: 5, answer: 'was'  },
]

const EX5_WORD_BANK = ['was', 'were', 'was', 'were', 'was', 'were']

function Ex5Passage({ onDone }: { onDone: () => void }) {
  const [filled, setFilled] = useState<Record<number, string>>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [dragOverBlank, setDragOverBlank] = useState<number | null>(null)
  const [flashWrong, setFlashWrong] = useState<number | null>(null)
  const allFilled = EX5_BLANKS.every(b => filled[b.index] !== undefined)

  const tryPlace = (blankIdx: number, word: string) => {
    if (filled[blankIdx]) return
    const blank = EX5_BLANKS.find(b => b.index === blankIdx)
    if (!blank) return
    if (word.toLowerCase() === blank.answer.toLowerCase()) {
      setFilled(prev => ({ ...prev, [blankIdx]: blank.answer }))
    } else {
      setFlashWrong(blankIdx)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  const handleDrop = (e: React.DragEvent, blankIdx: number) => {
    e.preventDefault()
    setDragOverBlank(null)
    const word = e.dataTransfer.getData('text/plain') || draggedWord
    if (word) tryPlace(blankIdx, word)
    setDraggedWord(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Reading Passage</span>
        <span className="text-teal-500">{Object.keys(filled).length} / {EX5_BLANKS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור was או were מהבנק אל המקום הריק המתאים
      </p>

      <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {EX5_WORD_BANK.map((word, i) => (
            <div
              key={i}
              draggable
              onDragStart={e => { setDraggedWord(word); e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move' }}
              onDragEnd={() => { setDraggedWord(null); setDragOverBlank(null) }}
              className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                draggedWord === word
                  ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105'
                  : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-100'
              }`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-loose">
        {EX5_SEGMENTS.map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{seg.text}</span>
          }
          const blankIdx = seg.blankIndex!
          const val = filled[blankIdx]
          const isFlash = flashWrong === blankIdx
          const isOver = dragOverBlank === blankIdx
          return (
            <span
              key={i}
              data-drop-target="true"
              onDragOver={e => { if (!val) { e.preventDefault(); setDragOverBlank(blankIdx) } }}
              onDragLeave={() => setDragOverBlank(prev => prev === blankIdx ? null : prev)}
              onDrop={e => handleDrop(e, blankIdx)}
              className={`inline-block min-w-[5rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 text-center transition-all ${
                val
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : isFlash
                  ? 'bg-red-200 border-red-400 text-red-700 scale-95'
                  : isOver
                  ? 'bg-teal-100 border-teal-500 text-teal-500 scale-105'
                  : 'bg-teal-50 border-teal-300 text-teal-400'
              }`}
            >
              {val || `(${blankIdx + 1})`}
            </span>
          )
        })}
      </div>

      {allFilled && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Excellent work!</p>
          <button onClick={onDone} className="btn-kid bg-teal-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function WasWerePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
    { id: 'ex4',   label: 'Ex 4' },
    { id: 'ex5',   label: 'Ex 5' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Grammar
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Was / Were ⏪</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">פועל היה — was / were</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && <ExWrapper render={done => <ChoiceWasWere questions={EX1_QUESTIONS} onDone={done} />} />}
        {tab === 'ex2' && <ExWrapper render={done => <ChoiceWasntWerent questions={EX2_QUESTIONS} onDone={done} />} />}
        {tab === 'ex3' && <ExWrapper render={done => <ChoiceWasWereCap questions={EX3_QUESTIONS} onDone={done} />} />}
        {tab === 'ex4' && <ExWrapper render={done => <Ex4Builder onDone={done} />} />}
        {tab === 'ex5' && <ExWrapper render={done => <Ex5Passage onDone={done} />} />}
      </div>
    </div>
  )
}
