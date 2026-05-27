import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ReadingFrame.",
};

export default function ContactPage() {
  const { social, author } = getSiteConfig();

  return (
    <div className="rf-container py-12">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-3 max-w-xl text-[var(--rf-text-muted)]">
        Reach {author.name} for questions about a breakdown, student research, or Bio/AI topics.
      </p>

      <form
        className="mt-8 max-w-lg space-y-4"
        action={`mailto:${social.email}`}
        method="post"
        encType="text/plain"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-3 py-2 outline-none focus:border-[var(--rf-accent)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-3 py-2 outline-none focus:border-[var(--rf-accent)]"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-lg border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-3 py-2 outline-none focus:border-[var(--rf-accent)]"
          />
        </div>
        <button type="submit" className="rf-btn rf-btn-primary">
          Send via email client
        </button>
        <p className="text-xs text-[var(--rf-text-muted)]">
          Or email directly:{" "}
          <a href={`mailto:${social.email}`}>{social.email}</a>
        </p>
      </form>
    </div>
  );
}
