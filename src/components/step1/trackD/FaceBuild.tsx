'use client'
import { useState, useCallback } from 'react'
import { DraggableTile } from '@/components/step1/DraggableTile'

type PartType = 'eyes' | 'nose' | 'mouth' | 'ears'

interface FacePart { id: string; type: PartType; emoji: string }

const FACE_PARTS: FacePart[] = [
  // Eyes — 3 variants
  { id: 'eyes-1', type: 'eyes',  emoji: '👀' },
  { id: 'eyes-2', type: 'eyes',  emoji: '🔵🔵' },
  { id: 'eyes-3', type: 'eyes',  emoji: '⭐⭐' },
  // Noses — 3 variants
  { id: 'nose-1', type: 'nose',  emoji: '👃' },
  { id: 'nose-2', type: 'nose',  emoji: '🔴' },
  { id: 'nose-3', type: 'nose',  emoji: '🔺' },
  // Mouths — 3 variants
  { id: 'mouth-1', type: 'mouth', emoji: '👄' },
  { id: 'mouth-2', type: 'mouth', emoji: '😁' },
  { id: 'mouth-3', type: 'mouth', emoji: '〰️' },
  // Ears — 3 variants
  { id: 'ears-1', type: 'ears',  emoji: '👂👂' },
  { id: 'ears-2', type: 'ears',  emoji: '🌸🌸' },
  { id: 'ears-3', type: 'ears',  emoji: '🔶🔶' },
]

interface FaceOutfit { eyes: string | null; nose: string | null; mouth: string | null; ears: string | null }
const emptyFace = (): FaceOutfit => ({ eyes: null, nose: null, mouth: null, ears: null })

const PART_COLORS: Record<PartType, { bg: string; border: string }> = {
  eyes:  { bg: 'bg-blue-100',   border: 'border-blue-400' },
  nose:  { bg: 'bg-orange-100', border: 'border-orange-400' },
  mouth: { bg: 'bg-red-100',    border: 'border-red-400' },
  ears:  { bg: 'bg-pink-100',   border: 'border-pink-400' },
}

const FACE_COLORS = [
  { bg: 'bg-amber-100', border: 'border-amber-400', face: '👶' },
  { bg: 'bg-rose-100',  border: 'border-rose-400',  face: '👧' },
  { bg: 'bg-sky-100',   border: 'border-sky-400',   face: '👦' },
]

interface Props { onComplete: () => void }

export function FaceBuild({ onComplete }: Props) {
  const [outfits, setOutfits] = useState<FaceOutfit[]>([emptyFace(), emptyFace(), emptyFace()])
  const [done, setDone] = useState(false)

  const getPartEmoji = (id: string | null) => id ? FACE_PARTS.find(p => p.id === id)?.emoji ?? '' : ''
  const getPartType = (id: string): PartType | null => FACE_PARTS.find(p => p.id === id)?.type ?? null

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const charId = parseInt(targetEl.getAttribute('data-char-id') ?? '-1')
    const zoneType = targetEl.getAttribute('data-zone-type') as PartType | null
    if (charId < 0 || charId > 2 || !zoneType) return false
    const partType = getPartType(tileId)
    if (partType !== zoneType) return false

    setOutfits(prev => {
      const next = prev.map((o, i) => i === charId ? { ...o, [zoneType]: tileId } : o)
      return next
    })
    return true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleDone() {
    setDone(true)
    setTimeout(onComplete, 400)
  }

  function handleAgain() {
    setOutfits([emptyFace(), emptyFace(), emptyFace()])
    setDone(false)
  }

  const totalPlaced = outfits.reduce((sum, o) =>
    sum + [o.eyes, o.nose, o.mouth, o.ears].filter(Boolean).length, 0)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className="text-center text-black font-bold text-base mb-4" dir="rtl">
        גרור את אברי הפנים ובנה פרצופים שונים!
      </p>

      {/* 3 face columns */}
      <div className="flex gap-2 justify-center mb-5">
        {outfits.map((outfit, charId) => {
          const cfg = FACE_COLORS[charId]
          return (
            <div key={charId} className={`flex flex-col items-center gap-1 ${cfg.bg} rounded-2xl border-2 ${cfg.border} p-2 w-28`}>
              {/* Ears zone */}
              <div
                data-drop-target="true"
                data-char-id={String(charId)}
                data-zone-type="ears"
                className="w-full h-10 rounded-lg border-2 border-dashed border-pink-300 bg-pink-50/60 flex items-center justify-center text-xl cursor-pointer"
              >
                {outfit.ears ? getPartEmoji(outfit.ears) : <span className="text-pink-200 text-xs">👂</span>}
              </div>
              {/* Face circle */}
              <div className={`w-20 h-20 rounded-full ${cfg.bg} border-4 ${cfg.border} flex flex-col items-center justify-around py-1`}>
                {/* Eyes zone */}
                <div
                  data-drop-target="true"
                  data-char-id={String(charId)}
                  data-zone-type="eyes"
                  className="w-full h-7 flex items-center justify-center rounded border border-dashed border-blue-300 bg-blue-50/60 text-base cursor-pointer"
                >
                  {outfit.eyes ? getPartEmoji(outfit.eyes) : <span className="text-blue-200 text-xs">👀</span>}
                </div>
                {/* Nose zone */}
                <div
                  data-drop-target="true"
                  data-char-id={String(charId)}
                  data-zone-type="nose"
                  className="w-8 h-7 flex items-center justify-center rounded border border-dashed border-orange-300 bg-orange-50/60 text-base cursor-pointer"
                >
                  {outfit.nose ? getPartEmoji(outfit.nose) : <span className="text-orange-200 text-xs">👃</span>}
                </div>
                {/* Mouth zone */}
                <div
                  data-drop-target="true"
                  data-char-id={String(charId)}
                  data-zone-type="mouth"
                  className="w-full h-7 flex items-center justify-center rounded border border-dashed border-red-300 bg-red-50/60 text-base cursor-pointer"
                >
                  {outfit.mouth ? getPartEmoji(outfit.mouth) : <span className="text-red-200 text-xs">👄</span>}
                </div>
              </div>
              <div className="text-2xl">{cfg.face}</div>
            </div>
          )
        })}
      </div>

      {/* Parts palette */}
      <div className="border-t-2 border-white/20 pt-3">
        {(['eyes', 'nose', 'mouth', 'ears'] as PartType[]).map(type => {
          const parts = FACE_PARTS.filter(p => p.type === type)
          const pc = PART_COLORS[type]
          return (
            <div key={type} className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white/60 w-10 capitalize">{type}</span>
              <div className="flex gap-2">
                {parts.map(part => (
                  <DraggableTile
                    key={part.id}
                    id={part.id}
                    label={part.emoji}
                    color={pc.bg}
                    borderColor={pc.border}
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

      {/* Done / Again buttons */}
      <div className="text-center mt-4">
        {!done ? (
          totalPlaced > 0 && (
            <button onClick={handleDone} className="btn-kid bg-green-500">
              ✅ Done!
            </button>
          )
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-5xl bounce-in">🎨</span>
            <button onClick={handleAgain} className="btn-kid bg-blue-500">
              🔁 Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
