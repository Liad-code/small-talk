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

const lid = (l: string) => `lid_${l}`
const fromLid = (id: string) => id.replace('lid_', '')

function A3Ex4Exercise({ onComplete }: { onComplete: () => void }) {
  const [lids, setLids] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())

  useEffect(() => {
    setLids(shuffle(ABC_ORDER.map(lid)))
    setMatched(new Set())
  }, [])

  const allDone = matched.size === 26

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <p className="text-center text-gray-400 font-bold text-sm mb-4" dir="rtl">
        גרור כל מכסה (אות קטנה) לסיר הנכון (אות גדולה):
      </p>

      {/* Pots grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-3 gap-y-5 mb-6 justify-items-center">
        {ABC_ORDER.map(letter => {
          const group = getGroup(letter)
          const done = matched.has(letter)

          return (
            <div
              key={letter}
              data-drop-target="true"
              data-expected-ids={JSON.stringify([lid(letter)])}
              data-target-id={letter}
              className={`
                flex flex-col items-center gap-0 cursor-default
                transition-all duration-200
                ${done ? 'opacity-100' : 'opacity-80 hover:opacity-100'}
              `}
            >
              {/* Lid visual */}
              <div className={`
                w-16 h-8 rounded-t-full border-4 border-b-0 flex items-center justify-center
                ${done
                  ? `${group.bgColor} ${group.borderColor}`
                  : 'bg-gray-100 border-dashed border-gray-300'}
              `}>
                {done && (
                  <span className={`font-display font-black text-sm leading-none ${group.textColor}`}>
                    {letter}
                  </span>
                )}
              </div>

              {/* Pot body with handles */}
              <div className="relative flex items-center">
                <div className={`w-3 h-6 rounded-l-full border-4 border-r-0 flex-shrink-0 ${group.bgColor} ${group.borderColor}`}/>
                <div className={`w-14 h-14 rounded-b-xl flex items-center justify-center ${group.bgColor} border-4 ${group.borderColor}`}>
                  <span className={`font-display font-black text-2xl ${group.textColor}`}>
                    {letter.toUpperCase()}
                  </span>
                </div>
                <div className={`w-3 h-6 rounded-r-full border-4 border-l-0 flex-shrink-0 ${group.bgColor} ${group.borderColor}`}/>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lid bank */}
      {lids.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">
            גרור המכסים לסירים:
          </p>
          <div className="overflow-x-auto pb-3">
            <div className="flex gap-2 flex-wrap justify-center px-2">
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
                    size="md"
                    onDropped={handleDrop}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}

      {matched.size > 0 && (
        <p className="text-center text-indigo-500 font-bold text-sm mt-2">
          {matched.size}/26 ✓
        </p>
      )}
    </div>
  )
}

export default function A3Ex4Page() {
  return (
    <ExerciseShell
      title="In the Kitchen"
      hebrewInstruction="גרור את המכסה הנכון לסיר — אות גדולה ואות קטנה"
      backHref="/step1/track-a"
      track="A"
      groupId="a3"
      exerciseId="ex4"
      groupColor="from-indigo-400 to-purple-500"
    >
      {(onComplete, resetKey) => (
        <A3Ex4Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
