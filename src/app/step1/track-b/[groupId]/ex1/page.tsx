'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

const SHORT_SOUND_TEXT: Record<string, string> = {
  a: 'short a', b: 'buh', c: 'kuh', d: 'duh', e: 'short e',
  f: 'fuh',    g: 'guh', h: 'huh', i: 'short i', j: 'juh',
  k: 'kuh',   l: 'luh', m: 'muh', n: 'nuh', o: 'short o',
  p: 'puh',   q: 'kwuh',r: 'ruh', s: 'suh', t: 'tuh',
  u: 'short u',v: 'vuh', w: 'wuh', x: 'ksuh',y: 'yuh', z: 'zuh',
}

export default function SoundBoxPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)
  const speak = useSpeak()

  const [tiles, setTiles] = useState<{ id: string; letter: string; case: 'upper' | 'lower'; placed: boolean }[]>([])
  const [boxes, setBoxes] = useState<{ letter: string; upper: boolean; lower: boolean }[]>([])

  useEffect(() => {
    if (!group) return
    const allTiles = group.letters.flatMap(l => [
      { id: `${l}_U`, letter: l, case: 'upper' as const, placed: false },
      { id: `${l}_L`, letter: l, case: 'lower' as const, placed: false },
    ])
    setTiles(shuffle(allTiles))
    setBoxes(group.letters.map(l => ({ letter: l, upper: false, lower: false })))
  }, [group])


  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetLetter = targetEl.getAttribute('data-target-id')
    if (!targetLetter) return false
    const tile = tiles.find(t => t.id === tileId)
    if (!tile || tile.placed) return false
    if (tile.letter !== targetLetter) return false
    const box = boxes.find(b => b.letter === targetLetter)
    if (!box) return false
    if (tile.case === 'upper' && box.upper) return false
    if (tile.case === 'lower' && box.lower) return false

    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, placed: true } : t))
    setBoxes(prev => prev.map(b =>
      b.letter === targetLetter ? { ...b, [tile.case]: true } : b
    ))
    return true
  }, [tiles, boxes])

  if (!group) return <div className="p-8 text-center">Group not found</div>

  const allDone = boxes.every(b => b.upper && b.lower)
  const freeTiles = tiles.filter(t => !t.placed)

  return (
    <ExerciseShell
      title="Sound Box"
      hebrewInstruction="לחץ על התיבה כדי לשמוע הצליל — גרור את האות הנכונה"
      backHref={`/step1/track-b`}
      track="B"
      groupId={groupId}
      exerciseId="ex1"
      groupColor={group.color}
    >
      {(onComplete) => {
        if (allDone) setTimeout(onComplete, 300)
        return (
          <div className="p-4 max-w-2xl mx-auto">
            {/* Open boxes */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 mt-4">
              {boxes.map(box => (
                <div
                  key={box.letter}
                  data-drop-target="true"
                  data-expected-ids={JSON.stringify([`${box.letter}_U`, `${box.letter}_L`])}
                  data-target-id={box.letter}
                  onClick={() => speak(box.letter, 0.8, 1.1)}
                  className={`
                    w-24 h-24 rounded-2xl border-4 flex flex-col items-center justify-center gap-1 cursor-pointer
                    transition-all duration-200
                    ${box.upper && box.lower
                      ? `${group.bgColor} ${group.borderColor} drop-success`
                      : 'bg-white/60 border-dashed border-gray-300 hover:border-blue-400'}
                  `}
                >
                  {box.upper || box.lower ? (
                    <>
                      {box.upper && <span className={`font-display font-black text-2xl ${group.textColor}`}>{box.letter.toUpperCase()}</span>}
                      {box.lower && <span className={`font-display font-bold text-xl ${group.textColor} opacity-80`}>{box.letter}</span>}
                    </>
                  ) : (
                    <span className="text-3xl">📦</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 font-bold text-xs mb-3" dir="rtl">
              גרור כל אות לתיבה הנכונה:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {freeTiles.map(tile => (
                <DraggableTile
                  key={tile.id}
                  id={tile.id}
                  label={tile.case === 'upper' ? tile.letter.toUpperCase() : tile.letter}
                  color={group.bgColor}
                  borderColor={group.borderColor}
                  textColor={group.textColor}
                  size="md"
                  onDropped={handleDrop}
                />
              ))}
            </div>
          </div>
        )
      }}
    </ExerciseShell>
  )
}
