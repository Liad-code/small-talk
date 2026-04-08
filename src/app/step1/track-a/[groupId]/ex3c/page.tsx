'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

// Generate tangled SVG paths. Each letter gets a path from top to a shuffled bottom endpoint.
function buildPaths(letters: string[], endpointOrder: string[]) {
  const n = letters.length
  const W = 300
  const topY = 40
  const botY = 200
  const gap = W / (n + 1)
  // top x positions match letter order
  // bottom x positions match endpointOrder (shuffled)
  const topX = letters.map((_, i) => gap * (i + 1))
  const botX = endpointOrder.map((_, i) => gap * (i + 1))

  return letters.map((letter, i) => {
    const endIdx = endpointOrder.indexOf(letter)
    const tx = topX[i]
    const bx = botX[endIdx]
    // Bezier curve — control points shifted to create a tangled look
    const cp1x = tx + (i % 2 === 0 ? 30 : -30)
    const cp1y = topY + 50
    const cp2x = bx + (endIdx % 2 === 0 ? -30 : 30)
    const cp2y = botY - 50
    return {
      letter,
      d: `M ${tx} ${topY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${bx} ${botY}`,
      topX: tx,
      botX: bx,
      endIdx,
    }
  })
}

export default function Ex3cPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)

  const [endpointOrder, setEndpointOrder] = useState<string[]>([])
  const [lowerTiles, setLowerTiles] = useState<{ id: string; letter: string; placed: boolean }[]>([])
  const [matched, setMatched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!group) return
    setEndpointOrder(shuffle([...group.letters]))
    setLowerTiles(shuffle(group.letters.map(l => ({ id: `lower_${l}`, letter: l, placed: false }))))
    setMatched({})
  }, [group])

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

  if (!group) return <div className="p-8 text-center">Group not found</div>

  const allDone = group.letters.every(l => matched[l])
  const paths = endpointOrder.length > 0 ? buildPaths(group.letters, endpointOrder) : []
  const freeTiles = lowerTiles.filter(t => !t.placed)
  const W = 300
  const n = group.letters.length
  const gap = W / (n + 1)

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
      {(onComplete) => {
        if (allDone) setTimeout(onComplete, 300)
        return (
          <div className="p-4 max-w-sm mx-auto">
            <p className="text-center text-gray-400 font-bold text-xs mb-3" dir="rtl">
              עקוב אחרי כל דרך — גרור את האות הקטנה לסוף הדרך שלה
            </p>

            {/* SVG maze */}
            <div className="flex justify-center mb-4">
              <div className="relative" style={{ width: W, height: 240 }}>
                {/* Uppercase letters at top */}
                {group.letters.map((letter, i) => (
                  <div
                    key={`top_${letter}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl border-3 ${group.bgColor} ${group.borderColor} flex items-center justify-center`}
                    style={{ left: gap * (i + 1), top: 20 }}
                  >
                    <span className={`font-display font-black text-lg ${group.textColor}`}>{letter.toUpperCase()}</span>
                  </div>
                ))}

                {/* SVG paths */}
                <svg
                  width={W}
                  height={240}
                  className="absolute top-0 left-0"
                  style={{ pointerEvents: 'none' }}
                >
                  {paths.map(p => (
                    <path
                      key={p.letter}
                      d={p.d}
                      fill="none"
                      stroke={matched[p.letter] ? '#22c55e' : '#94a3b8'}
                      strokeWidth={matched[p.letter] ? 3 : 2}
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
                      w-12 h-12 rounded-xl border-4 flex items-center justify-center
                      transition-all duration-200
                      ${matched[letter]
                        ? `${group.bgColor} ${group.borderColor}`
                        : 'bg-white border-dashed border-gray-300'}
                    `}
                    style={{ left: gap * (i + 1), top: 220 }}
                  >
                    {matched[letter]
                      ? <span className={`font-display font-black text-xl ${group.textColor}`}>{letter}</span>
                      : <span className="text-gray-200 text-lg">?</span>
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
      }}
    </ExerciseShell>
  )
}
