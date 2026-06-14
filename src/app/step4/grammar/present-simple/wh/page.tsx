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

// Ex1: complete the correct question word. Each item shows a present-simple
// question with the Wh-word missing (blank at the start) plus a short answer/hint
// that uniquely points to the correct wh-word.
interface Ex1Q {
  sentence: string   // the rest of the question after the blank
  hint: string       // the short answer that reveals the wh-word
  options: string[]
  answer: string
}

const WH_OPTIONS = ['Who', 'What', 'Where', 'When', 'Why', 'How']

const EX1_ROUNDS: Ex1Q[][] = [
  [
    { sentence: 'do you live?',                  hint: '— In Tel Aviv.',        options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'does she eat for breakfast?',   hint: '— Eggs.',               options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'do they go to school?',         hint: "— At 8 o'clock.",       options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'does he go to the park?',       hint: '— Because he likes it.',options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'do you go to school?',          hint: '— By bus.',             options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'lives in this house?',          hint: '— My grandma.',         options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'do you do after school?',       hint: '— I play football.',    options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'does the show start?',          hint: '— At seven.',           options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'do you feel sad?',              hint: '— Because it is raining.', options: WH_OPTIONS, answer: 'Why' },
    { sentence: 'do they make pizza?',           hint: '— In the kitchen.',     options: WH_OPTIONS, answer: 'Where' },
  ],
  [
    { sentence: 'do you eat lunch?',             hint: '— At noon.',            options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'does she go after school?',     hint: '— To the park.',        options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'do you read books?',            hint: '— Because I like stories.', options: WH_OPTIONS, answer: 'Why' },
    { sentence: 'do they play?',                 hint: '— Football.',           options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'helps you with homework?',      hint: '— My sister.',          options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'do you get to school?',         hint: '— By bike.',            options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'does your mom work?',           hint: '— In an office.',       options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'do you wake up?',               hint: '— At seven.',           options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'do you want?',                  hint: '— A new book.',         options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'is your best friend?',          hint: '— Dana.',               options: WH_OPTIONS, answer: 'Who'   },
  ],
]

// ── Ex2 data (pick correct short answer) ────────────────────────────────────────

type Group = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it'

const ANSWER_BANK: Record<Group, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I do.',    no: "No, I don't."    },
  you:  { yes: 'Yes, you do.',  no: "No, you don't."  },
  we:   { yes: 'Yes, we do.',   no: "No, we don't."   },
  they: { yes: 'Yes, they do.', no: "No, they don't." },
  he:   { yes: 'Yes, he does.', no: "No, he doesn't." },
  she:  { yes: 'Yes, she does.',no: "No, she doesn't."},
  it:   { yes: 'Yes, it does.', no: "No, it doesn't." },
}

const GROUPS: Group[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it']

interface Ex2Q {
  question: string
  group: Group
}

// `group` = the pronoun used in the SHORT ANSWER (not the subject of the question):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they, plural noun→they, singular noun→he/she/it
const EX2_QUESTIONS: Ex2Q[] = [
  { question: 'Do you like apples?',         group: 'I'    },
  { question: 'Does he play tennis?',        group: 'he'   },
  { question: 'Do they walk to school?',     group: 'they' },
  { question: 'Does she read every day?',    group: 'she'  },
  { question: 'Do we eat lunch at noon?',    group: 'we'   },
  { question: 'Does it rain in winter?',     group: 'it'   },
  { question: 'Do I sing well?',             group: 'you'  },
  { question: 'Does the cat like milk?',     group: 'it'   },
  { question: 'Do the boys play outside?',   group: 'they' },
  { question: 'Does your mom cook fish?',    group: 'she'  },
]

// ── Ex3 data (think of an answer, reveal a sample) ──────────────────────────────

interface Ex3Q { question: string; answer: string }

const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Where do you live?',            answer: 'I live in Tel Aviv.'   },
  { question: 'What do you eat for breakfast?',answer: 'I eat eggs.'           },
  { question: 'When do you go to school?',     answer: "At 8 o'clock."         },
  { question: 'Why do you like summer?',       answer: 'Because it is warm.'   },
  { question: 'How do you go to school?',      answer: 'By bus.'               },
  { question: 'Who do you play with?',         answer: 'With my friends.'      },
  { question: 'Where does your dad work?',     answer: 'At a hospital.'        },
  { question: 'What does your mom cook?',      answer: 'She cooks pasta.'      },
  { question: 'When does the movie start?',    answer: 'At five o\'clock.'     },
  { question: 'How does he feel today?',       answer: 'He feels happy.'       },
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
          className="btn-kid bg-amber-500"
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
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-amber-700 text-center mb-1">
          WH Questions
        </h2>
        <p className="font-bold text-amber-700 text-sm text-center mb-4" dir="rtl">
          שאלות Wh בהווה פשוט
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-amber-800 mb-4" dir="rtl">
          <p>• המבנה לשאלה: מילת שאלה + do / does + נושא + פועל</p>
          <div className="bg-white rounded-xl px-3 py-1.5 border-2 border-amber-100 my-1" dir="ltr">
            <span className="font-bold text-gray-700 text-base">Where do you live?</span>
          </div>
          <p>• נשתמש ב- do עם I, you, we, they</p>
          <p>• נשתמש ב- does עם he, she, it</p>
          <p>• לא מוסיפים s לפועל בשאלה</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {WH_WORDS.map(({ word, hebrew, light, text }) => (
            <div key={word} className={`${light} border-2 rounded-2xl px-4 py-2 flex items-center justify-between`}>
              <span className={`font-display font-black text-xl ${text}`}>{word}</span>
              <span className={`font-bold text-sm ${text} opacity-80`} dir="rtl">{hebrew}</span>
            </div>
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
        <h2 className="font-display font-black text-xl text-amber-700 text-center mb-1">
          Choose the Question Word
        </h2>
        <p className="font-bold text-sm text-amber-600 text-center" dir="rtl">
          בחר את מילת השאלה הנכונה לפי התשובה בסוגריים
        </p>
      </div>

      <div className="flex justify-between text-sm font-bold text-amber-500 mb-3">
        <span>Round {cycleIdx + 1} / {EX1_ROUNDS.length}</span>
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {questions.map((q, idx) => {
          const chosen = answers[idx]
          const wc = chosen ? WH_WORDS.find(w => w.word === chosen) : null
          return (
            <div key={idx} className="bg-white border-2 border-amber-200 rounded-2xl px-3 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
                {chosen ? (
                  <span className={`font-display font-black text-base ${wc ? wc.text : 'text-amber-700'}`}>{chosen}</span>
                ) : (
                  <span className="text-amber-300 font-black text-base">___</span>
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
            <button onClick={onDone} className="btn-kid bg-amber-500">🔁 Again</button>
          ) : (
            <button onClick={onAgain} className="btn-kid bg-amber-500">סבב הבא →</button>
          )}
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
          className="btn-kid bg-amber-500"
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
        <span className="text-amber-500">{current} ✓</span>
      </div>

      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הקצרה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-amber-700">{q.question}</p>
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
      <p className="text-center font-bold text-amber-600 text-sm mb-4" dir="rtl">
        קרא את השאלה וחשוב על תשובה נכונה אפשרית. לחץ על ? כדי לראות תשובה נכונה אפשרית.
      </p>

      <div className="flex flex-col gap-3">
        {EX3_QUESTIONS.map((q, idx) => (
          <div key={idx} className="bg-white border-2 border-amber-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="flex-1 text-base font-bold text-gray-700">{q.question}</span>
              <button
                onClick={() => toggle(idx)}
                aria-label="Show answer"
                className={`flex-shrink-0 w-8 h-8 rounded-full font-display font-black text-base border-2 transition-colors active:scale-95 ${
                  revealed.has(idx)
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-amber-100 font-bold text-amber-700 text-base">
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

export default function PresentSimpleWhPage() {
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

      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar/present-simple" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Simple</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Simple — Wh Questions ❔</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות Wh בהווה פשוט</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Where do you live? · What does he eat?</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
        {tab === 'ex2'   && <Ex2 />}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
