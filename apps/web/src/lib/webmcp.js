/*
 * WebMCP (Model Context Protocol in Browser) registration module.
 * Exposes WordCraft Tool capabilities to in-browser AI agents and browser extensions.
 * Compatible with navigator.modelContext.registerTool() and window.modelContext.
 */

export function registerWebMcpTools() {
  if (typeof window === 'undefined') return;

  const tools = [
    {
      name: 'word_finder',
      description: 'Search for tournament-valid English words from a rack of letters with wildcard (?) support and pattern matching.',
      inputSchema: {
        type: 'object',
        properties: {
          letters: {
            type: 'string',
            description: 'Letters available on the rack. Use ? for blank wildcards.',
          },
          pattern: {
            type: 'string',
            description: 'Optional crossword/board pattern with dots (e.g. c..ft).',
          },
          sort: {
            type: 'string',
            enum: ['score', 'length-desc', 'alpha'],
            description: 'Sort order: score (highest tile value), length-desc (longest first), or alpha (A-Z).',
          },
        },
        required: ['letters'],
      },
      execute: async ({ letters, pattern = '', sort = 'score' } = {}) => {
        try {
          const { loadDictionary, findWords } = await import('./dictionary');
          const dict = await loadDictionary();
          const results = findWords(dict, { letters, pattern, sort });
          return {
            status: 'success',
            total: results.total,
            words: results.results.slice(0, 100),
          };
        } catch (err) {
          return { status: 'error', message: err?.message || 'Word finder execution failed' };
        }
      },
    },
    {
      name: 'word_unscrambler',
      description: 'Unscramble a jumbled rack of letters to find all possible valid English words sorted by length or score.',
      inputSchema: {
        type: 'object',
        properties: {
          letters: {
            type: 'string',
            description: 'The jumbled letters to unscramble.',
          },
        },
        required: ['letters'],
      },
      execute: async ({ letters } = {}) => {
        try {
          const { loadDictionary, findWords } = await import('./dictionary');
          const dict = await loadDictionary();
          const results = findWords(dict, { letters, sort: 'length-desc' });
          return {
            status: 'success',
            total: results.total,
            words: results.results.slice(0, 100),
          };
        } catch (err) {
          return { status: 'error', message: err?.message || 'Word unscrambler execution failed' };
        }
      },
    },
    {
      name: 'anagram_solver',
      description: 'Find all exact full-length anagrams of a given word or letter combination.',
      inputSchema: {
        type: 'object',
        properties: {
          word: {
            type: 'string',
            description: 'Word or letters to find exact anagrams for.',
          },
        },
        required: ['word'],
      },
      execute: async ({ word } = {}) => {
        try {
          const { loadDictionary, exactAnagrams } = await import('./dictionary');
          const dict = await loadDictionary();
          const words = exactAnagrams(dict, word);
          return {
            status: 'success',
            total: words.length,
            anagrams: words,
          };
        } catch (err) {
          return { status: 'error', message: err?.message || 'Anagram solver execution failed' };
        }
      },
    },
    {
      name: 'crossword_finder',
      description: 'Find words matching a crossword pattern where missing letters are represented by dots (e.g. c..ft).',
      inputSchema: {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: 'Crossword pattern with dots for unknown letters (e.g. c..ft).',
          },
        },
        required: ['pattern'],
      },
      execute: async ({ pattern } = {}) => {
        try {
          const { loadDictionary, findWords } = await import('./dictionary');
          const dict = await loadDictionary();
          const results = findWords(dict, { pattern, sort: 'alpha' });
          return {
            status: 'success',
            total: results.total,
            words: results.results.slice(0, 100),
          };
        } catch (err) {
          return { status: 'error', message: err?.message || 'Crossword finder execution failed' };
        }
      },
    },
  ];

  // Expose on window for in-browser agents and verification
  window.__webMcpTools = tools;

  // Register with navigator.modelContext or window.modelContext if available
  const context = window.navigator?.modelContext || window.modelContext;
  if (context && typeof context.registerTool === 'function') {
    tools.forEach((tool) => {
      try {
        context.registerTool(tool);
      } catch (err) {
        console.warn('WebMCP tool registration notice:', err);
      }
    });
  }
}
