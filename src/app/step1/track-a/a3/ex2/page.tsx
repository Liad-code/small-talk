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

const toId = (l: string) => `lc_${l}`
const fromId = (id: string) => id.replace('lc_', '')

function A3Ex2Exercise({ onComplete }: { onComplete: () => void }) {
  const [blanks, setBlanks] = useState<Set<string>>(new Set())
  const [filled, setFilled] = useState<Record<string, boolean>>({})
  const [tiles, setTiles] = useState<string[]>([])

  useEffect(() => {
    const b = pickBlanks()
    setBlanks(b)
    setFilled({})
    setTiles(shuffle(Array.from(b).map(toId)))
  }, [])

  const allDone = blanks.size > 0 && Array.from(blanks).every(l => filled[l])

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <p className="text-center text-gray-600 font-bold text-base mb-4" dir="rtl">
        גרור את האותיות הקטנות החסרות למקומן:
      </p>

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
                className="w-full aspect-square rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 flex items-center justify-center"
              >
                <span className="text-blue-300 text-xs font-bold">?</span>
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
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 justify-center flex-wrap px-2">
              {tiles.map(id => (
                <DraggableTile
                  key={id}
                  id={id}
                  label={fromId(id)}
                  color="bg-blue-100"
                  borderColor="border-blue-400"
                  textColor="text-blue-700"
                  size="md"
                  onDropped={handleDrop}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function A3Ex2Page() {
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
      {(onComplete, resetKey) => (
        <A3Ex2Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
