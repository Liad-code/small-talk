'use client'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

/** 🔊 button for a word's recorded audio (public pages). */
export function PlayWord({ src, label }: { src: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => { const a = new Audio(src); a.play().catch(() => {}) }}
      aria-label={`השמעת ההגייה של ${label}`}
      className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-lg flex items-center justify-center flex-shrink-0"
    >
      <span aria-hidden="true">🔊</span>
    </button>
  )
}

/** The conversion box on every public content page: the free Step 1 taste. */
export function TasteCta({ title = 'רוצים שהילד יתרגל את זה במשחק?', text = 'בשלב 1 של Small Talk הילדים לומדים אותיות, צלילים ומילים ראשונות בשמע ובמשחק — גם לפני שהם יודעים לקרוא. הטעימה חינם, בלי כרטיס אשראי.' }: { title?: string; text?: string }) {
  const { status } = useSession()
  return (
    <aside className="my-10 rounded-3xl bg-gradient-to-l from-[#6C63FF] to-[#8B5CF6] text-white p-6 sm:p-8 shadow-xl" dir="rtl">
      <p className="font-display font-bold text-2xl leading-tight">{title}</p>
      <p className="mt-2 font-semibold opacity-90 leading-relaxed">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {status === 'authenticated' ? (
          <Link href="/step1" className="bg-white text-[#5B52E5] font-black rounded-2xl px-5 py-3 no-underline">המשיכו לשלב 1 החינמי ←</Link>
        ) : (
          <button type="button" onClick={() => signIn('google', { callbackUrl: '/step1' })} className="bg-white text-[#5B52E5] font-black rounded-2xl px-5 py-3">התחילו את שלב 1 בחינם ←</button>
        )}
        <Link href="/" className="border-2 border-white/60 text-white font-bold rounded-2xl px-5 py-3 no-underline">על התוכנית</Link>
      </div>
    </aside>
  )
}
