/**
 * One-time migration: legacy ../post/*.html → content/posts/*.md
 * Run from site/: node scripts/migrate-posts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const legacyDir = path.join(__dirname, "../../post");
const outDir = path.join(__dirname, "../content/posts");

const imageMap = {
  "biotech-2026": "biotech-2026.svg",
  "skin-cells-embryos": "skin-cells-embryos.svg",
  "crispr-delivery": "crispr-delivery.svg",
  "fault-lines-motion": "fault-lines-motion.svg",
  "neuralink-human-trial": "neuralink-human-trial.svg",
  "gene-fix-dna": "gene-fix-dna.svg",
  "dire-wolves-colossal": "dire-wolves-colossal.svg",
  "woolly-mammoth-return": "woolly-mammoth-return.svg",
};

function yamlQuote(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function stripHtml(html) {
  return html
    .replace(/<div class="post-pullquote"><p>([\s\S]*?)<\/p><\/div>/gi, "\n\n> $1\n\n")
    .replace(/<span class="post-opinion-label">Opinion<\/span>\s*/gi, "")
    .replace(/<span class="accent-rule"><\/span>\s*/gi, "")
    .replace(/<h2 id="([^"]+)">([^<]+)<\/h2>/gi, "\n\n## $2 {#$1}\n\n")
    .replace(/<p>\s*/gi, "\n\n")
    .replace(/<\/p>/gi, "")
    .replace(/<li><strong>([^<:]+):<\/strong>\s*([^<]*)<\/li>/gi, "- **$1:** $2\n")
    .replace(/<li>([^<]*)<\/li>/gi, "- $1\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/\n[ \t]+\n/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extract(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : "";
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(legacyDir)) {
  if (!file.endsWith(".html") || file === "template.html") continue;
  const slug = file.replace(".html", "");
  const html = fs.readFileSync(path.join(legacyDir, file), "utf8");

  const title = extract(html, /<h1 class="post-title">([^<]+)<\/h1>/);
  const subtitle = extract(html, /<p class="post-subtitle">([^<]+)<\/p>/);
  const date = extract(html, /<time datetime="([^"]+)">/);
  const readMin = extract(html, /<span>~(\d+) min read<\/span>/);
  const tags = [...html.matchAll(/<span class="tag">([^<]+)<\/span>/g)].map((m) => m[1]);
  const monthTag = tags.find((t) => /\d{4}/.test(t));
  const categories = tags.filter((t) => t !== monthTag);

  const takeawayBlock = extract(
    html,
    /<div class="post-takeaways">[\s\S]*?<ul>([\s\S]*?)<\/ul>/
  );
  const takeaways = [...takeawayBlock.matchAll(/<li>([^<]*)<\/li>/g)].map((m) =>
    m[1].trim()
  );

  const tocItems = [...html.matchAll(/<li><a href="#([^"]+)">([^<]+)<\/a><\/li>/g)].map(
    (m) => ({ id: m[1], label: m[2] })
  );

  const article = extract(html, /<article class="post-body[^"]*"[^>]*>([\s\S]*?)<\/article>/);
  let body = stripHtml(
    article.replace(/<div class="post-takeaways">[\s\S]*?<\/div>/, "")
  );

  const related = [...html.matchAll(/href="([^"]+)\.html" class="post-related-card"/g)]
    .map((m) => m[1])
    .filter((s) => !s.startsWith("http") && s !== slug);

  const fm = [
    "---",
    `title: ${yamlQuote(title)}`,
    `slug: ${slug}`,
    `date: ${date}`,
    `excerpt: ${yamlQuote(subtitle)}`,
    `image: ${yamlQuote(`/images/${imageMap[slug] || "biotech-2026.svg"}`)}`,
    "topics:",
    ...categories.map((c) => `  - ${yamlQuote(c)}`),
    `readingMinutes: ${readMin || 8}`,
    "takeaways:",
    ...takeaways.map((t) => `  - ${yamlQuote(t)}`),
    "toc:",
    ...tocItems.map((t) => `  - id: ${t.id}\n    label: ${yamlQuote(t.label)}`),
    "related:",
    ...related.map((r) => `  - ${r}`),
    "---",
    "",
    body,
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outDir, `${slug}.md`), fm);
  console.log("Wrote", slug);
}
