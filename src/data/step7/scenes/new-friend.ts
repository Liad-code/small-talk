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
const ASK_FUN = 'That was a fun game!'
const ASK_NOW = 'What do you want to do now?'
const ASK_BYE = "It's time to go home. See you tomorrow!"

const SAY_HI = "Hi, Sam! I'm new here."
const SAY_LIVE = 'No, I live here.'
const SAY_8 = "I'm eight."
const SAY_9 = "I'm nine."
const SAY_10 = "I'm ten."
const SAY_DOG = 'Yes, I have a dog.'
const SAY_CAT = 'Yes, I have a cat.'
const SAY_HAMSTER = 'Yes, I have a hamster.'
const SAY_TURTLE = 'Yes, I have a turtle.'
const SAY_RABBIT = 'Yes, I have a rabbit.'
const SAY_NOPET = "No, I don't have a pet."
const SAY_FOOTBALL = 'I like to play football.'
const SAY_BASKETBALL = 'I like to play basketball.'
const SAY_TAG = 'I like to play tag.'
const SAY_HIDE = 'I like to play hide and seek.'
const SAY_YES = "Yes, please! Let's play!"
const SAY_FUN = 'It was fun!'
const SAY_GREAT = 'It was a great game!'
const SAY_AGAIN_TOMORROW = 'Maybe we can play again tomorrow!'
const SAY_ICECREAM = "Let's eat ice cream!"
const SAY_HOME = "I want to go home. It's late."
const SAY_PLAY_AGAIN = "Let's play again!"
const SAY_NICE = 'It was so nice to meet you!'
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
  fun: 'זה היה משחק כיפי!',
  now: 'מה אתם רוצים לעשות עכשיו?',
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
      hintHe: "סאם שואל אם אתם חדשים. I'm new here = אני חדש/ה פה, I live here = אני גר/ה פה",
      swapHintHe: 'אתם סאם! הציגו את עצמכם ושאלו אם הילד חדש פה.',
      options: [
        { say: SAY_HI, correct: true, icon: '😊', label: "I'm new" },
        { say: SAY_LIVE, correct: true, icon: '🏠', label: 'I live here' },
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
      hintHe: 'יש לכם חיית מחמד? dog = כלב, cat = חתול, hamster = אוגר, turtle = צב, rabbit = ארנב, No = לא',
      swapHintHe: 'שאלו את הילד אם יש לו חיית מחמד.',
      options: [
        { say: SAY_DOG, correct: true, pick: { slot: 'pet', value: 'dog' }, icon: '🐶', label: 'a dog' },
        { say: SAY_CAT, correct: true, pick: { slot: 'pet', value: 'cat' }, icon: '🐱', label: 'a cat' },
        { say: SAY_HAMSTER, correct: true, pick: { slot: 'pet', value: 'hamster' }, icon: '🐹', label: 'a hamster' },
        { say: SAY_TURTLE, correct: true, pick: { slot: 'pet', value: 'turtle' }, icon: '🐢', label: 'a turtle' },
        { say: SAY_RABBIT, correct: true, pick: { slot: 'pet', value: 'rabbit' }, icon: '🐰', label: 'a rabbit' },
        { say: SAY_NOPET, correct: true, pick: { slot: 'pet', value: 'none' }, icon: '🚫', label: 'no pet' },
        { say: SILLY_PET.say, correct: false, reaction: SILLY_PET.reaction },
      ],
      distractorWord: 'dragon',
      swapSilly: { say: 'Do you have a pet elephant?', reaction: "An elephant? It can't fit in my house!" },
    },
    {
      id: 'game',
      ask: ASK_GAME,
      hintHe: 'מה אתם אוהבים לשחק? football = כדורגל, basketball = כדורסל, tag = תופסת, hide and seek = מחבואים',
      swapHintHe: 'שאלו את הילד מה הוא אוהב לשחק.',
      options: [
        { say: SAY_FOOTBALL, correct: true, pick: { slot: 'game', value: 'football' }, icon: '⚽', label: 'football' },
        { say: SAY_BASKETBALL, correct: true, pick: { slot: 'game', value: 'basketball' }, icon: '🏀', label: 'basketball' },
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
      id: 'fun',
      ask: ASK_FUN,
      hintHe: 'שיחקתם יחד! fun = כיף, a great game = משחק מעולה, again tomorrow = שוב מחר',
      swapHintHe: 'אמרו לילד החדש שהיה משחק כיפי.',
      options: [
        { say: SAY_FUN, correct: true, icon: '😄', label: 'fun' },
        { say: SAY_GREAT, correct: true, icon: '🏆', label: 'a great game' },
        { say: SAY_AGAIN_TOMORROW, correct: true, icon: '📅', label: 'again tomorrow' },
      ],
      distractorWord: 'pizza',
      swapSilly: { say: 'That was a boring game!', reaction: 'Boring? No! It was fun!' },
    },
    {
      id: 'now',
      ask: ASK_NOW,
      hintHe: "מה עושים עכשיו? Let's eat ice cream = בוא נאכל גלידה, go home = ללכת הביתה, play again = לשחק שוב",
      swapHintHe: 'שאלו את הילד החדש מה הוא רוצה לעשות עכשיו.',
      options: [
        { say: SAY_ICECREAM, correct: true, icon: '🍦', label: 'ice cream' },
        { say: SAY_HOME, correct: true, icon: '🏠', label: 'go home' },
        { say: SAY_PLAY_AGAIN, correct: true, icon: '🔁', label: 'play again' },
      ],
      distractorWord: 'sleep',
      swapSilly: { say: 'Do you want to do homework now?', reaction: 'Homework? No! I want to have fun!' },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE,
      hintHe: 'נפרדים מסאם. It was so nice to meet you = איזה כיף שהכרנו, See you tomorrow = נתראה מחר',
      swapHintHe: 'אמרו לילד שהגיע הזמן ללכת ושתתראו מחר.',
      options: [
        { say: SAY_NICE, correct: true, icon: '💛', label: 'nice to meet you' },
        { say: SAY_BYE, correct: true, icon: '👋', label: 'see you tomorrow' },
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
      { value: 'hamster', icon: '🐹', label: 'a hamster' },
      { value: 'turtle', icon: '🐢', label: 'a turtle' },
      { value: 'rabbit', icon: '🐰', label: 'a rabbit' },
      { value: 'none', icon: '🚫', label: 'no pet' },
    ] },
    { slot: 'game', titleHe: 'מה אוהב/ת לשחק?', choices: [
      { value: 'football', icon: '⚽', label: 'football' },
      { value: 'basketball', icon: '🏀', label: 'basketball' },
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
    { speaker: 'kid', en: SAY_LIVE, he: 'לא, אני גר/ה פה.' },
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
    { speaker: 'sam', en: ASK_FUN, he: he.fun },
    { speaker: 'kid', en: SAY_GREAT, he: 'זה היה משחק מעולה!' },
    { speaker: 'sam', en: ASK_NOW, he: he.now },
    { speaker: 'kid', en: SAY_ICECREAM, he: 'בוא נאכל גלידה!' },
    { speaker: 'sam', en: ASK_BYE, he: he.bye },
    { speaker: 'kid', en: SAY_NICE, he: 'איזה כיף שהכרנו!' },
    { speaker: 'kid', en: SAY_BYE, he: 'נתראה מחר! ביי, סאם!' },
  ],
}

// ── Story ────────────────────────────────────────────────────────────────

const L = (text: string, heText: string): StoryLine => ({ text, he: heText })

const BYE: StoryChoice = { say: SAY_BYE, he: 'נתראה מחר! ביי, סאם!', icon: '👋' }
const NICE: StoryChoice = { say: 'It was so nice to meet you!', he: 'איזה כיף שהכרנו!', icon: '💛' }

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
    { icon: '🎉', he: 'היה כיף' },
    { icon: '🤔', he: 'מה עכשיו?' },
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
        { say: SAY_HI, he: 'היי, סאם! אני חדש/ה פה.', icon: '😊', reply: L('Welcome! You will love it here!', 'ברוכים הבאים! אתם תאהבו את המקום!'), next: 'age' },
        { say: 'No, I live here.', he: 'לא, אני גר/ה פה.', icon: '🏠', reply: L('Really? Cool! We are neighbours!', 'באמת? מגניב! אנחנו שכנים!'), next: 'age' },
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
        { say: 'Yes, I have a hamster.', he: 'כן, יש לי אוגר.', icon: '🐹', set: { pet: 'hamster' }, next: 'game' },
        { say: 'Yes, I have a turtle.', he: 'כן, יש לי צב.', icon: '🐢', set: { pet: 'turtle' }, next: 'game' },
        { say: 'Yes, I have a rabbit.', he: 'כן, יש לי ארנב.', icon: '🐰', set: { pet: 'rabbit' }, next: 'game' },
        { say: SAY_NOPET, he: 'לא, אין לי חיית מחמד.', icon: '🚫', set: { pet: 'none' }, next: 'game' },
      ],
    },
    {
      id: 'game', place: 'playground', chapter: 4,
      narrationHe: 'יש פה מגלשה, נדנדות, סל כדורסל ומלא מקום לרוץ. במה תבחרו?',
      lines: [L(ASK_GAME, he.game)],
      choices: [
        { say: SAY_FOOTBALL, he: 'אני אוהב/ת לשחק כדורגל.', icon: '⚽', set: { game: 'football' }, next: 'play' },
        { say: 'I like to play basketball.', he: 'אני אוהב/ת לשחק כדורסל.', icon: '🏀', set: { game: 'basketball' }, next: 'play' },
        { say: SAY_TAG, he: 'אני אוהב/ת לשחק תופסת.', icon: '🏃', set: { game: 'tag' }, next: 'play' },
        { say: SAY_HIDE, he: 'אני אוהב/ת לשחק מחבואים.', icon: '🙈', set: { game: 'hide' }, next: 'play' },
      ],
    },
    {
      id: 'play', place: 'playground', chapter: 5,
      narrationHe: 'סאם קופץ משמחה. "גם אני אוהב את זה!" הוא צועק.',
      lines: [L(ASK_PLAY, he.play)],
      choices: [
        { say: SAY_YES, he: 'כן, בבקשה! בוא נשחק!', icon: '🤝', next: 'fun' },
      ],
    },
    {
      id: 'fun', place: 'playground', chapter: 6,
      narrationHe: 'שיחקתם יחד המון זמן — רצתם, צחקתם ונהניתם. עכשיו אתם יושבים על הדשא, מתנשפים ומחייכים.',
      lines: [L('That was a fun game!', 'זה היה משחק כיפי!')],
      props: [{ e: '💦', x: 40, y: 52, s: 22 }, { e: '🌼', x: 56, y: 74, s: 20 }],
      choices: [
        { say: 'It was fun!', he: 'היה כיף!', icon: '😄', next: 'now' },
        { say: 'It was a great game!', he: 'זה היה משחק מעולה!', icon: '🏆', next: 'now' },
        { say: 'Maybe we can play again tomorrow!', he: 'אולי נוכל לשחק שוב מחר!', icon: '📅', reply: L('Yes! Every day!', 'כן! כל יום!'), next: 'now' },
      ],
    },
    {
      id: 'now', place: 'playground', chapter: 7,
      narrationHe: 'השמש מתחילה לרדת. אתם קצת עייפים… וקצת רעבים. סאם מסתכל עליכם בסקרנות.',
      lines: [L('What do you want to do now?', 'מה אתם רוצים לעשות עכשיו?')],
      choices: [
        { say: "Let's eat ice cream!", he: 'בוא נאכל גלידה!', icon: '🍦', reply: L('Yes! I love ice cream!', 'כן! אני אוהב גלידה!'), next: 'end-icecream' },
        { say: "I want to go home. It's late.", he: 'אני רוצה ללכת הביתה. מאוחר.', icon: '🏠', next: 'end-home' },
        { say: "Let's play again!", he: 'בוא נשחק שוב!', icon: '🔁', reply: L('Yes! One more game!', 'כן! עוד משחק אחד!'), next: 'end-again' },
      ],
    },
    {
      id: 'end-icecream', place: 'icecream', chapter: 8, ending: 'icecream',
      narrationHe: 'אתם יושבים עם סאם מתחת לשמשייה, וכל אחד מלקק גלידה ענקית.',
      lines: [L('Yum! Ice cream with a new friend!', 'יאמי! גלידה עם חבר חדש!')],
      choices: [NICE, BYE],
    },
    {
      id: 'end-home', place: 'park', chapter: 8, ending: 'home',
      narrationHe: 'השמיים נצבעים בכתום. אתם וסאם הולכים יחד עד הפינה, ושם נפרדים.',
      lines: [L(ASK_BYE, he.bye)],
      choices: [NICE, BYE],
    },
    {
      id: 'end-again', place: 'playground', chapter: 8, ending: 'again',
      narrationHe: 'עוד משחק, ועוד אחד… עד שאמא של סאם קוראת לו מהחלון.',
      lines: [L('My mum is calling. I have to go!', 'אמא שלי קוראת לי. אני צריך ללכת!')],
      props: [{ e: '🏀', x: 46, y: 70, s: 26 }],
      choices: [NICE, BYE],
    },
  ],
  endings: [
    { id: 'icecream', emoji: '🍦', title: 'Ice-Cream Friends', titleHe: 'חברים של גלידה', descHe: 'אכלתם גלידה עם סאם, החבר החדש שלכם.', place: 'icecream' },
    { id: 'home', emoji: '🌇', title: 'See You Tomorrow', titleHe: 'נתראה מחר', descHe: 'הלכתם הביתה בזמן — ומחר נפגשים שוב עם סאם.', place: 'park' },
    { id: 'again', emoji: '🔁', title: 'One More Game', titleHe: 'עוד משחק אחד', descHe: 'שיחקתם עם סאם עוד ועוד, עד שאמא שלו קראה לו הביתה.', place: 'playground', props: [{ e: '🏀', x: 46, y: 70, s: 26 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
