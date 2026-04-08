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

// Lid tile id prefix
const lid = (l: string) => `lid_${l}`
const fromLid = (id: string) => id.replace('lid_', '')

export default function A3Ex4Page() {
  const [lids, setLids] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())

  useEffect(() => {
    setLids(shuffle(ABC_ORDER.map(lid)))
    setMatched(new Set())
  }, [])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId) return false
    const tileLetter = fromLid(tileId)
    if (tileLetter !== targetId) return false
    if (matched.has(tileLetter)) return false

    setMatched(prev => { const n = new Set(prev); n.add(tileLetter); return n })
    setLids(prev => prev.filter(t => t !== tileId))
    return true
  }, [matched])

  const allDone = matched.size === 26

  return (
    <ExerciseShell
      title="Pot & Lid"
      hebrewInstruction="גרור את המכסה הקטן לסיר הגדול המתאים"
      backHref="/step1/track-a"
      track="A"
      groupId="a3"
      exerciseId="ex4"
      groupColor="from-indigo-400 to-purple-500"
    >
      {(onComplete) => {
        if (allDone) setTimeout(onComplete, 300)
        return (
          <div className="p-4 max-w-2xl mx-auto">
            <p className="text-center text-gray-400 font-bold text-sm mb-4" dir="rtl">
              גרור כל מכסה (אות קטנה) לסיר הנכון (אות גדולה):
            </p>

            {/* Pots grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-6">
              {ABC_ORDER.map(letter => {
                const group = getGroup(letter)
                const done = matched.has(letter)
                return (
                  <div key={letter} className="flex flex-col items-center gap-0.5">
                    {/* Lid drop target */}
                    <div
                      data-drop-target="true"
                      data-expected-ids={JSON.stringify([lid(letter)])}
                      data-target-id={letter}
                      className={`
                        w-12 h-5 rounded-t-full border-t-4 border-l-4 border-r-4 flex items-center justify-center
                        transition-all duration-200
                        ${done
                          ? `${group.bgColor} ${group.borderColor}`
                          : 'bg-white border-dashed border-gray-300'}
                      `}
                    >
                      {done && (
                        <span className={`font-display font-black text-xs ${group.textColor}`}>{letter}</span>
                      )}
                    </div>

                    {/* Pot body */}
                    <div className={`
                      w-12 h-12 rounded-b-xl border-b-4 border-l-4 border-r-4 flex items-center justify-center
                      ${group.bgColor} ${group.borderColor}
                    `}>
                      <span className={`font-display font-black text-xl ${group.textColor}`}>
                        {letter.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Lid tiles */}
            {lids.length > 0 && (
              <div className="border-t-2 border-dashed border-gray-200 pt-3">
                <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">גרור המכסים לסירים:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {lids.map(id => {
                    const letter = fromLid(id)
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
