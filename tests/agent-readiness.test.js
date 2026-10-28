import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { organizationLd, SITE_URL } from '../apps/web/src/lib/seo.js';

const ROOT = resolve(import.meta.dirname, '..');

describe('Agent-Readiness: Sitemap lastmod dates', () => {
  const sitemapPaths = [
    join(ROOT, 'apps', 'web', 'public', 'sitemap.xml'),
    join(ROOT, 'sitemap.xml'),
  ];

  for (const sitemapPath of sitemapPaths) {
    it(`verifies all URLs have recent W3C lastmod in ${sitemapPath.replace(ROOT, '')}`, () => {
      assert.ok(existsSync(sitemapPath), `File must exist: ${sitemapPath}`);
      const content = readFileSync(sitemapPath, 'utf8');

      const urlMatches = content.match(/<url>[\s\S]*?<\/url>/g) || [];
      assert.ok(urlMatches.length >= 20, `Expected at least 20 URLs, found ${urlMatches.length}`);

      for (const urlBlock of urlMatches) {
        const locMatch = urlBlock.match(/<loc>(https:\/\/[^<]+)<\/loc>/);
        const lastmodMatch = urlBlock.match(/<lastmod>([^<]+)<\/lastmod>/);

        assert.ok(locMatch, `URL block missing <loc>: ${urlBlock}`);
        assert.ok(lastmodMatch, `URL ${locMatch[1]} is missing <lastmod> date`);

        const lastmodValue = lastmodMatch[1];
        // Must be W3C Datetime format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+00:00)
        const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z))?$/;
        assert.match(lastmodValue, dateRegex, `Invalid date format in ${locMatch[1]}: ${lastmodValue}`);
      }
    });
  }
});

describe('Agent-Readiness: Organization & LocalBusiness schema', () => {
  it('organizationLd exports complete business node with PostalAddress', () => {
    assert.ok(organizationLd, 'organizationLd must be defined');

    const types = Array.isArray(organizationLd['@type'])
      ? organizationLd['@type']
      : [organizationLd['@type']];

    assert.ok(
      types.includes('Organization') || types.includes('LocalBusiness'),
      'Business node @type must include Organization or LocalBusiness'
    );

    assert.ok(organizationLd.name, 'Business node must have name');
    assert.ok(organizationLd.url, 'Business node must have url');
    assert.ok(organizationLd.email, 'Business node must have email');
    assert.ok(organizationLd.telephone, 'Business node must have telephone');

    const address = organizationLd.address;
    assert.ok(address, 'Business node is missing: address');
    assert.equal(address['@type'], 'PostalAddress', 'address must have @type PostalAddress');
    assert.ok(address.streetAddress, 'address missing streetAddress');
    assert.ok(address.addressLocality, 'address missing addressLocality');
    assert.ok(address.addressRegion, 'address missing addressRegion');
    assert.ok(address.postalCode, 'address missing postalCode');
    assert.ok(address.addressCountry, 'address missing addressCountry');
  });

  it('verifies static JSON-LD in apps/web/index.html includes complete PostalAddress', () => {
    const indexPath = join(ROOT, 'apps', 'web', 'index.html');
    assert.ok(existsSync(indexPath), `index.html must exist at ${indexPath}`);
    const html = readFileSync(indexPath, 'utf8');

    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(jsonLdMatch, 'index.html must contain static application/ld+json script');

    const parsed = JSON.parse(jsonLdMatch[1]);
    const graph = parsed['@graph'] || [parsed];

    const businessNode = graph.find((node) => {
      const t = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
      return t.includes('Organization') || t.includes('LocalBusiness');
    });

    assert.ok(businessNode, 'index.html JSON-LD must contain an Organization or LocalBusiness node');
    assert.ok(businessNode.address, 'Business node in index.html is missing: address');
    assert.equal(businessNode.address['@type'], 'PostalAddress');
    assert.ok(businessNode.address.streetAddress);
    assert.ok(businessNode.address.addressLocality);
    assert.ok(businessNode.address.addressRegion);
    assert.ok(businessNode.address.postalCode);
    assert.ok(businessNode.address.addressCountry);
  });
});

describe('Agent-Readiness: Content Signals declared in robots.txt', () => {
  const robotsPaths = [
    join(ROOT, 'apps', 'web', 'public', 'robots.txt'),
    join(ROOT, 'robots.txt'),
  ];

  for (const robotsPath of robotsPaths) {
    it(`verifies Content-Signal directive in ${robotsPath.replace(ROOT, '')}`, () => {
      assert.ok(existsSync(robotsPath), `robots.txt must exist: ${robotsPath}`);
      const content = readFileSync(robotsPath, 'utf8');

      // Must have Content-Signal directive
      assert.match(
        content,
        /^Content-Signal:\s*search=yes,\s*ai-train=no/m,
        `Content-Signal directive missing or invalid in ${robotsPath}`
      );

      // Must have User-agent and Allow
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

