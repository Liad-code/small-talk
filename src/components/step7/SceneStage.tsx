'use client'
import { StoryBackdrop, CounterFront } from '@/components/step7/StoryBackdrop'

/**
 * The scene "stage" for Order / Build / Be Tony: the illustrated pizzeria
 * counter, the character behind it, the child (or customer) in front, a speech
 * bubble over whoever is talking, and a small bounce while their line plays.
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
    <StoryBackdrop place="counter">
      <div className="absolute z-10 right-3 top-3 rounded-full bg-red-500 text-white font-display font-black text-xs px-3 py-0.5 shadow">{sign}</div>
      <div className="absolute z-10 left-[6%] bottom-[14%]">
        <Who who={left} talking={talking === 'left'} />
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none"><CounterFront /></div>
      <div className="absolute z-30 right-[6%] bottom-[3%]">
        <Who who={right} talking={talking === 'right'} />
      </div>
      {bubble && (
        <div className="absolute z-40 top-10 inset-x-2 flex">
          <div
            key={bubble.text}
            className={`bounce-in relative max-w-[88%] rounded-2xl px-3 py-2 font-black text-[15px] leading-snug shadow-lg
              ${bubble.side === 'left' ? 'bg-white text-gray-800 mr-auto' : 'bg-sky-500 text-white ml-auto'}`}
            dir="ltr"
          >
            {bubble.text.split(' ').map((w, i) => (
              <span key={i} className="story-word" style={{ animationDelay: `${i * 0.26}s` }}>{w}&nbsp;</span>
            ))}
            <span className={`absolute -bottom-2 w-4 h-4 rotate-45 ${bubble.side === 'left' ? 'left-8 bg-white' : 'right-8 bg-sky-500'}`} />
          </div>
        </div>
      )}
    </StoryBackdrop>
  )
}

function Who({ who, talking }: { who: { emoji: string; name: string }; talking: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`text-[56px] sm:text-[72px] leading-none select-none drop-shadow ${talking ? 'scene-talking' : ''}`} aria-hidden="true">{who.emoji}</span>
      <span className="mt-0.5 text-[11px] font-black text-orange-900 bg-white/85 rounded-full px-2 shadow-sm">{who.name}</span>
    </div>
  )
}
