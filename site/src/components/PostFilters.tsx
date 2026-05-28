"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";
import { revealFadeInElements } from "@/lib/fade-in";

function normalizeTopic(value: string): string {
  return value.trim().toLowerCase();
}

function postMatchesTopic(post: Post, selectedTopic: string): boolean {
  const target = normalizeTopic(selectedTopic);
  return post.topics.some((t) => normalizeTopic(t) === target);
}

function topicsFromPosts(posts: Post[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.topics.forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function PostFilters({
  posts,
  allTopics,
}: {
  posts: Post[];
  allTopics?: string[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | "all">("all");
  const resultsRef = useRef<HTMLDivElement>(null);

  const topicOptions = useMemo(() => {
    const fromPosts = topicsFromPosts(posts);
    if (!allTopics?.length) return fromPosts;
    const inPosts = new Set(fromPosts.map(normalizeTopic));
    const merged = [...fromPosts];
    for (const t of allTopics) {
      if (!inPosts.has(normalizeTopic(t))) merged.push(t);
    }
    return merged.sort((a, b) => a.localeCompare(b));
  }, [posts, allTopics]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      const matchTopic = topic === "all" || postMatchesTopic(p, topic);
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.topics.some((t) => t.toLowerCase().includes(q));
      return matchTopic && matchQ;
    });
  }, [posts, query, topic]);

  const countLabel = `${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`;

  const liveMessage = useMemo(() => {
    if (topic === "all" && !query.trim()) {
      return `Showing all ${filtered.length} posts.`;
    }
    if (filtered.length === 0) {
      const topicPart = topic === "all" ? "" : ` for topic ${topic}`;
      const searchPart = query.trim() ? ` matching “${query.trim()}”` : "";
      return `No posts found${topicPart}${searchPart}.`;
    }
    const topicPart = topic === "all" ? "" : ` tagged ${topic}`;
    const searchPart = query.trim() ? ` matching “${query.trim()}”` : "";
    return `Showing ${filtered.length} ${filtered.length === 1 ? "post" : "posts"}${topicPart}${searchPart}.`;
  }, [filtered.length, topic, query]);

  const selectTopic = (next: string | "all") => {
    setTopic(next);
  };

  useLayoutEffect(() => {
    if (!resultsRef.current) return;
    resultsRef.current.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("visible");
    });
  }, [filtered, topic, query]);

  useEffect(() => {
    if (!resultsRef.current) return;
    revealFadeInElements(resultsRef.current);
  }, [filtered]);

  const topicHasPosts = (name: string) => posts.some((p) => postMatchesTopic(p, name));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="flex-1">
          <span className="sr-only">Filter by title or summary</span>
          <input
            type="search"
            placeholder="Filter by title or summary…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--rf-accent)]"
            aria-label="Filter by title or summary"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          <button
            type="button"
            onClick={() => selectTopic("all")}
            aria-pressed={topic === "all"}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              topic === "all"
                ? "bg-[var(--rf-accent)] text-white"
                : "border border-[var(--rf-border)] text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)]"
            }`}
          >
            All topics
          </button>
          {topicOptions.map((t) => {
            const isActive = topic === t;
            const disabled = !topicHasPosts(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => selectTopic(t)}
                aria-pressed={isActive}
                disabled={disabled}
                title={disabled ? "No posts in this list with this topic" : undefined}
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                  isActive
                    ? "border-[var(--rf-accent)] bg-[color-mix(in_srgb,var(--rf-accent)_15%,transparent)] text-[var(--rf-accent)] ring-2 ring-[var(--rf-accent)]"
                    : disabled
                      ? "cursor-not-allowed border-[var(--rf-border)] text-[var(--rf-text-muted)] opacity-40"
                      : "border-[var(--rf-border)] text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
      <p className="mb-4 text-sm text-[var(--rf-text-muted)]" aria-hidden="true">
        {countLabel}
      </p>

      <div ref={resultsRef}>
        {filtered.length === 0 ? (
          <p className="text-[var(--rf-text-muted)]" role="status">
            No posts match this topic or search.
          </p>
        ) : (
          <ul
            key={`${topic}-${query}`}
            className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Filtered posts"
          >
            {filtered.map((p) => (
              <li key={p.slug} className="list-none">
                <PostCard post={p} animate={false} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
