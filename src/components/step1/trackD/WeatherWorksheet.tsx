'use client'
import { useState } from 'react'

const WEATHER_ICONS = [
  { label: 'Sunny',  emoji: '☀️'  },
  { label: 'Rainy',  emoji: '🌧️' },
  { label: 'Snowy',  emoji: '❄️'  },
  { label: 'Cloudy', emoji: '☁️'  },
]

const DAY_ACTIVITIES = [
  { label: 'Wake Up',          emoji: '⏰' },
  { label: 'Brush your teeth', emoji: '🦷' },
  { label: 'Go School',        emoji: '🏫' },
  { label: 'Bath',             emoji: '🛁' },
  { label: 'Run',              emoji: '🏃' },
  { label: 'Play',             emoji: '🎮' },
]

const NIGHT_ACTIVITIES = [
  { label: 'Sleep',            emoji: '😴' },
  { label: 'Brush your teeth', emoji: '🦷' },
  { label: 'Wake Up',          emoji: '⏰' },
  { label: 'Play',             emoji: '🎮' },
  { label: 'Read Story',       emoji: '📖' },
  { label: 'Tie Shoe Lace',    emoji: '👟' },
]

export function WeatherWorksheet({ onComplete }: { onComplete: () => void }) {
  const [sheet, setSheet] = useState<1 | 2>(1)

  function handlePrint() {
    onComplete()
    window.print()
  }

  return (
    <div className="max-w-lg mx-auto pb-16">
      {/* Sheet tabs */}
      <div className="flex gap-2 mb-3 justify-center flex-wrap">
        <button
          onClick={() => setSheet(1)}
          className={`px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 1 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >🌤️ Worksheet 1</button>
        <button
          onClick={() => setSheet(2)}
          className={`px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 2 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >🌙 Worksheet 2</button>
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer bg-yellow-300 border-yellow-500 text-yellow-900 hover:bg-yellow-200 transition-all"
        >🖨️ Print</button>
      </div>

      {/* ── Worksheet 1: Weather ── */}
      {sheet === 1 && (
        <div className="bg-white rounded-2xl border-4 border-gray-300 p-4 shadow-lg">
          <h2 className="text-center font-display font-black text-xl mb-3 text-gray-800">Weather Worksheet</h2>
          {/* Icon reference row */}
          <div className="grid grid-cols-4 border-2 border-gray-400 rounded-lg overflow-hidden mb-4">
            {WEATHER_ICONS.map((w, i) => (
              <div
                key={w.label}
                className={`flex flex-col items-center py-2 px-1 ${i < 3 ? 'border-r-2 border-gray-400' : ''}`}
              >
                <span className="text-3xl">{w.emoji}</span>
                <span className="text-xs font-bold text-gray-600 mt-0.5">{w.label}</span>
              </div>
            ))}
          </div>
          {/* House boxes — students draw the weather */}
          <p className="text-center text-xs font-bold text-gray-500 mb-3" dir="rtl">
            צייר את מזג האוויר המתאים בכל ריבוע
          </p>
          <div className="grid grid-cols-2 gap-3">
            {WEATHER_ICONS.map(w => (
              <div
                key={w.label}
                className="border-2 border-gray-400 rounded-xl p-3 flex flex-col items-center gap-1 min-h-[140px]"
              >
                <span className="font-bold text-sm text-gray-700">{w.label}</span>
                <div className="flex-1 flex items-end justify-center pb-1">
                  <span className="text-6xl">🏠</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Worksheet 2: Day & Night ── */}
      {sheet === 2 && (
        <div className="bg-white rounded-2xl border-4 border-gray-300 p-4 shadow-lg">
          <h2 className="text-center font-display font-black text-2xl mb-0.5 tracking-wide">DAY &amp; NIGHT</h2>
          <p className="text-center text-xs font-bold text-gray-500 mb-4">
            Tick correct (✓) and wrong (✗) activity for the day and night.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* DAY column */}
            <div className="border-2 border-gray-400 rounded-xl overflow-hidden">
              <div className="bg-yellow-100 py-2 flex items-center justify-center gap-1.5 border-b-2 border-gray-400">
                <span className="text-xl">☀️</span>
                <span className="font-display font-black text-base text-yellow-800">DAY</span>
              </div>
              <div className="divide-y divide-gray-200">
                {DAY_ACTIVITIES.map(a => (
                  <div key={a.label} className="flex items-center gap-2 px-2 py-2">
                    <span className="text-2xl shrink-0">{a.emoji}</span>
                    <span className="text-xs font-bold text-gray-700 flex-1 leading-tight">{a.label}</span>
                    <div className="w-5 h-5 border-2 border-gray-400 rounded shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            {/* NIGHT column */}
            <div className="border-2 border-gray-400 rounded-xl overflow-hidden">
              <div className="bg-indigo-100 py-2 flex items-center justify-center gap-1.5 border-b-2 border-gray-400">
                <span className="text-xl">🌙</span>
                <span className="font-display font-black text-base text-indigo-800">NIGHT</span>
              </div>
              <div className="divide-y divide-gray-200">
                {NIGHT_ACTIVITIES.map(a => (
                  <div key={a.label} className="flex items-center gap-2 px-2 py-2">
                    <span className="text-2xl shrink-0">{a.emoji}</span>
                    <span className="text-xs font-bold text-gray-700 flex-1 leading-tight">{a.label}</span>
                    <div className="w-5 h-5 border-2 border-gray-400 rounded shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
