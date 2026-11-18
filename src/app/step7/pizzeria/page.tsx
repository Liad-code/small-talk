'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { PIZZERIA } from '@/data/step7/pizzeria'
import { sayLine } from '@/utils/sceneAudio'
import { OrderGame } from '@/components/step7/OrderGame'
import { RoleSwapGame } from '@/components/step7/RoleSwapGame'

type Tab = 'learn' | 'order' | 'build' | 'swap'
const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn' },
  { id: 'order', label: '🗣️ Order' },
  { id: 'build', label: '🧩 Build' },
  { id: 'swap',  label: '👨‍🍳 Be Tony' },
]
const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

const MODE_INTRO: Record<Exclude<Tab, 'learn'>, string> = {
  order: 'טוני שואל — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
  build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים והקישו על המילים לפי הסדר.',
  swap:  'מתחלפים! אתם טוני הפיצאי — שאלו את הלקוח, זכרו מה הזמין והכינו לו את הפיצה.',
}

function LearnTab() {
  const scene = PIZZERIA
  return (
    <div className="max-w-xl mx-auto px-4 pb-16">
      <p className="text-center font-bold text-gray-600 mb-4" dir="rtl">
        אלה המשפטים של השיחה בפיצרייה. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו להזמין לבד!
      </p>
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

function ModeTab({ mode }: { mode: Exclude<Tab, 'learn'> }) {
  const [run, setRun] = useState(0) // bumping it restarts the scene from the start
  return (
    <div className="max-w-xl mx-auto px-4 pb-16">
      <p className="text-center font-bold text-gray-600 mb-3 text-sm" dir="rtl">{MODE_INTRO[mode]}</p>
      {mode === 'swap'
        ? <RoleSwapGame key={run} scene={PIZZERIA} onAgain={() => setRun(r => r + 1)} />
        : <OrderGame key={`${mode}-${run}`} scene={PIZZERIA} mode={mode === 'order' ? 'choose' : 'build'} onAgain={() => setRun(r => r + 1)} />}
    </div>
  )
}

export default function PizzeriaPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step7" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 7</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Tony&apos;s Pizza 🍕</h1>
          <p className="text-white/80 font-bold text-sm" dir="rtl">בפיצרייה — מזמינים פיצה באנגלית</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>
      <div className="pt-4">
        {tab === 'learn' ? <LearnTab /> : <ModeTab key={tab} mode={tab} />}
      </div>
    </div>
  )
}
