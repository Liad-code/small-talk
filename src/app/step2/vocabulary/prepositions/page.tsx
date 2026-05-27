'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { PREPOSITIONS, PrepItem } from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz1' | 'quiz2' | 'ex1' | 'ex2'

// ── Cat-Box Illustration ──────────────────────────────────────────────────────

function CatBoxIllustration({ id }: { id: string }) {
  switch (id) {
    case 'in':
      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center px-3 py-2 border-4 border-t-0 border-amber-600 rounded-b-lg bg-amber-50" style={{ minWidth: '52px' }}>
            <span className="text-2xl leading-none">🐱</span>
          </div>
        </div>
      )
    case 'on':
      return (
        <div className="flex flex-col items-center gap-0 leading-none">
          <span className="text-3xl">🐱</span>
          <span className="text-4xl -mt-1">📦</span>
        </div>
      )
    case 'under':
      return (
        <div className="flex flex-col items-center gap-0 leading-none">
          <span className="text-4xl">📦</span>
          <span className="text-3xl -mt-1">🐱</span>
        </div>
      )
    case 'next-to':
      return (
        <div className="flex items-end gap-1 leading-none">
          <span className="text-3xl">🐱</span>
          <span className="text-4xl">📦</span>
        </div>
      )
    case 'in-front':
      return (
        <div className="relative w-16 h-12 flex items-end">
          <span className="text-4xl leading-none absolute left-1 bottom-0 opacity-60">📦</span>
          <span className="text-3xl leading-none absolute left-3 bottom-0 z-10">🐱</span>
        </div>
      )
    case 'behind':
      return (
        <div className="relative w-16 h-12 flex items-end">
          <span className="text-3xl leading-none absolute left-0 bottom-0 z-0 opacity-75">🐱</span>
          <span className="text-4xl leading-none absolute left-5 bottom-0 z-10">📦</span>
        </div>
      )
    case 'between':
      return (
        <div className="flex items-end gap-1 leading-none">
          <span className="text-3xl">📦</span>
          <span className="text-3xl">🐱</span>
          <span className="text-3xl">📦</span>
        </div>
      )
    default:
      return <span className="text-4xl leading-none">📦</span>
  }
}

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  const speak = useSpeak()
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <p className="text-center font-bold text-gray-500 text-sm" dir="rtl">
        לחץ על כל כרטיס כדי לשמוע את מילת היחס
      </p>
      <div className="grid grid-cols-2 gap-3">
        {PREPOSITIONS.map(p => (
          <button
            key={p.id}
            onClick={() => speak(p.name, 0.8)}
            className="bg-white border-4 border-purple-200 rounded-2xl px-3 py-4 flex flex-col items-center gap-2
                       hover:bg-purple-50 active:scale-95 transition-all cursor-pointer"
          >
            <div className="h-14 flex items-center justify-center">
              <CatBoxIllustration id={p.id} />
            </div>
            <span className="font-display font-black text-purple-800 text-lg">{p.name}</span>
            <span className="font-bold text-gray-500 text-sm" dir="rtl">{p.hebrew}</span>
          </button>
        ))}
      </div>

      <div className="bg-purple-50 border-4 border-purple-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-purple-200 bg-purple-100 border-b-4 border-purple-200">
          <div className="py-2 text-center font-bold text-purple-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-purple-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-purple-700 text-xs">Scene</div>
        </div>
        {PREPOSITIONS.map((p, i) => (
          <div key={p.id} className={`grid grid-cols-3 divide-x divide-purple-200 ${i % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}`}>
            <div className="py-2 px-2 font-bold text-gray-800 text-sm">{p.name}</div>
            <div className="py-2 px-2 font-bold text-gray-700 text-sm text-center" dir="rtl">{p.hebrew}</div>
            <div className="py-2 text-center text-xl">{p.scene}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Quiz 1: hear word → pick scene ───────────────────────────────────────────

function Quiz1Inner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<PrepItem[]>(() => shuffle([...PREPOSITIONS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<PrepItem[]>(() => {
    const cur = queue[0]
    const others = PREPOSITIONS.filter(p => p.id !== cur.id)
    return shuffle([cur, ...shuffle(others).slice(0, 3)])
  })
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[idx]

  function handleAnswer(id: string) {
    if (wrong) return
    if (id === current.id) {
      setScore(s => s + 1)
      const next = idx + 1
      if (next >= queue.length) { setDone(true); return }
      const nextItem = queue[next]
      const others = PREPOSITIONS.filter(p => p.id !== nextItem.id)
      setOptions(shuffle([nextItem, ...shuffle(others).slice(0, 3)]))
      setIdx(next)
      setTimeout(() => speak(queue[next].name, 0.8), 1000)
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) return (
    <div className="text-center py-12 px-4 bounce-in">
      <div className="text-5xl mb-4">⭐</div>
      <p className="font-display font-bold text-2xl text-purple-700">{score}/{queue.length} correct!</p>
      <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
      <button onClick={onAgain} className="btn-kid bg-purple-500">🔁 Again</button>
    </div>
  )

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-purple-500">✅ {score}</span>
      </div>
      <div className="flex flex-col items-center gap-3 mb-8">
        <button
          onClick={() => current && speak(current.name, 0.8)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >🔊</button>
        <p className="text-sm font-bold text-gray-500" dir="rtl">האזן ובחר את הסצנה הנכונה</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            className={`
              rounded-2xl border-4 py-6 flex flex-col items-center gap-1 text-4xl
              transition-all duration-150 cursor-pointer select-none
              ${wrong === opt.id ? 'bg-red-100 border-red-400 shake' : 'bg-purple-50 border-purple-200 hover:bg-purple-100 hover:scale-105 active:scale-95'}
            `}
          >
            <div className="h-14 flex items-center justify-center">
              <CatBoxIllustration id={opt.id} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Quiz1Tab() {
  const [k, setK] = useState(0)
  return <Quiz1Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Quiz 2: see scene → pick word ─────────────────────────────────────────────

function Quiz2Inner({ onAgain }: { onAgain: () => void }) {
  const [queue] = useState<PrepItem[]>(() => shuffle([...PREPOSITIONS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<PrepItem[]>(() => {
    const cur = queue[0]
    const others = PREPOSITIONS.filter(p => p.id !== cur.id)
    return shuffle([cur, ...shuffle(others).slice(0, 3)])
  })
  const [correct, setCorrect] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function handleAnswer(id: string) {
    if (correct || done) return
    const cur = queue[idx]
    if (id === cur.id) {
      setCorrect(id)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        const next = idx + 1
        if (next >= queue.length) { setDone(true); return }
        const nextItem = queue[next]
        const others = PREPOSITIONS.filter(p => p.id !== nextItem.id)
        setOptions(shuffle([nextItem, ...shuffle(others).slice(0, 3)]))
        setIdx(next)
      }, 600)
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) return (
    <div className="text-center py-12 px-4 bounce-in">
      <div className="text-5xl mb-4">⭐</div>
      <p className="font-display font-bold text-2xl text-purple-700">{score}/{queue.length} correct!</p>
      <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
      <button onClick={onAgain} className="btn-kid bg-purple-500">🔁 Again</button>
    </div>
  )

  const cur = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-purple-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את המילה הנכונה</p>
      <div className="flex justify-center mb-8 py-6">
        <div className="scale-[2.5]">
          <CatBoxIllustration id={cur?.id ?? ''} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            className={`
              rounded-2xl border-4 py-4 font-display font-black text-lg
              transition-all duration-150 cursor-pointer select-none
              ${correct === opt.id ? 'bg-green-200 border-green-400 text-green-800 scale-105' : ''}
              ${wrong === opt.id ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
              ${!correct && wrong !== opt.id ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100 hover:scale-105 active:scale-95' : ''}
            `}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function Quiz2Tab() {
  const [k, setK] = useState(0)
  return <Quiz2Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex1: Word | 3 scene options table ────────────────────────────────────────

interface Ex1Row { item: PrepItem; choices: PrepItem[]; answered: string | null }

function Ex1Inner({ onAgain }: { onAgain: () => void }) {
  const [rows] = useState<Ex1Row[]>(() =>
    PREPOSITIONS.map(item => {
      const others = shuffle(PREPOSITIONS.filter(p => p.id !== item.id)).slice(0, 2)
      return { item, choices: shuffle([item, ...others]), answered: null }
    })
  )
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const score = Object.entries(answers).filter(([id, ans]) => ans === id).length
  const allDone = Object.keys(answers).length === PREPOSITIONS.length

  function handlePick(itemId: string, choiceId: string) {
    if (answers[itemId] !== undefined) return
    setAnswers(prev => ({ ...prev, [itemId]: choiceId }))
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">בחר את הסצנה הנכונה לכל מילה</p>
        <span className="text-purple-500">✅ {score}/{PREPOSITIONS.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map(({ item, choices }) => {
          const ans = answers[item.id]
          const isCorrect = ans === item.id
          const isWrong = ans !== undefined && !isCorrect
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-3 py-3 rounded-2xl border-4 transition-all
                ${isCorrect ? 'bg-green-100 border-green-400' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-purple-200'}`}
            >
              <span className="font-display font-black text-purple-800 w-24 text-base shrink-0">{item.name}</span>
              <div className="flex gap-2 flex-1 justify-end">
                {choices.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => handlePick(item.id, ch.id)}
                    disabled={ans !== undefined}
                    className={`rounded-xl p-1 border-2 transition-all w-16 h-14 flex items-center justify-center overflow-hidden
                      ${ans !== undefined && ch.id === item.id ? 'bg-green-200 border-green-400' : ''}
                      ${ans !== undefined && ch.id !== item.id ? 'opacity-40 border-transparent' : ''}
                      ${ans === undefined ? 'bg-purple-50 border-purple-200 hover:bg-purple-100 hover:scale-110 active:scale-90 cursor-pointer' : ''}
                    `}
                  >
                    <CatBoxIllustration id={ch.id} />
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {allDone && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-purple-600 mb-3">{score}/{PREPOSITIONS.length} correct!</p>
          <button onClick={onAgain} className="btn-kid bg-purple-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex1Tab() {
  const [k, setK] = useState(0)
  return <Ex1Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex2: Fill-in-the-blank sentences ─────────────────────────────────────────

function prepId(correct: string): string {
  if (correct === 'next to') return 'next-to'
  if (correct === 'in front of') return 'in-front'
  return correct
}

interface SentenceItem {
  scene: string
  sentence: string
  correct: string
  choices: [string, string]
}

const SENTENCES: SentenceItem[] = [
  { scene: '🐱📦', sentence: 'The cat is ___ the box.',       correct: 'in',          choices: ['in', 'on']          },
  { scene: '🐱🛋️', sentence: 'The cat is ___ the sofa.',      correct: 'on',          choices: ['on', 'under']       },
  { scene: '🐱🛏️', sentence: 'The cat is ___ the bed.',       correct: 'under',       choices: ['under', 'in']       },
  { scene: '🐱🌳', sentence: 'The cat stands ___ the tree.',   correct: 'next to',     choices: ['next to', 'behind'] },
  { scene: '🌲🐱', sentence: 'The cat hides ___ the tree.',    correct: 'behind',      choices: ['behind', 'in front of'] },
  { scene: '🌳🐱🌳', sentence: 'The cat sits ___ the trees.', correct: 'between',     choices: ['between', 'next to'] },
  { scene: '🐱🏠', sentence: 'The cat waits ___ the house.',   correct: 'in front of', choices: ['in front of', 'behind'] },
  { scene: '🍎📦', sentence: 'The apple is ___ the box.',      correct: 'in',          choices: ['in', 'on']          },
  { scene: '📚🐱', sentence: 'The cat is ___ the books.',      correct: 'on',          choices: ['on', 'under']       },
  { scene: '🐕🐱🐕', sentence: 'The cat sits ___ the dogs.',   correct: 'between',     choices: ['between', 'next to'] },
]

function Ex2Inner({ onAgain }: { onAgain: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const score = Object.entries(answers).filter(([i, ans]) => ans === SENTENCES[Number(i)].correct).length
  const allDone = Object.keys(answers).length === SENTENCES.length

  function handlePick(i: number, choice: string) {
    if (answers[i] !== undefined) return
    setAnswers(prev => ({ ...prev, [i]: choice }))
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">בחר את מילת היחס הנכונה</p>
        <span className="text-purple-500">✅ {score}/{SENTENCES.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {SENTENCES.map((s, i) => {
          const ans = answers[i]
          const isCorrect = ans === s.correct
          const isWrong = ans !== undefined && !isCorrect
          return (
            <div
              key={i}
              className={`rounded-2xl border-4 p-3 transition-all
                ${isCorrect ? 'bg-green-100 border-green-400' : isWrong ? 'bg-red-100 border-red-400' : 'bg-white border-purple-200'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="shrink-0 flex items-center justify-center w-12 h-10">
                  <CatBoxIllustration id={prepId(s.correct)} />
                </div>
                <p className="font-bold text-gray-700 text-sm flex-1">{s.sentence}</p>
              </div>
              <div className="flex gap-2 justify-center">
                {s.choices.map(ch => (
                  <button
                    key={ch}
                    onClick={() => handlePick(i, ch)}
                    disabled={ans !== undefined}
                    className={`flex-1 py-2 rounded-xl border-2 font-display font-black text-sm transition-all
                      ${ans === ch && ch === s.correct ? 'bg-green-200 border-green-400 text-green-800' : ''}
                      ${ans === ch && ch !== s.correct ? 'bg-red-200 border-red-400 text-red-800' : ''}
                      ${ans !== ch && ans !== undefined ? 'opacity-40 border-gray-200 bg-gray-50 text-gray-400' : ''}
                      ${ans === undefined ? 'bg-purple-50 border-purple-300 text-purple-800 hover:bg-purple-100 active:scale-95 cursor-pointer' : ''}
                    `}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {allDone && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-purple-600 mb-3">{score}/{SENTENCES.length} correct!</p>
          <button onClick={onAgain} className="btn-kid bg-purple-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex2Tab() {
  const [k, setK] = useState(0)
  return <Ex2Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn'    },
  { id: 'quiz1', label: '🔊 Quiz 1'  },
  { id: 'quiz2', label: '🎯 Quiz 2'  },
  { id: 'ex1',   label: '🖼️ Match'   },
  { id: 'ex2',   label: '✏️ Fill In'  },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function PrepositionsPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Prepositions 📍</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">מילות יחס — 7 מילים</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>
      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'quiz1' && <Quiz1Tab />}
        {tab === 'quiz2' && <Quiz2Tab />}
        {tab === 'ex1'   && <Ex1Tab />}
        {tab === 'ex2'   && <Ex2Tab />}
      </div>
    </div>
  )
}
