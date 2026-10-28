export const ARTICLES = [
  {
    slug: 'unscramble-words-faster',
    tag: 'Strategy',
    title: 'How to Unscramble Words Faster: Step-by-Step Techniques & Worked Examples',
    description: 'Master word unscrambling with a repeatable mental workflow: prefix parking, vowel pair anchoring, consonant blend scanning, and tile management.',
    body: [
      { p: 'Unscrambling a jumbled rack of letters is often treated as an innate gift — players either "see" the word immediately or stare blankly at a hopeless scramble. In reality, expert word solvers rely on a structured, repeatable mental workflow that progressively reduces letter complexity.' },
      { p: 'Whether you are playing physical tile games like Scrabble or Words With Friends, solving anagram jumbles, or practicing with our [Word Unscrambler](/word-unscrambler), applying the following five-step method will dramatically increase both your solving speed and word length.' },
      
      { h: 'The 5-Step De-Scrambling Workflow' },
      { p: 'When seven or eight tiles appear on your rack, do not try to rearrange all of them simultaneously in your mind. Break the problem into manageable phases:' },
      { ol: [
        '**Separate and Count Vowels vs. Consonants:** Quickly tally your vowels (A, E, I, O, U) against consonants. The ideal English rack ratio is 2 vowels to 3 consonants, or 3 vowels to 4 consonants. If you have 5 vowels, your priority must be dumping vowels; if you have 6 consonants, look for consonant clusters.',
        '**Park Common Prefixes and Suffixes:** Mentally pull out high-probability word endings (`-ING`, `-ED`, `-ER`, `-EST`, `-ION`, `-LY`, `-S`) or word beginnings (`RE-`, `UN-`, `DIS-`, `PRE-`, `DE-`). If your rack contains an E and D, or an E and R, separate them immediately to see what root letters remain.',
        '**Identify Digraphs and Consonant Blends:** Look for natural letter pairs that frequently travel together in English, such as `CH`, `SH`, `TH`, `PH`, `CL`, `BR`, `ST`, or `CK`. Treating two consonants as a single phonetic block cuts the number of possible permutations in half.',
        '**Anchor Around Vowel Teams:** English orthography relies heavily on predictable vowel pairs: `EA`, `EE`, `AI`, `OA`, `OU`, and `IE`. Pair two vowels together and build consonants around that core nucleus.',
        '**Physically or Deliberately Shuffle:** The human brain quickly falls into "perceptual fixation" — after staring at a jumble for twenty seconds in the same visual order, the brain struggles to break the pattern. Deliberately shuffle your rack tiles or sort them alphabetically to reset your visual recognition.'
      ]},

      { h: 'Worked Example 1: Deconstructing a 7-Letter Rack' },
      { p: 'Consider an intimidating mixed rack containing the tiles: `T - I - N - D - E - R - S`.' },
      { p: 'Here is how an experienced solver applies the 5-step method in under fifteen seconds:' },
      { ul: [
        '**Step 1 (Vowel Count):** 2 vowels (`E, I`) and 5 consonants (`D, N, R, S, T`). Balanced and highly playable.',
        '**Step 2 (Suffix Parking):** You spot `-ED` (`D, E`), `-ER` (`E, R`), `-EST` (`E, S, T`), and plural `-S`. Park `-ERS` at the end: letters left are `D, I, N, T`.',
        '**Step 3 (Root Assembly):** Unscramble `D, I, N, T`. The root `TIND-` immediately suggests **TINDERS** (a full 7-letter bingo play!).',
        '**Step 4 (Alternative Sub-words):** If the board cannot accommodate a 7-letter word, parking the prefix `IN-` leaves `D, E, R, S, T`, instantly revealing **INSERT**, **INTERS**, and **DINERS**.'
      ]},
      { p: 'By isolating standard affixes, a 7-letter permutation problem involving 5,040 mathematical possibilities shrinks to testing just four letters.' },

      { h: 'Worked Example 2: Managing a Blank Tile Wildcard (?)' },
      { p: 'Blank tiles (entered as `?` in our search tools) provide unlimited flexibility, but novice players frequently waste them on the first 4-letter word they spot (such as playing `TEAR` with a blank `E`).' },
      { p: 'Suppose your hand holds: `R - E - T - I - N - A - ?`' },
      { p: 'The letter stem `RETINA` is famous among tournament players because it combines the six most common letters in English. Rather than playing short, systematically test common 7th-letter additions:' },
      { ul: [
        '**Wildcard as L:** Solves to **RELIANT** and **RETINAL**.',
        '**Wildcard as S:** Solves to **RETAINS**, **RETINAS**, and **NASTIER**.',
        '**Wildcard as E:** Solves to **TRAINEE** and **RETINAE**.',
        '**Wildcard as G:** Solves to **TEARING** and **INGRATE**.'
      ]},
      { p: 'When holding a wildcard, treat it as the completion piece for your longest candidate word rather than a simple vowel patch.' },

      { h: 'Common Unscrambling Traps & How to Avoid Them' },
      { callout: {
        title: 'Three Mistakes That Slow Down Solvers',
        items: [
          '**Fixating on Arrival Order:** Staring at the rack as it arrived creates mental fatigue. If you have not found a word within 20 seconds, rearrange the tiles immediately into vowel/consonant piles.',
          '**Hoarding Awkward Power Tiles:** Holding onto Q, Z, or J in hopes of a miracle triple-word square ruins rack balance. If you cannot play them quickly, look for 2-letter hook words like `QI`, `ZA`, or `JO` to discard them cleanly.',
          '**Ignoring Board Parallel Lanes:** Finding an 8-letter word in your hand is useless if there is no open lane on the game board. Always cross-reference your rack with available open board spaces using the [Word Finder](/word-finder).'
        ]
      }},

      { h: 'Interactive Practice Exercises' },
      { exercise: {
        q: 'Exercise 1: Unscramble the 6-letter rack "S - T - A - R - L - E". Can you find at least three distinct valid 6-letter anagrams?',
        hint: 'Park common endings like -ER, -EST, or -ERS, and look for consonant blends like ST and AL.',
        a: 'ALERTS, ALTERS, ARTELS, LASTER, RATELS, SALTER, SLATER, STALER',
        explanation: 'The stem A-E-L-R-S-T is one of the most prolific anagram sets in the English language, yielding eight distinct valid 6-letter tournament words.'
      }},
      { exercise: {
        q: 'Exercise 2: You have the 7-letter rack "C - H - A - R - M - E - D". What two distinct 7-letter verbs can be formed?',
        hint: 'Both verbs use the past-tense -ED suffix. One begins with CH-, the other with M-.',
        a: 'CHARMED and MARCHED',
        explanation: 'Parking the -ED suffix leaves C, H, A, R, M. Arranging the remaining letters yields the roots CHARM- and MARCH-, forming CHARMED and MARCHED.'
      }},

      { h: 'Sharpening Your Skills with WordCraft Tools' },
      { p: 'Consistent practice with targeted feedback is the only way to make letter-pattern recognition automatic. When studying racks, follow this simple routine:' },
      { ol: [
        'Take a sample rack from a real game or use the [Word Scramble Generator](/scramble-generator) for randomized drills.',
        'Give yourself 60 seconds to write down every word you can spot on paper.',
        'Plug your rack into the [Word Unscrambler](/word-unscrambler) to see the full list of missing words, sorted from longest to shortest.',
        'Click any unfamiliar word chip to view its definition in the [Definition Finder](/definition-finder), and write down one or two high-value words you overlooked.'
      ]}
    ],
  },
  {
    slug: 'wordle-opening-strategy',
    tag: 'Wordle',
    title: 'Wordle Opening Strategy: Evaluating Starters, Second Guesses, and Trap Avoidance',
    description: 'Analyze mathematical trade-offs between balanced probes and vowel dumps, learn optimal second-guess decision paths, and survive Hard Mode traps.',
    body: [
      { p: 'Every Wordle player has a preferred opening word, but experienced players understand a deeper truth: no single starter guarantees a win, and an opening guess is only as effective as the second guess that follows it.' },
      { p: 'The primary goal of guess one is not to land lucky green tiles. Its purpose is to **maximize information yield** — testing high-frequency letters in common positions so your second guess can sharply reduce the remaining pool of candidates.' },

      { h: 'The Three Opening Philosophies: Trade-Off Analysis' },
      { p: 'Most popular openers fall into one of three strategic categories, each with distinct advantages and disadvantages:' },
      { table: {
        headers: ['Strategy', 'Typical Starters', 'Primary Advantage', 'Major Drawback', 'Best For'],
        rows: [
          ['Balanced Probe', 'CRANE, SLATE, TRACE, SALET', 'Tests 2 top vowels (A, E) & 3 top consonants (R, T, N, S). Optimal positional feedback.', 'Can still leave multiple consonant ambiguities if opener is largely gray.', 'Standard play and streak preservation.'],
          ['Vowel Dump', 'AUDIO, ADIEU, SOARE', 'Eliminates 3 or 4 vowels on turn one. Confirms the vowel skeleton immediately.', 'Gives very low consonant information. Consonants carry more distinguishing power than vowels.', 'Casual players who struggle with vowel identification.'],
          ['Consonant Scout', 'STERN, CLOTH, SHIRT', 'Tests structural consonants (S, T, R, N, C). High rate of consonant discovery.', 'Leaves vowel identity open, risking wasted guesses later in the grid.', 'Players who prefer building word skeletons first.']
        ]
      }},
      { p: 'Consonants distinguish five-letter English words far more effectively than vowels. Words like *CRANE* or *SLATE* are widely preferred by analytical solvers because they test both frequent vowels and the most common consonant anchors simultaneously.' },

      { h: 'Interpreting Wordle Feedback Accurately' },
      { p: 'To make an optimal second guess, you must correctly interpret the color-coded clue mechanics:' },
      { ul: [
        '**Green (Exact Hit):** The letter is in the secret word and sits in that exact position. In Hard Mode, you must keep this letter in this slot for all subsequent guesses.',
        '**Amber / Yellow (Misplaced):** The letter appears in the secret word, but in a different position. Your next guess must test this letter in a different slot.',
        '**Gray (Excluded):** The letter does not appear in the target word (with one crucial exception regarding duplicate letters explained below).'
      ]},

      { h: 'The Duplicate Letter Rule (The SPEED Principle)' },
      { p: 'Duplicate letters frequently confuse solvers. Wordle evaluates letter counts strictly based on matches in the secret word.' },
      { p: 'Suppose the hidden word is **DRINK** and you guess **SPEED**:' },
      { ul: [
        'The secret word contains no E.',
        'Both E tiles in `SPEED` will turn **Gray**.'
      ]},
      { p: 'Now suppose the hidden word is **HOTEL** (which contains exactly one E) and you guess **SPEED**:' },
      { ul: [
        'The first E (slot 3) turns **Yellow** (E is in the word, but not at slot 3).',
        'The second E (slot 4) turns **Gray**! This gray tile does **not** mean E is excluded from the word; it means the secret word contains *no additional* Es beyond the one already identified.'
      ]},
      { p: 'Our [Wordle Helper](/wordle-helper) mathematically handles duplicate letter constraints automatically, preventing you from accidentally picking words with duplicate letters when excess instances have been ruled out.' },

      { h: 'Worked Example: Second-Guess Decision Paths' },
      { p: 'Let us walk through an authentic game scenario using the popular starter `CRANE`:' },
      { ul: [
        '**Guess 1:** `C - R - A - N - E`',
        '**Feedback:** `C` (Gray), `R` (Yellow at slot 2), `A` (Gray), `N` (Green at slot 4), `E` (Gray).'
      ]},
      { p: 'What does this feedback tell us before making Guess 2?' },
      { ol: [
        'Position 4 is confirmed as `N`.',
        'The letter `R` is in the word, but cannot be at position 2 (it must be at slot 1, 3, or 5).',
        'The letters `C`, `A`, and `E` are eliminated.'
      ]},
      { p: 'How do we choose an optimal second guess?' },
      { ul: [
        '**Rule 1 (Respect Negatives):** Do not reuse `C`, `A`, or `E`.',
        '**Rule 2 (Test R in a Legal Position):** Because `R` was yellow at index 2, it **must not** be placed in slot 2. Valid placements for `R` are slot 1, slot 3, or slot 5.',
        '**Rule 3 (Keep N at Slot 4 in Hard Mode):** If playing Hard Mode, slot 4 must remain `N`.',
        '**Top Candidates with R at Slot 1 & N at Slot 4:** `RHINO` or `RUINS` (tests fresh vowels I, O, or U, and consonants H or S while placing R at slot 1 and N at slot 4).',
        '**Top Candidates with R at Slot 3 & N at Slot 4:** `BURNS`, `TURNS`, or `BURNT` (tests fresh consonants B, T, S and vowel U while relocating R to slot 3 and keeping N at slot 4).'
      ]},
      { p: 'Notice that common words like `WRONG`, `FRONT`, or `IRONY` would be mistakes here: `WRONG` and `FRONT` place `R` at slot 2 (which we already know is incorrect), and `IRONY` places `R` at slot 2 as well. Always verify that yellow letters move to an untried slot.' },

      { h: 'Hard Mode Constraints & Surviving "Rhyme Traps"' },
      { p: 'In Wordle Hard Mode, any revealed clues must be used in subsequent guesses. While this sounds straightforward, it exposes players to lethal "rhyme traps" like `_IGHT`, `_OUND`, and `_ATCH`.' },
      { p: 'If your first two guesses establish `? - I - G - H - T`, there remain up to seven valid common English words:' },
      { p: '`FIGHT`, `LIGHT`, `MIGHT`, `NIGHT`, `RIGHT`, `SIGHT`, `TIGHT`' },
      { p: 'In Hard Mode, you cannot test `FLIMS` to eliminate five consonants at once — you are forced to guess one word at a time. If you have only three guesses remaining, your chance of losing is statistically severe.' },
      { callout: {
        title: 'How to Prevent Hard Mode Traps Early',
        items: [
          '**Avoid Early Narrowing:** Do not rush into words with four common ending letters (`_IGHT` or `_OUND`) on guess two unless you have already tested several distinguishing consonants.',
          '**Probe Consonant Diversity First:** If your opener hints at a trap pattern, use guess two to probe contrasting consonants (`F, L, M, N, R, S`) before committing the green template.'
        ]
      }},

      { h: 'Practice Scenarios' },
      { exercise: {
        q: 'Scenario 1: You open with "SLATE" and all five tiles come back solid Gray. What should your second guess accomplish?',
        hint: 'Never reuse any letter from a gray opener. Pick five completely fresh high-frequency letters.',
        a: 'Words like "CRONY", "CHIRP", or "POUND"',
        explanation: 'A fully gray opener is actually valuable negative information: S, L, A, T, E are eliminated. Your second guess should test remaining top consonants and vowels (C, R, O, N, D, Y) without repeating a single excluded letter.'
      }},
      { exercise: {
        q: 'Scenario 2: You guess "TRAIN" and receive: T (Yellow at slot 1), A (Green at slot 3), N (Yellow at slot 5). R and I are Gray. What 5-letter word fits these constraints?',
        hint: 'A must be at slot 3. T cannot be at slot 1 (try slot 5). N cannot be at slot 5 (try slot 4). Remember that R and I are eliminated.',
        a: 'PLANT, MEANT, or STAND',
        explanation: 'Position 3 is locked to A. N cannot be at slot 5, and T cannot be at slot 1. With R and I eliminated, placing N at slot 4 and T at slot 5 yields PLANT or MEANT (or placing T at slot 2 and N at slot 4 yields STAND).'
      }}
    ],
  },
  {
    slug: 'two-letter-words',
    tag: 'Word Lists',
    title: 'The Two-Letter Words Every Word-Game Player Should Know',
    description: 'The strategic foundation of tile-based word games: how two-letter words enable high-scoring parallel plays, tile dumping, and premium hook placements.',
    body: [
      { p: 'In competitive tile-based word games such as Scrabble, Words With Friends, and duplicate tournaments, two-letter words are the single highest-leverage asset a player can master. While amateur players search for flashy seven-letter words across empty board lanes, experienced players win games in tight corners using two-letter hooks.' },
      { p: 'Learning the standard two-letter words requires only a brief study session, yet it permanently elevates your scoring ceiling by unlocking parallel plays, premium square reach, and defensive rack management.' },

      { h: 'Parallel Plays: How 2-Letter Words Double Your Score' },
      { p: 'A **parallel play** occurs when you place a word directly alongside an existing word on the board, rather than branching out from a single perpendicular letter. In doing so, you score points for your primary played word PLUS points for every two-letter word formed across the intersecting tiles.' },
      { p: 'Let us examine a concrete, rule-verified Scrabble scoring example using standard English tile values (`N=1, O=1, X=8`):' },
      { ul: [
        '**Board State:** The word **NO** (scoring 2 points: N=1, O=1) was previously played horizontally across squares H2 and I2 (Row 2, columns H and I; both unmultiplied).',
        '**Your Hand:** You hold the tiles **O** and **X** on your rack.',
        '**Your Play:** You play **OX** horizontally across squares H3 and I3 (Row 3) directly beneath **NO**, placing `O` at square H3 (directly below `N`) and `X` at square I3 (directly below `O`).'
      ]},
      { p: 'Look at the three distinct words scored in this single turn (the pre-existing horizontal `NO` in Row 2 is not re-scored):' },
      { ol: [
        '**Primary horizontal word:** Newly placed `O` and `X` in Row 3 form **OX** (`O=1, X=8`) = **9 points**.',
        '**Vertical cross-word 1:** Column H connects existing `N` above newly placed `O` to form **NO** (`N=1, O=1`) = **2 points**.',
        '**Vertical cross-word 2:** Column I connects existing `O` above newly placed `X` to form **OX** (`O=1, X=8`) = **9 points**.',
        '**Total base score for playing just two tiles:** 9 + 2 + 9 = **20 points**!'
      ]},
      { p: 'Now consider the effect of premium squares using standard board coordinates. On an official Scrabble grid, square I3 (Row 3, Column I) is an authentic **Double Letter (DL)** square, while H3 (Row 3, Column H) is an unmultiplied regular square. Under Scrabble rules, a newly placed tile\'s letter multiplier applies to *every* newly formed word that passes through that tile on that turn:' },
      { ul: [
        'The horizontal word `OX` scores: `O(1) + X(8 × 2 = 16)` = **17 points**.',
        'The vertical cross-word `OX` scores: `O(1) + X(8 × 2 = 16)` = **17 points**.',
        'The vertical cross-word `NO` scores: `N(1) + O(1)` = **2 points**.',
        '**Total turn score with X on DL:** 17 + 17 + 2 = **36 points** on a two-tile play!'
      ]},
      { p: 'Similarly, on a standard Scrabble board where horizontal `NO` was previously placed across squares E1 and F1 in Row 1 (both unmultiplied), playing `OX` horizontally across Row 2 places `O` at square E2 (unmultiplied) and `X` directly onto the authentic **Triple Letter (TL)** square at F2 (Row 2, Column F):' },
      { ul: [
        'The horizontal word `OX` scores: `O(1) + X(8 × 3 = 24)` = **25 points**.',
        'The vertical cross-word `OX` scores: `O(1) + X(8 × 3 = 24)` = **25 points**.',
        'The vertical cross-word `NO` scores: `N(1) + O(1)` = **2 points**.',
        '**Total turn score with X on TL:** 25 + 25 + 2 = **52 points** on a two-tile play!'
      ]},
      { p: 'Note on dictionary legality: Both `NO` and `OX` are standard English words recognized across major competitive and casual word lists (including NASPA NWL, Collins CSW, and ENABLE), as well as our website dictionary. Notice why parallel plays require knowing which letters can both begin and end a two-letter word: while `ZA` is widely accepted in competitive word lists, no standard tournament lexicon accepts `AZ` (there are zero two-letter words ending in Z in standard tournament lists, even though uncurated dictionaries like our full 437k-word list may include abbreviations). High-scoring letters like X (`AX, EX, OX, XI, XU`) are uniquely valuable for parallel plays because X functions smoothly in both initial and final positions.' },

      { h: 'Essential Categories of Two-Letter Words' },
      { p: 'Rather than memorizing a disorganized alphabetical list, group two-letter words by their strategic function:' },

      { h3: '1. The Power-Tile Oddballs (J, Q, X, Z Lifelines)' },
      { p: 'These are the emergency rescue plays that prevent high-value tiles from clogging your rack:' },
      { ul: [
        '**QI (11 pts):** The vital life force. The only accepted two-letter word that allows you to play a Q without a U.',
        '**ZA (11 pts):** Slang for pizza. The most versatile Z-hook on the board.',
        '**XI & XU (9 pts each):** A Greek letter and a Vietnamese fractional monetary unit. Transforms an awkward 8-point X into an instant scorer.',
        '**JO (9 pts):** A Scottish sweetheart. Essential for dropping an 8-point J in tight spaces.',
        '**KA & KI (6 pts each):** Egyptian spiritual concepts. High-value hooks for the 5-point K.',
        '**AX, EX, OX (9 pts each):** Familiar English words that turn the letter X into an easy double-play.'
      ]},

      { h3: '2. The Vowel Dumps (Rack Balancing)' },
      { p: 'Drawing five vowels on your rack cripples your ability to form long words. These words allow you to dump excess vowels without sacrificing a turn to swap tiles:' },
      { ul: [
        '**AA:** A type of rough, jagged basaltic lava.',
        '**AE:** Scots for one.',
        '**AI:** A three-toed South American sloth.',
        '**OE:** A whirlwind off the Faeroe Islands.',
        '**OI:** A traditional greeting or call for attention.'
      ]},

      { h3: '3. Consonant-Heavy Connectors' },
      { p: 'When your rack is starved of vowels, these vocalic and onomatopoeic words save turns:' },
      { ul: [
        '**SH:** An interjection urging silence.',
        '**HM & MM:** Expressions of consideration or assent.'
      ]},

      { h: 'Dictionary & Tournament Lexicon Differences' },
      { callout: {
        title: 'Crucial Note on Dictionary Legality',
        items: [
          '**North American Tournament Lists (e.g. NASPA NWL):** Standard tournament references recognize 107 two-letter words.',
          '**International English Tournament Lists (e.g. Collins CSW):** International tournament references include additional entries such as `CH`, `DI`, `EE`, and `KY` (127 words total).',
          '**WordCraft & Open Lexicons:** Our tools search an expanded dictionary of over 437,000 words based on open lexicons (like ENABLE) and English word lists. In casual play, always agree on your source lexicon in advance before challenging.'
        ]
      }},

      { h: 'Practical Memorization Techniques' },
      { p: 'Do not attempt to read a list of 100 words from top to bottom. Instead, use the **First-Letter Anchoring** drill:' },
      { ol: [
        'Study words that begin with a single letter per day. For example, Monday is "A-day": `AA, AB, AD, AE, AG, AH, AI, AL, AM, AN, AR, AS, AT, AW, AX, AY` (16 words).',
        'Cover the right column and quiz yourself on whether each combination is a legal word.',
        'Practice spotting hooks in our [Word Lists](/word-lists) browser, which lists every two-letter word with live tile scores and dictionary definitions.'
      ]},

      { h: 'Practice Exercises' },
      { exercise: {
        q: 'Exercise 1: You hold "Q, I, L, E, M, P" on your rack with no U in sight and no U open on the board. How do you play the Q without taking a zero-point tile swap?',
        hint: 'Combine the 10-point Q with your single vowel I.',
        a: 'Play the word "QI"',
        explanation: 'QI is universally accepted in tournament and casual play. It scores 11 base points (Q=10, I=1) and unburdens your rack from the heaviest consonant.'
      }},
      { exercise: {
        q: 'Exercise 2: Your rack contains four vowels and one consonant: "A, A, E, I, T". What two-letter plays can shed two vowels while keeping your high-utility consonant T intact?',
        hint: 'Look for two-letter words formed purely from vowels.',
        a: 'AA, AE, or AI',
        explanation: 'Playing AA (lava), AE (one), or AI (sloth) burns two vowels in one play, rebalancing your hand to A, E, T or A, I, T for your next turn.'
      }}
    ],
  },
  {
    slug: 'wildcards-and-patterns',
    tag: 'How-to',
    title: 'Wildcards and Patterns: Getting the Most Out of Word Search',
    description: 'Learn the critical difference between bag-of-letters wildcards and positional grid patterns, and master multi-filter constraints for crosswords and tile games.',
    body: [
      { p: 'Word search tools are powerful, but solvers frequently get overwhelmed by hundreds of irrelevant results. The culprit is almost always a misunderstanding of the fundamental difference between **letter racks** and **positional patterns**.' },
      { p: 'Understanding how wildcards behave in an anagram rack versus a crossword grid turns our search engine into a surgical instrument, allowing you to zero in on the exact winning word in seconds.' },

      { h: 'Racks vs. Patterns: The Core Distinction' },
      { p: 'Every word puzzle tool on WordCraft speaks one of two structural query languages:' },
      { table: {
        headers: ['Concept', 'Query Field', 'How the Engine Evaluates It', 'Wildcard Behavior (?)', 'Best Tool'],
        rows: [
          ['Letter Rack', 'Letters (Any Order)', 'Treats input as a loose bag of tiles. Letter order does not matter.', 'Acts as a blank tile that can become any letter A–Z to form words of varying lengths.', '[Word Unscrambler](/word-unscrambler) & [Anagram Solver](/anagram-solver)'],
          ['Positional Pattern', 'Pattern (Fixed Positions)', 'Locks letters into specific grid coordinates. Letter order is rigid.', 'Marks an unknown square in a word of exact length (e.g. c?t is strictly 3 letters).', '[Crossword Finder](/crossword-finder)']
        ]
      }},

      { h: 'How Wildcard Placement Alters Search Possibilities' },
      { p: 'In positional pattern searches, where you place the question mark (`?`) fundamentally changes the result set:' },
      { ul: [
        '**Starting Wildcard (`?at`):** Fixes the length to 3 and locks the ending to `AT`. The engine searches all single-letter prefixes: `bat, cat, fat, hat, mat, pat, rat, sat, vat`.',
        '**Middle Wildcard (`c?t`):** Fixes the length to 3 and locks C at index 1 and T at index 3. Searches vowel substitutions: `cat, cot, cut`.',
        '**Ending Wildcard (`ca?`):** Fixes the length to 3 and searches prefix extensions: `cab, cad, can, cap, car, cat, caw, cay`.',
        '**Multiple Wildcards (`c??t` vs `c???t`):** `c??t` searches 4-letter words (`cart, cast, chat, clot, coat, cost`), while `c???t` searches 5-letter words (`chart, cheat, count, court, craft`).'
      ]},

      { h: 'Combining Racks with Patterns (Word Finder Synergy)' },
      { p: 'The true power of the [Word Finder](/word-finder) comes from combining both concepts simultaneously. Suppose you are playing a board game where two tiles are already on the grid with empty squares between them:' },
      { ul: [
        'Board pattern: 5 letters, starting with `C` and having `T` at position 3: `c ? t ? ?`',
        'Your hand holds the tiles: `a, e, r, p, s`'
      ]},
      { p: 'If you only search your rack `aerps`, you get words like `spear` or `parse`, none of which fit the board. If you only search pattern `c?t??`, you get 80+ dictionary matches like `catch` or `cotta` that you cannot play because you lack those tiles.' },
      { p: 'By entering **Letters: `aerps`** AND **Pattern: `c?t??`** in the [Word Finder](/word-finder), the engine cross-references both constraints and narrows the 80+ pattern candidates down to playable solutions: **CATER** (drawing `A, E, R`) and **CATES** (drawing `A, E, S`). If your rack holds specifically `a, e, r`, it uniquely narrows to **CATER** alone.' },

      { h: 'Filter Stacking: Shrinking 500 Results to 3' },
      { p: 'When searching broad dictionaries containing over 437,000 words, stack secondary filters to isolate high-value candidates:' },
      { ol: [
        '**Starts With & Ends With:** Lock the prefix or suffix hook (e.g. Starts with `UN-`, Ends with `-ING`).',
        '**Must Include Letters:** Requires specific characters to appear anywhere in the word, regardless of position. If an adjacent crossword clue hints that the answer contains a `Z`, entering `Z` in "Must Include" filters out 99% of candidates.',
        '**Min & Max Length Limits:** Enforce strict boundaries to eliminate short junk words when hunting for bingos.'
      ]},

      { h: 'Common Pattern-Matching Mistakes' },
      { callout: {
        title: 'Three Traps to Avoid in Pattern Queries',
        items: [
          '**Typing Pattern Blanks into the Letters Field:** Entering `c?t` into the Letters field searches for words buildable from C, T, and a blank tile (yielding `act, cat, cot, cut, tc...`). If you want words that start with C and end with T, enter it in the **Pattern** field.',
          '**Confusing "Must Include" with "Contains":** "Contains" requires the letters to sit adjacent in that exact order (`th` matches `path`, `other`). "Must Include" requires the letters to exist anywhere in the word (`t, h` matches `hotel`, `heart`).',
          '**Over-Constraining the Search:** If zero words match, clear your length limits or remove the "Ends With" filter first before assuming the word does not exist.'
        ]
      }},

      { h: 'Practice Problems' },
      { exercise: {
        q: 'Problem 1: You are solving a crossword puzzle. You know letter 1 is "P", letter 5 is "L", letter 6 is "E", and the total length is 6. What pattern should you query, and what are valid English solutions?',
        hint: 'Use a 6-character pattern with ? at positions 2, 3, and 4.',
        a: 'Pattern: "p???le"',
        explanation: 'Querying p???le in the Crossword Finder yields valid English words including PEOPLE, POODLE, PUZZLE, and PURPLE.'
      }},
      { exercise: {
        q: 'Problem 2: You want to find 5-letter words starting with "QU" that contain a "K". How should you set up the Word Finder or Crossword Finder?',
        hint: 'Combine a 5-letter pattern starting with QU and a Must Include constraint for K.',
        a: 'Pattern: "qu???", Must Include: "k"',
        explanation: 'Pattern qu??? locks the 5-letter length and QU prefix. Adding Must Include: k returns high-value plays like QUACK, QUARK, QUICK, and QUIRK.'
      }}
    ],
  },
  {
    slug: 'best-word-in-scrabble',
    tag: 'Strategy',
    title: 'How to Find the Best Word in Scrabble: A Practical Decision Framework',
    description: 'Why the highest-scoring move can lose you the game: a practical framework balancing board equity, rack leave value, parallel hooks, and opponent counter-threats.',
    body: [
      { p: 'In competitive word games like Scrabble and Words With Friends, novice players share a common instinct: scan the rack for the longest possible word, find an open lane, and play it immediately. When they spot a 6-letter word like `PLANET` or `STARE`, they assume their turn is solved.' },
      { p: 'Experienced players approach the board with a fundamentally different mindset. They understand that **move value is not simply the score on your scorepad this turn**. A great move balances three competing forces: immediate turn points, the strategic value of the tiles left on your rack, and the board opportunities you concede to your opponent.' },

      { h: 'The Three Pillars of Move Evaluation' },
      { p: 'Every potential play on your turn can be evaluated using a simple strategic equation:' },
      { table: {
        headers: ['Evaluation Pillar', 'Strategic Question', 'Why It Matters', 'Impact on Win Rate'],
        rows: [
          ['1. Turn Score', 'How many points does this move score right now?', 'Provides immediate scoreboard progress and scoreline pressure.', 'High immediate value, but deceptive if achieved by giving away premium squares.'],
          ['2. Rack Leave Equity', 'What tiles remain on your rack for the next turn?', 'Good leaves (e.g. E-R-S-T) set up 50-point bingos; bad leaves (e.g. U-U-V-W) guarantee scoring droughts.', 'Critical: experienced players often sacrifice 4–8 points today to gain 30+ points tomorrow.'],
          ['3. Board Position & Defense', 'Does this play open or close premium squares for your opponent?', 'Leaving an open vowel adjacent to a Triple Word (TW) square invites a 40+ point counter-attack.', 'High: playing into tight corners prevents opponent comebacks when you hold a lead.']
        ]
      }},

      { h: 'Rack Balance: Why Your "Leave" Shapes Future Turns' },
      { p: 'The tiles you keep on your rack are just as important as the tiles you play on the board. The collection of tiles remaining on your rack after a play is known as your **rack leave**.' },
      { p: 'The standard English Scrabble tile bag contains 42 vowels and 56 consonants (along with 2 blanks). As a practical rule of thumb, maintaining a balance of roughly **2 to 3 vowels alongside 4 to 5 consonants** helps prevent awkward rack states in upcoming turns.' },
      { ul: [
        '**Flexible Stem Letters (`E, R, S, T, A, I, N`):** These common English letters form frequent prefixes and suffixes. While no combination guarantees future plays, preserving a flexible core (like `E-R-S` or `I-N-G`) often leaves more doors open than holding isolated, awkward consonants.',
        '**Duplicate Consonant Friction (`V-V`, `W-W`, `C-C`):** Because English vocabulary features relatively few words with multiple instances of low-frequency consonants like V or W, holding duplicate copies tends to reduce your solving options until one can be discarded.',
        '**Unbalanced Leaves:** Shedding all your consonants or all your vowels leaves an extreme rack ratio (`A-A-E-I` or `P-R-S-T`) that frequently requires a defensive dumping turn.'
      ]},

      { h: 'When a Short Word Outperforms a Long Word' },
      { p: 'Consider a common in-game decision: you can play a 5-letter word branching off the board for 12 points, or you can play a compact 3-letter word for 10 points. Why might the 3-letter word offer stronger strategic value over the course of a match?' },
      { ol: [
        '**Dumping Awkward Tiles Without Depleting Vowels:** If your rack holds `A, E, P, R, S, T, X`, playing five flexible tiles (`S, T, A, R, E`) strands you with `P` and `X` (two difficult consonants and zero vowels). In contrast, playing `A` and `X` to form `TAX` unloads the heavy 8-point `X` while keeping `E, P, R, S, T` intact.',
        '**Preserving Board Defense:** Long words extending toward outer lanes frequently create bridges directly into Triple Word (TW) or Triple Letter (TL) squares for your opponent. Compact plays keep the board tight.',
        '**Rack Efficiency:** Scoring 10 points with 2 tiles (5.0 points per tile) offers much higher tile efficiency than scoring 12 points with 5 tiles (2.4 points per tile).'
      ]},

      { h: 'Parallel Plays: Validating Every Intersection' },
      { p: 'As detailed in our guide to [two-letter words](/learn/two-letter-words), a parallel play places a word directly alongside an existing word. However, players frequently assume that because their primary word is valid, the entire move is legal.' },
      { p: 'Under Scrabble rules, **every newly formed perpendicular letter pair must also be an accepted word**. If your 3-letter word sits parallel to an existing word and creates two valid cross-words but one invalid letter pair, your entire move is illegal.' },
      { p: 'For example, with **TRAIN** placed horizontally across squares D8–H8, suppose a player attempts to place `TAX` horizontally directly beneath it in Row 9 across squares D9, E9, and F9: Column D forms `TT` (`T` at D8 over `T` at D9), Column E forms `RA` (`R` at E8 over `A` at E9), and Column F forms `AX` (`A` at F8 over `X` at F9). Because `TT` is not an accepted word in any official Scrabble lexicon (and `RA` is not valid in North American NWL play), this entire parallel placement is illegal. Every intersecting column must form a valid word for a parallel play to stand.' },

      { h: 'Worked Example: Comparing Legal Board Moves' },
      { p: 'Let us examine a concrete, rule-verified board decision using standard English tile values (`A=1, E=1, P=3, R=1, S=1, T=1, X=8`):' },
      { ul: [
        '**Your Hand (7 tiles):** `A, E, P, R, S, T, X` (2 vowels, 5 consonants, including the 8-point `X`).',
        '**Board State:** The word **TRAIN** was previously played horizontally across Row 8 from Column D to Column H (squares D8, E8, F8, G8, H8), covering the center star at H8. (Because TRAIN was played on an earlier turn, the Double Letter multiplier at D8 and the Double Word center multiplier at H8 are expired).',
        '**Board Coordinates & Multipliers:** Square I9 is an authentic **Double Letter (DL)** square on the standard Scrabble board. Squares D9, D10, I8, I10, I11, and I12 are all standard unmultiplied squares. All adjacent neighboring squares (such as H9–H12, J8–J12, C9–C10, E9–E10, D11, I7, and I13) are assumed vacant, meaning neither candidate play creates unintended collateral words.'
      ]},
      { p: 'Notice two distinct legal moves available on this board state:' },
      { table: {
        headers: ['Candidate Move', 'Board Placement', 'Tiles Played From Rack', 'Words Formed & Point Calculation', 'Rack Leave'],
        rows: [
          ['Option 1: Long Hook Play (STARE / TRAINS)', 'Place `S` at I8 to hook `TRAIN` into `TRAINS`, extending vertically down column I (`I8` to `I12`) with `T, A, R, E`.', '`S, T, A, R, E` (5 tiles)', 'Horiz. TRAINS (D8–I8): `T(1) + R(1) + A(1) + I(1) + N(1) + S(1)` = 6 pts. Vert. STARE (I8–I12): `S(1 at I8) + T(1×2=2 at DL I9) + A(1 at I10) + R(1 at I11) + E(1 at I12)` = 6 pts. Total: **12 points**.', '`P, X` (2 tiles: zero vowels, two awkward consonants)'],
          ['Option 2: Compact Problem-Tile Dump (TAX)', 'Branch vertically downward from the existing `T` at square D8 in `TRAIN`, placing `A` at D9 and `X` at D10.', '`A, X` (2 tiles)', 'Vert. TAX (D8–D10): `T(1, existing at D8) + A(1, newly placed at D9) + X(8, newly placed at D10)` = **10 points** (D8 multiplier expired; D9 and D10 are standard squares).', '`E, P, R, S, T` (5 tiles: 1 vowel, 4 common consonants)']
        ]
      }},
      { p: 'Comparing the two options illustrates the strategic trade-off: Option 1 scores 2 more points on this turn (12 vs. 10) by taking advantage of the Double Letter square at I9. However, it consumes five valuable tiles and strands your rack with `P, X` (two difficult consonants with zero vowels). In contrast, Option 2 scores 10 points, discards the clunky 8-point `X`, and leaves `E, P, R, S, T` — a balanced leave with a healthy vowel-consonant mix that preserves strong flexibility and bingo potential for upcoming turns.' },
      { p: 'Strategic Context Matters: Choosing between these moves depends on game context rather than a universal rule. In the endgame with few or no tiles remaining in the bag, preserving rack balance is meaningless, and you should take the guaranteed 12 points with Option 1. Similarly, if playing Option 1 closes down an open lane or blocks an opponent\'s access to a high-scoring Triple Word square on the right side of the board, defensive equity may favor the longer play. In open mid-game situations, however, the superior tile efficiency of Option 2 (5.0 points per tile versus 2.4 points per tile) and its balanced leave frequently yield a higher expected return over subsequent turns.' },

      { h: 'The 5-Step Turn Decision Checklist' },
      { p: 'Use this disciplined mental checklist on every Scrabble turn before placing your tiles on the board:' },
      { ol: [
        '**1. Check for 7-Letter Bingos First:** Always spend your first 15–20 seconds testing whether your rack can form a 7-letter word with open board letters. Use our [Word Unscrambler](/word-unscrambler) or [Anagram Solver](/anagram-solver) techniques (parking prefixes and suffixes) to test candidate stems.',
        '**2. Identify High-Multiplier Hotspots:** Locate open Triple Letter (TL) and Triple Word (TW) squares. Can you reach them with a high-value tile like J, Q, X, or Z?',
        '**3. Scan for Parallel Lanes:** Look along existing board words for 2-letter hook lanes. Check which letters can legally sit above or below existing tiles.',
        '**4. Calculate Net Turn Value:** Compare your top candidate plays. Do not look only at the score: subtract points if a play gives your opponent an easy Triple Word counter-attack.',
        '**5. Inspect Your Remaining Leave:** Look at the tiles that will stay on your rack. Do you have a healthy 2:3 vowel/consonant ratio? Are you holding synergistic tiles like S and E? If your leave is terrible, look for an alternative play that discards duplicate letters.'
      ]},

      { h: 'Common Scrabble Decision Mistakes' },
      { callout: {
        title: 'Four Traps That Cost Games',
        items: [
          '**Greedily Burning Blank Tiles:** Novice players frequently spend a versatile blank tile on an ordinary 14-point word. Save blanks for 50-point bingo plays or game-winning premium square blocks.',
          '**Ignoring Opponent Openings:** Playing a word ending in an open vowel (like `E` or `A`) directly adjacent to a Triple Word square is an open invitation for your opponent to drop an 8-point tile for 30+ points.',
          '**Holding onto Q Without a U:** If you draw a Q and have no U, do not wait five turns hoping to draw one. Use the two-letter word `QI` (as detailed in our [word lists](/word-lists)) to dump the Q immediately.',
          '**Playing Speed Over Precision:** Take an extra 30 seconds to verify every intersecting cross-word before removing your fingers from the tiles.'
        ]
      }},

      { h: 'Practice Scenario' },
      { exercise: {
        q: 'Scenario: Your rack holds "C, E, I, L, N, O, S". You have candidate plays that allow you to play the 6-letter word "CLONES" for a slightly higher immediate score (leaving the single tile "I"), or play the compact word "COIL" for fewer points (leaving "E, N, S"). Which play offers higher strategic equity?',
        hint: 'Evaluate the strategic value of leaving the lone tile I versus preserving the high-synergy stem E-N-S.',
        a: 'Play "COIL" (leaving E, N, S)',
        explanation: 'While playing CLONES yields slightly higher immediate points, it burns your versatile S tile and strands a lone I on your rack. Playing COIL preserves the high-equity stem E-N-S. In Scrabble strategy, E-N-S is one of the highest-value 3-tile leaves in the game, providing a strong statistical probability of drawing a 50-point bingo on your subsequent turn.'
      }}
    ],
  },
  {
    slug: 'how-to-solve-crossword-clues',
    tag: 'Solving Guide',
    title: 'How to Solve Crossword Clues Using Letter Patterns and Word Length',
    description: 'Master the art of crossword solving: how to combine clue anatomy, letter-pattern constraints, crossing intersections, and length filters to break tough grids.',
    body: [
      { p: 'Staring at a blank crossword grid can be intimidating. Solvers often feel trapped between obscure trivia, cryptic wordplay, and stubbornly empty squares. When intuition fails, guessing blindly often leads to messy erasures and cascading errors across the entire puzzle.' },
      { p: 'Expert crossword solvers treat grids not as tests of encyclopedic knowledge, but as **constraint-satisfaction puzzles**. By systematically combining clue grammar, character length, and intersecting crossing letters, you can narrow down hundreds of theoretical dictionary words to the single correct solution in seconds.' },

      { h: 'The Anatomy of a Crossword Clue: Five Structural Clue Types' },
      { p: 'Before entering any letters, identify which structural category the clue belongs to. Crossword constructors follow strict editorial conventions:' },
      { table: {
        headers: ['Clue Type', 'Signature Signal', 'How to Decode It', 'Example Clue → Answer'],
        rows: [
          ['1. Straight Definition', 'Literal synonym or descriptive phrase.', 'Look for direct synonyms matching the exact part of speech and tense.', '"Deep, ringing sound" (5) → **PEALS**'],
          ['2. Abbreviation Indicator', 'Contains "abbr.", "in brief", "for short", or an embedded abbreviation.', 'The answer is guaranteed to be an abbreviation or acronym.', '"Flight monitor figure, briefly" (3) → **ETA**'],
          ['3. Question Mark / Pun', 'Ends with a question mark (`?`).', 'Indicates wordplay, double entendres, homonyms, or intentional misdirection.', '"Bark that never bites?" (4) → **TREE**'],
          ['4. Fill-in-the-Blank', 'Contains an underlined blank (`___`).', 'Typically the easiest clues in the puzzle. Often titles, famous quotes, or common idioms.', '"___ of the crop" (5) → **CREAM**'],
          ['5. Cross-Reference Clue', 'Refers to another clue number (e.g. "With 42-Across...").', 'Solve the referenced clue first before attempting to fill the answer.', '"Partner of 14-Across" (4) → **SALT** (with PEPPER)']
        ]
      }},

      { h: 'Grammatical Tense and Number Agreement' },
      { p: 'The most reliable rule in American and standard English crosswords is **strict grammatical agreement** between the clue and the answer:' },
      { ul: [
        '**Tense Matching:** If a clue is past tense ("Recorded in advance"), the answer must be past tense (e.g. `PRETAPED`, ending in `-ED`). If the clue is progressive ("Running quickly"), the answer ends in `-ING`.',
        '**Singular vs. Plural Agreement:** A plural clue ("Ancient monuments") always requires a plural answer (e.g. `PYRAMIDS`, ending in `-S`). If the clue is singular ("Ancient monument"), the answer is singular (`PYRAMID`).',
        '**Part of Speech Consistency:** A noun clue yields a noun; an adjective clue yields an adjective; a slang clue ("Pal, in slang") demands a slang answer (`BUD` or `BRO`).'
      ]},

      { h: 'The Power of Crossing Intersections' },
      { p: 'Why are crossing letters so decisive in solving crosswords? In any large dictionary, thousands of words share a common length. For an unconstrained 5-letter slot (`? ? ? ? ?`), finding the correct word through clue meaning alone can feel overwhelming.' },
      { p: 'As intersecting Down and Across letters are filled in, the pool of candidates shrinks dramatically:' },
      { ul: [
        '**An unconstrained pattern (`?????`):** Thousands of potential English words could fit.',
        '**A single common vowel (`?e???`):** Eliminates non-E words, but still leaves hundreds of plausible options.',
        '**A less frequent consonant (`?e?l?`):** Cuts the candidate list down to a small, manageable cluster (such as `PEALS` or `REALM`).',
        '**Multiple intersecting consonants (`pe?l?`):** Uniquely isolates the solution, making the answer **PEALS** immediately recognizable alongside the clue "Deep, ringing sound".'
      ]},
      { p: 'Consonants with distinct phonetic roles (such as `B, F, K, L, M, P, V, Z`) act as strong anchors in a crossword grid. Intersecting consonants typically provide far more solving certainty than common vowels.' },

      { h: 'The Trap of Premature Commitment' },
      { p: 'The single most common mistake in crossword solving is **inking the first plausible word into the grid without verifying crossings**.' },
      { p: 'Suppose the clue is "Begin" (5 letters). You immediately think of `START`. If you pencil in `START` without checking the Down clues, and the actual answer was `ENTER` or `ARISE`, you have now injected five incorrect crossing letters into the grid. When you try to solve the intersecting clues, none of your patterns make sense, creating a cascade of grid frustration.' },
      { p: 'The Golden Rule of Crosswords: **Never commit firmly to a word until at least one intersecting crossing letter confirms it**.' },

      { h: 'Four Worked Examples: From Clue to Verified Solution' },
      { p: 'Let us step through four distinct clue types and see how pattern constraints resolve them:' },

      { h3: 'Example 1: The Multi-Synonym Definition' },
      { ul: [
        '**Clue:** "Deep, ringing sound" (5 letters)',
        '**Initial Thought:** Could be `CHIME`, `TOLLS`, `RINGS`, or `PEALS`.',
        '**Intersecting Down Letters:** Solving an easy Down clue confirms the 2nd letter is `E` and the 4th letter is `L` (`? e ? l ?`).',
        '**Pattern Search:** Entering `?e?l?` into the [Crossword Finder](/crossword-finder) eliminates `CHIME`, `TOLLS`, and `RINGS`, returning a small list including `PEALS` and `REALM`.',
        '**Clue Fit:** A "peal" is a loud ringing of bells or thunder. **Solution: PEALS**.'
      ]},

      { h3: 'Example 2: The Question-Mark Misdirection' },
      { ul: [
        '**Clue:** "Bark that never bites?" (4 letters)',
        '**Decoding the Signal:** The question mark warns you not to think of a dog or animal barking.',
        '**Intersecting Down Letters:** Down clues provide letter 1 as `T` and letter 3 as `E` (`t ? e ?`).',
        '**Pattern Search:** Pattern `t?e?` matches `THEY`, `TOED`, `TIED`, `TREK`, and `TREE`.',
        '**Contextual Fit:** Botanical bark belongs on a tree trunk. **Solution: TREE**.'
      ]},

      { h3: 'Example 3: The Abbreviation Clue' },
      { ul: [
        '**Clue:** "Airport arrival monitor figure, briefly" (3 letters)',
        '**Decoding the Signal:** "Briefly" signals that the answer is an abbreviation.',
        '**Intersecting Down Letters:** Crossing letters reveal position 1 as `E` and position 3 as `A` (`e ? a`).',
        '**Pattern Search:** Pattern `e?a` yields `ERA` and `ETA`.',
        '**Contextual Fit:** At an airport, the arrival monitor displays the "Estimated Time of Arrival". **Solution: ETA**.'
      ]},

      { h3: 'Example 4: The Fill-in-the-Blank Idiom' },
      { ul: [
        '**Clue:** "___ of the crop" (5 letters)',
        '**Intersecting Down Letters:** Letter 1 is `C`, letter 5 is `M` (`c ? ? ? m`).',
        '**Pattern Search:** Querying `c???m` in our [Crossword Finder](/crossword-finder) returns `CHASM`, `CLAIM`, and `CREAM`.',
        '**Contextual Fit:** The standard English idiom is "cream of the crop". **Solution: CREAM**.'
      ]},

      { h: 'How to Use Crossword Search Tools Responsibly' },
      { p: 'Word-finding tools should assist your solving process, not replace it. Here is how to use our search tools to improve your crossword skills without ruining the challenge:' },
      { ol: [
        '**Enter Exact Positional Patterns:** Use the [Crossword Finder](/crossword-finder) with question marks (`?`) strictly for unknown cells (e.g. `p?e?a?ed`). Do not type random letters into the letter-rack field unless solving an anagram clue.',
        '**Verify Definitions Instantly:** When a pattern search returns 10 candidates, click into our [Definition Finder](/definition-finder) to verify which candidate matches the exact nuance of the clue.',
        '**Combine Pattern and Must-Include Filters:** In our [Word Finder](/word-finder), you can enter a pattern like `c????` and specify "Must Include: Z" if an adjacent clue suggests a Z appears in that row.'
      ]},

      { h: 'The 5-Step Crossword Solving Checklist' },
      { ol: [
        '**1. Scan for Low-Hanging Fruit ("Gimmes"):** Begin by scanning all Across and Down clues for fill-in-the-blanks, abbreviations, and pop-culture trivia you know with certainty.',
        '**2. Build Outward from Anchor Clusters:** Work in the quadrant where you found your first confirmed answers. Use those crossing letters to unlock adjacent clues.',
        '**3. Check Plural and Tense Endings First:** If a clue is plural, pencil in the ending `-S`; if past tense, pencil in `-ED`. Those free letters often trigger instant recognition of crossing words.',
        '**4. Look Past the First Definition:** If a clue does not yield an obvious answer, ask: "Could this word be a verb instead of a noun? Is there a secondary homonym meaning?"',
        '**5. Model Unknowns with Pattern Tools:** When stuck on a crossing, enter the verified letters into our [Crossword Finder](/crossword-finder) to explore valid candidates.'
      ]},

      { h: 'Interactive Practice Exercises' },
      { exercise: {
        q: 'Exercise 1: The clue is "Change of address?" (6 letters). Down crossings confirm letter 2 is "E", letter 4 is "I", and letter 6 is "E" (pattern: ? e ? i ? e). What is the answer, and why is there a question mark?',
        hint: 'Think about a formal speech or address rather than a home location.',
        a: 'REVISE',
        explanation: 'The question mark signals wordplay on "address". Rather than changing a postal address, revising a speech or address modifies its text. Pattern ?e?i?e solves to REVISE.'
      }},
      { exercise: {
        q: 'Exercise 2: The clue is "Recorded in advance, as a TV segment" (8 letters). Crossing letters provide pattern: "p ? e ? a ? e d". What is the solution, and what clue signals guide you?',
        hint: 'The clue is past tense ("Recorded") and specifies a television or broadcast medium.',
        a: 'PRETAPED',
        explanation: 'Past tense "Recorded" dictates an -ED ending. Pattern p?e?a?ed locks the prefix PRE- and root -TAPE-, yielding PRETAPED.'
      }}
    ],
  },
];
