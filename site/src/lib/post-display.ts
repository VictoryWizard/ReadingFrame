import type { Post } from "./types";

export function defaultImageAlt(post: Post): string {
  return post.imageAlt ?? `Illustration for “${post.title}”`;
}
