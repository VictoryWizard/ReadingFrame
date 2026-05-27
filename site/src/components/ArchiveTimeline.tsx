import Link from "next/link";
import { formatMonthYear } from "@/lib/dates";
import type { Post } from "@/lib/types";

export function ArchiveTimeline({ posts }: { posts: Post[] }) {
  return (
    <ol className="relative border-l-2 border-[var(--rf-border)] pl-6">
      {posts.map((p) => (
        <li key={p.slug} className="fade-in mb-8 last:mb-0">
          <span
            className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-[var(--rf-accent)]"
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
