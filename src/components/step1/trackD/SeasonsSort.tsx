'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface SeasonItem { emoji: string; season: 'winter' | 'spring' | 'summer' | 'fall'; label: string; tts: string }

const SEASON_ITEMS: SeasonItem[] = [
  // Winter
  { emoji: '☂️', season: 'winter', label: 'umbrella',  tts: 'umbrella' },
  { emoji: '🌧️', season: 'winter', label: 'rain',      tts: 'rain' },
  { emoji: '🧥', season: 'winter', label: 'coat',      tts: 'coat' },
  { emoji: '👢', season: 'winter', label: 'boots',     tts: 'boots' },
  { emoji: '🍲', season: 'winter', label: 'hot soup',  tts: 'hot soup' },
  { emoji: '🧤', season: 'winter', label: 'gloves',    tts: 'gloves' },
  { emoji: '⛄', season: 'winter', label: 'snowman',   tts: 'snowman' },
  // Summer
  { emoji: '☀️', season: 'summer', label: 'sun',        tts: 'sun' },
  { emoji: '🏖️', season: 'summer', label: 'beach',      tts: 'beach' },
  { emoji: '👗', season: 'summer', label: 'dress',      tts: 'dress' },
  { emoji: '🩳', season: 'summer', label: 'shorts',     tts: 'shorts' },
  { emoji: '🍦', season: 'summer', label: 'ice cream',  tts: 'ice cream' },
  { emoji: '🧢', season: 'summer', label: 'hat',        tts: 'hat' },
  { emoji: '🕶️', season: 'summer', label: 'sunglasses', tts: 'sunglasses' },
  { emoji: '🍉', season: 'summer', label: 'watermelon', tts: 'watermelon' },
  // Spring
  { emoji: '🌺', season: 'spring', label: 'flowers',    tts: 'flowers' },
  { emoji: '🦋', season: 'spring', label: 'butterfly',  tts: 'butterfly' },
  { emoji: '🐦', season: 'spring', label: 'bird',       tts: 'bird' },
  { emoji: '🐝', season: 'spring', label: 'bee',        tts: 'bee' },
  // Fall
  { emoji: '🍂', season: 'fall', label: 'leaves',    tts: 'leaves' },
  { emoji: '💨', season: 'fall', label: 'wind',      tts: 'wind' },
  { emoji: '🌈', season: 'fall', label: 'rainbow',   tts: 'rainbow' },
  { emoji: '🧣', season: 'fall', label: 'scarf',     tts: 'scarf' },
]

const SEASON_CONFIG = {
  winter: { label: 'Winter ❄️', emoji: '⛄', bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800' },
  spring: { label: 'Spring 🌸', emoji: '🌸', bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800' },
  summer: { label: 'Summer ☀️', emoji: '🏖️', bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800' },
  fall:   { label: 'Fall 🍂',   emoji: '🍂', bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-800' },
}

interface Props { onComplete: () => void }

export function SeasonsSort({ onComplete }: Props) {
  const speak = useSpeak()
  const [items] = useState(() => shuffle([...SEASON_ITEMS]))
  const [placed, setPlaced] = useState<Record<string, string>>({}) // label → season
  const [wrongSeason, setWrongSeason] = useState<string | null>(null)

  const totalItems = SEASON_ITEMS.length
  const placedCount = Object.keys(placed).length
  const allDone = placedCount === totalItems

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetSeason = targetEl.getAttribute('data-season')
    if (!targetSeason) return false
    const item = SEASON_ITEMS.find(i => i.label === tileId)
    if (!item || placed[item.label]) return false
    if (item.season !== targetSeason) {
      setWrongSeason(targetSeason)
      setTimeout(() => setWrongSeason(null), 400)
      return false  // snap back
    }
    setPlaced(prev => {
      const next = { ...prev, [item.label]: targetSeason }
      if (Object.keys(next).length === totalItems) setTimeout(onComplete, 600)
      return next
    })
    speak(targetSeason, 0.8)
    return true
  }, [placed, totalItems, onComplete, speak])

  const unplaced = items.filter(i => !placed[i.label])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className="text-center text-black font-bold text-xl mb-3" dir="rtl">
        לחץ על התמונה וגרור אותה לעונה הנכונה
      </p>
      <div className="text-center text-black font-bold text-sm mb-3">
        {placedCount}/{totalItems} sorted
      </div>

      {/* 4 season drop zones */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {(Object.keys(SEASON_CONFIG) as (keyof typeof SEASON_CONFIG)[]).map(season => {
          const cfg = SEASON_CONFIG[season]
          const isWrong = wrongSeason === season
          const seasonPlaced = SEASON_ITEMS.filter(i => placed[i.label] === season)
          return (
            <div
              key={season}
              data-drop-target="true"
              data-season={season}
              data-expected-ids={JSON.stringify(SEASON_ITEMS.filter(i => i.season === season).map(i => i.label))}
              className={`
                ${cfg.bg} border-4 ${cfg.border} rounded-2xl p-3 min-h-[120px]
                transition-all duration-150
                ${isWrong ? 'scale-95 border-red-400 bg-red-50' : ''}
              `}
            >
              <div className={`text-center font-black text-xl ${cfg.text} mb-2`}>
                {cfg.label}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {seasonPlaced.map(item => (
                  <span key={item.label} className="text-2xl">{item.emoji}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Draggable item tiles */}
      {unplaced.length > 0 && (
        <div className="border-t-2 border-white/20 pt-3">
          <div className="flex flex-wrap justify-center gap-2">
            {unplaced.map(item => (
              <DraggableTile
                key={item.label}
                id={item.label}
                label={item.emoji}
                color="bg-white"
                borderColor="border-black"
                textColor="text-black"
                size="md"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}

      {allDone && (
        <div className="text-center mt-4 flex flex-col items-center gap-3">
          <span className="text-5xl bounce-in">🎉</span>
          <button onClick={() => {
            setPlaced({})
          }} className="btn-kid bg-blue-500">
            🔁 Again
          </button>
        </div>
      )}
    </div>
  )
}
