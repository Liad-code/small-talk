'use client'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { Header } from '@/components/layout/Header'
import { Mascot } from '@/components/ui/Mascot'
import { CATEGORIES } from '@/data/subjects'
import { PARENT_TIERS, toShekels } from '@/lib/billing/plans'
import { newPerksAtTier, perksForTier, type TierIndex } from '@/lib/billing/perks'

/* ── Content ──────────────────────────────────────────────────────────────
 * Step texts are condensed from the parent guides in src/data/stepGuides.ts.
 * Emoji, colors and step titles come from CATEGORIES (src/data/subjects.ts).
 */
const STEP_TEXT: Record<string, { name: string; body: string }> = {
  step1: { name: 'אותיות וצלילים', body: '26 האותיות, הצלילים הקצרים ו-23 נושאים של אוצר מילים ראשון. הכל מבוסס שמע, כך שלא צריך לדעת לקרוא.' },
  step2: { name: 'מילים וצירופי צלילים', body: '18 צירופי צלילים חדשים שפותחים את הקריאה, חוקי הדקדוק הראשונים (`pronouns, to be, a/an`) ואוצר מילים מורחב.' },
  step3: { name: 'משפטים ראשונים', body: '14 צירופי צלילים נוספים, 6 נושאי דקדוק ו-`sight words`: מילים מרכזיות בשפה בתוך משפטים.' },
  step4: { name: 'דקדוק בהווה', body: 'צלילים מתקדמים ו-`blends`, שני זמני ההווה: `present simple` ו-`present progressive`, ועוד `44 sight words`.' },
  step5: { name: 'עבר ועתיד', body: '9 נושאי דקדוק חדשים, כולל `past simple` ו-`future`, ועוד `36 sight words`. מתחילים לכתוב קטעים קצרים.' },
  step6: { name: 'שלב הסיכום', body: 'תרגול מעורב של ארבעת הזמנים ועוד `sight words`. מחברים את כל מה שנלמד.' },
  step7: { name: 'מדברים באנגלית', body: 'סצנות דיבור מהחיים עם דמויות שמדברות: מזמינים פיצה, קונים בחנות, שואלים את הדרך.' },
}

const SCENES = [
  { emoji: '👋', name: 'חבר חדש' },
  { emoji: '🍕', name: 'בפיצרייה' },
  { emoji: '🍦', name: 'בגלידרייה' },
  { emoji: '🛒', name: 'בסופרמרקט' },
  { emoji: '🐶', name: 'בחנות החיות' },
  { emoji: '👕', name: 'בחנות הבגדים' },
  { emoji: '🗺️', name: 'שואלים את הדרך' },
  { emoji: '🩺', name: 'אצל הרופא' },
  { emoji: '🎂', name: 'מסיבת יום הולדת' },
  { emoji: '✈️', name: 'בשדה התעופה' },
]

const HIGHLIGHTS = [
  { icon: '🎧', title: 'גם למי שעוד לא קורא', body: 'בשלב הראשון התרגולים קוליים: שומעים, חוזרים בקול ובוחרים. הקריאה נבנית בהדרגה.', tint: 'bg-amber-50 border-amber-200' },
  { icon: '🎮', title: 'משחקים ולא שיעורי בית', body: 'גרירה, בועות, התאמות וחידונים. כל תרגול מרגיש כמו משחק, והבדיקה אוטומטית.', tint: 'bg-purple-50 border-purple-200' },
  { icon: '⭐', title: 'כוכבים והתקדמות', body: 'כל משימה שהושלמה מזכה בכוכב. רואים בדיוק כמה נאסף ומה מחכה בהמשך.', tint: 'bg-yellow-50 border-yellow-200' },
  { icon: '👧', title: 'פרופיל לכל ילד', body: 'כל אחד מתקדם בקצב שלו, וההתקדמות נשמרת בחשבון ועוברת בין מכשירים.', tint: 'bg-pink-50 border-pink-200' },
  { icon: '📊', title: 'אזור הורים', body: 'במבט אחד: כמה כוכבים כל ילד אסף, באיזה שלב הוא נמצא ומתי תרגל לאחרונה.', tint: 'bg-sky-50 border-sky-200' },
  { icon: '🗣️', title: 'דמויות שמדברות', body: 'בשלב 7 הילדים מנהלים שיחה אמיתית באנגלית עם דמויות מצוירות, בסיפור שמשתנה לפי הבחירות שלהם.', tint: 'bg-green-50 border-green-200' },
]

const tierNames = PARENT_TIERS.map(t => t.labelHe).join(', ')

const FAQ = [
  {
    q: 'לאיזה גיל זה מתאים?',
    a: 'Small Talk נבנה לילדים בגילאי 5 עד 11 בערך. השלב הראשון מתאים גם למי שלא מכיר עדיין אף אות, והשלבים המתקדמים מאתגרים גם ילדים שכבר קוראים.',
  },
  {
    q: 'הילד צריך לדעת לקרוא?',
    a: 'לא. בשלב הראשון כל התרגולים מבוססי שמע. הילדים לומדים את האותיות והצלילים ומשם מתחילים לקרוא, צליל אחרי צליל.',
  },
  {
    q: 'כמה ילדים אפשר לרשום?',
    a: `המנוי הוא לכל המשפחה, ולכל ילד יש פרופיל משלו עם התקדמות נפרדת. יש שלוש חבילות לפי מספר הילדים: ${tierNames}.`,
  },
  {
    q: 'אפשר לבטל?',
    a: 'כן, בכל עת, ישירות מעמוד המנוי באתר. אחרי הביטול לא יהיו חיובים נוספים, והגישה נשארת עד סוף החודש ששולם.',
  },
  {
    q: 'באילו מכשירים זה עובד?',
    a: 'בטלפון, בטאבלט ובמחשב, ישירות מהדפדפן ובלי להתקין אפליקציה. כדאי להפעיל סאונד, כי הרבה מהתרגולים מבוססים על שמיעה.',
  },
  {
    q: 'זה בטוח לילדים?',
    a: 'באתר אין פרסומות. ההרשמה נעשית עם חשבון Google של ההורה, ואנחנו שומרים רק את מה שצריך כדי להציג את ההתקדמות של כל ילד. כל הפרטים במדיניות הפרטיות.',
  },
]

/* ── Small building blocks ───────────────────────────────────────────── */

function Sparkle({ emoji, className }: { emoji: string; className: string }) {
  return <span aria-hidden="true" className={`absolute select-none pointer-events-none ${className}`}>{emoji}</span>
}

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-8">
      <div className="inline-block font-display font-bold text-sm text-primary bg-purple-100 rounded-full px-4 py-1 mb-3" dir="ltr">
        {kicker}
      </div>
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-800 leading-tight">{title}</h2>
      {sub && <p className="font-bold text-gray-500 mt-2 max-w-xl mx-auto">{sub}</p>}
    </div>
  )
}

/** `English` spans inside Hebrew text: isolated LTR and kept on one line, so RTL wrapping can't scramble them. */
function withEnglish(text: string) {
  return text.split(/`(.+?)`/g).map((part, i) => (i % 2 === 1 ? <bdi key={i} dir="ltr" className="whitespace-nowrap">{part}</bdi> : part))
}

const ils = (agorot: number) => `₪${toShekels(agorot)}`

/* ── Page ────────────────────────────────────────────────────────────── */

export function LandingPage() {
  const { status } = useSession()
  const signedOut = status === 'unauthenticated'

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <main dir="rtl">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative px-4 pt-8 pb-14 sm:pt-14 sm:pb-20 overflow-hidden">
          <div aria-hidden="true" className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-200/50 blur-3xl" />
          <div aria-hidden="true" className="absolute top-40 -right-24 w-72 h-72 rounded-full bg-pink-200/50 blur-3xl" />
          <Sparkle emoji="⭐" className="top-6 right-[8%] text-2xl twinkle" />
          <Sparkle emoji="✨" className="top-24 left-[10%] text-2xl twinkle-delay-1" />
          <Sparkle emoji="🌟" className="bottom-10 right-[14%] text-xl twinkle-delay-2" />
          <Sparkle emoji="✨" className="bottom-24 left-[6%] text-xl twinkle-delay-3" />

          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
            {/* Mascot + speech bubble */}
            <div className="relative flex-shrink-0 pt-12 md:pt-14">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-6 bg-white border-4 border-primary rounded-3xl rounded-bl-md px-4 py-1.5 shadow-lg whitespace-nowrap bounce-in"
                dir="ltr"
              >
                <span className="font-display font-bold text-lg text-primary">Hello! I&apos;m Bubo 👋</span>
              </div>
              <Mascot size={170} className="float drop-shadow-xl md:hidden" />
              <Mascot size={240} className="float drop-shadow-xl hidden md:block" />
            </div>

            {/* Copy */}
            <div className="text-center md:text-right flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 bg-white border-2 border-purple-100 rounded-full px-4 py-1.5 font-bold text-sm text-gray-600 shadow-sm mb-4 slide-up">
                🎈 אנגלית לילדים בגילאי 5–11
              </div>
              <h1 className="font-display font-bold text-[2.6rem] leading-[1.15] sm:text-6xl text-gray-800 mb-4 slide-up-delay1">
                לומדים אנגלית
                <br />
                דרך{' '}
                <span className="relative inline-block text-primary">
                  משחק
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M 2 5 Q 25 1 50 5 Q 75 9 100 5 Q 125 1 150 5 Q 175 9 198 5" stroke="#FF6584" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0 mb-7 slide-up-delay2">
                Small Talk לוקח את הילדים שלכם מהאותיות והצלילים הראשונים ועד שיחה אמיתית באנגלית. שבעה שלבים, מאות תרגולים ומשחקים, וכוכב על כל הצלחה.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start slide-up-delay3">
                <Link href="/pricing" className="btn-kid bg-primary hover:bg-indigo-500 text-xl py-4 px-8 text-center no-underline">
                  🚀 להצטרפות
                </Link>
                {signedOut && (
                  <button
                    onClick={() => signIn('google')}
                    className="font-bold rounded-2xl px-6 py-4 text-lg bg-white text-primary border-4 border-purple-200 hover:border-primary transition-all active:scale-95 cursor-pointer"
                  >
                    כבר רשומים? התחברות
                  </button>
                )}
              </div>

              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center md:justify-start mt-6 text-sm font-bold text-gray-500">
                <li>✅ בלי פרסומות</li>
                <li>✅ טלפון, טאבלט ומחשב</li>
                <li>✅ ביטול בכל עת</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Learning path ────────────────────────────────────────────── */}
        <section className="px-4 py-14 bg-white/60">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              kicker="How it works"
              title="מסלול לימוד בשבעה שלבים"
              sub="כל שלב נבנה על הקודם. הילדים מתקדמים בקצב שלהם, ואתם מקבלים מדריך הורים לכל שלב."
            />

            <ol className="relative flex flex-col gap-4">
              {/* the dotted path behind the step badges */}
              <div aria-hidden="true" className="absolute top-6 bottom-6 right-[1.9rem] border-r-4 border-dotted border-purple-200" />
              {CATEGORIES.map((cat, i) => {
                const text = STEP_TEXT[cat.id]
                if (!text) return null
                const last = i === CATEGORIES.length - 1
                return (
                  <li key={cat.id} className="relative flex items-start gap-4">
                    <div className={`relative z-10 flex-shrink-0 w-[3.8rem] h-[3.8rem] rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl shadow-md`}>
                      {cat.emoji}
                    </div>
                    <div className={`flex-1 min-w-0 bg-white rounded-3xl border-4 ${last ? 'border-sky-300' : 'border-gray-100'} p-4 card-3d`}>
                      <div className="flex items-baseline gap-2 flex-wrap mb-1">
                        <span className="font-display font-bold text-sm text-gray-400" dir="ltr">{cat.title}</span>
                        <h3 className="font-display font-bold text-xl text-gray-800 leading-tight">{text.name}</h3>
                      </div>
                      <p className="font-bold text-gray-500 text-[0.95rem] leading-relaxed">{withEnglish(text.body)}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* ── Step 7 scenes ────────────────────────────────────────────── */}
        <section className="px-4 py-14">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-sky-400 to-cyan-500 rounded-[2rem] p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div aria-hidden="true" className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
            <div aria-hidden="true" className="absolute -bottom-14 right-10 w-32 h-32 bg-white/10 rounded-full" />
            <div className="relative text-center text-white mb-6">
              <div className="text-5xl mb-2">🗣️</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">בשלב 7 כבר מדברים</h2>
              <p className="font-bold opacity-95 mt-2 max-w-lg mx-auto">
                סצנות אינטראקטיביות עם דמויות שמדברות באנגלית. הילדים מזמינים, שואלים, עונים ובוחרים איך הסיפור ימשיך.
              </p>
            </div>
            <ul className="relative grid grid-cols-3 gap-2.5 sm:gap-4">
              {SCENES.map(s => (
                <li key={s.name} className="bg-white rounded-2xl py-3 px-1 text-center shadow-md">
                  <div className="text-3xl sm:text-4xl mb-1">{s.emoji}</div>
                  <div className="font-bold text-gray-700 text-xs sm:text-sm leading-tight">{s.name}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Highlights ───────────────────────────────────────────────── */}
        <section className="px-4 py-14 bg-white/60">
          <div className="max-w-5xl mx-auto">
            <SectionTitle kicker="Why Small Talk" title="נבנה בשביל ילדים, ברור להורים" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HIGHLIGHTS.map(h => (
                <div key={h.title} className={`rounded-3xl border-4 ${h.tint} p-5 flex gap-4 items-start`}>
                  <span className="text-4xl flex-shrink-0 leading-none">{h.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg text-gray-800 leading-tight mb-1">{h.title}</h3>
                    <p className="font-bold text-gray-500 text-sm leading-relaxed">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────────── */}
        <section id="pricing" className="px-4 py-14">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              kicker="Pricing"
              title="מנוי אחד לכל המשפחה"
              sub="כל תוכנית הלימוד כלולה בכל חבילה. החבילות הגדולות מוסיפות עוד דברים טובים למשפחה."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-stretch">
              {PARENT_TIERS.map((tier, i) => {
                const idx = i as TierIndex
                const best = i === 1
                const perks = i === 0 ? perksForTier(idx) : newPerksAtTier(idx)
                return (
                  <div
                    key={tier.labelHe}
                    className={`relative bg-white rounded-3xl p-6 flex flex-col ${best ? 'border-4 border-primary shadow-xl md:-translate-y-3' : 'border-4 border-gray-100 shadow-md'}`}
                  >
                    {best && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white font-display font-bold text-sm rounded-full px-4 py-1 shadow-md whitespace-nowrap">
                        ⭐ הכי משתלם
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <div className="font-display font-bold text-xl text-gray-700">{tier.labelHe}</div>
                      <div className="font-display font-black text-5xl text-primary mt-1 leading-none">{ils(tier.price)}</div>
                      <div className="font-bold text-sm text-gray-400 mt-1">לחודש, לכל המשפחה</div>
                    </div>

                    {i > 0 && (
                      <p className="font-bold text-sm text-gray-500 mb-2">
                        כל מה שבחבילת &quot;{PARENT_TIERS[i - 1].labelHe}&quot;, ועוד:
                      </p>
                    )}
                    <ul className="flex flex-col gap-3 mb-6 flex-1">
                      {perks.map(p => (
                        <li key={p.id} className="flex gap-2.5 items-start">
                          <span className="text-xl leading-none flex-shrink-0 mt-0.5">{p.icon}</span>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-800 text-[0.95rem] leading-snug">{p.titleHe}</div>
                            <div className="font-bold text-gray-400 text-xs leading-snug mt-0.5">{p.descHe}</div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/pricing"
                      className={`btn-kid text-center no-underline text-lg ${best ? 'bg-primary hover:bg-indigo-500' : 'bg-secondary hover:bg-pink-500'}`}
                    >
                      להצטרפות
                    </Link>
                  </div>
                )
              })}
            </div>

            <p className="text-center text-sm font-bold text-gray-500 mt-8 leading-relaxed">
              ביטול בכל עת · המחירים כוללים מע״מ · התשלום מאובטח על ידי&nbsp;Grow
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="px-4 py-14 bg-white/60">
          <div className="max-w-2xl mx-auto">
            <SectionTitle kicker="FAQ" title="שאלות נפוצות" />
            <div className="flex flex-col gap-3">
              {FAQ.map(item => (
                <details key={item.q} className="group bg-white rounded-2xl border-4 border-gray-100 open:border-purple-200 transition-colors">
                  <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 min-h-[3.5rem] font-display font-bold text-lg text-gray-800 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-primary flex items-center justify-center text-xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-5 -mt-1 font-bold text-gray-500 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="px-4 py-14">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-indigo-500 rounded-[2rem] p-8 sm:p-10 text-center text-white shadow-xl relative overflow-hidden">
            <div aria-hidden="true" className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full" />
            <div aria-hidden="true" className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/10 rounded-full" />
            <div className="relative">
              <div className="flex justify-center mb-2">
                <Mascot size={110} className="float drop-shadow-lg" />
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-2">מוכנים להתחיל?</h2>
              <p className="font-bold opacity-90 mb-6">בובו כבר מחכה לפגוש את הילדים שלכם.</p>
              <Link href="/pricing" className="btn-kid inline-block bg-secondary hover:bg-pink-500 text-xl py-4 px-10 no-underline">
                🚀 להצטרפות
              </Link>
              {signedOut && (
                <div className="mt-4">
                  <button onClick={() => signIn('google')} className="font-bold text-white/90 underline underline-offset-4 hover:text-white cursor-pointer py-2 px-3">
                    כבר רשומים? התחברות
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="text-center pt-4 pb-10 px-4 text-gray-400 font-bold text-sm" dir="rtl">
        <p className="mb-3">💬 Small Talk · לומדים אנגלית בכיף</p>
        <nav className="flex flex-wrap justify-center gap-x-1 gap-y-1">
          <Link href="/legal/terms" className="text-gray-500 hover:text-primary no-underline px-2 py-2">תנאי שימוש</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/legal/privacy" className="text-gray-500 hover:text-primary no-underline px-2 py-2">מדיניות פרטיות</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/legal/refunds" className="text-gray-500 hover:text-primary no-underline px-2 py-2">ביטולים והחזרים</Link>
        </nav>
        <p className="mt-2">
          יצירת קשר:{' '}
          <a href="mailto:smalltalk.english1@gmail.com" className="text-gray-500 hover:text-primary no-underline" dir="ltr">
            smalltalk.english1@gmail.com
          </a>
        </p>
      </footer>
    </div>
  )
}
