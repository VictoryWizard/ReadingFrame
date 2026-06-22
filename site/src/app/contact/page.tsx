import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { getSiteConfig, encodeEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ReadingFrame.",
  alternates: { canonical: "https://reading-frame.com/contact/" },
};

export default function ContactPage() {
  const { social, author } = getSiteConfig();

  return (
    <div className="rf-container py-12">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-3 max-w-xl text-[var(--rf-text-muted)]">
        Reach {author.name} for questions about a breakdown, student research, or bio/AI topics.
      </p>

      <ContactForm />

      <p className="mt-6 text-sm text-[var(--rf-text-muted)]">
        Prefer email?{" "}
        <ObfuscatedEmail data={encodeEmail(social.email)} className="text-[var(--rf-accent)]" />
      </p>
    </div>
  );
}
