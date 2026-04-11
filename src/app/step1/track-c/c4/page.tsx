'use client'
import { useState, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { CVC_WORDS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

const BATCH_SIZE = 5

function C4Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [batches] = useState(() => {
    const words = shuffle([...CVC_WORDS])
    const out: typeof CVC_WORDS[] = []
    for (let i = 0; i < words.length; i += BATCH_SIZE) out.push(words.slice(i, i + BATCH_SIZE))
    return out
  })
  const [batchIdx, setBatchIdx] = useState(0)
  const [placed, setPlaced] = useState<Record<string, boolean>>({})

  const currentBatch = batches[batchIdx] ?? []
  // Word tiles shuffled in a DIFFERENT order from the templates above
  const [tileOrder] = useState(() => shuffle(Array.from({ length: BATCH_SIZE }, (_, i) => i)))
  const freeTiles = tileOrder.map(i => currentBatch[i]).filter(w => w && !placed[w.word])
  const allPlaced = currentBatch.every(w => w && placed[w.word])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetId = targetEl.getAttribute('data-target-id')
    if (!targetId || targetId !== tileId || placed[tileId]) return false
    setPlaced(prev => ({ ...prev, [tileId]: true }))
    return true
  }, [placed])

  function nextBatch() {
    if (batchIdx + 1 >= batches.length) {
      onComplete()
    } else {
      setBatchIdx(b => b + 1)
      setPlaced({})
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="text-sm font-bold text-gray-400 text-center mb-4">
        Batch {batchIdx + 1} / {batches.length}
      </div>

      {/* Templates (drop targets) */}
      <div className="space-y-3 mb-6">
        {currentBatch.map(w => {
          const vc = VOWEL_COLORS[w.vowel]
          const isPlaced = placed[w.word]
          return (
            <div key={w.word} className="flex items-center gap-3">
              <button onClick={() => speak(w.word)} className="text-5xl hover:scale-110 active:scale-90 transition-transform cursor-pointer select-none">
                {w.emoji}
              </button>
              <div
                data-drop-target="true"
                data-expected-ids={JSON.stringify([w.word])}
                data-target-id={w.word}
                className={`
                  flex gap-1 p-1 rounded-xl border-4
                  ${isPlaced ? `${vc.border} ${vc.bg}` : 'border-dashed border-gray-300 bg-white/60'}
                  transition-all duration-200
                `}
              >
                {isPlaced ? (
                  w.word.split('').map((ch, i) => (
                    <div key={i} className={`w-12 h-12 rounded-lg border-2 ${vc.border} ${vc.bg} flex items-center justify-center`}>
                      <span className={`font-display font-black text-xl ${vc.text}`}>{ch}</span>
                    </div>
                  ))
                ) : (
                  [0, 1, 2].map(i => (
                    <div key={i} className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <span className="text-gray-200 text-xs">_</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Word tiles — in shuffled order (different from templates) */}
      {freeTiles.length > 0 ? (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <div className="flex flex-wrap justify-center gap-2">
            {freeTiles.map(w => {
              const vc = VOWEL_COLORS[w.vowel]
              return (
                <DraggableTile
                  key={w.word}
                  id={w.word}
                  label={w.word}
                  color={vc.bg}
                  borderColor={vc.border}
                  textColor={vc.text}
                  size="md"
                  onDropped={handleDrop}
                />
              )
            })}
          </div>
        </div>
      ) : allPlaced && (
        <div className="text-center mt-4">
          <button onClick={nextBatch} className="btn-kid bg-green-500 hover:bg-green-600">
            {batchIdx + 1 < batches.length ? 'Next batch →' : 'Done! 🎉'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function C4Page() {
  return (
    <ExerciseShell
      title="CVC Template"
      hebrewInstruction="לחץ על התמונה כדי לשמוע את המילה – גרור את המילה המתאימה לתמונה"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c4"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C4Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
