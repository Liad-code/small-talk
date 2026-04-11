'use client'
import { useState, useEffect } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, VOWEL_COLORS, ttsFor } from '@/data/step1/cvcWords'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

function getGroup(letter: string) {
  return LETTER_GROUPS.find(g => g.letters.includes(letter.toLowerCase()))
}

const INSTRUCTION = 'לחץ על התמונה כדי לשמוע את המילה- לחץ על האותיות לפי הסדר הנכון כדי לבנות את המילה'

function C9Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [queue] = useState(() => shuffle([...CVC_WORDS]))
  const [idx, setIdx] = useState(0)
  const [letterOrder, setLetterOrder] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)

  const current = queue[idx]

  useEffect(() => {
    if (!current) return
    setLetterOrder(shuffle(current.word.split('')))
    setSelected([])
    setWrong(false)
    setCorrect(false)
    // Item 17: cleanup prevents stale word speech when idx changes quickly
    const t = setTimeout(() => speak(ttsFor(current.word), 0.7, 1.1), 400)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  function handleLetterTap(letter: string, index: number) {
    if (correct) return
    const newSelected = [...selected, letter]
    setSelected(newSelected)

    if (newSelected.join('') === current.word) {
      setCorrect(true)
      speak(ttsFor(current.word), 0.7, 1.1)
      setTimeout(() => {
        setScore(s => s + 1)
        if (idx + 1 >= queue.length) onComplete()
        else setIdx(i => i + 1)
      }, 800)
    } else if (newSelected.length === current.word.length) {
      setWrong(true)
      setTimeout(() => {
        setSelected([])
        setWrong(false)
      }, 600)
    }
  }

  if (!current) return null
  const vc = VOWEL_COLORS[current.vowel]

  const usedPositions = new Set<number>()
  for (const s of selected) {
    for (let i = 0; i < letterOrder.length; i++) {
      if (letterOrder[i] === s && !usedPositions.has(i)) {
        usedPositions.add(i)
        break
      }
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span>✅ {score}</span>
      </div>

      <button
        onClick={() => speak(ttsFor(current.word), 0.7, 1.1)}
        className="text-7xl mb-4 hover:scale-110 active:scale-90 transition-transform cursor-pointer select-none block w-full"
      >
        {current.emoji}
      </button>

      <div className="flex justify-center gap-2 mb-6">
        {current.word.split('').map((_, i) => {
          const ch = selected[i]
          return (
            <div key={i} className={`
              w-12 h-12 rounded-xl border-4 flex items-center justify-center
              font-display font-black text-2xl
              ${correct ? `${vc.bg} ${vc.border} ${vc.text} scale-110` : ''}
              ${wrong ? 'bg-red-100 border-red-400 text-red-700 shake' : ''}
              ${!correct && !wrong ? (ch ? `${vc.bg} ${vc.border} ${vc.text}` : 'bg-white border-dashed border-gray-300 text-gray-200') : ''}
            `}>
              {ch ?? '_'}
            </div>
          )
        })}
      </div>

      {/* Scrambled letter buttons */}
      <div className="flex justify-center gap-3">
        {letterOrder.map((letter, i) => {
          const used = usedPositions.has(i)
          const group = getGroup(letter)
          return (
            <button
              key={i}
              onClick={() => !used && !correct && handleLetterTap(letter, i)}
              disabled={used || correct}
              className={`
                w-14 h-14 rounded-2xl border-4 font-display font-black text-2xl
                transition-all duration-150 cursor-pointer select-none
                ${used ? 'opacity-30 cursor-not-allowed' : ''}
                ${!used ? `${group?.bgColor ?? 'bg-gray-100'} ${group?.borderColor ?? 'border-gray-300'} ${group?.textColor ?? 'text-gray-700'} hover:scale-110 active:scale-90` : ''}
              `}
            >
              {letter}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => speak(ttsFor(current.word), 0.7, 1.1)}
        className="mt-4 text-blue-400 font-bold text-sm hover:text-blue-600"
      >
        🔊 Hear again
      </button>

      {/* Item 15: inline instruction below exercise */}
      <p className="text-center text-base text-gray-600 font-bold mt-4" dir="rtl">
        {INSTRUCTION}
      </p>
    </div>
  )
}

export default function C9Page() {
  return (
    <ExerciseShell
      title="Word Scramble"
      hebrewInstruction={INSTRUCTION}
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c9"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C9Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
