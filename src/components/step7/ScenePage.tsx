'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { bundleById } from '@/data/step7'
import type { Scene, SceneBundle } from '@/data/step7/types'
import { sayLine } from '@/utils/sceneAudio'
import { OrderGame } from '@/components/step7/OrderGame'
import { RoleSwapGame } from '@/components/step7/RoleSwapGame'
import { StoryGame } from '@/components/step7/StoryGame'

type Tab = 'story' | 'learn' | 'order' | 'build' | 'swap'
const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

function LearnTab({ scene }: { scene: Scene }) {
  return (
    <div className="max-w-xl mx-auto px-4 pb-16">
      <p className="text-center font-bold text-gray-600 mb-4" dir="rtl">{scene.ui.learnHe}</p>
      <div className="rounded-3xl border-4 border-orange-200 bg-white overflow-hidden">
        {scene.phrases.map((p, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 ${i % 2 ? 'bg-orange-50/50' : ''} ${i ? 'border-t border-orange-100' : ''}`}>
            <span className="text-2xl flex-shrink-0" aria-hidden="true">{p.speaker === 'kid' ? '🧒' : scene.character.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 text-[15px]" dir="ltr">{p.en}</p>
              <p className="font-bold text-gray-400 text-xs" dir="rtl">{p.he}</p>
            </div>
            <button
              onClick={() => sayLine(p.speaker, p.en)}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 border-2 border-sky-200 text-lg active:scale-90"
              aria-label={`Listen: ${p.en}`}
            >🔊</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoryTab({ bundle }: { bundle: SceneBundle }) {
  const [run, setRun] = useState(0)
  return (
    <div className="max-w-xl mx-auto px-4 pb-16">
      <StoryGame key={run} scene={bundle.scene} story={bundle.story} onAgain={() => setRun(r => r + 1)} />
    </div>
  )
}

function ModeTab({ scene, mode }: { scene: Scene; mode: 'order' | 'build' | 'swap' }) {
  const [run, setRun] = useState(0) // bumping it restarts the scene from the start
  return (
    <div className="max-w-xl mx-auto px-4 pb-16">
      <p className="text-center font-bold text-gray-600 mb-3 text-sm" dir="rtl">{scene.ui.introHe[mode]}</p>
      {mode === 'swap'
        ? <RoleSwapGame key={run} scene={scene} onAgain={() => setRun(r => r + 1)} />
        : <OrderGame key={`${mode}-${run}`} scene={scene} mode={mode === 'order' ? 'choose' : 'build'} onAgain={() => setRun(r => r + 1)} />}
    </div>
  )
}

/** One Step 7 scene: Story (default) · Learn · Order · Build · role swap. */
export function ScenePage({ id }: { id: string }) {
  const bundle = bundleById(id)!
  const { scene } = bundle
  const [tab, setTab] = useState<Tab>('story')
  const tabs: { id: Tab; label: string }[] = [
    { id: 'story', label: '📖 Story' },
    { id: 'learn', label: '📚 Learn' },
    { id: 'order', label: '🗣️ Order' },
    { id: 'build', label: '🧩 Build' },
    { id: 'swap', label: scene.ui.swapTab },
  ]
  return (
    <div className="min-h-screen">
      <Header />
      <div className={`bg-gradient-to-r ${scene.ui.gradient} px-4 py-4`}>
        <div className="max-w-xl mx-auto">
          <Link href="/step7" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 7</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">{scene.title} {scene.emoji}</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">{scene.ui.subtitleHe}</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>
      <div className="pt-4">
        {tab === 'story' ? <StoryTab bundle={bundle} />
          : tab === 'learn' ? <LearnTab scene={scene} />
          : <ModeTab key={tab} scene={scene} mode={tab} />}
      </div>
    </div>
  )
}
