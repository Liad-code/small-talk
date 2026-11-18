import type { Scene, Speaker } from './types'

/**
 * Scene 1 — the pizzeria. Every English line here is pre-recorded in its
 * speaker's voice (scripts/generate-scene-audio.mjs), so editing a line means
 * regenerating that one file.
 */
export const PIZZERIA: Scene = {
  id: 'pizzeria',
  title: "Tony's Pizza",
  titleHe: 'בפיצרייה',
  emoji: '🍕',
  character: { speaker: 'tony', name: 'Tony', emoji: '👨‍🍳' },
  steps: [
    {
      id: 'greet',
      ask: "Hi! Welcome to Tony's Pizza! What would you like?",
      hintHe: 'אמרו לטוני שאתם רוצים פיצה. I would like… = הייתי רוצה…',
      swapHintHe: 'אתם טוני! קבלו את הלקוח בברכה ושאלו מה הוא רוצה.',
      options: [
        { say: 'I would like a pizza, please.', correct: true },
        { say: 'I would like a shoe, please.', correct: false, reaction: 'A shoe? This is a pizza shop! Try again.' },
      ],
      distractorWord: 'shoe',
      swapSilly: { say: 'Go home, please.', reaction: "Go home? But I'm hungry!" },
    },
    {
      id: 'size',
      ask: 'Great! What size would you like? Small, medium or large?',
      hintHe: 'בחרו גודל: small = קטנה, medium = בינונית, large = גדולה',
      swapHintHe: 'שאלו את הלקוח איזה גודל פיצה הוא רוצה.',
      options: [
        { say: 'A small pizza, please.', correct: true, pick: { slot: 'size', value: 'small' }, icon: '🍕', label: 'small' },
        { say: 'A medium pizza, please.', correct: true, pick: { slot: 'size', value: 'medium' }, icon: '🍕', label: 'medium' },
        { say: 'A large pizza, please.', correct: true, pick: { slot: 'size', value: 'large' }, icon: '🍕', label: 'large' },
        { say: 'A blue pizza, please.', correct: false, reaction: 'A blue pizza? Pizza is not blue! Try again.' },
      ],
      distractorWord: 'blue',
      swapSilly: { say: 'What size are your shoes?', reaction: 'My shoes? I want a pizza!' },
    },
    {
      id: 'topping',
      ask: 'Yum! What topping would you like?',
      hintHe: 'בחרו תוספת: cheese = גבינה, mushrooms = פטריות, olives = זיתים, peppers = פלפלים, corn = תירס',
      swapHintHe: 'שאלו את הלקוח איזו תוספת הוא רוצה על הפיצה.',
      showCorrect: 3,
      options: [
        { say: 'Cheese, please.', correct: true, pick: { slot: 'topping', value: 'cheese' }, icon: '🧀', label: 'cheese' },
        { say: 'Mushrooms, please.', correct: true, pick: { slot: 'topping', value: 'mushrooms' }, icon: '🍄', label: 'mushrooms' },
        { say: 'Olives, please.', correct: true, pick: { slot: 'topping', value: 'olives' }, icon: '🫒', label: 'olives' },
        { say: 'Peppers, please.', correct: true, pick: { slot: 'topping', value: 'peppers' }, icon: '🫑', label: 'peppers' },
        { say: 'Corn, please.', correct: true, pick: { slot: 'topping', value: 'corn' }, icon: '🌽', label: 'corn' },
        { say: 'Chocolate, please.', correct: false, reaction: 'Chocolate on pizza? Yuck! Try again.' },
      ],
      distractorWord: 'socks',
      swapSilly: { say: 'Do you want socks on it?', reaction: 'Socks? Yuck! No way!' },
    },
    {
      id: 'drink',
      ask: 'Would you like a drink?',
      hintHe: 'רוצים משהו לשתות? orange juice = מיץ תפוזים, water = מים, No, thank you = לא, תודה',
      swapHintHe: 'שאלו את הלקוח אם הוא רוצה משהו לשתות.',
      options: [
        { say: 'Yes, orange juice, please.', correct: true, pick: { slot: 'drink', value: 'orange juice' }, icon: '🧃', label: 'orange juice' },
        { say: 'Yes, water, please.', correct: true, pick: { slot: 'drink', value: 'water' }, icon: '💧', label: 'water' },
        { say: 'No, thank you.', correct: true, pick: { slot: 'drink', value: 'none' }, icon: '🚫', label: 'no drink' },
        { say: 'Yes, a cat, please.', correct: false, reaction: "A cat? We don't sell cats! Try again." },
      ],
      distractorWord: 'cat',
      swapSilly: { say: 'Would you like a bath?', reaction: "A bath? No! I'm thirsty!" },
    },
    {
      id: 'where',
      ask: 'Do you want to eat here or take away?',
      hintHe: 'לאכול כאן (eat here) או לקחת הביתה (take away)?',
      swapHintHe: 'שאלו את הלקוח אם הוא אוכל כאן או לוקח הביתה.',
      options: [
        { say: 'Eat here, please.', correct: true, pick: { slot: 'where', value: 'eat here' }, icon: '🪑', label: 'eat here' },
        { say: 'Take away, please.', correct: true, pick: { slot: 'where', value: 'take away' }, icon: '🛍️', label: 'take away' },
        { say: 'In the bath, please.', correct: false, reaction: 'In the bath? Ha ha! Try again.' },
      ],
      distractorWord: 'bath',
      swapSilly: { say: 'Do you live in a tree?', reaction: "A tree? No! I'm not a bird!" },
    },
    {
      id: 'pay',
      ask: "Here is your pizza! That's twenty shekels, please.",
      hintHe: 'שלמו לטוני. Here you are = בבקשה (כשנותנים משהו)',
      swapHintHe: 'הגישו ללקוח את הפיצה ובקשו תשלום.',
      options: [
        { say: 'Here you are.', correct: true },
        { say: 'No, you pay!', correct: false, reaction: 'Ha ha, nice try! Try again.' },
      ],
      distractorWord: 'banana',
      swapSilly: { say: 'Pay with a banana, please.', reaction: 'A banana? I have money!' },
    },
    {
      id: 'goodbye',
      ask: 'Thank you! Enjoy your pizza!',
      hintHe: 'הודו לטוני ונפרדו ממנו.',
      swapHintHe: 'הודו ללקוח ואחלו לו בתיאבון.',
      options: [
        { say: 'Thank you! Goodbye!', correct: true },
        { say: 'Good night!', correct: false, reaction: "Good night? It's lunch time! Try again." },
      ],
      distractorWord: 'night',
      swapSilly: { say: 'Go to sleep!', reaction: "Sleep? It's lunch time!" },
    },
  ],
  makeAfterStep: 'where',
  makeSlots: [
    { slot: 'size', titleHe: 'איזה גודל?', choices: [
      { value: 'small', icon: '🍕', label: 'small' },
      { value: 'medium', icon: '🍕', label: 'medium' },
      { value: 'large', icon: '🍕', label: 'large' },
    ] },
    { slot: 'topping', titleHe: 'איזו תוספת?', choices: [
      { value: 'cheese', icon: '🧀', label: 'cheese' },
      { value: 'mushrooms', icon: '🍄', label: 'mushrooms' },
      { value: 'olives', icon: '🫒', label: 'olives' },
      { value: 'peppers', icon: '🫑', label: 'peppers' },
      { value: 'corn', icon: '🌽', label: 'corn' },
    ] },
    { slot: 'drink', titleHe: 'איזה משקה?', choices: [
      { value: 'orange juice', icon: '🧃', label: 'orange juice' },
      { value: 'water', icon: '💧', label: 'water' },
      { value: 'none', icon: '🚫', label: 'no drink' },
    ] },
    { slot: 'where', titleHe: 'כאן או הביתה?', choices: [
      { value: 'eat here', icon: '🪑', label: 'eat here' },
      { value: 'take away', icon: '🛍️', label: 'take away' },
    ] },
  ],
  lines: {
    farewell: 'Bye! Come again soon!',
    makeRight: "Yes! That's my pizza!",
    makeWrong: "No, that's not my order! Try again.",
  },
  phrases: [
    { speaker: 'tony', en: "Hi! Welcome to Tony's Pizza! What would you like?", he: 'שלום! ברוכים הבאים לפיצה של טוני! מה תרצו?' },
    { speaker: 'kid', en: 'I would like a pizza, please.', he: 'הייתי רוצה פיצה, בבקשה.' },
    { speaker: 'tony', en: 'Great! What size would you like? Small, medium or large?', he: 'מעולה! איזה גודל תרצו? קטנה, בינונית או גדולה?' },
    { speaker: 'kid', en: 'A medium pizza, please.', he: 'פיצה בינונית, בבקשה.' },
    { speaker: 'tony', en: 'Yum! What topping would you like?', he: 'יאמי! איזו תוספת תרצו?' },
    { speaker: 'kid', en: 'Mushrooms, please.', he: 'פטריות, בבקשה.' },
    { speaker: 'tony', en: 'Would you like a drink?', he: 'תרצו משהו לשתות?' },
    { speaker: 'kid', en: 'Yes, orange juice, please.', he: 'כן, מיץ תפוזים, בבקשה.' },
    { speaker: 'tony', en: 'Do you want to eat here or take away?', he: 'לאכול כאן או לקחת הביתה?' },
    { speaker: 'kid', en: 'Eat here, please.', he: 'לאכול כאן, בבקשה.' },
    { speaker: 'tony', en: "Here is your pizza! That's twenty shekels, please.", he: 'הנה הפיצה שלכם! זה עשרים שקלים, בבקשה.' },
    { speaker: 'kid', en: 'Here you are.', he: 'בבקשה (הנה הכסף).' },
    { speaker: 'tony', en: 'Thank you! Enjoy your pizza!', he: 'תודה! בתיאבון!' },
    { speaker: 'kid', en: 'Thank you! Goodbye!', he: 'תודה! להתראות!' },
  ],
}

/** Every line in the scene, with its speaker — what the audio generator records. */
export function sceneLines(scene: Scene): { speaker: Speaker; text: string }[] {
  const char = scene.character.speaker
  const out: { speaker: Speaker; text: string }[] = []
  for (const s of scene.steps) {
    out.push({ speaker: char, text: s.ask })
    for (const o of s.options) {
      out.push({ speaker: 'kid', text: o.say })
      if (o.reaction) out.push({ speaker: char, text: o.reaction })
    }
    out.push({ speaker: char, text: s.swapSilly.say })
    out.push({ speaker: 'kid', text: s.swapSilly.reaction })
  }
  out.push({ speaker: char, text: scene.lines.farewell })
  out.push({ speaker: 'kid', text: scene.lines.makeRight })
  out.push({ speaker: 'kid', text: scene.lines.makeWrong })
  for (const p of scene.phrases) out.push({ speaker: p.speaker, text: p.en })
  // de-duplicate (same speaker + same text = one recording)
  const seen = new Set<string>()
  return out.filter(l => { const k = `${l.speaker}|${l.text.trim().toLowerCase()}`; if (seen.has(k)) return false; seen.add(k); return true })
}
