import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — "A New Friend". The child meets Sam at the playground: name, age,
 * favourite colour, pets, games. Role swap: the child is Sam, asks the new kid
 * and fills in a friend card. Story: "Sam's Playground Day".
 */

const ASK_GREET = "Hi! I'm Sam. Are you new here?"
const ASK_AGE = 'How old are you?'
const ASK_COLOUR = "What's your favourite colour?"
const ASK_PET = 'Do you have a pet?'
const ASK_GAME = 'What do you like to play?'
const ASK_PLAY = 'Do you want to play with me?'
const ASK_BYE = "It's time to go home. See you tomorrow!"

const SAY_HI = "Hi, Sam! I'm new here."
const SAY_8 = "I'm eight."
const SAY_9 = "I'm nine."
const SAY_10 = "I'm ten."
const SAY_DOG = 'Yes, I have a dog.'
const SAY_CAT = 'Yes, I have a cat.'
const SAY_NOPET = "No, I don't have a pet."
const SAY_FOOTBALL = 'I like to play football.'
const SAY_TAG = 'I like to play tag.'
const SAY_HIDE = 'I like to play hide and seek.'
const SAY_YES = "Yes, please! Let's play!"
const SAY_BYE = 'See you tomorrow! Bye, Sam!'

const SILLY_BANANA = { say: "Hi! I'm a banana.", reaction: "A banana? No, you're a kid! Try again." }
const SILLY_AGE = { say: "I'm one hundred!", reaction: 'One hundred? You look so young! Try again.' }
const SILLY_PET = { say: 'Yes, I have a dragon.', reaction: 'A dragon? Wow! I don\'t think so. Try again.' }
const SILLY_SLEEP = { say: 'No, I want to sleep.', reaction: "Sleep? It's playtime! Try again." }
const SILLY_BYE = { say: 'See you next year!', reaction: "Next year? That's a long time! Try again." }

const he = {
  greet: 'היי! אני סאם. אתם חדשים פה?',
  age: 'בני/בנות כמה אתם?',
  pet: 'יש לכם חיית מחמד?',
  game: 'מה אתם אוהבים לשחק?',
  play: 'אתם רוצים לשחק איתי?',
  bye: 'הגיע הזמן ללכת הביתה. נתראה מחר!',
}

const SCENE: Scene = {
  id: 'new-friend',
  title: 'A New Friend',
  titleHe: 'חבר חדש',
  emoji: '🤝',
  character: { speaker: 'sam', name: 'Sam', nameHe: 'סאם', emoji: '👦' },
  result: 'items',
  ui: {
    gradient: 'from-emerald-400 to-teal-500',
    cardEn: 'Meet Sam at the playground — then be Sam!',
    cardHe: 'פוגשים את סאם בגן השעשועים — ואז הופכים לסאם!',
    subtitleHe: 'בגן השעשועים — מכירים חבר חדש באנגלית',
    sign: '🛝 Sunny Playground',
    stagePlace: 'playground',
    introHe: {
      order: 'סאם שואל — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים לספר והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם סאם — שאלו את הילד החדש שאלות, זכרו מה ענה ומלאו לו כרטיס חבר.',
    },
    startEn: "Let's go!", startHe: 'הולכים לגן השעשועים',
    swapTab: '👦 Be Sam',
    swapStartEn: 'Meet the new kid!', swapStartHe: 'פוגשים את הילד החדש',
    swapAskHe: 'מה סאם אומר עכשיו?',
    swapSayHe: 'אמרו את המשפט של סאם בקול!',
    makeTitleHe: 'מלאו את כרטיס החבר — בדיוק לפי מה שהילד החדש סיפר:',
    serveEn: 'Here is your friend card!', serveHe: 'הראו לחבר את הכרטיס',
    doneEn: 'You made a new friend!', doneHe: 'הכרתם חבר חדש באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Sam!', swapDoneHe: 'הייתם סאם והכרתם חבר חדש באנגלית!',
    customerName: 'New kid',
    learnHe: 'אלה המשפטים של השיחה עם סאם. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לדבר איתו לבד!',
  },
  places: {
    playground: {
      bg: 'linear-gradient(#bae6fd, #ecfeff)',
      floor: { bg: 'linear-gradient(#86efac, #4ade80)', h: 24, border: '#22c55e' },
      decor: [
        { e: '☀️', x: 84, y: 6, s: 38, anim: 'glow' },
        { e: '☁️', x: 18, y: 8, s: 30, anim: 'cloud' },
        { e: '🌳', x: 4, y: 26, s: 64 },
        { e: '🛝', x: 42, y: 32, s: 56 },
        { e: '⚽', x: 62, y: 50, s: 22 },
        { e: '🌼', x: 30, y: 52, s: 18 },
      ],
      sign: '🛝 Sunny Playground',
    },
    tree: {
      bg: 'linear-gradient(#a5f3fc, #d9f99d)',
      floor: { bg: 'linear-gradient(#a3e635, #65a30d)', h: 20, border: '#4d7c0f' },
      decor: [
        { e: '🌳', x: 30, y: 12, s: 120 },
        { e: '⚽', x: 46, y: 26, s: 24, anim: 'float' },
        { e: '🐦', x: 70, y: 22, s: 26, anim: 'float' },
        { e: '🍃', x: 20, y: 40, s: 20, anim: 'cloud' },
      ],
    },
    icecream: {
      bg: 'linear-gradient(#fdf2f8, #fce7f3)',
      floor: { bg: 'repeating-conic-gradient(#f9a8d4 0% 25%, #fdf2f8 0% 50%) 0 0 / 28px 28px', h: 22, border: '#f472b6' },
      decor: [
        { e: '⛱️', x: 10, y: 22, s: 56 },
        { e: '🍦', x: 46, y: 30, s: 44, anim: 'float' },
        { e: '☀️', x: 82, y: 6, s: 34, anim: 'glow' },
      ],
      sign: '🍦 Ice Cream',
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_GREET,
      hintHe: "סאם שואל אם אתם חדשים. I'm new here = אני חדש/ה פה",
      swapHintHe: 'אתם סאם! הציגו את עצמכם ושאלו אם הילד חדש פה.',
      options: [
        { say: SAY_HI, correct: true },
        { say: SILLY_BANANA.say, correct: false, reaction: SILLY_BANANA.reaction },
      ],
      distractorWord: 'banana',
      swapSilly: { say: 'Hi! Are you a dinosaur?', reaction: "A dinosaur? No! I'm a kid!" },
    },
    {
      id: 'age',
      ask: ASK_AGE,
      hintHe: 'כמה אתם? eight = שמונה, nine = תשע, ten = עשר',
      swapHintHe: 'שאלו את הילד החדש בן כמה הוא.',
      options: [
        { say: SAY_8, correct: true, pick: { slot: 'age', value: '8' }, icon: '8️⃣', label: 'eight' },
        { say: SAY_9, correct: true, pick: { slot: 'age', value: '9' }, icon: '9️⃣', label: 'nine' },
        { say: SAY_10, correct: true, pick: { slot: 'age', value: '10' }, icon: '🔟', label: 'ten' },
        { say: SILLY_AGE.say, correct: false, reaction: SILLY_AGE.reaction },
      ],
      distractorWord: 'hundred',
      swapSilly: { say: 'How old is your shoe?', reaction: "My shoe? Shoes don't have birthdays!" },
    },
    {
      id: 'colour',
      ask: ASK_COLOUR,
      hintHe: 'מה הצבע האהוב עליכם? red = אדום, blue = כחול, green = ירוק, yellow = צהוב',
      swapHintHe: 'שאלו את הילד מה הצבע האהוב עליו.',
      showCorrect: 3,
      options: [
        { say: 'My favourite colour is red.', correct: true, pick: { slot: 'colour', value: 'red' }, icon: '🔴', label: 'red' },
        { say: 'My favourite colour is blue.', correct: true, pick: { slot: 'colour', value: 'blue' }, icon: '🔵', label: 'blue' },
        { say: 'My favourite colour is green.', correct: true, pick: { slot: 'colour', value: 'green' }, icon: '🟢', label: 'green' },
        { say: 'My favourite colour is yellow.', correct: true, pick: { slot: 'colour', value: 'yellow' }, icon: '🟡', label: 'yellow' },
        { say: 'My favourite colour is pizza.', correct: false, reaction: 'Pizza is not a colour! Try again.' },
      ],
      distractorWord: 'pizza',
      swapSilly: { say: "What's your favourite sock?", reaction: 'My favourite sock? Ha ha! That\'s silly!' },
    },
    {
      id: 'pet',
      ask: ASK_PET,
      hintHe: 'יש לכם חיית מחמד? dog = כלב, cat = חתול, No = לא',
      swapHintHe: 'שאלו את הילד אם יש לו חיית מחמד.',
      options: [
        { say: SAY_DOG, correct: true, pick: { slot: 'pet', value: 'dog' }, icon: '🐶', label: 'a dog' },
        { say: SAY_CAT, correct: true, pick: { slot: 'pet', value: 'cat' }, icon: '🐱', label: 'a cat' },
        { say: SAY_NOPET, correct: true, pick: { slot: 'pet', value: 'none' }, icon: '🚫', label: 'no pet' },
        { say: SILLY_PET.say, correct: false, reaction: SILLY_PET.reaction },
      ],
      distractorWord: 'dragon',
      swapSilly: { say: 'Do you have a pet elephant?', reaction: "An elephant? It can't fit in my house!" },
    },
    {
      id: 'game',
      ask: ASK_GAME,
      hintHe: 'מה אתם אוהבים לשחק? football = כדורגל, tag = תופסת, hide and seek = מחבואים',
      swapHintHe: 'שאלו את הילד מה הוא אוהב לשחק.',
      options: [
        { say: SAY_FOOTBALL, correct: true, pick: { slot: 'game', value: 'football' }, icon: '⚽', label: 'football' },
        { say: SAY_TAG, correct: true, pick: { slot: 'game', value: 'tag' }, icon: '🏃', label: 'tag' },
        { say: SAY_HIDE, correct: true, pick: { slot: 'game', value: 'hide and seek' }, icon: '🙈', label: 'hide and seek' },
        { say: 'I like to play with my homework.', correct: false, reaction: 'With your homework? Ha ha! Try again.' },
      ],
      distractorWord: 'homework',
      swapSilly: { say: 'Do you like to play with snakes?', reaction: 'Snakes? No way!' },
    },
    {
      id: 'play',
      ask: ASK_PLAY,
      hintHe: "רוצים לשחק עם סאם? Let's play! = בוא נשחק!",
      swapHintHe: 'הזמינו את הילד החדש לשחק איתכם.',
      options: [
        { say: SAY_YES, correct: true },
        { say: SILLY_SLEEP.say, correct: false, reaction: SILLY_SLEEP.reaction },
      ],
      distractorWord: 'sleep',
      swapSilly: { say: 'Do you want to play with a cactus?', reaction: 'A cactus? Ouch! No, thank you!' },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE,
      hintHe: 'נפרדים מסאם. See you tomorrow = נתראה מחר',
      swapHintHe: 'אמרו לילד שהגיע הזמן ללכת ושתתראו מחר.',
      options: [
        { say: SAY_BYE, correct: true },
        { say: SILLY_BYE.say, correct: false, reaction: SILLY_BYE.reaction },
      ],
      distractorWord: 'year',
      swapSilly: { say: 'See you on the moon!', reaction: "On the moon? I don't have a rocket!" },
    },
  ],
  makeAfterStep: 'game',
  makeSlots: [
    { slot: 'age', titleHe: 'בן/בת כמה?', choices: [
      { value: '8', icon: '8️⃣', label: 'eight' },
      { value: '9', icon: '9️⃣', label: 'nine' },
      { value: '10', icon: '🔟', label: 'ten' },
    ] },
    { slot: 'colour', titleHe: 'איזה צבע אהוב?', choices: [
      { value: 'red', icon: '🔴', label: 'red' },
      { value: 'blue', icon: '🔵', label: 'blue' },
      { value: 'green', icon: '🟢', label: 'green' },
      { value: 'yellow', icon: '🟡', label: 'yellow' },
    ] },
    { slot: 'pet', titleHe: 'איזו חיית מחמד?', choices: [
      { value: 'dog', icon: '🐶', label: 'a dog' },
      { value: 'cat', icon: '🐱', label: 'a cat' },
      { value: 'none', icon: '🚫', label: 'no pet' },
    ] },
    { slot: 'game', titleHe: 'מה אוהב/ת לשחק?', choices: [
      { value: 'football', icon: '⚽', label: 'football' },
      { value: 'tag', icon: '🏃', label: 'tag' },
      { value: 'hide and seek', icon: '🙈', label: 'hide and seek' },
    ] },
  ],
  lines: {
    farewell: 'Bye, friend!',
    makeRight: "Yes! That's me!",
    makeWrong: "No, that's not me! Try again.",
  },
  phrases: [
    { speaker: 'sam', en: ASK_GREET, he: he.greet },
    { speaker: 'kid', en: SAY_HI, he: 'היי, סאם! אני חדש/ה פה.' },
    { speaker: 'sam', en: ASK_AGE, he: he.age },
    { speaker: 'kid', en: SAY_9, he: 'אני בן/בת תשע.' },
    { speaker: 'sam', en: ASK_COLOUR, he: 'מה הצבע האהוב עליכם?' },
    { speaker: 'kid', en: 'My favourite colour is blue.', he: 'הצבע האהוב עליי הוא כחול.' },
    { speaker: 'sam', en: ASK_PET, he: he.pet },
    { speaker: 'kid', en: SAY_DOG, he: 'כן, יש לי כלב.' },
    { speaker: 'sam', en: ASK_GAME, he: he.game },
    { speaker: 'kid', en: SAY_FOOTBALL, he: 'אני אוהב/ת לשחק כדורגל.' },
    { speaker: 'sam', en: ASK_PLAY, he: he.play },
    { speaker: 'kid', en: SAY_YES, he: 'כן, בבקשה! בוא נשחק!' },
    { speaker: 'sam', en: ASK_BYE, he: he.bye },
    { speaker: 'kid', en: SAY_BYE, he: 'נתראה מחר! ביי, סאם!' },
  ],
}

// ── Story ────────────────────────────────────────────────────────────────

const L = (text: string, heText: string): StoryLine => ({ text, he: heText })
const silly = (s: { say: string; reaction: string }, heSay: string, heReaction: string, icon: string): StoryChoice =>
  ({ say: s.say, he: heSay, icon, silly: L(s.reaction, heReaction) })

const BYE: StoryChoice = { say: SAY_BYE, he: 'נתראה מחר! ביי, סאם!', icon: '👋' }
const BYE_SILLY = silly(SILLY_BYE, 'נתראה בשנה הבאה!', 'בשנה הבאה? זה המון זמן! נסו שוב.', '📅')

const STORY: Story = {
  id: 'new-friend-story',
  title: "Sam's Playground Day",
  titleHe: 'יום כיף בגן השעשועים',
  start: 'ball',
  coverPlace: 'playground',
  introHe: [
    '🗨️ סאם מדבר — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '⚽', he: 'הכדור' },
    { icon: '👋', he: 'שלום' },
    { icon: '🎂', he: 'גיל' },
    { icon: '🐶', he: 'חיות' },
    { icon: '🎲', he: 'משחקים' },
    { icon: '🤝', he: 'משחקים יחד' },
    { icon: '🔍', he: 'מחפשים' },
    { icon: '🌇', he: 'אחר הצהריים' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'ball', place: 'playground', chapter: 0, noCharacter: true,
      narrationHe: 'עברתם לשכונה חדשה ואתם לא מכירים פה אף אחד. פתאום כדור מתגלגל עד לרגליים שלכם…',
      lines: [],
      props: [{ e: '⚽', x: 30, y: 70, s: 34 }],
      choices: [
        { say: 'Hello! Is this your ball?', he: 'שלום! זה הכדור שלך?', icon: '⚽', reply: L('Oh, my ball! Thank you!', 'אוי, הכדור שלי! תודה!'), next: 'greet' },
        { say: 'Here you are.', he: 'הנה, בבקשה.', icon: '🦶', reply: L('Oh, my ball! Thank you!', 'אוי, הכדור שלי! תודה!'), next: 'greet' },
      ],
    },
    {
      id: 'greet', place: 'playground', chapter: 1,
      narrationHe: 'ילד עם כובע מצחייה רץ אליכם ומחייך חיוך ענק.',
      lines: [L(ASK_GREET, he.greet)],
      choices: [
        { say: SAY_HI, he: 'היי, סאם! אני חדש/ה פה.', icon: '😊', next: 'age' },
        silly(SILLY_BANANA, 'היי! אני בננה.', 'בננה? לא, אתם ילדים! נסו שוב.', '🍌'),
      ],
    },
    {
      id: 'age', place: 'playground', chapter: 2,
      narrationHe: 'סאם מקפיץ את הכדור על הברך. הוא רוצה לדעת עליכם עוד.',
      lines: [L(ASK_AGE, he.age)],
      choices: [
        { say: SAY_8, he: 'אני בן/בת שמונה.', icon: '8️⃣', next: 'pet' },
        { say: SAY_9, he: 'אני בן/בת תשע.', icon: '9️⃣', next: 'pet' },
        { say: SAY_10, he: 'אני בן/בת עשר.', icon: '🔟', next: 'pet' },
        silly(SILLY_AGE, 'אני בן/בת מאה!', 'מאה? אתם נראים כל כך צעירים! נסו שוב.', '👴'),
      ],
    },
    {
      id: 'pet', place: 'playground', chapter: 3,
      narrationHe: 'כלבלב חולף ליד הגדר ונובח "הב הב!". סאם צוחק.',
      lines: [L(ASK_PET, he.pet)],
      props: [{ e: '🐕', x: 70, y: 58, s: 34 }],
      choices: [
        { say: SAY_DOG, he: 'כן, יש לי כלב.', icon: '🐶', set: { pet: 'dog' }, next: 'game' },
        { say: SAY_CAT, he: 'כן, יש לי חתול.', icon: '🐱', set: { pet: 'cat' }, next: 'game' },
        { say: SAY_NOPET, he: 'לא, אין לי חיית מחמד.', icon: '🚫', set: { pet: 'none' }, next: 'game' },
        silly(SILLY_PET, 'כן, יש לי דרקון.', 'דרקון? וואו! לא נראה לי. נסו שוב.', '🐉'),
      ],
    },
    {
      id: 'game', place: 'playground', chapter: 4,
      narrationHe: 'יש פה מגלשה, נדנדות ומלא מקום לרוץ. במה תבחרו?',
      lines: [L(ASK_GAME, he.game)],
      choices: [
        { say: SAY_FOOTBALL, he: 'אני אוהב/ת לשחק כדורגל.', icon: '⚽', set: { game: 'football' }, next: 'play' },
        { say: SAY_TAG, he: 'אני אוהב/ת לשחק תופסת.', icon: '🏃', set: { game: 'tag' }, next: 'play' },
        { say: SAY_HIDE, he: 'אני אוהב/ת לשחק מחבואים.', icon: '🙈', set: { game: 'hide' }, next: 'play' },
      ],
    },
    {
      id: 'play', place: 'playground', chapter: 5,
      narrationHe: 'סאם קופץ משמחה. "גם אני אוהב את זה!" הוא צועק.',
      lines: [L(ASK_PLAY, he.play)],
      choices: [
        {
          say: SAY_YES, he: 'כן, בבקשה! בוא נשחק!', icon: '🤝', next: 'friends',
          nextIf: [{ key: 'game', value: 'football', next: 'tree' }],
        },
        silly(SILLY_SLEEP, 'לא, אני רוצה לישון.', 'לישון? עכשיו זמן משחק! נסו שוב.', '😴'),
      ],
    },
    {
      id: 'tree', place: 'tree', chapter: 6,
      narrationHe: 'בעטתם חזק מדי — הכדור עף ונתקע בעץ! אתם מנערים את העץ, ונופלים ממנו עלים, אגוזים… וכדורים! מצאו את 3 הכדורים!',
      lines: [L('Oh no! The ball is in the tree! Shake it!', 'אוי לא! הכדור בעץ! נערו אותו!')],
      event: {
        kind: 'find', target: '⚽', count: 3,
        decoys: ['🍃', '🍂', '🌰', '🐦', '🐿️', '🍎', '🪶'],
        promptHe: 'מצאו את 3 הכדורים שנפלו מהעץ!',
        doneLine: L('Three balls! Now everybody can play!', 'שלושה כדורים! עכשיו כולם יכולים לשחק!'),
      },
      next: 'captain',
    },
    {
      id: 'friends', place: 'playground', chapter: 6,
      narrationHe: 'החברים של סאם מצטרפים למשחק — ומיד נעלמים! הם מתחבאים מאחורי העצים והשיחים. מצאו את 3 הילדים!',
      lines: [L('My friends are hiding. Can you find them?', 'החברים שלי מתחבאים. תוכלו למצוא אותם?')],
      event: {
        kind: 'find', target: '🧒', count: 3,
        decoys: ['🌳', '🌷', '🪨', '🦋', '🐿️', '🌼', '🍄'],
        promptHe: 'מצאו את 3 החברים שמתחבאים!',
        doneLine: L('You found everybody! You are so good at this!', 'מצאתם את כולם! אתם ממש טובים בזה!'),
      },
      next: 'later',
    },
    {
      id: 'captain', place: 'playground', chapter: 7,
      narrationHe: 'כל הילדים בגן השעשועים רצים לשחק. צריך לבחור קפטן לקבוצה…',
      lines: [L("Let's play a big game! Who is the captain?", 'בואו נשחק משחק גדול! מי הקפטן?')],
      props: [{ e: '🧒', x: 40, y: 62, s: 30 }, { e: '👧', x: 52, y: 62, s: 30 }, { e: '⚽', x: 46, y: 76, s: 24 }],
      choices: [
        { say: 'I want to be the captain!', he: 'אני רוצה להיות הקפטן!', icon: '🧢', next: 'end-captain' },
        { say: 'You are the captain, Sam!', he: 'אתה הקפטן, סאם!', icon: '👦', reply: L('Thanks! You are on my team!', 'תודה! אתם בקבוצה שלי!'), next: 'later' },
      ],
    },
    {
      id: 'later', place: 'playground', chapter: 7,
      narrationHe: 'שיחקתם המון. השמש מתחילה לרדת, ואתם קצת עייפים… וקצת רעבים.',
      lines: [L('That was fun! What do you want to do now?', 'היה כיף! מה אתם רוצים לעשות עכשיו?')],
      choices: [
        { say: "Let's get ice cream!", he: 'בוא נקנה גלידה!', icon: '🍦', next: 'end-icecream' },
        {
          say: "Let's go on the swings!", he: 'בוא נעלה על הנדנדות!', icon: '🎠', next: 'end-friends',
          nextIf: [{ key: 'pet', value: 'dog', next: 'end-pet' }, { key: 'pet', value: 'cat', next: 'end-pet' }],
        },
        { say: "Let's play in the mud!", he: 'בוא נשחק בבוץ!', icon: '🟤', silly: L('In the mud? My mum will be angry! Try again.', 'בבוץ? אמא שלי תכעס! נסו שוב.') },
      ],
    },
    {
      id: 'end-friends', place: 'park', chapter: 8, ending: 'friends',
      narrationHe: 'אתם מתנדנדים גבוה־גבוה עם סאם, עד שהשמיים נצבעים בכתום.',
      lines: [L(ASK_BYE, he.bye)],
      choices: [BYE, BYE_SILLY],
    },
    {
      id: 'end-pet', place: 'park', chapter: 8, ending: 'pet',
      narrationHe: 'פתאום מישהו רץ אליכם בשמחה… זאת חיית המחמד שלכם! היא באה לחפש אתכם.',
      lines: [L('Is that your pet? So cute! Bring it tomorrow!', 'זאת חיית המחמד שלכם? כל כך חמודה! תביאו אותה מחר!')],
      props: [{ e: '🐾', x: 44, y: 72, s: 30 }],
      choices: [BYE, BYE_SILLY],
    },
    {
      id: 'end-icecream', place: 'icecream', chapter: 8, ending: 'icecream',
      narrationHe: 'אתם יושבים עם סאם מתחת לשמשייה, וכל אחד מלקק גלידה ענקית.',
      lines: [L('Yum! You are my best friend!', 'יאמי! אתם החברים הכי טובים שלי!')],
      choices: [{ say: 'You are my best friend too!', he: 'גם אתה החבר הכי טוב שלי!', icon: '💛' }],
    },
    {
      id: 'end-captain', place: 'playground', chapter: 8, ending: 'captain',
      narrationHe: 'אתם הקפטן! אתם מוסרים לסאם, הוא מחזיר לכם — ו… גוֹל!',
      lines: [L('Goal! You are a super captain!', 'גול! אתם קפטן־על!')],
      props: [{ e: '🥅', x: 46, y: 50, s: 46 }, { e: '⚽', x: 50, y: 60, s: 22 }],
      choices: [{ say: 'Yay! We are a great team!', he: 'יש! אנחנו קבוצה מעולה!', icon: '🏆' }],
    },
  ],
  endings: [
    { id: 'friends', emoji: '🌇', title: 'See You Tomorrow', titleHe: 'נתראה מחר', descHe: 'התנדנדתם עם סאם עד השקיעה — ומחר נפגשים שוב.', place: 'park' },
    { id: 'pet', emoji: '🐾', title: 'Pet Surprise', titleHe: 'הפתעה פרוותית', descHe: 'חיית המחמד שלכם הגיעה לגן — וסאם התאהב בה.', place: 'park', props: [{ e: '🐾', x: 44, y: 72, s: 30 }] },
    { id: 'icecream', emoji: '🍦', title: 'Ice-Cream Friends', titleHe: 'חברים של גלידה', descHe: 'אכלתם גלידה עם החבר הכי טוב החדש שלכם.', place: 'icecream' },
    { id: 'captain', emoji: '🧢', title: 'Team Captain', titleHe: 'קפטן הקבוצה', descHe: 'הייתם הקפטן — והבקעתם גול עם סאם!', place: 'playground', props: [{ e: '🥅', x: 46, y: 50, s: 46 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
