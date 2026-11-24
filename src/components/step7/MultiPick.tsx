'use client'
import { useState } from 'react'
import { sayLine } from '@/utils/sceneAudio'

/** One pickable item (topping, flavour, vegetable…). `say` is recorded alone in the child's voice. */
export interface MultiItem { say: string; he: string; icon: string; value: string }

/** "Cheese, olives and tuna, please." — the sentence a multi-pick makes. */
export function composeMulti(items: MultiItem[], closer: string): string {
  const words = items.map((o, i) => (i === 0 ? o.say : o.say.toLowerCase()))
  const list = words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}` : words[0]
  return `${list}, ${closer}`
}

export const composeMultiHe = (items: MultiItem[]) => `${items.map(o => o.he).join(', ')}, בבקשה.`

/** Says each picked item, then the closer, in the child's voice (each is its own recording). */
export async function sayMulti(items: MultiItem[], closer: string, alive: () => boolean = () => true): Promise<void> {
  for (const o of items) {
    await sayLine('kid', o.say)
    if (!alive()) return
  }
  await sayLine('kid', closer)
}

/** Joined, order-independent value for comparing what was ordered with what was made. */
export const multiValue = (values: string[]) => [...values].sort().join(',')

/** The picker: tap items (up to `max`, or any number), then confirm. */
export function MultiPicker({ items, max, promptHe, confirmHe = '✓ זהו, אפשר להזמין!', disabled, onConfirm }: {
  items: MultiItem[]
  max?: number
  promptHe: string
  confirmHe?: string
  disabled?: boolean
  onConfirm: (picked: MultiItem[]) => void
}) {
  const [sel, setSel] = useState<string[]>([])
  return (
    <div dir="rtl">
      <p className="text-center font-black text-indigo-700 text-sm mb-2">
        {promptHe}{max ? ` · נבחרו ${sel.length} מתוך ${max}` : sel.length ? ` · נבחרו ${sel.length}` : ''}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" dir="ltr">
        {items.map((o, i) => {
          const on = sel.includes(o.value)
          const full = !on && !!max && sel.length >= max
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              disabled={full || disabled}
              onClick={() => setSel(s => (s.includes(o.value) ? s.filter(v => v !== o.value) : [...s, o.value]))}
              className={`story-pop-up relative flex flex-col items-center rounded-2xl border-4 px-1 py-2 transition-all
                ${on ? 'border-green-400 bg-green-50 scale-[1.03] shadow' : full ? 'border-gray-100 bg-gray-50 opacity-40' : 'border-orange-200 bg-white hover:border-orange-400 active:scale-95'}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {on && <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-white text-sm font-black flex items-center justify-center shadow">✓</span>}
              <span className="text-3xl leading-none">{o.icon}</span>
              <span className="font-black text-[13px] text-gray-800 mt-1 leading-tight text-center">{o.say}</span>
              <span className="text-[11px] font-bold text-gray-400" dir="rtl">{o.he}</span>
            </button>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => onConfirm(items.filter(o => sel.includes(o.value)))}
        disabled={disabled || sel.length === 0}
        className="btn-kid bg-green-500 w-full mt-3 disabled:opacity-40"
      >
        {confirmHe}
      </button>
    </div>
  )
}
