"use client";

import type { Post } from "@/lib/types";

export function ShareBar({ post, url }: { post: Post; url: string }) {
  const text = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(url);

  const copyLink = () => {
    void navigator.clipboard?.writeText(url);
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 border-y border-[var(--rf-border)] py-4"
      aria-label="Share this post"
    >
      <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-[var(--rf-text-muted)]">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rf-btn rf-btn-ghost py-1 text-xs no-underline"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rf-btn rf-btn-ghost py-1 text-xs no-underline"
      >
        LinkedIn
      </a>
      <button type="button" className="rf-btn rf-btn-ghost py-1 text-xs" onClick={copyLink}>
        Copy link
      </button>
    </div>
  );
}
