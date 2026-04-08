'use client'
import { useState } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

const BATCH = 6

interface BatchProps {
  batch: typeof CVC_WORDS
  onDone: () => void
}

function C6Batch({ batch, onDone }: BatchProps) {
  const speak = useSpeak()
  // Shuffle images to a DIFFERENT order from words
  const [shuffledImages] = useState(() => shuffle(batch.map(w => w.word)))
  const [matched, setMatched] = useState<Record<string, boolean>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const allDone = batch.every(w => matched[w.word])

  function handleImageTap(word: string) {
    speak(word)
    setSelectedImage(prev => prev === word ? null : word)
  }

  function handleWordTap(word: string) {
    if (!selectedImage) return
    if (selectedImage === word) {
      setMatched(prev => ({ ...prev, [word]: true }))
      setSelectedImage(null)
      speak(word)
    } else {
      // Wrong match — deselect
      setSelectedImage(null)
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <p className="text-center text-gray-400 text-xs font-bold mb-4" dir="rtl">
        לחץ על תמונה → לחץ על המילה שלה
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Words column — in batch order */}
        <div className="space-y-2">
          <p className="text-center text-xs font-bold text-gray-400 mb-1">Words</p>
          {batch.map(w => {
            const vc = VOWEL_COLORS[w.vowel]
            const done = matched[w.word]
            return (
              <button
                key={`word_${w.word}`}
                onClick={() => !done && handleWordTap(w.word)}
                disabled={done}
                className={`
                  w-full py-2 rounded-xl border-4 font-display font-black text-lg
                  transition-all duration-150 cursor-pointer select-none
                  ${done ? `${vc.bg} ${vc.border} ${vc.text}` : ''}
                  ${!done && selectedImage ? 'bg-yellow-50 border-yellow-400 text-yellow-700 hover:scale-105 active:scale-95' : ''}
                  ${!done && !selectedImage ? 'bg-white border-gray-200 text-gray-600' : ''}
                `}
              >
                {done && <span className="mr-1">✓</span>}
                {w.word}
              </button>
            )
          })}
        </div>

        {/* Images column — shuffled to different order */}
        <div className="space-y-2">
          <p className="text-center text-xs font-bold text-gray-400 mb-1">Images</p>
          {shuffledImages.map(word => {
            const w = CVC_WORDS.find(c => c.word === word)!
            const vc = VOWEL_COLORS[w.vowel]
            const done = matched[word]
            const selected = selectedImage === word
            return (
              <button
                key={`img_${word}`}
                onClick={() => !done && handleImageTap(word)}
                disabled={done}
                className={`
                  w-full py-2 rounded-xl border-4 text-3xl
                  transition-all duration-150 cursor-pointer select-none
                  ${done ? `${vc.bg} ${vc.border}` : ''}
                  ${selected ? 'bg-purple-100 border-purple-400 scale-110 shadow-lg' : ''}
                  ${!done && !selected ? 'bg-white border-gray-200 hover:scale-105 active:scale-95' : ''}
                `}
              >
                {w.emoji}
              </button>
            )
          })}
        </div>
      </div>

      {allDone && (
        <div className="text-center mt-6">
          <button onClick={onDone} className="btn-kid bg-green-500">
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

function C6Exercise({ onComplete }: { onComplete: () => void }) {
  const [batches] = useState(() => {
    const words = shuffle([...CVC_WORDS])
    const out: typeof CVC_WORDS[] = []
    for (let i = 0; i < words.length; i += BATCH) out.push(words.slice(i, i + BATCH))
    return out
  })
  const [batchIdx, setBatchIdx] = useState(0)

  const batch = batches[batchIdx] ?? []

  function nextBatch() {
    if (batchIdx + 1 >= batches.length) onComplete()
    else setBatchIdx(b => b + 1)
  }

  return (
    <div>
      <div className="text-sm font-bold text-gray-400 text-center pt-3">
        Set {batchIdx + 1} / {batches.length}
      </div>
      {/* Key by batchIdx so the batch component remounts with fresh state */}
      <C6Batch key={batchIdx} batch={batch} onDone={nextBatch} />
    </div>
  )
}

export default function C6Page() {
  return (
    <ExerciseShell
      title="Line Matching"
      hebrewInstruction="לחץ על תמונה ואז על המילה המתאימה"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c6"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C6Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
