'use client'
import { useState, useEffect } from 'react'
import type { WordItem } from '@/types'

interface Props {
  words: WordItem[]
  onScore: (score: number) => void
}

interface Card {
  id: string
  text: string
  type: 'english' | 'hebrew' | 'emoji'
  pairId: number
  matched: boolean
  selected: boolean
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function WordMatch({ words, onScore }: Props) {
  const gameWords = words.slice(0, Math.min(6, words.length))
  const useEmoji = !!gameWords[0]?.emoji

  const [cards, setCards] = useState<Card[]>(() => {
    const eng: Card[] = gameWords.map((w, i) => ({
      id: `e${i}`, text: w.english, type: 'english', pairId: i,
      matched: false, selected: false,
    }))
    const right: Card[] = gameWords.map((w, i) => ({
      id: `r${i}`,
      text: useEmoji ? w.emoji! : w.hebrew,
      type: useEmoji ? 'emoji' : 'hebrew',
      pairId: i,
      matched: false,
      selected: false,
    }))
    return shuffle([...eng, ...right])
  })

  const [selected, setSelected] = useState<Card[]>([])
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (cards.every(c => c.matched)) {
      setFinished(true)
      onScore(score)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  function handleSelect(card: Card) {
    if (card.matched || wrong.includes(card.id)) return
    if (selected.length === 1 && selected[0].id === card.id) {
      setSelected([])
      return
    }
    if (selected.length === 1) {
      const [first] = selected
      if (first.pairId === card.pairId && first.type !== card.type) {
        // correct match!
        setCards(prev => prev.map(c =>
          c.pairId === card.pairId ? { ...c, matched: true, selected: false } : c
        ))
        setScore(s => s + 10)
        setSelected([])
      } else {
        // wrong
        setWrong([first.id, card.id])
        setSelected([])
        setTimeout(() => setWrong([]), 700)
      }
      return
    }
    setSelected([card])
  }

  if (finished) {
    return (
      <div className="text-center py-8 bounce-in">
        <div className="text-7xl mb-3">🎊</div>
        <h3 className="text-2xl font-black text-gray-800">All Matched!</h3>
        <p className="text-xl font-bold text-primary mt-2">Score: {score} points</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-kid bg-primary mt-4"
        >
          Play Again 🔄
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-gray-700 text-lg">🃏 Match the pairs!</h3>
        <div className="bg-primary text-white font-black px-4 py-2 rounded-xl">
          ⭐ {score} pts
        </div>
      </div>
      <p className="text-sm text-gray-400 font-bold mb-4 text-center">
        {useEmoji
          ? 'Tap a word, then tap its emoji!'
          : 'Tap an English word, then its Hebrew match!'}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map(card => {
          const isSelected = selected[0]?.id === card.id
          const isWrong = wrong.includes(card.id)
          const isEmoji = card.type === 'emoji'
          return (
            <button
              key={card.id}
              onClick={() => handleSelect(card)}
              dir={card.type === 'hebrew' ? 'rtl' : 'ltr'}
              className={`
                p-3 rounded-2xl font-bold border-4 transition-all duration-150 min-h-[60px]
                flex items-center justify-center
                ${isEmoji ? 'text-4xl' : 'text-sm'}
                ${card.matched
                  ? 'bg-green-100 border-green-400 text-green-700 scale-95'
                  : isWrong
                  ? 'bg-red-100 border-red-400 text-red-700 shake'
                  : isSelected
                  ? 'bg-purple-100 border-primary text-primary scale-105 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-primary hover:bg-purple-50 hover:scale-105'}
              `}
            >
              {card.matched ? '✅' : card.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
