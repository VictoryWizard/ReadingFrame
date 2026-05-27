"use client";

import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";
import { CategoryChip } from "./CategoryChip";

export function PostFilters({
  posts,
  allCategories,
}: {
  posts: Post[];
  allCategories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat =
        category === "all" ||
        p.categories.some((c) => c.toLowerCase() === category.toLowerCase());
      const q = query.toLowerCase().trim();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="flex-1">
          <span className="sr-only">Filter posts</span>
          <input
            type="search"
            placeholder="Filter by title or summary…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--rf-accent)]"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              category === "all"
                ? "bg-[var(--rf-accent)] text-white"
                : "border border-[var(--rf-border)] text-[var(--rf-text-muted)]"
            }`}
          >
            All
          </button>
          {allCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={
                category === c ? "opacity-100 ring-2 ring-[var(--rf-accent)] rounded-full" : ""
              }
            >
              <CategoryChip name={c} linked={false} />
            </button>
          ))}
        </div>
      </div>
      <p className="mb-4 text-sm text-[var(--rf-text-muted)]">
        {filtered.length} post{filtered.length === 1 ? "" : "s"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
