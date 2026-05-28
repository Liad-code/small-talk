'use client'

const COLORS = [
  { label: 'Red',    hex: '#ef4444', textHex: '#7f1d1d' },
  { label: 'Yellow', hex: '#facc15', textHex: '#713f12' },
  { label: 'Blue',   hex: '#3b82f6', textHex: '#1e3a5f' },
  { label: 'Black',  hex: '#1f2937', textHex: '#f9fafb' },
  { label: 'Green',  hex: '#22c55e', textHex: '#14532d' },
  { label: 'Orange', hex: '#f97316', textHex: '#7c2d12' },
]

export function ColorsWorksheet({ onComplete }: { onComplete: () => void }) {
  function handlePrint() {
    onComplete()
    window.print()
  }

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
        <p className="text-center text-xs font-bold text-gray-500 mb-5" dir="rtl">
          צבע כל ריבוע בצבע המתאים לשמו
        </p>

        <div className="grid grid-cols-2 gap-4">
          {COLORS.map(color => (
            <div key={color.label} className="flex flex-col gap-2">
              {/* Color name label */}
              <div
                className="rounded-xl px-3 py-2 text-center font-display font-black text-lg border-3 border-gray-300"
                style={{ backgroundColor: color.hex, color: color.textHex, border: '3px solid #d1d5db' }}
              >
                {color.label}
              </div>
              {/* Blank coloring box */}
              <div
                className="rounded-xl border-2 border-gray-400 flex items-center justify-center"
                style={{ height: 80 }}
              >
                {/* intentionally blank for student to color */}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-bold text-gray-400 mt-5" dir="rtl">
          שם: _________________________ תאריך: _____________
        </p>
      </div>
    </div>
  )
}
