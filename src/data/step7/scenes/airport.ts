import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — "At the Airport". Daniel, a polite check-in agent: passport, where
 * to, window or aisle, suitcases, boarding pass and gate.
 * Story: lost suitcases, check-in, the gate… and a different city each time.
 */

const ASK_PASSPORT: StoryLine = { text: 'Good morning! Passport, please.', he: 'בוקר טוב! דרכון, בבקשה.' }
const ASK_WHERE: StoryLine = { text: 'Where are you flying to?', he: 'לאן אתם טסים?' }
const ASK_SEAT: StoryLine = { text: 'Would you like a window or an aisle seat?', he: 'תרצו מושב ליד החלון או ליד המעבר?' }
const ASK_BAGS: StoryLine = { text: 'How many suitcases do you have?', he: 'כמה מזוודות יש לכם?' }
const ASK_PACKED: StoryLine = { text: 'Is this your bag? Did you pack it yourself?', he: 'זה התיק שלכם? ארזתם אותו בעצמכם?' }
const ASK_PASS: StoryLine = { text: 'Here is your boarding pass. Gate five.', he: 'הנה כרטיס העלייה למטוס שלכם. שער חמש.' }
const ASK_BYE: StoryLine = { text: "It's over there. Have a nice flight!", he: 'זה שם. טיסה נעימה!' }

const SILLY_PASSPORT: StoryLine = { text: 'A sandwich? Yum! But I need your passport. Try again.', he: 'כריך? יאמי! אבל אני צריך את הדרכון. נסו שוב.' }
const SILLY_WHERE: StoryLine = { text: "The moon? Planes don't fly there! Try again.", he: 'לירח? מטוסים לא טסים לשם! נסו שוב.' }
const SILLY_SEAT: StoryLine = { text: 'On the wing? No way! Try again.', he: 'על הכנף? אין מצב! נסו שוב.' }
const SILLY_BAGS: StoryLine = { text: "A hundred? That's too many! Try again.", he: 'מאה? זה יותר מדי! נסו שוב.' }
const SILLY_PACKED: StoryLine = { text: 'Your cat? Ha ha! Try again.', he: 'החתול שלכם? חה חה! נסו שוב.' }
const SILLY_PASS: StoryLine = { text: 'The pool? This is an airport! Try again.', he: 'הבריכה? זה שדה תעופה! נסו שוב.' }

const C_LONDON: StoryChoice = { say: "I'm flying to London.", he: 'אני טס/ה ללונדון.', icon: '💂', set: { city: 'london' }, next: 'seat' }
const C_PARIS: StoryChoice = { say: "I'm flying to Paris.", he: 'אני טס/ה לפריז.', icon: '🗼', set: { city: 'paris' }, next: 'seat' }
const C_NEWYORK: StoryChoice = { say: "I'm flying to New York.", he: 'אני טס/ה לניו יורק.', icon: '🗽', set: { city: 'newyork' }, next: 'seat' }

const BOARD_TO = [
  { key: 'city', value: 'paris', next: 'end-paris' },
  { key: 'city', value: 'newyork', next: 'end-newyork' },
]

const SCENE: Scene = {
  id: 'airport',
  title: 'At the Airport',
  titleHe: 'בשדה התעופה',
  emoji: '✈️',
  character: { speaker: 'daniel', name: 'Daniel', nameHe: 'דניאל', emoji: '🧑‍✈️' },
  result: 'items',
  ui: {
    gradient: 'from-sky-400 to-indigo-500',
    cardEn: 'Check in for your flight — then work at the airport!',
    cardHe: 'עושים צ\'ק-אין לטיסה — ואז עובדים בשדה התעופה!',
    subtitleHe: 'בשדה התעופה — עושים צ\'ק-אין באנגלית',
    sign: '✈️ Check-in',
    stagePlace: 'checkin',
    introHe: {
      order: 'דניאל בדלפק הצ\'ק-אין שואל — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו לאן אתם טסים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם דניאל — שאלו את הנוסע, זכרו מה ענה והדפיסו לו את כרטיס העלייה הנכון.',
    },
    startEn: "Let's fly!", startHe: 'נכנסים לשדה התעופה',
    swapTab: '🧑‍✈️ Be Daniel',
    swapStartEn: 'Open check-in!', swapStartHe: 'פותחים את דלפק הצ\'ק-אין',
    swapAskHe: 'מה דניאל אומר עכשיו?',
    swapSayHe: 'אמרו את המשפט של דניאל בקול!',
    makeTitleHe: 'הדפיסו לנוסע כרטיס עלייה בדיוק לפי מה שאמר:',
    serveEn: 'Here is your boarding pass!', serveHe: 'תנו לנוסע את הכרטיס',
    doneEn: 'Ready to fly!', doneHe: 'עשיתם צ\'ק-אין באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Daniel!', swapDoneHe: 'הייתם דניאל ועזרתם לנוסע באנגלית!',
    customerName: 'Passenger',
    learnHe: 'אלה המשפטים של הצ\'ק-אין בשדה התעופה. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לבד!',
  },
  places: {
    checkin: {
      bg: 'linear-gradient(#e0f2fe, #f0f9ff)',
      floor: { bg: 'repeating-linear-gradient(90deg, #cbd5e1 0 40px, #e2e8f0 40px 80px)', h: 22, border: '#64748b' },
      decor: [
        { e: '🕘', x: 8, y: 12, s: 30 },
        { e: '🛫', x: 30, y: 30, s: 36, anim: 'float' },
        { e: '🧳', x: 52, y: 46, s: 32 },
        { e: '🪴', x: 88, y: 40, s: 34 },
      ],
      sign: '✈️ Check-in',
      counter: { bg: '#60a5fa', border: '#1d4ed8', item: '🎫' },
    },
    gate: {
      bg: 'linear-gradient(#7dd3fc, #bae6fd 60%, #e0f2fe)',
      floor: { bg: 'repeating-linear-gradient(45deg, #6366f1 0 12px, #818cf8 12px 24px)', h: 22, border: '#4338ca' },
      decor: [
        { e: '☁️', x: 10, y: 10, s: 34, anim: 'cloud' },
        { e: '✈️', x: 40, y: 30, s: 64, anim: 'float' },
        { e: '☁️', x: 70, y: 18, s: 30, anim: 'cloud' },
        { e: '💺', x: 84, y: 46, s: 32 },
      ],
      sign: '🚪 Gate 5',
    },
    london: {
      bg: 'linear-gradient(#94a3b8, #cbd5e1)',
      floor: { bg: '#64748b', h: 20, border: '#334155' },
      decor: [
        { e: '🌧️', x: 12, y: 8, s: 36, anim: 'cloud' },
        { e: '🎡', x: 30, y: 28, s: 56 },
        { e: '💂', x: 62, y: 40, s: 40 },
        { e: '☂️', x: 80, y: 32, s: 36 },
        { e: '🚌', x: 84, y: 52, s: 34 },
      ],
      sign: '☂️ London',
    },
    paris: {
      bg: 'linear-gradient(#fbcfe8, #fef3c7)',
      floor: { bg: '#d6d3d1', h: 20, border: '#a8a29e' },
      decor: [
        { e: '🗼', x: 40, y: 18, s: 80 },
        { e: '🥐', x: 12, y: 40, s: 32 },
        { e: '🎨', x: 76, y: 38, s: 32 },
        { e: '☁️', x: 70, y: 8, s: 28, anim: 'cloud' },
      ],
      sign: '🥐 Paris',
    },
    newyork: {
      bg: 'linear-gradient(#fde68a, #bae6fd)',
      floor: { bg: '#475569', h: 20, border: '#facc15' },
      decor: [
        { e: '🏙️', x: 8, y: 26, s: 60 },
        { e: '🗽', x: 50, y: 20, s: 72 },
        { e: '🚕', x: 80, y: 50, s: 36 },
        { e: '🌭', x: 82, y: 30, s: 28 },
      ],
      sign: '🚕 New York',
    },
  },
  steps: [
    {
      id: 'passport',
      ask: ASK_PASSPORT.text,
      hintHe: 'תנו לדניאל את הדרכון. Here you are = בבקשה (כשנותנים משהו)',
      swapHintHe: 'אתם דניאל! אמרו בוקר טוב ובקשו מהנוסע את הדרכון.',
      options: [
        { say: 'Here you are.', correct: true },
        { say: 'Here is my sandwich.', correct: false, reaction: SILLY_PASSPORT.text },
      ],
      distractorWord: 'sandwich',
      swapSilly: { say: 'Your toothbrush, please.', reaction: 'My toothbrush? Here is my passport!' },
    },
    {
      id: 'where',
      ask: ASK_WHERE.text,
      hintHe: 'לאן טסים? London = לונדון, Paris = פריז, New York = ניו יורק, Rome = רומא. I\'m flying to… = אני טס/ה ל…',
      swapHintHe: 'שאלו את הנוסע לאן הוא טס.',
      showCorrect: 3,
      options: [
        { say: C_LONDON.say, correct: true, pick: { slot: 'city', value: 'London' }, icon: '💂', label: 'London' },
        { say: C_PARIS.say, correct: true, pick: { slot: 'city', value: 'Paris' }, icon: '🗼', label: 'Paris' },
        { say: C_NEWYORK.say, correct: true, pick: { slot: 'city', value: 'New York' }, icon: '🗽', label: 'New York' },
        { say: "I'm flying to Rome.", correct: true, pick: { slot: 'city', value: 'Rome' }, icon: '🏛️', label: 'Rome' },
        { say: "I'm flying to the moon.", correct: false, reaction: SILLY_WHERE.text },
      ],
      distractorWord: 'moon',
      swapSilly: { say: 'Where is your dinosaur?', reaction: "My dinosaur? I don't have one!" },
    },
    {
      id: 'seat',
      ask: ASK_SEAT.text,
      hintHe: 'איפה תשבו במטוס? window = חלון, aisle = מעבר (מבטאים: "אייל")',
      swapHintHe: 'שאלו את הנוסע אם הוא רוצה לשבת ליד החלון או ליד המעבר.',
      options: [
        { say: 'A window seat, please.', correct: true, pick: { slot: 'seat', value: 'window' }, icon: '🪟', label: 'window' },
        { say: 'An aisle seat, please.', correct: true, pick: { slot: 'seat', value: 'aisle' }, icon: '🚶', label: 'aisle' },
        { say: 'A seat on the wing, please.', correct: false, reaction: SILLY_SEAT.text },
      ],
      distractorWord: 'wing',
      swapSilly: { say: 'Do you want to sit on the roof?', reaction: 'The roof? No, thank you!' },
    },
    {
      id: 'bags',
      ask: ASK_BAGS.text,
      hintHe: 'כמה מזוודות? one = אחת, two = שתיים. suitcase = מזוודה',
      swapHintHe: 'שאלו את הנוסע כמה מזוודות יש לו.',
      options: [
        { say: 'One suitcase.', correct: true, pick: { slot: 'bags', value: 'one' }, icon: '🧳', label: 'one' },
        { say: 'Two suitcases.', correct: true, pick: { slot: 'bags', value: 'two' }, icon: '🧳', label: 'two' },
        { say: 'A hundred suitcases!', correct: false, reaction: SILLY_BAGS.text },
      ],
      distractorWord: 'hundred',
      swapSilly: { say: 'How many elephants do you have?', reaction: 'Elephants? None!' },
    },
    {
      id: 'packed',
      ask: ASK_PACKED.text,
      hintHe: 'ענו שכן, ארזתם לבד. Yes, I did = כן, ארזתי',
      swapHintHe: 'שאלו את הנוסע אם זה התיק שלו ואם ארז אותו בעצמו.',
      options: [
        { say: 'Yes, I did.', correct: true },
        { say: 'No, my cat packed it.', correct: false, reaction: SILLY_PACKED.text },
      ],
      distractorWord: 'cat',
      swapSilly: { say: 'Is there a lion in your bag?', reaction: 'A lion? No! Just my clothes!' },
    },
    {
      id: 'pass',
      ask: ASK_PASS.text,
      hintHe: 'הודו ושאלו איפה השער. Where is gate five? = איפה שער חמש?',
      swapHintHe: 'תנו לנוסע את כרטיס העלייה ואמרו לו מספר שער.',
      options: [
        { say: 'Thank you! Where is gate five?', correct: true },
        { say: 'Thank you! Where is the pool?', correct: false, reaction: SILLY_PASS.text },
      ],
      distractorWord: 'pool',
      swapSilly: { say: 'Here is your pizza. Gate five.', reaction: 'Pizza? I need my boarding pass!' },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE.text,
      hintHe: 'הודו לדניאל ונפרדו ממנו.',
      swapHintHe: 'הראו לנוסע איפה השער ואחלו לו טיסה נעימה.',
      options: [
        { say: 'Thank you! Goodbye!', correct: true },
        { say: 'Thank you! Have a nice nap!', correct: false, reaction: "A nap? I'm working! Try again." },
      ],
      distractorWord: 'nap',
      swapSilly: { say: 'Have a nice swim!', reaction: "A swim? I'm flying!" },
    },
  ],
  makeAfterStep: 'bags',
  makeSlots: [
    { slot: 'city', titleHe: 'לאן?', choices: [
      { value: 'London', icon: '💂', label: 'London' },
      { value: 'Paris', icon: '🗼', label: 'Paris' },
      { value: 'New York', icon: '🗽', label: 'New York' },
      { value: 'Rome', icon: '🏛️', label: 'Rome' },
    ] },
    { slot: 'seat', titleHe: 'איזה מושב?', choices: [
      { value: 'window', icon: '🪟', label: 'window' },
      { value: 'aisle', icon: '🚶', label: 'aisle' },
    ] },
    { slot: 'bags', titleHe: 'כמה מזוודות?', choices: [
      { value: 'one', icon: '🧳', label: 'one' },
      { value: 'two', icon: '🧳', label: 'two' },
    ] },
  ],
  lines: {
    farewell: 'Bye! Enjoy your trip!',
    makeRight: "Yes! That's my boarding pass!",
    makeWrong: "Hmm, that's not my ticket! Try again.",
  },
  phrases: [
    { speaker: 'daniel', en: ASK_PASSPORT.text, he: ASK_PASSPORT.he },
    { speaker: 'kid', en: 'Here you are.', he: 'בבקשה (הנה הדרכון).' },
    { speaker: 'daniel', en: ASK_WHERE.text, he: ASK_WHERE.he },
    { speaker: 'kid', en: C_LONDON.say, he: 'אני טס/ה ללונדון.' },
    { speaker: 'daniel', en: ASK_SEAT.text, he: ASK_SEAT.he },
    { speaker: 'kid', en: 'A window seat, please.', he: 'מושב ליד החלון, בבקשה.' },
    { speaker: 'daniel', en: ASK_BAGS.text, he: ASK_BAGS.he },
    { speaker: 'kid', en: 'One suitcase.', he: 'מזוודה אחת.' },
    { speaker: 'daniel', en: ASK_PACKED.text, he: ASK_PACKED.he },
    { speaker: 'kid', en: 'Yes, I did.', he: 'כן, ארזתי.' },
    { speaker: 'daniel', en: ASK_PASS.text, he: ASK_PASS.he },
    { speaker: 'kid', en: 'Thank you! Where is gate five?', he: 'תודה! איפה שער חמש?' },
    { speaker: 'daniel', en: ASK_BYE.text, he: ASK_BYE.he },
    { speaker: 'kid', en: 'Thank you! Goodbye!', he: 'תודה! להתראות!' },
  ],
}

const STORY: Story = {
  id: 'airport-story',
  title: 'The Big Trip',
  titleHe: 'הטיול הגדול',
  start: 'arrive',
  coverPlace: 'gate',
  introHe: [
    '🗨️ דניאל מדבר — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור — ואפילו לאן תטוסו!',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '🧳', he: 'מזוודות' },
    { icon: '🛂', he: 'דרכון' },
    { icon: '🌍', he: 'לאן?' },
    { icon: '💺', he: 'מושב' },
    { icon: '⚖️', he: 'מזוודות' },
    { icon: '🎫', he: 'כרטיס' },
    { icon: '🚪', he: 'שער' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'arrive', place: 'checkin', chapter: 0, noCharacter: true,
      narrationHe: 'הגעתם לשדה התעופה! יש פה המון אנשים והמון מזוודות… רגע, איפה המזוודות שלכם?',
      lines: [],
      props: [{ e: '🧳', x: 30, y: 48, s: 30 }, { e: '🎒', x: 44, y: 50, s: 28 }, { e: '💼', x: 58, y: 50, s: 28 }],
      choices: [
        { say: 'Oh no! Where are my suitcases?', he: 'אוי לא! איפה המזוודות שלי?', icon: '😱', next: 'find' },
        { say: "Don't worry! I can find them!", he: 'אל דאגה! אני יכול/ה למצוא אותן!', icon: '🔍', next: 'find' },
      ],
    },
    {
      id: 'find', place: 'checkin', chapter: 0, next: 'passport', noCharacter: true,
      narrationHe: 'כל המזוודות מתגלגלות על המסוע. רק שלוש מהן שלכם!',
      lines: [],
      event: {
        kind: 'find', target: '🧳', count: 3,
        decoys: ['🎒', '💼', '👜', '🛍️', '🎸', '🛒', '🧸'],
        promptHe: 'מצאו את 3 המזוודות שלכם!',
        doneLine: { text: 'You found them! Great! Come here, please.', he: 'מצאתם אותן! מעולה! בואו לכאן, בבקשה.' },
      },
    },
    {
      id: 'passport', place: 'checkin', chapter: 1,
      narrationHe: 'בדלפק הצ\'ק-אין מחכה דניאל, עם חיוך ועניבה כחולה.',
      lines: [ASK_PASSPORT],
      choices: [
        { say: 'Here you are.', he: 'בבקשה (הנה הדרכון).', icon: '🛂', next: 'where' },
        {
          say: 'Here you are. Look, I was a baby!', he: 'בבקשה. תראה, הייתי תינוק/ת!', icon: '👶',
          reply: { text: 'Ha ha! What a cute photo!', he: 'חה חה! איזו תמונה חמודה!' }, next: 'where',
        },
        { say: 'Here is my sandwich.', he: 'הנה הכריך שלי.', icon: '🥪', silly: SILLY_PASSPORT },
      ],
    },
    {
      id: 'where', place: 'checkin', chapter: 2,
      narrationHe: 'דניאל מקליד במחשב. על המסך מאחוריו מופיעות טיסות לכל העולם.',
      lines: [ASK_WHERE],
      choices: [
        C_LONDON, C_PARIS, C_NEWYORK,
        { say: "I'm flying to the moon.", he: 'אני טס/ה לירח.', icon: '🌙', silly: SILLY_WHERE },
      ],
    },
    {
      id: 'seat', place: 'checkin', chapter: 3,
      narrationHe: 'דניאל מראה לכם מפה של המטוס עם הרבה מושבים קטנים.',
      lines: [ASK_SEAT],
      choices: [
        { say: 'A window seat, please.', he: 'מושב ליד החלון, בבקשה.', icon: '🪟', reply: { text: 'Good choice! You can see the clouds!', he: 'בחירה טובה! תוכלו לראות את העננים!' }, next: 'bags' },
        { say: 'An aisle seat, please.', he: 'מושב ליד המעבר, בבקשה.', icon: '🚶', next: 'bags' },
        { say: 'A seat on the wing, please.', he: 'מושב על הכנף, בבקשה.', icon: '🛩️', silly: SILLY_SEAT },
      ],
    },
    {
      id: 'bags', place: 'checkin', chapter: 4,
      narrationHe: 'עכשיו שמים את המזוודות על המשקל. הן נוסעות על מסוע אל המטוס.',
      lines: [ASK_BAGS],
      props: [{ e: '🧳', x: 50, y: 50, s: 34 }],
      choices: [
        { say: 'One suitcase.', he: 'מזוודה אחת.', icon: '1️⃣', next: 'packed' },
        { say: 'Two suitcases.', he: 'שתי מזוודות.', icon: '2️⃣', next: 'packed' },
        { say: 'A hundred suitcases!', he: 'מאה מזוודות!', icon: '💯', silly: SILLY_BAGS },
      ],
    },
    {
      id: 'packed', place: 'checkin', chapter: 4,
      narrationHe: 'דניאל מצביע על התיק הקטן שעל הגב שלכם.',
      lines: [ASK_PACKED],
      props: [{ e: '🎒', x: 50, y: 48, s: 32 }],
      choices: [
        { say: 'Yes, I did.', he: 'כן, ארזתי.', icon: '👍', next: 'pass' },
        { say: 'No, my cat packed it.', he: 'לא, החתול שלי ארז אותו.', icon: '🐱', silly: SILLY_PACKED },
      ],
    },
    {
      id: 'pass', place: 'checkin', chapter: 5,
      narrationHe: 'המדפסת מזמזמת… והנה הכרטיס שלכם, עם השם שלכם עליו!',
      lines: [ASK_PASS],
      props: [{ e: '🎫', x: 50, y: 44, s: 36 }],
      choices: [
        { say: 'Thank you! Where is gate five?', he: 'תודה! איפה שער חמש?', icon: '🚪', reply: ASK_BYE, next: 'gate' },
        { say: 'Thank you! Where is the pool?', he: 'תודה! איפה הבריכה?', icon: '🏊', silly: SILLY_PASS },
      ],
    },
    {
      id: 'gate', place: 'gate', chapter: 6,
      narrationHe: 'הגעתם לשער חמש. מבעד לחלון הענק רואים את המטוס שלכם! ומי עומד ליד הדלת? דניאל!',
      lines: [{ text: "Hello again! It's time to get on the plane.", he: 'שלום שוב! הגיע הזמן לעלות למטוס.' }],
      choices: [
        { say: "Hooray! I'm ready!", he: 'הידד! אני מוכן/ה!', icon: '🙌', next: 'end-london', nextIf: BOARD_TO },
        {
          say: "I'm a little scared.", he: 'אני קצת מפחד/ת.', icon: '🥺', next: 'end-london', nextIf: BOARD_TO,
          reply: { text: "Don't worry! Flying is fun. Look at the clouds!", he: 'אל דאגה! לטוס זה כיף. תסתכלו על העננים!' },
        },
        {
          say: 'Can I see the pilot, please?', he: 'אפשר לראות את הטייס, בבקשה?', icon: '🧑‍✈️', next: 'end-pilot',
        },
        { say: "I'm ready to swim!", he: 'אני מוכן/ה לשחות!', icon: '🏊', silly: { text: 'Swim? You fly in a plane! Try again.', he: 'לשחות? במטוס טסים! נסו שוב.' } },
      ],
    },
    {
      id: 'end-london', place: 'london', chapter: 7, ending: 'london', noCharacter: true,
      narrationHe: 'נחתתם בלונדון! האוטובוסים אדומים, השומרים עם כובעים גבוהים… ויורד גשם.',
      lines: [],
      props: [{ e: '☂️', x: 46, y: 40, s: 40 }],
      choices: [{ say: "Hello, London! Oh, it's raining!", he: 'שלום, לונדון! אוי, יורד גשם!', icon: '☂️' }],
    },
    {
      id: 'end-paris', place: 'paris', chapter: 7, ending: 'paris', noCharacter: true,
      narrationHe: 'נחתתם בפריז! מגדל אייפל ענק מולכם, וריח של קרואסון חם באוויר.',
      lines: [],
      props: [{ e: '🥐', x: 60, y: 48, s: 34 }],
      choices: [{ say: 'Hello, Paris! I love the Eiffel Tower!', he: 'שלום, פריז! אני אוהב/ת את מגדל אייפל!', icon: '🗼' }],
    },
    {
      id: 'end-newyork', place: 'newyork', chapter: 7, ending: 'newyork', noCharacter: true,
      narrationHe: 'נחתתם בניו יורק! בניינים גבוהים עד השמיים ומוניות צהובות בכל מקום.',
      lines: [],
      props: [{ e: '🚕', x: 30, y: 54, s: 34 }],
      choices: [{ say: 'Hello, New York! Wow, so big!', he: 'שלום, ניו יורק! וואו, איזה גדול!', icon: '🗽' }],
    },
    {
      id: 'end-pilot', place: 'gate', chapter: 7, ending: 'pilot',
      narrationHe: 'דניאל לוקח אתכם לתא הטייס. הקפטנית מחייכת ונותנת לכם סיכת כנפיים מוזהבת!',
      lines: [{ text: 'Captain, meet our new junior pilot!', he: 'קפטנית, תכירי את הטייס/ת הצעיר/ה החדש/ה שלנו!' }],
      props: [{ e: '🧑‍✈️', x: 50, y: 40, s: 44 }],
      choices: [{ say: 'Thank you! Goodbye!', he: 'תודה! להתראות!', icon: '👋' }],
    },
  ],
  endings: [
    { id: 'london', emoji: '☂️', title: 'Rainy London', titleHe: 'לונדון הגשומה', descHe: 'טסתם ללונדון — וקיבלתם גשם אנגלי אמיתי!', place: 'london', withCharacter: false },
    { id: 'paris', emoji: '🗼', title: 'Hello, Paris!', titleHe: 'שלום, פריז!', descHe: 'טסתם לפריז וראיתם את מגדל אייפל.', place: 'paris', withCharacter: false },
    { id: 'newyork', emoji: '🗽', title: 'Big New York', titleHe: 'ניו יורק הגדולה', descHe: 'טסתם לניו יורק ופגשתם את פסל החירות.', place: 'newyork', withCharacter: false },
    { id: 'pilot', emoji: '🧑‍✈️', title: 'Junior Pilot', titleHe: 'טייסים צעירים', descHe: 'ביקרתם בתא הטייס וקיבלתם כנפיים מוזהבות.', place: 'gate', props: [{ e: '🎖️', x: 50, y: 36, s: 40 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
