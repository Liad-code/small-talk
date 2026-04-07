import type { SubjectLevel } from '@/types'

export const simpleVsProgLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Spot the Habit',
    description: 'Recognise present simple — it describes habits, routines and things that are generally true',
    words: [
      { english: 'Every day',    hebrew: 'כָּל יוֹם',          emoji: '🔄', example: 'I walk to school every day.' },
      { english: 'Usually',      hebrew: 'בְּדֶרֶךְ כְּלַל',   emoji: '📊', example: 'She usually has tea.' },
      { english: 'Always',       hebrew: 'תָּמִיד',             emoji: '♾️', example: 'He always eats breakfast.' },
      { english: 'On Mondays',   hebrew: 'בְּיוֹם שֵׁנִי',     emoji: '📅', example: 'We play football on Mondays.' },
      { english: 'In the morning', hebrew: 'בַּבֹּקֶר',        emoji: '🌅', example: 'She reads in the morning.' },
      { english: 'Never',        hebrew: 'אַף פַּעַם לֹא',     emoji: '❌', example: 'He never misses class.' },
    ],
    quiz: [
      {
        id: 'sv1q1', type: 'multiple-choice',
        question: '"She ___ tea every morning." — which tense?', answer: 'present simple',
        options: ['present progressive', 'present simple', 'past simple', 'future'], emoji: '☕',
      },
      {
        id: 'sv1q2', type: 'multiple-choice',
        question: 'Signal words for present simple include:', answer: 'every day, always, usually',
        options: ['now, at the moment, look!', 'every day, always, usually', 'yesterday, last week', 'tomorrow, next week'], emoji: '🔄',
      },
      {
        id: 'sv1q3', type: 'fill-blank',
        question: 'I ___ to school every day. (🚶 — habit)', answer: 'walk',
        questionHebrew: 'אני ___ לבית הספר כל יום.',
      },
      {
        id: 'sv1q4', type: 'multiple-choice',
        question: 'Which sentence is in present simple?', answer: 'She usually eats salad for lunch.',
        options: ['She is eating salad now.', 'She usually eats salad for lunch.', 'She ate salad yesterday.', 'She will eat salad.'], emoji: '🥗',
      },
      {
        id: 'sv1q5', type: 'fill-blank',
        question: 'He ___ forgets his pencil. (♾️ — always true)', answer: 'never',
        questionHebrew: 'הוא ___ שוכח את העיפרון שלו.',
      },
    ],
  },
  {
    level: 2,
    title: 'Spot the Moment',
    description: 'Recognise present progressive — it describes actions happening RIGHT NOW at this moment',
    words: [
      { english: 'Now',          hebrew: 'עַכְשָׁו',     emoji: '⏱️', example: 'She is studying now.' },
      { english: 'At the moment',hebrew: 'כָּרֶגַע',     emoji: '🕐', example: 'He is sleeping at the moment.' },
      { english: 'Right now',    hebrew: 'בַּרֶגַע הַזֶּה', emoji: '📍', example: 'We are learning right now.' },
      { english: 'Look!',        hebrew: 'הַבֵּט!',       emoji: '👀', example: 'Look! It is raining.' },
      { english: 'Listen!',      hebrew: 'הַקְשֵׁב!',     emoji: '👂', example: 'Listen! She is singing.' },
      { english: 'Today (temp)', hebrew: 'הַיּוֹם (זְמָנִי)', emoji: '📆', example: 'Today I am wearing a hat.' },
    ],
    quiz: [
      {
        id: 'sv2q1', type: 'multiple-choice',
        question: '"Look! She ___ (dance) on the stage." — which form?', answer: 'is dancing',
        options: ['dances', 'dance', 'is dancing', 'are dancing'], emoji: '💃',
      },
      {
        id: 'sv2q2', type: 'multiple-choice',
        question: 'Signal words for present progressive include:', answer: 'now, at the moment, look!',
        options: ['every day, always', 'now, at the moment, look!', 'yesterday, last week', 'tomorrow, next week'], emoji: '⏱️',
      },
      {
        id: 'sv2q3', type: 'fill-blank',
        question: 'It ___ raining right now! (🌧️)', answer: 'is',
        questionHebrew: 'יורד ___ גשם עכשיו!',
      },
      {
        id: 'sv2q4', type: 'multiple-choice',
        question: 'Which sentence is in present progressive?', answer: 'He is eating his lunch now.',
        options: ['He eats lunch at 1 pm.', 'He ate lunch.', 'He is eating his lunch now.', 'He will eat lunch.'], emoji: '🍕',
      },
      {
        id: 'sv2q5', type: 'fill-blank',
        question: 'Listen! She ___ singing! (👂 — right now)', answer: 'is',
        questionHebrew: 'הקשב! היא ___ שרה!',
      },
    ],
  },
  {
    level: 3,
    title: 'Simple or Progressive?',
    description: 'Choose the correct tense — present simple (habit) or present progressive (right now)',
    words: [
      { english: 'Habit vs now',      hebrew: 'הֶרְגֵּל לְעֻמַּת עַכְשָׁו', emoji: '↔️', example: 'I eat / I am eating.' },
      { english: 'She reads / is reading', hebrew: 'הִיא קוֹרֵאת / קוֹרֵאת עַכְשָׁו', emoji: '📖', example: 'She reads every night. She is reading now.' },
      { english: 'He runs / is running',   hebrew: 'הוּא רָץ / רָץ עַכְשָׁו',    emoji: '🏃', example: 'He runs daily. He is running now.' },
      { english: 'They play / are playing',hebrew: 'הֵם מְשַׂחֲקִים / עַכְשָׁו',  emoji: '⚽', example: 'They play on Fridays. They are playing now.' },
      { english: 'I walk / am walking',    hebrew: 'אֲנִי הוֹלֵךְ / הוֹלֵךְ עַכְשָׁו', emoji: '🚶', example: 'I usually walk. I am walking home now.' },
      { english: 'She sings / is singing', hebrew: 'הִיא שָׁרָה / שָׁרָה עַכְשָׁו',  emoji: '🎤', example: 'She often sings. She is singing now.' },
    ],
    quiz: [
      {
        id: 'sv3q1', type: 'multiple-choice',
        question: '"I usually ___ (walk) to school." — which form?', answer: 'walk',
        options: ['am walking', 'walking', 'walk', 'walks'], emoji: '🚶',
      },
      {
        id: 'sv3q2', type: 'multiple-choice',
        question: '"Look! She ___ (sing) on stage." — which form?', answer: 'is singing',
        options: ['sings', 'singing', 'is singing', 'are singing'], emoji: '🎤',
      },
      {
        id: 'sv3q3', type: 'fill-blank',
        question: 'He ___ football every Friday. (⚽ — habit)', answer: 'plays',
        questionHebrew: 'הוא ___ כדורגל כל יום שישי.',
      },
      {
        id: 'sv3q4', type: 'multiple-choice',
        question: '"___ you listening?" (right now)', answer: 'Are',
        options: ['Do', 'Does', 'Are', 'Is'], emoji: '👂',
      },
      {
        id: 'sv3q5', type: 'fill-blank',
        question: 'She ___ reading right now. (📖 — at this moment)', answer: 'is',
        questionHebrew: 'היא ___ קוראת עכשיו.',
      },
    ],
  },
]
