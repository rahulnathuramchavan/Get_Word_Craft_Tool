import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Labeled, fixed-height ad placeholder. Reserving the space up front keeps
 * the layout stable (no CLS) when a real ad network such as Google AdSense
 * is slotted in. Never styled to look like content or navigation.
 */
export default function AdSlot({ className, minHeight = 120 }) {
  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        'flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40',
        className,
      )}
      style={{ minHeight }}
    >
      <div className="px-4 py-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Advertisement
        </p>
        <p className="mt-1 text-xs text-muted-foreground/80">
          This space is reserved for advertising.
        </p>
      </div>
    </aside>
  );
}
