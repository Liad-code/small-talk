import type { SubjectLevel } from '@/types'

export const pastBeLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Was and Were',
    description: 'Learn the past tense of "to be" — was (I/he/she/it) and were (you/we/they)',
    words: [
      { english: 'I was',      hebrew: 'הָיִיתִי',    emoji: '👤', example: 'I was at school yesterday.' },
      { english: 'You were',   hebrew: 'הָיִיתָ',     emoji: '🫵', example: 'You were late this morning.' },
      { english: 'He was',     hebrew: 'הוּא הָיָה',  emoji: '🧒', example: 'He was happy last week.' },
      { english: 'She was',    hebrew: 'הִיא הָיְתָה', emoji: '👧', example: 'She was at home yesterday.' },
      { english: 'We were',    hebrew: 'הָיִינוּ',    emoji: '👥', example: 'We were in Tel Aviv last Sunday.' },
      { english: 'They were',  hebrew: 'הֵם הָיוּ',   emoji: '👫', example: 'They were tired after the game.' },
    ],
    quiz: [
      {
        id: 'pb1q1', type: 'multiple-choice',
        question: '"She ___ happy yesterday." — correct past form?', answer: 'was',
        options: ['is', 'was', 'were', 'be'], emoji: '😊',
      },
      {
        id: 'pb1q2', type: 'multiple-choice',
        question: '"They ___ tired after the game." — correct past form?', answer: 'were',
        options: ['is', 'was', 'were', 'be'], emoji: '⚽',
      },
      {
        id: 'pb1q3', type: 'fill-blank',
        question: 'I ___ at school yesterday. (👤 — past of "am")', answer: 'was',
        questionHebrew: 'הייתי ___ בבית הספר אתמול.',
      },
      {
        id: 'pb1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: 'We were in the park yesterday.',
        options: ['We was in the park yesterday.', 'We were in the park yesterday.', 'We be in the park yesterday.', 'We is in the park yesterday.'], emoji: '🌳',
      },
      {
        id: 'pb1q5', type: 'fill-blank',
        question: 'You ___ late this morning. (🫵 — past of "are")', answer: 'were',
        questionHebrew: 'היית ___ מאחר הבוקר.',
      },
    ],
  },
  {
    level: 2,
    title: "Wasn't / Weren't",
    description: 'Learn the negative past forms of to be — wasn\'t and weren\'t',
    words: [
      { english: "I wasn't",      hebrew: 'לֹא הָיִיתִי',  emoji: '🚫', example: "I wasn't late." },
      { english: "He wasn't",     hebrew: 'הוּא לֹא הָיָה',emoji: '🧒', example: "He wasn't sad." },
      { english: "She wasn't",    hebrew: 'הִיא לֹא הָיְתָה', emoji: '👧', example: "She wasn't at school." },
      { english: "We weren't",    hebrew: 'לֹא הָיִינוּ',   emoji: '👥', example: "We weren't ready." },
      { english: "They weren't",  hebrew: 'הֵם לֹא הָיוּ', emoji: '👫', example: "They weren't at the party." },
      { english: "It wasn't",     hebrew: 'זֶה לֹא הָיָה', emoji: '❌', example: "It wasn't cold yesterday." },
    ],
    quiz: [
      {
        id: 'pb2q1', type: 'multiple-choice',
        question: '"She ___ at school." (negative past)', answer: "wasn't",
        options: ["weren't", "wasn't", "isn't", "wasn't be"], emoji: '🏫',
      },
      {
        id: 'pb2q2', type: 'fill-blank',
        question: "I ___ late — I arrived on time! (🚫)", answer: "wasn't",
        questionHebrew: 'לא הייתי ___ מאחר — הגעתי בזמן!',
      },
      {
        id: 'pb2q3', type: 'multiple-choice',
        question: '"They ___ ready for the test." (negative past, plural)', answer: "weren't",
        options: ["wasn't", "weren't", "isn't", "aren't"], emoji: '📝',
      },
      {
        id: 'pb2q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: "It wasn't cold yesterday.",
        options: ["It weren't cold yesterday.", "It wasn't cold yesterday.", "It isn't cold yesterday.", "It not was cold yesterday."], emoji: '🌡️',
      },
      {
        id: 'pb2q5', type: 'fill-blank',
        question: "We ___ at the party — we were at home. (👥)", answer: "weren't",
        questionHebrew: 'לא היינו ___ במסיבה — היינו בבית.',
      },
    ],
  },
  {
    level: 3,
    title: 'Was / Were Questions',
    description: 'Ask questions in the past with was/were and give short answers',
    words: [
      { english: 'Was I?',           hebrew: 'הַאִם הָיִיתִי?',     emoji: '❓', example: 'Was I late?' },
      { english: 'Were you?',        hebrew: 'הַאִם הָיִיתָ?',      emoji: '❓', example: 'Were you at the party?' },
      { english: 'Was he / she?',    hebrew: 'הַאִם הוּא / הִיא הָיָה?', emoji: '🤔', example: 'Was she happy?' },
      { english: 'Were they?',       hebrew: 'הַאִם הֵם הָיוּ?',    emoji: '❓', example: 'Were they tired?' },
      { english: 'Yes, … was/were.', hebrew: 'כֵּן.',               emoji: '✅', example: 'Yes, she was. Yes, they were.' },
      { english: "No, … wasn't/weren't.", hebrew: 'לֹא.',           emoji: '❌', example: "No, he wasn't. No, we weren't." },
    ],
    quiz: [
      {
        id: 'pb3q1', type: 'multiple-choice',
        question: 'How do you ask "Was she at school?"', answer: 'Was she at school?',
        options: ['She was at school?', 'Was she at school?', 'Did she was at school?', 'Were she at school?'], emoji: '🏫',
      },
      {
        id: 'pb3q2', type: 'fill-blank',
        question: '___ you at home yesterday? (❓)', answer: 'were',
        questionHebrew: '___ אתה בבית אתמול?',
      },
      {
        id: 'pb3q3', type: 'multiple-choice',
        question: '"Was he tired?" → short positive answer', answer: 'Yes, he was.',
        options: ['Yes, he were.', 'Yes, he was.', 'Yes, he did.', 'Yes, he is.'], emoji: '✅',
      },
      {
        id: 'pb3q4', type: 'multiple-choice',
        question: '"Were they at the party?" → short negative answer', answer: "No, they weren't.",
        options: ["No, they wasn't.", "No, they weren't.", "No, they didn't.", "No, they aren't."], emoji: '❌',
      },
      {
        id: 'pb3q5', type: 'fill-blank',
        question: '___ the film good? (🎬 — one thing)', answer: 'was',
        questionHebrew: '___ הסרט טוב?',
      },
    ],
  },
]
