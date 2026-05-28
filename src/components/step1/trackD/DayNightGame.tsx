'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { shuffle } from '@/utils/shuffle'

const ALL_ACTIVITIES = [
  { id: 'wakeup',       label: 'Wake Up',             emoji: '⏰', isDay: true  },
  { id: 'breakfast',    label: 'Have Breakfast',      emoji: '🍳', isDay: true  },
  { id: 'school',       label: 'Go to School',        emoji: '🏫', isDay: true  },
  { id: 'dressed',      label: 'Get Dressed',         emoji: '👕', isDay: true  },
  { id: 'schoolbag',    label: 'Pack Schoolbag',      emoji: '🎒', isDay: true  },
  { id: 'washface',     label: 'Wash Your Face',      emoji: '🧼', isDay: true  },
  { id: 'sleep',        label: 'Sleep',               emoji: '😴', isDay: false },
  { id: 'dinner',       label: 'Have Dinner',         emoji: '🍽️', isDay: false },
  { id: 'bath',         label: 'Take a Bath',         emoji: '🛁', isDay: false },
  { id: 'story',        label: 'Read a Story',        emoji: '📖', isDay: false },
  { id: 'pajamas',      label: 'Wear Pajamas',        emoji: '🌙', isDay: false },
  { id: 'teeth',        label: 'Brush Your Teeth',    emoji: '🦷', isDay: false },
]

type Zone = 'day' | 'night'

export function DayNightGame({ onComplete }: { onComplete: () => void }) {
  const [activities] = useState(() => shuffle(ALL_ACTIVITIES))
  const [placed, setPlaced] = useState<Record<string, Zone>>({})
  const [done, setDone] = useState(false)

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const zone = targetEl.getAttribute('data-zone') as Zone | null
    if (!zone) return false
    const activity = ALL_ACTIVITIES.find(a => a.id === tileId)
    if (!activity) return false
    if (placed[tileId]) return false

    const correct = (zone === 'day') === activity.isDay
    if (correct) {
      const next = { ...placed, [tileId]: zone }
      setPlaced(next)
      if (Object.keys(next).length === ALL_ACTIVITIES.length) {
        setDone(true)
        setTimeout(onComplete, 600)
      }
      return true
    }
    return false  // snap back on wrong zone
  }, [placed, onComplete])

  const freeTiles = activities.filter(a => !placed[a.id])
  const dayPlaced  = activities.filter(a => placed[a.id] === 'day')
  const nightPlaced = activities.filter(a => placed[a.id] === 'night')

  if (done) {
    return (
      <div className="text-center py-10 bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-display font-bold text-2xl text-white" dir="rtl">כל הכבוד!</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        גרור כל פעולה לעמודה הנכונה — יום או לילה
      </p>

      {/* Two drop zones */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* DAY zone */}
        <div
          data-zone="day"
          data-drop-target="true"
          data-expected-ids="[]"
          className="bg-yellow-100/80 border-4 border-yellow-400 rounded-2xl min-h-[160px] p-2"
        >
          <div className="text-center font-display font-black text-lg text-yellow-800 mb-2">☀️ DAY</div>
          <div className="flex flex-col gap-1">
            {dayPlaced.map(a => (
              <div key={a.id} className="flex items-center gap-1 bg-white/60 rounded-lg px-2 py-1">
                <span className="text-lg">{a.emoji}</span>
                <span className="text-xs font-bold text-yellow-900 leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NIGHT zone */}
        <div
          data-zone="night"
          data-drop-target="true"
          data-expected-ids="[]"
          className="bg-indigo-100/80 border-4 border-indigo-400 rounded-2xl min-h-[160px] p-2"
        >
          <div className="text-center font-display font-black text-lg text-indigo-800 mb-2">🌙 NIGHT</div>
          <div className="flex flex-col gap-1">
            {nightPlaced.map(a => (
              <div key={a.id} className="flex items-center gap-1 bg-white/60 rounded-lg px-2 py-1">
                <span className="text-lg">{a.emoji}</span>
                <span className="text-xs font-bold text-indigo-900 leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free tiles bank */}
      <div className="border-t-2 border-white/20 pt-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {freeTiles.map(a => (
            <DraggableTile
              key={a.id}
              id={a.id}
              label={`${a.emoji} ${a.label}`}
              color="bg-white/20"
              borderColor="border-white/40"
              textColor="text-white"
              size="sm"
              onDropped={handleDrop}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-white/60 font-bold text-xs mt-3">
        {Object.keys(placed).length}/{ALL_ACTIVITIES.length} sorted
      </p>
    </div>
  )
}
