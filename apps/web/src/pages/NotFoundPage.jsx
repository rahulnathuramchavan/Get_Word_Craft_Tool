import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | WordCraft Tool</title>
        <meta name="description" content="The page you were looking for does not exist. Try one of our free word tools instead." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
        <p className="font-display text-7xl font-semibold text-primary" aria-hidden="true">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
          This word isn’t in our dictionary
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you were looking for doesn’t exist or may have moved.
          One of these tools probably has what you need:
        </p>
        <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-2">
          {TOOLS.slice(0, 4).map((t) => (
            <li key={t.path}>
              <Link
                to={t.path}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60"
              >
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
        >
          Back to the homepage
        </Link>
      </div>
    </>
  );
}
