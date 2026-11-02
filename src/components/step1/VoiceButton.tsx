'use client'
import { useEffect, useRef } from 'react'
import { useSpeak } from '@/hooks/useSpeak'

interface Props {
  text: string
  rate?: number
  pitch?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string        // visible label below icon (optional)
  autoPlay?: boolean    // speak once on mount
}

/**
 * Tap-to-hear button.
 *
 * NOTE: this component is currently not imported anywhere in the app. It is
 * kept (rather than deleted) because deleting it is a product call, and it now
 * routes through useSpeak so it cannot drift from the rest of the app's audio.
 *
 * `rate` and `pitch` are accepted for API compatibility and ignored — pace is
 * baked into the pre-generated MP3s.
 */
export function VoiceButton({ text, className = '', size = 'md', label, autoPlay = false }: Props) {
  const speak = useSpeak()

  // autoPlay previously did nothing; the old implementation left a comment
  // saying callers should wrap it themselves. Honoured properly here.
  const spokenOnce = useRef(false)
  useEffect(() => {
    if (autoPlay && !spokenOnce.current) {
      spokenOnce.current = true
      speak(text)
    }
  }, [autoPlay, text, speak])

  const sizeClasses = {
    sm: 'text-xl w-11 h-11',
    md: 'text-3xl w-14 h-14',
    lg: 'text-5xl w-20 h-20',
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <button
        onClick={() => speak(text)}
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center rounded-full
          bg-blue-100 border-3 border-blue-400
          hover:bg-blue-200 hover:scale-110 active:scale-90
          transition-all duration-150 cursor-pointer select-none
          shadow-md
        `}
        aria-label={`Hear: ${text}`}
        title={`Hear: ${text}`}
      >
        🔊
      </button>
      {label && (
        <span className="text-xs font-bold text-blue-600">{label}</span>
      )}
    </div>
  )
}
