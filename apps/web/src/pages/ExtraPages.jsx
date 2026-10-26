import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle, Check, ChevronLeft, ChevronRight, Copy, Dices, Eye, EyeOff, Loader2, RotateCcw, Search, X,
} from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import ToolShell from '@/components/ToolShell';
import { Tile } from '@/components/TileInput';
import Results, { WordChip } from '@/components/Results';
import useDictionary from '@/hooks/useDictionary';
import { randomWord, scrambleWord, browseWordList } from '@/lib/dictionary';
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

const related = (path) => TOOLS.filter((t) => t.path !== path).slice(0, 4);

/* ---------------- Scramble Generator ---------------- */

const SG_FAQS = [
  {
    q: 'What is a word scramble?',
    a: 'A word scramble mixes the letters of a word into a new order — "planet" becomes "lptena" — and the solver works out the original word. Teachers use them for spelling practice and they are a party-game staple.',
  },
  {
    q: 'Are the scrambled words real dictionary words?',
    a: 'Yes. Every scramble starts from a common English word in our open word list, and the letters are shuffled until they differ from the original.',
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
    a: 'Definitions are fetched live from the Free Dictionary API (dictionaryapi.dev), an open community-built dictionary. Word validity in our tools comes from the separate ENABLE word list, so a valid game word may occasionally lack a definition entry.',
  },
  {
    q: 'Why did my word return no definition?',
    a: 'The open dictionary covers most everyday English but can miss very rare, archaic, or newly coined words. Try a different spelling or check the word in the Word Lists tool.',
  },
];

export function DefinitionPage() {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState(() => searchParams.get('word') || '');
  const [state, setState] = useState({ status: 'idle', entries: [], word: '' });

  const lookup = useCallback(async (word) => {
    const clean = word.trim().toLowerCase().replace(/^[^a-z]+/, '').replace(/[^a-z\-']+$/, '');
    if (!/^[a-z][a-z\-']*$/.test(clean)) {
      setState({ status: 'invalid', entries: [], word: clean });
      return;
    }
    setState({ status: 'loading', entries: [], word: clean });

    // Helper: fetch with an 8-second timeout
    const fetchWithTimeout = (url, ms = 8000) => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), ms);
      return fetch(url, { signal: controller.signal }).finally(() => window.clearTimeout(timer));
    };

    try {
      let res;
      try {
        res = await fetchWithTimeout(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`,
        );
      } catch {
        // Primary API unreachable — try Datamuse as fallback
        const fallback = await fetchWithTimeout(
          `https://api.datamuse.com/words?sp=${encodeURIComponent(clean)}&md=d&max=1`,
        );
        if (!fallback.ok) throw new Error('fallback failed');
        const fallbackData = await fallback.json();
        if (!fallbackData.length || !fallbackData[0].defs?.length) {
          setState({ status: 'empty', entries: [], word: clean });
          return;
        }
        // Shape Datamuse response to match dictionaryapi format
        const defs = fallbackData[0].defs.map((d) => {
          const [pos, ...rest] = d.split('\t');
          return { partOfSpeech: pos, definitions: [{ definition: rest.join(' ') }] };
        });
        setState({
          status: 'ready',
          entries: [{ word: clean, meanings: defs, phonetics: [] }],
          word: clean,
        });
        return;
      }

      if (res.status === 404) {
        setState({ status: 'empty', entries: [], word: clean });
        return;
      }
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setState({ status: 'ready', entries: Array.isArray(data) ? data : [], word: clean });
    } catch (err) {
      const isTimeout = err?.name === 'AbortError';
      setState({
        status: 'error',
        entries: [],
        word: clean,
        errorMsg: isTimeout
          ? 'The request timed out. Check your connection and try again.'
          : 'The dictionary service could not be reached. Check your connection and try again.',
      });
    }
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
        <title>Definition Finder — Meanings, Parts of Speech & Examples | WordCraft Tool</title>
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
            <p className="rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
              Type a word above and press Define. Tip: every word in our tool results links here automatically.
            </p>
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
            <p className="rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted-foreground" role="status">
              No definition found for “{state.word}”. It may be very rare, newly coined, or spelled differently.
            </p>
          )}
          {state.status === 'ready' && (
            <div className="grid gap-4">
              {state.entries.map((entry, i) => (
                <article key={i} className="rounded-xl border border-border bg-background p-5">
                  <h2 className="font-display text-2xl font-semibold text-foreground">{entry.word}</h2>
                  {entry.phonetic && <p className="mt-1 text-sm text-muted-foreground">{entry.phonetic}</p>}
                  {(entry.meanings || []).map((m, j) => (
                    <section key={j} className="mt-4">
                      <h3 className="text-sm font-semibold italic text-primary">{m.partOfSpeech}</h3>
                      <ol className="mt-2 list-decimal space-y-2 pl-5">
                        {(m.definitions || []).slice(0, 4).map((d, k) => (
                          <li key={k} className="text-sm leading-relaxed text-foreground">
                            {d.definition}
                            {d.example && <span className="block text-muted-foreground">“{d.example}”</span>}
                          </li>
                        ))}
                      </ol>
                      {m.synonyms?.length > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Synonyms: {m.synonyms.slice(0, 6).join(', ')}
                        </p>
                      )}
                    </section>
                  ))}
                </article>
              ))}
              <p className="text-xs text-muted-foreground">
                Definitions from the Free Dictionary API (dictionaryapi.dev), an open community dictionary.
              </p>
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
                      className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
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
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
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
                      className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
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
