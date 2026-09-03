import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ToolShell';
import { SITE_URL, SITE_NAME, webPageLd, breadcrumbLd } from '@/lib/seo';

const PAGES = {
  about: {
    path: '/about',
    title: 'About WordCraft Tool',
    heading: 'About WordCraft Tool',
    description: 'What WordCraft Tool is, why it exists, and the open data behind it.',
    sections: [
      {
        h: 'Why we built it',
        p: [
          'WordCraft Tool started with a simple observation: most word-helper sites are slow, cluttered with popups, and vague about where their words come from. We wanted the opposite — a toolkit that loads fast on a phone, respects your attention, and is honest about its data.',
          'Every tool here runs in your browser against the public-domain ENABLE word list, a standard reference of more than 170,000 English words, with a common-English frequency layer for everyday vocabulary. Your searches never leave your device.',
        ],
      },
      {
        h: 'What we believe',
        p: [
          'Word games should be fun, and the tools around them should be fair, fast, and accessible to everyone — including people using screen readers, keyboards only, or small phones on slow connections.',
          'That is why there are no accounts, no intrusive popups, no deceptive ads, and no dark patterns anywhere on this site. Ad spaces are labeled and reserve their height so the page never jumps.',
        ],
      },
      {
        h: 'Independence',
        p: [
          'WordCraft Tool is an independent project. It is not affiliated with, endorsed by, or sponsored by the makers of Scrabble, Wordle, Words With Friends, or any other game. All trademarks belong to their respective owners.',
        ],
      },
    ],
  },
  contact: {
    path: '/contact',
    title: 'Contact Us',
    heading: 'Contact us',
    description: 'Questions, corrections, or feedback about WordCraft Tool — here is how to reach us.',
    sections: [
      {
        h: 'Email',
        p: [
          'The fastest way to reach the WordCraft Tool team is by email. We read everything and typically reply within two business days.',
        ],
      },
      {
        h: 'What to include',
        p: [
          'Reporting a missing or invalid word? Tell us the word and which tool you were using. Found a bug? A short description of what you did and what happened — plus your device and browser — helps us fix it quickly.',
          'Please do not send personal documents, passwords, or sensitive information. We never need them to help you.',
        ],
      },
    ],
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    heading: 'Privacy Policy',
    description: 'How WordCraft Tool handles data — short version: your searches stay on your device.',
    sections: [
      {
        h: 'The short version',
        p: [
          'WordCraft Tool does not require an account and does not collect your searches. Every word search runs entirely in your browser against a word list downloaded to your device. We never see the letters you enter.',
        ],
      },
      {
        h: 'What is stored on your device',
        p: [
          'The only data this site stores is in your own browser\'s local storage: interface preferences such as your chosen dictionary mode. This data never leaves your device, and you can clear it at any time through your browser settings.',
        ],
      },
      {
        h: 'Third-party services',
        p: [
          'Definitions are provided by the Free Dictionary API (dictionaryapi.dev); when you look up a word, that word is sent to their service to fetch its entry. Fonts are loaded from Google Fonts. If advertising is enabled, our ad partner (such as Google AdSense) may use cookies or similar technologies to serve and measure ads, subject to its own privacy policy and your consent choices.',
          'Standard hosting logs (IP address, browser type, pages requested) are kept by our hosting provider for security and reliability, and are not used to identify individual visitors.',
        ],
      },
      {
        h: 'Your choices',
        p: [
          'You can use every tool on this site without sharing any personal information. You may block cookies, clear local storage, or browse privately at any time — the tools will keep working.',
          'Questions about this policy? Contact us at hello@getwordcraft.com.',
        ],
      },
    ],
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use',
    heading: 'Terms of Use',
    description: 'The rules for using WordCraft Tool.',
    sections: [
      {
        h: 'Using the site',
        p: [
          'WordCraft Tool is provided free of charge for personal, non-commercial use. You agree not to misuse the site: no automated scraping at abusive volumes, no attempting to disrupt the service, and no misrepresenting the site as affiliated with any game publisher.',
        ],
      },
      {
        h: 'Content and data',
        p: [
          'The word list is derived from the public-domain ENABLE word list. Definitions come from the Free Dictionary API. While we work to keep results accurate, we do not guarantee that every word will be accepted by every game, tournament, or publisher dictionary.',
          'Original articles and site copy are the property of WordCraft Tool and may not be republished without permission.',
        ],
      },
      {
        h: 'No warranty',
        p: [
          'The site is provided "as is" without warranties of any kind. We are not liable for losses arising from use of the site — including lost game streaks. We may update these terms from time to time; continued use of the site constitutes acceptance.',
        ],
      },
    ],
  },
  disclaimer: {
    path: '/disclaimer',
    title: 'Disclaimer',
    heading: 'Disclaimer',
    description: 'Word list limitations, trademark independence, and advertising disclosure for WordCraft Tool.',
    sections: [
      {
        h: 'Word list limitations',
        p: [
          'Our tools use the public-domain ENABLE word list (170,000+ words) with a common-English frequency layer. ENABLE is a respected general-purpose list, but it is not identical to any game\'s official dictionary. Very new words, some proper nouns, hyphenated forms, and regional spellings may be missing, and a small number of entries may not be accepted by every game. Always confirm with your game\'s official word list when it matters.',
        ],
      },
      {
        h: 'Trademark independence',
        p: [
          'SCRABBLE® is a registered trademark of Hasbro, Inc. in the United States and Canada and of Mattel, Inc. elsewhere. WORDLE® is a registered trademark of The New York Times Company. Words With Friends® is a trademark of Zynga Inc. WordCraft Tool is an independent toolkit and is not affiliated with, endorsed by, or sponsored by any of these companies. Game names are referenced for identification only.',
        ],
      },
      {
        h: 'Advertising',
        p: [
          'This site may display advertising to keep the tools free. Ad spaces are always labeled "Advertisement", are never styled to look like content or navigation, and reserve their space so the layout does not shift. We do not use popups, interstitials, or deceptive ad formats.',
        ],
      },
      {
        h: 'General',
        p: [
          'Information on this site is provided for entertainment and education. It is not professional advice of any kind. If you spot an error, we genuinely want to know — write to hello@getwordcraft.com.',
        ],
      },
    ],
  },
};

function StaticPage({ pageKey }) {
  const page = PAGES[pageKey];
  return (
    <>
      <Helmet>
        <title>{`${page.title} | WordCraft Tool`}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={`${SITE_URL}${page.path}`} />
      </Helmet>
      <Seo title={page.title} description={page.description} url={`${SITE_URL}${page.path}`} siteName={SITE_NAME} />
      <JsonLd data={[
        webPageLd({ title: page.title, description: page.description, path: page.path }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: page.title, path: page.path }]),
      ]} />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: page.title }]} />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {page.heading}
        </h1>
        {pageKey === 'contact' && (
          <a
            href="mailto:hello@getwordcraft.com"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> hello@getwordcraft.com
          </a>
        )}
        {page.sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="mt-3 leading-relaxed text-foreground/90">{para}</p>
            ))}
          </section>
        ))}
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          Last updated: August 2026 · WordCraft Tool · getwordcraft.com
        </p>
      </div>
    </>
  );
}

export const AboutPage = () => <StaticPage pageKey="about" />;
export const ContactPage = () => <StaticPage pageKey="contact" />;
export const PrivacyPage = () => <StaticPage pageKey="privacy" />;
export const TermsPage = () => <StaticPage pageKey="terms" />;
export const DisclaimerPage = () => <StaticPage pageKey="disclaimer" />;
