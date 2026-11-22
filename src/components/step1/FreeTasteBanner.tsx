'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

/** Shown in Step 1 to signed-in families without a subscription: what's free, and the way to everything. */
export function FreeTasteBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    fetch('/api/access/me', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then(d => setShow(!!d && d.signedIn && !d.app)).catch(() => {})
  }, [])
  if (!show) return null
  return (
    <div className="max-w-xl mx-auto px-4 mt-4" dir="rtl">
      <div className="bg-gradient-to-l from-purple-500 to-indigo-500 text-white rounded-3xl px-5 py-4 shadow-lg">
        <div className="font-display font-bold text-lg">🎁 טעימה חינמית משלב 1</div>
        <p className="text-sm font-bold opacity-90 mt-0.5">
          פתוח לכם חלק מכל מסלול — אותיות, צלילים ומילים ראשונות. כל התרגולים וכל 7 השלבים פתוחים במנוי.
        </p>
        <Link href="/pricing" className="inline-block mt-2 bg-white text-primary font-black text-sm rounded-full px-4 py-1.5 no-underline">לכל התוכנית — מ-₪39 לחודש ←</Link>
      </div>
    </div>
  )
}
