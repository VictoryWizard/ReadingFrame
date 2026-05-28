# ReadingFrame — deployment & content guide

## Content (“CMS”)

| What | Where |
|------|--------|
| **Posts** | `content/posts/*.md` — use `topics:` (tags), not categories |
| **Site copy, forms, comments** | `content/site.json` |
| **Topic hub pages** | `content/site.json` → `topics` + auto tags from posts |
| **Images** | `public/images/` |

### Post frontmatter

```yaml
topics:
  - Biotech
  - CRISPR
```

## Before deploy

1. **GitHub Pages source**: Settings → Pages → Build and deployment → **GitHub Actions** (uses `.github/workflows/deploy-site.yml`). Do not deploy the old root HTML and `site/out` at the same time.
2. **Formspree** (or similar): set `forms.contact` and `forms.newsletter` in `site.json` to your `https://formspree.io/f/xxxx` URLs.
3. **Comments**: Install the [utterances](https://utterances.client.js.org/) GitHub App on `VictoryWizard/ReadingFrame` (enabled by default in config). For giscus instead, enable Discussions, complete setup at [giscus.app](https://giscus.app), and fill `giscus.categoryId` in `site.json`.
4. **Plausible** (optional): set `analytics.plausibleDomain`.

## Commands

```bash
cd site
npm install
npm run dev
npm run build   # output: site/out/
```

`prebuild` regenerates `public/search-index.json` and legacy redirect HTML under `public/post/` and `public/category/`.

## Legacy URLs

Old paths redirect to the new site:

- `/post/slug.html` → `/posts/slug/`
- `/posts.html` → `/posts/`
- `/category/*` → `/topics/*`

Netlify/Cloudflare: `public/_redirects`. GitHub Pages: HTML meta-refresh fallbacks in `public/`.
