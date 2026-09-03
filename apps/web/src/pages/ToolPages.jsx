import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import ToolShell from '@/components/ToolShell';
import TileInput from '@/components/TileInput';
import Results, { WordChip } from '@/components/Results';
import useDictionary from '@/hooks/useDictionary';
import { findWords, exactAnagrams } from '@/lib/dictionary';
import { copyText } from '@/lib/clipboard';
import { TOOLS } from '@/lib/tools';
import {
  SITE_URL, webApplicationLd, breadcrumbLd, faqLd,
} from '@/lib/seo';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const related = (path) => TOOLS.filter((t) => t.path !== path).slice(0, 4);

function Field({ id, label, children, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputClass = 'h-11 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30';

function SearchButton({ onClick, label = 'Search' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
    >
      <Search className="h-4 w-4" aria-hidden="true" /> {label}
    </button>
  );
}

function ResetButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
    >
      <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
    </button>
  );
}

/* ---------------- Word Finder ---------------- */

const WF_FAQS = [
  {
    q: 'What is the difference between "Letters" and "Pattern"?',
    a: 'Letters is a rack: the tool finds words that can be built from those letters in any order, and a ? counts as a blank tile. Pattern is positional: c?t only returns three-letter words starting with c and ending with t.',
  },
  {
    q: 'Can I combine filters?',
    a: 'Yes. Every filter stacks. For example, letters "r?tain", starts with "re", and a maximum length of 7 finds short re- words you can build from that rack.',
  },
  {
    q: 'What does the Common words dictionary mode do?',
    a: 'It limits results to words that appear in a 10,000-word common-English frequency list, hiding rare and archaic words. The Full dictionary mode searches the complete 170,000+ word ENABLE list.',
  },
  {
    q: 'How are tile scores calculated?',
    a: 'Scores use the classic English letter values: common letters like E and A are worth 1 point, while Q and Z are worth 10. They are a guide to a word\'s value, not a guarantee of what any specific game will award.',
  },
];

export function WordFinderPage() {
  const { status, dict, error, retry } = useDictionary();
  const [searchParams] = useSearchParams();
  const initial = {
    letters: (searchParams.get('letters') || '').toLowerCase().replace(/[^a-z?]/g, ''),
    pattern: (searchParams.get('pattern') || '').toLowerCase().replace(/[^a-z?]/g, ''),
    startsWith: '', endsWith: '', contains: '', required: '',
    min: 'any', max: 'any', mode: 'all',
  };
  const [form, setForm] = useState(initial);
  const [query, setQuery] = useState(() => (
    initial.letters || initial.pattern ? { ...initial, sort: 'length-desc' } : null
  ));
  const [formError, setFormError] = useState('');

  const result = useMemo(() => {
    if (!dict || !query) return null;
    return findWords(dict, {
      letters: query.letters,
      pattern: query.pattern,
      startsWith: query.startsWith,
      endsWith: query.endsWith,
      contains: query.contains,
      required: query.required,
      minLen: query.min === 'any' ? 2 : Number(query.min),
      maxLen: query.max === 'any' ? 15 : Number(query.max),
      mode: query.mode,
      sort: query.sort,
    });
  }, [dict, query]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const search = () => {
    const hasCriterion = form.letters || form.pattern || form.startsWith
      || form.endsWith || form.contains || form.required;
    if (!hasCriterion) {
      setFormError('Enter letters, a pattern, or at least one filter before searching.');
      return;
    }
    setFormError('');
    setQuery({ ...form, sort: query?.sort || 'length-desc' });
  };

  const reset = () => {
    setForm({ letters: '', pattern: '', startsWith: '', endsWith: '', contains: '', required: '', min: 'any', max: 'any', mode: 'all' });
    setQuery(null);
    setFormError('');
  };

  const resultStatus = status === 'ready' ? (query ? 'ready' : 'idle') : status;

  return (
    <>
      <Helmet>
        <title>Word Finder — Search by Letters, Pattern, Prefix & Suffix | WordCraft Tool</title>
        <meta name="description" content="Find words from any rack of letters with wildcards, patterns, length limits, prefixes, suffixes, and dictionary modes. Free, fast, and private." />
        <link rel="canonical" href={`${SITE_URL}/word-finder`} />
      </Helmet>
      <Seo title="Word Finder — WordCraft Tool" description="Find words from any rack of letters with wildcards, patterns, and filters." url={`${SITE_URL}/word-finder`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Word Finder', path: '/word-finder', description: 'Find words from letters, patterns, prefixes, and suffixes with wildcard support.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Word Finder', path: '/word-finder' }]),
        faqLd(WF_FAQS),
      ]} />
      <ToolShell
        title="Word Finder"
        description="The all-in-one search: combine a letter rack, a positional pattern, prefixes, suffixes, and length limits to find exactly the word you need."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Word Finder' }]}
        faqs={WF_FAQS}
        related={related('/word-finder')}
      >
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <TileInput
              id="wf-letters" label="Letters (any order)" value={form.letters}
              onChange={set('letters')} onEnter={search} showRack
              hint="Your rack. Use ? for a blank tile." placeholder="e.g. r?tain"
            />
            <TileInput
              id="wf-pattern" label="Pattern (fixed positions)" value={form.pattern}
              onChange={set('pattern')} onEnter={search} showRack={false}
              hint="Use ? for unknown squares, e.g. c?t" placeholder="e.g. c?t"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="wf-starts" label="Starts with">
              <input id="wf-starts" className={inputClass} value={form.startsWith}
                onChange={(e) => set('startsWith')(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))} placeholder="re" />
            </Field>
            <Field id="wf-ends" label="Ends with">
              <input id="wf-ends" className={inputClass} value={form.endsWith}
                onChange={(e) => set('endsWith')(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))} placeholder="ing" />
            </Field>
            <Field id="wf-contains" label="Contains">
              <input id="wf-contains" className={inputClass} value={form.contains}
                onChange={(e) => set('contains')(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))} placeholder="ai" />
            </Field>
            <Field id="wf-required" label="Must include letters" hint="Every letter listed must appear in the word.">
              <input id="wf-required" className={inputClass} value={form.required}
                onChange={(e) => set('required')(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))} placeholder="qz" />
            </Field>
            <Field id="wf-min" label="Min length">
              <Select value={form.min} onValueChange={set('min')}>
                <SelectTrigger id="wf-min" className="h-11 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} letters</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field id="wf-max" label="Max length">
              <Select value={form.max} onValueChange={set('max')}>
                <SelectTrigger id="wf-max" className="h-11 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {[4, 5, 6, 7, 8, 9, 10, 12, 15].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} letters</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field id="wf-mode" label="Dictionary" hint="Common hides rare and archaic words.">
              <Select value={form.mode} onValueChange={set('mode')}>
                <SelectTrigger id="wf-mode" className="h-11 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Full dictionary</SelectItem>
                  <SelectItem value="common">Common words</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          {formError && <p role="alert" className="text-sm font-medium text-destructive">{formError}</p>}
          <div className="flex flex-wrap gap-3">
            <SearchButton onClick={search} label="Find words" />
            <ResetButton onClick={reset} />
          </div>
          <Results
            status={resultStatus} error={error} onRetry={retry}
            words={result?.results || []} total={result?.total || 0}
            sort={query?.sort || 'length-desc'}
            onSortChange={(sort) => setQuery((q) => (q ? { ...q, sort } : q))}
          />
        </div>
      </ToolShell>
    </>
  );
}

/* ---------------- Word Unscrambler ---------------- */

const WU_FAQS = [
  {
    q: 'Does the unscrambler handle duplicate letters?',
    a: 'Yes. If your rack has two Es, results only include words that use at most two Es. Every letter — including repeats — is counted.',
  },
  {
    q: 'What does the ? tile do?',
    a: 'A question mark is a blank tile that can stand in for any single letter. You can use more than one, though results grow quickly with each wildcard.',
  },
  {
    q: 'Why do I see words shorter than my rack?',
    a: 'The unscrambler finds every word your letters can build, not just the longest ones. Shorter words are often the highest-scoring plays in tight board positions.',
  },
];

export function UnscramblerPage() {
  const { status, dict, error, retry } = useDictionary();
  const [letters, setLetters] = useState('');
  const [query, setQuery] = useState(null);
  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (dict && query ? findWords(dict, { letters: query, sort: 'length-desc' }) : null),
    [dict, query],
  );

  const groups = useMemo(() => {
    if (!result) return [];
    const m = new Map();
    for (const w of result.results) {
      const arr = m.get(w.length);
      if (arr) arr.push(w); else m.set(w.length, [w]);
    }
    return [...m.entries()].sort((a, b) => b[0] - a[0]);
  }, [result]);

  const search = () => {
    if (letters.replace(/\?/g, '').length < 2) {
      setFormError('Enter at least two letters. Use ? for blank tiles.');
      return;
    }
    setFormError('');
    setQuery(letters);
  };

  const reset = () => { setLetters(''); setQuery(null); setFormError(''); };

  const copyAll = async () => {
    if (!result) return;
    const ok = await copyText(result.results.join(', '));
    if (ok) { setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  };

  const resultStatus = status === 'ready' ? (query ? 'ready' : 'idle') : status;

  return (
    <>
      <Helmet>
        <title>Word Unscrambler — Unscramble Letters Into Words | WordCraft Tool</title>
        <meta name="description" content="Unscramble any rack of letters into every word it can make. Supports duplicate letters and ? wildcards, grouped by word length. Free and private." />
        <link rel="canonical" href={`${SITE_URL}/word-unscrambler`} />
      </Helmet>
      <Seo title="Word Unscrambler — WordCraft Tool" description="Unscramble letters into every word they can make, grouped by length." url={`${SITE_URL}/word-unscrambler`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Word Unscrambler', path: '/word-unscrambler', description: 'Unscramble a rack of letters into every word it can make.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Word Unscrambler', path: '/word-unscrambler' }]),
        faqLd(WU_FAQS),
      ]} />
      <ToolShell
        title="Word Unscrambler"
        description="Enter your jumbled letters and see every word they can make, grouped from longest to shortest. Duplicate letters and ? blank tiles are fully supported."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Word Unscrambler' }]}
        faqs={WU_FAQS}
        related={related('/word-unscrambler')}
      >
        <div className="grid gap-5">
          <TileInput
            id="wu-letters" label="Letters to unscramble" value={letters}
            onChange={setLetters} onEnter={search} error={formError}
            hint="Up to 15 letters. Use ? for blank tiles." placeholder="e.g. eplpas"
          />
          <div className="flex flex-wrap gap-3">
            <SearchButton onClick={search} label="Unscramble" />
            <ResetButton onClick={reset} />
          </div>

          {resultStatus === 'ready' && result && result.total > 0 ? (
            <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground" role="status">
                  <span className="font-semibold text-foreground">{result.total.toLocaleString()}</span> words found
                  {result.total > result.results.length && ` · showing the first ${result.results.length.toLocaleString()}`}
                </p>
                <button
                  type="button" onClick={copyAll}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
                >
                  {copied ? 'Copied' : 'Copy all'}
                </button>
              </div>
              {groups.map(([len, words]) => (
                <section key={len} aria-label={`${len}-letter words`} className="mt-5">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {len}-letter words ({words.length})
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {words.map((w) => <li key={w}><WordChip word={w} showScore={false} /></li>)}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <Results
              status={resultStatus} error={error} onRetry={retry}
              words={[]} total={0}
              emptyMessage="No words can be made from those letters. Try adding a wildcard (?) or removing a letter."
              idleMessage="Enter your letters above and press Unscramble."
            />
          )}
        </div>
      </ToolShell>
    </>
  );
}

/* ---------------- Anagram Solver ---------------- */

const AN_FAQS = [
  {
    q: 'What counts as an anagram?',
    a: 'An anagram uses every letter you enter exactly once, rearranged. "listen" is an anagram of "silent". Words that use only some of your letters belong in the Word Unscrambler instead.',
  },
  {
    q: 'Can I solve anagrams with a missing letter?',
    a: 'Yes — enter a ? for each unknown letter and the solver returns every same-length word that fits, treating ? as any letter.',
  },
];

export function AnagramPage() {
  const { status, dict, error, retry } = useDictionary();
  const [input, setInput] = useState('');
  const [query, setQuery] = useState(null);
  const [formError, setFormError] = useState('');

  const results = useMemo(
    () => (dict && query ? exactAnagrams(dict, query).sort() : null),
    [dict, query],
  );

  const search = () => {
    if (input.replace(/\?/g, '').length < 2) {
      setFormError('Enter at least two letters. Use ? for unknown letters.');
      return;
    }
    setFormError('');
    setQuery(input);
  };

  const resultStatus = status === 'ready' ? (query ? 'ready' : 'idle') : status;

  return (
    <>
      <Helmet>
        <title>Anagram Solver — Find Exact Anagrams Instantly | WordCraft Tool</title>
        <meta name="description" content="Solve anagrams instantly: enter letters and find every word that uses them all exactly once. Wildcards supported. Free, fast, and private." />
        <link rel="canonical" href={`${SITE_URL}/anagram-solver`} />
      </Helmet>
      <Seo title="Anagram Solver — WordCraft Tool" description="Find every exact anagram of your letters, wildcards included." url={`${SITE_URL}/anagram-solver`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Anagram Solver', path: '/anagram-solver', description: 'Find exact anagrams that use every entered letter exactly once.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Anagram Solver', path: '/anagram-solver' }]),
        faqLd(AN_FAQS),
      ]} />
      <ToolShell
        title="Anagram Solver"
        description="Enter a word or jumble and find every exact anagram — words that use all of your letters exactly once. Add ? when a letter is unknown."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Anagram Solver' }]}
        faqs={AN_FAQS}
        related={related('/anagram-solver')}
      >
        <div className="grid gap-5">
          <TileInput
            id="an-letters" label="Word or letters" value={input}
            onChange={setInput} onEnter={search} error={formError}
            hint="Every letter is used exactly once. Use ? for unknown letters." placeholder="e.g. silent"
          />
          <div className="flex flex-wrap gap-3">
            <SearchButton onClick={search} label="Solve anagram" />
            <ResetButton onClick={() => { setInput(''); setQuery(null); setFormError(''); }} />
          </div>
          <Results
            status={resultStatus} error={error} onRetry={retry}
            words={results || []} total={results?.length || 0}
            showSort={false}
            emptyMessage="No exact anagrams found. Try the Word Unscrambler if shorter words are allowed."
            idleMessage="Enter a word or jumble above and press Solve anagram."
          />
        </div>
      </ToolShell>
    </>
  );
}

/* ---------------- Crossword Finder ---------------- */

const CW_FAQS = [
  {
    q: 'How do I enter a crossword pattern?',
    a: 'Type the letters you have and a ? for each empty square. For example, c?t?r matches "cater", "cider", and every other five-letter word with that shape.',
  },
  {
    q: 'Can I require a letter anywhere in the word?',
    a: 'Yes — use the "Must include letters" filter. It is handy when a crossing word tells you a letter exists somewhere but not exactly where.',
  },
];

export function CrosswordPage() {
  const { status, dict, error, retry } = useDictionary();
  const [pattern, setPattern] = useState('');
  const [required, setRequired] = useState('');
  const [mode, setMode] = useState('all');
  const [query, setQuery] = useState(null);
  const [formError, setFormError] = useState('');

  const result = useMemo(
    () => (dict && query ? findWords(dict, query) : null),
    [dict, query],
  );

  const search = () => {
    if (pattern.length < 2) {
      setFormError('Enter a pattern of at least two characters. Use ? for each empty square, e.g. c?t?r.');
      return;
    }
    setFormError('');
    setQuery({ pattern, required, mode, sort: 'alpha' });
  };

  const resultStatus = status === 'ready' ? (query ? 'ready' : 'idle') : status;

  return (
    <>
      <Helmet>
        <title>Crossword Finder — Solve Missing-Letter Patterns | WordCraft Tool</title>
        <meta name="description" content="Stuck on a crossword clue? Enter the letters you have with ? for empty squares and get every matching word. Free, fast, and private." />
        <link rel="canonical" href={`${SITE_URL}/crossword-finder`} />
      </Helmet>
      <Seo title="Crossword Finder — WordCraft Tool" description="Fill crossword blanks with pattern search like c?t?r." url={`${SITE_URL}/crossword-finder`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Crossword Finder', path: '/crossword-finder', description: 'Find words matching a crossword pattern with unknown squares.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Crossword Finder', path: '/crossword-finder' }]),
        faqLd(CW_FAQS),
      ]} />
      <ToolShell
        title="Crossword Finder"
        description="Enter the letters you already have, with a ? for each empty square, and get every word that fits the grid."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Crossword Finder' }]}
        faqs={CW_FAQS}
        related={related('/crossword-finder')}
      >
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <TileInput
              id="cw-pattern" label="Pattern" value={pattern}
              onChange={setPattern} onEnter={search} error={formError} showRack
              hint="Known letters plus ? for empty squares, e.g. c?t?r" placeholder="e.g. c?t?r"
            />
            <div className="grid gap-4">
              <Field id="cw-required" label="Must include letters" hint="Optional — letters that must appear somewhere.">
                <input id="cw-required" className={inputClass} value={required}
                  onChange={(e) => setRequired(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))} placeholder="e.g. n" />
              </Field>
              <Field id="cw-mode" label="Dictionary">
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger id="cw-mode" className="h-11 bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Full dictionary</SelectItem>
                    <SelectItem value="common">Common words</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <SearchButton onClick={search} label="Find matches" />
            <ResetButton onClick={() => { setPattern(''); setRequired(''); setQuery(null); setFormError(''); }} />
          </div>
          <Results
            status={resultStatus} error={error} onRetry={retry}
            words={result?.results || []} total={result?.total || 0}
            sort={query?.sort || 'alpha'}
            onSortChange={(sort) => setQuery((q) => (q ? { ...q, sort } : q))}
            emptyMessage="No words fit that pattern. Double-check the known letters, or switch to the full dictionary."
            idleMessage="Enter a pattern above and press Find matches."
          />
        </div>
      </ToolShell>
    </>
  );
}
