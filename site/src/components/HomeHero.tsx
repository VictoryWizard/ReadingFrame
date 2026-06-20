import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export function HomeHero({ latestSlug }: { latestSlug: string }) {
  const { tagline, mission, brandLine } = getSiteConfig();

  return (
    <section
      className="hero-section relative min-h-[min(85vh,720px)] overflow-hidden"
      aria-label="ReadingFrame homepage hero"
    >
      <div className="absolute inset-0 bg-[var(--rf-hero-overlay)]" aria-hidden="true" />
      <div className="rf-container relative flex min-h-[min(85vh,720px)] flex-col justify-center py-20 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
          {brandLine}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          {tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-200/95">{mission}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/posts/${latestSlug}/`} className="rf-btn rf-btn-primary">
            Read the latest breakdown →
          </Link>
          <Link
            href="/posts/"
            className="rf-btn rf-btn-ghost border-white/30 text-white hover:bg-white/10"
          >
            Browse archive
          </Link>
        </div>
      </div>
    </section>
  );
}
