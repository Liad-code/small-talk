'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * Accessibility menu (IS 5568 / WCAG support tools), built in-house — the CSP allows no
 * third-party widget scripts. Settings are classes on <html>, styled in globals.css, and
 * remembered per device. Keyboard: Tab to the ♿ button, Enter to open, Esc to close.
 */
type Prefs = { text: 0 | 1 | 2 | 3; contrast: boolean; grayscale: boolean; links: boolean; font: boolean; noanim: boolean }
const DEFAULTS: Prefs = { text: 0, contrast: false, grayscale: false, links: false, font: false, noanim: false }
const KEY = 'smalltalk_a11y'

function apply(p: Prefs) {
  const c = document.documentElement.classList
  c.remove('a11y-text-1', 'a11y-text-2', 'a11y-text-3')
  if (p.text) c.add(`a11y-text-${p.text}`)
  c.toggle('a11y-contrast', p.contrast)
  c.toggle('a11y-grayscale', p.grayscale)
  c.toggle('a11y-links', p.links)
  c.toggle('a11y-font', p.font)
  c.toggle('a11y-noanim', p.noanim)
}

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const [p, setP] = useState<Prefs>(DEFAULTS)
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null')
      if (saved) { const merged = { ...DEFAULTS, ...saved }; setP(merged); apply(merged) }
    } catch { /* storage blocked */ }
  }, [])

  const update = useCallback((next: Prefs) => {
    setP(next)
    apply(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage blocked */ }
  }, [])

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); button.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggles: { k: keyof Omit<Prefs, 'text'>; label: string; icon: string }[] = [
    { k: 'contrast', label: 'ניגודיות גבוהה', icon: '◐' },
    { k: 'grayscale', label: 'גווני אפור', icon: '▨' },
    { k: 'links', label: 'הדגשת קישורים', icon: '🔗' },
    { k: 'font', label: 'גופן קריא', icon: 'א' },
    { k: 'noanim', label: 'עצירת אנימציות', icon: '⏸' },
  ]

  return (
    <div className="a11y-widget" dir="rtl">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="תפריט נגישות"
        title="תפריט נגישות"
        className="fixed z-[60] left-0 top-[62%] w-9 h-10 -translate-x-2.5 hover:translate-x-0 focus-visible:translate-x-0 transition-transform rounded-r-xl bg-[#1d4ed8]/90 text-white text-lg pl-2 shadow-lg flex items-center justify-center focus-visible:outline focus-visible:outline-4 focus-visible:outline-yellow-400"
      >
        <span aria-hidden="true">♿</span>
      </button>

      {open && (
        <div
          ref={panel}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label="הגדרות נגישות"
          className="fixed z-[61] left-12 top-1/2 -translate-y-1/2 w-[min(18rem,calc(100vw-4rem))] max-h-[85vh] overflow-y-auto rounded-2xl bg-white text-gray-900 shadow-2xl border-2 border-[#1d4ed8] p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">♿ נגישות</h2>
            <button type="button" onClick={() => { setOpen(false); button.current?.focus() }} aria-label="סגירת תפריט הנגישות" className="w-8 h-8 rounded-full hover:bg-gray-100 text-xl leading-none">×</button>
          </div>

          <div className="mb-3">
            <div className="text-sm font-bold mb-1.5" id="a11y-text-label">גודל טקסט</div>
            <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="a11y-text-label">
              <button type="button" onClick={() => update({ ...p, text: Math.min(3, p.text + 1) as Prefs['text'] })} disabled={p.text === 3}
                className="rounded-xl border-2 border-gray-200 py-2 font-bold disabled:opacity-40">A+ הגדלה</button>
              <button type="button" onClick={() => update({ ...p, text: Math.max(0, p.text - 1) as Prefs['text'] })} disabled={p.text === 0}
                className="rounded-xl border-2 border-gray-200 py-2 font-bold disabled:opacity-40">A− הקטנה</button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-3">
            {toggles.map(t => (
              <button key={t.k} type="button" aria-pressed={p[t.k]} onClick={() => update({ ...p, [t.k]: !p[t.k] })}
                className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 font-bold text-right ${p[t.k] ? 'border-[#1d4ed8] bg-blue-50' : 'border-gray-200'}`}>
                <span aria-hidden="true" className="w-6 text-center">{t.icon}</span>
                <span className="flex-1">{t.label}</span>
                <span aria-hidden="true">{p[t.k] ? '✓' : ''}</span>
              </button>
            ))}
          </div>

          <button type="button" onClick={() => update(DEFAULTS)} className="w-full rounded-xl bg-gray-100 py-2 font-bold mb-2">↺ איפוס הגדרות</button>
          <Link href="/legal/accessibility" onClick={() => setOpen(false)} className="block text-center text-sm font-bold text-[#1d4ed8] underline">הצהרת נגישות</Link>
        </div>
      )}
    </div>
  )
}
