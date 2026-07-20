'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useActiveProfile } from '@/components/providers/ProfileProvider'

/** Compact sign-in / avatar button for the Header. */
export function AuthButton() {
  const { data: session, status } = useSession()
  const { child } = useActiveProfile()
  const [menuOpen, setMenuOpen] = useState(false)

  if (status === 'loading') {
    return <div className="w-11 h-11 rounded-2xl bg-gray-100 border-2 border-gray-200 animate-pulse" />
  }

  if (!session?.user) {
    return (
      <button
        onClick={() => signIn('google')}
        className="flex items-center gap-1.5 bg-white border-2 border-gray-200 rounded-2xl px-3 py-1.5
                   hover:border-primary hover:bg-purple-50 active:scale-95 transition-all cursor-pointer"
        aria-label="Sign in with Google"
      >
        <span className="text-lg leading-none">👤</span>
        <span className="hidden sm:inline text-xs font-bold text-gray-600 leading-none">Sign in</span>
      </button>
    )
  }

  const initial = (session.user.name ?? session.user.email ?? '?').charAt(0).toUpperCase()

  return (
    <div className="relative flex items-center gap-2">
      {/* Active child chip */}
      <Link
        href="/profiles"
        className="flex items-center gap-1.5 bg-purple-50 border-2 border-purple-200 rounded-2xl px-2.5 py-1.5
                   hover:border-primary hover:bg-purple-100 transition-all no-underline"
        title={child ? `פרופיל פעיל: ${child.displayName}` : 'בחירת פרופיל'}
      >
        <span className="text-lg leading-none">{child ? child.avatar : '👧'}</span>
        <span className="hidden sm:inline text-xs font-bold text-purple-700 leading-none max-w-[80px] truncate">
          {child ? child.displayName : 'בחר פרופיל'}
        </span>
      </Link>

      <button
        onClick={() => setMenuOpen(o => !o)}
        className="w-11 h-11 rounded-2xl border-2 border-purple-200 overflow-hidden bg-purple-50
                   hover:border-primary active:scale-95 transition-all cursor-pointer flex items-center justify-center"
        aria-label="Account menu"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="font-black text-primary text-lg">{initial}</span>
        )}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border-2 border-purple-100 rounded-2xl shadow-lg p-2 min-w-[180px] z-50">
          <div className="px-3 py-1.5 border-b border-purple-50 mb-1">
            <div className="font-bold text-sm text-gray-700 truncate">{session.user.name}</div>
            <div className="text-xs text-gray-400 truncate">{session.user.email}</div>
          </div>
          <Link
            href="/profiles"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-gray-600
                       hover:bg-purple-50 transition-colors no-underline"
          >
            👨‍👩‍👧‍👦 החלפת פרופיל
          </Link>
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-gray-600
                       hover:bg-purple-50 transition-colors no-underline"
          >
            ⚙️ החשבון שלי
          </Link>
          {session.user.role === 'ADMIN' && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-purple-600
                         hover:bg-purple-50 transition-colors no-underline"
            >
              🛠️ Admin
            </Link>
          )}
          <button
            onClick={() => signOut()}
            className="w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-gray-600
                       hover:bg-purple-50 transition-colors cursor-pointer"
          >
            🚪 Sign out
          </button>
        </div>
      )}
    </div>
  )
}
