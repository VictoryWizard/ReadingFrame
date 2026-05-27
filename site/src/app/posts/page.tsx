import { ArchiveTimeline } from "@/components/ArchiveTimeline";
import { PostFilters } from "@/components/PostFilters";
import { getAllPosts, getAllCategoriesFromPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse monthly Bio and AI research breakdowns from ReadingFrame.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="border-b border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] py-12">
        <div className="rf-container">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            Archive
          </span>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">All Posts</h1>
          <p className="mt-2 max-w-xl text-[var(--rf-text-muted)]">
            One topic a month. Filter by category or browse the timeline of monthly cadence.
          </p>
        </div>
      </header>

      <div className="rf-container py-12">
        <PostFilters posts={posts} allCategories={getAllCategoriesFromPosts()} />
      </div>

      <section className="border-t border-[var(--rf-border)] bg-[var(--rf-bg-muted)] py-12">
        <div className="rf-container">
          <h2 className="mb-8 text-xl font-semibold">Timeline</h2>
          <ArchiveTimeline posts={posts} />
        </div>
      </section>
    </>
  );
}
