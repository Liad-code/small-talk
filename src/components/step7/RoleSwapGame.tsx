'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { KidOption, Scene } from '@/data/step7/types'
import { sayLine } from '@/utils/sceneAudio'
import { stopAudio } from '@/utils/audioPlayer'
import { shuffle } from '@/utils/shuffle'
import { SceneStage, type Bubble } from '@/components/step7/SceneStage'
import { ResultView } from '@/components/step7/ResultView'
import { StarOnComplete } from '@/components/shared/StarOnComplete'

/**
 * Role swap: the child plays the character (Tony). They choose the right line
 * to say at each step (a silly one gets a funny reply from the customer), the
 * customer answers with a random order, and the child must then MAKE exactly
 * what the customer ordered — a real listening check.
 */
export function RoleSwapGame({ scene, onAgain }: { scene: Scene; onAgain: () => void }) {
  const char = scene.character
  // The customer's answers, decided up front (one random correct option per step)
  const customer = useMemo(() => {
    const m: Record<string, KidOption> = {}
    for (const s of scene.steps) {
      const correct = s.options.filter(o => o.correct)
      m[s.id] = correct[Math.floor(Math.random() * correct.length)]
    }
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
  const alive = useRef(true)
  useEffect(() => () => { alive.current = false; stopAudio() }, [])

  const step = scene.steps[stepIdx]
  const lines = useMemo(() => shuffle([step.ask, step.swapSilly.say]), [step])

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
    if (text !== step.ask) {
      await speak('right', step.swapSilly.reaction)
      if (!alive.current) return
      setWrong(w => new Set(w).add(text))
      setBusy(false)
      return
    }
    const reply = customer[step.id]
    await speak('right', reply.say)
    if (!alive.current) return
    setNotes(n => [...n, reply.say])
    if (step.id === scene.makeAfterStep) { setPhase('make'); setBusy(false); return }
    advance()
  }

  function advance() {
    const next = stepIdx + 1
    setWrong(new Set())
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
                        onClick={() => setMade(m => ({ ...m, [slot.slot]: c.value }))}
                        className={`flex flex-col items-center rounded-2xl border-4 px-2.5 py-1.5 min-w-[74px] transition-all
                          ${made[slot.slot] === c.value ? 'border-orange-500 bg-orange-100 scale-105' : 'border-orange-200 bg-white'}`}
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
              <div className="flex flex-col gap-2" dir="ltr">
                {lines.map(text => {
                  const isWrong = wrong.has(text)
                  return (
                    <button
                      key={text}
                      onClick={() => pickLine(text)}
                      disabled={busy || isWrong}
                      className={`w-full text-left rounded-2xl border-4 px-4 py-3 font-bold text-[17px] transition-all
                        ${isWrong ? 'border-gray-200 bg-gray-50 text-gray-300 line-through' : 'border-orange-200 bg-white text-gray-800 active:scale-[0.98] hover:border-orange-400'}`}
                    >
                      {char.emoji} {text}
                    </button>
                  )
                })}
              </div>
              <p className="text-center text-xs font-bold text-gray-400" dir="rtl">🗣️ {scene.ui.swapSayHe}</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
