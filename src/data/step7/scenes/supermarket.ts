import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — "The Supermarket". The child shops with Mr. Brown's help: what they
 * need, how many, anything else, a bag, paying. Role swap: the child is
 * Mr. Brown and packs exactly the customer's shopping. Story: "Mum's Shopping List".
 */

const ASK_GREET = 'Hello! Can I help you?'
const ASK_ITEM = 'What do you need?'
const ASK_AMOUNT = 'How many do you need?'
const ASK_EXTRA = 'Anything else?'
const ASK_BAG = 'Do you need a bag?'
const ASK_PAY = "That's twenty shekels, please."
const ASK_BYE = 'Thank you! Have a nice day!'

const SAY_GREET = "Yes, please. I'm shopping for my mum."
const SAY_SIX = 'Six, please.'
const SAY_TWO = 'Two, please.'
const SAY_JUICE = 'Yes, juice, please.'
const SAY_NO = 'No, thank you.'
const SAY_YES = 'Yes, please.'
const SAY_PAY = 'Here you are.'
const SAY_BYE = 'Thank you! You too! Goodbye!'

const SILLY_GREET = { say: 'Yes, I need a dinosaur.', reaction: "A dinosaur? We don't sell dinosaurs! Try again." }
const SILLY_ITEM = { say: 'I need a rocket, please.', reaction: 'A rocket? This is a supermarket! Try again.' }
const SILLY_AMOUNT = { say: 'A million, please!', reaction: "A million? That's too many! Try again." }
const SILLY_EXTRA = { say: 'Yes, a cloud, please.', reaction: "A cloud? I can't sell clouds! Try again." }
const SILLY_BAG = { say: 'Yes, a sleeping bag, please.', reaction: 'A sleeping bag? Ha ha! Try again.' }
const SILLY_PAY = { say: 'Can I pay with candy?', reaction: 'Candy? No, I need money! Try again.' }
const SILLY_BYE = { say: 'Happy birthday!', reaction: "Happy birthday? It's not my birthday! Try again." }

const ITEMS = [
  { v: 'milk', icon: '🥛', he: 'חלב' },
  { v: 'bread', icon: '🍞', he: 'לחם' },
  { v: 'eggs', icon: '🥚', he: 'ביצים' },
  { v: 'apples', icon: '🍎', he: 'תפוחים' },
  { v: 'bananas', icon: '🍌', he: 'בננות' },
]

const he = {
  greet: 'שלום! אפשר לעזור לכם?',
  item: 'מה אתם צריכים?',
  amount: 'כמה אתם צריכים?',
  extra: 'עוד משהו?',
  bag: 'אתם צריכים שקית?',
  pay: 'זה עשרים שקלים, בבקשה.',
  bye: 'תודה! שיהיה לכם יום נעים!',
}

const SCENE: Scene = {
  id: 'supermarket',
  title: 'The Supermarket',
  titleHe: 'בסופרמרקט',
  emoji: '🛒',
  character: { speaker: 'mrbrown', name: 'Mr. Brown', nameHe: 'מר בראון', emoji: '👨‍💼' },
  result: 'items',
  ui: {
    gradient: 'from-sky-500 to-indigo-600',
    cardEn: 'Go shopping — then be the cashier!',
    cardHe: 'עושים קניות — ואז הופכים למר בראון הקופאי!',
    subtitleHe: 'בסופרמרקט — קונים באנגלית',
    sign: '🛒 Brown\'s Supermarket',
    stagePlace: 'checkout',
    introHe: {
      order: 'מר בראון שואל — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם צריכים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם מר בראון — שאלו את הלקוח, זכרו מה הוא צריך וארזו לו בדיוק את הקניות.',
    },
    startEn: "Let's go!", startHe: 'נכנסים לסופרמרקט',
    swapTab: '👨‍💼 Be Mr. Brown',
    swapStartEn: 'Open the checkout!', swapStartHe: 'פותחים את הקופה',
    swapAskHe: 'מה מר בראון אומר עכשיו?',
    swapSayHe: 'אמרו את המשפט של מר בראון בקול!',
    makeTitleHe: 'ארזו ללקוח בדיוק את מה שביקש:',
    serveEn: 'Here is your shopping!', serveHe: 'תנו ללקוח את הקניות',
    doneEn: 'Your shopping is done!', doneHe: 'עשיתם קניות באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Mr. Brown!', swapDoneHe: 'הייתם מר בראון ועזרתם ללקוח באנגלית!',
    customerName: 'Customer',
    learnHe: 'אלה המשפטים של השיחה בסופרמרקט. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לקנות לבד!',
  },
  places: {
    checkout: {
      bg: 'linear-gradient(#e0f2fe, #f0f9ff)',
      floor: { bg: 'repeating-conic-gradient(#bfdbfe 0% 25%, #f8fafc 0% 50%) 0 0 / 30px 30px', h: 22, border: '#3b82f6' },
      decor: [
        { e: '🛒', x: 8, y: 34, s: 44 },
        { e: '🥫', x: 34, y: 30, s: 26 },
        { e: '🧃', x: 44, y: 30, s: 26 },
        { e: '🍪', x: 54, y: 30, s: 26 },
        { e: '💡', x: 72, y: 6, s: 24, anim: 'glow' },
      ],
      sign: '🛒 Brown\'s Supermarket',
      counter: { bg: '#60a5fa', border: '#2563eb', item: '🧾' },
    },
    aisle: {
      bg: 'linear-gradient(#f1f5f9, #e2e8f0)',
      floor: { bg: 'linear-gradient(#cbd5e1, #94a3b8)', h: 20, border: '#64748b' },
      decor: [
        { e: '🥛', x: 6, y: 28, s: 26 }, { e: '🥛', x: 14, y: 28, s: 26 },
        { e: '🍞', x: 6, y: 42, s: 26 }, { e: '🧀', x: 14, y: 42, s: 26 },
        { e: '🥚', x: 78, y: 28, s: 26 }, { e: '🥚', x: 86, y: 28, s: 26 },
        { e: '🥫', x: 78, y: 42, s: 26 }, { e: '🧃', x: 86, y: 42, s: 26 },
        { e: '💡', x: 46, y: 4, s: 24, anim: 'glow' },
      ],
      sign: '🥛 Milk · Eggs · Bread',
    },
    fruit: {
      bg: 'linear-gradient(#ecfdf5, #d1fae5)',
      floor: { bg: 'linear-gradient(#a7f3d0, #6ee7b7)', h: 20, border: '#10b981' },
      decor: [
        { e: '🍌', x: 8, y: 32, s: 30 }, { e: '🍊', x: 20, y: 34, s: 28 },
        { e: '🍇', x: 70, y: 32, s: 30 }, { e: '🍍', x: 84, y: 30, s: 32 },
        { e: '🍐', x: 40, y: 44, s: 24 }, { e: '🍋', x: 54, y: 44, s: 24 },
      ],
      sign: '🍎 Fruit',
    },
    home: {
      bg: 'linear-gradient(#fef3c7, #fde68a)',
      floor: { bg: 'repeating-linear-gradient(90deg, #d97706 0 40px, #b45309 40px 42px)', h: 22, border: '#92400e' },
      decor: [
        { e: '🪟', x: 12, y: 18, s: 48 },
        { e: '🖼️', x: 70, y: 20, s: 34 },
        { e: '🪴', x: 84, y: 44, s: 30 },
        { e: '🏠', x: 44, y: 6, s: 24 },
      ],
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_GREET,
      hintHe: 'אמרו למר בראון שאתם קונים בשביל אמא. I\'m shopping for… = אני קונה בשביל…',
      swapHintHe: 'אתם מר בראון! ברכו את הלקוח ושאלו אם אפשר לעזור.',
      options: [
        { say: SAY_GREET, correct: true },
        { say: SILLY_GREET.say, correct: false, reaction: SILLY_GREET.reaction },
      ],
      distractorWord: 'dinosaur',
      swapSilly: { say: 'Can I help you fly?', reaction: "Fly? I'm not a bird!" },
    },
    {
      id: 'item',
      ask: ASK_ITEM,
      hintHe: 'מה אתם צריכים? milk = חלב, bread = לחם, eggs = ביצים, apples = תפוחים, bananas = בננות',
      swapHintHe: 'שאלו את הלקוח מה הוא צריך.',
      showCorrect: 3,
      options: [
        ...ITEMS.map(i => ({ say: `I need ${i.v}, please.`, correct: true, pick: { slot: 'item', value: i.v }, icon: i.icon, label: i.v })),
        { say: SILLY_ITEM.say, correct: false, reaction: SILLY_ITEM.reaction },
      ],
      distractorWord: 'rocket',
      swapSilly: { say: 'Do you need a pet tiger?', reaction: 'A tiger? No! I need food!' },
    },
    {
      id: 'amount',
      ask: ASK_AMOUNT,
      hintHe: 'כמה? one = אחד, two = שניים, six = שישה',
      swapHintHe: 'שאלו את הלקוח כמה הוא צריך.',
      options: [
        { say: 'One, please.', correct: true, pick: { slot: 'amount', value: '1' }, icon: '1️⃣', label: 'one' },
        { say: SAY_TWO, correct: true, pick: { slot: 'amount', value: '2' }, icon: '2️⃣', label: 'two' },
        { say: SAY_SIX, correct: true, pick: { slot: 'amount', value: '6' }, icon: '6️⃣', label: 'six' },
        { say: SILLY_AMOUNT.say, correct: false, reaction: SILLY_AMOUNT.reaction },
      ],
      distractorWord: 'million',
      swapSilly: { say: 'Do you need one hundred?', reaction: 'One hundred? My bag is too small!' },
    },
    {
      id: 'extra',
      ask: ASK_EXTRA,
      hintHe: 'עוד משהו? cheese = גבינה, juice = מיץ, No, thank you = לא, תודה',
      swapHintHe: 'שאלו את הלקוח אם הוא צריך עוד משהו.',
      options: [
        { say: 'Yes, cheese, please.', correct: true, pick: { slot: 'extra', value: 'cheese' }, icon: '🧀', label: 'cheese' },
        { say: SAY_JUICE, correct: true, pick: { slot: 'extra', value: 'juice' }, icon: '🧃', label: 'juice' },
        { say: SAY_NO, correct: true, pick: { slot: 'extra', value: 'none' }, icon: '🚫', label: 'nothing' },
        { say: SILLY_EXTRA.say, correct: false, reaction: SILLY_EXTRA.reaction },
      ],
      distractorWord: 'cloud',
      swapSilly: { say: 'Do you want a bath too?', reaction: 'A bath? In a supermarket? No!' },
    },
    {
      id: 'bag',
      ask: ASK_BAG,
      hintHe: 'צריכים שקית? bag = שקית. Yes, please = כן, בבקשה. No, thank you = לא, תודה',
      swapHintHe: 'שאלו את הלקוח אם הוא צריך שקית.',
      options: [
        { say: SAY_YES, correct: true, pick: { slot: 'bag', value: 'yes' }, icon: '🛍️', label: 'a bag' },
        { say: SAY_NO, correct: true, pick: { slot: 'bag', value: 'no' }, icon: '🚫', label: 'no bag' },
        { say: SILLY_BAG.say, correct: false, reaction: SILLY_BAG.reaction },
      ],
      distractorWord: 'sleeping',
      swapSilly: { say: 'Do you need a bag for your head?', reaction: 'For my head? Ha ha! No!' },
    },
    {
      id: 'pay',
      ask: ASK_PAY,
      hintHe: 'שלמו למר בראון. Here you are = בבקשה (כשנותנים משהו)',
      swapHintHe: 'בקשו מהלקוח לשלם.',
      options: [
        { say: SAY_PAY, correct: true },
        { say: SILLY_PAY.say, correct: false, reaction: SILLY_PAY.reaction },
      ],
      distractorWord: 'candy',
      swapSilly: { say: 'Can you pay with buttons?', reaction: 'Buttons? No! I have money!' },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE,
      hintHe: 'הודו למר בראון ואחלו לו יום נעים גם. You too = גם לך',
      swapHintHe: 'הודו ללקוח ואחלו לו יום נעים.',
      options: [
        { say: SAY_BYE, correct: true },
        { say: SILLY_BYE.say, correct: false, reaction: SILLY_BYE.reaction },
      ],
      distractorWord: 'birthday',
      swapSilly: { say: 'Please sleep in the shop!', reaction: 'Sleep here? No! I want to go home!' },
    },
  ],
  makeAfterStep: 'bag',
  makeSlots: [
    { slot: 'item', titleHe: 'מה הלקוח צריך?', choices: ITEMS.map(i => ({ value: i.v, icon: i.icon, label: i.v })) },
    { slot: 'amount', titleHe: 'כמה?', choices: [
      { value: '1', icon: '1️⃣', label: 'one' },
      { value: '2', icon: '2️⃣', label: 'two' },
      { value: '6', icon: '6️⃣', label: 'six' },
    ] },
    { slot: 'extra', titleHe: 'עוד משהו?', choices: [
      { value: 'cheese', icon: '🧀', label: 'cheese' },
      { value: 'juice', icon: '🧃', label: 'juice' },
      { value: 'none', icon: '🚫', label: 'nothing' },
    ] },
    { slot: 'bag', titleHe: 'שקית?', choices: [
      { value: 'yes', icon: '🛍️', label: 'a bag' },
      { value: 'no', icon: '🚫', label: 'no bag' },
    ] },
  ],
  lines: {
    farewell: 'Goodbye! See you soon!',
    makeRight: "Yes! That's my shopping!",
    makeWrong: "No, that's not my shopping! Try again.",
  },
  phrases: [
    { speaker: 'mrbrown', en: ASK_GREET, he: he.greet },
    { speaker: 'kid', en: SAY_GREET, he: 'כן, בבקשה. אני קונה בשביל אמא שלי.' },
    { speaker: 'mrbrown', en: ASK_ITEM, he: he.item },
    { speaker: 'kid', en: 'I need eggs, please.', he: 'אני צריך/ה ביצים, בבקשה.' },
    { speaker: 'mrbrown', en: ASK_AMOUNT, he: he.amount },
    { speaker: 'kid', en: SAY_SIX, he: 'שש, בבקשה.' },
    { speaker: 'mrbrown', en: ASK_EXTRA, he: he.extra },
    { speaker: 'kid', en: SAY_JUICE, he: 'כן, מיץ, בבקשה.' },
    { speaker: 'mrbrown', en: ASK_BAG, he: he.bag },
    { speaker: 'kid', en: SAY_YES, he: 'כן, בבקשה.' },
    { speaker: 'mrbrown', en: ASK_PAY, he: he.pay },
    { speaker: 'kid', en: SAY_PAY, he: 'בבקשה (הנה הכסף).' },
    { speaker: 'mrbrown', en: ASK_BYE, he: he.bye },
    { speaker: 'kid', en: SAY_BYE, he: 'תודה! גם לך! להתראות!' },
  ],
}

// ── Story ────────────────────────────────────────────────────────────────

const L = (text: string, heText: string): StoryLine => ({ text, he: heText })
const silly = (s: { say: string; reaction: string }, heSay: string, heReaction: string, icon: string): StoryChoice =>
  ({ say: s.say, he: heSay, icon, silly: L(s.reaction, heReaction) })

const BYE: StoryChoice = { say: SAY_BYE, he: 'תודה! גם לך! להתראות!', icon: '👋' }
const BYE_SILLY = silly(SILLY_BYE, 'יום הולדת שמח!', 'יום הולדת שמח? אין לי יום הולדת! נסו שוב.', '🎂')
const LIST = { e: '📝', x: 30, y: 62, s: 30 }

const STORY: Story = {
  id: 'supermarket-story',
  title: "Mum's Shopping List",
  titleHe: 'רשימת הקניות של אמא',
  start: 'enter',
  coverPlace: 'aisle',
  introHe: [
    '🗨️ מר בראון מדבר — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '📝', he: 'הרשימה' },
    { icon: '👋', he: 'שלום' },
    { icon: '🍎', he: 'תפוחים' },
    { icon: '🔍', he: 'מחפשים' },
    { icon: '🥚', he: 'ביצים' },
    { icon: '🛒', he: 'העגלה' },
    { icon: '🧃', he: 'עוד משהו' },
    { icon: '💰', he: 'בקופה' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'enter', place: 'aisle', chapter: 0, noCharacter: true,
      narrationHe: 'אמא נתנה לכם עשרים שקלים ורשימת קניות: תפוחים וביצים. אתם נכנסים עם עגלה לסופרמרקט הענק.',
      lines: [],
      props: [LIST, { e: '🛒', x: 60, y: 66, s: 40 }],
      choices: [
        { say: 'Hello! Excuse me!', he: 'שלום! סליחה!', icon: '🙋', next: 'greet' },
        { say: 'Wow! This shop is so big!', he: 'וואו! החנות הזאת ענקית!', icon: '🤩', next: 'greet' },
      ],
    },
    {
      id: 'greet', place: 'aisle', chapter: 1,
      narrationHe: 'איש נחמד עם תג שם ועניבה מגיע אליכם. על התג כתוב: Mr. Brown.',
      lines: [L(ASK_GREET, he.greet)],
      choices: [
        { say: SAY_GREET, he: 'כן, בבקשה. אני קונה בשביל אמא שלי.', icon: '📝', next: 'need' },
        silly(SILLY_GREET, 'כן, אני צריך/ה דינוזאור.', 'דינוזאור? אנחנו לא מוכרים דינוזאורים! נסו שוב.', '🦖'),
      ],
    },
    {
      id: 'need', place: 'aisle', chapter: 2,
      narrationHe: 'אתם מסתכלים ברשימה של אמא. מה כתוב שם ראשון?',
      lines: [L(ASK_ITEM, he.item)],
      props: [LIST],
      choices: [
        { say: 'I need apples, please.', he: 'אני צריך/ה תפוחים, בבקשה.', icon: '🍎', next: 'apples' },
        { say: 'I need bananas, please.', he: 'אני צריך/ה בננות, בבקשה.', icon: '🍌', silly: L("Bananas? Your list says apples! Try again.", 'בננות? ברשימה כתוב תפוחים! נסו שוב.') },
        silly(SILLY_ITEM, 'אני צריך/ה טיל, בבקשה.', 'טיל? זה סופרמרקט! נסו שוב.', '🚀'),
      ],
    },
    {
      id: 'apples', place: 'fruit', chapter: 3,
      narrationHe: 'הגעתם לדוכן הפירות. יש פה הכול — אבל איפה התפוחים? מצאו 3 תפוחים אדומים!',
      lines: [L('The apples are here. Can you find three?', 'התפוחים כאן. תוכלו למצוא שלושה?')],
      event: {
        kind: 'find', target: '🍎', count: 3,
        decoys: ['🍌', '🍐', '🍊', '🍋', '🍇', '🍓', '🥝', '🍑'],
        promptHe: 'מצאו את 3 התפוחים האדומים!',
        doneLine: L('Three apples! Great job!', 'שלושה תפוחים! עבודה מצוינת!'),
      },
      next: 'eggs',
    },
    {
      id: 'eggs', place: 'aisle', chapter: 4,
      narrationHe: 'הבא ברשימה: ביצים! מר בראון מוריד מהמדף קרטון ביצים.',
      lines: [L(ASK_AMOUNT, he.amount)],
      props: [{ e: '🥚', x: 44, y: 54, s: 30 }],
      choices: [
        { say: SAY_SIX, he: 'שש, בבקשה.', icon: '6️⃣', next: 'cart' },
        { say: SAY_TWO, he: 'שתיים, בבקשה.', icon: '2️⃣', next: 'cart' },
        silly(SILLY_AMOUNT, 'מיליון, בבקשה!', 'מיליון? זה יותר מדי! נסו שוב.', '🤯'),
      ],
    },
    {
      id: 'cart', place: 'aisle', chapter: 5,
      narrationHe: 'אוי! העגלה שלכם מתחילה להתגלגל לבד במעבר — מהר יותר ויותר!',
      lines: [L('Oh no! Your cart is rolling away!', 'אוי לא! העגלה שלכם מתגלגלת!')],
      props: [{ e: '🛒', x: 70, y: 66, s: 42 }, { e: '💨', x: 84, y: 66, s: 26 }],
      choices: [
        { say: 'Stop, cart! Stop!', he: 'עצרי, עגלה! עצרי!', icon: '✋', reply: L('Got it! Here is your cart.', 'תפסתי! הנה העגלה שלכם.'), next: 'extra' },
        {
          say: "Let's have a cart race!", he: 'בוא נעשה מרוץ עגלות!', icon: '🏁',
          reply: L('A cart race? Okay, just one! Ready, go!', 'מרוץ עגלות? טוב, רק אחד! היכון, צא!'),
          set: { race: 'yes' }, next: 'extra',
        },
      ],
    },
    {
      id: 'extra', place: 'checkout', chapter: 6,
      narrationHe: 'הגעתם לקופה. מר בראון סופר את התפוחים והביצים.',
      lines: [L(ASK_EXTRA, he.extra)],
      choices: [
        { say: SAY_JUICE, he: 'כן, מיץ, בבקשה.', icon: '🧃', next: 'bag' },
        { say: SAY_NO, he: 'לא, תודה.', icon: '🚫', next: 'bag' },
        {
          say: 'Yes, a cake for my mum, please!', he: 'כן, עוגה בשביל אמא שלי, בבקשה!', icon: '🎂',
          reply: L('A cake for Mum? What a sweet idea!', 'עוגה לאמא? איזה רעיון מתוק!'),
          set: { cake: 'yes' }, next: 'bag',
        },
        silly(SILLY_EXTRA, 'כן, ענן, בבקשה.', 'ענן? אני לא יכול למכור עננים! נסו שוב.', '☁️'),
      ],
    },
    {
      id: 'bag', place: 'checkout', chapter: 7,
      narrationHe: 'הקופה מצפצפת: ביפ! ביפ! כל הקניות על הדלפק.',
      lines: [L(ASK_BAG, he.bag)],
      choices: [
        { say: SAY_YES, he: 'כן, בבקשה.', icon: '🛍️', next: 'pay' },
        { say: SAY_NO, he: 'לא, תודה.', icon: '🚫', next: 'pay' },
        silly(SILLY_BAG, 'כן, שק שינה, בבקשה.', 'שק שינה? חה חה! נסו שוב.', '🛌'),
      ],
    },
    {
      id: 'pay', place: 'checkout', chapter: 7,
      narrationHe: 'הגיע הזמן לשלם. אתם מכניסים יד לכיס…',
      lines: [L(ASK_PAY, he.pay)],
      choices: [
        {
          say: SAY_PAY, he: 'בבקשה (הנה הכסף).', icon: '💰', next: 'end-home',
          nextIf: [{ key: 'cake', value: 'yes', next: 'end-cake' }, { key: 'race', value: 'yes', next: 'end-race' }],
        },
        { say: 'Oh no! I forgot my money!', he: 'אוי לא! שכחתי את הכסף!', icon: '😱', next: 'end-helper' },
        silly(SILLY_PAY, 'אפשר לשלם בסוכריות?', 'סוכריות? לא, אני צריך כסף! נסו שוב.', '🍬'),
      ],
    },
    {
      id: 'end-home', place: 'checkout', chapter: 8, ending: 'home',
      narrationHe: 'קניתם הכול מהרשימה, בדיוק כמו שאמא ביקשה. היא תהיה כל כך גאה!',
      lines: [L(ASK_BYE, he.bye)],
      choices: [BYE, BYE_SILLY],
    },
    {
      id: 'end-cake', place: 'checkout', chapter: 8, ending: 'cake',
      narrationHe: 'מר בראון עוטף את העוגה בסרט ורוד. אמא הולכת לקבל הפתעה!',
      lines: [L('Here is the cake. Your mum is lucky!', 'הנה העוגה. לאמא שלכם יש מזל!')],
      props: [{ e: '🎂', x: 46, y: 50, s: 40 }],
      choices: [{ say: 'Thank you, Mr. Brown!', he: 'תודה, מר בראון!', icon: '💝' }],
    },
    {
      id: 'end-race', place: 'checkout', chapter: 8, ending: 'race',
      narrationHe: 'מר בראון מוציא מהמגירה מדבקה נוצצת: "אלוף מרוץ העגלות"!',
      lines: [L('You won the cart race! Here is a sticker!', 'ניצחתם במרוץ העגלות! הנה מדבקה!')],
      props: [{ e: '🏅', x: 46, y: 50, s: 40 }],
      choices: [{ say: 'Yay! Thank you, Mr. Brown!', he: 'יש! תודה, מר בראון!', icon: '🏁' }],
    },
    {
      id: 'end-helper', place: 'fruit', chapter: 8, ending: 'helper',
      narrationHe: 'הכיס ריק! מר בראון מחייך ונותן לכם סינר קטן.',
      lines: [L('No problem! You can help me with the apples!', 'אין בעיה! אתם יכולים לעזור לי עם התפוחים!')],
      props: [{ e: '🍎', x: 40, y: 56, s: 26 }, { e: '🍎', x: 48, y: 56, s: 26 }, { e: '🍎', x: 44, y: 48, s: 26 }],
      choices: [{ say: 'Okay! I love apples!', he: 'בסדר! אני אוהב/ת תפוחים!', icon: '🍎' }],
    },
  ],
  endings: [
    { id: 'home', emoji: '📝', title: 'Super Shopper', titleHe: 'קונים מעולים', descHe: 'קניתם בדיוק את מה שהיה ברשימה של אמא.', place: 'home', withCharacter: false, props: [{ e: '🛍️', x: 44, y: 60, s: 40 }] },
    { id: 'cake', emoji: '🎂', title: 'Cake Surprise', titleHe: 'עוגה לאמא', descHe: 'הפתעתם את אמא בעוגה מהסופרמרקט.', place: 'home', withCharacter: false, props: [{ e: '🎂', x: 44, y: 56, s: 44 }] },
    { id: 'race', emoji: '🏁', title: 'Cart Race Champion', titleHe: 'אלופי מרוץ העגלות', descHe: 'ניצחתם את מר בראון במרוץ עגלות וקיבלתם מדבקה!', place: 'aisle', props: [{ e: '🏅', x: 46, y: 50, s: 40 }] },
    { id: 'helper', emoji: '🍎', title: 'Little Helper', titleHe: 'עוזרים קטנים', descHe: 'שכחתם את הכסף… ועזרתם למר בראון לסדר תפוחים.', place: 'fruit' },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
