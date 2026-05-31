'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'ex1' | 'ex2'

// ── Mixed Ex1 data ────────────────────────────────────────────────────────────

type MixedEx1Option = 'Do' | 'Does' | 'do' | 'does' | 'have' | 'has' | "don't have" | "doesn't have"

interface MixedEx1Q {
  sentence: string
  options: MixedEx1Option[]
  answer: MixedEx1Option
}

const MIXED_EX1_R1: MixedEx1Q[] = [
  { sentence: 'They ___ a car.',           options: ['do', 'does', 'have', 'has'],  answer: 'have'  },
  { sentence: 'He ___ a big dog.',         options: ['do', 'does', 'have', 'has'],  answer: 'has'   },
  { sentence: '___ you have a pencil?',    options: ['Do', 'Does', 'have', 'has'],  answer: 'Do'    },
  { sentence: 'She ___ a cat.',            options: ['do', 'does', 'have', 'has'],  answer: 'has'   },
  { sentence: '___ he have a book?',       options: ['Do', 'Does', 'have', 'has'],  answer: 'Does'  },
  { sentence: 'I ___ a book.',             options: ['do', 'does', 'have', 'has'],  answer: 'have'  },
  { sentence: 'We ___ a red bag.',         options: ['do', 'does', 'have', 'has'],  answer: 'have'  },
  { sentence: '___ they have a dog?',      options: ['Do', 'Does', 'have', 'has'],  answer: 'Do'    },
  { sentence: 'The teacher ___ a pen.',    options: ['do', 'does', 'have', 'has'],  answer: 'has'   },
  { sentence: '___ she have a cat?',       options: ['Do', 'Does', 'have', 'has'],  answer: 'Does'  },
]

const MIXED_EX1_R2: MixedEx1Q[] = [
  { sentence: 'You ___ a black bag.',      options: ['do', 'does', "don't have", "doesn't have"],  answer: "don't have"    },
  { sentence: '___ he have a car?',        options: ['Do', 'Does', "don't have", "doesn't have"],  answer: 'Does'          },
  { sentence: 'She ___ a cat.',            options: ['do', 'does', "don't have", "doesn't have"],  answer: "doesn't have"  },
  { sentence: '___ they have a house?',    options: ['Do', 'Does', "don't have", "doesn't have"],  answer: 'Do'            },
  { sentence: 'I ___ a book.',             options: ['do', 'does', "don't have", "doesn't have"],  answer: "don't have"    },
  { sentence: 'He ___ a pencil.',          options: ['do', 'does', "don't have", "doesn't have"],  answer: "doesn't have"  },
  { sentence: '___ you have a pet?',       options: ['Do', 'Does', "don't have", "doesn't have"],  answer: 'Do'            },
  { sentence: 'We ___ a big house.',       options: ['do', 'does', "don't have", "doesn't have"],  answer: "don't have"    },
  { sentence: '___ she have a dog?',       options: ['Do', 'Does', "don't have", "doesn't have"],  answer: 'Does'          },
  { sentence: 'Dana ___ a cake.',          options: ['do', 'does', "don't have", "doesn't have"],  answer: "doesn't have"  },
]

const MIXED_EX1_ROUNDS = [
  { label: 'Positive & Question', questions: MIXED_EX1_R1 },
  { label: 'Negative & Question', questions: MIXED_EX1_R2 },
]

// ── Mixed Ex2 data ────────────────────────────────────────────────────────────

type MixedVerb = 'have' | 'has' | "don't have" | "doesn't have"

interface MixedSubject { text: string; verb: MixedVerb }
interface MixedBuilderCycle { subjects: MixedSubject[]; nouns: string[] }

const MIXED_EX2: MixedBuilderCycle[] = [
  {
    subjects: [
      { text: 'I',          verb: 'have'         },
      { text: 'She',        verb: 'has'          },
      { text: 'We',         verb: 'have'         },
      { text: 'He',         verb: 'has'          },
      { text: 'They',       verb: 'have'         },
      { text: 'You',        verb: 'have'         },
      { text: 'The cat',    verb: 'has'          },
      { text: 'My mom',     verb: 'has'          },
    ],
    nouns: ['a ball', 'a blue pen', 'two dogs', 'a bicycle', 'a big house', 'a red bag', 'a toy', 'a nice car'],
  },
  {
    subjects: [
      { text: 'I',          verb: "don't have"    },
      { text: 'She',        verb: "doesn't have"  },
      { text: 'We',         verb: "don't have"    },
      { text: 'He',         verb: "doesn't have"  },
      { text: 'They',       verb: "don't have"    },
      { text: 'You',        verb: "don't have"    },
      { text: 'The dog',    verb: "doesn't have"  },
      { text: 'My sister',  verb: "doesn't have"  },
    ],
    nouns: ['a ball', 'a book', 'a garden', 'a pencil', 'a bicycle', 'a cat', 'a toy', 'long hair'],
  },
]

const VERB_OPTS: { v: MixedVerb; bg: string; text: string; border: string; light: string }[] = [
  { v: 'have',          bg: 'bg-teal-500',    text: 'text-teal-700',    border: 'border-teal-400',    light: 'bg-teal-50'    },
  { v: 'has',           bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-400', light: 'bg-emerald-50' },
  { v: "don't have",    bg: 'bg-rose-500',    text: 'text-rose-700',    border: 'border-rose-400',    light: 'bg-rose-50'    },
  { v: "doesn't have",  bg: 'bg-orange-500',  text: 'text-orange-700',  border: 'border-orange-400',  light: 'bg-orange-50'  },
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

// ── Ex1 ───────────────────────────────────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const round = MIXED_EX1_ROUNDS[cycleIdx]
  const questions = round.questions
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: MixedEx1Option) => {
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
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Round {cycleIdx + 1} / {MIXED_EX1_ROUNDS.length} — {round.label}</span>
        <span className="text-violet-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על המילה הנכונה</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          const display = ans ? q.sentence.replace('___', ans) : q.sentence
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl px-2 py-1.5 flex items-center gap-2 flex-wrap ${isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <span className="text-base font-bold text-gray-700 flex-1 min-w-0">{display}</span>
              {!ans && !isWrong ? (
                <div className="flex gap-1 flex-wrap">
                  {q.options.map(v => (
                    <button
                      key={v}
                      onClick={() => choose(idx, v)}
                      className="px-2 py-1 rounded-lg font-display font-bold text-xs border-2 border-violet-300 bg-violet-50 text-violet-700 hover:opacity-80 active:scale-95 transition-colors"
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
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < MIXED_EX1_ROUNDS.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-blue-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex2 ───────────────────────────────────────────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = MIXED_EX2[cycleIdx]
  const [selSubject, setSelSubject] = useState<MixedSubject | null>(null)
  const [selVerb, setSelVerb] = useState<MixedVerb | null>(null)
  const [selNoun, setSelNoun] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedNouns, setUsedNouns] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availableNouns = cycle.nouns.filter(n => !usedNouns.has(n))

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selNoun) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selSubject.text} ${selVerb} ${selNoun}.`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedNouns(prev => { const s = new Set(prev); s.add(selNoun); return s })
    setSelSubject(null)
    setSelVerb(null)
    setSelNoun(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {MIXED_EX2.length}</span>
        <span className="text-violet-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-3 mb-3 text-sm font-bold text-violet-700" dir="rtl">
        <p>1. יש ליצור {cycle.subjects.length} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-violet-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-violet-50 border-2 border-violet-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-sm font-bold rounded-lg px-1.5 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-violet-500 text-white' : 'bg-white text-violet-700 border border-violet-200 hover:bg-violet-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {VERB_OPTS.map(({ v, bg, text, border, light }) => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${selVerb === v ? `${bg} text-white ${border}` : `${light} ${text} ${border} hover:opacity-80`}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Noun column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Noun</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableNouns.map(n => (
                <button
                  key={n}
                  onClick={() => setSelNoun(n)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selNoun === n ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selVerb && selNoun && !allDone && (
        <div className="bg-violet-50 border-2 border-violet-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-violet-700 text-base flex-1">
            {selSubject.text} {selVerb} {selNoun}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-violet-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-violet-100 border-2 border-violet-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-violet-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-violet-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < MIXED_EX2.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-blue-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HasHaveMixedPage() {
  const [tab, setTab] = useState<Tab>('ex1')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'ex1', label: 'Ex 1' },
    { id: 'ex2', label: 'Ex 2' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/has-have" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Have / Has</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Mixed Practice 🔀</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">תרגול מעורב — חיוב, שלילה ושאלות</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'ex1' && (
          <ExWrapper
            cycles={MIXED_EX1_ROUNDS.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={MIXED_EX2.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
