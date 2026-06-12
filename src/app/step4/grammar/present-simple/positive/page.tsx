'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5' | 'ex6' | 'ex7'

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
          className="btn-kid bg-emerald-500"
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
      {/* Section 1: Positive sentences */}
      <div className="bg-teal-50 border-4 border-teal-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-teal-700 text-center mb-2">
          Present Simple
        </h2>
        <p className="font-bold text-teal-800 text-sm text-center mb-4" dir="rtl">
          משתמשים ב-Present Simple כדי לדבר על דברים שאנחנו עושים באופן קבוע
        </p>

        <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-teal-100">
            <div className="font-display font-black text-teal-700 text-center py-1.5 text-sm border-r border-teal-200">Subject</div>
            <div className="font-display font-black text-teal-700 text-center py-1.5 text-sm">Verb</div>
          </div>
          <div className="grid grid-cols-2 border-t border-teal-100">
            <div className="text-center py-2 font-bold text-gray-700 text-sm border-r border-teal-100">I / You / We / They</div>
            <div className="text-center py-2 font-black text-teal-600 text-sm">verb<br /><span className="text-xs font-bold text-gray-500">I eat, You eat, We eat, They eat</span></div>
          </div>
          <div className="grid grid-cols-2 border-t border-teal-100 bg-emerald-50">
            <div className="text-center py-2 font-bold text-gray-700 text-sm border-r border-teal-100">He / She / It</div>
            <div className="text-center py-2 font-black text-emerald-600 text-sm">verb + s<br /><span className="text-xs font-bold text-gray-500">He eats, She eats, It eats</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="bg-teal-100 rounded-xl px-3 py-1.5 font-bold text-teal-700 text-base">I brush my teeth every morning.</div>
          <div className="bg-emerald-100 rounded-xl px-3 py-1.5 font-bold text-emerald-700 text-base">He cleans his room on Thursday.</div>
        </div>
      </div>

      {/* Section 2: Time expressions */}
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-emerald-700 text-center mb-2">
          Time Expressions ⏰
        </h3>
        <p className="font-bold text-emerald-800 text-sm text-center mb-4" dir="rtl">
          ביטויי זמן מראים שהפעולה קורית באופן קבוע
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {['every day', 'every week', 'every year', 'every morning', 'every night', 'every summer', 'on Sunday', 'on Tuesday'].map(t => (
            <span key={t} className="bg-white border-2 border-emerald-200 rounded-full px-3 py-1 font-bold text-emerald-700 text-sm">{t}</span>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="bg-emerald-100 rounded-xl px-3 py-1.5 font-bold text-emerald-700 text-base">Every week, I play the guitar.</div>
          <div className="bg-emerald-100 rounded-xl px-3 py-1.5 font-bold text-emerald-700 text-base">He watches TV every night.</div>
        </div>
      </div>

      {/* Section 3: Spelling rules */}
      <div className="bg-teal-50 border-4 border-teal-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-teal-700 text-center mb-2">
          Spelling Rules (he / she / it)
        </h3>
        <p className="font-bold text-teal-800 text-sm text-center mb-4" dir="rtl">
          איך מוסיפים את הסיומת לגוף שלישי יחיד
        </p>

        <div className="flex flex-col gap-3">
          <div className="bg-white border-2 border-teal-200 rounded-2xl p-3">
            <div className="font-display font-black text-teal-700 text-base mb-1">+ s</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">רוב הפעלים — מוסיפים s</p>
            <p className="font-bold text-teal-600 text-base mt-1">play → plays</p>
          </div>
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-3">
            <div className="font-display font-black text-emerald-700 text-base mb-1">+ es</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">מסתיים ב- ss, sh, ch, x, o — מוסיפים es</p>
            <p className="font-bold text-emerald-600 text-base mt-1">brush → brushes, watch → watches, go → goes</p>
          </div>
          <div className="bg-white border-2 border-teal-200 rounded-2xl p-3">
            <div className="font-display font-black text-teal-700 text-base mb-1">y → ies</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">עיצור + y — מורידים y ומוסיפים ies</p>
            <p className="font-bold text-teal-600 text-base mt-1">cry → cries, study → studies</p>
          </div>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3">
            <div className="font-display font-black text-amber-700 text-base mb-1">irregular ⚠️</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">יוצא דופן</p>
            <p className="font-bold text-amber-600 text-base mt-1">have → has</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── EX 1 & EX 5: choose the correct form ───────────────────────────────────────

interface ChoiceQ {
  before: string // text before blank (includes subject)
  after: string  // text after blank (includes time expression + punctuation)
  base: string   // base form
  third: string  // he/she/it form
  answer: 'base' | 'third'
}

const EX1_QUESTIONS: ChoiceQ[] = [
  { before: 'I',          after: 'with my dog every day.',     base: 'walk',  third: 'walks',  answer: 'base'  },
  { before: 'Gil',        after: 'football every week.',       base: 'play',  third: 'plays',  answer: 'third' },
  { before: 'We',         after: 'milk every morning.',        base: 'drink', third: 'drinks', answer: 'base'  },
  { before: 'She',        after: 'a letter every week.',       base: 'write', third: 'writes', answer: 'third' },
  { before: 'They',       after: 'English every day.',         base: 'learn', third: 'learns', answer: 'base'  },
  { before: 'My brother', after: 'his room every Sunday.',     base: 'clean', third: 'cleans', answer: 'third' },
  { before: 'You',        after: 'breakfast every morning.',   base: 'eat',   third: 'eats',   answer: 'base'  },
  { before: 'The boy',    after: 'his bike every day.',        base: 'ride',  third: 'rides',  answer: 'third' },
  { before: 'I',          after: 'eight hours every night.',   base: 'sleep', third: 'sleeps', answer: 'base'  },
  { before: 'Dana',       after: 'her friend every week.',     base: 'meet',  third: 'meets',  answer: 'third' },
  { before: 'My parents', after: 'tea every morning.',         base: 'drink', third: 'drinks', answer: 'base'  },
  { before: 'He',         after: 'a book every night.',        base: 'read',  third: 'reads',  answer: 'third', }, // read needs only +s
  { before: 'We',         after: 'to school every day.',       base: 'walk',  third: 'walks',  answer: 'base'  },
  { before: 'The girl',   after: 'her teeth every morning.',   base: 'clean', third: 'cleans', answer: 'third' },
  { before: 'You',        after: 'football every Tuesday.',    base: 'play',  third: 'plays',  answer: 'base'  },
]

const EX5_QUESTIONS: ChoiceQ[] = [
  { before: 'She',        after: 'her hair every morning.',     base: 'brush', third: 'brushes', answer: 'third' },
  { before: 'I',          after: 'a book every night.',         base: 'read',  third: 'reads',   answer: 'base'  },
  { before: 'The baby',   after: 'every night.',                base: 'cry',   third: 'cries',   answer: 'third' },
  { before: 'We',         after: 'our grandma every week.',     base: 'visit', third: 'visits',  answer: 'base'  },
  { before: 'He',         after: 'English every day.',          base: 'study', third: 'studies', answer: 'third' },
  { before: 'They',       after: 'TV every night.',             base: 'watch', third: 'watches', answer: 'base'  },
  { before: 'My sister',  after: 'a letter every week.',        base: 'write', third: 'writes',  answer: 'third' },
  { before: 'You',        after: 'your friends every day.',     base: 'see',   third: 'sees',    answer: 'base'  },
  { before: 'Gil',        after: 'a cake every Sunday.',        base: 'make',  third: 'makes',   answer: 'third' },
  { before: 'I',          after: 'to school every morning.',    base: 'go',    third: 'goes',    answer: 'base'  },
  { before: 'The bird',   after: 'every summer.',               base: 'fly',   third: 'flies',   answer: 'third' },
  { before: 'We',         after: 'our room every Sunday.',      base: 'study', third: 'studies', answer: 'base'  },
  { before: 'She',        after: 'a movie every week.',         base: 'watch', third: 'watches', answer: 'third' },
  { before: 'They',       after: 'their teeth every morning.',  base: 'brush', third: 'brushes', answer: 'base'  },
  { before: 'Dana',       after: 'her homework every day.',     base: 'make',  third: 'makes',   answer: 'third' },
  { before: 'You',        after: 'a story every night.',        base: 'read',  third: 'reads',   answer: 'base'  },
  { before: 'He',         after: 'to the park every day.',      base: 'go',    third: 'goes',    answer: 'third' },
  { before: 'My friends', after: 'a picture every week.',       base: 'see',   third: 'sees',    answer: 'base'  },
  { before: 'The boy',    after: 'when he is sad every day.',   base: 'cry',   third: 'cries',   answer: 'third' },
  { before: 'I',          after: 'my house every Sunday.',      base: 'visit', third: 'visits',  answer: 'base'  },
]

function ChoiceExercise({ questions, onDone }: { questions: ChoiceQ[]; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, 'base' | 'third'>>({})
  const [order] = useState<boolean[]>(() => questions.map(() => Math.random() < 0.5))

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, val: 'base' | 'third') => {
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
          Choose the correct form
        </h2>
        <p className="font-bold text-sm text-teal-600 text-center" dir="rtl">
          לחצו על צורת הפועל הנכונה לפי הנושא
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-teal-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answers[idx]
          const correctWord = q.answer === 'base' ? q.base : q.third
          const opts: ('base' | 'third')[] = order[idx] ? ['base', 'third'] : ['third', 'base']
          return (
            <div
              key={idx}
              className="bg-white border-2 border-teal-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-teal-600 bg-teal-100 rounded px-1">{correctWord}</span>
                ) : (
                  <span className="text-teal-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto">
                  {opts.map(optKey => {
                    const optWord = optKey === 'base' ? q.base : q.third
                    return (
                      <button
                        key={optKey}
                        onClick={() => choose(idx, optKey)}
                        className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                          wrong[idx] === optKey
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100'
                        }`}
                      >
                        {optWord}
                      </button>
                    )
                  })}
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
          <button onClick={onDone} className="btn-kid bg-emerald-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 2 & EX 6: 3-part builder (Subject | Verb | Time) ─────────────────────────

interface BuilderSubject {
  text: string
  third: boolean // true => needs +s/es/ies form (3rd person singular)
}

interface BuilderVerb {
  base: string
  third: string
}

interface BuilderConfig {
  subjects: BuilderSubject[]
  verbs: BuilderVerb[]
  times: string[]
  goal: number
}

const EX2_CONFIG: BuilderConfig = {
  subjects: [
    { text: 'she',        third: true  },
    { text: 'you',        third: false },
    { text: 'the boy',    third: true  },
    { text: 'my parents', third: false },
    { text: 'I',          third: false },
    { text: 'he',         third: true  },
  ],
  verbs: [
    { base: 'write', third: 'writes' },
    { base: 'drink', third: 'drinks' },
    { base: 'learn', third: 'learns' },
  ],
  times: ['every day', 'every week'],
  goal: 6,
}

const EX6_CONFIG: BuilderConfig = {
  subjects: [
    { text: 'she',        third: true  },
    { text: 'you',        third: false },
    { text: 'the girl',   third: true  },
    { text: 'my friends', third: false },
    { text: 'I',          third: false },
    { text: 'he',         third: true  },
  ],
  verbs: [
    { base: 'study', third: 'studies' },
    { base: 'watch', third: 'watches' },
    { base: 'go',    third: 'goes'    },
    { base: 'cry',   third: 'cries'   },
  ],
  times: ['every day', 'every week'],
  goal: 6,
}

function BuilderExercise({ config, onDone }: { config: BuilderConfig; onDone: () => void }) {
  const [selSubject, setSelSubject] = useState<BuilderSubject | null>(null)
  const [selVerb, setSelVerb] = useState<{ verb: BuilderVerb; form: 'base' | 'third' } | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const allDone = sentences.length >= config.goal

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selTime) return
    const subjectNeedsThird = selSubject.third
    const chosenIsThird = selVerb.form === 'third'
    if (subjectNeedsThird !== chosenIsThird) {
      setError('❌ The verb does not agree with the subject! Try again.')
      return
    }
    const verbWord = selVerb.form === 'third' ? selVerb.verb.third : selVerb.verb.base
    const sentence = `${selSubject.text} ${verbWord} ${selTime}.`
    const capitalized = sentence.charAt(0).toUpperCase() + sentence.slice(1)
    setSentences(prev => [...prev, capitalized])
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
    setError('')
  }

  const previewVerb = selVerb ? (selVerb.form === 'third' ? selVerb.verb.third : selVerb.verb.base) : null

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-teal-500">{sentences.length} / {config.goal} ✓</span>
      </div>

      <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 mb-3 text-sm font-bold text-teal-700" dir="rtl">
        <p>1. יש ליצור {config.goal} משפטים על מנת לסיים.</p>
        <p>2. לחץ על מילה אחת מכל עמודה כדי לבנות משפט.</p>
        <p>3. בחר את צורת הפועל שמתאימה לנושא, ואז לחץ Add.</p>
        <p>4. אם הצורה לא נכונה — יופיע X אדום. תקן ולחץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-teal-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-teal-50 border-2 border-teal-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {config.subjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${
                    selSubject?.text === s.text
                      ? 'bg-teal-500 text-white'
                      : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-100'
                  }`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Verb</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {config.verbs.map(v => (
                <div key={v.base} className="flex gap-1">
                  {(['base', 'third'] as const).map(form => {
                    const word = form === 'third' ? v.third : v.base
                    const isSel = selVerb?.verb.base === v.base && selVerb?.form === form
                    return (
                      <button
                        key={form}
                        onClick={() => setSelVerb({ verb: v, form })}
                        className={`flex-1 text-xs font-display font-bold rounded-lg px-1 py-1 text-center transition-colors border-2 ${
                          isSel
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        {word}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Time column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Time</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {config.times.map(t => (
                <button
                  key={t}
                  onClick={() => setSelTime(t)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${
                    selTime === t
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selVerb && selTime && !allDone && (
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-teal-700 text-base flex-1">
            {selSubject.text} {previewVerb} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-teal-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-teal-100 border-2 border-teal-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-teal-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-teal-800 text-base">{s}</span>
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great sentences!</p>
          <button onClick={onDone} className="btn-kid bg-emerald-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 3 & EX 7: reading-passage fill ──────────────────────────────────────────

interface PassageSegment {
  type: 'text' | 'blank'
  text?: string
  blankIndex?: number
}

interface PassageBlank {
  index: number
  answer: string
}

interface PassageConfig {
  segments: PassageSegment[]
  blanks: PassageBlank[]
  bank: string[]
}

// EX3: only +s verbs (take, eat, play)
const EX3_CONFIG: PassageConfig = {
  segments: [
    { type: 'text', text: 'My name is Dan. Every morning, I ' },
    { type: 'blank', blankIndex: 0 },
    { type: 'text', text: ' a shower. My mom ' },
    { type: 'blank', blankIndex: 1 },
    { type: 'text', text: ' breakfast with us. My little brother ' },
    { type: 'blank', blankIndex: 2 },
    { type: 'text', text: ' a banana every day. After school, my friends and I ' },
    { type: 'blank', blankIndex: 3 },
    { type: 'text', text: ' football in the park. My sister ' },
    { type: 'blank', blankIndex: 4 },
    { type: 'text', text: ' the bus home, and we all ' },
    { type: 'blank', blankIndex: 5 },
    { type: 'text', text: ' dinner together at night.' },
  ],
  blanks: [
    { index: 0, answer: 'take' },   // I take
    { index: 1, answer: 'eats' },   // My mom eats
    { index: 2, answer: 'eats' },   // My little brother eats
    { index: 3, answer: 'play' },   // my friends and I play
    { index: 4, answer: 'takes' },  // My sister takes
    { index: 5, answer: 'eat' },    // we all eat
  ],
  bank: ['take', 'takes', 'eat', 'eats', 'play', 'plays'],
}

// EX7: all spelling rules (study/studies, go/goes, watch/watches, cry/cries, play/plays)
const EX7_CONFIG: PassageConfig = {
  segments: [
    { type: 'text', text: 'Maya is a busy girl. Every day, she ' },
    { type: 'blank', blankIndex: 0 },
    { type: 'text', text: ' to school by bus. Her teacher ' },
    { type: 'blank', blankIndex: 1 },
    { type: 'text', text: ' a funny movie every week. After school, Maya and her friends ' },
    { type: 'blank', blankIndex: 2 },
    { type: 'text', text: ' in the garden. At home, she ' },
    { type: 'blank', blankIndex: 3 },
    { type: 'text', text: ' English every night. Her baby brother ' },
    { type: 'blank', blankIndex: 4 },
    { type: 'text', text: ' when he is hungry. On Sunday, my friends and I ' },
    { type: 'blank', blankIndex: 5 },
    { type: 'text', text: ' to the park together.' },
  ],
  blanks: [
    { index: 0, answer: 'goes' },     // she goes
    { index: 1, answer: 'watches' },  // Her teacher watches
    { index: 2, answer: 'play' },     // Maya and her friends play
    { index: 3, answer: 'studies' },  // she studies
    { index: 4, answer: 'cries' },    // Her baby brother cries
    { index: 5, answer: 'go' },       // my friends and I go
  ],
  bank: ['go', 'goes', 'watch', 'watches', 'play', 'plays', 'study', 'studies', 'cry', 'cries'],
}

function PassageExercise({ config, onDone }: { config: PassageConfig; onDone: () => void }) {
  const [filled, setFilled] = useState<Record<number, string>>({})
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [flashWrong, setFlashWrong] = useState<number | null>(null)
  const allFilled = config.blanks.every(b => filled[b.index] !== undefined)

  const handleWordClick = (word: string) => {
    setSelectedWord(prev => prev === word ? null : word)
  }

  const handleBlankClick = (blankIdx: number) => {
    if (filled[blankIdx]) return
    if (selectedWord === null) return
    const blank = config.blanks.find(b => b.index === blankIdx)
    if (!blank) return
    if (selectedWord.toLowerCase() === blank.answer.toLowerCase()) {
      setFilled(prev => ({ ...prev, [blankIdx]: blank.answer }))
      setSelectedWord(null)
    } else {
      setFlashWrong(blankIdx)
      setTimeout(() => setFlashWrong(null), 800)
      setSelectedWord(null)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Reading Passage</span>
        <span className="text-teal-500">{Object.keys(filled).length} / {config.blanks.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        בחר מילה מהבנק ואז לחץ על המקום הריק המתאים
      </p>

      {/* Word bank */}
      <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {config.bank.map(word => (
            <button
              key={word}
              onClick={() => handleWordClick(word)}
              className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all ${
                selectedWord === word
                  ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105'
                  : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-100 active:scale-95'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
        {selectedWord && (
          <p className="text-center text-xs font-bold text-teal-600 mt-2" dir="rtl">
            בחרת: <span className="font-black">{selectedWord}</span> — עכשיו לחץ על המקום הריק הנכון
          </p>
        )}
      </div>

      {/* Passage */}
      <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-relaxed">
        {config.segments.map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{seg.text}</span>
          }
          const blankIdx = seg.blankIndex!
          const val = filled[blankIdx]
          const isFlash = flashWrong === blankIdx
          return (
            <button
              key={i}
              onClick={() => handleBlankClick(blankIdx)}
              className={`inline-block min-w-[3.5rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 transition-all ${
                val
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : isFlash
                  ? 'bg-red-200 border-red-400 text-red-700 scale-95'
                  : selectedWord !== null
                  ? 'bg-teal-50 border-teal-400 text-teal-400 hover:bg-teal-100 cursor-pointer'
                  : 'bg-teal-50 border-teal-300 text-teal-400 hover:bg-teal-100'
              }`}
            >
              {val || `(${blankIdx + 1})`}
            </button>
          )
        })}
      </div>

      {allFilled && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Excellent reading!</p>
          <button onClick={onDone} className="btn-kid bg-emerald-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── EX 4: SORT by spelling rule ────────────────────────────────────────────────

interface SortVerb {
  base: string
  third: string
  category: '-s' | '-es' | '-ies'
}

const EX4_ITEMS: SortVerb[] = [
  { base: 'sing',   third: 'sings',    category: '-s'   },
  { base: 'go',     third: 'goes',     category: '-es'  },
  { base: 'try',    third: 'tries',    category: '-ies' },
  { base: 'brush',  third: 'brushes',  category: '-es'  },
  { base: 'ride',   third: 'rides',    category: '-s'   },
  { base: 'wash',   third: 'washes',   category: '-es'  },
  { base: 'cry',    third: 'cries',    category: '-ies' },
  { base: 'eat',    third: 'eats',     category: '-s'   },
  { base: 'study',  third: 'studies',  category: '-ies' },
  { base: 'listen', third: 'listens',  category: '-s'   },
  { base: 'watch',  third: 'watches',  category: '-es'  },
  { base: 'fly',    third: 'flies',    category: '-ies' },
]

function SortExercise({ onDone }: { onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<SortVerb | null>(null)
  const [placed, setPlaced] = useState<Record<string, SortVerb[]>>({ '-s': [], '-es': [], '-ies': [] })
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [usedBases, setUsedBases] = useState<Set<string>>(new Set())

  const remaining = EX4_ITEMS.filter(v => !usedBases.has(v.base))
  const allDone = usedBases.size === EX4_ITEMS.length

  const handleWordClick = (item: SortVerb) => {
    if (usedBases.has(item.base)) return
    setSelectedWord(prev => prev?.base === item.base ? null : item)
  }

  const handleCategoryClick = (cat: '-s' | '-es' | '-ies') => {
    if (!selectedWord) return
    if (selectedWord.category === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], selectedWord] }))
      setUsedBases(prev => { const s = new Set(prev); s.add(selectedWord.base); return s })
      setSelectedWord(null)
    } else {
      setFlashWrong(cat)
      setTimeout(() => { setFlashWrong(null); setSelectedWord(null) }, 800)
    }
  }

  const CATS: { id: '-s' | '-es' | '-ies'; label: string; color: string }[] = [
    { id: '-s',   label: '–s',   color: 'border-teal-400 bg-teal-50'        },
    { id: '-es',  label: '–es',  color: 'border-emerald-400 bg-emerald-50'  },
    { id: '-ies', label: '–ies', color: 'border-green-400 bg-green-50'      },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort by spelling</span>
        <span className="text-teal-500">{usedBases.size} / {EX4_ITEMS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחץ על פועל ואז על הקטגוריה הנכונה</p>
      {selectedWord ? (
        <p className="text-center font-bold text-teal-500 text-sm mb-3">
          Selected: <span className="font-black">{selectedWord.base}</span> — now click a category
        </p>
      ) : <div className="mb-3" />}

      {/* Word bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(item => (
          <button
            key={item.base}
            onClick={() => handleWordClick(item)}
            className={`px-4 py-2 rounded-xl font-display font-black text-base border-2 transition-all ${
              selectedWord?.base === item.base
                ? 'bg-teal-500 text-white border-teal-500 scale-105'
                : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50 active:scale-95'
            }`}
          >
            {item.base}
          </button>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category boxes */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[120px] cursor-pointer transition-all ${
                isFlash ? 'border-red-400 bg-red-50' : cat.color
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-teal-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-lg text-teal-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.base} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-teal-600 text-sm border border-teal-200">
                    {item.third}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">All sorted correctly!</p>
          <button onClick={onDone} className="btn-kid bg-emerald-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function PresentSimplePositivePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
    { id: 'ex4',   label: 'Ex 4' },
    { id: 'ex5',   label: 'Ex 5' },
    { id: 'ex6',   label: 'Ex 6' },
    { id: 'ex7',   label: 'Ex 7' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar/present-simple" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Present Simple
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Positive ✅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">הווה פשוט — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I eat · He eats</p>
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
        {tab === 'ex1' && <ExWrapper render={done => <ChoiceExercise questions={EX1_QUESTIONS} onDone={done} />} />}
        {tab === 'ex2' && <ExWrapper render={done => <BuilderExercise config={EX2_CONFIG} onDone={done} />} />}
        {tab === 'ex3' && <ExWrapper render={done => <PassageExercise config={EX3_CONFIG} onDone={done} />} />}
        {tab === 'ex4' && <ExWrapper render={done => <SortExercise onDone={done} />} />}
        {tab === 'ex5' && <ExWrapper render={done => <ChoiceExercise questions={EX5_QUESTIONS} onDone={done} />} />}
        {tab === 'ex6' && <ExWrapper render={done => <BuilderExercise config={EX6_CONFIG} onDone={done} />} />}
        {tab === 'ex7' && <ExWrapper render={done => <PassageExercise config={EX7_CONFIG} onDone={done} />} />}
      </div>
    </div>
  )
}
