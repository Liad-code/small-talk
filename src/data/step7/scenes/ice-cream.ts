import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — "Lulu's Ice Cream". The child orders an ice cream from Lulu:
 * flavour, cone or cup, scoops, sprinkles, paying. Role swap: the child is
 * Lulu and makes the customer's ice cream. Story: "The Melting Ice Cream".
 */

const ASK_GREET = "Hi! Welcome to Lulu's Ice Cream! What would you like?"
const ASK_FLAVOUR = 'Yummy! Which flavours would you like? You can choose up to 3 flavours.'
const ASK_HOLDER = 'Would you like a cone or a cup?'
const ASK_SCOOPS = 'How many scoops of each flavour?'
const ASK_SPRINKLES = 'Would you like sprinkles on top?'
const ASK_PAY = "Here you are! That's ten shekels, please."
const ASK_BYE = 'Thank you! Enjoy your ice cream!'

const SAY_ICE = 'I would like an ice cream, please.'
const SAY_CONE = 'A cone, please.'
const SAY_CUP = 'A cup, please.'
const SAY_ONE = 'One scoop of each, please.'
const SAY_TWO = 'Two scoops of each, please.'
const SAY_YES = 'Yes, please!'
const SAY_NO = 'No, thank you.'
const SAY_PAY = 'Here is the money.'
const SAY_BYE = 'Thank you! Goodbye!'

const SILLY_GREET = { say: 'I would like a snowman, please.', reaction: 'A snowman? Brrr! This is an ice-cream shop! Try again.' }
const SILLY_HOLDER = { say: 'A shoe, please.', reaction: 'Ice cream in a shoe? Ha ha! Try again.' }
const SILLY_SCOOPS = { say: 'One hundred scoops, please!', reaction: "One hundred? That's a mountain! Try again." }
const SILLY_SPRINKLES = { say: 'Yes, ketchup, please!', reaction: 'Ketchup on ice cream? Yuck! Try again.' }
const SILLY_PAY = { say: 'Can I pay with a smile?', reaction: 'A smile is nice, but I need money! Try again.' }
const SILLY_BYE = { say: 'Good night!', reaction: 'Good night? The sun is shining! Try again.' }

const FLAVOURS = [
  { v: 'chocolate', icon: '🍫', he: 'שוקולד' },
  { v: 'vanilla', icon: '🤍', he: 'וניל' },
  { v: 'strawberry', icon: '🍓', he: 'תות' },
  { v: 'lemon', icon: '🍋', he: 'לימון' },
  { v: 'mint', icon: '🌿', he: 'מנטה' },
  { v: 'pistachio', icon: '🥜', he: 'פיסטוק' },
  { v: 'coffee', icon: '☕', he: 'קפה' },
  { v: 'salted caramel', icon: '🍮', he: 'קרמל מלוח' },
  { v: 'passion fruit', icon: '🌺', he: 'פסיפלורה' },
]
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)
/** The flavours as "pick several" items (Order / Build / role swap and the story). */
const FLAVOUR_ITEMS = FLAVOURS.map(f => ({ say: cap(f.v), he: f.he, icon: f.icon, value: f.v }))

const he = {
  greet: 'שלום! ברוכים הבאים לגלידה של לולו! מה תרצו?',
  flavour: 'יאמי! אילו טעמים תרצו? אפשר לבחור עד 3 טעמים.',
  holder: 'תרצו גביע או כוס?',
  scoops: 'כמה כדורים מכל טעם?',
  sprinkles: 'תרצו סוכריות צבעוניות למעלה?',
  pay: 'בבקשה! זה עשרה שקלים, בבקשה.',
  bye: 'תודה! בתיאבון!',
}

const SCENE: Scene = {
  id: 'ice-cream',
  title: "Lulu's Ice Cream",
  titleHe: 'בגלידרייה',
  emoji: '🍦',
  character: { speaker: 'lulu', name: 'Lulu', nameHe: 'לולו', emoji: '👩‍🍳' },
  result: 'items',
  ui: {
    gradient: 'from-pink-400 to-rose-500',
    cardEn: 'Order an ice cream — then be Lulu!',
    cardHe: 'מזמינים גלידה — ואז הופכים ללולו הגלידאית!',
    subtitleHe: 'בגלידרייה — מזמינים גלידה באנגלית',
    sign: "🍦 Lulu's Ice Cream",
    stagePlace: 'shop',
    introHe: {
      order: 'לולו שואלת — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם לולו הגלידאית — שאלו את הלקוח, זכרו מה הזמין והכינו לו את הגלידה.',
    },
    startEn: "Let's go!", startHe: 'נכנסים לגלידרייה',
    swapTab: '👩‍🍳 Be Lulu',
    swapStartEn: 'Open the shop!', swapStartHe: 'פותחים את הגלידרייה',
    swapAskHe: 'מה לולו אומרת עכשיו?',
    swapSayHe: 'אמרו את המשפט של לולו בקול!',
    makeTitleHe: 'הכינו ללקוח בדיוק את הגלידה שהזמין:',
    serveEn: 'Here you go!', serveHe: 'הגישו ללקוח',
    doneEn: 'Your ice cream is ready!', doneHe: 'הזמנתם גלידה באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Lulu!', swapDoneHe: 'הייתם לולו ושירתתם את הלקוח באנגלית!',
    customerName: 'Customer',
    learnHe: 'אלה המשפטים של השיחה בגלידרייה. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו להזמין לבד!',
  },
  places: {
    shop: {
      bg: 'linear-gradient(#fdf2f8, #fce7f3)',
      floor: { bg: 'repeating-conic-gradient(#f9a8d4 0% 25%, #fdf2f8 0% 50%) 0 0 / 28px 28px', h: 22, border: '#f472b6' },
      decor: [
        { e: '🍦', x: 8, y: 28, s: 36, anim: 'float' },
        { e: '🍨', x: 80, y: 30, s: 34 },
        { e: '🍓', x: 30, y: 40, s: 24 },
        { e: '🍫', x: 62, y: 42, s: 24 },
        { e: '☁️', x: 60, y: 6, s: 30, anim: 'cloud' },
      ],
      sign: "🍦 Lulu's Ice Cream",
      counter: { bg: '#f472b6', border: '#db2777', item: '🍨' },
    },
    outside: {
      bg: 'linear-gradient(#7dd3fc, #fef9c3)',
      floor: { bg: 'linear-gradient(#e7e5e4, #d6d3d1)', h: 22, border: '#a8a29e' },
      decor: [
        { e: '☀️', x: 78, y: 4, s: 52, anim: 'glow' },
        { e: '🏪', x: 8, y: 26, s: 70 },
        { e: '🌴', x: 60, y: 28, s: 58 },
        { e: '💦', x: 44, y: 40, s: 22, anim: 'float' },
      ],
      sign: "🍦 Lulu's Ice Cream",
    },
    beach: {
      bg: 'linear-gradient(#38bdf8 0%, #7dd3fc 55%, #0ea5e9 56%, #0284c7 70%)',
      floor: { bg: 'linear-gradient(#fde68a, #fcd34d)', h: 30, border: '#f59e0b' },
      decor: [
        { e: '☀️', x: 80, y: 4, s: 44, anim: 'glow' },
        { e: '⛱️', x: 12, y: 30, s: 60 },
        { e: '⛵', x: 56, y: 36, s: 32, anim: 'float' },
        { e: '🐚', x: 40, y: 54, s: 20 },
      ],
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_GREET,
      hintHe: 'אמרו ללולו שאתם רוצים גלידה. I would like… = הייתי רוצה…',
      swapHintHe: 'אתם לולו! קבלו את הלקוח בברכה ושאלו מה הוא רוצה.',
      options: [
        { say: SAY_ICE, correct: true },
        { say: SILLY_GREET.say, correct: false, reaction: SILLY_GREET.reaction },
      ],
      distractorWord: 'snowman',
      swapSilly: { say: 'Would you like a hot soup?', reaction: 'Hot soup? No! I want ice cream!' },
    },
    {
      id: 'flavour',
      ask: ASK_FLAVOUR,
      hintHe: 'בחרו עד 3 טעמים: chocolate = שוקולד, vanilla = וניל, strawberry = תות, pistachio = פיסטוק, coffee = קפה…',
      swapHintHe: 'שאלו את הלקוח אילו טעמים הוא רוצה (עד 3).',
      options: [],
      multi: { slot: 'flavour', max: 3, promptHe: 'בחרו עד 3 טעמים', closer: 'please.', options: FLAVOUR_ITEMS },
      distractorWord: 'onion',
      swapSilly: { say: 'Do you want fish ice cream?', reaction: 'Fish ice cream? Yuck! No way!' },
    },
    {
      id: 'holder',
      ask: ASK_HOLDER,
      hintHe: 'במה לשים את הגלידה? cone = גביע, cup = כוס',
      swapHintHe: 'שאלו את הלקוח אם הוא רוצה גביע או כוס.',
      options: [
        { say: SAY_CONE, correct: true, pick: { slot: 'holder', value: 'cone' }, icon: '🍦', label: 'cone' },
        { say: SAY_CUP, correct: true, pick: { slot: 'holder', value: 'cup' }, icon: '🍨', label: 'cup' },
        { say: SILLY_HOLDER.say, correct: false, reaction: SILLY_HOLDER.reaction },
      ],
      distractorWord: 'shoe',
      swapSilly: { say: 'Do you want it in your hat?', reaction: 'In my hat? No! My head will be cold!' },
    },
    {
      id: 'scoops',
      ask: ASK_SCOOPS,
      hintHe: 'כמה כדורים מכל טעם? one = אחד, two = שניים. scoop = כדור גלידה, of each = מכל אחד',
      swapHintHe: 'שאלו את הלקוח כמה כדורים הוא רוצה מכל טעם.',
      options: [
        { say: SAY_ONE, correct: true, pick: { slot: 'scoops', value: '1' }, icon: '1️⃣', label: 'one of each' },
        { say: SAY_TWO, correct: true, pick: { slot: 'scoops', value: '2' }, icon: '2️⃣', label: 'two of each' },
        { say: SILLY_SCOOPS.say, correct: false, reaction: SILLY_SCOOPS.reaction },
      ],
      distractorWord: 'hundred',
      swapSilly: { say: 'How many noses do you have?', reaction: 'One nose! Ha ha! I want ice cream!' },
    },
    {
      id: 'sprinkles',
      ask: ASK_SPRINKLES,
      hintHe: 'רוצים סוכריות צבעוניות? sprinkles = סוכריות צבעוניות. Yes, please = כן, בבקשה. No, thank you = לא, תודה',
      swapHintHe: 'שאלו את הלקוח אם הוא רוצה סוכריות צבעוניות למעלה.',
      options: [
        { say: SAY_YES, correct: true, pick: { slot: 'sprinkles', value: 'yes' }, icon: '🌈', label: 'sprinkles' },
        { say: SAY_NO, correct: true, pick: { slot: 'sprinkles', value: 'no' }, icon: '🚫', label: 'no sprinkles' },
        { say: SILLY_SPRINKLES.say, correct: false, reaction: SILLY_SPRINKLES.reaction },
      ],
      distractorWord: 'ketchup',
      swapSilly: { say: 'Do you want sand on top?', reaction: "Sand? No! I'm not at the beach!" },
    },
    {
      id: 'pay',
      ask: ASK_PAY,
      hintHe: 'שלמו ללולו. Here is the money = הנה הכסף',
      swapHintHe: 'הגישו ללקוח את הגלידה ובקשו תשלום.',
      options: [
        { say: SAY_PAY, correct: true },
        { say: SILLY_PAY.say, correct: false, reaction: SILLY_PAY.reaction },
      ],
      distractorWord: 'smile',
      swapSilly: { say: 'Can you pay with a sock?', reaction: 'A sock? I have money!' },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE,
      hintHe: 'הודו ללולו ונפרדו ממנה.',
      swapHintHe: 'הודו ללקוח ואחלו לו בתיאבון.',
      options: [
        { say: SAY_BYE, correct: true },
        { say: SILLY_BYE.say, correct: false, reaction: SILLY_BYE.reaction },
      ],
      distractorWord: 'night',
      swapSilly: { say: 'Go to sleep!', reaction: "Sleep? It's ice-cream time!" },
    },
  ],
  makeAfterStep: 'sprinkles',
  makeSlots: [
    { slot: 'flavour', titleHe: 'אילו טעמים? (בדיוק מה שהלקוח ביקש)', multi: true, choices: FLAVOURS.map(f => ({ value: f.v, icon: f.icon, label: f.v })) },
    { slot: 'holder', titleHe: 'גביע או כוס?', choices: [
      { value: 'cone', icon: '🍦', label: 'cone' },
      { value: 'cup', icon: '🍨', label: 'cup' },
    ] },
    { slot: 'scoops', titleHe: 'כמה כדורים?', choices: [
      { value: '1', icon: '1️⃣', label: 'one of each' },
      { value: '2', icon: '2️⃣', label: 'two of each' },
    ] },
    { slot: 'sprinkles', titleHe: 'סוכריות צבעוניות?', choices: [
      { value: 'yes', icon: '🌈', label: 'sprinkles' },
      { value: 'no', icon: '🚫', label: 'no sprinkles' },
    ] },
  ],
  lines: {
    farewell: 'Bye! Come again soon!',
    makeRight: "Yes! That's my ice cream!",
    makeWrong: "No, that's not my order! Try again.",
  },
  phrases: [
    { speaker: 'lulu', en: ASK_GREET, he: he.greet },
    { speaker: 'kid', en: SAY_ICE, he: 'הייתי רוצה גלידה, בבקשה.' },
    { speaker: 'lulu', en: ASK_FLAVOUR, he: he.flavour },
    { speaker: 'kid', en: 'Chocolate, strawberry and pistachio, please.', he: 'שוקולד, תות ופיסטוק, בבקשה.' },
    { speaker: 'lulu', en: ASK_HOLDER, he: he.holder },
    { speaker: 'kid', en: SAY_CONE, he: 'גביע, בבקשה.' },
    { speaker: 'lulu', en: ASK_SCOOPS, he: he.scoops },
    { speaker: 'kid', en: SAY_ONE, he: 'כדור אחד מכל טעם, בבקשה.' },
    { speaker: 'lulu', en: ASK_SPRINKLES, he: he.sprinkles },
    { speaker: 'kid', en: SAY_YES, he: 'כן, בבקשה!' },
    { speaker: 'lulu', en: ASK_PAY, he: he.pay },
    { speaker: 'kid', en: SAY_PAY, he: 'הנה הכסף.' },
    { speaker: 'lulu', en: ASK_BYE, he: he.bye },
    { speaker: 'kid', en: SAY_BYE, he: 'תודה! להתראות!' },
  ],
}

// ── Story ────────────────────────────────────────────────────────────────

const L = (text: string, heText: string): StoryLine => ({ text, he: heText })

const BYE: StoryChoice = { say: SAY_BYE, he: 'תודה! להתראות!', icon: '👋' }
const COME_IN = L("Hello! Come in, it's nice and cool inside!", 'שלום! היכנסו, בפנים נעים וקריר!')

const STORY: Story = {
  id: 'ice-cream-story',
  title: 'The Melting Ice Cream',
  titleHe: 'הגלידה שנמסה',
  start: 'door',
  coverPlace: 'outside',
  introHe: [
    '🗨️ לולו מדברת — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '☀️', he: 'יום חם' },
    { icon: '👋', he: 'שלום' },
    { icon: '🍓', he: 'טעמים' },
    { icon: '🍦', he: 'גביע או כוס' },
    { icon: '🔢', he: 'כדורים' },
    { icon: '🌈', he: 'סוכריות' },
    { icon: '💰', he: 'תשלום' },
    { icon: '💦', he: 'נמס!' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'door', place: 'outside', chapter: 0, noCharacter: true,
      narrationHe: 'איזה יום חם! השמש קופחת ואתם מזיעים. ממול — הגלידרייה הוורודה של לולו.',
      lines: [],
      choices: [
        { say: 'Hello! Is anybody here?', he: 'שלום! יש פה מישהו?', icon: '🗣️', reply: COME_IN, next: 'greet' },
        { say: "It's so hot today!", he: 'כל כך חם היום!', icon: '🥵', reply: COME_IN, next: 'greet' },
      ],
    },
    {
      id: 'greet', place: 'shop', chapter: 1,
      narrationHe: 'בפנים קריר ומתוק. לולו מנופפת לכם מאחורי דלפק מלא בגלידות צבעוניות.',
      lines: [L(ASK_GREET, he.greet)],
      choices: [
        { say: SAY_ICE, he: 'הייתי רוצה גלידה, בבקשה.', icon: '🍦', next: 'flavour' },
      ],
    },
    {
      id: 'flavour', place: 'shop', chapter: 2,
      narrationHe: 'לולו פותחת את המקרר. יש פה כל כך הרבה טעמים — פיסטוק, קפה, קרמל מלוח ועוד! אילו תבחרו?',
      lines: [
        L('Yummy! Which flavours would you like?', 'יאמי! אילו טעמים תרצו?'),
        L('You can choose up to 3 flavours.', 'אפשר לבחור עד 3 טעמים.'),
      ],
      pick: {
        key: 'flavour', max: 3, promptHe: 'בחרו עד 3 טעמים', closer: 'please.',
        options: FLAVOUR_ITEMS,
        reply: L('Yum! Great choice!', 'יאמי! בחירה מצוינת!'),
        next: 'holder',
      },
    },
    {
      id: 'holder', place: 'shop', chapter: 3,
      narrationHe: 'לולו מחזיקה כף גלידה גדולה ביד. עכשיו צריך להחליט — במה?',
      lines: [L(ASK_HOLDER, he.holder)],
      choices: [
        { say: SAY_CONE, he: 'גביע, בבקשה.', icon: '🍦', set: { holder: 'cone' }, next: 'scoops' },
        { say: SAY_CUP, he: 'כוס, בבקשה.', icon: '🍨', set: { holder: 'cup' }, next: 'scoops' },
      ],
    },
    {
      id: 'scoops', place: 'shop', chapter: 4,
      narrationHe: 'לולו מוכנה עם הכף. כמה כדורים מכל טעם? ואולי… הרבה יותר?',
      lines: [L(ASK_SCOOPS, he.scoops)],
      choices: [
        { say: SAY_ONE, he: 'כדור אחד מכל טעם, בבקשה.', icon: '1️⃣', next: 'sprinkles' },
        { say: SAY_TWO, he: 'שני כדורים מכל טעם, בבקשה.', icon: '2️⃣', next: 'sprinkles' },
        {
          say: 'Ten scoops, please!', he: 'עשרה כדורים, בבקשה!', icon: '🗼',
          reply: L('Ten scoops? Wow! An ice-cream tower!', 'עשרה כדורים? וואו! מגדל גלידה!'),
          set: { tower: 'yes' }, next: 'sprinkles',
        },
      ],
    },
    {
      id: 'sprinkles', place: 'shop', chapter: 5,
      narrationHe: 'לולו מחזיקה צנצנת מלאה בסוכריות בכל צבעי הקשת.',
      lines: [L(ASK_SPRINKLES, he.sprinkles)],
      choices: [
        { say: SAY_YES, he: 'כן, בבקשה!', icon: '🌈', reply: L('Shake, shake, shake! So colourful!', 'שייק, שייק, שייק! כל כך צבעוני!'), next: 'pay' },
        { say: SAY_NO, he: 'לא, תודה.', icon: '🚫', next: 'pay' },
      ],
    },
    {
      id: 'pay', place: 'shop', chapter: 6,
      narrationHe: 'הגלידה שלכם מוכנה — צבעונית, קרה ומתוקה. נראית מדהים!',
      lines: [L(ASK_PAY, he.pay)],
      props: [{ e: '🍦', x: 46, y: 46, s: 40 }],
      choices: [
        { say: SAY_PAY, he: 'הנה הכסף.', icon: '💰', next: 'outside', nextIf: [{ key: 'tower', value: 'yes', next: 'end-tower' }] },
      ],
    },
    {
      id: 'outside', place: 'outside', chapter: 7,
      narrationHe: 'יצאתם החוצה — והשמש לוהטת! הגלידה מתחילה לנזול… ופתאום כלבלב מתיישב מולכם ומלקק את השפתיים.',
      lines: [L('Oh no! Your ice cream is melting! Quick!', 'אוי לא! הגלידה שלכם נמסה! מהר!')],
      props: [{ e: '🐕', x: 48, y: 66, s: 36 }, { e: '💧', x: 30, y: 50, s: 20 }],
      choices: [
        { say: 'Here, doggy! You can have a lick!', he: 'הנה, כלבלב! אתה יכול ללקק!', icon: '🐶', next: 'end-dog' },
        { say: "Let's eat it fast!", he: 'בואו נאכל אותה מהר!', icon: '😋', next: 'end-freeze' },
        { say: "Let's go to the beach!", he: 'בואו נלך לים!', icon: '🏖️', next: 'end-beach' },
      ],
    },
    {
      id: 'end-dog', place: 'outside', chapter: 8, ending: 'dog',
      narrationHe: 'הכלבלב מלקק — ומכשכש בזנב בטירוף! לולו יוצאת מהחנות וצוחקת.',
      lines: [L('Ha ha! The dog loves ice cream too!', 'חה חה! גם הכלב אוהב גלידה!')],
      props: [{ e: '🐕', x: 48, y: 66, s: 36 }],
      choices: [BYE],
    },
    {
      id: 'end-freeze', place: 'outside', chapter: 8, ending: 'freeze',
      narrationHe: 'אכלתם הכול בשלוש שניות… ואז — ברררר! כאב ראש של קור!',
      lines: [L('Slowly, slowly! Ha ha! Brain freeze!', 'לאט, לאט! חה חה! כאב ראש מקור!')],
      choices: [{ say: 'Brrr! My head is cold!', he: 'ברררר! הראש שלי קפוא!', icon: '🥶' }],
    },
    {
      id: 'end-beach', place: 'outside', chapter: 8, ending: 'beach',
      narrationHe: 'אתם רצים לים, מתיישבים בצל השמשייה ומסיימים את הגלידה עם רגליים במים.',
      lines: [L('Good idea! Have a great beach picnic!', 'רעיון טוב! פיקניק מהנה בים!')],
      choices: [BYE],
    },
    {
      id: 'end-tower', place: 'shop', chapter: 8, ending: 'tower',
      narrationHe: 'לולו בונה ובונה… עשרה כדורים, אחד על השני, עד התקרה!',
      lines: [L('The biggest ice cream in the world!', 'הגלידה הכי גדולה בעולם!')],
      props: [{ e: '🍨', x: 46, y: 30, s: 30 }, { e: '🍨', x: 46, y: 42, s: 30 }, { e: '🍦', x: 46, y: 56, s: 36 }],
      choices: [{ say: 'Wow! Thank you, Lulu!', he: 'וואו! תודה, לולו!', icon: '🤩' }],
    },
  ],
  endings: [
    { id: 'dog', emoji: '🐶', title: 'Ice Cream for the Dog', titleHe: 'גלידה לכלבלב', descHe: 'נתתם לכלבלב ללקק — והוא נהיה החבר הכי טוב שלכם.', place: 'outside', props: [{ e: '🐕', x: 48, y: 66, s: 36 }] },
    { id: 'beach', emoji: '🏖️', title: 'Beach Picnic', titleHe: 'פיקניק בים', descHe: 'אכלתם את הגלידה בצל השמשייה, על חוף הים.', place: 'beach', withCharacter: false, props: [{ e: '🍦', x: 44, y: 56, s: 36 }] },
    { id: 'freeze', emoji: '🥶', title: 'Brain Freeze', titleHe: 'קפוא במוח', descHe: 'אכלתם מהר מדי — וקיבלתם כאב ראש של קור!', place: 'outside' },
    { id: 'tower', emoji: '🗼', title: 'Ice-Cream Tower', titleHe: 'מגדל גלידה', descHe: 'הזמנתם עשרה כדורים — הגלידה הכי גבוהה בעולם!', place: 'shop', props: [{ e: '🍨', x: 46, y: 30, s: 30 }, { e: '🍦', x: 46, y: 50, s: 36 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
