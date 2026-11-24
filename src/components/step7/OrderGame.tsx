'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { KidOption, Scene } from '@/data/step7/types'
import { sayLine } from '@/utils/sceneAudio'
import { stopAudio } from '@/utils/audioPlayer'
import { shuffle } from '@/utils/shuffle'
import { SceneStage, type Bubble } from '@/components/step7/SceneStage'
import { ResultView } from '@/components/step7/ResultView'
import { StarOnComplete } from '@/components/shared/StarOnComplete'
import { MultiPicker, composeMulti, sayMulti, multiValue, type MultiItem } from '@/components/step7/MultiPick'

/**
 * Order / Build modes. The character asks, the child answers by choosing the
 * sentence (choose) or tapping its words in order (build), the line is spoken
 * in the child's voice while they say it aloud, and the character reacts.
 * Silly answers get a funny reply and a retry — never a red ✗.
 */
export function OrderGame({ scene, mode, onAgain }: { scene: Scene; mode: 'choose' | 'build'; onAgain: () => void }) {
  const [started, setStarted] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [order, setOrder] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [bubble, setBubble] = useState<Bubble | null>(null)
  const [talking, setTalking] = useState<'left' | 'right' | null>(null)
  const [sayAloud, setSayAloud] = useState(false)
  const [wrong, setWrong] = useState<Set<string>>(new Set())
  const [showHint, setShowHint] = useState(false)
  const [finished, setFinished] = useState(false)
  // Order mode: the answer cards start face-down so the child thinks of their own answer first
  const [revealed, setRevealed] = useState(false)
  const alive = useRef(true)
  useEffect(() => () => { alive.current = false; stopAudio() }, [])

  const step = scene.steps[stepIdx]
  const char = scene.character

  // Order mode: which options to show this step — relevant answers only (owner, 2026-11-23/24:
  // no silly answers in any tab), stable per step
  const options = useMemo(() => {
    const correct = step.options.filter(o => o.correct)
    const shown = step.showCorrect ? shuffle([...correct]).slice(0, step.showCorrect) : correct
    return shuffle([...shown])
  }, [step])
  /** Build mode, "pick several" step: the items picked before building the sentence. */
  const [buildItems, setBuildItems] = useState<MultiItem[] | null>(null)

  async function speak(side: 'left' | 'right', text: string) {
    setBubble({ side, text })
    setTalking(side)
    await sayLine(side === 'left' ? char.speaker : 'kid', text)
    if (alive.current) setTalking(null)
  }

  async function begin() {
    setStarted(true)
    setBusy(true)
    await speak('left', scene.steps[0].ask)
    if (alive.current) setBusy(false)
  }

  /** A "pick several" answer: the composed sentence, said item by item. */
  function multiAnswer(items: MultiItem[]) {
    const m = step.multi!
    return {
      option: { say: composeMulti(items, m.closer), correct: true, pick: { slot: m.slot, value: multiValue(items.map(i => i.value)) } } as KidOption,
      audio: () => sayMulti(items, m.closer, () => alive.current),
    }
  }

  async function answer(o: KidOption, audio?: () => Promise<void>) {
    if (busy) return
    setBusy(true)
    setShowHint(false)
    setSayAloud(true)
    if (audio) {
      setBubble({ side: 'right', text: o.say })
      setTalking('right')
      await audio()
      if (alive.current) setTalking(null)
    } else {
      await speak('right', o.say)
    }
    if (!alive.current) return
    setSayAloud(false)
    if (!o.correct) {
      await speak('left', o.reaction ?? 'Try again!')
      if (!alive.current) return
      setWrong(w => new Set(w).add(o.say))
      setBusy(false)
      return
    }
    const nextOrder = o.pick ? { ...order, [o.pick.slot]: o.pick.value } : order
    setOrder(nextOrder)
    const next = stepIdx + 1
    if (next < scene.steps.length) {
      setStepIdx(next)
      setWrong(new Set())
      setRevealed(false)
      setBuildItems(null)
      await speak('left', scene.steps[next].ask)
      if (alive.current) setBusy(false)
    } else {
      await speak('left', scene.lines.farewell)
      if (alive.current) { setFinished(true); setBusy(false) }
    }
  }

  if (finished) {
    return (
      <div className="text-center bounce-in">
        <div className="text-5xl mb-1">🎉</div>
        <p className="font-display font-bold text-2xl text-orange-600 mb-1">{scene.ui.doneEn}</p>
        <p className="font-bold text-gray-500 mb-4" dir="rtl">{scene.ui.doneHe}</p>
        <ResultView scene={scene} order={order} />
        <StarOnComplete step="step7" onAgain={onAgain} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <SceneStage
        scene={scene}
        left={{ emoji: char.emoji, name: char.name }}
        right={{ emoji: '🧒', name: 'You' }}
        bubble={bubble}
        talking={talking}
      />

      {started && Object.keys(order).length > 0 && <ResultView scene={scene} order={order} compact />}

      {!started ? (
        <button onClick={begin} className="btn-kid bg-orange-500 w-full text-xl">
          {scene.emoji} {scene.ui.startEn} <span className="text-sm block font-bold" dir="rtl">({scene.ui.startHe})</span>
        </button>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2" dir="rtl">
            <span className="text-xs font-black text-gray-400">שלב {stepIdx + 1} מתוך {scene.steps.length}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHint(h => !h)}
                className="text-sm font-black rounded-full px-3 py-1 bg-amber-100 text-amber-700 border-2 border-amber-200"
              >💡 רמז</button>
              <button
                onClick={() => !busy && bubble && speak(bubble.side, bubble.text)}
                disabled={busy || !bubble}
                className="text-sm font-black rounded-full px-3 py-1 bg-sky-100 text-sky-700 border-2 border-sky-200 disabled:opacity-40"
              >🔊 שוב</button>
            </div>
          </div>

          {showHint && (
            <p className="bounce-in bg-amber-50 border-2 border-amber-200 rounded-2xl px-3 py-2 font-bold text-amber-800 text-sm" dir="rtl">
              {step.hintHe}
            </p>
          )}

          {sayAloud && (
            <p className="bounce-in text-center font-black text-sky-600" dir="rtl">🗣️ אמרו את המשפט בקול, יחד איתי!</p>
          )}

          {step.multi && mode === 'choose' ? (
            !revealed ? (
              <>
                <p className="bounce-in text-center font-black text-violet-700 bg-violet-50 border-2 border-violet-200 rounded-2xl px-3 py-2 text-[15px]" dir="rtl">
                  🤔 מה הייתם עונים? חשבו על תשובה משלכם ואמרו אותה בקול — ואז הפכו את הכרטיסים!
                </p>
                <div className="grid grid-cols-4 gap-2" dir="ltr">
                  {step.multi.options.map((o, i) => (
                    <button key={o.value} type="button" onClick={() => setRevealed(true)}
                      className="story-pop-up h-16 rounded-2xl border-4 border-violet-300 text-white font-black shadow bg-[repeating-linear-gradient(45deg,#8b5cf6_0_12px,#7c3aed_12px_24px)]"
                      style={{ animationDelay: `${i * 0.04}s` }} aria-label="קלף הפוך">❓</button>
                  ))}
                </div>
                <button onClick={() => setRevealed(true)} className="btn-kid bg-violet-500 w-full text-lg" dir="rtl">🔄 הפכו את הכרטיסים</button>
              </>
            ) : (
              <MultiPicker key={step.id} items={step.multi.options} max={step.multi.max} promptHe={step.multi.promptHe} disabled={busy}
                onConfirm={items => { const a = multiAnswer(items); void answer(a.option, a.audio) }} />
            )
          ) : step.multi && mode === 'build' && !buildItems ? (
            <MultiPicker key={step.id} items={step.multi.options} max={step.multi.max} promptHe={step.multi.promptHe} confirmHe="✓ עכשיו בונים את המשפט" disabled={busy}
              onConfirm={items => setBuildItems(items)} />
          ) : step.multi && mode === 'build' && buildItems ? (
            <BuildAnswer key={`${step.id}-${multiAnswer(buildItems).option.say}`} options={[multiAnswer(buildItems).option]} distractor={step.distractorWord} busy={busy}
              onDone={() => { const a = multiAnswer(buildItems); void answer(a.option, a.audio) }} />
          ) : mode === 'choose' ? (
            <>
              {!revealed && (
                <p className="bounce-in text-center font-black text-violet-700 bg-violet-50 border-2 border-violet-200 rounded-2xl px-3 py-2 text-[15px]" dir="rtl">
                  🤔 מה הייתם עונים? חשבו על תשובה משלכם ואמרו אותה בקול — ואז הפכו את הכרטיסים!
                </p>
              )}
              <div className="flex flex-col gap-2" dir="ltr">
                {options.map((o, i) => {
                  const isWrong = wrong.has(o.say)
                  return (
                    <div key={step.id + o.say} className="flip-card">
                      <div className={`flip-inner ${revealed ? 'flipped' : ''}`} style={{ transitionDelay: revealed ? `${i * 140}ms` : '0ms' }}>
                        {/* face-down side */}
                        <button
                          onClick={() => setRevealed(true)}
                          disabled={revealed}
                          aria-hidden={revealed}
                          tabIndex={revealed ? -1 : 0}
                          className="flip-face w-full rounded-2xl border-4 border-violet-300 px-4 py-3 font-black text-[17px] text-white shadow-md
                            bg-[repeating-linear-gradient(45deg,#8b5cf6_0_14px,#7c3aed_14px_28px)] active:scale-[0.98]"
                        >
                          <span className="inline-block drop-shadow">❓ ❓ ❓</span>
                        </button>
                        {/* answer side */}
                        <button
                          onClick={() => answer(o)}
                          disabled={!revealed || busy || isWrong}
                          aria-hidden={!revealed}
                          tabIndex={revealed ? 0 : -1}
                          className={`flip-face flip-answer w-full text-left rounded-2xl border-4 px-4 py-3 font-bold text-[17px] transition-colors
                            ${isWrong ? 'border-gray-200 bg-gray-50 text-gray-300 line-through' : 'border-sky-200 bg-white text-gray-800 hover:border-sky-400'}
                            disabled:cursor-default`}
                        >
                          🧒 {o.say}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              {!revealed && (
                <button onClick={() => setRevealed(true)} className="btn-kid bg-violet-500 w-full text-lg" dir="rtl">
                  🔄 הפכו את הכרטיסים
                </button>
              )}
            </>
          ) : (
            <BuildAnswer key={step.id} options={step.options} distractor={step.distractorWord} busy={busy} onDone={answer} />
          )}
        </>
      )}
    </div>
  )
}

/**
 * Build mode: pick what you want (when there is a choice), then tap the words
 * in order. A wrong word just wobbles — same gentle style as the rest of the site.
 */
function BuildAnswer({ options, distractor, busy, onDone }: {
  options: KidOption[]
  distractor: string
  busy: boolean
  onDone: (o: KidOption) => void
}) {
  const correct = options.filter(o => o.correct)
  const [choice, setChoice] = useState<KidOption | null>(correct.length === 1 ? correct[0] : null)
  const words = useMemo(() => (choice ? choice.say.split(' ') : []), [choice])
  const [tiles] = useState(() => new Map<string, { id: number; text: string }[]>())
  const pool = useMemo(() => {
    if (!choice) return []
    const cached = tiles.get(choice.say)
    if (cached) return cached
    const t = shuffle([...words, distractor].map((text, id) => ({ id, text })))
    tiles.set(choice.say, t)
    return t
  }, [choice, words, distractor, tiles])
  const [used, setUsed] = useState<number[]>([])
  const [shakeId, setShakeId] = useState<number | null>(null)

  if (!choice) {
    return (
      <div>
        <p className="text-center font-black text-gray-500 text-sm mb-2" dir="rtl">מה תבחרו?</p>
        <div className="flex flex-wrap justify-center gap-2" dir="ltr">
          {correct.map(o => (
            <button
              key={o.say}
              onClick={() => setChoice(o)}
              className="flex flex-col items-center rounded-2xl border-4 border-orange-200 bg-white px-3 py-2 min-w-[84px] active:scale-95"
            >
              <span className="text-4xl leading-none">{o.icon}</span>
              <span className="text-sm font-black text-gray-700 mt-1">{o.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const placed = used.map(id => pool.find(t => t.id === id)!.text)

  function tap(tile: { id: number; text: string }) {
    if (busy || used.includes(tile.id)) return
    if (tile.text === words[used.length]) {
      const next = [...used, tile.id]
      setUsed(next)
      if (next.length === words.length) onDone(choice!)
    } else {
      setShakeId(tile.id)
      setTimeout(() => setShakeId(null), 450)
    }
  }

  return (
    <div className="flex flex-col gap-3" dir="ltr">
      {/* the sentence being built */}
      <div className="min-h-[56px] rounded-2xl border-4 border-dashed border-sky-300 bg-sky-50 px-3 py-2 flex flex-wrap gap-1.5 items-center">
        {placed.length === 0 && <span className="text-sky-300 font-bold text-sm" dir="rtl">הקישו על המילים לפי הסדר…</span>}
        {placed.map((w, i) => (
          <span key={i} className="bounce-in rounded-xl bg-sky-500 text-white font-black px-2.5 py-1 text-[17px]">{w}</span>
        ))}
      </div>
      {/* word tiles */}
      <div className="flex flex-wrap justify-center gap-2">
        {pool.map(t => (
          <button
            key={t.id}
            onClick={() => tap(t)}
            disabled={busy || used.includes(t.id)}
            className={`rounded-xl border-4 px-3 py-2 font-black text-[17px] transition-all
              ${used.includes(t.id) ? 'opacity-0 pointer-events-none' : 'border-orange-200 bg-white text-gray-800 active:scale-95'}
              ${shakeId === t.id ? 'shake border-red-300' : ''}`}
          >
            {t.text}
          </button>
        ))}
      </div>
    </div>
  )
}
