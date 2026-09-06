# Hostinger Deployment Guide — WordCraft Tool

## Project Overview

| Property | Value |
|---|---|
| **Framework** | React 18 + Vite 7 (SPA) |
| **Routing** | `react-router-dom` v7 with `BrowserRouter` (client-side) |
| **Runtime at prod** | **None** — pure static files (HTML + CSS + JS) |
| **Node.js required at runtime?** | ❌ No — only needed to *build* the app |
| **Hostinger plan required** | Any shared hosting plan with Apache (no Node.js plan needed) |

---

## Hostinger Git Deployment Settings

Configure these **exact values** in your Hostinger control panel under **Git → Repository**:

| Setting | Value |
|---|---|
| **Repository URL** | Your GitHub repo URL |
| **Branch** | `main` (or whichever branch you deploy from) |
| **Build command** | `npm run hostinger:build` |
| **Install command** | *(leave blank — the build command handles install)* |
| **Publish directory** | `.` (dot = repository root) |
| **Document root** | `public_html` → point it to the repository root |

> **Important:** Do **not** set the publish directory to `apps/web/dist`, `dist/`, or any sub-folder.
> The production files are committed directly to the **repository root** so Hostinger can serve them without a build step.

---

## How to Build & Deploy

### Option A — Let Hostinger build automatically (recommended)

1. Push your changes to GitHub.
2. Hostinger runs `npm run hostinger:build` automatically.
3. That script: installs deps → builds with Vite → copies output to repo root → Hostinger serves from root.

### Option B — Build locally and push pre-built files

```bash
# From the repository root:
npm run hostinger:build
git add -A
git commit -m "chore: update production build"
git push
```

Hostinger will then pick up the updated `index.html`, `assets/`, `.htaccess`, `icon.svg`, and `robots.txt` from the root.

---

## What the Build Produces at the Repo Root

After `npm run hostinger:build`, the following files appear at the **repository root** and must be committed:

```
/ (repository root = public_html)
├── index.html          ← React SPA entry point
├── .htaccess           ← SPA rewrite rules + HTTPS redirect (Apache)
├── icon.svg            ← Favicon
├── robots.txt          ← Search engine crawl rules
└── assets/
    ├── index-XXXXXXXX.js   ← Bundled JavaScript (hashed filename)
    └── index-XXXXXXXX.css  ← Bundled CSS (hashed filename)
```

**Do not upload the `apps/web/dist/` folder itself** — upload only its *contents* (which are already mirrored to the root).

---

## Apache `.htaccess` (already in place)

The `.htaccess` at the repository root handles:

1. **HTTPS redirect** — forces all HTTP traffic to HTTPS
2. **SPA fallback** — routes all non-file, non-directory requests to `index.html` so React Router can handle them client-side

```apache
Options -MultiViews
RewriteEngine On
RewriteBase /

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Serve real files/directories directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# All other requests → index.html (React Router handles the route)
RewriteRule ^ index.html [QSA,L]
```

---

## Route Verification Checklist

After deploying, verify these URLs all work (including after a hard refresh / direct load):

| URL | Expected result |
|---|---|
| `https://www.getwordcraft.com/` | Home page loads |
| `https://www.getwordcraft.com/word-finder` | Word Finder tool |
| `https://www.getwordcraft.com/about` | About page |
| `https://www.getwordcraft.com/learn` | Learn page |
| `https://www.getwordcraft.com/privacy` | Privacy page |
| `http://www.getwordcraft.com/` | Redirects to HTTPS |

If any route returns **404** or **403** after a hard refresh, check that `.htaccess` is present and that Apache's `mod_rewrite` is enabled (it is on all Hostinger shared plans).

---

## Troubleshooting

### 403 Forbidden
- **Cause:** `index.html` is missing from `public_html`, or the publish directory is wrong.
- **Fix:** Confirm the publish directory in Hostinger is set to `.` (repo root) and that `index.html` is committed to the root.

### Routes 404 on refresh
- **Cause:** `.htaccess` SPA rewrite is missing or not being read.
- **Fix:** Confirm `.htaccess` is at the repo root and is committed. Check that `AllowOverride All` is set (it is by default on Hostinger).

### Blank page / JS errors
- **Cause:** Asset paths are wrong (e.g. files served from a sub-folder).
- **Fix:** The JS/CSS in `assets/` uses absolute paths (`/assets/...`). These only work correctly when the files are at the domain root. Never nest them inside a sub-folder.

---

## Limitations

This is a **100% static deployment** — no server-side rendering, no API routes, no database connections from the server. All data fetching happens client-side in the browser. If you later need server-side functionality, you would need a Hostinger **Node.js** plan or a separate backend service.
