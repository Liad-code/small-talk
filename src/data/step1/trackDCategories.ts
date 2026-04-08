export interface TrackDItem {
  word: string
  emoji: string
  ttsText?: string   // override if TTS needs a different phrase
}

export interface TrackDCategory {
  id: string
  title: string
  hebrewTitle: string
  emoji: string
  color: string        // Tailwind gradient
  bgColor: string
  borderColor: string
  textColor: string
  items: TrackDItem[]
}

export const TRACK_D_CATEGORIES: TrackDCategory[] = [
  {
    id: 'numbers', title: 'Numbers', hebrewTitle: 'מספרים', emoji: '🔢',
    color: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-400', textColor: 'text-blue-700',
    items: [
      { word: 'one', emoji: '1️⃣' }, { word: 'two', emoji: '2️⃣' }, { word: 'three', emoji: '3️⃣' },
      { word: 'four', emoji: '4️⃣' }, { word: 'five', emoji: '5️⃣' }, { word: 'six', emoji: '6️⃣' },
      { word: 'seven', emoji: '7️⃣' }, { word: 'eight', emoji: '8️⃣' }, { word: 'nine', emoji: '9️⃣' }, { word: 'ten', emoji: '🔟' },
    ],
  },
  {
    id: 'colors', title: 'Colors', hebrewTitle: 'צבעים', emoji: '🎨',
    color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-400', textColor: 'text-pink-700',
    items: [
      { word: 'red', emoji: '🔴' }, { word: 'yellow', emoji: '🟡' }, { word: 'blue', emoji: '🔵' },
      { word: 'black', emoji: '⚫' }, { word: 'green', emoji: '🟢' }, { word: 'orange', emoji: '🟠' },
    ],
  },
  {
    id: 'weather', title: 'Weather', hebrewTitle: 'מזג אוויר', emoji: '🌤️',
    color: 'from-sky-400 to-cyan-500', bgColor: 'bg-sky-50', borderColor: 'border-sky-400', textColor: 'text-sky-700',
    items: [
      { word: 'day', emoji: '🌅' }, { word: 'night', emoji: '🌙' }, { word: 'sun', emoji: '☀️' },
      { word: 'rain', emoji: '🌧️' }, { word: 'cloud', emoji: '☁️' }, { word: 'snow', emoji: '❄️' },
    ],
  },
  {
    id: 'seasons', title: 'Seasons', hebrewTitle: 'עונות השנה', emoji: '🍂',
    color: 'from-amber-400 to-orange-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-400', textColor: 'text-amber-700',
    items: [
      { word: 'summer', emoji: '🏖️' }, { word: 'spring', emoji: '🌸' },
      { word: 'fall', emoji: '🍂' }, { word: 'winter', emoji: '⛄' },
    ],
  },
  {
    id: 'emotions', title: 'Emotions', hebrewTitle: 'רגשות', emoji: '😊',
    color: 'from-yellow-400 to-amber-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-400', textColor: 'text-yellow-700',
    items: [
      { word: 'happy', emoji: '😊' }, { word: 'sad', emoji: '😢' },
      { word: 'angry', emoji: '😠' }, { word: 'sleepy', emoji: '😴' },
    ],
  },
  {
    id: 'days', title: 'Days of the Week', hebrewTitle: 'ימות השבוע', emoji: '📅',
    color: 'from-purple-400 to-violet-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-400', textColor: 'text-purple-700',
    items: [
      { word: 'Sunday', emoji: '🌟' }, { word: 'Monday', emoji: '📚' }, { word: 'Tuesday', emoji: '✏️' },
      { word: 'Wednesday', emoji: '🎨' }, { word: 'Thursday', emoji: '🎵' },
      { word: 'Friday', emoji: '🎉' }, { word: 'Saturday', emoji: '🛌' },
    ],
  },
  {
    id: 'face', title: 'Face', hebrewTitle: 'אברי הפנים', emoji: '👁️',
    color: 'from-rose-400 to-pink-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-400', textColor: 'text-rose-700',
    items: [
      { word: 'face', emoji: '😊' }, { word: 'ears', emoji: '👂' }, { word: 'nose', emoji: '👃' },
      { word: 'mouth', emoji: '👄' }, { word: 'eyes', emoji: '👁️' },
    ],
  },
  {
    id: 'body', title: 'Body', hebrewTitle: 'אברי הגוף', emoji: '🦴',
    color: 'from-orange-400 to-red-400', bgColor: 'bg-orange-50', borderColor: 'border-orange-400', textColor: 'text-orange-700',
    items: [
      { word: 'hands', emoji: '🤚' }, { word: 'body', emoji: '🧍' },
      { word: 'legs', emoji: '🦵' }, { word: 'head', emoji: '🧠' },
    ],
  },
  {
    id: 'senses', title: 'Senses', hebrewTitle: 'חושים', emoji: '👅',
    color: 'from-teal-400 to-green-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-400', textColor: 'text-teal-700',
    items: [
      { word: 'see', emoji: '👁️', ttsText: 'I can see' },
      { word: 'smell', emoji: '👃', ttsText: 'I can smell' },
      { word: 'hear', emoji: '👂', ttsText: 'I can hear' },
      { word: 'taste', emoji: '👅', ttsText: 'I can taste' },
      { word: 'touch', emoji: '🤚', ttsText: 'I can touch' },
    ],
  },
  {
    id: 'farm-animals', title: 'Farm Animals', hebrewTitle: 'חיות החווה', emoji: '🐔',
    color: 'from-lime-400 to-green-500', bgColor: 'bg-lime-50', borderColor: 'border-lime-400', textColor: 'text-lime-700',
    items: [
      { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }, { word: 'fish', emoji: '🐟' },
      { word: 'horse', emoji: '🐴' }, { word: 'sheep', emoji: '🐑' }, { word: 'chicken', emoji: '🐔' },
    ],
  },
  {
    id: 'jungle-animals', title: 'Jungle Animals', hebrewTitle: 'חיות הג׳ונגל', emoji: '🦁',
    color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', borderColor: 'border-green-400', textColor: 'text-green-700',
    items: [
      { word: 'lion', emoji: '🦁' }, { word: 'tiger', emoji: '🐯' }, { word: 'zebra', emoji: '🦓' },
      { word: 'elephant', emoji: '🐘' }, { word: 'snake', emoji: '🐍' }, { word: 'bear', emoji: '🐻' },
    ],
  },
  {
    id: 'prepositions', title: 'Prepositions', hebrewTitle: 'מילות יחס', emoji: '📍',
    color: 'from-indigo-400 to-blue-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-400', textColor: 'text-indigo-700',
    items: [
      { word: 'in', emoji: '📦' }, { word: 'on', emoji: '🪑' },
      { word: 'under', emoji: '⬇️' }, { word: 'next to', emoji: '👫' },
    ],
  },
  {
    id: 'fruits', title: 'Fruits', hebrewTitle: 'פירות', emoji: '🍎',
    color: 'from-red-400 to-orange-400', bgColor: 'bg-red-50', borderColor: 'border-red-400', textColor: 'text-red-700',
    items: [
      { word: 'apple', emoji: '🍎' }, { word: 'orange', emoji: '🍊' }, { word: 'banana', emoji: '🍌' },
      { word: 'mango', emoji: '🥭' }, { word: 'melon', emoji: '🍈' },
    ],
  },
  {
    id: 'clothes', title: 'Clothes', hebrewTitle: 'בגדים', emoji: '👕',
    color: 'from-violet-400 to-purple-500', bgColor: 'bg-violet-50', borderColor: 'border-violet-400', textColor: 'text-violet-700',
    items: [
      { word: 'hat', emoji: '🎩' }, { word: 'shirt', emoji: '👕' }, { word: 'shoes', emoji: '👟' },
      { word: 'coat', emoji: '🧥' }, { word: 'dress', emoji: '👗' }, { word: 'pants', emoji: '👖' },
    ],
  },
  {
    id: 'transport', title: 'Transport', hebrewTitle: 'כלי תחבורה', emoji: '🚗',
    color: 'from-blue-500 to-sky-400', bgColor: 'bg-blue-50', borderColor: 'border-blue-400', textColor: 'text-blue-700',
    items: [
      { word: 'car', emoji: '🚗' }, { word: 'bus', emoji: '🚌' }, { word: 'train', emoji: '🚂' },
      { word: 'ship', emoji: '🚢' }, { word: 'bike', emoji: '🚲' }, { word: 'jet', emoji: '✈️' },
    ],
  },
  {
    id: 'actions', title: 'Actions', hebrewTitle: 'פעולות', emoji: '🏃',
    color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-400', textColor: 'text-orange-700',
    items: [
      { word: 'drink', emoji: '🥤' }, { word: 'eat', emoji: '🍽️' }, { word: 'sleep', emoji: '💤' },
      { word: 'run', emoji: '🏃' }, { word: 'jump', emoji: '🦘' }, { word: 'dance', emoji: '💃' },
    ],
  },
  {
    id: 'opposites', title: 'Opposites', hebrewTitle: 'הפכים', emoji: '↔️',
    color: 'from-pink-500 to-rose-400', bgColor: 'bg-pink-50', borderColor: 'border-pink-400', textColor: 'text-pink-700',
    items: [
      { word: 'big / small', emoji: '🐘🐭', ttsText: 'big and small' },
      { word: 'hot / cold', emoji: '🔥❄️', ttsText: 'hot and cold' },
      { word: 'up / down', emoji: '⬆️⬇️', ttsText: 'up and down' },
      { word: 'slow / fast', emoji: '🐢🐇', ttsText: 'slow and fast' },
    ],
  },
  {
    id: 'shapes', title: 'Shapes', hebrewTitle: 'צורות', emoji: '🔷',
    color: 'from-cyan-400 to-blue-400', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-400', textColor: 'text-cyan-700',
    items: [
      { word: 'circle', emoji: '⭕' }, { word: 'square', emoji: '🟥' }, { word: 'triangle', emoji: '🔺' },
      { word: 'heart', emoji: '❤️' }, { word: 'star', emoji: '⭐' },
    ],
  },
  {
    id: 'meals', title: 'Meals', hebrewTitle: 'ארוחות', emoji: '🍽️',
    color: 'from-amber-400 to-yellow-400', bgColor: 'bg-amber-50', borderColor: 'border-amber-400', textColor: 'text-amber-700',
    items: [
      { word: 'breakfast', emoji: '🥞' }, { word: 'lunch', emoji: '🥗' }, { word: 'dinner', emoji: '🍝' },
    ],
  },
  {
    id: 'food', title: 'Food', hebrewTitle: 'אוכל', emoji: '🥚',
    color: 'from-yellow-400 to-amber-400', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-400', textColor: 'text-yellow-700',
    items: [
      { word: 'milk', emoji: '🥛' }, { word: 'egg', emoji: '🥚' }, { word: 'fish', emoji: '🐟' },
      { word: 'rice', emoji: '🍚' }, { word: 'avocado', emoji: '🥑' }, { word: 'cheese', emoji: '🧀' },
    ],
  },
  {
    id: 'house', title: 'House', hebrewTitle: 'בית', emoji: '🏠',
    color: 'from-stone-400 to-slate-500', bgColor: 'bg-stone-50', borderColor: 'border-stone-400', textColor: 'text-stone-700',
    items: [
      { word: 'house', emoji: '🏠' }, { word: 'window', emoji: '🪟' }, { word: 'door', emoji: '🚪' },
      { word: 'table', emoji: '🪑' }, { word: 'floor', emoji: '🏢' }, { word: 'bedroom', emoji: '🛏️' },
    ],
  },
  {
    id: 'family', title: 'Family', hebrewTitle: 'משפחה', emoji: '👨‍👩‍👧',
    color: 'from-rose-400 to-pink-400', bgColor: 'bg-rose-50', borderColor: 'border-rose-400', textColor: 'text-rose-700',
    items: [
      { word: 'mother', emoji: '👩' }, { word: 'father', emoji: '👨' }, { word: 'sister', emoji: '👧' },
      { word: 'brother', emoji: '👦' }, { word: 'baby', emoji: '👶' },
    ],
  },
  {
    id: 'nature', title: 'Nature', hebrewTitle: 'צומח', emoji: '🌳',
    color: 'from-green-400 to-teal-500', bgColor: 'bg-green-50', borderColor: 'border-green-400', textColor: 'text-green-700',
    items: [
      { word: 'tree', emoji: '🌳' }, { word: 'flower', emoji: '🌸' },
      { word: 'water', emoji: '💧' }, { word: 'garden', emoji: '🌻' },
    ],
  },
  {
    id: 'school', title: 'School', hebrewTitle: 'בית ספר', emoji: '🏫',
    color: 'from-indigo-400 to-violet-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-400', textColor: 'text-indigo-700',
    items: [
      { word: 'teacher', emoji: '👩‍🏫' }, { word: 'pupil', emoji: '👧' }, { word: 'school', emoji: '🏫' },
      { word: 'chair', emoji: '🪑' }, { word: 'pencil', emoji: '✏️' }, { word: 'pen', emoji: '🖊️' },
    ],
  },
]
