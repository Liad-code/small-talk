import type { SubjectLevel } from '@/types'

export const canCouldLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Can — I Can Do It!',
    description: 'Learn the positive forms of "can" — to talk about ability',
    words: [
      { english: 'I can',     hebrew: 'אֲנִי יָכוֹל / יְכוֹלָה', emoji: '💪', example: 'I can swim.' },
      { english: 'You can',   hebrew: 'אַתָּה יָכוֹל / אַתְּ יְכוֹלָה', emoji: '🫵', example: 'You can sing!' },
      { english: 'He can',    hebrew: 'הוּא יָכוֹל',               emoji: '🧒', example: 'He can run fast.' },
      { english: 'She can',   hebrew: 'הִיא יְכוֹלָה',             emoji: '👧', example: 'She can draw well.' },
      { english: 'We can',    hebrew: 'אֲנַחְנוּ יְכוֹלִים',       emoji: '👥', example: 'We can play football.' },
      { english: 'They can',  hebrew: 'הֵם יְכוֹלִים',             emoji: '👫', example: 'They can speak English.' },
    ],
    quiz: [
      {
        id: 'cc1q1', type: 'multiple-choice',
        question: '"She ___ dance very well." — which word completes the sentence?', answer: 'can',
        options: ['cans', 'can', 'is can', 'does can'], emoji: '💃',
      },
      {
        id: 'cc1q2', type: 'multiple-choice',
        question: '"Can" is used to talk about:', answer: 'ability — something you are able to do',
        options: ['past actions', 'ability — something you are able to do', 'future plans', 'habits'], emoji: '💪',
      },
      {
        id: 'cc1q3', type: 'fill-blank',
        question: 'I ___ swim very fast! (💪)', answer: 'can',
        questionHebrew: 'אני ___ לשחות מהר מאוד!',
      },
      {
        id: 'cc1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: 'He can play the piano.',
        options: ['He cans play the piano.', 'He can plays the piano.', 'He can play the piano.', 'He can playing the piano.'], emoji: '🎹',
      },
      {
        id: 'cc1q5', type: 'fill-blank',
        question: 'They ___ speak three languages! (👫)', answer: 'can',
        questionHebrew: 'הם ___ לדבר שלוש שפות!',
      },
    ],
  },
  {
    level: 2,
    title: "Can't — I Can't Do That",
    description: "Learn the negative and question forms of can — can't, can you?, yes/no short answers",
    words: [
      { english: "I can't",     hebrew: 'אֲנִי לֹא יָכוֹל',     emoji: '🚫', example: "I can't fly." },
      { english: "He can't",    hebrew: 'הוּא לֹא יָכוֹל',       emoji: '🧒', example: "He can't swim yet." },
      { english: "She can't",   hebrew: 'הִיא לֹא יְכוֹלָה',     emoji: '👧', example: "She can't come today." },
      { english: 'Can you…?',   hebrew: 'הַאִם אַתָּה יָכוֹל…?',  emoji: '❓', example: 'Can you help me?' },
      { english: 'Yes, I can.',  hebrew: 'כֵּן, אֲנִי יָכוֹל.',   emoji: '✅', example: 'Can you swim? Yes, I can.' },
      { english: 'No, I can\'t.',hebrew: 'לֹא, אֲנִי לֹא יָכוֹל.',emoji: '❌', example: "Can you fly? No, I can't." },
    ],
    quiz: [
      {
        id: 'cc2q1', type: 'multiple-choice',
        question: '"She ___ come today — she is sick."', answer: "can't",
        options: ["can't", "not can", "cants", "cannot not"], emoji: '😷',
      },
      {
        id: 'cc2q2', type: 'fill-blank',
        question: '___ you help me with this? (❓)', answer: 'can',
        questionHebrew: '___ אתה עוזר לי?',
      },
      {
        id: 'cc2q3', type: 'multiple-choice',
        question: '"Can you ride a bike?" → short positive answer', answer: 'Yes, I can.',
        options: ['Yes, I am.', 'Yes, I can.', 'Yes, I do.', 'Yes, I could.'], emoji: '🚲',
      },
      {
        id: 'cc2q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: "He can't run — his leg hurts.",
        options: ["He not can run.", "He can't run — his leg hurts.", "He cann't run.", "He doesn't can run."], emoji: '🦵',
      },
      {
        id: 'cc2q5', type: 'fill-blank',
        question: "I ___ swim yet, but I am learning. (🚫)", answer: "can't",
        questionHebrew: 'אני ___ לשחות עדיין, אבל אני לומד.',
      },
    ],
  },
  {
    level: 3,
    title: 'Could — Past Ability',
    description: 'Learn "could" — the past form of can — to talk about past ability and polite requests',
    words: [
      { english: 'I could',     hebrew: 'יָכֹלְתִּי',          emoji: '⏪', example: 'I could run fast when I was young.' },
      { english: "I couldn't",  hebrew: 'לֹא יָכֹלְתִּי',      emoji: '🚫', example: "I couldn't swim at age 3." },
      { english: 'She could',   hebrew: 'הִיא יָכְלָה',        emoji: '👧', example: 'She could speak two languages as a child.' },
      { english: 'Could you…?', hebrew: 'הַאִם תּוּכַל…? (אָדִיב)', emoji: '🙏', example: 'Could you pass the salt, please?' },
      { english: 'Could I…?',   hebrew: 'הַאִם אוּכַל…?',     emoji: '🤔', example: 'Could I borrow your pen?' },
      { english: "Couldn't",    hebrew: 'לֹא יָכֹל',           emoji: '❌', example: "He couldn't find his bag." },
    ],
    quiz: [
      {
        id: 'cc3q1', type: 'multiple-choice',
        question: '"When I was five, I ___ swim." (past ability)', answer: 'could',
        options: ['can', 'could', 'will', 'am able'], emoji: '🏊',
      },
      {
        id: 'cc3q2', type: 'fill-blank',
        question: '___ you pass the salt, please? (🙏 — polite request)', answer: 'could',
        questionHebrew: '___ אתה מוסר לי את המלח, בבקשה?',
      },
      {
        id: 'cc3q3', type: 'multiple-choice',
        question: '"She ___ speak English when she was six."', answer: 'could',
        options: ['can', 'could', "couldn't", 'can\'t'], emoji: '🗣️',
      },
      {
        id: 'cc3q4', type: 'multiple-choice',
        question: 'Which is a polite request?', answer: 'Could you open the window, please?',
        options: ['Open the window!', 'Can you opens the window?', 'Could you open the window, please?', 'You could open the window.'], emoji: '🪟',
      },
      {
        id: 'cc3q5', type: 'fill-blank',
        question: "He ___ find his keys yesterday. (❌ — past, negative)", answer: "couldn't",
        questionHebrew: 'הוא ___ למצוא את המפתחות שלו אתמול.',
      },
    ],
  },
]
