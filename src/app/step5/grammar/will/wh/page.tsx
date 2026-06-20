'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── WH words ────────────────────────────────────────────────────────────────────

const WH_WORDS: { word: string; hebrew: string; light: string; text: string }[] = [
  { word: 'Who',   hebrew: 'מי',   light: 'bg-rose-100 border-rose-300',     text: 'text-rose-700'   },
  { word: 'What',  hebrew: 'מה',   light: 'bg-sky-100 border-sky-300',       text: 'text-sky-700'    },
  { word: 'Where', hebrew: 'איפה', light: 'bg-emerald-100 border-emerald-300',text: 'text-emerald-700'},
  { word: 'When',  hebrew: 'מתי',  light: 'bg-violet-100 border-violet-300',  text: 'text-violet-700' },
  { word: 'Why',   hebrew: 'למה',  light: 'bg-amber-100 border-amber-300',    text: 'text-amber-700'  },
  { word: 'How',   hebrew: 'איך',  light: 'bg-teal-100 border-teal-300',      text: 'text-teal-700'   },
]

// ── Ex1 data ──────────────────────────────────────────────────────────────────

// Ex1: complete the correct question word. Each item shows a future "will"
// question with the Wh-word missing (blank at the start) plus a short answer/hint
// that uniquely points to the correct wh-word. After "will" the verb is BASE form.
interface Ex1Q {
  sentence: string   // the rest of the question after the blank
  hint: string       // the short answer that reveals the wh-word
  options: string[]
  answer: string
}

const WH_OPTIONS = ['Who', 'What', 'Where', 'When', 'Why', 'How']

const EX1_ROUNDS: Ex1Q[][] = [
  [
    { sentence: 'will you live next year?',         hint: '— In Tel Aviv.',          options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'will she eat for breakfast?',      hint: '— Eggs.',                 options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'will they go to school?',          hint: "— At 8 o'clock.",         options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'will he go to the park?',          hint: '— Because he is bored.',  options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'will you get to school?',          hint: '— By bus.',               options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'will help us tomorrow?',           hint: '— My grandma.',           options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'will you do after school?',        hint: '— I will play football.', options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'will the show start?',             hint: '— At seven.',             options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'will you feel sad?',               hint: '— Because it will rain.', options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'will they make the pizza?',        hint: '— In the kitchen.',       options: WH_OPTIONS, answer: 'Where' },
  ],
  [
    { sentence: 'will you eat lunch?',              hint: '— At noon.',              options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'will she go after school?',        hint: '— To the park.',          options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'will you read that book?',         hint: '— Because I like it.',    options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'will they play tomorrow?',         hint: '— Football.',             options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'will help you with the homework?', hint: '— My sister.',            options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'will you get to the party?',       hint: '— By bike.',              options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'will your mom work?',              hint: '— In an office.',         options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'will you wake up?',                hint: '— At seven.',             options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'will you want for your birthday?', hint: '— A new book.',           options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'will win the game?',               hint: '— Dana.',                 options: WH_OPTIONS, answer: 'Who'   },
  ],
]

// ── Ex2 data (wh-question builder) ───────────────────────────────────────────────

interface Ex2Cycle {
  whWords: string[]
  subjects: string[]
  verbs: string[]   // BASE form (after will the verb is base)
}

const EX2_CYCLES: Ex2Cycle[] = [
  {
    whWords: ['When', 'Where', 'What', 'Why', 'Who', 'How'],
    subjects: ['you', 'he', 'I', 'they', 'she', 'we'],
    verbs: ['eat', 'go', 'read', 'play', 'clean', 'watch'],
  },
]

// ── Ex3 data (think of an answer, reveal a sample) ──────────────────────────────

interface Ex3Q { question: string; answer: string }

const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Where will you live next year?',    answer: 'I will live in Tel Aviv.'  },
  { question: 'What will you eat for breakfast?',  answer: 'I will eat eggs.'          },
  { question: 'When will you go to school?',       answer: "At 8 o'clock."             },
  { question: 'Why will you like summer?',         answer: 'Because it will be warm.'  },
  { question: 'How will you get to school?',       answer: 'By bus.'                   },
  { question: 'Who will you play with?',           answer: 'With my friends.'          },
  { question: 'Where will your dad work?',         answer: 'At a hospital.'            },
  { question: 'What will your mom cook?',          answer: 'She will cook pasta.'      },
  { question: 'When will the movie start?',        answer: "At five o'clock."          },
  { question: 'How will he feel tomorrow?',        answer: 'He will feel happy.'       },
]

// ── ExWrapper ───────────────────────────────────────────────────────────────────

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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל הסבבים!</p>
        <button
          onClick={() => { setCycleIdx(0); setKey(k => k + 1); setFinished(false) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Again
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

// ── Learn ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-blue-700 text-center mb-1">
          WH Questions
        </h2>
        <p className="font-display font-black text-xl text-indigo-600 text-center mb-4" dir="rtl">
          שאלות Wh בעתיד
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-blue-800 mb-4" dir="rtl">
          <p>• המבנה לשאלה: מילת שאלה + will + נושא + פועל בצורת הבסיס</p>
          <div className="bg-white rounded-xl px-3 py-1.5 border-2 border-blue-100 my-1" dir="ltr">
            <span className="font-bold text-gray-700 text-base">When will we go?</span>
          </div>
          <p>• will מתאים לכל הנושאים (I / you / he / she / it / we / they)</p>
          <p>• אחרי will הפועל תמיד בצורת הבסיס</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {WH_WORDS.map(({ word, hebrew, light, text }) => (
            <div key={word} className={`${light} border-2 rounded-2xl px-4 py-2 flex items-center justify-between`}>
              <span className={`font-display font-black text-xl ${text}`}>{word}</span>
              <span className={`font-bold text-sm ${text} opacity-80`} dir="rtl">{hebrew}</span>
            </div>
          ))}
        </div>

        <p className="font-bold text-blue-800 text-sm mb-2 text-center" dir="rtl">
          הצורה זהה לכל הנושאים
        </p>
        <div className="flex flex-col gap-1.5">
          {['When will I go?', 'When will you go?', 'When will he go?', 'When will she go?', 'When will it go?', 'When will we go?', 'When will they go?'].map(s => (
            <div key={s} className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">{s}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: complete the correct question word ─────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = EX1_ROUNDS[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Record<number, string>>({})

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total
  const isLastRound = cycleIdx === EX1_ROUNDS.length - 1

  const choose = (idx: number, choice: string) => {
    if (answers[idx]) return
    if (choice === questions[idx].answer) {
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

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-blue-700 text-center mb-1">
          Choose the Question Word
        </h2>
        <p className="font-bold text-sm text-blue-600 text-center" dir="rtl">
          בחר את מילת השאלה הנכונה לפי התשובה בסוגריים
        </p>
      </div>

      <div className="flex justify-between text-sm font-bold text-blue-500 mb-3">
        <span>Round {cycleIdx + 1} / {EX1_ROUNDS.length}</span>
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {questions.map((q, idx) => {
          const chosen = answers[idx]
          const wc = chosen ? WH_WORDS.find(w => w.word === chosen) : null
          return (
            <div key={idx} className="bg-white border-2 border-blue-200 rounded-2xl px-3 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
                {chosen ? (
                  <span className={`font-display font-black text-base ${wc ? wc.text : 'text-blue-700'}`}>{chosen}</span>
                ) : (
                  <span className="text-blue-300 font-black text-base">___</span>
                )}
                <span className="font-bold text-gray-700 text-base">{q.sentence}</span>
                <span className="font-bold text-gray-400 text-sm">({q.hint})</span>
                {chosen && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
              </div>

              {!chosen && (
                <div className="flex gap-1.5 flex-wrap">
                  {q.options.map(opt => {
                    const oc = WH_WORDS.find(w => w.word === opt)
                    const isWrong = wrongs[idx] === opt
                    return (
                      <button
                        key={opt}
                        onClick={() => choose(idx, opt)}
                        className={`font-display font-black text-sm px-3 py-1 rounded-xl border-2 transition-colors active:scale-95 ${
                          isWrong
                            ? 'bg-red-500 text-white border-red-500'
                            : oc
                            ? `${oc.light} ${oc.text} hover:opacity-80`
                            : 'bg-gray-100 text-gray-600 border-gray-300'
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
          {isLastRound ? (
            <button onClick={onDone} className="btn-kid bg-blue-500">🔁 Again</button>
          ) : (
            <button onClick={onAgain} className="btn-kid bg-blue-500">סבב הבא →</button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Ex2: wh-question builder (Wh + will + subject + base verb) ────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX2_CYCLES[cycleIdx]
  const [selWh, setSelWh] = useState<string | null>(null)
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedVerbs, setUsedVerbs] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availWh = cycle.whWords
  const availSubjects = cycle.subjects.filter(s => !usedSubjects.has(s))
  const availVerbs = cycle.verbs.filter(v => !usedVerbs.has(v))

  const handleAdd = () => {
    if (!selWh || !selSubject || !selVerb) return
    const sentence = `${selWh} will ${selSubject} ${selVerb}?`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject); return s })
    setUsedVerbs(prev => { const s = new Set(prev); s.add(selVerb); return s })
    setSelWh(null)
    setSelSubject(null)
    setSelVerb(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Cycle {cycleIdx + 1} / {EX2_CYCLES.length}</span>
        <span className="text-blue-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-3 text-sm font-bold text-blue-700" dir="rtl">
        <p>1. יש ליצור {cycle.subjects.length} שאלות על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור שאלה.</p>
        <p>3. שימו לב: אחרי will הפועל בצורת הבסיס.</p>
        <p>4. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Wh-word (reusable) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Wh</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1 flex flex-col gap-1">
              {availWh.map((w, i) => (
                <button
                  key={`${w}-${i}`}
                  onClick={() => setSelWh(w)}
                  className={`text-xs font-display font-black rounded-lg px-1 py-1 text-center transition-colors ${selWh === w ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'}`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* will (fixed) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">will</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1 flex flex-col gap-1">
              <div className="text-xs font-display font-black rounded-lg px-1 py-1 text-center bg-indigo-600 text-white border-2 border-indigo-600">
                will
              </div>
              <p className="text-[10px] font-bold text-indigo-500 text-center mt-1" dir="rtl">לכל הגופים</p>
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1 flex flex-col gap-1">
              {availSubjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject === s ? 'bg-sky-500 text-white' : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Verb (base) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
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
        </div>
      )}

      {selWh && selSubject && selVerb && !allDone && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-blue-700 text-base flex-1">
            {selWh} will {selSubject} {selVerb}?
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
          <div className="flex gap-3 justify-center">
            <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex3: think of an answer, reveal a sample ────────────────────────────────────

function Ex3() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const toggle = (idx: number) => {
    setRevealed(prev => {
      const s = new Set(prev)
      if (s.has(idx)) s.delete(idx)
      else s.add(idx)
      return s
    })
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <p className="text-center font-bold text-blue-600 text-sm mb-4" dir="rtl">
        קרא את השאלה וחשוב על תשובה נכונה אפשרית. לחץ על ? כדי לראות תשובה נכונה אפשרית.
      </p>

      <div className="flex flex-col gap-3">
        {EX3_QUESTIONS.map((q, idx) => (
          <div key={idx} className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="flex-1 text-base font-bold text-gray-700">{q.question}</span>
              <button
                onClick={() => toggle(idx)}
                aria-label="Show answer"
                className={`flex-shrink-0 w-8 h-8 rounded-full font-display font-black text-base border-2 transition-colors active:scale-95 ${
                  revealed.has(idx)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-blue-100 font-bold text-blue-700 text-base">
                {q.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function WillWhPage() {
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

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/will" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Future: Will</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Future: Will — Wh Questions ❔</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות Wh בעתיד</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">When will we go? · What will you eat?</p>
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
          <ExWrapper cycles={EX1_ROUNDS.length} render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex2'   && (
          <ExWrapper cycles={EX2_CYCLES.length} render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
