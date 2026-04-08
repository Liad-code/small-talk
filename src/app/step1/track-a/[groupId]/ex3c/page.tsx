'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS, type LetterGroup } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

function buildPaths(letters: string[], endpointOrder: string[]) {
  const n = letters.length
  const W = 320
  const svgH = 240
  const topY = 40
  const botY = 200
  const gap = W / (n + 1)
  const topX = letters.map((_, i) => gap * (i + 1))
  const botX = endpointOrder.map((_, i) => gap * (i + 1))

  return letters.map((letter, i) => {
    const endIdx = endpointOrder.indexOf(letter)
    const tx = topX[i]
    const bx = botX[endIdx]
    // More winding bezier control points
    const cp1x = tx + (i % 3 === 0 ? 80 : i % 3 === 1 ? -80 : 40)
    const cp1y = topY + (svgH * 0.3)
    const cp2x = bx + (endIdx % 3 === 0 ? -80 : endIdx % 3 === 1 ? 60 : -40)
    const cp2y = botY - (svgH * 0.3)
    return {
      letter,
      d: `M ${tx} ${topY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${bx} ${botY}`,
      topX: tx,
      botX: bx,
      endIdx,
    }
  })
}

function Ex3cExercise({ group, onComplete }: { group: LetterGroup; onComplete: () => void }) {
  const [endpointOrder, setEndpointOrder] = useState<string[]>([])
  const [lowerTiles, setLowerTiles] = useState<{ id: string; letter: string; placed: boolean }[]>([])
  const [matched, setMatched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setEndpointOrder(shuffle([...group.letters]))
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

  const paths = endpointOrder.length > 0 ? buildPaths(group.letters, endpointOrder) : []
  const freeTiles = lowerTiles.filter(t => !t.placed)
  const W = 320
  const n = group.letters.length
  const gap = W / (n + 1)

  return (
    <div className="p-4 max-w-sm mx-auto">
      <p className="text-center text-gray-400 font-bold text-xs mb-3" dir="rtl">
        עקוב אחרי כל דרך — גרור את האות הקטנה לסוף הדרך שלה
      </p>

      {/* SVG maze */}
      <div className="flex justify-center mb-4">
        <div className="relative" style={{ width: W, height: 250 }}>
          {/* Uppercase letters at top */}
          {group.letters.map((letter, i) => (
            <div
              key={`top_${letter}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl border-4 ${group.bgColor} ${group.borderColor} flex items-center justify-center`}
              style={{ left: gap * (i + 1), top: 20 }}
            >
              <span className={`font-display font-black text-2xl ${group.textColor}`}>{letter.toUpperCase()}</span>
            </div>
          ))}

          {/* SVG paths */}
          <svg
            width={W}
            height={250}
            className="absolute top-0 left-0"
            style={{ pointerEvents: 'none' }}
          >
            {paths.map(p => (
              <path
                key={p.letter}
                d={p.d}
                fill="none"
                stroke={matched[p.letter] ? '#22c55e' : '#94a3b8'}
                strokeWidth={matched[p.letter] ? 4 : 3}
                strokeDasharray={matched[p.letter] ? 'none' : '6 4'}
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Drop targets at endpoints */}
          {endpointOrder.map((letter, i) => (
            <div
              key={`bot_${letter}`}
              data-drop-target="true"
              data-expected-ids={JSON.stringify([`lower_${letter}`])}
              data-target-id={letter}
              className={`
                absolute -translate-x-1/2 -translate-y-1/2
                w-14 h-14 rounded-xl border-4 flex items-center justify-center
                transition-all duration-200
                ${matched[letter]
                  ? `${group.bgColor} ${group.borderColor}`
                  : `bg-white border-dashed ${group.borderColor} opacity-60 hover:opacity-100`}
              `}
              style={{ left: gap * (i + 1), top: 230 }}
            >
              {matched[letter]
                ? <span className={`font-display font-black text-2xl ${group.textColor}`}>{letter}</span>
                : <span className={`${group.textColor} opacity-30 text-2xl`}>?</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Free lowercase tiles */}
      {freeTiles.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
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

export default function Ex3cPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)

  if (!group) return <div className="p-8 text-center">Group not found</div>

  return (
    <ExerciseShell
      title="Maze Paths"
      hebrewInstruction="עקוב אחרי הדרך — גרור את האות הקטנה לסוף הדרך"
      backHref={`/step1/track-a/${groupId}`}
      track="A"
      groupId={groupId}
      exerciseId="ex3c"
      groupColor={group.color}
    >
      {(onComplete, resetKey) => (
        <Ex3cExercise key={resetKey} group={group} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
