'use client'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function DaysCaterpillar({ onComplete }: { onComplete: () => void }) {
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
          גזור את עיגולי הגוף של הזחל ודבוק אותם בסדר הנכון מיום ראשון עד שבת
        </p>

        {/* Caterpillar head + blank body circles */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 text-center mb-2" dir="rtl">הזחל שלי:</p>
          <div className="flex items-center overflow-x-auto gap-0 py-2 px-2">
            {/* Head */}
            <div className="shrink-0 w-16 h-16 rounded-full bg-green-400 border-4 border-green-600 flex flex-col items-center justify-center mr-1 shadow-md">
              <span className="text-2xl">🐛</span>
            </div>
            {/* Body segments (blank) */}
            {DAYS.map((_, i) => (
              <div key={i} className="flex items-center">
                {/* Connector */}
                <div className="w-2 h-3 bg-green-300 border-y-2 border-green-500" />
                {/* Segment */}
                <div className="shrink-0 w-14 h-14 rounded-full border-4 border-dashed border-gray-400 bg-gray-50 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-300">{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cut-out circles */}
        <div className="border-t-2 border-dashed border-gray-300 pt-4">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-lg">✂</span>
            <p className="text-xs font-bold text-gray-500" dir="rtl">גזור את עיגולי הימים:</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {DAYS.map((day, i) => {
              const colors = [
                'bg-red-200 border-red-500',
                'bg-orange-200 border-orange-500',
                'bg-yellow-200 border-yellow-500',
                'bg-green-200 border-green-500',
                'bg-blue-200 border-blue-500',
                'bg-indigo-200 border-indigo-500',
                'bg-purple-200 border-purple-500',
              ]
              return (
                <div
                  key={day}
                  className={`w-16 h-16 rounded-full border-4 ${colors[i]} flex items-center justify-center`}
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
