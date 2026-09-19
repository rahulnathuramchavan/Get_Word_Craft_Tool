#!/usr/bin/env node
/**
 * sync-to-root.js
 * Copies the Vite production build output from apps/web/dist/ to the repository
 * root so that Hostinger's "serve from root" deployment works without any extra
 * publish-directory configuration.
 *
 * Run automatically via: npm run hostinger:build
 */

import { cpSync, copyFileSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT   = resolve(__dirname, '..');
const DIST   = join(ROOT, 'apps', 'web', 'dist');

const files = ['index.html', '.htaccess', 'icon.svg', 'robots.txt', 'sitemap.xml'];
const dirs  = ['assets'];

const PUBLIC = join(ROOT, 'apps', 'web', 'public');

// Copy individual files (prefer dist/, fall back to public/ for static assets)
for (const file of files) {
  const src = existsSync(join(DIST, file)) ? join(DIST, file) : join(PUBLIC, file);
  const dst = join(ROOT, file);
  if (existsSync(src)) {
    copyFileSync(src, dst);
    console.log(`  ✔  ${file}${src.includes('public') ? ' (from public/)' : ''}`);
  } else {
    console.warn(`  ⚠  ${file} not found in dist/ or public/ — skipped`);
  }
}

// Mirror directories (remove then copy fresh to avoid stale hashed chunks)
for (const dir of dirs) {
  const src = join(DIST, dir);
  const dst = join(ROOT, dir);
  if (existsSync(src)) {
    if (existsSync(dst)) rmSync(dst, { recursive: true, force: true });
    mkdirSync(dst, { recursive: true });
    cpSync(src, dst, { recursive: true });
    console.log(`  ✔  ${dir}/`);
  } else {
    console.warn(`  ⚠  ${dir}/ not found in dist — skipped`);
  }
}

console.log('\n✅  sync-to-root: done. The following files are ready at the repo root:');
console.log('     index.html  |  .htaccess  |  icon.svg  |  assets/\n');
