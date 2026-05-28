'use client'
import { useState } from 'react'

const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
const ROWS = 10
const COLS = 10
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface Placement { word: string; row: number; col: number; dir: 'h' | 'v' }

function generateGrid(): { grid: string[][]; placements: Placement[] } {
  const grid: string[][] = Array(ROWS).fill(null).map(() => Array(COLS).fill(''))
  const placements: Placement[] = []
  const sorted = [...DAYS].sort((a, b) => b.length - a.length)

  for (const word of sorted) {
    let placed = false
    for (let attempt = 0; attempt < 300 && !placed; attempt++) {
      const dir: 'h' | 'v' = Math.random() < 0.5 ? 'h' : 'v'
      const maxRow = dir === 'h' ? ROWS - 1 : ROWS - word.length
      const maxCol = dir === 'h' ? COLS - word.length : COLS - 1
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

  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c] === '') grid[r][c] = ALPHA[Math.floor(Math.random() * 26)]

  return { grid, placements }
}

function cellKey(r: number, c: number) { return `${r},${c}` }

export function DaysWordSearch({ onComplete }: { onComplete: () => void }) {
  const [{ grid, placements }] = useState(generateGrid)
  const [found, setFound] = useState<Set<string>>(new Set())
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set())
  const [selPath, setSelPath] = useState<[number, number][]>([])
  const [flashRed, setFlashRed] = useState(false)

  const allFound = found.size === placements.length

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
      const newFound = new Set<string>(); found.forEach(v => newFound.add(v)); newFound.add(match.word)
      setFound(newFound)
      const newHighlighted = new Set(highlighted)
      newPath.forEach(([pr, pc]) => newHighlighted.add(cellKey(pr, pc)))
      setHighlighted(newHighlighted)
      setSelPath([])
      if (newFound.size === placements.length) setTimeout(onComplete, 600)
    } else {
      setSelPath(newPath)
    }
  }

  const selKeys = new Set(selPath.map(([r, c]) => cellKey(r, c)))
  const cellSize = Math.floor((Math.min(320, typeof window !== 'undefined' ? window.innerWidth - 48 : 320)) / COLS)

  return (
    <div className="max-w-sm mx-auto pb-16">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-white/70 text-xs" dir="rtl">לחץ על האותיות אחת אחת ומצא את ימות השבוע</p>
        <span className="text-xs font-bold text-white/70">{found.size}/{placements.length}</span>
      </div>

      <div className={`border-4 mb-4 rounded-lg select-none ${flashRed ? 'border-red-400' : 'border-white/30'}`} style={{ width: 'fit-content' }}>
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: COLS }, (_, c) => {
              const key = cellKey(r, c)
              const isFound = highlighted.has(key)
              const isSel = selKeys.has(key)
              return (
                <div
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                    flex items-center justify-center border border-white/10 cursor-pointer select-none
                    font-display font-black transition-colors duration-100
                    ${isFound ? 'bg-green-400 text-white' : flashRed && isSel ? 'bg-red-400 text-white' : isSel ? 'bg-yellow-300 text-gray-900' : 'bg-white/10 text-white'}
                  `}
                  style={{ width: cellSize, height: cellSize, fontSize: Math.max(8, cellSize - 10) }}
                >
                  {grid[r][c]}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {DAYS.map(day => {
          const isFound = found.has(day)
          return (
            <div
              key={day}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border-2 text-sm font-bold transition-all
                ${isFound ? 'bg-green-400/30 border-green-400 text-green-200 line-through' : 'bg-white/10 border-white/30 text-white'}`}
            >
              <span>{day.charAt(0) + day.slice(1).toLowerCase()}</span>
            </div>
          )
        })}
      </div>

      {allFound && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-white" dir="rtl">כל המילים נמצאו!</p>
        </div>
      )}
    </div>
  )
}
