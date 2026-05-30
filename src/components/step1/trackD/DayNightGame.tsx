'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'

const DAY_BASE = [
  { id: 'wakeup',     label: 'Wake Up',         emoji: '⏰', fitsDay: true  },
  { id: 'breakfast',  label: 'Have Breakfast',   emoji: '🍳', fitsDay: true  },
  { id: 'school',     label: 'Go to School',     emoji: '🏫', fitsDay: true  },
  { id: 'schoolbag2', label: 'Pack Schoolbag',   emoji: '🎒', fitsDay: true  },
  { id: 'dressed2',   label: 'Get Dressed',      emoji: '👕', fitsDay: true  },
  { id: 'sleep',      label: 'Sleep',            emoji: '😴', fitsDay: false },
  { id: 'dinner',     label: 'Have Dinner',      emoji: '🍽️', fitsDay: false },
  { id: 'pajamas',    label: 'Wear Pajamas',     emoji: '🌙', fitsDay: false },
  { id: 'teeth2',     label: 'Brush Your Teeth', emoji: '🦷', fitsDay: false },
]

const NIGHT_BASE = [
  { id: 'teeth',      label: 'Brush Your Teeth', emoji: '🦷', fitsNight: true  },
  { id: 'bath',       label: 'Take a Bath',       emoji: '🛁', fitsNight: true  },
  { id: 'story',      label: 'Read a Story',      emoji: '📖', fitsNight: true  },
  { id: 'sleep2',     label: 'Sleep',             emoji: '😴', fitsNight: true  },
  { id: 'dinner2',    label: 'Have Dinner',       emoji: '🍽️', fitsNight: true  },
  { id: 'pajamas2',   label: 'Wear Pajamas',      emoji: '🌙', fitsNight: true  },
  { id: 'dressed',    label: 'Get Dressed',       emoji: '👕', fitsNight: false },
  { id: 'schoolbag',  label: 'Pack Schoolbag',    emoji: '🎒', fitsNight: false },
  { id: 'washface',   label: 'Wash Your Face',    emoji: '🧼', fitsNight: false },
]

const TOTAL_CORRECT = DAY_BASE.filter(a => a.fitsDay).length + NIGHT_BASE.filter(a => a.fitsNight).length

export function DayNightGame({ onComplete }: { onComplete: () => void }) {
  const [dayColumn] = useState(() => shuffle([...DAY_BASE]))
  const [nightColumn] = useState(() => shuffle([...NIGHT_BASE]))
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [flash, setFlash] = useState<Record<string, 'correct' | 'wrong'>>({})
  const [correctCount, setCorrectCount] = useState(0)

  function handleCheck(id: string, isCorrect: boolean) {
    if (checked.has(id) || flash[id]) return
    if (isCorrect) {
      const next = new Set(checked); next.add(id)
      setChecked(next)
      setFlash(f => ({ ...f, [id]: 'correct' }))
      const newCount = correctCount + 1
      setCorrectCount(newCount)
      if (newCount === TOTAL_CORRECT) setTimeout(onComplete, 700)
    } else {
      setFlash(f => ({ ...f, [id]: 'wrong' }))
      setTimeout(() => setFlash(f => { const n = { ...f }; delete n[id]; return n }), 800)
    }
  }

  function rowClass(id: string, isCorrect: boolean) {
    const f = flash[id]
    const done = checked.has(id)
    if (done) return 'bg-green-100'
    if (f === 'wrong') return 'bg-red-100 animate-pulse'
    return isCorrect ? 'cursor-pointer hover:bg-white/40' : 'cursor-pointer hover:bg-white/20'
  }

  return (
    <div className="max-w-lg mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        סמן ✓ את הפעולות שמתאימות לכל עמודה
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* DAY column */}
        <div className="bg-yellow-100/80 border-4 border-yellow-400 rounded-2xl overflow-hidden">
          <div className="bg-yellow-300/80 py-2 flex items-center justify-center gap-1.5 border-b-2 border-yellow-400">
            <span className="text-xl">☀️</span>
            <span className="font-display font-black text-base text-yellow-800">DAY</span>
          </div>
          <div className="divide-y divide-yellow-200">
            {dayColumn.map(a => {
              const done = checked.has(a.id)
              const f = flash[a.id]
              return (
                <div
                  key={a.id}
                  onClick={() => !done && !f && handleCheck(a.id, a.fitsDay)}
                  className={`flex items-center gap-2 px-2 py-2 transition-colors select-none ${rowClass(a.id, a.fitsDay)}`}
                >
                  <span className="text-lg shrink-0">{a.emoji}</span>
                  <span className="text-xs font-bold text-gray-700 flex-1 leading-tight">{a.label}</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-black shrink-0
                    ${done ? 'bg-green-500 border-green-600 text-white' : f === 'wrong' ? 'bg-red-400 border-red-500 text-white' : 'border-yellow-500 bg-white'}`}>
                    {done ? '✓' : f === 'wrong' ? '✗' : ''}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* NIGHT column */}
        <div className="bg-indigo-100/80 border-4 border-indigo-400 rounded-2xl overflow-hidden">
          <div className="bg-indigo-300/80 py-2 flex items-center justify-center gap-1.5 border-b-2 border-indigo-400">
            <span className="text-xl">🌙</span>
            <span className="font-display font-black text-base text-indigo-800">NIGHT</span>
          </div>
          <div className="divide-y divide-indigo-200">
            {nightColumn.map(a => {
              const done = checked.has(a.id)
              const f = flash[a.id]
              return (
                <div
                  key={a.id}
                  onClick={() => !done && !f && handleCheck(a.id, a.fitsNight)}
                  className={`flex items-center gap-2 px-2 py-2 transition-colors select-none ${rowClass(a.id, a.fitsNight)}`}
                >
                  <span className="text-lg shrink-0">{a.emoji}</span>
                  <span className="text-xs font-bold text-gray-700 flex-1 leading-tight">{a.label}</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-black shrink-0
                    ${done ? 'bg-green-500 border-green-600 text-white' : f === 'wrong' ? 'bg-red-400 border-red-500 text-white' : 'border-indigo-500 bg-white'}`}>
                    {done ? '✓' : f === 'wrong' ? '✗' : ''}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-white/70 font-bold text-xs mt-3">
        {correctCount}/{TOTAL_CORRECT} ✓
      </p>
    </div>
  )
}
