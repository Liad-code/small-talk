import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Mascot } from '@/components/ui/Mascot'
import { PerkLocked, PrintButton } from '@/components/perks/PerkBits'
import { db } from '@/lib/db'
import { getAccess, hasPerk } from '@/lib/access'
import { monthReport, STEPS } from '@/lib/family'
import { israelDay } from '@/lib/stars'

export const dynamic = 'force-dynamic'

const MONTHS_HE = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
const shift = (month: string, n: number) => {
  const [y, m] = month.split('-').map(Number)
  const d = new Date(Date.UTC(y, m - 1 + n, 1))
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

/** ₪69 perk: printable monthly report for one child. */
export default async function ReportPage({ params, searchParams }: { params: { childId: string }; searchParams: { m?: string } }) {
  const access = await getAccess()
  if (!access.userId) redirect('/account')
  if (!hasPerk(access, 'monthly_report')) return <div className="min-h-screen"><Header /><PerkLocked icon="📄" title="דוח חודשי להורים" minTier={2} /></div>

  const child = await db.childProfile.findFirst({ where: { id: params.childId, userId: access.userId }, select: { id: true, displayName: true, avatar: true } })
  if (!child) notFound()

  const thisMonth = israelDay().slice(0, 7)
  const month = /^\d{4}-\d{2}$/.test(searchParams.m ?? '') && searchParams.m! <= thisMonth ? searchParams.m! : thisMonth
  const r = await monthReport(child.id, month)
  const [y, m] = month.split('-').map(Number)
  const maxStep = Math.max(1, ...Object.values(r.perStep))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-6" dir="rtl">
        <div className="no-print flex items-center justify-between gap-2 mb-4 flex-wrap">
          <Link href="/account" className="text-sm font-bold text-primary no-underline">→ החשבון שלי</Link>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Link href={`?m=${shift(month, -1)}`} className="px-3 py-1 rounded-full bg-white border-2 border-gray-200 no-underline text-gray-600">→ חודש קודם</Link>
            {month < thisMonth && <Link href={`?m=${shift(month, 1)}`} className="px-3 py-1 rounded-full bg-white border-2 border-gray-200 no-underline text-gray-600">חודש הבא ←</Link>}
          </div>
          <PrintButton />
        </div>

        <article className="print-page bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <header className="flex items-center gap-4 border-b-4 border-purple-100 pb-4 mb-5">
            <div className="shrink-0"><Mascot size={64} /></div>
            <div className="flex-1">
              <div className="text-xs font-black text-purple-400 tracking-wide">Small Talk · דוח חודשי</div>
              <h1 className="font-display text-3xl font-bold text-gray-800">{child.avatar} {child.displayName}</h1>
              <div className="font-bold text-gray-500">{MONTHS_HE[m - 1]} {y}</div>
            </div>
          </header>

          <section className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="bg-yellow-50 rounded-2xl p-3"><div className="font-display font-black text-3xl text-yellow-600">{r.monthStars}</div><div className="text-xs font-bold text-gray-500">כוכבים החודש</div></div>
            <div className="bg-green-50 rounded-2xl p-3"><div className="font-display font-black text-3xl text-green-600">{r.activeDays.length}</div><div className="text-xs font-bold text-gray-500">ימי תרגול</div></div>
            <div className="bg-purple-50 rounded-2xl p-3"><div className="font-display font-black text-3xl text-purple-600">{r.current.emoji}</div><div className="text-xs font-bold text-gray-500">כרגע ב{r.current.he}</div></div>
          </section>

          <section className="mb-6">
            <h2 className="font-display font-bold text-lg text-gray-700 mb-2">📅 ימי תרגול</h2>
            <div className="grid grid-cols-7 gap-1.5" dir="ltr">
              {Array.from({ length: r.lastDay }, (_, i) => i + 1).map(d => (
                <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-black ${r.activeDays.includes(d) ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-300'}`}>{d}</div>
              ))}
            </div>
            {r.best && r.best.stars > 0 && <p className="text-xs font-bold text-gray-400 mt-2">היום הכי חזק: {Number(r.best.day.slice(8))} ב{MONTHS_HE[m - 1]} — {r.best.stars} כוכבים</p>}
          </section>

          <section className="mb-6">
            <h2 className="font-display font-bold text-lg text-gray-700 mb-2">⭐ כוכבים בכל שלב (סה״כ)</h2>
            <div className="flex flex-col gap-1.5">
              {STEPS.map(s => (
                <div key={s.id} className="flex items-center gap-2 text-sm font-bold">
                  <span className="w-24 text-gray-600">{s.emoji} {s.he}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-l from-purple-400 to-indigo-500 rounded-full" style={{ width: `${(r.perStep[s.id] / maxStep) * 100}%` }} />
                  </div>
                  <span className="w-10 text-left text-purple-700">{r.perStep[s.id]}</span>
                </div>
              ))}
            </div>
            {r.levelsDone > 0 && <p className="text-xs font-bold text-gray-400 mt-2">+ {r.levelsDone} רמות בנושאי הלימוד הכלליים</p>}
          </section>

          <section className="bg-blue-50 rounded-2xl p-4">
            <h2 className="font-display font-bold text-lg text-blue-800 mb-2">💡 המלצות לבית</h2>
            <ul className="flex flex-col gap-2 text-sm font-bold text-blue-900 list-disc pr-5">
              {r.tips.map(t => <li key={t}>{t}</li>)}
            </ul>
          </section>
          <p className="text-[11px] font-bold text-gray-300 mt-4 text-center">small-talk.online</p>
        </article>
      </div>
    </div>
  )
}
