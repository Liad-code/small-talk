'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { FRUIT_VEG, FruitVegItem } from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz1' | 'quiz2' | 'ex1' | 'ex2'

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  const speak = useSpeak()
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <p className="text-center font-bold text-gray-500 text-sm" dir="rtl">
        לחץ על כל פרי/ירק כדי לשמוע את שמו באנגלית
      </p>
      <div className="grid grid-cols-3 gap-2">
        {FRUIT_VEG.map(f => (
          <button
            key={f.id}
            onClick={() => speak(f.name, 0.8)}
            className="bg-white border-4 border-red-200 rounded-2xl px-2 py-3 flex flex-col items-center gap-1
                       hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-5xl">{f.emoji}</span>
            <span className="font-display font-black text-red-800 text-sm leading-tight text-center">{f.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-red-50 border-4 border-red-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-6 divide-x divide-red-200 bg-red-100 border-b-4 border-red-200">
          <div className="py-2 text-center font-bold text-red-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-red-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-red-700 text-xs">Pic</div>
          <div className="py-2 text-center font-bold text-red-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-red-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-red-700 text-xs">Pic</div>
        </div>
        {Array.from({ length: Math.ceil(FRUIT_VEG.length / 2) }, (_, i) => {
          const f1 = FRUIT_VEG[i * 2]; const f2 = FRUIT_VEG[i * 2 + 1]
          return (
            <div key={i} className={`grid grid-cols-6 divide-x divide-red-200 ${i % 2 === 0 ? 'bg-white' : 'bg-red-50/50'}`}>
              <div className="py-1.5 px-1 font-bold text-gray-800 text-xs">{f1.name}</div>
              <div className="py-1.5 px-1 font-bold text-gray-700 text-xs text-center" dir="rtl">{f1.hebrew}</div>
              <div className="py-1.5 text-center text-lg">{f1.emoji}</div>
              {f2 ? (
                <>
                  <div className="py-1.5 px-1 font-bold text-gray-800 text-xs">{f2.name}</div>
                  <div className="py-1.5 px-1 font-bold text-gray-700 text-xs text-center" dir="rtl">{f2.hebrew}</div>
                  <div className="py-1.5 text-center text-lg">{f2.emoji}</div>
                </>
              ) : <><div /><div /><div /></>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Quiz 1: hear word → pick emoji ───────────────────────────────────────────

function Quiz1Inner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<FruitVegItem[]>(() => shuffle([...FRUIT_VEG]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<FruitVegItem[]>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[idx]

  useEffect(() => {
    if (!current) return
    const others = FRUIT_VEG.filter(f => f.id !== current.id)
    setOptions(shuffle([current, ...shuffle(others).slice(0, 3)]))
  }, [current])

  function handleAnswer(id: string) {
    if (wrong) return
    if (id === current.id) {
      setScore(s => s + 1)
      const next = idx + 1
      if (next >= queue.length) setDone(true)
      else {
        setIdx(next)
        setTimeout(() => speak(queue[next].name, 0.8), 1000)
      }
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-red-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-red-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-red-500">✅ {score}</span>
      </div>
      <div className="flex flex-col items-center gap-3 mb-8">
        <button
          onClick={() => current && speak(current.name, 0.8)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >🔊</button>
        <p className="text-sm font-bold text-gray-500" dir="rtl">האזן ובחר את הפרי/ירק הנכון</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isWrong = wrong === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              className={`
                rounded-2xl border-4 py-4 flex flex-col items-center gap-1
                transition-all duration-150 cursor-pointer select-none
                ${isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-orange-50 border-orange-200 hover:bg-orange-100 hover:scale-105 active:scale-95'}
              `}
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="font-bold text-sm text-gray-500">{opt.name}</span>
            </button>
          )
        })}
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
  const [queue] = useState<FruitVegItem[]>(() => shuffle([...FRUIT_VEG]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<FruitVegItem[]>([])
  const [correct, setCorrect] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const cur = queue[idx]
    if (!cur) return
    const others = FRUIT_VEG.filter(f => f.id !== cur.id)
    setOptions(shuffle([cur, ...shuffle(others).slice(0, 3)]))
  }, [idx, queue])

  function handleAnswer(id: string) {
    if (correct || done) return
    const cur = queue[idx]
    if (id === cur.id) {
      setCorrect(id)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        const next = idx + 1
        if (next >= queue.length) setDone(true)
        else setIdx(next)
      }, 600)
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-red-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-red-500">🔁 Again</button>
      </div>
    )
  }

  const cur = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-red-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את שם הירק/פרי המופיע בתמונה</p>
      <div className="flex justify-center mb-8">
        <div className="text-8xl">{cur?.emoji}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isCorrect = correct === opt.id
          const isWrong = wrong === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              className={`
                rounded-2xl border-4 py-4 font-display font-black text-xl
                transition-all duration-150 cursor-pointer select-none
                ${isCorrect ? 'bg-green-200 border-green-400 text-green-800 scale-105' : ''}
                ${isWrong ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
                ${!isCorrect && !isWrong ? 'bg-orange-50 border-orange-300 text-orange-900 hover:bg-orange-100 hover:scale-105 active:scale-95' : ''}
              `}
            >
              {opt.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Quiz2Tab() {
  const [k, setK] = useState(0)
  return <Quiz2Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex1: Word Search (3 rounds) ───────────────────────────────────────────────

const WS_COLS = 8
const WS_ROWS = 10
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const WS_ROUNDS: FruitVegItem[][] = [
  FRUIT_VEG.slice(0, 5),
  FRUIT_VEG.slice(5, 10),
  FRUIT_VEG.slice(10),
]

interface WsPlacement { word: string; row: number; col: number; dir: 'h' | 'v' }

function generateWordSearch(items: FruitVegItem[]): { grid: string[][]; placements: WsPlacement[] } {
  const words = items.map(f => f.name.toUpperCase())
  const grid: string[][] = Array(WS_ROWS).fill(null).map(() => Array(WS_COLS).fill(''))
  const placements: WsPlacement[] = []
  const sorted = [...words].sort((a, b) => b.length - a.length)

  for (const word of sorted) {
    let placed = false
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const dir: 'h' | 'v' = Math.random() < 0.5 ? 'h' : 'v'
      const maxRow = dir === 'h' ? WS_ROWS - 1 : WS_ROWS - word.length
      const maxCol = dir === 'h' ? WS_COLS - word.length : WS_COLS - 1
      if (maxRow < 0 || maxCol < 0) continue
      const row = Math.floor(Math.random() * (maxRow + 1))
      const col = Math.floor(Math.random() * (maxCol + 1))
      let valid = true
      for (let i = 0; i < word.length; i++) {
        const r = dir === 'h' ? row : row + i
        const c = dir === 'h' ? col + i : col
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) { valid = false; break }
      }
      if (valid) {
        for (let i = 0; i < word.length; i++) {
          const r = dir === 'h' ? row : row + i
          const c = dir === 'h' ? col + i : col
          grid[r][c] = word[i]
        }
        placements.push({ word, row, col, dir })
        placed = true
      }
    }
  }

  for (let r = 0; r < WS_ROWS; r++)
    for (let c = 0; c < WS_COLS; c++)
      if (grid[r][c] === '') grid[r][c] = ALPHA[Math.floor(Math.random() * 26)]

  return { grid, placements }
}

function WordSearchRound({ items, roundIdx, totalRounds, onNext, onRestart }: {
  items: FruitVegItem[]
  roundIdx: number
  totalRounds: number
  onNext: () => void
  onRestart: () => void
}) {
  const [{ grid, placements }] = useState(() => generateWordSearch(items))
  const [found, setFound] = useState<Set<string>>(new Set())
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set())
  const [selPath, setSelPath] = useState<[number, number][]>([])
  const [flashRed, setFlashRed] = useState(false)

  const allFound = found.size === placements.length

  function cellKey(r: number, c: number) { return `${r},${c}` }

  function handleCellClick(r: number, c: number) {
    if (flashRed) return
    const key = cellKey(r, c)
    if (highlighted.has(key)) return

    const selKeys = new Set(selPath.map(([pr, pc]) => cellKey(pr, pc)))
    if (selKeys.has(key)) { setSelPath([]); return }

    if (selPath.length === 0) { setSelPath([[r, c]]); return }

    const [lastR, lastC] = selPath[selPath.length - 1]
    const dr = r - lastR
    const dc = c - lastC

    if (Math.abs(dr) + Math.abs(dc) !== 1) {
      setFlashRed(true)
      setTimeout(() => { setFlashRed(false); setSelPath([]) }, 400)
      return
    }

    if (selPath.length >= 2) {
      const dir = selPath[1][0] === selPath[0][0] ? 'h' : 'v'
      if ((dir === 'h' && dr !== 0) || (dir === 'v' && dc !== 0)) {
        setFlashRed(true)
        setTimeout(() => { setFlashRed(false); setSelPath([]) }, 400)
        return
      }
    }

    const newPath: [number, number][] = [...selPath, [r, c]]
    const letters = newPath.map(([pr, pc]) => grid[pr][pc]).join('')
    const match = placements.find(p => p.word === letters && !found.has(p.word))
    if (match) {
      setFound(prev => { const s = new Set<string>(); prev.forEach(v => s.add(v)); s.add(match.word); return s })
      const newHighlighted = new Set(highlighted)
      newPath.forEach(([pr, pc]) => newHighlighted.add(cellKey(pr, pc)))
      setHighlighted(newHighlighted)
      setSelPath([])
    } else {
      setSelPath(newPath)
    }
  }

  const selKeys = new Set(selPath.map(([r, c]) => cellKey(r, c)))
  const cellPx = Math.floor((Math.min(340, typeof window !== 'undefined' ? window.innerWidth - 32 : 340)) / WS_COLS)

  return (
    <div className="max-w-sm mx-auto px-2 pb-16">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">לחץ על האותיות אחת אחת ומצא את המילים</p>
        <span className="text-xs font-bold text-red-500">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>
      <div className="flex justify-center mb-3 text-sm font-bold text-gray-500">
        {found.size} / {placements.length} מילים נמצאו
      </div>

      <div className={`border-2 mb-4 select-none ${flashRed ? 'border-red-400' : 'border-gray-300'}`} style={{ width: 'fit-content' }}>
        {Array.from({ length: WS_ROWS }, (_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: WS_COLS }, (_, c) => {
              const key = cellKey(r, c)
              const isFound = highlighted.has(key)
              const isSel = selKeys.has(key)
              return (
                <div
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                    flex items-center justify-center border border-gray-100 cursor-pointer select-none
                    font-display font-black transition-colors duration-100
                    ${isFound ? 'bg-green-200 text-green-800' : flashRed && isSel ? 'bg-red-200 text-red-800' : isSel ? 'bg-yellow-200 text-yellow-800' : 'bg-white text-gray-700'}
                  `}
                  style={{ width: cellPx, height: cellPx, fontSize: Math.max(9, cellPx - 10) }}
                >
                  {grid[r][c]}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {items.map(f => {
          const isFound = found.has(f.name.toUpperCase())
          return (
            <div
              key={f.id}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl border-2 text-sm font-bold
                ${isFound ? 'bg-green-100 border-green-400 text-green-700 line-through' : 'bg-white border-gray-200 text-gray-700'}`}
            >
              <span className="text-lg">{f.emoji}</span>
              <span>{f.name}</span>
            </div>
          )
        })}
      </div>

      {allFound && (
        <div className="text-center mt-3 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          {roundIdx + 1 < totalRounds ? (
            <>
              <p className="font-display font-bold text-xl text-green-600 mb-3">סבב {roundIdx + 1} הושלם!</p>
              <button onClick={onNext} className="btn-kid bg-red-500">סבב הבא →</button>
            </>
          ) : (
            <>
              <p className="font-display font-bold text-xl text-green-600 mb-3">כל המילים נמצאו! 🌟</p>
              <button onClick={onRestart} className="btn-kid bg-red-500">🔁 Again</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Ex1Tab() {
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)
  return (
    <WordSearchRound
      key={`${round}-${k}`}
      items={WS_ROUNDS[round]}
      roundIdx={round}
      totalRounds={WS_ROUNDS.length}
      onNext={() => setRound(r => r + 1)}
      onRestart={() => { setRound(0); setK(n => n + 1) }}
    />
  )
}

// ── Ex2: I Spy (3 rounds) ─────────────────────────────────────────────────────

interface ISpyItem { id: string; name: string; emoji: string; count: number }

const I_SPY_ROUNDS: ISpyItem[][] = [
  [
    { id: 'watermelon', name: 'watermelon', emoji: '🍉', count: 3 },
    { id: 'strawberry', name: 'strawberry', emoji: '🍓', count: 2 },
    { id: 'grapes',     name: 'grapes',     emoji: '🍇', count: 4 },
    { id: 'cherry',     name: 'cherry',     emoji: '🍒', count: 3 },
    { id: 'peach',      name: 'peach',      emoji: '🍑', count: 2 },
    { id: 'pear',       name: 'pear',       emoji: '🍐', count: 4 },
    { id: 'lemon',      name: 'lemon',      emoji: '🍋', count: 3 },
  ],
  [
    { id: 'tomato',     name: 'tomato',     emoji: '🍅', count: 4 },
    { id: 'carrot',     name: 'carrot',     emoji: '🥕', count: 5 },
    { id: 'broccoli',   name: 'broccoli',   emoji: '🥦', count: 2 },
    { id: 'cucumber',   name: 'cucumber',   emoji: '🥒', count: 3 },
    { id: 'potato',     name: 'potato',     emoji: '🥔', count: 4 },
    { id: 'pepper',     name: 'pepper',     emoji: '🫑', count: 2 },
    { id: 'onion',      name: 'onion',      emoji: '🧅', count: 3 },
  ],
  [
    { id: 'grapes2',    name: 'grapes',     emoji: '🍇', count: 3 },
    { id: 'peach2',     name: 'peach',      emoji: '🍑', count: 4 },
    { id: 'tomato2',    name: 'tomato',     emoji: '🍅', count: 2 },
    { id: 'carrot2',    name: 'carrot',     emoji: '🥕', count: 3 },
    { id: 'potato2',    name: 'potato',     emoji: '🥔', count: 5 },
    { id: 'pepper2',    name: 'pepper',     emoji: '🫑', count: 3 },
    { id: 'lemon2',     name: 'lemon',      emoji: '🍋', count: 2 },
  ],
]

function ISpyRound({ items, roundIdx, totalRounds, onNext, onRestart }: {
  items: ISpyItem[]
  roundIdx: number
  totalRounds: number
  onNext: () => void
  onRestart: () => void
}) {
  const [layout] = useState(() => {
    const all: { id: string; emoji: string }[] = []
    items.forEach(item => {
      for (let i = 0; i < item.count; i++) all.push({ id: `${item.id}-${i}`, emoji: item.emoji })
    })
    return shuffle(all)
  })
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flash, setFlash] = useState<Record<string, 'correct' | 'wrong'>>({})
  const [done, setDone] = useState(false)

  function handlePick(id: string, count: number) {
    const item = items.find(x => x.id === id)!
    const correct = count === item.count
    setAnswers(prev => ({ ...prev, [id]: count }))
    setFlash(prev => ({ ...prev, [id]: correct ? 'correct' : 'wrong' }))
    setTimeout(() => {
      setFlash(prev => { const n = { ...prev }; delete n[id]; return n })
      if (correct) {
        setAnswers(prev => {
          const next = { ...prev, [id]: count }
          if (items.every(x => next[x.id] === x.count)) setDone(true)
          return next
        })
      } else {
        setAnswers(prev => { const n = { ...prev }; delete n[id]; return n })
      }
    }, 700)
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">🎉</div>
        {roundIdx + 1 < totalRounds ? (
          <>
            <p className="font-display font-bold text-2xl text-red-700" dir="rtl">סבב {roundIdx + 1} הושלם!</p>
            <button onClick={onNext} className="btn-kid bg-red-500 mt-6">סבב הבא →</button>
          </>
        ) : (
          <>
            <p className="font-display font-bold text-2xl text-red-700" dir="rtl">כל הכבוד! מצאת הכל!</p>
            <button onClick={onRestart} className="btn-kid bg-red-500 mt-6">🔁 Again</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between items-center mb-1">
        <p className="font-display font-bold text-red-700 text-lg">🔍 I Spy</p>
        <span className="text-xs font-bold text-red-500">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>
      <p className="font-bold text-gray-500 text-xs mb-3" dir="rtl">
        ספור כמה פעמים כל פרי/ירק מופיע ולחץ על המספר הנכון
      </p>

      <div className="bg-gradient-to-b from-sky-50 to-green-50 border-4 border-green-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-1 justify-center">
          {layout.map(cell => (
            <span key={cell.id} className="text-2xl">{cell.emoji}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {items.map(item => {
          const answered = answers[item.id]
          const f = flash[item.id]
          const isCorrect = answered === item.count
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-4 transition-all
                ${f === 'correct' ? 'bg-green-100 border-green-400' : f === 'wrong' ? 'bg-red-100 border-red-400 shake' : isCorrect ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'}`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-display font-black text-gray-700 text-base flex-1">{item.name}</span>
              {isCorrect ? (
                <span className="font-display font-black text-green-600 text-lg">✅ {item.count}</span>
              ) : (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button
                      key={n}
                      onClick={() => !answered && handlePick(item.id, n)}
                      disabled={!!answered}
                      className="w-7 h-7 rounded-lg border-2 border-orange-300 bg-orange-50 font-display font-black text-sm
                                 hover:bg-orange-200 active:scale-90 transition-all cursor-pointer disabled:opacity-40"
                    >{n}</button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Ex2Tab() {
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)
  return (
    <ISpyRound
      key={`${round}-${k}`}
      items={I_SPY_ROUNDS[round]}
      roundIdx={round}
      totalRounds={I_SPY_ROUNDS.length}
      onNext={() => setRound(r => r + 1)}
      onRestart={() => { setRound(0); setK(n => n + 1) }}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn'  },
  { id: 'quiz1', label: '🔊 Quiz 1' },
  { id: 'quiz2', label: '🎯 Quiz 2' },
  { id: 'ex1',   label: '🔍 Search' },
  { id: 'ex2',   label: '👁️ I Spy'  },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function FruitVegetablesPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Fruit & Vegetables 🍎</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">פירות וירקות — 14 מילים</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
