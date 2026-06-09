'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'
import { TrackDItem } from '@/data/step1/trackDCategories'

interface Props { items: TrackDItem[]; onComplete: () => void; limit?: number }

export function GenericMatch({ items, onComplete, limit = 6 }: Props) {
  const speak = useSpeak()
  const [pool] = useState<TrackDItem[]>(() => shuffle([...items]).slice(0, limit))
  const [shuffledWords] = useState(() => shuffle([...pool]))
  const [shuffledEmojis] = useState(() => shuffle([...pool]))
  const [selWord, setSelWord] = useState<string | null>(null)
  const [selSide, setSelSide] = useState<'word' | 'emoji' | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function attemptMatch(wordId: string, emojiId: string) {
    if (wordId === emojiId) {
      const next = new Set(matched); next.add(wordId)
      setMatched(next)
      setSelWord(null); setSelSide(null)
      if (next.size === pool.length) { setDone(true); setTimeout(onComplete, 600) }
    } else {
      setWrongFlash(wordId + '|' + emojiId)
      setTimeout(() => { setWrongFlash(null); setSelWord(null); setSelSide(null) }, 600)
    }
  }

  function handleWordClick(word: string) {
    if (matched.has(word)) return
    speak(word, 0.8)
    if (selSide === 'emoji' && selWord) { attemptMatch(word, selWord); return }
    if (selWord === word && selSide === 'word') { setSelWord(null); setSelSide(null); return }
    setSelWord(word); setSelSide('word')
  }

  function handleEmojiClick(word: string) {
    if (matched.has(word)) return
    if (selSide === 'word' && selWord) { attemptMatch(selWord, word); return }
    if (selWord === word && selSide === 'emoji') { setSelWord(null); setSelSide(null); return }
    setSelWord(word); setSelSide('emoji')
  }

  function handleAgain() {
    setSelWord(null); setSelSide(null)
    setMatched(new Set()); setWrongFlash(null); setDone(false)
  }

  const isWordWrong = (word: string) => wrongFlash?.startsWith(word + '|') ?? false
  const isEmojiWrong = (word: string) => wrongFlash?.endsWith('|' + word) ?? false

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        לחץ על מילה ואז על התמונה המתאימה — או להפך
      </p>

      <div className="flex gap-3">
        {/* Words column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledWords.map(item => {
            const isMatched = matched.has(item.word)
            const isSelected = selWord === item.word && selSide === 'word'
            const isWrong = isWordWrong(item.word)
            return (
              <button
                key={item.word}
                onClick={() => !isMatched && handleWordClick(item.word)}
                disabled={isMatched}
                className={`
                  py-3 px-3 rounded-xl border-4 font-display font-black text-xl text-center
                  transition-all duration-150 cursor-pointer select-none min-h-[56px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-900' : ''}
                  ${isSelected ? 'bg-amber-300 border-amber-600 text-amber-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200 hover:scale-105' : ''}
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
            const isSelected = selWord === item.word && selSide === 'emoji'
            const isWrong = isEmojiWrong(item.word)
            return (
              <button
                key={item.word}
                onClick={() => !isMatched && handleEmojiClick(item.word)}
                disabled={isMatched}
                className={`
                  min-h-[56px] w-full rounded-xl border-4 text-3xl
                  transition-all duration-150 cursor-pointer select-none flex items-center justify-center
                  ${isMatched ? 'bg-green-200 border-green-500' : ''}
                  ${isSelected ? 'bg-amber-300 border-amber-600 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-500 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-amber-100 border-amber-400 hover:bg-amber-200 hover:scale-105' : ''}
                `}
              >
                {item.emoji}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-white font-bold text-sm">
        {matched.size}/{pool.length} ✓
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
