import { PostCard } from "@/components/PostCard";
import type { Post } from "@/lib/types";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-6 text-xl font-semibold">Related breakdowns</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
