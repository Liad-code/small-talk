'use client'
import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { isFreePath } from '@/lib/freeTier'

/** One shared request per page load: may this visitor use the whole app? */
let accessPromise: Promise<boolean> | null = null
function fetchAppAccess(): Promise<boolean> {
  accessPromise ??= fetch('/api/access/me', { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : { app: true }))
    .then(d => d.app !== false)
    .catch(() => true)
  return accessPromise
}

/**
 * A Link for the Step 1 menus. With full access (admin, subscriber, or the lock is off) it's a
 * normal link. Without it, everything outside the free taste (lib/freeTier.ts) gets a lock badge
 * and leads to /pricing. The middleware enforces the same rule on the server.
 */
export function GatedLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; [k: string]: unknown }) {
  const [app, setApp] = useState(true)
  useEffect(() => { fetchAppAccess().then(setApp) }, [])
  const locked = !app && !isFreePath(href)
  if (!locked) return <Link href={href} className={className} {...rest}>{children}</Link>
  return (
    <Link href="/pricing?reason=locked" className={`${className ?? ''} relative`} aria-label="זמין במנוי" {...rest}>
      <span className="block opacity-50 grayscale-[60%] pointer-events-none">{children}</span>
      <span className="absolute -top-1.5 -left-1.5 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-gray-900/85 text-[11px] shadow ring-2 ring-white" title="זמין במנוי">🔒</span>
    </Link>
  )
}
