// SEO data for the public English alphabet page.

export interface LetterInfo {
  upper: string
  lower: string
  nameSay: string // letter NAME in Hebrew letters
  sound: string   // short phonics sound in Hebrew letters
  word: string    // simple word that starts with the letter
  wordHe: string
  emoji: string
}

export const LETTER_INFO: LetterInfo[] = [
  { upper: 'A', lower: 'a', nameSay: 'אֵיי', sound: 'אַ', word: 'apple', wordHe: 'תפוח', emoji: '🍎' },
  { upper: 'B', lower: 'b', nameSay: 'בִּי', sound: 'בּ', word: 'ball', wordHe: 'כדור', emoji: '⚽' },
  { upper: 'C', lower: 'c', nameSay: 'סִי', sound: 'ק', word: 'cat', wordHe: 'חתול', emoji: '🐱' },
  { upper: 'D', lower: 'd', nameSay: 'דִי', sound: 'ד', word: 'dog', wordHe: 'כלב', emoji: '🐶' },
  { upper: 'E', lower: 'e', nameSay: 'אִי', sound: 'אֶ', word: 'egg', wordHe: 'ביצה', emoji: '🥚' },
  { upper: 'F', lower: 'f', nameSay: 'אֶף', sound: 'פ', word: 'fish', wordHe: 'דג', emoji: '🐟' },
  { upper: 'G', lower: 'g', nameSay: 'גִ\'י', sound: 'ג', word: 'grapes', wordHe: 'ענבים', emoji: '🍇' },
  { upper: 'H', lower: 'h', nameSay: 'אֵייץ\'', sound: 'ה', word: 'hat', wordHe: 'כובע', emoji: '🎩' },
  { upper: 'I', lower: 'i', nameSay: 'אַיי', sound: 'אִ', word: 'insect', wordHe: 'חרק', emoji: '🐛' },
  { upper: 'J', lower: 'j', nameSay: 'גֵ\'יי', sound: 'ג\'', word: 'juice', wordHe: 'מיץ', emoji: '🧃' },
  { upper: 'K', lower: 'k', nameSay: 'קֵיי', sound: 'ק', word: 'kite', wordHe: 'עפיפון', emoji: '🪁' },
  { upper: 'L', lower: 'l', nameSay: 'אֶל', sound: 'ל', word: 'lion', wordHe: 'אריה', emoji: '🦁' },
  { upper: 'M', lower: 'm', nameSay: 'אֶם', sound: 'מ', word: 'moon', wordHe: 'ירח', emoji: '🌙' },
  { upper: 'N', lower: 'n', nameSay: 'אֶן', sound: 'נ', word: 'nose', wordHe: 'אף', emoji: '👃' },
  { upper: 'O', lower: 'o', nameSay: 'אוֹ', sound: 'אָ', word: 'octopus', wordHe: 'תמנון', emoji: '🐙' },
  { upper: 'P', lower: 'p', nameSay: 'פִּי', sound: 'פּ', word: 'pizza', wordHe: 'פיצה', emoji: '🍕' },
  { upper: 'Q', lower: 'q', nameSay: 'קְיוּ', sound: 'קְוּ', word: 'queen', wordHe: 'מלכה', emoji: '👑' },
  { upper: 'R', lower: 'r', nameSay: 'אָר', sound: 'ר', word: 'rabbit', wordHe: 'ארנב', emoji: '🐰' },
  { upper: 'S', lower: 's', nameSay: 'אֶס', sound: 'ס', word: 'sun', wordHe: 'שמש', emoji: '☀️' },
  { upper: 'T', lower: 't', nameSay: 'טִי', sound: 'ט', word: 'tree', wordHe: 'עץ', emoji: '🌳' },
  { upper: 'U', lower: 'u', nameSay: 'יוּ', sound: 'אַ', word: 'umbrella', wordHe: 'מטרייה', emoji: '☂️' },
  { upper: 'V', lower: 'v', nameSay: 'וִי', sound: 'ו', word: 'violin', wordHe: 'כינור', emoji: '🎻' },
  { upper: 'W', lower: 'w', nameSay: 'דַּאבֶּל יוּ', sound: 'וּ', word: 'watermelon', wordHe: 'אבטיח', emoji: '🍉' },
  { upper: 'X', lower: 'x', nameSay: 'אֶקְס', sound: 'קְס', word: 'x-ray', wordHe: 'צילום רנטגן', emoji: '🩻' },
  { upper: 'Y', lower: 'y', nameSay: 'וַאי', sound: 'י', word: 'yo-yo', wordHe: 'יו־יו', emoji: '🪀' },
  { upper: 'Z', lower: 'z', nameSay: 'זִי', sound: 'ז', word: 'zebra', wordHe: 'זברה', emoji: '🦓' },
]

export const LETTERS_SEO: {
  h1: string
  metaTitle: string
  description: string
  intro: string
  tips: string[]
  faq: { q: string; a: string }[]
} = {
  h1: 'האותיות באנגלית לילדים — ABC',
  metaTitle: 'האותיות באנגלית לילדים — ABC עם הגייה וצלילים',
  description: 'כל 26 האותיות באנגלית לילדים: שם כל אות, הצליל שלה, אות גדולה וקטנה ומילה לדוגמה, עם הגייה בעברית. וטיפים ללימוד ה־ABC בבית.',
  intro: 'באנגלית יש 26 אותיות, מ־A ועד Z. לכל אות יש שם (למשל A נקראת "אֵיי") וצליל שהיא משמיעה בתוך מילה (A ב־apple נשמעת "אַ"), ולכל אות יש צורה גדולה (A) וצורה קטנה (a). כדי לקרוא, הילדים צריכים להכיר את שלושת הדברים האלה — את השם, את הצליל ואת שתי הצורות.',
  tips: [
    'בכל פעם שאתם אומרים אות, אמרו גם את הצליל שלה ומילה שמתחילה בה: "B — בּ — ball".',
    'חפשו יחד אותיות באנגלית בסביבה — על קופסאות במטבח, על שלטים ועל בגדים — ובקשו מהילדים לומר את שמן.',
    'הכינו כרטיסיות של אותיות גדולות וקטנות, ושחקו "זיכרון" שבו צריך למצוא את הזוג A–a.',
    'אל תנסו את כל 26 האותיות בבת אחת: התמקדו בכמה אותיות בשבוע וחזרו עליהן לפני שמוסיפים חדשות.',
  ],
  faq: [
    {
      q: 'באיזה סדר מלמדים את האותיות באנגלית?',
      a: 'אפשר ללמד לפי סדר ה־ABC, אבל בתוכניות פוניקה רבות מלמדים בקבוצות של אותיות שקל לצרף מהן מילים קצרות מוקדם, למשל t, m, a, b, n. כך הילדים מתחילים לקרוא מילים כמו bat ו־man כבר אחרי כמה אותיות.',
    },
    {
      q: 'מה ההבדל בין שם האות לצליל שלה?',
      a: 'שם האות הוא איך שקוראים לה ב־ABC (C נקראת "סִי"), והצליל הוא מה שהיא משמיעה בתוך מילה (C ב־cat נשמעת "ק"). לקריאה צריך בעיקר את הצליל, ולכן חשוב ללמד את שניהם.',
    },
    {
      q: 'ללמד קודם אותיות גדולות או קטנות?',
      a: 'רוב הטקסט שהילדים יקראו כתוב באותיות קטנות, ולכן כדאי ללמד את שתי הצורות יחד, כזוג (Aa), ולא לחכות עם הקטנות. אותיות גדולות משמשות בעיקר בתחילת משפט ובשמות.',
    },
  ],
}
