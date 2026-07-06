export interface SoundWord { word: string; emoji: string; hebrew?: string; tts?: string }
export interface Sound {
  id: string
  label: string
  hebrewLabel: string
  subtitle?: string
  note?: string
  color: string
  bgColor: string
  textColor: string
  borderColor: string
  emoji: string
  words: SoundWord[]
}

export const SOUNDS: Sound[] = [
  {
    id: 'kn', label: 'kn', hebrewLabel: 'kn — האות k שקטה', subtitle: 'silent k',
    note: 'כאשר המילה מתחילה ב-kn, האות k שקטה ושומעים רק את n',
    color: 'from-slate-500 to-gray-600', bgColor: 'bg-slate-50', textColor: 'text-slate-700', borderColor: 'border-slate-300',
    emoji: '🦵',
    words: [
      { word: 'KNEE', emoji: '🦵', hebrew: 'ברך' }, { word: 'KNIFE', emoji: '🔪', hebrew: 'סכין' }, { word: 'KNOCK', emoji: '🚪', hebrew: 'לדפוק' },
      { word: 'KNIT', emoji: '🧶', hebrew: 'לסרוג' }, { word: 'KNOW', emoji: '💡', hebrew: 'לדעת' }, { word: 'KNIGHT', emoji: '⚔️', hebrew: 'אביר' },
    ],
  },
  {
    id: 'qu', label: 'qu', hebrewLabel: 'qu — נשמע כמו kw', subtitle: 'sounds like kw',
    note: 'בצמד qu, האות q תמיד מלווה ב-u ויחד נשמעים כמו kw',
    color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-300',
    emoji: '👑',
    words: [
      { word: 'QUEEN', emoji: '👑', hebrew: 'מלכה' }, { word: 'QUICK', emoji: '⚡', hebrew: 'מהיר' }, { word: 'QUIET', emoji: '🤫', hebrew: 'שקט' },
      { word: 'QUIZ', emoji: '❓', hebrew: 'חידון' }, { word: 'QUARTER', emoji: '🪙', hebrew: 'רבע' },
    ],
  },
  {
    id: 'wr', label: 'wr', hebrewLabel: 'wr — האות w שקטה', subtitle: 'silent w',
    note: 'כאשר המילה מתחילה ב-wr, האות w שקטה ושומעים רק את r',
    color: 'from-rose-500 to-pink-600', bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300',
    emoji: '✍️',
    words: [
      { word: 'WRITE', emoji: '✍️', hebrew: 'לכתוב' }, { word: 'WRAP', emoji: '🎁', hebrew: 'לעטוף' },
      { word: 'WRIST', emoji: '⌚', hebrew: 'פרק כף היד' }, { word: 'WRONG', emoji: '❌', hebrew: 'לא נכון' },
    ],
  },
  {
    id: 'ng', label: 'ng', hebrewLabel: 'ng — צליל מיוחד בסוף מילה', subtitle: 'nasal sound',
    note: 'הצמד ng מופיע בסוף מילה ויוצר צליל מיוחד',
    color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-300',
    emoji: '🔔',
    words: [
      { word: 'RING', emoji: '💍', hebrew: 'טבעת' }, { word: 'SING', emoji: '🎤', hebrew: 'לשיר' }, { word: 'KING', emoji: '👑', hebrew: 'מלך' },
      { word: 'LONG', emoji: '📏', hebrew: 'ארוך' }, { word: 'STRONG', emoji: '💪', hebrew: 'חזק' }, { word: 'BRING', emoji: '🎁', hebrew: 'להביא' },
      { word: 'SONG', emoji: '🎵', hebrew: 'שיר' }, { word: 'WING', emoji: '🦋', hebrew: 'כנף' },
    ],
  },
  {
    id: 'ow-oa', label: 'ow / oa', hebrewLabel: 'ow / oa — צליל o ארוך', subtitle: 'long o sound',
    note: 'ow ו-oa שניהם נשמעים כמו o ארוך — כמו במילה go',
    color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300',
    emoji: '🌊',
    words: [
      // ow words
      { word: 'SNOW', emoji: '❄️', hebrew: 'שלג' }, { word: 'BLOW', emoji: '💨', hebrew: 'לנשוף' },
      { word: 'THROW', emoji: '⚾', hebrew: 'לזרוק' }, { word: 'WINDOW', emoji: '🪟', hebrew: 'חלון' }, { word: 'YELLOW', emoji: '💛', hebrew: 'צהוב' },
      // oa words
      { word: 'COAT', emoji: '🧥', hebrew: 'מעיל' }, { word: 'ROAD', emoji: '🛣️', hebrew: 'כביש' }, { word: 'GOAT', emoji: '🐐', hebrew: 'עז' },
      { word: 'TOAST', emoji: '🍞', hebrew: 'טוסט' }, { word: 'BOAT', emoji: '⛵', hebrew: 'סירה' }, { word: 'SOAP', emoji: '🧼', hebrew: 'סבון' },
    ],
  },
  {
    id: 'ow-ou', label: 'ow / ou', hebrewLabel: 'ow / ou — נשמע אאוו', subtitle: 'ow sound',
    note: 'הצמדים ow/ou נשמעים אאוו',
    color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-300',
    emoji: '☁️',
    words: [
      // ow words
      { word: 'TOWN', emoji: '🏘️', hebrew: 'עיירה' }, { word: 'BROWN', emoji: '🤎', hebrew: 'חום' },
      { word: 'DOWN', emoji: '⬇️', hebrew: 'למטה' }, { word: 'COW', emoji: '🐄', hebrew: 'פרה' }, { word: 'CROWN', emoji: '👑', hebrew: 'כתר' },
      // ou words
      { word: 'CLOUD', emoji: '☁️', hebrew: 'ענן' }, { word: 'HOUSE', emoji: '🏠', hebrew: 'בית' }, { word: 'FOUND', emoji: '🔍', hebrew: 'מצא' },
      { word: 'MOUTH', emoji: '👄', hebrew: 'פה' }, { word: 'COUNT', emoji: '🔢', hebrew: 'לספור' },
      { word: 'OUT', emoji: '🚪', hebrew: 'בחוץ' }, { word: 'MOUSE', emoji: '🐭', hebrew: 'עכבר' }, { word: 'ROUND', emoji: '⭕', hebrew: 'עגול' },
    ],
  },
  {
    id: 'oi-oy', label: 'oi / oy', hebrewLabel: 'oi / oy — צליל oi', subtitle: 'oi sound',
    note: 'oi ו-oy שניהם נשמעים אותו דבר — כמו "אוי"',
    color: 'from-yellow-500 to-amber-600', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-300',
    emoji: '🪙',
    words: [
      // oi words
      { word: 'OIL', emoji: '🫙', hebrew: 'שמן' }, { word: 'COIN', emoji: '🪙', hebrew: 'מטבע' }, { word: 'JOIN', emoji: '🤝', hebrew: 'להצטרף' },
      { word: 'POINT', emoji: '☝️', hebrew: 'להצביע' }, { word: 'NOISE', emoji: '🔊', hebrew: 'רעש' },
      // oy words
      { word: 'BOY', emoji: '👦', hebrew: 'ילד' }, { word: 'TOY', emoji: '🧸', hebrew: 'צעצוע' }, { word: 'ENJOY', emoji: '😊', hebrew: 'ליהנות' },
    ],
  },
  {
    id: 'r-controlled', label: 'r controlled', hebrewLabel: 'ir · ur · or · ar · er', subtitle: 'ir, ur, or, ar, er',
    note: 'כאשר r מגיעה אחרי תנועה, היא משנה את הצליל שלה',
    color: 'from-red-500 to-rose-600', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-300',
    emoji: '🐦',
    words: [
      // ir
      { word: 'BIRD', emoji: '🐦', hebrew: 'ציפור' }, { word: 'GIRL', emoji: '👧', hebrew: 'ילדה' }, { word: 'SHIRT', emoji: '👕', hebrew: 'חולצה' },
      // ur
      { word: 'TURN', emoji: '↩️', hebrew: 'להסתובב' }, { word: 'BURN', emoji: '🔥', hebrew: 'לשרוף' }, { word: 'NURSE', emoji: '👩‍⚕️', hebrew: 'אחות' },
      // or
      { word: 'CORN', emoji: '🌽', hebrew: 'תירס' }, { word: 'FORK', emoji: '🍴', hebrew: 'מזלג' }, { word: 'STORM', emoji: '⛈️', hebrew: 'סערה' },
      // ar
      { word: 'CAR', emoji: '🚗', hebrew: 'מכונית' }, { word: 'STAR', emoji: '⭐', hebrew: 'כוכב' }, { word: 'PARK', emoji: '🌳', hebrew: 'פארק' }, { word: 'SHARK', emoji: '🦈', hebrew: 'כריש' },
      // er
      { word: 'HER', emoji: '👩', hebrew: 'שלה' }, { word: 'MOTHER', emoji: '👩‍👦', hebrew: 'אמא' }, { word: 'SUMMER', emoji: '☀️', hebrew: 'קיץ' }, { word: 'COMPUTER', emoji: '💻', hebrew: 'מחשב' },
    ],
  },
  {
    id: 'ey', label: 'ey', hebrewLabel: 'ey — צליל e ארוך', subtitle: 'long e sound',
    note: 'הצמד ey בסוף מילה נשמע כמו e long',
    color: 'from-cyan-500 to-teal-600', bgColor: 'bg-cyan-50', textColor: 'text-cyan-700', borderColor: 'border-cyan-300',
    emoji: '🔑',
    words: [
      { word: 'KEY', emoji: '🔑', hebrew: 'מפתח' }, { word: 'MONEY', emoji: '💰', hebrew: 'כסף' }, { word: 'HONEY', emoji: '🍯', hebrew: 'דבש' },
      { word: 'TURKEY', emoji: '🦃', hebrew: 'תרנגול הודו' }, { word: 'MONKEY', emoji: '🐒', hebrew: 'קוף' }, { word: 'VALLEY', emoji: '🏔️', hebrew: 'עמק' },
      { word: 'DONKEY', emoji: '🫏', hebrew: 'חמור' },
    ],
  },
  {
    id: 'igh', label: 'igh', hebrewLabel: 'igh — צליל i ארוך', subtitle: 'long i sound',
    note: 'הצמד igh נשמע כמו i ארוך — כמו במילה "my"',
    color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-300',
    emoji: '🌙',
    words: [
      { word: 'NIGHT', emoji: '🌙', hebrew: 'לילה' }, { word: 'LIGHT', emoji: '💡', hebrew: 'אור' }, { word: 'RIGHT', emoji: '✅', hebrew: 'נכון' },
      { word: 'HIGH', emoji: '⬆️', hebrew: 'גבוה' }, { word: 'FIGHT', emoji: '🥊', hebrew: 'להילחם' }, { word: 'BRIGHT', emoji: '☀️', hebrew: 'בהיר' },
      { word: 'FLIGHT', emoji: '✈️', hebrew: 'טיסה' }, { word: 'TIGHT', emoji: '🤏', hebrew: 'הדוק' },
    ],
  },
  {
    id: 'ew-ue', label: 'ew / ue', hebrewLabel: 'ew / ue — צליל oo', subtitle: 'oo sound',
    note: 'ew ו-ue שניהם יכולים לשמוע כמו "אוּ"',
    color: 'from-sky-500 to-blue-600', bgColor: 'bg-sky-50', textColor: 'text-sky-700', borderColor: 'border-sky-300',
    emoji: '💧',
    words: [
      // ew words
      { word: 'NEW', emoji: '✨', hebrew: 'חדש' }, { word: 'FEW', emoji: '🤏', hebrew: 'מעט' },
      { word: 'GREW', emoji: '🌱', hebrew: 'גדל' }, { word: 'THREW', emoji: '⚾', hebrew: 'זרק' },
      // ue words
      { word: 'BLUE', emoji: '💙', hebrew: 'כחול' }, { word: 'GLUE', emoji: '🔧', hebrew: 'דבק' },
      { word: 'CLUE', emoji: '🔍', hebrew: 'רמז' }, { word: 'TRUE', emoji: '✅', hebrew: 'אמיתי' },
    ],
  },
  {
    id: 'wa', label: 'wa', hebrewLabel: 'wa — נשמע כמו wo', subtitle: 'sounds like wo',
    note: 'כאשר w מגיעה לפני a, הצליל של a משתנה ונשמע כמו o',
    color: 'from-teal-500 to-green-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-300',
    emoji: '💧',
    words: [
      { word: 'WATER', emoji: '💧', hebrew: 'מים' }, { word: 'WATCH', emoji: '⌚', hebrew: 'שעון' }, { word: 'WALK', emoji: '🚶', hebrew: 'ללכת' },
      { word: 'WANT', emoji: '🙏', hebrew: 'לרצות' }, { word: 'WASH', emoji: '🚿', hebrew: 'לשטוף' }, { word: 'WASP', emoji: '🐝', hebrew: 'צרעה' },
      { word: 'WALL', emoji: '🧱', hebrew: 'קיר' },
    ],
  },
  {
    id: 'soft-g', label: 'soft g', hebrewLabel: 'g רכה — נשמע כמו j', subtitle: 'sounds like j',
    note: 'g לפני e, i, או y נשמעת כמו j — הצליל הרך',
    color: 'from-lime-500 to-green-600', bgColor: 'bg-lime-50', textColor: 'text-lime-700', borderColor: 'border-lime-300',
    emoji: '🦒',
    words: [
      // ge
      { word: 'GEM', emoji: '💎', hebrew: 'אבן חן' }, { word: 'GENTLY', emoji: '🤲', hebrew: 'בעדינות' },
      { word: 'PAGE', emoji: '📄', hebrew: 'דף' }, { word: 'ANGEL', emoji: '👼', hebrew: 'מלאך' },
      { word: 'DANGER', emoji: '⚠️', hebrew: 'סכנה' }, { word: 'BRIDGE', emoji: '🌉', hebrew: 'גשר' },
      // gi
      { word: 'GIRAFFE', emoji: '🦒', hebrew: 'ג׳ירפה' }, { word: 'GINGER', emoji: '🌿', hebrew: 'ג׳ינג׳ר (זנגביל)' },
      { word: 'GIANT', emoji: '🏔️', hebrew: 'ענק' }, { word: 'MAGIC', emoji: '✨', hebrew: 'קסם' },
      // gy
      { word: 'GYM', emoji: '🏋️', hebrew: 'חדר כושר' }, { word: 'ENERGY', emoji: '⚡', hebrew: 'אנרגיה' },
    ],
  },
  {
    id: 'soft-c', label: 'soft c', hebrewLabel: 'c רכה — נשמע כמו s', subtitle: 'sounds like s',
    note: 'c לפני e, i, או y נשמעת כמו s — הצליל הרך',
    color: 'from-fuchsia-500 to-pink-600', bgColor: 'bg-fuchsia-50', textColor: 'text-fuchsia-700', borderColor: 'border-fuchsia-300',
    emoji: '🏙️',
    words: [
      // ce
      { word: 'FACE', emoji: '😊', hebrew: 'פנים' }, { word: 'DANCE', emoji: '💃', hebrew: 'לרקוד' },
      { word: 'PLACE', emoji: '📍', hebrew: 'מקום' }, { word: 'ICE', emoji: '🧊', hebrew: 'קרח' },
      { word: 'RICE', emoji: '🍚', hebrew: 'אורז' }, { word: 'POLICE', emoji: '👮', hebrew: 'משטרה' },
      // ci
      { word: 'CITY', emoji: '🏙️', hebrew: 'עיר' }, { word: 'CIRCLE', emoji: '⭕', hebrew: 'עיגול' }, { word: 'PENCIL', emoji: '✏️', hebrew: 'עיפרון' },
    ],
  },
]

export function getSound(id: string): Sound | undefined {
  return SOUNDS.find(s => s.id === id)
}
