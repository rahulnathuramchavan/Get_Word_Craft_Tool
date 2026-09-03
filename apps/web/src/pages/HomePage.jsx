import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Keyboard, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import AdSlot from '@/components/AdSlot';
import TileInput, { Tile } from '@/components/TileInput';
import { WordChip } from '@/components/Results';
import { FaqSection } from '@/components/ToolShell';
import useDictionary from '@/hooks/useDictionary';
import { findWords } from '@/lib/dictionary';
import { TOOLS } from '@/lib/tools';
import { ARTICLES } from '@/pages/LearnPage';
import {
  SITE_URL, SITE_NAME, websiteLd, organizationLd, webPageLd, faqLd,
} from '@/lib/seo';

const HOME_FAQS = [
  {
    q: 'Is WordCraft Tool really free?',
    a: 'Yes. Every tool on the site — the Word Finder, Unscrambler, Anagram Solver, Wordle Helper, Crossword Finder, Scramble Generator, Definition Finder, and Word Lists — is completely free, with no accounts, trials, or paywalls.',
  },
  {
    q: 'Which word list do you use?',
    a: 'Our tools search the public-domain ENABLE word list, a standard reference of more than 437,673 English words used by many word games, plus a common-English frequency layer for the "Common words" mode. No list is perfect: very new words, some proper nouns, and regional spellings may be missing, and a game\'s official dictionary may differ slightly.',
  },
  {
    q: 'How do wildcards work?',
    a: 'Type a question mark (?) anywhere a letter is unknown. In the Word Finder and Unscrambler a ? acts as a blank tile that can become any letter; in the Crossword Finder it marks a square you have not filled yet.',
  },
  {
    q: 'Do you store my searches or personal data?',
    a: 'No. Searches run entirely in your browser and are never sent to our servers. We store no personal data; the only thing saved is your own preference (such as dictionary mode) in your browser\'s local storage, which you can clear at any time.',
  },
  {
    q: 'Can I use these tools for Scrabble or Words With Friends?',
    a: 'Yes — the word list and tile scores follow the classic English letter values. Keep in mind that each game publisher maintains its own official dictionary, so a small number of words may not be accepted by every game.',
  },
];

function QuickFinder() {
  const { status, dict, error, retry } = useDictionary();
  const [letters, setLetters] = useState('');
  const [query, setQuery] = useState(null);
  const [formError, setFormError] = useState('');

  const result = useMemo(
    () => (dict && query ? findWords(dict, { letters: query, sort: 'score' }) : null),
    [dict, query],
  );

  const search = () => {
    if (letters.replace(/\?/g, '').length < 2) {
      setFormError('Enter at least two letters. Use ? for a blank tile.');
      return;
    }
    setFormError('');
    setQuery(letters);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-lg shadow-primary/5 sm:p-6">
      <TileInput
        id="hero-letters"
        label="Your letters"
        hint="Up to 15 letters. Use ? for blank tiles — for example: t?mes"
        value={letters}
        onChange={setLetters}
        onEnter={search}
        error={formError}
        placeholder="e.g. t?mes"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={search}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
        >
          Find words <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        {status === 'loading' && (
          <span className="text-sm text-muted-foreground" role="status">Loading the word list…</span>
        )}
      </div>

      {status === 'error' && (
        <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4" role="alert">
          <p className="text-sm text-destructive">{error}</p>
          <button type="button" onClick={retry} className="mt-2 text-sm font-semibold text-foreground underline">
            Try again
          </button>
        </div>
      )}

      {result && (
        <div className="mt-5 border-t border-border pt-4" role="status">
          {result.total === 0 ? (
            <p className="text-sm text-muted-foreground">
              No words can be made from those letters. Try adding a wildcard (?).
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Top matches by tile score:
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {result.results.slice(0, 10).map((w) => (
                  <li key={w}><WordChip word={w} /></li>
                ))}
              </ul>
              <Link
                to={`/word-finder?letters=${encodeURIComponent(query)}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4"
              >
                See all {result.total.toLocaleString()} words in the Word Finder
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const HERO_TILES = [
  { char: 'W', top: '8%', left: '4%', rotate: '-8deg', delay: '0s' },
  { char: 'O', top: '18%', right: '6%', rotate: '6deg', delay: '1.2s' },
  { char: 'R', bottom: '22%', left: '8%', rotate: '5deg', delay: '0.6s' },
  { char: 'D', bottom: '12%', right: '10%', rotate: '-6deg', delay: '1.8s' },
];

export default function HomePage() {
  const { dict } = useDictionary();

  return (
    <>
      <Helmet>
        <title>WordCraft Tool — Find Better Words, Solve Puzzles Faster</title>
        <meta
          name="description"
          content="Free word-game toolkit: word finder, unscrambler, anagram solver, Wordle helper, crossword finder, definitions, and word lists. Fast, private, no sign-up."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
      </Helmet>
      <Seo
        title="WordCraft Tool — Find Better Words, Solve Puzzles Faster"
        description="Free word finder, unscrambler, anagram solver, Wordle helper, and more. Fast, private, no sign-up."
        url={`${SITE_URL}/`}
        siteName={SITE_NAME}
      />
      <JsonLd data={[
        websiteLd,
        organizationLd,
        webPageLd({
          title: 'WordCraft Tool — Find Better Words, Solve Puzzles Faster',
          description: 'Free word-game toolkit with a word finder, unscrambler, anagram solver, Wordle helper, crossword finder, definitions, and word lists.',
          path: '/',
        }),
        faqLd(HOME_FAQS),
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          {HERO_TILES.map((t) => (
            <span
              key={t.char}
              className="animate-drift absolute opacity-20"
              style={{
                top: t.top, left: t.left, right: t.right, bottom: t.bottom,
                '--tile-rotate': t.rotate, animationDelay: t.delay,
              }}
            >
              <Tile char={t.char} size="lg" variant={t.char === 'O' ? 'amber' : 'navy'} />
            </span>
          ))}
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Free forever · No sign-up
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find better words.{' '}
              <span className="relative inline-block">
                Solve puzzles
                <span className="absolute inset-x-0 bottom-1 -z-10 h-3 -rotate-1 rounded-sm bg-primary/40" aria-hidden="true" />
              </span>{' '}
              faster.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Eight fast, free tools built on a 437,673-word open dictionary — unscramble racks,
              crack crosswords, rescue your Wordle streak, and look up any definition.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" /> Private by design
              </li>
              <li className="flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-primary" aria-hidden="true" /> Keyboard friendly
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" /> Open word list
              </li>
            </ul>
          </div>
          <QuickFinder />
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="tools-heading" className="border-t border-border bg-card/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <Reveal>
            <h2 id="tools-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Every word tool in one place
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Each tool supports duplicate letters, ? wildcards, length limits, prefixes,
              suffixes, and dictionary modes — with scores and definitions a tap away.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t, i) => (
              <Reveal as="li" key={t.path} delay={i * 0.05}>
                <Link
                  to={t.path}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <t.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-4 font-display text-lg font-semibold text-foreground">{t.name}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{t.blurb}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    Open tool
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <Reveal>
            <h2 id="how-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground">
              How it works
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                n: '1',
                title: 'Type what you know',
                text: 'Enter the letters on your rack, a crossword pattern, or the clues from your Wordle grid. Use ? wherever a letter is unknown.',
              },
              {
                n: '2',
                title: 'Refine with filters',
                text: 'Narrow by length, prefix, suffix, required letters, or switch to the Common words dictionary for everyday vocabulary.',
              },
              {
                n: '3',
                title: 'Play your best word',
                text: 'Sort by length or tile score, check a definition, and copy your shortlist — all without leaving the page.',
              },
            ].map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.08} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-5xl font-semibold text-primary/50" aria-hidden="true">{step.n}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust */}
      <section aria-labelledby="trust-heading" className="border-t border-border bg-foreground text-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <Reveal>
            <h2 id="trust-heading" className="font-display text-3xl font-semibold tracking-tight">
              Built to be trusted
            </h2>
            <p className="mt-3 max-w-2xl text-background/70">
              No accounts, no tracking of your searches, no intrusive popups. Just a fast,
              accessible toolkit that respects your time and your privacy.
            </p>
          </Reveal>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-background/70">Words in the dictionary</dt>
              <dd className="mt-1 font-display text-4xl font-semibold text-primary">
                <CountUp value={dict ? dict.size : 437673} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-background/70">Free tools</dt>
              <dd className="mt-1 font-display text-4xl font-semibold text-primary">
                <CountUp value={8} />
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-background/70">Accounts required</dt>
              <dd className="mt-1 font-display text-4xl font-semibold text-primary">0</dd>
            </div>
          </dl>
          <ul className="mt-10 grid gap-4 text-sm leading-relaxed text-background/80 md:grid-cols-3">
            <li className="rounded-xl border border-background/15 p-4">
              <strong className="block text-background">Open data, documented limits.</strong>
              Our word list is the public-domain ENABLE list. It is huge but not identical to any
              single game&apos;s official dictionary — we say so plainly.
            </li>
            <li className="rounded-xl border border-background/15 p-4">
              <strong className="block text-background">Accessible by default.</strong>
              Labeled inputs, visible focus states, full keyboard support, and contrast-checked
              colors on every page.
            </li>
            <li className="rounded-xl border border-background/15 p-4">
              <strong className="block text-background">Honest advertising.</strong>
              Ad spaces are clearly labeled and reserve their height up front, so the page never
              jumps while you read.
            </li>
          </ul>
        </div>
      </section>

      {/* Learn */}
      <section aria-labelledby="learn-heading" className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="learn-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  Learn the craft
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Short, practical guides that make you a stronger word-game player.
                </p>
              </div>
              <Link to="/learn" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4">
                All guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <Reveal as="li" key={a.slug} delay={i * 0.06}>
                <Link
                  to={`/learn/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{a.tag}</span>
                  <span className="mt-2 font-display text-xl font-semibold leading-snug text-foreground">{a.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.description}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    Read guide
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4">
        <AdSlot minHeight={90} />
      </div>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-6 max-w-3xl">
          <FaqSection faqs={HOME_FAQS} />
        </div>
      </section>
    </>
  );
}
