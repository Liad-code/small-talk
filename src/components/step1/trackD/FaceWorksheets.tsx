'use client'
import { useState } from 'react'

const FACE_PARTS = [
  { label: 'eyes',  emoji: '👀' },
  { label: 'nose',  emoji: '👃' },
  { label: 'mouth', emoji: '👄' },
  { label: 'ear',   emoji: '👂' },
]

// Face diagram worksheet — blank label lines pointing to face parts
function FaceLabel() {
  return (
    <div className="bg-white rounded-2xl border-4 border-gray-300 p-5 shadow-lg">
      <h2 className="text-center font-display font-black text-xl mb-1 text-gray-800">My Face</h2>
      <p className="text-center text-xs font-bold text-gray-500 mb-4" dir="rtl">
        כתב את שם כל חלק פנים בשורה המתאימה
      </p>
      <div className="relative mx-auto" style={{ width: 260, height: 320 }}>
        {/* Face oval */}
        <svg width="260" height="320" viewBox="0 0 260 320">
          {/* Head */}
          <ellipse cx="130" cy="160" rx="100" ry="120" fill="#fde68a" stroke="#d97706" strokeWidth="3"/>
          {/* Hair */}
          <ellipse cx="130" cy="50" rx="100" ry="30" fill="#92400e" />
          <rect x="30" y="50" width="200" height="30" fill="#92400e"/>
          {/* Eyes */}
          <ellipse cx="95" cy="130" rx="18" ry="13" fill="white" stroke="#374151" strokeWidth="2"/>
          <circle cx="95" cy="130" r="8" fill="#374151"/>
          <circle cx="100" cy="126" r="3" fill="white"/>
          <ellipse cx="165" cy="130" rx="18" ry="13" fill="white" stroke="#374151" strokeWidth="2"/>
          <circle cx="165" cy="130" r="8" fill="#374151"/>
          <circle cx="170" cy="126" r="3" fill="white"/>
          {/* Nose */}
          <ellipse cx="130" cy="170" rx="10" ry="14" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
          {/* Mouth */}
          <path d="M 100 210 Q 130 235 160 210" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
          {/* Ears */}
          <ellipse cx="30" cy="160" rx="14" ry="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
          <ellipse cx="230" cy="160" rx="14" ry="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>

          {/* Label lines */}
          {/* Eyes → right */}
          <line x1="183" y1="130" x2="230" y2="115" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2"/>
          <text x="235" y="112" fontSize="11" fill="#6b7280" fontWeight="bold">__________</text>

          {/* Nose → right */}
          <line x1="140" y1="170" x2="230" y2="170" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2"/>
          <text x="235" y="174" fontSize="11" fill="#6b7280" fontWeight="bold">__________</text>

          {/* Mouth → right */}
          <line x1="160" y1="218" x2="230" y2="230" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2"/>
          <text x="235" y="234" fontSize="11" fill="#6b7280" fontWeight="bold">__________</text>

          {/* Ear → left */}
          <line x1="16" y1="160" x2="-5" y2="160" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2"/>
          <text x="-80" y="164" fontSize="11" fill="#6b7280" fontWeight="bold">__________</text>
        </svg>
      </div>
      <div className="flex justify-center gap-4 flex-wrap mt-3">
        {FACE_PARTS.map(p => (
          <div key={p.label} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 border border-gray-300">
            <span className="text-lg">{p.emoji}</span>
            <span className="text-xs font-black text-gray-700">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Build Your Face — cut and paste
function BuildFace({ gender }: { gender: 'girl' | 'boy' }) {
  const hairColor = gender === 'girl' ? '#92400e' : '#1f2937'
  const title = gender === 'girl' ? 'BUILD YOUR FACE — Girl 👧' : 'BUILD YOUR FACE — Boy 👦'
  const parts = [
    { label: 'hair',  emoji: gender === 'girl' ? '👧' : '👦' },
    { label: 'eyes',  emoji: '👀' },
    { label: 'nose',  emoji: '👃' },
    { label: 'mouth', emoji: '👄' },
    { label: 'ear',   emoji: '👂' },
  ]

  return (
    <div className="bg-white rounded-2xl border-4 border-gray-300 p-5 shadow-lg">
      <h2 className="text-center font-display font-black text-lg mb-1 text-gray-800">{title}</h2>
      <p className="text-center text-xs font-bold text-gray-500 mb-4" dir="rtl">
        גזור את חלקי הפנים ודבוק במקום הנכון
      </p>

      {/* Blank face outline */}
      <div className="flex justify-center mb-4">
        <svg width="200" height="240" viewBox="0 0 200 240">
          <ellipse cx="100" cy="130" rx="80" ry="100" fill="#fef3c7" stroke="#d97706" strokeWidth="3" strokeDasharray="6 3"/>
          {gender === 'girl' && (
            <>
              {/* Pigtails */}
              <ellipse cx="30" cy="50" rx="20" ry="30" fill="#fde68a" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2"/>
              <ellipse cx="170" cy="50" rx="20" ry="30" fill="#fde68a" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2"/>
            </>
          )}
          {/* Ears */}
          <ellipse cx="20" cy="130" rx="12" ry="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2"/>
          <ellipse cx="180" cy="130" rx="12" ry="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2"/>
          {/* Feature placeholders */}
          <ellipse cx="75" cy="110" rx="22" ry="16" fill="white" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 2"/>
          <ellipse cx="125" cy="110" rx="22" ry="16" fill="white" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 2"/>
          <ellipse cx="100" cy="150" rx="12" ry="16" fill="white" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 2"/>
          <path d="M 70 185 Q 100 205 130 185" fill="white" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 2"/>
        </svg>
      </div>

      {/* Cut-out parts */}
      <div className="border-t-2 border-dashed border-gray-300 pt-3">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-lg">✂</span>
          <p className="text-xs font-bold text-gray-500" dir="rtl">גזור:</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {parts.map((p, i) => (
            <div
              key={i}
              className="border-2 border-dashed border-gray-400 rounded-xl p-3 flex flex-col items-center gap-1 w-16"
            >
              <span className="text-3xl">{p.emoji}</span>
              <span className="text-xs font-bold text-gray-600">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FaceWorksheets({ onComplete }: { onComplete: () => void }) {
  const [sheet, setSheet] = useState<1 | 2 | 3>(1)

  function handlePrint() {
    onComplete()
    window.print()
  }

  return (
    <div className="max-w-lg mx-auto pb-16">
      <div className="flex gap-2 mb-3 justify-center flex-wrap">
        <button
          onClick={() => setSheet(1)}
          className={`px-3 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 1 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >📝 Label</button>
        <button
          onClick={() => setSheet(2)}
          className={`px-3 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 2 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >👧 Build Girl</button>
        <button
          onClick={() => setSheet(3)}
          className={`px-3 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-all
            ${sheet === 3 ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white hover:bg-white/30'}`}
        >👦 Build Boy</button>
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer bg-yellow-300 border-yellow-500 text-yellow-900 hover:bg-yellow-200 transition-all"
        >🖨️ Print</button>
      </div>

      {sheet === 1 && <FaceLabel />}
      {sheet === 2 && <BuildFace gender="girl" />}
      {sheet === 3 && <BuildFace gender="boy" />}
    </div>
  )
}
