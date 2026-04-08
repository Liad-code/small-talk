'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS, type LetterGroup } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

function Ex3aExercise({ group, onComplete }: { group: LetterGroup; onComplete: () => void }) {
  const [lowerTiles, setLowerTiles] = useState<{ id: string; letter: string; placed: boolean }[]>([])
  const [matched, setMatched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setLowerTiles(shuffle(group.letters.map(l => ({ id: `lower_${l}`, letter: l, placed: false }))))
    setMatched({})
  }, [group])

  const allDone = group.letters.length > 0 && group.letters.every(l => matched[l])

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId) return false
    const tile = lowerTiles.find(t => t.id === tileId)
    if (!tile || tile.placed) return false
    if (tile.letter !== targetId) return false
    setLowerTiles(prev => prev.map(t => t.id === tileId ? { ...t, placed: true } : t))
    setMatched(prev => ({ ...prev, [targetId]: true }))
    return true
  }, [lowerTiles])

  const freeTiles = lowerTiles.filter(t => !t.placed)

  return (
    <div className="p-4 max-w-sm mx-auto">
      <p className="text-center text-gray-400 font-bold text-sm mb-6" dir="rtl">
        גרור את האות הקטנה לצד האות הגדולה שלה
      </p>

      {/* Uppercase column + drop targets */}
      <div className="space-y-3 mb-8">
        {group.letters.map(letter => (
          <div key={letter} className="flex items-center gap-4">
            {/* Uppercase (fixed) */}
            <div className={`
              w-16 h-16 rounded-2xl border-4 ${group.bgColor} ${group.borderColor}
              flex items-center justify-center flex-shrink-0
            `}>
              <span className={`font-display font-black text-3xl ${group.textColor}`}>
                {letter.toUpperCase()}
              </span>
            </div>

            <span className="text-gray-300 font-bold text-xl">→</span>

            {/* Drop target for lowercase */}
            <div
              data-drop-target="true"
              data-expected-ids={JSON.stringify([`lower_${letter}`])}
              data-target-id={letter}
              className={`
                w-16 h-16 rounded-2xl border-4 flex items-center justify-center
                transition-all duration-150
                ${matched[letter]
                  ? `${group.bgColor} ${group.borderColor} drop-success`
                  : `bg-white border-dashed ${group.borderColor} opacity-60 hover:opacity-100`}
              `}
            >
              {matched[letter] ? (
                <span className={`font-display font-black text-3xl ${group.textColor}`}>{letter}</span>
              ) : (
                <span className={`${group.textColor} opacity-30 text-2xl`}>⬇</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Free lowercase tiles */}
      {freeTiles.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">גרור מכאן:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {freeTiles.map(tile => (
              <DraggableTile
                key={tile.id}
                id={tile.id}
                label={tile.letter}
                color={group.bgColor}
                borderColor={group.borderColor}
                textColor={group.textColor}
                size="md"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Ex3aPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)

  if (!group) return <div className="p-8 text-center">Group not found</div>

  return (
    <ExerciseShell
      title="Match Pairs"
      hebrewInstruction="גרור את האות הקטנה לאות הגדולה המתאימה"
      backHref={`/step1/track-a/${groupId}`}
      track="A"
      groupId={groupId}
      exerciseId="ex3a"
      groupColor={group.color}
    >
      {(onComplete, resetKey) => (
        <Ex3aExercise key={resetKey} group={group} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
