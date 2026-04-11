'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'

type ClothingType = 'hat' | 'top' | 'pants' | 'shoes'

interface ClothingItem { id: string; emoji: string; type: ClothingType }

const CLOTHING_ITEMS: ClothingItem[] = [
  // Hats (3)
  { id: 'hat-1', emoji: '🎩', type: 'hat' },
  { id: 'hat-2', emoji: '👒', type: 'hat' },
  { id: 'hat-3', emoji: '🧢', type: 'hat' },
  // Shirts/Tops (4)
  { id: 'top-1', emoji: '👕', type: 'top' },
  { id: 'top-2', emoji: '👔', type: 'top' },
  { id: 'top-3', emoji: '🎽', type: 'top' },
  { id: 'top-4', emoji: '🥼', type: 'top' },
  // Dresses (3) — go in 'top' zone
  { id: 'dress-1', emoji: '👗', type: 'top' },
  { id: 'dress-2', emoji: '🥻', type: 'top' },
  { id: 'dress-3', emoji: '🩱', type: 'top' },
  // Pants (3)
  { id: 'pants-1', emoji: '👖', type: 'pants' },
  { id: 'pants-2', emoji: '🩳', type: 'pants' },
  { id: 'pants-3', emoji: '🩲', type: 'pants' },
  // Shoes (4)
  { id: 'shoes-1', emoji: '👟', type: 'shoes' },
  { id: 'shoes-2', emoji: '👠', type: 'shoes' },
  { id: 'shoes-3', emoji: '👢', type: 'shoes' },
  { id: 'shoes-4', emoji: '🥿', type: 'shoes' },
]

interface CharOutfit { hat: string | null; top: string | null; pants: string | null; shoes: string | null }

const ZONE_LABELS: Record<ClothingType, string> = {
  hat: '🎩', top: '👕', pants: '👖', shoes: '👟',
}

const ZONE_STYLES: Record<ClothingType, string> = {
  hat:   'bg-yellow-50 border-yellow-300',
  top:   'bg-blue-50 border-blue-300',
  pants: 'bg-gray-100 border-gray-300',
  shoes: 'bg-amber-50 border-amber-300',
}

const CHARACTERS = [
  { face: '👦', label: 'Boy',  bg: 'bg-sky-100',  border: 'border-sky-400' },
  { face: '👧', label: 'Girl', bg: 'bg-rose-100', border: 'border-rose-400' },
]

function emptyOutfit(): CharOutfit { return { hat: null, top: null, pants: null, shoes: null } }

function getEmoji(id: string | null) {
  if (!id) return null
  return CLOTHING_ITEMS.find(c => c.id === id)?.emoji ?? null
}

interface Props { onComplete: () => void }

export function DressMe({ onComplete }: Props) {
  const [outfits, setOutfits] = useState<[CharOutfit, CharOutfit]>([emptyOutfit(), emptyOutfit()])
  const [done, setDone] = useState(false)

  const getType = (id: string): ClothingType | null =>
    CLOTHING_ITEMS.find(c => c.id === id)?.type ?? null

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const charId = parseInt(targetEl.getAttribute('data-char-id') ?? '-1')
    const zoneType = targetEl.getAttribute('data-zone-type') as ClothingType | null
    if (charId < 0 || charId > 1 || !zoneType) return false
    const itemType = getType(tileId)
    if (itemType !== zoneType) return false

    setOutfits(prev => {
      const next: [CharOutfit, CharOutfit] = [{ ...prev[0] }, { ...prev[1] }]
      next[charId] = { ...next[charId], [zoneType]: tileId }
      return next
    })
    return true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPlaced = outfits.reduce((s, o) =>
    s + [o.hat, o.top, o.pants, o.shoes].filter(Boolean).length, 0)

  function handleDone() {
    setDone(true)
    setTimeout(onComplete, 400)
  }

  function handleAgain() {
    setOutfits([emptyOutfit(), emptyOutfit()])
    setDone(false)
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className="text-center text-black font-bold text-base mb-4" dir="rtl">
        גרור את הבגדים להלבשת הדמויות!
      </p>

      {/* Two characters side by side */}
      <div className="flex gap-3 justify-center mb-5">
        {CHARACTERS.map((char, charId) => {
          const outfit = outfits[charId]
          return (
            <div key={charId} className={`flex flex-col items-center gap-1 ${char.bg} border-2 ${char.border} rounded-2xl p-2 w-32`}>
              <div className="text-xs font-bold text-gray-600 mb-1">{char.label}</div>

              {/* Hat zone */}
              <div
                data-drop-target="true"
                data-char-id={String(charId)}
                data-zone-type="hat"
                className={`w-full h-10 rounded-xl border-2 ${ZONE_STYLES.hat} flex items-center justify-center text-2xl cursor-pointer transition-all`}
              >
                {getEmoji(outfit.hat) ?? <span className="text-yellow-300 text-lg">{ZONE_LABELS.hat}</span>}
              </div>

              {/* Face */}
              <div className="text-4xl my-0.5">{char.face}</div>

              {/* Top zone */}
              <div
                data-drop-target="true"
                data-char-id={String(charId)}
                data-zone-type="top"
                className={`w-full h-10 rounded-xl border-2 ${ZONE_STYLES.top} flex items-center justify-center text-2xl cursor-pointer transition-all`}
              >
                {getEmoji(outfit.top) ?? <span className="text-blue-300 text-lg">{ZONE_LABELS.top}</span>}
              </div>

              {/* Pants zone */}
              <div
                data-drop-target="true"
                data-char-id={String(charId)}
                data-zone-type="pants"
                className={`w-full h-10 rounded-xl border-2 ${ZONE_STYLES.pants} flex items-center justify-center text-2xl cursor-pointer transition-all`}
              >
                {getEmoji(outfit.pants) ?? <span className="text-gray-300 text-lg">{ZONE_LABELS.pants}</span>}
              </div>

              {/* Shoes zone */}
              <div
                data-drop-target="true"
                data-char-id={String(charId)}
                data-zone-type="shoes"
                className={`w-full h-10 rounded-xl border-2 ${ZONE_STYLES.shoes} flex items-center justify-center text-2xl cursor-pointer transition-all`}
              >
                {getEmoji(outfit.shoes) ?? <span className="text-amber-300 text-lg">{ZONE_LABELS.shoes}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Clothing palette */}
      <div className="border-t-2 border-white/20 pt-3">
        {(['hat', 'top', 'pants', 'shoes'] as ClothingType[]).map(type => {
          const typeItems = CLOTHING_ITEMS.filter(c => c.type === type)
          return (
            <div key={type} className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-lg w-6">{ZONE_LABELS[type]}</span>
              <div className="flex gap-2 flex-wrap">
                {typeItems.map(item => (
                  <DraggableTile
                    key={item.id}
                    id={item.id}
                    label={item.emoji}
                    color={ZONE_STYLES[type].split(' ')[0]}
                    borderColor={ZONE_STYLES[type].split(' ')[1]}
                    textColor="text-gray-700"
                    size="sm"
                    onDropped={handleDrop}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-4">
        {!done ? (
          totalPlaced >= 2 && (
            <button onClick={handleDone} className="btn-kid bg-green-500">
              ✅ Done!
            </button>
          )
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-5xl bounce-in">👗</span>
            <button onClick={handleAgain} className="btn-kid bg-blue-500">
              🔁 Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
