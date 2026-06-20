import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Post, PostFrontmatter } from "./types";
import { sanitizeTopics } from "./topics";

const postsDirectory = path.join(process.cwd(), "content/posts");

function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const raw =
    (data.topics as unknown) ??
    (data.categories as unknown) ??
    [];
  return { ...(data as PostFrontmatter), topics: sanitizeTopics(raw) };
}

function toPost(data: ReturnType<typeof matter>): Post {
  const fm = normalizeFrontmatter(data.data as Record<string, unknown>);
  return {
    ...fm,
    content: data.content,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  return toPost(matter(raw));
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return result.toString();
}

export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export function getRelatedPosts(slug: string): Post[] {
  const post = getPostBySlug(slug);
  if (!post?.related?.length) {
    return getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);
  }
  return post.related
    .map((s) => getPostBySlug(s))
    .filter((p): p is Post => Boolean(p));
}

export function getPostsByTopic(topicName: string): Post[] {
  return getAllPosts().filter((p) =>
    p.topics.some((t) => t.toLowerCase() === topicName.toLowerCase())
  );
}

export function getAllTopicsFromPosts(): string[] {
  return sanitizeTopics(getAllPosts().flatMap((p) => p.topics));
}
