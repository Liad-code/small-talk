'use client'
import type { Place, PlaceArt } from '@/data/step7/types'

/**
 * Illustrated places for Story mode, drawn with CSS + emoji (no image files,
 * so they stay crisp on every screen and cost nothing to load). Characters,
 * the speech bubble and effects are passed in as children and sit on top.
 */
const CHECKER_RED = 'repeating-conic-gradient(#ef4444 0% 25%, #fff 0% 50%) 0 0 / 28px 28px'
const TILES = 'repeating-conic-gradient(#fde7c8 0% 25%, #fff7ed 0% 50%) 0 0 / 24px 24px'
const BLUE_TILES = 'repeating-conic-gradient(#dbeafe 0% 25%, #eff6ff 0% 50%) 0 0 / 22px 22px'
const BRICKS = 'linear-gradient(#7c2d12 2px, transparent 2px) 0 0 / 100% 18px, linear-gradient(90deg, #7c2d12 2px, transparent 2px) 0 0 / 36px 36px, #b45309'
const AWNING = 'repeating-linear-gradient(90deg, #ef4444 0 22px, #fff 22px 44px)'

function Street() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100" />
      <span className="absolute top-2 right-4 text-4xl">☀️</span>
      <span className="story-cloud absolute top-4 left-6 text-4xl opacity-90">☁️</span>
      <span className="story-cloud absolute top-10 left-[45%] text-3xl opacity-70" style={{ animationDelay: '-4s' }}>☁️</span>
      {/* shop */}
      <div className="absolute left-[8%] right-[8%] top-[24%] bottom-[18%] bg-amber-100 border-4 border-amber-700/40 rounded-t-xl" />
      <div className="absolute left-[6%] right-[6%] top-[24%] h-8 rounded-b-xl shadow" style={{ background: AWNING }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-[13%] bg-red-600 text-white font-display font-black text-sm sm:text-base px-4 py-1 rounded-full shadow-lg border-2 border-yellow-300 whitespace-nowrap">
        🍕 TONY&apos;S PIZZA
      </div>
      {/* window */}
      <div className="absolute left-[14%] top-[44%] w-[24%] h-[24%] bg-sky-200 border-4 border-amber-800/60 rounded-lg flex items-center justify-center text-3xl">🍕</div>
      {/* door */}
      <div className="absolute left-[44%] w-[18%] bottom-[18%] top-[40%] bg-amber-800 rounded-t-2xl border-4 border-amber-900/70">
        <div className="mx-auto mt-2 w-[60%] h-[30%] bg-sky-200/80 rounded-t-xl" />
        <div className="absolute right-1.5 top-1/2 w-2 h-2 rounded-full bg-yellow-300" />
      </div>
      <span className="absolute right-[2%] bottom-[14%] text-5xl">🌳</span>
      {/* sidewalk */}
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gray-300 border-t-4 border-gray-400" />
    </>
  )
}

function Counter() {
  return (
    <>
      <div className="absolute inset-0 bg-orange-50" />
      <div className="absolute inset-x-0 bottom-0 h-[55%]" style={{ background: TILES }} />
      {/* menu board */}
      <div className="absolute left-3 top-3 w-[38%] max-w-[170px] bg-gray-800 border-4 border-amber-700 rounded-lg px-2 py-1.5 text-[10px] sm:text-xs font-bold text-white/90 leading-tight shadow" dir="ltr">
        <p className="text-yellow-300 font-black text-center mb-0.5">MENU</p>
        <p>🍕 Pizza <span className="float-right">₪20</span></p>
        <p>🧃 Juice <span className="float-right">₪5</span></p>
        <p>💧 Water <span className="float-right">₪3</span></p>
      </div>
      {/* lamp */}
      <div className="absolute left-[60%] top-0 w-0.5 h-6 bg-gray-500" />
      <div className="absolute left-[60%] top-6 -translate-x-1/2 w-10 h-5 bg-yellow-400 rounded-t-full shadow-[0_8px_24px_rgba(250,204,21,.6)]" />
      <span className="absolute right-3 top-4 text-3xl">🌿</span>
    </>
  )
}

function Kitchen() {
  return (
    <>
      <div className="absolute inset-0" style={{ background: BLUE_TILES }} />
      {/* shelves */}
      <div className="absolute left-3 right-3 top-[14%] h-2 bg-amber-700 rounded" />
      <div className="absolute left-5 top-[3%] flex gap-3 text-2xl">🍅 🧀 🫒 🍄 🌽 🫑</div>
      <div className="absolute right-4 top-[22%] text-3xl">🥫</div>
    </>
  )
}

function Oven() {
  return (
    <>
      <div className="absolute inset-0" style={{ background: BRICKS }} />
      {/* oven dome */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[12%] w-[64%] h-[62%] bg-stone-500 border-[6px] border-stone-700 rounded-t-[999px] shadow-inner">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[62%] h-[58%] bg-gray-900 rounded-t-[999px] overflow-hidden">
          <div className="story-glow absolute inset-0 bg-gradient-to-t from-orange-500/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 flex justify-center gap-1 text-2xl sm:text-3xl">
            <span className="story-flicker">🔥</span>
            <span className="story-flicker" style={{ animationDelay: '-.2s' }}>🔥</span>
            <span className="story-flicker" style={{ animationDelay: '-.35s' }}>🔥</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-stone-600 border-t-4 border-stone-800" />
    </>
  )
}

function Table() {
  return (
    <>
      <div className="absolute inset-0 bg-amber-50" />
      {/* window */}
      <div className="absolute left-[10%] top-[8%] w-[34%] h-[38%] bg-gradient-to-b from-sky-300 to-sky-100 border-[6px] border-amber-700 rounded-lg overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-amber-700 -translate-x-1/2" />
        <span className="absolute right-1 top-1 text-xl">☀️</span>
      </div>
      <span className="absolute right-[10%] top-[10%] text-3xl">🖼️</span>
      {/* tablecloth */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] border-t-4 border-red-700" style={{ background: CHECKER_RED }} />
    </>
  )
}

function Park() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100" />
      <span className="absolute top-2 right-4 text-4xl">☀️</span>
      <span className="story-cloud absolute top-5 left-8 text-4xl">☁️</span>
      <span className="absolute left-[4%] bottom-[24%] text-6xl">🌳</span>
      <span className="absolute right-[6%] bottom-[26%] text-5xl">🌳</span>
      <span className="absolute left-[40%] bottom-[34%] text-2xl">🦋</span>
      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-green-400 border-t-4 border-green-500" />
      <div className="absolute left-[24%] right-[24%] bottom-[6%] h-[16%] rounded-lg skew-x-[-12deg]" style={{ background: CHECKER_RED }} />
    </>
  )
}

const PLACES: Record<string, () => JSX.Element> = {
  street: Street, counter: Counter, kitchen: Kitchen, oven: Oven, table: Table, park: Park,
}

const ANIM: Record<string, string> = { cloud: 'story-cloud', float: 'animate-float', flicker: 'story-flicker', glow: 'story-glow' }

/** A place described in scene data: wall, floor band, emoji decorations, a sign. */
function DataPlace({ art }: { art: PlaceArt }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: art.bg }} />
      {art.floor && (
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: `${art.floor.h}%`, background: art.floor.bg, borderTop: art.floor.border ? `4px solid ${art.floor.border}` : undefined }}
        />
      )}
      {art.decor?.map((d, i) => (
        <span
          key={i}
          className={`absolute leading-none select-none ${d.anim ? ANIM[d.anim] : ''}`}
          style={{ left: `${d.x}%`, top: `${d.y}%`, fontSize: d.s ?? 30, animationDelay: `${-i * 0.7}s` }}
          aria-hidden="true"
        >{d.e}</span>
      ))}
      {art.sign && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[4%] bg-red-600 text-white font-display font-black text-sm sm:text-base px-4 py-1 rounded-full shadow-lg border-2 border-yellow-300 whitespace-nowrap">
          {art.sign}
        </div>
      )}
    </>
  )
}

/** Does this place have a counter in front of the character? */
export function placeHasCounter(place: Place, places?: Record<string, PlaceArt>): boolean {
  if (place === 'counter' || place === 'kitchen') return true
  return !!places?.[place]?.counter
}

/** The counter strip in front of the character, for built-in or data places. */
export function PlaceCounter({ place, places, item }: { place: Place; places?: Record<string, PlaceArt>; item?: string }) {
  const c = places?.[place]?.counter
  if (c) {
    return (
      <div className="absolute inset-x-0 bottom-0 h-[24%]" style={{ background: c.bg, borderTop: `6px solid ${c.border}` }}>
        {(item ?? c.item) && <span className="absolute left-[28%] -top-7 text-3xl">{item ?? c.item}</span>}
      </div>
    )
  }
  return <CounterFront kitchen={place === 'kitchen'} item={item} />
}

export function StoryBackdrop({ place, places, children, className = '' }: {
  place: Place
  places?: Record<string, PlaceArt>
  children?: React.ReactNode
  className?: string
}) {
  const Built = PLACES[place]
  const art = places?.[place]
  return (
    <div className={`relative w-full aspect-[16/11] max-h-[340px] rounded-3xl overflow-hidden border-4 border-orange-200 shadow-lg ${className}`}>
      <div key={place} className="story-place-in absolute inset-0">
        {art ? <DataPlace art={art} /> : Built ? <Built /> : <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-50" />}
      </div>
      {children}
    </div>
  )
}

/** Wood counter strip drawn in front of the character (counter / kitchen places). */
export function CounterFront({ kitchen = false, item }: { kitchen?: boolean; item?: string }) {
  return (
    <div className={`absolute inset-x-0 bottom-0 h-[24%] border-t-[6px] ${kitchen ? 'bg-gray-300 border-gray-400' : 'bg-amber-600 border-amber-800'}`}>
      {!kitchen && <div className="absolute inset-x-0 top-2 h-1 bg-amber-500/60" />}
      {!kitchen && <span className="absolute left-[30%] -top-7 text-3xl">🧾</span>}
      {kitchen && <span className="absolute left-[28%] -top-6 text-3xl">{item ?? '🫓'}</span>}
    </div>
  )
}
