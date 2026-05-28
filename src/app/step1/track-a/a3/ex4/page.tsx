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

// Hex colors per group for SVG roof fill
const ROOF_COLORS: Record<string, { fill: string; text: string }> = {
  group1: { fill: '#fca5a5', text: '#7f1d1d' },
  group2: { fill: '#93c5fd', text: '#1e3a5f' },
  group3: { fill: '#86efac', text: '#14532d' },
  group4: { fill: '#d8b4fe', text: '#4c1d95' },
  group5: { fill: '#f9a8d4', text: '#831843' },
}

function HouseItem({
  letter,
  done,
  group,
  onDrop,
}: {
  letter: string
  done: boolean
  group: ReturnType<typeof getGroup>
  onDrop: (tileId: string, targetEl: Element) => boolean
}) {
  const colors = ROOF_COLORS[group.id] ?? { fill: '#e2e8f0', text: '#1e293b' }
  void onDrop // used by parent DraggableTile system

  return (
    <div className="flex flex-col items-center">
      {/* Roof SVG with uppercase letter inside */}
      <svg width="60" height="32" viewBox="0 0 60 32" className="-mb-px">
        <polygon points="30,2 2,30 58,30" fill={colors.fill} stroke={colors.text} strokeWidth="1.5" strokeLinejoin="round" />
        <text
          x="30" y="26"
          textAnchor="middle"
          dominantBaseline="auto"
          style={{ fontSize: 14, fontWeight: 900, fill: colors.text, fontFamily: 'ui-monospace, monospace' }}
        >
          {letter.toUpperCase()}
        </text>
      </svg>

      {/* House body — drop target */}
      <div
        data-drop-target="true"
        data-expected-ids={JSON.stringify([`door_${letter}`])}
        data-target-id={letter}
        className={`
          w-14 h-14 border-4 rounded-b-xl flex items-center justify-center
          transition-all duration-200
          ${done
            ? `${group.bgColor} ${group.borderColor}`
            : `bg-white border-dashed ${group.borderColor} opacity-60 hover:opacity-100`}
        `}
      >
        {done ? (
          <span className={`font-display font-black text-xl ${group.textColor}`}>{letter}</span>
        ) : (
          <span className="text-gray-300 text-lg font-bold">?</span>
        )}
      </div>
    </div>
  )
}

function A3Ex4Exercise({ onComplete }: { onComplete: () => void }) {
  const [doors, setDoors] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())

  useEffect(() => {
    setDoors(shuffle(ABC_ORDER.map(l => `door_${l}`)))
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
    const tileLetter = tileId.replace('door_', '')
    if (tileLetter !== targetId) return false
    if (matched.has(tileLetter)) return false
    setMatched(prev => { const n = new Set(prev); n.add(tileLetter); return n })
    setDoors(prev => prev.filter(t => t !== tileId))
    return true
  }, [matched])

  const freeDoors = doors

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <p className="text-center text-gray-400 font-bold text-sm mb-4" dir="rtl">
        גרור כל אות קטנה לבית עם האות הגדולה שלה
      </p>

      {/* Houses grid — all 26 */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-3 gap-y-5 mb-6 justify-items-center">
        {ABC_ORDER.map(letter => {
          const group = getGroup(letter)
          const done = matched.has(letter)
          return (
            <HouseItem
              key={letter}
              letter={letter}
              done={done}
              group={group}
              onDrop={handleDrop}
            />
          )
        })}
      </div>

      {/* Door (lowercase letter) bank */}
      {freeDoors.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <p className="text-xs text-gray-400 font-bold text-center mb-3" dir="rtl">
            גרור את האות הקטנה לבית הנכון:
          </p>
          <div className="pb-3">
            <div className="flex gap-2 flex-wrap justify-center px-2 max-w-xs sm:max-w-sm mx-auto">
              {freeDoors.map(id => {
                const letter = id.replace('door_', '')
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
      hebrewInstruction="גרור כל אות קטנה לבית עם האות הגדולה שלה"
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
