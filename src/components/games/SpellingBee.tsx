'use client'
import { useState } from 'react'
import type { WordItem } from '@/types'

interface Props {
  words: WordItem[]
  onScore: (score: number) => void
}

export function SpellingBee({ words, onScore }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [done, setDone] = useState(false)
  const [hintShown, setHintShown] = useState(false)

  const current = words[currentIdx]
  if (!current || done) {
    if (done) {
      return (
        <div className="text-center py-6 bounce-in">
          <div className="text-7xl mb-3">🐝</div>
          <h3 className="text-2xl font-black text-gray-800">Spelling Bee Done!</h3>
          <p className="text-xl font-bold text-primary mt-2">Score: {score} points</p>
          <button onClick={() => window.location.reload()} className="btn-kid bg-yellow-400 mt-4 text-gray-800">
            Play Again 🔄
          </button>
        </div>
      )
    }
    return null
  }

  // Build scrambled hint (show first letter + scrambled rest)
  const scrambled = current.english[0] +
    current.english.slice(1).split('').sort(() => Math.random() - 0.5).join('')

  function check() {
    if (!input.trim()) return
    const correct = input.trim().toLowerCase() === current.english.toLowerCase()
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) setScore(s => s + (hintShown ? 5 : 10))
    setTimeout(() => {
      const next = currentIdx + 1
      if (next >= words.length) {
        onScore(score + (correct ? (hintShown ? 5 : 10) : 0))
        setDone(true)
      } else {
        setCurrentIdx(next)
        setInput('')
        setFeedback(null)
        setHintShown(false)
      }
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-gray-700 text-lg">🐝 Spelling Bee</h3>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 font-bold text-sm">{currentIdx + 1}/{words.length}</span>
          <div className="bg-yellow-400 text-gray-800 font-black px-4 py-2 rounded-xl">
            ⭐ {score} pts
          </div>
        </div>
      </div>

      {/* Word to spell */}
      <div className="bg-yellow-50 border-4 border-yellow-200 rounded-3xl p-8 text-center">
        <div className="text-7xl mb-4">{current.emoji}</div>
        <div className="text-xl font-bold text-gray-500 mb-1" dir="rtl">
          {current.hebrew}
        </div>
        {hintShown && (
          <div className="text-gray-400 text-sm font-bold mt-2 tracking-widest">
            Hint: {scrambled.toUpperCase()}
          </div>
        )}
        {current.example && (
          <div className="text-gray-400 text-sm italic mt-2">"{current.example}"</div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="Spell it in English..."
          disabled={!!feedback}
          className={`flex-1 border-4 rounded-2xl px-4 py-3 text-xl font-bold outline-none
                       transition-all
                       ${feedback === 'correct' ? 'border-green-400 bg-green-50' :
                         feedback === 'wrong'   ? 'border-red-400 bg-red-50' :
                                                  'border-gray-200 focus:border-yellow-400'}`}
        />
        <button onClick={check} disabled={!!feedback || !input.trim()} className="btn-kid bg-yellow-400 text-gray-800 disabled:opacity-50">
          ✓
        </button>
      </div>

      {feedback && (
        <div className={`text-center font-black text-xl bounce-in ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
          {feedback === 'correct' ? '✅ Correct! +' + (hintShown ? 5 : 10) + ' pts' : `❌ It was: ${current.english}`}
        </div>
      )}

      {!feedback && !hintShown && (
        <button onClick={() => setHintShown(true)} className="text-sm text-gray-400 font-bold underline w-full text-center">
          Show hint (costs 5 pts) 💡
        </button>
      )}
    </div>
  )
}
