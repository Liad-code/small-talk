'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2'

// ── Types & Data ──────────────────────────────────────────────────────────────

type CanVerb = 'can' | "can't"

interface CanQ {
  before: string
  after: string
  answer: CanVerb
}

const EX1_QUESTIONS: CanQ[] = [
  { before: 'Lions',     after: 'drive cars.',   answer: "can't" },
  { before: 'Cows',      after: 'walk.',         answer: 'can'   },
  { before: 'Sheep',     after: 'play the piano.', answer: "can't" },
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
    phrases: ['read a book.', 'drive a car.', 'jump high.', 'walk.', 'sing.'],
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
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { verb: 'can' as CanVerb,   rest: 'read English.', subj: 'I' },
            { verb: 'can' as CanVerb,   rest: 'climb trees.',  subj: 'Monkeys' },
            { verb: "can't" as CanVerb, rest: 'ride a bike.',  subj: 'A baby' },
            { verb: "can't" as CanVerb, rest: 'fly.',          subj: 'Fish' },
          ].map(({ verb, rest, subj }) => (
            <div key={`${subj}-${rest}`} className="flex items-center gap-1.5 bg-indigo-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-indigo-800 text-base">{subj}</span>
              <span className={`font-black text-base ${verb === 'can' ? 'text-indigo-600' : 'text-blue-600'}`}>{verb}</span>
              <span className="font-bold text-indigo-800 text-base">{rest}</span>
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
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedPhrases, setUsedPhrases] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availablePhrases = cycle.phrases.filter(p => !usedPhrases.has(p))

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selPhrase) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selSubject.text} ${selVerb} ${selPhrase}`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedPhrases(prev => { const s = new Set(prev); s.add(selPhrase); return s })
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CanPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
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
      </div>
    </div>
  )
}
