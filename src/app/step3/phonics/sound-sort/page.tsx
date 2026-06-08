'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

// ── Categories (columns) ────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'igh',
    label: 'igh',
    bg: 'bg-indigo-50',
    border: 'border-indigo-400',
    text: 'text-indigo-800',
    header: 'bg-gradient-to-b from-indigo-400 to-indigo-500',
  },
  {
    id: 'oy-oi',
    label: 'oy / oi',
    bg: 'bg-teal-50',
    border: 'border-teal-400',
    text: 'text-teal-800',
    header: 'bg-gradient-to-b from-teal-400 to-teal-500',
  },
  {
    id: 'ow-ou',
    label: 'ow / ou',
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-800',
    header: 'bg-gradient-to-b from-green-400 to-emerald-500',
  },
]

// ── Word tiles (emoji only visible during exercise) ─────────────────────────

const ALL_TILES = [
  // igh
  { id: 'night', word: 'night', emoji: '🌙', cat: 'igh' },
  { id: 'light', word: 'light', emoji: '💡', cat: 'igh' },
  { id: 'right', word: 'right', emoji: '✅', cat: 'igh' },
  // oy / oi
  { id: 'boy',  word: 'boy',  emoji: '👦', cat: 'oy-oi' },
  { id: 'toy',  word: 'toy',  emoji: '🧸', cat: 'oy-oi' },
  { id: 'coin', word: 'coin', emoji: '🪙', cat: 'oy-oi' },
  // ow / ou
  { id: 'cloud', word: 'cloud', emoji: '☁️', cat: 'ow-ou' },
  { id: 'house', word: 'house', emoji: '🏠', cat: 'ow-ou' },
  { id: 'cow',   word: 'cow',   emoji: '🐄', cat: 'ow-ou' },
]

// ── Exercise component ───────────────────────────────────────────────────────

function SortExercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [tiles] = useState(() => shuffle([...ALL_TILES]))
  const [placed, setPlaced] = useState<Set<string>>(new Set())
  const [flipped, setFlipped] = useState<Set<string>>(new Set())

  const toggleFlip = useCallback((tileId: string) => {
    setFlipped(prev => {
      const n = new Set(prev)
      if (n.has(tileId)) n.delete(tileId)
      else n.add(tileId)
      return n
    })
  }, [])

  const allDone = placed.size === ALL_TILES.length

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 600)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const catId = targetEl.getAttribute('data-target-id')
    if (!catId) return false
    if (placed.has(tileId)) return false
    const tile = ALL_TILES.find(t => t.id === tileId)
    if (!tile) return false
    if (tile.cat !== catId) return false  // wrong column → snap back
    setPlaced(prev => { const n = new Set(prev); n.add(tileId); return n })
    return true
  }, [placed])

  const unplaced = tiles.filter(t => !placed.has(t.id))

  return (
    <div className="px-3 pb-10 max-w-xl mx-auto">
      <p className="text-center text-gray-700 font-bold text-lg sm:text-xl mb-4" dir="rtl">
        לחץ על התמונה לשמוע את המילה — גרור למקום הנכון בטבלה
        <br />
        לחיצה על ↻ תאפשר לראות את התיאור באנגלית
      </p>

      {/* Progress */}
      <p className="text-center text-emerald-600 font-bold text-sm mb-3">
        {placed.size} / {ALL_TILES.length} ✓
      </p>

      {/* 3-column sort table */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {CATEGORIES.map(cat => {
          const catPlaced = ALL_TILES.filter(t => t.cat === cat.id && placed.has(t.id))
          return (
            <div key={cat.id} className="flex flex-col">
              {/* Column header */}
              <div className={`${cat.header} rounded-t-xl py-2 px-1 text-center`}>
                <span className="font-display font-black text-white text-xl leading-none">
                  {cat.label}
                </span>
              </div>

              {/* Drop target */}
              <div
                data-drop-target="true"
                data-target-id={cat.id}
                data-expected-ids={JSON.stringify(
                  ALL_TILES.filter(t => t.cat === cat.id).map(t => t.id)
                )}
                className={`
                  flex-1 min-h-[180px] rounded-b-xl border-4 ${cat.border} ${cat.bg}
                  flex flex-col flex-wrap items-center justify-start gap-1 p-1 pt-2
                `}
              >
                {catPlaced.map(t => (
                  <span key={t.id} className="text-4xl bounce-in leading-none">
                    {t.emoji}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tile bank */}
      {unplaced.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {unplaced.map(tile => {
              const isFlipped = flipped.has(tile.id)
              return (
                <DraggableTile
                  key={tile.id}
                  id={tile.id}
                  label={tile.emoji}
                  color="bg-white"
                  borderColor="border-gray-300"
                  textColor="text-gray-700"
                  size="lg"
                  className="relative"
                  onClick={() => speak(tile.word, 0.8)}
                  onDropped={handleDrop}
                >
                  <span className={isFlipped ? 'font-display font-black text-base text-gray-700 px-1 text-center leading-tight' : 'text-4xl leading-none'}>
                    {isFlipped ? tile.word : tile.emoji}
                  </span>
                  <button
                    type="button"
                    aria-label="flip"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); toggleFlip(tile.id) }}
                    className="absolute bottom-0.5 left-0.5 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs flex items-center justify-center shadow-sm leading-none"
                  >
                    ↻
                  </button>
                </DraggableTile>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function SoundSortPage() {
  const [done, setDone] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Phonics
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">
            Sound Sort 🎲
          </h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">
            גרור כל תמונה לעמודת הצליל הנכון
          </p>
        </div>
      </div>

      <div className="pt-5">
        {done ? (
          <div className="text-center py-10 px-4 bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-display font-bold text-3xl text-green-600 mb-1">Well done!</p>
            <p className="font-bold text-gray-500 mb-6" dir="rtl">כל הכבוד! מיינת את כל התמונות!</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setDone(false); setKey(k => k + 1) }}
                className="btn-kid bg-blue-500"
              >
                🔁 Again
              </button>
              <Link href="/step3/phonics" className="btn-kid bg-green-500 no-underline">
                ← Back
              </Link>
            </div>
          </div>
        ) : (
          <SortExercise key={key} onComplete={() => setDone(true)} />
        )}
      </div>
    </div>
  )
}
