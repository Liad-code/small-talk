'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DAY_COLORS = [
  'bg-red-200 border-red-500',
  'bg-orange-200 border-orange-500',
  'bg-yellow-200 border-yellow-500',
  'bg-green-200 border-green-500',
  'bg-blue-200 border-blue-500',
  'bg-indigo-200 border-indigo-500',
  'bg-purple-200 border-purple-500',
]

function CaterpillarHead() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* Antennae */}
      <line x1="22" y1="14" x2="16" y2="4" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="15" cy="3" r="3" fill="#86efac" />
      <line x1="42" y1="14" x2="48" y2="4" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="49" cy="3" r="3" fill="#86efac" />
      {/* Head */}
      <circle cx="32" cy="36" r="22" fill="#4ade80" stroke="#16a34a" strokeWidth="2.5" />
      {/* Eyes */}
      <circle cx="23" cy="31" r="5" fill="white" stroke="#16a34a" strokeWidth="1.5" />
      <circle cx="41" cy="31" r="5" fill="white" stroke="#16a34a" strokeWidth="1.5" />
      <circle cx="24" cy="31" r="2.5" fill="#1e293b" />
      <circle cx="42" cy="31" r="2.5" fill="#1e293b" />
      {/* Smile */}
      <path d="M 22 43 Q 32 51 42 43" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function DaysCaterpillar({ onComplete }: { onComplete: () => void }) {
  const [shuffledDays] = useState(() => shuffle([...DAYS]))

  function handlePrint() {
    onComplete()
    window.print()
  }

  return (
    <div className="max-w-lg mx-auto pb-16">
      <div className="flex justify-center mb-3">
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer bg-yellow-300 border-yellow-500 text-yellow-900 hover:bg-yellow-200 transition-all"
        >🖨️ Print</button>
      </div>

      <div className="bg-white rounded-2xl border-4 border-gray-300 p-5 shadow-lg">
        <h2 className="text-center font-display font-black text-xl mb-1 text-gray-800">Days of the Week</h2>
        <p className="text-center text-xs font-bold text-gray-500 mb-5" dir="rtl">
          גזור את העיגולים והדבק אותם על הזחל לפי סדר הימים
        </p>

        {/* Caterpillar: head + wave body */}
        <div className="mb-6 overflow-x-auto">
          <p className="text-xs font-bold text-gray-500 text-center mb-2" dir="rtl">הזחל שלי:</p>
          <div className="flex items-center py-4 px-2 min-w-max">
            {/* SVG head */}
            <CaterpillarHead />
            {/* Body segments in wave */}
            {DAYS.map((_, i) => {
              const offset = i % 2 === 0 ? -8 : 8
              return (
                <div key={i} className="flex items-center" style={{ transform: `translateY(${offset}px)` }}>
                  {/* Connector */}
                  <div className="w-2 h-3 bg-green-300 border-y-2 border-green-500" />
                  {/* Blank segment */}
                  <div className="shrink-0 w-14 h-14 rounded-full border-4 border-dashed border-gray-400 bg-gray-50 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-300">{i + 1}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cut-out circles — shuffled */}
        <div className="border-t-2 border-dashed border-gray-300 pt-4">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-lg">✂</span>
            <p className="text-xs font-bold text-gray-500" dir="rtl">גזור את עיגולי הימים:</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {shuffledDays.map(day => {
              const colorIdx = DAYS.indexOf(day)
              return (
                <div
                  key={day}
                  className={`w-16 h-16 rounded-full border-4 ${DAY_COLORS[colorIdx]} flex items-center justify-center`}
                >
                  <span className="text-xs font-black text-center leading-tight px-1">{day}</span>
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-center text-xs font-bold text-gray-400 mt-5" dir="rtl">
          שם: _________________________
        </p>
      </div>
    </div>
  )
}
