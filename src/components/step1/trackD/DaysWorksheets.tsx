'use client'
import { useState } from 'react'
import { DaysCaterpillar } from './DaysCaterpillar'
import { DaysWordSearchPrint } from './DaysWordSearchPrint'

export function DaysWorksheets({ onComplete }: { onComplete: () => void }) {
  const [sheet, setSheet] = useState<1 | 2>(1)
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex gap-2 mb-3 justify-center flex-wrap print:hidden">
        <button
          onClick={() => setSheet(1)}
          className={`px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 1 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >🐛 Worksheet 1</button>
        <button
          onClick={() => setSheet(2)}
          className={`px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 2 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >📄 Worksheet 2</button>
      </div>
      {sheet === 1 && <DaysCaterpillar onComplete={onComplete} />}
      {sheet === 2 && <DaysWordSearchPrint onComplete={onComplete} />}
    </div>
  )
}
