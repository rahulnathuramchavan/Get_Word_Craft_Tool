import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { organizationLd, webPageLd, articleLd, SITE_URL } from '../apps/web/src/lib/seo.js';
import { ARTICLES } from '../apps/web/src/lib/articles.js';

const ROOT = resolve(import.meta.dirname, '..');

describe('Task 1 — Tool Guide Heading Hierarchy', () => {
  const toolGuidesPath = join(ROOT, 'apps', 'web', 'src', 'components', 'ToolGuides.jsx');

  it('ToolGuides.jsx contains no <h4> tags under GuideSection (h2)', () => {
    assert.ok(existsSync(toolGuidesPath), `ToolGuides.jsx must exist at ${toolGuidesPath}`);
    const content = readFileSync(toolGuidesPath, 'utf8');

    const h4Matches = content.match(/<h4[^>]*>([\s\S]*?)<\/h4>/gi) || [];
    assert.equal(
      h4Matches.length,
      0,
      `Expected 0 <h4> tags in ToolGuides.jsx, found ${h4Matches.length}: ${h4Matches.join(', ')}`
    );
  });

  it('Verifies the 10 reported headings are rendered as <h3>', () => {
    const content = readFileSync(toolGuidesPath, 'utf8');
    const expectedHeadings = [
      'Confusing Rack Letters with Board Pattern',
      'Contradictory Length Filters',
      'Expecting Board Positional Matching',
      'Typing Punctuation or Spaces',
      'Expecting Shorter Sub-Words',
      'Multi-Word Phrases',
      'Marking Gray Letters That Are Actually Yellow',
      'Curated Answers vs. Full Dictionary',
      'Lexical Pattern Matching Only',
      'Choosing the Right Dictionary',
    ];

    for (const heading of expectedHeadings) {
      const regex = new RegExp(`<h3[^>]*>\\s*${heading}\\s*<\\/h3>`);
      assert.match(
        content,
        regex,
        `Heading "${heading}" must be rendered as an <h3> tag in ToolGuides.jsx`
      );
    }
  });
});

describe('Task 2 — Homepage FAQ Deduplication', () => {
  it('FaqSection in ToolShell.jsx supports heading prop to suppress duplicate headings', () => {
    const toolShellPath = join(ROOT, 'apps', 'web', 'src', 'components', 'ToolShell.jsx');
    const content = readFileSync(toolShellPath, 'utf8');

    assert.match(content, /export function FaqSection\(\{\s*faqs,\s*heading\s*=\s*true\s*\}\)/);
    assert.match(content, /\{heading && \(/);
  });

  it('HomePage.jsx renders a single FAQ heading without duplication', () => {
    const homePagePath = join(ROOT, 'apps', 'web', 'src', 'pages', 'HomePage.jsx');
    const content = readFileSync(homePagePath, 'utf8');

    // HomePage supplies its own styled h2 in Reveal
    assert.match(content, /<h2 id="home-faq-heading"[^>]*>\s*Frequently asked questions\s*<\/h2>/);
    // FaqSection is invoked with heading={false} to suppress duplicate h2
    assert.match(content, /<FaqSection\s+faqs=\{HOME_FAQS\}\s+heading=\{false\}\s*\/>/);
  });
});

describe('Task 3 — Homepage Meta Description Consistency', () => {
  const expectedDescription =
    'Free word-game tools: word finder, unscrambler, anagram solver, Wordle helper, crossword finder, definitions, and word lists. No sign-up required.';

  it('Unified description is within recommended 140–155 character range', () => {
    assert.ok(
      expectedDescription.length >= 140 && expectedDescription.length <= 155,
      `Length must be 140-155 characters, was ${expectedDescription.length}`
    );
    assert.equal(expectedDescription.length, 146);
  });

  it('apps/web/index.html uses the unified description across meta, og, and twitter tags', () => {
    const htmlPath = join(ROOT, 'apps', 'web', 'index.html');
    const content = readFileSync(htmlPath, 'utf8');

    const descMatch = content.match(/<meta name="description" content="([^"]+)" \/>/);
    assert.ok(descMatch, 'Missing meta description tag in index.html');
    assert.equal(descMatch[1], expectedDescription);

    const ogMatch = content.match(/<meta property="og:description" content="([^"]+)" \/>/);
    assert.ok(ogMatch, 'Missing og:description tag in index.html');
    assert.equal(ogMatch[1], expectedDescription);

    const twMatch = content.match(/<meta name="twitter:description" content="([^"]+)" \/>/);
    assert.ok(twMatch, 'Missing twitter:description tag in index.html');
    assert.equal(twMatch[1], expectedDescription);
  });

  it('HomePage.jsx uses the unified description in Helmet, Seo, and JSON-LD', () => {
    const homePath = join(ROOT, 'apps', 'web', 'src', 'pages', 'HomePage.jsx');
    const content = readFileSync(homePath, 'utf8');

    assert.ok(content.includes(expectedDescription), 'HomePage.jsx must include unified description');
  });
});

describe('Task 4 — Structured Data & Publication Dates', () => {
  it('organizationLd exports valid Organization node with supported contact info and no unsupported address', () => {
    assert.ok(organizationLd, 'organizationLd must be defined');

    assert.equal(
      organizationLd['@type'],
      'Organization',
      'Business node @type must be Organization'
    );

    assert.ok(organizationLd.name, 'Business node must have name');
    assert.ok(organizationLd.url, 'Business node must have url');
    assert.ok(organizationLd.logo, 'Business node must have logo');
    assert.ok(organizationLd.email, 'Business node must have email');
    assert.ok(organizationLd.contactPoint, 'Business node must have contactPoint');

    // Confirm unsupported placeholder physical address and fictional 555 telephone are omitted
    assert.equal(organizationLd.address, undefined, 'Unsupported address should not be present');
    assert.equal(organizationLd.telephone, undefined, 'Unsupported telephone should not be present');
  });

  it('webPageLd includes publisher, mainEntityOfPage, and supported dates', () => {
    const ld = webPageLd({
      title: 'About WordCraft Tool',
      description: 'About description',
      path: '/about',
      dateModified: '2026-10-28',
    });

    assert.equal(ld['@type'], 'WebPage');
    assert.ok(ld.publisher);
    assert.equal(ld.mainEntityOfPage, `${SITE_URL}/about`);
    assert.equal(ld.dateModified, '2026-10-28');
  });

  it('articleLd includes publisher, mainEntityOfPage, and supported dates', () => {
    const ld = articleLd({
      title: 'How to Unscramble Words Faster',
      description: 'Article description',
      path: '/learn/unscramble-words-faster',
      datePublished: '2026-10-27',
      dateModified: '2026-10-28',
    });

    assert.equal(ld['@type'], 'Article');
    assert.ok(ld.publisher);
    assert.equal(ld.mainEntityOfPage, `${SITE_URL}/learn/unscramble-words-faster`);
    assert.equal(ld.datePublished, '2026-10-27');
    assert.equal(ld.dateModified, '2026-10-28');
  });

  it('index.html static JSON-LD parses and includes WebSite, Organization, WebApplication, and WebPage', () => {
    const indexPath = join(ROOT, 'apps', 'web', 'index.html');
    const html = readFileSync(indexPath, 'utf8');

    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(jsonLdMatch, 'index.html must contain static application/ld+json script');

    const parsed = JSON.parse(jsonLdMatch[1]);
    const graph = parsed['@graph'] || [parsed];

    const webPage = graph.find((node) => node['@type'] === 'WebPage');
    assert.ok(webPage, 'WebPage node must exist in index.html JSON-LD');
    assert.ok(webPage.publisher, 'WebPage must have publisher');
    assert.ok(webPage.mainEntityOfPage, 'WebPage must have mainEntityOfPage');
    assert.equal(webPage.dateModified, '2026-10-28');
  });

  it('Preserves all 6 educational articles with valid slugs and non-empty content', () => {
    assert.equal(ARTICLES.length, 6, 'Must have exactly 6 educational articles');
    for (const a of ARTICLES) {
      assert.ok(a.slug);
      assert.ok(a.title);
      assert.ok(a.description);
      assert.ok(a.body && a.body.length > 0);
    }
  });

  it('Preserves ads.txt publisher record exactly', () => {
    const adsPaths = [
      join(ROOT, 'apps', 'web', 'public', 'ads.txt'),
      join(ROOT, 'ads.txt'),
    ];
    for (const p of adsPaths) {
      assert.ok(existsSync(p));
      const content = readFileSync(p, 'utf8').trim();
      assert.equal(content, 'google.com, pub-9362472764951534, DIRECT, f08c47fec0942fa0');
    }
  });
});

describe('Sitemap & Robots Directives', () => {
  const sitemapPaths = [
    join(ROOT, 'apps', 'web', 'public', 'sitemap.xml'),
    join(ROOT, 'sitemap.xml'),
  ];

  for (const sitemapPath of sitemapPaths) {
    it(`verifies all 21 URLs have recent W3C lastmod in ${sitemapPath.replace(ROOT, '')}`, () => {
      assert.ok(existsSync(sitemapPath), `File must exist: ${sitemapPath}`);
      const content = readFileSync(sitemapPath, 'utf8');

      const urlMatches = content.match(/<url>[\s\S]*?<\/url>/g) || [];
      assert.equal(urlMatches.length, 21, `Expected exactly 21 URLs, found ${urlMatches.length}`);

      for (const urlBlock of urlMatches) {
        const locMatch = urlBlock.match(/<loc>(https:\/\/[^<]+)<\/loc>/);
        const lastmodMatch = urlBlock.match(/<lastmod>([^<]+)<\/lastmod>/);

        assert.ok(locMatch, `URL block missing <loc>: ${urlBlock}`);
        assert.ok(lastmodMatch, `URL ${locMatch[1]} is missing <lastmod> date`);

        const lastmodValue = lastmodMatch[1];
        const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z))?$/;
        assert.match(lastmodValue, dateRegex, `Invalid date format in ${locMatch[1]}: ${lastmodValue}`);
      }
    });
  }

  const robotsPaths = [
    join(ROOT, 'apps', 'web', 'public', 'robots.txt'),
    join(ROOT, 'robots.txt'),
  ];

  for (const robotsPath of robotsPaths) {
    it(`verifies Content-Signal directive in ${robotsPath.replace(ROOT, '')}`, () => {
      assert.ok(existsSync(robotsPath));
      const content = readFileSync(robotsPath, 'utf8');
      assert.match(content, /^Content-Signal:\s*search=yes,\s*ai-train=no/m);
      assert.match(content, /User-agent:\s*\*/);
      assert.match(content, /Allow:\s*\//);
      assert.match(content, /Sitemap:\s*https:\/\/getwordcraft\.com\/sitemap\.xml/);
    });
  }

  it('verifies .htaccess emits Content-Signal header and prevents stale robots.txt caching', () => {
    const htaccessPath = join(ROOT, '.htaccess');
    assert.ok(existsSync(htaccessPath), '.htaccess must exist');
    const content = readFileSync(htaccessPath, 'utf8');

    assert.match(content, /Header set Content-Signal "search=yes, ai-train=no"/);
    assert.match(content, /<Files "robots\.txt">[\s\S]*?Cache-Control "public, max-age=0, must-revalidate"/);
  });
});
