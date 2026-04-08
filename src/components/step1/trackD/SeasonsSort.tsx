'use client'
import { useState, useCallback } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface SeasonItem { emoji: string; season: 'winter' | 'spring' | 'summer' | 'fall'; label: string }

const SEASON_ITEMS: SeasonItem[] = [
  // Winter
  { emoji: '☂️', season: 'winter', label: 'umbrella' },
  { emoji: '🌧️', season: 'winter', label: 'rain' },
  { emoji: '🧥', season: 'winter', label: 'coat' },
  { emoji: '👢', season: 'winter', label: 'boots' },
  { emoji: '🍲', season: 'winter', label: 'hot soup' },
  { emoji: '🧤', season: 'winter', label: 'gloves' },
  { emoji: '⛄', season: 'winter', label: 'snowman' },
  // Summer
  { emoji: '☀️', season: 'summer', label: 'sun' },
  { emoji: '🏖️', season: 'summer', label: 'beach' },
  { emoji: '👗', season: 'summer', label: 'dress' },
  { emoji: '🩳', season: 'summer', label: 'shorts' },
  { emoji: '🍦', season: 'summer', label: 'ice cream' },
  { emoji: '🎩', season: 'summer', label: 'hat' },
  { emoji: '🕶️', season: 'summer', label: 'sunglasses' },
  { emoji: '🍉', season: 'summer', label: 'watermelon' },
  // Spring
  { emoji: '🌺', season: 'spring', label: 'flowers' },
  { emoji: '🦋', season: 'spring', label: 'butterflies' },
  { emoji: '🐦', season: 'spring', label: 'birds' },
  { emoji: '🐝', season: 'spring', label: 'bees' },
  // Fall
  { emoji: '🍂', season: 'fall', label: 'leaves' },
  { emoji: '💨', season: 'fall', label: 'wind' },
  { emoji: '🌈', season: 'fall', label: 'rainbow' },
  { emoji: '🧣', season: 'fall', label: 'scarf' },
]

const SEASON_CONFIG = {
  winter: { label: 'Winter', emoji: '⛄', bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
  spring: { label: 'Spring', emoji: '🌸', bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-800' },
  summer: { label: 'Summer', emoji: '🏖️', bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-800' },
  fall:   { label: 'Fall',   emoji: '🍂', bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-800' },
}

interface Props { onComplete: () => void }

export function SeasonsSort({ onComplete }: Props) {
  const speak = useSpeak()
  const [items] = useState(() => shuffle([...SEASON_ITEMS]))
  const [placed, setPlaced] = useState<Record<string, string>>({}) // emoji → season
  const [dragItem, setDragItem] = useState<SeasonItem | null>(null)
  const [wrongTarget, setWrongTarget] = useState<string | null>(null)

  const totalItems = SEASON_ITEMS.length
  const placedCount = Object.keys(placed).length
  const allDone = placedCount === totalItems

  const handleDragStart = (item: SeasonItem) => setDragItem(item)
  const handleDragEnd = () => setDragItem(null)

  const handleDrop = (season: string) => {
    if (!dragItem) return
    if (dragItem.season === season) {
      setPlaced(prev => ({ ...prev, [dragItem.emoji]: season }))
      speak(season, 0.8)
      const newCount = Object.keys(placed).length + 1
      if (newCount === totalItems) setTimeout(onComplete, 600)
    } else {
      setWrongTarget(season)
      setTimeout(() => setWrongTarget(null), 400)
    }
    setDragItem(null)
  }

  const unplaced = items.filter(i => !placed[i.emoji])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-center text-white/70 text-sm font-bold mb-3">
        {placedCount}/{totalItems} sorted
      </div>

      {/* 4 season quadrants */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {(Object.keys(SEASON_CONFIG) as (keyof typeof SEASON_CONFIG)[]).map(season => {
          const cfg = SEASON_CONFIG[season]
          const isWrong = wrongTarget === season
          const seasonPlaced = SEASON_ITEMS.filter(i => placed[i.emoji] === season)
          return (
            <div
              key={season}
              className={`
                ${cfg.bg} border-4 ${cfg.border} rounded-2xl p-2 min-h-[100px]
                transition-all duration-150
                ${isWrong ? 'scale-95 border-red-400' : ''}
              `}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(season)}
              onTouchEnd={() => dragItem && handleDrop(season)}
            >
              <div className={`text-center font-bold text-xs ${cfg.text} mb-1`}>
                <span className="text-lg">{cfg.emoji}</span> {cfg.label}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {seasonPlaced.map(item => (
                  <span key={item.emoji} className="text-xl">{item.emoji}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Draggable items */}
      {unplaced.length > 0 && (
        <div className="border-t-2 border-white/20 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(item => (
              <button
                key={item.emoji}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  // on mobile, two-tap: first tap selects, second tap on quadrant drops
                  if (dragItem?.emoji === item.emoji) {
                    setDragItem(null)
                  } else {
                    setDragItem(item)
                  }
                }}
                className={`
                  w-14 h-14 rounded-2xl border-4 text-2xl
                  flex items-center justify-center
                  cursor-grab active:cursor-grabbing select-none
                  transition-all duration-150
                  ${dragItem?.emoji === item.emoji
                    ? 'bg-white/40 border-white scale-110 shadow-lg'
                    : 'bg-white/20 border-white/40 hover:bg-white/30 hover:scale-105'}
                `}
                title={item.label}
              >
                {item.emoji}
              </button>
            ))}
          </div>
          {dragItem && (
            <p className="text-center text-white/60 text-xs font-bold mt-2" dir="rtl">
              לחץ על העונה הנכונה
            </p>
          )}
        </div>
      )}

      {/* Season quadrant tap handlers for mobile */}
      {dragItem && (
        <div className="fixed inset-0 z-10 grid grid-cols-2" style={{ pointerEvents: 'none' }}>
          {(Object.keys(SEASON_CONFIG) as (keyof typeof SEASON_CONFIG)[]).map(season => (
            <button
              key={season}
              className="pointer-events-auto opacity-0"
              onClick={() => handleDrop(season)}
            />
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center mt-4">
          <span className="text-5xl bounce-in">🎉</span>
        </div>
      )}
    </div>
  )
}
