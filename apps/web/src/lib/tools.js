import {
  Search, Shuffle, Repeat, Lightbulb, Grid3x3, Dices, BookOpen, ListOrdered,
} from 'lucide-react';

export const TOOLS = [
  {
    path: '/word-finder',
    name: 'Word Finder',
    icon: Search,
    blurb: 'Combine a letter rack, patterns, prefixes, and suffixes to find every playable word.',
  },
  {
    path: '/word-unscrambler',
    name: 'Word Unscrambler',
    icon: Shuffle,
    blurb: 'Turn a jumbled rack of letters into every word it can make, grouped by length.',
  },
  {
    path: '/anagram-solver',
    name: 'Anagram Solver',
    icon: Repeat,
    blurb: 'Find exact anagrams that use every letter you enter, wildcards included.',
  },
  {
    path: '/wordle-helper',
    name: 'Wordle Helper',
    icon: Lightbulb,
    blurb: 'Mark your green, amber, and gray tiles and see which words still fit.',
  },
  {
    path: '/crossword-finder',
    name: 'Crossword Finder',
    icon: Grid3x3,
    blurb: 'Fill the blanks of a crossword pattern like c?t?r and get matching words.',
  },
  {
    path: '/scramble-generator',
    name: 'Scramble Generator',
    icon: Dices,
    blurb: 'Create word scrambles for classrooms, parties, and puzzle sheets.',
  },
  {
    path: '/definition-finder',
    name: 'Definition Finder',
    icon: BookOpen,
    blurb: 'Look up meanings, parts of speech, and pronunciations for any word.',
  },
  {
    path: '/word-lists',
    name: 'Word Lists',
    icon: ListOrdered,
    blurb: 'Handy lists: two-letter words, Q without U, high-value letters, and more.',
  },
];
