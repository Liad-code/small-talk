'use client'
import type { ReactNode } from 'react'

/**
 * Face-down answers, in every tab (owner, 2026-11-18/24): the child first thinks of an answer
 * of their own and says it, then flips the cards to see the options. Same look everywhere.
 * Uses the .flip-card / .flip-inner / .flip-face / .flip-answer styles in globals.css.
 */
export const THINK_HE = '🤔 מה הייתם עונים? חשבו על תשובה משלכם ואמרו אותה בקול — ואז הפכו את הכרטיסים!'

export const THINK_ASK_HE = '🤔 מה הייתם שואלים? חשבו על שאלה משלכם ואמרו אותה בקול — ואז הפכו את הכרטיס!'

export function ThinkPrompt({ text = THINK_HE }: { text?: string }) {
  return (
    <p className="bounce-in text-center font-black text-violet-700 bg-violet-50 border-2 border-violet-200 rounded-2xl px-3 py-2 text-[15px]" dir="rtl">
      {text}
    </p>
  )
}

export function FlipButton({ onClick, one = false }: { onClick: () => void; one?: boolean }) {
  return (
    <button type="button" onClick={onClick} className="btn-kid bg-violet-500 w-full text-lg" dir="rtl">
      {one ? '🔄 הפכו את הכרטיס' : '🔄 הפכו את הכרטיסים'}
    </button>
  )
}

const BACK = 'flip-face w-full rounded-2xl border-4 border-violet-300 font-black text-white shadow-md bg-[repeating-linear-gradient(45deg,#8b5cf6_0_14px,#7c3aed_14px_28px)] active:scale-[0.98]'

/** One answer card (a sentence answer). The front is the real answer button. */
export function FlipCard({ revealed, onReveal, delay = 0, children }: { revealed: boolean; onReveal: () => void; delay?: number; children: ReactNode }) {
  return (
    <div className="flip-card">
      <div className={`flip-inner ${revealed ? 'flipped' : ''}`} style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}>
        <button type="button" onClick={onReveal} disabled={revealed} aria-hidden={revealed} tabIndex={revealed ? -1 : 0} className={`${BACK} px-4 py-3 text-[17px]`}>
          <span className="inline-block drop-shadow">❓ ❓ ❓</span>
        </button>
        <div className={`flip-face flip-answer ${revealed ? '' : 'pointer-events-none'}`} aria-hidden={!revealed}>{children}</div>
      </div>
    </div>
  )
}

/** A whole answer area (a grid of items, word tiles) as one card that flips. */
export function FlipPanel({ revealed, onReveal, children }: { revealed: boolean; onReveal: () => void; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {!revealed && <ThinkPrompt />}
      <div className="flip-card">
        <div className={`flip-inner ${revealed ? 'flipped' : ''}`}>
          <button type="button" onClick={onReveal} disabled={revealed} aria-hidden={revealed} tabIndex={revealed ? -1 : 0} className={`${BACK} min-h-[9rem] text-3xl flex items-center justify-center`}>
            <span className="inline-block drop-shadow">❓ ❓ ❓</span>
          </button>
          <div className={`flip-face flip-answer ${revealed ? '' : 'pointer-events-none'}`} aria-hidden={!revealed}>{children}</div>
        </div>
      </div>
      {!revealed && <FlipButton onClick={onReveal} />}
    </div>
  )
}
