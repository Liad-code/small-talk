'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { WordEmoji } from '@/components/step1/WordEmoji'
import { CVC_WORDS, VOWELS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

const INSTRUCTION = 'לחץ על התמונה כדי לשמוע את המילה – גרור את המילה למקום הנכון בטבלה לפי התנועה במילה (vowel)'

function C1Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [tiles, setTiles] = useState(() =>
    shuffle(CVC_WORDS.map(w => ({ id: w.word, word: w.word, vowel: w.vowel, emoji: w.emoji, placed: false, cvcWord: w })))
  )
  const [columns, setColumns] = useState<Record<string, string[]>>({ a: [], e: [], i: [], o: [], u: [] })

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const targetVowel = targetEl.getAttribute('data-target-id')
    if (!targetVowel) return false
    const tile = tiles.find(t => t.id === tileId)
    if (!tile || tile.placed) return false
    if (tile.vowel !== targetVowel) return false
    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, placed: true } : t))
    setColumns(prev => ({ ...prev, [targetVowel]: [...prev[targetVowel], tileId] }))
    return true
  }, [tiles])

  const freeTiles = tiles.filter(t => !t.placed)
  const allDone = freeTiles.length === 0 && tiles.length > 0

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  return (
    <div className="p-3 max-w-2xl mx-auto">
      {/* 5 vowel column targets */}
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {VOWELS.map(v => {
          const vc = VOWEL_COLORS[v]
          return (
            <div key={v} className="flex flex-col gap-1.5">
              {/* Vowel label */}
              <div className={`w-full py-2 rounded-xl border-4 ${vc.border} ${vc.bg} text-center font-display font-black text-2xl ${vc.text}`}>
                {v}
              </div>
              {/* Drop zone */}
              <div
                data-drop-target="true"
                data-expected-ids="[]"
                data-target-id={v}
                className={`min-h-[120px] rounded-xl border-2 border-dashed ${vc.border} ${vc.bg} p-1 flex flex-col gap-1 items-center`}
              >
                {columns[v].map(wordId => {
                  const w = CVC_WORDS.find(c => c.word === wordId)!
                  return (
                    <div
                      key={wordId}
                      onClick={() => speak(wordId)}
                      className={`w-full rounded-lg border-2 ${vc.border} ${vc.bg} flex flex-col items-center py-0.5 cursor-pointer hover:opacity-80`}
                      style={{ pointerEvents: 'auto' }}
                    >
                      {/* Item 1: enlarged image, maintained proportion */}
                      <WordEmoji word={w} className="text-xl leading-none" />
                      <span className={`text-xs font-black ${vc.text}`}>{wordId}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Word bank */}
      {freeTiles.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          {/* Items 2 & 3: new instruction text, enlarged */}
          <p className="text-center text-gray-600 font-bold text-base mb-3" dir="rtl">
            {INSTRUCTION}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {freeTiles.map(tile => (
              <div key={tile.id} className="flex flex-col items-center gap-0.5">
                {/* Item 1: enlarged image (text-3xl vs previous text-xl) */}
                <button
                  onClick={() => speak(tile.word)}
                  className="text-3xl hover:scale-110 active:scale-90 transition-transform"
                >
                  <WordEmoji word={tile.cvcWord} className="text-3xl" />
                </button>
                <DraggableTile
                  id={tile.id}
                  label={tile.word}
                  color="bg-gray-50"
                  borderColor="border-gray-800"
                  textColor="text-gray-900"
                  size="sm"
                  onDropped={handleDrop}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function C1Page() {
  return (
    <ExerciseShell
      title="Vowel Sort"
      hebrewInstruction={INSTRUCTION}
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c1"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C1Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
