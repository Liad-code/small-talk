'use client'
import { useState, useCallback, useEffect } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS, type LetterGroup } from '@/data/step1/letterGroups'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

type Tile = { id: string; letter: string; case: 'upper' | 'lower'; placed: boolean }
type Square = { letter: string; upper: boolean; lower: boolean }

function Ex1Exercise({ group, onComplete }: { group: LetterGroup; onComplete: () => void }) {
  const speak = useSpeak()
  const [tiles, setTiles] = useState<Tile[]>([])
  const [squares, setSquares] = useState<Square[]>([])

  useEffect(() => {
    const allTiles = group.letters.flatMap(l => [
      { id: `${l}_upper`, letter: l, case: 'upper' as const, placed: false },
      { id: `${l}_lower`, letter: l, case: 'lower' as const, placed: false },
    ])
    setTiles(shuffle(allTiles))
    setSquares(group.letters.map(l => ({ letter: l, upper: false, lower: false })))
  }, [group])

  const allDone = squares.length > 0 && squares.every(s => s.upper && s.lower)

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetLetter = targetEl.getAttribute('data-target-id')
    if (!targetLetter) return false
    const tile = tiles.find(t => t.id === tileId)
    if (!tile || tile.placed) return false
    if (tile.letter !== targetLetter) return false
    const sq = squares.find(s => s.letter === targetLetter)
    if (!sq) return false
    if (tile.case === 'upper' && sq.upper) return false
    if (tile.case === 'lower' && sq.lower) return false
    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, placed: true } : t))
    setSquares(prev => prev.map(s =>
      s.letter === targetLetter ? { ...s, [tile.case]: true } : s
    ))
    return true
  }, [tiles, squares])

  const availableTiles = tiles.filter(t => !t.placed)

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-8 mt-4">
        {squares.map(sq => (
          <div
            key={sq.letter}
            data-drop-target="true"
            data-expected-ids={JSON.stringify([`${sq.letter}_upper`, `${sq.letter}_lower`])}
            data-target-id={sq.letter}
            onClick={() => speak(sq.letter, 0.8, 1.1)}
            className={`
              w-24 h-24 rounded-2xl border-4 flex flex-col items-center justify-center gap-1 cursor-pointer
              transition-all duration-200
              ${sq.upper && sq.lower
                ? `${group.bgColor} ${group.borderColor} drop-success`
                : `bg-white/60 border-dashed ${group.borderColor} opacity-60 hover:opacity-100`}
            `}
          >
            {sq.upper || sq.lower ? (
              <>
                {sq.upper && (
                  <span className={`font-display font-black text-2xl ${group.textColor}`}>
                    {sq.letter.toUpperCase()}
                  </span>
                )}
                {sq.lower && (
                  <span className={`font-display font-bold text-xl ${group.textColor} opacity-80`}>
                    {sq.letter}
                  </span>
                )}
              </>
            ) : (
              <span className="text-3xl">🔊</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 font-bold text-sm mb-3" dir="rtl">
        גרור כל אות לריבוע הנכון:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {availableTiles.map(tile => (
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

      {availableTiles.length === 0 && squares.length > 0 && (
        <p className="text-center text-green-600 font-bold mt-6 text-lg">All placed! 🎉</p>
      )}
    </div>
  )
}

export default function Ex1Page({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)

  if (!group) return <div className="p-8 text-center">Group not found</div>

  return (
    <ExerciseShell
      title="Drag to Square"
      hebrewInstruction="לחץ על הריבוע כדי לשמוע — גרור את האות הנכונה לריבוע"
      backHref={`/step1/track-a/${groupId}`}
      track="A"
      groupId={groupId}
      exerciseId="ex1"
      groupColor={group.color}
    >
      {(onComplete, resetKey) => (
        <Ex1Exercise key={resetKey} group={group} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
