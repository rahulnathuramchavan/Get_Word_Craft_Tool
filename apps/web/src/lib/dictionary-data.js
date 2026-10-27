// Separate asynchronous chunk for raw dictionary texts.
// This is only imported dynamically by loadDictionary() when a tool or quick search requests it.

export async function fetchDictionaryTexts() {
  const [wordsModule, commonModule] = await Promise.all([
    import('@/data/words.txt?raw'),
    import('@/data/common.txt?raw'),
  ]);
  return {
    wordsTxt: wordsModule.default,
    commonTxt: commonModule.default,
  };
}
