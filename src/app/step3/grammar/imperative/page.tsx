'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Types & Data ──────────────────────────────────────────────────────────────

interface VerbFillQ {
  before: string // text before the blank (empty for positive imperative)
  after: string  // text after the blank
  answer: string // the correct verb
}

const EX1_VERBS = ['go', 'sit', 'open', 'close', 'read', 'write', 'eat', 'drink', 'wash', 'clean']

const EX1_QUESTIONS: VerbFillQ[] = [
  { before: '', after: 'to sleep.',            answer: 'go'    },
  { before: '', after: 'down on the chair.',   answer: 'sit'   },
  { before: '', after: 'the window, please.',  answer: 'open'  },
  { before: '', after: 'the door.',            answer: 'close' },
  { before: '', after: 'a book.',              answer: 'read'  },
  { before: '', after: 'your name.',           answer: 'write' },
  { before: '', after: 'your dinner.',         answer: 'eat'   },
  { before: '', after: 'some water.',          answer: 'drink' },
  { before: '', after: 'your hands.',          answer: 'wash'  },
  { before: '', after: 'your room.',           answer: 'clean' },
]

const EX2_VERBS = ['play', 'run', 'talk', 'shout', 'touch', 'jump', 'push', 'climb', 'throw', 'draw']

const EX2_QUESTIONS: VerbFillQ[] = [
  { before: "Don't", after: 'near the road.',        answer: 'play'  },
  { before: "Don't", after: 'in the classroom.',     answer: 'run'   },
  { before: "Don't", after: 'during the lesson.',    answer: 'talk'  },
  { before: "Don't", after: 'in the library.',       answer: 'shout' },
  { before: "Don't", after: 'the hot oven.',         answer: 'touch' },
  { before: "Don't", after: 'on the bed.',           answer: 'jump'  },
  { before: "Don't", after: 'your friend.',          answer: 'push'  },
  { before: "Don't", after: 'the high tree.',        answer: 'climb' },
  { before: "Don't", after: 'the ball inside.',      answer: 'throw' },
  { before: "Don't", after: 'on the wall.',          answer: 'draw'  },
]

// ── Ex3 data (builder) ─────────────────────────────────────────────────────────

interface ImpCommand {
  text: string   // command, e.g. "Sit" or "Don't run"
  ending: string // correct ending, e.g. "down."
}

interface ImpEx3Cycle {
  commands: ImpCommand[]
}

const EX3_CYCLES: ImpEx3Cycle[] = [
  {
    commands: [
      { text: 'Sit',   ending: 'down.'          },
      { text: 'Open',  ending: 'the door.'      },
      { text: 'Read',  ending: 'a book.'        },
      { text: 'Wash',  ending: 'your hands.'    },
      { text: 'Close', ending: 'the window.'    },
    ],
  },
  {
    commands: [
      { text: "Don't run",   ending: 'inside.'           },
      { text: "Don't talk",  ending: 'loudly.'           },
      { text: "Don't touch", ending: 'the oven.'         },
      { text: "Don't push",  ending: 'your friend.'      },
      { text: "Don't play",  ending: 'near the road.'    },
    ],
  },
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
          className="btn-kid bg-rose-500"
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
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-2">
          The Imperative ⚡
        </h2>
        <p className="font-bold text-rose-800 text-sm mb-4 text-center" dir="rtl">
          ציווי – משתמשים בציווי על מנת לתת הוראות.
        </p>

        <ul className="bg-white border-2 border-rose-200 rounded-2xl p-4 mb-4 flex flex-col gap-2 text-sm font-bold text-rose-700" dir="rtl">
          <li>• בציווי <span className="text-rose-900 font-black">חיובי</span> מתחילים את המשפט עם הפועל: <span dir="ltr">Sit down!</span></li>
          <li>• בציווי <span className="text-rose-900 font-black">שלילי</span> מתחילים עם <span dir="ltr" className="font-black">Don&apos;t</span> ואז הפועל: <span dir="ltr">Don&apos;t talk!</span></li>
          <li>• אפשר להוסיף <span dir="ltr" className="font-black">please</span> בתחילת המשפט או בסופו על מנת להישמע מנומסים: <span dir="ltr">please open the door</span></li>
          <li>• הפועל במשפט ציווי לא משתנה לזכר, נקבה, יחיד או רבים.</li>
        </ul>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3">
            <div className="font-display font-black text-green-700 text-center mb-2">Positive ✅</div>
            <div className="flex flex-col gap-1.5">
              {['Sit down!', 'Open the window, please.', 'Read a book.'].map(s => (
                <div key={s} className="bg-white rounded-xl px-3 py-1.5 font-bold text-green-800 text-sm text-center">{s}</div>
              ))}
            </div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-3">
            <div className="font-display font-black text-red-700 text-center mb-2">Negative ❌</div>
            <div className="flex flex-col gap-1.5">
              {["Don't talk!", "Please don't run.", "Don't touch the oven."].map(s => (
                <div key={s} className="bg-white rounded-xl px-3 py-1.5 font-bold text-red-800 text-sm text-center">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Verb-fill exercise (shared by Ex1 & Ex2) ────────────────────────────────────

function VerbFillEx({
  questions,
  verbs,
  accent,
  instruction,
}: {
  questions: VerbFillQ[]
  verbs: string[]
  accent: string
  instruction: string
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  // Shuffle the verb bank so its order does NOT match the sentence order
  const [bankVerbs] = useState(() => shuffle(verbs))
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx] || wrongs.has(idx)) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => { const s = new Set(prev); s.add(idx); return s })
      setTimeout(() => setWrongs(prev => { const s = new Set(prev); s.delete(idx); return s }), 800)
    }
  }

  // next unanswered question gets the verb bank
  const activeIdx = questions.findIndex((_, i) => !answers[i])

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span className="text-rose-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">{instruction}</p>

      {/* Verb bank */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-5">
        <div className="flex flex-wrap gap-2 justify-center">
          {bankVerbs.map(v => {
            const used = Object.values(answers).includes(v)
            return (
              <button
                key={v}
                disabled={used || activeIdx === -1}
                onClick={() => activeIdx !== -1 && choose(activeIdx, v)}
                className={`px-3 py-1.5 rounded-xl font-display font-bold text-sm border-2 transition-all active:scale-95 ${
                  used
                    ? 'bg-gray-100 text-gray-300 border-gray-200'
                    : `bg-white ${accent} hover:bg-rose-100`
                }`}
              >
                {v}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          const isActive = idx === activeIdx
          return (
            <div
              key={idx}
              className={`bg-white border-2 rounded-xl px-3 py-2 flex items-center gap-2 ${
                isWrong ? 'border-red-300 bg-red-50' : isActive ? 'border-rose-400' : 'border-gray-200'
              }`}
            >
              <span className="font-bold text-rose-400 text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700 flex-1">
                {q.before && <span>{q.before} </span>}
                {ans ? (
                  <span className="text-green-600">{ans}</span>
                ) : (
                  <span className={`rounded px-2 py-0.5 ${isActive ? 'bg-rose-100 text-rose-500' : 'bg-gray-100 text-gray-400'}`}>___</span>
                )}
                {' '}{q.after}
              </span>
              {ans ? (
                <span className="font-bold text-sm text-green-600">✓</span>
              ) : isWrong ? (
                <span className="font-bold text-sm text-red-500">✗</span>
              ) : null}
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

// ── Ex3 (builder) ───────────────────────────────────────────────────────────────

function Ex3({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = EX3_CYCLES[cycleIdx]
  const [selCommand, setSelCommand] = useState<ImpCommand | null>(null)
  const [selEnding, setSelEnding] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set())
  const [usedEndings, setUsedEndings] = useState<Set<string>>(new Set())

  // Shuffle the endings (right column) so they do NOT line up with their commands
  const [endingOrder] = useState(() => shuffle(cycle.commands.map(c => c.ending)))

  const allDone = sentences.length === cycle.commands.length
  const availableCommands = cycle.commands.filter(c => !usedCommands.has(c.text))
  const availableEndings = endingOrder.filter(e => !usedEndings.has(e))

  const handleAdd = () => {
    if (!selCommand || !selEnding) return
    if (selCommand.ending !== selEnding) {
      setError('❌ Try a different ending!')
      return
    }
    const sentence = `${selCommand.text} ${selEnding}`
    setSentences(prev => [...prev, sentence])
    setUsedCommands(prev => { const s = new Set(prev); s.add(selCommand.text); return s })
    setUsedEndings(prev => { const s = new Set(prev); s.add(selEnding); return s })
    setSelCommand(null)
    setSelEnding(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {EX3_CYCLES.length}</span>
        <span className="text-rose-500">{sentences.length} / {cycle.commands.length} ✓</span>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 text-sm font-bold text-rose-700" dir="rtl">
        <p>1. יש ליצור 5 משפטים על מנת לסיים את הסבב.</p>
        <p>2. לחץ על פקודה אחת ועל סיומת אחת כדי לבנות משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Command column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-rose-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Command</span>
            </div>
            <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableCommands.map(c => (
                <button
                  key={c.text}
                  onClick={() => setSelCommand(c)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selCommand?.text === c.text ? 'bg-rose-500 text-white' : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'}`}
                >
                  {c.text}
                </button>
              ))}
            </div>
          </div>

          {/* Ending column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Ending</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableEndings.map(e => (
                <button
                  key={e}
                  onClick={() => setSelEnding(e)}
                  className={`text-sm font-bold rounded-lg px-2 py-1 text-center transition-colors ${selEnding === e ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selCommand && selEnding && !allDone && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-rose-700 text-base flex-1">
            {selCommand.text} {selEnding}
          </span>
          <button onClick={handleAdd} className="btn-kid bg-rose-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-rose-100 border-2 border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-rose-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-rose-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < EX3_CYCLES.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-rose-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-rose-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
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

export default function ImperativePage() {
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

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Imperative ⚡</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">ציווי — הוראות ובקשות</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Sit down! · Don&apos;t run!</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && (
          <VerbFillEx
            questions={EX1_QUESTIONS}
            verbs={EX1_VERBS}
            accent="text-rose-700 border-rose-300"
            instruction="לחצו על הפועל הנכון מתוך הבנק כדי להשלים את המשפט"
          />
        )}
        {tab === 'ex2' && (
          <VerbFillEx
            questions={EX2_QUESTIONS}
            verbs={EX2_VERBS}
            accent="text-rose-700 border-rose-300"
            instruction="לחצו על הפועל הנכון כדי להשלים את משפטי השלילה"
          />
        )}
        {tab === 'ex3' && (
          <ExWrapper
            cycles={EX3_CYCLES.length}
            render={(c, again, done) => <Ex3 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
