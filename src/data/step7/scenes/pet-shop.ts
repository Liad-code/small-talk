import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — Penny's Pet Shop. The child chooses a pet (which animal, colour,
 * size, a name and a bed or a toy). Story: the puppies escape, Kiki the parrot
 * repeats everything, and the day ends with a new best friend, a parrot that
 * follows you home, or feeding time with Penny.
 */

const ASK_GREET: StoryLine = { text: "Hello! Welcome to Penny's Pet Shop! Can I help you?", he: 'שלום! ברוכים הבאים לחנות החיות של פני! אפשר לעזור לכם?' }
const ASK_PET: StoryLine = { text: 'Which pet would you like?', he: 'איזו חיה הייתם רוצים?' }
const ASK_COLOUR: StoryLine = { text: 'What colour would you like?', he: 'איזה צבע הייתם רוצים?' }
const ASK_SIZE: StoryLine = { text: 'Do you want a big one or a small one?', he: 'אתם רוצים גדול או קטן?' }
const ASK_FOOD: StoryLine = { text: 'What food does it need?', he: 'איזה אוכל הוא צריך?' }
const ASK_NAME: StoryLine = { text: 'What is its name?', he: 'מה השם שלו?' }
const ASK_EXTRA: StoryLine = { text: 'Do you want a bed or a toy for it?', he: 'אתם רוצים מיטה או צעצוע בשבילו?' }
const HERE_PET: StoryLine = { text: 'Here is your new pet! Take good care of it!', he: 'הנה חיית המחמד החדשה שלכם! תשמרו עליה יפה!' }

const GOODBYE: StoryChoice = { say: 'Thank you! Goodbye!', he: 'תודה! להתראות!', icon: '👋' }
const WOOF: StoryChoice = { say: 'Woof woof!', he: 'הב הב!', icon: '🐕', silly: { text: "Woof? You're not a puppy! Try again.", he: 'הב? אתם לא גורים! נסו שוב.' } }
const HELP_YES = { say: 'Yes! I can help you.', he: 'כן! אני יכול/ה לעזור לך.' }

const SCENE: Scene = {
  id: 'pet-shop',
  title: "Penny's Pet Shop",
  titleHe: 'בחנות החיות',
  emoji: '🐶',
  character: { speaker: 'penny', name: 'Penny', nameHe: 'פני', emoji: '👩‍🌾' },
  result: 'items',
  ui: {
    gradient: 'from-amber-400 to-yellow-500',
    cardEn: 'Choose a pet — then be the pet-shop owner!',
    cardHe: 'בוחרים חיית מחמד — ואז הופכים לפני מחנות החיות!',
    subtitleHe: 'בחנות החיות — בוחרים חיית מחמד באנגלית',
    sign: "🐾 Penny's Pet Shop",
    stagePlace: 'shop',
    introHe: {
      order: 'פני שואלת — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם פני — שאלו את הלקוח, זכרו מה ביקש ותנו לו בדיוק את חיית המחמד שרצה.',
    },
    startEn: "Let's go!", startHe: 'נכנסים לחנות החיות',
    swapTab: '👩‍🌾 Be Penny',
    swapStartEn: 'Open the shop!', swapStartHe: 'פותחים את חנות החיות',
    swapAskHe: 'מה פני אומרת עכשיו?',
    swapSayHe: 'אמרו את המשפט של פני בקול!',
    makeTitleHe: 'תנו ללקוח בדיוק את מה שביקש:',
    serveEn: 'Here you go!', serveHe: 'תנו ללקוח',
    doneEn: 'You have a new pet!', doneHe: 'בחרתם חיית מחמד באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Penny!', swapDoneHe: 'הייתם פני ועזרתם ללקוח באנגלית!',
    customerName: 'Customer',
    learnHe: 'אלה המשפטים של השיחה בחנות החיות. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לבחור חיה לבד!',
  },
  places: {
    outside: {
      bg: 'linear-gradient(#bae6fd, #e0f2fe 60%, #fef3c7)',
      floor: { bg: 'repeating-linear-gradient(90deg, #d6d3d1 0 30px, #e7e5e4 30px 60px)', h: 20, border: '#a8a29e' },
      decor: [
        { e: '☁️', x: 10, y: 6, s: 30, anim: 'cloud' },
        { e: '🪟', x: 30, y: 30, s: 54 },
        { e: '🐶', x: 33, y: 36, s: 26, anim: 'float' },
        { e: '🪟', x: 58, y: 30, s: 54 },
        { e: '🐱', x: 61, y: 36, s: 26 },
        { e: '🌳', x: 85, y: 28, s: 50 },
      ],
      sign: "🐾 Penny's Pet Shop",
    },
    shop: {
      bg: 'linear-gradient(#fef9c3, #fde68a)',
      floor: { bg: 'repeating-linear-gradient(90deg, #d97706 0 24px, #b45309 24px 48px)', h: 22, border: '#92400e' },
      decor: [
        { e: '🦜', x: 10, y: 28, s: 34, anim: 'float' },
        { e: '🐠', x: 30, y: 34, s: 28, anim: 'float' },
        { e: '🐰', x: 50, y: 40, s: 30 },
        { e: '🐹', x: 68, y: 38, s: 26 },
        { e: '🦴', x: 86, y: 30, s: 28 },
      ],
      sign: "🐾 Penny's Pet Shop",
      counter: { bg: '#f59e0b', border: '#b45309', item: '🐾' },
    },
    backroom: {
      bg: 'linear-gradient(#fffbeb, #fef3c7)',
      floor: { bg: 'repeating-conic-gradient(#fcd34d 0% 25%, #fffbeb 0% 50%) 0 0 / 28px 28px', h: 22, border: '#f59e0b' },
      decor: [
        { e: '🥣', x: 15, y: 40, s: 30 },
        { e: '🦴', x: 32, y: 32, s: 28 },
        { e: '🥕', x: 50, y: 38, s: 28 },
        { e: '🐟', x: 68, y: 32, s: 28 },
        { e: '🥣', x: 84, y: 42, s: 30 },
      ],
      sign: '🍽️ Dinner Time',
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_GREET.text,
      hintHe: 'אמרו לפני שאתם רוצים חיית מחמד. a pet = חיית מחמד',
      swapHintHe: 'אתם פני! קבלו את הלקוח בברכה ושאלו אם אפשר לעזור.',
      options: [
        { say: 'Yes, please. I would like a pet.', correct: true },
        { say: 'Yes, please. I would like a dinosaur.', correct: false, reaction: 'A dinosaur? Roar! No, no! Try again.' },
      ],
      distractorWord: 'dinosaur',
      swapSilly: { say: 'Can you bark for me?', reaction: 'Woof! Ha ha! I want a pet!' },
    },
    {
      id: 'pet',
      ask: ASK_PET.text,
      hintHe: 'בחרו חיה: a puppy = גור כלבים, a kitten = גור חתולים, a rabbit = ארנב, a fish = דג',
      swapHintHe: 'שאלו את הלקוח איזו חיה הוא רוצה.',
      showCorrect: 3,
      options: [
        { say: 'A puppy, please.', correct: true, pick: { slot: 'pet', value: 'puppy' }, icon: '🐶', label: 'puppy' },
        { say: 'A kitten, please.', correct: true, pick: { slot: 'pet', value: 'kitten' }, icon: '🐱', label: 'kitten' },
        { say: 'A rabbit, please.', correct: true, pick: { slot: 'pet', value: 'rabbit' }, icon: '🐰', label: 'rabbit' },
        { say: 'A fish, please.', correct: true, pick: { slot: 'pet', value: 'fish' }, icon: '🐟', label: 'fish' },
        { say: 'An elephant, please.', correct: false, reaction: "An elephant? It's too big! Try again." },
      ],
      distractorWord: 'elephant',
      swapSilly: { say: 'Would you like a cow?', reaction: "A cow? Moo! No, thanks!" },
    },
    {
      id: 'colour',
      ask: ASK_COLOUR.text,
      hintHe: 'בחרו צבע: brown = חום, black = שחור, white = לבן',
      swapHintHe: 'שאלו את הלקוח איזה צבע הוא רוצה.',
      options: [
        { say: 'Brown, please.', correct: true, pick: { slot: 'colour', value: 'brown' }, icon: '🟤', label: 'brown' },
        { say: 'Black, please.', correct: true, pick: { slot: 'colour', value: 'black' }, icon: '⚫', label: 'black' },
        { say: 'White, please.', correct: true, pick: { slot: 'colour', value: 'white' }, icon: '⚪', label: 'white' },
        { say: 'Purple, please.', correct: false, reaction: 'Purple? I have no purple pets! Try again.' },
      ],
      distractorWord: 'purple',
      swapSilly: { say: 'Do you want a blue banana?', reaction: 'A banana? I want a pet!' },
    },
    {
      id: 'size',
      ask: ASK_SIZE.text,
      hintHe: 'גדול או קטן? big = גדול, small = קטן',
      swapHintHe: 'שאלו את הלקוח אם הוא רוצה חיה גדולה או קטנה.',
      options: [
        { say: 'A small one, please.', correct: true, pick: { slot: 'size', value: 'small' }, icon: '🤏', label: 'small' },
        { say: 'A big one, please.', correct: true, pick: { slot: 'size', value: 'big' }, icon: '🙌', label: 'big' },
        { say: 'As big as a house, please.', correct: false, reaction: 'As big as a house? Oh no! Try again.' },
      ],
      distractorWord: 'house',
      swapSilly: { say: 'Do you want a dragon?', reaction: 'A dragon? No! A pet, please!' },
    },
    {
      id: 'food',
      ask: ASK_FOOD.text,
      hintHe: 'בקשו אוכל לחיה. pet food = אוכל לחיות מחמד',
      swapHintHe: 'שאלו את הלקוח איזה אוכל החיה צריכה.',
      options: [
        { say: 'Pet food, please.', correct: true },
        { say: 'Pizza, please.', correct: false, reaction: 'Pizza for a pet? No, no! Try again.' },
      ],
      distractorWord: 'pizza',
      swapSilly: { say: 'Does it eat socks?', reaction: 'Socks? Yuck! No way!' },
    },
    {
      id: 'name',
      ask: ASK_NAME.text,
      hintHe: 'תנו שם לחיה! Its name is… = השם שלו הוא…',
      swapHintHe: 'שאלו את הלקוח איך קוראים לחיה החדשה.',
      options: [
        { say: 'Its name is Coco.', correct: true, icon: '🥥', label: 'Coco' },
        { say: 'Its name is Max.', correct: true, icon: '⭐', label: 'Max' },
        { say: 'Its name is Bubbles.', correct: true, icon: '🫧', label: 'Bubbles' },
        { say: 'Its name is Table.', correct: false, reaction: "Table? That's a funny name! Try again." },
      ],
      distractorWord: 'table',
      swapSilly: { say: 'Can I call it Banana?', reaction: "Banana? No! That's my lunch!" },
    },
    {
      id: 'extra',
      ask: ASK_EXTRA.text,
      hintHe: 'a bed = מיטה, a toy = צעצוע, No, thank you = לא, תודה',
      swapHintHe: 'שאלו את הלקוח אם הוא רוצה מיטה או צעצוע לחיה.',
      options: [
        { say: 'A bed, please.', correct: true, pick: { slot: 'extra', value: 'bed' }, icon: '🛏️', label: 'a bed' },
        { say: 'A toy, please.', correct: true, pick: { slot: 'extra', value: 'toy' }, icon: '🧸', label: 'a toy' },
        { say: 'No, thank you.', correct: true, pick: { slot: 'extra', value: 'none' }, icon: '🚫', label: 'nothing' },
        { say: 'A bike, please.', correct: false, reaction: "A bike? Pets can't ride bikes! Try again." },
      ],
      distractorWord: 'bike',
      swapSilly: { say: 'Do you want a hat for it?', reaction: 'A hat? Ha ha, no!' },
    },
    {
      id: 'goodbye',
      ask: HERE_PET.text,
      hintHe: 'הודו לפני ונפרדו ממנה.',
      swapHintHe: 'תנו ללקוח את החיה ובקשו ממנו לשמור עליה.',
      options: [
        { say: 'Thank you! Goodbye!', correct: true },
        { say: 'Woof woof!', correct: false, reaction: WOOF.silly!.text },
      ],
      distractorWord: 'woof',
      swapSilly: { say: 'Please bring it back tomorrow!', reaction: "No way! It's my best friend!" },
    },
  ],
  makeAfterStep: 'extra',
  makeSlots: [
    { slot: 'pet', titleHe: 'איזו חיה?', choices: [
      { value: 'puppy', icon: '🐶', label: 'puppy' },
      { value: 'kitten', icon: '🐱', label: 'kitten' },
      { value: 'rabbit', icon: '🐰', label: 'rabbit' },
      { value: 'fish', icon: '🐟', label: 'fish' },
    ] },
    { slot: 'colour', titleHe: 'איזה צבע?', choices: [
      { value: 'brown', icon: '🟤', label: 'brown' },
      { value: 'black', icon: '⚫', label: 'black' },
      { value: 'white', icon: '⚪', label: 'white' },
    ] },
    { slot: 'size', titleHe: 'גדול או קטן?', choices: [
      { value: 'small', icon: '🤏', label: 'small' },
      { value: 'big', icon: '🙌', label: 'big' },
    ] },
    { slot: 'extra', titleHe: 'מה עוד?', choices: [
      { value: 'bed', icon: '🛏️', label: 'a bed' },
      { value: 'toy', icon: '🧸', label: 'a toy' },
      { value: 'none', icon: '🚫', label: 'nothing' },
    ] },
  ],
  lines: {
    farewell: 'Bye! Come again soon!',
    makeRight: "Yes! That's my new pet!",
    makeWrong: "No, that's not my pet! Try again.",
  },
  phrases: [
    { speaker: 'penny', en: ASK_GREET.text, he: ASK_GREET.he },
    { speaker: 'kid', en: 'Yes, please. I would like a pet.', he: 'כן, בבקשה. הייתי רוצה חיית מחמד.' },
    { speaker: 'penny', en: ASK_PET.text, he: ASK_PET.he },
    { speaker: 'kid', en: 'A puppy, please.', he: 'גור כלבים, בבקשה.' },
    { speaker: 'penny', en: ASK_COLOUR.text, he: ASK_COLOUR.he },
    { speaker: 'kid', en: 'Brown, please.', he: 'חום, בבקשה.' },
    { speaker: 'penny', en: ASK_SIZE.text, he: ASK_SIZE.he },
    { speaker: 'kid', en: 'A small one, please.', he: 'קטן, בבקשה.' },
    { speaker: 'penny', en: ASK_FOOD.text, he: ASK_FOOD.he },
    { speaker: 'kid', en: 'Pet food, please.', he: 'אוכל לחיות מחמד, בבקשה.' },
    { speaker: 'penny', en: ASK_NAME.text, he: ASK_NAME.he },
    { speaker: 'kid', en: 'Its name is Coco.', he: 'קוראים לו קוקו.' },
    { speaker: 'penny', en: ASK_EXTRA.text, he: ASK_EXTRA.he },
    { speaker: 'kid', en: 'A bed, please.', he: 'מיטה, בבקשה.' },
    { speaker: 'penny', en: HERE_PET.text, he: HERE_PET.he },
    { speaker: 'kid', en: 'Thank you! Goodbye!', he: 'תודה! להתראות!' },
  ],
}

const STORY: Story = {
  id: 'pet-shop-story',
  title: "Penny's Busy Day",
  titleHe: 'היום העמוס של פני',
  start: 'door',
  coverPlace: 'outside',
  introHe: [
    '🗨️ פני מדברת — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '🚪', he: 'בדלת' },
    { icon: '👋', he: 'שלום' },
    { icon: '🔍', he: 'הגורים ברחו' },
    { icon: '🦜', he: 'התוכי' },
    { icon: '🐾', he: 'בוחרים חיה' },
    { icon: '🏷️', he: 'שם' },
    { icon: '🍖', he: 'ארוחת ערב' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'door', place: 'outside', chapter: 0, noCharacter: true,
      narrationHe: 'אתם עוברים ליד חנות החיות של פני. מבפנים שומעים: הב! מיאו! ציוץ! מה עושים?',
      lines: [],
      choices: [
        { say: 'Hello! Is anybody here?', he: 'שלום! יש פה מישהו?', icon: '🗣️', reply: { text: 'Hello! Come in, please!', he: 'שלום! היכנסו, בבקשה!' }, next: 'greet' },
      ],
    },
    {
      id: 'greet', place: 'shop', chapter: 1,
      narrationHe: 'נכנסתם! ארנבים קופצים, דגים שוחים, ופני מחייכת מאחורי הדלפק.',
      lines: [ASK_GREET],
      choices: [
        { say: 'Yes, please. I would like a pet.', he: 'כן, בבקשה. הייתי רוצה חיית מחמד.', icon: '🐾', next: 'oops' },
        { say: 'Yes, please. I would like a dinosaur.', he: 'כן, בבקשה. הייתי רוצה דינוזאור.', icon: '🦖', silly: { text: 'A dinosaur? Roar! No, no! Try again.', he: 'דינוזאור? גרררר! לא, לא! נסו שוב.' } },
      ],
    },
    {
      id: 'oops', place: 'shop', chapter: 2,
      narrationHe: 'פתאום — בום! הקופסה של הגורים נפתחת, והם בורחים לכל עבר!',
      props: [{ e: '📦', x: 45, y: 45, s: 40 }],
      lines: [{ text: 'Oh no! The puppies are out! Can you help me?', he: 'אוי לא! הגורים ברחו! תוכלו לעזור לי?' }],
      choices: [
        { ...HELP_YES, icon: '💪', next: 'find' },
        { say: 'Oh no! Where are they?', he: 'אוי לא! איפה הם?', icon: '😮', next: 'find' },
      ],
    },
    {
      id: 'find', place: 'shop', chapter: 2, next: 'parrot',
      narrationHe: 'הגורים מתחבאים בין כל החיות בחנות. מהר, תפסו אותם!',
      lines: [],
      event: {
        kind: 'find', target: '🐶', count: 3,
        decoys: ['🐱', '🐰', '🐟', '🐹', '🐢', '🦴', '🧶'],
        promptHe: 'מצאו את 3 הגורים שברחו!',
        doneLine: { text: 'You found them all! Thank you so much!', he: 'מצאתם את כולם! תודה רבה רבה!' },
      },
    },
    {
      id: 'parrot', place: 'shop', chapter: 3,
      narrationHe: 'על מוט עץ יושב תוכי ירוק ומסתכל עליכם. פני צוחקת: הוא חוזר על כל מה שאומרים!',
      props: [{ e: '🦜', x: 50, y: 38, s: 48 }],
      lines: [{ text: 'This is Kiki. Kiki repeats words. Say hello!', he: 'זה קיקי. קיקי חוזר על מילים. תגידו שלום!' }],
      choices: [
        { say: 'Hello, Kiki!', he: 'שלום, קיקי!', icon: '👋', reply: { text: 'Kiki says: Hello, Kiki! Hello, Kiki!', he: 'קיקי אומר: שלום, קיקי! שלום, קיקי!' }, next: 'pet' },
        { say: 'Kiki, you are my friend!', he: 'קיקי, אתה החבר שלי!', icon: '💚', reply: { text: 'Kiki says: My friend! My friend!', he: 'קיקי אומר: החבר שלי! החבר שלי!' }, set: { kiki: 'friend' }, next: 'pet' },
        { say: 'Moo!', he: 'מוווו!', icon: '🐄', silly: { text: 'Moo? Kiki is a parrot, not a cow! Try again.', he: 'מוו? קיקי הוא תוכי, לא פרה! נסו שוב.' } },
      ],
    },
    {
      id: 'pet', place: 'shop', chapter: 4,
      narrationHe: 'עכשיו הכי כיף — בוחרים חיית מחמד! כל החיות מסתכלות עליכם בעיניים גדולות.',
      lines: [ASK_PET],
      showChoices: 3,
      choices: [
        { say: 'A puppy, please.', he: 'גור כלבים, בבקשה.', icon: '🐶', set: { pet: 'puppy' }, next: 'colour' },
        { say: 'A kitten, please.', he: 'גור חתולים, בבקשה.', icon: '🐱', set: { pet: 'kitten' }, next: 'colour' },
        { say: 'A rabbit, please.', he: 'ארנב, בבקשה.', icon: '🐰', set: { pet: 'rabbit' }, next: 'colour' },
        { say: 'A fish, please.', he: 'דג, בבקשה.', icon: '🐟', set: { pet: 'fish' }, next: 'colour' },
        { say: 'An elephant, please.', he: 'פיל, בבקשה.', icon: '🐘', silly: { text: "An elephant? It's too big! Try again.", he: 'פיל? הוא גדול מדי! נסו שוב.' } },
      ],
    },
    {
      id: 'colour', place: 'shop', chapter: 4,
      narrationHe: 'יש כאלה בכל מיני צבעים. איזה הכי מוצא חן בעיניכם?',
      lines: [ASK_COLOUR],
      choices: [
        { say: 'Brown, please.', he: 'חום, בבקשה.', icon: '🟤', next: 'name' },
        { say: 'Black, please.', he: 'שחור, בבקשה.', icon: '⚫', next: 'name' },
        { say: 'White, please.', he: 'לבן, בבקשה.', icon: '⚪', next: 'name' },
        { say: 'Purple, please.', he: 'סגול, בבקשה.', icon: '🟣', silly: { text: 'Purple? I have no purple pets! Try again.', he: 'סגול? אין לי חיות סגולות! נסו שוב.' } },
      ],
    },
    {
      id: 'name', place: 'shop', chapter: 5,
      narrationHe: 'החיה החדשה מתכרבלת בידיים שלכם. היא צריכה שם!',
      lines: [ASK_NAME],
      choices: [
        { say: 'Its name is Coco.', he: 'קוראים לו קוקו.', icon: '🥥', next: 'extra' },
        { say: 'Its name is Max.', he: 'קוראים לו מקס.', icon: '⭐', next: 'extra' },
        { say: 'Its name is Bubbles.', he: 'קוראים לו באבלס (בועות).', icon: '🫧', next: 'extra' },
        { say: 'Its name is Table.', he: 'קוראים לו שולחן.', icon: '🪑', silly: { text: "Table? That's a funny name! Try again.", he: 'שולחן? זה שם מצחיק! נסו שוב.' } },
      ],
    },
    {
      id: 'extra', place: 'shop', chapter: 5,
      narrationHe: 'פני מצביעה על המדף: מיטות רכות וצעצועים מצפצפים.',
      lines: [ASK_EXTRA],
      choices: [
        { say: 'A bed, please.', he: 'מיטה, בבקשה.', icon: '🛏️', next: 'feed' },
        { say: 'A toy, please.', he: 'צעצוע, בבקשה.', icon: '🧸', next: 'feed' },
        { say: 'No, thank you.', he: 'לא, תודה.', icon: '🚫', next: 'feed' },
        { say: 'A bike, please.', he: 'אופניים, בבקשה.', icon: '🚲', silly: { text: "A bike? Pets can't ride bikes! Try again.", he: 'אופניים? חיות לא רוכבות על אופניים! נסו שוב.' } },
      ],
    },
    {
      id: 'feed', place: 'backroom', chapter: 6,
      narrationHe: 'דינג-דונג! השעון מצלצל. כל החיות בחנות רעבות ומסתכלות על פני.',
      lines: [{ text: "It's dinner time! Can you help me feed the animals?", he: 'הגיע זמן ארוחת ערב! תוכלו לעזור לי להאכיל את החיות?' }],
      choices: [
        { ...HELP_YES, icon: '🥣', next: 'end-feed' },
        { say: 'No, thank you. I want to go home.', he: 'לא, תודה. אני רוצה ללכת הביתה.', icon: '🏠', next: 'end-friend', nextIf: [{ key: 'kiki', value: 'friend', next: 'end-parrot' }] },
        { say: 'Can I eat the carrots?', he: 'אפשר לאכול את הגזרים?', icon: '🥕', silly: { text: 'The carrots? They are for the rabbits! Try again.', he: 'הגזרים? הם בשביל הארנבים! נסו שוב.' } },
      ],
    },
    {
      id: 'end-feed', place: 'backroom', chapter: 7, ending: 'feed',
      narrationHe: 'עצם לגורים, דג לחתולים, גזר לארנבים — כולם אוכלים ומקשקשים בזנב!',
      props: [{ e: '🐶', x: 30, y: 45, s: 34 }, { e: '🐰', x: 55, y: 48, s: 32 }, { e: '🐱', x: 75, y: 45, s: 32 }],
      lines: [{ text: 'Bones for the puppies, carrots for the rabbits!', he: 'עצמות לגורים, גזרים לארנבים!' }, HERE_PET],
      choices: [GOODBYE, WOOF],
    },
    {
      id: 'end-friend', place: 'shop', chapter: 7, ending: 'friend',
      narrationHe: 'החיה החדשה שלכם מלקקת לכם את האף. נראה שמצאתם חבר!',
      lines: [HERE_PET],
      choices: [GOODBYE, WOOF],
    },
    {
      id: 'end-parrot', place: 'outside', chapter: 7, ending: 'parrot',
      narrationHe: 'אתם יוצאים מהחנות… ופתאום משהו ירוק עף אחריכם. זה קיקי!',
      props: [{ e: '🦜', x: 60, y: 30, s: 44 }],
      lines: [{ text: 'Look! Kiki wants to go home with you!', he: 'תראו! קיקי רוצה ללכת איתכם הביתה!' }],
      choices: [{ say: 'Wow! Thank you, Penny!', he: 'וואו! תודה, פני!', icon: '🥳' }],
    },
  ],
  endings: [
    { id: 'friend', emoji: '🐶', title: 'A New Best Friend', titleHe: 'חבר חדש וטוב', descHe: 'בחרתם חיית מחמד, נתתם לה שם ולקחתם אותה הביתה.', place: 'park', props: [{ e: '💛', x: 50, y: 30, s: 36 }] },
    { id: 'parrot', emoji: '🦜', title: 'The Parrot Comes Home', titleHe: 'התוכי בא הביתה', descHe: 'התיידדתם עם קיקי — והוא עף אחריכם הביתה!', place: 'park', props: [{ e: '🦜', x: 55, y: 30, s: 42 }] },
    { id: 'feed', emoji: '🥣', title: 'Feeding Time', titleHe: 'מאכילים את החיות', descHe: 'עזרתם לפני להאכיל את כל החיות בחנות.', place: 'backroom' },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
