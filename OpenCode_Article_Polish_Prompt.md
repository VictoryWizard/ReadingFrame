# OpenCode Prompt: ReadingFrame Article Page Polish

## Context
ReadingFrame is a static HTML/CSS/JS site (no build tools, no framework, no npm). Files are deployed to GitHub Pages. The site is already built and working. This prompt is for polishing the article/post pages only — do NOT touch `index.html`, `about.html`, `posts.html`, `css/style.css`'s existing rules, or `js/main.js`'s existing logic unless specifically instructed below.

### Repo structure
```
ReadingFrame/
  css/style.css         ← append new classes here only
  js/main.js            ← append new JS here only (do NOT touch existing code)
  post/
    biotech-2026.html
    crispr-delivery.html
    dire-wolves-colossal.html
    fault-lines-motion.html
    gene-fix-dna.html
    neuralink-human-trial.html
    skin-cells-embryos.html
    woolly-mammoth-return.html
    template.html
```

### Existing post page structure (for reference)
Each post page already has:
- `.reading-progress` bar (JS works, CSS class exists)
- `.post-header` with `.post-header-meta` (tags), `.post-title`, `.post-subtitle`, `.post-byline`
- `.post-body` with multiple `<section class="post-section">` blocks
- Last section uses `class="post-section post-mytake"` for My Take
- `.post-nav` at the bottom with prev/next links
- Smooth scroll already on `html { scroll-behavior: smooth }`

---

## What to build

### 1. New CSS classes (append to `css/style.css`)

Add these new CSS classes. Do NOT modify any existing CSS rules — only append at the bottom.

```css
/* ===== POST ENHANCEMENTS ===== */

/* Table of Contents box */
.post-toc {
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin: 0 auto 2.5rem;
  max-width: 680px;
}

.post-toc-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.post-toc ol {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: toc-counter;
}

.post-toc li {
  counter-increment: toc-counter;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.875rem;
}

.post-toc li:last-child {
  border-bottom: none;
}

.post-toc li::before {
  content: counter(toc-counter) ".";
  color: var(--color-text-muted);
  font-size: 0.75rem;
  min-width: 1.25rem;
}

.post-toc a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-toc a:hover {
  color: var(--color-accent);
}

/* Key Takeaways box */
.post-takeaways {
  background: rgba(15, 118, 110, 0.04);
  border: 1px solid rgba(15, 118, 110, 0.18);
  border-radius: var(--radius-md);
  padding: 1.4rem 1.75rem;
  margin: 0 auto 3rem;
  max-width: 680px;
}

.post-takeaways-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.85rem;
}

.post-takeaways ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-takeaways li {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
  padding: 0.35rem 0;
  padding-left: 1.25rem;
  position: relative;
}

.post-takeaways li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: 0.75rem;
  top: 0.45rem;
}

/* Pull quote */
.post-pullquote {
  border-left: 3px solid var(--color-accent);
  margin: 2rem 0;
  padding: 0.5rem 1.5rem;
}

.post-pullquote p {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.25rem !important;
  line-height: 1.6 !important;
  color: var(--color-text) !important;
  margin-bottom: 0 !important;
}

/* My Take opinion label */
.post-opinion-label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(15, 118, 110, 0.1);
  border-radius: 20px;
  padding: 0.15rem 0.6rem;
  margin-bottom: 0.6rem;
}

/* Author block */
.post-author-block {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  max-width: 680px;
  margin: 3.5rem auto 0;
  padding: 1.75rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.post-author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
}

.post-author-info {
  flex: 1;
}

.post-author-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}

.post-author-role {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.6rem;
}

.post-author-bio {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 0.75rem;
}

.post-author-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-accent);
}

.post-author-link:hover {
  color: var(--color-accent-dim);
}

/* Related posts */
.post-related {
  max-width: 680px;
  margin: 3rem auto 0;
}

.post-related-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
}

.post-related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.post-related-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  display: block;
}

.post-related-card:hover {
  border-color: var(--color-border-accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  color: inherit;
}

.post-related-month {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.4rem;
}

.post-related-card-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--color-text);
  margin-bottom: 0.35rem;
}

.post-related-teaser {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

@media (max-width: 600px) {
  .post-related-grid {
    grid-template-columns: 1fr;
  }

  .post-author-block {
    flex-direction: column;
    gap: 1rem;
  }
}
```

---

### 2. Update `js/main.js`

Append this block at the very end of `js/main.js` (after the closing `})();`). Do NOT modify existing code.

```js
// Smooth-scroll TOC links with offset for fixed nav
document.querySelectorAll('.post-toc a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 80; // nav height
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
```

---

### 3. Update every post HTML file

Apply the following changes to **all eight post files** listed above, plus `template.html`. Read each file fully before editing.

#### 3a. Add `id` anchors to section headings

Each `<section class="post-section">` already has an `<h2>`. Add an `id` attribute to each `<h2>` that matches the section title as a slug (lowercase, hyphens, no special chars). Example:

```html
<h2 id="year-that-changed-everything">The Year That Changed Everything</h2>
```

Do this for every `<h2>` inside `.post-body` in every post file.

#### 3b. Insert "In this article" TOC

After the closing `</header>` tag of `.post-header` (and before the opening `<article class="post-body ...">` tag), insert a `.post-toc` block. The TOC should list each section's heading as a numbered anchor link. Derive the items from the actual headings in that post. Example structure:

```html
<div class="post-toc">
  <p class="post-toc-title">In this article</p>
  <ol>
    <li><a href="#year-that-changed-everything">The Year That Changed Everything</a></li>
    <li><a href="#whats-coming-in-2026">What's Coming in 2026</a></li>
    <li><a href="#my-take">My Take</a></li>
  </ol>
</div>
```

#### 3c. Insert "Key takeaways" box

At the very start of `<article class="post-body prose" id="post-content">`, before the first `<section>`, insert a `.post-takeaways` block. Write 3–4 genuine, content-specific bullets drawn from the actual article content. Keep bullets concise (1–2 lines each). Example:

```html
<div class="post-takeaways">
  <p class="post-takeaways-title">Key takeaways</p>
  <ul>
    <li>Baby KJ's personalized base-editing therapy in 2025 proved N-of-1 gene therapy can work in real patients.</li>
    <li>Bridge recombinases can insert sequences up to a million base pairs long — a major leap beyond CRISPR's reach.</li>
    <li>Sub-4-hour genome sequencing is moving DNA analysis from research labs into clinical diagnostics.</li>
    <li>2026's real challenge isn't technical possibility — it's building the regulatory and financial infrastructure to deliver on it.</li>
  </ul>
</div>
```

Write appropriate bullets for EACH post based on that post's actual content.

#### 3d. Add 1–2 pull quotes per post

Inside the article body, find 1–2 sentences that are strong, punchy, or central to the argument. Wrap them in a `.post-pullquote` block right after the paragraph they come from. Example:

```html
<div class="post-pullquote">
  <p>That's not a projection or a pilot study. That happened.</p>
</div>
```

Choose pull quote sentences that stand alone clearly and represent the most memorable claims in the article. Do not pull-quote generic sentences. Add at most 2 per post.

#### 3e. Add "Opinion" label to My Take section

Inside the `<section class="post-section post-mytake">` block, before the `<h2>My Take</h2>`, add:

```html
<span class="post-opinion-label">Opinion</span>
```

#### 3f. Add author block after article

After the closing `</article>` tag but before `<nav class="post-nav">`, insert:

```html
<div class="post-author-block">
  <div class="post-author-avatar" aria-hidden="true">H</div>
  <div class="post-author-info">
    <p class="post-author-name">Heram Nagabhairu</p>
    <p class="post-author-role">Student researcher · Bentonville, AR</p>
    <p class="post-author-bio">Interested in ML, bioinformatics, and how computational methods are changing biology. I write monthly breakdowns of papers and developments I find genuinely interesting.</p>
    <a href="../about.html" class="post-author-link">More about me →</a>
  </div>
</div>
```

#### 3g. Add related posts section after author block

After the `.post-author-block` div (and still before `<nav class="post-nav">`), insert a `.post-related` section with 2 relevant cards. Choose related posts that share at least one tag with the current post. Use actual post filenames that exist in the `post/` folder. Example for biotech-2026.html:

```html
<div class="post-related">
  <p class="post-related-title">Related posts</p>
  <div class="post-related-grid">
    <a href="crispr-delivery.html" class="post-related-card">
      <p class="post-related-month">September 2025</p>
      <p class="post-related-card-title">A Breakthrough in CRISPR Delivery</p>
      <p class="post-related-teaser">Lipid nanoparticles + spherical nucleic acids = 3× more effective CRISPR.</p>
    </a>
    <a href="gene-fix-dna.html" class="post-related-card">
      <p class="post-related-month">May 2025</p>
      <p class="post-related-card-title">Gene Fix: Biotech's Quiet Revolution in Human DNA</p>
      <p class="post-related-teaser">The FDA approved the first CRISPR therapy. What actually changes for patients.</p>
    </a>
  </div>
</div>
```

Pick the 2 most topically relevant related posts for each file. Never link a post to itself. Use relative paths (just the filename, no `../post/`).

---

## Full list of post files to update

Apply ALL changes (3a through 3g) to each of these files:

1. `post/biotech-2026.html` — tags: Biotech, CRISPR, AI Drug Discovery — Jan 2026
2. `post/crispr-delivery.html` — tags: CRISPR, Gene Therapy — Sep 2025
3. `post/dire-wolves-colossal.html` — tags: De-Extinction, Gene Editing — Apr 2025
4. `post/fault-lines-motion.html` — tags: Geoscience, Seismology — Sep 2025
5. `post/gene-fix-dna.html` — tags: CRISPR, Gene Editing — May 2025
6. `post/neuralink-human-trial.html` — tags: Neuralink, BCI, Neuroscience — Jul 2025
7. `post/skin-cells-embryos.html` — tags: Embryology, Stem Cells — Sep 2025
8. `post/woolly-mammoth-return.html` — tags: De-Extinction, Colossal Biosciences — Mar 2025
9. `post/template.html` — add placeholder versions of all new elements

---

## Rules and constraints

- **Do NOT touch**: `index.html`, `about.html`, `posts.html`. No changes to those files.
- **Do NOT modify existing CSS rules** in `style.css` — only append at the bottom.
- **Do NOT modify existing JS** in `main.js` — only append at the bottom.
- **Preserve all existing HTML structure** in each post file. Only insert new elements; do not rewrite or remove existing elements.
- **Use relative paths** for all links inside the `post/` subdirectory (`../about.html`, `../css/style.css`, etc.). These are already correct; don't break them.
- **No citations, no sources section, no "Last updated" dates**. Skip those entirely.
- **No dark mode toggle**. The site uses a fixed light theme.
- **Content in key takeaways and pull quotes must be drawn from the existing article body**. Do not invent new facts or claims. Read each post file before writing anything for it.
- After editing all files, do a final pass: open each modified file and verify the HTML is valid (no unclosed tags, no duplicate IDs, no broken relative links).

---

## Summary of deliverables

When done, every post HTML file should have:
1. `id` attributes on all section `<h2>` headings
2. "In this article" TOC box after `.post-header`, before `.post-body`
3. "Key takeaways" box at top of `.post-body`
4. 1–2 pull quotes inside the article body
5. "Opinion" label before the My Take `<h2>`
6. Author block after `</article>`
7. Related posts (2 cards) after author block
8. All of the above styled by new CSS classes appended to `style.css`
9. TOC smooth scroll JS appended to `main.js`
