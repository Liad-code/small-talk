'use client'
import { useState } from 'react'
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
  winter: { label: 'Winter', emoji: '⛄', bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800' },
  spring: { label: 'Spring', emoji: '🌸', bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800' },
  summer: { label: 'Summer', emoji: '🏖️', bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800' },
  fall:   { label: 'Fall',   emoji: '🍂', bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-800' },
}

interface Props { onComplete: () => void }

export function SeasonsSort({ onComplete }: Props) {
  const speak = useSpeak()
  const [items] = useState(() => shuffle([...SEASON_ITEMS]))
  const [placed, setPlaced] = useState<Record<string, string>>({}) // emoji → season
  const [selectedItem, setSelectedItem] = useState<SeasonItem | null>(null)
  const [wrongTarget, setWrongTarget] = useState<string | null>(null)

  const totalItems = SEASON_ITEMS.length
  const placedCount = Object.keys(placed).length
  const allDone = placedCount === totalItems

  function handleItemTap(item: SeasonItem) {
    if (placed[item.emoji]) return // already placed
    speak(item.label, 0.8)
    setSelectedItem(prev => prev?.emoji === item.emoji ? null : item)
  }

  function handleSeasonTap(season: string) {
    if (!selectedItem) return
    if (selectedItem.season === season) {
      setPlaced(prev => ({ ...prev, [selectedItem.emoji]: season }))
      speak(season, 0.8)
      setSelectedItem(null)
      const newCount = Object.keys(placed).length + 1
      if (newCount === totalItems) setTimeout(onComplete, 600)
    } else {
      setWrongTarget(season)
      setTimeout(() => setWrongTarget(null), 400)
      setSelectedItem(null)
    }
  }

  const unplaced = items.filter(i => !placed[i.emoji])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-center text-black font-bold text-sm mb-3">
        {placedCount}/{totalItems} sorted
      </div>

      {selectedItem && (
        <p className="text-center text-black font-bold text-sm mb-2" dir="rtl">
          בחרת: {selectedItem.emoji} — לחץ על העונה הנכונה!
        </p>
      )}

      {/* 4 season quadrants */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {(Object.keys(SEASON_CONFIG) as (keyof typeof SEASON_CONFIG)[]).map(season => {
          const cfg = SEASON_CONFIG[season]
          const isWrong = wrongTarget === season
          const isHighlight = selectedItem !== null
          const seasonPlaced = SEASON_ITEMS.filter(i => placed[i.emoji] === season)
          return (
            <div
              key={season}
              onClick={() => handleSeasonTap(season)}
              className={`
                ${cfg.bg} border-4 ${cfg.border} rounded-2xl p-2 min-h-[110px]
                transition-all duration-150
                ${isHighlight ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''}
                ${isWrong ? 'scale-95 border-red-400' : ''}
              `}
            >
              <div className={`text-center font-bold text-sm ${cfg.text} mb-1`}>
                <span className="text-2xl">{cfg.emoji}</span>
                <span className="font-black text-base ml-1">{cfg.label}</span>
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

      {/* Draggable items (tap to select) */}
      {unplaced.length > 0 && (
        <div className="border-t-2 border-white/20 pt-3">
          <p className="text-center text-black font-bold text-sm mb-2" dir="rtl">
            לחץ על פריט ואז על העונה הנכונה
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(item => (
              <button
                key={item.emoji}
                onClick={() => handleItemTap(item)}
                className={`
                  w-16 h-16 rounded-2xl border-4 text-2xl
                  flex items-center justify-center
                  cursor-pointer select-none
                  transition-all duration-150
                  ${selectedItem?.emoji === item.emoji
                    ? 'bg-white border-black scale-125 shadow-xl'
                    : 'bg-white/80 border-black hover:scale-110 hover:bg-white active:scale-90'}
                `}
                title={item.label}
              >
                {item.emoji}
              </button>
            ))}
          </div>
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
