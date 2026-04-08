'use client'
import { useEffect, useRef } from 'react'

// Deterministic confetti — no Math.random() to avoid hydration issues
const CONFETTI_COLORS = ['#FF6B6B','#FFD700','#4ECDC4','#A29BFE','#FF8B94','#96CEB4','#74B9FF','#FFEAA7','#55EFC4','#FD79A8']
const PIECES = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${(i * 1.43 + 1.5) % 100}%`,
  delay: `${((i * 61) % 220) / 100}s`,
  dur: `${1.8 + ((i * 41) % 170) / 100}s`,
  w: `${7 + (i % 9)}px`,
  h: `${6 + ((i + 3) % 8)}px`,
  circle: i % 3 === 0,
}))

interface Props {
  active: boolean
  onDone?: () => void
  durationMs?: number
}

export function ConfettiOverlay({ active, onDone, durationMs = 3000 }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (active && onDone) {
      timerRef.current = setTimeout(onDone, durationMs)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [active, onDone, durationMs])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      aria-hidden="true"
    >
      {PIECES.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: p.left,
            width: p.w,
            height: p.circle ? p.w : p.h,
            borderRadius: p.circle ? '50%' : '2px',
            backgroundColor: p.color,
            animation: `confetti-fall ${p.dur} ease-in ${p.delay} both`,
          }}
        />
      ))}

      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
