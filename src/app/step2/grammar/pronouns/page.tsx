'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { PR_EX1, PR_EX2, PR_EX3, PR_EX4, PR_EX5 } from '@/data/step2/grammar'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5'

const ALL_PRONOUNS = ['I', 'YOU', 'HE', 'SHE', 'IT', 'WE', 'YOU', 'THEY']

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-purple-50 border-4 border-purple-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-purple-700 text-center mb-3">
          I · YOU · HE · SHE · IT · WE · YOU · THEY
        </h2>
        <p className="font-bold text-purple-800 text-sm mb-1">
          שמות גוף (pronouns) באים במקום שמות עצם.
        </p>
        <p className="font-bold text-purple-700 text-sm mb-4">
          Pronouns replace nouns in a sentence.
        </p>
        <div className="flex flex-col gap-1 text-sm mb-4">
          {[
            ['Tom is tall.', 'He is tall.'],
            ['The dog is brown.', 'It is brown.'],
            ['The books are new.', 'They are new.'],
          ].map(([a, b]) => (
            <div key={a} className="flex items-center gap-2 bg-purple-100 rounded-xl px-3 py-1.5">
              <span className="text-purple-600 font-bold flex-1">{a}</span>
              <span className="text-purple-400 font-bold">→</span>
              <span className="text-purple-800 font-bold flex-1">{b}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3 border-2 border-purple-200">
            <div className="font-display font-black text-purple-700 text-center text-sm mb-2">יחיד (Singular)</div>
            {[['I','אני'],['You','אתה, את'],['He','הוא'],['She','היא'],['It','זה / זו']].map(([p,h])=>(
              <div key={p} className="flex justify-between text-sm py-0.5 border-b border-purple-100">
                <span className="font-bold text-purple-700">{p}</span>
                <span className="text-gray-500" dir="rtl">{h}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-purple-200">
            <div className="font-display font-black text-purple-700 text-center text-sm mb-2">רבים (Plural)</div>
            {[['We','אנחנו'],['You','אתם, אתן'],['They','הם, הן']].map(([p,h])=>(
              <div key={p} className="flex justify-between text-sm py-0.5 border-b border-purple-100">
                <span className="font-bold text-purple-700">{p}</span>
                <span className="text-gray-500" dir="rtl">{h}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs font-bold text-purple-500 mt-3" dir="rtl">
          שמתם לב? למילה YOU יש ארבעה פירושים!
        </p>
      </div>
    </div>
  )
}

// ── Ex 1: Picture Match ───────────────────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = PR_EX1[cycleIdx]
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const q = questions[current]
  const isLast = current === questions.length - 1

  const choose = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (q.options[idx].correct) setScore(s => s + 1)
  }

  const next = () => {
    if (isLast) return
    setCurrent(c => c + 1)
    setSelected(null)
  }

  if (current >= questions.length) return null

  const done = selected !== null && isLast

  return (
    <div className="max-w-sm mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Q {current + 1} / {questions.length}</span>
        <span className="text-purple-500">{score} ✓</span>
      </div>

      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl px-8 py-3 mb-2">
          <span className="font-display font-black text-4xl text-white">{q.pronoun}</span>
        </div>
        <p className="text-sm font-bold text-gray-500">Choose the correct picture</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {q.options.map((opt, idx) => {
          let border = 'border-gray-200 bg-white'
          if (selected !== null) {
            if (opt.correct) border = 'border-green-400 bg-green-50'
            else if (idx === selected) border = 'border-red-400 bg-red-50 shake'
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={`border-4 ${border} rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95`}
            >
              <span className="text-5xl leading-none">{opt.emoji}</span>
              <span className="text-xs font-bold text-gray-600 text-center leading-tight">{opt.label}</span>
            </button>
          )
        })}
      </div>

      {selected !== null && !done && (
        <button onClick={next} className="btn-kid bg-purple-500 w-full">Next →</button>
      )}

      {done && (
        <div className="text-center pt-2 bounce-in">
          <div className="text-4xl mb-2">{score === questions.length ? '🎉' : '👍'}</div>
          <p className="font-display font-bold text-xl text-green-600 mb-1">{score}/{questions.length}</p>
          <div className="flex gap-3 justify-center mt-3">
            {cycleIdx + 1 < PR_EX1.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 2: Choose pronoun for noun (2 options) ─────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = PR_EX2[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx]) return
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {PR_EX2.length}</span>
        <span className="text-purple-500">{answered} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center gap-3">
              <span className="text-sm font-bold text-gray-700 flex-1">{q.noun}</span>
              <div className="flex gap-2">
                {q.options.map(opt => {
                  let cls = 'px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors'
                  if (!ans) cls += ' border-gray-300 bg-gray-50 text-gray-700 hover:bg-purple-50 hover:border-purple-300 active:scale-95'
                  else if (opt === q.answer) cls += ' border-green-400 bg-green-100 text-green-700'
                  else if (opt === ans) cls += ' border-red-300 bg-red-50 text-red-500'
                  else cls += ' border-gray-200 bg-gray-50 text-gray-400'
                  return (
                    <button key={opt} onClick={() => choose(idx, opt)} className={cls}>{opt}</button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">
            {Object.entries(answers).filter(([i,v]) => questions[+i].answer === v).length}/{total} correct!
          </p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < PR_EX2.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 3: Common pronoun — drag from word bank ────────────────────────────────

const PRONOUN_COLORS: Record<string, string> = {
  HE: 'bg-blue-500', SHE: 'bg-pink-500', IT: 'bg-gray-500',
  WE: 'bg-emerald-500', YOU: 'bg-orange-500', THEY: 'bg-purple-500',
}

function Ex3({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const groups = PR_EX3[cycleIdx]
  const pronouns = groups.map(g => g.pronoun)
  const [placed, setPlaced] = useState<Record<number, string>>({})

  const allDone = Object.keys(placed).length === groups.length

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const idxStr = targetEl.getAttribute('data-target-id')
    if (idxStr === null) return false
    const groupIdx = parseInt(idxStr)
    if (placed[groupIdx]) return false
    if (pronouns[groupIdx] !== tileId) return false
    setPlaced(prev => ({ ...prev, [groupIdx]: tileId }))
    return true
  }, [placed, pronouns])

  const unplaced = ['HE','SHE','IT','WE','YOU','THEY'].filter(p => !Object.values(placed).includes(p))

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {PR_EX3.length}</span>
        <span className="text-purple-500">{Object.keys(placed).length} / {groups.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור את שם הגוף המשותף לכל קבוצה
      </p>

      {/* Pronoun bank */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        {unplaced.map(p => (
          <DraggableTile
            key={p}
            id={p}
            label={p}
            color={PRONOUN_COLORS[p] ?? 'bg-gray-500'}
            borderColor="border-transparent"
            textColor="text-white"
            size="sm"
            onDropped={handleDrop}
          />
        ))}
      </div>

      {/* Groups */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {groups.map((g, idx) => {
          const placedPronoun = placed[idx]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-3 flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                {g.words.map(w => (
                  <span key={w} className="text-sm font-bold text-gray-700">{w}</span>
                ))}
              </div>
              <div
                data-drop-target="true"
                data-target-id={String(idx)}
                className={`min-h-[36px] rounded-xl border-2 border-dashed flex items-center justify-center ${placedPronoun ? 'border-transparent' : 'border-gray-300'}`}
              >
                {placedPronoun ? (
                  <span className={`${PRONOUN_COLORS[placedPronoun]} text-white font-display font-black text-sm px-3 py-1 rounded-lg bounce-in`}>{placedPronoun}</span>
                ) : (
                  <span className="text-gray-300 text-xs font-bold">drop here</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < PR_EX3.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 4: Drag noun to pronoun bucket ─────────────────────────────────────────

function Ex4({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const buckets = PR_EX4[cycleIdx]
  const allNouns = buckets.flatMap(b => b.nouns.map(n => ({ id: `${b.pronoun}-${n}`, noun: n, pronoun: b.pronoun })))
  const [shuffled] = useState(() => shuffle([...allNouns]))
  const [placed, setPlaced] = useState<Record<string, string>>({})
  const total = allNouns.length
  const allDone = Object.keys(placed).length === total

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const pronoun = targetEl.getAttribute('data-target-id')
    if (!pronoun || placed[tileId]) return false
    const item = allNouns.find(n => n.id === tileId)
    if (!item || item.pronoun !== pronoun) return false
    setPlaced(prev => ({ ...prev, [tileId]: pronoun }))
    return true
  }, [placed, allNouns])

  const unplaced = shuffled.filter(n => !placed[n.id])

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {PR_EX4.length}</span>
        <span className="text-purple-500">{Object.keys(placed).length} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור כל מילה לכרטיסיית שם הגוף המתאים
      </p>

      {/* Bucket grid */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {buckets.map(b => {
          const here = allNouns.filter(n => placed[n.id] === b.pronoun).map(n => n.noun)
          return (
            <div key={b.pronoun} className="flex flex-col">
              <div className={`${PRONOUN_COLORS[b.pronoun]} rounded-t-xl py-1.5 text-center`}>
                <span className="font-display font-black text-white text-sm">{b.pronoun}</span>
              </div>
              <div
                data-drop-target="true"
                data-target-id={b.pronoun}
                className="flex-1 min-h-[100px] rounded-b-xl border-2 border-gray-200 bg-gray-50 p-1.5 flex flex-col gap-1"
              >
                {here.map(n => (
                  <span key={n} className="bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-700 px-1.5 py-0.5 text-center bounce-in">{n}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Noun tile bank */}
      {!allDone && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(n => (
              <DraggableTile
                key={n.id}
                id={n.id}
                label={n.noun}
                color="bg-white"
                borderColor="border-gray-300"
                textColor="text-gray-700"
                size="sm"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}

      {allDone && (
        <div className="text-center pt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < PR_EX4.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 5: Choose pronoun in sentence ──────────────────────────────────────────

function Ex5({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = PR_EX5[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx]) return
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  const correctCount = Object.entries(answers).filter(([i, v]) => questions[+i].answer === v).length

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {PR_EX5.length}</span>
        <span className="text-purple-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4">
        Choose the correct pronoun for the <span className="underline">underlined</span> word
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const parts = q.sentence.split(q.underlined)
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl p-3 ${ans ? (ans === q.answer ? 'border-green-300' : 'border-red-300') : 'border-gray-200'}`}>
              <p className="text-sm font-bold text-gray-700 mb-2">
                {parts[0]}
                <span className="underline text-purple-700">{q.underlined}</span>
                {parts[1]}
              </p>
              <div className="flex gap-2 flex-wrap">
                {q.options.map(opt => {
                  let cls = 'px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors'
                  if (!ans) cls += ' border-gray-300 bg-gray-50 text-gray-700 hover:bg-purple-50 hover:border-purple-300 active:scale-95'
                  else if (opt === q.answer) cls += ' border-green-400 bg-green-100 text-green-700'
                  else if (opt === ans) cls += ' border-red-300 bg-red-50 text-red-500'
                  else cls += ' border-gray-200 bg-gray-50 text-gray-400'
                  return (
                    <button key={opt} onClick={() => choose(idx, opt)} className={cls}>{opt}</button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">{correctCount === total ? '🎉' : '👍'}</div>
          <p className="font-display font-bold text-xl text-green-600 mb-1">{correctCount}/{total} correct!</p>
          <div className="flex gap-3 justify-center mt-3">
            {cycleIdx + 1 < PR_EX5.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Wrapper with cycle management ─────────────────────────────────────────────

function ExWrapper({
  cycles, render,
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

// ── Page ────────────────────────────────────────────────────────────────────

export default function PronounsPage() {
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

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Pronouns 👤</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שמות גוף — אני, אתה, הוא, היא...</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}

        {tab === 'ex1' && (
          <ExWrapper
            cycles={PR_EX1.length}
            render={(c, again, done) => <Ex1 cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={PR_EX2.length}
            render={(c, again, done) => <Ex2 cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3' && (
          <ExWrapper
            cycles={PR_EX3.length}
            render={(c, again, done) => <Ex3 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex4' && (
          <ExWrapper
            cycles={PR_EX4.length}
            render={(c, again, done) => <Ex4 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex5' && (
          <ExWrapper
            cycles={PR_EX5.length}
            render={(c, again, done) => <Ex5 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
