import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig, encodeEmail } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { personSchema, breadcrumbSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "ReadingFrame is written by Heram Nagabhairu, a high school researcher in Bentonville, Arkansas interested in ML, bioinformatics, and computational biology.",
  alternates: { canonical: "https://reading-frame.com/about/" },
};

export default function AboutPage() {
  const { author, social, name } = getSiteConfig();

  const structuredData = [
    personSchema(),
    breadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "About", url: `${SITE_URL}/about/` },
    ]),
  ];

  return (
    <div className="rf-container py-12">
      <JsonLd data={structuredData} />

      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
          The author
        </span>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">About {name}</h1>
        {/* Plain-text identity block — easy for both readers and language models
            to extract: who, what, where, and areas of expertise. */}
        <p className="mt-3 text-[var(--rf-text-muted)]">
          <strong className="text-[var(--rf-text)]">{author.name}</strong> · {author.role} ·
          writing about {author.interests.slice(0, 3).join(", ").toLowerCase()}, and more.
        </p>
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
          <h2>Mentions &amp; coverage</h2>
          <p>
            ReadingFrame is an independent, student-run blog. It hasn&apos;t been featured in
            outside press yet — as breakdowns get cited, linked, or covered, they&apos;ll be listed
            here. If you&apos;ve referenced a post, I&apos;d genuinely like to know.
          </p>
          <p className="text-sm text-[var(--rf-text-muted)]">
            <em>No external mentions to list yet — check back as the archive grows.</em>
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Not taking guest posts, but happy to hear from other student researchers or anyone
            working in Bio/AI.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ObfuscatedEmail
              data={encodeEmail(social.email)}
              label="Email →"
              className="rf-btn rf-btn-ghost"
            />
            <a href={social.github} target="_blank" rel="me noopener noreferrer" className="rf-btn rf-btn-ghost">
              GitHub →
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="me noopener noreferrer"
              className="rf-btn rf-btn-ghost"
            >
              LinkedIn →
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="me noopener noreferrer"
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
