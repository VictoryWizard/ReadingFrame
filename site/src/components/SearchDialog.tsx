"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import lunr from "lunr";

type SearchItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories: string[];
  body: string;
};

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [idx, setIdx] = useState<lunr.Index | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        setItems(data);
        const index = lunr(function () {
          this.ref("slug");
          this.field("title", { boost: 10 });
          this.field("excerpt", { boost: 5 });
          this.field("categories", { boost: 3 });
          this.field("body");
          data.forEach((doc) => this.add(doc));
        });
        setIdx(index);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!idx || !query.trim()) return items.slice(0, 6);
    try {
      return idx
        .search(query + "*")
        .map((r) => items.find((i) => i.slug === r.ref))
        .filter((x): x is SearchItem => Boolean(x))
        .slice(0, 8);
    } catch {
      const q = query.toLowerCase();
      return items
        .filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            i.excerpt.toLowerCase().includes(q)
        )
        .slice(0, 8);
    }
  }, [idx, query, items]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center bg-black/50 p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search posts"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          type="search"
          placeholder="Search breakdowns…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-b border-[var(--rf-border)] bg-transparent px-4 py-3 text-[var(--rf-text)] outline-none"
          aria-label="Search query"
        />
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-4 text-sm text-[var(--rf-text-muted)]">
              No matches.
            </li>
          )}
          {results.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/posts/${r.slug}/`}
                className="block rounded-lg px-3 py-2 no-underline hover:bg-[var(--rf-bg-muted)]"
                onClick={onClose}
              >
                <span className="font-medium text-[var(--rf-text)]">{r.title}</span>
                <span className="mt-0.5 block text-xs text-[var(--rf-text-muted)] line-clamp-1">
                  {r.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
