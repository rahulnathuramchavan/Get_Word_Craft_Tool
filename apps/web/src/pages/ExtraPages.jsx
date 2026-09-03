import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle, Check, Copy, Dices, Eye, EyeOff, Loader2, Search,
} from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import ToolShell from '@/components/ToolShell';
import { Tile } from '@/components/TileInput';
import Results, { WordChip } from '@/components/Results';
import useDictionary from '@/hooks/useDictionary';
import { randomWord, scrambleWord } from '@/lib/dictionary';
import { copyText } from '@/lib/clipboard';
import { TOOLS } from '@/lib/tools';
import { SITE_URL, webApplicationLd, breadcrumbLd, faqLd } from '@/lib/seo';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <title>Word Scramble Generator — Make Printable Puzzles | WordCraft Tool</title>
        <meta name="description" content="Generate word scrambles from real dictionary words for classrooms, parties, and puzzle sheets. Choose a difficulty, copy, and print. Free and private." />
        <link rel="canonical" href={`${SITE_URL}/scramble-generator`} />
      </Helmet>
      <Seo title="Word Scramble Generator — WordCraft Tool" description="Generate word scrambles from real dictionary words." url={`${SITE_URL}/scramble-generator`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Word Scramble Generator', path: '/scramble-generator', description: 'Generate word scramble puzzles from real dictionary words.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Scramble Generator', path: '/scramble-generator' }]),
        faqLd(SG_FAQS),
      ]} />
      <ToolShell
        title="Word Scramble Generator"
        description="Create a word scramble from a real dictionary word — perfect for spelling practice, worksheets, and game nights. Pick a difficulty and generate as many as you like."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Scramble Generator' }]}
        faqs={SG_FAQS}
        related={related('/scramble-generator')}
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
    q: 'Why learn two-letter words?',
    a: 'Short words are the highest-leverage plays in tile games: they slot into tight board spaces, parallel existing words, and turn awkward letters like Q, X, and Z into points.',
  },
  {
    q: 'How are these lists generated?',
    a: 'Every list is computed live in your browser from the same open ENABLE word list that powers our tools — nothing is hand-picked or hidden.',
  },
];

const LIST_TABS = [
  { id: 'two', label: 'Two-letter words' },
  { id: 'three', label: 'Three-letter words' },
  { id: 'q-no-u', label: 'Q without U' },
  { id: 'power', label: 'J, Q, X, Z words' },
  { id: 'vowels', label: 'Vowel-heavy words' },
];

export function WordListsPage() {
  const { status, dict, error, retry } = useDictionary();
  const [copied, setCopied] = useState('');

  const lists = useMemo(() => {
    if (!dict) return null;
    const vowelCount = (w) => (w.match(/[aeiou]/g) || []).length;
    return {
      two: dict.byLength.get(2) || [],
      three: dict.byLength.get(3) || [],
      'q-no-u': dict.words.filter((w) => w.includes('q') && !w.includes('qu')),
      power: dict.words.filter((w) => /[jqxz]/.test(w) && w.length <= 6),
      vowels: dict.words.filter((w) => w.length >= 4 && w.length <= 7 && vowelCount(w) / w.length >= 0.6),
    };
  }, [dict]);

  const copyList = async (id) => {
    if (!lists) return;
    const ok = await copyText(lists[id].join(', '));
    if (ok) { setCopied(id); window.setTimeout(() => setCopied(''), 1600); }
  };

  return (
    <>
      <Helmet>
        <title>Word Lists — Two-Letter Words, Q Without U & More | WordCraft Tool</title>
        <meta name="description" content="Essential word lists for word-game players: every two- and three-letter word, Q-without-U words, high-value J/Q/X/Z words, and vowel dumps. Free and copyable." />
        <link rel="canonical" href={`${SITE_URL}/word-lists`} />
      </Helmet>
      <Seo title="Word Lists — WordCraft Tool" description="Two-letter words, Q without U, high-value letters, and vowel-heavy lists." url={`${SITE_URL}/word-lists`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Word Lists', path: '/word-lists', description: 'Essential word lists for word-game players, computed from an open word list.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Word Lists', path: '/word-lists' }]),
        faqLd(WL_FAQS),
      ]} />
      <ToolShell
        title="Word Lists"
        description="The lists serious players memorize: every legal two- and three-letter word, Q-without-U lifelines, high-value letter words, and vowel-heavy dumps. Copy any list with one tap."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Word Lists' }]}
        faqs={WL_FAQS}
        related={related('/word-lists')}
      >
        {status === 'loading' && (
          <p className="flex items-center gap-2 rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground" role="status">
            <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" /> Loading the word list…
          </p>
        )}
        {status === 'error' && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6" role="alert">
            <p className="text-sm text-destructive">{error}</p>
            <button type="button" onClick={retry} className="mt-2 text-sm font-semibold text-foreground underline">Try again</button>
          </div>
        )}
        {status === 'ready' && lists && (
          <Tabs defaultValue="two">
            <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
              {LIST_TABS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs sm:text-sm">{t.label}</TabsTrigger>
              ))}
            </TabsList>
            {LIST_TABS.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground" role="status">
                      <span className="font-semibold text-foreground">{lists[t.id].length.toLocaleString()}</span> words
                      {lists[t.id].length > 400 && ' · showing the first 400'}
                    </p>
                    <button
                      type="button" onClick={() => copyList(t.id)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
                    >
                      {copied === t.id ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                      {copied === t.id ? 'Copied' : 'Copy list'}
                    </button>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {lists[t.id].slice(0, 400).map((w) => <li key={w}><WordChip word={w} showScore={false} /></li>)}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </ToolShell>
    </>
  );
}

export { Results };
