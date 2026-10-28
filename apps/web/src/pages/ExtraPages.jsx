import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle, Check, ChevronLeft, ChevronRight, Copy, Dices, Eye, EyeOff, Info, Loader2, RotateCcw, Search, Volume2, X,
} from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import ToolShell from '@/components/ToolShell';
import { Tile } from '@/components/TileInput';
import Results, { WordChip } from '@/components/Results';
import useDictionary from '@/hooks/useDictionary';
import { randomWord, scrambleWord, browseWordList, scoreWord, resolveAudioUrl } from '@/lib/dictionary';
import { copyText } from '@/lib/clipboard';
import { TOOLS } from '@/lib/tools';
import { SITE_URL, webApplicationLd, breadcrumbLd, faqLd } from '@/lib/seo';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ScrambleGuide, DefinitionGuide, WordListsGuide,
} from '@/components/ToolGuides';
import { fetchDefinition, normalizeWord, isValidWord } from '@/lib/definitionCache';

const related = (path) => TOOLS.filter((t) => t.path !== path).slice(0, 4);

/* ---------------- Scramble Generator ---------------- */

const SG_FAQS = [
  {
    q: 'What is a word scramble?',
    a: 'A word scramble mixes the letters of a word into a new random order — for example, "planet" becomes "lptena" — challenging the solver to deduce the original word. Teachers use them for spelling drills and vocabulary practice.',
  },
  {
    q: 'Are the scrambled words real dictionary words?',
    a: 'Yes. Every puzzle is selected from our common English word list, shuffled using the Fisher-Yates algorithm, and verified to ensure the scrambled letter sequence differs from the original solution.',
  },
  {
    q: 'Can I scramble my own custom word list?',
    a: 'Currently, the generator selects words by difficulty tier (Easy 4–5 letters, Medium 5–7 letters, Hard 7–9 letters) from curated common vocabulary. If you need to unscramble a custom puzzle, use our Word Unscrambler.',
  },
  {
    q: 'How can I use these puzzles for classroom worksheets or party games?',
    a: 'Click "Copy puzzle" to copy the scrambled letters directly to your clipboard. You can paste them into documents, print worksheets, or share them in group chat challenges.',
  },
];

export function ScramblePage() {
  const { status, dict, error, retry } = useDictionary();
  const [length, setLength] = useState('medium');
  const [puzzle, setPuzzle] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    if (!dict) return;
    const [min, max] = length === 'short' ? [4, 5] : length === 'long' ? [7, 9] : [5, 7];
    const word = randomWord(dict, min, max);
    setPuzzle({ word, scrambled: scrambleWord(word) });
    setRevealed(false);
    setCopied(false);
  }, [dict, length]);

  useEffect(() => {
    if (status === 'ready' && !puzzle) generate();
  }, [status, puzzle, generate]);

  const copyPuzzle = async () => {
    if (!puzzle) return;
    const ok = await copyText(`Unscramble this word: ${puzzle.scrambled.toUpperCase()}`);
    if (ok) { setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  };

  return (
    <>
      <Helmet>
        <title>Word Scramble Generator — Create Custom Word Puzzles | WordCraft Tool</title>
        <meta name="description" content="Generate fair, randomized word scramble puzzles from common English words for vocabulary practice and spelling games. Free and private." />
        <link rel="canonical" href={`${SITE_URL}/scramble-generator`} />
      </Helmet>
      <Seo title="Word Scramble Generator — WordCraft Tool" description="Generate fair word scramble puzzles from common English words." url={`${SITE_URL}/scramble-generator`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Word Scramble Generator', path: '/scramble-generator', description: 'Generate word scramble puzzles from real dictionary words.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Scramble Generator', path: '/scramble-generator' }]),
        faqLd(SG_FAQS),
      ]} />
      <ToolShell
        title="Word Scramble Generator"
        description="Create a randomized word scramble from common dictionary words — perfect for spelling practice, vocabulary drills, and game nights. Pick a difficulty and test your skills."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Scramble Generator' }]}
        faqs={SG_FAQS}
        related={related('/scramble-generator')}
        guide={<ScrambleGuide />}
      >
        <div className="grid gap-5">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="sg-length" className="text-sm font-semibold text-foreground">Difficulty</label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="sg-length" className="h-11 w-44 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Easy (4–5 letters)</SelectItem>
                  <SelectItem value="medium">Medium (5–7 letters)</SelectItem>
                  <SelectItem value="long">Hard (7–9 letters)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              type="button" onClick={generate} disabled={status !== 'ready'}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Dices className="h-4 w-4" aria-hidden="true" /> New scramble
            </button>
          </div>

          {status === 'error' && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6" role="alert">
              <p className="flex items-center gap-2 text-sm text-destructive"><AlertTriangle className="h-4 w-4" aria-hidden="true" /> {error}</p>
              <button type="button" onClick={retry} className="mt-2 text-sm font-semibold text-foreground underline">Try again</button>
            </div>
          )}
          {status === 'loading' && (
            <p className="flex items-center gap-2 rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" /> Loading the word list…
            </p>
          )}
          {status === 'ready' && puzzle && (
            <div className="rounded-xl border border-border bg-background p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Unscramble this word</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label={`Scrambled letters: ${puzzle.scrambled.split('').join(' ')}`}>
                {puzzle.scrambled.split('').map((ch, i) => (
                  <Tile key={`${ch}-${i}`} char={ch} size="lg" variant="navy" />
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button" onClick={() => setRevealed((r) => !r)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
                  aria-expanded={revealed}
                >
                  {revealed ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                  {revealed ? 'Hide answer' : 'Reveal answer'}
                </button>
                <button
                  type="button" onClick={copyPuzzle}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
                >
                  {copied ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy puzzle'}
                </button>
              </div>
              {revealed && (
                <p className="mt-5 font-display text-2xl font-semibold text-foreground" role="status">
                  The word is <span className="text-primary">{puzzle.word.toUpperCase()}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </ToolShell>
    </>
  );
}

/* ---------------- Definition Finder ---------------- */

const DF_FAQS = [
  {
    q: 'Where do definitions come from?',
    a: 'Definitions are fetched live from the Free Dictionary API (dictionaryapi.dev) with automatic fallback to Datamuse, providing parts of speech, phonetic spellings, and usage examples.',
  },
  {
    q: 'Why do some valid Scrabble words return no definition?',
    a: 'Specialized competitive word games allow short hook words (like AA, ZA, or QI) from historic or regional lexicons. While valid in our word finders, modern general-purpose definition APIs may occasionally lack entries for these obscure abbreviations or loanwords.',
  },
  {
    q: 'Does Definition Finder include pronunciations?',
    a: 'Yes. When audio clips and phonetic transcriptions are available from the open dictionary API, they are displayed alongside word meanings and parts of speech.',
  },
  {
    q: 'How can I look up words directly from other tools?',
    a: 'Every word chip across Word Finder, Word Unscrambler, Anagram Solver, and Word Lists is clickable. Tapping any chip navigates directly to Definition Finder with that word preloaded.',
  },
];

export function DefinitionPage() {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState(() => searchParams.get('word') || '');
  const [state, setState] = useState({ status: 'idle', entries: [], word: '' });
  const activeRequestIdRef = useRef(0);

  const lookup = useCallback(async (word) => {
    const clean = normalizeWord(word);
    if (!isValidWord(clean)) {
      setState({ status: 'invalid', entries: [], word: clean });
      return;
    }

    const currentReqId = ++activeRequestIdRef.current;
    setState({ status: 'loading', entries: [], word: clean });

    const result = await fetchDefinition(clean);

    // Guard against race conditions: ignore if a newer search was initiated
    if (activeRequestIdRef.current !== currentReqId) {
      return;
    }

    setState(result);
  }, []);

  useEffect(() => {
    const w = searchParams.get('word');
    if (w) lookup(w);
    // Only run for the initial query param.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Definition Finder — Word Meanings & Examples | WordCraft Tool</title>
        <meta name="description" content="Look up any English word: meanings, parts of speech, example sentences, and synonyms from an open dictionary. Free and fast." />
        <link rel="canonical" href={`${SITE_URL}/definition-finder`} />
      </Helmet>
      <Seo title="Definition Finder — WordCraft Tool" description="Look up meanings, parts of speech, and examples for any word." url={`${SITE_URL}/definition-finder`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Definition Finder', path: '/definition-finder', description: 'Look up definitions, parts of speech, and examples for English words.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Definition Finder', path: '/definition-finder' }]),
        faqLd(DF_FAQS),
      ]} />
      <ToolShell
        title="Definition Finder"
        description="Check exactly what a word means before you play it — definitions, parts of speech, examples, and synonyms from an open dictionary."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Definition Finder' }]}
        faqs={DF_FAQS}
        related={related('/definition-finder')}
        guide={<DefinitionGuide />}
      >
        <div className="grid gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="df-word" className="text-sm font-semibold text-foreground">Word to look up</label>
            <div className="flex flex-wrap gap-3">
              <input
                id="df-word" type="text" autoComplete="off" spellCheck="false"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') lookup(input); }}
                placeholder="e.g. quixotic"
                className="h-12 min-w-0 flex-1 rounded-lg border border-input bg-background px-4 text-lg font-medium text-foreground shadow-sm outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="button" onClick={() => lookup(input)}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
              >
                <Search className="h-4 w-4" aria-hidden="true" /> Define
              </button>
            </div>
          </div>

          {state.status === 'idle' && (
            <div className="rounded-xl border border-dashed border-border bg-background p-6">
              <p className="text-sm text-muted-foreground">
                Type any English word above and press <strong>Define</strong>. You can also test instant lookups with these popular examples:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['serendipity', 'craft', 'lucid', 'ephemeral', 'quixotic'].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => { setInput(sample); lookup(sample); }}
                    className="inline-flex min-h-[36px] sm:min-h-[40px] items-center rounded-md border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-95"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}
          {state.status === 'invalid' && (
            <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm font-medium text-destructive">
              Enter a single English word using letters, hyphens, or apostrophes.
            </p>
          )}
          {state.status === 'loading' && (
            <p className="flex items-center gap-2 rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" /> Looking up “{state.word}”…
            </p>
          )}
          {state.status === 'error' && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6" role="alert">
              <p className="text-sm text-destructive">
                {state.errorMsg || 'The dictionary service could not be reached. Check your connection and try again.'}
              </p>
              <button type="button" onClick={() => lookup(state.word)} className="mt-2 text-sm font-semibold text-foreground underline">Try again</button>
            </div>
          )}
          {state.status === 'empty' && (
            <div className="rounded-xl border border-dashed border-border bg-background p-6" role="status">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Info className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>No dictionary entry found for &ldquo;{state.word}&rdquo;</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                General-purpose online dictionaries focus on conversational English and often omit specialized word-game plays, ancient loanwords, or tournament-only hook words.
              </p>
              <div className="mt-4 rounded-lg bg-card/60 border border-border/80 p-3.5 text-xs text-muted-foreground space-y-1.5">
                <p className="font-medium text-foreground">Why this happens in word games:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Tournament Hook Words:</strong> Words like <em>QI</em>, <em>ZA</em>, <em>AA</em>, <em>XI</em>, or <em>JO</em> are valid plays in Scrabble and Words With Friends tournament lexicons, but general-purpose API dictionaries frequently lack definitions for them.</li>
                  <li><strong>Tile Scoring:</strong> Even without an API definition, if playable from your letters, this word scores {scoreWord(state.word)} classic tile points.</li>
                  <li><strong>Misspelling:</strong> Verify letter spelling or try looking for near matches in Word Finder.</li>
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/word-lists"
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  Browse Word Lists
                </Link>
                <Link
                  to={`/word-unscrambler?letters=${encodeURIComponent(state.word)}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  Unscramble Letters
                </Link>
                <Link
                  to="/learn/two-letter-words"
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  2-Letter Words Guide
                </Link>
              </div>
            </div>
          )}
          {state.status === 'ready' && (
            <div className="grid gap-4">
              {/* Word Game & Linguistic Profile */}
              <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Word Game Profile</span>
                    <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                      {state.word}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                      Tile Score: {scoreWord(state.word)} pts
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
                      {state.word.length} {state.word.length === 1 ? 'letter' : 'letters'}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 font-medium text-muted-foreground">
                      {state.word.split('').filter((c) => 'aeiou'.includes(c)).length} vowels · {state.word.split('').filter((c) => 'bcdfghjklmnpqrstvwxyz'.includes(c)).length} consonants
                    </span>
                  </div>
                </div>

                {/* Quick Solver Cross-Links */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Cross-tool actions:</span>
                  <Link
                    to={`/word-unscrambler?letters=${encodeURIComponent(state.word)}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Unscramble letters
                  </Link>
                  <Link
                    to={`/anagram-solver?word=${encodeURIComponent(state.word)}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Exact anagrams
                  </Link>
                  <Link
                    to={`/crossword-finder?pattern=${encodeURIComponent(state.word)}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Crossword pattern
                  </Link>
                  <Link
                    to={`/word-finder?contains=${encodeURIComponent(state.word)}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Board finder
                  </Link>
                </div>
              </div>

              {state.entries.map((entry, i) => {
                const audioUrl = resolveAudioUrl(entry.phonetics);
                const playAudio = audioUrl ? () => {
                  try {
                    const audio = new Audio(audioUrl);
                    audio.play().catch(() => {});
                  } catch {}
                } : null;

                return (
                  <article key={i} className="rounded-xl border border-border bg-background p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-foreground">{entry.word}</h3>
                        {entry.phonetic && <p className="mt-0.5 font-mono text-xs text-muted-foreground">{entry.phonetic}</p>}
                      </div>
                      {playAudio && (
                        <button
                          type="button"
                          onClick={playAudio}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-secondary active:scale-95"
                          title="Listen to audio pronunciation"
                          aria-label={`Pronounce ${entry.word}`}
                        >
                          <Volume2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          <span>Pronounce</span>
                        </button>
                      )}
                    </div>

                    {(entry.meanings || []).map((m, j) => (
                      <section key={j} className="mt-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
                            {m.partOfSpeech}
                          </span>
                        </div>
                        <ol className="mt-2.5 list-decimal space-y-2 pl-5">
                          {(m.definitions || []).slice(0, 4).map((d, k) => (
                            <li key={k} className="text-sm leading-relaxed text-foreground">
                              <span>{d.definition}</span>
                              {d.example && (
                                <span className="mt-1 block rounded-r-md border-l-2 border-primary/40 bg-accent/30 py-1 pl-2.5 text-xs italic text-muted-foreground">
                                  &ldquo;{d.example}&rdquo;
                                </span>
                              )}
                            </li>
                          ))}
                        </ol>
                        {m.synonyms?.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
                            <span className="font-medium text-muted-foreground">Synonyms:</span>
                            {m.synonyms.slice(0, 6).map((syn) => (
                              <button
                                key={syn}
                                type="button"
                                onClick={() => { setInput(syn); lookup(syn); }}
                                className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground transition-colors hover:bg-secondary"
                              >
                                {syn}
                              </button>
                            ))}
                          </div>
                        )}
                      </section>
                    ))}
                  </article>
                );
              })}
              <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
                <p>
                  <strong>Data transparency:</strong> Definitions, phonetics, and usage citations are provided live from the open Free Dictionary API (dictionaryapi.dev) with Datamuse lexical fallbacks. Word game tile scoring, letter counts, and rack permutations are computed locally by GetWordCraft.com.
                </p>
              </div>
            </div>
          )}
        </div>
      </ToolShell>
    </>
  );
}

/* ---------------- Word Lists ---------------- */

const WL_FAQS = [
  {
    q: 'Why learn two-letter and three-letter words?',
    a: 'Short words are the highest-leverage plays in tile games like Scrabble and Words With Friends. They slot into tight board spaces, form parallel words scoring in two directions at once, and turn awkward tiles like Q, X, and Z into substantial point gains.',
  },
  {
    q: 'What word lengths and categories are supported?',
    a: 'WordCraft supports every verified word length from 2 to 15 letters, alongside curated strategy lists including Q-without-U words, high-value tile hooks (J, Q, X, Z), and vowel dumps.',
  },
  {
    q: 'How are these lists generated and filtered?',
    a: 'Every list is computed live in your browser from our comprehensive 437,000+ word dictionary. You can search inside any list, filter by starting letter or vocabulary tier, sort alphabetically or by Scrabble score, and page through complete results.',
  },
  {
    q: 'How are word tile scores calculated in the list?',
    a: 'Scores reflect classic English tile values (e.g. A=1, D=2, B=3, F=4, K=5, J=8, Q=10, Z=10). You can sort any list by tile score to identify high-potential plays for your board games.',
  },
  {
    q: 'Can I export words from these lists for offline practice?',
    a: 'Yes. Use the "Copy page" button to copy the 60 words visible on the current page, or "Copy all" to copy the entire filtered collection to your clipboard for study notes or flashcards.',
  },
];

const CURATED_LISTS = [
  { id: 'two', label: '2-Letter Words', desc: 'Every 2-letter word' },
  { id: 'three', label: '3-Letter Words', desc: 'High-leverage hooks' },
  { id: 'q-no-u', label: 'Q Without U', desc: 'Crucial tile lifelines' },
  { id: 'power', label: 'Power Tiles (J, Q, X, Z)', desc: 'Words up to 6 letters' },
  { id: 'vowels', label: 'Vowel-Heavy Words', desc: '60%+ vowel content' },
];

const LENGTH_OPTIONS = Array.from({ length: 14 }, (_, i) => i + 2); // 2 to 15 letters
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [1];
  if (currentPage > 3) pages.push('...');
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push('...');
  pages.push(totalPages);
  return pages;
}

const CATEGORY_STRATEGY = {
  two: {
    title: 'Two-Letter Foundations & Parallel Plays',
    badge: 'Core Game Skill',
    summary: 'Two-letter words are the single highest-leverage asset in Scrabble and Words With Friends. Because parallel plays run alongside established board words, each tile placed scores both horizontally and vertically simultaneously.',
    tips: [
      'Master high-value hooks first: ZA (11 pts), QI (11 pts), XI (9 pts), JO (9 pts), and AX (9 pts).',
      'Use 2-letter connectors to place high-scoring letters on multiplier squares while building parallel cross-words.',
      'Check vowel-only hooks like AA, AE, AI, OE, and OI to shed excess vowels without wasting a turn.',
    ],
    studyTip: 'Memorize 5 to 10 two-letter words per day. Test yourself by covering the list and writing all words for a specific starting letter.',
    link: { to: '/learn/two-letter-words', label: 'Read Two-Letter Words Strategy Guide' },
  },
  three: {
    title: 'Three-Letter Extension Hooks',
    badge: 'Board Maneuvering',
    summary: 'Three-letter words expand board possibilities by hooking onto existing 2-letter anchors. They are vital for navigating tight board corners and reaching Double and Triple Word multipliers.',
    tips: [
      'Front-hooks: Learn letters that attach to the front of 2-letter words (e.g., adding C to AT makes CAT; adding S to PA makes SPA).',
      'Back-hooks: Learn letters that attach to the end (e.g., adding S, D, or Y to 2-letter foundations).',
      'High-value plays like QAT, ZAP, and FOX turn awkward high-point tiles into 20+ point turns in tight spaces.',
    ],
    studyTip: 'Group three-letter words by their parent two-letter word (e.g. all 3-letter words built from AT: BAT, CAT, EAT, FAT, HAT, MAT, OAT, PAT, RAT, SAT, TAT, VAT).',
    link: { to: '/learn/unscramble-words-faster', label: 'Rack Solving Techniques' },
  },
  'q-no-u': {
    title: 'Q Without U Lifelines',
    badge: 'High-Value Tile Defense',
    summary: 'Holding a 10-point Q when no U is available often traps players into taking a scoreless tile-exchange turn. Memorizing verified Q-without-U words allows you to dump the Q profitably.',
    tips: [
      'Essential short lifelines: QI (2 letters), QAT (3 letters), QOPH, QADI, TRANQ (5 letters), FAQIR, and BURQA (5 letters).',
      'Landing the Q on a Triple Letter square nets 30 points on QI alone, and scores 60+ points if played across a parallel cross-word.',
      'Never forfeit a turn swapping tiles if one of these Q-without-U lifelines is playable on the board.',
    ],
    studyTip: 'There are only a handful of playable short Q-without-U words in standard English lexicons. Write them on an index card and review them before game nights.',
    link: { to: '/word-finder?letters=q&mode=all', label: 'Search Q Plays in Word Finder' },
  },
  power: {
    title: 'Power Tiles (J, Q, X, Z) Under 7 Letters',
    badge: 'Point Multipliers',
    summary: 'Tiles worth 8 or 10 points (J, Q, X, Z) account for a decisive share of total match scores. In short words (up to 6 letters), they can easily net 30 to 50+ points when hitting premium multiplier squares.',
    tips: [
      'Look for parallel opportunities where the power letter scores in two directions at once (e.g. playing AX vertically to make OX horizontally).',
      'Avoid hoarding power tiles on your rack waiting for an elusive 7-letter bingo; playing them early keeps your rack fluid.',
      'Common words vs. All words: Toggle the vocabulary mode filter to see everyday terms versus full tournament-indexed entries.',
    ],
    studyTip: 'Practice finding words that use your power tile as the first, middle, or last letter so you can adapt to any open multiplier on the board.',
    link: { to: '/learn/unscramble-words-faster', label: 'Unscrambling Strategies' },
  },
  vowels: {
    title: 'Vowel-Heavy Words (60%+ Vowel Content)',
    badge: 'Rack Balancing',
    summary: 'Accumulating 5 or 6 vowels on your rack paralyzes scoring potential. Vowel-heavy words allow you to shed surplus vowels in a single turn without sacrificing your turn to swap tiles.',
    tips: [
      'Key vowel-heavy lifelines: AA, AE, AI, OE, OI (2 letters); AUA, EAU (3 letters); AERIE, AUDIO, OORIE (5 letters).',
      'Dumping 3 to 4 vowels at once resets your rack balance toward an optimal 3-vowel, 4-consonant ratio.',
      'Aim to place vowel dumps where they hook onto existing consonants on the board to maximize points.',
    ],
    studyTip: 'Whenever your rack has 5+ vowels, immediately look for high-vowel dump plays like AUDIO, AERIE, or ADIEU before considering a tile exchange.',
    link: { to: '/learn/wildcards-and-patterns', label: 'Pattern Matching Guide' },
  },
};

function getLengthStrategy(len) {
  if (len <= 3) {
    return {
      title: `${len}-Letter Hook Words`,
      badge: `${len}-Letter List`,
      summary: `Short ${len}-letter words are essential for maneuvering in tight board positions and creating perpendicular cross-plays that score in two directions at once.`,
      tips: [
        'Study words in small batches of 5 to 10 per session for fast recall.',
        'Watch for high-point consonants like J, K, Q, X, and Z that turn short plays into big scores.',
      ],
      studyTip: `Focus on ${len}-letter words featuring awkward consonants (C, J, K, Q, V, X, Z) to keep your rack balanced.`,
      link: { to: '/learn/two-letter-words', label: 'Two-Letter Strategy Guide' },
    };
  }
  if (len === 5) {
    return {
      title: '5-Letter Words & Wordle Candidates',
      badge: 'Daily Puzzles & Wordle',
      summary: '5-letter words are the foundation of daily Wordle puzzles and key bridge plays in Scrabble. Our list allows you to filter by starting letter and vocabulary frequency tier.',
      tips: [
        'For Wordle practice, select "Common Words" mode to match curated daily solution lists.',
        'Filter by starting letter to test specific puzzle positions or consonant blends (e.g. ST-, CR-, TR-).',
      ],
      studyTip: 'Identify 5-letter words containing 3 common vowels (like CRANE, SLATE, AUDIO) to use as strong opening guesses in Wordle.',
      link: { to: '/wordle-helper', label: 'Open Wordle Helper' },
    };
  }
  if (len === 7 || len === 8) {
    return {
      title: `${len}-Letter Bingo Targets (50-Point Bonus)`,
      badge: 'Bingo Candidates',
      summary: `In competitive Scrabble, playing all 7 rack tiles awards a 50-point bonus (a "Bingo"). Mastering ${len}-letter words with common prefixes (RE-, UN-) and suffixes (-ING, -ED, -ERS) is essential for tournament-level scoring.`,
      tips: [
        'Look for high-probability 6-letter stems (like RETINA, SATIRE, TISANE) that form bingos with almost any seventh tile.',
        'Sort by highest score to discover high-value words that combine a bingo bonus with premium letter multipliers.',
      ],
      studyTip: 'Practice spotting common prefixes and suffixes first, then rearrange the remaining letters into familiar roots.',
      link: { to: '/learn/unscramble-words-faster', label: 'Bingo Solving Techniques' },
    };
  }
  return {
    title: `${len}-Letter Dictionary Words`,
    badge: `${len}-Letter List`,
    summary: `Explore verified ${len}-letter English words from our reference dictionary. Filter by starting letter, sort alphabetically or by classic tile score, and copy words for offline study.`,
    tips: [
      'Break long lists into manageable study groups of 10 to 15 words rather than attempting to memorize everything at once.',
      'Use the search filter to test specific stems or letter clusters within the list.',
    ],
    studyTip: 'Look for shared roots, prefixes, and suffixes to group related words together in memory.',
    link: { to: '/word-finder', label: 'Search Patterns in Word Finder' },
  };
}

export function WordListsPage() {
  const { status, dict, error, retry } = useDictionary();
  const [browseGroup, setBrowseGroup] = useState('curated'); // 'curated' | 'length'
  const [category, setCategory] = useState('two');
  const [search, setSearch] = useState('');
  const [startsWith, setStartsWith] = useState('all');
  const [mode, setMode] = useState('all');
  const [sort, setSort] = useState('alpha-asc');
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState('');

  const activeStrategy = useMemo(() => {
    if (browseGroup === 'curated') {
      return CATEGORY_STRATEGY[category] || CATEGORY_STRATEGY.two;
    }
    const len = parseInt(category.replace('len-', ''), 10) || 5;
    return getLengthStrategy(len);
  }, [browseGroup, category]);

  const handleGroupChange = (group) => {
    setBrowseGroup(group);
    if (group === 'curated') {
      if (!CURATED_LISTS.some((c) => c.id === category)) {
        setCategory('two');
      }
    } else {
      if (!category.startsWith('len-')) {
        setCategory('len-5');
      }
    }
    setPage(1);
  };

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setStartsWith('all');
    setMode('all');
    setSort('alpha-asc');
    setPage(1);
  };

  const isFiltered = search.trim() !== '' || startsWith !== 'all' || mode !== 'all' || sort !== 'alpha-asc';

  const result = useMemo(() => {
    if (!dict) return null;
    return browseWordList(dict, {
      category,
      search,
      startsWith: startsWith === 'all' ? '' : startsWith,
      mode,
      sort,
      page,
      pageSize: 100,
    });
  }, [dict, category, search, startsWith, mode, sort, page]);

  const copyPage = async () => {
    if (!result?.items?.length) return;
    const ok = await copyText(result.items.join(', '));
    if (ok) {
      setCopied('page');
      window.setTimeout(() => setCopied(''), 1800);
    }
  };

  const copyAll = async () => {
    if (!result?.allMatching?.length) return;
    const maxWords = 5000;
    const slice = result.allMatching.slice(0, maxWords);
    const ok = await copyText(slice.join(', '));
    if (ok) {
      setCopied('all');
      window.setTimeout(() => setCopied(''), 1800);
    }
  };

  const total = result?.total || 0;
  const startItem = total > 0 ? (result.page - 1) * result.pageSize + 1 : 0;
  const endItem = Math.min(result?.page * result?.pageSize || 0, total);
  const pageNumbers = result ? getPageNumbers(result.page, result.totalPages) : [];

  return (
    <>
      <Helmet>
        <title>Word Lists — Two-Letter Words, Q Without U & Word Length Browser | WordCraft Tool</title>
        <meta
          name="description"
          content="Explore comprehensive word lists for word-game players: two-letter words, three-letter hooks, Q-without-U lifelines, power tiles, and words by length from 2 to 15 letters. Search, filter, and copy."
        />
        <link rel="canonical" href={`${SITE_URL}/word-lists`} />
      </Helmet>
      <Seo
        title="Word Lists — WordCraft Tool"
        description="Two-letter words, Q without U, high-value letters, and complete length-based word lists (2–15 letters)."
        url={`${SITE_URL}/word-lists`}
        siteName="WordCraft Tool"
      />
      <JsonLd
        data={[
          webApplicationLd({
            name: 'Word Lists',
            path: '/word-lists',
            description: 'Comprehensive word lists for word-game players: curated strategy collections and length-based word browsing from 2 to 15 letters.',
          }),
          breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Word Lists', path: '/word-lists' }]),
          faqLd(WL_FAQS),
        ]}
      />
      <ToolShell
        title="Word Lists"
        description="Reference lists for word-game players: two-letter foundations, three-letter hooks, Q-without-U lifelines, high-value tile words, and complete word lengths from 2 to 15 letters. Search, sort, and copy with one tap."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Word Lists' }]}
        faqs={WL_FAQS}
        related={related('/word-lists')}
        guide={<WordListsGuide />}
      >
        {status === 'loading' && (
          <p className="flex items-center gap-2 rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground" role="status">
            <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" /> Loading dictionary and word lists…
          </p>
        )}
        {status === 'error' && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6" role="alert">
            <p className="text-sm text-destructive">{error}</p>
            <button type="button" onClick={retry} className="mt-2 text-sm font-semibold text-foreground underline">
              Try again
            </button>
          </div>
        )}
        {status === 'ready' && result && (
          <div className="space-y-4">
            {/* Category selection */}
            <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <div className="flex rounded-lg bg-secondary/80 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleGroupChange('curated')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                      browseGroup === 'curated'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Curated Strategy Lists
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGroupChange('length')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                      browseGroup === 'length'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Browse by Word Length (2–15)
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {browseGroup === 'curated' ? '5 curated collections' : '14 supported word lengths'}
                </span>
              </div>

              {/* Sub-selector pills */}
              <div className="mt-3">
                {browseGroup === 'curated' ? (
                  <div className="flex flex-wrap gap-2">
                    {CURATED_LISTS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleCategoryChange(item.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                          category === item.id
                            ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                            : 'border border-border bg-card text-foreground hover:bg-secondary'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {LENGTH_OPTIONS.map((len) => {
                        const lenId = `len-${len}`;
                        return (
                          <button
                            key={len}
                            type="button"
                            onClick={() => handleCategoryChange(lenId)}
                            className={`inline-flex shrink-0 items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                              category === lenId
                                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                                : 'border border-border bg-card text-foreground hover:bg-secondary'
                            }`}
                          >
                            {len} Letters
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Strategic Context Guide */}
            <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {activeStrategy.title}
                  </h2>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {activeStrategy.badge}
                  </span>
                </div>
                {activeStrategy.link && (
                  <Link
                    to={activeStrategy.link.to}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline hover:text-primary/80"
                  >
                    {activeStrategy.link.label} &rarr;
                  </Link>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {activeStrategy.summary}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-lg border border-border/60 bg-background/50 p-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Tactical Advice:</span>
                  <ul className="list-disc list-inside space-y-1">
                    {activeStrategy.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-between rounded-lg border border-border/60 bg-background/50 p-3 text-xs text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">Manageable Learning Tip:</span>
                    <p className="mt-1 leading-relaxed">{activeStrategy.studyTip}</p>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
                    <span className="text-[11px] font-medium text-foreground">Practice this list in:</span>
                    <Link
                      to="/word-unscrambler"
                      className="rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-secondary"
                    >
                      Word Unscrambler
                    </Link>
                    <Link
                      to="/word-finder"
                      className="rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-secondary"
                    >
                      Word Finder
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search input */}
                <div className="relative min-w-[200px] flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search inside list (e.g. 'cat', 'ing')..."
                    className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                    aria-label="Search within word list"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setPage(1);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Clear search input"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Starting letter dropdown */}
                <Select
                  value={startsWith}
                  onValueChange={(val) => {
                    setStartsWith(val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9 w-[130px] text-xs sm:text-sm" aria-label="Filter by starting letter">
                    <SelectValue placeholder="Starts with" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Letters</SelectItem>
                    {ALPHABET.map((letter) => (
                      <SelectItem key={letter} value={letter}>
                        Starts with {letter.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Vocabulary tier */}
                <Select
                  value={mode}
                  onValueChange={(val) => {
                    setMode(val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9 w-[135px] text-xs sm:text-sm" aria-label="Filter by vocabulary tier">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Words</SelectItem>
                    <SelectItem value="common">Common Words</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select
                  value={sort}
                  onValueChange={(val) => {
                    setSort(val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9 w-[140px] text-xs sm:text-sm" aria-label="Sort words">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpha-asc">A to Z</SelectItem>
                    <SelectItem value="alpha-desc">Z to A</SelectItem>
                    <SelectItem value="score-desc">Highest Score</SelectItem>
                    <SelectItem value="length-desc">Longest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* Reset button */}
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                    title="Reset all search and filter options"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Reset
                  </button>
                )}
              </div>

              {/* Status and copy bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                <div className="text-xs text-muted-foreground sm:text-sm" role="status" aria-live="polite">
                  {total > 0 ? (
                    <>
                      Showing <span className="font-semibold text-foreground">{startItem}–{endItem}</span> of{' '}
                      <span className="font-semibold text-foreground">{total.toLocaleString()}</span> words
                      {mode === 'common' && <span className="ml-1 text-xs text-primary font-medium">(Common words)</span>}
                    </>
                  ) : (
                    <span>0 words match your search</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={total === 0}
                    onClick={copyPage}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]"
                    title="Copy currently visible page of words"
                  >
                    {copied === 'page' ? (
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copied === 'page' ? 'Copied page' : `Copy page (${result.items.length})`}
                  </button>

                  <button
                    type="button"
                    disabled={total === 0}
                    onClick={copyAll}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]"
                    title="Copy all matching words in this list"
                  >
                    {copied === 'all' ? (
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copied === 'all'
                      ? 'Copied all'
                      : `Copy all (${total > 5000 ? 'first 5,000' : total.toLocaleString()})`}
                  </button>
                </div>
              </div>

              {/* Word Results Grid */}
              <div className="mt-4">
                {total === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
                    <Search className="mb-2 h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
                    <p className="text-base font-semibold text-foreground">No matching words found</p>
                    <p className="mt-1 max-w-md text-xs text-muted-foreground sm:text-sm">
                      No words in this list matched your search or filter criteria. Try clearing your search keyword,
                      selecting &ldquo;All Letters&rdquo;, or switching to &ldquo;All Words&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset Filters
                    </button>
                  </div>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {result.items.map((w) => (
                      <li key={w}>
                        <WordChip word={w} showScore />
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pagination controls */}
              {result.totalPages > 1 && (
                <nav
                  className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"
                  aria-label="Word list pagination"
                >
                  <div className="text-xs text-muted-foreground">
                    Page <span className="font-semibold text-foreground">{result.page}</span> of{' '}
                    <span className="font-semibold text-foreground">{result.totalPages}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={result.page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="inline-flex min-h-[38px] sm:min-h-[40px] items-center gap-1 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
                    </button>
                    {result.totalPages > 2 && (
                      <div className="hidden sm:flex items-center gap-1">
                        {pageNumbers.map((p, idx) =>
                          p === '...' ? (
                            <span key={`ellipsis-${idx}`} className="px-1 text-xs text-muted-foreground">
                              …
                            </span>
                          ) : (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPage(p)}
                              className={`inline-flex min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                p === result.page
                                  ? 'bg-primary text-primary-foreground font-semibold'
                                  : 'border border-border bg-card text-foreground hover:bg-secondary'
                              }`}
                              aria-label={`Go to page ${p}`}
                              aria-current={p === result.page ? 'page' : undefined}
                            >
                              {p}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      disabled={result.page >= result.totalPages}
                      onClick={() => setPage((p) => Math.min(result.totalPages, p + 1))}
                      className="inline-flex min-h-[38px] sm:min-h-[40px] items-center gap-1 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
                      aria-label="Next page"
                    >
                      Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </div>
        )}
      </ToolShell>
    </>
  );
}

export { Results };
