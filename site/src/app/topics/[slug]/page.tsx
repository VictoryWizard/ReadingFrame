import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getSiteConfig, getTopicMeta } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { filterPostsByTopicSlug } from "@/lib/topic-match";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSiteConfig().topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicMeta(slug);
  if (!topic) return {};
  return {
    title: `${topic.name} | Topics`,
    description: topic.description,
    alternates: { canonical: `https://reading-frame.com/topics/${slug}/` },
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopicMeta(slug);
  if (!topic) notFound();

  const posts = filterPostsByTopicSlug(getAllPosts(), slug);
  const countLabel = `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;

  return (
    <>
      <header className="border-b border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] py-12">
        <div className="rf-container">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            Topic
          </span>
          <h1 className="mt-2 text-3xl font-semibold">{topic.name}</h1>
          <p className="mt-3 max-w-2xl text-[var(--rf-text-muted)]">{topic.description}</p>
          <p className="mt-2 text-sm text-[var(--rf-text-muted)]">{countLabel}</p>
        </div>
      </header>
      <div className="rf-container py-12">
        {posts.length === 0 ? (
          <p className="text-[var(--rf-text-muted)]">No posts tagged with this topic yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
