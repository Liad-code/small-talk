'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FlipCard, FlipPanel, ThinkPrompt, FlipButton } from '@/components/step7/Flip'
import type { FindEvent, Scene, Story, StoryChoice, StoryLine, StoryEnding } from '@/data/step7/types'
import { sayLine } from '@/utils/sceneAudio'
import { stopAudio } from '@/utils/audioPlayer'
import { shuffle } from '@/utils/shuffle'
import { StoryBackdrop, PlaceCounter, placeHasCounter } from '@/components/step7/StoryBackdrop'
import { ResultView } from '@/components/step7/ResultView'
import { PizzaView } from '@/components/step7/PizzaView'
import { StarOnComplete } from '@/components/shared/StarOnComplete'

/**
 * Story mode — a branching adventure. The character talks, the child picks
 * what to say (each choice changes the story), hears the line in the kid
 * voice with the words lighting up (and says it aloud with it) before
 * the story moves on. Endings found are remembered on this device.
 */

type Side = 'left' | 'right'
interface Bubble { side: Side; text: string; he: string; n: number }
type Step = 'talk' | 'choose' | 'speak' | 'event' | 'pick'

const ENDINGS_KEY = 'smalltalk_step7_endings'
function loadFound(storyId: string): string[] {
  try { return JSON.parse(localStorage.getItem(`${ENDINGS_KEY}_${storyId}`) ?? '[]') } catch { return [] }
}
function saveFound(storyId: string, ids: string[]) {
  try { localStorage.setItem(`${ENDINGS_KEY}_${storyId}`, JSON.stringify(ids)) } catch { /* private mode: fine */ }
}

export function StoryGame({ scene, story, onAgain }: { scene: Scene; story: Story; onAgain: () => void }) {
  const char = scene.character
  const byId = useMemo(() => new Map(story.nodes.map(n => [n.id, n])), [story])
  const [phase, setPhase] = useState<'cover' | 'play' | 'end'>('cover')
  const [nodeId, setNodeId] = useState(story.start)
  const [step, setStep] = useState<Step>('talk')
  const [memory, setMemory] = useState<Record<string, string>>({})
  const [bubble, setBubble] = useState<Bubble | null>(null)
  const [talking, setTalking] = useState<Side | null>(null)
  const [showHe, setShowHe] = useState(false)
  const [wrong, setWrong] = useState<Set<string>>(new Set())
  const [soldOut, setSoldOut] = useState<string | null>(null)
  const [charVisible, setCharVisible] = useState(false)
  const [said, setSaid] = useState(0)
  /** Icons of what the child chose (shown on the counter in non-pizza scenes). */
  const [picked, setPicked] = useState<Record<string, string>>({})
  const [found, setFound] = useState<string[]>([])
  /** "Pick several" moment: what the child has tapped so far. */
  const [sel, setSel] = useState<string[]>([])
  /** Answers start face-down: think of your own answer first, then flip (owner, all tabs). */
  const [revealed, setRevealed] = useState(false)
  const [endingId, setEndingId] = useState<string | null>(null)
  const soldOutUsed = useRef(false)
  const bubbleN = useRef(0)
  const alive = useRef(true)

  useEffect(() => { setFound(loadFound(story.id)) }, [story.id])
  useEffect(() => () => { alive.current = false; stopAudio() }, [])

  const node = byId.get(nodeId)!

  async function speak(side: Side, line: StoryLine) {
    if (!alive.current) return
    setBubble({ side, text: line.text, he: line.he, n: ++bubbleN.current })
    setTalking(side)
    await sayLine(side === 'left' ? char.speaker : 'kid', line.text)
    if (alive.current) setTalking(null)
  }

  async function enterNode(id: string) {
    const n = byId.get(id)!
    setNodeId(id)
    setWrong(new Set())
    setSoldOut(null)
    setStep('talk')
    if (!n.noCharacter) setCharVisible(true)
    if (n.lines.length === 0) setBubble(null)
    for (const line of n.lines) {
      await speak('left', line)
      if (!alive.current) return
    }
    if (!alive.current) return
    setSel([])
    setRevealed(false)
    setStep(n.event ? 'event' : n.pick ? 'pick' : 'choose')
  }

  /** "Pick several": say each chosen item, then the closer; remember them; move on. */
  async function confirmPick() {
    const p = node.pick
    if (!p || step !== 'pick' || sel.length < (p.min ?? 1)) return
    const opts = p.options.filter(o => sel.includes(o.value))
    const words = opts.map((o, i) => (i === 0 ? o.say : o.say.toLowerCase()))
    const list = words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}` : words[0]
    const text = `${list}, ${p.closer}`
    setStep('speak')
    setBubble({ side: 'right', text, he: `${opts.map(o => o.he).join(', ')}, בבקשה.`, n: ++bubbleN.current })
    setTalking('right')
    for (const o of opts) { await sayLine('kid', o.say); if (!alive.current) return }
    await sayLine('kid', p.closer)
    if (!alive.current) return
    setTalking(null)
    setSaid(s => s + 1)
    setStep('talk')
    const mem = { ...memory, [p.key]: opts.map(o => o.value).join(',') }
    setMemory(mem)
    setPicked(prev => ({ ...prev, ...Object.fromEntries(opts.map(o => [`${p.key}:${o.value}`, o.icon])) }))
    if (p.reply) { setCharVisible(true); await speak('left', p.reply); if (!alive.current) return }
    void enterNode(p.next)
  }

  function start() {
    setPhase('play')
    setMemory({})
    setPicked({})
    setCharVisible(false)
    void enterNode(story.start)
  }

  async function choose(c: StoryChoice) {
    if (step !== 'choose') return
    setStep('speak')
    await speak('right', { text: c.say, he: c.he })
    if (!alive.current) return
    setSaid(s => s + 1)
    setStep('talk')

    if (c.silly) {
      await speak('left', c.silly)
      if (!alive.current) return
      setWrong(w => new Set(w).add(c.say))
      setStep('choose')
      return
    }
    if (c.canSellOut && !soldOutUsed.current && Math.random() < 0.5) {
      soldOutUsed.current = true
      setSoldOut(c.say)
      await speak('left', story.soldOut ?? { text: 'Sorry! Choose another one, please.', he: 'סליחה! בחרו משהו אחר, בבקשה.' })
      if (alive.current) setStep('choose')
      return
    }
    const mem = { ...memory, ...(c.set ?? {}) }
    setMemory(mem)
    if (c.set) {
      const icons: Record<string, string> = {}
      for (const [k, v] of Object.entries(c.set)) if (v !== 'yes' && v !== 'no' && v !== 'none') icons[k] = c.icon
      setPicked(p => ({ ...p, ...icons }))
    }
    if (c.reply) {
      setCharVisible(true)
      await speak('left', c.reply)
      if (!alive.current) return
    }
    const next = c.nextIf?.find(r => mem[r.key] === r.value)?.next ?? c.next
    if (next) { void enterNode(next); return }
    if (node.ending) finish(node.ending)
  }

  function finish(id: string) {
    const next = found.includes(id) ? found : [...found, id]
    setFound(next)
    saveFound(story.id, next)
    setEndingId(id)
    setPhase('end')
  }

  function eventDone() {
    setMemory(m => ({ ...m, chef: 'yes' }))
    void enterNode(node.next!)
  }

  // Choices for this moment: a stable shuffle per node (some correct + the silly ones)
  const choices = useMemo(() => {
    const all = node.choices ?? []
    // Story mode shows only relevant answers (owner, 2026-11-23); silly ones stay in Order / role swap.
    const good = all.filter(c => !c.silly)
    const shown = node.showChoices ? shuffle([...good]).slice(0, node.showChoices) : good
    return shuffle([...shown])
  }, [node])

  if (phase === 'cover') return <Cover scene={scene} story={story} found={found} onStart={start} />
  if (phase === 'end' && endingId) {
    return <EndScreen scene={scene} story={story} endingId={endingId} found={found} said={said} memory={memory} picked={picked} onAgain={onAgain} />
  }

  const showTony = charVisible
  const hasCounter = placeHasCounter(node.place, scene.places)
  const isPizza = scene.result === 'pizza'
  const pickIcons = Object.values(picked)

  return (
    <div className="flex flex-col gap-3">
      <ChapterMap story={story} current={node.chapter} />

      <StoryBackdrop place={node.place} places={scene.places}>
        {/* the character */}
        {showTony && (
          <div
            key={node.place === 'street' ? 'door' : 'in'}
            className={`absolute z-10 story-pop-up ${node.place === 'street' ? 'left-[44%] bottom-[18%]' : hasCounter ? 'left-[6%] bottom-[14%]' : node.place === 'oven' ? 'left-[3%] bottom-[8%]' : 'left-[8%] bottom-[22%]'}`}
          >
            <Character emoji={char.emoji} name={char.name} talking={talking === 'left'} />
          </div>
        )}
        {hasCounter && <div className="absolute inset-0 z-20 pointer-events-none"><PlaceCounter place={node.place} places={scene.places} item={nodeId === 'end-dishes' ? '🍽️' : undefined} /></div>}
        {/* props for this moment */}
        {node.props?.map((p, i) => (
          <span key={`${nodeId}-${i}`} className="absolute z-20 leading-none story-pop-up pointer-events-none" style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.s ?? 34, animationDelay: `${i * 0.08}s` }}>{p.e}</span>
        ))}
        {/* what the child chose so far (non-pizza scenes) */}
        {!isPizza && pickIcons.length > 0 && hasCounter && (
          <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-[5%] flex gap-1 pointer-events-none">
            {pickIcons.map((e, i) => <span key={i} className="story-pop-up text-3xl drop-shadow">{e}</span>)}
          </div>
        )}
        {/* the pizza being made */}
        {isPizza && memory.size && (hasCounter || node.place === 'table') && (
          <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-[6%] pointer-events-none story-pop-up">
            <PizzaView order={memory} size={node.place === 'table' ? 96 : 76} bake={node.chapter < 4 ? 'raw' : undefined} />
          </div>
        )}
        {node.place === 'table' && memory.birthday === 'yes' && nodeId === 'end-birthday' && (
          <span className="absolute z-40 left-1/2 -translate-x-1/2 bottom-[30%] text-4xl story-pop-up">🕯️</span>
        )}
        {isPizza && node.place === 'oven' && step === 'event' && node.event === 'oven' && <OvenPizza memory={memory} />}
        {/* the child */}
        <div className={`absolute z-30 right-[6%] ${node.place === 'street' ? 'bottom-[6%]' : 'bottom-[3%]'} story-walk-in`}>
          <Character emoji="🧒" name="You" talking={talking === 'right'} />
        </div>
        {/* speech bubble */}
        {bubble && (
          <div className="absolute z-40 top-2 inset-x-2 flex">
            <div
              key={bubble.n}
              className={`bounce-in relative max-w-[88%] rounded-2xl px-3 py-2 shadow-lg ${bubble.side === 'left' ? 'mr-auto bg-white text-gray-800' : 'ml-auto bg-sky-500 text-white'}`}
              dir="ltr"
            >
              <p className="font-black text-[15px] sm:text-base leading-snug">
                {bubble.text.split(' ').map((w, i) => (
                  <span key={i} className="story-word" style={{ animationDelay: `${i * 0.26}s` }}>{w}&nbsp;</span>
                ))}
              </p>
              {showHe && <p className={`text-xs font-bold mt-0.5 ${bubble.side === 'left' ? 'text-gray-400' : 'text-sky-100'}`} dir="rtl">{bubble.he}</p>}
              <span className={`absolute -bottom-2 w-4 h-4 rotate-45 ${bubble.side === 'left' ? 'left-8 bg-white' : 'right-8 bg-sky-500'}`} />
            </div>
          </div>
        )}
      </StoryBackdrop>

      {/* the story text */}
      <div key={nodeId} className="bounce-in flex gap-2 items-start rounded-2xl bg-amber-50 border-2 border-amber-200 px-3 py-2" dir="rtl">
        <span className="text-xl leading-none mt-0.5">📖</span>
        <p className="font-bold text-amber-900 text-sm leading-relaxed">{node.narrationHe}</p>
      </div>

      {/* tools */}
      <div className="flex justify-end gap-2" dir="rtl">
        <button
          onClick={() => setShowHe(h => !h)}
          className={`text-xs font-black rounded-full px-3 py-1 border-2 ${showHe ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}
        >🇮🇱 תרגום</button>
        <button
          onClick={() => bubble && (step === 'choose' || step === 'event') && speak(bubble.side, bubble)}
          disabled={!bubble || (step !== 'choose' && step !== 'event')}
          className="text-xs font-black rounded-full px-3 py-1 bg-sky-50 text-sky-700 border-2 border-sky-200 disabled:opacity-40"
        >🔊 שוב</button>
      </div>

      {/* action area */}
      {step === 'choose' && (
        <div className="flex flex-col gap-3">
        {!revealed && <ThinkPrompt />}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" dir="ltr">
          {choices.map((c, i) => {
            const isWrong = wrong.has(c.say)
            const isSoldOut = soldOut === c.say
            const off = isWrong || isSoldOut
            return (
              <FlipCard key={nodeId + c.say} revealed={revealed} onReveal={() => setRevealed(true)} delay={i * 140}>
              <button
                onClick={() => choose(c)}
                disabled={off || !revealed}
                className={`relative w-full h-full flex items-center gap-3 text-left rounded-2xl border-4 px-3 py-2.5 transition-all
                  ${off ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-orange-200 bg-white hover:border-orange-400 active:scale-[0.97] shadow-sm'}`}
              >
                <span className={`text-3xl leading-none flex-shrink-0 ${off ? 'grayscale' : ''}`}>{isWrong ? '🙈' : c.icon}</span>
                <span className="min-w-0">
                  <span className={`block font-black text-[16px] leading-snug ${off ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{c.say}</span>
                  <span className="block text-xs font-bold text-gray-400" dir="rtl">{c.he}</span>
                </span>
                {isSoldOut && (
                  <span className="absolute -top-2 right-2 rotate-6 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">SOLD OUT</span>
                )}
              </button>
              </FlipCard>
            )
          })}
        </div>
        {!revealed && <FlipButton onClick={() => setRevealed(true)} />}
        </div>
      )}

      {step === 'pick' && node.pick && (
        <FlipPanel key={nodeId} revealed={revealed} onReveal={() => setRevealed(true)}>
        <div dir="rtl" className="bg-white rounded-2xl p-1">
          <p className="text-center font-black text-indigo-700 text-sm mb-2">
            {node.pick.promptHe}{node.pick.max ? ` · נבחרו ${sel.length} מתוך ${node.pick.max}` : sel.length ? ` · נבחרו ${sel.length}` : ''}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" dir="ltr">
            {node.pick.options.map((o, i) => {
              const on = sel.includes(o.value)
              const full = !on && !!node.pick!.max && sel.length >= node.pick!.max
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={on}
                  disabled={full || !revealed}
                  onClick={() => setSel(s => (s.includes(o.value) ? s.filter(v => v !== o.value) : [...s, o.value]))}
                  className={`story-pop-up relative flex flex-col items-center rounded-2xl border-4 px-1 py-2 transition-all
                    ${on ? 'border-green-400 bg-green-50 scale-[1.03] shadow' : full ? 'border-gray-100 bg-gray-50 opacity-40' : 'border-orange-200 bg-white hover:border-orange-400 active:scale-95'}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {on && <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-white text-sm font-black flex items-center justify-center shadow">✓</span>}
                  <span className="text-3xl leading-none">{o.icon}</span>
                  <span className="font-black text-[13px] text-gray-800 mt-1 leading-tight text-center">{o.say}</span>
                  <span className="text-[11px] font-bold text-gray-400" dir="rtl">{o.he}</span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={confirmPick}
            disabled={!revealed || sel.length < (node.pick.min ?? 1)}
            className="btn-kid bg-green-500 w-full mt-3 disabled:opacity-40"
          >
            ✓ זהו, אפשר להזמין!
          </button>
        </div>
        </FlipPanel>
      )}

      {step === 'event' && node.event === 'oven' && story.oven && <OvenGame lines={story.oven} speak={l => speak('left', l)} onDone={eventDone} memory={memory} />}
      {step === 'event' && node.event && node.event !== 'oven' && <FindGame key={nodeId} event={node.event} speak={l => { setCharVisible(true); return speak('left', l) }} onDone={eventDone} />}

      {(step === 'talk' || step === 'speak') && (
        <div className="flex justify-center gap-1.5 py-3" aria-label="listening">
          {[0, 1, 2].map(i => <span key={i} className="w-2.5 h-2.5 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
        </div>
      )}
    </div>
  )
}

function Character({ emoji, name, talking }: { emoji: string; name: string; talking: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`text-[56px] sm:text-[72px] leading-none select-none drop-shadow ${talking ? 'scene-talking' : ''}`} aria-hidden="true">{emoji}</span>
      <span className="mt-0.5 text-[11px] font-black text-orange-900 bg-white/85 rounded-full px-2 shadow-sm">{name}</span>
    </div>
  )
}

function ChapterMap({ story, current }: { story: Story; current: number }) {
  return (
    <div className="relative flex justify-between items-center px-1" dir="ltr" aria-label={`chapter ${current + 1} of ${story.chapters.length}`}>
      <div className="absolute left-3 right-3 top-1/2 h-1 -translate-y-1/2 bg-orange-100 rounded" />
      <div
        className="absolute left-3 top-1/2 h-1 -translate-y-1/2 bg-orange-400 rounded transition-all duration-500"
        style={{ width: `calc((100% - 24px) * ${current / (story.chapters.length - 1)})` }}
      />
      {story.chapters.map((c, i) => (
        <span
          key={i}
          title={c.he}
          className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300
            ${i === current ? 'w-9 h-9 text-lg bg-orange-500 border-orange-600 shadow-[0_0_0_4px_rgba(251,146,60,.3)]' : i < current ? 'w-6 h-6 text-xs bg-orange-200 border-orange-300' : 'w-6 h-6 text-xs bg-white border-orange-100 grayscale opacity-60'}`}
        >{c.icon}</span>
      ))}
    </div>
  )
}

// ── Oven mini-game ──────────────────────────────────────────────────────────
const GOLD_FROM = 55
const GOLD_TO = 85
function bakeOf(heat: number): 'raw' | 'golden' | 'burnt' {
  return heat < GOLD_FROM ? 'raw' : heat <= GOLD_TO ? 'golden' : 'burnt'
}

// shared between the meter (below the scene) and the pizza drawn in the oven
let ovenHeatListeners: ((h: number) => void)[] = []
function useOvenHeat() {
  const [heat, setHeat] = useState(0)
  useEffect(() => {
    ovenHeatListeners.push(setHeat)
    return () => { ovenHeatListeners = ovenHeatListeners.filter(l => l !== setHeat) }
  }, [])
  return heat
}
function publishHeat(h: number) { ovenHeatListeners.forEach(l => l(h)) }

function OvenPizza({ memory }: { memory: Record<string, string> }) {
  const heat = useOvenHeat()
  return (
    <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[28%] pointer-events-none">
      <PizzaView order={memory} size={70} bake={bakeOf(heat)} />
      {heat > GOLD_TO && <span className="story-steam absolute left-1/2 -top-2 text-2xl">💨</span>}
    </div>
  )
}

function OvenGame({ lines, speak, onDone, memory }: {
  lines: NonNullable<Story['oven']>
  speak: (l: StoryLine) => Promise<void>
  onDone: () => void
  memory: Record<string, string>
}) {
  const [heat, setHeat] = useState(0)
  const [paused, setPaused] = useState(false)
  const heatRef = useRef(0)
  void memory

  useEffect(() => { heatRef.current = heat; publishHeat(heat) }, [heat])
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setHeat(h => Math.min(100, h + 0.75)), 50)
    return () => clearInterval(id)
  }, [paused])
  useEffect(() => { if (heat >= 100 && !paused) void takeOut() }, [heat, paused]) // eslint-disable-line react-hooks/exhaustive-deps

  async function takeOut() {
    if (paused) return
    setPaused(true)
    const h = heatRef.current
    if (h < GOLD_FROM) {
      await speak(lines.early)
      setPaused(false)
    } else if (h <= GOLD_TO) {
      await speak(lines.perfect)
      onDone()
    } else {
      await speak(lines.burnt)
      setHeat(0)
      setPaused(false)
    }
  }

  const look = bakeOf(heat)
  return (
    <div className="story-pop-up rounded-3xl bg-white border-4 border-orange-200 px-4 py-3 shadow">
      <p className="text-center font-black text-orange-700 mb-2" dir="rtl">
        {look === 'raw' ? 'הפיצה נאפית… חכו שתהיה זהובה' : look === 'golden' ? '✨ עכשיו! היא זהובה!' : '😱 היא נשרפת!'}
      </p>
      {/* heat meter */}
      <div className="relative h-6 rounded-full overflow-hidden border-2 border-gray-300 mb-3" dir="ltr">
        <div className="absolute inset-y-0 left-0 bg-amber-200" style={{ width: `${GOLD_FROM}%` }} />
        <div className="absolute inset-y-0 bg-green-400" style={{ left: `${GOLD_FROM}%`, width: `${GOLD_TO - GOLD_FROM}%` }} />
        <div className="absolute inset-y-0 right-0 bg-red-400" style={{ width: `${100 - GOLD_TO}%` }} />
        <div className="absolute -top-0.5 -bottom-0.5 w-2 bg-gray-900 rounded-full shadow transition-[left] duration-75" style={{ left: `calc(${heat}% - 4px)` }} />
      </div>
      <button onClick={takeOut} disabled={paused} className="btn-kid bg-orange-500 w-full text-lg disabled:opacity-50">
        🍕 Take it out! <span className="text-sm font-bold" dir="rtl">(הוציאו!)</span>
      </button>
    </div>
  )
}

// ── Cover and ending ────────────────────────────────────────────────────────
function EndingSlots({ story, found, highlight }: { story: Story; found: string[]; highlight?: string }) {
  return (
    <div className="grid grid-cols-4 gap-2" dir="ltr">
      {story.endings.map(e => {
        const has = found.includes(e.id)
        return (
          <div
            key={e.id}
            className={`rounded-2xl border-4 px-1 py-2 text-center ${e.id === highlight ? 'border-yellow-400 bg-yellow-50 story-pop-up' : has ? 'border-orange-200 bg-white' : 'border-dashed border-gray-200 bg-gray-50'}`}
          >
            <div className={`text-3xl leading-none ${has ? '' : 'opacity-40'}`}>{has ? e.emoji : '❓'}</div>
            <div className="text-[10px] font-black text-gray-500 mt-1 leading-tight" dir="rtl">{has ? e.titleHe : 'סוף סודי'}</div>
          </div>
        )
      })}
    </div>
  )
}

function Cover({ scene, story, found, onStart }: { scene: Scene; story: Story; found: string[]; onStart: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <StoryBackdrop place={story.coverPlace} places={scene.places}>
        <div className="absolute z-30 right-[6%] bottom-[6%] story-walk-in"><Character emoji="🧒" name="You" talking={false} /></div>
        <div className="absolute z-40 inset-x-0 top-[38%] flex justify-center pointer-events-none">
          <div className="bounce-in bg-white/95 rounded-2xl px-5 py-2 shadow-xl border-4 border-orange-300 text-center rotate-[-2deg]">
            <p className="font-display font-black text-2xl text-orange-600 leading-none">{story.title}</p>
            <p className="font-bold text-sm text-gray-500" dir="rtl">{story.titleHe}</p>
          </div>
        </div>
      </StoryBackdrop>
      <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 px-4 py-3" dir="rtl">
        <p className="font-black text-amber-900 mb-1">📖 סיפור שאתם בוחרים!</p>
        <ul className="text-sm font-bold text-amber-800 space-y-0.5 list-none">
          {story.introHe.map(l => <li key={l}>{l}</li>)}
          <li>🏆 יש {story.endings.length} סופים שונים. תגלו את כולם?</li>
        </ul>
      </div>
      <div>
        <p className="text-center text-xs font-black text-gray-400 mb-1.5" dir="rtl">הסופים שגיליתם: {found.length} / {story.endings.length}</p>
        <EndingSlots story={story} found={found} />
      </div>
      <button onClick={onStart} className="btn-kid bg-orange-500 w-full text-xl">
        📖 Start the story! <span className="text-sm block font-bold" dir="rtl">(מתחילים את הסיפור)</span>
      </button>
    </div>
  )
}

const CONFETTI_COLORS = ['#f97316', '#facc15', '#22c55e', '#3b82f6', '#ec4899', '#a855f7']

/** The pizzeria's hand-made ending pictures. */
function PizzaEndingArt({ ending, memory }: { ending: StoryEnding; memory: Record<string, string> }) {
  return (
    <>
      {ending.id === 'dishes' && [10, 30, 55, 75].map((x, i) => (
        <span key={x} className="story-bubble-rise text-3xl z-20" style={{ left: `${x}%`, bottom: '10%', animationDelay: `${i * 0.7}s` }}>🫧</span>
      ))}
      {ending.id === 'birthday' && <span className="absolute z-30 left-[42%] bottom-[18%] text-5xl story-pop-up">🎂</span>}
      {ending.id === 'birthday' && <span className="absolute z-30 left-[30%] top-[18%] text-4xl story-cloud">🎈</span>}
      {(ending.id === 'party' || ending.id === 'picnic') && (
        <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-[6%] story-pop-up"><PizzaView order={memory} size={92} /></div>
      )}
    </>
  )
}

function EndScreen({ scene, story, endingId, found, said, memory, picked, onAgain }: {
  scene: Scene
  story: Story
  endingId: string
  found: string[]
  said: number
  memory: Record<string, string>
  picked: Record<string, string>
  onAgain: () => void
}) {
  const ending = story.endings.find(e => e.id === endingId)!
  const all = found.length >= story.endings.length
  const isPizza = scene.result === 'pizza'
  const withChar = ending.withCharacter ?? ending.place !== 'park'
  const counter = placeHasCounter(ending.place, scene.places)
  return (
    <div className="flex flex-col gap-3">
      <StoryBackdrop place={ending.place} places={scene.places}>
        {CONFETTI_COLORS.flatMap((c, k) => [0, 1].map(j => (
          <span key={`${k}-${j}`} className="story-confetti z-50" style={{ left: `${8 + (k * 2 + j) * 7.5}%`, background: c, animationDelay: `${(k * 0.37 + j * 1.1) % 2.6}s` }} />
        )))}
        {withChar && (
          <div className={`absolute z-10 left-[6%] ${counter ? 'bottom-[14%]' : 'bottom-[22%]'} story-pop-up`}><Character emoji={scene.character.emoji} name={scene.character.name} talking={false} /></div>
        )}
        {counter && <div className="absolute inset-0 z-20 pointer-events-none"><PlaceCounter place={ending.place} places={scene.places} item={isPizza && ending.id === 'dishes' ? '🍽️' : undefined} /></div>}
        {isPizza && <PizzaEndingArt ending={ending} memory={memory} />}
        {ending.props?.map((p, i) => (
          <span key={i} className="absolute z-30 leading-none story-pop-up" style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.s ?? 40, animationDelay: `${0.2 + i * 0.1}s` }}>{p.e}</span>
        ))}
        {!isPizza && Object.keys(picked).length > 0 && (
          <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-[5%] flex gap-1">
            {Object.values(picked).map((e, i) => <span key={i} className="story-pop-up text-3xl drop-shadow" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>{e}</span>)}
          </div>
        )}
        <div className="absolute z-30 right-[6%] bottom-[4%] story-walk-in"><Character emoji="🧒" name="You" talking={false} /></div>
      </StoryBackdrop>

      <div className="bounce-in text-center rounded-3xl bg-white border-4 border-yellow-300 px-4 py-4 shadow">
        <p className="text-xs font-black tracking-widest text-gray-400">THE END</p>
        <div className="text-5xl my-1">{ending.emoji}</div>
        <p className="font-display font-black text-2xl text-orange-600 leading-none">{ending.title}</p>
        <p className="font-black text-gray-600" dir="rtl">{ending.titleHe}</p>
        <p className="font-bold text-sm text-gray-500 mt-1" dir="rtl">{ending.descHe}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-3" dir="rtl">
          <span className="rounded-full bg-sky-100 text-sky-700 font-black text-xs px-3 py-1">🗣️ אמרתם {said} משפטים באנגלית!</span>
          {memory.chef === 'yes' && (
            <span className="rounded-full bg-orange-100 text-orange-700 font-black text-xs px-3 py-1">
              {isPizza ? '👨‍🍳 שף מצטיין — אפיתם פיצה מושלמת' : '🏅 השלמתם את המשימה המיוחדת!'}
            </span>
          )}
        </div>
      </div>

      <div>
        <p className="text-center text-sm font-black text-gray-500 mb-1.5" dir="rtl">
          {all ? '🏆 גיליתם את כל הסופים! אלופים!' : `גיליתם ${found.length} מתוך ${story.endings.length} סופים — בחרו אחרת ותגלו סוף חדש!`}
        </p>
        <EndingSlots story={story} found={found} highlight={endingId} />
      </div>

      <StarOnComplete step="step7" onAgain={onAgain} />
    </div>
  )
}

// ── "Find it!" mini-game ────────────────────────────────────────────────────
/**
 * Tap the target emoji (event.count times) among gently floating decoys.
 * A wrong tap just wobbles. When all are found the character says the done line.
 */
function FindGame({ event, speak, onDone }: { event: FindEvent; speak: (l: StoryLine) => Promise<void>; onDone: () => void }) {
  const [items] = useState(() => {
    const pool = [
      ...Array.from({ length: event.count }, (_, i) => ({ id: `t${i}`, e: event.target, target: true })),
      ...event.decoys.slice(0, 9).map((e, i) => ({ id: `d${i}`, e, target: false })),
    ]
    return shuffle(pool).map((it, i) => ({ ...it, x: 6 + (i % 4) * 23 + Math.random() * 6, y: 8 + Math.floor(i / 4) * 30 + Math.random() * 6, d: Math.random() * 3 }))
  })
  const [got, setGot] = useState<Set<string>>(new Set())
  const [shake, setShake] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function tap(it: { id: string; target: boolean }) {
    if (done || got.has(it.id)) return
    if (!it.target) { setShake(it.id); setTimeout(() => setShake(null), 450); return }
    const next = new Set(got).add(it.id)
    setGot(next)
    if (next.size >= event.count) {
      setDone(true)
      await speak(event.doneLine)
      onDone()
    }
  }

  return (
    <div className="story-pop-up rounded-3xl bg-white border-4 border-orange-200 px-3 py-3 shadow">
      <div className="flex items-center justify-between mb-2" dir="rtl">
        <p className="font-black text-orange-700 text-sm">{event.promptHe}</p>
        <span className="font-black text-orange-600 text-sm whitespace-nowrap" dir="ltr">{event.target} {got.size} / {event.count}</span>
      </div>
      <div className="relative h-52 rounded-2xl bg-gradient-to-b from-sky-50 to-amber-50 border-2 border-sky-100 overflow-hidden">
        {items.map(it => (
          <button
            key={it.id}
            onClick={() => tap(it)}
            aria-label={it.target ? 'found it' : 'not this one'}
            className={`absolute text-4xl leading-none transition-all duration-300 animate-float ${got.has(it.id) ? 'scale-0 opacity-0' : 'active:scale-90'} ${shake === it.id ? 'shake' : ''}`}
            style={{ left: `${it.x}%`, top: `${it.y}%`, animationDelay: `${-it.d}s` }}
          >{it.e}</button>
        ))}
      </div>
    </div>
  )
}
