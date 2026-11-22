'use client'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { toShekels } from '@/lib/billing/plans'

/* ── Formatting ──────────────────────────────────────────────────────── */

export const ils = (agorot: number) => `₪${toShekels(agorot)}`

/** `English` spans inside Hebrew text: isolated LTR so RTL wrapping can't scramble them. */
export function withEnglish(text: string) {
  return text.split(/`(.+?)`/g).map((part, i) =>
    i % 2 === 1 ? <bdi key={i} dir="ltr" className="lp-en">{part}</bdi> : part,
  )
}

/* ── Reveal wrapper (the observer lives in LandingPage) ─────────────── */

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: {
  children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'section'
}) {
  return (
    <Tag data-reveal="" className={className} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}

/* ── Phone mockup (CSS-only frame around a real screenshot) ─────────── */

export function Phone({ src, alt, eager = false, crop, className = '', style }: {
  src: string; alt: string; eager?: boolean
  /** visible screen height as a fraction of the full 390×844 screenshot (crops from the bottom) */
  crop?: number
  className?: string; style?: CSSProperties
}) {
  return (
    <div className={`lp-phone ${className}`} style={style}>
      <div className="lp-phone-screen" style={crop ? { aspectRatio: `390 / ${Math.round(844 * crop)}` } : undefined}>
        <img
          src={src}
          alt={alt}
          width={390}
          height={844}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={crop ? 'w-full h-full object-cover object-top block' : 'w-full h-auto block'}
        />
        <span aria-hidden="true" className="lp-phone-island" />
      </div>
    </div>
  )
}

/* ── Section heading ─────────────────────────────────────────────────── */

export function Kicker({ children, tone = 'violet' }: { children: ReactNode; tone?: 'violet' | 'coral' | 'sky' | 'sun' | 'mint' }) {
  return <span className={`lp-kicker lp-kicker-${tone}`}>{children}</span>
}

/* ── CTAs ────────────────────────────────────────────────────────────── */

export function useSignedIn() {
  const { status } = useSession()
  return status === 'authenticated'
}

/** The one primary action: start Step 1 for free (sign in with Google), or continue to it. */
export function PrimaryCta({ className = '', size = 'lg', short = false }: { className?: string; size?: 'lg' | 'md'; short?: boolean }) {
  const signedIn = useSignedIn()
  const cls = `lp-btn ${size === 'lg' ? 'lp-btn-lg' : 'lp-btn-md'} ${className}`
  if (signedIn) {
    return (
      <Link href="/step1" className={cls}>
        {short ? 'לשלב 1' : 'המשיכו לשלב 1 החינמי'} <span aria-hidden="true" className="lp-btn-arrow">←</span>
      </Link>
    )
  }
  return (
    <button type="button" onClick={() => signIn('google', { callbackUrl: '/step1' })} className={cls}>
      {short ? 'להתחיל בחינם' : 'התחילו את שלב 1 בחינם'} <span aria-hidden="true" className="lp-btn-arrow">←</span>
    </button>
  )
}

/** Small secondary link next to the primary CTA: sign in (signed out) or packages (signed in). */
export function SecondaryAuthLink({ className = '' }: { className?: string }) {
  const signedIn = useSignedIn()
  if (signedIn) {
    return <Link href="/pricing" className={`lp-textlink ${className}`}>לחבילות</Link>
  }
  return (
    <button type="button" onClick={() => signIn('google')} className={`lp-textlink ${className}`}>
      כבר רשומים? התחברות
    </button>
  )
}

/* ── Page-scoped CSS (no globals.css edits) ──────────────────────────── */

export const LANDING_CSS = `
.lp {
  --ink: #1D1838;
  --ink-2: #4A4566;
  --ink-3: #7A7593;
  --paper: #FFF9F1;
  --line: #ECE6F7;
  --violet: #6C63FF;
  --violet-deep: #4E45E0;
  --coral: #FF6584;
  --sun: #FFC93C;
  --mint: #2BB673;
  --sky: #38BDF8;
  --he: "Segoe UI", "Arial Hebrew", "Noto Sans Hebrew", "Heebo", Arial, sans-serif;
  color: var(--ink);
  font-family: var(--font-nunito), var(--he);
}
.lp-h { font-family: var(--font-baloo), var(--he); letter-spacing: -0.01em; }
.lp-num { font-family: var(--font-baloo), var(--he); font-variant-numeric: tabular-nums; }
.lp-en { unicode-bidi: isolate; white-space: nowrap; }

/* dotted paper texture */
.lp-dots {
  background-image: radial-gradient(rgba(108,99,255,.13) 1.2px, transparent 1.3px);
  background-size: 22px 22px;
}

/* kicker pills */
.lp-kicker {
  display: inline-flex; align-items: center; gap: .4rem;
  font-weight: 800; font-size: .82rem; line-height: 1;
  padding: .5rem .85rem; border-radius: 999px;
}
.lp-kicker-violet { background: #EEEBFF; color: var(--violet-deep); }
.lp-kicker-coral  { background: #FFE8EE; color: #D93A5E; }
.lp-kicker-sky    { background: rgba(56,189,248,.16); color: #7DD3FC; }
.lp-kicker-sun    { background: #FFF3CC; color: #9A6A00; }
.lp-kicker-mint   { background: #E2F7EC; color: #1B8A55; }

/* buttons: toy-like, pressable */
.lp-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
  font-weight: 900; color: #fff; text-decoration: none; cursor: pointer; user-select: none;
  background: linear-gradient(180deg, #7A72FF 0%, var(--violet) 100%);
  border-radius: 1.1rem;
  box-shadow: 0 6px 0 var(--violet-deep), 0 14px 28px rgba(78,69,224,.35);
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.lp-btn:hover { filter: brightness(1.06); transform: translateY(-2px); box-shadow: 0 8px 0 var(--violet-deep), 0 18px 32px rgba(78,69,224,.38); }
.lp-btn:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--violet-deep), 0 6px 14px rgba(78,69,224,.3); }
.lp-btn:focus-visible, .lp-ghost:focus-visible, .lp-textlink:focus-visible, .lp-faq summary:focus-visible {
  outline: 3px solid var(--sun); outline-offset: 3px;
}
.lp-btn-lg { font-size: 1.2rem; padding: 1.05rem 1.9rem; min-height: 3.75rem; }
.lp-btn-md { font-size: 1.02rem; padding: .8rem 1.25rem; min-height: 3.1rem; }
.lp-btn-arrow { display: inline-block; transition: transform .2s ease; }
.lp-btn:hover .lp-btn-arrow { transform: translateX(-4px); }
.lp-btn-light {
  background: #fff; color: var(--violet-deep);
  box-shadow: 0 6px 0 #C9C3FF, 0 14px 28px rgba(15,10,50,.3);
}
.lp-btn-light:hover { box-shadow: 0 8px 0 #C9C3FF, 0 18px 32px rgba(15,10,50,.32); }
.lp-btn-light:active { box-shadow: 0 1px 0 #C9C3FF; }

.lp-ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  font-weight: 800; color: var(--ink); text-decoration: none; cursor: pointer;
  background: #fff; border: 2px solid var(--line); border-radius: 1.1rem;
  padding: .95rem 1.4rem; min-height: 3.75rem; font-size: 1.08rem;
  transition: border-color .15s ease, background .15s ease;
}
.lp-ghost:hover { border-color: #CFC8FF; background: #FAF9FF; }

.lp-textlink {
  font-weight: 800; color: var(--violet-deep); text-decoration: underline;
  text-underline-offset: 4px; text-decoration-thickness: 2px; text-decoration-color: #CFC8FF;
  padding: .6rem .4rem; cursor: pointer; background: none; border: 0;
}
.lp-textlink:hover { text-decoration-color: currentColor; }

/* phone frame */
.lp-phone {
  background: #17142B; padding: 6px; border-radius: 2.15rem;
  box-shadow:
    0 0 0 1.5px #2C2850 inset,
    0 30px 60px -18px rgba(29,24,56,.45),
    0 12px 24px -12px rgba(29,24,56,.35);
}
.lp-phone-screen { position: relative; overflow: hidden; border-radius: 1.75rem; background: #fff; }
.lp-phone-island {
  position: absolute; top: 7px; left: 50%; transform: translateX(-50%);
  width: 30%; height: 13px; border-radius: 999px; background: #17142B; opacity: .92;
}

/* hero highlight stroke */
.lp-mark { position: relative; white-space: nowrap; z-index: 0; }
.lp-mark::after {
  content: ""; position: absolute; z-index: -1; inset-inline: -.08em; bottom: .06em; height: .36em;
  background: var(--sun); border-radius: .2em; transform: skewX(-8deg) rotate(-1deg);
  opacity: .85;
}

/* floating chips */
.lp-chip {
  display: inline-flex; align-items: center; gap: .45rem; white-space: nowrap;
  background: #fff; border-radius: 999px; padding: .5rem .85rem .5rem .95rem;
  font-weight: 900; font-size: .9rem; color: var(--ink);
  box-shadow: 0 10px 24px -8px rgba(29,24,56,.28), 0 0 0 1px rgba(29,24,56,.05);
}
@keyframes lp-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
.lp-bob { animation: lp-bob 4.5s ease-in-out infinite; }
.lp-bob-2 { animation: lp-bob 5.2s ease-in-out .8s infinite; }

/* road */
.lp-road-dash {
  background-image: linear-gradient(to bottom, #fff 0 55%, transparent 55% 100%);
  background-size: 2px 16px; background-repeat: repeat-y;
}

/* FAQ */
.lp-faq summary { list-style: none; }
.lp-faq summary::-webkit-details-marker { display: none; }
.lp-faq-icon { transition: transform .25s ease, background .2s ease; }
.lp-faq[open] .lp-faq-icon { transform: rotate(45deg); background: var(--violet); color: #fff; }

/* scroll reveal: only hide when JS is running and motion is allowed */
[data-reveal] { transition: opacity .7s ease var(--d, 0ms), transform .8s cubic-bezier(.2,.75,.2,1) var(--d, 0ms); }
.lp-js [data-reveal]:not(.lp-in) { opacity: 0; transform: translateY(26px); }

/* sticky mobile bar */
.lp-bar { transition: transform .35s cubic-bezier(.2,.75,.2,1), opacity .25s ease; }
.lp-bar[data-show="false"] { transform: translateY(120%); opacity: 0; pointer-events: none; visibility: hidden; transition: transform .35s ease, opacity .25s ease, visibility 0s linear .35s; }

@media (prefers-reduced-motion: reduce) {
  .lp *, .lp *::before, .lp *::after { animation: none !important; transition: none !important; }
  .lp-js [data-reveal]:not(.lp-in) { opacity: 1; transform: none; }
}
`
