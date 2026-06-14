'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

// ── LEARN ──────────────────────────────────────────────────────────────────────

const IRREGULAR: { adjective: string; adverb: string }[] = [
  { adjective: 'good',  adverb: 'well'  },
  { adjective: 'hard',  adverb: 'hard'  },
  { adjective: 'fast',  adverb: 'fast'  },
  { adjective: 'early', adverb: 'early' },
  { adjective: 'late',  adverb: 'late'  },
]

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      {/* Section 1: What is an adverb */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-1">
          Adverbs
        </h2>
        <p className="font-display font-black text-xl text-rose-600 text-center mb-2" dir="rtl">
          תארי הפועל
        </p>
        <p className="font-bold text-rose-800 text-sm text-center mb-4" dir="rtl">
          תואר הפועל מתאר את הפועל — הוא עונה על השאלה "איך?"
        </p>

        <div className="flex flex-col gap-1.5">
          <div className="bg-rose-100 rounded-xl px-3 py-1.5 font-bold text-rose-700 text-base">She speaks quietly.</div>
          <div className="bg-rose-100 rounded-xl px-3 py-1.5 font-bold text-rose-700 text-base">They walk slowly.</div>
          <div className="bg-rose-100 rounded-xl px-3 py-1.5 font-bold text-rose-700 text-base">I speak English slowly.</div>
        </div>
      </div>

      {/* Section 2: Adding -ly */}
      <div className="bg-red-50 border-4 border-red-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-red-700 text-center mb-2">
          Adjective + ly ✨
        </h3>
        <p className="font-bold text-red-800 text-sm text-center mb-4" dir="rtl">
          לרוב מוסיפים ly- לשם התואר כדי לקבל את תואר הפועל
        </p>

        <div className="flex flex-col gap-1.5">
          <div className="bg-white border-2 border-red-200 rounded-xl px-3 py-1.5 font-bold text-red-700 text-base">soft → softly</div>
          <div className="bg-white border-2 border-red-200 rounded-xl px-3 py-1.5 font-bold text-red-700 text-base">beautiful → beautifully</div>
          <div className="bg-white border-2 border-red-200 rounded-xl px-3 py-1.5 font-bold text-red-700 text-base">nice → nicely</div>
        </div>
      </div>

      {/* Section 3: Spelling rules */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-rose-700 text-center mb-2">
          Spelling Rules ✍️
        </h3>
        <div className="flex flex-col gap-3">
          <div className="bg-white border-2 border-rose-200 rounded-2xl p-3">
            <div className="font-display font-black text-rose-700 text-base mb-1">-le → -ly</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">שם תואר שמסתיים ב- le נהפוך ל- ly</p>
            <p className="font-bold text-rose-600 text-base mt-1">terrible → terribly</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-2xl p-3">
            <div className="font-display font-black text-red-700 text-base mb-1">consonant + y → -ily</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">שם תואר שמסתיים ב- y ולפניה עיצור — נוריד את ה- y ונוסיף ily</p>
            <p className="font-bold text-red-600 text-base mt-1">happy → happily</p>
          </div>
        </div>
      </div>

      {/* Section 4: Irregular adverbs table */}
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-amber-700 text-center mb-2">
          Irregular Adverbs ⚠️
        </h3>
        <p className="font-bold text-amber-800 text-sm text-center mb-4" dir="rtl">
          תארי פועל יוצאי דופן — לא מוסיפים להם ly-
        </p>

        <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-amber-100">
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm border-r border-amber-200">Adjective</div>
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm">Adverb</div>
          </div>
          {IRREGULAR.map((row, i) => (
            <div key={row.adjective} className={`grid grid-cols-2 border-t border-amber-100 ${i % 2 === 1 ? 'bg-amber-50' : ''}`}>
              <div className="text-center py-2 font-bold text-gray-700 text-base border-r border-amber-100">{row.adjective}</div>
              <div className="text-center py-2 font-black text-amber-600 text-base">{row.adverb}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Adjective vs Adverb contrast */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-rose-700 text-center mb-2">
          Adjective vs Adverb 🆚
        </h3>
        <p className="font-bold text-rose-800 text-sm text-center mb-4" dir="rtl">
          שם תואר מתאר שם עצם, תואר הפועל מתאר את הפועל
        </p>

        <div className="flex flex-col gap-2">
          <div className="bg-white border-2 border-rose-200 rounded-2xl p-3">
            <div className="font-bold text-rose-700 text-base">She is a good worker.</div>
            <p className="font-bold text-gray-500 text-sm mt-1" dir="rtl">שם תואר (good) — מתאר את ה- worker</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-2xl p-3">
            <div className="font-bold text-red-700 text-base">She works well.</div>
            <p className="font-bold text-gray-500 text-sm mt-1" dir="rtl">תואר הפועל (well) — מתאר איך היא עובדת</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function AdverbsPage() {
  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/adjectives-and-adverbs" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Adjectives &amp; Adverbs
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Adverbs 🏃</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">תארי הפועל — איך עושים פעולה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">quietly · happily · fast</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          <button className={`${TAB} bg-rose-500 text-white`}>📚 Learn</button>
        </div>
      </div>

      <div className="pt-4">
        <LearnTab />
      </div>
    </div>
  )
}
