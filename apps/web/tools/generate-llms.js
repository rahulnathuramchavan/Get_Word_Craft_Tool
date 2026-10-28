#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const LLMS_TXT_CONTENT = `# WordCraft Tool

> WordCraft Tool (https://getwordcraft.com/) is a free, fast, privacy-focused word-game reference and solver toolkit. Powered by an open 437,673-word English ENABLE dictionary, all tools run 100% client-side in the browser with zero registration, zero accounts, and zero tracking.

## Core Tools
- [Word Finder](https://getwordcraft.com/word-finder): Search for words using letter racks and pattern constraints.
- [Word Unscrambler](https://getwordcraft.com/word-unscrambler): Unscramble letter sets with support for wildcards (?) to find Scrabble and game plays.
- [Anagram Solver](https://getwordcraft.com/anagram-solver): Find exact anagrams from any combination of letters.
- [Wordle Helper](https://getwordcraft.com/wordle-helper): Filter 5-letter words using green, yellow, and gray letter feedback.
- [Crossword Finder](https://getwordcraft.com/crossword-finder): Solve crossword blanks using fixed letters and wildcard dots (e.g. c..ft).
- [Scramble Generator](https://getwordcraft.com/scramble-generator): Create solvable anagram scrambles for study or puzzles.
- [Definition Finder](https://getwordcraft.com/definition-finder): Search dictionary definitions and pronunciations via the open Free Dictionary API.
- [Word Lists](https://getwordcraft.com/word-lists): Browse curated word lists (2-letter words, Q without U, high-scoring words).

## Educational Articles & Strategy Guides
- [How to Unscramble Words Faster](https://getwordcraft.com/learn/unscramble-words-faster): Step-by-step techniques and affix parking for unscrambling letter racks.
- [Wordle Opening Strategy](https://getwordcraft.com/learn/wordle-opening-strategy): Letter frequency analysis and optimal starting guesses.
- [The Two-Letter Words Every Word-Game Player Should Know](https://getwordcraft.com/learn/two-letter-words): Essential two-letter hook words for competitive tile games.
- [Wildcards and Letter Patterns](https://getwordcraft.com/learn/wildcards-and-patterns): How to use blanks and regex patterns to solve difficult puzzle grids.
- [How to Find the Best Word in Scrabble](https://getwordcraft.com/learn/best-word-in-scrabble): A practical decision framework balancing rack leave equity and board defense.
- [How to Solve Crossword Clues](https://getwordcraft.com/learn/how-to-solve-crossword-clues): Structural clue types and constraint-satisfaction solving methods.

## Company, Trust & Contact
- [About WordCraft Tool](https://getwordcraft.com/about): Mission, technology stack, and dictionary data sources.
- [Contact](https://getwordcraft.com/contact): Inquiries via hello@getwordcraft.com or +1-800-555-0199 (100 Pine Street, Suite 1250, San Francisco, CA 94111, US).
- [Privacy Policy](https://getwordcraft.com/privacy): Details on client-side search execution and zero personal data collection.
- [Terms of Service](https://getwordcraft.com/terms): Terms governing use of WordCraft Tool.
- [Disclaimer](https://getwordcraft.com/disclaimer): Educational and utility disclaimer regarding independent trademarks.

## Machine-Readable Resources
- [MCP Server Card](https://getwordcraft.com/.well-known/mcp/server-card.json): Model Context Protocol server capabilities (SEP-1649).
- [XML Sitemap](https://getwordcraft.com/sitemap.xml): Machine-readable URL index with canonical lastmod dates.
- [Robots Directives](https://getwordcraft.com/robots.txt): Crawler rules and Content-Signal declarations.
`;

function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const llmsPath = path.join(publicDir, 'llms.txt');
  fs.writeFileSync(llmsPath, LLMS_TXT_CONTENT, 'utf8');
  console.log('✓ Generated public/llms.txt');

  const mdPath = path.join(publicDir, 'index.md');
  fs.writeFileSync(mdPath, LLMS_TXT_CONTENT, 'utf8');
  console.log('✓ Generated public/index.md');
}

main();
