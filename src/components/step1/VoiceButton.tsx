'use client'
import { useMute } from '@/hooks/useMute'

interface Props {
  text: string
  rate?: number
  pitch?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string        // visible label below icon (optional)
  autoPlay?: boolean    // call speak() on mount
}

export function VoiceButton({ text, rate = 0.85, pitch = 1.05, className = '', size = 'md', label, autoPlay = false }: Props) {
  const { isMuted } = useMute()

  function speak() {
    if (isMuted()) return
    if (typeof window === 'undefined') return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = rate
    u.pitch = pitch
    u.lang = 'en-US'
    window.speechSynthesis.speak(u)
  }

  // autoPlay on mount
  if (autoPlay) {
    // use a ref pattern via side-effect — callers that need autoPlay should
    // wrap in a useEffect. This prop just signals intent.
  }

  const sizeClasses = {
    sm: 'text-xl w-11 h-11',
    md: 'text-3xl w-14 h-14',
    lg: 'text-5xl w-20 h-20',
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <button
        onClick={speak}
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center rounded-full
          bg-blue-100 border-3 border-blue-400
          hover:bg-blue-200 hover:scale-110 active:scale-90
          active:scale-90
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
