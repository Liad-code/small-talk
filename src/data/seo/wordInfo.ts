// SEO word data for the public vocabulary pages.
// Key = item.word exactly as it appears in src/data/step1/trackDCategories.ts (case-sensitive).
// Words that appear in more than one category (orange, fish, sun) have a single entry.

export interface WordInfo {
  he: string        // Hebrew translation
  say: string       // English pronunciation written in Hebrew letters
  example: string   // short A1 English sentence
  exampleHe: string // Hebrew translation of the sentence
}

export const WORD_INFO: Record<string, WordInfo> = {
  // ── Numbers ──
  one:   { he: 'אחת', say: 'וַאן', example: 'I have one dog.', exampleHe: 'יש לי כלב אחד.' },
  two:   { he: 'שתיים', say: 'טוּ', example: 'I see two cats.', exampleHe: 'אני רואה שני חתולים.' },
  three: { he: 'שלוש', say: 'תְּרִי', example: 'I have three balls.', exampleHe: 'יש לי שלושה כדורים.' },
  four:  { he: 'ארבע', say: 'פוֹר', example: 'A dog has four legs.', exampleHe: 'לכלב יש ארבע רגליים.' },
  five:  { he: 'חמש', say: 'פַייב', example: 'I have five fingers.', exampleHe: 'יש לי חמש אצבעות.' },
  six:   { he: 'שש', say: 'סִיקְס', example: 'Six birds are in the tree.', exampleHe: 'שש ציפורים על העץ.' },
  seven: { he: 'שבע', say: 'סֶבֶן', example: 'A week has seven days.', exampleHe: 'בשבוע יש שבעה ימים.' },
  eight: { he: 'שמונה', say: 'אֵייט', example: 'A spider has eight legs.', exampleHe: 'לעכביש יש שמונה רגליים.' },
  nine:  { he: 'תשע', say: 'נַיין', example: 'My brother is nine.', exampleHe: 'אחי בן תשע.' },
  ten:   { he: 'עשר', say: 'טֶן', example: 'I can count to ten.', exampleHe: 'אני יודע לספור עד עשר.' },

  // ── Colors ──
  red:    { he: 'אדום', say: 'רֶד', example: 'The apple is red.', exampleHe: 'התפוח אדום.' },
  yellow: { he: 'צהוב', say: 'יֶלוֹ', example: 'The sun is yellow.', exampleHe: 'השמש צהובה.' },
  blue:   { he: 'כחול', say: 'בְּלוּ', example: 'The sky is blue.', exampleHe: 'השמיים כחולים.' },
  black:  { he: 'שחור', say: 'בְּלֶק', example: 'My cat is black.', exampleHe: 'החתול שלי שחור.' },
  green:  { he: 'ירוק', say: 'גְרִין', example: 'The grass is green.', exampleHe: 'הדשא ירוק.' },
  // appears in both Colors and Fruits
  orange: { he: 'כָּתֹם / תַּפּוּז', say: 'אוֹרֶנְג\'', example: 'The orange is orange.', exampleHe: 'התפוז כתום.' },

  // ── Weather ──
  day:   { he: 'יום', say: 'דֵיי', example: 'It is a sunny day.', exampleHe: 'זה יום שמשי.' },
  night: { he: 'לילה', say: 'נַייט', example: 'Good night, Mom!', exampleHe: 'לילה טוב, אמא!' },
  // appears in both Weather and Nature
  sun:   { he: 'שמש', say: 'סַאן', example: 'The sun is hot.', exampleHe: 'השמש חמה.' },
  rain:  { he: 'גשם', say: 'רֵיין', example: 'I like the rain.', exampleHe: 'אני אוהב את הגשם.' },
  cloud: { he: 'ענן', say: 'קְלַאוּד', example: 'I see a big cloud.', exampleHe: 'אני רואה ענן גדול.' },
  snow:  { he: 'שלג', say: 'סְנוֹ', example: 'The snow is white.', exampleHe: 'השלג לבן.' },

  // ── Seasons ──
  summer: { he: 'קיץ', say: 'סַאמֶר', example: 'I swim in the summer.', exampleHe: 'אני שוחה בקיץ.' },
  spring: { he: 'אביב', say: 'סְפְּרִינְג', example: 'Flowers grow in spring.', exampleHe: 'באביב צומחים פרחים.' },
  fall:   { he: 'סתיו', say: 'פוֹל', example: 'Leaves are yellow in the fall.', exampleHe: 'בסתיו העלים צהובים.' },
  winter: { he: 'חורף', say: 'וִינְטֶר', example: 'It is cold in winter.', exampleHe: 'בחורף קר.' },

  // ── Emotions ──
  happy:  { he: 'שמח', say: 'הֶפִּי', example: 'I am happy today.', exampleHe: 'אני שמח היום.' },
  sad:    { he: 'עצוב', say: 'סֶד', example: 'The boy is sad.', exampleHe: 'הילד עצוב.' },
  angry:  { he: 'כועס', say: 'אֶנְגְרִי', example: 'Dad is not angry.', exampleHe: 'אבא לא כועס.' },
  sleepy: { he: 'עייף, רוצה לישון', say: 'סְלִיפִּי', example: 'I am sleepy.', exampleHe: 'אני רוצה לישון.' },

  // ── Family ──
  mother:  { he: 'אמא', say: 'מַאדֶ\'ר', example: 'This is my mother.', exampleHe: 'זאת אמא שלי.' },
  father:  { he: 'אבא', say: 'פָאדֶ\'ר', example: 'My father is tall.', exampleHe: 'אבא שלי גבוה.' },
  sister:  { he: 'אחות', say: 'סִיסְטֶר', example: 'I love my sister.', exampleHe: 'אני אוהב את אחותי.' },
  brother: { he: 'אח', say: 'בְּרַאדֶ\'ר', example: 'My brother is six.', exampleHe: 'אחי בן שש.' },
  baby:    { he: 'תינוק', say: 'בֵּייבִּי', example: 'The baby is sleeping.', exampleHe: 'התינוק ישן.' },

  // ── Days of the week ──
  Sunday:    { he: 'יום ראשון', say: 'סַאנְדֵי', example: 'We go to school on Sunday.', exampleHe: 'ביום ראשון אנחנו הולכים לבית הספר.' },
  Monday:    { he: 'יום שני', say: 'מַאנְדֵי', example: 'Today is Monday.', exampleHe: 'היום יום שני.' },
  Tuesday:   { he: 'יום שלישי', say: 'טְיוּזְדֵי', example: 'I swim on Tuesday.', exampleHe: 'אני שוחה ביום שלישי.' },
  Wednesday: { he: 'יום רביעי', say: 'וֶנְזְדֵי', example: 'Wednesday is a good day.', exampleHe: 'יום רביעי הוא יום טוב.' },
  Thursday:  { he: 'יום חמישי', say: 'ת\'רְזְדֵי', example: 'I see Grandma on Thursday.', exampleHe: 'ביום חמישי אני רואה את סבתא.' },
  Friday:    { he: 'יום שישי', say: 'פְרַיידֵי', example: 'I like Friday!', exampleHe: 'אני אוהב את יום שישי!' },
  Saturday:  { he: 'שבת', say: 'סֶטֶרְדֵי', example: 'We rest on Saturday.', exampleHe: 'בשבת אנחנו נחים.' },

  // ── Face ──
  face:  { he: 'פנים', say: 'פֵייס', example: 'This is my face.', exampleHe: 'אלה הפנים שלי.' },
  ears:  { he: 'אוזניים', say: 'אִירְז', example: 'I hear with my ears.', exampleHe: 'אני שומע באוזניים.' },
  nose:  { he: 'אף', say: 'נוֹז', example: 'The dog has a black nose.', exampleHe: 'לכלב יש אף שחור.' },
  mouth: { he: 'פה', say: 'מַאוּת\'', example: 'Open your mouth.', exampleHe: 'תפתח את הפה.' },
  eyes:  { he: 'עיניים', say: 'אַייז', example: 'My eyes are brown.', exampleHe: 'העיניים שלי חומות.' },

  // ── Body ──
  hands: { he: 'ידיים', say: 'הֶנְדְז', example: 'Wash your hands.', exampleHe: 'תשטוף ידיים.' },
  body:  { he: 'גוף', say: 'בָּאדִי', example: 'Move your body!', exampleHe: 'תזיז את הגוף!' },
  legs:  { he: 'רגליים', say: 'לֶגְז', example: 'I run with my legs.', exampleHe: 'אני רץ ברגליים.' },
  head:  { he: 'ראש', say: 'הֶד', example: 'Put the hat on your head.', exampleHe: 'שים את הכובע על הראש.' },
  hair:  { he: 'שיער', say: 'הֵר', example: 'My hair is long.', exampleHe: 'השיער שלי ארוך.' },

  // ── School ──
  teacher: { he: 'מורה', say: 'טִיצֶ\'ר', example: 'My teacher is nice.', exampleHe: 'המורה שלי נחמדה.' },
  pupils:  { he: 'תלמידים', say: 'פְּיוּפִּלְז', example: 'The pupils are in class.', exampleHe: 'התלמידים בכיתה.' },
  school:  { he: 'בית ספר', say: 'סְקוּל', example: 'I go to school.', exampleHe: 'אני הולך לבית הספר.' },
  chair:   { he: 'כיסא', say: 'צֶ\'ר', example: 'Sit on the chair.', exampleHe: 'שב על הכיסא.' },
  pencil:  { he: 'עיפרון', say: 'פֶּנְסִיל', example: 'I have a red pencil.', exampleHe: 'יש לי עיפרון אדום.' },
  pen:     { he: 'עט', say: 'פֶּן', example: 'This is my blue pen.', exampleHe: 'זה העט הכחול שלי.' },

  // ── Senses ──
  see:   { he: 'לראות', say: 'סִי', example: 'I can see a bird.', exampleHe: 'אני רואה ציפור.' },
  smell: { he: 'להריח', say: 'סְמֶל', example: 'I can smell a flower.', exampleHe: 'אני מריח פרח.' },
  hear:  { he: 'לשמוע', say: 'הִיר', example: 'I can hear music.', exampleHe: 'אני שומע מוזיקה.' },
  taste: { he: 'לטעום', say: 'טֵייסְט', example: 'I can taste the cake.', exampleHe: 'אני טועם את העוגה.' },
  touch: { he: 'לגעת', say: 'טַאץ\'', example: 'I can touch the dog.', exampleHe: 'אני נוגע בכלב.' },

  // ── Farm animals ──
  cat:     { he: 'חתול', say: 'קֶט', example: 'The cat is small.', exampleHe: 'החתול קטן.' },
  dog:     { he: 'כלב', say: 'דוֹג', example: 'My dog can run fast.', exampleHe: 'הכלב שלי רץ מהר.' },
  // appears in both Farm Animals and Food
  fish:    { he: 'דג', say: 'פִישׁ', example: 'The fish is in the water.', exampleHe: 'הדג במים.' },
  horse:   { he: 'סוס', say: 'הוֹרְס', example: 'The horse is big.', exampleHe: 'הסוס גדול.' },
  sheep:   { he: 'כבשה', say: 'שִׁיפּ', example: 'The sheep is white.', exampleHe: 'הכבשה לבנה.' },
  chicken: { he: 'תרנגולת', say: 'צִ\'יקֶן', example: 'The chicken has an egg.', exampleHe: 'לתרנגולת יש ביצה.' },

  // ── Jungle animals ──
  lion:     { he: 'אריה', say: 'לַייאֶן', example: 'The lion is strong.', exampleHe: 'האריה חזק.' },
  tiger:    { he: 'טיגריס', say: 'טַייגֶר', example: 'The tiger is orange and black.', exampleHe: 'הטיגריס כתום ושחור.' },
  zebra:    { he: 'זברה', say: 'זִיבְּרָה', example: 'The zebra has stripes.', exampleHe: 'לזברה יש פסים.' },
  elephant: { he: 'פיל', say: 'אֶלֶפַנְט', example: 'The elephant is very big.', exampleHe: 'הפיל גדול מאוד.' },
  snake:    { he: 'נחש', say: 'סְנֵייק', example: 'The snake is long.', exampleHe: 'הנחש ארוך.' },
  bear:     { he: 'דוב', say: 'בֵּר', example: 'The bear likes honey.', exampleHe: 'הדוב אוהב דבש.' },

  // ── Prepositions ──
  in:        { he: 'בתוך', say: 'אִין', example: 'The cat is in the box.', exampleHe: 'החתול בתוך הקופסה.' },
  on:        { he: 'על', say: 'אוֹן', example: 'The book is on the table.', exampleHe: 'הספר על השולחן.' },
  under:     { he: 'מתחת ל־', say: 'אַנְדֶר', example: 'The ball is under the bed.', exampleHe: 'הכדור מתחת למיטה.' },
  'next to': { he: 'ליד', say: 'נֶקְסְט טוּ', example: 'The dog is next to me.', exampleHe: 'הכלב לידי.' },

  // ── Fruits ──
  apple:  { he: 'תפוח', say: 'אֶפֶּל', example: 'I eat a green apple.', exampleHe: 'אני אוכל תפוח ירוק.' },
  banana: { he: 'בננה', say: 'בְּנֶנָה', example: 'The banana is yellow.', exampleHe: 'הבננה צהובה.' },
  mango:  { he: 'מנגו', say: 'מֶנְגוֹ', example: 'I like sweet mango.', exampleHe: 'אני אוהב מנגו מתוק.' },
  melon:  { he: 'מלון', say: 'מֶלֶן', example: 'The melon is sweet.', exampleHe: 'המלון מתוק.' },

  // ── Clothes ──
  hat:   { he: 'כובע', say: 'הֶט', example: 'I have a red hat.', exampleHe: 'יש לי כובע אדום.' },
  shirt: { he: 'חולצה', say: 'שֶׁרְט', example: 'My shirt is blue.', exampleHe: 'החולצה שלי כחולה.' },
  shoes: { he: 'נעליים', say: 'שׁוּז', example: 'Put on your shoes.', exampleHe: 'תנעל את הנעליים.' },
  coat:  { he: 'מעיל', say: 'קוֹט', example: 'Wear a coat. It is cold.', exampleHe: 'תלבש מעיל. קר בחוץ.' },
  dress: { he: 'שמלה', say: 'דְרֶס', example: 'She has a pink dress.', exampleHe: 'יש לה שמלה ורודה.' },
  pants: { he: 'מכנסיים', say: 'פֶּנְטְס', example: 'My pants are long.', exampleHe: 'המכנסיים שלי ארוכים.' },

  // ── Transport ──
  car:   { he: 'מכונית', say: 'קָאר', example: 'Dad has a white car.', exampleHe: 'לאבא יש מכונית לבנה.' },
  bus:   { he: 'אוטובוס', say: 'בַּאס', example: 'I go to school by bus.', exampleHe: 'אני נוסע לבית הספר באוטובוס.' },
  train: { he: 'רכבת', say: 'טְרֵיין', example: 'The train is fast.', exampleHe: 'הרכבת מהירה.' },
  ship:  { he: 'אונייה', say: 'שִׁיפּ', example: 'The ship is on the sea.', exampleHe: 'האונייה בים.' },
  bike:  { he: 'אופניים', say: 'בַּייק', example: 'I ride my bike.', exampleHe: 'אני רוכב על האופניים שלי.' },
  jet:   { he: 'מטוס סילון', say: 'ג\'ֶט', example: 'The jet flies high.', exampleHe: 'המטוס טס גבוה.' },

  // ── Actions ──
  drink: { he: 'לשתות', say: 'דְרִינְק', example: 'I drink water.', exampleHe: 'אני שותה מים.' },
  eat:   { he: 'לאכול', say: 'אִיט', example: 'We eat lunch.', exampleHe: 'אנחנו אוכלים ארוחת צהריים.' },
  sleep: { he: 'לישון', say: 'סְלִיפּ', example: 'I sleep at night.', exampleHe: 'אני ישן בלילה.' },
  run:   { he: 'לרוץ', say: 'רַאן', example: 'I can run fast.', exampleHe: 'אני יכול לרוץ מהר.' },
  jump:  { he: 'לקפוץ', say: 'ג\'ַאמְפּ', example: 'Jump like a frog!', exampleHe: 'תקפוץ כמו צפרדע!' },
  dance: { he: 'לרקוד', say: 'דֶנְס', example: "Let's dance!", exampleHe: 'בואו נרקוד!' },

  // ── Opposites ──
  'big / small': { he: 'גדול / קטן', say: 'בִּיג / סְמוֹל', example: 'Big elephant, small mouse.', exampleHe: 'פיל גדול, עכבר קטן.' },
  'hot / cold':  { he: 'חם / קר', say: 'הוֹט / קוֹלְד', example: 'Tea is hot. Ice is cold.', exampleHe: 'התה חם. הקרח קר.' },
  'up / down':   { he: 'למעלה / למטה', say: 'אַפּ / דַאוּן', example: 'Jump up and down!', exampleHe: 'תקפוץ למעלה ולמטה!' },
  'slow / fast': { he: 'איטי / מהיר', say: 'סְלוֹ / פֶסְט', example: 'Slow turtle, fast rabbit.', exampleHe: 'צב איטי, ארנב מהיר.' },

  // ── Shapes ──
  circle:   { he: 'עיגול', say: 'סֶרְקֶל', example: 'Draw a big circle.', exampleHe: 'תצייר עיגול גדול.' },
  square:   { he: 'ריבוע', say: 'סְקְוֶור', example: 'I see a red square.', exampleHe: 'אני רואה ריבוע אדום.' },
  triangle: { he: 'משולש', say: 'טְרַייאֶנְגֶל', example: 'A triangle has three sides.', exampleHe: 'למשולש יש שלוש צלעות.' },
  heart:    { he: 'לב', say: 'הָארְט', example: 'I draw a red heart.', exampleHe: 'אני מצייר לב אדום.' },
  star:     { he: 'כוכב', say: 'סְטָאר', example: 'I see a star in the sky.', exampleHe: 'אני רואה כוכב בשמיים.' },

  // ── Food ──
  milk:    { he: 'חלב', say: 'מִילְק', example: 'I drink milk.', exampleHe: 'אני שותה חלב.' },
  egg:     { he: 'ביצה', say: 'אֶג', example: 'I eat an egg.', exampleHe: 'אני אוכל ביצה.' },
  rice:    { he: 'אורז', say: 'רַייס', example: 'We eat rice and fish.', exampleHe: 'אנחנו אוכלים אורז ודג.' },
  avocado: { he: 'אבוקדו', say: 'אֶבוֹקָדוֹ', example: 'I like avocado on bread.', exampleHe: 'אני אוהב אבוקדו על לחם.' },
  cheese:  { he: 'גבינה', say: 'צִ\'יז', example: 'Mom likes cheese.', exampleHe: 'אמא אוהבת גבינה.' },

  // ── House ──
  house:   { he: 'בית', say: 'הַאוּס', example: 'This is my house.', exampleHe: 'זה הבית שלי.' },
  window:  { he: 'חלון', say: 'וִינְדוֹ', example: 'Open the window, please.', exampleHe: 'תפתח את החלון, בבקשה.' },
  door:    { he: 'דלת', say: 'דוֹר', example: 'Close the door.', exampleHe: 'תסגור את הדלת.' },
  table:   { he: 'שולחן', say: 'טֵייבֶּל', example: 'The cake is on the table.', exampleHe: 'העוגה על השולחן.' },
  floor:   { he: 'רצפה', say: 'פְלוֹר', example: 'The ball is on the floor.', exampleHe: 'הכדור על הרצפה.' },
  bedroom: { he: 'חדר שינה', say: 'בֶּדְרוּם', example: 'My bedroom is blue.', exampleHe: 'חדר השינה שלי כחול.' },

  // ── Nature ──
  tree:      { he: 'עץ', say: 'טְרִי', example: 'The bird is in the tree.', exampleHe: 'הציפור על העץ.' },
  flower:    { he: 'פרח', say: 'פְלַאוּאֶר', example: 'This flower is pink.', exampleHe: 'הפרח הזה ורוד.' },
  water:     { he: 'מים', say: 'ווֹטֶר', example: 'Fish live in water.', exampleHe: 'דגים חיים במים.' },
  garden:    { he: 'גינה', say: 'גָארְדֶן', example: 'We play in the garden.', exampleHe: 'אנחנו משחקים בגינה.' },
  grass:     { he: 'דשא', say: 'גְרֶס', example: 'The grass is soft.', exampleHe: 'הדשא רך.' },
  waterfall: { he: 'מפל', say: 'ווֹטֶרְפוֹל', example: 'The waterfall is very big.', exampleHe: 'המפל גדול מאוד.' },
}
