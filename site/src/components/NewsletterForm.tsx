"use client";

import { FormEvent, useState } from "react";
import { getSiteConfig } from "@/lib/site";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { forms } = getSiteConfig();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const endpoint = forms.newsletter?.trim();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!endpoint) {
      setError("Newsletter signup is not configured yet. Check back soon.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "ReadingFrame newsletter signup" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again in a moment.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg border border-[var(--rf-accent)] bg-[color-mix(in_srgb,var(--rf-accent)_10%,transparent)] px-4 py-3 text-sm text-[var(--rf-text)]" role="status">
        You&apos;re subscribed. Watch your inbox for the next monthly breakdown.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={compact ? "flex flex-col gap-2 sm:flex-row" : "mx-auto max-w-md space-y-3"}
      aria-label="Newsletter signup"
    >
      <div className={compact ? "flex flex-1 flex-col gap-1 sm:flex-row" : "space-y-1"}>
        <label htmlFor="newsletter-email" className={compact ? "sr-only" : "text-sm font-medium"}>
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === "loading"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="flex-1 rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg)] px-4 py-2.5 text-sm text-[var(--rf-text)] outline-none focus:border-[var(--rf-accent)]"
        />
        {error && (
          <p id="newsletter-error" className="text-xs text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rf-btn rf-btn-primary shrink-0 justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {!compact && (
        <p className="text-center text-xs text-[var(--rf-text-muted)]">
          One email per month. No hype. Unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
