import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — "Mia's Birthday Party". Mrs. Rose, Mia's mum, welcomes the guests:
 * a present, cake, a drink, a party game and a balloon.
 * Story: candles, musical chairs, hidden presents, a dance floor… and magic.
 */

const ASK_GREET: StoryLine = { text: "Hi! Welcome to Mia's party!", he: 'היי! ברוכים הבאים למסיבה של מיה!' }
const ASK_CAKE: StoryLine = { text: 'Would you like some cake?', he: 'תרצו עוגה?' }
const ASK_DRINK: StoryLine = { text: 'And what would you like to drink?', he: 'ומה תרצו לשתות?' }
const ASK_GAME: StoryLine = { text: "Let's play a game! What do you want to play?", he: 'בואו נשחק! במה אתם רוצים לשחק?' }
const ASK_BALLOON: StoryLine = { text: 'Do you want a balloon?', he: 'אתם רוצים בלון?' }
const ASK_BYE: StoryLine = { text: 'Here is a party bag for you. Bye-bye!', he: 'הנה שקית הפתעות בשבילכם. ביי ביי!' }

const SILLY_GREET: StoryLine = { text: 'A frog? Ribbit! Mia wants a present! Try again.', he: 'צפרדע? קְרוּר! מיה רוצה מתנה! נסו שוב.' }
const SILLY_CAKE: StoryLine = { text: 'Onion cake? Yuck! Try again.', he: 'עוגת בצל? איכס! נסו שוב.' }
const SILLY_DRINK: StoryLine = { text: "Paint? You can't drink paint! Try again.", he: 'צבע? אי אפשר לשתות צבע! נסו שוב.' }
const SILLY_GAME: StoryLine = { text: 'Homework? At a party? No way! Try again.', he: 'שיעורי בית? במסיבה? אין מצב! נסו שוב.' }
const SILLY_BALLOON: StoryLine = { text: "A sleepy balloon? Balloons don't sleep! Try again.", he: 'בלון ישנוני? בלונים לא ישנים! נסו שוב.' }
const SILLY_BYE: StoryLine = { text: 'Homework? Ha ha! It was a party! Try again.', he: 'שיעורי בית? חה חה! זו הייתה מסיבה! נסו שוב.' }

const THANKS: StoryChoice = { say: 'Thank you for the party!', he: 'תודה על המסיבה!', icon: '🥳' }
const THANKS_SILLY: StoryChoice = { say: 'Thank you for the homework!', he: 'תודה על שיעורי הבית!', icon: '📚', silly: SILLY_BYE }

const SCENE: Scene = {
  id: 'birthday',
  title: "Mia's Birthday Party",
  titleHe: 'מסיבת יום הולדת',
  emoji: '🎂',
  character: { speaker: 'rose', name: 'Mrs. Rose', nameHe: 'גברת רוז', emoji: '👩' },
  result: 'items',
  ui: {
    gradient: 'from-pink-400 to-rose-500',
    cardEn: 'Go to a birthday party — then be the party host!',
    cardHe: 'הולכים למסיבת יום הולדת — ואז מארחים בעצמכם!',
    subtitleHe: 'במסיבת יום הולדת — מדברים עם המארחת באנגלית',
    sign: "🎉 Mia's Party",
    stagePlace: 'party',
    introHe: {
      order: 'גברת רוז, אמא של מיה, שואלת — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם גברת רוז — שאלו את האורח מה הוא רוצה, זכרו והגישו לו בדיוק את זה.',
    },
    startEn: "Let's party!", startHe: 'נכנסים למסיבה',
    swapTab: '👩 Be Mrs. Rose',
    swapStartEn: 'Start the party!', swapStartHe: 'מתחילים את המסיבה',
    swapAskHe: 'מה גברת רוז אומרת עכשיו?',
    swapSayHe: 'אמרו את המשפט של גברת רוז בקול!',
    makeTitleHe: 'הגישו לאורח בדיוק את מה שביקש:',
    serveEn: 'Here you go!', serveHe: 'הגישו לאורח',
    doneEn: 'What a party!', doneHe: 'דיברתם באנגלית במסיבה — כל הכבוד!',
    swapDoneEn: 'Great party, host!', swapDoneHe: 'הייתם גברת רוז ואירחתם את האורח באנגלית!',
    customerName: 'Guest',
    learnHe: 'אלה המשפטים של המסיבה. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לבד!',
  },
  places: {
    door: {
      bg: 'linear-gradient(#bae6fd, #e0f2fe)',
      floor: { bg: 'linear-gradient(#86efac, #4ade80)', h: 22, border: '#16a34a' },
      decor: [
        { e: '🏡', x: 38, y: 26, s: 70 },
        { e: '🎈', x: 22, y: 30, s: 32, anim: 'float' },
        { e: '🎈', x: 70, y: 32, s: 30, anim: 'float' },
        { e: '🌳', x: 84, y: 34, s: 44 },
        { e: '☁️', x: 8, y: 8, s: 30, anim: 'cloud' },
      ],
      sign: "🎉 Mia's Party",
    },
    party: {
      bg: 'linear-gradient(#fdf2f8, #fce7f3)',
      floor: { bg: 'repeating-conic-gradient(#f9a8d4 0% 25%, #fdf2f8 0% 50%) 0 0 / 28px 28px', h: 22, border: '#ec4899' },
      decor: [
        { e: '🎊', x: 6, y: 26, s: 34 },
        { e: '🎈', x: 22, y: 36, s: 34, anim: 'float' },
        { e: '🎁', x: 40, y: 46, s: 30 },
        { e: '🎈', x: 64, y: 30, s: 32, anim: 'float' },
        { e: '🎉', x: 84, y: 28, s: 34 },
      ],
      sign: "🎂 Happy Birthday, Mia!",
      counter: { bg: '#f472b6', border: '#be185d', item: '🎂' },
    },
    garden: {
      bg: 'linear-gradient(#bae6fd, #f0f9ff)',
      floor: { bg: 'linear-gradient(#86efac, #22c55e)', h: 24, border: '#15803d' },
      decor: [
        { e: '🌞', x: 84, y: 8, s: 36, anim: 'glow' },
        { e: '🎪', x: 40, y: 30, s: 60 },
        { e: '🌳', x: 6, y: 32, s: 46 },
        { e: '🎶', x: 66, y: 34, s: 28, anim: 'float' },
      ],
      sign: '🎶 Party Garden',
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_GREET.text,
      hintHe: 'אחלו למיה יום הולדת שמח ותנו לה את המתנה. This is for you = זה בשבילך',
      swapHintHe: 'אתם גברת רוז! קבלו את האורח בברכה.',
      options: [
        { say: 'Happy birthday, Mia! This is for you.', correct: true },
        { say: 'Happy birthday, Mia! This is a frog.', correct: false, reaction: SILLY_GREET.text },
      ],
      distractorWord: 'frog',
      swapSilly: { say: 'Welcome to the zoo!', reaction: 'The zoo? I came for the party!' },
    },
    {
      id: 'cake',
      ask: ASK_CAKE.text,
      hintHe: 'בחרו עוגה: chocolate = שוקולד, vanilla = וניל, strawberry = תות',
      swapHintHe: 'שאלו את האורח אם הוא רוצה עוגה.',
      options: [
        { say: 'Yes, chocolate cake, please.', correct: true, pick: { slot: 'cake', value: 'chocolate' }, icon: '🍫', label: 'chocolate' },
        { say: 'Yes, vanilla cake, please.', correct: true, pick: { slot: 'cake', value: 'vanilla' }, icon: '🍰', label: 'vanilla' },
        { say: 'Yes, strawberry cake, please.', correct: true, pick: { slot: 'cake', value: 'strawberry' }, icon: '🍓', label: 'strawberry' },
        { say: 'Yes, onion cake, please.', correct: false, reaction: SILLY_CAKE.text },
      ],
      distractorWord: 'onion',
      swapSilly: { say: 'Would you like some soap?', reaction: 'Soap? No! I want cake!' },
    },
    {
      id: 'drink',
      ask: ASK_DRINK.text,
      hintHe: 'בחרו משקה: orange juice = מיץ תפוזים, lemonade = לימונדה, water = מים',
      swapHintHe: 'שאלו את האורח מה הוא רוצה לשתות.',
      options: [
        { say: 'Orange juice, please.', correct: true, pick: { slot: 'drink', value: 'orange juice' }, icon: '🧃', label: 'orange juice' },
        { say: 'Lemonade, please.', correct: true, pick: { slot: 'drink', value: 'lemonade' }, icon: '🍋', label: 'lemonade' },
        { say: 'Water, please.', correct: true, pick: { slot: 'drink', value: 'water' }, icon: '💧', label: 'water' },
        { say: 'Paint, please.', correct: false, reaction: SILLY_DRINK.text },
      ],
      distractorWord: 'paint',
      swapSilly: { say: 'Do you drink from a boot?', reaction: 'A boot? Ha ha, no!' },
    },
    {
      id: 'game',
      ask: ASK_GAME.text,
      hintHe: 'בחרו משחק: musical chairs = כיסאות מוזיקליים, hide and seek = מחבואים, dance = לרקוד',
      swapHintHe: 'הציעו לאורח לשחק ושאלו במה הוא רוצה לשחק.',
      options: [
        { say: 'I want to play musical chairs.', correct: true, pick: { slot: 'game', value: 'musical chairs' }, icon: '🪑', label: 'musical chairs' },
        { say: 'I want to play hide and seek.', correct: true, pick: { slot: 'game', value: 'hide and seek' }, icon: '🙈', label: 'hide and seek' },
        { say: 'I want to dance!', correct: true, pick: { slot: 'game', value: 'dance' }, icon: '💃', label: 'dance' },
        { say: 'I want to play homework.', correct: false, reaction: SILLY_GAME.text },
      ],
      distractorWord: 'homework',
      swapSilly: { say: "Let's do a maths test!", reaction: "A test? No! It's a party!" },
    },
    {
      id: 'balloon',
      ask: ASK_BALLOON.text,
      hintHe: 'בחרו בלון: red = אדום, blue = כחול, yellow = צהוב',
      swapHintHe: 'שאלו את האורח אם הוא רוצה בלון.',
      options: [
        { say: 'Yes, a red balloon, please.', correct: true, pick: { slot: 'balloon', value: 'red' }, icon: '🔴', label: 'red' },
        { say: 'Yes, a blue balloon, please.', correct: true, pick: { slot: 'balloon', value: 'blue' }, icon: '🔵', label: 'blue' },
        { say: 'Yes, a yellow balloon, please.', correct: true, pick: { slot: 'balloon', value: 'yellow' }, icon: '🟡', label: 'yellow' },
        { say: 'Yes, a sleepy balloon, please.', correct: false, reaction: SILLY_BALLOON.text },
      ],
      distractorWord: 'sleepy',
      swapSilly: { say: 'Do you want a hippo?', reaction: "A hippo? It won't fit in my car!" },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE.text,
      hintHe: 'הודו לגברת רוז על המסיבה. Thank you for the party! = תודה על המסיבה!',
      swapHintHe: 'תנו לאורח שקית הפתעות ונפרדו ממנו.',
      options: [
        { say: THANKS.say, correct: true },
        { say: THANKS_SILLY.say, correct: false, reaction: SILLY_BYE.text },
      ],
      distractorWord: 'homework',
      swapSilly: { say: 'Please clean the house!', reaction: "Clean? But I'm a guest!" },
    },
  ],
  makeAfterStep: 'balloon',
  makeSlots: [
    { slot: 'cake', titleHe: 'איזו עוגה?', choices: [
      { value: 'chocolate', icon: '🍫', label: 'chocolate' },
      { value: 'vanilla', icon: '🍰', label: 'vanilla' },
      { value: 'strawberry', icon: '🍓', label: 'strawberry' },
    ] },
    { slot: 'drink', titleHe: 'איזה משקה?', choices: [
      { value: 'orange juice', icon: '🧃', label: 'orange juice' },
      { value: 'lemonade', icon: '🍋', label: 'lemonade' },
      { value: 'water', icon: '💧', label: 'water' },
    ] },
    { slot: 'game', titleHe: 'איזה משחק?', choices: [
      { value: 'musical chairs', icon: '🪑', label: 'musical chairs' },
      { value: 'hide and seek', icon: '🙈', label: 'hide and seek' },
      { value: 'dance', icon: '💃', label: 'dance' },
    ] },
    { slot: 'balloon', titleHe: 'איזה בלון?', choices: [
      { value: 'red', icon: '🔴', label: 'red' },
      { value: 'blue', icon: '🔵', label: 'blue' },
      { value: 'yellow', icon: '🟡', label: 'yellow' },
    ] },
  ],
  lines: {
    farewell: 'Goodbye! Thank you for coming!',
    makeRight: "Yes! That's just what I wanted!",
    makeWrong: "Oops, that's not what I asked for! Try again.",
  },
  phrases: [
    { speaker: 'rose', en: ASK_GREET.text, he: ASK_GREET.he },
    { speaker: 'kid', en: 'Happy birthday, Mia! This is for you.', he: 'יום הולדת שמח, מיה! זה בשבילך.' },
    { speaker: 'rose', en: ASK_CAKE.text, he: ASK_CAKE.he },
    { speaker: 'kid', en: 'Yes, chocolate cake, please.', he: 'כן, עוגת שוקולד, בבקשה.' },
    { speaker: 'rose', en: ASK_DRINK.text, he: ASK_DRINK.he },
    { speaker: 'kid', en: 'Lemonade, please.', he: 'לימונדה, בבקשה.' },
    { speaker: 'rose', en: ASK_GAME.text, he: ASK_GAME.he },
    { speaker: 'kid', en: 'I want to play hide and seek.', he: 'אני רוצה לשחק מחבואים.' },
    { speaker: 'rose', en: ASK_BALLOON.text, he: ASK_BALLOON.he },
    { speaker: 'kid', en: 'Yes, a red balloon, please.', he: 'כן, בלון אדום, בבקשה.' },
    { speaker: 'rose', en: ASK_BYE.text, he: ASK_BYE.he },
    { speaker: 'kid', en: THANKS.say, he: THANKS.he },
  ],
}

const COME_IN: StoryLine = { text: 'Come in, come in!', he: 'היכנסו, היכנסו!' }

/** Balloon choices — the ending depends on what happened at the party. */
function balloonChoice(say: string, he: string, icon: string): StoryChoice {
  return {
    say, he, icon, next: 'end-party',
    nextIf: [{ key: 'magic', value: 'yes', next: 'end-magic' }, { key: 'game', value: 'dance', next: 'end-dance' }],
  }
}

const STORY: Story = {
  id: 'birthday-story',
  title: 'The Party Surprise',
  titleHe: 'הפתעה במסיבה',
  start: 'door',
  coverPlace: 'door',
  introHe: [
    '🗨️ גברת רוז מדברת — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '🚪', he: 'בדלת' },
    { icon: '🎁', he: 'מתנה' },
    { icon: '🕯️', he: 'נרות' },
    { icon: '🍰', he: 'עוגה' },
    { icon: '🥤', he: 'שתייה' },
    { icon: '🎶', he: 'משחק' },
    { icon: '🎈', he: 'בלון' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'door', place: 'door', chapter: 0, noCharacter: true,
      narrationHe: 'היום יום ההולדת של מיה! אתם עומדים ליד הדלת עם מתנה גדולה, ושומעים מוזיקה מבפנים.',
      lines: [],
      props: [{ e: '🎁', x: 30, y: 48, s: 36 }],
      choices: [
        { say: 'Knock, knock!', he: 'טוק טוק!', icon: '🚪', reply: COME_IN, next: 'greet' },
        { say: 'Ding dong!', he: 'דינג דונג!', icon: '🔔', reply: COME_IN, next: 'greet' },
      ],
    },
    {
      id: 'greet', place: 'party', chapter: 1,
      narrationHe: 'גברת רוז, אמא של מיה, פותחת את הדלת. בפנים יש בלונים בכל מקום!',
      lines: [ASK_GREET],
      choices: [
        {
          say: 'Happy birthday, Mia! This is for you.', he: 'יום הולדת שמח, מיה! זה בשבילך.', icon: '🎁',
          reply: { text: 'Oh, a present! Thank you! Mia, look!', he: 'אוי, מתנה! תודה! מיה, תראי!' }, next: 'candles',
        },
        {
          say: 'Happy birthday, Mia! I can do magic!', he: 'יום הולדת שמח, מיה! אני יודע/ת לעשות קסמים!', icon: '🪄',
          reply: { text: 'Magic? Wow! Mia loves magic!', he: 'קסמים? וואו! מיה אוהבת קסמים!' }, set: { magic: 'yes' }, next: 'candles',
        },
        { say: 'Happy birthday, Mia! This is a frog.', he: 'יום הולדת שמח, מיה! זאת צפרדע.', icon: '🐸', silly: SILLY_GREET },
      ],
    },
    {
      id: 'candles', place: 'party', chapter: 2,
      narrationHe: 'האורות כבים. גברת רוז מביאה עוגה ענקית עם שמונה נרות דולקים!',
      lines: [{ text: "Let's sing for Mia! Happy birthday to you!", he: 'בואו נשיר למיה! יום הולדת שמח!' }],
      props: [{ e: '🎂', x: 46, y: 42, s: 50 }],
      choices: [
        { say: 'Happy birthday, dear Mia!', he: 'יום הולדת שמח, מיה היקרה!', icon: '🎶', next: 'cake' },
        { say: 'Make a wish, Mia!', he: 'תבקשי משאלה, מיה!', icon: '✨', next: 'cake' },
        { say: 'Happy Halloween!', he: 'האלווין שמח!', icon: '🎃', silly: { text: "Halloween? No, it's a birthday! Try again.", he: 'האלווין? לא, זה יום הולדת! נסו שוב.' } },
      ],
    },
    {
      id: 'cake', place: 'party', chapter: 3,
      narrationHe: 'פוווו! מיה כיבתה את כל הנרות. כולם מוחאים כפיים. עכשיו — עוגה!',
      lines: [ASK_CAKE],
      choices: [
        { say: 'Yes, chocolate cake, please.', he: 'כן, עוגת שוקולד, בבקשה.', icon: '🍫', next: 'drink' },
        { say: 'Yes, vanilla cake, please.', he: 'כן, עוגת וניל, בבקשה.', icon: '🍰', next: 'drink' },
        { say: 'Yes, strawberry cake, please.', he: 'כן, עוגת תות, בבקשה.', icon: '🍓', next: 'drink' },
        { say: 'Yes, onion cake, please.', he: 'כן, עוגת בצל, בבקשה.', icon: '🧅', silly: SILLY_CAKE },
      ],
    },
    {
      id: 'drink', place: 'party', chapter: 4,
      narrationHe: 'יאמי! העוגה טעימה מאוד… אבל עכשיו קצת צמא לכם.',
      lines: [ASK_DRINK],
      choices: [
        { say: 'Orange juice, please.', he: 'מיץ תפוזים, בבקשה.', icon: '🧃', next: 'game' },
        { say: 'Lemonade, please.', he: 'לימונדה, בבקשה.', icon: '🍋', next: 'game' },
        { say: 'Water, please.', he: 'מים, בבקשה.', icon: '💧', next: 'game' },
        { say: 'Paint, please.', he: 'צבע, בבקשה.', icon: '🎨', silly: SILLY_DRINK },
      ],
    },
    {
      id: 'game', place: 'garden', chapter: 5,
      narrationHe: 'כל הילדים יוצאים לגינה. גברת רוז מחזיקה רמקול גדול.',
      lines: [ASK_GAME],
      choices: [
        { say: 'I want to play musical chairs.', he: 'אני רוצה לשחק כיסאות מוזיקליים.', icon: '🪑', next: 'chairs' },
        {
          say: 'I want to play hide and seek.', he: 'אני רוצה לשחק מחבואים.', icon: '🙈',
          reply: { text: "Mia hid the presents! Let's find them!", he: 'מיה החביאה את המתנות! בואו נמצא אותן!' }, next: 'find',
        },
        { say: 'I want to dance!', he: 'אני רוצה לרקוד!', icon: '💃', set: { game: 'dance' }, reply: { text: 'Music on! Show me your best moves!', he: 'מוזיקה! תראו לי את הריקוד הכי טוב שלכם!' }, next: 'balloon' },
        { say: 'I want to play homework.', he: 'אני רוצה לשחק בשיעורי בית.', icon: '📚', silly: SILLY_GAME },
      ],
    },
    {
      id: 'chairs', place: 'garden', chapter: 5,
      narrationHe: 'כולם רצים מסביב לכיסאות… ופתאום — המוזיקה נעצרת!',
      lines: [{ text: 'The music stopped! Sit down, quick!', he: 'המוזיקה נעצרה! שבו, מהר!' }],
      props: [{ e: '🪑', x: 40, y: 50, s: 34 }, { e: '🎂', x: 56, y: 50, s: 30 }],
      choices: [
        {
          say: 'I am on a chair! I win!', he: 'אני על כיסא! ניצחתי!', icon: '🏆',
          reply: { text: 'Well done! You are fast!', he: 'כל הכבוד! אתם מהירים!' }, next: 'balloon',
        },
        { say: 'Oh no! I sat on the cake!', he: 'אוי לא! התיישבתי על העוגה!', icon: '🎂', next: 'end-cake' },
      ],
    },
    {
      id: 'find', place: 'garden', chapter: 5, next: 'balloon',
      narrationHe: 'מיה החביאה את המתנות שלה בכל הגינה. מי ימצא את כולן?',
      lines: [],
      event: {
        kind: 'find', target: '🎁', count: 4,
        decoys: ['🎈', '🎊', '🧁', '🪑', '🍭', '🧸', '🌼'],
        promptHe: 'מצאו את 4 המתנות שמיה החביאה!',
        doneLine: { text: 'Four presents! You are a super finder!', he: 'ארבע מתנות! אתם מוצאים מעולים!' },
      },
    },
    {
      id: 'balloon', place: 'party', chapter: 6,
      narrationHe: 'המסיבה כמעט נגמרת. גברת רוז מחזיקה צרור ענק של בלונים צבעוניים.',
      lines: [ASK_BALLOON],
      props: [{ e: '🎈', x: 50, y: 34, s: 40 }],
      choices: [
        balloonChoice('Yes, a red balloon, please.', 'כן, בלון אדום, בבקשה.', '🔴'),
        balloonChoice('Yes, a blue balloon, please.', 'כן, בלון כחול, בבקשה.', '🔵'),
        balloonChoice('Yes, a yellow balloon, please.', 'כן, בלון צהוב, בבקשה.', '🟡'),
        { say: 'Yes, a sleepy balloon, please.', he: 'כן, בלון ישנוני, בבקשה.', icon: '😴', silly: SILLY_BALLOON },
      ],
    },
    {
      id: 'end-party', place: 'party', chapter: 7, ending: 'party',
      narrationHe: 'איזו מסיבה! אתם יוצאים הביתה עם בלון ביד וחיוך ענק.',
      lines: [ASK_BYE],
      choices: [THANKS, THANKS_SILLY],
    },
    {
      id: 'end-dance', place: 'garden', chapter: 7, ending: 'dance',
      narrationHe: 'רקדתם כל כך יפה, שכל הילדים עמדו מסביב ומחאו כפיים!',
      lines: [{ text: 'You are the dance champion!', he: 'אתם אלופי הריקוד!' }],
      props: [{ e: '🏆', x: 50, y: 36, s: 40 }],
      choices: [THANKS, THANKS_SILLY],
    },
    {
      id: 'end-cake', place: 'garden', chapter: 7, ending: 'cake',
      narrationHe: 'פלאץ\'! מכנסיים מלאים בקצפת… וכולם צוחקים, גם מיה!',
      lines: [{ text: "Ha ha! Don't worry. We have another cake!", he: 'חה חה! אל דאגה. יש לנו עוד עוגה!' }],
      props: [{ e: '🎂', x: 50, y: 46, s: 40 }],
      choices: [{ say: 'Sorry, Mia! Ha ha!', he: 'סליחה, מיה! חה חה!', icon: '😂' }],
    },
    {
      id: 'end-magic', place: 'party', chapter: 7, ending: 'magic',
      narrationHe: 'כל הילדים מתיישבים מולכם. הגיע הזמן לקסם שהבטחתם!',
      lines: [{ text: 'And now, the magic show! Are you ready?', he: 'ועכשיו — מופע הקסמים! אתם מוכנים?' }],
      props: [{ e: '🎩', x: 50, y: 40, s: 40 }],
      choices: [{ say: 'Abracadabra! A rabbit!', he: 'אברה קדברה! ארנב!', icon: '🐰' }],
    },
  ],
  endings: [
    { id: 'party', emoji: '🎈', title: 'Best Party Ever', titleHe: 'המסיבה הכי טובה', descHe: 'אכלתם עוגה, שיחקתם וקיבלתם בלון ושקית הפתעות.', place: 'party', props: [{ e: '🎈', x: 50, y: 34, s: 44 }] },
    { id: 'dance', emoji: '💃', title: 'Dance Champion', titleHe: 'אלופי הריקוד', descHe: 'רקדתם במסיבה וזכיתם בגביע!', place: 'garden', props: [{ e: '🏆', x: 50, y: 36, s: 44 }] },
    { id: 'cake', emoji: '🎂', title: 'Cake Surprise', titleHe: 'הפתעה בעוגה', descHe: 'המוזיקה נעצרה… והתיישבתם בדיוק על העוגה!', place: 'garden', props: [{ e: '🎂', x: 50, y: 44, s: 44 }] },
    { id: 'magic', emoji: '🎩', title: 'Magic Show', titleHe: 'מופע קסמים', descHe: 'עשיתם קסם במסיבה — ושלפתם ארנב מהכובע!', place: 'party', props: [{ e: '🎩', x: 44, y: 40, s: 40 }, { e: '🐰', x: 56, y: 36, s: 34 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
