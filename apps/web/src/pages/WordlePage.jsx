import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import ToolShell from '@/components/ToolShell';
import { WordChip } from '@/components/Results';
import useDictionary from '@/hooks/useDictionary';
import { wordleFilter } from '@/lib/dictionary';
import { TOOLS } from '@/lib/tools';
import { SITE_URL, webApplicationLd, breadcrumbLd, faqLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

const STATE_ORDER = ['unknown', 'excluded', 'misplaced', 'correct'];
const STATE_LABELS = {
  unknown: 'unknown', excluded: 'not in the word', misplaced: 'in the word, wrong spot', correct: 'correct spot',
};
const CELL_STYLES = {
  unknown: 'border-input bg-background text-foreground',
  excluded: 'border-slate-400 bg-slate-500 text-white',
  misplaced: 'border-amber-500 bg-amber-500 text-white',
  correct: 'border-emerald-600 bg-emerald-600 text-white',
};

const emptyGrid = () => Array.from({ length: 6 }, () => (
  Array.from({ length: 5 }, () => ({ letter: '', state: 'unknown' }))
));

const FAQS = [
  {
    q: 'How do I use the Wordle Helper grid?',
    a: 'Type a guess into a row, then click each tile (or press Enter while it is focused) to cycle its color: gray for letters not in the word, amber for letters in the word but in the wrong spot, and green for letters in the correct spot. The suggestion list updates with every change.',
  },
  {
    q: 'Is the grid keyboard accessible?',
    a: 'Yes. Tab to the grid, type letters to fill cells, use the arrow keys to move between cells, Backspace to clear, and Enter or Space to change a tile\'s color. Every tile announces its row, column, letter, and color to screen readers.',
  },
  {
    q: 'How does the helper handle duplicate letters?',
    a: 'A gray tile only excludes a letter if that letter is not also marked green or amber somewhere else. This mirrors how the game treats repeated letters, though very rare edge cases can still need a human eye.',
  },
  {
    q: 'Is this an AI solver?',
    a: 'No. The helper filters a fixed, open word list against the clues you enter — straightforward pattern matching, not machine learning. The final guess is always yours.',
  },
];

export default function WordlePage() {
  const { status, dict, error, retry } = useDictionary();
  const [grid, setGrid] = useState(emptyGrid);
  const cellRefs = useRef([]);

  const suggestions = useMemo(() => {
    if (!dict) return null;
    const hasClue = grid.some((row) => row.some((c) => c.letter));
    if (!hasClue) return null;
    return wordleFilter(dict, grid);
  }, [dict, grid]);

  const focusCell = (index) => {
    const el = cellRefs.current[index];
    if (el) el.focus();
  };

  const updateCell = (r, c, patch) => {
    setGrid((g) => g.map((row, ri) => (
      ri === r ? row.map((cell, ci) => (ci === c ? { ...cell, ...patch } : cell)) : row
    )));
  };

  const cycleState = (r, c) => {
    const cell = grid[r][c];
    if (!cell.letter) return;
    const next = STATE_ORDER[(STATE_ORDER.indexOf(cell.state) + 1) % STATE_ORDER.length];
    updateCell(r, c, { state: next });
  };

  const handleKeyDown = useCallback((e) => {
    const r = Number(e.currentTarget.dataset.row);
    const c = Number(e.currentTarget.dataset.col);
    const index = r * 5 + c;
    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      updateCell(r, c, { letter: e.key.toLowerCase() });
      if (c < 4) focusCell(index + 1);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (grid[r][c].letter) updateCell(r, c, { letter: '', state: 'unknown' });
      else if (c > 0) focusCell(index - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycleState(r, c);
    } else if (e.key === 'ArrowRight' && c < 4) { e.preventDefault(); focusCell(index + 1); }
    else if (e.key === 'ArrowLeft' && c > 0) { e.preventDefault(); focusCell(index - 1); }
    else if (e.key === 'ArrowDown' && r < 5) { e.preventDefault(); focusCell(index + 5); }
    else if (e.key === 'ArrowUp' && r > 0) { e.preventDefault(); focusCell(index - 5); }
  }, [grid, cycleState, updateCell, focusCell]);

  return (
    <>
      <Helmet>
        <title>Wordle Helper — Narrow Down Today’s Answer | WordCraft Tool</title>
        <meta name="description" content="Enter your Wordle guesses, mark green, amber, and gray tiles on an accessible keyboard-friendly grid, and see every word that still fits. Free and private." />
        <link rel="canonical" href={`${SITE_URL}/wordle-helper`} />
      </Helmet>
      <Seo title="Wordle Helper — WordCraft Tool" description="Mark your Wordle clues and see every word that still fits." url={`${SITE_URL}/wordle-helper`} siteName="WordCraft Tool" />
      <JsonLd data={[
        webApplicationLd({ name: 'Wordle Helper', path: '/wordle-helper', description: 'Filter possible Wordle answers from your green, amber, and gray clues.' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Wordle Helper', path: '/wordle-helper' }]),
        faqLd(FAQS),
      ]} />
      <ToolShell
        title="Wordle Helper"
        description="Type each guess into the grid, mark the tile colors the game gave you, and watch the list of possible answers shrink. This is pattern matching against an open word list — not an AI solver — so the winning instinct stays yours."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Wordle Helper' }]}
        faqs={FAQS}
        related={TOOLS.filter((t) => t.path !== '/wordle-helper').slice(0, 4)}
      >
        <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
          <div>
            <div
              role="group"
              aria-label="Wordle clue grid. Type letters, use arrow keys to move, and press Enter to change a tile's color."
              className="grid gap-1.5"
            >
              {grid.map((row, r) => (
                <div key={r} className="flex gap-1.5" role="group" aria-label={`Guess ${r + 1}`}>
                  {row.map((cell, c) => {
                    const index = r * 5 + c;
                    return (
                      <button
                        key={c}
                        ref={(el) => { cellRefs.current[index] = el; }}
                        type="button"
                        onClick={() => cycleState(r, c)}
                        onKeyDown={handleKeyDown}
                        data-row={r}
                        data-col={c}
                        aria-label={`Guess ${r + 1}, letter ${c + 1}: ${cell.letter ? cell.letter.toUpperCase() : 'empty'}, ${STATE_LABELS[cell.state]}. Press Enter to change color.`}
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-md border-2 text-xl font-bold uppercase shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:h-14 sm:w-14',
                          CELL_STYLES[cell.state],
                        )}
                      >
                        {cell.letter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded-sm bg-emerald-600" aria-hidden="true" /> Correct spot</span>
              <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded-sm bg-amber-500" aria-hidden="true" /> Wrong spot</span>
              <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded-sm bg-slate-500" aria-hidden="true" /> Not in word</span>
            </div>
            <button
              type="button"
              onClick={() => setGrid(emptyGrid())}
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Clear grid
            </button>
          </div>

          <div aria-live="polite">
            {status === 'loading' && (
              <p className="rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground" role="status">
                Loading the word list…
              </p>
            )}
            {status === 'error' && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6" role="alert">
                <p className="text-sm text-destructive">{error}</p>
                <button type="button" onClick={retry} className="mt-2 text-sm font-semibold text-foreground underline">Try again</button>
              </div>
            )}
            {status === 'ready' && !suggestions && (
              <p className="rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
                Enter a guess on the grid and mark its colors — possible answers will appear here.
              </p>
            )}
            {status === 'ready' && suggestions && (
              <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
                <p className="text-sm text-muted-foreground" role="status">
                  <span className="font-semibold text-foreground">{suggestions.length.toLocaleString()}</span>{' '}
                  {suggestions.length === 1 ? 'word still fits' : 'words still fit'}
                  {suggestions.length > 60 && ' · showing 60'}
                </p>
                {suggestions.length === 0 ? (
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium text-destructive" role="alert">
                    <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Nothing matches those clues. Check that gray letters are not also marked green or amber elsewhere, and that each color is on the right tile.
                  </p>
                ) : (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {suggestions.slice(0, 60).map((w) => <li key={w}><WordChip word={w} showScore={false} /></li>)}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </ToolShell>
    </>
  );
}
