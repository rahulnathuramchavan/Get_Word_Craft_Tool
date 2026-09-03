import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TOOLS } from '@/lib/tools';
import { cn } from '@/lib/utils';

export function Logo({ className }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)} aria-label="WordCraft Tool home">
      <span className="flex h-9 w-9 rotate-[-4deg] items-center justify-center rounded-lg bg-primary shadow-sm">
        <span className="font-display text-lg font-bold text-primary-foreground">W</span>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        WordCraft <span className="text-primary">Tool</span>
      </span>
    </Link>
  );
}

const PRIMARY_NAV = [
  { to: '/word-finder', label: 'Word Finder' },
  { to: '/word-unscrambler', label: 'Unscrambler' },
  { to: '/wordle-helper', label: 'Wordle Helper' },
  { to: '/word-lists', label: 'Word Lists' },
];

const MORE_NAV = [
  { to: '/anagram-solver', label: 'Anagram Solver' },
  { to: '/crossword-finder', label: 'Crossword Finder' },
  { to: '/scramble-generator', label: 'Scramble Generator' },
  { to: '/definition-finder', label: 'Definition Finder' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Use' },
  { to: '/disclaimer', label: 'Disclaimer' },
];

const LEARN_LINKS = [
  { to: '/learn', label: 'All Guides' },
  { to: '/learn/unscramble-words-faster', label: 'Unscramble Words Faster' },
  { to: '/learn/wordle-opening-strategy', label: 'Wordle Opening Strategy' },
  { to: '/learn/two-letter-words', label: 'Two-Letter Words to Know' },
  { to: '/learn/wildcards-and-patterns', label: 'Wildcards & Patterns' },
];

function navLinkClass({ isActive }) {
  return cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground',
    isActive ? 'text-foreground underline decoration-primary decoration-2 underline-offset-8' : 'text-muted-foreground',
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                More tools <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {MORE_NAV.map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <Link to={item.to}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink to="/learn" className={navLinkClass}>Learn</NavLink>
            <Link
              to="/word-finder"
              className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:brightness-105 active:scale-[0.98]"
            >
              Find a word
            </Link>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto bg-background" aria-label="Site navigation">
              <Logo className="mb-6" />
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tools</p>
                {TOOLS.map((t) => (
                  <Link
                    key={t.path}
                    to={t.path}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    {t.name}
                  </Link>
                ))}
                <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Learn</p>
                {LEARN_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                ))}
                <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</p>
                {COMPANY_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Free, fast word tools for puzzle players, students, and writers.
                No accounts, no popups — just words.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Word list based on the public-domain ENABLE word list with a
                common-English frequency layer. Definitions courtesy of the
                Free Dictionary API.
              </p>
            </div>
            <nav aria-label="Tools">
              <p className="text-sm font-semibold text-foreground">Tools</p>
              <ul className="mt-3 space-y-2">
                {TOOLS.map((t) => (
                  <li key={t.path}>
                    <Link to={t.path} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Learn">
              <p className="text-sm font-semibold text-foreground">Learn</p>
              <ul className="mt-3 space-y-2">
                {LEARN_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Company">
              <p className="text-sm font-semibold text-foreground">Company</p>
              <ul className="mt-3 space-y-2">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Trademark notice: SCRABBLE® is a registered trademark of Hasbro, Inc. in the
              United States and Canada and of Mattel, Inc. elsewhere. WORDLE® is a registered
              trademark of The New York Times Company. Words With Friends® is a trademark of
              Zynga Inc. WordCraft Tool is an independent toolkit and is not affiliated with,
              endorsed by, or sponsored by any of these companies.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              © {new Date().getFullYear()} WordCraft Tool · getwordcraft.com · All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
