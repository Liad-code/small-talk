'use client'

/**
 * The scene "stage": the character on one side, the child (or customer) on the
 * other, a speech bubble over whoever is talking, and a small bounce while
 * their line plays.
 */
export interface Bubble { side: 'left' | 'right'; text: string }

export function SceneStage({ left, right, bubble, talking, sign }: {
  left: { emoji: string; name: string }
  right: { emoji: string; name: string }
  bubble: Bubble | null
  talking: 'left' | 'right' | null
  sign: string
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden border-4 border-orange-200 bg-gradient-to-b from-amber-50 to-orange-100 px-3 pt-3 pb-4 shadow-md">
      {/* shop sign */}
      <div className="mx-auto w-fit rounded-full bg-red-500 text-white font-display font-black text-sm px-4 py-1 shadow mb-2">
        {sign}
      </div>

      {/* speech bubble */}
      <div className="min-h-[76px] flex items-end mb-2">
        {bubble && (
          <div
            key={bubble.text}
            className={`bounce-in relative max-w-[85%] rounded-2xl px-3 py-2 font-bold text-[15px] leading-snug shadow
              ${bubble.side === 'left' ? 'bg-white text-gray-800 mr-auto' : 'bg-sky-500 text-white ml-auto'}`}
            dir="ltr"
          >
            {bubble.text}
            <span
              className={`absolute -bottom-2 w-4 h-4 rotate-45 ${bubble.side === 'left' ? 'left-6 bg-white' : 'right-6 bg-sky-500'}`}
            />
          </div>
        )}
      </div>

      {/* characters */}
      <div className="flex justify-between items-end px-2">
        {[{ side: 'left' as const, who: left }, { side: 'right' as const, who: right }].map(({ side, who }) => (
          <div key={side} className="flex flex-col items-center">
            <span
              className={`text-6xl leading-none select-none ${talking === side ? 'scene-talking' : ''}`}
              aria-hidden="true"
            >
              {who.emoji}
            </span>
            <span className="mt-1 text-xs font-black text-orange-800 bg-white/70 rounded-full px-2">{who.name}</span>
          </div>
        ))}
      </div>
      {/* counter */}
      <div className="absolute bottom-0 inset-x-0 h-3 bg-orange-300/60" />
    </div>
  )
}
