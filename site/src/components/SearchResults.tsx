"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import lunr from "lunr";
import { TopicChip } from "./TopicChip";

type SearchItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  topics: string[];
  body: string;
};

export function SearchResults({ initialQuery = "" }: { initialQuery?: string }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [idx, setIdx] = useState<lunr.Index | null>(null);

  useEffect(() => {
    const fromUrl = searchParams.get("q");
    setQuery(fromUrl ?? initialQuery);
  }, [searchParams, initialQuery]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        setItems(data);
        const index = lunr(function () {
          this.ref("slug");
          this.field("title", { boost: 10 });
          this.field("excerpt", { boost: 5 });
          this.field("topics", { boost: 3 });
          this.field("body");
          data.forEach((doc) => this.add(doc));
        });
        setIdx(index);
      })
      .catch(() => {});
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    if (!idx) {
      const lower = q.toLowerCase();
      return items.filter(
        (i) =>
          i.title.toLowerCase().includes(lower) ||
          i.excerpt.toLowerCase().includes(lower) ||
          i.topics.some((t) => t.toLowerCase().includes(lower))
      );
    }
    try {
      return idx
        .search(q + "*")
        .map((r) => items.find((i) => i.slug === r.ref))
        .filter((x): x is SearchItem => Boolean(x));
    } catch {
      const lower = q.toLowerCase();
      return items.filter(
        (i) =>
          i.title.toLowerCase().includes(lower) || i.excerpt.toLowerCase().includes(lower)
      );
    }
  }, [idx, query, items]);

  const countLabel = `${results.length} ${results.length === 1 ? "result" : "results"}`;

  return (
    <div className="mt-8">
      <label htmlFor="search-page-input" className="sr-only">
        Search breakdowns
      </label>
      <input
        id="search-page-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by keyword or topic…"
        className="w-full max-w-xl rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-4 py-3 outline-none focus:border-[var(--rf-accent)]"
        aria-label="Search breakdowns"
      />
      <p className="mt-4 text-sm text-[var(--rf-text-muted)]" aria-live="polite">
        {query.trim() ? countLabel : `Showing all ${items.length} breakdowns`}
      </p>
      <ul className="mt-6 space-y-6">
        {query.trim() && results.length === 0 && (
          <li className="text-[var(--rf-text-muted)]">
            No results for “{query}”. Check spelling or try a broader term like “CRISPR” or
            “Neuralink”.
          </li>
        )}
        {results.map((r) => (
          <li
            key={r.slug}
            className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-5"
          >
            <div className="mb-2 flex flex-wrap gap-1.5">
              {r.topics.slice(0, 3).map((t) => (
                <TopicChip key={t} name={t} />
              ))}
            </div>
            <Link
              href={`/posts/${r.slug}/`}
              className="text-xl font-semibold text-[var(--rf-text)] no-underline hover:text-[var(--rf-accent)]"
            >
              {r.title}
            </Link>
            <p className="mt-2 text-sm text-[var(--rf-text-muted)]">{r.excerpt}</p>
            <Link
              href={`/posts/${r.slug}/`}
              className="mt-3 inline-block text-sm font-semibold text-[var(--rf-accent)] no-underline"
            >
              Read breakdown →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
