'use client'
import { useState, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { CVC_WORDS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { WordEmoji } from '@/components/step1/WordEmoji'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

const BATCH_SIZE = 6

function C5Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  // Split into batches of 6 for mobile friendliness
  const [batches] = useState(() => {
    const words = shuffle([...CVC_WORDS])
    const out: typeof CVC_WORDS[] = []
    for (let i = 0; i < words.length; i += BATCH_SIZE) out.push(words.slice(i, i + BATCH_SIZE))
    return out
  })
  const [batchIdx, setBatchIdx] = useState(0)
  const [tiles, setTiles] = useState<{ id: string; word: string; emoji: string; vowel: 'a'|'e'|'i'|'o'|'u'; placed: boolean }[]>(() =>
    shuffle(batches[0]?.map(w => ({ id: `img_${w.word}`, word: w.word, emoji: w.emoji, vowel: w.vowel, placed: false })) ?? [])
  )
  const [matched, setMatched] = useState<Record<string, boolean>>({})

  const currentBatch = batches[batchIdx] ?? []
  const allPlaced = currentBatch.every(w => matched[w.word])

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

  function nextBatch() {
    const nextIdx = batchIdx + 1
    if (nextIdx >= batches.length) {
      onComplete()
    } else {
      setBatchIdx(nextIdx)
      const newTiles = shuffle(batches[nextIdx].map(w => ({ id: `img_${w.word}`, word: w.word, emoji: w.emoji, vowel: w.vowel, placed: false })))
      setTiles(newTiles)
      setMatched({})
    }
  }

  const freeTiles = tiles.filter(t => !t.placed)

  return (
    <div className="p-3 max-w-md mx-auto">
      <div className="text-sm font-bold text-gray-400 text-center mb-3">
        Set {batchIdx + 1} / {batches.length}
      </div>

      {/* Word targets — 2 columns on mobile */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {currentBatch.map(w => {
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
                rounded-2xl border-4 p-3 flex items-center gap-3 cursor-pointer
                transition-all duration-200 min-h-[64px]
                ${done ? `${vc.bg} ${vc.border} drop-success` : 'bg-white border-dashed border-gray-300'}
              `}
            >
              {done ? (
                <WordEmoji word={w} className="text-3xl" />
              ) : (
                <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200 flex-shrink-0" />
              )}
              <span className={`font-display font-black text-lg ${done ? vc.text : 'text-gray-700'}`}>
                {w.word}
              </span>
            </div>
          )
        })}
      </div>

      {/* Image tiles */}
      {freeTiles.length > 0 ? (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <p className="text-base text-gray-600 font-bold text-center mb-2" dir="rtl">גרור כל תמונה למילה שלה (אפשר ללחוץ על המילה כדי לשמוע אותה)</p>
          <div className="flex flex-wrap justify-center gap-3">
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
                  size="md"
                  onDropped={handleDrop}
                >
                  <WordEmoji word={CVC_WORDS.find(cw => cw.word === tile.word)!} className="text-3xl" />
                </DraggableTile>
              )
            })}
          </div>
        </div>
      ) : allPlaced && (
        <div className="text-center mt-4">
          <button onClick={nextBatch} className="btn-kid bg-green-500 hover:bg-green-600">
            {batchIdx + 1 < batches.length ? 'Next →' : 'Done! 🎉'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function C5Page() {
  return (
    <ExerciseShell
      title="Word-Image Match"
      hebrewInstruction="גרור כל תמונה למילה שלה (אפשר ללחוץ על המילה כדי לשמוע אותה)"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c5"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C5Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
