'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'

const ABC_ORDER = 'abcdefghijklmnopqrstuvwxyz'.split('')

/**
 * Mobile: 26 pieces + 26 tiles don't fit on a phone screen (the child had to
 * drag from the bottom of a long page to a small target scrolled out of view),
 * so the alphabet is played in 4 short rounds — a–g, h–n, o–t, u–z — with
 * bigger pieces and the round's tiles right underneath.
 */
const ROUNDS = [ABC_ORDER.slice(0, 7), ABC_ORDER.slice(7, 14), ABC_ORDER.slice(14, 20), ABC_ORDER.slice(20)]
const PIECE_W = 128
const PIECE_H = 74

function getGroup(letter: string) {
  return LETTER_GROUPS.find(g => g.letters.includes(letter))!
}

// Slight rotation classes to give a "scattered" playful feel
const ROTATIONS = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0']

// SVG fill/stroke/text colors per group id
const PUZZLE_COLORS: Record<string, { fill: string; stroke: string; text: string }> = {
  group1: { fill: '#fef2f2', stroke: '#fca5a5', text: '#dc2626' },
  group2: { fill: '#eff6ff', stroke: '#93c5fd', text: '#2563eb' },
  group3: { fill: '#f0fdf4', stroke: '#86efac', text: '#16a34a' },
  group4: { fill: '#faf5ff', stroke: '#d8b4fe', text: '#9333ea' },
  group5: { fill: '#fdf2f8', stroke: '#f9a8d4', text: '#db2777' },
}

// Puzzle geometry (SVG coordinate space):
// Total SVG: 80px wide × 46px tall per pair
// Left piece  body: x=0..40,  tab extends to x=54 at y=16..30
// Right piece body: x=40..80, notch cuts inward at x=40..54, y=16..30
// The tab and notch use identical cubic-bezier curves so they interlock perfectly.
const LEFT_PATH  = 'M 0 0 H 40 V 16 C 54 16 54 30 40 30 V 46 H 0 Z'
const RIGHT_PATH = 'M 40 0 H 80 V 46 H 40 V 30 C 54 30 54 16 40 16 Z'

function A3Ex3Exercise({ onComplete }: { onComplete: () => void }) {
  const [round, setRound] = useState(0)
  const [tiles, setTiles] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const letters = ROUNDS[round]

  useEffect(() => {
    setTiles(shuffle([...ROUNDS[round]]))
  }, [round])

  const roundDone = letters.every(l => matched.has(l))
  const allDone = matched.size === 26

  // a finished round moves on by itself after a short celebration
  useEffect(() => {
    if (!roundDone || allDone) return
    const t = setTimeout(() => setRound(r => r + 1), 900)
    return () => clearTimeout(t)
  }, [roundDone, allDone])

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
    <div className="px-3 py-3 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3" dir="rtl">
        <p className="text-gray-400 font-bold text-sm">גררו כל אות קטנה לפאזל של האות הגדולה שלה!</p>
        <span className="flex-shrink-0 text-xs font-black text-indigo-500 bg-indigo-50 rounded-full px-2.5 py-1">
          סבב {round + 1} מתוך {ROUNDS.length}
        </span>
      </div>

      {/* Puzzle pairs — this round only */}
      <div key={round} className="grid grid-cols-2 sm:grid-cols-4 justify-items-center gap-x-2 gap-y-3 mb-4 bounce-in">
        {letters.map((letter, i) => {
          const group = getGroup(letter)
          const colors = PUZZLE_COLORS[group.id] ?? { fill: '#f1f5f9', stroke: '#cbd5e1', text: '#475569' }
          const done = matched.has(letter)
          const rot = ROTATIONS[i % ROTATIONS.length]

          return (
            <div
              key={letter}
              className={`transition-transform duration-200 ${done ? 'rotate-0 drop-success' : rot}`}
            >
              {/* Single SVG renders both interlocking halves */}
              <div className="relative" style={{ width: PIECE_W, height: PIECE_H }}>
                <svg
                  width={PIECE_W} height={PIECE_H} viewBox="0 0 80 46"
                  fill="none" style={{ display: 'block', pointerEvents: 'none' }}
                >
                  {/* Left half — uppercase letter with tab on right */}
                  <path
                    d={LEFT_PATH}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x="20" y="23"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: 17, fontWeight: 900, fill: colors.text, fontFamily: 'ui-monospace, monospace' }}
                  >
                    {letter.toUpperCase()}
                  </text>

                  {/* Right half — notch on left, shows ? until matched */}
                  <path
                    d={RIGHT_PATH}
                    fill={done ? colors.fill : '#f8fafc'}
                    stroke={done ? colors.stroke : '#cbd5e1'}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {done ? (
                    <text
                      x="60" y="23"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: 17, fontWeight: 900, fill: colors.text, fontFamily: 'ui-monospace, monospace' }}
                    >
                      {letter}
                    </text>
                  ) : (
                    <text
                      x="60" y="23"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: 13, fill: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}
                    >
                      ?
                    </text>
                  )}
                </svg>

                {/* Invisible drop target over the whole piece (big target for small fingers) */}
                <div
                  data-drop-target="true"
                  data-expected-ids={JSON.stringify([letter])}
                  data-target-id={letter}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Tile bank */}
      {tiles.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <div className="pb-3">
            <div className="flex gap-2.5 px-1 mx-auto justify-center flex-wrap max-w-sm">
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
                    size="lg"
                    onDropped={handleDrop}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}

      {roundDone && !allDone && (
        <p className="text-center font-black text-green-500 text-lg bounce-in" dir="rtl">כל הכבוד! ממשיכים…</p>
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
