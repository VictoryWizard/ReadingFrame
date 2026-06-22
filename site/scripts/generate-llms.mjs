import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const postsDir = path.join(root, "content/posts");
const siteFile = path.join(root, "content/site.json");
const out = path.join(root, "public/llms.txt");

const SITE_URL = "https://reading-frame.com";

const site = JSON.parse(fs.readFileSync(siteFile, "utf8"));

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => matter(fs.readFileSync(path.join(postsDir, f), "utf8")).data)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const topicLines = site.topics
  .map((t) => `- ${t.name}: ${t.description} (${SITE_URL}/topics/${t.slug}/)`)
  .join("\n");

const postLines = posts
  .map((p) => `- [${p.title}](${SITE_URL}/posts/${p.slug}/) — ${p.date} — ${p.excerpt}`)
  .join("\n");

const content = `# ${site.name}

> ${site.seoDescription}

${site.name} is an independent research blog by ${site.author.name}, a high school researcher in Bentonville, Arkansas. Each post breaks down a single biotech or AI development — the methods, the limitations, and what the finding actually means — without the press-release layer.

## About
- Author: ${site.author.name} — ${site.author.role}
- Location: Bentonville, Arkansas, USA
- Focus areas: ${site.author.interests.join(", ")}
- Cadence: one post per month
- Format: one paper or development per post; methods, limitations, and real significance
- Independent and ad-free: no ads, no affiliate links, no sponsored content

## Topics
${topicLines}

## Posts (newest first)
${postLines}

## Key pages
- Home: ${SITE_URL}/
- All posts: ${SITE_URL}/posts/
- Topics: ${SITE_URL}/topics/
- Resources: ${SITE_URL}/resources/
- About the author: ${SITE_URL}/about/
- Contact: ${SITE_URL}/contact/

## Usage
This content may be cited or summarized with attribution to ${site.author.name} / ${site.name} and a link to the source post.
`;

fs.writeFileSync(out, content);
console.log(`Wrote llms.txt with ${posts.length} posts`);
