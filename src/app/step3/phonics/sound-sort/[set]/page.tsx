'use client'
import { notFound } from 'next/navigation'
import { SoundSortGame } from '@/components/step3/SoundSortGame'
import { getSoundSortSet } from '@/data/step3/soundSortSets'

export default function SoundSortSetPage({ params }: { params: { set: string } }) {
  const n = Number(params.set)
  const set = Number.isInteger(n) ? getSoundSortSet(n) : undefined
  if (!set) notFound()

  return <SoundSortGame setNumber={set.id} categories={set.sounds} />
}
