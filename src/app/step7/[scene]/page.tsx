import { notFound } from 'next/navigation'
import { bundleById } from '@/data/step7'
import { ScenePage } from '@/components/step7/ScenePage'
import { Header } from '@/components/layout/Header'
import { PerkLocked } from '@/components/perks/PerkBits'
import { earlyItem } from '@/lib/earlyAccess'
import { israelDay } from '@/lib/stars'
import { getAccess, hasPerk } from '@/lib/access'

export const dynamic = 'force-dynamic'

export default async function Step7ScenePage({ params }: { params: { scene: string } }) {
  if (!bundleById(params.scene)) notFound()
  const early = earlyItem(`/step7/${params.scene}`, israelDay())
  if (early && !hasPerk(await getAccess(), 'early_access')) {
    return (
      <div className="min-h-screen">
        <Header />
        <PerkLocked icon="✨" title={`גישה מוקדמת: ${early.labelHe}`} minTier={2} />
        <p className="text-center font-bold text-gray-400 text-sm -mt-8" dir="rtl">ייפתח לכל המנויים ב-{early.until.split('-').reverse().join('.')}</p>
      </div>
    )
  }
  return <ScenePage id={params.scene} />
}
