import type { SubjectLevel } from '@/types'

export const futureWillLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Will — Positive',
    description: 'Learn to talk about the future using will + base verb',
    words: [
      { english: "I'll / I will",     hebrew: 'אֲנִי אֶ…',       emoji: '👤', example: "I'll see you tomorrow." },
      { english: "You'll / You will", hebrew: 'אַתָּה תִּ…',      emoji: '🫵', example: "You'll love this film." },
      { english: "He'll / He will",   hebrew: 'הוּא יִ…',         emoji: '🧒', example: "He'll be here at 3." },
      { english: "She'll / She will", hebrew: 'הִיא תִּ…',        emoji: '👧', example: "She'll come to the party." },
      { english: "We'll / We will",   hebrew: 'אֲנַחְנוּ נִ…',    emoji: '👥', example: "We'll go to the beach." },
      { english: "They'll / They will",hebrew: 'הֵם יִ…',         emoji: '👫', example: "They'll finish the project." },
    ],
    quiz: [
      {
        id: 'fw1q1', type: 'multiple-choice',
        question: '"She ___ come to the party." (future with will)', answer: "will",
        options: ['is', 'was', 'will', 'does'], emoji: '🎉',
      },
      {
        id: 'fw1q2', type: 'multiple-choice',
        question: 'After "will", the verb is always in:', answer: 'the base form',
        options: ['-ing form', '-s form', '-ed form', 'the base form'], emoji: '📝',
      },
      {
        id: 'fw1q3', type: 'fill-blank',
        question: 'We ___ go to the beach tomorrow. (👥 — future)', answer: 'will',
        questionHebrew: 'אנחנו ___ נלך לחוף ים מחר.',
      },
      {
        id: 'fw1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: "He'll finish the test.",
        options: ["He'll finishes the test.", "He'll finishing the test.", "He'll finish the test.", "He will to finish the test."], emoji: '📝',
      },
      {
        id: 'fw1q5', type: 'fill-blank',
        question: 'I ___ see you tomorrow. (👤 — future)', answer: 'will',
        questionHebrew: 'אני ___ אראה אותך מחר.',
      },
    ],
  },
  {
    level: 2,
    title: "Won't — Negative",
    description: "Learn the negative future form — won't (will not) + base verb",
    words: [
      { english: "I won't",       hebrew: 'אֲנִי לֹא אֶ…',      emoji: '🚫', example: "I won't be late." },
      { english: "He won't",      hebrew: 'הוּא לֹא יִ…',        emoji: '🧒', example: "He won't come today." },
      { english: "She won't",     hebrew: 'הִיא לֹא תִּ…',       emoji: '👧', example: "She won't forget." },
      { english: "We won't",      hebrew: 'אֲנַחְנוּ לֹא נִ…',   emoji: '👥', example: "We won't be long." },
      { english: "They won't",    hebrew: 'הֵם לֹא יִ…',         emoji: '👫', example: "They won't win this time." },
      { english: "It won't",      hebrew: 'זֶה לֹא יִ…',         emoji: '❌', example: "It won't rain tomorrow." },
    ],
    quiz: [
      {
        id: 'fw2q1', type: 'multiple-choice',
        question: '"She ___ come today." (negative future)', answer: "won't",
        options: ["don't", "won't", "wasn't", "isn't"], emoji: '🚫',
      },
      {
        id: 'fw2q2', type: 'fill-blank',
        question: "I ___ be late, I promise! (🚫 — negative future)", answer: "won't",
        questionHebrew: 'אני ___ אהיה מאחר, אני מבטיח!',
      },
      {
        id: 'fw2q3', type: 'multiple-choice',
        question: '"won\'t" is short for:', answer: 'will not',
        options: ['was not', 'would not', 'will not', 'went not'], emoji: '📝',
      },
      {
        id: 'fw2q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: "It won't rain tomorrow.",
        options: ["It willn't rain tomorrow.", "It won't rains tomorrow.", "It won't rain tomorrow.", "It not will rain tomorrow."], emoji: '☀️',
      },
      {
        id: 'fw2q5', type: 'fill-blank',
        question: "They ___ win — the other team is better. (👫 — negative)", answer: "won't",
        questionHebrew: 'הם ___ ינצחו — הקבוצה השנייה טובה יותר.',
      },
    ],
  },
  {
    level: 3,
    title: 'Will Questions + Short Answers',
    description: 'Ask questions with Will and give short answers — Will you?, Yes I will, No I won\'t',
    words: [
      { english: 'Will you…?',    hebrew: 'הַאִם תִּ…?',  emoji: '❓', example: 'Will you help me?' },
      { english: 'Will she…?',    hebrew: 'הַאִם תִּ…?',  emoji: '❓', example: 'Will she come tomorrow?' },
      { english: 'Will they…?',   hebrew: 'הַאִם יִ…?',   emoji: '❓', example: 'Will they be ready?' },
      { english: 'Yes, I will.',  hebrew: 'כֵּן.',         emoji: '✅', example: 'Will you come? Yes, I will.' },
      { english: "No, I won't.",  hebrew: 'לֹא.',          emoji: '❌', example: "Will she be late? No, she won't." },
      { english: 'Yes, they will.',hebrew: 'כֵּן, הֵם יִ.', emoji: '✅', example: 'Will they finish? Yes, they will.' },
    ],
    quiz: [
      {
        id: 'fw3q1', type: 'multiple-choice',
        question: 'How do you ask "Will she be here tomorrow?"', answer: 'Will she be here tomorrow?',
        options: ['She will be here tomorrow?', 'Will she be here tomorrow?', 'Does she will be here?', 'Will she is here tomorrow?'], emoji: '❓',
      },
      {
        id: 'fw3q2', type: 'fill-blank',
        question: '___ you come to my party? (❓)', answer: 'will',
        questionHebrew: '___ אתה תבוא למסיבה שלי?',
      },
      {
        id: 'fw3q3', type: 'multiple-choice',
        question: '"Will you help me?" → short positive answer', answer: 'Yes, I will.',
        options: ['Yes, I do.', 'Yes, I will.', 'Yes, I am.', 'Yes, I was.'], emoji: '✅',
      },
      {
        id: 'fw3q4', type: 'multiple-choice',
        question: '"Will they come?" → short negative answer', answer: "No, they won't.",
        options: ["No, they won't.", "No, they don't.", "No, they weren't.", "No, they aren't."], emoji: '❌',
      },
      {
        id: 'fw3q5', type: 'fill-blank',
        question: '___ it snow tomorrow? (❄️ — question form)', answer: 'will',
        questionHebrew: '___ ירד שלג מחר?',
      },
    ],
  },
]
