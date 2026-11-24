'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { KidOption, Scene } from '@/data/step7/types'
import { sayLine } from '@/utils/sceneAudio'
import { stopAudio } from '@/utils/audioPlayer'
import { shuffle } from '@/utils/shuffle'
import { FlipCard, ThinkPrompt, FlipButton, THINK_ASK_HE } from '@/components/step7/Flip'
import { composeMulti, sayMulti, multiValue, type MultiItem } from '@/components/step7/MultiPick'

/** What the customer says at a step: one answer, or a "pick several" order (said item by item). */
type CustomerAnswer = KidOption & { items?: MultiItem[]; closer?: string }
import { SceneStage, type Bubble } from '@/components/step7/SceneStage'
import { ResultView } from '@/components/step7/ResultView'
import { StarOnComplete } from '@/components/shared/StarOnComplete'

/**
 * Role swap: the child plays the character (Tony). They choose the right line
 * to say at each step (a silly one gets a funny reply from the customer), the
 * customer answers with a random order, and the child must then MAKE exactly
 * what the customer ordered — a real listening check.
 */
/** The previous round's customer conversation per scene (so the next round differs). */
const lastCustomer = new Map<string, string>()

export function RoleSwapGame({ scene, onAgain }: { scene: Scene; onAgain: () => void }) {
  const char = scene.character
  // The customer's answers, decided up front (one random correct option per step). "Try again"
  // gives a different conversation each round (owner, 2026-11-23): re-roll until it differs
  // from the previous round's.
  const customer = useMemo(() => {
    const roll = () => {
      const m: Record<string, CustomerAnswer> = {}
      for (const s of scene.steps) {
        if (s.multi) {
          // a random order of 1…max items (up to 3 when there's no max)
          const max = Math.min(s.multi.max ?? 3, s.multi.options.length)
          const items = shuffle([...s.multi.options]).slice(0, 1 + Math.floor(Math.random() * max))
          m[s.id] = { say: composeMulti(items, s.multi.closer), correct: true, pick: { slot: s.multi.slot, value: multiValue(items.map(i => i.value)) }, items, closer: s.multi.closer }
          continue
        }
        const correct = s.options.filter(o => o.correct)
        m[s.id] = correct[Math.floor(Math.random() * correct.length)]
      }
      return m
    }
    const sig = (m: Record<string, CustomerAnswer>) => Object.values(m).map(o => o.say).join('|')
    const prev = lastCustomer.get(scene.id)
    let m = roll()
    for (let i = 0; i < 30 && prev && sig(m) === prev; i++) m = roll()
    lastCustomer.set(scene.id, sig(m))
    return m
  }, [scene])
  const wanted = useMemo(() => {
    const o: Record<string, string> = {}
    for (const a of Object.values(customer)) if (a.pick) o[a.pick.slot] = a.pick.value
    return o
  }, [customer])

  const [started, setStarted] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [phase, setPhase] = useState<'pick' | 'make' | 'finished'>('pick')
  const [busy, setBusy] = useState(false)
  const [bubble, setBubble] = useState<Bubble | null>(null)
  const [talking, setTalking] = useState<'left' | 'right' | null>(null)
  const [wrong, setWrong] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState<string[]>([])
  const [made, setMade] = useState<Record<string, string>>({})
  const [showHint, setShowHint] = useState(false)
  /** The line to say starts face-down: think of your own question first, then flip (owner, all tabs). */
  const [revealed, setRevealed] = useState(false)
  const alive = useRef(true)
  useEffect(() => () => { alive.current = false; stopAudio() }, [])

  const step = scene.steps[stepIdx]
  // No silly line to choose any more (owner, 2026-11-24: no irrelevant answers in any tab)
  const lines = useMemo(() => [step.ask], [step])

  async function speak(side: 'left' | 'right', text: string) {
    setBubble({ side, text })
    setTalking(side)
    await sayLine(side === 'left' ? char.speaker : 'kid', text)
    if (alive.current) setTalking(null)
  }

  async function pickLine(text: string) {
    if (busy) return
    setBusy(true)
    setShowHint(false)
    await speak('left', text)
    if (!alive.current) return
    const reply = customer[step.id]
    if (reply.items) {
      setBubble({ side: 'right', text: reply.say })
      setTalking('right')
      await sayMulti(reply.items, reply.closer ?? 'please.', () => alive.current)
      if (alive.current) setTalking(null)
    } else {
      await speak('right', reply.say)
    }
    if (!alive.current) return
    setNotes(n => [...n, reply.say])
    if (step.id === scene.makeAfterStep) { setPhase('make'); setBusy(false); return }
    advance()
  }

  function advance() {
    const next = stepIdx + 1
    setWrong(new Set())
    setRevealed(false)
    if (next < scene.steps.length) { setStepIdx(next); setBusy(false) }
    else { setPhase('finished'); setBusy(false) }
  }

  async function serve() {
    if (busy) return
    setBusy(true)
    const right = scene.makeSlots.every(s => made[s.slot] === wanted[s.slot])
    await speak('right', right ? scene.lines.makeRight : scene.lines.makeWrong)
    if (!alive.current) return
    if (right) { setPhase('pick'); advance() } else setBusy(false)
  }

  if (phase === 'finished') {
    return (
      <div className="text-center bounce-in">
        <div className="text-5xl mb-1">{char.emoji}🎉</div>
        <p className="font-display font-bold text-2xl text-orange-600 mb-1">{scene.ui.swapDoneEn}</p>
        <p className="font-bold text-gray-500 mb-4" dir="rtl">{scene.ui.swapDoneHe}</p>
        <ResultView scene={scene} order={wanted} />
        <StarOnComplete step="step7" onAgain={onAgain} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <SceneStage
        scene={scene}
        left={{ emoji: char.emoji, name: `${char.name} (You)` }}
        right={{ emoji: '🧒', name: scene.ui.customerName }}
        bubble={bubble}
        talking={talking}
      />

      {!started ? (
        <div className="text-center">
          <p className="font-bold text-gray-600 mb-3" dir="rtl">
            {scene.ui.introHe.swap}
          </p>
          <button onClick={() => setStarted(true)} className="btn-kid bg-orange-500 w-full text-xl">
            {char.emoji} {scene.ui.swapStartEn} <span className="text-sm block font-bold" dir="rtl">({scene.ui.swapStartHe})</span>
          </button>
        </div>
      ) : (
        <>
          {notes.length > 0 && (
            <div className="rounded-2xl bg-yellow-50 border-2 border-yellow-200 px-3 py-2" dir="ltr">
              <p className="text-xs font-black text-yellow-700 mb-1" dir="rtl">📝 מה הלקוח אמר:</p>
              {notes.map((n, i) => <p key={i} className="text-sm font-bold text-gray-700">“{n}”</p>)}
            </div>
          )}

          {phase === 'make' ? (
            <div className="flex flex-col gap-3">
              <p className="text-center font-black text-orange-600" dir="rtl">{scene.ui.makeTitleHe}</p>
              {scene.makeSlots.map(slot => (
                <div key={slot.slot}>
                  <p className="text-sm font-black text-gray-500 mb-1" dir="rtl">{slot.titleHe}</p>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {slot.choices.map(c => (
                      <button
                        key={c.value}
                        onClick={() => setMade(m => {
                          if (!slot.multi) return { ...m, [slot.slot]: c.value }
                          const cur = (m[slot.slot] ?? '').split(',').filter(Boolean)
                          const next = cur.includes(c.value) ? cur.filter(v => v !== c.value) : [...cur, c.value]
                          return { ...m, [slot.slot]: multiValue(next) }
                        })}
                        className={`flex flex-col items-center rounded-2xl border-4 px-2.5 py-1.5 min-w-[74px] transition-all
                          ${(slot.multi ? (made[slot.slot] ?? '').split(',').includes(c.value) : made[slot.slot] === c.value) ? 'border-orange-500 bg-orange-100 scale-105' : 'border-orange-200 bg-white'}`}
                      >
                        <span className="text-3xl leading-none">{c.icon}</span>
                        <span className="text-xs font-black text-gray-700 mt-1">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <ResultView scene={scene} order={made} compact />
              <button
                onClick={serve}
                disabled={busy || scene.makeSlots.some(s => !made[s.slot])}
                className="btn-kid bg-green-500 w-full disabled:opacity-40"
              >
                {scene.emoji} {scene.ui.serveEn} <span className="text-xs block" dir="rtl">({scene.ui.serveHe})</span>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between" dir="rtl">
                <span className="text-xs font-black text-gray-400">{scene.ui.swapAskHe}</span>
                <button
                  onClick={() => setShowHint(h => !h)}
                  className="text-sm font-black rounded-full px-3 py-1 bg-amber-100 text-amber-700 border-2 border-amber-200"
                >💡 רמז</button>
              </div>
              {showHint && (
                <p className="bounce-in bg-amber-50 border-2 border-amber-200 rounded-2xl px-3 py-2 font-bold text-amber-800 text-sm" dir="rtl">
                  {step.swapHintHe}
                </p>
              )}
              {!revealed && <ThinkPrompt text={THINK_ASK_HE} />}
              <div className="flex flex-col gap-2" dir="ltr">
                {lines.map((text, i) => {
                  const isWrong = wrong.has(text)
                  return (
                    <FlipCard key={step.id + text} revealed={revealed} onReveal={() => setRevealed(true)} delay={i * 140}>
                    <button
                      onClick={() => pickLine(text)}
                      disabled={busy || isWrong || !revealed}
                      className={`w-full text-left rounded-2xl border-4 px-4 py-3 font-bold text-[17px] transition-all
                        ${isWrong ? 'border-gray-200 bg-gray-50 text-gray-300 line-through' : 'border-orange-200 bg-white text-gray-800 active:scale-[0.98] hover:border-orange-400'}`}
                    >
                      {char.emoji} {text}
                    </button>
                    </FlipCard>
                  )
                })}
              </div>
              {!revealed && <FlipButton one={lines.length === 1} onClick={() => setRevealed(true)} />}
              <p className="text-center text-xs font-bold text-gray-400" dir="rtl">🗣️ {scene.ui.swapSayHe}</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
