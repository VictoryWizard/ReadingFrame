import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export function SiteFooter() {
  const { social, name } = getSiteConfig();
  return (
    <footer className="mt-auto border-t border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] py-10">
      <div className="rf-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--rf-text)]">
            {name}
          </p>
          <p className="text-sm text-[var(--rf-text-muted)]">
            © {new Date().getFullYear()} ReadingFrame · reading-frame.com
          </p>
          <p className="text-sm text-[var(--rf-text-muted)]">Based in Bentonville, Arkansas</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
          {/* rel="me" links these profiles back to the site for identity verification (IndieAuth / rel-me). */}
          <a href={social.github} target="_blank" rel="me noopener noreferrer">
            GitHub
          </a>
          <a href={social.instagram} target="_blank" rel="me noopener noreferrer">
            Instagram
          </a>
          <a href={social.linkedin} target="_blank" rel="me noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/topics/">Topics</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
