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
    id: 'ie', label: 'ie', hebrewLabel: 'ie — צליל e ארוך', subtitle: 'long e sound',
    note: 'הצמד ie נשמע לרוב כמו e ארוך',
    color: 'from-emerald-500 to-green-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-300',
    emoji: '🌾',
    words: [
      { word: 'FIELD', emoji: '🌾' }, { word: 'CHIEF', emoji: '👨‍✈️' }, { word: 'THIEF', emoji: '🦹' },
      { word: 'PIECE', emoji: '🧩' }, { word: 'BRIEF', emoji: '📋' }, { word: 'COOKIE', emoji: '🍪' },
      { word: 'NIECE', emoji: '👧' }, { word: 'BELIEVE', emoji: '🙏' },
    ],
  },
  {
    id: 'y-as-i', label: 'y', hebrewLabel: 'y — נשמע כמו i ארוך', subtitle: 'y as long i',
    note: 'בסוף מילים קצרות, y נשמע כמו i ארוך — כמו במילה my',
    color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-300',
    emoji: '✋',
    words: [
      { word: 'MY', emoji: '✋' }, { word: 'CRY', emoji: '😢' }, { word: 'FLY', emoji: '🪰' },
      { word: 'SKY', emoji: '🌌' }, { word: 'TRY', emoji: '💪' }, { word: 'WHY', emoji: '❓' },
      { word: 'DRY', emoji: '🌵' }, { word: 'SHY', emoji: '😳' },
    ],
  },
  {
    id: 'tch', label: 'tch', hebrewLabel: 'tch — צליל ch', subtitle: 'ch sound',
    note: 'הצירוף tch נשמע כמו ch ומגיע אחרי תנועה קצרה',
    color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-300',
    emoji: '⚾',
    words: [
      { word: 'CATCH', emoji: '⚾' }, { word: 'WATCH', emoji: '⌚' }, { word: 'MATCH', emoji: '🔥' },
      { word: 'WITCH', emoji: '🧙' }, { word: 'KITCHEN', emoji: '🍳' }, { word: 'PATCH', emoji: '🩹' },
      { word: 'ITCH', emoji: '😣' }, { word: 'FETCH', emoji: '🐕' },
    ],
  },
  {
    id: 'dge', label: 'dge', hebrewLabel: 'dge — צליל j', subtitle: 'j sound',
    note: 'הצירוף dge נשמע כמו j ומגיע אחרי תנועה קצרה',
    color: 'from-sky-500 to-blue-600', bgColor: 'bg-sky-50', textColor: 'text-sky-700', borderColor: 'border-sky-300',
    emoji: '🌉',
    words: [
      { word: 'BRIDGE', emoji: '🌉' }, { word: 'BADGE', emoji: '🎖️' }, { word: 'EDGE', emoji: '📐' },
      { word: 'FUDGE', emoji: '🍫' }, { word: 'HEDGE', emoji: '🌳' }, { word: 'JUDGE', emoji: '👨‍⚖️' },
      { word: 'DODGE', emoji: '🤾' }, { word: 'LEDGE', emoji: '🧗' },
    ],
  },
  {
    id: 'tion', label: 'tion', hebrewLabel: 'tion — נשמע שן', subtitle: 'shun sound',
    note: 'הסיומת tion נשמעת כמו "שן"',
    color: 'from-rose-500 to-pink-600', bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-300',
    emoji: '🏴',
    words: [
      { word: 'NATION', emoji: '🏴' }, { word: 'STATION', emoji: '🚉' }, { word: 'ACTION', emoji: '🎬' },
      { word: 'LOTION', emoji: '🧴' }, { word: 'MOTION', emoji: '🌀' }, { word: 'FICTION', emoji: '📖' },
      { word: 'ADDITION', emoji: '➕' }, { word: 'VACATION', emoji: '🏖️' },
    ],
  },
  {
    id: 'sion', label: 'sion', hebrewLabel: 'sion — נשמע ז׳ן', subtitle: 'zhun sound',
    note: 'הסיומת sion נשמעת כמו "ז׳ן" או "שן"',
    color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-300',
    emoji: '👁️',
    words: [
      { word: 'VISION', emoji: '👁️' }, { word: 'TELEVISION', emoji: '📺' }, { word: 'MISSION', emoji: '🚀' },
      { word: 'MANSION', emoji: '🏰' }, { word: 'SESSION', emoji: '📅' }, { word: 'DECISION', emoji: '🤔' },
      { word: 'DIVISION', emoji: '➗' }, { word: 'EXPLOSION', emoji: '💥' },
    ],
  },
  {
    id: 'ture', label: 'ture', hebrewLabel: 'ture — נשמע צ׳ר', subtitle: 'cher sound',
    note: 'הסיומת ture נשמעת כמו "צ׳ר"',
    color: 'from-teal-500 to-cyan-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-300',
    emoji: '🖼️',
    words: [
      { word: 'PICTURE', emoji: '🖼️' }, { word: 'NATURE', emoji: '🌿' }, { word: 'FUTURE', emoji: '🔮' },
      { word: 'CAPTURE', emoji: '📸' }, { word: 'MIXTURE', emoji: '🧪' }, { word: 'CREATURE', emoji: '👾' },
      { word: 'ADVENTURE', emoji: '🗺️' }, { word: 'FURNITURE', emoji: '🛋️' },
    ],
  },
]

export function getSound(id: string): Sound | undefined {
  return SOUNDS.find(s => s.id === id)
}
