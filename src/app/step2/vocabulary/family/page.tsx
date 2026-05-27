'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { FAMILY, FamilyItem } from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz1' | 'quiz2' | 'ex1' | 'ex2'

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  const speak = useSpeak()
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <p className="text-center font-bold text-gray-500 text-sm" dir="rtl">
        לחץ על כל בן משפחה כדי לשמוע את שמו באנגלית
      </p>
      <div className="grid grid-cols-3 gap-2">
        {FAMILY.map(f => (
          <button
            key={f.id}
            onClick={() => speak(f.name, 0.8)}
            className="bg-white border-4 border-amber-200 rounded-2xl px-2 py-3 flex flex-col items-center gap-1
                       hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-5xl">{f.emoji}</span>
            <span className="font-display font-black text-amber-800 text-base leading-tight text-center">{f.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border-4 border-amber-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-6 divide-x divide-amber-200 bg-amber-100 border-b-4 border-amber-200">
          <div className="py-2 text-center font-bold text-amber-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs">Pic</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs">Pic</div>
        </div>
        {Array.from({ length: Math.ceil(FAMILY.length / 2) }, (_, i) => {
          const f1 = FAMILY[i * 2]; const f2 = FAMILY[i * 2 + 1]
          return (
            <div key={i} className={`grid grid-cols-6 divide-x divide-amber-200 ${i % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}`}>
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
  const [queue] = useState<FamilyItem[]>(() => shuffle([...FAMILY]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<FamilyItem[]>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[idx]

  useEffect(() => {
    if (!current) return
    const others = FAMILY.filter(f => f.id !== current.id)
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
        <p className="font-display font-bold text-2xl text-amber-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-amber-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-amber-500">✅ {score}</span>
      </div>
      <div className="flex flex-col items-center gap-3 mb-8">
        <button
          onClick={() => current && speak(current.name, 0.8)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >🔊</button>
        <p className="text-sm font-bold text-gray-500" dir="rtl">האזן ובחר את בן המשפחה הנכון</p>
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
                ${isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-amber-50 border-amber-200 hover:bg-amber-100 hover:scale-105 active:scale-95'}
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
  const [queue] = useState<FamilyItem[]>(() => shuffle([...FAMILY]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<FamilyItem[]>([])
  const [correct, setCorrect] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const cur = queue[idx]
    if (!cur) return
    const others = FAMILY.filter(f => f.id !== cur.id)
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
        <p className="font-display font-bold text-2xl text-amber-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-amber-500">🔁 Again</button>
      </div>
    )
  }

  const cur = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-amber-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את בן המשפחה המופיע בתמונה</p>
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center gap-1">
          <div className="text-8xl">{cur?.emoji}</div>
          <div className="font-bold text-gray-500 text-base" dir="rtl">{cur?.hebrew}</div>
        </div>
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
                ${!isCorrect && !isWrong ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 hover:scale-105 active:scale-95' : ''}
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

// ── Ex1: Family Tree ──────────────────────────────────────────────────────────

const TREE_NODES = [
  { id: 'grandfather', label: 'grandfather', emoji: '👴' },
  { id: 'grandmother', label: 'grandmother', emoji: '👵' },
  { id: 'father',      label: 'father',      emoji: '👨' },
  { id: 'mother',      label: 'mother',      emoji: '👩' },
  { id: 'brother',     label: 'brother',     emoji: '👦' },
  { id: 'sister',      label: 'sister',      emoji: '👧' },
]

function TreeSlot({ id, answers, wrong, emoji }: {
  id: string; answers: Record<string, string>; wrong: string | null; emoji: string
}) {
  const node = TREE_NODES.find(n => n.id === id)!
  const filled = answers[id]
  const isWrong = wrong === id
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl">{emoji}</span>
      <div
        data-drop-target="true"
        data-node-id={id}
        className={`w-28 h-9 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all
          ${filled ? 'bg-green-100 border-green-400 text-green-800' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-dashed border-amber-300 text-gray-300'}`}
      >
        {filled ? node.label : '_ _ _'}
      </div>
    </div>
  )
}

function FamilyTreeInner({ onAgain }: { onAgain: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [wrong, setWrong] = useState<string | null>(null)

  const allDone = TREE_NODES.every(n => answers[n.id] === n.id)
  const placed = new Set(Object.values(answers))
  const [shuffledBank] = useState(() => shuffle(TREE_NODES.map(n => n.id)))
  const bankOrder = shuffledBank.filter(id => !placed.has(id))

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const nodeId = targetEl.getAttribute('data-node-id')
    if (!nodeId) return false
    if (answers[nodeId]) return false
    if (tileId !== nodeId) {
      setWrong(nodeId)
      setTimeout(() => setWrong(null), 500)
      return false
    }
    setAnswers(prev => ({ ...prev, [nodeId]: tileId }))
    return true
  }, [answers])

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור את שם בן המשפחה למקום הנכון בעץ
      </p>

      <div className="bg-amber-50 border-4 border-amber-200 rounded-2xl p-4 mb-4">
        <p className="text-center font-display font-bold text-amber-700 text-sm mb-3">🌳 My Family Tree</p>

        {/* Row 0: grandparents */}
        <div className="flex justify-center gap-8 mb-1">
          <TreeSlot id="grandfather" answers={answers} wrong={wrong} emoji="👴" />
          <TreeSlot id="grandmother" answers={answers} wrong={wrong} emoji="👵" />
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-1"><div className="w-px h-5 bg-amber-400" /></div>

        {/* Row 1: parents */}
        <div className="flex justify-center gap-6 mb-1">
          <TreeSlot id="father" answers={answers} wrong={wrong} emoji="👨" />
          <TreeSlot id="mother" answers={answers} wrong={wrong} emoji="👩" />
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-1"><div className="w-px h-5 bg-amber-400" /></div>

        {/* Row 2: brother, ME (fixed), sister */}
        <div className="flex justify-center gap-4">
          <TreeSlot id="brother" answers={answers} wrong={wrong} emoji="👦" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">🧒</span>
            <div className="w-20 h-9 rounded-xl border-2 border-amber-400 bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-800">
              me
            </div>
          </div>
          <TreeSlot id="sister" answers={answers} wrong={wrong} emoji="👧" />
        </div>
      </div>

      {/* Word Bank */}
      {bankOrder.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {bankOrder.map(id => {
              const node = TREE_NODES.find(n => n.id === id)!
              return (
                <DraggableTile
                  key={id}
                  id={id}
                  label={node.label}
                  color="bg-amber-100"
                  borderColor="border-amber-400"
                  textColor="text-amber-900"
                  size="sm"
                  className="!w-auto min-w-[70px] px-2 text-sm"
                  onDropped={handleDrop}
                />
              )
            })}
          </div>
        </div>
      )}

      {allDone && (
        <div className="text-center mt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing!</p>
          <button onClick={onAgain} className="btn-kid bg-amber-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex1Tab() {
  const [k, setK] = useState(0)
  return <FamilyTreeInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex2: Crossword ────────────────────────────────────────────────────────────
// Grid layout (12 rows × 11 cols, 0-indexed):
// GRANDFATHER  h r0  c0-c10
// BABY         h r1  c4-c7
// FATHER       v c5  r0-r5
// BROTHER      h r3  c1-c7
// SISTER       h r4  c1-c6
// GRANDMOTHER  h r6  c0-c10
// MOTHER       v c5  r6-r11

interface CWWord {
  word: string
  dir: 'h' | 'v'
  row: number
  col: number
  emoji: string
  clue: number
}

const CW_WORDS: CWWord[] = [
  { word: 'GRANDFATHER', dir: 'h', row: 0, col: 0, emoji: '👴', clue: 1 },
  { word: 'BABY',        dir: 'h', row: 1, col: 4, emoji: '👶', clue: 2 },
  { word: 'FATHER',      dir: 'v', row: 0, col: 5, emoji: '👨', clue: 3 },
  { word: 'BROTHER',     dir: 'h', row: 3, col: 1, emoji: '👦', clue: 4 },
  { word: 'SISTER',      dir: 'h', row: 4, col: 1, emoji: '👧', clue: 5 },
  { word: 'GRANDMOTHER', dir: 'h', row: 6, col: 0, emoji: '👵', clue: 6 },
  { word: 'MOTHER',      dir: 'v', row: 6, col: 5, emoji: '👩', clue: 7 },
]

const CW_ROWS = 12
const CW_COLS = 11

function buildCWGrid() {
  const grid: (string | null)[][] = Array(CW_ROWS).fill(null).map(() => Array(CW_COLS).fill(null))
  CW_WORDS.forEach(({ word, dir, row, col }) => {
    for (let i = 0; i < word.length; i++) {
      const r = dir === 'h' ? row : row + i
      const c = dir === 'h' ? col + i : col
      grid[r][c] = word[i]
    }
  })
  return grid
}

const CW_GRID = buildCWGrid()

function getCellClueNumber(r: number, c: number): number | null {
  for (const w of CW_WORDS) {
    if (w.row === r && w.col === c) return w.clue
  }
  return null
}

function getCellWords(r: number, c: number): CWWord[] {
  return CW_WORDS.filter(w => {
    if (w.dir === 'h') return w.row === r && c >= w.col && c < w.col + w.word.length
    return w.col === c && r >= w.row && r < w.row + w.word.length
  })
}

function CrosswordInner({ onAgain }: { onAgain: () => void }) {
  const [filled, setFilled] = useState<Record<string, string>>({})
  const [found, setFound] = useState<Set<number>>(new Set())
  const [selected, setSelected] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const allFound = found.size === CW_WORDS.length

  function selectWord(clue: number) {
    setSelected(clue)
    setInput('')
    setFlash(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleSubmit() {
    if (!selected) return
    const w = CW_WORDS.find(x => x.clue === selected)!
    if (input.toUpperCase() === w.word) {
      const newFilled = { ...filled }
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === 'h' ? w.row : w.row + i
        const c = w.dir === 'h' ? w.col + i : w.col
        newFilled[`${r},${c}`] = w.word[i]
      }
      setFilled(newFilled)
      setFound(prev => { const s = new Set<number>(); prev.forEach(v => s.add(v)); s.add(selected); return s })
      setFlash('correct')
      setTimeout(() => {
        setFlash(null)
        setSelected(null)
        setInput('')
      }, 800)
    } else {
      setFlash('wrong')
      setTimeout(() => {
        setFlash(null)
        setInput('')
        inputRef.current?.focus()
      }, 600)
    }
  }

  const cellSize = 'w-9 h-9'

  return (
    <div className="max-w-sm mx-auto px-2 pb-16">
      <p className="text-center font-bold text-gray-500 text-xs mb-3" dir="rtl">
        לחץ על האמוג׳י ברשימת הרמזים, הקלד את המילה ולחץ ✓
      </p>

      {/* Grid */}
      <div className="overflow-x-auto mb-4">
        <div className="inline-block border-2 border-gray-400">
          {Array.from({ length: CW_ROWS }, (_, r) => (
            <div key={r} className="flex">
              {Array.from({ length: CW_COLS }, (_, c) => {
                const letter = CW_GRID[r][c]
                if (!letter) return (
                  <div key={c} className={`${cellSize} border border-gray-200 bg-white`} />
                )
                const clueNum = getCellClueNumber(r, c)
                const wordsHere = getCellWords(r, c)
                const isSelected = selected !== null && wordsHere.some(w => w.clue === selected)
                const isFound = wordsHere.some(w => found.has(w.clue))
                const filledLetter = filled[`${r},${c}`]
                return (
                  <div
                    key={c}
                    className={`
                      ${cellSize} border border-gray-300 relative flex items-center justify-center
                      ${isFound ? 'bg-green-100' : isSelected ? 'bg-yellow-100' : 'bg-white'}
                    `}
                  >
                    {clueNum && (
                      <span className="absolute top-0 left-0 text-[10px] font-bold text-gray-600 leading-none px-px">
                        {clueNum}
                      </span>
                    )}
                    {filledLetter && (
                      <span className={`font-display font-black text-sm ${isFound ? 'text-green-700' : 'text-gray-800'}`}>
                        {filledLetter}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Clue list with inline input */}
      <div className="flex flex-col gap-2">
        {CW_WORDS.map(w => {
          const isFound = found.has(w.clue)
          const isSelected = selected === w.clue
          return (
            <div
              key={w.clue}
              className={`rounded-xl border-2 px-3 py-2 transition-all
                ${isFound ? 'bg-green-100 border-green-400' : isSelected ? 'bg-yellow-50 border-amber-400' : 'bg-white border-gray-200'}
              `}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => !isFound && selectWord(w.clue)}
                  disabled={isFound}
                  className={`text-2xl leading-none ${!isFound ? 'hover:scale-110 active:scale-90 transition-transform cursor-pointer' : 'cursor-default'}`}
                >
                  {w.emoji}
                </button>
                <span className="text-xs font-bold text-gray-500">
                  #{w.clue} {w.dir === 'h' ? '→' : '↓'}
                </span>
                {isFound && <span className="text-xs font-bold text-green-600 ml-auto">✅ {w.word}</span>}
              </div>
              {isSelected && !isFound && (
                <div className={`flex gap-2 mt-2 ${flash === 'wrong' ? 'shake' : ''}`}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    maxLength={w.word.length}
                    className={`flex-1 border-2 rounded-xl px-3 py-1.5 font-display font-bold text-lg uppercase focus:outline-none
                      ${flash === 'correct' ? 'border-green-400 bg-green-50' : flash === 'wrong' ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-amber-400'}
                    `}
                    placeholder="type here..."
                  />
                  <button
                    onClick={handleSubmit}
                    className="btn-kid bg-green-500 text-sm px-3 py-1.5"
                  >✓</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {allFound && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">כל הכבוד!</p>
          <button onClick={onAgain} className="btn-kid bg-amber-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex2Tab() {
  const [k, setK] = useState(0)
  return <CrosswordInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn'    },
  { id: 'quiz1', label: '🔊 Quiz 1'  },
  { id: 'quiz2', label: '🎯 Quiz 2'  },
  { id: 'ex1',   label: '🌳 Tree'    },
  { id: 'ex2',   label: '✏️ Crossword' },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function FamilyPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Family 👨‍👩‍👧‍👦</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">משפחה — 11 מילים</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
