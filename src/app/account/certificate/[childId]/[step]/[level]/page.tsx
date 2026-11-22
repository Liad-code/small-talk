import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Mascot } from '@/components/ui/Mascot'
import { PerkLocked, PrintButton } from '@/components/perks/PerkBits'
import { Header } from '@/components/layout/Header'
import { db } from '@/lib/db'
import { getAccess, hasPerk } from '@/lib/access'
import { CERT_LEVELS, STEPS, stepStarsByChild } from '@/lib/family'
import { israelDay } from '@/lib/stars'

export const dynamic = 'force-dynamic'

/** One printable certificate (A4 landscape). Only for certificates the child really earned. */
export default async function CertificatePage({ params }: { params: { childId: string; step: string; level: string } }) {
  const access = await getAccess()
  if (!access.userId) redirect('/account')
  if (!hasPerk(access, 'certificates')) return <div className="min-h-screen"><Header /><PerkLocked icon="🎓" title="תעודות הישג" minTier={2} /></div>

  const step = STEPS.find(s => s.id === params.step)
  const level = CERT_LEVELS.find(l => String(l.level) === params.level)
  const child = await db.childProfile.findFirst({ where: { id: params.childId, userId: access.userId }, select: { id: true, displayName: true, avatar: true } })
  if (!step || !level || !child) notFound()
  const stars = (await stepStarsByChild([child.id])).get(child.id)![step.id]
  if (stars < level.stars) notFound()
  const [y, m, d] = israelDay().split('-')

  return (
    <div className="min-h-screen bg-gray-100">
      <style>{'@page { size: A4 landscape; margin: 0 }'}</style>
      <div className="no-print max-w-4xl mx-auto px-4 pt-4 flex items-center justify-between" dir="rtl">
        <Link href="/account/certificates" className="text-sm font-bold text-primary no-underline">→ כל התעודות</Link>
        <PrintButton />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <article className="print-page relative bg-white shadow-xl aspect-[297/210] overflow-hidden" dir="rtl"
          style={{ border: `14px double ${level.color}` }}>
          <div className="absolute inset-0 opacity-[0.07] text-[220px] flex items-center justify-center select-none pointer-events-none">{level.emoji}</div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-[8%]">
            <div className="mb-2"><Mascot size={84} /></div>
            <div className="font-display text-[3.2vw] sm:text-3xl font-bold tracking-widest" style={{ color: level.color }}>תעודת הישג · {level.he}</div>
            <div className="font-display text-gray-500 font-bold text-[2vw] sm:text-lg mt-1">Certificate of Achievement</div>
            <div className="font-bold text-gray-500 text-[2vw] sm:text-base mt-[3%]">מוענקת בגאווה ל</div>
            <div className="font-display font-black text-gray-800 text-[6vw] sm:text-6xl leading-tight mt-1">{child.displayName}</div>
            <div className="font-bold text-gray-600 text-[2.2vw] sm:text-xl mt-[2%] max-w-[80%]">
              על איסוף {level.stars} כוכבים ב{step.he} ({step.title}) של Small Talk {step.emoji}
            </div>
            <div className="text-[4vw] sm:text-4xl mt-[2%]">{level.emoji} ⭐ {level.emoji}</div>
            <div className="absolute bottom-[7%] inset-x-[8%] flex items-end justify-between text-[1.6vw] sm:text-sm font-bold text-gray-500">
              <div className="text-center"><div className="border-t-2 border-gray-300 pt-1 px-6">{d}.{m}.{y}</div>תאריך</div>
              <div className="font-display text-primary text-[2vw] sm:text-lg">small-talk.online</div>
              <div className="text-center"><div className="border-t-2 border-gray-300 pt-1 px-6">🦉 Bubo</div>חתימה</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
