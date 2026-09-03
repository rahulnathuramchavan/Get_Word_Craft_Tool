import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import AdSlot from '@/components/AdSlot';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.to || item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqSection({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="font-display text-2xl font-semibold text-foreground">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="mt-4 rounded-xl border border-border bg-card px-4">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-semibold text-foreground">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function RelatedTools({ items }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-12">
      <h2 id="related-heading" className="font-display text-2xl font-semibold text-foreground">
        Related tools
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((t) => (
          <li key={t.path}>
            <Link
              to={t.path}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60 hover:bg-accent/40"
            >
              <span>
                <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{t.blurb}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ToolShell({ title, description, crumbs, children, faqs, related }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      <Breadcrumbs items={crumbs} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{description}</p>
      <section className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        {children}
      </section>
      <AdSlot className="mt-10" />
      <FaqSection faqs={faqs} />
      <RelatedTools items={related} />
    </div>
  );
}
