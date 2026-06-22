import Link from "next/link";
import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { AuthorSpotlight } from "@/components/AuthorSpotlight";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostFilters } from "@/components/PostFilters";
import { getAllPosts } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "https://reading-frame.com/" },
  openGraph: {
    images: [
      {
        url: "/images/og/home.png",
        width: 1200,
        height: 630,
        alt: "ReadingFrame — monthly biotech and AI research breakdowns",
      },
    ],
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts[0];
  const { topics } = getSiteConfig();

  return (
    <>
      <HomeHero latestSlug={latest?.slug ?? "biotech-2026"} />

      <section className="fade-in border-b border-[var(--rf-border)] py-14">
        <div className="rf-container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            About ReadingFrame
          </span>
          <h2 className="mt-1 text-2xl font-semibold">
            Biotech and AI research, explained without the hype
          </h2>
          <p className="mt-4 text-[var(--rf-text-muted)]">
            ReadingFrame is a monthly research blog that breaks down one biotech or AI paper at a
            time. Every issue covers a single development — a CRISPR delivery method, a gene therapy
            approval, a brain&ndash;computer interface trial, an AI drug-discovery model — and
            explains the methods, the limitations, and what the finding actually means. No press
            releases, no breathless headlines, no affiliate links.
          </p>
          <p className="mt-4 text-[var(--rf-text-muted)]">
            It&apos;s written by{" "}
            <Link href="/about/" className="text-[var(--rf-accent)] font-semibold no-underline">
              Heram Nagabhairu
            </Link>
            , a high school researcher in Bentonville, Arkansas who works in machine learning and
            bioinformatics. One post a month, aimed at students, scientists, and anyone who wants the
            substance of new research instead of the spin.
          </p>
        </div>
      </section>

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
          <PostFilters posts={posts} cardTitleAs="h3" />
        </div>
      </section>

      <section className="border-y border-[var(--rf-border)] bg-[var(--rf-bg-muted)] py-14">
        <div className="rf-container">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            Featured topics
          </span>
          <h2 className="mt-1 text-2xl font-semibold">What gets covered here</h2>
          <p className="mt-3 max-w-2xl text-[var(--rf-text-muted)]">
            Breakdowns cluster around a few recurring themes. Pick one to read every post on that
            subject.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}/`}
                className="block rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-5 no-underline transition hover:border-[var(--rf-accent)] hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[var(--rf-text)]">{topic.name}</h3>
                <p className="mt-2 text-sm text-[var(--rf-text-muted)]">{topic.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-[var(--rf-accent)]">
                  Read {topic.name} posts →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="rf-container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
            The method
          </span>
          <h2 className="mt-1 text-2xl font-semibold">How I break down each paper</h2>
          <p className="mt-4 text-[var(--rf-text-muted)]">
            Most science coverage stops at the headline. The goal here is to go one layer deeper
            without drowning you in jargon. Every breakdown follows the same three questions:
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-5">
              <h3 className="text-base font-semibold">What was actually done</h3>
              <p className="mt-2 text-sm text-[var(--rf-text-muted)]">
                The real method — the model, the edit, the trial — stated plainly, separated from
                the marketing around it.
              </p>
            </div>
            <div className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-5">
              <h3 className="text-base font-semibold">Where the limits are</h3>
              <p className="mt-2 text-sm text-[var(--rf-text-muted)]">
                Sample sizes, what hasn&apos;t been shown yet, and the gap between a lab result and a
                real-world treatment.
              </p>
            </div>
            <div className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-5">
              <h3 className="text-base font-semibold">Why it matters</h3>
              <p className="mt-2 text-sm text-[var(--rf-text-muted)]">
                What changes if the finding holds up — and an honest read on whether it likely will.
              </p>
            </div>
          </div>
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
