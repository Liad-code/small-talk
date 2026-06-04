'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const DAY_PAIRS = [
  { en: 'Sunday',    he: 'יום ראשון' },
  { en: 'Monday',    he: 'יום שני' },
  { en: 'Tuesday',   he: 'יום שלישי' },
  { en: 'Wednesday', he: 'יום רביעי' },
  { en: 'Thursday',  he: 'יום חמישי' },
  { en: 'Friday',    he: 'יום שישי' },
  { en: 'Saturday',  he: 'שבת' },
]

export function DaysEnHeMatch({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [shuffledEn] = useState(() => shuffle([...DAY_PAIRS]))
  const [shuffledHe] = useState(() => shuffle([...DAY_PAIRS]))
  const [sel, setSel] = useState<string | null>(null)
  const [selSide, setSelSide] = useState<'en' | 'he' | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function attemptMatch(enA: string, enB: string) {
    if (enA === enB) {
      const next = new Set(matched); next.add(enA)
      setMatched(next)
      setSel(null); setSelSide(null)
      if (next.size === DAY_PAIRS.length) { setDone(true); setTimeout(onComplete, 600) }
    } else {
      setWrongFlash(enA + '|' + enB)
      setTimeout(() => { setWrongFlash(null); setSel(null); setSelSide(null) }, 600)
    }
  }

  function handleEnClick(en: string) {
    if (matched.has(en)) return
    speak(en, 0.8)
    if (selSide === 'he' && sel) { attemptMatch(en, sel); return }
    if (sel === en && selSide === 'en') { setSel(null); setSelSide(null); return }
    setSel(en); setSelSide('en')
  }

  function handleHeClick(en: string) {
    if (matched.has(en)) return
    if (selSide === 'en' && sel) { attemptMatch(sel, en); return }
    if (sel === en && selSide === 'he') { setSel(null); setSelSide(null); return }
    setSel(en); setSelSide('he')
  }

  function handleAgain() {
    setSel(null); setSelSide(null)
    setMatched(new Set()); setWrongFlash(null); setDone(false)
  }

  const isEnWrong = (en: string) => wrongFlash?.startsWith(en + '|') ?? false
  const isHeWrong = (en: string) => wrongFlash?.endsWith('|' + en) ?? false

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        לחץ על היום באנגלית ואז על השם בעברית — או להפך
      </p>

      <div className="flex gap-3">
        {/* English column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledEn.map(item => {
            const isMatched = matched.has(item.en)
            const isSelected = sel === item.en && selSide === 'en'
            const isWrong = isEnWrong(item.en)
            return (
              <button
                key={item.en}
                onClick={() => !isMatched && handleEnClick(item.en)}
                disabled={isMatched}
                className={`
                  py-3 px-3 rounded-xl border-4 font-display font-black text-lg text-center
                  transition-all duration-150 cursor-pointer select-none min-h-[56px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-900' : ''}
                  ${isSelected ? 'bg-amber-300 border-amber-600 text-amber-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200 hover:scale-105' : ''}
                `}
              >
                {item.en}
              </button>
            )
          })}
        </div>

        {/* Hebrew column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledHe.map(item => {
            const isMatched = matched.has(item.en)
            const isSelected = sel === item.en && selSide === 'he'
            const isWrong = isHeWrong(item.en)
            return (
              <button
                key={item.en}
                onClick={() => !isMatched && handleHeClick(item.en)}
                disabled={isMatched}
                dir="rtl"
                className={`
                  py-3 px-3 rounded-xl border-4 font-bold text-lg text-center
                  transition-all duration-150 cursor-pointer select-none min-h-[56px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-900' : ''}
                  ${isSelected ? 'bg-amber-300 border-amber-600 text-amber-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                  ${!isMatched && !isSelected && !isWrong ? 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200 hover:scale-105' : ''}
                `}
              >
                {item.he}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-white font-bold text-sm">
        {matched.size}/{DAY_PAIRS.length} ✓
      </div>

      {done && (
        <div className="text-center mt-4">
          <button onClick={handleAgain} className="btn-kid bg-amber-500">
            🔁 Again
          </button>
        </div>
      )}
    </div>
  )
}
