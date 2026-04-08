'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { ConfettiOverlay } from './ConfettiOverlay'

interface Props {
  title: string
  hebrewInstruction: string
  backHref: string
  track: string
  groupId: string
  exerciseId: string
  groupColor?: string           // Tailwind gradient e.g. 'from-red-400 to-orange-500'
  children: (onComplete: () => void) => React.ReactNode
}

function playHappySound() {
  if (typeof window === 'undefined') return
  try {
    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const notes = [523, 659, 784, 1047]  // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      const t = ctx.currentTime + i * 0.12
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.25, t + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      osc.start(t)
      osc.stop(t + 0.3)
    })
  } catch { /* audio unavailable */ }
}

export function ExerciseShell({
  title,
  hebrewInstruction,
  backHref,
  track,
  groupId,
  exerciseId,
  groupColor = 'from-purple-400 to-violet-500',
  children,
}: Props) {
  const { markExerciseDone, isExerciseDone } = useStep1Progress()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [key, setKey] = useState(0)  // increment to remount exercise

  const alreadyDone = isExerciseDone(track, groupId, exerciseId)

  const onComplete = useCallback(() => {
    markExerciseDone(track, groupId, exerciseId)
    setShowConfetti(true)
    setShowModal(true)
    playHappySound()
  }, [markExerciseDone, track, groupId, exerciseId])

  function playAgain() {
    setShowModal(false)
    setShowConfetti(false)
    setKey(k => k + 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top banner */}
      <div className={`bg-gradient-to-r ${groupColor} shadow-md`}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href={backHref}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg transition-colors no-underline flex-shrink-0"
            aria-label="Back"
          >
            ←
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-white text-lg leading-tight truncate">{title}</h1>
            <p className="text-white/80 text-sm font-bold" dir="rtl">{hebrewInstruction}</p>
          </div>
          {alreadyDone && (
            <span className="text-2xl flex-shrink-0" title="Completed before!">⭐</span>
          )}
        </div>
      </div>

      {/* Exercise body */}
      <div className="flex-1 relative">
        <div key={key} className="h-full">
          {children(onComplete)}
        </div>
      </div>

      {/* Confetti */}
      <ConfettiOverlay active={showConfetti} onDone={() => setShowConfetti(false)} />

      {/* Completion modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl bounce-in">
            <div className="text-6xl mb-3">⭐</div>
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-1">Yay! You did it!</h2>
            <p className="text-xl font-bold text-gray-500 mb-6" dir="rtl">כל הכבוד! 🎉</p>
            <div className="flex gap-3">
              <button
                onClick={playAgain}
                className="flex-1 btn-kid bg-blue-500 hover:bg-blue-600"
              >
                🔁 Again
              </button>
              <Link
                href={backHref}
                className="flex-1 btn-kid bg-green-500 hover:bg-green-600 no-underline text-center"
              >
                ✅ Done
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
