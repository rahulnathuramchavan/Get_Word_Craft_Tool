import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check, Copy, Loader2, Search } from 'lucide-react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { scoreWord } from '@/lib/dictionary';
import { copyText } from '@/lib/clipboard';

export function WordChip({ word, showScore = true }) {
  return (
    <Link
      to={`/definition-finder?word=${encodeURIComponent(word)}`}
      className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:bg-accent/50"
      title={`Look up “${word}”`}
    >
      {word}
      {showScore && (
        <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-secondary-foreground">
          {scoreWord(word)}
        </span>
      )}
    </Link>
  );
}

export default function Results({
  status, error, onRetry, words = [], total = 0,
  emptyMessage = 'No words match those filters. Try removing a filter or adding a wildcard.',
  idleMessage = 'Enter your letters above and press Search to see matching words.',
  sort, onSortChange, showSort = true, showScore = true,
}) {
  const [copied, setCopied] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-6 text-muted-foreground" role="status">
        <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
        <span className="text-sm font-medium">Loading the word list…</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-6" role="alert">
        <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Something went wrong
        </p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (status === 'idle') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-background p-6 text-muted-foreground">
        <Search className="h-5 w-5 text-primary" aria-hidden="true" />
        <span className="text-sm">{idleMessage}</span>
      </div>
    );
  }

  if (!words.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted-foreground" role="status">
        {emptyMessage}
      </div>
    );
  }

  const handleCopyAll = async () => {
    const ok = await copyText(words.join(', '));
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" role="status">
          <span className="font-semibold text-foreground">{total.toLocaleString()}</span>{' '}
          {total === 1 ? 'word' : 'words'} found
          {total > words.length && ` · showing the first ${words.length.toLocaleString()}`}
        </p>
        <div className="flex items-center gap-2">
          {showSort && (
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="h-9 w-[150px] bg-card text-sm" aria-label="Sort results">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="length-desc">Longest first</SelectItem>
                <SelectItem value="length-asc">Shortest first</SelectItem>
                <SelectItem value="score">Highest score</SelectItem>
                <SelectItem value="alpha">A to Z</SelectItem>
              </SelectContent>
            </Select>
          )}
          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
          >
            {copied ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy all'}
          </button>
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {words.map((w) => (
          <li key={w}><WordChip word={w} showScore={showScore} /></li>
        ))}
      </ul>
    </div>
  );
}
