export interface SoundWord { word: string; emoji: string; tts?: string }
export interface Sound {
  id: string
  label: string
  hebrewLabel: string
  subtitle?: string
  note?: string
  color: string        // Tailwind gradient
  bgColor: string
  textColor: string
  borderColor: string
  emoji: string
  words: SoundWord[]
}

export const SOUNDS: Sound[] = [
  {
    id: 'kn', label: 'KN', hebrewLabel: 'KN — האות K שקטה', subtitle: 'silent K',
    note: 'כאשר המילה מתחילה ב-kn, האות K שקטה ושומעים רק את N',
    color: 'from-slate-500 to-gray-600', bgColor: 'bg-slate-50', textColor: 'text-slate-700', borderColor: 'border-slate-300',
    emoji: '🦵',
    words: [
      { word: 'KNEE', emoji: '🦵' }, { word: 'KNIFE', emoji: '🔪' }, { word: 'KNOCK', emoji: '🚪' },
      { word: 'KNIT', emoji: '🧶' }, { word: 'KNOW', emoji: '💡' }, { word: 'KNIGHT', emoji: '⚔️' },
    ],
  },
  {
    id: 'qu', label: 'QU', hebrewLabel: 'QU — נשמע כמו KW', subtitle: 'sounds like KW',
    note: 'בצמד QU, האות Q תמיד מלווה ב-U ויחד נשמעים כמו KW',
    color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-300',
    emoji: '👑',
    words: [
      { word: 'QUEEN', emoji: '👑' }, { word: 'QUICK', emoji: '⚡' }, { word: 'QUIET', emoji: '🤫' },
      { word: 'QUIZ', emoji: '❓' }, { word: 'QUILT', emoji: '🛏️' }, { word: 'QUARTER', emoji: '🪙' },
    ],
  },
  {
    id: 'wr', label: 'WR', hebrewLabel: 'WR — האות W שקטה', subtitle: 'silent W',
    note: 'כאשר המילה מתחילה ב-wr, האות W שקטה ושומעים רק את R',
    color: 'from-rose-500 to-pink-600', bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300',
    emoji: '✍️',
    words: [
      { word: 'WRITE', emoji: '✍️' }, { word: 'WRAP', emoji: '🎁' }, { word: 'WRIST', emoji: '⌚' },
      { word: 'WRONG', emoji: '❌' }, { word: 'WRECK', emoji: '💥' }, { word: 'WROTE', emoji: '📝' },
    ],
  },
  {
    id: 'ng', label: 'NG', hebrewLabel: 'NG — צליל אנגי', subtitle: 'nasal sound',
    note: 'הצמד NG מופיע בסוף מילים ויוצר צליל אנגי מיוחד',
    color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-300',
    emoji: '🔔',
    words: [
      { word: 'RING', emoji: '💍' }, { word: 'SING', emoji: '🎤' }, { word: 'KING', emoji: '👑' },
      { word: 'LONG', emoji: '📏' }, { word: 'STRONG', emoji: '💪' }, { word: 'BRING', emoji: '🎁' },
      { word: 'SONG', emoji: '🎵' }, { word: 'WING', emoji: '🦋' },
    ],
  },
  {
    id: 'ow-oa', label: 'OW / OA', hebrewLabel: 'OW / OA — צליל O ארוך', subtitle: 'long O sound',
    note: 'OW ו-OA שניהם נשמעים כמו O ארוך — כמו במילה go',
    color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300',
    emoji: '🌊',
    words: [
      { word: 'SNOW', emoji: '❄️' }, { word: 'BLOW', emoji: '💨' }, { word: 'COAT', emoji: '🧥' },
      { word: 'ROAD', emoji: '🛣️' }, { word: 'GOAT', emoji: '🐐' }, { word: 'CROW', emoji: '🐦' },
      { word: 'TOAST', emoji: '🍞' }, { word: 'FLOW', emoji: '🌊' },
    ],
  },
  {
    id: 'ow-ou', label: 'OW / OU', hebrewLabel: 'OW / OU — צליל OW', subtitle: 'OW sound',
    note: 'OW ו-OU יכולים לשמוע כמו "אאוו" — כמו במילה ouch',
    color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-300',
    emoji: '☁️',
    words: [
      { word: 'CLOUD', emoji: '☁️' }, { word: 'HOUSE', emoji: '🏠' }, { word: 'TOWN', emoji: '🏘️' },
      { word: 'FOUND', emoji: '🔍' }, { word: 'MOUTH', emoji: '👄' }, { word: 'COUNT', emoji: '🔢' },
      { word: 'BROWN', emoji: '🤎' }, { word: 'DOWN', emoji: '⬇️' },
    ],
  },
  {
    id: 'oy-oi', label: 'OY / OI', hebrewLabel: 'OY / OI — צליל OI', subtitle: 'OI sound',
    note: 'OY ו-OI שניהם נשמעים אותו דבר — כמו "אוי"',
    color: 'from-yellow-500 to-amber-600', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-300',
    emoji: '🪙',
    words: [
      { word: 'BOY', emoji: '👦' }, { word: 'TOY', emoji: '🧸' }, { word: 'OIL', emoji: '🫙' },
      { word: 'COIN', emoji: '🪙' }, { word: 'JOIN', emoji: '🤝' }, { word: 'ENJOY', emoji: '😊' },
      { word: 'POINT', emoji: '☝️' }, { word: 'NOISE', emoji: '🔊' },
    ],
  },
  {
    id: 'r-controlled', label: 'R-Controlled', hebrewLabel: 'IR · UR · OR · AR · ER', subtitle: 'ir, ur, or, ar, er',
    note: 'כאשר R מגיעה אחרי תנועה, היא משנה את הצליל שלה',
    color: 'from-red-500 to-rose-600', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-300',
    emoji: '🐦',
    words: [
      { word: 'BIRD', emoji: '🐦' }, { word: 'GIRL', emoji: '👧' }, { word: 'TURN', emoji: '↩️' },
      { word: 'BURN', emoji: '🔥' }, { word: 'CORN', emoji: '🌽' }, { word: 'FORK', emoji: '🍴' },
      { word: 'CAR', emoji: '🚗' }, { word: 'STAR', emoji: '⭐' }, { word: 'HER', emoji: '👩' },
      { word: 'FERN', emoji: '🌿' },
    ],
  },
  {
    id: 'ey', label: 'EY', hebrewLabel: 'EY — צליל E ארוך', subtitle: 'long E sound',
    note: 'הצמד EY בסוף מילים נשמע כמו E ארוך',
    color: 'from-cyan-500 to-teal-600', bgColor: 'bg-cyan-50', textColor: 'text-cyan-700', borderColor: 'border-cyan-300',
    emoji: '🔑',
    words: [
      { word: 'KEY', emoji: '🔑' }, { word: 'MONEY', emoji: '💰' }, { word: 'HONEY', emoji: '🍯' },
      { word: 'TURKEY', emoji: '🦃' }, { word: 'MONKEY', emoji: '🐒' }, { word: 'VALLEY', emoji: '🏔️' },
      { word: 'DONKEY', emoji: '🫏' }, { word: 'JOCKEY', emoji: '🏇' },
    ],
  },
  {
    id: 'igh', label: 'IGH', hebrewLabel: 'IGH — צליל I ארוך', subtitle: 'long I sound',
    note: 'הצמד IGH נשמע כמו I ארוך — כמו במילה "my"',
    color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-300',
    emoji: '🌙',
    words: [
      { word: 'NIGHT', emoji: '🌙' }, { word: 'LIGHT', emoji: '💡' }, { word: 'RIGHT', emoji: '✅' },
      { word: 'HIGH', emoji: '⬆️' }, { word: 'FIGHT', emoji: '🥊' }, { word: 'BRIGHT', emoji: '☀️' },
      { word: 'FLIGHT', emoji: '✈️' }, { word: 'TIGHT', emoji: '🤏' },
    ],
  },
  {
    id: 'ew-ue', label: 'EW / UE', hebrewLabel: 'EW / UE — צליל OO', subtitle: 'OO sound',
    note: 'EW ו-UE שניהם יכולים לשמוע כמו "אוּ"',
    color: 'from-sky-500 to-blue-600', bgColor: 'bg-sky-50', textColor: 'text-sky-700', borderColor: 'border-sky-300',
    emoji: '💧',
    words: [
      { word: 'NEW', emoji: '✨' }, { word: 'FEW', emoji: '🤏' }, { word: 'BLUE', emoji: '💙' },
      { word: 'GLUE', emoji: '🔧' }, { word: 'CLUE', emoji: '🔍' }, { word: 'GREW', emoji: '🌱' },
      { word: 'TRUE', emoji: '✅' }, { word: 'THREW', emoji: '⚾' },
    ],
  },
  {
    id: 'wa', label: 'WA', hebrewLabel: 'WA — נשמע כמו WO', subtitle: 'sounds like WO',
    note: 'כאשר W מגיעה לפני A, הצליל של A משתנה ונשמע כמו O',
    color: 'from-teal-500 to-green-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-300',
    emoji: '💧',
    words: [
      { word: 'WATER', emoji: '💧' }, { word: 'WATCH', emoji: '⌚' }, { word: 'WALK', emoji: '🚶' },
      { word: 'WANT', emoji: '🙏' }, { word: 'WASH', emoji: '🚿' }, { word: 'WASP', emoji: '🐝' },
      { word: 'WALL', emoji: '🧱' }, { word: 'SWAM', emoji: '🏊' },
    ],
  },
  {
    id: 'soft-g', label: 'Soft G', hebrewLabel: 'G רכה — נשמע כמו J', subtitle: 'sounds like J',
    note: 'G לפני e, i, או y נשמעת כמו J — הצליל הרך',
    color: 'from-lime-500 to-green-600', bgColor: 'bg-lime-50', textColor: 'text-lime-700', borderColor: 'border-lime-300',
    emoji: '🦒',
    words: [
      { word: 'GIRAFFE', emoji: '🦒' }, { word: 'GEM', emoji: '💎' }, { word: 'GIANT', emoji: '🏔️' },
      { word: 'GYM', emoji: '🏋️' }, { word: 'GENTLY', emoji: '🤲' }, { word: 'GINGER', emoji: '🌿' },
      { word: 'MAGIC', emoji: '✨' }, { word: 'PAGE', emoji: '📄' },
    ],
  },
  {
    id: 'soft-c', label: 'Soft C', hebrewLabel: 'C רכה — נשמע כמו S', subtitle: 'sounds like S',
    note: 'C לפני e, i, או y נשמעת כמו S — הצליל הרך',
    color: 'from-fuchsia-500 to-pink-600', bgColor: 'bg-fuchsia-50', textColor: 'text-fuchsia-700', borderColor: 'border-fuchsia-300',
    emoji: '🏙️',
    words: [
      { word: 'CITY', emoji: '🏙️' }, { word: 'CIRCLE', emoji: '⭕' }, { word: 'CENT', emoji: '¢', tts: 'cent' },
      { word: 'PENCIL', emoji: '✏️' }, { word: 'DANCE', emoji: '💃' }, { word: 'FACE', emoji: '😊' },
      { word: 'ICE', emoji: '🧊' }, { word: 'PLACE', emoji: '📍' },
    ],
  },
]

export function getSound(id: string): Sound | undefined {
  return SOUNDS.find(s => s.id === id)
}
