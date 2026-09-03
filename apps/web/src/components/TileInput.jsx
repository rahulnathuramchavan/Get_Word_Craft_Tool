import React from 'react';
import { cn } from '@/lib/utils';

export function Tile({ char, variant = 'navy', size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };
  const variants = {
    navy: 'bg-foreground text-background',
    amber: 'bg-primary text-primary-foreground',
    blank: 'border-2 border-dashed border-input bg-card text-muted-foreground',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md font-bold uppercase shadow-sm',
        sizes[size],
        variants[variant],
      )}
    >
      {char === '?' ? '?' : char}
    </span>
  );
}

export function TileRack({ value, className }) {
  const chars = value.split('');
  return (
    <div className={cn('flex min-h-[2.5rem] flex-wrap items-center gap-1.5', className)} aria-hidden="true">
      {chars.length === 0 ? (
        <span className="text-sm text-muted-foreground">Your letters will appear here as tiles</span>
      ) : (
        chars.map((c, i) => (
          <Tile key={`${c}-${i}`} char={c.toUpperCase()} variant={c === '?' ? 'amber' : 'navy'} />
        ))
      )}
    </div>
  );
}

export default function TileInput({
  id, label, hint, value, onChange, error, placeholder,
  maxLength = 15, allowWildcard = true, showRack = true, onEnter,
}) {
  const pattern = allowWildcard ? /[^a-z?]/g : /[^a-z]/g;
  const handleChange = (e) => {
    onChange(e.target.value.toLowerCase().replace(pattern, '').slice(0, maxLength));
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter(); }}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="h-12 rounded-lg border border-input bg-background px-4 text-lg font-medium tracking-wide text-foreground shadow-sm outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {showRack && <TileRack value={value} className="mt-1" />}
    </div>
  );
}
