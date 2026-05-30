'use client'

function CrayonSVG({ label, hex, textHex, blank = false }: {
  label?: string; hex?: string; textHex?: string; blank?: boolean
}) {
  return (
    <svg width="110" height="32" viewBox="0 0 110 32" xmlns="http://www.w3.org/2000/svg">
      {/* Eraser cap */}
      <rect x="1" y="6" width="14" height="20" rx="3" fill={blank ? '#f9fafb' : '#e5e7eb'} stroke="#9ca3af" strokeWidth="1.5"/>
      {/* Body */}
      <rect x="15" y="2" width="75" height="28" fill={blank ? '#f9fafb' : hex} stroke="#9ca3af" strokeWidth="1.5"/>
      {/* Tip */}
      <polygon points="90,2 90,30 108,16" fill={blank ? '#f9fafb' : (hex ?? '#f9fafb')} stroke="#9ca3af" strokeWidth="1.5"/>
      {/* Label text */}
      {!blank && label && (
        <text x="52" y="20" textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 11, fontWeight: 900, fill: textHex ?? '#fff', fontFamily: 'sans-serif' }}>
          {label}
        </text>
      )}
    </svg>
  )
}

const COLORS = [
  { label: 'Red',    hex: '#ef4444', textHex: '#fff' },
  { label: 'Orange', hex: '#f97316', textHex: '#fff' },
  { label: 'Yellow', hex: '#facc15', textHex: '#713f12' },
  { label: 'Green',  hex: '#22c55e', textHex: '#fff' },
  { label: 'Blue',   hex: '#3b82f6', textHex: '#fff' },
  { label: 'Black',  hex: '#1f2937', textHex: '#f9fafb' },
]

export function ColorsWorksheet({ onComplete }: { onComplete: () => void }) {
  function handlePrint() { onComplete(); window.print() }

  return (
    <div className="max-w-lg mx-auto pb-16">
      <div className="flex justify-center mb-3">
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer bg-yellow-300 border-yellow-500 text-yellow-900 hover:bg-yellow-200 transition-all"
        >🖨️ Print</button>
      </div>
      <div className="bg-white rounded-2xl border-4 border-gray-300 p-5 shadow-lg">
        <h2 className="text-center font-display font-black text-2xl mb-1 text-gray-800 tracking-wide">COLORS</h2>
        <p className="text-center text-xs font-bold text-gray-500 mb-5" dir="rtl">צבע את העפרונות בצבע המתאים לשמם</p>

        <div className="flex flex-col gap-4">
          {COLORS.map(color => (
            <div key={color.label} className="flex items-center gap-4">
              <CrayonSVG label={color.label} hex={color.hex} textHex={color.textHex} />
              <CrayonSVG blank />
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-bold text-gray-400 mt-6" dir="rtl">
          שם: _________________________ תאריך: _____________
        </p>
      </div>
    </div>
  )
}
