'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'

const WEATHERS = [
  { id: 'sunny',  label: 'Sunny',  emoji: '☀️'  },
  { id: 'rainy',  label: 'Rainy',  emoji: '🌧️' },
  { id: 'snowy',  label: 'Snowy',  emoji: '❄️'  },
  { id: 'cloudy', label: 'Cloudy', emoji: '☁️'  },
]

export function WeatherHousesGame({ onComplete }: { onComplete: () => void }) {
  const [placed, setPlaced] = useState<Record<string, string>>({}) // houseId → weatherId

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId) return false
    if (placed[targetId]) return false
    if (tileId !== targetId) return false  // wrong house — snap back
    const next = { ...placed, [targetId]: tileId }
    setPlaced(next)
    if (Object.keys(next).length === WEATHERS.length) {
      setTimeout(onComplete, 600)
    }
    return true
  }, [placed, onComplete])

  const placedWeatherIds = new Set(Object.values(placed))
  const freeWeathers = WEATHERS.filter(w => !placedWeatherIds.has(w.id))
  const allDone = Object.keys(placed).length === WEATHERS.length

  if (allDone) {
    return (
      <div className="text-center py-10 bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-display font-bold text-2xl text-white" dir="rtl">כל הכבוד!</p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        גרור את מזג האוויר הנכון לכל בית
      </p>

      {/* Four houses */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {WEATHERS.map(w => {
          const isDone = !!placed[w.id]
          return (
            <div key={w.id} className="flex flex-col items-center">
              {/* House label */}
              <span className="font-bold text-white text-sm mb-1">{w.label}</span>
              {/* House SVG roof */}
              <svg width="72" height="36" viewBox="0 0 72 36" className="-mb-px">
                <polygon points="36,3 3,33 69,33" fill="#f97316" stroke="#9a3412" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              {/* House body — drop zone */}
              <div
                data-drop-target="true"
                data-expected-ids={JSON.stringify([w.id])}
                data-target-id={w.id}
                className={`
                  w-[72px] h-[72px] border-4 rounded-b-xl flex items-center justify-center
                  transition-all
                  ${isDone
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white/20 border-white/40 hover:bg-white/30'}
                `}
              >
                {isDone ? (
                  <span className="text-4xl">{w.emoji}</span>
                ) : (
                  <span className="text-white/30 text-2xl">🏠</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Weather tile bank */}
      <div className="border-t-2 border-white/20 pt-3 flex flex-wrap gap-3 justify-center">
        {freeWeathers.map(w => (
          <DraggableTile
            key={w.id}
            id={w.id}
            label={w.emoji}
            color="bg-white/20"
            borderColor="border-white/40"
            textColor="text-white"
            size="lg"
            onDropped={handleDrop}
          />
        ))}
      </div>
    </div>
  )
}
