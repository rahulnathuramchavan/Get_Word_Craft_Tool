import React from 'react';
import { Link } from 'react-router-dom';

function GuideSection({ title, children }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function GuideSubsection({ title, children }) {
  return (
    <div className="space-y-1.5 rounded-xl border border-border/70 bg-card/40 p-4">
      <h3 className="font-display text-base font-semibold text-foreground">
        {title}
      </h3>
      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

/* ---------------- 1. Word Finder Guide ---------------- */
export function WordFinderGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="How to Master the Word Finder">
        <p>
          The Word Finder is designed for strategic tile placement in games like Scrabble, Words With Friends,
          and anagram puzzles. Unlike simple unscramblers, it allows you to cross-reference the letters in your
          hand with open board spaces, length constraints, and positional letter anchors.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="1. Enter Your Rack Letters">
          <p>
            Type the tiles currently on your rack into the <strong>Letters</strong> field (up to 15 characters).
            Use a question mark (<code>?</code>) for each blank wildcard tile.
          </p>
        </GuideSubsection>
        <GuideSubsection title="2. Set Board Patterns (Optional)">
          <p>
            Use the <strong>Pattern</strong> field to match letters on the board. For example, entering{' '}
            <code>c?t??</code> searches for 5-letter words with <em>C</em> at position 1 and <em>T</em> at position 3,
            drawing missing letters from your rack.
          </p>
        </GuideSubsection>
        <GuideSubsection title="3. Target Specific Board Openings">
          <p>
            Combine <strong>Starts with</strong>, <strong>Ends with</strong>, or <strong>Contains</strong> filters
            to latch onto existing board tiles or hit premium multiplier squares.
          </p>
        </GuideSubsection>
        <GuideSubsection title="4. Choose Your Dictionary Mode">
          <p>
            Toggle between <strong>All words</strong> (searches the complete 437,000+ open word index) and{' '}
            <strong>Common words</strong> (focuses on ~9,400 familiar English words for casual games).
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Testable Input Examples">
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <strong>Rack with a wildcard:</strong> Letters: <code>retina?</code> &rarr; Finds 7-letter anagrams and extensions like{' '}
            <em>trainer</em>, <em>retinae</em>, <em>retain</em>, and <em>retina</em>.
          </li>
          <li>
            <strong>Rack + Board Pattern:</strong> Rack: <code>aer</code>, Pattern: <code>c?t??</code> &rarr; Solves to{' '}
            <em>cater</em> by supplying the missing <em>A</em>, <em>E</em>, and <em>R</em> into the empty squares.
          </li>
          <li>
            <strong>Prefix + Length limits:</strong> Starts with: <code>un</code>, Min length: <code>6</code>, Max length: <code>7</code>{' '}
            &rarr; Explores high-probability prefix hooks like <em>unlock</em>, <em>unseen</em>, and <em>unreal</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Interpreting Results & Scoring">
        <p>
          Each word chip displays its total classic tile score based on English letter point values
          (e.g., A=1, D=2, B=3, F=4, K=5, J=8, Q=10, Z=10). You can sort results by word length,
          tile score, or alphabetical order. Clicking any word chip opens its instant dictionary definition in the{' '}
          <Link to="/definition-finder" className="text-primary underline hover:text-primary/80">Definition Finder</Link>.
        </p>
      </GuideSection>

      <GuideSection title="Game Legality & Limitations">
        <p>
          Results are indexed from an open, 437,000+ English word list covering words from 2 to 15 characters.
          Keep in mind that official tournament games (such as NASPA Scrabble using NWL or Collins CSW) use proprietary
          lexicons that exclude proper nouns, vulgarities, and non-standard abbreviations that may appear in broader open lists.
          Always confirm with your specific game's rules for tournament play.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 2. Word Unscrambler Guide ---------------- */
export function UnscramblerGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="How to Unscramble Jumbled Letters">
        <p>
          The Word Unscrambler takes any jumbled assortment of letters and instantly discovers every valid English word
          that can be assembled from those characters. Results are automatically sorted into distinct length groups
          (from longest to shortest) to help you quickly identify high-value bingos and secondary plays.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Using Wildcards (?)">
          <p>
            Have blank tiles? Type a question mark (<code>?</code>) for each blank. The unscrambler will test all 26 English
            substitutions while preserving your known letters.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Duplicate Letters">
          <p>
            Duplicate letters are strictly respected. If your rack contains two <em>E</em>'s, only words requiring at most two{' '}
            <em>E</em>'s will be generated (unless a blank tile is available to act as a third).
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Testable Input Examples">
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <strong>Jumble rack:</strong> <code>dgior</code> &rarr; Grouped into 5-letter (<em>gordi</em>), 4-letter (<em>grid</em>,{' '}
            <em>gird</em>), and 3-letter words (<em>god</em>, <em>dog</em>, <em>rid</em>, <em>rod</em>, <em>dig</em>).
          </li>
          <li>
            <strong>Wildcard combination:</strong> <code>a?</code> &rarr; Discovers legal 2-letter hook words like{' '}
            <em>at</em>, <em>an</em>, <em>as</em>, <em>am</em>, <em>ax</em>, <em>ay</em>.
          </li>
          <li>
            <strong>High-scoring bingos:</strong> <code>qu?rts</code> &rarr; Tests Q-hooks and finds words like <em>squirt</em>,{' '}
            <em>quarts</em>, and <em>squart</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Features & One-Tap Actions">
        <p>
          Click <strong>Copy all</strong> to copy the entire comma-separated result list to your clipboard.
          Need to verify word meaning or part of speech? Tap any chip to inspect its full definition with usage examples.
          If you need positional pattern matching or crossword blanks, switch to the{' '}
          <Link to="/crossword-finder" className="text-primary underline hover:text-primary/80">Crossword Finder</Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 3. Anagram Solver Guide ---------------- */
export function AnagramGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Exact Anagram Solutions">
        <p>
          An exact anagram is a word formed by rearranging the letters of another word, using every single original letter
          exactly once. Unlike the general Unscrambler (which finds shorter sub-words), the Anagram Solver focuses exclusively
          on full-length permutations.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Letter-Signature Hashing">
          <p>
            The solver indexes the dictionary using sorted letter signatures (e.g., <em>alerts</em> &rarr; <code>aelrst</code>).
            This guarantees instant matching across all 437,000+ words with zero search lag.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Query Exclusion">
          <p>
            When you enter an existing word like <em>listen</em>, the solver automatically hides the query itself and displays
            only true alternative permutations (<em>silent</em>, <em>enlist</em>, <em>inlets</em>, <em>tinsel</em>).
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Testable Input Examples">
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <code>listen</code> &rarr; Finds <em>silent</em>, <em>enlist</em>, <em>inlets</em>, <em>tinsel</em>.
          </li>
          <li>
            <code>alerts</code> &rarr; Finds <em>alters</em>, <em>artels</em>, <em>laster</em>, <em>ratels</em>, <em>salter</em>, <em>slater</em>, <em>staler</em>.
          </li>
          <li>
            <code>ca?</code> (with wildcard) &rarr; Finds exact 3-letter matches like <em>cat</em>, <em>cab</em>, <em>cap</em>, <em>car</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="When to Use Anagram Solver vs. Word Finder">
        <p>
          Use the Anagram Solver when you need to solve an exact jumble puzzle or find a direct anagram of a specific word.
          If you want to discover smaller words hidden inside your rack, use the{' '}
          <Link to="/word-unscrambler" className="text-primary underline hover:text-primary/80">Word Unscrambler</Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 4. Wordle Helper Guide ---------------- */
export function WordleGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Deductive Wordle Strategy & Clue System">
        <p>
          Wordle Helper is an interactive puzzle assistant for 5-letter daily word challenges.
          It evaluates the color clues from your guesses to systematically eliminate impossible candidates
          using exact constraint logic.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-3">
        <GuideSubsection title="Green (Correct)">
          <p>
            The letter is in the secret word and in the <strong>exact position</strong>.
            Shortcut: Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">G</kbd> on any focused cell.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Amber / Yellow (Misplaced)">
          <p>
            The letter is in the secret word, but <strong>not in this position</strong>.
            Shortcut: Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Y</kbd>.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Gray (Excluded)">
          <p>
            The letter <strong>does not appear</strong> in the word (or does not appear additional times).
            Shortcut: Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">X</kbd>.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Duplicate Letter Intelligence">
        <p>
          Wordle's trickiest scenarios involve repeated letters. For example, if you guess <code>SPEED</code> and the first{' '}
          <em>E</em> is Green while the second <em>E</em> is Gray, our engine mathematically deduces that the secret word
          contains <strong>exactly one E</strong>. Candidate words with multiple <em>E</em>'s (like <em>FLEET</em> or <em>CHEER</em>)
          are automatically disqualified.
        </p>
      </GuideSection>

      <GuideSection title="Step-by-Step Testable Example">
        <ol className="list-inside list-decimal space-y-1.5">
          <li>Enter a strong opener like <code>CRANE</code> in Row 1.</li>
          <li>Suppose <em>C</em>, <em>A</em>, and <em>E</em> turn gray, <em>R</em> turns yellow at slot 2, and <em>N</em> turns green at slot 4.</li>
          <li>Cycle the tile colors by clicking or using keyboard keys.</li>
          <li>
            The helper instantly filters down to words with <em>N</em> at index 4, containing <em>R</em> anywhere except index 2,
            and omitting <em>C</em>, <em>A</em>, and <em>E</em> (e.g. <em>IRONY</em>, <em>WRONG</em>, <em>DRINK</em>).
          </li>
        </ol>
      </GuideSection>

      <GuideSection title="Vocabulary Guidance">
        <p>
          The helper searches all 18,376 five-letter words in our open reference dictionary.
          Because the New York Times Wordle answer list typically favors common everyday English words (~2,300 curated solutions),
          we recommend prioritizing familiar vocabulary when selecting your next guess.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 5. Crossword Finder Guide ---------------- */
export function CrosswordGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Cracking Missing-Letter Crossword Clues">
        <p>
          Crossword Finder is tailored for grid-based word puzzles, acrostics, and missing-letter challenges.
          When intersecting clues give you fragments of a word with unknown letters in between, positional wildcard matching
          allows you to reveal all valid solutions that fit the exact grid dimensions.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Pattern Formatting">
          <p>
            Type known letters and put a question mark (<code>?</code>) for each blank square.
            For example, <code>c?t?r</code> represents a 5-letter word with <em>C</em> at position 1, <em>T</em> at position 3,
            and <em>R</em> at position 5.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Must Include Letters">
          <p>
            Have letters confirmed by crossing words without knowing where they slot in? Enter them in the{' '}
            <strong>Must include letters</strong> filter to enforce their presence anywhere in the word.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Testable Pattern Examples">
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <code>c?t?r</code> &rarr; Matches <em>cater</em>, <em>cotter</em>, <em>cuter</em>.
          </li>
          <li>
            <code>p???le</code> &rarr; Matches <em>puzzle</em>, <em>poodle</em>, <em>purple</em>, <em>people</em>.
          </li>
          <li>
            <code>?q????</code> &rarr; Matches <em>squash</em>, <em>square</em>, <em>equity</em>, <em>opaque</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Dictionary Modes for Crosswords">
        <p>
          Standard newspaper crosswords (such as NYT or LA Times Monday through Thursday) stick strictly to common vocabulary.
          Select <strong>Common words</strong> to filter out obscure scientific terminology. For Friday/Saturday editions
          or cryptic crosswords, switch to <strong>All words</strong> to search the complete 437k+ lexicon.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 6. Scramble Generator Guide ---------------- */
export function ScrambleGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Create Word Scramble Puzzles">
        <p>
          Word Scramble Generator creates randomized anagram puzzles from common English dictionary words.
          It is an engaging tool for teachers, parents, students, and puzzle enthusiasts looking to practice
          spelling and cognitive letter arrangement.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-3">
        <GuideSubsection title="Short (4–5 Letters)">
          <p>Ideal for beginners, young learners, and quick warm-up spelling drills (e.g. <em>TRAIN</em>, <em>PLANT</em>).</p>
        </GuideSubsection>
        <GuideSubsection title="Medium (5–7 Letters)">
          <p>Balanced challenge for game nights and intermediate vocabulary practice (e.g. <em>PLANET</em>, <em>CASTLE</em>).</p>
        </GuideSubsection>
        <GuideSubsection title="Long (7–9 Letters)">
          <p>Challenging scrambles for experienced word puzzle enthusiasts (e.g. <em>PICTURE</em>, <em>BUILDING</em>).</p>
        </GuideSubsection>
      </div>

      <GuideSection title="How to Practice & Play">
        <ol className="list-inside list-decimal space-y-1.5">
          <li>Choose your difficulty level using the dropdown selector.</li>
          <li>Click <strong>Roll new word</strong> to generate a scrambled letter set.</li>
          <li>Try to solve the puzzle in your head or jot down possible letter combinations on paper.</li>
          <li>Toggle <strong>Show solution</strong> to reveal the answer and verify your guess.</li>
          <li>Click <strong>Copy puzzle</strong> to copy the challenge text formatted for sharing or messaging.</li>
        </ol>
      </GuideSection>

      <GuideSection title="Fair Play Guarantee">
        <p>
          Every scramble is generated from our curated common English frequency layer. Puzzles will never feature
          archaic abbreviations or obscure jargon. Furthermore, our shuffling algorithm verifies that the scrambled
          result is never accidentally identical to the original word.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 7. Definition Finder Guide ---------------- */
export function DefinitionGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Look Up Meanings, Pronunciations & Usage">
        <p>
          Definition Finder offers quick, clean access to English word definitions, parts of speech, phonetic spellings,
          and example sentences without distracting advertising or intrusive popups.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Fast In-Game Verification">
          <p>
            Wondering if an unfamiliar word is a noun or verb before placing it on the game board?
            Clicking any chip across Word Finder or Unscrambler brings you directly here with the meaning ready.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Dual API Reliability">
          <p>
            Definitions are retrieved live from the Free Dictionary API with an automatic fallback to the Datamuse
            lexical database, ensuring reliable uptime and fast response times.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Testable Lookup Examples">
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <code>serendipity</code> &rarr; Noun: The occurrence and development of events by chance in a happy or beneficial way.
          </li>
          <li>
            <code>cater</code> &rarr; Verb: Provide food and drink, typically at social events; or supply what is required.
          </li>
          <li>
            <code>resilience</code> &rarr; Noun: The capacity to recover quickly from difficulties; toughness.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Game Lexicons vs. General Dictionaries">
        <p>
          Note that specialized competitive word games (like Scrabble) include valid short hook words (such as <em>QI</em>,{' '}
          <em>ZA</em>, or <em>AA</em>) that derive from specialized historical or foreign origins. While these words are valid
          game plays in our word tools, modern general-purpose definition APIs may occasionally lack extended definitions for them.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 8. Word Lists Guide ---------------- */
export function WordListsGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Essential Word Reference Lists">
        <p>
          Word Lists provides instant reference collections for high-leverage tile combinations that every competitive
          player studies. Memorizing short words and high-point hooks is the single most effective way to elevate your game score.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Two-Letter Words">
          <p>
            The foundation of competitive tile play. Two-letter words allow you to play words in parallel along existing
            board lines, scoring points in both horizontal and vertical directions simultaneously.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Three-Letter Words">
          <p>
            Essential extension hooks. Adding a single letter to the front or back of a two-letter word turns tight board
            corners into high-scoring scoring zones.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Q Without U Lifelines">
          <p>
            Stuck with a 10-point Q tile and no U on your rack? Words like <em>FAQIR</em>, <em>BURQA</em>, and <em>QAT</em>{' '}
            let you score big without taking a penalty turn to swap tiles.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Power Letters (J, Q, X, Z)">
          <p>
            Short words (up to 6 letters) packing high-value tiles. Placing these on Double or Triple Letter bonus squares
            can easily score 30 to 50+ points in a single turn.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Browsing, Filtering & Copying">
        <p>
          Select any curated list or browse by exact word length from 2 to 15 letters.
          Use the in-page search bar to locate substrings, filter by starting letter or common vocabulary,
          sort by alphabetical order or Scrabble tile score, and navigate through pages.
          Click <strong>Copy page</strong> or <strong>Copy all</strong> to copy words to your clipboard for offline study or printable flashcards.
          For rack-specific unscrambling or pattern matching, try our{' '}
          <Link to="/word-finder" className="text-primary underline hover:text-primary/80">Word Finder</Link>{' '}
          and <Link to="/word-unscrambler" className="text-primary underline hover:text-primary/80">Word Unscrambler</Link>.
        </p>
      </GuideSection>
    </div>
  );
}
