export interface SoundWord { word: string; emoji: string; tts?: string; hebrew?: string }
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
    id: 'ie', label: 'ie', hebrewLabel: 'ie — צליל e ארוך', subtitle: 'long e sound',
    note: 'הצמד ie נשמע לרוב כמו e ארוך',
    color: 'from-emerald-500 to-green-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-300',
    emoji: '🌾',
    words: [
      { word: 'FIELD', emoji: '🌾', hebrew: 'שדה' }, { word: 'CHIEF', emoji: '👨‍✈️', hebrew: 'ראש, מנהיג' }, { word: 'THIEF', emoji: '🦹', hebrew: 'גנב' },
      { word: 'PIECE', emoji: '🧩', hebrew: 'חתיכה' }, { word: 'COOKIE', emoji: '🍪', hebrew: 'עוגייה' }, { word: 'BELIEVE', emoji: '🙏', hebrew: 'להאמין' },
      { word: 'MOVIE', emoji: '🎬', hebrew: 'סרט' },
    ],
  },
  {
    id: 'y-as-i', label: 'y', hebrewLabel: 'y — נשמע כמו i ארוך', subtitle: 'y as long i',
    note: 'בסוף מילים קצרות, y נשמע כמו i ארוך — כמו במילה my',
    color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-300',
    emoji: '✋',
    words: [
      { word: 'MY', emoji: '✋', hebrew: 'שלי' }, { word: 'CRY', emoji: '😢', hebrew: 'לבכות' }, { word: 'FLY', emoji: '🪰', hebrew: 'זבוב / לעוף' },
      { word: 'SKY', emoji: '🌌', hebrew: 'שמיים' }, { word: 'TRY', emoji: '💪', hebrew: 'לנסות' }, { word: 'WHY', emoji: '❓', hebrew: 'למה' },
      { word: 'DRY', emoji: '🌵', hebrew: 'יבש' }, { word: 'SHY', emoji: '😳', hebrew: 'ביישן' },
    ],
  },
  {
    id: 'tch', label: 'tch', hebrewLabel: 'tch — צליל ch', subtitle: 'ch sound',
    note: 'הצירוף tch נשמע כמו ch ומגיע אחרי תנועה קצרה',
    color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300',
    emoji: '⚾',
    words: [
      { word: 'CATCH', emoji: '⚾', hebrew: 'לתפוס' }, { word: 'WATCH', emoji: '⌚', hebrew: 'שעון / לצפות' }, { word: 'MATCH', emoji: '🔥', hebrew: 'גפרור' },
      { word: 'WITCH', emoji: '🧙', hebrew: 'מכשפה' }, { word: 'KITCHEN', emoji: '🍳', hebrew: 'מטבח' }, { word: 'PATCH', emoji: '🩹', hebrew: 'טלאי' },
      { word: 'ITCH', emoji: '😣', hebrew: 'גירוד' },
    ],
  },
  {
    id: 'dge', label: 'dge', hebrewLabel: 'dge — צליל j', subtitle: 'j sound',
    note: 'הצירוף dge נשמע כמו j ומגיע אחרי תנועה קצרה',
    color: 'from-sky-500 to-blue-600', bgColor: 'bg-sky-50', textColor: 'text-sky-700', borderColor: 'border-sky-300',
    emoji: '🌉',
    words: [
      { word: 'BRIDGE', emoji: '🌉', hebrew: 'גשר' }, { word: 'BADGE', emoji: '🎖️', hebrew: 'תג' }, { word: 'EDGE', emoji: '📐', hebrew: 'קצה' },
      { word: 'FUDGE', emoji: '🍫', hebrew: 'פאדג׳ (ממתק שוקולד)' }, { word: 'HEDGE', emoji: '🌳', hebrew: 'גדר חיה' }, { word: 'JUDGE', emoji: '👨‍⚖️', hebrew: 'שופט' },
      { word: 'LODGE', emoji: '🏚️', hebrew: 'בקתה' }, { word: 'SLEDGE', emoji: '🛷', hebrew: 'מזחלת' },
    ],
  },
  {
    id: 'tion', label: 'tion', hebrewLabel: 'tion — נשמע שן', subtitle: 'shun sound',
    note: 'הסיומת tion נשמעת כמו "שן"',
    color: 'from-rose-500 to-pink-600', bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300',
    emoji: '🏴',
    words: [
      { word: 'NATION', emoji: '🏴', hebrew: 'אומה' }, { word: 'STATION', emoji: '🚉', hebrew: 'תחנה' }, { word: 'ACTION', emoji: '🎬', hebrew: 'פעולה' },
      { word: 'LOTION', emoji: '🧴', hebrew: 'קרם גוף' }, { word: 'MOTION', emoji: '🌀', hebrew: 'תנועה' }, { word: 'FICTION', emoji: '📖', hebrew: 'סיפור דמיוני' },
      { word: 'VACATION', emoji: '🏖️', hebrew: 'חופשה' }, { word: 'OPTION', emoji: '🔘', hebrew: 'אפשרות' },
    ],
  },
  {
    id: 'sion', label: 'sion', hebrewLabel: 'sion — נשמע ז׳ן', subtitle: 'zhun sound',
    note: 'הסיומת sion נשמעת כמו "ז׳ן"',
    color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-300',
    emoji: '👁️',
    words: [
      { word: 'VISION', emoji: '👁️', hebrew: 'ראייה' }, { word: 'TELEVISION', emoji: '📺', hebrew: 'טלוויזיה' },
      { word: 'DECISION', emoji: '🤔', hebrew: 'החלטה' }, { word: 'EXPLOSION', emoji: '💥', hebrew: 'פיצוץ' },
    ],
  },
  {
    id: 'ture', label: 'ture', hebrewLabel: 'ture — נשמע צ׳ר', subtitle: 'cher sound',
    note: 'הסיומת ture נשמעת כמו "צ׳ר"',
    color: 'from-teal-500 to-cyan-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-300',
    emoji: '🖼️',
    words: [
      { word: 'PICTURE', emoji: '🖼️', hebrew: 'תמונה' }, { word: 'NATURE', emoji: '🌿', hebrew: 'טבע' }, { word: 'FUTURE', emoji: '🔮', hebrew: 'עתיד' },
      { word: 'MIXTURE', emoji: '🧪', hebrew: 'תערובת' }, { word: 'CREATURE', emoji: '👾', hebrew: 'יצור' },
      { word: 'ADVENTURE', emoji: '🗺️', hebrew: 'הרפתקה' }, { word: 'FURNITURE', emoji: '🛋️', hebrew: 'רהיטים' },
    ],
  },
]

export function getSound(id: string): Sound | undefined {
  return SOUNDS.find(s => s.id === id)
}
