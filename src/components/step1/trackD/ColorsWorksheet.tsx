'use client'

// Rainbow arc order (outer → inner)
const RAINBOW_COLORS = [
  { label: 'Red',    hex: '#ef4444', textHex: '#7f1d1d' },
  { label: 'Orange', hex: '#f97316', textHex: '#7c2d12' },
  { label: 'Yellow', hex: '#facc15', textHex: '#713f12' },
  { label: 'Green',  hex: '#22c55e', textHex: '#14532d' },
  { label: 'Blue',   hex: '#3b82f6', textHex: '#1e3a5f' },
  { label: 'Black',  hex: '#1f2937', textHex: '#f9fafb' },
]

export function ColorsWorksheet({ onComplete }: { onComplete: () => void }) {
  function handlePrint() {
    onComplete()
    window.print()
  }

  // SVG dimensions
  const W = 340
  const H = 200
  const cx = W / 2
  const cy = H + 10  // center below bottom edge so arcs appear as upper half
  const arcCount = RAINBOW_COLORS.length
  const innerR = 40
  const arcThickness = 22
  const gap = 3

  return (
    <div className="max-w-lg mx-auto pb-16">
      {/* Print button */}
      <div className="flex justify-center mb-3">
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 rounded-full font-bold text-sm border-2 cursor-pointer bg-yellow-300 border-yellow-500 text-yellow-900 hover:bg-yellow-200 transition-all"
        >🖨️ Print</button>
      </div>

      {/* Printable worksheet */}
      <div className="bg-white rounded-2xl border-4 border-gray-300 p-5 shadow-lg">
        <h2 className="text-center font-display font-black text-2xl mb-1 text-gray-800 tracking-wide">
          COLORS
        </h2>
        <p className="text-center text-xs font-bold text-gray-500 mb-4" dir="rtl">
          צבע כל קשת בצבע המתאים לשמה
        </p>

        {/* Rainbow SVG */}
        <div className="flex justify-center mb-4">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
            {RAINBOW_COLORS.map((color, i) => {
              const outerR = innerR + (arcCount - i) * (arcThickness + gap)
              const innerRi = outerR - arcThickness
              // Arc path: outer arc + inner arc reversed
              const startAngle = Math.PI  // 180° (left)
              const endAngle = 0           // 0° (right)
              function polarX(r: number, angle: number) { return cx + r * Math.cos(angle) }
              function polarY(r: number, angle: number) { return cy + r * Math.sin(angle) }
              const ox1 = polarX(outerR, startAngle)
              const oy1 = polarY(outerR, startAngle)
              const ox2 = polarX(outerR, endAngle)
              const oy2 = polarY(outerR, endAngle)
              const ix1 = polarX(innerRi, endAngle)
              const iy1 = polarY(innerRi, endAngle)
              const ix2 = polarX(innerRi, startAngle)
              const iy2 = polarY(innerRi, startAngle)
              const d = `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 0 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerRi} ${innerRi} 0 0 0 ${ix2} ${iy2} Z`
              // Label angle: midpoint of arc = 90° (top)
              const labelAngle = -Math.PI / 2
              const labelR = (outerR + innerRi) / 2
              const lx = cx + labelR * Math.cos(labelAngle)
              const ly = cy + labelR * Math.sin(labelAngle)
              return (
                <g key={color.label}>
                  <path d={d} fill="none" stroke="#9ca3af" strokeWidth="1.5" />
                  <text
                    x={lx} y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 11, fontWeight: 700, fill: '#374151', fontFamily: 'sans-serif' }}
                  >
                    {color.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Color name reference strip */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {RAINBOW_COLORS.map(color => (
            <div
              key={color.label}
              className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-300"
            >
              <div className="w-4 h-4 rounded-sm border border-gray-400" style={{ backgroundColor: color.hex }} />
              <span className="text-xs font-bold text-gray-700">{color.label}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-bold text-gray-400 mt-4" dir="rtl">
          שם: _________________________ תאריך: _____________
        </p>
      </div>
    </div>
  )
}
