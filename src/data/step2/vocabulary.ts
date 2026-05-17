export interface NumberItem {
  digit: number
  word: string
}

export const NUMBERS_0_10: NumberItem[] = [
  { digit: 0,   word: 'zero'    },
  { digit: 1,   word: 'one'     },
  { digit: 2,   word: 'two'     },
  { digit: 3,   word: 'three'   },
  { digit: 4,   word: 'four'    },
  { digit: 5,   word: 'five'    },
  { digit: 6,   word: 'six'     },
  { digit: 7,   word: 'seven'   },
  { digit: 8,   word: 'eight'   },
  { digit: 9,   word: 'nine'    },
  { digit: 10,  word: 'ten'     },
]

export const NUMBERS_11_19: NumberItem[] = [
  { digit: 11, word: 'eleven'    },
  { digit: 12, word: 'twelve'    },
  { digit: 13, word: 'thirteen'  },
  { digit: 14, word: 'fourteen'  },
  { digit: 15, word: 'fifteen'   },
  { digit: 16, word: 'sixteen'   },
  { digit: 17, word: 'seventeen' },
  { digit: 18, word: 'eighteen'  },
  { digit: 19, word: 'nineteen'  },
]

export const NUMBERS_TENS: NumberItem[] = [
  { digit: 10,  word: 'ten'     },
  { digit: 20,  word: 'twenty'  },
  { digit: 30,  word: 'thirty'  },
  { digit: 40,  word: 'forty'   },
  { digit: 50,  word: 'fifty'   },
  { digit: 60,  word: 'sixty'   },
  { digit: 70,  word: 'seventy' },
  { digit: 80,  word: 'eighty'  },
  { digit: 90,  word: 'ninety'  },
  { digit: 100, word: 'hundred' },
]

export const NUMBERS_21_29: NumberItem[] = [
  { digit: 21, word: 'twenty-one'   },
  { digit: 22, word: 'twenty-two'   },
  { digit: 23, word: 'twenty-three' },
  { digit: 24, word: 'twenty-four'  },
  { digit: 25, word: 'twenty-five'  },
  { digit: 26, word: 'twenty-six'   },
  { digit: 27, word: 'twenty-seven' },
  { digit: 28, word: 'twenty-eight' },
  { digit: 29, word: 'twenty-nine'  },
]

export interface FamilyItem {
  id: string
  name: string
  hebrew: string
  emoji: string
}

export const FAMILY: FamilyItem[] = [
  { id: 'father',      name: 'father',      hebrew: 'אבא',           emoji: '👨' },
  { id: 'mother',      name: 'mother',      hebrew: 'אמא',           emoji: '👩' },
  { id: 'sister',      name: 'sister',      hebrew: 'אחות',          emoji: '👧' },
  { id: 'brother',     name: 'brother',     hebrew: 'אח',            emoji: '👦' },
  { id: 'baby',        name: 'baby',        hebrew: 'תינוק',         emoji: '👶' },
  { id: 'grandfather', name: 'grandfather', hebrew: 'סבא',           emoji: '👴' },
  { id: 'grandmother', name: 'grandmother', hebrew: 'סבתא',          emoji: '👵' },
  { id: 'uncle',       name: 'uncle',       hebrew: 'דוד',           emoji: '🧔' },
  { id: 'aunt',        name: 'aunt',        hebrew: 'דודה',          emoji: '👩‍🦱' },
  { id: 'twins',       name: 'twins',       hebrew: 'תאומים',        emoji: '👯' },
  { id: 'cousin',      name: 'cousin',      hebrew: 'בן/בת דוד',     emoji: '🧒' },
]

export interface AnimalItem {
  id: string
  name: string
  hebrew: string
  emoji: string
  isSea: boolean
}

export const ANIMALS: AnimalItem[] = [
  { id: 'monkey',    name: 'monkey',    hebrew: 'קוף',      emoji: '🐒', isSea: false },
  { id: 'fox',       name: 'fox',       hebrew: 'שועל',     emoji: '🦊', isSea: false },
  { id: 'whale',     name: 'whale',     hebrew: 'לוויתן',   emoji: '🐋', isSea: true  },
  { id: 'dolphin',   name: 'dolphin',   hebrew: 'דולפין',   emoji: '🐬', isSea: true  },
  { id: 'jellyfish', name: 'jellyfish', hebrew: 'מדוזה',    emoji: '🪼', isSea: true  },
  { id: 'octopus',   name: 'octopus',   hebrew: 'תמנון',    emoji: '🐙', isSea: true  },
  { id: 'shark',     name: 'shark',     hebrew: 'כריש',     emoji: '🦈', isSea: true  },
  { id: 'kangaroo',  name: 'kangaroo',  hebrew: 'קנגורו',   emoji: '🦘', isSea: false },
  { id: 'penguin',   name: 'penguin',   hebrew: 'פינגווין', emoji: '🐧', isSea: false },
  { id: 'gorilla',   name: 'gorilla',   hebrew: 'גורילה',   emoji: '🦍', isSea: false },
  { id: 'parrot',    name: 'parrot',    hebrew: 'תוכי',     emoji: '🦜', isSea: false },
  { id: 'mouse',     name: 'mouse',     hebrew: 'עכבר',     emoji: '🐭', isSea: false },
]

export interface FruitVegItem {
  id: string
  name: string
  hebrew: string
  emoji: string
  type: 'fruit' | 'vegetable'
}

export const FRUIT_VEG: FruitVegItem[] = [
  { id: 'watermelon', name: 'watermelon', hebrew: 'אבטיח',     emoji: '🍉', type: 'fruit'     },
  { id: 'strawberry', name: 'strawberry', hebrew: 'תות שדה',   emoji: '🍓', type: 'fruit'     },
  { id: 'grapes',     name: 'grapes',     hebrew: 'ענבים',     emoji: '🍇', type: 'fruit'     },
  { id: 'cherry',     name: 'cherry',     hebrew: 'דובדבן',    emoji: '🍒', type: 'fruit'     },
  { id: 'peach',      name: 'peach',      hebrew: 'אפרסק',     emoji: '🍑', type: 'fruit'     },
  { id: 'pear',       name: 'pear',       hebrew: 'אגס',       emoji: '🍐', type: 'fruit'     },
  { id: 'lemon',      name: 'lemon',      hebrew: 'לימון',     emoji: '🍋', type: 'fruit'     },
  { id: 'tomato',     name: 'tomato',     hebrew: 'עגבנייה',   emoji: '🍅', type: 'fruit'     },
  { id: 'carrot',     name: 'carrot',     hebrew: 'גזר',       emoji: '🥕', type: 'vegetable' },
  { id: 'broccoli',   name: 'broccoli',   hebrew: 'ברוקולי',   emoji: '🥦', type: 'vegetable' },
  { id: 'cucumber',   name: 'cucumber',   hebrew: 'מלפפון',    emoji: '🥒', type: 'vegetable' },
  { id: 'potato',     name: 'potato',     hebrew: 'תפוח אדמה', emoji: '🥔', type: 'vegetable' },
  { id: 'pepper',     name: 'pepper',     hebrew: 'פלפל',      emoji: '🫑', type: 'vegetable' },
  { id: 'onion',      name: 'onion',      hebrew: 'בצל',       emoji: '🧅', type: 'vegetable' },
]

export interface ColorItem {
  name: string
  bg: string
  border: string
  textDark: boolean
}

export const COLORS: ColorItem[] = [
  { name: 'red',    bg: 'bg-red-500',    border: 'border-red-600',    textDark: false },
  { name: 'yellow', bg: 'bg-yellow-400', border: 'border-yellow-500', textDark: true  },
  { name: 'blue',   bg: 'bg-blue-500',   border: 'border-blue-600',   textDark: false },
  { name: 'black',  bg: 'bg-gray-900',   border: 'border-gray-800',   textDark: false },
  { name: 'green',  bg: 'bg-green-500',  border: 'border-green-600',  textDark: false },
  { name: 'orange', bg: 'bg-orange-400', border: 'border-orange-500', textDark: false },
  { name: 'white',  bg: 'bg-white',      border: 'border-gray-300',   textDark: true  },
  { name: 'gray',   bg: 'bg-gray-400',   border: 'border-gray-500',   textDark: false },
  { name: 'brown',  bg: 'bg-amber-800',  border: 'border-amber-900',  textDark: false },
  { name: 'purple', bg: 'bg-purple-500', border: 'border-purple-600', textDark: false },
  { name: 'pink',   bg: 'bg-pink-400',   border: 'border-pink-500',   textDark: false },
]
