/*
 * Core word engine algorithms for WordCraft Tool.
 * Pure JavaScript with zero bundler dependencies for fast execution and automated testing.
 */

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

export function buildDictionary(fullText, commonText) {
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

export function getCharCounts(str) {
  const counts = new Array(26).fill(0);
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 97;
    if (code >= 0 && code < 26) counts[code]++;
  }
  return counts;
}

export function wordHasRequiredCounts(word, reqCounts) {
  const wordCounts = getCharCounts(word);
  for (let i = 0; i < 26; i++) {
    if (wordCounts[i] < reqCounts[i]) return false;
  }
  return true;
}

export function rackCounts(rack) {
  const counts = new Array(26).fill(0);
  let wild = 0;
  for (const ch of rack) {
    if (ch === '?') wild += 1;
    else counts[ch.charCodeAt(0) - 97] += 1;
  }
  return { counts, wild };
}

export function canFormFromRack(word, counts, wild) {
  let w = wild;
  for (const ch of word) {
    const i = ch.charCodeAt(0) - 97;
    if (counts[i] > 0) counts[i] -= 1;
    else if (w > 0) w -= 1;
    else return false;
  }
  return true;
}

export function matchesPattern(word, pattern) {
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
  const pat = pattern.toLowerCase().replace(/\./g, '?').replace(/[^a-z?]/g, '');
  const pre = startsWith.toLowerCase().replace(/[^a-z]/g, '');
  const suf = endsWith.toLowerCase().replace(/[^a-z]/g, '');
  const mid = contains.toLowerCase().replace(/[^a-z]/g, '');
  const req = required.toLowerCase().replace(/[^a-z]/g, '');
  const reqCounts = req ? getCharCounts(req) : null;

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
    if (reqCounts && !wordHasRequiredCounts(word, reqCounts)) continue;

    if (rc) {
      if (pat) {
        // When both board pattern and rack are provided, the letters
        // at '?' positions on the board must be formable from the rack.
        let missingFromBoard = '';
        for (let i = 0; i < pat.length; i++) {
          if (pat[i] === '?') missingFromBoard += word[i];
        }
        if (missingFromBoard.length > rack.length) continue;
        if (!canFormFromRack(missingFromBoard, rc.counts.slice(), rc.wild)) continue;
      } else {
        if (word.length > rack.length) continue;
        if (!canFormFromRack(word, rc.counts.slice(), rc.wild)) continue;
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
 * rows: up to 6 rows of 5 cells { letter, state } where state is
 * 'unknown' | 'excluded' | 'misplaced' | 'correct'.
 */
export function wordleFilter(dict, rows) {
  const greens = new Array(5).fill(null);
  const excludedPositions = Array.from({ length: 5 }, () => new Set());
  const minCounts = new Array(26).fill(0);
  const maxCounts = new Array(26).fill(5);

  for (const row of rows) {
    const rowCounts = {};
    for (let i = 0; i < row.length; i++) {
      const cell = row[i];
      if (!cell || !cell.letter) continue;
      const l = cell.letter.toLowerCase();
      if (!rowCounts[l]) rowCounts[l] = { green: 0, yellow: 0, gray: 0 };
      if (cell.state === 'correct') {
        greens[i] = l;
        rowCounts[l].green++;
      } else if (cell.state === 'misplaced') {
        excludedPositions[i].add(l);
        rowCounts[l].yellow++;
      } else if (cell.state === 'excluded') {
        excludedPositions[i].add(l);
        rowCounts[l].gray++;
      }
    }

    for (const l in rowCounts) {
      const idx = l.charCodeAt(0) - 97;
      if (idx < 0 || idx >= 26) continue;
      const { green, yellow, gray } = rowCounts[l];
      const present = green + yellow;
      minCounts[idx] = Math.max(minCounts[idx], present);
      if (gray > 0) {
        maxCounts[idx] = Math.min(maxCounts[idx], present);
      }
    }
  }

  const pool = dict.byLength.get(5) || [];
  return pool.filter((w) => {
    for (let i = 0; i < 5; i++) {
      if (greens[i] && w[i] !== greens[i]) return false;
      if (excludedPositions[i].has(w[i])) return false;
    }
    const wCounts = getCharCounts(w);
    for (let c = 0; c < 26; c++) {
      if (wCounts[c] < minCounts[c]) return false;
      if (wCounts[c] > maxCounts[c]) return false;
    }
    return true;
  });
}

export function randomWord(dict, minLen = 4, maxLen = 9) {
  const safeMin = Math.min(minLen, maxLen);
  const safeMax = Math.max(minLen, maxLen);
  const candidates = [];
  for (let len = safeMin; len <= safeMax; len++) {
    const arr = dict.byLength.get(len);
    if (arr) candidates.push(...arr.filter((w) => dict.common.has(w)));
  }
  const pool = candidates.length ? candidates : dict.words;
  if (!pool || pool.length === 0) return '';
  return pool[Math.floor(Math.random() * pool.length)];
}

export function scrambleWord(word) {
  if (!word || typeof word !== 'string') return '';
  const chars = word.split('');
  if (chars.length < 2) return word;

  // If all characters are identical, a visibly distinct scramble is impossible
  const first = chars[0];
  if (chars.every((c) => c === first)) return word;

  for (let attempt = 0; attempt < 12; attempt++) {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    const scrambled = chars.join('');
    if (scrambled !== word) return scrambled;
  }

  // Deterministic fallback: swap the first pair of distinct characters
  const fallback = word.split('');
  for (let i = 0; i < fallback.length - 1; i++) {
    for (let j = i + 1; j < fallback.length; j++) {
      if (fallback[i] !== fallback[j]) {
        [fallback[i], fallback[j]] = [fallback[j], fallback[i]];
        return fallback.join('');
      }
    }
  }

  return word;
}

export function getCategoryWords(dict, categoryId) {
  if (!dict) return [];
  const vowelCount = (w) => (w.match(/[aeiou]/g) || []).length;

  if (categoryId.startsWith('len-')) {
    const len = parseInt(categoryId.slice(4), 10);
    return dict.byLength.get(len) || [];
  }

  switch (categoryId) {
    case 'two':
      return dict.byLength.get(2) || [];
    case 'three':
      return dict.byLength.get(3) || [];
    case 'q-no-u':
      return dict.words.filter((w) => w.includes('q') && !w.includes('qu'));
    case 'power':
      return dict.words.filter((w) => /[jqxz]/.test(w) && w.length <= 6);
    case 'vowels':
      return dict.words.filter((w) => w.length >= 4 && w.length <= 7 && vowelCount(w) / w.length >= 0.6);
    default:
      return dict.words;
  }
}

export function browseWordList(dict, options = {}) {
  const {
    category = 'two',
    search = '',
    startsWith = '',
    mode = 'all',
    sort = 'alpha-asc',
    page = 1,
    pageSize = 100,
  } = options;

  let pool = getCategoryWords(dict, category);

  if (mode === 'common' && dict.common) {
    pool = pool.filter((w) => dict.common.has(w));
  }

  const cleanSearch = search.toLowerCase().replace(/[^a-z]/g, '');
  if (cleanSearch) {
    pool = pool.filter((w) => w.includes(cleanSearch));
  }

  const cleanStart = startsWith.toLowerCase().replace(/[^a-z]/g, '');
  if (cleanStart) {
    pool = pool.filter((w) => w.startsWith(cleanStart));
  }

  const sorted = [...pool];
  if (sort === 'alpha-asc') {
    sorted.sort();
  } else if (sort === 'alpha-desc') {
    sorted.sort((a, b) => b.localeCompare(a));
  } else if (sort === 'score-desc') {
    sorted.sort((a, b) => scoreWord(b) - scoreWord(a) || a.localeCompare(b));
  } else if (sort === 'length-desc') {
    sorted.sort((a, b) => b.length - a.length || a.localeCompare(b));
  }

  const total = sorted.length;
  const safePageSize = Math.max(1, Math.min(500, pageSize));
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * safePageSize;
  const items = sorted.slice(start, start + safePageSize);

  return {
    items,
    allMatching: sorted,
    total,
    page: currentPage,
    totalPages,
    pageSize: safePageSize,
  };
}

/**
 * Safely resolves and normalizes a playable pronunciation audio URL from a phonetics array.
 * Validates protocol schemes (https, http, and protocol-relative //).
 * Returns null for missing, malformed, or relative audio paths.
 */
export function resolveAudioUrl(phonetics) {
  if (!Array.isArray(phonetics)) return null;
  const raw = phonetics.find(
    (p) => p && typeof p.audio === 'string' && p.audio.trim().length > 0
  )?.audio?.trim();
  if (!raw) return null;
  if (raw.startsWith('//')) {
    return `https:${raw}`;
  }
  if (raw.startsWith('https://') || raw.startsWith('http://')) {
    return raw;
  }
  return null;
}


