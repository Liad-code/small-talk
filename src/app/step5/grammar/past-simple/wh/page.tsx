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

// Ex1: complete the correct question word. Each item shows a past-simple
// question with the Wh-word missing (blank at the start) plus a short answer/hint
// that uniquely points to the correct wh-word. After "did" the verb is BASE form.
interface Ex1Q {
  sentence: string   // the rest of the question after the blank
  hint: string       // the short answer that reveals the wh-word
  options: string[]
  answer: string
}

const WH_OPTIONS = ['Who', 'What', 'Where', 'When', 'Why', 'How']

const EX1_ROUNDS: Ex1Q[][] = [
  [
    { sentence: 'did you live last year?',          hint: '— In Tel Aviv.',          options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'did she eat for breakfast?',       hint: '— Eggs.',                 options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'did they go to school?',           hint: "— At 8 o'clock.",         options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'did he go to the park?',           hint: '— Because he was bored.', options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'did you get to school?',           hint: '— By bus.',               options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'lived in this house?',             hint: '— My grandma.',           options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'did you do after school?',         hint: '— I played football.',    options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'did the show start?',              hint: '— At seven.',             options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'did you feel sad?',                hint: '— Because it rained.',    options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'did they make the pizza?',         hint: '— In the kitchen.',       options: WH_OPTIONS, answer: 'Where' },
  ],
  [
    { sentence: 'did you eat lunch?',               hint: '— At noon.',              options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'did she go after school?',         hint: '— To the park.',          options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'did you read that book?',          hint: '— Because I liked it.',   options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'did they play yesterday?',         hint: '— Football.',             options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'helped you with the homework?',    hint: '— My sister.',            options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'did you get to the party?',        hint: '— By bike.',              options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'did your mom work?',               hint: '— In an office.',         options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'did you wake up?',                 hint: '— At seven.',             options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'did you want for your birthday?',  hint: '— A new book.',           options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'won the game?',                    hint: '— Dana.',                 options: WH_OPTIONS, answer: 'Who'   },
  ],
]

// ── Ex2 data (pick correct short answer) ────────────────────────────────────────

type Group = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it'

const ANSWER_BANK: Record<Group, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I did.',    no: "No, I didn't."    },
  you:  { yes: 'Yes, you did.',  no: "No, you didn't."  },
  we:   { yes: 'Yes, we did.',   no: "No, we didn't."   },
  they: { yes: 'Yes, they did.', no: "No, they didn't." },
  he:   { yes: 'Yes, he did.',   no: "No, he didn't."   },
  she:  { yes: 'Yes, she did.',  no: "No, she didn't."  },
  it:   { yes: 'Yes, it did.',   no: "No, it didn't."   },
}

const GROUPS: Group[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it']

interface Ex2Q {
  question: string
  group: Group
}

// `group` = the pronoun used in the SHORT ANSWER (not the subject of the question):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they, plural noun→they, singular noun→he/she/it
const EX2_QUESTIONS: Ex2Q[] = [
  { question: 'Did you like the movie?',       group: 'I'    },
  { question: 'Did he play tennis?',           group: 'he'   },
  { question: 'Did they walk to school?',      group: 'they' },
  { question: 'Did she read the book?',        group: 'she'  },
  { question: 'Did we eat lunch at noon?',     group: 'we'   },
  { question: 'Did it rain last night?',       group: 'it'   },
  { question: 'Did I sing well?',              group: 'you'  },
  { question: 'Did the cat drink the milk?',   group: 'it'   },
  { question: 'Did the boys play outside?',    group: 'they' },
  { question: 'Did your mom cook fish?',       group: 'she'  },
]

// ── Ex3 data (think of an answer, reveal a sample) ──────────────────────────────

interface Ex3Q { question: string; answer: string }

const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Where did you live last year?',     answer: 'I lived in Tel Aviv.'  },
  { question: 'What did you eat for breakfast?',   answer: 'I ate eggs.'           },
  { question: 'When did you go to school?',        answer: "At 8 o'clock."         },
  { question: 'Why did you like summer?',          answer: 'Because it was warm.'  },
  { question: 'How did you get to school?',        answer: 'By bus.'               },
  { question: 'Who did you play with?',            answer: 'With my friends.'      },
  { question: 'Where did your dad work?',          answer: 'At a hospital.'        },
  { question: 'What did your mom cook?',           answer: 'She cooked pasta.'     },
  { question: 'When did the movie start?',         answer: "At five o'clock."      },
  { question: 'How did he feel yesterday?',        answer: 'He felt happy.'        },
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
          שאלות Wh בעבר פשוט
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-blue-800 mb-4" dir="rtl">
          <p>• המבנה לשאלה: מילת שאלה + did + נושא + פועל בצורת הבסיס</p>
          <div className="bg-white rounded-xl px-3 py-1.5 border-2 border-blue-100 my-1" dir="ltr">
            <span className="font-bold text-gray-700 text-base">When did she work?</span>
          </div>
          <p>• did מתאים לכל הנושאים (I / you / he / she / it / we / they)</p>
          <p>• אחרי did הפועל תמיד בצורת הבסיס (בלי -ed)</p>
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
          {['When did I eat?', 'When did you eat?', 'When did he eat?', 'When did she eat?', 'When did it eat?', 'When did we eat?', 'When did they eat?'].map(s => (
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
        <span className="text-blue-500">{current} ✓</span>
      </div>

      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הקצרה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-blue-700">{q.question}</p>
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

export default function PastSimpleWhPage() {
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
          <Link href="/step5/grammar/past-simple" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Past Simple</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Past Simple — Wh Questions ❔</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות Wh בעבר פשוט</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">When did she work? · What did you eat?</p>
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
        {tab === 'ex2'   && <Ex2 />}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
