'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Story, StoryChoice, StoryLine } from '@/data/step7/types'
import { sayLine } from '@/utils/sceneAudio'
import { stopAudio } from '@/utils/audioPlayer'
import { shuffle } from '@/utils/shuffle'
import { StoryBackdrop, CounterFront } from '@/components/step7/StoryBackdrop'
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
type Step = 'talk' | 'choose' | 'speak' | 'event'

const ENDINGS_KEY = 'smalltalk_step7_endings'
function loadFound(storyId: string): string[] {
  try { return JSON.parse(localStorage.getItem(`${ENDINGS_KEY}_${storyId}`) ?? '[]') } catch { return [] }
}
function saveFound(storyId: string, ids: string[]) {
  try { localStorage.setItem(`${ENDINGS_KEY}_${storyId}`, JSON.stringify(ids)) } catch { /* private mode: fine */ }
}

export function StoryGame({ story, onAgain }: { story: Story; onAgain: () => void }) {
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
  const [found, setFound] = useState<string[]>([])
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
    await sayLine(side === 'left' ? 'tony' : 'kid', line.text)
    if (alive.current) setTalking(null)
  }

  async function enterNode(id: string) {
    const n = byId.get(id)!
    setNodeId(id)
    setWrong(new Set())
    setSoldOut(null)
    setStep('talk')
    if (n.place !== 'street') setCharVisible(true)
    if (n.lines.length === 0) setBubble(null)
    for (const line of n.lines) {
      await speak('left', line)
      if (!alive.current) return
    }
    if (!alive.current) return
    setStep(n.event ? 'event' : 'choose')
  }

  function start() {
    setPhase('play')
    setMemory({})
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
      await speak('left', story.extra.soldOut)
      if (alive.current) setStep('choose')
      return
    }
    const mem = { ...memory, ...(c.set ?? {}) }
    setMemory(mem)
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

  function ovenDone() {
    setMemory(m => ({ ...m, chef: 'yes' }))
    void enterNode(node.next!)
  }

  // Choices for this moment: a stable shuffle per node (some correct + the silly ones)
  const choices = useMemo(() => {
    const all = node.choices ?? []
    const good = all.filter(c => !c.silly)
    const silly = all.filter(c => c.silly)
    const shown = node.showChoices ? shuffle([...good]).slice(0, node.showChoices) : good
    return shuffle([...shown, ...silly])
  }, [node])

  if (phase === 'cover') return <Cover story={story} found={found} onStart={start} />
  if (phase === 'end' && endingId) {
    return <EndScreen story={story} endingId={endingId} found={found} said={said} memory={memory} onAgain={onAgain} />
  }

  const showTony = charVisible
  const hasCounter = node.place === 'counter' || node.place === 'kitchen'

  return (
    <div className="flex flex-col gap-3">
      <ChapterMap story={story} current={node.chapter} />

      <StoryBackdrop place={node.place}>
        {/* Tony */}
        {showTony && (
          <div
            key={node.place === 'street' ? 'door' : 'in'}
            className={`absolute z-10 story-pop-up ${node.place === 'street' ? 'left-[44%] bottom-[18%]' : hasCounter ? 'left-[6%] bottom-[14%]' : node.place === 'oven' ? 'left-[3%] bottom-[8%]' : 'left-[8%] bottom-[22%]'}`}
          >
            <Character emoji="👨‍🍳" name="Tony" talking={talking === 'left'} />
          </div>
        )}
        {hasCounter && <div className="absolute inset-0 z-20 pointer-events-none"><CounterFront kitchen={node.place === 'kitchen'} item={nodeId === 'end-dishes' ? '🍽️' : undefined} /></div>}
        {/* the pizza being made */}
        {memory.size && (hasCounter || node.place === 'table') && (
          <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-[6%] pointer-events-none story-pop-up">
            <PizzaView order={memory} size={node.place === 'table' ? 96 : 76} bake={node.chapter < 4 ? 'raw' : undefined} />
          </div>
        )}
        {node.place === 'table' && memory.birthday === 'yes' && nodeId === 'end-birthday' && (
          <span className="absolute z-40 left-1/2 -translate-x-1/2 bottom-[30%] text-4xl story-pop-up">🕯️</span>
        )}
        {node.place === 'oven' && step === 'event' && <OvenPizza memory={memory} />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" dir="ltr">
          {choices.map((c, i) => {
            const isWrong = wrong.has(c.say)
            const isSoldOut = soldOut === c.say
            const off = isWrong || isSoldOut
            return (
              <button
                key={c.say}
                onClick={() => choose(c)}
                disabled={off}
                className={`story-pop-up relative flex items-center gap-3 text-left rounded-2xl border-4 px-3 py-2.5 transition-all
                  ${off ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-orange-200 bg-white hover:border-orange-400 active:scale-[0.97] shadow-sm'}`}
                style={{ animationDelay: `${i * 0.07}s` }}
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
            )
          })}
        </div>
      )}

      {step === 'event' && node.event === 'oven' && <OvenGame story={story} speak={l => speak('left', l)} onDone={ovenDone} memory={memory} />}

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

function OvenGame({ story, speak, onDone, memory }: {
  story: Story
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
      await speak(story.extra.ovenEarly)
      setPaused(false)
    } else if (h <= GOLD_TO) {
      await speak(story.extra.ovenPerfect)
      onDone()
    } else {
      await speak(story.extra.ovenBurnt)
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

function Cover({ story, found, onStart }: { story: Story; found: string[]; onStart: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <StoryBackdrop place="street">
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
          <li>🗨️ טוני מדבר — ואתם בוחרים מה לענות.</li>
          <li>🔀 כל בחירה משנה את הסיפור.</li>
          <li>🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!</li>
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

function EndScreen({ story, endingId, found, said, memory, onAgain }: {
  story: Story
  endingId: string
  found: string[]
  said: number
  memory: Record<string, string>
  onAgain: () => void
}) {
  const ending = story.endings.find(e => e.id === endingId)!
  const all = found.length >= story.endings.length
  return (
    <div className="flex flex-col gap-3">
      <StoryBackdrop place={ending.place}>
        {CONFETTI_COLORS.flatMap((c, k) => [0, 1].map(j => (
          <span key={`${k}-${j}`} className="story-confetti z-50" style={{ left: `${8 + (k * 2 + j) * 7.5}%`, background: c, animationDelay: `${(k * 0.37 + j * 1.1) % 2.6}s` }} />
        )))}
        {ending.id === 'dishes' && [10, 30, 55, 75].map((x, i) => (
          <span key={x} className="story-bubble-rise text-3xl z-20" style={{ left: `${x}%`, bottom: '10%', animationDelay: `${i * 0.7}s` }}>🫧</span>
        ))}
        {ending.place !== 'park' && (
          <div className={`absolute z-10 left-[6%] ${ending.place === 'kitchen' ? 'bottom-[14%]' : 'bottom-[22%]'} story-pop-up`}><Character emoji="👨‍🍳" name="Tony" talking={false} /></div>
        )}
        {ending.place === 'kitchen' && <div className="absolute inset-0 z-20 pointer-events-none"><CounterFront kitchen item="🍽️" /></div>}
        {ending.id === 'birthday' && <span className="absolute z-30 left-[42%] bottom-[18%] text-5xl story-pop-up">🎂</span>}
        {ending.id === 'birthday' && <span className="absolute z-30 left-[30%] top-[18%] text-4xl story-cloud">🎈</span>}
        {(ending.id === 'party' || ending.id === 'picnic') && (
          <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-[6%] story-pop-up"><PizzaView order={memory} size={92} /></div>
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
          {memory.chef === 'yes' && <span className="rounded-full bg-orange-100 text-orange-700 font-black text-xs px-3 py-1">👨‍🍳 שף מצטיין — אפיתם פיצה מושלמת</span>}
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

