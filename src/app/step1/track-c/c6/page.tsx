'use client'
import { useState } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

// Line matching: tap image, then tap word to connect
// Show 6 at a time in two columns: words left, images right (shuffled)
const BATCH = 6

export default function C6Page() {
  const speak = useSpeak()
  const [batches] = useState(() => {
    const words = shuffle([...CVC_WORDS])
    const out: typeof CVC_WORDS[] = []
    for (let i = 0; i < words.length; i += BATCH) out.push(words.slice(i, i + BATCH))
    return out
  })
  const [batchIdx, setBatchIdx] = useState(0)
  const [matched, setMatched] = useState<Record<string, boolean>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const batch = batches[batchIdx] ?? []
  const shuffledImages = useState(() => batch.map(w => w.word))[0]
  const allDone = batch.every(w => matched[w.word])


  function handleImageTap(word: string) {
    speak(word)
    setSelectedImage(prev => prev === word ? null : word)
  }

  function handleWordTap(word: string, onComplete: () => void) {
    if (!selectedImage) return
    if (selectedImage === word) {
      setMatched(prev => ({ ...prev, [word]: true }))
      setSelectedImage(null)
      speak(word)
    } else {
      setSelectedImage(null)
    }
  }

  function nextBatch(onComplete: () => void) {
    if (batchIdx + 1 >= batches.length) onComplete()
    else { setBatchIdx(b => b + 1); setMatched({}); setSelectedImage(null) }
  }

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
      {(onComplete) => (
        <div className="p-4 max-w-sm mx-auto">
          <p className="text-center text-gray-400 text-xs font-bold mb-4" dir="rtl">
            לחץ על תמונה → לחץ על המילה שלה
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* Words column */}
            <div className="space-y-3">
              <p className="text-center text-xs font-bold text-gray-400 mb-1">Words</p>
              {batch.map(w => {
                const vc = VOWEL_COLORS[w.vowel]
                const done = matched[w.word]
                return (
                  <button
                    key={`word_${w.word}`}
                    onClick={() => !done && handleWordTap(w.word, onComplete)}
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

            {/* Images column (shuffled) */}
            <div className="space-y-3">
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
              <button onClick={() => nextBatch(onComplete)} className="btn-kid bg-green-500">
                {batchIdx + 1 < batches.length ? 'Next →' : 'Done! 🎉'}
              </button>
            </div>
          )}
        </div>
      )}
    </ExerciseShell>
  )
}
