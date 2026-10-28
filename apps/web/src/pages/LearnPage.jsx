import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/ToolShell';
import NotFoundPage from '@/pages/NotFoundPage';
import { SITE_URL, SITE_NAME, webPageLd, breadcrumbLd, articleLd } from '@/lib/seo';
import { ARTICLES } from '@/lib/articles';

export { ARTICLES };

export function LearnPage() {
  return (
    <>
      <Helmet>
        <title>Learn — Word-Game Strategy Guides & How-Tos | WordCraft Tool</title>
        <meta name="description" content="Practical, original guides for word-game players: unscrambling technique, Wordle strategy, must-know word lists, and search tips." />
        <link rel="canonical" href={`${SITE_URL}/learn`} />
      </Helmet>
      <Seo title="Learn — WordCraft Tool" description="Word-game strategy guides and how-tos." url={`${SITE_URL}/learn`} siteName={SITE_NAME} />
      <JsonLd data={[
        webPageLd({ title: 'Learn — Word-Game Strategy Guides', description: 'Practical guides for word-game players.', path: '/learn' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Learn', path: '/learn' }]),
      ]} />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learn' }]} />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Learn the craft
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Short, practical guides written by word-game players. No filler — just technique
          you can use in your next game.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
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
            </li>
          ))}
        </ul>
        <AdSlot className="mt-12" minHeight={90} />
      </div>
    </>
  );
}

function renderFormattedText(text) {
  if (typeof text !== 'string') return text;
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);
  return parts.map((part, idx) => {
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, url] = match;
        if (url.startsWith('/')) {
          return (
            <Link key={idx} to={url} className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
              {label}
            </Link>
          );
        }
        return (
          <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
            {label}
          </a>
        );
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function LearnArticlePage() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return <NotFoundPage />;
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{`${article.title} | WordCraft Tool`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`${SITE_URL}/learn/${article.slug}`} />
      </Helmet>
      <Seo title={article.title} description={article.description} url={`${SITE_URL}/learn/${article.slug}`} siteName={SITE_NAME} type="article" />
      <JsonLd data={[
        articleLd({ title: article.title, description: article.description, path: `/learn/${article.slug}` }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Learn', path: '/learn' }, { name: article.title, path: `/learn/${article.slug}` }]),
      ]} />
      <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learn', to: '/learn' }, { label: article.title }]} />
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{article.tag}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{article.description}</p>
        <div className="mt-8">
          {article.body.map((block, i) => {
            if (block.h) {
              return <h2 key={i} className="mt-10 font-display text-2xl font-semibold text-foreground">{block.h}</h2>;
            }
            if (block.h3) {
              return <h3 key={i} className="mt-6 font-display text-lg font-semibold text-foreground">{block.h3}</h3>;
            }
            if (block.p) {
              return <p key={i} className="mt-4 leading-relaxed text-foreground/90">{renderFormattedText(block.p)}</p>;
            }
            if (block.ul) {
              return (
                <ul key={i} className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-foreground/90">
                  {block.ul.map((item, idx) => (
                    <li key={idx}>{renderFormattedText(item)}</li>
                  ))}
                </ul>
              );
            }
            if (block.ol) {
              return (
                <ol key={i} className="mt-3 list-decimal space-y-2 pl-6 leading-relaxed text-foreground/90">
                  {block.ol.map((item, idx) => (
                    <li key={idx}>{renderFormattedText(item)}</li>
                  ))}
                </ol>
              );
            }
            if (block.table) {
              return (
                <div key={i} className="mt-6 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-sm text-foreground">
                    <thead className="border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <tr>
                        {block.table.headers.map((th, hIdx) => (
                          <th key={hIdx} className="px-4 py-3">{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card/40">
                      {block.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-muted/30">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3">{renderFormattedText(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.callout) {
              return (
                <aside key={i} className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm leading-relaxed">
                  {block.callout.title && (
                    <h3 className="font-display text-base font-semibold text-foreground mb-2">
                      {block.callout.title}
                    </h3>
                  )}
                  {block.callout.p && <p className="text-foreground/90">{renderFormattedText(block.callout.p)}</p>}
                  {block.callout.items && (
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-foreground/90">
                      {block.callout.items.map((it, idx) => (
                        <li key={idx}>{renderFormattedText(it)}</li>
                      ))}
                    </ul>
                  )}
                </aside>
              );
            }
            if (block.exercise) {
              return (
                <div key={i} className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                    Practice Exercise
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    {block.exercise.q}
                  </h3>
                  {block.exercise.hint && (
                    <p className="text-xs text-muted-foreground italic mb-3">
                      Hint: {renderFormattedText(block.exercise.hint)}
                    </p>
                  )}
                  <details className="mt-3 rounded-lg border border-border/80 bg-background/80 p-3 text-sm">
                    <summary className="cursor-pointer font-medium text-primary hover:underline">
                      View Solution & Explanation
                    </summary>
                    <div className="mt-2 text-foreground/90 space-y-1.5 pt-2 border-t border-border/50">
                      <p className="font-semibold text-foreground">Answer: {renderFormattedText(block.exercise.a)}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{renderFormattedText(block.exercise.explanation)}</p>
                    </div>
                  </details>
                </div>
              );
            }
            return null;
          })}
        </div>
        <AdSlot className="mt-10" minHeight={90} />
        <nav aria-label="More guides" className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-xl font-semibold text-foreground">Keep reading</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/learn/${a.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{a.tag}</span>
                  <span className="mt-1 text-sm font-semibold text-foreground">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/learn" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All guides
          </Link>
        </nav>
      </article>
    </>
  );
}
