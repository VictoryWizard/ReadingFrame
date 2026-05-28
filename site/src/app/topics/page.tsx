import Link from "next/link";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { filterPostsByTopicSlug } from "@/lib/topic-match";
import { topicSlugFromName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse ReadingFrame breakdowns by topic tag — biotech, CRISPR, AI, neuroscience, and more.",
  alternates: { canonical: "https://reading-frame.com/topics/" },
};

export default function TopicsPage() {
  const { topics: topicMeta } = getSiteConfig();
  const posts = getAllPosts();

  const tagCounts = new Map<string, number>();
  posts.forEach((p) => {
    p.topics.forEach((t) => {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    });
  });

  return (
    <>
      <header className="border-b border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] py-12">
        <div className="rf-container">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            Browse by tag
          </span>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Topics</h1>
          <p className="mt-3 max-w-2xl text-[var(--rf-text-muted)]">
            Every breakdown is tagged by topic. Pick a theme to read related posts.
          </p>
        </div>
      </header>

      <div className="rf-container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {topicMeta.map((topic) => {
            const topicPosts = filterPostsByTopicSlug(posts, topic.slug);
            const count = topicPosts.length;
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}/`}
                className="block rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-6 no-underline transition hover:border-[var(--rf-accent)] hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-[var(--rf-text)]">{topic.name}</h2>
                <p className="mt-2 text-sm text-[var(--rf-text-muted)]">{topic.description}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--rf-accent)]">
                  {count} {count === 1 ? "post" : "posts"} →
                </p>
              </Link>
            );
          })}
        </div>

        <section className="mt-14">
          <h2 className="text-lg font-semibold">All tags on posts</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...tagCounts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([tag, count]) => (
              <li key={tag}>
                <Link
                  href={`/topics/${topicSlugFromName(tag)}/`}
                  className="rf-chip no-underline"
                >
                  {tag} ({count})
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
