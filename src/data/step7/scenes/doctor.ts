import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — "At the Doctor". Dr. George, a warm and funny family doctor.
 * Light and reassuring: a headache, a sore throat… water, rest and a sticker.
 * Story: the child's teddy bear is "sick" too.
 */

const ASK_GREET: StoryLine = { text: "Hello! What's the matter?", he: 'שלום! מה קרה?' }
const ASK_SINCE: StoryLine = { text: 'Oh dear! Since when?', he: 'אוי ואבוי! ממתי?' }
const ASK_MOUTH: StoryLine = { text: 'Open your mouth, please. Say aah!', he: 'פתחו את הפה, בבקשה. תגידו אההה!' }
const ASK_FEVER: StoryLine = { text: 'Do you have a fever?', he: 'יש לכם חום?' }
const ASK_ADVICE: StoryLine = { text: "Drink lots of water and rest. You'll feel better soon!", he: 'שתו הרבה מים ונוחו. תרגישו טוב בקרוב!' }
const ASK_BYE: StoryLine = { text: 'Here is a sticker for you. Get well soon!', he: 'הנה מדבקה בשבילכם. החלמה מהירה!' }

const THANKS: StoryChoice = { say: 'Thank you, doctor!', he: 'תודה, דוקטור!', icon: '🙏' }
const GRANDMA_SILLY: StoryLine = { text: "Grandma? I'm Dr. George! Try again.", he: "סבתא? אני ד\"ר ג'ורג'! נסו שוב." }
const GRANDMA: StoryChoice = { say: 'Thank you, Grandma!', he: 'תודה, סבתא!', icon: '👵', silly: GRANDMA_SILLY }

const SCENE: Scene = {
  id: 'doctor',
  title: 'At the Doctor',
  titleHe: 'אצל הרופא',
  emoji: '🩺',
  character: { speaker: 'doctor', name: 'Dr. George', nameHe: "ד\"ר ג'ורג'", emoji: '🧑‍⚕️' },
  result: 'items',
  ui: {
    gradient: 'from-teal-400 to-cyan-500',
    cardEn: 'Tell the doctor what hurts — then be the doctor!',
    cardHe: "מספרים לרופא מה כואב — ואז הופכים לד\"ר ג'ורג'!",
    subtitleHe: 'אצל הרופא — מספרים מה כואב באנגלית',
    sign: '🩺 Dr. George',
    stagePlace: 'room',
    introHe: {
      order: "ד\"ר ג'ורג' שואל — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!",
      build: 'הפעם בונים את התשובה לבד: בחרו מה כואב לכם והקישו על המילים לפי הסדר.',
      swap: "מתחלפים! אתם ד\"ר ג'ורג' — שאלו את המטופל מה כואב לו, זכרו מה אמר ותנו לו את הטיפול הנכון.",
    },
    startEn: "Let's go!", startHe: 'נכנסים לרופא',
    swapTab: '🧑‍⚕️ Be Dr. George',
    swapStartEn: 'Open the clinic!', swapStartHe: 'פותחים את המרפאה',
    swapAskHe: "מה ד\"ר ג'ורג' אומר עכשיו?",
    swapSayHe: "אמרו את המשפט של ד\"ר ג'ורג' בקול!",
    makeTitleHe: 'תנו למטופל בדיוק את הטיפול הנכון:',
    serveEn: 'Here you go!', serveHe: 'תנו למטופל',
    doneEn: 'You feel better!', doneHe: 'סיפרתם לרופא מה כואב באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Doctor!', swapDoneHe: "הייתם ד\"ר ג'ורג' ועזרתם למטופל באנגלית!",
    customerName: 'Patient',
    learnHe: 'אלה המשפטים של השיחה אצל הרופא. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לבד!',
  },
  places: {
    waiting: {
      bg: 'linear-gradient(#ecfeff, #cffafe)',
      floor: { bg: 'repeating-linear-gradient(90deg, #99f6e4 0 30px, #ccfbf1 30px 60px)', h: 22, border: '#14b8a6' },
      decor: [
        { e: '🪴', x: 6, y: 34, s: 40 },
        { e: '🐠', x: 30, y: 30, s: 30, anim: 'float' },
        { e: '🕒', x: 52, y: 12, s: 30 },
        { e: '🪑', x: 70, y: 44, s: 36 },
        { e: '🧸', x: 84, y: 40, s: 32 },
      ],
      sign: '🏥 Waiting Room',
    },
    room: {
      bg: 'linear-gradient(#f0fdfa, #ccfbf1)',
      floor: { bg: 'repeating-conic-gradient(#5eead4 0% 25%, #f0fdfa 0% 50%) 0 0 / 28px 28px', h: 22, border: '#0d9488' },
      decor: [
        { e: '📋', x: 8, y: 30, s: 32 },
        { e: '🌡️', x: 24, y: 40, s: 30 },
        { e: '💊', x: 62, y: 34, s: 28 },
        { e: '🩹', x: 78, y: 28, s: 28 },
        { e: '☀️', x: 88, y: 10, s: 30, anim: 'glow' },
      ],
      sign: '🩺 Dr. George',
      counter: { bg: '#2dd4bf', border: '#0f766e', item: '🩺' },
    },
    home: {
      bg: 'linear-gradient(#e0f2fe, #f0f9ff)',
      floor: { bg: '#fde68a', h: 22, border: '#f59e0b' },
      decor: [
        { e: '🛏️', x: 38, y: 40, s: 56 },
        { e: '🪟', x: 10, y: 20, s: 40 },
        { e: '⭐', x: 72, y: 14, s: 26, anim: 'flicker' },
      ],
      sign: '🏠 Home',
    },
  },
  steps: [
    {
      id: 'matter',
      ask: ASK_GREET.text,
      hintHe: 'ספרו לרופא מה כואב. headache = כאב ראש, stomach ache = כאב בטן, sore throat = כאב גרון, earache = כאב אוזן',
      swapHintHe: 'אתם הרופא! קבלו את המטופל ושאלו מה קרה.',
      showCorrect: 3,
      options: [
        { say: 'I have a headache.', correct: true, pick: { slot: 'problem', value: 'headache' }, icon: '🤕', label: 'headache' },
        { say: 'I have a stomach ache.', correct: true, pick: { slot: 'problem', value: 'stomach ache' }, icon: '🤢', label: 'stomach ache' },
        { say: 'I have a sore throat.', correct: true, pick: { slot: 'problem', value: 'sore throat' }, icon: '😷', label: 'sore throat' },
        { say: 'I have an earache.', correct: true, pick: { slot: 'problem', value: 'earache' }, icon: '👂', label: 'earache' },
        { say: 'I have a banana.', correct: false, reaction: "A banana? That's lunch, not a problem! Try again." },
      ],
      distractorWord: 'banana',
      swapSilly: { say: 'Do you like dinosaurs?', reaction: 'Yes! But I feel sick!' },
    },
    {
      id: 'since',
      ask: ASK_SINCE.text,
      hintHe: 'ממתי זה כואב? Since yesterday = מאתמול, Since this morning = מהבוקר',
      swapHintHe: 'שאלו את המטופל ממתי זה כואב לו.',
      options: [
        { say: 'Since yesterday.', correct: true, pick: { slot: 'since', value: 'yesterday' }, icon: '📅', label: 'yesterday' },
        { say: 'Since this morning.', correct: true, pick: { slot: 'since', value: 'this morning' }, icon: '🌅', label: 'this morning' },
        { say: 'Since next year.', correct: false, reaction: "Next year? That didn't happen yet! Try again." },
      ],
      distractorWord: 'tomorrow',
      swapSilly: { say: 'Since when are you a frog?', reaction: "A frog? I'm a kid!" },
    },
    {
      id: 'mouth',
      ask: ASK_MOUTH.text,
      hintHe: 'הרופא רוצה לראות את הגרון. פתחו את הפה ותגידו: Aaah!',
      swapHintHe: 'בקשו מהמטופל לפתוח את הפה.',
      options: [
        { say: 'Aaah!', correct: true },
        { say: 'Moo!', correct: false, reaction: "Moo? You're not a cow! Try again." },
      ],
      distractorWord: 'moo',
      swapSilly: { say: 'Open your shoe, please.', reaction: 'My shoe? Ha ha, no!' },
    },
    {
      id: 'fever',
      ask: ASK_FEVER.text,
      hintHe: 'יש לכם חום? fever = חום. Yes, I do = כן. No, I don\'t = לא.',
      swapHintHe: 'שאלו את המטופל אם יש לו חום.',
      options: [
        { say: 'Yes, I do. I feel hot.', correct: true, pick: { slot: 'fever', value: 'yes' }, icon: '🌡️', label: 'yes' },
        { say: "No, I don't.", correct: true, pick: { slot: 'fever', value: 'no' }, icon: '🙂', label: 'no' },
        { say: 'Yes, I have a pizza.', correct: false, reaction: 'A pizza? That is not a fever! Try again.' },
      ],
      distractorWord: 'pizza',
      swapSilly: { say: 'Do you have a giraffe?', reaction: 'A giraffe? No, silly!' },
    },
    {
      id: 'advice',
      ask: ASK_ADVICE.text,
      hintHe: 'הרופא נותן עצה. הסכימו: I will drink water and rest = אני אשתה מים ואנוח',
      swapHintHe: 'תנו למטופל עצה טובה: לשתות מים ולנוח.',
      options: [
        { say: 'OK. I will drink water and rest.', correct: true },
        { say: 'OK. I will eat ten cakes.', correct: false, reaction: 'Ten cakes? Not today! Try again.' },
      ],
      distractorWord: 'cakes',
      swapSilly: { say: 'Eat ten ice-creams, please!', reaction: 'Yay! Wait... really?' },
    },
    {
      id: 'goodbye',
      ask: ASK_BYE.text,
      hintHe: 'הודו לרופא. Thank you, doctor! = תודה, דוקטור!',
      swapHintHe: 'תנו למטופל מדבקה ואחלו לו החלמה מהירה.',
      options: [
        { say: THANKS.say, correct: true },
        { say: GRANDMA.say, correct: false, reaction: GRANDMA_SILLY.text },
      ],
      distractorWord: 'grandma',
      swapSilly: { say: 'Get well soon, potato!', reaction: "Potato? I'm not a potato!" },
    },
  ],
  makeAfterStep: 'fever',
  makeSlots: [
    { slot: 'problem', titleHe: 'מה כואב? בחרו את הטיפול המתאים:', choices: [
      { value: 'headache', icon: '💊', label: 'headache pill' },
      { value: 'stomach ache', icon: '🍵', label: 'tummy tea' },
      { value: 'sore throat', icon: '🍯', label: 'throat honey' },
      { value: 'earache', icon: '💧', label: 'ear drops' },
    ] },
    { slot: 'since', titleHe: 'ממתי? כתבו בתיק של המטופל:', choices: [
      { value: 'yesterday', icon: '📅', label: 'since yesterday' },
      { value: 'this morning', icon: '🌅', label: 'since this morning' },
    ] },
    { slot: 'fever', titleHe: 'יש חום? מה עושים?', choices: [
      { value: 'yes', icon: '🛌', label: 'stay in bed' },
      { value: 'no', icon: '🏫', label: 'go to school' },
    ] },
  ],
  lines: {
    farewell: 'Bye-bye! Feel better soon!',
    makeRight: 'Yes! I feel better already!',
    makeWrong: "Hmm, that's not right for me. Try again.",
  },
  phrases: [
    { speaker: 'doctor', en: ASK_GREET.text, he: ASK_GREET.he },
    { speaker: 'kid', en: 'I have a headache.', he: 'יש לי כאב ראש.' },
    { speaker: 'kid', en: 'I have a sore throat.', he: 'כואב לי הגרון.' },
    { speaker: 'doctor', en: ASK_SINCE.text, he: ASK_SINCE.he },
    { speaker: 'kid', en: 'Since yesterday.', he: 'מאתמול.' },
    { speaker: 'doctor', en: ASK_MOUTH.text, he: ASK_MOUTH.he },
    { speaker: 'kid', en: 'Aaah!', he: 'אההה!' },
    { speaker: 'doctor', en: ASK_FEVER.text, he: ASK_FEVER.he },
    { speaker: 'kid', en: "No, I don't.", he: 'לא, אין לי.' },
    { speaker: 'doctor', en: ASK_ADVICE.text, he: ASK_ADVICE.he },
    { speaker: 'kid', en: 'OK. I will drink water and rest.', he: 'בסדר. אני אשתה מים ואנוח.' },
    { speaker: 'doctor', en: ASK_BYE.text, he: ASK_BYE.he },
    { speaker: 'kid', en: THANKS.say, he: THANKS.he },
  ],
}

const COME_IN: StoryLine = { text: 'Come in, come in!', he: 'היכנסו, היכנסו!' }

const STORY: Story = {
  id: 'doctor-story',
  title: "Teddy's Check-Up",
  titleHe: 'גם הדובי צריך רופא',
  start: 'waiting',
  coverPlace: 'waiting',
  introHe: [
    "🗨️ ד\"ר ג'ורג' מדבר — ואתם בוחרים מה לענות.",
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '🏥', he: 'חדר המתנה' },
    { icon: '👋', he: 'מה קרה?' },
    { icon: '👅', he: 'אההה' },
    { icon: '🌡️', he: 'חום' },
    { icon: '🧸', he: 'הדובי' },
    { icon: '🩹', he: 'פלסטרים' },
    { icon: '💧', he: 'עצה' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'waiting', place: 'waiting', chapter: 0, noCharacter: true,
      narrationHe: 'אתם לא מרגישים כל כך טוב. אתם מחכים אצל הרופא, ומחבקים חזק את הדובי שלכם.',
      lines: [],
      props: [{ e: '🧸', x: 46, y: 46, s: 40 }],
      choices: [
        { say: 'Knock, knock!', he: 'טוק טוק!', icon: '🚪', reply: COME_IN, next: 'matter' },
        { say: 'Hello! Is anybody here?', he: 'שלום! יש פה מישהו?', icon: '🗣️', reply: COME_IN, next: 'matter' },
      ],
    },
    {
      id: 'matter', place: 'room', chapter: 1,
      narrationHe: "ד\"ר ג'ורג' מחייך חיוך גדול. יש לו משקפיים מצחיקים וסטטוסקופ על הצוואר.",
      lines: [ASK_GREET],
      showChoices: 3,
      choices: [
        { say: 'I have a headache.', he: 'יש לי כאב ראש.', icon: '🤕', set: { problem: 'headache' }, next: 'since' },
        { say: 'I have a stomach ache.', he: 'יש לי כאב בטן.', icon: '🤢', set: { problem: 'stomach' }, next: 'since' },
        { say: 'I have a sore throat.', he: 'כואב לי הגרון.', icon: '😷', set: { problem: 'throat' }, next: 'since' },
        { say: 'I have an earache.', he: 'כואבת לי האוזן.', icon: '👂', set: { problem: 'ear' }, next: 'since' },
        { say: 'I have a banana.', he: 'יש לי בננה.', icon: '🍌', silly: { text: "A banana? That's lunch, not a problem! Try again.", he: 'בננה? זו ארוחת צהריים, לא בעיה! נסו שוב.' } },
      ],
    },
    {
      id: 'since', place: 'room', chapter: 1,
      narrationHe: "ד\"ר ג'ורג' כותב משהו בדף שלו. הוא רוצה לדעת עוד.",
      lines: [ASK_SINCE],
      choices: [
        { say: 'Since yesterday.', he: 'מאתמול.', icon: '📅', next: 'mouth' },
        { say: 'Since this morning.', he: 'מהבוקר.', icon: '🌅', next: 'mouth' },
        { say: 'Since next year.', he: 'מהשנה הבאה.', icon: '🔮', silly: { text: "Next year? That didn't happen yet! Try again.", he: 'השנה הבאה? זה עוד לא קרה! נסו שוב.' } },
      ],
    },
    {
      id: 'mouth', place: 'room', chapter: 2,
      narrationHe: 'הרופא מוציא מקל עץ קטן ופנס. לא כואב בכלל — רק מצחיק!',
      lines: [ASK_MOUTH],
      props: [{ e: '🔦', x: 60, y: 40, s: 30 }],
      choices: [
        { say: 'Aaah!', he: 'אההה!', icon: '😮', next: 'fever' },
        { say: 'Moo!', he: 'מווו!', icon: '🐮', silly: { text: "Moo? You're not a cow! Try again.", he: 'מווו? אתם לא פרה! נסו שוב.' } },
      ],
    },
    {
      id: 'fever', place: 'room', chapter: 3,
      narrationHe: 'עכשיו בודקים חום. המדחום מצפצף: ביפ, ביפ!',
      lines: [ASK_FEVER],
      props: [{ e: '🌡️', x: 50, y: 40, s: 36 }],
      choices: [
        { say: 'Yes, I do. I feel hot.', he: 'כן, יש לי. חם לי.', icon: '🥵', reply: { text: "Just a little hot. Don't worry, you'll be fine!", he: 'רק קצת חם. אל דאגה, יהיה בסדר!' }, next: 'teddy' },
        { say: "No, I don't.", he: 'לא, אין לי.', icon: '🙂', next: 'teddy' },
        { say: 'Yes, I have a pizza.', he: 'כן, יש לי פיצה.', icon: '🍕', silly: { text: 'A pizza? That is not a fever! Try again.', he: 'פיצה? זה לא חום! נסו שוב.' } },
      ],
    },
    {
      id: 'teddy', place: 'room', chapter: 4,
      narrationHe: 'פתאום הרופא מסתכל על הדובי שלכם. לדובי יש קרע קטן ביד…',
      lines: [{ text: 'And who is this? Is your teddy sick too?', he: 'ומי זה? גם הדובי שלכם חולה?' }],
      props: [{ e: '🧸', x: 46, y: 44, s: 44 }],
      choices: [
        {
          say: 'Yes! Can you help Teddy, please?', he: 'כן! אתה יכול לעזור לדובי, בבקשה?', icon: '🧸',
          reply: { text: 'Of course! I need three bandages. Can you find them?', he: 'בטח! אני צריך שלושה פלסטרים. תמצאו אותם?' },
          set: { teddy: 'helped' }, next: 'find',
        },
        {
          say: 'No, Teddy is fine. He is very brave!', he: 'לא, הדובי בסדר. הוא אמיץ מאוד!', icon: '💪',
          reply: { text: 'What a brave bear!', he: 'איזה דוב אמיץ!' }, next: 'advice',
        },
        { say: 'Teddy is a dinosaur.', he: 'הדובי הוא דינוזאור.', icon: '🦖', silly: { text: 'A dinosaur? He looks like a bear to me! Try again.', he: 'דינוזאור? הוא נראה לי כמו דוב! נסו שוב.' } },
      ],
    },
    {
      id: 'find', place: 'room', chapter: 5, next: 'advice',
      narrationHe: 'הפלסטרים התפזרו בכל החדר! עזרו לרופא למצוא אותם.',
      lines: [],
      event: {
        kind: 'find', target: '🩹', count: 3,
        decoys: ['🧦', '🍬', '🖍️', '🎈', '🍌', '🧃', '📎'],
        promptHe: "מצאו את 3 הפלסטרים של ד\"ר ג'ורג'!",
        doneLine: { text: 'One, two, three! Thank you, little nurse!', he: 'אחת, שתיים, שלוש! תודה, אחות קטנה!' },
      },
    },
    {
      id: 'advice', place: 'room', chapter: 6,
      narrationHe: 'הבדיקה נגמרה. אין מה לדאוג! עכשיו הרופא נותן עצה טובה.',
      lines: [ASK_ADVICE],
      choices: [
        {
          say: 'OK. I will drink water and rest.', he: 'בסדר. אני אשתה מים ואנוח.', icon: '💧', next: 'end-brave',
          nextIf: [{ key: 'problem', value: 'throat', next: 'end-icecream' }, { key: 'teddy', value: 'helped', next: 'end-teddy' }],
        },
        {
          say: 'Can I be a doctor too?', he: 'גם אני יכול/ה להיות רופא/ה?', icon: '🩺', next: 'end-doctor',
        },
        { say: 'OK. I will eat ten cakes.', he: 'בסדר. אני אוכל עשר עוגות.', icon: '🎂', silly: { text: 'Ten cakes? Not today! Try again.', he: 'עשר עוגות? לא היום! נסו שוב.' } },
      ],
    },
    {
      id: 'end-brave', place: 'room', chapter: 7, ending: 'brave',
      narrationHe: 'הרופא מוציא מדבקה נוצצת עם כוכב ומדביק לכם על החולצה.',
      lines: [ASK_BYE],
      props: [{ e: '🌟', x: 50, y: 40, s: 40 }],
      choices: [THANKS, GRANDMA],
    },
    {
      id: 'end-icecream', place: 'room', chapter: 7, ending: 'icecream',
      narrationHe: 'הרופא קורץ ופותח מקרר קטן מאחורי השולחן…',
      lines: [{ text: 'For a sore throat, ice-cream helps! Here you go!', he: 'לכאב גרון, גלידה עוזרת! בבקשה!' }],
      props: [{ e: '🍦', x: 50, y: 40, s: 44 }],
      choices: [{ say: 'Yum! Thank you, doctor!', he: 'יאמי! תודה, דוקטור!', icon: '🍦' }, GRANDMA],
    },
    {
      id: 'end-teddy', place: 'room', chapter: 7, ending: 'teddy',
      narrationHe: 'לדובי יש עכשיו שלושה פלסטרים צבעוניים — והוא נראה מאושר!',
      lines: [{ text: 'Look! Teddy feels better too!', he: 'תראו! גם הדובי מרגיש טוב יותר!' }],
      props: [{ e: '🧸', x: 46, y: 42, s: 46 }, { e: '🩹', x: 54, y: 36, s: 24 }],
      choices: [THANKS, GRANDMA],
    },
    {
      id: 'end-doctor', place: 'room', chapter: 7, ending: 'doctor',
      narrationHe: "ד\"ר ג'ורג' צוחק ונותן לכם סטטוסקופ אמיתי. המטופל הראשון שלכם: הדובי!",
      lines: [{ text: 'Of course! Here is your stethoscope, Doctor!', he: 'בטח! הנה הסטטוסקופ שלכם, דוקטור!' }],
      props: [{ e: '🩺', x: 50, y: 40, s: 40 }],
      choices: [{ say: 'Say aah, Teddy!', he: 'תגיד אההה, דובי!', icon: '🧸' }],
    },
  ],
  endings: [
    { id: 'brave', emoji: '🌟', title: 'Brave Patient', titleHe: 'מטופלים אמיצים', descHe: 'הייתם אמיצים וקיבלתם מדבקה נוצצת.', place: 'room', props: [{ e: '🌟', x: 50, y: 36, s: 44 }] },
    { id: 'icecream', emoji: '🍦', title: 'Ice-Cream Cure', titleHe: 'גלידה לגרון', descHe: 'כאב לכם הגרון — והרופא נתן לכם גלידה!', place: 'room', props: [{ e: '🍦', x: 50, y: 36, s: 46 }] },
    { id: 'teddy', emoji: '🧸', title: 'Teddy Feels Better', titleHe: 'הדובי הבריא', descHe: 'מצאתם את הפלסטרים, ועכשיו גם הדובי מרגיש טוב.', place: 'home', withCharacter: false, props: [{ e: '🧸', x: 46, y: 40, s: 50 }, { e: '🩹', x: 54, y: 34, s: 26 }] },
    { id: 'doctor', emoji: '🩺', title: 'Little Doctor', titleHe: 'רופאים קטנים', descHe: 'קיבלתם סטטוסקופ ובדקתם את הדובי בעצמכם.', place: 'home', withCharacter: false, props: [{ e: '🩺', x: 36, y: 38, s: 40 }, { e: '🧸', x: 56, y: 40, s: 44 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
