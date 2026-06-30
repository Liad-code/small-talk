'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex6'

type Could = 'could' | "couldn't"

// ── Ex1 data (choose could / couldn't) ──────────────────────────────────────────

interface Ex1Q {
  before: string
  after: string
  answer: Could
}

const EX1_QUESTIONS: Ex1Q[] = [
  { before: 'When she was 5, she',      after: 'swim.',              answer: "couldn't" },
  { before: 'Last year, I',            after: 'ride a bike.',       answer: 'could'    },
  { before: 'As a baby, he',           after: 'walk.',              answer: "couldn't" },
  { before: 'In first grade, we',      after: 'read short words.',  answer: 'could'    },
  { before: 'Two years ago, they',     after: 'speak English.',     answer: "couldn't" },
  { before: 'When he was young, he',   after: 'run very fast.',     answer: 'could'    },
  { before: 'Before the lessons, she', after: 'play the piano.',    answer: "couldn't" },
  { before: 'Last summer, I',          after: 'climb the big tree.',answer: 'could'    },
  { before: 'At age 3, the baby',      after: 'drive a car.',       answer: "couldn't" },
  { before: 'Last week, my mom',       after: 'cook a big dinner.', answer: 'could'    },
  { before: 'In the dark, we',         after: 'see the road.',      answer: "couldn't" },
  { before: 'Yesterday, he',           after: 'help his friend.',   answer: 'could'    },
]

// ── Ex2 (builder) data ──────────────────────────────────────────────────────────

const EX2_COULD = ['could']
const EX2_SUBJECTS = ['you', 'she', 'they', 'he', 'my brother', 'Dana', 'the baby', 'the children']
const EX2_VERBS = ['meet us', 'swim', 'read books', 'run fast', 'cook', 'speak English', 'ride a bike', 'walk']
const EX2_TIMES = ['last year', 'last week', 'a few years ago', 'yesterday']
const EX2_GOAL = 6

// ── Ex3 data (pick short answer) ────────────────────────────────────────────────

type Group = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it'

const ANSWER_BANK: Record<Group, { yes: string; no: string }> = {
  I:    { yes: 'Yes, I could.',    no: "No, I couldn't."    },
  you:  { yes: 'Yes, you could.',  no: "No, you couldn't."  },
  we:   { yes: 'Yes, we could.',   no: "No, we couldn't."   },
  they: { yes: 'Yes, they could.', no: "No, they couldn't." },
  he:   { yes: 'Yes, he could.',   no: "No, he couldn't."   },
  she:  { yes: 'Yes, she could.',  no: "No, she couldn't."  },
  it:   { yes: 'Yes, it could.',   no: "No, it couldn't."   },
}

const GROUPS: Group[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it']

interface Ex3Q {
  question: string
  group: Group
}

// `group` = the pronoun used in the SHORT ANSWER (not the subject of the question):
// you→I, I→you, he→he, she→she, it→it, we→we, they→they, plural noun→they, singular noun→he/she/it
const EX3_QUESTIONS: Ex3Q[] = [
  { question: 'Could you swim last year?',          group: 'I'    },
  { question: 'Could she play the piano?',          group: 'she'  },
  { question: 'Could they speak English?',          group: 'they' },
  { question: 'Could he ride a bike?',              group: 'he'   },
  { question: 'Could we read as children?',         group: 'we'   },
  { question: 'Could the dog run fast?',            group: 'it'   },
  { question: 'Could I help you?',                  group: 'you'  },
  { question: 'Could Dana cook dinner?',            group: 'she'  },
  { question: 'Could the boys climb the tree?',     group: 'they' },
  { question: 'Could the baby walk?',               group: 'it'   },
]

// ── WH words ────────────────────────────────────────────────────────────────────

const WH_WORDS: { word: string; hebrew: string; light: string; text: string }[] = [
  { word: 'Who',   hebrew: 'מי',   light: 'bg-rose-100 border-rose-300',      text: 'text-rose-700'    },
  { word: 'What',  hebrew: 'מה',   light: 'bg-sky-100 border-sky-300',        text: 'text-sky-700'     },
  { word: 'Where', hebrew: 'איפה', light: 'bg-emerald-100 border-emerald-300',text: 'text-emerald-700' },
  { word: 'When',  hebrew: 'מתי',  light: 'bg-violet-100 border-violet-300',  text: 'text-violet-700'  },
  { word: 'Why',   hebrew: 'למה',  light: 'bg-amber-100 border-amber-300',    text: 'text-amber-700'   },
  { word: 'How',   hebrew: 'איך',  light: 'bg-teal-100 border-teal-300',      text: 'text-teal-700'    },
]

const WH_OPTIONS = ['Who', 'What', 'Where', 'When', 'Why', 'How']

// ── Ex4 data (choose the wh-word) ───────────────────────────────────────────────

interface Ex4Q {
  sentence: string   // the rest of the question after the blank (wh + could + subject + verb)
  hint: string       // short answer that reveals the wh-word
  options: string[]
  answer: string
}

const EX4_ROUNDS: Ex4Q[][] = [
  [
    { sentence: 'could he swim?',                 hint: '— In the lake.',          options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'could she read?',                hint: '— When she was six.',     options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'could you cook?',                hint: '— Pasta and soup.',       options: WH_OPTIONS, answer: 'What'  },
    { sentence: "couldn't they come?",            hint: '— Because it was late.',  options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'could you open the box?',         hint: '— With a key.',           options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'could ride the old bike?',        hint: '— My big brother.',       options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'could he speak English?',         hint: '— Last year.',            options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'could she play as a child?',      hint: '— The piano.',            options: WH_OPTIONS, answer: 'What'  },
    { sentence: "couldn't you sleep?",             hint: '— Because of the noise.', options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'could they climb?',               hint: '— On the big rock.',      options: WH_OPTIONS, answer: 'Where' },
  ],
  [
    { sentence: 'could he run so fast?',           hint: '— He trained a lot.',     options: WH_OPTIONS, answer: 'How'   },
    { sentence: 'could she go after school?',      hint: '— To the park.',          options: WH_OPTIONS, answer: 'Where' },
    { sentence: 'could you read at age four?',     hint: '— Because mom taught me.', options: WH_OPTIONS, answer: 'Why'   },
    { sentence: 'could they cook?',                hint: '— Pancakes.',             options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'could drive the car?',            hint: '— My father.',            options: WH_OPTIONS, answer: 'Who'   },
    { sentence: 'could you swim?',                 hint: '— When I was seven.',     options: WH_OPTIONS, answer: 'When'  },
    { sentence: 'could she help you?',             hint: '— In the kitchen.',       options: WH_OPTIONS, answer: 'Where' },
    { sentence: "couldn't he ride a bike?",        hint: '— Because he was too young.', options: WH_OPTIONS, answer: 'Why' },
    { sentence: 'could they play last summer?',    hint: '— Football.',             options: WH_OPTIONS, answer: 'What'  },
    { sentence: 'could win the race?',             hint: '— My best friend.',       options: WH_OPTIONS, answer: 'Who'   },
  ],
]

// ── Ex6 data (think of an answer, reveal a sample) ──────────────────────────────

interface Ex6Q { question: string; answer: string }

const EX6_QUESTIONS: Ex6Q[] = [
  { question: 'When could you swim?',              answer: 'I could swim when I was seven.' },
  { question: 'What could you cook last year?',    answer: 'I could cook pasta.'            },
  { question: 'Where could he ride his bike?',     answer: 'In the park.'                   },
  { question: 'Why couldn\'t you come to the party?', answer: 'Because I was sick.'         },
  { question: 'How could she read so well?',       answer: 'She practised every day.'       },
  { question: 'Who could climb the big tree?',     answer: 'My brother could.'              },
  { question: 'When could they speak English?',    answer: 'They could speak it last year.' },
  { question: 'What could your mom cook?',         answer: 'She could cook soup.'           },
  { question: 'Why couldn\'t the baby walk?',      answer: 'Because she was too young.'     },
  { question: 'How could he run so fast?',         answer: 'He trained a lot.'              },
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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל התרגול!</p>
        <button
          onClick={() => { setCycleIdx(0); setKey(k => k + 1); setFinished(false) }}
          className="btn-kid bg-lime-500"
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

// ── Learn ──────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      {/* Intro */}
      <div className="bg-lime-50 border-4 border-lime-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-lime-700 text-center mb-2">
          Could 💪
        </h2>
        <p className="font-bold text-lime-800 text-sm text-center" dir="rtl">
          could היא צורת העבר של can — מתארים מה מישהו או משהו יכלו לעשות בעבר.
        </p>
      </div>

      {/* POSITIVE */}
      <div className="bg-green-50 border-4 border-green-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-green-700 text-center mb-2">could + verb</h3>
        <p className="font-bold text-green-800 text-sm text-center mb-3" dir="rtl">
          חיוב — מתארים מה מישהו או משהו יכלו לעשות בעבר.
        </p>
        <div className="bg-white border-2 border-green-200 rounded-2xl p-3 mb-3">
          <p className="font-bold text-green-700 text-sm text-center" dir="rtl">
            אחרי could תמיד בא פועל בצורת הבסיס (base form)
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { subj: 'I',    rest: 'jump.' },
            { subj: 'He',   rest: 'jump.' },
            { subj: 'They', rest: 'jump.' },
          ].map(({ subj, rest }) => (
            <div key={subj} className="flex items-center gap-1.5 bg-green-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-green-800 text-base">{subj}</span>
              <span className="font-black text-green-600 text-base">could</span>
              <span className="font-bold text-green-800 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NEGATIVE */}
      <div className="bg-lime-50 border-4 border-lime-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-lime-700 text-center mb-2">couldn&apos;t + verb</h3>
        <p className="font-bold text-lime-800 text-sm text-center mb-3" dir="rtl">
          שלילה — מתארים מה מישהו או משהו לא יכלו לעשות בעבר.
        </p>
        <div className="bg-white border-2 border-lime-200 rounded-2xl p-3 mb-3">
          <p className="font-bold text-lime-700 text-sm text-center">
            could not = <span className="font-black">couldn&apos;t</span>
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { subj: 'I',    rest: 'jump.' },
            { subj: 'He',   rest: 'jump.' },
            { subj: 'They', rest: 'jump.' },
          ].map(({ subj, rest }) => (
            <div key={subj} className="flex items-center gap-1.5 bg-lime-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-lime-800 text-base">{subj}</span>
              <span className="font-black text-green-700 text-base">couldn&apos;t</span>
              <span className="font-bold text-lime-800 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* YES / NO */}
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-emerald-700 text-center mb-2">Could + subject + verb?</h3>
        <p className="font-bold text-emerald-800 text-sm text-center mb-3" dir="rtl">
          שאלות כן / לא — מתחילים את השאלה ב- Could
        </p>
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-3">
          <p className="font-bold text-emerald-800 text-base mb-1.5 italic text-center">Could he jump?</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <span className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-xl">Yes, he could.</span>
            <span className="bg-rose-100 text-rose-700 font-bold text-sm px-3 py-1 rounded-xl">No, he couldn&apos;t.</span>
          </div>
        </div>
      </div>

      {/* WH */}
      <div className="bg-teal-50 border-4 border-teal-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-teal-700 text-center mb-2">Wh + could + subject + verb?</h3>
        <p className="font-bold text-teal-800 text-sm text-center mb-3" dir="rtl">
          שאלות Wh — מילת שאלה + could + נושא + פועל
        </p>
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="bg-white rounded-xl px-3 py-1.5 border-2 border-teal-100 text-center">
            <span className="font-bold text-gray-700 text-base">When could he jump?</span>
          </div>
          <div className="bg-white rounded-xl px-3 py-1.5 border-2 border-teal-100 text-center">
            <span className="font-bold text-gray-700 text-base">Why couldn&apos;t you come?</span>
          </div>
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

// ── Ex1: choose could / couldn't ────────────────────────────────────────────────

function Ex1() {
  const questions = EX1_QUESTIONS
  const [answers, setAnswers] = useState<Record<number, Could>>({})
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  // Every tap counts as correct — whatever the student picks is accepted.
  const choose = (idx: number, val: Could) => {
    if (answers[idx]) return
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-end text-sm font-bold text-gray-400 mb-4">
        <span className="text-lime-600">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על could או couldn&apos;t לפי המציאות</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          return (
            <div key={idx} className="bg-white border-2 rounded-xl px-2 py-1.5 flex items-center gap-2 flex-wrap border-gray-200">
              <span className="text-base font-bold text-gray-700 flex-1 min-w-0">
                {q.before}{' '}
                {ans ? (
                  <span className="text-green-600">{ans}</span>
                ) : (
                  <span className="bg-lime-100 rounded px-2 py-0.5 text-lime-400">___</span>
                )}
                {' '}{q.after}
              </span>
              {!ans ? (
                <div className="flex gap-1.5">
                  {(['could', "couldn't"] as Could[]).map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        v === 'could'
                          ? 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
                          : 'border-lime-400 bg-lime-50 text-lime-700 hover:bg-lime-100'
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
        </div>
      )}
    </div>
  )
}

// ── Ex2: builder (Could + subject + verb + time?) ───────────────────────────────

function Ex2() {
  const [selCould, setSelCould] = useState<string | null>(null)
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [resetKey, setResetKey] = useState(0)

  const allDone = sentences.length >= EX2_GOAL
  const ready = selCould && selSubject && selVerb && selTime

  const handleAdd = () => {
    if (!ready) return
    // Every well-formed Could-question the student builds is accepted
    const sentence = `Could ${selSubject} ${selVerb} ${selTime}?`
    setSentences(prev => [...prev, sentence])
    setSelCould(null)
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
  }

  const again = () => {
    setSentences([])
    setSelCould(null)
    setSelSubject(null)
    setSelVerb(null)
    setSelTime(null)
    setResetKey(k => k + 1)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={resetKey}>
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span dir="rtl">בנה שאלות עם Could</span>
        <span className="text-lime-600">{Math.min(sentences.length, EX2_GOAL)} / {EX2_GOAL} ✓</span>
      </div>

      <div className="bg-lime-50 border-2 border-lime-200 rounded-2xl p-3 mb-3 text-sm font-bold text-lime-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור שאלה.</p>
        <p>3. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
        <p>4. כל שאלה שתבנו עם Could תתקבל — אחרי could הפועל בצורת הבסיס.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Could column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-green-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">could</span>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX2_COULD.map(c => (
                <button
                  key={c}
                  onClick={() => setSelCould(c)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selCould === c ? 'bg-green-600 text-white' : 'bg-white text-green-700 border border-green-200 hover:bg-green-100'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-green-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX2_SUBJECTS.map(s => (
                <button
                  key={s}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject === s ? 'bg-green-500 text-white' : 'bg-white text-green-700 border border-green-200 hover:bg-green-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-lime-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Verb</span>
            </div>
            <div className="bg-lime-50 border-2 border-lime-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX2_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selVerb === v ? 'bg-lime-600 text-white' : 'bg-white text-lime-700 border border-lime-200 hover:bg-lime-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Time column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Time</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {EX2_TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelTime(t)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${selTime === t ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {ready && !allDone && (
        <div className="bg-lime-50 border-2 border-lime-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-lime-700 text-base flex-1">
            Could {selSubject} {selVerb} {selTime}?
          </span>
          <button onClick={handleAdd} className="btn-kid bg-lime-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-lime-100 border-2 border-lime-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-lime-600 text-sm">{i + 1}.</span>
              <span className="font-bold text-lime-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great questions!</p>
          <button onClick={again} className="btn-kid bg-lime-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex3: pick the correct short answer ──────────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = EX3_QUESTIONS[current]
  const isLast = current === EX3_QUESTIONS.length - 1

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
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QUESTIONS.length} השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-lime-500"
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
        <span className="text-lime-600">{current} ✓</span>
      </div>

      <div className="bg-lime-50 border-4 border-lime-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-600 text-sm mb-1" dir="rtl">לחץ על התשובה הקצרה הנכונה. ניתן לענות בחיוב או בשלילה.</p>
        <p className="font-display font-black text-2xl text-lime-700">{q.question}</p>
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

// ── Ex4: choose the correct question word ───────────────────────────────────────

function Ex4({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = EX4_ROUNDS[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Record<number, string>>({})

  const total = questions.length
  const done = Object.keys(answers).length
  const allDone = done === total
  const isLastRound = cycleIdx === EX4_ROUNDS.length - 1

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
        <h2 className="font-display font-black text-xl text-teal-700 text-center mb-1">
          Choose the Question Word
        </h2>
        <p className="font-bold text-sm text-teal-600 text-center" dir="rtl">
          בחר את מילת השאלה הנכונה לפי התשובה בסוגריים
        </p>
      </div>

      <div className="flex justify-between text-sm font-bold text-teal-500 mb-3">
        <span>Round {cycleIdx + 1} / {EX4_ROUNDS.length}</span>
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {questions.map((q, idx) => {
          const chosen = answers[idx]
          const wc = chosen ? WH_WORDS.find(w => w.word === chosen) : null
          return (
            <div key={idx} className="bg-white border-2 border-teal-200 rounded-2xl px-3 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
                {chosen ? (
                  <span className={`font-display font-black text-base ${wc ? wc.text : 'text-teal-700'}`}>{chosen}</span>
                ) : (
                  <span className="text-teal-300 font-black text-base">___</span>
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
            <button onClick={onDone} className="btn-kid bg-teal-500">🔁 Again</button>
          ) : (
            <button onClick={onAgain} className="btn-kid bg-teal-500">סבב הבא →</button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Ex6: think of an answer, reveal a sample ────────────────────────────────────

function Ex6() {
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
      <p className="text-center font-bold text-teal-600 text-sm mb-4" dir="rtl">
        קרא את השאלה וחשוב על תשובה נכונה אפשרית. לחץ על ? כדי לראות תשובה נכונה אפשרית.
      </p>

      <div className="flex flex-col gap-3">
        {EX6_QUESTIONS.map((q, idx) => (
          <div key={idx} className="bg-white border-2 border-teal-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="flex-1 text-base font-bold text-gray-700">{q.question}</span>
              <button
                onClick={() => toggle(idx)}
                aria-label="Show answer"
                className={`flex-shrink-0 w-8 h-8 rounded-full font-display font-black text-base border-2 transition-colors active:scale-95 ${
                  revealed.has(idx)
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-teal-50 text-teal-600 border-teal-300 hover:bg-teal-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-teal-100 font-bold text-teal-700 text-base">
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

export default function CouldPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
    { id: 'ex4',   label: 'Ex 4' },
    { id: 'ex6',   label: 'Ex 5' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-lime-500 to-green-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Could 💪</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">יכולת בעבר — could</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I could swim · He couldn&apos;t come</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-lime-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1'   && <Ex1 />}
        {tab === 'ex2'   && <Ex2 />}
        {tab === 'ex3'   && <Ex3 />}
        {tab === 'ex4'   && (
          <ExWrapper cycles={EX4_ROUNDS.length} render={(c, again, done) => <Ex4 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex6'   && <Ex6 />}
      </div>
    </div>
  )
}
