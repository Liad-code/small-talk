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
