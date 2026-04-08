'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS, type LetterGroup } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

const FLOWER_COLORS = ['🌸', '🌼', '🌺', '🌻', '💐', '🌹']

function Ex3bExercise({ group, onComplete }: { group: LetterGroup; onComplete: () => void }) {
  const [flowers, setFlowers] = useState<{ id: string; letter: string; placed: boolean; emoji: string }[]>([])
  const [pots, setPots] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setFlowers(shuffle(group.letters.map((l, i) => ({
      id: `flower_${l}`,
      letter: l,
      placed: false,
      emoji: FLOWER_COLORS[i % FLOWER_COLORS.length],
    }))))
    setPots(Object.fromEntries(group.letters.map(l => [l, false])))
  }, [group])

  const allDone = group.letters.length > 0 && group.letters.every(l => pots[l])

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId) return false
    const flower = flowers.find(f => f.id === tileId)
    if (!flower || flower.placed) return false
    if (flower.letter !== targetId) return false
    setFlowers(prev => prev.map(f => f.id === tileId ? { ...f, placed: true } : f))
    setPots(prev => ({ ...prev, [targetId]: true }))
    return true
  }, [flowers])

  const freeFlowers = flowers.filter(f => !f.placed)

  return (
    <div className="p-4 max-w-sm mx-auto">

      {/* Pots row */}
      <div className="flex flex-wrap justify-center gap-5 mb-6 mt-2">
        {group.letters.map(letter => (
          <div key={letter} className="flex flex-col items-center gap-1">
            {/* Flower drop zone */}
            <div
              data-drop-target="true"
              data-expected-ids={JSON.stringify([`flower_${letter}`])}
              data-target-id={letter}
              className={`
                w-20 h-20 rounded-full border-4 flex items-center justify-center
                transition-all duration-200
                ${pots[letter]
                  ? `${group.bgColor} ${group.borderColor}`
                  : `bg-white border-dashed ${group.borderColor} opacity-60 hover:opacity-100`}
              `}
            >
              {pots[letter]
                ? <span className="text-4xl">{flowers.find(f => f.letter === letter)?.emoji}</span>
                : <span className="text-2xl text-gray-200">🌱</span>
              }
            </div>

            {/* Pot body */}
            <div className={`
              w-20 h-14 rounded-b-xl border-4 flex items-center justify-center
              ${group.bgColor} ${group.borderColor}
            `}>
              <span className={`font-display font-black text-2xl ${group.textColor}`}>
                {letter.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Free flowers (draggable tiles showing lowercase) */}
      {freeFlowers.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">
            גרור כל פרח לעציץ הנכון:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {freeFlowers.map(flower => (
              <div key={flower.id} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{flower.emoji}</span>
                <DraggableTile
                  id={flower.id}
                  label={flower.letter}
                  color={group.bgColor}
                  borderColor={group.borderColor}
                  textColor={group.textColor}
                  size="md"
                  onDropped={handleDrop}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Ex3bPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)

  if (!group) return <div className="p-8 text-center">Group not found</div>

  return (
    <ExerciseShell
      title="Bouquet Flowers"
      hebrewInstruction="גרור כל פרח לעציץ הנכון"
      backHref={`/step1/track-a/${groupId}`}
      track="A"
      groupId={groupId}
      exerciseId="ex3b"
      groupColor={group.color}
    >
      {(onComplete, resetKey) => (
        <Ex3bExercise key={resetKey} group={group} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
