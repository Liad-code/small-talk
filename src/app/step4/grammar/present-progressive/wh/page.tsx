'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex4'

type Aux = 'am' | 'is' | 'are'

const AUX_COLORS: Record<Aux, { bg: string; light: string; text: string; border: string }> = {
  am:  { bg: 'bg-indigo-500',  light: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-300'  },
  is:  { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
  are: { bg: 'bg-orange-500',  light: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-300'  },
}

const AUXES: Aux[] = ['am', 'is', 'are']

const WH_WORDS: { word: string; hebrew: string }[] = [
  { word: 'What',  hebrew: 'מה' },
  { word: 'Where', hebrew: 'איפה' },
  { word: 'Who',   hebrew: 'מי' },
  { word: 'Why',   hebrew: 'למה' },
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
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-amber-700 text-center mb-1">
          Wh Questions
        </h2>
        <p className="font-bold text-amber-700 text-sm text-center mb-4" dir="rtl">
          הווה מתמשך — שאלות Wh
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-amber-800 mb-4" dir="rtl">
          <p>• המבנה: <span dir="ltr" className="font-black">Wh-word + am / is / are + subject + verb-ing?</span></p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {WH_WORDS.map(({ word, hebrew }) => (
            <div key={word} className="bg-orange-50 border-2 border-orange-200 rounded-2xl px-4 py-2 flex items-center justify-between">
              <span className="font-display font-black text-xl text-orange-700">{word}</span>
              <span className="font-bold text-sm text-orange-600" dir="rtl">{hebrew}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { wh: 'What',  aux: 'are' as Aux, rest: 'you eating?' },
            { wh: 'Where', aux: 'is' as Aux,  rest: 'he going?' },
            { wh: 'What',  aux: 'am' as Aux,  rest: 'I reading?' },
          ].map(({ wh, aux, rest }) => (
            <div key={wh + rest} className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-1.5 border-2 border-amber-100">
              <span className="font-display font-black text-base text-amber-700">{wh}</span>
              <span className={`font-display font-black text-base ${AUX_COLORS[aux].text}`}>{aux}</span>
              <span className="font-bold text-gray-700 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Read wh-question + answer (reveal) ─────────────────────────────────

interface Ex1Q { question: string; answer: string }

const EX1_QUESTIONS: Ex1Q[] = [
  { question: 'What are you eating?',        answer: '(a sandwich)' },
  { question: 'Where is your mom?',          answer: '(at the park)' },
  { question: 'What is he reading?',         answer: '(a book)' },
  { question: 'Where are they going?',       answer: '(to school)' },
  { question: 'What am I doing?',            answer: '(cleaning)' },
  { question: 'Who is singing now?',         answer: '(my sister)' },
  { question: 'Why is the baby crying?',     answer: "(it's hungry)" },
  { question: 'What is she drinking?',       answer: '(water)' },
  { question: 'Where are we sitting?',       answer: '(in the garden)' },
  { question: 'What are the kids playing?',  answer: '(football)' },
]

function Ex1Tab() {
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
        {EX1_QUESTIONS.map((q, idx) => (
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

// ── Ex 2: 4-part wh-question builder ──────────────────────────────────────────

interface Ex2Subject { text: string; aux: Aux }

interface Ex2Cycle {
  whWords: string[]
  subjects: Ex2Subject[]
  verbs: string[]
}

const EX2_CYCLES: Ex2Cycle[] = [
  {
    whWords: ['What', 'Where', 'Who', 'Why', 'When', 'How'],
    subjects: [
      { text: 'you',  aux: 'are' },
      { text: 'he',   aux: 'is'  },
      { text: 'I',    aux: 'am'  },
      { text: 'they', aux: 'are' },
      { text: 'she',  aux: 'is'  },
      { text: 'we',   aux: 'are' },
    ],
    verbs: ['doing', 'going', 'reading', 'eating', 'playing', 'watching', 'feeling', 'coming', 'singing', 'cooking'],
  },
]

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX2_CYCLES[cycleIdx]
  const [selWh, setSelWh] = useState<string | null>(null)
  const [selAux, setSelAux] = useState<Aux | null>(null)
  const [selSubject, setSelSubject] = useState<Ex2Subject | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedVerbs, setUsedVerbs] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availWh = cycle.whWords
  const availSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availVerbs = cycle.verbs.filter(v => !usedVerbs.has(v))

  const handleAdd = () => {
    if (!selWh || !selAux || !selSubject || !selVerb) return
    if (selSubject.aux !== selAux) {
      setError('❌ Try a different aux!')
      return
    }
    const sentence = `${selWh} ${selAux} ${selSubject.text} ${selVerb}?`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedVerbs(prev => { const s = new Set(prev); s.add(selVerb); return s })
    setSelWh(null)
    setSelAux(null)
    setSelSubject(null)
    setSelVerb(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Cycle {cycleIdx + 1} / {EX2_CYCLES.length}</span>
        <span className="text-amber-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 mb-3 text-sm font-bold text-amber-700" dir="rtl">
        <p>1. יש ליצור 6 שאלות על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור שאלה.</p>
        <p>3. השאלה תופיע למטה, לחץ Add על מנת להוסיף אותה.</p>
        <p>4. במידה והשאלה לא נכונה, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Wh-word */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Wh</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1 flex flex-col gap-1">
              {availWh.map((w, i) => (
                <button
                  key={`${w}-${i}`}
                  onClick={() => setSelWh(w)}
                  className={`text-xs font-display font-black rounded-lg px-1 py-1 text-center transition-colors ${selWh === w ? 'bg-amber-600 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

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
        </div>
      )}

      {selWh && selAux && selSubject && selVerb && !allDone && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-amber-700 text-base flex-1">
            {selWh} {selAux} {selSubject.text} {selVerb}?
          </span>
          <button onClick={handleAdd} className="btn-kid bg-amber-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-amber-100 border-2 border-amber-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-amber-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-amber-800 text-base">{s}</span>
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

// ── Ex 4: complete the correct wh-word ──────────────────────────────────────

const EX4_WH_WORDS: { word: string; light: string; text: string }[] = [
  { word: 'Who',   light: 'bg-rose-100 border-rose-300',      text: 'text-rose-700'    },
  { word: 'What',  light: 'bg-sky-100 border-sky-300',        text: 'text-sky-700'     },
  { word: 'Where', light: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-700'},
  { word: 'When',  light: 'bg-violet-100 border-violet-300',  text: 'text-violet-700'  },
  { word: 'Why',   light: 'bg-amber-100 border-amber-300',    text: 'text-amber-700'   },
  { word: 'How',   light: 'bg-teal-100 border-teal-300',      text: 'text-teal-700'    },
]

const EX4_WH_OPTIONS = ['Who', 'What', 'Where', 'When', 'Why', 'How']

interface Ex4Q {
  sentence: string   // the rest of the question after the blank
  hint: string       // the short answer that reveals the wh-word
  answer: string
}

const EX4_QUESTIONS: Ex4Q[] = [
  { sentence: 'are you going?',          hint: '— To the park.',            answer: 'Where' },
  { sentence: 'is she eating?',          hint: '— An apple.',               answer: 'What'  },
  { sentence: 'are they playing?',       hint: '— Football.',               answer: 'What'  },
  { sentence: 'is he crying?',           hint: '— Because he is sad.',      answer: 'Why'   },
  { sentence: 'are you reading now?',    hint: '— At home.',                answer: 'Where' },
  { sentence: 'is cooking dinner?',      hint: '— My mom.',                 answer: 'Who'   },
  { sentence: 'are you doing?',          hint: '— My homework.',            answer: 'What'  },
  { sentence: 'is the baby sleeping?',   hint: '— Now.',                    answer: 'When'  },
  { sentence: 'are the kids running?',   hint: '— In the yard.',            answer: 'Where' },
  { sentence: 'is she smiling?',         hint: '— Because she is happy.',   answer: 'Why'   },
]

function Ex4() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Record<number, string>>({})
  const [resetKey, setResetKey] = useState(0)

  const total = EX4_QUESTIONS.length
  const done = Object.keys(answers).length
  const allDone = done === total

  const choose = (idx: number, choice: string) => {
    if (answers[idx]) return
    if (choice === EX4_QUESTIONS[idx].answer) {
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
        <h2 className="font-display font-black text-xl text-amber-700 text-center mb-1">
          Choose the Question Word
        </h2>
        <p className="font-bold text-sm text-amber-600 text-center" dir="rtl">
          בחר את מילת השאלה הנכונה לפי התשובה בסוגריים
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-amber-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {EX4_QUESTIONS.map((q, idx) => {
          const chosen = answers[idx]
          const wc = chosen ? EX4_WH_WORDS.find(w => w.word === chosen) : null
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
                  {EX4_WH_OPTIONS.map(opt => {
                    const oc = EX4_WH_WORDS.find(w => w.word === opt)
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
          <button onClick={again} className="btn-kid bg-amber-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PresentProgressiveWhPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex4',   label: 'Ex 4' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar/present-progressive" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Present Progressive</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Present Progressive — Wh Questions ❔</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">הווה מתמשך — שאלות Wh</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">What are you eating? · Where is he going?</p>
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
        {tab === 'ex1' && <Ex1Tab />}
        {tab === 'ex2' && (
          <ExWrapper cycles={EX2_CYCLES.length} render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />} />
        )}
        {tab === 'ex4' && <Ex4 />}
      </div>
    </div>
  )
}
