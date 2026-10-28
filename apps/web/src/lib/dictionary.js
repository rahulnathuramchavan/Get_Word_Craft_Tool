/*
 * Word engine for WordCraft Tool.
 * Dictionary data loader and entrypoint. Core search algorithms are maintained in
 * dictionary-engine.js for pure testability and performance.
 */

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
  resolveAudioUrl,
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
  resolveAudioUrl,
};

let dictPromise = null;

export function loadDictionary() {
  if (!dictPromise) {
    dictPromise = (async () => {
      try {
        const { fetchDictionaryTexts } = await import('./dictionary-data');
        const { wordsTxt, commonTxt } = await fetchDictionaryTexts();
        return buildDictionary(wordsTxt, commonTxt);
      } catch (err) {
        dictPromise = null;
        throw new Error(err?.message || 'The word list could not be prepared. Please reload the page.');
      }
    })();
  }
  return dictPromise;
}

