'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

const ABC_ORDER = 'abcdefghijklmnopqrstuvwxyz'.split('')

function pickBlanks(pct = 0.45): Set<string> {
  const blanks = new Set<string>()
  for (const l of ABC_ORDER) {
    if (Math.random() < pct) blanks.add(l)
  }
  if (blanks.size < 6) {
    for (const l of ABC_ORDER) {
      if (!blanks.has(l)) { blanks.add(l); if (blanks.size >= 8) break }
    }
  }
  return blanks
}

function getGroup(letter: string) {
  return LETTER_GROUPS.find(g => g.letters.includes(letter))!
}

// Tile ids for lowercase use 'lc_' prefix to distinguish from ex1
const toId = (l: string) => `lc_${l}`
const fromId = (id: string) => id.replace('lc_', '')

export default function A3Ex2Page() {
  const [blanks, setBlanks] = useState<Set<string>>(new Set())
  const [filled, setFilled] = useState<Record<string, boolean>>({})
  const [tiles, setTiles] = useState<string[]>([])

  useEffect(() => {
    const b = pickBlanks()
    setBlanks(b)
    setFilled({})
    setTiles(shuffle(Array.from(b).map(toId)))
  }, [])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId) return false
    const tileLetter = fromId(tileId)
    if (tileLetter !== targetId) return false
    if (!blanks.has(targetId) || filled[targetId]) return false

    setFilled(prev => ({ ...prev, [targetId]: true }))
    setTiles(prev => prev.filter(t => t !== tileId))
    return true
  }, [blanks, filled])

  const allDone = Array.from(blanks).every(l => filled[l])

  return (
    <ExerciseShell
      title="ABC Fill — Lowercase"
      hebrewInstruction="גרור את האות הקטנה החסרה למקום הנכון ב-abc"
      backHref="/step1/track-a"
      track="A"
      groupId="a3"
      exerciseId="ex2"
      groupColor="from-indigo-400 to-purple-500"
    >
      {(onComplete) => {
        if (allDone && blanks.size > 0) setTimeout(onComplete, 300)
        return (
          <div className="p-4 max-w-2xl mx-auto">
            <p className="text-center text-gray-400 font-bold text-sm mb-4" dir="rtl">
              גרור את האותיות הקטנות החסרות למקומן:
            </p>

            {/* abc grid (lowercase) */}
            <div className="grid grid-cols-6 sm:grid-cols-7 gap-2 mb-6">
              {ABC_ORDER.map(letter => {
                const group = getGroup(letter)
                const isBlank = blanks.has(letter)
                const isFilled = filled[letter]

                if (isBlank && !isFilled) {
                  return (
                    <div
                      key={letter}
                      data-drop-target="true"
                      data-expected-ids={JSON.stringify([toId(letter)])}
                      data-target-id={letter}
                      className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-200 text-xs font-bold">?</span>
                    </div>
                  )
                }

                return (
                  <div
                    key={letter}
                    className={`
                      w-full aspect-square rounded-xl border-2 flex items-center justify-center
                      ${group.bgColor} ${group.borderColor}
                      ${isFilled ? 'drop-success' : ''}
                    `}
                  >
                    <span className={`font-display font-black text-base ${group.textColor}`}>
                      {letter}
                    </span>
                  </div>
                )
              })}
            </div>

            {tiles.length > 0 && (
              <div className="border-t-2 border-dashed border-gray-200 pt-3">
                <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">גרור מכאן:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {tiles.map(id => {
                    const letter = fromId(id)
                    const group = getGroup(letter)
                    return (
                      <DraggableTile
                        key={id}
                        id={id}
                        label={letter}
                        color={group.bgColor}
                        borderColor={group.borderColor}
                        textColor={group.textColor}
                        size="sm"
                        onDropped={handleDrop}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      }}
    </ExerciseShell>
  )
}
