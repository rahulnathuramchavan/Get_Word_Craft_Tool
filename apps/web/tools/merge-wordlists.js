/**
 * Dictionary Expansion Merge Script
 * Place: apps/web/tools/merge-wordlists.js
 * Run:   node apps/web/tools/merge-wordlists.js   (from project root)
 *        OR: node tools/merge-wordlists.js         (from apps/web/)
 *
 * Merges ENABLE + SOWPODS + dwyl/english-words into one deduplicated words.txt
 * Filter: /^[a-z]{2,15}$/ — matches buildDictionary() rule in dictionary.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const WORDS_FILE = path.join(__dirname, '../src/data/words.txt');

const SOURCES = [
  { name: 'SOWPODS (International Scrabble)', url: 'https://raw.githubusercontent.com/jesstess/Scrabble/master/scrabble/sowpods.txt' },
  { name: 'dwyl/english-words (words_alpha)', url: 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt' },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    let data = '';
    https.get(url, (res) => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); res.resume(); return; }
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractWords(text) {
  const words = new Set();
  for (const raw of text.split(/\r?\n/)) {
    const w = raw.trim().toLowerCase();
    if (/^[a-z]{2,15}$/.test(w)) words.add(w);
  }
  return words;
}

async function main() {
  console.log('Loading existing words.txt...');
  const existingText = fs.readFileSync(WORDS_FILE, 'utf8');
  const merged = extractWords(existingText);
  console.log('  -> ' + merged.size.toLocaleString() + ' words loaded');
  for (const source of SOURCES) {
    console.log('\nDownloading: ' + source.name);
    try {
      const text = await fetchUrl(source.url);
      const before = merged.size;
      for (const w of extractWords(text)) merged.add(w);
      console.log('  -> +' + (merged.size - before).toLocaleString() + ' new words (total: ' + merged.size.toLocaleString() + ')');
    } catch (err) { console.warn('  WARN: ' + err.message); }
  }
  console.log('\nSorting and writing...');
  const sorted = [...merged].sort();
  fs.writeFileSync(WORDS_FILE, sorted.join('\n') + '\n', 'utf8');
  const sizeMB = (fs.statSync(WORDS_FILE).size / 1024 / 1024).toFixed(2);
  console.log('Done! Words: ' + sorted.length.toLocaleString() + ' | Size: ' + sizeMB + ' MB');
}
main().catch((err) => { console.error('Error:', err.message); process.exit(1); });
