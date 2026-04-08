'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface Props { onComplete: () => void }

export function DaysOrder({ onComplete }: Props) {
  const speak = useSpeak()
  const [shuffledDays] = useState(() => shuffle([...DAYS]))
  const [slots, setSlots] = useState<(string | null)[]>(Array(7).fill(null))

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
      setTimeout(onComplete, 600)
    }
    return true
  }, [slots, speak, onComplete])

  const placedSet = new Set(slots.filter(Boolean) as string[])
  const freeDays = shuffledDays.filter(d => !placedSet.has(d))

  return (
    <div className="p-3 max-w-sm mx-auto">
      <p className="text-white/70 text-sm font-bold text-center mb-4" dir="rtl">
        גרור את ימות השבוע לפי הסדר הנכון
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {DAYS.map((day, i) => {
          const filled = slots[i]
          return (
            <div
              key={day}
              data-drop-target="true"
              data-target-id={String(i)}
              data-expected-ids={JSON.stringify([day])}
              className={`
                flex items-center gap-2 p-2 rounded-xl border-4
                ${filled ? 'bg-purple-200 border-purple-500' : 'bg-white/10 border-dashed border-white/40'}
                transition-all duration-200 min-h-[44px]
              `}
            >
              <span className="font-bold text-white/50 text-sm w-5 text-right">{i + 1}.</span>
              {filled ? (
                <span className="font-bold text-purple-900 text-sm">{filled}</span>
              ) : (
                <span className="font-bold text-white/30 text-sm">{day}</span>
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
                color="bg-white/20"
                borderColor="border-white/60"
                textColor="text-white"
                size="sm"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
