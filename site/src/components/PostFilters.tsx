"use client";

import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";
import { TopicChip } from "./TopicChip";

export function PostFilters({
  posts,
  allTopics,
}: {
  posts: Post[];
  allTopics: string[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTopic =
        topic === "all" ||
        p.topics.some((t) => t.toLowerCase() === topic.toLowerCase());
      const q = query.toLowerCase().trim();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchTopic && matchQ;
    });
  }, [posts, query, topic]);

  const countLabel = `${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="flex-1">
          <span className="sr-only">Filter by topic</span>
          <input
            type="search"
            placeholder="Filter by title or summary…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--rf-accent)]"
            aria-label="Filter by topic"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Topic tags">
          <button
            type="button"
            onClick={() => setTopic("all")}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              topic === "all"
                ? "bg-[var(--rf-accent)] text-white"
                : "border border-[var(--rf-border)] text-[var(--rf-text-muted)]"
            }`}
          >
            All topics
          </button>
          {allTopics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={
                topic === t ? "rounded-full ring-2 ring-[var(--rf-accent)]" : "rounded-full"
              }
            >
              <TopicChip name={t} linked={false} />
            </button>
          ))}
        </div>
      </div>
      <p className="mb-4 text-sm text-[var(--rf-text-muted)]" aria-live="polite">
        {countLabel}
      </p>
      {filtered.length === 0 ? (
        <p className="text-[var(--rf-text-muted)]">No posts match this topic or search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
