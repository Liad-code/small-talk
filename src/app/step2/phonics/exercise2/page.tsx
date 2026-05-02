'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const CATEGORIES = [
  { id: 'ck', label: 'CK', bg: 'bg-indigo-50', border: 'border-indigo-400', header: 'bg-gradient-to-b from-indigo-500 to-violet-600' },
  { id: 'ph', label: 'PH', bg: 'bg-orange-50', border: 'border-orange-400', header: 'bg-gradient-to-b from-orange-500 to-red-500' },
  { id: 'wh', label: 'WH', bg: 'bg-sky-50',    border: 'border-sky-400',    header: 'bg-gradient-to-b from-sky-500 to-blue-600' },
]

const ALL_TILES = [
  { id: 'ck-truck',    word: 'truck',    emoji: '🚚', cat: 'ck' },
  { id: 'ck-duck',     word: 'duck',     emoji: '🦆', cat: 'ck' },
  { id: 'ck-lock',     word: 'lock',     emoji: '🔒', cat: 'ck' },
  { id: 'ck-sock',     word: 'sock',     emoji: '🧦', cat: 'ck' },
  { id: 'ck-clock',    word: 'clock',    emoji: '🕐', cat: 'ck' },
  { id: 'ph-trophy',   word: 'trophy',   emoji: '🏆', cat: 'ph' },
  { id: 'ph-photo',    word: 'photo',    emoji: '📸', cat: 'ph' },
  { id: 'ph-dolphin',  word: 'dolphin',  emoji: '🐬', cat: 'ph' },
  { id: 'ph-elephant', word: 'elephant', emoji: '🐘', cat: 'ph' },
  { id: 'ph-phone',    word: 'phone',    emoji: '📱', cat: 'ph' },
  { id: 'wh-whale',    word: 'whale',    emoji: '🐋', cat: 'wh' },
  { id: 'wh-wheel',    word: 'wheel',    emoji: '🎡', cat: 'wh' },
  { id: 'wh-wheat',    word: 'wheat',    emoji: '🌾', cat: 'wh' },
  { id: 'wh-whisk',    word: 'whisk',    emoji: '🥄', cat: 'wh' },
  { id: 'wh-white',    word: 'white',    emoji: '⬜', cat: 'wh' },
]

function SortExercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [tiles] = useState(() => shuffle([...ALL_TILES]))
  const [placed, setPlaced] = useState<Set<string>>(new Set())
  const allDone = placed.size === ALL_TILES.length

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 600)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const catId = targetEl.getAttribute('data-target-id')
    if (!catId || placed.has(tileId)) return false
    const tile = ALL_TILES.find(t => t.id === tileId)
    if (!tile || tile.cat !== catId) return false
    setPlaced(prev => { const n = new Set(prev); n.add(tileId); return n })
    return true
  }, [placed])

  const unplaced = tiles.filter(t => !placed.has(t.id))

  return (
    <div className="px-3 pb-10 max-w-xl mx-auto">
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">
        לחץ על התמונה לשמוע את המילה — גרור למקום הנכון בטבלה
      </p>
      <p className="text-center text-indigo-500 font-bold text-sm mb-3">{placed.size} / {ALL_TILES.length} ✓</p>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {CATEGORIES.map(cat => {
          const catPlaced = ALL_TILES.filter(t => t.cat === cat.id && placed.has(t.id))
          return (
            <div key={cat.id} className="flex flex-col">
              <div className={`${cat.header} rounded-t-xl py-2 px-1 text-center`}>
                <span className="font-display font-black text-white text-base leading-none">{cat.label}</span>
              </div>
              <div
                data-drop-target="true"
                data-target-id={cat.id}
                className={`flex-1 min-h-[180px] rounded-b-xl border-4 ${cat.border} ${cat.bg} flex flex-col flex-wrap items-center justify-start gap-1 p-1 pt-2`}
              >
                {catPlaced.map(t => (
                  <span key={t.id} className="text-3xl bounce-in leading-none">{t.emoji}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

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

export default function Exercise2Page() {
  const [done, setDone] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-indigo-500 to-sky-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Phonics</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Sound Sort 2 🎲</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">מיון צלילים — CK · PH · WH</p>
        </div>
      </div>
      <div className="pt-5">
        {done ? (
          <div className="text-center py-10 px-4 bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-display font-bold text-3xl text-green-600 mb-1">Well done!</p>
            <p className="font-bold text-gray-500 mb-6" dir="rtl">כל הכבוד! מיינת את כל התמונות!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setDone(false); setKey(k => k + 1) }} className="btn-kid bg-blue-500">🔁 Again</button>
              <Link href="/step2/phonics" className="btn-kid bg-purple-500 no-underline">← Back</Link>
            </div>
          </div>
        ) : (
          <SortExercise key={key} onComplete={() => setDone(true)} />
        )}
      </div>
    </div>
  )
}
