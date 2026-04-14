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

// Slight rotation classes to give a "scattered" playful feel
const ROTATIONS = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0']

function A3Ex3Exercise({ onComplete }: { onComplete: () => void }) {
  const [tiles, setTiles] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())

  useEffect(() => {
    setTiles(shuffle([...ABC_ORDER]))
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
    if (tileId !== targetId) return false
    if (matched.has(tileId)) return false
    setMatched(prev => { const n = new Set(prev); n.add(tileId); return n })
    setTiles(prev => prev.filter(t => t !== tileId))
    return true
  }, [matched])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <p className="text-center text-gray-400 font-bold text-sm mb-4" dir="rtl">
        חבר כל אות קטנה לאות הגדולה שלה — גרור לחצי הפאזל הנכון!
      </p>

      {/* Puzzle pairs — scattered layout */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {ABC_ORDER.map((letter, i) => {
          const group = getGroup(letter)
          const done = matched.has(letter)
          const rot = ROTATIONS[i % ROTATIONS.length]

          return (
            <div
              key={letter}
              className={`flex items-center transition-transform duration-200 ${done ? 'rotate-0' : rot}`}
            >
              {/* LEFT half — uppercase piece */}
              <div className={`
                relative w-16 h-16 flex items-center justify-center z-10
                rounded-l-2xl border-4 border-r-0
                ${group.bgColor} ${group.borderColor}
              `}>
                <span className={`font-display font-black text-2xl ${group.textColor}`}>
                  {letter.toUpperCase()}
                </span>
                {/* Tab bump on right edge */}
                <div className={`
                  absolute -right-3.5 top-1/2 -translate-y-1/2
                  w-7 h-7 rounded-full border-4 z-20
                  ${group.bgColor} ${group.borderColor}
                `}/>
              </div>

              {/* RIGHT half — drop target (lowercase) */}
              <div
                data-drop-target="true"
                data-expected-ids={JSON.stringify([letter])}
                data-target-id={letter}
                className={`
                  relative w-16 h-16 flex items-center justify-center
                  rounded-r-2xl border-4 border-l-0
                  transition-all duration-200
                  ${done
                    ? `${group.bgColor} ${group.borderColor} drop-success`
                    : 'bg-white/90 border-dashed border-gray-300'}
                `}
              >
                {/* Notch cavity on left edge */}
                <div className={`
                  absolute -left-3.5 top-1/2 -translate-y-1/2
                  w-7 h-7 rounded-full border-4 z-20
                  ${done ? `${group.bgColor} ${group.borderColor}` : 'bg-gray-50 border-gray-200'}
                `}/>
                {done
                  ? <span className={`font-display font-black text-2xl ${group.textColor}`}>{letter}</span>
                  : <span className="text-gray-300 text-sm font-bold">?</span>
                }
              </div>
            </div>
          )
        })}
      </div>

      {/* Tile bank — horizontal scroll on mobile */}
      {tiles.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">
            גרור את האות הקטנה לחצי הפאזל הנכון:
          </p>
          <div className="overflow-x-auto pb-3">
            <div className="flex gap-2 min-w-max px-2 mx-auto justify-center flex-wrap">
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

export default function A3Ex3Page() {
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
      {(onComplete, resetKey) => (
        <A3Ex3Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
