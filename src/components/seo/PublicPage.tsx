import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export interface Crumb { name: string; path: string }

/** Frame for public content pages: header, breadcrumbs, readable column, footer with internal links. */
export function PublicPage({ crumbs, children }: { crumbs: Crumb[]; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8" dir="rtl">
        <nav aria-label="פירורי לחם" className="text-sm font-bold text-gray-400 mb-4">
          <ol className="flex flex-wrap gap-1">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">‹</span>}
                {i < crumbs.length - 1
                  ? <Link href={c.path} className="hover:text-primary no-underline text-gray-500">{c.name}</Link>
                  : <span aria-current="page" className="text-gray-700">{c.name}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}

export function PublicFooter() {
  return (
    <footer className="border-t border-purple-100 bg-white px-4 py-10" dir="rtl">
      <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6 text-sm font-bold">
        <div>
          <p className="font-display text-lg text-gray-800">💬 Small Talk</p>
          <p className="text-gray-500 mt-1 font-semibold">אנגלית לילדים דוברי עברית — מהאות הראשונה ועד שיחה.</p>
          <Link href="/" className="inline-block mt-2 text-primary no-underline">על התוכנית ←</Link>
        </div>
        <nav aria-label="תוכן לימודי" className="flex flex-col gap-1.5">
          <Link href="/english-words" className="text-gray-600 hover:text-primary no-underline">מילים באנגלית לפי נושאים</Link>
          <Link href="/english-letters" className="text-gray-600 hover:text-primary no-underline">האותיות באנגלית</Link>
          <Link href="/guides" className="text-gray-600 hover:text-primary no-underline">מדריכים להורים</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-primary no-underline">מחירים</Link>
        </nav>
        <nav aria-label="מידע משפטי" className="flex flex-col gap-1.5">
          <Link href="/legal/terms" className="text-gray-500 hover:text-primary no-underline">תנאי שימוש</Link>
          <Link href="/legal/privacy" className="text-gray-500 hover:text-primary no-underline">מדיניות פרטיות</Link>
          <Link href="/legal/refunds" className="text-gray-500 hover:text-primary no-underline">ביטולים והחזרים</Link>
          <Link href="/legal/accessibility" className="text-gray-500 hover:text-primary no-underline">הצהרת נגישות</Link>
        </nav>
      </div>
    </footer>
  )
}

/** FAQ as native <details> (accessible, no JS), styled. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map(f => (
        <details key={f.q} className="group rounded-2xl bg-white border-2 border-purple-100 px-4 py-3">
          <summary className="cursor-pointer font-bold text-gray-800 list-none flex items-center justify-between gap-3">
            <span>{f.q}</span>
            <span aria-hidden="true" className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="mt-2 text-gray-600 font-semibold leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
