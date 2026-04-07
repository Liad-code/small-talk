import type { SubjectLevel } from '@/types'

export const presentProgLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Am / Is / Are + -ing',
    description: 'Learn the present progressive — use am/is/are + verb-ing to describe actions happening right now',
    words: [
      { english: 'I am running',     hebrew: 'אֲנִי רָץ עַכְשָׁו',      emoji: '🏃', example: 'I am running in the park.' },
      { english: 'She is reading',   hebrew: 'הִיא קוֹרֵאת עַכְשָׁו',   emoji: '📖', example: 'She is reading a book.' },
      { english: 'He is eating',     hebrew: 'הוּא אוֹכֵל עַכְשָׁו',    emoji: '🍕', example: 'He is eating lunch.' },
      { english: 'We are learning',  hebrew: 'אֲנַחְנוּ לוֹמְדִים עַכְשָׁו', emoji: '📚', example: 'We are learning English.' },
      { english: 'They are playing', hebrew: 'הֵם מְשַׂחֲקִים עַכְשָׁו', emoji: '⚽', example: 'They are playing football.' },
      { english: 'It is raining',    hebrew: 'יוֹרֵד גֶּשֶׁם עַכְשָׁו',  emoji: '🌧️', example: 'It is raining outside.' },
    ],
    quiz: [
      {
        id: 'pg1q1', type: 'multiple-choice',
        question: '"She ___ (read) right now." — correct form?', answer: 'is reading',
        options: ['reads', 'read', 'is reading', 'is read'], emoji: '📖',
      },
      {
        id: 'pg1q2', type: 'multiple-choice',
        question: '"They ___ (play) football at the moment."', answer: 'are playing',
        options: ['play', 'plays', 'are playing', 'is playing'], emoji: '⚽',
      },
      {
        id: 'pg1q3', type: 'fill-blank',
        question: 'It ___ raining outside. (🌧️ — right now)', answer: 'is',
        questionHebrew: 'יורד ___ גשם בחוץ.',
      },
      {
        id: 'pg1q4', type: 'multiple-choice',
        question: 'Present progressive describes:', answer: 'an action happening right now',
        options: ['a habit', 'an action happening right now', 'a past action', 'a future plan'], emoji: '⏱️',
      },
      {
        id: 'pg1q5', type: 'fill-blank',
        question: 'We ___ learning English now. (📚)', answer: 'are',
        questionHebrew: 'אנחנו ___ לומדים אנגלית עכשיו.',
      },
    ],
  },
  {
    level: 2,
    title: "Isn't / Aren't + Questions",
    description: 'Learn the negative and question forms of present progressive',
    words: [
      { english: "I'm not sleeping",  hebrew: 'אֲנִי לֹא יָשֵׁן עַכְשָׁו', emoji: '😤', example: "I'm not sleeping — I'm thinking!" },
      { english: "He isn't listening",hebrew: 'הוּא לֹא מַקְשִׁיב',       emoji: '🙉', example: "He isn't listening to me." },
      { english: "They aren't coming",hebrew: 'הֵם לֹא בָּאִים',           emoji: '🚫', example: "They aren't coming today." },
      { english: 'Are you…?',         hebrew: 'הַאִם אַתָּה…?',            emoji: '❓', example: 'Are you listening?' },
      { english: 'Is she…?',          hebrew: 'הַאִם הִיא…?',              emoji: '❓', example: 'Is she sleeping?' },
      { english: 'What are you doing?',hebrew: 'מָה אַתָּה עוֹשֶׂה?',      emoji: '🤔', example: 'What are you doing right now?' },
    ],
    quiz: [
      {
        id: 'pg2q1', type: 'multiple-choice',
        question: '"He ___ (not listen)." — correct form?', answer: "isn't listening",
        options: ["doesn't listen", "isn't listening", "not listening", "aren't listening"], emoji: '🙉',
      },
      {
        id: 'pg2q2', type: 'fill-blank',
        question: '___ you listening? (❓)', answer: 'are',
        questionHebrew: '___ אתה מקשיב?',
      },
      {
        id: 'pg2q3', type: 'multiple-choice',
        question: '"Is she sleeping?" → short negative answer', answer: "No, she isn't.",
        options: ["No, she doesn't.", "No, she isn't.", "No, she aren't.", "No, she is."], emoji: '😴',
      },
      {
        id: 'pg2q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: "They aren't playing now.",
        options: ["They isn't playing now.", "They aren't playing now.", "They not are playing now.", "They don't playing now."], emoji: '⚽',
      },
      {
        id: 'pg2q5', type: 'fill-blank',
        question: "I'm ___ sleeping — I'm reading! (😤 — negative -ing form)", answer: 'not',
        questionHebrew: 'אני ___ ישן — אני קורא!',
      },
    ],
  },
  {
    level: 3,
    title: '-ing Spelling Rules',
    description: 'Learn the three -ing spelling rules: just add -ing, drop final -e, double final consonant',
    words: [
      { english: 'play → playing',   hebrew: 'לְשַׂחֵק ← מְשַׂחֵק', emoji: '⚽', example: 'She is playing.' },
      { english: 'eat → eating',     hebrew: 'לֶאֱכֹל ← אוֹכֵל',   emoji: '🍕', example: 'He is eating.' },
      { english: 'make → making',    hebrew: 'לַעֲשׂוֹת ← עוֹשֶׂה',  emoji: '🔨', example: 'She is making a cake.' },
      { english: 'write → writing',  hebrew: 'לִכְתֹּב ← כּוֹתֵב',  emoji: '✍️', example: 'I am writing a letter.' },
      { english: 'run → running',    hebrew: 'לָרוּץ ← רָץ',        emoji: '🏃', example: 'He is running.' },
      { english: 'swim → swimming',  hebrew: 'לִשְׂחוֹת ← שָׂח',    emoji: '🏊', example: 'She is swimming.' },
    ],
    quiz: [
      {
        id: 'pg3q1', type: 'multiple-choice',
        question: 'What is the -ing form of "make"?', answer: 'making',
        options: ['makeing', 'making', 'makking', 'makes'], emoji: '🔨',
      },
      {
        id: 'pg3q2', type: 'multiple-choice',
        question: 'What is the -ing form of "run"?', answer: 'running',
        options: ['runing', 'running', 'rune-ing', 'runs'], emoji: '🏃',
      },
      {
        id: 'pg3q3', type: 'fill-blank',
        question: 'She is ___ a cake. (🎂 — "-ing" of "make")', answer: 'making',
        questionHebrew: 'היא ___ עוגה.',
      },
      {
        id: 'pg3q4', type: 'multiple-choice',
        question: 'What is the -ing form of "write"?', answer: 'writing',
        options: ['writting', 'writing', 'writeing', 'wrote'], emoji: '✍️',
      },
      {
        id: 'pg3q5', type: 'fill-blank',
        question: 'He is ___ in the pool. (🏊 — "-ing" of "swim")', answer: 'swimming',
        questionHebrew: 'הוא ___ בבריכה.',
      },
    ],
  },
]
