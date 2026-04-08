'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

const ABC_ORDER = 'abcdefghijklmnopqrstuvwxyz'.split('')

function getGroup(letter: string) {
  return LETTER_GROUPS.find(g => g.letters.includes(letter))!
}

// Puzzle piece: one tile = lowercase, drop target = uppercase
export default function A3Ex3Page() {
  const [tiles, setTiles] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())

  useEffect(() => {
    setTiles(shuffle([...ABC_ORDER]))
    setMatched(new Set())
  }, [])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId) return false
    if (tileId !== targetId) return false
    if (matched.has(tileId)) return false

    setMatched(prev => { const n = new Set(prev); n.add(tileId); return n })
    setTiles(prev => prev.filter(t => t !== tileId))
    return true
  }, [matched])

  const allDone = matched.size === 26

  return (
    <ExerciseShell
      title="Puzzle Match"
      hebrewInstruction="חבר כל אות קטנה לאות הגדולה שלה כמו פאזל"
      backHref="/step1/track-a"
      track="A"
      groupId="a3"
      exerciseId="ex3"
      groupColor="from-indigo-400 to-purple-500"
    >
      {(onComplete) => {
        if (allDone) setTimeout(onComplete, 300)
        return (
          <div className="p-4 max-w-2xl mx-auto">
            <p className="text-center text-gray-400 font-bold text-sm mb-4" dir="rtl">
              גרור כל אות קטנה לאות הגדולה שלה:
            </p>

            {/* 26 puzzle pairs grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-6">
              {ABC_ORDER.map(letter => {
                const group = getGroup(letter)
                const done = matched.has(letter)
                return (
                  <div key={letter} className="flex flex-col items-center gap-1">
                    {/* Uppercase (fixed puzzle left piece) */}
                    <div className={`
                      w-12 h-12 rounded-l-xl rounded-tr-none rounded-br-none border-t-4 border-l-4 border-b-4
                      ${group.bgColor} ${group.borderColor}
                      flex items-center justify-center
                      ${done ? 'opacity-100' : ''}
                    `}>
                      <span className={`font-display font-black text-xl ${group.textColor}`}>
                        {letter.toUpperCase()}
                      </span>
                    </div>

                    {/* Drop target (puzzle right piece) */}
                    <div
                      data-drop-target="true"
                      data-expected-ids={JSON.stringify([letter])}
                      data-target-id={letter}
                      className={`
                        w-12 h-12 rounded-r-xl rounded-tl-none rounded-bl-none border-t-4 border-r-4 border-b-4
                        flex items-center justify-center
                        transition-all duration-200
                        ${done
                          ? `${group.bgColor} ${group.borderColor} drop-success`
                          : 'bg-white border-dashed border-gray-300'}
                      `}
                    >
                      {done
                        ? <span className={`font-display font-black text-xl ${group.textColor}`}>{letter}</span>
                        : <span className="text-gray-200 text-xs">?</span>
                      }
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Tile bank */}
            {tiles.length > 0 && (
              <div className="border-t-2 border-dashed border-gray-200 pt-3">
                <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">גרור מכאן:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {tiles.map(letter => {
                    const group = getGroup(letter)
                    return (
                      <DraggableTile
                        key={letter}
                        id={letter}
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
