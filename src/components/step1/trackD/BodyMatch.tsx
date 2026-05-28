'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const BODY_ITEMS = [
  { word: 'head',  emoji: '👦' },
  { word: 'hands', emoji: '🙌' },
  { word: 'legs',  emoji: '🦵🦵' },
  { word: 'hair',  emoji: '💇' },
  { word: 'body',  emoji: '🧍' },
  { word: 'eyes',  emoji: '👀' },
  { word: 'nose',  emoji: '👃' },
  { word: 'mouth', emoji: '👄' },
  { word: 'ear',   emoji: '👂' },
]

export function BodyMatch({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [shuffledWords] = useState(() => shuffle([...BODY_ITEMS]))
  const [shuffledEmojis] = useState(() => shuffle([...BODY_ITEMS]))
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleWordClick(word: string) {
    if (matched.has(word)) return
    speak(word, 0.8)
    setSelectedWord(word)
    setWrongFlash(null)
  }

  function handleEmojiClick(word: string) {
    if (!selectedWord) return
    if (matched.has(selectedWord)) return
    if (word === selectedWord) {
      const next = new Set(matched); next.add(selectedWord)
      setMatched(next)
      setSelectedWord(null)
      if (next.size === BODY_ITEMS.length) {
        setDone(true)
        setTimeout(onComplete, 600)
      }
    } else {
      setWrongFlash(selectedWord)
      setTimeout(() => { setWrongFlash(null); setSelectedWord(null) }, 500)
    }
  }

  function handleAgain() {
    setSelectedWord(null)
    setMatched(new Set())
    setWrongFlash(null)
    setDone(false)
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        לחץ על מילה ואז על התמונה המתאימה
      </p>

      <div className="flex gap-3">
        {/* Words column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledWords.map(item => {
            const isMatched = matched.has(item.word)
            const isSelected = selectedWord === item.word
            const isWrong = wrongFlash === item.word
            return (
              <button
                key={item.word}
                onClick={() => !isMatched && handleWordClick(item.word)}
                disabled={isMatched}
                className={`
                  py-3 px-3 rounded-xl border-4 font-display font-black text-xl text-center
                  transition-all duration-150 cursor-pointer select-none min-h-[56px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-900 opacity-60' : ''}
                  ${isSelected ? 'bg-amber-200 border-amber-600 text-amber-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 hover:scale-105' : ''}
                `}
              >
                {item.word}
              </button>
            )
          })}
        </div>

        {/* Emoji column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledEmojis.map(item => {
            const isMatched = matched.has(item.word)
            return (
              <button
                key={item.word}
                onClick={() => !isMatched && handleEmojiClick(item.word)}
                disabled={isMatched || !selectedWord}
                className={`
                  h-[56px] w-full rounded-xl border-4 text-3xl
                  transition-all duration-150 cursor-pointer select-none flex items-center justify-center
                  ${isMatched ? 'bg-green-200 border-green-500 opacity-60' : ''}
                  ${!isMatched ? 'bg-amber-50 border-amber-400 hover:bg-amber-100 hover:scale-105 disabled:opacity-40' : ''}
                `}
              >
                {item.emoji}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-white font-bold text-sm">
        {matched.size}/{BODY_ITEMS.length} ✓
      </div>

      {done && (
        <div className="text-center mt-4">
          <button onClick={handleAgain} className="btn-kid bg-amber-500">
            🔁 Again
          </button>
        </div>
      )}
    </div>
  )
}
