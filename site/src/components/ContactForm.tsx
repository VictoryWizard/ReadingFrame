"use client";

import { FormEvent, useState } from "react";
import { getSiteConfig } from "@/lib/site";

export function ContactForm() {
  const { forms } = getSiteConfig();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const endpoint = forms.contact?.trim();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    if (!endpoint) {
      setError(
        "The contact form isn't configured yet — please reach out via one of the links in the footer."
      );
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `ReadingFrame contact from ${name}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again or email directly.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg border border-[var(--rf-accent)] bg-[color-mix(in_srgb,var(--rf-accent)_10%,transparent)] px-4 py-3 text-sm" role="status">
        Message sent. I&apos;ll get back to you when I can.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-lg space-y-4" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={status === "loading"}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={status === "loading"}
          className="mt-1 w-full rounded-lg border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-3 py-2 outline-none focus:border-[var(--rf-accent)]"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "loading"} className="rf-btn rf-btn-primary disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
