import Link from "next/link";
import { formatMonthYear } from "@/lib/dates";
import type { Post } from "@/lib/types";

export function ArchiveTimeline({ posts }: { posts: Post[] }) {
  return (
    <ol className="timeline-list relative list-none border-l-2 border-[var(--rf-border)] pl-6">
      {posts.map((p) => (
        <li key={p.slug} className="timeline-item relative mb-8 list-none last:mb-0">
          <span
            className="timeline-dot absolute left-0 top-2 h-3 w-3 -translate-x-[calc(50%+1px)] rounded-full bg-[var(--rf-accent)]"
            aria-hidden="true"
          />
          <time className="text-xs font-semibold uppercase tracking-wider text-[var(--rf-text-muted)]">
            {formatMonthYear(p.date)}
          </time>
          <Link
            href={`/posts/${p.slug}/`}
            className="mt-1 block text-lg font-semibold text-[var(--rf-text)] no-underline hover:text-[var(--rf-accent)]"
          >
            {p.title}
          </Link>
          <p className="mt-1 text-sm text-[var(--rf-text-muted)] line-clamp-2">{p.excerpt}</p>
        </li>
      ))}
    </ol>
  );
}
