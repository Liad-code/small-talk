'use client'
import type { Scene } from '@/data/step7/types'
import { PizzaView, Receipt } from '@/components/step7/PizzaView'

/** Icon + label of a chosen value, from the scene's make slots (or the step options). */
function itemFor(scene: Scene, slot: string, value: string): { icon: string; label: string } {
  const c = scene.makeSlots.find(s => s.slot === slot)?.choices.find(c => c.value === value)
  if (c) return c
  for (const s of scene.steps) {
    const o = s.options.find(o => o.pick?.slot === slot && o.pick.value === value)
    if (o) return { icon: o.icon ?? '⭐', label: o.label ?? value }
  }
  return { icon: '⭐', label: value }
}

/**
 * What the child ordered / chose: the pizza for the pizzeria, otherwise a row
 * of item cards (ice-cream flavour, pet, clothes…), in the order of the slots.
 */
export function ResultView({ scene, order, compact = false }: { scene: Scene; order: Record<string, string>; compact?: boolean }) {
  if (scene.result === 'pizza') {
    return (
      <>
        <PizzaView order={order} compact={compact} />
        {!compact && <div className="my-4"><Receipt order={order} /></div>}
      </>
    )
  }
  const slots = [
    ...scene.makeSlots.map(s => s.slot),
    ...Object.keys(order).filter(k => !scene.makeSlots.some(s => s.slot === k)),
  ].filter(k => order[k] && order[k] !== 'none')
  if (slots.length === 0) return null
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${compact ? '' : 'my-4'}`} dir="ltr">
      {slots.map(k => {
        const it = itemFor(scene, k, order[k])
        return (
          <div key={k} className={`bounce-in flex flex-col items-center rounded-2xl border-4 border-white bg-white/90 shadow ${compact ? 'px-2 py-1 min-w-[60px]' : 'px-3 py-2 min-w-[80px]'}`}>
            <span className={`${compact ? 'text-2xl' : 'text-4xl'} leading-none`}>{it.icon}</span>
            <span className="text-xs font-black text-gray-700 mt-1">{it.label}</span>
          </div>
        )
      })}
    </div>
  )
}
