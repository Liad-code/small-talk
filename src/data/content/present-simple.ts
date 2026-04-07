import type { SubjectLevel } from '@/types'

export const presentSimpleLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'I / You / We / They',
    description: 'Learn present simple with I, you, we, they — use the base verb with no changes',
    words: [
      { english: 'I eat',     hebrew: 'אֲנִי אוֹכֵל',      emoji: '🍕', example: 'I eat lunch at school.' },
      { english: 'You play',  hebrew: 'אַתָּה מְשַׂחֵק',    emoji: '⚽', example: 'You play football well.' },
      { english: 'We sleep',  hebrew: 'אֲנַחְנוּ יְשֵׁנִים', emoji: '😴', example: 'We sleep eight hours.' },
      { english: 'They run',  hebrew: 'הֵם רָצִים',          emoji: '🏃', example: 'They run every morning.' },
      { english: 'I live',    hebrew: 'אֲנִי גָּר',          emoji: '🏠', example: 'I live near the park.' },
      { english: 'They study',hebrew: 'הֵם לוֹמְדִים',       emoji: '📚', example: 'They study English every day.' },
    ],
    quiz: [
      {
        id: 'ps1q1', type: 'multiple-choice',
        question: 'Complete: "I ___ lunch at 1 pm." (eat)', answer: 'eat',
        options: ['eats', 'eat', 'eating', 'is eat'], emoji: '🍕',
      },
      {
        id: 'ps1q2', type: 'multiple-choice',
        question: 'Complete: "They ___ English every day." (study)', answer: 'study',
        options: ['studies', 'study', 'studying', 'studys'], emoji: '📚',
      },
      {
        id: 'ps1q3', type: 'fill-blank',
        question: 'We ___ football after school. (⚽)', answer: 'play',
        questionHebrew: 'אנחנו ___ כדורגל אחרי בית הספר.',
      },
      {
        id: 'ps1q4', type: 'multiple-choice',
        question: 'Present simple is used for:', answer: 'habits and routines',
        options: ['actions happening now', 'habits and routines', 'finished past actions', 'future plans'], emoji: '🔄',
      },
      {
        id: 'ps1q5', type: 'fill-blank',
        question: 'I ___ near the school. (🏠)', answer: 'live',
        questionHebrew: 'אני ___ ליד בית הספר.',
      },
    ],
  },
  {
    level: 2,
    title: 'He / She / It — Adding -s',
    description: 'With he, she, it — add -s (or -es, -ies) to the verb in present simple',
    words: [
      { english: 'He eats',   hebrew: 'הוּא אוֹכֵל',      emoji: '🍕', example: 'He eats breakfast early.' },
      { english: 'She plays', hebrew: 'הִיא מְשַׂחֶקֶת',  emoji: '⚽', example: 'She plays the piano.' },
      { english: 'He goes',   hebrew: 'הוּא הוֹלֵךְ',     emoji: '🚶', example: 'He goes to school by bus.' },
      { english: 'She watches',hebrew: 'הִיא צוֹפָה',     emoji: '📺', example: 'She watches TV at night.' },
      { english: 'He has',    hebrew: 'יֵשׁ לוֹ',         emoji: '🎒', example: 'He has a big bag.' },
      { english: 'She cries', hebrew: 'הִיא בּוֹכָה',     emoji: '😢', example: 'She cries when she is sad.' },
    ],
    quiz: [
      {
        id: 'ps2q1', type: 'multiple-choice',
        question: '"She ___ to school by bus." (go)', answer: 'goes',
        options: ['go', 'goes', 'gos', 'going'], emoji: '🚌',
      },
      {
        id: 'ps2q2', type: 'multiple-choice',
        question: '"He ___ TV every evening." (watch)', answer: 'watches',
        options: ['watch', 'watchs', 'watches', 'watching'], emoji: '📺',
      },
      {
        id: 'ps2q3', type: 'fill-blank',
        question: 'She ___ the piano every morning. (🎹)', answer: 'plays',
        questionHebrew: 'היא ___ פסנתר כל בוקר.',
      },
      {
        id: 'ps2q4', type: 'multiple-choice',
        question: 'cry → he/she ___ (spelling rule: y→i+es)', answer: 'cries',
        options: ['crys', 'cries', 'cryes', 'cry'], emoji: '😢',
      },
      {
        id: 'ps2q5', type: 'fill-blank',
        question: 'He ___ a red bike. (🚲 — "have" form for he)', answer: 'has',
        questionHebrew: 'יש ___ אופניים אדומות.',
      },
    ],
  },
  {
    level: 3,
    title: "Don't / Doesn't + Adverbs",
    description: 'Learn negatives, questions and frequency adverbs — always, usually, sometimes, never',
    words: [
      { english: "I don't",      hebrew: 'אֲנִי לֹא',    emoji: '🚫', example: "I don't like spiders." },
      { english: "She doesn't",  hebrew: 'הִיא לֹא',    emoji: '🚫', example: "She doesn't eat meat." },
      { english: 'Always',       hebrew: 'תָּמִיד',      emoji: '♾️', example: 'I always brush my teeth.' },
      { english: 'Usually',      hebrew: 'בְּדֶרֶךְ כְּלַל', emoji: '📊', example: 'She usually walks to school.' },
      { english: 'Sometimes',    hebrew: 'לִפְעָמִים',   emoji: '🔁', example: 'We sometimes eat pizza.' },
      { english: 'Never',        hebrew: 'אַף פַּעַם לֹא', emoji: '❌', example: 'He never forgets his homework.' },
    ],
    quiz: [
      {
        id: 'ps3q1', type: 'multiple-choice',
        question: '"She ___ eat meat." (negative)', answer: "doesn't",
        options: ["don't", "doesn't", "isn't", "no"], emoji: '🥩',
      },
      {
        id: 'ps3q2', type: 'fill-blank',
        question: "I ___ like spiders! (🕷️ — negative)", answer: "don't",
        questionHebrew: 'אני ___ אוהב עכבישים!',
      },
      {
        id: 'ps3q3', type: 'multiple-choice',
        question: '"Do you ___ football?" (question form, play)', answer: 'play',
        options: ['plays', 'play', 'playing', 'played'], emoji: '⚽',
      },
      {
        id: 'ps3q4', type: 'multiple-choice',
        question: 'Which adverb means "100% of the time"?', answer: 'always',
        options: ['sometimes', 'usually', 'always', 'never'], emoji: '♾️',
      },
      {
        id: 'ps3q5', type: 'fill-blank',
        question: 'He ___ forgets his homework. (❌ — 0% of the time)', answer: 'never',
        questionHebrew: 'הוא ___ שוכח את שיעורי הבית שלו.',
      },
    ],
  },
]
