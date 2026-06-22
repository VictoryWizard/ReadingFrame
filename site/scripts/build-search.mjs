import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "../content/posts");
const out = path.join(__dirname, "../public/search-index.json");

const items = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(postsDir, f), "utf8"));
    const topics = data.topics ?? data.categories ?? [];
    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      topics,
      body: content.replace(/\{#[A-Za-z0-9_-]+\}/g, "").slice(0, 2000),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(out, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} posts to search-index.json`);
