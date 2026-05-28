import Image from "next/image";
import Link from "next/link";
import { formatMonthYear } from "@/lib/dates";
import { defaultImageAlt } from "@/lib/post-display";
import type { Post } from "@/lib/types";
import { TopicChip } from "./TopicChip";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="fade-in group overflow-hidden rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/posts/${post.slug}/`} className="block no-underline">
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--rf-bg-muted)]">
          <Image
            src={post.image}
            alt={defaultImageAlt(post)}
            fill
            loading="lazy"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {formatMonthYear(post.date)}
          </span>
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.topics.slice(0, 3).map((t) => (
              <TopicChip key={t} name={t} />
            ))}
          </div>
          <h2 className="mb-2 text-xl font-semibold text-[var(--rf-text)] group-hover:text-[var(--rf-accent)]">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-3 text-sm text-[var(--rf-text-muted)]">
            {post.excerpt}
          </p>
          <span className="text-sm font-semibold text-[var(--rf-accent)]">
            Read breakdown →
          </span>
        </div>
      </Link>
    </article>
  );
}
