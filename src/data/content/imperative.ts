import type { SubjectLevel } from '@/types'

export const imperativeLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Positive Commands',
    description: 'Learn to give positive commands — use the base verb directly, no subject needed',
    words: [
      { english: 'Open',   hebrew: 'פְּתַח / פִּתְחִי', emoji: '📂', example: 'Open the door, please.' },
      { english: 'Close',  hebrew: 'סְגֹר / סִגְרִי',   emoji: '📁', example: 'Close your books.' },
      { english: 'Sit',    hebrew: 'שֵׁב / שְׁבִי',     emoji: '🪑', example: 'Sit down, everyone.' },
      { english: 'Stand',  hebrew: 'קוּם / קוּמִי',     emoji: '🧍', example: 'Stand up, please.' },
      { english: 'Listen', hebrew: 'הַקְשֵׁב / הַקְשִׁיבִי', emoji: '👂', example: 'Listen to the teacher.' },
      { english: 'Read',   hebrew: 'קְרָא / קִרְאִי',   emoji: '📖', example: 'Read page 12.' },
    ],
    quiz: [
      {
        id: 'im1q1', type: 'multiple-choice',
        question: 'Your teacher wants everyone to sit down. She says:', answer: 'Sit down!',
        options: ['You sit down.', 'Sit down!', 'He is sitting.', 'Sit you.'], emoji: '🪑',
      },
      {
        id: 'im1q2', type: 'multiple-choice',
        question: '"פְּתַח אֶת הַסֵּפֶר" in English is:', answer: 'Open the book.',
        options: ['You open the book.', 'Opens the book.', 'Open the book.', 'Opening the book.'], emoji: '📖',
      },
      {
        id: 'im1q3', type: 'multiple-choice',
        question: '___ to the teacher, please. (👂)', answer: 'listen',
        options: ['open', 'close', 'listen', 'read'],
      },
      {
        id: 'im1q4', type: 'multiple-choice',
        question: 'In an imperative sentence, the subject (you) is:', answer: 'hidden — we do not say it',
        options: ['said at the start', 'said at the end', 'hidden — we do not say it', 'always "I"'], emoji: '🤫',
      },
      {
        id: 'im1q5', type: 'multiple-choice',
        question: '___ up and answer the question. (🧍)', answer: 'stand',
        options: ['sit', 'stand', 'listen', 'open'],
      },
    ],
  },
  {
    level: 2,
    title: "Don't + Verb",
    description: 'Learn negative commands — "don\'t" + base verb to tell someone NOT to do something',
    words: [
      { english: "Don't run",   hebrew: 'אַל תָּרוּץ',   emoji: '🏃', example: "Don't run in the corridor." },
      { english: "Don't shout", hebrew: 'אַל תִּצְעַק',  emoji: '📢', example: "Don't shout in the library." },
      { english: "Don't open",  hebrew: 'אַל תִּפְתַּח', emoji: '📁', example: "Don't open that door." },
      { english: "Don't eat",   hebrew: 'אַל תֹּאכַל',  emoji: '🍕', example: "Don't eat in class." },
      { english: "Don't talk",  hebrew: 'אַל תְּדַבֵּר', emoji: '🤐', example: "Don't talk when I'm talking." },
      { english: "Don't touch", hebrew: 'אַל תִּגַּע',   emoji: '🤚', example: "Don't touch the stove!" },
    ],
    quiz: [
      {
        id: 'im2q1', type: 'multiple-choice',
        question: 'A negative command is formed with:', answer: "Don't + base verb",
        options: ["Not + verb", "Don't + base verb", "No + verb", "Don't + to + verb"], emoji: '🚫',
      },
      {
        id: 'im2q2', type: 'multiple-choice',
        question: "___ run in the corridor! (🏃 — negative command)", answer: "don't",
        options: ["not", "don't", "no", "can't"],
      },
      {
        id: 'im2q3', type: 'multiple-choice',
        question: '"אַל תֹּאכַל בַּכִּיתָה" in English is:', answer: "Don't eat in class.",
        options: ["You eat not in class.", "Don't eating in class.", "Don't eat in class.", "No eat in class."], emoji: '🍕',
      },
      {
        id: 'im2q4', type: 'multiple-choice',
        question: 'Which is a correct negative command?', answer: "Don't touch the screen.",
        options: ["Not touch the screen.", "Don't touching the screen.", "Don't touch the screen.", "You don't touch the screen."], emoji: '🤚',
      },
      {
        id: 'im2q5', type: 'multiple-choice',
        question: "___ shout, please! (📢 — negative command)", answer: "don't",
        options: ["not", "don't", "no", "can't"],
      },
    ],
  },
  {
    level: 3,
    title: 'Polite Commands',
    description: 'Make commands polite with "please" and learn common classroom and daily-life instructions',
    words: [
      { english: 'Please sit down',  hebrew: 'בְּבַקָּשָׁה שֵׁב',  emoji: '🪑', example: 'Please sit down and be quiet.' },
      { english: "Don't worry",      hebrew: 'אַל תִּדְאַג',        emoji: '😌', example: "Don't worry — I will help you." },
      { english: 'Be careful',       hebrew: 'הֱיֵה זָהִיר',        emoji: '⚠️', example: 'Be careful on the stairs.' },
      { english: 'Come in',          hebrew: 'הִיכָּנֵס',           emoji: '🚪', example: 'Come in and close the door.' },
      { english: 'Be quiet',         hebrew: 'שֶׁקֶט',              emoji: '🤫', example: 'Be quiet during the test.' },
      { english: "Let's go",         hebrew: 'בֹּאוּ נֵלֵךְ',       emoji: '🏃', example: "Let's go — the bus is here!" },
    ],
    quiz: [
      {
        id: 'im3q1', type: 'multiple-choice',
        question: 'You want to ask someone nicely to open the window. You say:', answer: 'Please open the window.',
        options: ['Open the window!', 'Please open the window.', 'You open the window.', 'Opening the window please.'], emoji: '🪟',
      },
      {
        id: 'im3q2', type: 'multiple-choice',
        question: '___ careful on the stairs! (⚠️)', answer: 'be',
        options: ['sit', 'stand', 'be', 'listen'],
      },
      {
        id: 'im3q3', type: 'multiple-choice',
        question: '"הִיכָּנֵס" in English is:', answer: 'Come in.',
        options: ['Go out.', 'Come in.', 'Stand up.', 'Sit down.'], emoji: '🚪',
      },
      {
        id: 'im3q4', type: 'multiple-choice',
        question: '"Let\'s go" means:', answer: 'An invitation for us both to do something together',
        options: ['A command to one person', 'An invitation for us both to do something together', 'A negative command', 'A question'], emoji: '🏃',
      },
      {
        id: 'im3q5', type: 'multiple-choice',
        question: "___ worry — everything will be fine. (😌 — negative)", answer: "don't",
        options: ["not", "don't", "no", "can't"],
      },
    ],
  },
]
