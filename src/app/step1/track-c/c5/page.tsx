'use client'
import { useState, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { CVC_WORDS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

// Word-Image match: drag image emoji tile to matching word
export default function C5Page() {
  const speak = useSpeak()
  const [words] = useState(() => shuffle([...CVC_WORDS]))
  const [tiles, setTiles] = useState(() => shuffle(CVC_WORDS.map(w => ({ id: `img_${w.word}`, word: w.word, emoji: w.emoji, vowel: w.vowel, placed: false }))))
  const [matched, setMatched] = useState<Record<string, boolean>>({})


  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetWord = targetEl.getAttribute('data-target-id')
    if (!targetWord) return false
    const tile = tiles.find(t => t.id === tileId)
    if (!tile || tile.placed) return false
    if (tile.word !== targetWord) return false

    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, placed: true } : t))
    setMatched(prev => ({ ...prev, [targetWord]: true }))
    return true
  }, [tiles])

  const allDone = Object.keys(matched).length === CVC_WORDS.length
  const freeTiles = tiles.filter(t => !t.placed)

  return (
    <ExerciseShell
      title="Word-Image Match"
      hebrewInstruction="גרור כל תמונה למילה הנכונה"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c5"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete) => {
        if (allDone) setTimeout(onComplete, 300)
        return (
          <div className="p-3 max-w-2xl mx-auto">
            {/* Word list with drop targets */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
              {words.map(w => {
                const vc = VOWEL_COLORS[w.vowel]
                const done = matched[w.word]
                return (
                  <div
                    key={w.word}
                    data-drop-target="true"
                    data-expected-ids={JSON.stringify([`img_${w.word}`])}
                    data-target-id={w.word}
                    onClick={() => speak(w.word)}
                    className={`
                      rounded-2xl border-4 p-2 flex flex-col items-center gap-1 cursor-pointer
                      transition-all duration-200
                      ${done ? `${vc.bg} ${vc.border} drop-success` : 'bg-white border-dashed border-gray-300'}
                    `}
                  >
                    {done ? (
                      <span className="text-2xl">{w.emoji}</span>
                    ) : (
                      <div className="w-8 h-8 rounded-lg border-2 border-dashed border-gray-200" />
                    )}
                    <span className={`font-display font-black text-sm ${done ? vc.text : 'text-gray-700'}`}>
                      {w.word}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Image tiles */}
            {freeTiles.length > 0 && (
              <div className="border-t-2 border-dashed border-gray-200 pt-3">
                <p className="text-xs text-gray-400 font-bold text-center mb-2" dir="rtl">גרור כל תמונה למילה שלה:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {freeTiles.map(tile => {
                    const vc = VOWEL_COLORS[tile.vowel]
                    return (
                      <DraggableTile
                        key={tile.id}
                        id={tile.id}
                        label={tile.emoji}
                        color={vc.bg}
                        borderColor={vc.border}
                        textColor={vc.text}
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
