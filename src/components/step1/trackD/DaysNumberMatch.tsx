'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const DAYS_IN_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const HEBREW_ORDINALS: Record<number, string> = {
  1: 'ראשון', 2: 'שני', 3: 'שלישי', 4: 'רביעי', 5: 'חמישי', 6: 'שישי', 7: 'שבת',
}

interface Props { onComplete: () => void }

export function DaysNumberMatch({ onComplete }: Props) {
  const speak = useSpeak()
  const [shuffledDays, setShuffledDays] = useState(() => shuffle([...DAYS_IN_ORDER]))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleDayClick(day: string) {
    if (matched.has(day)) return
    speak(day, 0.8)
    setSelectedDay(day)
    setWrongPair(null)
  }

  function handleOrdinalClick(num: number) {
    if (!selectedDay) return
    const expectedNum = DAYS_IN_ORDER.indexOf(selectedDay) + 1
    if (num === expectedNum) {
      const newMatched = new Set(matched)
      newMatched.add(selectedDay)
      setMatched(newMatched)
      setSelectedDay(null)
      if (newMatched.size === 7) {
        setDone(true)
        setTimeout(onComplete, 600)
      }
    } else {
      setWrongPair(selectedDay)
      setTimeout(() => {
        setWrongPair(null)
        setSelectedDay(null)
      }, 500)
    }
  }

  function handleAgain() {
    setShuffledDays(shuffle([...DAYS_IN_ORDER]))
    setSelectedDay(null)
    setMatched(new Set())
    setWrongPair(null)
    setDone(false)
  }

  const matchedNumbers = new Set(
    Array.from(matched).map(d => DAYS_IN_ORDER.indexOf(d) + 1)
  )

  return (
    <div className="p-3 max-w-sm mx-auto">
      <p className="text-black font-bold text-base text-center mb-4" dir="rtl">
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
                  py-2 px-3 rounded-xl border-4 font-bold text-base text-left
                  transition-all duration-150 cursor-pointer select-none min-h-[52px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-900 opacity-60' : ''}
                  ${isSelected ? 'bg-blue-200 border-blue-600 text-blue-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-blue-100 border-blue-400 text-blue-900 hover:bg-blue-200 hover:scale-105' : ''}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Hebrew ordinals column */}
        <div className="flex flex-col gap-2 w-16">
          {[1, 2, 3, 4, 5, 6, 7].map(num => {
            const isMatched = matchedNumbers.has(num)
            return (
              <button
                key={num}
                onClick={() => !isMatched && handleOrdinalClick(num)}
                disabled={isMatched}
                className={`
                  h-[52px] w-full rounded-xl border-4 font-black text-xs px-1
                  transition-all duration-150 cursor-pointer select-none
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-900 opacity-60' : ''}
                  ${!isMatched ? 'bg-blue-100 border-blue-400 text-blue-900 hover:bg-blue-200 hover:scale-105' : ''}
                `}
                dir="rtl"
              >
                {HEBREW_ORDINALS[num]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-black font-bold text-sm">
        {matched.size}/7 ✓
      </div>

      {done && (
        <div className="text-center mt-4">
          <button onClick={handleAgain} className="btn-kid bg-blue-500">
            🔁 Again
          </button>
        </div>
      )}
    </div>
  )
}
