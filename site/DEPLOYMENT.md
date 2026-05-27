# ReadingFrame — deployment & content guide

The redesigned site lives in **`site/`** (Next.js 15, static export). Legacy HTML remains in the repo root for reference until you switch hosting.

## Where to update content (your “CMS”)

| What | File / folder |
|------|----------------|
| **New blog post** | Add `content/posts/your-slug.md` (copy an existing post as a template) |
| **Site copy, author bio, social links** | `content/site.json` |
| **Category landing pages** | `content/site.json` → `categories` array |
| **Newsletter signup URL** | `content/site.json` → `newsletter.action` (Mailchimp embed or Substack form action) |
| **Comments (giscus)** | `content/site.json` → `giscus` (repo + IDs from [giscus.app](https://giscus.app)) |
| **Analytics (Plausible)** | `content/site.json` → `analytics.plausibleDomain` |
| **Hero / post images** | `public/images/` (SVG or PNG; reference as `/images/filename.svg` in frontmatter) |
| **Author portrait** | Replace `public/images/author-portrait.svg` or set `author.portrait` in `site.json` |

### Post frontmatter template

```yaml
---
title: "Your title"
slug: your-slug
date: 2026-03-01
excerpt: One-sentence summary for cards and SEO.
image: /images/your-art.svg
categories:
  - Biotech
  - CRISPR
readingMinutes: 10
takeaways:
  - First key point
  - Second key point
toc:
  - id: section-one
    label: Section One
related:
  - biotech-2026
  - crispr-delivery
---

Your markdown body here. Use `## Heading {#section-one}` for TOC anchors.

> Pull quotes use blockquote syntax.

![Alt text for accessibility](/images/your-art.svg)
*Caption text optional in following paragraph.*
```

After editing posts, rebuild so search and static pages refresh.

## Local development

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
cd site
npm run build
```

Output: `site/out/` (static HTML, CSS, JS).

Scripts run automatically:

- `prebuild` → `node scripts/build-search.mjs` → `public/search-index.json` (Lunr instant search)

## Deploy options

### A. Vercel (recommended)

1. Push repo to GitHub.
2. Import project in Vercel; set **Root Directory** to `site`.
3. Build command: `npm run build` · Output: `out` (enable “Static Export” if prompted).
4. Add custom domain `reading-frame.com`.

### B. GitHub Pages

1. Build locally or via GitHub Action:

```yaml
# .github/workflows/deploy.yml
name: Deploy site
on:
  push:
    branches: [main]
    paths: ['site/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: site/package-lock.json
      - run: npm ci && npm run build
        working-directory: site
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: site/out
```

2. Point GitHub Pages to `gh-pages` branch (or use `actions/upload-pages-artifact`).
3. Keep `CNAME` with `reading-frame.com` in `site/public/CNAME` if using project Pages.

### C. Replace root static site

Copy `site/out/*` to repo root (or configure Pages to serve from `site/out`) and remove old `index.html` / `post/*.html` when ready.

## Integrations checklist

- [ ] Mailchimp/Substack: set `newsletter.action` in `content/site.json`
- [ ] giscus: install on repo, paste IDs into `content/site.json`
- [ ] Plausible: add domain to `analytics.plausibleDomain`
- [ ] Update `social.github` with your real profile URL
- [ ] Optional: Algolia — replace Lunr by adding DocSearch credentials (not included by default to avoid API keys in repo)

## Accessibility

- High contrast + font size: floating toolbar (bottom-right)
- Dark/light: nav toggle (persists via `next-themes`)
- All images should include `alt` text in markdown
- Keyboard: skip links via browser; search dialog closes with Escape

## Migrating legacy HTML posts

If you still have HTML-only posts:

```bash
cd site
node scripts/migrate-posts.mjs
```

Reads `../post/*.html` and writes `content/posts/*.md`.
