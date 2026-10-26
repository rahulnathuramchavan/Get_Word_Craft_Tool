/*
 * Word engine for WordCraft Tool.
 * Dictionary data loader and entrypoint. Core search algorithms are maintained in
 * dictionary-engine.js for pure testability and performance.
 */

// eslint-disable-next-line import/no-unresolved
import wordsTxt from '@/data/words.txt?raw';
// eslint-disable-next-line import/no-unresolved
import commonTxt from '@/data/common.txt?raw';
import {
  LETTER_SCORES,
  MAX_RESULTS,
  scoreWord,
  buildDictionary,
  getCharCounts,
  wordHasRequiredCounts,
  rackCounts,
  canFormFromRack,
  matchesPattern,
  sortResults,
  findWords,
  exactAnagrams,
  wordleFilter,
  randomWord,
  scrambleWord,
  getCategoryWords,
  browseWordList,
} from './dictionary-engine';

export {
  LETTER_SCORES,
  MAX_RESULTS,
  scoreWord,
  buildDictionary,
  getCharCounts,
  wordHasRequiredCounts,
  rackCounts,
  canFormFromRack,
  matchesPattern,
  sortResults,
  findWords,
  exactAnagrams,
  wordleFilter,
  randomWord,
  scrambleWord,
  getCategoryWords,
  browseWordList,
};

let dictPromise = null;

export function loadDictionary() {
  if (!dictPromise) {
    // Defer parsing so the first paint is never blocked by indexing words.
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
