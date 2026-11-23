import type { Story, StoryChoice, StoryLine } from './types'

/**
 * Story mode — "Tony's Big Day". A branching adventure in the pizzeria: the
 * child's choices change what happens (a birthday surprise, up to 3 toppings,
 * forgetting the money…) and lead to one of four endings.
 *
 * Every English line is pre-recorded (scripts/generate-scene-audio.mjs):
 * Tony's lines in his voice, the child's choices in the kid voice. Many lines
 * are shared with the other pizzeria modes, so they reuse the same file.
 */

const ASK_GREET: StoryLine = { text: "Hi! Welcome to Tony's Pizza! What would you like?", he: 'שלום! ברוכים הבאים לפיצה של טוני! מה תרצו?' }
const ASK_SIZE: StoryLine = { text: 'Great! What size would you like? Small, medium or large?', he: 'מעולה! איזה גודל תרצו? קטנה, בינונית או גדולה?' }
const ASK_TOPPING: StoryLine = { text: 'Yum! What topping would you like?', he: 'יאמי! איזו תוספת תרצו?' }
const UP_TO_3: StoryLine = { text: 'You can choose up to 3 toppings.', he: 'אפשר לבחור עד 3 תוספות.' }
const ASK_DRINK: StoryLine = { text: 'Would you like a drink?', he: 'תרצו משהו לשתות?' }
const ASK_WHERE: StoryLine = { text: 'Do you want to eat here or take away?', he: 'לאכול כאן או לקחת הביתה?' }
const ASK_PAY: StoryLine = { text: "Here is your pizza! That's twenty shekels, please.", he: 'הנה הפיצה שלכם! זה עשרים שקלים, בבקשה.' }
const COME_IN: StoryLine = { text: 'Come in, come in!', he: 'היכנסו, היכנסו!' }

const GOODBYE: StoryChoice = { say: 'Thank you! Goodbye!', he: 'תודה! להתראות!', icon: '👋' }
const GOOD_NIGHT: StoryChoice = { say: 'Good night!', he: 'לילה טוב!', icon: '🌙', silly: { text: "Good night? It's lunch time! Try again.", he: 'לילה טוב? עכשיו צהריים! נסו שוב.' } }

/** Pay choices — where they lead depends on the story so far. */
function payChoices(normalEnding: string): StoryChoice[] {
  return [
    { say: 'Here is the money.', he: 'הנה הכסף.', icon: '💰', next: normalEnding, nextIf: [{ key: 'birthday', value: 'yes', next: 'end-birthday' }] },
    { say: 'Oh no! I forgot my money!', he: 'אוי לא! שכחתי את הכסף!', icon: '😱', next: 'end-dishes' },
    { say: 'No, you pay!', he: 'לא, אתה תשלם!', icon: '🙃', silly: { text: 'Ha ha, nice try! Try again.', he: 'חה חה, ניסיון יפה! נסו שוב.' } },
  ]
}

export const PIZZERIA_STORY: Story = {
  id: 'pizzeria-story',
  title: "Tony's Big Day",
  titleHe: 'היום הגדול של טוני',
  start: 'door',
  coverPlace: 'street',
  introHe: [
    '🗨️ טוני מדבר — ואתם בוחרים מה לענות.',
    '🔀 כל בחירה משנה את הסיפור.',
    '🎤 כשאתם שומעים את המשפט שלכם — אמרו אותו בקול!',
  ],
  chapters: [
    { icon: '🚪', he: 'בדלת' },
    { icon: '👋', he: 'שלום' },
    { icon: '📏', he: 'גודל' },
    { icon: '🧀', he: 'תוספת' },
    { icon: '🥤', he: 'שתייה' },
    { icon: '🏠', he: 'כאן או הביתה' },
    { icon: '💰', he: 'תשלום' },
    { icon: '⭐', he: 'הסוף' },
  ],
  nodes: [
    {
      id: 'door', place: 'street', chapter: 0, noCharacter: true,
      narrationHe: 'אתם רעבים מאוד! הולכים ברחוב ומגיעים לפיצרייה של טוני. הדלת סגורה… מה עושים?',
      lines: [],
      choices: [
        { say: 'Knock, knock!', he: 'טוק טוק!', icon: '🚪', reply: COME_IN, next: 'greet' },
        { say: 'Hello! Is anybody here?', he: 'שלום! יש פה מישהו?', icon: '🗣️', reply: COME_IN, next: 'greet' },
      ],
    },
    {
      id: 'greet', place: 'counter', chapter: 1,
      narrationHe: 'נכנסתם! ריח של פיצה חמה בכל מקום. טוני הפיצאי מחייך מאחורי הדלפק.',
      lines: [ASK_GREET],
      choices: [
        { say: 'I would like a pizza, please.', he: 'הייתי רוצה פיצה, בבקשה.', icon: '🍕', next: 'size' },
        {
          say: "It's my birthday! I would like a pizza, please.", he: 'יש לי יום הולדת! הייתי רוצה פיצה, בבקשה.', icon: '🎂',
          reply: { text: 'Happy birthday! A special pizza for you!', he: 'יום הולדת שמח! פיצה מיוחדת בשבילכם!' },
          set: { birthday: 'yes' }, next: 'size',
        },
        { say: 'I would like a shoe, please.', he: 'הייתי רוצה נעל, בבקשה.', icon: '👟', silly: { text: 'A shoe? This is a pizza shop! Try again.', he: 'נעל? זו פיצרייה! נסו שוב.' } },
      ],
    },
    {
      id: 'size', place: 'counter', chapter: 2,
      narrationHe: 'טוני מוציא בצק ענק ומתחיל לגלגל אותו. כמה גדולה תהיה הפיצה שלכם?',
      lines: [ASK_SIZE],
      choices: [
        { say: 'A small pizza, please.', he: 'פיצה קטנה, בבקשה.', icon: '🔸', set: { size: 'small' }, next: 'topping' },
        { say: 'A medium pizza, please.', he: 'פיצה בינונית, בבקשה.', icon: '🔶', set: { size: 'medium' }, next: 'topping' },
        { say: 'A large pizza, please.', he: 'פיצה גדולה, בבקשה.', icon: '🟠', set: { size: 'large' }, next: 'topping' },
        {
          say: 'A giant pizza, please!', he: 'פיצה ענקית, בבקשה!', icon: '🦖',
          reply: { text: 'A giant pizza? Wow! Okay, our biggest one!', he: 'פיצה ענקית? וואו! בסדר, הכי גדולה שיש!' },
          set: { size: 'giant' }, next: 'topping',
        },
        { say: 'A blue pizza, please.', he: 'פיצה כחולה, בבקשה.', icon: '🔵', silly: { text: 'A blue pizza? Pizza is not blue! Try again.', he: 'פיצה כחולה? פיצה היא לא כחולה! נסו שוב.' } },
      ],
    },
    {
      id: 'topping', place: 'kitchen', chapter: 3,
      narrationHe: 'טוני מורח רוטב עגבניות ומפזר גבינה. עכשיו הכי כיף — בוחרים עד 3 תוספות!',
      lines: [ASK_TOPPING, UP_TO_3],
      pick: {
        key: 'topping', max: 3, promptHe: 'בחרו עד 3 תוספות', closer: 'please.',
        options: [
          { say: 'Cheese', he: 'גבינה', icon: '🧀', value: 'cheese' },
          { say: 'Mushrooms', he: 'פטריות', icon: '🍄', value: 'mushrooms' },
          { say: 'Olives', he: 'זיתים', icon: '🫒', value: 'olives' },
          { say: 'Peppers', he: 'פלפלים', icon: '🫑', value: 'peppers' },
          { say: 'Corn', he: 'תירס', icon: '🌽', value: 'corn' },
          { say: 'Onion', he: 'בצל', icon: '🧅', value: 'onion' },
          { say: 'Tuna', he: 'טונה', icon: '🐟', value: 'tuna' },
          { say: 'Chili', he: "צ'ילי", icon: '🌶️', value: 'chili' },
        ],
        reply: { text: 'Great choice! Your pizza is in the oven now.', he: 'בחירה מצוינת! הפיצה שלכם בתנור עכשיו.' },
        next: 'drink',
      },
    },
    {
      id: 'drink', place: 'counter', chapter: 4,
      narrationHe: 'הפיצה נאפית בתנור של טוני. הריח מדהים… וקצת צמא לכם.',
      lines: [ASK_DRINK],
      choices: [
        { say: 'Yes, orange juice, please.', he: 'כן, מיץ תפוזים, בבקשה.', icon: '🧃', set: { drink: 'orange juice' }, next: 'where' },
        { say: 'Yes, water, please.', he: 'כן, מים, בבקשה.', icon: '💧', set: { drink: 'water' }, next: 'where' },
        { say: 'Yes, apple juice, please.', he: 'כן, מיץ תפוחים, בבקשה.', icon: '🍏', set: { drink: 'apple juice' }, next: 'where' },
        { say: 'Yes, cola, please.', he: 'כן, קולה, בבקשה.', icon: '🥤', set: { drink: 'cola' }, next: 'where' },
        { say: 'No, thank you.', he: 'לא, תודה.', icon: '🚫', set: { drink: 'none' }, next: 'where' },
        { say: 'Yes, a cat, please.', he: 'כן, חתול, בבקשה.', icon: '🐱', silly: { text: "A cat? We don't sell cats! Try again.", he: 'חתול? אנחנו לא מוכרים חתולים! נסו שוב.' } },
      ],
    },
    {
      id: 'where', place: 'counter', chapter: 5,
      narrationHe: 'דינג! הפיצה יצאה מהתנור. איפה תאכלו אותה?',
      lines: [ASK_WHERE],
      choices: [
        { say: 'Eat here, please.', he: 'לאכול כאן, בבקשה.', icon: '🪑', set: { where: 'eat here' }, next: 'pay-table' },
        { say: 'Take away, please.', he: 'לקחת הביתה, בבקשה.', icon: '🛍️', set: { where: 'take away' }, next: 'pay-box' },
        { say: 'In the bath, please.', he: 'באמבטיה, בבקשה.', icon: '🛁', silly: { text: 'In the bath? Ha ha! Try again.', he: 'באמבטיה? חה חה! נסו שוב.' } },
      ],
    },
    {
      id: 'pay-table', place: 'table', chapter: 6,
      narrationHe: 'התיישבתם ליד שולחן עם מפה משובצת. טוני מגיש לכם את הפיצה…',
      lines: [ASK_PAY],
      choices: payChoices('end-party'),
    },
    {
      id: 'pay-box', place: 'counter', chapter: 6,
      narrationHe: 'טוני מכניס את הפיצה לקופסה חמה וקושר אותה בסרט.',
      lines: [ASK_PAY],
      choices: payChoices('end-picnic'),
    },
    {
      id: 'end-party', place: 'table', chapter: 7, ending: 'party',
      narrationHe: 'הפיצה חמה, הגבינה נמתחת… איזו ארוחה!',
      lines: [{ text: 'Thank you! Enjoy your pizza!', he: 'תודה! בתיאבון!' }],
      choices: [GOODBYE, GOOD_NIGHT],
    },
    {
      id: 'end-picnic', place: 'counter', chapter: 7, ending: 'picnic',
      narrationHe: 'יש לכם רעיון: פיקניק בפארק!',
      lines: [{ text: 'Here is your box. Have a great picnic!', he: 'הנה הקופסה שלכם. פיקניק מהנה!' }],
      choices: [GOODBYE, GOOD_NIGHT],
    },
    {
      id: 'end-birthday', place: 'table', chapter: 7, ending: 'birthday',
      narrationHe: 'פתאום האורות כבים… טוני יוצא מהמטבח עם נר דולק!',
      lines: [{ text: "Surprise! It's your birthday, so the pizza is free!", he: 'הפתעה! יש לכם יום הולדת, אז הפיצה בחינם!' }],
      choices: [{ say: 'Wow! Thank you, Tony!', he: 'וואו! תודה, טוני!', icon: '🥳' }],
    },
    {
      id: 'end-dishes', place: 'kitchen', chapter: 7, ending: 'dishes',
      narrationHe: 'אופס… אין כסף בכיס! טוני מגרד את הראש ואז מחייך.',
      lines: [{ text: 'No money? No problem! You can wash the dishes!', he: 'אין כסף? אין בעיה! אתם יכולים לשטוף כלים!' }],
      choices: [{ say: 'Okay! I love bubbles!', he: 'בסדר! אני אוהב/ת בועות!', icon: '🫧' }],
    },
  ],
  endings: [
    { id: 'party', emoji: '🍕', title: 'Pizza Party', titleHe: 'ארוחה בפיצרייה', descHe: 'אכלתם פיצה חמה ליד השולחן של טוני.', place: 'table' },
    { id: 'picnic', emoji: '🧺', title: 'Park Picnic', titleHe: 'פיקניק בפארק', descHe: 'לקחתם את הפיצה לפיקניק על הדשא.', place: 'park' },
    { id: 'birthday', emoji: '🎂', title: 'Birthday Surprise', titleHe: 'הפתעת יום הולדת', descHe: 'טוני הפתיע אתכם — פיצה בחינם עם נר!', place: 'table' },
    { id: 'dishes', emoji: '🫧', title: 'Bubble Trouble', titleHe: 'שוטפים כלים', descHe: 'שכחתם את הכסף… ושטפתם כלים עם המון בועות!', place: 'kitchen' },
  ],
  soldOut: { text: "Oh no! It's all gone today. Choose another one, please.", he: 'אוי לא! זה נגמר היום. בחרו משהו אחר, בבקשה.' },
  oven: {
    early: { text: "Not yet! It's not ready.", he: 'עוד לא! זה עוד לא מוכן.' },
    burnt: { text: "Oops! It's burnt! Let's make a new one.", he: 'אופס! זה נשרף! בואו נכין חדשה.' },
    perfect: { text: 'Perfect! Great job, chef!', he: 'מושלם! עבודה מצוינת, שף!' },
  },
}
