import type { SubjectLevel } from '@/types'

export const pastSimpleLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Regular Verbs — Add -ed',
    description: 'Learn regular past simple verbs — add -ed to form the past tense',
    words: [
      { english: 'walked',  hebrew: 'הָלַכְתִּי / הָלַך',  emoji: '🚶', example: 'I walked to school yesterday.' },
      { english: 'played',  hebrew: 'שִׂחַקְתִּי / שִׂחֵק',  emoji: '⚽', example: 'She played football last night.' },
      { english: 'watched', hebrew: 'צָפִיתִי / צָפָה',      emoji: '📺', example: 'We watched a film yesterday.' },
      { english: 'talked',  hebrew: 'דִּבַּרְתִּי / דִּבֵּר',emoji: '🗣️', example: 'He talked to his friend.' },
      { english: 'jumped',  hebrew: 'קָפַצְתִּי / קָפַץ',    emoji: '🤸', example: 'The dog jumped over the fence.' },
      { english: 'cleaned', hebrew: 'נִקֵּיתִי / נִקָּה',    emoji: '🧹', example: 'She cleaned her room.' },
    ],
    quiz: [
      {
        id: 'pk1q1', type: 'multiple-choice',
        question: '"She ___ (play) football yesterday." — past simple?', answer: 'played',
        options: ['play', 'plays', 'played', 'is playing'], emoji: '⚽',
      },
      {
        id: 'pk1q2', type: 'multiple-choice',
        question: '"We ___ (watch) a film last night." — past simple?', answer: 'watched',
        options: ['watch', 'watches', 'watching', 'watched'], emoji: '📺',
      },
      {
        id: 'pk1q3', type: 'fill-blank',
        question: 'I ___ to school this morning. (🚶 — past of "walk")', answer: 'walked',
        questionHebrew: 'הלכתי ___ לבית הספר הבוקר.',
      },
      {
        id: 'pk1q4', type: 'multiple-choice',
        question: 'Regular past simple verbs end in:', answer: '-ed',
        options: ['-ing', '-s', '-ed', '-er'], emoji: '📝',
      },
      {
        id: 'pk1q5', type: 'fill-blank',
        question: 'She ___ her room yesterday. (🧹 — past of "clean")', answer: 'cleaned',
        questionHebrew: 'היא ___ את החדר שלה אתמול.',
      },
    ],
  },
  {
    level: 2,
    title: 'Irregular Verbs',
    description: 'Learn common irregular past simple verbs that have special forms',
    words: [
      { english: 'went',  hebrew: 'הָלַכְתִּי / הָלַך',  emoji: '🚶', example: 'I went to the park yesterday.' },
      { english: 'came',  hebrew: 'בָּאתִי / בָּא',       emoji: '🚪', example: 'She came to school early.' },
      { english: 'ate',   hebrew: 'אָכַלְתִּי / אָכַל',   emoji: '🍕', example: 'He ate pizza last night.' },
      { english: 'drank', hebrew: 'שָׁתִיתִי / שָׁתָה',   emoji: '🥤', example: 'We drank juice this morning.' },
      { english: 'saw',   hebrew: 'רָאִיתִי / רָאָה',     emoji: '👀', example: 'I saw a rainbow.' },
      { english: 'had',   hebrew: 'הָיָה לִי / הָיָה לוֹ', emoji: '🎁', example: 'She had a great birthday.' },
    ],
    quiz: [
      {
        id: 'pk2q1', type: 'multiple-choice',
        question: '"She ___ (go) to the park yesterday." — past simple?', answer: 'went',
        options: ['goed', 'gone', 'went', 'goes'], emoji: '🌳',
      },
      {
        id: 'pk2q2', type: 'multiple-choice',
        question: '"We ___ (eat) pizza for dinner." — past simple?', answer: 'ate',
        options: ['eated', 'eat', 'eaten', 'ate'], emoji: '🍕',
      },
      {
        id: 'pk2q3', type: 'fill-blank',
        question: 'I ___ a rainbow after the rain. (👀 — past of "see")', answer: 'saw',
        questionHebrew: 'ראיתי ___ קשת בענן אחרי הגשם.',
      },
      {
        id: 'pk2q4', type: 'multiple-choice',
        question: '"She ___ (come) home late last night." — past simple?', answer: 'came',
        options: ['comed', 'comes', 'came', 'come'], emoji: '🏠',
      },
      {
        id: 'pk2q5', type: 'fill-blank',
        question: 'He ___ a great time at the party. (🎉 — past of "have")', answer: 'had',
        questionHebrew: 'הוא ___ זמן נהדר במסיבה.',
      },
    ],
  },
  {
    level: 3,
    title: "Didn't / Did You?",
    description: 'Learn the negative (didn\'t + base verb) and question (Did…?) forms of past simple',
    words: [
      { english: "I didn't",        hebrew: 'לֹא…',                  emoji: '🚫', example: "I didn't go to school today." },
      { english: "She didn't",      hebrew: 'הִיא לֹא…',             emoji: '👧', example: "She didn't eat breakfast." },
      { english: "They didn't",     hebrew: 'הֵם לֹא…',              emoji: '👫', example: "They didn't finish the test." },
      { english: 'Did you…?',       hebrew: 'הַאִם אַתָּה…?',         emoji: '❓', example: 'Did you do your homework?' },
      { english: 'Yes, I did.',     hebrew: 'כֵּן.',                  emoji: '✅', example: 'Did you study? Yes, I did.' },
      { english: 'No, I didn\'t.',  hebrew: 'לֹא.',                   emoji: '❌', example: "Did you eat? No, I didn't." },
    ],
    quiz: [
      {
        id: 'pk3q1', type: 'multiple-choice',
        question: '"She ___ eat breakfast." (negative past)', answer: "didn't",
        options: ["doesn't", "didn't", "wasn't", "not did"], emoji: '🥐',
      },
      {
        id: 'pk3q2', type: 'fill-blank',
        question: "___ you do your homework? (❓)", answer: 'did',
        questionHebrew: '___ עשית את שיעורי הבית?',
      },
      {
        id: 'pk3q3', type: 'multiple-choice',
        question: '"Did you go to the park?" → short positive answer', answer: 'Yes, I did.',
        options: ['Yes, I went.', 'Yes, I did.', 'Yes, I was.', 'Yes, I do.'], emoji: '✅',
      },
      {
        id: 'pk3q4', type: 'multiple-choice',
        question: 'Which is correct? (negative past of "go")', answer: "I didn't go.",
        options: ["I didn't went.", "I not went.", "I didn't go.", "I wasn't go."], emoji: '🚶',
      },
      {
        id: 'pk3q5', type: 'fill-blank',
        question: "I ___ finish my homework last night. (🚫 — negative)", answer: "didn't",
        questionHebrew: 'לא ___ סיימתי את שיעורי הבית אמש.',
      },
    ],
  },
]
