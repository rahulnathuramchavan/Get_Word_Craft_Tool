/**
 * Definition Finder Caching & Request Coordinator
 * 
 * Implements:
 * - Bounded LRU in-memory cache (max 100 entries)
 * - Word key normalization (case and whitespace trimming)
 * - Safe caching (only successful 'ready' results with valid entries are cached)
 * - Concurrent in-flight request deduplication
 * - Timeout handling and Datamuse fallback
 */

export const MAX_CACHE_SIZE = 100;

class BoundedCache {
  constructor(limit = MAX_CACHE_SIZE) {
    this.limit = limit;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return null;
    const value = this.map.get(key);
    // Refresh access order (LRU)
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.limit) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }

  has(key) {
    return this.map.has(key);
  }

  delete(key) {
    return this.map.delete(key);
  }

  clear() {
    this.map.clear();
  }

  get size() {
    return this.map.size;
  }
}

// Module-level in-memory cache and in-flight request registry
export const definitionCache = new BoundedCache(MAX_CACHE_SIZE);
const inFlightRequests = new Map();

/**
 * Normalizes input word for consistent cache lookup and API requests.
 */
export function normalizeWord(word) {
  if (!word || typeof word !== 'string') return '';
  return word
    .trim()
    .toLowerCase()
    .replace(/^[^a-z]+/, '')
    .replace(/[^a-z\-']+$/, '');
}

/**
 * Validates word format: single word with English letters, hyphens, or apostrophes.
 */
export function isValidWord(word) {
  return /^[a-z][a-z\-']*$/.test(word);
}

/**
 * Helper to execute fetch with an abortable timeout.
 */
async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const timer = typeof window !== 'undefined'
    ? window.setTimeout(() => controller.abort(), ms)
    : setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    if (typeof window !== 'undefined') {
      window.clearTimeout(timer);
    } else {
      clearTimeout(timer);
    }
  }
}

/**
 * Fetches definition from dictionary APIs:
 * 1. Primary: Free Dictionary API (dictionaryapi.dev)
 * 2. Fallback: Datamuse API (api.datamuse.com)
 * 
 * Result structure:
 * - status: 'ready' | 'empty' | 'error' | 'invalid'
 * - entries: Array of dictionary entries
 * - word: normalized string
 * - errorMsg?: string (on error)
 * - fromCache?: boolean
 */
export async function fetchDefinition(rawWord) {
  const clean = normalizeWord(rawWord);
  if (!isValidWord(clean)) {
    return { status: 'invalid', entries: [], word: clean };
  }

  // 1. Check in-memory LRU cache
  const cachedEntries = definitionCache.get(clean);
  if (cachedEntries && Array.isArray(cachedEntries) && cachedEntries.length > 0) {
    return {
      status: 'ready',
      entries: cachedEntries,
      word: clean,
      fromCache: true,
    };
  }

  // 2. Reuse in-flight request if one is already pending for this word
  if (inFlightRequests.has(clean)) {
    return inFlightRequests.get(clean);
  }

  // 3. Initiate network request
  const requestPromise = (async () => {
    try {
      let res;
      try {
        res = await fetchWithTimeout(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`,
        );
        if (res.status === 404) {
          // Word not in dictionary — do NOT cache empty results as definitions
          return { status: 'empty', entries: [], word: clean };
        }
        if (!res.ok) {
          throw new Error(`Primary API error ${res.status}`);
        }
      } catch {
        // Primary API unreachable, timed out, or 5xx server error — try Datamuse as fallback
        const fallback = await fetchWithTimeout(
          `https://api.datamuse.com/words?sp=${encodeURIComponent(clean)}&md=d&max=1`,
        );
        if (!fallback.ok) throw new Error('fallback failed');
        const fallbackData = await fallback.json();
        if (!fallbackData.length || !fallbackData[0].defs?.length) {
          return { status: 'empty', entries: [], word: clean };
        }
        // Shape Datamuse response to match dictionaryapi format
        const defs = fallbackData[0].defs.map((d) => {
          const [pos, ...rest] = d.split('\t');
          return { partOfSpeech: pos, definitions: [{ definition: rest.join(' ') }] };
        });
        const entries = [{ word: clean, meanings: defs, phonetics: [] }];
        // Only cache successful 'ready' definitions
        definitionCache.set(clean, entries);
        return { status: 'ready', entries, word: clean };
      }

      const data = await res.json();
      const entries = Array.isArray(data) ? data : [];

      if (entries.length > 0) {
        // Cache successful response in memory
        definitionCache.set(clean, entries);
        return { status: 'ready', entries, word: clean };
      }

      return { status: 'empty', entries: [], word: clean };
    } catch (err) {
      // Do NOT cache network or server errors
      const isTimeout = err?.name === 'AbortError';
      return {
        status: 'error',
        entries: [],
        word: clean,
        errorMsg: isTimeout
          ? 'The request timed out. Check your connection and try again.'
          : 'The dictionary service could not be reached. Check your connection and try again.',
      };
    } finally {
      inFlightRequests.delete(clean);
    }
  })();

  inFlightRequests.set(clean, requestPromise);
  return requestPromise;
}
