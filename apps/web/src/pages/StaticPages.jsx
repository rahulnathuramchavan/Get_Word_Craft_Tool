import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ToolShell';
import { SITE_URL, SITE_NAME, webPageLd, breadcrumbLd, organizationLd } from '@/lib/seo';

const PAGES = {
  about: {
    path: '/about',
    title: 'About WordCraft Tool',
    heading: 'About WordCraft Tool',
    lastUpdated: 'October 28, 2026',
    description: 'The purpose, technical design, word data sources, and quality standards behind WordCraft Tool.',
    sections: [
      {
        h: 'Purpose & Philosophy',
        p: [
          'WordCraft Tool is an independent, free word utility and learning platform designed for word-puzzle enthusiasts, students, teachers, and competitive word-game players. Our mission is to provide fast, reliable, and accessible word discovery tools without heavy advertising, popups, account walls, or telemetry tracking.',
          'Architecture & Processing Boundary: The platform is engineered to maximize speed and user privacy. Seven of our eight tools (Word Finder, Word Unscrambler, Anagram Solver, Wordle Helper, Crossword Finder, Scramble Generator, and Word Lists) process searches entirely client-side within your browser\'s JavaScript memory using a local bundled dictionary. Search queries, rack tiles, crossword patterns, and puzzle guesses remain on your device and are never transmitted to our servers. Only the Definition Finder communicates with external lexical APIs to retrieve definitions and pronunciations.',
        ],
      },
      {
        h: 'The Eight Word Tools',
        p: [
          'WordCraft Tool offers eight distinct tools, each built around specific puzzle-solving, educational, or competitive game scenarios:',
        ],
        subsections: [
          {
            h: '1. Word Finder (/word-finder)',
            p: [
              'An advanced board-play solver that cross-references your rack tiles and wildcards (?) with fixed board patterns (e.g. c?t??), length limits, prefixes, suffixes, and required letters. Includes classic English letter point scoring and dictionary toggles.',
            ],
          },
          {
            h: '2. Word Unscrambler (/word-unscrambler)',
            p: [
              'Transforms any jumbled rack of up to 15 letters into every valid English word it can form. Results are categorized into distinct length tiers with Scrabble tile scores to highlight high-value plays and bingos.',
            ],
          },
          {
            h: '3. Anagram Solver (/anagram-solver)',
            p: [
              'Focuses strictly on exact same-length letter permutations using letter-signature indexing. Entering a word reveals true anagrams while automatically excluding the query word itself.',
            ],
          },
          {
            h: '4. Wordle Helper (/wordle-helper)',
            p: [
              'A deductive elimination assistant for daily 5-letter word puzzles. Uses mathematical constraint logic across green, yellow, and gray clues—including duplicate letter rules—to identify valid dictionary candidates.',
            ],
          },
          {
            h: '5. Crossword Finder (/crossword-finder)',
            p: [
              'Resolves missing-letter grid patterns using wildcards (? or .) to reveal all valid dictionary solutions matching known letter positions, with optional required-letter filters.',
            ],
          },
          {
            h: '6. Scramble Generator (/scramble-generator)',
            p: [
              'Generates randomized word scramble puzzles from common vocabulary across Easy (4–5 letters), Medium (5–7 letters), and Hard (7–9 letters) difficulty tiers for spelling practice, classrooms, and game nights.',
            ],
          },
          {
            h: '7. Definition Finder (/definition-finder)',
            p: [
              'Delivers live definitions, phonetic transcriptions, parts of speech, and playable audio pronunciations via dual-API integration (Free Dictionary API and Datamuse) with in-memory caching.',
            ],
          },
          {
            h: '8. Word Lists (/word-lists)',
            p: [
              'A curated reference browser for high-value strategic word groups (two-letter words, Q without U, power tiles, vowel-heavy, consonant-heavy, Scrabble bingos) and complete word-length browsing from 2 to 15 letters with in-page search and export tools.',
            ],
          },
        ],
      },
      {
        h: 'How the Tools and Educational Content Relate',
        p: [
          'WordCraft Tool pairs its calculation engines directly with the educational guides in our Learn Hub (/learn). While the interactive tools provide rapid mathematical calculations and pattern matching, the educational articles explain the strategic principles, probability concepts, and board geometry needed to become an effective solver:',
          'Conceptual Understanding: Our strategy articles—covering Wordle opening theory, rack balancing, two-letter hook words, wildcard mechanics, Scrabble parallel-play scoring, and crossword clue deduction—teach players how word combinations work under tournament and casual rules.',
          'Theory & Practice: Every educational guide includes direct contextual links to corresponding interactive tools, enabling learners to immediately test worked examples, practice pattern modeling, and verify strategic theories with live dictionary calculations.',
        ],
      },
      {
        h: 'Data Sources & Dictionary Architecture',
        p: [
          'Our word tools utilize the comprehensive public-domain ENABLE (Enhanced North American Benchmark Lexicon) word list, containing more than 437,000 verified English word forms from 2 to 15 letters.',
          'Dual-Dictionary Toggle: To balance utility for both casual and competitive players, our engine includes a Common Words mode containing approximately 9,400 high-frequency English words. This enables casual players, students, and teachers to filter out archaic, scientific, or obscure terms when solving everyday puzzles.',
          'Lexical Definitions: For word definitions and pronunciations, the Definition Finder queries the open Free Dictionary API (dictionaryapi.dev) with automatic fallback to Datamuse (datamuse.com). Search results are cached in local browser memory via a bounded in-memory LRU cache to reduce repetitive requests.',
          'Coverage Limitations: While extensive, no single dictionary is identical to all tournament or commercial game lexicons. Very recent slang, specialized scientific terminology, proper nouns, and proprietary game-specific word lists (such as tournament Scrabble CSW/TWL or the New York Times\' curated Wordle answer list) may diverge. Players in sanctioned competitions should always verify against the official lexicon governing their specific event.',
        ],
      },
      {
        h: 'Quality Assurance & Testing Standards',
        p: [
          'WordCraft Tool maintains strict quality and performance standards through continuous local verification:',
        ],
        list: [
          'Automated Unit Testing: A regression test suite validates core algorithms before every release — including duplicate letter filtering in Wordle, rack constraint enforcement, exact anagram signature hashing, crossword dot syntax, and word list pagination.',
          'Accessibility Standards: All user interfaces follow WCAG contrast requirements, feature visible focus indicators, provide full keyboard navigation, and include ARIA live regions for screen readers.',
          'Performance & Code Splitting: The application utilizes route-level lazy loading and decouples the heavy dictionary payload into an on-demand async chunk to ensure fast page loads on mobile connections.',
        ],
      },
      {
        h: 'Project Maintainer & Independence',
        p: [
          'WordCraft Tool is an independently engineered web project built with React, Vite, and Tailwind CSS. It is designed and maintained by an independent software developer focused on building clean, accessible word game utilities and learning resources.',
          'Trademark Independence: WordCraft Tool is an entirely independent resource. It is not affiliated with, endorsed by, or sponsored by Hasbro, Inc. (Scrabble®), The New York Times Company (Wordle®), Zynga Inc. (Words With Friends®), or Mattel, Inc. All game titles, trademarks, and registered trademarks belong to their respective owners and are mentioned strictly for descriptive and nominative fair use.',
        ],
      },
      {
        h: 'Feedback & Errata',
        p: [
          'We welcome community feedback. If you identify a missing word, an inaccurate definition, or an interface defect, please contact hello@getwordcraft.com with the details. Inquiries are reviewed personally, and verified corrections are incorporated into updates.',
        ],
      },
    ],
  },
  contact: {
    path: '/contact',
    title: 'Contact Us',
    heading: 'Contact Us',
    lastUpdated: 'October 28, 2026',
    description: 'How to reach WordCraft Tool for feedback, error reports, and feature suggestions.',
    sections: [
      {
        h: 'Direct Email Support',
        p: [
          'The official channel for reaching WordCraft Tool is direct email to hello@getwordcraft.com. Every message is reviewed personally by the project maintainer.',
          'No Web Forms or Accounts: WordCraft Tool operates entirely without user accounts, logins, or server-side web form submissions. To contact us, click the email button above or write directly from your email client.',
          'Response Expectations: Inquiries, bug reports, and dictionary feedback are reviewed personally as time permits. We prioritize confirmed software bugs, dictionary inaccuracies, and accessibility issues.',
        ],
      },
      {
        h: 'How to Submit an Inquiry or Report',
        p: [
          'To help us investigate and resolve issues efficiently, please follow these guidelines based on the nature of your message:',
        ],
        subsections: [
          {
            h: '1. Reporting a Missing or Invalid Word',
            p: [
              'Please include: the exact word, its letter length, the specific tool you were using (e.g. Word Finder vs Anagram Solver), and whether you were in "All Words" or "Common Words" mode. If you are referencing a specific game lexicon (such as Scrabble or Words With Friends), mentioning it helps us verify whether the word belongs in our public-domain index.',
            ],
          },
          {
            h: '2. Reporting a Definition Issue',
            p: [
              'Please specify the word queried in the Definition Finder and the discrepancy observed (e.g. missing meaning, incorrect part of speech, or API timeout).',
            ],
          },
          {
            h: '3. Reporting a Bug or Technical Malfunction',
            p: [
              'Please describe: what action you took, what happened, and what you expected to happen. Mentioning your device type (desktop, tablet, mobile), operating system, and web browser helps us reproduce and fix the bug quickly.',
            ],
          },
          {
            h: '4. Feature Suggestions & Editorial Ideas',
            p: [
              'Have an idea for a new word list category, a puzzle drill feature, or a strategy article topic? We welcome ideas that make word games more fun, accessible, and educational.',
            ],
          },
        ],
      },
      {
        h: 'Mailing Address & Phone',
        p: [
          'WordCraft Tool',
          '100 Pine Street, Suite 1250',
          'San Francisco, CA 94111, United States',
          'Telephone: +1-800-555-0199',
          'Support Email: hello@getwordcraft.com',
        ],
      },
      {
        h: 'Privacy & Security Reminder',
        p: [
          'Please do not send passwords, personal identification documents, financial information, or other sensitive details. WordCraft Tool operates without user accounts and will never ask for personal credentials or payment details.',
        ],
      },
    ],
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    heading: 'Privacy Policy',
    lastUpdated: 'October 28, 2026',
    description: 'Privacy Policy for GetWordCraft — how information is processed and stored.',
    sections: [
      {
        h: '1. Overview',
        p: [
          'GetWordCraft is committed to privacy and transparent data practices. The website is accessible free of charge without requiring users to create an account, log in, or provide personal details.',
          'Processing Boundary: Seven of our eight word tools (Word Finder, Word Unscrambler, Anagram Solver, Wordle Helper, Crossword Finder, Scramble Generator, and Word Lists) execute 100% locally on your device within your browser\'s JavaScript engine. Your letters, crossword patterns, and puzzle guesses are processed in temporary browser memory and are never transmitted to our servers or third parties.',
          'External Queries: Only the Definition Finder transmits entered words over the internet to external dictionary APIs to retrieve definitions, phonetics, and audio pronunciations.',
        ],
      },
      {
        h: '2. Browser Storage and Cookies',
        p: [
          'No Persistent Cookies: GetWordCraft does not set or read persistent cookies.',
          'Local Browser Storage: The application does not currently write persistent data to your browser\'s localStorage or sessionStorage. Interface settings (such as the All Words vs. Common Words dictionary toggle) reside in transient component memory during your active session and reset upon page reload.',
          'If future updates introduce persistent client-side preference storage (such as theme preferences or default dictionary modes), this policy will be updated with specific details.',
        ],
      },
      {
        h: '3. Third-Party Services',
        subsections: [
          {
            h: 'Dictionary Definitions and Pronunciations',
            p: [
              'When you look up a word in the Definition Finder, the requested word is sent via HTTPS to the Free Dictionary API (dictionaryapi.dev) with automatic fallback to Datamuse (api.datamuse.com). Pronunciation audio streams from the hosting CDN (such as ssl.gstatic.com or api.dictionaryapi.dev).',
              'These third-party services process the requested word and standard network request metadata according to their respective privacy practices.',
            ],
          },
          {
            h: 'Google Fonts',
            p: [
              'The website loads DM Sans and Fraunces fonts from Google Fonts (fonts.googleapis.com and fonts.gstatic.com). When your browser retrieves these font resources, Google\'s servers receive standard HTTP request data, including your IP address and browser user agent.',
            ],
          },
          {
            h: 'Website Hosting Infrastructure',
            p: [
              'Our website is hosted on Apache-backed web infrastructure (Hostinger). Standard technical access logs (including visitor IP addresses, browser types, requested resources, and timestamps) are processed by the hosting provider to operate the infrastructure, maintain security, and detect denial-of-service or abusive activity.',
            ],
          },
          {
            h: 'Advertising Services Status',
            p: [
              'GetWordCraft does not currently display third-party advertisements or embed advertising network scripts (such as Google AdSense).',
              'If advertising partners are activated in the future to support website operations, this policy will be updated with details regarding specific ad networks, cookie technologies, and applicable user consent controls.',
            ],
          },
          {
            h: 'Analytics and Tracking Scripts',
            p: [
              'GetWordCraft does not currently employ third-party analytics suites (such as Google Analytics), behavioral tracking pixels, or session-recording tools.',
            ],
          },
        ],
      },
      {
        h: '4. How Information Is Used',
        p: [
          'Information processed through the website is used strictly to:',
        ],
        list: [
          'Execute client-side word discovery and puzzle calculations.',
          'Retrieve definitions and audio pronunciations requested by the user.',
          'Maintain website availability, server performance, and security.',
          'Respond to voluntary feedback and support emails sent to our contact address.',
        ],
        footerPara: 'We do not sell, rent, or monetize personal information.',
      },
      {
        h: '5. Data Retention',
        p: [
          'Search queries entered into our client-side tools exist only in temporary device memory during your active session.',
          'In-memory definition cache entries exist in volatile memory and are cleared when the browser tab is closed.',
          'Correspondence sent to hello@getwordcraft.com is retained only as long as necessary to address the inquiry, bug report, or feedback.',
          'Server access logs are retained by our hosting provider in accordance with standard infrastructure security and retention practices.',
        ],
      },
      {
        h: '6. Children\'s Privacy',
        p: [
          'GetWordCraft is a general-audience educational and puzzle website and is not directed at children under 13 years of age (or under 16 in the EEA/UK).',
          'Because our tools require no user registration, we do not knowingly collect personal information from children. If you believe a child has provided us with personal information through direct contact, please reach out to hello@getwordcraft.com so we can promptly delete any such data.',
        ],
      },
      {
        h: '7. Your Rights and Choices',
        p: [
          'You may use all core word discovery tools on GetWordCraft without providing any personal data.',
          'You can manage or block third-party resource requests (such as external fonts or APIs) through your browser settings or privacy extensions.',
          'You may contact hello@getwordcraft.com at any time to request the deletion of any direct email correspondence you have sent to us.',
        ],
        footerPara: 'This Privacy Policy accurately reflects the technical implementation of GetWordCraft. Specific legal rights and controller/processor definitions depend on applicable regional laws in your jurisdiction.',
      },
      {
        h: '8. Changes to This Policy',
        p: [
          'We may update this Privacy Policy when website features, infrastructure, or applicable legal standards change. Revisions will be published on this page with an updated "Last updated" date.',
        ],
      },
      {
        h: '9. Contact Us',
        p: [
          'If you have questions about this Privacy Policy or wish to exercise any applicable privacy rights, please contact us at:',
        ],
        contactDetails: {
          email: 'hello@getwordcraft.com',
          website: 'WordCraft Tool',
          domain: 'getwordcraft.com',
        },
      },
    ],
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use',
    heading: 'Terms of Use',
    lastUpdated: 'October 28, 2026',
    description: 'The rules and terms governing use of WordCraft Tool.',
    sections: [
      {
        h: '1. Acceptance of Terms',
        p: [
          'By accessing or using WordCraft Tool (getwordcraft.com), you agree to these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the site.',
        ],
      },
      {
        h: '2. Permitted Use',
        p: [
          'WordCraft Tool is provided free of charge for personal, educational, and recreational puzzle-solving and word-game practice.',
          'You agree not to misuse the website, including:',
        ],
        list: [
          'Engaging in automated scraping or high-volume automated querying that degrades performance for other users.',
          'Attempting to circumvent, probe, or disrupt website security or server infrastructure.',
          'Misrepresenting your affiliation with WordCraft Tool or falsely claiming the site is affiliated with any third-party game publisher.',
        ],
      },
      {
        h: '3. Lexical Data & Word Game Accuracy',
        p: [
          'The word lists on this site are derived primarily from the public-domain ENABLE lexicon with an added common-English frequency layer. Definitions and phonetics are retrieved from the Free Dictionary API and Datamuse.',
          'No Guarantee of Acceptance: Word games and puzzle publishers—including Scrabble (NASPA/WESPA CSW), Words With Friends (Zynga), and Wordle (The New York Times)—maintain proprietary, licensed, or curated word lists that change periodically. WordCraft Tool makes no guarantee that any word discovered through our tools will be accepted in your specific game edition, club, or tournament. Always refer to your game\'s official rules and dictionary when in competition.',
        ],
      },
      {
        h: '4. Intellectual Property',
        p: [
          'Original educational strategy articles, site copy, tool interface layouts, and branding are the property of WordCraft Tool and are protected by applicable intellectual property laws. You may not reproduce, syndicate, or redistribute whole articles without prior written permission.',
          'Third-party game names and trademarks (such as SCRABBLE®, WORDLE®, and Words With Friends®) are the property of their respective owners and are referenced strictly for descriptive and nominative fair use.',
        ],
      },
      {
        h: '5. Service Availability & Third-Party Dependencies',
        p: [
          'While we strive for reliable uptime, WordCraft Tool is provided on an "as is" and "as available" basis. Features that depend on third-party services (such as definition lookups and external web fonts) may experience temporary interruptions beyond our control.',
        ],
      },
      {
        h: '6. Disclaimer of Warranties & Limitation of Liability',
        p: [
          'To the fullest extent permitted by law, WordCraft Tool disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site, including lost game matches, broken puzzle streaks, or reliance on lexical results.',
        ],
      },
      {
        h: '7. Modifications & Inquiries',
        p: [
          'We reserve the right to modify these Terms of Use at any time. Continued use of the website following published updates signifies your acceptance of the revised terms. For questions regarding these terms, contact hello@getwordcraft.com.',
        ],
      },
    ],
  },
  disclaimer: {
    path: '/disclaimer',
    title: 'Disclaimer',
    heading: 'Disclaimer',
    lastUpdated: 'October 28, 2026',
    description: 'Word list limitations, trademark independence, and advertising disclosure for WordCraft Tool.',
    sections: [
      {
        h: 'Word List Limitations',
        p: [
          'Our tools reference a comprehensive open English word list of more than 437,000 words based on the ENABLE lexicon, complemented by a ~9,400-word common-English frequency tier.',
          'While this index provides extensive coverage for everyday puzzle solving, anagram discovery, and vocabulary practice, it is not an official tournament lexicon.',
          'Differences will exist between our database and official competition dictionaries. Recent additions, brand names, slang, regional dialects, or offensive terms that are omitted or included in proprietary game lexicons may not match. Competitive players should verify words against their governing organization\'s official word list.',
        ],
      },
      {
        h: 'Trademark Independence',
        p: [
          'SCRABBLE® is a registered trademark of Hasbro, Inc. in the United States and Canada and of Mattel, Inc. throughout the rest of the world. WORDLE® is a registered trademark of The New York Times Company. Words With Friends® is a registered trademark of Zynga Inc. WordCraft Tool is an independent web utility and is not affiliated with, endorsed by, sponsored by, or associated with Hasbro, Mattel, The New York Times Company, Zynga, or any other game publisher. All game titles, trademarks, and registered trademarks are referenced strictly for nominative fair use to describe game compatibility and puzzle-solving utility.',
        ],
      },
      {
        h: 'Advertising & Commercial Disclosure',
        p: [
          'Current Status: GetWordCraft.com does not currently display third-party advertisements or sponsor banners.',
          'Future Monetization Notice: If advertising networks (such as Google AdSense) are introduced in the future to help offset hosting, bandwidth, and maintenance expenses, all advertising spaces will be prominently labeled "Advertisement," will never be styled to mimic navigation or content, and will maintain fixed container boundaries to avoid layout shifts. We reject deceptive ad placements, popups, and auto-playing media.',
        ],
      },
      {
        h: 'Educational & Non-Professional Nature',
        p: [
          'All information, calculations, letter scores, and strategy articles on this website are provided strictly for educational, recreational, and entertainment purposes. They do not constitute formal academic, linguistic, financial, or legal advice.',
        ],
      },
      {
        h: 'Corrections & Contact',
        p: [
          'We value accuracy and welcome corrections. If you identify an error in our word lists, a calculation bug, or a broken link, please contact hello@getwordcraft.com.',
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
        ...(pageKey === 'contact' || pageKey === 'about' ? [organizationLd] : []),
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
