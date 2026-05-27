import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ReadingFrame is written by a high school researcher in Arkansas interested in ML, bioinformatics, and computational biology.",
};

export default function AboutPage() {
  const { author, social, name } = getSiteConfig();

  return (
    <div className="rf-container py-12">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
          The author
        </span>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">About {name}</h1>
      </header>

      <div className="prose-rf mt-10 max-w-2xl space-y-10">
        <section>
          <h2>Who I am</h2>
          <p>{author.longBio}</p>
        </section>
        <section>
          <h2>Why ReadingFrame</h2>
          <p>
            The name comes from biology — a reading frame is how a nucleotide sequence gets parsed
            into codons. Shift by one base and you&apos;re reading something completely different.
            That&apos;s the idea here: the same paper, read by someone who&apos;s actually running
            the models, hits differently than a press release.
          </p>
          <p>
            I write about methods, limitations, and actual significance — one post a month, without
            the press release layer.
          </p>
        </section>
        <section>
          <h2>Research interests</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {author.interests.map((interest) => (
              <div
                key={interest}
                className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-4"
              >
                <h3 className="text-base font-semibold">{interest}</h3>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Not taking guest posts, but happy to hear from other student researchers or anyone
            working in Bio/AI.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${social.email}`} className="rf-btn rf-btn-ghost">
              Email →
            </a>
            <a href={social.github} target="_blank" rel="noopener noreferrer" className="rf-btn rf-btn-ghost">
              GitHub →
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rf-btn rf-btn-ghost"
            >
              Instagram →
            </a>
            <Link href="/contact/" className="rf-btn rf-btn-primary">
              Contact form →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
