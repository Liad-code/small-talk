'use client'
import { useState } from 'react'

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const ROWS = 10
const COLS = 10
const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

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
      if (grid[r][c] === '') grid[r][c] = ALPHA[Math.floor(Math.random() * ALPHA.length)]

  return { grid, placements }
}

export function DaysWordSearchPrint({ onComplete }: { onComplete: () => void }) {
  const [{ grid }] = useState(generateGrid)

  function handlePrint() { onComplete(); window.print() }

  return (
    <div className="max-w-lg mx-auto pb-16">
      <div className="flex justify-center mb-3">
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer bg-yellow-300 border-yellow-500 text-yellow-900 hover:bg-yellow-200 transition-all"
        >🖨️ Print</button>
      </div>

      <div className="bg-white rounded-2xl border-4 border-gray-300 p-5 shadow-lg">
        <h2 className="text-center font-display font-black text-xl mb-1 text-gray-800">Word Search</h2>
        <p className="text-center text-xs font-bold text-gray-500 mb-4" dir="rtl">
          מצא את ימות השבוע — המילים מופיעות אופקית או מלמעלה למטה
        </p>

        <div className="flex justify-center mb-4">
          <div className="border-2 border-gray-400">
            {grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center font-display font-black text-sm text-gray-800"
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {DAYS.map(day => (
            <div key={day} className="flex items-center gap-2 px-2 py-1 rounded-lg border border-gray-300 text-sm font-bold text-gray-700">
              <span className="w-4 h-4 border border-gray-400 rounded-sm inline-block shrink-0" />
              <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-bold text-gray-400 mt-4" dir="rtl">
          שם: _________________________
        </p>
      </div>
    </div>
  )
}
