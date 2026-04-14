'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface Props { onComplete: () => void }

export function DaysOrder({ onComplete }: Props) {
  const speak = useSpeak()
  const [shuffledDays, setShuffledDays] = useState(() => shuffle([...DAYS]))
  const [slots, setSlots] = useState<(string | null)[]>(Array(7).fill(null))
  const [done, setDone] = useState(false)

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const slotIdx = parseInt(targetEl.getAttribute('data-target-id') ?? '-1', 10)
    if (slotIdx < 0 || slotIdx > 6) return false
    const expectedDay = DAYS[slotIdx]
    if (tileId !== expectedDay) return false
    if (slots[slotIdx] !== null) return false

    const newSlots = [...slots]
    newSlots[slotIdx] = tileId
    setSlots(newSlots)
    speak(tileId, 0.8)

    if (newSlots.every(s => s !== null)) {
      setDone(true)
    }
    return true
  }, [slots, speak])

  function handleAgain() {
    setShuffledDays(shuffle([...DAYS]))
    setSlots(Array(7).fill(null))
    setDone(false)
  }

  const placedSet = new Set(slots.filter(Boolean) as string[])
  const freeDays = shuffledDays.filter(d => !placedSet.has(d))

  if (done) {
    return (
      <div className="p-3 max-w-sm mx-auto text-center">
        <div className="text-5xl mb-3 bounce-in">🎉</div>
        <p className="font-bold text-black text-lg mb-6" dir="rtl">כל הכבוד! סידרת את ימות השבוע!</p>
        {/* Show final order */}
        <div className="flex flex-col gap-1 mb-6 text-left">
          {DAYS.map((day, i) => (
            <div key={day} className="flex items-center gap-2 bg-blue-100 border-2 border-blue-500 rounded-xl px-3 py-2">
              <span className="font-bold text-blue-500 text-sm w-5">{i + 1}.</span>
              <span className="font-bold text-blue-900 text-base">{day}</span>
            </div>
          ))}
        </div>
        <button onClick={handleAgain} className="btn-kid bg-blue-500">
          🔁 Again
        </button>
      </div>
    )
  }

  return (
    <div className="p-3 max-w-sm mx-auto">
      <p className="text-black font-bold text-base text-center mb-4" dir="rtl">
        גרור את ימות השבוע לפי הסדר הנכון
      </p>

      <div className="flex flex-col gap-2 mb-4">
        {DAYS.map((day, i) => {
          const filled = slots[i]
          return (
            <div
              key={day}
              data-drop-target="true"
              data-target-id={String(i)}
              data-expected-ids={JSON.stringify([day])}
              className={`
                flex items-center gap-2 px-3 py-3 rounded-xl border-4
                ${filled ? 'bg-blue-100 border-blue-500' : 'bg-white/10 border-dashed border-blue-400'}
                transition-all duration-200 min-h-[52px]
              `}
            >
              {filled && <span className="font-bold text-blue-500 text-sm w-5 text-right flex-shrink-0">{i + 1}.</span>}
              {filled ? (
                <span className="font-bold text-blue-900 text-base">{filled}</span>
              ) : (
                <span className="font-bold text-white text-sm">{i + 1}</span>
              )}
            </div>
          )
        })}
      </div>

      {freeDays.length > 0 && (
        <div className="border-t-2 border-white/20 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {freeDays.map(day => (
              <DraggableTile
                key={day}
                id={day}
                label={day}
                color="bg-blue-100"
                borderColor="border-blue-500"
                textColor="text-blue-900"
                size="sm"
                className="!w-auto min-w-[72px] px-2 text-sm"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
