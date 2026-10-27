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
          'Every tool here runs in your browser against an open English dictionary of more than 437,000 words, with a common-English frequency layer for everyday vocabulary. Your searches never leave your device.',
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
    lastUpdated: 'October 27, 2026',
    description: 'Privacy Policy for GetWordCraft — how information is processed and stored.',
    sections: [
      {
        h: '1. The Short Version',
        p: [
          'GetWordCraft provides online word tools without requiring users to create an account.',
          'Most word searches are designed to run directly in your browser using a word list available on your device. The website\'s search functionality is intended to process your entered letters locally rather than transmit each search to our servers.',
          'Some features, such as looking up word definitions, may send the word you request to an external service. Our hosting provider may also process technical information necessary to operate, secure, and maintain the website.',
          'Please read this policy to understand how information may be processed when you use GetWordCraft.',
        ],
      },
      {
        h: '2. Information Stored on Your Device',
        p: [
          'GetWordCraft\'s word tools run directly in temporary browser memory. The website may use your browser\'s local storage to save interface preferences, such as your selected dictionary mode, if persistent preference saving is enabled.',
          'Information stored locally in your browser generally remains on your device unless a website feature or browser mechanism transmits it elsewhere. You can usually clear locally stored information through your browser settings.',
          'The exact information stored may depend on the tools you use and the website\'s current implementation.',
        ],
      },
      {
        h: '3. Third-Party Services',
        subsections: [
          {
            h: 'Dictionary Definitions',
            p: [
              'GetWordCraft may use the Free Dictionary API (dictionaryapi.dev) and the Datamuse API (datamuse.com) to retrieve word definitions.',
              'When you request a definition, the word you enter is sent to that service to retrieve its corresponding entry. The service may process technical information associated with the request according to its own practices and policies.',
            ],
          },
          {
            h: 'Google Fonts',
            p: [
              'The website may load fonts from Google Fonts. When externally hosted fonts are requested, your browser may connect to Google\'s servers to retrieve the required font resources.',
              'Please refer to Google\'s applicable privacy information for details about its services.',
            ],
          },
          {
            h: 'Advertising Services',
            p: [
              'If advertising services such as Google AdSense are enabled, advertising providers may use cookies or similar technologies to display advertisements, measure advertising performance, prevent fraud, and support other advertising-related functions.',
              'The information processed and the technologies used depend on the advertising services implemented and the applicable settings, consent choices, and legal requirements.',
              'GetWordCraft does not currently display third-party advertisements. If advertising partners (such as Google AdSense) are activated in the future, this policy will be updated with details regarding specific ad networks, cookie usage, and applicable user controls.',
            ],
          },
          {
            h: 'Website Hosting',
            p: [
              'Our hosting provider may process technical information, such as IP addresses, browser information, requested pages, timestamps, and server logs, to operate, maintain, and protect the website.',
              'The information collected, its retention period, and its permitted uses depend on the hosting provider\'s configuration and applicable policies.',
            ],
          },
        ],
      },
      {
        h: '4. How We Use Information',
        p: [
          'Depending on the feature and service involved, information may be processed to:',
        ],
        list: [
          'Provide word searches and related tool functionality.',
          'Retrieve dictionary definitions.',
          'Remember interface preferences.',
          'Maintain website performance and reliability.',
          'Detect errors, abuse, or security issues.',
          'Display and measure advertisements, if advertising is enabled.',
        ],
        footerPara: 'We do not require users to create an account to access the website\'s basic word tools.',
      },
      {
        h: '5. Cookies and Similar Technologies',
        p: [
          'GetWordCraft\'s own features may use browser storage to remember interface preferences.',
          'Third-party services, including advertising or analytics providers if enabled, may use cookies or similar technologies for their own purposes.',
          'You can manage cookies and other browser storage through your browser settings. Blocking or clearing these technologies may affect certain preferences or features.',
          'Where required, applicable consent choices will be provided for relevant cookies or other technologies.',
        ],
      },
      {
        h: '6. Data Sharing',
        p: [
          'Information may be processed by third-party service providers when necessary to deliver a requested feature, operate the website, maintain security, or provide advertising if enabled.',
          'Examples include dictionary-definition services, font providers, hosting providers, and advertising providers.',
          'The information shared depends on the feature used and the services currently integrated into the website.',
        ],
      },
      {
        h: '7. Your Rights and Choices',
        p: [
          'You can access GetWordCraft\'s basic word tools without creating an account.',
          'Depending on your location and browser settings, you may:',
        ],
        list: [
          'Manage or block third-party cookies and storage through your browser settings.',
          'Use private browsing to prevent local session retention.',
          'Request access to, correction of, or deletion of any direct email correspondence you have sent us.',
          'Adjust applicable advertising or consent preferences if advertising services are enabled.',
        ],
        footerPara: 'Because our word tools run locally and do not require user accounts, we do not sell or share personal information as defined under California privacy laws.',
      },
      {
        h: '8. Data Retention and Security',
        p: [
          'We do not operate a user database or store persistent user profiles. Any personal communications sent to our contact email address are retained only as long as necessary to address your feedback or support inquiry.',
          'Technical server logs generated by our hosting provider are maintained for operational security, uptime monitoring, and fraud prevention in accordance with standard hosting infrastructure policies.',
        ],
      },
      {
        h: '9. Children\'s Privacy',
        p: [
          'GetWordCraft is a general-audience word-tools website and is not directed to children under 13 years of age (or under 16 in the European Economic Area and UK).',
          'Because our tools require no user registration, we do not knowingly collect personal information from children. If you believe a child has provided us with personal information through direct contact, please reach out so we can promptly delete any such data.',
        ],
      },
      {
        h: '10. Changes to This Policy',
        p: [
          'We may update this Privacy Policy when the website\'s features, third-party services, advertising arrangements, or applicable legal requirements change.',
          'When updates are made, the revised policy will be published on this page with an updated revision date.',
        ],
      },
      {
        h: '11. Contact Us',
        p: [
          'If you have questions about this Privacy Policy or wish to exercise any applicable privacy rights, you can contact us at:',
        ],
        contactDetails: {
          email: 'hello@getwordcraft.com',
          website: 'GetWordCraft',
          domain: 'getwordcraft.com',
        },
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
          'Our tools use a comprehensive open English word list of more than 437,000 words with a common-English frequency layer. While this is an extensive general-purpose list, it is not identical to any game\'s official dictionary. Very new words, some proper nouns, hyphenated forms, and regional spellings may be missing, and a small number of entries may not be accepted by every game. Always confirm with your game\'s official word list when it matters.',
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
        {page.lastUpdated && (
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {page.lastUpdated}
          </p>
        )}
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
            {s.p && s.p.map((para, i) => (
              <p key={i} className="mt-3 leading-relaxed text-foreground/90">{para}</p>
            ))}
            {s.subsections && (
              <div className="mt-4 space-y-4">
                {s.subsections.map((sub, j) => (
                  <div key={j} className="rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{sub.h}</h3>
                    {sub.p.map((para, k) => (
                      <p key={k} className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-base">{para}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {s.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-6 leading-relaxed text-foreground/90">
                {s.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {s.footerPara && (
              <p className="mt-3 leading-relaxed text-foreground/90">{s.footerPara}</p>
            )}
            {s.contactDetails && (
              <div className="mt-4 rounded-xl border border-border bg-card p-4 space-y-2 text-sm text-foreground/90">
                <p>
                  <strong className="text-foreground">Email:</strong>{' '}
                  <a href={`mailto:${s.contactDetails.email}`} className="text-primary underline hover:text-primary/80">
                    {s.contactDetails.email}
                  </a>
                  {s.contactDetails.note && (
                    <span className="block mt-0.5 text-xs text-muted-foreground italic">{s.contactDetails.note}</span>
                  )}
                </p>
                {s.contactDetails.website && (
                  <p><strong className="text-foreground">Website:</strong> {s.contactDetails.website}</p>
                )}
                {s.contactDetails.domain && (
                  <p><strong className="text-foreground">Domain:</strong> {s.contactDetails.domain}</p>
                )}
              </div>
            )}
          </section>
        ))}
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          Last updated: {page.lastUpdated || 'August 2026'} · WordCraft Tool · getwordcraft.com
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
