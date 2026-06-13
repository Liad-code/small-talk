import { notFound } from 'next/navigation'
import { SoundSortGame } from '@/components/step3/SoundSortGame'
import { getStep4SoundSortSet } from '@/data/step4/soundSortSets'

export default function Step4SoundSortPage({ params }: { params: { set: string } }) {
  const set = getStep4SoundSortSet(Number(params.set))
  if (!set) notFound()
  return <SoundSortGame setNumber={set.id} categories={set.sounds} backHref="/step4/phonics" />
}
