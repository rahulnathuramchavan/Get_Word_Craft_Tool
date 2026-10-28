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
      <GuideSection title="How Word Finder Combines Racks, Patterns & Board Constraints">
        <p>
          The Word Finder is built for tactical board-game play in Scrabble, Words With Friends, and vocabulary puzzles.
          While a simple unscrambler only checks what your hand can assemble in isolation, Word Finder bridges your rack
          tiles with the physical board state—letting you match existing letter anchors, open board patterns, and strict length limits.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="1. Rack Letters vs. Board Pattern">
          <p>
            <strong>Letters (Rack):</strong> Enter the tiles sitting on your tray (up to 15 characters).
            Use a question mark (<code>?</code>) for each blank wildcard tile. Letters are used in any order.
          </p>
          <p>
            <strong>Pattern (Fixed Squares):</strong> Enter the exact letter sequence already sitting on the board.
            Use a <code>?</code> for empty squares. For example, <code>c?t??</code> forces a 5-letter word with <em>C</em> at position 1 and <em>T</em> at position 3, pulling the remaining letters from your rack.
          </p>
        </GuideSubsection>
        <GuideSubsection title="2. Positional Hooks & Prefix Filters">
          <p>
            Use <strong>Starts with</strong> and <strong>Ends with</strong> to test hooks onto existing words.
            Use <strong>Contains</strong> to ensure a specific letter cluster appears anywhere in the word, or{' '}
            <strong>Must include letters</strong> to mandate specific consonants.
          </p>
        </GuideSubsection>
        <GuideSubsection title="3. Length & Dictionary Mode Controls">
          <p>
            Set <strong>Min length</strong> and <strong>Max length</strong> to fit the exact number of empty squares available on the board.
            Toggle between <strong>Full dictionary</strong> (437,000+ words) for tournament play and{' '}
            <strong>Common words</strong> (~9,400 words) for family games.
          </p>
        </GuideSubsection>
        <GuideSubsection title="4. Wildcard Blank Mechanics">
          <p>
            In your rack, each <code>?</code> tests all 26 English letters. When scoring results, remember that physical
            blank tiles score 0 points on the board, even though the result chip shows the face value of the letter it represents.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Verified Constraint Examples">
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Rack with Wildcard:</strong> Letters: <code>retina?</code> &rarr; Discovers 7-letter high-probability bingos like{' '}
            <em>trainer</em>, <em>retinae</em>, <em>retain</em>, and <em>retina</em>.
          </li>
          <li>
            <strong>Rack + Fixed Board Pattern:</strong> Rack: <code>aer</code>, Pattern: <code>c?t??</code> &rarr; Solves to{' '}
            <em>cater</em>. The fixed letters <em>C</em> and <em>T</em> are anchored on the board; your rack tiles supply the missing <em>A</em>, <em>E</em>, and <em>R</em> for the empty squares.
          </li>
          <li>
            <strong>Prefix + Length limits:</strong> Starts with: <code>un</code>, Min length: <code>6</code>, Max length: <code>7</code>{' '}
            &rarr; Narrows to reliable prefix extensions like <em>unlock</em>, <em>unseen</em>, and <em>unreal</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Common Mistakes to Avoid">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Confusing Rack Letters with Board Pattern</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Entering board letters into the &ldquo;Letters&rdquo; field assumes you hold those tiles on your rack.
              Put board anchors in &ldquo;Pattern&rdquo; so the tool knows they are already on the board.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Contradictory Length Filters</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Setting a 5-character pattern like <code>c?t??</code> while setting Min length to 6 will yield 0 results,
              because pattern length and numeric length filters must agree.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Strategic Study & Sibling Tools">
        <p>
          Need to study how wildcards and positional patterns work together in competitive games?
          Read our in-depth guide on{' '}
          <Link to="/learn/wildcards-and-patterns" className="text-primary underline hover:text-primary/80">
            Wildcards, Blanks &amp; Board Patterns
          </Link>. If you only need to unscramble letters without board squares, use the{' '}
          <Link to="/word-unscrambler" className="text-primary underline hover:text-primary/80">
            Word Unscrambler
          </Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 2. Word Unscrambler Guide ---------------- */
export function UnscramblerGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="How to Approach a Rack Systematically">
        <p>
          The Word Unscrambler analyzes any assortment of letters and discovers every playable English word that can be
          formed from your rack. Results are grouped by word length (from longest to shortest) to help you instantly spot
          high-scoring bingos as well as compact 2- and 3-letter plays for tight board positions.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="1. Separate Vowels & Consonants">
          <p>
            Mentally split your letters into vowels and consonants. A balanced rack has 2 to 3 vowels and 3 to 4 consonants.
            If you have 5+ vowels, look for vowel-dump words in our{' '}
            <Link to="/word-lists" className="text-primary underline hover:text-primary/80">Word Lists</Link>.
          </p>
        </GuideSubsection>
        <GuideSubsection title="2. Spot Common Prefixes & Suffixes">
          <p>
            Scan for high-probability word affixes like <code>RE-</code>, <code>UN-</code>, <code>IN-</code>,{' '}
            <code>-ING</code>, <code>-ED</code>, <code>-ER</code>, and <code>-EST</code>. Setting these aside lets you
            focus on unscrambling the root letters.
          </p>
        </GuideSubsection>
        <GuideSubsection title="3. Duplicate Letter Accounting">
          <p>
            Duplicate letters are strictly enforced. If your rack contains two <em>E</em>&rsquo;s, results only include words
            requiring at most two <em>E</em>&rsquo;s, unless you also enter a <code>?</code> blank tile to act as a third.
          </p>
        </GuideSubsection>
        <GuideSubsection title="4. Wildcard Blank Mechanics">
          <p>
            Entering a <code>?</code> allows the solver to substitute all 26 alphabet characters. You can use multiple wildcards,
            though combinations expand exponentially with each additional blank.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Verified Unscrambling Examples">
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Rack with awkward consonants:</strong> <code>dgior</code> &rarr; Discovers 5-letter <em>gordi</em>,
            4-letter plays <em>grid</em> and <em>gird</em>, and high-frequency 3-letter words <em>dog</em>, <em>god</em>, <em>dig</em>, <em>rid</em>, and <em>rod</em>.
          </li>
          <li>
            <strong>Wildcard Rack:</strong> <code>qu?rts</code> &rarr; Tests Q-combinations and reveals 6-letter plays like{' '}
            <em>quarts</em> and <em>squirt</em>.
          </li>
          <li>
            <strong>Short hook discovery:</strong> <code>a?</code> &rarr; Uncovers essential 2-letter connectors like{' '}
            <em>at</em>, <em>an</em>, <em>as</em>, <em>am</em>, <em>ax</em>, and <em>ay</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Common Mistakes to Avoid">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Expecting Board Positional Matching</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              The unscrambler searches every possible anagram and sub-word from your hand. If you need letters fixed to specific
              board squares (e.g. C at position 1 and T at position 3), use the{' '}
              <Link to="/crossword-finder" className="text-primary underline hover:text-primary/80">Crossword Finder</Link> or{' '}
              <Link to="/word-finder" className="text-primary underline hover:text-primary/80">Word Finder</Link>.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Typing Punctuation or Spaces</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Only English letters (A–Z) and question marks (<code>?</code>) are supported. Numbers and punctuation marks are automatically stripped.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Learn More Rack-Solving Strategies">
        <p>
          To learn the step-by-step rack-shuffling methods used by top tournament players, read our complete guide:{' '}
          <Link to="/learn/unscramble-words-faster" className="text-primary underline hover:text-primary/80">
            How to Unscramble Words Faster
          </Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 3. Anagram Solver Guide ---------------- */
export function AnagramGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Exact-Letter Matching & Permutations">
        <p>
          An exact anagram is a word formed by rearranging the letters of another word, using <strong>every single letter exactly once</strong>.
          Unlike the general Word Unscrambler (which finds shorter sub-words of varying lengths), the Anagram Solver focuses
          strictly on full-length permutations of the exact same length as your input.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Letter-Signature Hashing">
          <p>
            Under the hood, our engine sorts the letters of every word in the dictionary alphabetically to create an invariant
            anagram key (e.g., <em>alerts</em> &rarr; <code>aelrst</code>). This allows constant-time, instant lookups across all 437,000+ words without lag.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Automatic Query Exclusion">
          <p>
            When you enter an existing dictionary word like <code>listen</code>, the solver intentionally suppresses the input word itself
            so you can immediately focus on true alternative permutations without redundant clutter.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Verified Testable Examples">
        <ul className="list-inside list-disc space-y-2">
          <li>
            <code>listen</code> &rarr; Discovers exact anagrams: <em>silent</em>, <em>enlist</em>, <em>inlets</em>, and <em>tinsel</em>.
          </li>
          <li>
            <code>alerts</code> &rarr; Discovers 7 exact 6-letter anagrams: <em>alters</em>, <em>artels</em>, <em>laster</em>, <em>ratels</em>, <em>salter</em>, <em>slater</em>, and <em>staler</em>.
          </li>
          <li>
            <code>drawer</code> &rarr; Discovers exact anagrams: <em>reward</em>, <em>redraw</em>, and <em>warder</em>.
          </li>
          <li>
            <code>ca?</code> (with wildcard) &rarr; Tests all 26 substitutions to find exact 3-letter matches like <em>cat</em>, <em>cab</em>, <em>cap</em>, and <em>car</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Common Mistakes & Tool Distinctions">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Expecting Shorter Sub-Words</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              If you enter <code>planet</code>, Anagram Solver will only look for 6-letter words. If you want 5-letter (<em>plant</em>),
              4-letter (<em>lane</em>), or 3-letter words (<em>pan</em>), use the{' '}
              <Link to="/word-unscrambler" className="text-primary underline hover:text-primary/80">Word Unscrambler</Link>.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Multi-Word Phrases</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              This solver operates on single dictionary words. It does not generate multi-word phrases or full sentence anagrams.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Next Steps">
        <p>
          Found an interesting anagram? Click any word chip to inspect its definition, part of speech, and pronunciation in the{' '}
          <Link to="/definition-finder" className="text-primary underline hover:text-primary/80">Definition Finder</Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 4. Wordle Helper Guide ---------------- */
export function WordleGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Deductive Constraint Logic & Clue Interpretation">
        <p>
          Wordle Helper is a deductive elimination assistant for 5-letter word puzzles.
          Rather than guessing randomly, it translates the color clues returned by your previous guesses into strict mathematical
          filters that systematically eliminate impossible words.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-3">
        <GuideSubsection title="Green (Correct Spot)">
          <p>
            The letter is confirmed in the secret word at this <strong>exact position</strong>.
            Click the cell or press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Enter</kbd> / <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Space</kbd> until the tile turns green.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Amber / Yellow (Wrong Spot)">
          <p>
            The letter is in the secret word, but <strong>not in this position</strong>.
            Cycle the tile color until it turns amber. Every candidate must include this letter somewhere else.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Gray (Excluded)">
          <p>
            The letter <strong>does not appear</strong> in the word (or does not appear additional times).
            Cycle the tile until it turns gray to exclude it from all remaining candidates.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Duplicate Letter Intelligence">
        <p>
          Wordle&rsquo;s most subtle mechanic involves repeated letters. If you guess <code>SPEED</code> and the first <em>E</em> is Green
          while the second <em>E</em> is Gray, our engine deduces that the secret word contains <strong>exactly one E</strong>.
          Candidate words with multiple <em>E</em>&rsquo;s (such as <em>FLEET</em> or <em>CHEER</em>) are automatically eliminated.
          If both turn yellow or green, words with only a single <em>E</em> are removed.
        </p>
      </GuideSection>

      <GuideSection title="Step-by-Step Verified Clue Example">
        <ol className="list-inside list-decimal space-y-2">
          <li>Enter a balanced starter word like <code>CRANE</code> in Row 1.</li>
          <li>
            Suppose the game returns: <em>C</em>, <em>A</em>, and <em>E</em> are <strong>gray</strong>; <em>R</em> is <strong>amber</strong> at slot 2; and <em>N</em> is <strong>green</strong> at slot 4.
          </li>
          <li>
            Cycle the tiles to match: C(gray), R(amber), A(gray), N(green), E(gray).
          </li>
          <li>
            <strong>Deductive Constraints:</strong> The secret word must have <em>N</em> at position 4; must contain <em>R</em> somewhere <em>other</em> than slot 2; and cannot contain <em>C</em>, <em>A</em>, or <em>E</em>.
          </li>
          <li>
            <strong>Valid Matching Candidates:</strong> The engine narrows the candidates to verified words such as{' '}
            <em>RHINO</em> (R at slot 1), <em>RUINS</em> (R at slot 1), <em>BURNS</em> (R at slot 3), and <em>TURNS</em> (R at slot 3).
          </li>
        </ol>
      </GuideSection>

      <GuideSection title="Avoiding Contradictory Clues & Common Mistakes">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Marking Gray Letters That Are Actually Yellow</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              If a letter is in the word, never mark it gray in another row unless it is an unrepeated duplicate.
              Marking a letter gray in Row 1 and yellow/green in Row 2 creates an impossible contradiction, resulting in &ldquo;Nothing matches those clues&rdquo;.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Curated Answers vs. Full Dictionary</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              The New York Times Wordle answer list is drawn from ~2,300 familiar English words, while our engine checks all 18,376 valid 5-letter entries.
              Always prioritize common everyday words over obscure terms when choosing your next guess.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Explore Wordle Strategy">
        <p>
          For optimal opening words, entropy calculations, and duplicate letter traps, read our full article:{' '}
          <Link to="/learn/wordle-opening-strategy" className="text-primary underline hover:text-primary/80">
            Wordle Opening Strategy &amp; Deduction
          </Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 5. Crossword Finder Guide ---------------- */
export function CrosswordGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Solving Missing-Letter Crossword Patterns">
        <p>
          Crossword Finder is designed for grid-based word puzzles, acrostics, and missing-letter challenges.
          When intersecting clues give you fragments of a word with unknown letters in between, positional wildcard matching
          reveals all valid English words that fit the exact grid dimensions.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Pattern Entry Syntax">
          <p>
            Type the known letters in their exact positions and use a question mark (<code>?</code>) or dot (<code>.</code>) for each blank square.
            For example, <code>c?t?r</code> represents a 5-letter word with <em>C</em> at position 1, <em>T</em> at position 3, and <em>R</em> at position 5.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Must Include Letters Filter">
          <p>
            Have letters confirmed by crossing clues without knowing where they slot in? Enter them into{' '}
            <strong>Must include letters</strong> to ensure those characters appear somewhere in the answer.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Verified Pattern Examples">
        <ul className="list-inside list-disc space-y-2">
          <li>
            <code>c?t?r</code> &rarr; Matches verified 5-letter words: <em>cater</em>, <em>cotter</em>, and <em>cuter</em>.
          </li>
          <li>
            <code>p???le</code> &rarr; Matches verified 6-letter words: <em>puzzle</em>, <em>poodle</em>, <em>purple</em>, and <em>people</em>.
          </li>
          <li>
            <code>?q????</code> &rarr; Matches verified 6-letter Q-words: <em>square</em>, <em>squash</em>, <em>equity</em>, and <em>opaque</em>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Capabilities vs. Semantic Limitations">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Lexical Pattern Matching Only</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              This tool matches letter positions against reference dictionary words. It does not parse clue semantics, trivia, or puns.
              You must use your own judgment to pick the answer that fits the crossword clue.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
            <h4 className="font-semibold text-foreground">Choosing the Right Dictionary</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Standard newspaper crosswords (Monday through Thursday) stick to familiar vocabulary. Select{' '}
              <strong>Common words</strong> to filter out obscure jargon. For Friday/Saturday editions or cryptic puzzles, switch to{' '}
              <strong>Full dictionary</strong>.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Quick Solving Tips">
        <p>
          Stuck on a definition? Click any word chip to inspect its meanings, parts of speech, and usage in the{' '}
          <Link to="/definition-finder" className="text-primary underline hover:text-primary/80">Definition Finder</Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 6. Scramble Generator Guide ---------------- */
export function ScrambleGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Generating Fair Word Scrambles for Practice & Games">
        <p>
          Word Scramble Generator produces randomized anagram puzzles from common English dictionary words.
          It is an engaging tool for teachers, parents, students, and word lovers looking to sharpen spelling,
          vocabulary, and pattern recognition skills.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-3">
        <GuideSubsection title="Easy (4–5 Letters)">
          <p>Ideal for beginners, young learners, and quick warm-up spelling drills (e.g. <em>TRAIN</em>, <em>PLANT</em>).</p>
        </GuideSubsection>
        <GuideSubsection title="Medium (5–7 Letters)">
          <p>Balanced challenge for family game nights and intermediate vocabulary practice (e.g. <em>PLANET</em>, <em>CASTLE</em>).</p>
        </GuideSubsection>
        <GuideSubsection title="Hard (7–9 Letters)">
          <p>Challenging scrambles for experienced puzzle enthusiasts (e.g. <em>PICTURE</em>, <em>BUILDING</em>).</p>
        </GuideSubsection>
      </div>

      <GuideSection title="Fair-Play Shuffling Guarantee">
        <p>
          Every scramble is randomized using the Fisher-Yates algorithm on our curated common vocabulary index.
          Because a standard random shuffle has a small chance of returning the original letter order, our engine
          verifies the output against the target word, re-shuffling up to 12 times and applying a distinct-character
          transposition fallback. This guarantees that for any word with two or more distinct letters, the scrambled
          puzzle is never identical to the solution.
        </p>
      </GuideSection>

      <GuideSection title="How to Practice, Play & Create Worksheets">
        <ol className="list-inside list-decimal space-y-2">
          <li>Select your difficulty tier (Easy, Medium, or Hard) using the dropdown selector.</li>
          <li>Click <strong>New scramble</strong> to shuffle a new puzzle.</li>
          <li>Try to solve the puzzle in your head or jot down letter combinations on scratch paper.</li>
          <li>Click <strong>Reveal answer</strong> to verify your solution (or click <strong>Hide answer</strong> to try again).</li>
          <li>
            Click <strong>Copy puzzle</strong> to copy the challenge text directly to your clipboard (e.g., <code>Unscramble this word: LPTENA</code>).
            You can paste this into word processing documents, classroom worksheets, or group chat challenges.
          </li>
        </ol>
      </GuideSection>

      <GuideSection title="Supported Features & Limitations">
        <p>
          <strong>Supported:</strong> Difficulty level selection, instant re-scrambling, show/hide solution toggling, and one-click formatted puzzle copying.
        </p>
        <p>
          <strong>Not Supported:</strong> Custom word list uploads and automated PDF export are not currently supported.
          To solve your own custom rack of scrambled letters, use our{' '}
          <Link to="/word-unscrambler" className="text-primary underline hover:text-primary/80">Word Unscrambler</Link>.
        </p>
      </GuideSection>
    </div>
  );
}

/* ---------------- 7. Definition Finder Guide ---------------- */
export function DefinitionGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="Interpreting Definitions, Parts of Speech & Word Game Data">
        <p>
          Definition Finder combines live dictionary information with word-game structural analysis.
          It allows you to understand word meanings, verify grammatical parts of speech, listen to pronunciations,
          and check game tile scores without intrusive advertisements.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="1. Linguistic Definition Structure">
          <p>
            Results display the headword, phonetic transcription, audio pronunciation button (when available),
            and distinct definitions categorized by part of speech (noun, verb, adjective, adverb).
            Contextual usage examples and synonyms are provided where documented by open dictionary sources.
          </p>
        </GuideSubsection>
        <GuideSubsection title="2. Word Game & Tile Profile">
          <p>
            GetWordCraft.com computes game-specific properties independently: classic English tile scores (e.g. A=1, D=2, Q=10),
            letter length, and vowel-to-consonant ratios to help you evaluate board plays.
          </p>
        </GuideSubsection>
        <GuideSubsection title="3. Interpreting Multiple Definitions">
          <p>
            Many English words have multiple senses or change part of speech depending on context (e.g., <em>cater</em> as a food service verb vs. a broader accommodation verb).
            In word games, any valid dictionary sense confirms the word&rsquo;s legitimacy.
          </p>
        </GuideSubsection>
        <GuideSubsection title="4. Dual API Fallback Reliability">
          <p>
            Definitions are fetched live from the Free Dictionary API (dictionaryapi.dev) with automatic fallback to the Datamuse
            lexical database, ensuring reliable uptime and fast response times.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="Why Some Tournament Words Return No Definition">
        <div className="rounded-xl border border-border/80 bg-card/50 p-4">
          <h3 className="font-semibold text-foreground">Descriptive Dictionaries vs. Prescriptive Game Lexicons</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Specialized competitive word games (like Scrabble and Words With Friends) permit short hook words such as{' '}
            <em>QI</em>, <em>ZA</em>, <em>AA</em>, <em>XI</em>, or <em>JO</em>. These words originate from ancient loanwords,
            musical scales, or specialized historic lexicons. While they are 100% legal game plays in our word finders,
            general modern online dictionary APIs may lack conversational entries for them and return a 404 response.
            In such cases, use our <Link to="/word-lists" className="text-primary underline hover:text-primary/80">Word Lists</Link> to verify game validity.
          </p>
        </div>
      </GuideSection>

      <GuideSection title="Practical Vocabulary Learning Tips">
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Study in Context:</strong> Don&rsquo;t just memorize word spellings; reading the example sentences reinforces natural recall during high-pressure games.
          </li>
          <li>
            <strong>Cross-Tool Solving:</strong> Use the direct action links at the top of any definition result to immediately test anagrams, unscramble letters, or find board patterns.
          </li>
        </ul>
      </GuideSection>
    </div>
  );
}

/* ---------------- 8. Word Lists Guide ---------------- */
export function WordListsGuide() {
  return (
    <div className="space-y-8">
      <GuideSection title="High-Leverage Word Lists for Competitive Players">
        <p>
          Word Lists provides instant reference collections for the highest-leverage word patterns in tile-based games.
          Studying short words, awkward consonants, and vowel dumps is the single most effective way to elevate your game score.
        </p>
      </GuideSection>

      <div className="grid gap-4 sm:grid-cols-2">
        <GuideSubsection title="Two-Letter Words & Parallel Plays">
          <p>
            The foundation of competitive play. Playing words in parallel along existing board lines forms multiple 2-letter cross-words,
            scoring points in both directions simultaneously. Master high-value hooks like <em>ZA</em>, <em>QI</em>, <em>XI</em>, and <em>AX</em> first.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Three-Letter Hooks">
          <p>
            Crucial extension plays. Adding a front or back letter to an existing 2-letter word on the board lets you reach
            Double and Triple Word multiplier squares in tight corners.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Q Without U Lifelines">
          <p>
            Holding a 10-point Q without a U often forces a wasted tile-swap turn. Memorizing words like <em>QI</em>, <em>QAT</em>,{' '}
            <em>FAQIR</em>, and <em>BURQA</em> lets you score 10 to 30+ points while keeping your turn tempo.
          </p>
        </GuideSubsection>
        <GuideSubsection title="Power Tiles (J, Q, X, Z) Under 7 Letters">
          <p>
            Short words packing 8- and 10-point letters. Placing these on premium letter multipliers easily yields 30 to 50+ points
            in a single turn without waiting for an unlikely full-rack bingo.
          </p>
        </GuideSubsection>
      </div>

      <GuideSection title="How to Learn Words in Manageable Groups">
        <p>
          Do not attempt to memorize thousands of words in a single sitting. Top tournament players use <strong>spaced chunking</strong>:
        </p>
        <ol className="list-inside list-decimal space-y-2">
          <li>Select a specific category (e.g. 2-Letter Words or Q Without U).</li>
          <li>Focus on 5 to 10 words per study session.</li>
          <li>Group them by hook or ending (e.g. all 2-letter words ending in <em>A</em>: <em>AA</em>, <em>BA</em>, <em>FA</em>, <em>HA</em>, <em>KA</em>, <em>MA</em>, <em>NA</em>, <em>PA</em>, <em>TA</em>, <em>YA</em>, <em>ZA</em>).</li>
          <li>Test your recall by unscrambling them in our <Link to="/word-unscrambler" className="text-primary underline hover:text-primary/80">Word Unscrambler</Link>.</li>
        </ol>
      </GuideSection>

      <GuideSection title="Filtering, Sorting & Exporting">
        <p>
          Use the in-page search bar to locate substrings, filter by starting letter or vocabulary frequency mode,
          and sort by alphabetical order or Scrabble tile score. Click <strong>Copy page</strong> or <strong>Copy all</strong> to
          export word collections to your clipboard for study notes or flashcards.
        </p>
      </GuideSection>
    </div>
  );
}
