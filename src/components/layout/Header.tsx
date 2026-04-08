'use client'
import Link from 'next/link'
import { useCombinedStars } from '@/hooks/useCombinedStars'
import { useMute } from '@/hooks/useMute'

export function Header() {
  const totalStars = useCombinedStars()
  const { muted, toggleMute } = useMute()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b-2 border-purple-100">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline min-w-0">
          <span className="text-2xl flex-shrink-0">💬</span>
          <div className="min-w-0">
            <div className="font-display font-bold text-lg text-primary leading-none truncate">
              Small Talk
            </div>
            <div className="text-xs text-gray-400 font-bold leading-none mt-0.5 hidden sm:block">
              Learn English!
            </div>
          </div>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Stars counter */}
          <Link
            href="/profile"
            className="flex items-center gap-1.5 bg-yellow-50 border-2 border-yellow-200 rounded-2xl px-3 py-1.5 hover:bg-yellow-100 hover:border-yellow-300 transition-colors no-underline"
          >
            <span className="text-lg leading-none">⭐</span>
            <span className="font-black text-yellow-600 text-base leading-none">{totalStars}</span>
            <span className="hidden sm:inline text-xs text-yellow-500 font-bold leading-none">Stars</span>
          </Link>

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="w-11 h-11 flex items-center justify-center rounded-2xl
                       bg-white border-2 border-gray-200 text-xl
                       hover:border-primary hover:bg-purple-50
                       active:scale-90 transition-all duration-150 cursor-pointer select-none"
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {muted ? '🔇' : '🔊'}
          </button>

        </div>
      </div>
    </header>
  )
}
