'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const DAYS_IN_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface Props { onComplete: () => void }

export function DaysNumberMatch({ onComplete }: Props) {
  const speak = useSpeak()
  const [shuffledDays] = useState(() => shuffle([...DAYS_IN_ORDER]))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set()) // matched day names
  const [wrongPair, setWrongPair] = useState<string | null>(null)

  function handleDayClick(day: string) {
    if (matched.has(day)) return
    speak(day, 0.8)
    setSelectedDay(day)
    setWrongPair(null)
  }

  function handleNumberClick(num: number) {
    if (!selectedDay) return
    const expectedNum = DAYS_IN_ORDER.indexOf(selectedDay) + 1
    if (num === expectedNum) {
      const newMatched = new Set(matched)
      newMatched.add(selectedDay)
      setMatched(newMatched)
      setSelectedDay(null)
      if (newMatched.size === 7) setTimeout(onComplete, 600)
    } else {
      setWrongPair(selectedDay)
      setTimeout(() => {
        setWrongPair(null)
        setSelectedDay(null)
      }, 500)
    }
  }

  const matchedNumbers = new Set(
    Array.from(matched).map(d => DAYS_IN_ORDER.indexOf(d) + 1)
  )

  return (
    <div className="p-3 max-w-sm mx-auto">
      <p className="text-white/70 text-sm font-bold text-center mb-4" dir="rtl">
        לחץ על שם היום ועל המספר שלו
      </p>

      <div className="flex gap-3">
        {/* Days column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledDays.map(day => {
            const isMatched = matched.has(day)
            const isSelected = selectedDay === day
            const isWrong = wrongPair === day
            return (
              <button
                key={day}
                onClick={() => !isMatched && handleDayClick(day)}
                disabled={isMatched}
                className={`
                  py-2 px-3 rounded-xl border-4 font-bold text-xs text-left
                  transition-all duration-150 cursor-pointer select-none min-h-[44px]
                  ${isMatched ? 'bg-green-300 border-green-500 text-green-900 opacity-60' : ''}
                  ${isSelected ? 'bg-white border-white text-purple-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-300 border-red-500 text-red-900 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-white/20 border-white/50 text-white hover:bg-white/30' : ''}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Numbers column */}
        <div className="flex flex-col gap-2 w-12">
          {[1, 2, 3, 4, 5, 6, 7].map(num => {
            const isMatched = matchedNumbers.has(num)
            return (
              <button
                key={num}
                onClick={() => !isMatched && handleNumberClick(num)}
                disabled={isMatched}
                className={`
                  h-11 w-full rounded-xl border-4 font-black text-base
                  transition-all duration-150 cursor-pointer select-none
                  ${isMatched ? 'bg-green-300 border-green-500 text-green-900 opacity-60' : ''}
                  ${!isMatched ? 'bg-white/20 border-white/50 text-white hover:bg-white/30 hover:scale-105' : ''}
                `}
              >
                {num}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-white/60 text-sm font-bold">
        {matched.size}/7 ✓
      </div>
    </div>
  )
}
