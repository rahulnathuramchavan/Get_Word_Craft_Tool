/*
 * Word engine for WordCraft Tool.
 * Word list: the public-domain ENABLE word list (172k+ words), plus a
 * common-English frequency list used for the "Common words" dictionary mode.
 * Both are plain text files served from /data and loaded once, on demand.
 */

// eslint-disable-next-line import/no-unresolved
import wordsTxt from '@/data/words.txt?raw';
// eslint-disable-next-line import/no-unresolved
import commonTxt from '@/data/common.txt?raw';

export const LETTER_SCORES = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8,
  k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1,
  u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

export const MAX_RESULTS = 800;

export function scoreWord(word) {
  let score = 0;
  for (const ch of word) score += LETTER_SCORES[ch] || 0;
  return score;
}

let dictPromise = null;

export function loadDictionary() {
  if (!dictPromise) {
    // Defer parsing so the first paint is never blocked by indexing 170k words.
    dictPromise = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        try {
          resolve(buildDictionary(wordsTxt, commonTxt));
        } catch {
          dictPromise = null;
          reject(new Error('The word list could not be prepared. Please reload the page.'));
        }
      }, 30);
    });
  }
  return dictPromise;
}

function buildDictionary(fullText, commonText) {
  const seen = new Set();
  const words = [];
  for (const raw of fullText.split(/\r?\n/)) {
    const w = raw.trim().toLowerCase();
    if (/^[a-z]{2,15}$/.test(w) && !seen.has(w)) {
      seen.add(w);
      words.push(w);
    }
  }
  words.sort();
  const common = new Set();
  for (const raw of commonText.split(/\r?\n/)) {
    const w = raw.trim().toLowerCase();
    if (/^[a-z]+$/.test(w) && seen.has(w)) common.add(w);
  }
  const byLength = new Map();
  const bySignature = new Map();
  for (const w of words) {
    const lenArr = byLength.get(w.length);
    if (lenArr) lenArr.push(w); else byLength.set(w.length, [w]);
    const sig = [...w].sort().join('');
    const sigArr = bySignature.get(sig);
    if (sigArr) sigArr.push(w); else bySignature.set(sig, [w]);
  }
  return { words, common, byLength, bySignature, size: words.length };
}

function rackCounts(rack) {
  const counts = new Array(26).fill(0);
  let wild = 0;
  for (const ch of rack) {
    if (ch === '?') wild += 1;
    else counts[ch.charCodeAt(0) - 97] += 1;
  }
  return { counts, wild };
}

function canFormFromRack(word, counts, wild) {
  let w = wild;
  for (const ch of word) {
    const i = ch.charCodeAt(0) - 97;
    if (counts[i] > 0) counts[i] -= 1;
    else if (w > 0) w -= 1;
    else return false;
  }
  return true;
}

function matchesPattern(word, pattern) {
  if (word.length !== pattern.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] !== '?' && pattern[i] !== word[i]) return false;
  }
  return true;
}

export function sortResults(results, sort) {
  if (sort === 'alpha') results.sort();
  else if (sort === 'length-asc') results.sort((a, b) => a.length - b.length || a.localeCompare(b));
  else if (sort === 'score') results.sort((a, b) => scoreWord(b) - scoreWord(a) || a.localeCompare(b));
  else results.sort((a, b) => b.length - a.length || a.localeCompare(b)); // length-desc
  return results;
}

/**
 * Combined word search. All filters are optional and combine with AND.
 * letters: a rack of letters, '?' counts as a wildcard tile.
 * pattern: fixed-length pattern such as "c?t".
 */
export function findWords(dict, options = {}) {
  const {
    letters = '', pattern = '', startsWith = '', endsWith = '', contains = '',
    required = '', minLen = 2, maxLen = 15, mode = 'all', sort = 'length-desc',
  } = options;

  const rack = letters.toLowerCase().replace(/[^a-z?]/g, '');
  const pat = pattern.toLowerCase().replace(/[^a-z?]/g, '');
  const pre = startsWith.toLowerCase().replace(/[^a-z]/g, '');
  const suf = endsWith.toLowerCase().replace(/[^a-z]/g, '');
  const mid = contains.toLowerCase().replace(/[^a-z]/g, '');
  const req = required.toLowerCase().replace(/[^a-z]/g, '');

  const pool = pat ? (dict.byLength.get(pat.length) || []) : dict.words;
  const rc = rack ? rackCounts(rack) : null;
  const results = [];

  for (const word of pool) {
    if (word.length < minLen || word.length > maxLen) continue;
    if (mode === 'common' && !dict.common.has(word)) continue;
    if (pat && !matchesPattern(word, pat)) continue;
    if (pre && !word.startsWith(pre)) continue;
    if (suf && !word.endsWith(suf)) continue;
    if (mid && !word.includes(mid)) continue;
    if (req && !rc) {
      let ok = true;
      for (const ch of req) if (!word.includes(ch)) { ok = false; break; }
      if (!ok) continue;
    }
    if (rc) {
      if (word.length > rack.length) continue;
      if (!canFormFromRack(word, rc.counts.slice(), rc.wild)) continue;
      // When a rack is set, also enforce required-letter containment in the word itself.
      if (req) {
        let ok = true;
        for (const ch of req) if (!word.includes(ch)) { ok = false; break; }
        if (!ok) continue;
      }
    }
    results.push(word);
  }

  sortResults(results, sort);
  return { results: results.slice(0, MAX_RESULTS), total: results.length };
}

/** Exact anagrams: words that use every input letter exactly once. '?' is a wildcard. */
export function exactAnagrams(dict, input) {
  const clean = input.toLowerCase().replace(/[^a-z?]/g, '');
  if (clean.length < 2) return [];
  if (!clean.includes('?')) {
    const sig = [...clean].sort().join('');
    return (dict.bySignature.get(sig) || []).filter((w) => w !== clean);
  }
  const rc = rackCounts(clean);
  const pool = dict.byLength.get(clean.length) || [];
  return pool.filter((w) => w !== clean && canFormFromRack(w, rc.counts.slice(), rc.wild));
}

/**
 * Wordle helper filter.
 * rows: 6 rows x 5 cells of { letter, state } where state is
 * 'unknown' | 'excluded' | 'misplaced' | 'correct'.
 */
export function wordleFilter(dict, rows) {
  const greens = new Array(5).fill(null);
  const yellow = new Map();
  const requiredLetters = new Set();
  const gray = new Set();

  for (const row of rows) {
    row.forEach((cell, i) => {
      if (!cell.letter) return;
      const l = cell.letter;
      if (cell.state === 'correct') { greens[i] = l; requiredLetters.add(l); }
      else if (cell.state === 'misplaced') {
        if (!yellow.has(l)) yellow.set(l, new Set());
        yellow.get(l).add(i);
        requiredLetters.add(l);
      } else if (cell.state === 'excluded') {
        gray.add(l);
      }
    });
  }

  const pool = dict.byLength.get(5) || [];
  return pool.filter((w) => {
    for (let i = 0; i < 5; i++) if (greens[i] && w[i] !== greens[i]) return false;
    for (const [l, positions] of yellow) {
      if (!w.includes(l)) return false;
      for (const p of positions) if (w[p] === l) return false;
    }
    for (const l of gray) {
      if (requiredLetters.has(l)) continue;
      if (w.includes(l)) return false;
    }
    return true;
  });
}

export function randomWord(dict, minLen = 4, maxLen = 9) {
  const candidates = [];
  for (let len = minLen; len <= maxLen; len++) {
    const arr = dict.byLength.get(len);
    if (arr) candidates.push(...arr.filter((w) => dict.common.has(w)));
  }
  const pool = candidates.length ? candidates : dict.words;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function scrambleWord(word) {
  const chars = word.split('');
  if (chars.length < 2) return word;
  for (let attempt = 0; attempt < 12; attempt++) {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    const scrambled = chars.join('');
    if (scrambled !== word) return scrambled;
  }
  return chars.join('');
}
