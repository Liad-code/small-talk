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
    id: 'whiny-a',
    label: 'WHINY A',
    bg: 'bg-lime-50',
    border: 'border-lime-400',
    text: 'text-lime-800',
    header: 'bg-gradient-to-b from-lime-400 to-lime-500',
  },
  {
    id: 'ch',
    label: 'CH',
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-800',
    header: 'bg-gradient-to-b from-red-400 to-red-500',
  },
  {
    id: 'sh',
    label: 'SH',
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-800',
    header: 'bg-gradient-to-b from-blue-400 to-blue-500',
  },
  {
    id: 'th',
    label: 'TH',
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-800',
    header: 'bg-gradient-to-b from-green-400 to-emerald-500',
  },
]

// ── Word tiles (emoji only visible during exercise) ─────────────────────────

const ALL_TILES = [
  // WHINY A
  { id: 'camp',  word: 'camp',  emoji: '⛺',  cat: 'whiny-a' },
  { id: 'sand',  word: 'sand',  emoji: '🏜️',  cat: 'whiny-a' },
  { id: 'man',   word: 'man',   emoji: '👨',  cat: 'whiny-a' },
  { id: 'jam',   word: 'jam',   emoji: '🍯',  cat: 'whiny-a' },
  { id: 'fan',   word: 'fan',   emoji: '🪭',  cat: 'whiny-a' },
  { id: 'pan',   word: 'pan',   emoji: '🍳',  cat: 'whiny-a' },
  // CH
  { id: 'cheese',   word: 'cheese',   emoji: '🧀', cat: 'ch' },
  { id: 'chair',    word: 'chair',    emoji: '🪑', cat: 'ch' },
  { id: 'peach',    word: 'peach',    emoji: '🍑', cat: 'ch' },
  { id: 'beach-ch', word: 'beach',    emoji: '🏖️', cat: 'ch' },
  { id: 'chips',    word: 'chips',    emoji: '🍟', cat: 'ch' },
  // SH
  { id: 'sheep', word: 'sheep', emoji: '🐑', cat: 'sh' },
  { id: 'fish',  word: 'fish',  emoji: '🐟', cat: 'sh' },
  { id: 'shirt', word: 'shirt', emoji: '👕', cat: 'sh' },
  { id: 'ship',  word: 'ship',  emoji: '🚢', cat: 'sh' },
  { id: 'shoes', word: 'shoes', emoji: '👟👟', cat: 'sh' },
  // TH
  { id: 'math',  word: 'math',  emoji: '🧮', cat: 'th' },
  { id: 'tooth', word: 'tooth', emoji: '🦷', cat: 'th' },
  { id: 'thumb', word: 'thumb', emoji: '👍', cat: 'th' },
  { id: 'three', word: 'three', emoji: '3️⃣', cat: 'th' },
  { id: 'mouth', word: 'mouth', emoji: '👄', cat: 'th' },
]

// ── Exercise component ───────────────────────────────────────────────────────

function SortExercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [tiles, setTiles] = useState(() => shuffle([...ALL_TILES]))
  const [placed, setPlaced] = useState<Set<string>>(new Set())

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
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">
        לחץ על התמונה לשמוע את המילה — גרור למקום הנכון בטבלה
      </p>

      {/* Progress */}
      <p className="text-center text-indigo-500 font-bold text-sm mb-3">
        {placed.size} / {ALL_TILES.length} ✓
      </p>

      {/* 4-column sort table */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {CATEGORIES.map(cat => {
          const catPlaced = ALL_TILES.filter(t => t.cat === cat.id && placed.has(t.id))
          return (
            <div key={cat.id} className="flex flex-col">
              {/* Column header */}
              <div className={`${cat.header} rounded-t-xl py-2 px-1 text-center`}>
                <span className="font-display font-black text-white text-base leading-none">
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
                  <span key={t.id} className="text-3xl bounce-in leading-none">
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
            {unplaced.map(tile => (
              <DraggableTile
                key={tile.id}
                id={tile.id}
                label={tile.emoji}
                color="bg-white"
                borderColor="border-gray-300"
                textColor="text-gray-700"
                size="lg"
                onClick={() => speak(tile.word, 0.8)}
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Exercise1Page() {
  const [done, setDone] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">
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
              <Link href="/step2/phonics" className="btn-kid bg-purple-500 no-underline">
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
