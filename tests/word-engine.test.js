import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  scoreWord,
  getCharCounts,
  wordHasRequiredCounts,
  rackCounts,
  canFormFromRack,
  matchesPattern,
  sortResults,
  findWords,
  exactAnagrams,
  wordleFilter,
  scrambleWord,
  randomWord,
  getCategoryWords,
  browseWordList,
  resolveAudioUrl,
} from '../apps/web/src/lib/dictionary-engine.js';

// Reusable mock dictionary for fast, deterministic unit testing
const mockWords = [
  'aa', 'at', 'an', 'as', 'am', 'ax', 'ay',
  'bed', 'cat', 'cater', 'cotter', 'cuter', 'crate', 'cheese', 'clean', 'glean',
  'bleed', 'cheer', 'fleet', 'beget', 'melee', 'steep', 'sheen', 'creek',
  'listen', 'silent', 'enlist', 'inlets', 'tinsel',
  'react', 'trace', 'tree', 'speed',
];

const mockByLength = new Map();
const mockBySignature = new Map();
for (const w of mockWords) {
  const lenArr = mockByLength.get(w.length);
  if (lenArr) lenArr.push(w); else mockByLength.set(w.length, [w]);
  const sig = [...w].sort().join('');
  const sigArr = mockBySignature.get(sig);
  if (sigArr) sigArr.push(w); else mockBySignature.set(sig, [w]);
}

const mockDict = {
  words: mockWords,
  common: new Set(mockWords),
  byLength: mockByLength,
  bySignature: mockBySignature,
  size: mockWords.length,
};

describe('Wordle Helper Engine (wordleFilter)', () => {
  it('DEF-01: Correctly eliminates words with duplicate letters when excess occurrence is gray (excluded)', () => {
    // Guess is SPEED. Secret target is CLEAN (has exactly one 'e' at index 2).
    // Cell 2 is 'e' (correct / green). Cell 3 is 'e' (excluded / gray).
    const rows = [
      [
        { letter: 's', state: 'excluded' },
        { letter: 'p', state: 'excluded' },
        { letter: 'e', state: 'correct' },  // index 2
        { letter: 'e', state: 'excluded' }, // index 3
        { letter: 'd', state: 'excluded' },
      ],
    ];

    const candidates = ['bleed', 'cheer', 'clean', 'fleet', 'glean'];
    const filtered = wordleFilter({ byLength: new Map([[5, candidates]]) }, rows);

    // Words with two 'e's (bleed, cheer, fleet) must be rejected because the 2nd 'e' was gray.
    assert.deepEqual(filtered.sort(), ['clean', 'glean'].sort());
  });

  it('Correctly enforces minimum count when a letter appears multiple times in yellow (misplaced)', () => {
    // Row clues say there are at least two 'e's in the word, neither at index 0 or index 2.
    const rows = [
      [
        { letter: 'e', state: 'misplaced' }, // index 0
        { letter: 'x', state: 'excluded' },
        { letter: 'e', state: 'misplaced' }, // index 2
        { letter: 'x', state: 'excluded' },
        { letter: 'x', state: 'excluded' },
      ],
    ];

    const candidates = ['bed', 'cater', 'clean', 'beget', 'melee'];
    const filtered = wordleFilter({ byLength: new Map([[5, candidates]]) }, rows);

    // cater, clean have only 1 'e' -> rejected.
    // beget has 2 'e's at pos 1 and 3 (none at 0 or 2) -> accepted.
    // melee has 3 'e's at pos 1, 3, 4 (none at 0 or 2) -> accepted.
    assert.deepEqual(filtered.sort(), ['beget', 'melee'].sort());
  });

  it('Rejects words matching excluded green/yellow positions', () => {
    const rows = [
      [
        { letter: 'c', state: 'correct' },   // pos 0
        { letter: 'a', state: 'misplaced' }, // pos 1
        { letter: 't', state: 'excluded' },
        { letter: 'x', state: 'excluded' },
        { letter: 'x', state: 'excluded' },
      ],
    ];

    const candidates = ['cater', 'clean', 'crate'];
    const filtered = wordleFilter({ byLength: new Map([[5, candidates]]) }, rows);

    // cater: has 't' -> rejected (t is excluded).
    // clean: has no 'r' and 'a' is at index 3 (not 1) -> wait, does clean have 'a'? yes, at pos 3.
    // crate: has 't' -> rejected.
    assert.deepEqual(filtered, ['clean']);
  });
});

describe('Word Finder & Crossword Engine (findWords)', () => {
  it('DEF-02: Enforces required letter frequencies with duplicates (e.g., "ee")', () => {
    // 'required: ee' must only match words with at least two 'e's.
    const res = findWords(mockDict, { required: 'ee' });
    const matches = res.results;

    assert.ok(matches.includes('cheese'), 'cheese has three Es');
    assert.ok(matches.includes('tree'), 'tree has two Es');
    assert.ok(!matches.includes('cater'), 'cater only has one E');
    assert.ok(!matches.includes('bed'), 'bed only has one E');
  });

  it('DEF-03: Combines letter rack with board pattern', () => {
    // Board pattern is "c?t??" (length 5).
    // Rack has "aer" (3 letters).
    // The missing board positions (indices 1, 3, 4) require 'a', 'e', 'r'.
    const res = findWords(mockDict, { letters: 'aer', pattern: 'c?t??' });
    assert.deepEqual(res.results, ['cater']);
  });

  it('Supports rack with wildcards combining with board pattern', () => {
    // Board pattern "c?t??". Rack has "a?r" (using ? for 'e').
    const res = findWords(mockDict, { letters: 'a?r', pattern: 'c?t??' });
    assert.deepEqual(res.results, ['cater']);
  });

  it('Supports dot "." syntax in patterns as equivalent to question marks', () => {
    // Crossword dot pattern "c.t.r" matches both "cater" and "cuter"
    const resDot = findWords(mockDict, { pattern: 'c.t.r' });
    const resWild = findWords(mockDict, { pattern: 'c?t?r' });
    assert.deepEqual(resDot.results, resWild.results);
    assert.deepEqual(resDot.results, ['cater', 'cuter']);
  });

  it('Ensures fixed board letters are not deducted from rack tiles', () => {
    // Board has "c" at pos 0 and "t" at pos 2 ("c?t??").
    // Rack has "aer" — exactly the missing tiles. It should NOT require "c" or "t" in the rack.
    const res = findWords(mockDict, { letters: 'aer', pattern: 'c?t??' });
    assert.deepEqual(res.results, ['cater']);
  });

  it('Filters words by prefix and suffix constraints', () => {
    const resPre = findWords(mockDict, { startsWith: 'ca' });
    assert.ok(resPre.results.every((w) => w.startsWith('ca')));

    const resSuf = findWords(mockDict, { endsWith: 'er' });
    assert.ok(resSuf.results.every((w) => w.endsWith('er')));
  });

  it('Filters words by minLen and maxLen', () => {
    const resLen = findWords(mockDict, { minLen: 3, maxLen: 4 });
    assert.ok(resLen.results.every((w) => w.length >= 3 && w.length <= 4));
  });
});

describe('Anagram Solver (exactAnagrams)', () => {
  it('Finds exact anagrams and excludes the query itself', () => {
    const anagrams = exactAnagrams(mockDict, 'listen');
    assert.ok(!anagrams.includes('listen'), 'Input word must be excluded from results');
    assert.ok(anagrams.includes('silent'));
    assert.ok(anagrams.includes('enlist'));
  });

  it('Handles wildcards in exact anagram solver', () => {
    const anagrams = exactAnagrams(mockDict, 'ca?');
    // ca? (length 3): cat fits
    assert.ok(anagrams.includes('cat'));
  });

  it('Ignores input queries shorter than 2 letters', () => {
    assert.deepEqual(exactAnagrams(mockDict, 'a'), []);
    assert.deepEqual(exactAnagrams(mockDict, ''), []);
  });
});

describe('Scramble Generator (scrambleWord)', () => {
  it('Shuffles letters of a word into a different permutation', () => {
    const word = 'planet';
    const scrambled = scrambleWord(word);
    assert.equal(scrambled.length, word.length);
    assert.equal([...scrambled].sort().join(''), [...word].sort().join(''));
  });

  it('Safely handles single-character, empty string, and identical letters', () => {
    assert.equal(scrambleWord(''), '');
    assert.equal(scrambleWord('a'), 'a');
    assert.equal(scrambleWord('eee'), 'eee');
  });

  it('Guarantees a non-identical permutation for words with at least two distinct letters', () => {
    for (let i = 0; i < 50; i++) {
      const scrambled = scrambleWord('planet');
      assert.notEqual(scrambled, 'planet', 'scramble must never equal original word');
      assert.equal([...scrambled].sort().join(''), 'aelnpt');
    }
    // Test short 2-letter word
    for (let i = 0; i < 20; i++) {
      assert.equal(scrambleWord('to'), 'ot');
    }
    // Test word with repeated letters
    for (let i = 0; i < 20; i++) {
      const res = scrambleWord('aba');
      assert.notEqual(res, 'aba');
      assert.ok(res === 'aab' || res === 'baa');
    }
  });

  it('Strictly preserves the exact character multiset of the input', () => {
    const testWords = ['racecar', 'encyclopedia', 'balloon', 'mississippi', 'strength'];
    for (const w of testWords) {
      for (let trial = 0; trial < 10; trial++) {
        const res = scrambleWord(w);
        assert.equal(res.length, w.length);
        assert.notEqual(res, w);
        assert.equal([...res].sort().join(''), [...w].sort().join(''));
      }
    }
  });
});

describe('Definition Finder Audio Resolution (resolveAudioUrl)', () => {
  it('Resolves valid absolute https and http URLs', () => {
    const phonetics = [
      { text: '/həˈloʊ/' },
      { text: '/hɛˈloʊ/', audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3' },
    ];
    assert.equal(resolveAudioUrl(phonetics), 'https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3');

    const httpPhonetics = [{ audio: 'http://example.com/audio.mp3' }];
    assert.equal(resolveAudioUrl(httpPhonetics), 'http://example.com/audio.mp3');
  });

  it('Normalizes protocol-relative URLs starting with // to https:', () => {
    const phonetics = [
      { audio: '//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3' },
    ];
    assert.equal(
      resolveAudioUrl(phonetics),
      'https://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3'
    );
  });

  it('Rejects malformed, relative, or non-http audio paths and returns null', () => {
    assert.equal(resolveAudioUrl([{ audio: 'relative-audio.mp3' }]), null);
    assert.equal(resolveAudioUrl([{ audio: '/media/audio.mp3' }]), null);
    assert.equal(resolveAudioUrl([{ audio: 'ftp://example.com/audio.mp3' }]), null);
    assert.equal(resolveAudioUrl([{ audio: '   ' }]), null);
    assert.equal(resolveAudioUrl([{ audio: '' }]), null);
  });

  it('Safely handles missing, non-array, and null array entries without throwing', () => {
    assert.equal(resolveAudioUrl(null), null);
    assert.equal(resolveAudioUrl(undefined), null);
    assert.equal(resolveAudioUrl({}), null);
    assert.equal(resolveAudioUrl([]), null);
    assert.equal(resolveAudioUrl([null, undefined, { audio: '' }]), null);
    assert.equal(
      resolveAudioUrl([null, { audio: 'https://example.com/good.mp3' }]),
      'https://example.com/good.mp3'
    );
  });
});

describe('Utility & Scoring Functions', () => {
  it('Calculates classic Scrabble letter scores correctly', () => {
    // q = 10, i = 1 => qi = 11
    assert.equal(scoreWord('qi'), 11);
    // c(3) + a(1) + t(1) = 5
    assert.equal(scoreWord('cat'), 5);
  });

  it('Correctly counts letter frequencies for rack matching', () => {
    const { counts, wild } = rackCounts('a?b?c');
    assert.equal(wild, 2);
    assert.equal(counts[0], 1); // 'a'
    assert.equal(counts[1], 1); // 'b'
    assert.equal(counts[2], 1); // 'c'
  });
});

describe('Word Lists Engine (browseWordList)', () => {
  it('Filters words by category and word length', () => {
    const twoLetter = browseWordList(mockDict, { category: 'two' });
    assert.ok(twoLetter.items.every((w) => w.length === 2));

    const lenFive = browseWordList(mockDict, { category: 'len-5' });
    assert.ok(lenFive.items.every((w) => w.length === 5));
    assert.ok(lenFive.items.includes('cater'));
  });

  it('Searches within words in a list', () => {
    const searchRes = browseWordList(mockDict, { category: 'two', search: 'x' });
    assert.deepEqual(searchRes.items, ['ax']);
  });

  it('Filters by starting letter', () => {
    const startRes = browseWordList(mockDict, { category: 'len-5', startsWith: 'c' });
    assert.ok(startRes.items.every((w) => w.startsWith('c')));
    assert.ok(startRes.items.includes('cater'));
    assert.ok(startRes.items.includes('clean'));
  });

  it('Handles pagination with custom page sizes', () => {
    const p1 = browseWordList(mockDict, { category: 'two', pageSize: 3, page: 1 });
    assert.equal(p1.items.length, 3);
    assert.equal(p1.page, 1);
    assert.equal(p1.totalPages, 3);

    const p2 = browseWordList(mockDict, { category: 'two', pageSize: 3, page: 2 });
    assert.equal(p2.items.length, 3);
    assert.equal(p2.page, 2);
    // Items on page 2 should be different from page 1
    assert.notDeepEqual(p1.items, p2.items);
  });

  it('Sorts words in reverse alphabetical order (Z to A)', () => {
    const desc = browseWordList(mockDict, { category: 'two', sort: 'alpha-desc' });
    assert.equal(desc.items[0], 'ay');
    assert.equal(desc.items[desc.items.length - 1], 'aa');
  });

  it('Sorts words by tile score descending', () => {
    const scored = browseWordList(mockDict, { category: 'two', sort: 'score-desc' });
    // 'ax' (a:1 + x:8 = 9) should rank above 'aa' (1+1 = 2)
    const axIdx = scored.items.indexOf('ax');
    const aaIdx = scored.items.indexOf('aa');
    assert.ok(axIdx < aaIdx, 'ax should score higher than aa');
  });
});

