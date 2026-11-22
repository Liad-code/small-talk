'use client'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Mascot } from '@/components/ui/Mascot'
import { CATEGORIES } from '@/data/subjects'
import { PARENT_TIERS } from '@/lib/billing/plans'
import { PERKS, newPerksAtTier, perksForTier, type PerkId, type TierIndex } from '@/lib/billing/perks'
import { LANDING_FAQ as FAQ, PATH, SCENES } from './content'
import { Kicker, LANDING_CSS, Phone, PrimaryCta, Reveal, SecondaryAuthLink, ils, withEnglish } from './ui'

/* ── Derived pricing facts (never hardcoded) ─────────────────────────── */

const FAMILY = PARENT_TIERS[1]                       // the highlighted family tier (₪49, up to 3)
const SINGLE = PARENT_TIERS[0]
const UNLIMITED = PARENT_TIERS[PARENT_TIERS.length - 1]
const LAST_TIER = (PARENT_TIERS.length - 1) as TierIndex

/** Where a perk becomes available, in parent words. */
function perkWhere(id: PerkId) {
  const t = PERKS.find(p => p.id === id)!.minTier
  if (t === 0) return 'בכל החבילות'
  if (t === LAST_TIER) return `בחבילת ${ils(PARENT_TIERS[t].price)}`
  return `מחבילת ${ils(PARENT_TIERS[t].price)}`
}

const CAT = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))


/* ── Page ────────────────────────────────────────────────────────────── */

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const finalRef = useRef<HTMLElement>(null)
  const roadRef = useRef<HTMLOListElement>(null)
  const [barShow, setBarShow] = useState(false)
  const [road, setRoad] = useState(0)

  // scroll reveal
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) return
    root.classList.add('lp-js')
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('lp-in'); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // sticky mobile CTA: visible after the hero, hidden again at the final CTA
  useEffect(() => {
    const hero = heroRef.current, fin = finalRef.current
    if (!hero || !fin || !('IntersectionObserver' in window)) return
    let pastHero = false, atFinal = false
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0
        if (e.target === fin) atFinal = e.isIntersecting
      }
      setBarShow(pastHero && !atFinal)
    })
    io.observe(hero); io.observe(fin)
    return () => io.disconnect()
  }, [])

  // the road fills up as the visitor scrolls through the path
  useEffect(() => {
    const ol = roadRef.current
    if (!ol) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setRoad(1); return }
    let raf = 0
    const update = () => {
      raf = 0
      const r = ol.getBoundingClientRect()
      const p = (window.innerHeight * 0.62 - r.top) / r.height
      setRoad(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const toPath = (e: MouseEvent) => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('path')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div ref={rootRef} className="lp min-h-screen overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: LANDING_CSS }} />
      <Header />

      <main dir="rtl">
        {/* ═══ 1. HERO ══════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 lp-dots [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
          <div aria-hidden="true" className="absolute -top-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-[#E4E0FF] blur-3xl opacity-80" />
          <div aria-hidden="true" className="absolute top-[38%] -right-32 w-[22rem] h-[22rem] rounded-full bg-[#FFE0E8] blur-3xl opacity-70" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-9 pb-14 md:pt-16 md:pb-24 grid md:grid-cols-[1.08fr_1fr] gap-10 md:gap-8 items-center">
            {/* copy */}
            <div className="text-center md:text-right">
              <div className="slide-up"><Kicker>✦ תוכנית אנגלית לילדים דוברי עברית</Kicker></div>
              <h1 className="lp-h font-extrabold text-[2.7rem] leading-[1.08] sm:text-6xl lg:text-[4.4rem] mt-5 mb-5 slide-up-delay1 text-balance">
                מהאות הראשונה —
                <br />
                ועד <span className="lp-mark">שיחה באנגלית.</span>
              </h1>
              <p className="text-[1.12rem] sm:text-xl leading-relaxed text-[color:var(--ink-2)] font-semibold max-w-[34rem] mx-auto md:mx-0 slide-up-delay2">
                7 שלבים ברורים שלוקחים את הילד שלכם מ-<bdi dir="ltr" className="lp-en font-extrabold">ABC</bdi> ועד שיחה אמיתית עם דמויות מדברות. מתאים גם לילדים שעוד לא קוראים: הכול בשמע, במשחק ובקצב שלהם.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-stretch sm:items-center slide-up-delay3">
                <PrimaryCta />
                <a href="#path" onClick={toPath} className="lp-ghost">
                  איך זה עובד? <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="mt-5 text-sm font-bold text-[color:var(--ink-3)] slide-up-delay3">
                בלי כרטיס אשראי · {ils(FAMILY.price)} לחודש לכל המשפחה · ביטול בכל עת
              </p>
              <div className="mt-1 slide-up-delay3"><SecondaryAuthLink className="text-sm" /></div>
            </div>

            {/* visual: from letters (right, start) to conversation (left, goal) */}
            <div className="relative mx-auto w-full max-w-[25rem] md:max-w-[27rem] aspect-[20/21]" aria-label="צילומי מסך מתוך Small Talk: לוח האותיות בשלב 1 וסצנת הפיצרייה בשלב 7" role="img">
              <svg aria-hidden="true" viewBox="0 0 400 420" className="absolute inset-0 w-full h-full" fill="none">
                <path d="M330 380 C 380 250, 300 40, 170 30 S 30 90, 60 40" stroke="#C9C3FF" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
              </svg>
              <Phone
                src="/landing/step1-letters.jpg" alt="" eager crop={0.84}
                className="absolute right-[2%] top-[9%] w-[47%] rotate-[6deg]"
              />
              <Phone
                src="/landing/step7-story.jpg" alt="" eager crop={0.84}
                className="absolute left-[3%] top-[2%] w-[52%] -rotate-[4deg] z-10"
              />
              <span className="lp-chip lp-bob absolute right-0 bottom-[3%] z-20">
                <span className="text-lg leading-none">🐣</span> שלב 1 · אותיות
              </span>
              <span className="lp-chip lp-bob-2 absolute left-[-2%] top-[-2%] z-20 !bg-[color:var(--ink)] !text-white">
                <span className="text-lg leading-none">🗣️</span> שלב 7 · שיחה
              </span>
              <div className="absolute left-[30%] bottom-[-3%] z-20 hidden sm:block">
                <Mascot size={78} className="float drop-shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3. THE PATH ══════════════════════════════════════════════ */}
        <section id="path" className="relative px-4 sm:px-6 py-16 md:py-24 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <Kicker>🧭 הדרך</Kicker>
              <h2 className="lp-h font-extrabold text-[2.1rem] sm:text-5xl leading-tight mt-4 text-balance">
                7 שלבים. מטרה אחת: <span className="text-[color:var(--violet)]">לדבר.</span>
              </h2>
              <p className="mt-4 text-lg font-semibold text-[color:var(--ink-2)] leading-relaxed">
                כל שלב נבנה על הקודם. הילד מתקדם בקצב שלו, ואתם יודעים בדיוק איפה הוא עומד ומה מחכה לו בהמשך.
              </p>
            </Reveal>

            <div className="relative">
              {/* start marker */}
              <Reveal className="flex md:justify-center mb-6 md:mb-24">
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] text-white font-extrabold text-sm px-4 py-2 md:mx-auto">
                  <span aria-hidden="true">📍</span> נקודת ההתחלה: גם בלי לדעת לקרוא
                </span>
              </Reveal>

              <ol ref={roadRef} className="relative flex flex-col gap-6 md:gap-0">
                {/* the road: grey track + violet fill that grows on scroll */}
                <div aria-hidden="true" className="absolute top-0 bottom-0 right-[22px] md:right-1/2 md:translate-x-1/2 w-[14px] rounded-full bg-[#E9E5F8]">
                  <div className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-[#FFB347] via-[color:var(--violet)] to-[color:var(--sky)]" style={{ height: `${road * 100}%` }} />
                  <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[2px] lp-road-dash opacity-90" />
                </div>

                {PATH.map((s, i) => {
                  const cat = CAT[s.id]
                  const n = i + 1
                  const goal = n === PATH.length
                  const free = n === 1
                  const left = i % 2 === 1 // desktop: alternate sides (RTL: even = right)
                  const lit = road >= (i + 0.35) / PATH.length
                  return (
                    <li key={s.id} className="relative md:grid md:grid-cols-[1fr_6rem_1fr] md:items-center md:min-h-[11.5rem] md:-mt-20 md:first:mt-0">
                      {/* node */}
                      <div className="absolute right-0 top-3 md:static md:col-start-2 md:row-start-1 md:flex md:justify-center z-10">
                        <div
                          className={`w-[58px] h-[58px] md:w-[68px] md:h-[68px] rounded-[1.3rem] bg-gradient-to-br ${cat?.color ?? 'from-violet-400 to-indigo-500'} flex items-center justify-center text-[1.75rem] md:text-[2rem] ring-[5px] ring-[color:var(--paper)] transition-transform duration-500 ${lit ? 'scale-100 shadow-[0_10px_24px_-6px_rgba(29,24,56,.45)]' : 'scale-90 grayscale-[.35] opacity-80'}`}
                          aria-hidden="true"
                        >
                          {cat?.emoji}
                        </div>
                      </div>

                      {/* card */}
                      <Reveal
                        delay={60}
                        className={`mr-[78px] md:mr-0 md:row-start-1 ${left ? 'md:col-start-3' : 'md:col-start-1'} ${left ? 'md:pr-2' : 'md:pl-2'}`}
                      >
                        <div className={`relative rounded-[1.6rem] p-5 sm:p-6 ${goal
                          ? 'bg-[color:var(--ink)] text-white shadow-[0_24px_50px_-20px_rgba(29,24,56,.7)]'
                          : 'bg-white ring-1 ring-[color:var(--line)] shadow-[0_14px_34px_-22px_rgba(29,24,56,.35)]'}`}>
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`lp-num text-[0.8rem] font-extrabold tracking-wide ${goal ? 'text-[#7DD3FC]' : 'text-[color:var(--violet)]'}`}>שלב {n}</span>
                            {free && <span className="text-[0.72rem] font-extrabold rounded-full bg-[#E2F7EC] text-[#1B8A55] px-2.5 py-1 leading-none">טעימה חינם</span>}
                            {goal && <span className="text-[0.72rem] font-extrabold rounded-full bg-[color:var(--sun)] text-[color:var(--ink)] px-2.5 py-1 leading-none">🏁 המטרה</span>}
                          </div>
                          <h3 className="lp-h font-extrabold text-[1.3rem] sm:text-2xl leading-tight">{s.name}</h3>
                          <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="דוגמאות">
                            {s.tags.map(t => (
                              <li key={t} dir="ltr" className={`lp-num text-[0.82rem] font-bold rounded-lg px-2 py-0.5 ${goal ? 'bg-white/10 text-white/90' : 'bg-[#F3F1FB] text-[color:var(--ink-2)]'}`}>{t}</li>
                            ))}
                          </ul>
                          <p className={`mt-3 leading-relaxed font-semibold text-[0.98rem] ${goal ? 'text-white/85' : 'text-[color:var(--ink-2)]'}`}>
                            <span className={`font-extrabold ${goal ? 'text-white' : 'text-[color:var(--ink)]'}`}>בסוף השלב: </span>
                            {withEnglish(s.outcome)}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  )
                })}
              </ol>
            </div>

            <Reveal className="mt-12 md:mt-16 flex flex-col items-center text-center gap-3">
              <PrimaryCta size="md" />
              <p className="text-sm font-bold text-[color:var(--ink-3)]">שלב 1 פתוח לטעימה מיד אחרי ההתחברות</p>
            </Reveal>
          </div>
        </section>

        {/* ═══ 4. PRE-READERS ═══════════════════════════════════════════ */}
        <section className="relative px-4 sm:px-6 py-16 md:py-24 bg-[#FFF3DC] overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 lp-dots opacity-60" />
          <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <Reveal>
                <Kicker tone="sun">🐣 שלב 1</Kicker>
                <h2 className="lp-h font-extrabold text-[2.1rem] sm:text-5xl leading-[1.12] mt-4 text-balance">
                  לא יודעים לקרוא? <span className="text-[#E07B00]">מעולה.</span> ככה מתחילים.
                </h2>
                <p className="mt-4 text-lg font-semibold text-[color:var(--ink-2)] leading-relaxed max-w-lg">
                  שלב 1 בנוי לילדים שעוד לא מכירים אף אות. אין מה לקרוא, יש מה לשמוע, לגעת ולנסות.
                </p>
              </Reveal>
              <ol className="mt-8 flex flex-col gap-4">
                {[
                  { icon: '🔊', t: 'שומעים', b: 'כל אות וכל מילה מוקראות בקול. לוחצים, שומעים, חוזרים.' },
                  { icon: '🎮', t: 'משחקים', b: 'גוררים אותיות, מפוצצים בועות, מתאימים זוגות. זה מרגיש כמו משחק, כי זה משחק.' },
                  { icon: '⭐', t: 'מצליחים', b: 'כוכב על כל תרגיל. תשובה לא נכונה פשוט חוזרת למקום: בלי איקס אדום, בלי לחץ.' },
                ].map((m, i) => (
                  <Reveal as="li" key={m.t} delay={i * 100} className="flex gap-4 items-start bg-white/80 backdrop-blur rounded-3xl p-4 sm:p-5 ring-1 ring-[#F5DFB3]">
                    <span aria-hidden="true" className="w-12 h-12 rounded-2xl bg-[#FFF3DC] flex items-center justify-center text-2xl flex-shrink-0">{m.icon}</span>
                    <div>
                      <h3 className="lp-h font-extrabold text-xl leading-tight">{m.t}</h3>
                      <p className="font-semibold text-[color:var(--ink-2)] leading-snug mt-1">{m.b}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={120} className="relative mx-auto w-full max-w-[24rem] aspect-[20/23]">
              <Phone src="/landing/step1-letters.jpg" alt="לוח האותיות בשלב 1: לוחצים על אות ושומעים את שמה"
                crop={0.9} className="absolute right-0 top-0 w-[58%] rotate-[3deg]" />
              <div className="absolute left-0 bottom-[2%] w-[60%] -rotate-[4deg] rounded-[1.6rem] bg-white p-1.5 shadow-[0_30px_60px_-20px_rgba(29,24,56,.45)] z-10">
                <div className="rounded-[1.25rem] overflow-hidden aspect-[390/330]">
                  <img src="/landing/step1-bubbles.jpg" alt="משחק הבועות: שומעים אות ומפוצצים את הבועה הנכונה"
                    width={390} height={844} loading="lazy" decoding="async"
                    className="w-full h-full object-cover object-[50%_8%] block" />
                </div>
                <div className="flex items-center justify-between px-2.5 py-2">
                  <span className="text-[0.8rem] font-extrabold">🫧 משחק הבועות</span>
                  <span className="text-[0.75rem] font-bold text-[color:var(--ink-3)]">שומעים ומפוצצים</span>
                </div>
              </div>
              <span className="lp-chip lp-bob absolute left-[6%] top-[14%] z-20">
                <span aria-hidden="true">🔊</span> <bdi dir="ltr" className="lp-en">“B… b…”</bdi>
              </span>
              <span className="lp-chip lp-bob-2 absolute right-[-2%] bottom-[30%] z-20">
                <span aria-hidden="true">⭐</span> +1 כוכב
              </span>
            </Reveal>
          </div>
        </section>

        {/* ═══ 5. SPEAKING (Step 7) ═════════════════════════════════════ */}
        <section className="relative px-4 sm:px-6 py-16 md:py-24 bg-[#16132B] text-white overflow-hidden">
          <div aria-hidden="true" className="absolute -top-40 left-1/2 -translate-x-1/2 w-[46rem] h-[30rem] rounded-full bg-[#6C63FF] opacity-30 blur-[110px]" />
          <div aria-hidden="true" className="absolute bottom-[-10rem] -right-24 w-[26rem] h-[26rem] rounded-full bg-[#FF6584] opacity-20 blur-[100px]" />
          <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1fr_1fr] gap-12 md:gap-14 items-center">
            <div>
              <Reveal>
                <Kicker tone="sky">🗣️ שלב 7</Kicker>
                <h2 className="lp-h font-extrabold text-[2.1rem] sm:text-5xl leading-[1.12] mt-4 text-balance">
                  כאן הם מתחילים <span className="text-[#7DD3FC]">לדבר.</span>
                </h2>
                <p className="mt-4 text-lg font-semibold text-white/75 leading-relaxed max-w-xl">
                  10 סצנות מהחיים, עם דמויות שמדברות בקולות אמיתיים. הן שואלות, הילד בוחר מה לענות ואומר את זה בקול.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="10 הסצנות">
                  {SCENES.map(s => (
                    <li key={s.name} className="inline-flex items-center gap-1.5 rounded-full bg-white/[.07] ring-1 ring-white/10 px-3 py-1.5 text-[0.92rem] font-bold">
                      <span aria-hidden="true">{s.emoji}</span>{s.name}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <ol className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { n: '1', t: 'הדמות שואלת', b: 'בקול אמיתי, באנגלית.' },
                  { n: '2', t: 'חושבים לבד', b: 'ורק אז הופכים את הכרטיסים.' },
                  { n: '3', t: 'אומרים בקול', b: 'בוחרים תשובה ומדברים.' },
                  { n: '4', t: 'מתחלפים', b: 'עכשיו הילד הוא המוכר.' },
                ].map((x, i) => (
                  <Reveal as="li" key={x.n} delay={i * 80} className="rounded-2xl bg-white/[.06] ring-1 ring-white/10 p-4">
                    <span className="lp-num text-[#7DD3FC] font-extrabold text-sm">0{x.n}</span>
                    <h3 className="lp-h font-extrabold text-lg leading-tight mt-1">{x.t}</h3>
                    <p className="text-white/65 font-semibold text-[0.92rem] leading-snug mt-0.5">{x.b}</p>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={120} className="relative mx-auto w-full max-w-[25rem] aspect-[20/21]">
              <Phone src="/landing/step7-story.jpg" alt="סצנת הפיצרייה של טוני: הסיפור מתחיל ליד דלת הפיצרייה"
                crop={0.8} className="absolute right-[2%] top-[6%] w-[50%] rotate-[5deg] !shadow-[0_30px_70px_-20px_rgba(0,0,0,.8)]" />
              <Phone src="/landing/step7-cards.jpg" alt="בגלידרייה של לולו: הדמות שואלת מה תרצו, והילד בוחר תשובה ואומר אותה"
                crop={0.8} className="absolute left-[2%] top-[0%] w-[52%] -rotate-[4deg] z-10 !shadow-[0_30px_70px_-20px_rgba(0,0,0,.8)]" />
              <div dir="ltr" className="absolute left-[-1%] bottom-[2%] z-20 lp-bob rounded-2xl rounded-bl-md bg-white text-[color:var(--ink)] px-4 py-2.5 shadow-xl font-extrabold text-[0.95rem]">
                “I would like an ice cream, please.”
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ 6. FOR PARENTS ═══════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <Kicker tone="coral">👀 להורים</Kicker>
              <h2 className="lp-h font-extrabold text-[2.1rem] sm:text-5xl leading-tight mt-4">אתם רואים הכול.</h2>
              <p className="mt-4 text-lg font-semibold text-[color:var(--ink-2)] leading-relaxed">
                בלי לשבת ליד המסך ובלי לנחש. כמה תרגלו, מה למדו ומה הלאה, הכול מחכה לכם באזור ההורים.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14 items-center">
              <ul className="flex flex-col gap-3 order-2 md:order-1">
                {([
                  { icon: '📊', t: 'התקדמות לכל ילד', b: 'כמה כוכבים אסף, באיזה שלב הוא נמצא ומתי תרגל לאחרונה.', perk: 'cloud_progress' },
                  { icon: '🏆', t: 'אתגר אחים שבועי ויעד משפחתי', b: 'מי אסף הכי הרבה כוכבים השבוע? ויעד משותף שכל הבית רץ אליו.', perk: 'sibling_challenge' },
                  { icon: '📄', t: 'דוח חודשי לכל ילד', b: 'ימי תרגול, כוכבים בכל שלב והמלצות לתרגול בבית. מוכן להדפסה.', perk: 'monthly_report' },
                  { icon: '🎓', t: 'תעודות הישג', b: 'תעודה אישית עם שם הילד על כל הישג. להדפיס ולתלות על המקרר.', perk: 'certificates' },
                ] as { icon: string; t: string; b: string; perk: PerkId }[]).map((f, i) => (
                  <Reveal as="li" key={f.t} delay={i * 80} className="flex gap-4 items-start rounded-3xl bg-white p-4 sm:p-5 ring-1 ring-[color:var(--line)]">
                    <span aria-hidden="true" className="w-12 h-12 rounded-2xl bg-[#FFF0F3] flex items-center justify-center text-2xl flex-shrink-0">{f.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="lp-h font-extrabold text-lg leading-tight">{f.t}</h3>
                        <span className="text-[0.72rem] font-extrabold rounded-full bg-[#F3F1FB] text-[color:var(--violet-deep)] px-2.5 py-1 leading-none whitespace-nowrap">{perkWhere(f.perk)}</span>
                      </div>
                      <p className="font-semibold text-[color:var(--ink-2)] leading-snug mt-1">{f.b}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={100} className="order-1 md:order-2">
                <div className="relative mx-auto max-w-[34rem]">
                  <figure className="relative rounded-[1.4rem] bg-white p-2 shadow-[0_30px_60px_-24px_rgba(29,24,56,.45)] ring-1 ring-[color:var(--line)] rotate-[-1.5deg]">
                    <img src="/landing/certificate.jpg" alt="תעודת הישג אישית עם שם הילד, מוכנה להדפסה"
                      width={1100} height={800} loading="lazy" decoding="async" className="w-full h-auto block rounded-[1rem]" />
                  </figure>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-[-2.5rem] px-3 sm:px-8 relative z-10">
                    <Phone src="/landing/report.jpg" alt="הדוח החודשי: כוכבים, ימי תרגול והתקדמות בכל שלב" crop={0.78} className="rotate-[3deg]" />
                    <Phone src="/landing/family.jpg" alt="אתגר האחים השבועי והיעד המשפחתי" crop={0.78} className="-rotate-[3deg] mt-6" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 7. PRICING ═══════════════════════════════════════════════ */}
        <section id="pricing" className="relative px-4 sm:px-6 py-16 md:py-24 bg-white border-y border-[color:var(--line)] scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center max-w-2xl mx-auto">
              <Kicker tone="mint">💚 מחיר</Kicker>
              <h2 className="lp-h font-extrabold text-[2.1rem] sm:text-5xl leading-tight mt-4">מחיר אחד — לכל המשפחה.</h2>
              <p className="mt-4 text-lg font-semibold text-[color:var(--ink-2)] leading-relaxed text-balance">
                שיעור פרטי אחד עולה בדרך כלל <bdi dir="ltr" className="lp-en">₪100–₪200</bdi>. <span className="whitespace-nowrap">ב-Small Talk</span> זה {ils(FAMILY.price)} לחודש שלם, לכל הילדים בבית <span className="whitespace-nowrap">(עד {FAMILY.upTo})</span>.
              </p>
            </Reveal>

            {/* anchor: one private lesson vs. a whole month */}
            <Reveal delay={80} className="mt-8 max-w-2xl mx-auto">
              <div className="rounded-3xl bg-[#F7F5FC] ring-1 ring-[color:var(--line)] p-5 sm:p-6">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 items-center">
                  <div>
                    <div className="font-extrabold">שיעור פרטי אחד</div>
                    <div className="text-sm font-semibold text-[color:var(--ink-3)]">שעה אחת · ילד אחד</div>
                  </div>
                  <div dir="ltr" className="lp-num font-extrabold text-xl sm:text-2xl text-[color:var(--ink-3)] line-through decoration-[color:var(--coral)] decoration-2">₪100–₪200</div>
                  <div className="col-span-2 h-px bg-[color:var(--line)]" />
                  <div>
                    <div className="font-extrabold">Small Talk</div>
                    <div className="text-sm font-semibold text-[color:var(--ink-3)]">חודש שלם · עד {FAMILY.upTo} ילדים</div>
                  </div>
                  <div className="lp-num font-extrabold text-3xl sm:text-4xl text-[color:var(--violet)]">{ils(FAMILY.price)}</div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-5 items-stretch max-w-5xl mx-auto">
              {PARENT_TIERS.map((tier, i) => {
                const idx = i as TierIndex
                const best = tier === FAMILY
                const perks = i === 0 ? perksForTier(idx) : newPerksAtTier(idx)
                const perChild = Number.isFinite(tier.upTo) && tier.upTo > 1 ? Math.round(tier.price / tier.upTo / 100) : null
                return (
                  <Reveal key={tier.labelHe} delay={i * 90} className={`relative ${best ? 'order-first md:order-none' : ''}`}>
                    <div className={`relative h-full rounded-[1.8rem] p-6 sm:p-7 flex flex-col ${best
                      ? 'bg-[color:var(--ink)] text-white shadow-[0_30px_60px_-20px_rgba(29,24,56,.65)] md:-translate-y-4 ring-2 ring-[color:var(--violet)]'
                      : 'bg-white ring-1 ring-[color:var(--line)] shadow-[0_14px_30px_-22px_rgba(29,24,56,.35)]'}`}>
                      {best && (
                        <span className="absolute -top-3.5 right-6 rounded-full bg-[color:var(--coral)] text-white text-sm font-extrabold px-3.5 py-1.5 leading-none shadow-md">⭐ הכי משתלם</span>
                      )}
                      <div className={`font-extrabold text-lg ${best ? 'text-white/85' : 'text-[color:var(--ink-2)]'}`}>{tier.labelHe}</div>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className={`lp-num font-extrabold text-[3.4rem] leading-none ${best ? 'text-white' : 'text-[color:var(--ink)]'}`}>{ils(tier.price)}</span>
                        <span className={`font-bold text-sm ${best ? 'text-white/60' : 'text-[color:var(--ink-3)]'}`}>לחודש</span>
                      </div>
                      <div className={`mt-2 text-sm font-bold ${best ? 'text-[#A5B4FC]' : 'text-[color:var(--ink-3)]'}`}>
                        {perChild ? `לכל המשפחה · כ-₪${perChild} לילד כשיש ${tier.upTo}` : Number.isFinite(tier.upTo) ? 'לילד אחד' : 'לכל המשפחה, כמה ילדים שיש'}
                      </div>

                      <div className={`h-px my-5 ${best ? 'bg-white/10' : 'bg-[color:var(--line)]'}`} />

                      {i > 0 && (
                        <div className="mb-4">
                          <p className={`text-sm font-extrabold mb-2 ${best ? 'text-white/70' : 'text-[color:var(--ink-2)]'}`}>
                            כל מה שב&quot;{PARENT_TIERS[i - 1].labelHe}&quot;:
                          </p>
                          <ul className="flex flex-wrap gap-1.5">
                            {perksForTier((i - 1) as TierIndex).map(p => (
                              <li key={p.id} className={`text-[0.78rem] font-bold rounded-lg px-2 py-1 leading-none ${best ? 'bg-white/10 text-white/80' : 'bg-[#F3F1FB] text-[color:var(--ink-2)]'}`}>
                                ✓ {p.titleHe}
                              </li>
                            ))}
                          </ul>
                          <p className={`text-sm font-extrabold mt-4 ${best ? 'text-white' : 'text-[color:var(--ink)]'}`}>ועוד:</p>
                        </div>
                      )}
                      <ul className="flex flex-col gap-3.5 flex-1 mb-7">
                        {perks.map(p => (
                          <li key={p.id} className="flex gap-3 items-start">
                            <span aria-hidden="true" className="text-lg leading-none mt-0.5 flex-shrink-0">{p.icon}</span>
                            <div className="min-w-0">
                              <div className="font-extrabold leading-snug text-[0.97rem]">{p.titleHe}</div>
                              <div className={`text-[0.82rem] font-semibold leading-snug mt-0.5 ${best ? 'text-white/60' : 'text-[color:var(--ink-3)]'}`}>{p.descHe}</div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <Link href="/pricing" className={best ? 'lp-btn lp-btn-md w-full' : 'lp-ghost w-full !min-h-[3.1rem] !py-3'}>
                        בחירת חבילה
                      </Link>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal className="mt-10">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-[color:var(--ink-2)]">
                {['🎁 שלב 1 בחינם', '↩️ ביטול בכל עת', '🚫 בלי פרסומות', '🔒 תשלום מאובטח ב-Grow', '🧾 המחירים כוללים מע״מ'].map(t => (
                  <li key={t} className="whitespace-nowrap">{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ 8. FAQ ═══════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-10">
              <Kicker>❓ שאלות</Kicker>
              <h2 className="lp-h font-extrabold text-[2.1rem] sm:text-5xl leading-tight mt-4">שאלות שהורים שואלים</h2>
            </Reveal>
            <div className="flex flex-col gap-3">
              {FAQ.map((item, i) => (
                <details key={item.q} open={i === 0} className="lp-faq group rounded-2xl bg-white ring-1 ring-[color:var(--line)] open:ring-[#CFC8FF] open:shadow-[0_14px_30px_-22px_rgba(29,24,56,.35)] transition-shadow">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 min-h-[3.75rem] lp-h font-extrabold text-[1.08rem] sm:text-lg rounded-2xl">
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="lp-faq-icon flex-shrink-0 w-8 h-8 rounded-full bg-[#EEEBFF] text-[color:var(--violet-deep)] flex items-center justify-center text-xl leading-none">+</span>
                  </summary>
                  <p className="px-5 pb-5 -mt-1 font-semibold text-[color:var(--ink-2)] leading-relaxed">{withEnglish(item.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 9. FINAL CTA ═════════════════════════════════════════════ */}
        <section ref={finalRef} className="px-4 sm:px-6 pb-16 md:pb-24">
          <Reveal className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[2.2rem] bg-[color:var(--violet)] text-white px-6 py-12 sm:px-12 sm:py-16 text-center">
              <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,.55)_1.2px,transparent_1.3px)] [background-size:22px_22px]" />
              <div aria-hidden="true" className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[color:var(--coral)] opacity-40 blur-3xl" />
              <div aria-hidden="true" className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#38BDF8] opacity-30 blur-3xl" />
              <div className="relative">
                <div className="flex justify-center mb-3"><Mascot size={104} className="float drop-shadow-xl" /></div>
                <h2 className="lp-h font-extrabold text-[2.2rem] sm:text-6xl leading-[1.1] text-balance">הצעד הראשון לוקח 5 דקות.</h2>
                <p className="mt-4 text-lg font-semibold text-white/85 max-w-xl mx-auto leading-relaxed">
                  מתחברים עם Google, והילד כבר שומע את האות הראשונה. בלי כרטיס אשראי, בלי התחייבות.
                </p>
                <div className="mt-8 flex justify-center"><PrimaryCta className="lp-btn-light" /></div>
                <p className="mt-5 text-sm font-bold text-white/70">{ils(FAMILY.price)} לחודש לכל המשפחה · ביטול בכל עת</p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="px-4 pt-2 pb-28 md:pb-12 text-center text-sm font-bold text-[color:var(--ink-3)]" dir="rtl">
        <p className="lp-h text-base text-[color:var(--ink)]">💬 Small Talk</p>
        <nav className="flex flex-wrap justify-center gap-x-1 mt-2" aria-label="תוכן חינמי להורים">
          <Link href="/english-words" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">מילים באנגלית לפי נושאים</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/english-letters" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">האותיות באנגלית</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/guides" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">מדריכים להורים</Link>
        </nav>
        <nav className="flex flex-wrap justify-center gap-x-1" aria-label="מידע משפטי">
          <Link href="/legal/terms" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">תנאי שימוש</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/legal/privacy" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">מדיניות פרטיות</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/legal/refunds" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">ביטולים והחזרים</Link>
          <span aria-hidden="true" className="py-2">·</span>
          <Link href="/legal/accessibility" className="hover:text-[color:var(--violet)] no-underline px-2.5 py-2">הצהרת נגישות</Link>
        </nav>
        <p className="mt-1">
          יצירת קשר:{' '}
          <a href="mailto:smalltalk.english1@gmail.com" dir="ltr" className="hover:text-[color:var(--violet)] no-underline">smalltalk.english1@gmail.com</a>
        </p>
      </footer>

      {/* ── Sticky mobile CTA ──────────────────────────────────────────── */}
      <div
        dir="rtl"
        data-show={barShow ? 'true' : 'false'}
        className="lp-bar md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 bg-white/95 backdrop-blur border-t border-[color:var(--line)] shadow-[0_-10px_30px_-12px_rgba(29,24,56,.25)]"
      >
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="min-w-0 flex-1 leading-tight">
            <div className="font-extrabold text-[0.95rem]">שלב 1 בחינם · בלי כרטיס</div>
            <div className="text-[0.75rem] font-bold text-[color:var(--ink-3)]">אחר כך {ils(FAMILY.price)} לכל המשפחה</div>
          </div>
          <PrimaryCta size="md" short className="!text-[1rem] !px-5" />
        </div>
      </div>
    </div>
  )
}
