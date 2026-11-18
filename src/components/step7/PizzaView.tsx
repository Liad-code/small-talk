'use client'

const TOPPING_ICON: Record<string, string> = {
  cheese: '🧀', mushrooms: '🍄', olives: '🫒', peppers: '🫑', corn: '🌽',
}
const DRINK_ICON: Record<string, string> = { 'orange juice': '🧃', water: '💧' }
const SIZE_R: Record<string, number> = { small: 52, medium: 66, large: 80 }

/** The child's pizza, drawn from their order — it grows and gets toppings as they choose. */
export function PizzaView({ order, compact = false }: { order: Record<string, string>; compact?: boolean }) {
  const r = SIZE_R[order.size] ?? 66
  const topping = order.topping ? TOPPING_ICON[order.topping] : null
  const spots = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    const d = r * 0.55
    return { x: 100 + Math.cos(a) * d, y: 100 + Math.sin(a) * d }
  })
  const box = compact ? 120 : 180
  return (
    <div className="flex items-end justify-center gap-2" aria-label="your pizza">
      <svg viewBox="0 0 200 200" width={box} height={box} className="drop-shadow-md">
        <circle cx="100" cy="100" r={r} fill="#e9a94f" />
        <circle cx="100" cy="100" r={r - 8} fill="#d9472b" />
        <circle cx="100" cy="100" r={r - 13} fill="#f8d66a" />
        {topping && spots.map((p, i) => (
          <text key={i} x={p.x} y={p.y} fontSize={r * 0.32} textAnchor="middle" dominantBaseline="central">{topping}</text>
        ))}
        {topping && <text x="100" y="100" fontSize={r * 0.34} textAnchor="middle" dominantBaseline="central">{topping}</text>}
      </svg>
      {order.drink && order.drink !== 'none' && (
        <span className={compact ? 'text-3xl' : 'text-5xl'} aria-label={order.drink}>{DRINK_ICON[order.drink]}</span>
      )}
      {order.where === 'take away' && <span className={compact ? 'text-3xl' : 'text-5xl'} aria-label="take away">🛍️</span>}
    </div>
  )
}

/** A little receipt of what was ordered (English, as on a real receipt). */
export function Receipt({ order }: { order: Record<string, string> }) {
  const rows = [
    `1 × ${order.size ?? ''} pizza${order.topping ? ` (${order.topping})` : ''}`,
    order.drink && order.drink !== 'none' ? `1 × ${order.drink}` : null,
    order.where ? (order.where === 'take away' ? 'take away' : 'eat here') : null,
  ].filter(Boolean) as string[]
  return (
    <div className="mx-auto w-56 bg-white border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 font-mono text-sm text-gray-700 shadow-sm" dir="ltr">
      <p className="text-center font-black mb-2">🧾 TONY&apos;S PIZZA</p>
      {rows.map(r => <p key={r}>{r}</p>)}
      <p className="border-t border-dashed border-gray-300 mt-2 pt-1 flex justify-between font-black">
        <span>TOTAL</span><span>₪20</span>
      </p>
    </div>
  )
}
