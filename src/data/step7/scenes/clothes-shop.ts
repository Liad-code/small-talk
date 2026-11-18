import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — Emma's Clothes Shop. The child asks for an item of clothing, a
 * colour and a size, tries it on, pays and says goodbye. Story: why do you
 * need new clothes? (a party, a superhero costume, a present for Grandma),
 * funny mirror moments, a giant hat and a find-the-socks game.
 */

const ASK_GREET: StoryLine = { text: "Hello! Welcome to Emma's Clothes Shop! Can I help you?", he: 'שלום! ברוכים הבאים לחנות הבגדים של אמה! אפשר לעזור לכם?' }
const ASK_ITEM: StoryLine = { text: 'What are you looking for?', he: 'מה אתם מחפשים?' }
const ASK_COLOUR: StoryLine = { text: 'What colour would you like?', he: 'איזה צבע הייתם רוצים?' }
const ASK_SIZE: StoryLine = { text: 'What size are you? Small, medium or large?', he: 'איזו מידה אתם? קטנה, בינונית או גדולה?' }
const ASK_TRY: StoryLine = { text: 'Here you are. Do you want to try it on?', he: 'בבקשה. אתם רוצים למדוד?' }
const ASK_HOW: StoryLine = { text: 'How is it?', he: 'איך זה?' }
const ASK_PAY: StoryLine = { text: "Great! That's fifty shekels, please.", he: 'מעולה! זה חמישים שקלים, בבקשה.' }
const BYE_LINE: StoryLine = { text: 'Thank you! Have a nice day!', he: 'תודה! שיהיה לכם יום נעים!' }

const LOOKING = (item: string, he: string, icon: string, next: string): StoryChoice =>
  ({ say: `I'm looking for ${item}.`, he: `אני מחפש/ת ${he}.`, icon, next })

const GOODBYE: StoryChoice = { say: 'Thank you! Goodbye!', he: 'תודה! להתראות!', icon: '👋' }
const YESTERDAY: StoryChoice = { say: 'See you yesterday!', he: 'נתראה אתמול!', icon: '🙃', silly: { text: 'Yesterday? Ha ha! Try again.', he: 'אתמול? חה חה! נסו שוב.' } }
const CAKE: StoryChoice = { say: "I'm looking for a cake.", he: 'אני מחפש/ת עוגה.', icon: '🎂', silly: { text: 'A cake? This is a clothes shop! Try again.', he: 'עוגה? זו חנות בגדים! נסו שוב.' } }
const DELICIOUS: StoryChoice = { say: "It's delicious!", he: 'זה טעים!', icon: '😋', silly: { text: "Delicious? You can't eat clothes! Try again.", he: 'טעים? אי אפשר לאכול בגדים! נסו שוב.' } }

const SCENE: Scene = {
  id: 'clothes-shop',
  title: "Emma's Clothes Shop",
  titleHe: 'בחנות הבגדים',
  emoji: '👕',
  character: { speaker: 'emma', name: 'Emma', nameHe: 'אמה', emoji: '💁‍♀️' },
  result: 'items',
  ui: {
    gradient: 'from-purple-400 to-fuchsia-500',
    cardEn: 'Buy new clothes — then be the shop assistant!',
    cardHe: 'קונים בגדים חדשים — ואז הופכים לאמה המוכרת!',
    subtitleHe: 'בחנות הבגדים — קונים בגדים באנגלית',
    sign: "👗 Emma's Clothes",
    stagePlace: 'shop',
    introHe: {
      order: 'אמה שואלת — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם אמה המוכרת — שאלו את הלקוח, זכרו מה ביקש והביאו לו בדיוק את הבגד הנכון.',
    },
    startEn: "Let's go!", startHe: 'נכנסים לחנות הבגדים',
    swapTab: '💁‍♀️ Be Emma',
    swapStartEn: 'Open the shop!', swapStartHe: 'פותחים את חנות הבגדים',
    swapAskHe: 'מה אמה אומרת עכשיו?',
    swapSayHe: 'אמרו את המשפט של אמה בקול!',
    makeTitleHe: 'הביאו ללקוח בדיוק את מה שביקש:',
    serveEn: 'Here you are!', serveHe: 'תנו ללקוח',
    doneEn: 'You look great!', doneHe: 'קניתם בגד חדש באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Emma!', swapDoneHe: 'הייתם אמה ועזרתם ללקוח באנגלית!',
    customerName: 'Customer',
    learnHe: 'אלה המשפטים של השיחה בחנות הבגדים. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לקנות לבד!',
  },
  places: {
    shop: {
      bg: 'linear-gradient(#faf5ff, #f3e8ff)',
      floor: { bg: 'repeating-linear-gradient(90deg, #e9d5ff 0 30px, #f5f3ff 30px 60px)', h: 22, border: '#c084fc' },
      decor: [
        { e: '👕', x: 8, y: 30, s: 34 },
        { e: '👗', x: 24, y: 34, s: 34 },
        { e: '🧥', x: 42, y: 30, s: 34 },
        { e: '🎩', x: 60, y: 36, s: 30 },
        { e: '👟', x: 76, y: 44, s: 28 },
        { e: '✨', x: 90, y: 26, s: 24, anim: 'glow' },
      ],
      sign: "👗 Emma's Clothes",
      counter: { bg: '#c084fc', border: '#9333ea', item: '🛍️' },
    },
    fitting: {
      bg: 'linear-gradient(#fdf4ff, #fae8ff)',
      floor: { bg: 'repeating-conic-gradient(#f0abfc 0% 25%, #fdf4ff 0% 50%) 0 0 / 28px 28px', h: 22, border: '#e879f9' },
      decor: [
        { e: '🪞', x: 44, y: 28, s: 64 },
        { e: '🪝', x: 14, y: 30, s: 28 },
        { e: '💡', x: 72, y: 8, s: 26, anim: 'glow' },
        { e: '🌸', x: 86, y: 40, s: 28 },
      ],
      sign: '🪞 Fitting Room',
    },
    party: {
      bg: 'linear-gradient(#ede9fe, #fce7f3)',
      floor: { bg: 'repeating-linear-gradient(90deg, #f9a8d4 0 26px, #c4b5fd 26px 52px)', h: 20, border: '#a855f7' },
      decor: [
        { e: '🎈', x: 8, y: 26, s: 36, anim: 'float' },
        { e: '🎉', x: 30, y: 30, s: 32 },
        { e: '🪩', x: 50, y: 8, s: 34, anim: 'glow' },
        { e: '🎂', x: 66, y: 40, s: 32 },
        { e: '🎈', x: 88, y: 30, s: 36, anim: 'float' },
      ],
      sign: '🎉 Party Time',
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_GREET.text,
      hintHe: "אמרו מה אתם מחפשים: I'm looking for… = אני מחפש/ת… — a T-shirt = חולצה, a dress = שמלה, a jacket = ז'קט, a hat = כובע",
      swapHintHe: 'אתם אמה! קבלו את הלקוח בברכה ושאלו אם אפשר לעזור.',
      showCorrect: 3,
      options: [
        { say: "I'm looking for a T-shirt.", correct: true, pick: { slot: 'item', value: 'T-shirt' }, icon: '👕', label: 'T-shirt' },
        { say: "I'm looking for a dress.", correct: true, pick: { slot: 'item', value: 'dress' }, icon: '👗', label: 'dress' },
        { say: "I'm looking for a jacket.", correct: true, pick: { slot: 'item', value: 'jacket' }, icon: '🧥', label: 'jacket' },
        { say: "I'm looking for a hat.", correct: true, pick: { slot: 'item', value: 'hat' }, icon: '👒', label: 'hat' },
        { say: CAKE.say, correct: false, reaction: CAKE.silly!.text },
      ],
      distractorWord: 'cake',
      swapSilly: { say: 'Are you looking for a fish?', reaction: 'A fish? No! I want clothes!' },
    },
    {
      id: 'colour',
      ask: ASK_COLOUR.text,
      hintHe: 'בחרו צבע: red = אדום, blue = כחול, yellow = צהוב',
      swapHintHe: 'שאלו את הלקוח איזה צבע הוא רוצה.',
      options: [
        { say: 'Red, please.', correct: true, pick: { slot: 'colour', value: 'red' }, icon: '🔴', label: 'red' },
        { say: 'Blue, please.', correct: true, pick: { slot: 'colour', value: 'blue' }, icon: '🔵', label: 'blue' },
        { say: 'Yellow, please.', correct: true, pick: { slot: 'colour', value: 'yellow' }, icon: '🟡', label: 'yellow' },
        { say: 'Invisible, please.', correct: false, reaction: 'Invisible? Then how can I find it? Try again.' },
      ],
      distractorWord: 'invisible',
      swapSilly: { say: 'Do you want it in chocolate?', reaction: "Chocolate? I can't wear chocolate!" },
    },
    {
      id: 'size',
      ask: ASK_SIZE.text,
      hintHe: 'בחרו מידה: small = קטנה, medium = בינונית, large = גדולה',
      swapHintHe: 'שאלו את הלקוח איזו מידה הוא צריך.',
      options: [
        { say: 'Small, please.', correct: true, pick: { slot: 'size', value: 'small' }, icon: 'S', label: 'small' },
        { say: 'Medium, please.', correct: true, pick: { slot: 'size', value: 'medium' }, icon: 'M', label: 'medium' },
        { say: 'Large, please.', correct: true, pick: { slot: 'size', value: 'large' }, icon: 'L', label: 'large' },
        { say: 'Elephant size, please.', correct: false, reaction: 'Elephant size? Ha ha! Try again.' },
      ],
      distractorWord: 'elephant',
      swapSilly: { say: 'What size is your dog?', reaction: "My dog? It's for me!" },
    },
    {
      id: 'try',
      ask: ASK_TRY.text,
      hintHe: 'רוצים למדוד? Yes, please = כן, בבקשה',
      swapHintHe: 'תנו ללקוח את הבגד ושאלו אם הוא רוצה למדוד.',
      options: [
        { say: 'Yes, please.', correct: true },
        { say: 'Yes, on my head!', correct: false, reaction: 'On your head? Ha ha! Try again.' },
      ],
      distractorWord: 'head',
      swapSilly: { say: 'Do you want to try it on your nose?', reaction: 'On my nose? Ha ha! No!' },
    },
    {
      id: 'how',
      ask: ASK_HOW.text,
      hintHe: "איך הבגד? It's perfect = זה מושלם, I love it = אני אוהב/ת את זה",
      swapHintHe: 'שאלו את הלקוח איך הבגד עליו.',
      options: [
        { say: "It's perfect!", correct: true, icon: '🤩', label: 'perfect' },
        { say: 'I love it!', correct: true, icon: '😍', label: 'love it' },
        { say: DELICIOUS.say, correct: false, reaction: DELICIOUS.silly!.text },
      ],
      distractorWord: 'delicious',
      swapSilly: { say: 'How does it taste?', reaction: "Taste? It's not food!" },
    },
    {
      id: 'pay',
      ask: ASK_PAY.text,
      hintHe: 'שלמו לאמה. Here you are = בבקשה (כשנותנים משהו)',
      swapHintHe: 'בקשו מהלקוח לשלם.',
      options: [
        { say: 'Here you are.', correct: true },
        { say: 'Can I pay with buttons?', correct: false, reaction: 'Buttons? Ha ha! Money, please. Try again.' },
      ],
      distractorWord: 'buttons',
      swapSilly: { say: 'Pay with your socks, please.', reaction: 'My socks? No! Here is my money.' },
    },
    {
      id: 'goodbye',
      ask: BYE_LINE.text,
      hintHe: 'הודו לאמה ונפרדו ממנה.',
      swapHintHe: 'הודו ללקוח ואחלו לו יום נעים.',
      options: [
        { say: 'Thank you! Goodbye!', correct: true },
        { say: YESTERDAY.say, correct: false, reaction: YESTERDAY.silly!.text },
      ],
      distractorWord: 'yesterday',
      swapSilly: { say: 'Please wear it in the bath!', reaction: 'In the bath? No way!' },
    },
  ],
  makeAfterStep: 'size',
  makeSlots: [
    { slot: 'item', titleHe: 'איזה בגד?', choices: [
      { value: 'T-shirt', icon: '👕', label: 'T-shirt' },
      { value: 'dress', icon: '👗', label: 'dress' },
      { value: 'jacket', icon: '🧥', label: 'jacket' },
      { value: 'hat', icon: '👒', label: 'hat' },
    ] },
    { slot: 'colour', titleHe: 'איזה צבע?', choices: [
      { value: 'red', icon: '🔴', label: 'red' },
      { value: 'blue', icon: '🔵', label: 'blue' },
      { value: 'yellow', icon: '🟡', label: 'yellow' },
    ] },
    { slot: 'size', titleHe: 'איזו מידה?', choices: [
      { value: 'small', icon: 'S', label: 'small' },
      { value: 'medium', icon: 'M', label: 'medium' },
      { value: 'large', icon: 'L', label: 'large' },
    ] },
  ],
  lines: {
    farewell: 'Bye! Come again soon!',
    makeRight: "Yes! That's just what I wanted!",
    makeWrong: "Hmm, that's not what I asked for. Try again.",
  },
  phrases: [
    { speaker: 'emma', en: ASK_GREET.text, he: ASK_GREET.he },
    { speaker: 'kid', en: "I'm looking for a T-shirt.", he: 'אני מחפש/ת חולצה.' },
    { speaker: 'emma', en: ASK_COLOUR.text, he: ASK_COLOUR.he },
    { speaker: 'kid', en: 'Blue, please.', he: 'כחול, בבקשה.' },
    { speaker: 'emma', en: ASK_SIZE.text, he: ASK_SIZE.he },
    { speaker: 'kid', en: 'Medium, please.', he: 'בינונית, בבקשה.' },
    { speaker: 'emma', en: ASK_TRY.text, he: ASK_TRY.he },
    { speaker: 'kid', en: 'Yes, please.', he: 'כן, בבקשה.' },
    { speaker: 'emma', en: ASK_HOW.text, he: ASK_HOW.he },
    { speaker: 'kid', en: "It's perfect!", he: 'זה מושלם!' },
    { speaker: 'kid', en: "It's too big.", he: 'זה גדול מדי.' },
    { speaker: 'kid', en: "It's too small.", he: 'זה קטן מדי.' },
    { speaker: 'emma', en: ASK_PAY.text, he: ASK_PAY.he },
    { speaker: 'kid', en: 'Here you are.', he: 'בבקשה (הנה הכסף).' },
    { speaker: 'emma', en: BYE_LINE.text, he: BYE_LINE.he },
    { speaker: 'kid', en: 'Thank you! Goodbye!', he: 'תודה! להתראות!' },
  ],
}

const STORY: Story = {
  id: 'clothes-shop-story',
  title: 'The Magic Mirror',
  titleHe: 'המראה הקסומה',
  start: 'greet',
  coverPlace: 'shop',
  introHe: [
    '🗨️ אמה מדברת — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '👋', he: 'שלום' },
    { icon: '👕', he: 'בוחרים בגד' },
    { icon: '🪞', he: 'מודדים' },
    { icon: '🎩', he: 'הכובע' },
    { icon: '🧦', he: 'הגרביים' },
    { icon: '💰', he: 'תשלום' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'greet', place: 'shop', chapter: 0,
      narrationHe: 'דינג! הפעמון מעל הדלת מצלצל. אתם בחנות הבגדים של אמה — מלאה בגדים צבעוניים!',
      lines: [ASK_GREET],
      choices: [
        { say: 'I need clothes for a party!', he: 'אני צריך/ה בגדים למסיבה!', icon: '🎉', reply: { text: 'A party? How fun! Let me help you.', he: 'מסיבה? איזה כיף! אני אעזור לכם.' }, set: { why: 'party' }, next: 'item' },
        { say: 'I want to be a superhero!', he: 'אני רוצה להיות גיבור/ת על!', icon: '🦸', reply: { text: 'A superhero? Wow! I have a red cape for you.', he: 'גיבור על? וואו! יש לי בשבילכם גלימה אדומה.' }, set: { why: 'hero' }, next: 'item' },
        { say: 'I need a present for my grandma.', he: 'אני צריך/ה מתנה לסבתא שלי.', icon: '👵', reply: { text: 'How sweet! Grandma will love it.', he: 'כמה מתוק! סבתא תאהב את זה.' }, set: { why: 'grandma' }, next: 'item' },
        CAKE,
      ],
    },
    {
      id: 'item', place: 'shop', chapter: 1,
      narrationHe: "אמה מובילה אתכם בין המדפים. יש פה חולצות, שמלות, ז'קטים וכובעים!",
      lines: [ASK_ITEM],
      showChoices: 3,
      choices: [
        LOOKING('a T-shirt', 'חולצה', '👕', 'colour'),
        LOOKING('a dress', 'שמלה', '👗', 'colour'),
        LOOKING('a jacket', "ז'קט", '🧥', 'colour'),
        LOOKING('a hat', 'כובע', '👒', 'colour'),
        CAKE,
      ],
    },
    {
      id: 'colour', place: 'shop', chapter: 1,
      narrationHe: 'אמה פותחת ארון ענק — יש שם את כל צבעי הקשת!',
      lines: [ASK_COLOUR],
      choices: [
        { say: 'Red, please.', he: 'אדום, בבקשה.', icon: '🔴', next: 'size' },
        { say: 'Blue, please.', he: 'כחול, בבקשה.', icon: '🔵', next: 'size' },
        { say: 'Yellow, please.', he: 'צהוב, בבקשה.', icon: '🟡', next: 'size' },
        { say: 'Invisible, please.', he: 'שקוף, בבקשה.', icon: '👻', silly: { text: 'Invisible? Then how can I find it? Try again.', he: 'בלתי נראה? אז איך אני אמצא אותו? נסו שוב.' } },
      ],
    },
    {
      id: 'size', place: 'shop', chapter: 1,
      narrationHe: 'אמה מסתכלת עליכם ומחזיקה סרט מדידה.',
      lines: [ASK_SIZE],
      choices: [
        { say: 'Small, please.', he: 'קטנה, בבקשה.', icon: '🤏', next: 'try' },
        { say: 'Medium, please.', he: 'בינונית, בבקשה.', icon: '👌', next: 'try' },
        { say: 'Large, please.', he: 'גדולה, בבקשה.', icon: '🙌', next: 'try' },
        { say: 'Elephant size, please.', he: 'מידה של פיל, בבקשה.', icon: '🐘', silly: { text: 'Elephant size? Ha ha! Try again.', he: 'מידה של פיל? חה חה! נסו שוב.' } },
      ],
    },
    {
      id: 'try', place: 'shop', chapter: 2,
      narrationHe: 'אמה מביאה לכם את הבגד, מקופל יפה.',
      lines: [ASK_TRY],
      choices: [
        { say: 'Yes, please.', he: 'כן, בבקשה.', icon: '👍', next: 'mirror' },
        { say: 'Yes, on my head!', he: 'כן, על הראש!', icon: '🙃', silly: { text: 'On your head? Ha ha! Try again.', he: 'על הראש? חה חה! נסו שוב.' } },
      ],
    },
    {
      id: 'mirror', place: 'fitting', chapter: 2,
      narrationHe: 'אתם בתא המדידה ומסתכלים במראה. הממ… איך זה נראה?',
      lines: [ASK_HOW],
      choices: [
        { say: "It's perfect!", he: 'זה מושלם!', icon: '🤩', reply: { text: 'You look great!', he: 'אתם נראים נהדר!' }, next: 'hat' },
        { say: "It's too big.", he: 'זה גדול מדי.', icon: '🐘', reply: { text: 'Too big? Here is a smaller one.', he: 'גדול מדי? הנה אחד קטן יותר.' }, next: 'mirror2' },
        { say: "It's too small.", he: 'זה קטן מדי.', icon: '🐭', reply: { text: 'Too small? Here is a bigger one.', he: 'קטן מדי? הנה אחד גדול יותר.' }, next: 'mirror2' },
        DELICIOUS,
      ],
    },
    {
      id: 'mirror2', place: 'fitting', chapter: 2,
      narrationHe: 'מודדים שוב… והפעם זה בדיוק במידה!',
      lines: [ASK_HOW],
      choices: [
        { say: "It's perfect!", he: 'זה מושלם!', icon: '🤩', reply: { text: 'You look great!', he: 'אתם נראים נהדר!' }, next: 'hat' },
        { say: 'I love it!', he: 'אני אוהב/ת את זה!', icon: '😍', reply: { text: 'You look great!', he: 'אתם נראים נהדר!' }, next: 'hat' },
        DELICIOUS,
      ],
    },
    {
      id: 'hat', place: 'fitting', chapter: 3,
      narrationHe: 'אמה שמה לכם על הראש כובע ענק… ופתאום הכול חושך!',
      props: [{ e: '🎩', x: 72, y: 50, s: 70 }],
      lines: [{ text: 'And now a hat! Try this one!', he: 'ועכשיו כובע! נסו את זה!' }],
      choices: [
        { say: "It's too big! I can't see!", he: 'הוא גדול מדי! אני לא רואה כלום!', icon: '🙈', reply: { text: 'Oops! Ha ha! Sorry!', he: 'אופס! חה חה! סליחה!' }, next: 'basket' },
        { say: 'Hello? Where is everybody?', he: 'הלו? איפה כולם?', icon: '🙉', reply: { text: 'Oops! Ha ha! Sorry!', he: 'אופס! חה חה! סליחה!' }, next: 'basket' },
      ],
    },
    {
      id: 'basket', place: 'shop', chapter: 4,
      narrationHe: 'כשהורידו את הכובע — בום! סל הכביסה של אמה התהפך, וכל הבגדים התערבבו.',
      props: [{ e: '🧺', x: 48, y: 48, s: 40 }],
      lines: [{ text: 'Oh no! Can you find the socks for me?', he: 'אוי לא! תוכלו למצוא לי את הגרביים?' }],
      choices: [
        { say: 'Yes! I can help you.', he: 'כן! אני יכול/ה לעזור לך.', icon: '💪', next: 'socks' },
        { say: 'Can I wear them on my ears?', he: 'אפשר לשים אותם על האוזניים?', icon: '👂', silly: { text: 'On your ears? Socks are for feet! Try again.', he: 'על האוזניים? גרביים זה לרגליים! נסו שוב.' } },
      ],
    },
    {
      id: 'socks', place: 'shop', chapter: 4, next: 'pay',
      narrationHe: 'הגרביים מתחבאים בין החולצות, המעילים והכובעים. מצאו אותם!',
      lines: [],
      event: {
        kind: 'find', target: '🧦', count: 4,
        decoys: ['👕', '👗', '🧥', '🎩', '👟', '🧣', '🧤', '👖'],
        promptHe: 'מצאו את 4 הגרביים!',
        doneLine: { text: 'You found all the socks! Thank you!', he: 'מצאתם את כל הגרביים! תודה!' },
      },
    },
    {
      id: 'pay', place: 'shop', chapter: 5,
      narrationHe: 'הכול מסודר שוב. הגיע הזמן לשלם בקופה.',
      lines: [ASK_PAY],
      choices: [
        {
          say: 'Here you are.', he: 'בבקשה (הנה הכסף).', icon: '💰', next: 'end-party',
          nextIf: [{ key: 'why', value: 'hero', next: 'end-hero' }, { key: 'why', value: 'grandma', next: 'end-grandma' }],
        },
        { say: 'Can I pay with buttons?', he: 'אפשר לשלם בכפתורים?', icon: '🔘', silly: { text: 'Buttons? Ha ha! Money, please. Try again.', he: 'כפתורים? חה חה! כסף, בבקשה. נסו שוב.' } },
      ],
    },
    {
      id: 'end-party', place: 'party', chapter: 6, ending: 'party',
      narrationHe: 'אתם מגיעים למסיבה בבגדים החדשים — וכולם אומרים: וואו!',
      props: [{ e: '✨', x: 62, y: 36, s: 30 }],
      lines: [{ text: 'You look great! Have fun at the party!', he: 'אתם נראים נהדר! תיהנו במסיבה!' }],
      choices: [GOODBYE, YESTERDAY],
    },
    {
      id: 'end-hero', place: 'shop', chapter: 6, ending: 'hero',
      narrationHe: 'אמה קושרת לכם גלימה אדומה. אתם נראים בדיוק כמו גיבורי על!',
      props: [{ e: '🦸', x: 55, y: 40, s: 44 }],
      lines: [{ text: 'Wow! You look like a real superhero!', he: 'וואו! אתם נראים כמו גיבורי על אמיתיים!' }],
      choices: [{ say: 'Up, up and away!', he: 'למעלה, למעלה ולדרך!', icon: '🚀' }, YESTERDAY],
    },
    {
      id: 'end-grandma', place: 'shop', chapter: 6, ending: 'grandma',
      narrationHe: 'אמה עוטפת את הבגד בנייר מתנה וסרט סגול. סבתא תהיה כל כך שמחה!',
      props: [{ e: '🎁', x: 55, y: 44, s: 44 }],
      lines: [{ text: 'Here is your present. Say hello to Grandma!', he: 'הנה המתנה שלכם. ד"ש לסבתא!' }],
      choices: [GOODBYE, YESTERDAY],
    },
  ],
  endings: [
    { id: 'party', emoji: '🎉', title: 'Party Outfit', titleHe: 'בגדים למסיבה', descHe: 'קניתם בגד חדש והייתם הכי יפים במסיבה.', place: 'party' },
    { id: 'hero', emoji: '🦸', title: 'Superhero Costume', titleHe: 'תחפושת גיבור על', descHe: 'קיבלתם גלימה אדומה והפכתם לגיבורי על!', place: 'shop', props: [{ e: '🦸', x: 50, y: 40, s: 48 }] },
    { id: 'grandma', emoji: '🎁', title: 'A Present for Grandma', titleHe: 'מתנה לסבתא', descHe: 'בחרתם מתנה עטופה יפה בשביל סבתא.', place: 'shop', props: [{ e: '🎁', x: 50, y: 44, s: 44 }, { e: '👵', x: 72, y: 40, s: 40 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
