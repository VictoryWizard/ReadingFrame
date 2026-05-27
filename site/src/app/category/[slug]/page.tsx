import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getSiteConfig, getCategoryMeta } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSiteConfig().categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryMeta(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} | Categories`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryMeta(slug);
  if (!cat) notFound();

  const matchers: Record<string, (n: string) => boolean> = {
    biotech: (n) => n.includes("biotech") || n.includes("embryology") || n.includes("stem"),
    crispr: (n) => n.includes("crispr") || n.includes("gene edit") || n.includes("gene therapy"),
    ai: (n) => n.includes("ai") || n.includes("ml") || n.includes("drug discovery"),
    neuroscience: (n) => n.includes("neural") || n.includes("bci") || n.includes("neuro"),
    "de-extinction": (n) => n.includes("extinction") || n.includes("colossal"),
  };
  const match = matchers[slug] ?? ((n: string) => n.includes(slug.replace(/-/g, " ")));
  const posts = getAllPosts().filter((p) =>
    p.categories.some((c) => match(c.toLowerCase()))
  );

  return (
    <>
      <header className="border-b border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] py-12">
        <div className="rf-container">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            Category
          </span>
          <h1 className="mt-2 text-3xl font-semibold">{cat.name}</h1>
          <p className="mt-3 max-w-2xl text-[var(--rf-text-muted)]">{cat.description}</p>
        </div>
      </header>
      <div className="rf-container py-12">
        {posts.length === 0 ? (
          <p className="text-[var(--rf-text-muted)]">No posts in this category yet.</p>
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
