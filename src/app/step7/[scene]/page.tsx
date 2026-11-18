import { notFound } from 'next/navigation'
import { bundleById } from '@/data/step7'
import { ScenePage } from '@/components/step7/ScenePage'

export default function Step7ScenePage({ params }: { params: { scene: string } }) {
  if (!bundleById(params.scene)) notFound()
  return <ScenePage id={params.scene} />
}
