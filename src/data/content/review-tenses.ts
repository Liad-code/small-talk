import type { SubjectLevel } from '@/types'

export const reviewTensesLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Present Tenses Review',
    description: 'Practise choosing between present simple (habit) and present progressive (now)',
    words: [
      { english: 'Present simple — habit',   hebrew: 'הוֹוֶה פָּשׁוּט — הֶרְגֵּל', emoji: '🔄', example: 'She reads every night.' },
      { english: 'Present progressive — now', hebrew: 'הוֹוֶה מִתְמַשֵּׁךְ — עַכְשָׁו', emoji: '⏱️', example: 'She is reading now.' },
      { english: 'I eat / I am eating',     hebrew: 'אֲנִי אוֹכֵל / אוֹכֵל עַכְשָׁו', emoji: '🍕', example: 'I eat at 1pm. I am eating now.' },
      { english: 'He plays / He is playing', hebrew: 'הוּא מְשַׂחֵק / עַכְשָׁו', emoji: '⚽', example: 'He plays football. He is playing now.' },
      { english: 'Signal words: always / now', hebrew: 'תָּמִיד / עַכְשָׁו', emoji: '🔑', example: 'Always → simple. Now → progressive.' },
      { english: 'Do/Does vs Am/Is/Are',     hebrew: 'עֶזֶר לְהוֹוֶה פָּשׁוּט / מִתְמַשֵּׁךְ', emoji: '🔧', example: 'Do you play? Are you playing?' },
    ],
    quiz: [
      {
        id: 'rt1q1', type: 'multiple-choice',
        question: '"She always ___ (eat) breakfast." — correct form?', answer: 'eats',
        options: ['eat', 'eats', 'is eating', 'are eating'], emoji: '🥣',
      },
      {
        id: 'rt1q2', type: 'multiple-choice',
        question: '"Look! He ___ (run)." — correct form?', answer: 'is running',
        options: ['runs', 'run', 'is running', 'are running'], emoji: '🏃',
      },
      {
        id: 'rt1q3', type: 'fill-blank',
        question: 'She ___ every night. (📖 — habit, "read")', answer: 'reads',
        questionHebrew: 'היא ___ כל לילה.',
      },
      {
        id: 'rt1q4', type: 'multiple-choice',
        question: '"What ___ you doing right now?"', answer: 'are',
        options: ['do', 'does', 'are', 'is'], emoji: '🤔',
      },
      {
        id: 'rt1q5', type: 'fill-blank',
        question: 'He ___ playing football now. (⚽ — right now)', answer: 'is',
        questionHebrew: 'הוא ___ משחק כדורגל עכשיו.',
      },
    ],
  },
  {
    level: 2,
    title: 'Past Tenses Review',
    description: 'Practise past simple (regular/irregular) and past was/were',
    words: [
      { english: 'was / were',            hebrew: 'הָיָה / הָיוּ',       emoji: '⏪', example: 'I was tired. They were late.' },
      { english: 'Regular -ed',           hebrew: 'עָבָר סָדִיר',       emoji: '📝', example: 'She walked, I cleaned.' },
      { english: 'Irregular',             hebrew: 'עָבָר לֹא סָדִיר',   emoji: '⚡', example: 'He went, she ate, I saw.' },
      { english: "didn't + base verb",    hebrew: 'שְׁלִילָה בְּעָבָר', emoji: '🚫', example: "I didn't go. She didn't eat." },
      { english: 'Did…? + base verb',     hebrew: 'שְׁאֵלָה בְּעָבָר', emoji: '❓', example: 'Did you eat? Did she go?' },
      { english: 'Yesterday / Last week', hebrew: 'אֶתְמוֹל / שָׁבוּעַ שֶׁעָבַר', emoji: '📅', example: 'I played yesterday.' },
    ],
    quiz: [
      {
        id: 'rt2q1', type: 'multiple-choice',
        question: '"She ___ (go) to the market yesterday." — past simple?', answer: 'went',
        options: ['goed', 'gone', 'went', 'goes'], emoji: '🛒',
      },
      {
        id: 'rt2q2', type: 'multiple-choice',
        question: '"They ___ tired after the match." — past of "be"?', answer: 'were',
        options: ['was', 'were', 'be', 'are'], emoji: '⚽',
      },
      {
        id: 'rt2q3', type: 'fill-blank',
        question: 'I ___ eat my dinner — I was not hungry. (🚫 — past negative)', answer: "didn't",
        questionHebrew: 'לא ___ אכלתי ארוחת ערב — לא הייתי רעב.',
      },
      {
        id: 'rt2q4', type: 'multiple-choice',
        question: '"___ you enjoy the film?" (past question)', answer: 'Did',
        options: ['Do', 'Does', 'Did', 'Was'], emoji: '🎬',
      },
      {
        id: 'rt2q5', type: 'fill-blank',
        question: 'She ___ at home yesterday. (👧 — past of "is")', answer: 'was',
        questionHebrew: 'היא ___ בבית אתמול.',
      },
    ],
  },
  {
    level: 3,
    title: 'Future Tenses Review',
    description: 'Practise will (instant/prediction) and be going to (plans/evidence) in full sentences',
    words: [
      { english: 'will + base verb',          hebrew: 'עָתִיד עִם will',       emoji: '🔮', example: "It will be sunny tomorrow." },
      { english: 'be going to + base verb',   hebrew: 'עָתִיד עִם going to',   emoji: '📋', example: "I'm going to visit Grandma." },
      { english: "won't + base verb",         hebrew: 'שְׁלִילָה בְּעָתִיד', emoji: '🚫', example: "He won't be late." },
      { english: "not going to + base verb",  hebrew: 'שְׁלִילָה עִם going to',emoji: '❌', example: "She isn't going to come." },
      { english: 'Will…? / Are you going to…?',hebrew: 'שְׁאֵלָה בְּעָתִיד',  emoji: '❓', example: 'Will it rain? Are you going to study?' },
      { english: 'Mixed tenses',              hebrew: 'תַּרְגּוּל מְעֹרָב',   emoji: '🎯', example: 'Present? Past? Future? Choose wisely!' },
    ],
    quiz: [
      {
        id: 'rt3q1', type: 'multiple-choice',
        question: '"I ___ have the chicken, please." (deciding right now)', answer: "'ll",
        options: ["'m going to", "'ll", "was", "did"], emoji: '🍗',
      },
      {
        id: 'rt3q2', type: 'multiple-choice',
        question: '"Look at those clouds! It ___ (rain)." — use evidence', answer: "is going to",
        options: ["will", "is going to", "was", "rained"], emoji: '🌧️',
      },
      {
        id: 'rt3q3', type: 'fill-blank',
        question: 'She ___ going to study medicine. (📋 — her life plan)', answer: 'is',
        questionHebrew: 'היא ___ ללמוד רפואה.',
      },
      {
        id: 'rt3q4', type: 'multiple-choice',
        question: 'Choose the correct tense for a habit: "She ___ every morning." (run)', answer: 'runs',
        options: ['ran', 'is running', 'will run', 'runs'], emoji: '🌅',
      },
      {
        id: 'rt3q5', type: 'fill-blank',
        question: 'He ___ (not) come — he is sick. (🚫 — future negative with will)', answer: "won't",
        questionHebrew: 'הוא ___ יגיע — הוא חולה.',
      },
    ],
  },
]
