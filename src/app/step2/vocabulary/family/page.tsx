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
            <span className="text-3xl">{f.emoji}</span>
            <span className="font-display font-black text-amber-800 text-sm leading-tight text-center">{f.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border-4 border-amber-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-amber-200 bg-amber-100 border-b-4 border-amber-200">
          <div className="py-2 text-center font-bold text-amber-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-amber-700 text-xs">Pic</div>
        </div>
        {FAMILY.map((f, i) => (
          <div key={f.id} className={`grid grid-cols-3 divide-x divide-amber-200 ${i % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}`}>
            <div className="py-2 px-2 font-bold text-gray-800 text-sm">{f.name}</div>
            <div className="py-2 px-2 font-bold text-gray-700 text-sm text-center" dir="rtl">{f.hebrew}</div>
            <div className="py-2 text-center text-xl">{f.emoji}</div>
          </div>
        ))}
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
        speak(queue[next].name, 0.8)
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
              <span className="text-4xl">{opt.emoji}</span>
              <span className="font-bold text-xs text-gray-500">{opt.name}</span>
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
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את השם הנכון</p>
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
                rounded-2xl border-4 py-4 font-display font-black text-base
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

interface TreeNode {
  id: string
  label: string
  emoji: string
  row: number
  col: number
}

const TREE_NODES: TreeNode[] = [
  { id: 'grandfather', label: 'grandfather', emoji: '👴', row: 0, col: 1 },
  { id: 'grandmother', label: 'grandmother', emoji: '👵', row: 0, col: 3 },
  { id: 'uncle',       label: 'uncle',       emoji: '🧔', row: 1, col: 0 },
  { id: 'father',      label: 'father',      emoji: '👨', row: 1, col: 2 },
  { id: 'mother',      label: 'mother',      emoji: '👩', row: 1, col: 3 },
  { id: 'aunt',        label: 'aunt',        emoji: '👩‍🦱', row: 1, col: 5 },
  { id: 'brother',     label: 'brother',     emoji: '👦', row: 2, col: 0 },
  { id: 'twins',       label: 'twins',       emoji: '👯', row: 2, col: 2 },
  { id: 'sister',      label: 'sister',      emoji: '👧', row: 2, col: 4 },
  { id: 'cousin',      label: 'cousin',      emoji: '🧒', row: 2, col: 5 },
  { id: 'baby',        label: 'baby',        emoji: '👶', row: 3, col: 2 },
]

function FamilyTreeInner({ onAgain }: { onAgain: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [wrong, setWrong] = useState<string | null>(null)

  const allDone = TREE_NODES.every(n => answers[n.id] === n.id)
  const placed = new Set(Object.values(answers))
  const bankItems = FAMILY.filter(f => TREE_NODES.some(n => n.id === f.id) && !placed.has(f.id))
  const [shuffledBank] = useState(() => shuffle(TREE_NODES.map(n => n.id)))
  const bankOrder = shuffledBank.filter(id => bankItems.some(b => b.id === id))

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const nodeId = targetEl.getAttribute('data-node-id')
    if (!nodeId) return false
    const node = TREE_NODES.find(n => n.id === nodeId)
    if (!node) return false
    if (answers[nodeId]) return false
    if (tileId !== nodeId) {
      setWrong(nodeId)
      setTimeout(() => setWrong(null), 500)
      return false
    }
    setAnswers(prev => ({ ...prev, [nodeId]: tileId }))
    return true
  }, [answers])

  const rowEmojis = [['👴', '👵'], ['🧔', '👨', '👩', '👩‍🦱'], ['👦', '👯', '👧', '🧒'], ['👶']]

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור את שם בן המשפחה למקום הנכון בעץ
      </p>

      {/* Family Tree */}
      <div className="bg-amber-50 border-4 border-amber-200 rounded-2xl p-3 mb-4">
        <p className="text-center font-display font-bold text-amber-700 text-sm mb-2">🌳 My Family Tree</p>

        {/* Row 0: grandparents */}
        <div className="flex justify-center gap-6 mb-1">
          {['grandfather','grandmother'].map(id => {
            const node = TREE_NODES.find(n => n.id === id)!
            const filled = answers[id]
            const isWrong = wrong === id
            return (
              <div key={id} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl">{node.emoji}</span>
                <div
                  data-drop-target="true"
                  data-node-id={id}
                  className={`w-20 h-6 rounded-lg border-2 flex items-center justify-center text-xs font-bold
                    ${filled ? 'bg-green-100 border-green-400 text-green-800' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-dashed border-amber-300 text-gray-300'}`}
                >
                  {filled ? node.label : '_ _ _'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-1">
          <div className="w-px h-4 bg-amber-400" />
        </div>

        {/* Row 1: parents + uncle/aunt */}
        <div className="flex justify-around mb-1">
          {['uncle','father','mother','aunt'].map(id => {
            const node = TREE_NODES.find(n => n.id === id)!
            const filled = answers[id]
            const isWrong = wrong === id
            return (
              <div key={id} className="flex flex-col items-center gap-0.5">
                <span className="text-xl">{node.emoji}</span>
                <div
                  data-drop-target="true"
                  data-node-id={id}
                  className={`w-14 h-5 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold
                    ${filled ? 'bg-green-100 border-green-400 text-green-800' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-dashed border-amber-300 text-gray-300'}`}
                >
                  {filled ? node.label : '_ _'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-1">
          <div className="w-px h-4 bg-amber-400" />
        </div>

        {/* Row 2: siblings + cousin */}
        <div className="flex justify-around mb-1">
          {['brother','twins','sister','cousin'].map(id => {
            const node = TREE_NODES.find(n => n.id === id)!
            const filled = answers[id]
            const isWrong = wrong === id
            return (
              <div key={id} className="flex flex-col items-center gap-0.5">
                <span className="text-xl">{node.emoji}</span>
                <div
                  data-drop-target="true"
                  data-node-id={id}
                  className={`w-14 h-5 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold
                    ${filled ? 'bg-green-100 border-green-400 text-green-800' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-dashed border-amber-300 text-gray-300'}`}
                >
                  {filled ? node.label : '_ _'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-1">
          <div className="w-px h-3 bg-amber-400" />
        </div>

        {/* Row 3: baby */}
        <div className="flex justify-center">
          {['baby'].map(id => {
            const node = TREE_NODES.find(n => n.id === id)!
            const filled = answers[id]
            const isWrong = wrong === id
            return (
              <div key={id} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl">{node.emoji}</span>
                <div
                  data-drop-target="true"
                  data-node-id={id}
                  className={`w-16 h-6 rounded-lg border-2 flex items-center justify-center text-xs font-bold
                    ${filled ? 'bg-green-100 border-green-400 text-green-800' : isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-white border-dashed border-amber-300 text-gray-300'}`}
                >
                  {filled ? node.label : '_ _ _'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Word Bank */}
      {bankOrder.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {bankOrder.map(id => {
              const item = FAMILY.find(f => f.id === id)!
              return (
                <DraggableTile
                  key={id}
                  id={id}
                  label={item.name}
                  color="bg-amber-100"
                  borderColor="border-amber-400"
                  textColor="text-amber-900"
                  size="sm"
                  className="!w-auto min-w-[60px] px-2 text-xs"
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
      // Fill cells
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

  const selectedWord = CW_WORDS.find(w => w.clue === selected)

  const cellSize = 'w-7 h-7'

  return (
    <div className="max-w-sm mx-auto px-2 pb-16">
      <p className="text-center font-bold text-gray-500 text-xs mb-3" dir="rtl">
        לחץ על מספר הרמז, הקלד את המילה ולחץ ✓
      </p>

      {/* Grid */}
      <div className="overflow-x-auto mb-4">
        <div className="inline-block border-2 border-gray-400">
          {Array.from({ length: CW_ROWS }, (_, r) => (
            <div key={r} className="flex">
              {Array.from({ length: CW_COLS }, (_, c) => {
                const letter = CW_GRID[r][c]
                if (!letter) return (
                  <div key={c} className={`${cellSize} bg-gray-800 border border-gray-700`} />
                )
                const clueNum = getCellClueNumber(r, c)
                const wordsHere = getCellWords(r, c)
                const isSelected = selected !== null && wordsHere.some(w => w.clue === selected)
                const isFound = wordsHere.some(w => found.has(w.clue))
                const filledLetter = filled[`${r},${c}`]
                return (
                  <div
                    key={c}
                    onClick={() => {
                      const clickableWords = wordsHere.filter(w => !found.has(w.clue))
                      if (clickableWords.length > 0) {
                        const current = wordsHere.find(w => w.clue === selected)
                        const next = current
                          ? clickableWords[(clickableWords.indexOf(current) + 1) % clickableWords.length]
                          : clickableWords[0]
                        if (next) selectWord(next.clue)
                      }
                    }}
                    className={`
                      ${cellSize} border border-gray-300 relative flex items-center justify-center cursor-pointer
                      ${isFound ? 'bg-green-100' : isSelected ? 'bg-yellow-100' : 'bg-white'}
                    `}
                  >
                    {clueNum && (
                      <span className="absolute top-0 left-0 text-[7px] font-bold text-gray-600 leading-none px-px">
                        {clueNum}
                      </span>
                    )}
                    {filledLetter && (
                      <span className={`font-display font-black text-xs ${isFound ? 'text-green-700' : 'text-gray-800'}`}>
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

      {/* Input area */}
      {selected && !found.has(selected) && (
        <div className={`bg-white border-4 rounded-2xl p-3 mb-3 ${flash === 'correct' ? 'border-green-400 bg-green-50' : flash === 'wrong' ? 'border-red-400 bg-red-50 shake' : 'border-amber-300'}`}>
          <p className="text-sm font-bold text-gray-600 mb-2">
            {selectedWord?.emoji} Clue #{selected} ({selectedWord?.dir === 'h' ? '→ Across' : '↓ Down'})
          </p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              maxLength={selectedWord?.word.length}
              className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 font-display font-bold text-lg uppercase focus:outline-none focus:border-amber-400"
              placeholder="type here..."
            />
            <button
              onClick={handleSubmit}
              className="btn-kid bg-green-500 text-sm px-3 py-2"
            >✓</button>
          </div>
        </div>
      )}

      {/* Clue list */}
      <div className="grid grid-cols-2 gap-2">
        {CW_WORDS.map(w => (
          <button
            key={w.clue}
            onClick={() => !found.has(w.clue) && selectWord(w.clue)}
            className={`
              flex items-center gap-2 px-2 py-1.5 rounded-xl border-2 text-left
              ${found.has(w.clue) ? 'bg-green-100 border-green-400 opacity-60' : selected === w.clue ? 'bg-yellow-100 border-amber-400' : 'bg-white border-gray-200 hover:border-amber-300'}
            `}
          >
            <span className="text-lg">{w.emoji}</span>
            <span className="text-xs font-bold text-gray-600">
              #{w.clue} {w.dir === 'h' ? '→' : '↓'}
              {found.has(w.clue) ? ' ✅' : ''}
            </span>
          </button>
        ))}
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
