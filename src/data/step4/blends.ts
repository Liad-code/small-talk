export interface BlendWord { word: string; emoji: string }
export interface Blend { id: string; label: string; words: BlendWord[] }

export const BLENDS: Blend[] = [
  { id: 'bl', label: 'bl', words: [
    { word: 'BLACK', emoji: '⚫' }, { word: 'BLANKET', emoji: '🛏️' }, { word: 'BLOOD', emoji: '🩸' }, { word: 'BLUE', emoji: '💙' },
  ] },
  { id: 'cl', label: 'cl', words: [
    { word: 'CLOCK', emoji: '🕐' }, { word: 'CLOUD', emoji: '☁️' }, { word: 'CLEAN', emoji: '🧼' }, { word: 'CLAP', emoji: '👏' },
  ] },
  { id: 'fl', label: 'fl', words: [
    { word: 'FLAG', emoji: '🚩' }, { word: 'FLOWER', emoji: '🌸' }, { word: 'FLY', emoji: '🪰' }, { word: 'FLAME', emoji: '🔥' },
  ] },
  { id: 'gl', label: 'gl', words: [
    { word: 'GLASS', emoji: '🥛' }, { word: 'GLOBE', emoji: '🌍' }, { word: 'GLUE', emoji: '🔧' }, { word: 'GLOVE', emoji: '🧤' },
  ] },
  { id: 'pl', label: 'pl', words: [
    { word: 'PLANE', emoji: '✈️' }, { word: 'PLANT', emoji: '🌱' }, { word: 'PLATE', emoji: '🍽️' }, { word: 'PLAY', emoji: '🎮' },
  ] },
  { id: 'sl', label: 'sl', words: [
    { word: 'SLIDE', emoji: '🛝' }, { word: 'SLEEP', emoji: '😴' }, { word: 'SLOW', emoji: '🐢' }, { word: 'SLIME', emoji: '🟢' },
  ] },
  { id: 'br', label: 'br', words: [
    { word: 'BREAD', emoji: '🍞' }, { word: 'BRIDGE', emoji: '🌉' }, { word: 'BRUSH', emoji: '🪥' }, { word: 'BROWN', emoji: '🤎' },
  ] },
  { id: 'cr', label: 'cr', words: [
    { word: 'CRAB', emoji: '🦀' }, { word: 'CROWN', emoji: '👑' }, { word: 'CRY', emoji: '😢' }, { word: 'CRACK', emoji: '💥' },
  ] },
  { id: 'dr', label: 'dr', words: [
    { word: 'DRUM', emoji: '🥁' }, { word: 'DRAGON', emoji: '🐉' }, { word: 'DRESS', emoji: '👗' }, { word: 'DRINK', emoji: '🥤' },
  ] },
  { id: 'fr', label: 'fr', words: [
    { word: 'FROG', emoji: '🐸' }, { word: 'FRUIT', emoji: '🍎' }, { word: 'FRIEND', emoji: '👫' }, { word: 'FREE', emoji: '🆓' },
  ] },
  { id: 'gr', label: 'gr', words: [
    { word: 'GRASS', emoji: '🌱' }, { word: 'GREEN', emoji: '🟢' }, { word: 'GRAPES', emoji: '🍇' }, { word: 'GROW', emoji: '📈' },
  ] },
  { id: 'pr', label: 'pr', words: [
    { word: 'PRINCE', emoji: '🤴' }, { word: 'PRESENT', emoji: '🎁' }, { word: 'PRAY', emoji: '🙏' }, { word: 'PRIZE', emoji: '🏆' },
  ] },
  { id: 'tr', label: 'tr', words: [
    { word: 'TREE', emoji: '🌳' }, { word: 'TRAIN', emoji: '🚂' }, { word: 'TRUCK', emoji: '🚚' }, { word: 'TROPHY', emoji: '🏆' },
  ] },
  { id: 'sc', label: 'sc', words: [
    { word: 'SCARF', emoji: '🧣' }, { word: 'SCHOOL', emoji: '🏫' }, { word: 'SCORE', emoji: '⚽' }, { word: 'SCAN', emoji: '📷' },
  ] },
]
