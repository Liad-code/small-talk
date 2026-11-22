/* Landing-page copy. Facts only: step outcomes are condensed from the parent guides in
 * src/data/stepGuides.ts ("מה כולל השלב" / "היעד הנדרש"), scenes from the Step 7 hub.
 * Prices and perks are never written here — they come from lib/billing (plans.ts, perks.ts).
 * Text between `backticks` is English and is rendered as an isolated LTR span. */

export interface PathStop {
  id: string          // CATEGORIES id (emoji + gradient come from there)
  name: string
  tags: string[]      // short English samples shown as chips
  outcome: string     // "what the child knows at the end of the step"
}

export const PATH: PathStop[] = [
  {
    id: 'step1',
    name: 'אותיות, צלילים ומילים ראשונות',
    tags: ['A a', 'b · m · t', 'cat'],
    outcome: 'מזהה את כל 26 האותיות בצורה ובצליל, מכיר את הצלילים הקצרים, קורא מילים כמו `cat` ו-`dog` ואוסף אוצר מילים ראשון. הכול בשמע.',
  },
  {
    id: 'step2',
    name: 'צירופי צלילים ודקדוק ראשון',
    tags: ['sh · ch · ee', 'I am', 'a / an'],
    outcome: '18 צירופי צלילים חדשים שפותחים את הקריאה, וחוקי הדקדוק הראשונים. בסוף השלב כותב משפט ראשון באנגלית עם `to be`.',
  },
  {
    id: 'step3',
    name: 'משפטים ראשונים',
    tags: ['have / has', 'sight words'],
    outcome: 'עוד 14 צירופי צלילים ו-6 נושאי דקדוק. מתחיל לשלב את המילים הנפוצות בשפה בתוך משפטים שלמים.',
  },
  {
    id: 'step4',
    name: 'צלילים מתקדמים והווה',
    tags: ['blends', 'I play', 'I am playing'],
    outcome: 'צלילים מתקדמים ו-`blends`, עוד 44 מילים נפוצות, ומבחין בין שני זמני ההווה: `present simple` ו-`present progressive`.',
  },
  {
    id: 'step5',
    name: 'עבר ועתיד',
    tags: ['I played', 'I will play'],
    outcome: '9 נושאי דקדוק חדשים כולל `past simple` ו-`future`, עוד 36 מילים נפוצות. קורא בצורה שוטפת ומתחיל לכתוב קטעים קצרים.',
  },
  {
    id: 'step6',
    name: 'מחברים את הכול',
    tags: ['mixed practice'],
    outcome: 'תרגול מעורב של ארבעת הזמנים. מזהה כל זמן בתוך משפט וכותב קטע קצר באנגלית לבד.',
  },
  {
    id: 'step7',
    name: 'מדברים באנגלית',
    tags: ['Hello!', 'What would you like?'],
    outcome: 'שיחות אמיתיות ב-10 סצנות מהחיים: דמויות מדברות שואלות, והילד עונה בקול.',
  },
]

export const SCENES = [
  { emoji: '🍕', name: 'פיצרייה' },
  { emoji: '🍦', name: 'גלידרייה' },
  { emoji: '🛒', name: 'סופר' },
  { emoji: '🐶', name: 'חנות חיות' },
  { emoji: '👕', name: 'חנות בגדים' },
  { emoji: '🩺', name: 'אצל הרופא' },
  { emoji: '🎂', name: 'יום הולדת' },
  { emoji: '✈️', name: 'שדה תעופה' },
  { emoji: '👋', name: 'חבר חדש' },
  { emoji: '🗺️', name: 'שואלים את הדרך' },
]

export const PAINS = [
  { icon: '🏫', title: 'בבית הספר', body: 'כיתה מלאה, ומעט מאוד זמן לכל ילד.' },
  { icon: '💸', title: 'שיעור פרטי', body: '`₪100–₪200` לשעה. כל שבוע מחדש.' },
  { icon: '🙊', title: 'והילד?', body: 'מבין קצת, אבל מתבייש לדבר.' },
]
