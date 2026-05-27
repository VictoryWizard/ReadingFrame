"use client";

import { getSiteConfig } from "@/lib/site";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { newsletter } = getSiteConfig();

  return (
    <form
      action={newsletter.action}
      method="post"
      target="_blank"
      rel="noopener noreferrer"
      className={compact ? "flex flex-col gap-2 sm:flex-row" : "mx-auto max-w-md space-y-3"}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email for monthly newsletter
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="EMAIL"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg)] px-4 py-2.5 text-sm text-[var(--rf-text)] outline-none focus:border-[var(--rf-accent)]"
      />
      <button type="submit" className="rf-btn rf-btn-primary shrink-0 justify-center">
        Subscribe
      </button>
      {!compact && (
        <p className="text-center text-xs text-[var(--rf-text-muted)]">
          One email per month. No hype. Unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
