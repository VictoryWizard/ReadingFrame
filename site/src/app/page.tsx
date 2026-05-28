import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { AuthorSpotlight } from "@/components/AuthorSpotlight";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostFilters } from "@/components/PostFilters";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts[0];
  return (
    <>
      <HomeHero latestSlug={latest?.slug ?? "biotech-2026"} />

      <section className="py-14">
        <div className="rf-container">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
                Recent breakdowns
              </span>
              <h2 className="mt-1 text-2xl font-semibold">Explore the archive</h2>
            </div>
            <Link href="/posts/" className="text-sm font-semibold text-[var(--rf-accent)] no-underline">
              View all posts →
            </Link>
          </div>
          <PostFilters posts={posts} />
        </div>
      </section>

      <section className="border-y border-[var(--rf-border)] bg-gradient-to-br from-sky-500/10 to-emerald-500/10 py-14">
        <div className="rf-container text-center">
          <h2 className="text-2xl font-semibold">Monthly newsletter</h2>
          <p className="mx-auto mt-2 max-w-lg text-[var(--rf-text-muted)]">
            One breakthrough per month — decoded in your inbox. No hype, no spam.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <AuthorSpotlight />
    </>
  );
}
