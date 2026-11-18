import type { SceneBundle, Scene, Story, StoryChoice, StoryLine } from '../types'

/**
 * Scene — Asking for Directions. The child is lost in town and asks Officer
 * Mike the way: where is the zoo / library / beach, what is next to it, then
 * repeats the directions back. Story: the wind blows the town map away (find
 * the map pieces), and the turn at the corner decides where you end up.
 */

const ASK_LOST: StoryLine = { text: 'Hello! Are you lost?', he: 'שלום! הלכתם לאיבוד?' }
const ASK_NEAR: StoryLine = { text: 'Okay! Do you know what is next to it?', he: 'בסדר! אתם יודעים מה נמצא ליד זה?' }
const ASK_BACK: StoryLine = { text: 'I know! Go straight and turn left. Can you say it back?', he: 'אני יודע! לכו ישר ופנו שמאלה. אתם יכולים לחזור על זה?' }
const ASK_MORE: StoryLine = { text: 'Very good! Do you have any questions?', he: 'מצוין! יש לכם שאלות?' }
const NOT_FAR: StoryLine = { text: "No, it's not far. Just five minutes.", he: 'לא, זה לא רחוק. רק חמש דקות.' }
const WELCOME: StoryLine = { text: "You're welcome! Have a nice day!", he: 'בשמחה! שיהיה לכם יום נעים!' }

const WHERE = (place: string, he: string, icon: string, value: string, reply: StoryLine): StoryChoice =>
  ({ say: `Yes. Excuse me, where is ${place}, please?`, he: `כן. סליחה, איפה ${he}, בבקשה?`, icon, reply, set: { place: value }, next: 'near' })

const MOON: StoryChoice = { say: 'Yes. Excuse me, where is the moon, please?', he: 'כן. סליחה, איפה הירח, בבקשה?', icon: '🌙', silly: { text: "The moon? It's up in the sky! Try again.", he: 'הירח? הוא למעלה בשמיים! נסו שוב.' } }
const THANKS: StoryChoice = { say: 'Thank you very much!', he: 'תודה רבה!', icon: '🙏' }
const MR_BANANA: StoryChoice = { say: 'Goodbye, Mister Banana!', he: 'להתראות, מר בננה!', icon: '🍌', silly: { text: "Mister Banana? I'm Officer Mike! Try again.", he: 'מר בננה? אני השוטר מייק! נסו שוב.' } }

const SCENE: Scene = {
  id: 'directions',
  title: 'Asking for Directions',
  titleHe: 'שואלים את הדרך',
  emoji: '🗺️',
  character: { speaker: 'officer', name: 'Officer Mike', nameHe: 'השוטר מייק', emoji: '👮' },
  result: 'items',
  ui: {
    gradient: 'from-sky-400 to-blue-500',
    cardEn: 'Ask the way — then be the police officer!',
    cardHe: 'שואלים איך מגיעים — ואז הופכים לשוטר מייק!',
    subtitleHe: 'שואלים את הדרך — מתמצאים בעיר באנגלית',
    sign: '🗺️ Sunny Town',
    stagePlace: 'town',
    introHe: {
      order: 'השוטר מייק שואל — אתם בוחרים מה לענות. אחרי שבוחרים, אמרו את המשפט בקול!',
      build: 'הפעם בונים את התשובה לבד: בחרו מה אתם רוצים והקישו על המילים לפי הסדר.',
      swap: 'מתחלפים! אתם השוטר מייק — שאלו את הילד שהלך לאיבוד, זכרו לאן הוא צריך להגיע וסמנו לו את הדרך.',
    },
    startEn: "Let's go!", startHe: 'יוצאים לעיר',
    swapTab: '👮 Be Officer Mike',
    swapStartEn: 'Start your shift!', swapStartHe: 'מתחילים משמרת',
    swapAskHe: 'מה השוטר מייק אומר עכשיו?',
    swapSayHe: 'אמרו את המשפט של השוטר מייק בקול!',
    makeTitleHe: 'סמנו על המפה בדיוק לאן הילד צריך להגיע:',
    serveEn: 'This way!', serveHe: 'הראו לו את הדרך',
    doneEn: 'You found the way!', doneHe: 'שאלתם את הדרך באנגלית — כל הכבוד!',
    swapDoneEn: 'Great job, Officer!', swapDoneHe: 'הייתם השוטר מייק ועזרתם לילד למצוא את הדרך באנגלית!',
    customerName: 'Lost kid',
    learnHe: 'אלה המשפטים של השיחה עם השוטר. לחצו על 🔊 כדי לשמוע — ואמרו אותם בקול. אחר כך נסו לשאול את הדרך לבד!',
  },
  places: {
    town: {
      bg: 'linear-gradient(#bae6fd, #e0f2fe 70%)',
      floor: { bg: 'repeating-linear-gradient(90deg, #64748b 0 40px, #f8fafc 40px 56px, #64748b 56px 96px)', h: 18, border: '#475569' },
      decor: [
        { e: '☁️', x: 12, y: 6, s: 30, anim: 'cloud' },
        { e: '🏫', x: 8, y: 32, s: 46 },
        { e: '🏦', x: 30, y: 34, s: 44 },
        { e: '🌳', x: 50, y: 34, s: 44 },
        { e: '🏪', x: 68, y: 34, s: 44 },
        { e: '🚦', x: 88, y: 36, s: 36 },
      ],
      sign: '🗺️ Sunny Town',
    },
    crossroads: {
      bg: 'linear-gradient(#e0f2fe, #f0f9ff)',
      floor: { bg: 'linear-gradient(90deg, #64748b 0 40%, #94a3b8 40% 60%, #64748b 60%)', h: 26, border: '#334155' },
      decor: [
        { e: '⬅️', x: 22, y: 30, s: 40 },
        { e: '🪧', x: 46, y: 32, s: 50 },
        { e: '➡️', x: 70, y: 30, s: 40 },
        { e: '🐦', x: 86, y: 10, s: 24, anim: 'float' },
      ],
      sign: '🚦 Corner',
    },
    zoo: {
      bg: 'linear-gradient(#bbf7d0, #ecfccb)',
      floor: { bg: 'repeating-linear-gradient(90deg, #65a30d 0 22px, #84cc16 22px 44px)', h: 22, border: '#4d7c0f' },
      decor: [
        { e: '🦒', x: 10, y: 26, s: 50 },
        { e: '🌴', x: 32, y: 28, s: 44 },
        { e: '🐘', x: 52, y: 36, s: 44 },
        { e: '🦁', x: 74, y: 38, s: 38 },
        { e: '🐒', x: 88, y: 26, s: 32, anim: 'float' },
      ],
      sign: '🦁 Sunny Zoo',
    },
    beach: {
      bg: 'linear-gradient(#7dd3fc 0 45%, #38bdf8 45% 62%, #fde68a 62%)',
      floor: { bg: 'linear-gradient(#fcd34d, #fbbf24)', h: 20, border: '#f59e0b' },
      decor: [
        { e: '☀️', x: 84, y: 6, s: 40, anim: 'glow' },
        { e: '⛵', x: 30, y: 40, s: 36, anim: 'float' },
        { e: '🏖️', x: 58, y: 48, s: 40 },
        { e: '🐚', x: 12, y: 54, s: 26 },
      ],
      sign: '🏖️ Sunny Beach',
    },
    library: {
      bg: 'linear-gradient(#fef3c7, #fde68a)',
      floor: { bg: 'repeating-linear-gradient(90deg, #92400e 0 26px, #a16207 26px 52px)', h: 22, border: '#78350f' },
      decor: [
        { e: '📚', x: 10, y: 30, s: 42 },
        { e: '📖', x: 30, y: 38, s: 36 },
        { e: '📚', x: 50, y: 30, s: 42 },
        { e: '🦉', x: 70, y: 28, s: 36 },
        { e: '📚', x: 88, y: 34, s: 42 },
      ],
      sign: '📚 Library',
    },
  },
  steps: [
    {
      id: 'greet',
      ask: ASK_LOST.text,
      hintHe: 'שאלו איפה המקום: Excuse me, where is…? = סליחה, איפה…? — the zoo = גן החיות, the library = הספרייה, the beach = החוף, the playground = גן המשחקים',
      swapHintHe: 'אתם השוטר מייק! שאלו את הילד אם הוא הלך לאיבוד.',
      showCorrect: 3,
      options: [
        { say: 'Yes. Excuse me, where is the zoo, please?', correct: true, pick: { slot: 'place', value: 'zoo' }, icon: '🦁', label: 'the zoo' },
        { say: 'Yes. Excuse me, where is the library, please?', correct: true, pick: { slot: 'place', value: 'library' }, icon: '📚', label: 'the library' },
        { say: 'Yes. Excuse me, where is the beach, please?', correct: true, pick: { slot: 'place', value: 'beach' }, icon: '🏖️', label: 'the beach' },
        { say: 'Yes. Excuse me, where is the playground, please?', correct: true, pick: { slot: 'place', value: 'playground' }, icon: '🛝', label: 'the playground' },
        { say: MOON.say, correct: false, reaction: MOON.silly!.text },
      ],
      distractorWord: 'moon',
      swapSilly: { say: 'Are you a lost penguin?', reaction: "A penguin? No! I'm a kid!" },
    },
    {
      id: 'near',
      ask: ASK_NEAR.text,
      hintHe: 'מה נמצא ליד? next to = ליד, opposite = מול — the park = הפארק, the school = בית הספר, the bank = הבנק',
      swapHintHe: 'שאלו את הילד מה נמצא ליד המקום שהוא מחפש.',
      options: [
        { say: "Yes. It's next to the park.", correct: true, pick: { slot: 'landmark', value: 'park' }, icon: '🌳', label: 'next to the park' },
        { say: "Yes. It's opposite the school.", correct: true, pick: { slot: 'landmark', value: 'school' }, icon: '🏫', label: 'opposite the school' },
        { say: "Yes. It's next to the bank.", correct: true, pick: { slot: 'landmark', value: 'bank' }, icon: '🏦', label: 'next to the bank' },
        { say: "Yes. It's next to my nose.", correct: false, reaction: 'Your nose? Ha ha! Try again.' },
      ],
      distractorWord: 'nose',
      swapSilly: { say: 'Is it next to the moon?', reaction: "The moon? No! It's in town!" },
    },
    {
      id: 'back',
      ask: ASK_BACK.text,
      hintHe: 'חזרו על ההוראות: go straight = לכו ישר, turn left = פנו שמאלה, turn right = פנו ימינה. הקשיבו טוב!',
      swapHintHe: 'הסבירו לילד את הדרך ובקשו שיחזור עליה.',
      options: [
        { say: 'Go straight and turn left.', correct: true },
        { say: 'Go straight and turn right.', correct: false, reaction: 'Right? No, turn left! Try again.' },
        { say: 'Go straight and turn into a frog!', correct: false, reaction: 'A frog? Ribbit! Ha ha! Try again.' },
      ],
      distractorWord: 'right',
      swapSilly: { say: 'Go up the tree and turn left!', reaction: "Up a tree? I can't climb!" },
    },
    {
      id: 'far',
      ask: ASK_MORE.text,
      hintHe: 'שאלו אם זה רחוק. Is it far? = זה רחוק?',
      swapHintHe: 'שאלו את הילד אם יש לו עוד שאלות.',
      options: [
        { say: 'Yes. Is it far?', correct: true },
        { say: 'Yes. Is it made of cheese?', correct: false, reaction: 'Cheese? Ha ha! No! Try again.' },
      ],
      distractorWord: 'cheese',
      swapSilly: { say: 'Do you want to swim there?', reaction: 'Swim? No! I want to walk!' },
    },
    {
      id: 'thanks',
      ask: NOT_FAR.text,
      hintHe: 'הודו לשוטר. Thank you very much = תודה רבה',
      swapHintHe: 'אמרו לילד שזה לא רחוק — רק חמש דקות.',
      options: [
        { say: THANKS.say, correct: true },
        { say: 'Five years? Oh no!', correct: false, reaction: 'Not five years! Five minutes! Try again.' },
      ],
      distractorWord: 'years',
      swapSilly: { say: "It's very far. Take a rocket!", reaction: 'A rocket? Wow! Ha ha!' },
    },
    {
      id: 'goodbye',
      ask: WELCOME.text,
      hintHe: 'נפרדו מהשוטר מייק.',
      swapHintHe: 'אמרו לילד "בשמחה" ואחלו לו יום נעים.',
      options: [
        { say: 'Goodbye, Officer Mike!', correct: true },
        { say: MR_BANANA.say, correct: false, reaction: MR_BANANA.silly!.text },
      ],
      distractorWord: 'banana',
      swapSilly: { say: 'Have a nice night!', reaction: "Night? It's the morning!" },
    },
  ],
  makeAfterStep: 'near',
  makeSlots: [
    { slot: 'place', titleHe: 'לאן הוא הולך?', choices: [
      { value: 'zoo', icon: '🦁', label: 'the zoo' },
      { value: 'library', icon: '📚', label: 'the library' },
      { value: 'beach', icon: '🏖️', label: 'the beach' },
      { value: 'playground', icon: '🛝', label: 'the playground' },
    ] },
    { slot: 'landmark', titleHe: 'מה נמצא ליד?', choices: [
      { value: 'park', icon: '🌳', label: 'next to the park' },
      { value: 'school', icon: '🏫', label: 'opposite the school' },
      { value: 'bank', icon: '🏦', label: 'next to the bank' },
    ] },
  ],
  lines: {
    farewell: 'Bye! Be safe!',
    makeRight: "Yes! That's the way! Thank you!",
    makeWrong: "Hmm, that's not where I want to go. Try again.",
  },
  phrases: [
    { speaker: 'officer', en: ASK_LOST.text, he: ASK_LOST.he },
    { speaker: 'kid', en: 'Yes. Excuse me, where is the zoo, please?', he: 'כן. סליחה, איפה גן החיות, בבקשה?' },
    { speaker: 'officer', en: ASK_NEAR.text, he: ASK_NEAR.he },
    { speaker: 'kid', en: "Yes. It's next to the park.", he: 'כן. זה ליד הפארק.' },
    { speaker: 'kid', en: "Yes. It's opposite the school.", he: 'כן. זה מול בית הספר.' },
    { speaker: 'officer', en: ASK_BACK.text, he: ASK_BACK.he },
    { speaker: 'kid', en: 'Go straight and turn left.', he: 'ללכת ישר ולפנות שמאלה.' },
    { speaker: 'officer', en: ASK_MORE.text, he: ASK_MORE.he },
    { speaker: 'kid', en: 'Yes. Is it far?', he: 'כן. זה רחוק?' },
    { speaker: 'officer', en: NOT_FAR.text, he: NOT_FAR.he },
    { speaker: 'kid', en: 'Thank you very much!', he: 'תודה רבה!' },
    { speaker: 'officer', en: WELCOME.text, he: WELCOME.he },
    { speaker: 'kid', en: 'Goodbye, Officer Mike!', he: 'להתראות, השוטר מייק!' },
  ],
}

const STORY: Story = {
  id: 'directions-story',
  title: 'The Lost Map',
  titleHe: 'המפה האבודה',
  start: 'wind',
  coverPlace: 'town',
  introHe: [
    '🗨️ השוטר מייק מדבר — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור — ואת המקום שאליו תגיעו.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '🌬️', he: 'הרוח' },
    { icon: '🧩', he: 'חלקי המפה' },
    { icon: '👮', he: 'השוטר' },
    { icon: '🏫', he: 'מה ליד?' },
    { icon: '🧭', he: 'חוזרים על הדרך' },
    { icon: '❓', he: 'רחוק?' },
    { icon: '🚦', he: 'בפינה' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'wind', place: 'town', chapter: 0, noCharacter: true,
      narrationHe: 'אתם בעיר חדשה עם מפה ביד. פתאום — ווווש! רוח חזקה קורעת את המפה, והחלקים עפים לכל עבר!',
      props: [{ e: '🌬️', x: 20, y: 30, s: 44 }, { e: '🧩', x: 60, y: 22, s: 28 }],
      lines: [],
      choices: [
        { say: 'Oh no! My map!', he: 'אוי לא! המפה שלי!', icon: '😱', next: 'find' },
        { say: 'Come back, map!', he: 'מפה, תחזרי!', icon: '🏃', next: 'find' },
      ],
    },
    {
      id: 'find', place: 'town', chapter: 1, noCharacter: true, next: 'greet',
      narrationHe: 'חלקי המפה מתעופפים בין העלים, הציפורים והבלונים. תפסו אותם!',
      lines: [],
      event: {
        kind: 'find', target: '🧩', count: 4,
        decoys: ['🍂', '🍃', '🐦', '🎈', '🦋', '✉️', '📄'],
        promptHe: 'מצאו את 4 חלקי המפה!',
        doneLine: { text: 'Here is the last piece! Now your map is ready.', he: 'הנה החלק האחרון! עכשיו המפה שלכם מוכנה.' },
      },
    },
    {
      id: 'greet', place: 'town', chapter: 2,
      narrationHe: 'שוטר חייכן עם כובע כחול עוזר לכם להדביק את המפה. אבל… איפה אתם בכלל?',
      lines: [ASK_LOST],
      showChoices: 3,
      choices: [
        WHERE('the zoo', 'גן החיות', '🦁', 'zoo', { text: 'The zoo? I love the monkeys!', he: 'גן החיות? אני אוהב את הקופים!' }),
        WHERE('the library', 'הספרייה', '📚', 'library', { text: 'The library? I love books!', he: 'הספרייה? אני אוהב ספרים!' }),
        WHERE('the beach', 'החוף', '🏖️', 'beach', { text: 'The beach? Lucky you!', he: 'החוף? איזה מזל יש לכם!' }),
        MOON,
      ],
    },
    {
      id: 'near', place: 'town', chapter: 3,
      narrationHe: 'השוטר מייק מגרד בסנטר ומסתכל על המפה.',
      lines: [ASK_NEAR],
      choices: [
        { say: "Yes. It's next to the park.", he: 'כן. זה ליד הפארק.', icon: '🌳', next: 'back' },
        { say: "Yes. It's opposite the school.", he: 'כן. זה מול בית הספר.', icon: '🏫', next: 'back' },
        { say: "Yes. It's next to the bank.", he: 'כן. זה ליד הבנק.', icon: '🏦', next: 'back' },
        { say: "Yes. It's next to my nose.", he: 'כן. זה ליד האף שלי.', icon: '👃', silly: { text: 'Your nose? Ha ha! Try again.', he: 'האף שלכם? חה חה! נסו שוב.' } },
      ],
    },
    {
      id: 'back', place: 'town', chapter: 4,
      narrationHe: 'השוטר מצביע על הרחוב. הקשיבו טוב — ימינה או שמאלה?',
      props: [{ e: '⬆️', x: 46, y: 40, s: 34 }, { e: '⬅️', x: 34, y: 30, s: 30 }],
      lines: [ASK_BACK],
      choices: [
        { say: 'Go straight and turn left.', he: 'ללכת ישר ולפנות שמאלה.', icon: '⬅️', next: 'far' },
        { say: 'Go straight and turn right.', he: 'ללכת ישר ולפנות ימינה.', icon: '➡️', silly: { text: 'Right? No, turn left! Try again.', he: 'ימינה? לא, פונים שמאלה! נסו שוב.' } },
        { say: 'Go straight and turn into a frog!', he: 'ללכת ישר ולהפוך לצפרדע!', icon: '🐸', silly: { text: 'A frog? Ribbit! Ha ha! Try again.', he: 'צפרדע? קווא קווא! חה חה! נסו שוב.' } },
      ],
    },
    {
      id: 'far', place: 'town', chapter: 5,
      narrationHe: 'אתם כמעט מוכנים לצאת לדרך. עוד שאלה אחת קטנה…',
      lines: [ASK_MORE],
      choices: [
        { say: 'Yes. Is it far?', he: 'כן. זה רחוק?', icon: '📏', reply: NOT_FAR, next: 'corner' },
        { say: 'Yes. Is it made of cheese?', he: 'כן. זה עשוי מגבינה?', icon: '🧀', silly: { text: 'Cheese? Ha ha! No! Try again.', he: 'גבינה? חה חה! לא! נסו שוב.' } },
      ],
    },
    {
      id: 'corner', place: 'crossroads', chapter: 6, noCharacter: true,
      narrationHe: 'הלכתם ישר והגעתם לפינה. יש שלט עם חץ שמאלה וחץ ימינה. לאן פונים?',
      lines: [],
      choices: [
        {
          say: 'Turn left!', he: 'פונים שמאלה!', icon: '⬅️', next: 'end-zoo',
          nextIf: [{ key: 'place', value: 'beach', next: 'end-beach' }, { key: 'place', value: 'library', next: 'end-library' }],
        },
        { say: 'Turn right!', he: 'פונים ימינה!', icon: '➡️', next: 'end-icecream' },
        { say: 'Turn around and around!', he: 'מסתובבים סביב סביב!', icon: '🌀', silly: { text: 'Ha ha! Now you are dizzy! Try again.', he: 'חה חה! עכשיו מסתובב לכם הראש! נסו שוב.' } },
      ],
    },
    {
      id: 'end-zoo', place: 'zoo', chapter: 7, ending: 'zoo',
      narrationHe: 'הגעתם! ג׳ירפה מציצה מעל הגדר ואומרת שלום.',
      lines: [{ text: 'Here is the zoo! Look, a giraffe!', he: 'הנה גן החיות! תראו, ג׳ירפה!' }],
      choices: [THANKS, MR_BANANA],
    },
    {
      id: 'end-beach', place: 'beach', chapter: 7, ending: 'beach',
      narrationHe: 'שמש, גלים וחול חם. הגעתם לחוף!',
      lines: [{ text: 'Here is the beach! Have fun in the sun!', he: 'הנה החוף! תיהנו בשמש!' }],
      choices: [THANKS, MR_BANANA],
    },
    {
      id: 'end-library', place: 'library', chapter: 7, ending: 'library',
      narrationHe: 'שקט… מלא ספרים מסביב, וינשוף חכם מסתכל עליכם מהמדף.',
      lines: [{ text: 'Here is the library! Shh! Enjoy your book!', he: 'הנה הספרייה! ששש… תיהנו מהספר!' }],
      choices: [THANKS, MR_BANANA],
    },
    {
      id: 'end-icecream', place: 'park', chapter: 7, ending: 'icecream',
      narrationHe: 'אופס, פניתם ימינה! אבל רגע… יש פה גלידרייה!',
      props: [{ e: '🍦', x: 50, y: 36, s: 46 }],
      lines: [{ text: 'Oops! Wrong way! But look, ice cream! One for you?', he: 'אופס! דרך לא נכונה! אבל תראו… גלידה! אחת בשבילכם?' }],
      choices: [{ say: 'Yes, please! Thank you!', he: 'כן, בבקשה! תודה!', icon: '🍦' }],
    },
  ],
  endings: [
    { id: 'zoo', emoji: '🦁', title: 'Zoo Day', titleHe: 'יום בגן החיות', descHe: 'פניתם שמאלה והגעתם לגן החיות.', place: 'zoo' },
    { id: 'beach', emoji: '🏖️', title: 'Beach Day', titleHe: 'יום בחוף', descHe: 'מצאתם את הדרך לחוף ושיחקתם בשמש.', place: 'beach' },
    { id: 'library', emoji: '📚', title: 'Library Visit', titleHe: 'ביקור בספרייה', descHe: 'הגעתם לספרייה ומצאתם ספר חדש.', place: 'library' },
    { id: 'icecream', emoji: '🍦', title: 'The Wrong Turn', titleHe: 'פנייה לא נכונה', descHe: 'פניתם ימינה במקום שמאלה… ומצאתם גלידה!', place: 'park', props: [{ e: '🍦', x: 50, y: 36, s: 46 }] },
  ],
}

export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
