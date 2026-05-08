export interface AOrAnNoun {
  id: string
  word: string
  article: 'a' | 'an'
}

// Ex1: drag noun to correct article card (3 cycles × 12 nouns)
export const AOA_EX1: AOrAnNoun[][] = [
  [
    { id: 'c1_cat',      word: 'cat',      article: 'a'  },
    { id: 'c1_book',     word: 'book',     article: 'a'  },
    { id: 'c1_dog',      word: 'dog',      article: 'a'  },
    { id: 'c1_table',    word: 'table',    article: 'a'  },
    { id: 'c1_boy',      word: 'boy',      article: 'a'  },
    { id: 'c1_house',    word: 'house',    article: 'a'  },
    { id: 'c1_apple',    word: 'apple',    article: 'an' },
    { id: 'c1_egg',      word: 'egg',      article: 'an' },
    { id: 'c1_orange',   word: 'orange',   article: 'an' },
    { id: 'c1_umbrella', word: 'umbrella', article: 'an' },
    { id: 'c1_insect',   word: 'insect',   article: 'an' },
    { id: 'c1_ant',      word: 'ant',      article: 'an' },
  ],
  [
    { id: 'c2_bird',     word: 'bird',     article: 'a'  },
    { id: 'c2_car',      word: 'car',      article: 'a'  },
    { id: 'c2_fish',     word: 'fish',     article: 'a'  },
    { id: 'c2_girl',     word: 'girl',     article: 'a'  },
    { id: 'c2_pen',      word: 'pen',      article: 'a'  },
    { id: 'c2_tree',     word: 'tree',     article: 'a'  },
    { id: 'c2_elephant', word: 'elephant', article: 'an' },
    { id: 'c2_island',   word: 'island',   article: 'an' },
    { id: 'c2_oven',     word: 'oven',     article: 'an' },
    { id: 'c2_arm',      word: 'arm',      article: 'an' },
    { id: 'c2_onion',    word: 'onion',    article: 'an' },
    { id: 'c2_ear',      word: 'ear',      article: 'an' },
  ],
  [
    { id: 'c3_school',   word: 'school',   article: 'a'  },
    { id: 'c3_window',   word: 'window',   article: 'a'  },
    { id: 'c3_bus',      word: 'bus',      article: 'a'  },
    { id: 'c3_hat',      word: 'hat',      article: 'a'  },
    { id: 'c3_horse',    word: 'horse',    article: 'a'  },
    { id: 'c3_ball',     word: 'ball',     article: 'a'  },
    { id: 'c3_engine',   word: 'engine',   article: 'an' },
    { id: 'c3_owl',      word: 'owl',      article: 'an' },
    { id: 'c3_idea',     word: 'idea',     article: 'an' },
    { id: 'c3_envelope', word: 'envelope', article: 'an' },
    { id: 'c3_album',    word: 'album',    article: 'an' },
    { id: 'c3_exit',     word: 'exit',     article: 'an' },
  ],
]

export interface AOrAnSentence {
  id: string
  before: string
  noun: string
  answer: 'a' | 'an'
}

// Ex2: choose a or an to complete each sentence (2 cycles × 10 sentences)
export const AOA_EX2: AOrAnSentence[][] = [
  [
    { id: 's1_1',  before: 'Here is',  noun: 'robot',    answer: 'a'  },
    { id: 's1_2',  before: 'This is',  noun: 'umbrella', answer: 'an' },
    { id: 's1_3',  before: 'I have',   noun: 'dog',      answer: 'a'  },
    { id: 's1_4',  before: 'This is',  noun: 'apple',    answer: 'an' },
    { id: 's1_5',  before: 'I see',    noun: 'bird',     answer: 'a'  },
    { id: 's1_6',  before: 'This is',  noun: 'egg',      answer: 'an' },
    { id: 's1_7',  before: 'I have',   noun: 'cat',      answer: 'a'  },
    { id: 's1_8',  before: 'He has',   noun: 'orange',   answer: 'an' },
    { id: 's1_9',  before: 'This is',  noun: 'book',     answer: 'a'  },
    { id: 's1_10', before: 'I have',   noun: 'insect',   answer: 'an' },
  ],
  [
    { id: 's2_1',  before: 'This is',  noun: 'elephant',  answer: 'an' },
    { id: 's2_2',  before: 'I have',   noun: 'pen',       answer: 'a'  },
    { id: 's2_3',  before: 'She has',  noun: 'oven',      answer: 'an' },
    { id: 's2_4',  before: 'I see',    noun: 'car',       answer: 'a'  },
    { id: 's2_5',  before: 'This is',  noun: 'onion',     answer: 'an' },
    { id: 's2_6',  before: 'I have',   noun: 'fish',      answer: 'a'  },
    { id: 's2_7',  before: 'This is',  noun: 'island',    answer: 'an' },
    { id: 's2_8',  before: 'She has',  noun: 'table',     answer: 'a'  },
    { id: 's2_9',  before: 'I see',    noun: 'owl',       answer: 'an' },
    { id: 's2_10', before: 'I have',   noun: 'school bag', answer: 'a' },
  ],
]
