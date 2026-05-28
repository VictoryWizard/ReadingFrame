/**
 * Legacy URL redirects for static hosting (GitHub Pages / Netlify).
 * Run: node scripts/generate-redirects.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");
const postsDir = path.join(__dirname, "../content/posts");

const htmlRedirect = (target) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <script>location.replace("${target}");</script>
</head>
<body>
  <p><a href="${target}">Continue to the updated page</a>.</p>
</body>
</html>
`;

const slugs = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

const postDir = path.join(publicDir, "post");
fs.mkdirSync(postDir, { recursive: true });

for (const slug of slugs) {
  const target = `/posts/${slug}/`;
  fs.writeFileSync(path.join(postDir, `${slug}.html`), htmlRedirect(target));
}

const rootRedirects = {
  "posts.html": "/posts/",
  "about.html": "/about/",
};

for (const [file, target] of Object.entries(rootRedirects)) {
  fs.writeFileSync(path.join(publicDir, file), htmlRedirect(target));
}

const topicSlugs = ["biotech", "crispr", "ai", "neuroscience", "de-extinction"];
const categoryDir = path.join(publicDir, "category");
fs.mkdirSync(categoryDir, { recursive: true });
for (const slug of topicSlugs) {
  fs.writeFileSync(
    path.join(categoryDir, `${slug}.html`),
    htmlRedirect(`/topics/${slug}/`)
  );
  fs.mkdirSync(path.join(categoryDir, slug), { recursive: true });
  fs.writeFileSync(path.join(categoryDir, slug, "index.html"), htmlRedirect(`/topics/${slug}/`));
}

const netlifyRules = [
  "/post/:slug.html /posts/:slug/ 301",
  "/post/:slug /posts/:slug/ 301",
  "/posts.html /posts/ 301",
  "/about.html /about/ 301",
  "/index.html / 301",
  "/category/:slug /topics/:slug/ 301",
  "/category/:slug/ /topics/:slug/ 301",
  "/categories /topics/ 301",
  "/categories/ /topics/ 301",
].join("\n");

fs.writeFileSync(path.join(publicDir, "_redirects"), netlifyRules + "\n");

console.log(`Wrote ${slugs.length} post redirects + topic/category redirects`);
