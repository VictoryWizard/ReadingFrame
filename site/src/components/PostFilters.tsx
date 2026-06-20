"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";
import { revealFadeInElements } from "@/lib/fade-in";
import { normalizeTopic, sanitizeTopics } from "@/lib/topics";

function postMatchesTopic(post: Post, selectedTopic: string): boolean {
  const target = normalizeTopic(selectedTopic);
  return post.topics.some((t) => normalizeTopic(t) === target);
}

function topicsFromPosts(posts: Post[]): string[] {
  return sanitizeTopics(posts.flatMap((p) => p.topics));
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
    const merged = allTopics?.length
      ? sanitizeTopics([...topicsFromPosts(posts), ...allTopics])
      : topicsFromPosts(posts);
    return merged.filter((t) => posts.some((p) => postMatchesTopic(p, t)));
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

  useLayoutEffect(() => {
    if (topic !== "all" && !topicOptions.includes(topic)) {
      setTopic("all");
    }
  }, [topic, topicOptions]);

  useLayoutEffect(() => {
    resultsRef.current?.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("visible");
    });
  }, [filtered, topic, query]);

  useEffect(() => {
    if (resultsRef.current) revealFadeInElements(resultsRef.current);
  }, [filtered]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Filter by title or summary</span>
          <input
            type="search"
            placeholder="Filter by title or summary…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="topic-filter-search w-full rounded-full border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--rf-accent)] focus-visible:ring-2 focus-visible:ring-[var(--rf-accent)] focus-visible:ring-offset-2"
            aria-label="Filter by title or summary"
          />
        </label>
        <div
          className="topic-filter-bar flex min-w-0 flex-wrap items-center gap-2"
          role="toolbar"
          aria-label="Filter by topic"
        >
          <button
            type="button"
            onClick={() => setTopic("all")}
            aria-pressed={topic === "all"}
            className={`topic-filter-pill rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rf-accent)] focus-visible:ring-offset-2 ${
              topic === "all"
                ? "bg-[var(--rf-accent)] text-white"
                : "border border-[var(--rf-border)] text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)]"
            }`}
          >
            All
          </button>
          {topicOptions.map((t) => {
            const isActive = topic === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                aria-pressed={isActive}
                className={`topic-filter-pill rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rf-accent)] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-[var(--rf-accent)] bg-[color-mix(in_srgb,var(--rf-accent)_15%,transparent)] text-[var(--rf-accent)]"
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
          <section
            key={`${topic}-${query}`}
            className="post-results-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Filtered posts"
          >
            {filtered.map((p) => (
              <div key={p.slug}>
                <PostCard post={p} animate={false} />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
