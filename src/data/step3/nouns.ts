// ── Noun Sort (Ex 1) ──────────────────────────────────────────────────────────

export interface NounSortItem {
  singular: string
  plural: string
  category: '-s' | '-es' | '-ies'
}

export const NOUN_SORT_ITEMS: NounSortItem[] = [
  { singular: 'cat',      plural: 'cats',       category: '-s'   },
  { singular: 'dog',      plural: 'dogs',       category: '-s'   },
  { singular: 'book',     plural: 'books',      category: '-s'   },
  { singular: 'ball',     plural: 'balls',      category: '-s'   },
  { singular: 'box',      plural: 'boxes',      category: '-es'  },
  { singular: 'brush',    plural: 'brushes',    category: '-es'  },
  { singular: 'dish',     plural: 'dishes',     category: '-es'  },
  { singular: 'watch',    plural: 'watches',    category: '-es'  },
  { singular: 'baby',     plural: 'babies',     category: '-ies' },
  { singular: 'party',    plural: 'parties',    category: '-ies' },
  { singular: 'city',     plural: 'cities',     category: '-ies' },
  { singular: 'story',    plural: 'stories',    category: '-ies' },
]

export const NOUN_SORT_ITEMS_R2: NounSortItem[] = [
  { singular: 'bird',    plural: 'birds',    category: '-s'   },
  { singular: 'cup',     plural: 'cups',     category: '-s'   },
  { singular: 'tree',    plural: 'trees',    category: '-s'   },
  { singular: 'flower',  plural: 'flowers',  category: '-s'   },
  { singular: 'beach',   plural: 'beaches',  category: '-es'  },
  { singular: 'church',  plural: 'churches', category: '-es'  },
  { singular: 'fox',     plural: 'foxes',    category: '-es'  },
  { singular: 'bus',     plural: 'buses',    category: '-es'  },
  { singular: 'berry',   plural: 'berries',  category: '-ies' },
  { singular: 'cherry',  plural: 'cherries', category: '-ies' },
  { singular: 'daisy',   plural: 'daisies',  category: '-ies' },
  { singular: 'bunny',   plural: 'bunnies',  category: '-ies' },
]

// ── Ex 2: 3-choice plural ─────────────────────────────────────────────────────

export interface NounEx2Q {
  sentence: string   // sentence with ___
  noun: string       // noun hint shown in parens
  correct: string    // correct plural
  wrong: string      // wrong plural attempt
  singular: string   // singular form
}

export const NOUN_EX2: NounEx2Q[] = [
  { sentence: 'The ___ are small.',             noun: 'baby',     correct: 'babies',     wrong: 'babys',      singular: 'baby'     },
  { sentence: 'I have five ___.',               noun: 'sandwich', correct: 'sandwiches', wrong: 'sandwichs',  singular: 'sandwich' },
  { sentence: 'Look at the red ___.',           noun: 'dress',    correct: 'dresses',    wrong: 'dresss',     singular: 'dress'    },
  { sentence: 'I see three ___.',               noun: 'box',      correct: 'boxes',      wrong: 'boxs',       singular: 'box'      },
  { sentence: 'The ___ are in the class.',      noun: 'child',    correct: 'children',   wrong: 'childs',     singular: 'child'    },
  { sentence: 'There are two ___ in the room.', noun: 'mouse',    correct: 'mice',       wrong: 'mouses',     singular: 'mouse'    },
  { sentence: 'I have two ___.',                noun: 'book',     correct: 'books',      wrong: 'bookes',     singular: 'book'     },
  { sentence: 'There are five ___ in class.',   noun: 'pupil',    correct: 'pupils',     wrong: 'pupiles',    singular: 'pupil'    },
  { sentence: 'The ___ are in the field.',      noun: 'sheep',    correct: 'sheep',      wrong: 'sheeps',     singular: 'sheep'    },
  { sentence: 'I see two ___ at the party.',    noun: 'woman',    correct: 'women',      wrong: 'womans',     singular: 'woman'    },
]

export const NOUN_EX2_R2: NounEx2Q[] = [
  { sentence: 'There are two ___ in the garden.',  noun: 'bench',    correct: 'benches',     wrong: 'benchs',     singular: 'bench'    },
  { sentence: 'She has three ___.',                noun: 'potato',   correct: 'potatoes',    wrong: 'potatos',    singular: 'potato'   },
  { sentence: 'I see two ___ in the yard.',        noun: 'fox',      correct: 'foxes',       wrong: 'foxs',       singular: 'fox'      },
  { sentence: 'There are many ___ on the tree.',   noun: 'cherry',   correct: 'cherries',    wrong: 'cherrys',    singular: 'cherry'   },
  { sentence: 'I have three ___.',                 noun: 'pen',      correct: 'pens',        wrong: 'penes',      singular: 'pen'      },
  { sentence: 'There are two ___ in the park.',    noun: 'man',      correct: 'men',         wrong: 'mans',       singular: 'man'      },
  { sentence: 'She has two ___.',                  noun: 'foot',     correct: 'feet',        wrong: 'foots',      singular: 'foot'     },
  { sentence: 'Look at those ___.',                noun: 'bus',      correct: 'buses',       wrong: 'buss',       singular: 'bus'      },
  { sentence: 'We have five ___.',                 noun: 'bird',     correct: 'birds',       wrong: 'birdes',     singular: 'bird'     },
  { sentence: 'The ___ are in the garden.',        noun: 'daisy',    correct: 'daisies',     wrong: 'daisys',     singular: 'daisy'    },
]

// ── Ex 3: 2-choice singular/plural ───────────────────────────────────────────

export interface NounEx3Q {
  before: string              // text before the blank
  after: string               // text after the blank
  singular: string
  plural: string
  correct: 'singular' | 'plural'
}

export const NOUN_EX3: NounEx3Q[] = [
  { before: 'My sister has two',    after: 'in her bag.',         singular: 'brush',  plural: 'brushes',  correct: 'plural'   },
  { before: 'Three',                after: 'are in the park.',    singular: 'baby',   plural: 'babies',   correct: 'plural'   },
  { before: 'My best friend has a', after: 'at home.',            singular: 'cat',    plural: 'cats',     correct: 'singular' },
  { before: 'Your old toy is in a', after: 'under the bed.',      singular: 'box',    plural: 'boxes',    correct: 'singular' },
  { before: 'I see two',            after: 'in the street.',      singular: 'man',    plural: 'men',      correct: 'plural'   },
  { before: 'There is a',           after: 'on the table.',       singular: 'book',   plural: 'books',    correct: 'singular' },
  { before: 'She has five',         after: 'in her pencil case.', singular: 'pencil', plural: 'pencils',  correct: 'plural'   },
  { before: 'Look at the white',    after: 'in the field.',       singular: 'sheep',  plural: 'sheep',    correct: 'plural'   },
  { before: 'There are three',      after: 'in the bag.',         singular: 'dress',  plural: 'dresses',  correct: 'plural'   },
  { before: 'I have one',           after: 'at home.',            singular: 'child',  plural: 'children', correct: 'singular' },
]

export const NOUN_EX3_R2: NounEx3Q[] = [
  { before: 'I see a',              after: 'in the garden.',        singular: 'flower', plural: 'flowers', correct: 'singular' },
  { before: 'There are three',      after: 'in the park.',          singular: 'bench',  plural: 'benches', correct: 'plural'   },
  { before: 'She has one',          after: 'at school.',            singular: 'pencil', plural: 'pencils', correct: 'singular' },
  { before: 'We see two',           after: 'in the tree.',          singular: 'bird',   plural: 'birds',   correct: 'plural'   },
  { before: 'There is a',           after: 'on the table.',         singular: 'glass',  plural: 'glasses', correct: 'singular' },
  { before: 'I have five',          after: 'in my bag.',            singular: 'pen',    plural: 'pens',    correct: 'plural'   },
  { before: 'He sees a big',        after: 'in the sky.',           singular: 'bird',   plural: 'birds',   correct: 'singular' },
  { before: 'Look at those',        after: 'in the garden.',        singular: 'daisy',  plural: 'daisies', correct: 'plural'   },
  { before: 'There is a',           after: 'near the door.',        singular: 'box',    plural: 'boxes',   correct: 'singular' },
  { before: 'I see two',            after: 'at the bus stop.',      singular: 'man',    plural: 'men',     correct: 'plural'   },
]
