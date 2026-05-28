import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search ReadingFrame breakdowns by title, topic, or keyword.",
  alternates: { canonical: "https://reading-frame.com/search/" },
};

export default function SearchPage() {
  return (
    <div className="rf-container py-12">
      <h1 className="text-3xl font-semibold">Search</h1>
      <p className="mt-2 text-[var(--rf-text-muted)]">
        Find breakdowns by title, summary, or topic tag.
      </p>
      <Suspense fallback={<p className="mt-8 text-[var(--rf-text-muted)]">Loading search…</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
