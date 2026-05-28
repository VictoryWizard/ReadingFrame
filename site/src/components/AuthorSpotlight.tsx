import Image from "next/image";
import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export function AuthorSpotlight() {
  const { author, social } = getSiteConfig();

  return (
    <section className="fade-in py-16">
      <div className="rf-container">
        <div className="grid gap-10 rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-8 md:grid-cols-[auto_1fr] md:p-10">
          <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full ring-4 ring-[color-mix(in_srgb,var(--rf-accent)_30%,transparent)]">
            <Image
              src={author.portrait}
              alt={author.portraitAlt ?? `Portrait of ${author.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
              Author spotlight
            </span>
            <h2 className="mt-2 text-2xl font-semibold">{author.name}</h2>
            <p className="text-sm text-[var(--rf-text-muted)]">{author.role}</p>
            <p className="mt-4 max-w-prose text-[var(--rf-text-muted)]">{author.bio}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--rf-text-muted)]">
              {author.interests.map((i) => (
                <li
                  key={i}
                  className="rounded-full bg-[var(--rf-bg-muted)] px-3 py-1"
                >
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rf-btn rf-btn-ghost text-sm"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rf-btn rf-btn-ghost text-sm"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rf-btn rf-btn-ghost text-sm"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a href={`mailto:${social.email}`} className="rf-btn rf-btn-ghost text-sm">
                Email
              </a>
              <Link href="/about/" className="rf-btn rf-btn-primary text-sm">
                Full bio →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
