import type { Post } from "./types";

const matchers: Record<string, (tag: string) => boolean> = {
  biotech: (n) => n.includes("biotech") || n.includes("embryology") || n.includes("stem"),
  crispr: (n) => n.includes("crispr") || n.includes("gene edit") || n.includes("gene therapy"),
  ai: (n) => n.includes("ai") || n.includes("ml") || n.includes("drug discovery"),
  neuroscience: (n) => n.includes("neural") || n.includes("bci") || n.includes("neuro"),
  "de-extinction": (n) => n.includes("extinction") || n.includes("colossal"),
};

export function postMatchesTopicSlug(post: Post, slug: string): boolean {
  const match =
    matchers[slug] ?? ((n: string) => n.includes(slug.replace(/-/g, " ")));
  return post.topics.some((t) => match(t.toLowerCase()));
}

export function filterPostsByTopicSlug(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => postMatchesTopicSlug(p, slug));
}
