'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { ACTIONS, ActionItem } from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz1' | 'quiz2' | 'ex1' | 'ex2'

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  const speak = useSpeak()
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <p className="text-center font-bold text-gray-500 text-sm" dir="rtl">
        לחץ על כל פעולה כדי לשמוע את שמה באנגלית
      </p>
      <div className="grid grid-cols-3 gap-2">
        {ACTIONS.map(a => (
          <button
            key={a.id}
            onClick={() => speak(a.name, 0.8)}
            className="bg-white border-4 border-emerald-200 rounded-2xl px-2 py-3 flex flex-col items-center gap-1
                       hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-5xl">{a.emoji}</span>
            <span className="font-display font-black text-emerald-800 text-sm leading-tight text-center">{a.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-emerald-50 border-4 border-emerald-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-emerald-200 bg-emerald-100 border-b-4 border-emerald-200">
          <div className="py-2 text-center font-bold text-emerald-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-emerald-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-emerald-700 text-xs">Pic</div>
        </div>
        {ACTIONS.map((a, i) => (
          <div key={a.id} className={`grid grid-cols-3 divide-x divide-emerald-200 ${i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/50'}`}>
            <div className="py-2 px-2 font-bold text-gray-800 text-sm">{a.name}</div>
            <div className="py-2 px-2 font-bold text-gray-700 text-sm text-center" dir="rtl">{a.hebrew}</div>
            <div className="py-2 text-center text-xl">{a.emoji}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Quiz 1: hear word → pick emoji ───────────────────────────────────────────

function Quiz1Inner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<ActionItem[]>(() => shuffle([...ACTIONS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<ActionItem[]>(() => {
    const cur = queue[0]
    const others = ACTIONS.filter(a => a.id !== cur.id)
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
      const others = ACTIONS.filter(a => a.id !== nextItem.id)
      setOptions(shuffle([nextItem, ...shuffle(others).slice(0, 3)]))
      setIdx(next)
      setTimeout(() => speak(nextItem.name, 0.8), 1000)
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) return (
    <div className="text-center py-12 px-4 bounce-in">
      <div className="text-5xl mb-4">⭐</div>
      <p className="font-display font-bold text-2xl text-emerald-700">{score}/{queue.length} correct!</p>
      <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
      <button onClick={onAgain} className="btn-kid bg-emerald-500">🔁 Again</button>
    </div>
  )

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-emerald-500">✅ {score}</span>
      </div>
      <div className="flex flex-col items-center gap-3 mb-8">
        <button
          onClick={() => current && speak(current.name, 0.8)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >🔊</button>
        <p className="text-sm font-bold text-gray-500" dir="rtl">האזן ובחר את הפעולה הנכונה</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            className={`
              rounded-2xl border-4 py-4 flex flex-col items-center gap-1
              transition-all duration-150 cursor-pointer select-none
              ${wrong === opt.id ? 'bg-red-100 border-red-400 shake' : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:scale-105 active:scale-95'}
            `}
          >
            <span className="text-5xl">{opt.emoji}</span>
            <span className="font-bold text-xs text-gray-500">{opt.name}</span>
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

// ── Quiz 2: see emoji → pick word ─────────────────────────────────────────────

function Quiz2Inner({ onAgain }: { onAgain: () => void }) {
  const [queue] = useState<ActionItem[]>(() => shuffle([...ACTIONS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<ActionItem[]>(() => {
    const cur = queue[0]
    const others = ACTIONS.filter(a => a.id !== cur.id)
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
        const others = ACTIONS.filter(a => a.id !== nextItem.id)
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
      <p className="font-display font-bold text-2xl text-emerald-700">{score}/{queue.length} correct!</p>
      <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
      <button onClick={onAgain} className="btn-kid bg-emerald-500">🔁 Again</button>
    </div>
  )

  const cur = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-emerald-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את השם הנכון</p>
      <div className="flex justify-center mb-8">
        <div className="text-8xl">{cur?.emoji}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            className={`
              rounded-2xl border-4 py-4 font-display font-black text-xl
              transition-all duration-150 cursor-pointer select-none
              ${correct === opt.id ? 'bg-green-200 border-green-400 text-green-800 scale-105' : ''}
              ${wrong === opt.id ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
              ${!correct && wrong !== opt.id ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 hover:scale-105 active:scale-95' : ''}
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

// ── Ex1: Word | 3 image options table ────────────────────────────────────────

function Ex1Inner({ onAgain }: { onAgain: () => void }) {
  const [rows] = useState(() =>
    ACTIONS.map(item => {
      const others = shuffle(ACTIONS.filter(a => a.id !== item.id)).slice(0, 2)
      return { item, choices: shuffle([item, ...others]) }
    })
  )
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const score = Object.entries(answers).filter(([id, ans]) => ans === id).length
  const allDone = Object.keys(answers).length === ACTIONS.length

  function handlePick(itemId: string, choiceId: string) {
    if (answers[itemId] !== undefined) return
    setAnswers(prev => ({ ...prev, [itemId]: choiceId }))
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">בחר את התמונה הנכונה לכל פעולה</p>
        <span className="text-emerald-500">✅ {score}/{ACTIONS.length}</span>
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
                ${isCorrect ? 'bg-green-100 border-green-400' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-emerald-200'}`}
            >
              <span className="font-display font-black text-emerald-800 w-14 text-sm shrink-0">{item.name}</span>
              <div className="flex gap-2 flex-1 justify-end">
                {choices.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => handlePick(item.id, ch.id)}
                    disabled={ans !== undefined}
                    className={`text-3xl leading-none rounded-xl p-2 border-2 transition-all
                      ${ans !== undefined && ch.id === item.id ? 'bg-green-200 border-green-400' : ''}
                      ${ans !== undefined && ch.id !== item.id ? 'opacity-40 border-transparent' : ''}
                      ${ans === undefined ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:scale-110 active:scale-90 cursor-pointer' : ''}
                    `}
                  >
                    {ch.emoji}
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
          <p className="font-display font-bold text-xl text-emerald-600 mb-3">{score}/{ACTIONS.length} correct!</p>
          <button onClick={onAgain} className="btn-kid bg-emerald-500">🔁 Again</button>
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

const ACTION_SENTENCES = [
  { scene: '🥤🐱', sentence: 'The cat likes to ___ milk.',        correct: 'drink', choices: ['drink', 'eat']   },
  { scene: '🏃👦', sentence: 'He loves to ___ in the park.',       correct: 'run',   choices: ['run',   'walk']  },
  { scene: '💃👧', sentence: 'She likes to ___ to music.',         correct: 'dance', choices: ['dance', 'jump']  },
  { scene: '📖👦', sentence: 'He likes to ___ books.',             correct: 'read',  choices: ['read',  'write'] },
  { scene: '🎤🎵', sentence: 'She loves to ___ songs.',            correct: 'sing',  choices: ['sing',  'talk']  },
  { scene: '🏊🌊', sentence: 'They like to ___ in the sea.',       correct: 'swim',  choices: ['swim',  'run']   },
  { scene: '😴🛏️', sentence: 'The baby likes to ___ all day.',     correct: 'sleep', choices: ['sleep', 'sit']   },
  { scene: '🎮👦', sentence: 'He likes to ___ video games.',       correct: 'play',  choices: ['play',  'write'] },
  { scene: '✍️📝', sentence: 'She likes to ___ in her diary.',     correct: 'write', choices: ['write', 'read']  },
  { scene: '😢👧', sentence: 'The baby starts to ___.',            correct: 'cry',   choices: ['cry',   'sing']  },
]

function Ex2Inner({ onAgain }: { onAgain: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const score = Object.entries(answers).filter(([i, ans]) => ans === ACTION_SENTENCES[Number(i)].correct).length
  const allDone = Object.keys(answers).length === ACTION_SENTENCES.length

  function handlePick(i: number, choice: string) {
    if (answers[i] !== undefined) return
    setAnswers(prev => ({ ...prev, [i]: choice }))
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">בחר את הפעולה הנכונה</p>
        <span className="text-emerald-500">✅ {score}/{ACTION_SENTENCES.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {ACTION_SENTENCES.map((s, i) => {
          const ans = answers[i]
          const isCorrect = ans === s.correct
          const isWrong = ans !== undefined && !isCorrect
          return (
            <div
              key={i}
              className={`rounded-2xl border-4 p-3 transition-all
                ${isCorrect ? 'bg-green-100 border-green-400' : isWrong ? 'bg-red-100 border-red-400' : 'bg-white border-emerald-200'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{s.scene}</span>
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
                      ${ans === undefined ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 active:scale-95 cursor-pointer' : ''}
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
          <p className="font-display font-bold text-xl text-emerald-600 mb-3">{score}/{ACTION_SENTENCES.length} correct!</p>
          <button onClick={onAgain} className="btn-kid bg-emerald-500">🔁 Again</button>
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

export default function ActionsPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Actions 🏃</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">פעולות — 18 מילים</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
