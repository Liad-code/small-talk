export interface SoundWord { word: string; emoji: string; tts?: string }
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
      { word: 'KNEE', emoji: '🦵' }, { word: 'KNIFE', emoji: '🔪' }, { word: 'KNOCK', emoji: '🚪' },
      { word: 'KNIT', emoji: '🧶' }, { word: 'KNOW', emoji: '💡' }, { word: 'KNIGHT', emoji: '⚔️' },
    ],
  },
  {
    id: 'qu', label: 'qu', hebrewLabel: 'qu — נשמע כמו kw', subtitle: 'sounds like kw',
    note: 'בצמד qu, האות q תמיד מלווה ב-u ויחד נשמעים כמו kw',
    color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-300',
    emoji: '👑',
    words: [
      { word: 'QUEEN', emoji: '👑' }, { word: 'QUICK', emoji: '⚡' }, { word: 'QUIET', emoji: '🤫' },
      { word: 'QUIZ', emoji: '❓' }, { word: 'QUARTER', emoji: '🪙' },
    ],
  },
  {
    id: 'wr', label: 'wr', hebrewLabel: 'wr — האות w שקטה', subtitle: 'silent w',
    note: 'כאשר המילה מתחילה ב-wr, האות w שקטה ושומעים רק את r',
    color: 'from-rose-500 to-pink-600', bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300',
    emoji: '✍️',
    words: [
      { word: 'WRITE', emoji: '✍️' }, { word: 'WRAP', emoji: '🎁' },
      { word: 'WRIST', emoji: '⌚' }, { word: 'WRONG', emoji: '❌' },
    ],
  },
  {
    id: 'ng', label: 'ng', hebrewLabel: 'ng — צליל מיוחד בסוף מילה', subtitle: 'nasal sound',
    note: 'הצמד ng מופיע בסוף מילה ויוצר צליל מיוחד',
    color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-300',
    emoji: '🔔',
    words: [
      { word: 'RING', emoji: '💍' }, { word: 'SING', emoji: '🎤' }, { word: 'KING', emoji: '👑' },
      { word: 'LONG', emoji: '📏' }, { word: 'STRONG', emoji: '💪' }, { word: 'BRING', emoji: '🎁' },
      { word: 'SONG', emoji: '🎵' }, { word: 'WING', emoji: '🦋' },
    ],
  },
  {
    id: 'ow-oa', label: 'ow / oa', hebrewLabel: 'ow / oa — צליל o ארוך', subtitle: 'long o sound',
    note: 'ow ו-oa שניהם נשמעים כמו o ארוך — כמו במילה go',
    color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300',
    emoji: '🌊',
    words: [
      // ow words
      { word: 'SNOW', emoji: '❄️' }, { word: 'BLOW', emoji: '💨' },
      { word: 'THROW', emoji: '⚾' }, { word: 'WINDOW', emoji: '🪟' }, { word: 'YELLOW', emoji: '💛' },
      // oa words
      { word: 'COAT', emoji: '🧥' }, { word: 'ROAD', emoji: '🛣️' }, { word: 'GOAT', emoji: '🐐' },
      { word: 'TOAST', emoji: '🍞' }, { word: 'BOAT', emoji: '⛵' }, { word: 'SOAP', emoji: '🧼' },
    ],
  },
  {
    id: 'ow-ou', label: 'ow / ou', hebrewLabel: 'ow / ou — נשמע אאוו', subtitle: 'ow sound',
    note: 'הצמדים ow/ou נשמעים אאוו',
    color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-300',
    emoji: '☁️',
    words: [
      // ow words
      { word: 'TOWN', emoji: '🏘️' }, { word: 'BROWN', emoji: '🤎' },
      { word: 'DOWN', emoji: '⬇️' }, { word: 'COW', emoji: '🐄' }, { word: 'CROWN', emoji: '👑' },
      // ou words
      { word: 'CLOUD', emoji: '☁️' }, { word: 'HOUSE', emoji: '🏠' }, { word: 'FOUND', emoji: '🔍' },
      { word: 'MOUTH', emoji: '👄' }, { word: 'COUNT', emoji: '🔢' },
      { word: 'OUT', emoji: '🚪' }, { word: 'MOUSE', emoji: '🐭' }, { word: 'ROUND', emoji: '⭕' },
    ],
  },
  {
    id: 'oi-oy', label: 'oi / oy', hebrewLabel: 'oi / oy — צליל oi', subtitle: 'oi sound',
    note: 'oi ו-oy שניהם נשמעים אותו דבר — כמו "אוי"',
    color: 'from-yellow-500 to-amber-600', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-300',
    emoji: '🪙',
    words: [
      // oi words
      { word: 'OIL', emoji: '🫙' }, { word: 'COIN', emoji: '🪙' }, { word: 'JOIN', emoji: '🤝' },
      { word: 'POINT', emoji: '☝️' }, { word: 'NOISE', emoji: '🔊' },
      // oy words
      { word: 'BOY', emoji: '👦' }, { word: 'TOY', emoji: '🧸' }, { word: 'ENJOY', emoji: '😊' },
    ],
  },
  {
    id: 'r-controlled', label: 'r controlled', hebrewLabel: 'ir · ur · or · ar · er', subtitle: 'ir, ur, or, ar, er',
    note: 'כאשר r מגיעה אחרי תנועה, היא משנה את הצליל שלה',
    color: 'from-red-500 to-rose-600', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-300',
    emoji: '🐦',
    words: [
      // ir
      { word: 'BIRD', emoji: '🐦' }, { word: 'GIRL', emoji: '👧' }, { word: 'SHIRT', emoji: '👕' },
      // ur
      { word: 'TURN', emoji: '↩️' }, { word: 'BURN', emoji: '🔥' }, { word: 'NURSE', emoji: '👩‍⚕️' },
      // or
      { word: 'CORN', emoji: '🌽' }, { word: 'FORK', emoji: '🍴' }, { word: 'STORM', emoji: '⛈️' },
      // ar
      { word: 'CAR', emoji: '🚗' }, { word: 'STAR', emoji: '⭐' }, { word: 'PARK', emoji: '🌳' }, { word: 'SHARK', emoji: '🦈' },
      // er
      { word: 'HER', emoji: '👩' }, { word: 'MOTHER', emoji: '👩‍👦' }, { word: 'SUMMER', emoji: '☀️' }, { word: 'COMPUTER', emoji: '💻' },
    ],
  },
  {
    id: 'ey', label: 'ey', hebrewLabel: 'ey — צליל e ארוך', subtitle: 'long e sound',
    note: 'הצמד ey בסוף מילה נשמע כמו e long',
    color: 'from-cyan-500 to-teal-600', bgColor: 'bg-cyan-50', textColor: 'text-cyan-700', borderColor: 'border-cyan-300',
    emoji: '🔑',
    words: [
      { word: 'KEY', emoji: '🔑' }, { word: 'MONEY', emoji: '💰' }, { word: 'HONEY', emoji: '🍯' },
      { word: 'TURKEY', emoji: '🦃' }, { word: 'MONKEY', emoji: '🐒' }, { word: 'VALLEY', emoji: '🏔️' },
      { word: 'DONKEY', emoji: '🫏' },
    ],
  },
  {
    id: 'igh', label: 'igh', hebrewLabel: 'igh — צליל i ארוך', subtitle: 'long i sound',
    note: 'הצמד igh נשמע כמו i ארוך — כמו במילה "my"',
    color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-300',
    emoji: '🌙',
    words: [
      { word: 'NIGHT', emoji: '🌙' }, { word: 'LIGHT', emoji: '💡' }, { word: 'RIGHT', emoji: '✅' },
      { word: 'HIGH', emoji: '⬆️' }, { word: 'FIGHT', emoji: '🥊' }, { word: 'BRIGHT', emoji: '☀️' },
      { word: 'FLIGHT', emoji: '✈️' }, { word: 'TIGHT', emoji: '🤏' },
    ],
  },
  {
    id: 'ew-ue', label: 'ew / ue', hebrewLabel: 'ew / ue — צליל oo', subtitle: 'oo sound',
    note: 'ew ו-ue שניהם יכולים לשמוע כמו "אוּ"',
    color: 'from-sky-500 to-blue-600', bgColor: 'bg-sky-50', textColor: 'text-sky-700', borderColor: 'border-sky-300',
    emoji: '💧',
    words: [
      // ew words
      { word: 'NEW', emoji: '✨' }, { word: 'FEW', emoji: '🤏' },
      { word: 'GREW', emoji: '🌱' }, { word: 'THREW', emoji: '⚾' },
      // ue words
      { word: 'BLUE', emoji: '💙' }, { word: 'GLUE', emoji: '🔧' },
      { word: 'CLUE', emoji: '🔍' }, { word: 'TRUE', emoji: '✅' },
    ],
  },
  {
    id: 'wa', label: 'wa', hebrewLabel: 'wa — נשמע כמו wo', subtitle: 'sounds like wo',
    note: 'כאשר w מגיעה לפני a, הצליל של a משתנה ונשמע כמו o',
    color: 'from-teal-500 to-green-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-300',
    emoji: '💧',
    words: [
      { word: 'WATER', emoji: '💧' }, { word: 'WATCH', emoji: '⌚' }, { word: 'WALK', emoji: '🚶' },
      { word: 'WANT', emoji: '🙏' }, { word: 'WASH', emoji: '🚿' }, { word: 'WASP', emoji: '🐝' },
      { word: 'WALL', emoji: '🧱' },
    ],
  },
  {
    id: 'soft-g', label: 'soft g', hebrewLabel: 'g רכה — נשמע כמו j', subtitle: 'sounds like j',
    note: 'g לפני e, i, או y נשמעת כמו j — הצליל הרך',
    color: 'from-lime-500 to-green-600', bgColor: 'bg-lime-50', textColor: 'text-lime-700', borderColor: 'border-lime-300',
    emoji: '🦒',
    words: [
      // ge
      { word: 'GEM', emoji: '💎' }, { word: 'GENTLY', emoji: '🤲' },
      { word: 'PAGE', emoji: '📄' }, { word: 'ANGEL', emoji: '👼' },
      { word: 'DANGER', emoji: '⚠️' }, { word: 'BRIDGE', emoji: '🌉' },
      // gi
      { word: 'GIRAFFE', emoji: '🦒' }, { word: 'GINGER', emoji: '🌿' },
      { word: 'GIANT', emoji: '🏔️' }, { word: 'MAGIC', emoji: '✨' },
      // gy
      { word: 'GYM', emoji: '🏋️' }, { word: 'ENERGY', emoji: '⚡' },
    ],
  },
  {
    id: 'soft-c', label: 'soft c', hebrewLabel: 'c רכה — נשמע כמו s', subtitle: 'sounds like s',
    note: 'c לפני e, i, או y נשמעת כמו s — הצליל הרך',
    color: 'from-fuchsia-500 to-pink-600', bgColor: 'bg-fuchsia-50', textColor: 'text-fuchsia-700', borderColor: 'border-fuchsia-300',
    emoji: '🏙️',
    words: [
      // ce
      { word: 'FACE', emoji: '😊' }, { word: 'DANCE', emoji: '💃' },
      { word: 'PLACE', emoji: '📍' }, { word: 'ICE', emoji: '🧊' },
      { word: 'RICE', emoji: '🍚' }, { word: 'POLICE', emoji: '👮' },
      // ci
      { word: 'CITY', emoji: '🏙️' }, { word: 'CIRCLE', emoji: '⭕' }, { word: 'PENCIL', emoji: '✏️' },
    ],
  },
]

export function getSound(id: string): Sound | undefined {
  return SOUNDS.find(s => s.id === id)
}
