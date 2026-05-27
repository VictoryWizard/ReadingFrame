import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPostSlugs,
  getPostBySlug,
  markdownToHtml,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { formatPostDate } from "@/lib/dates";
import { getSiteConfig } from "@/lib/site";
import { CategoryChip } from "@/components/CategoryChip";
import { ReadingProgress } from "@/components/post/ReadingProgress";
import { PostSidebar } from "@/components/post/PostSidebar";
import { ShareBar } from "@/components/post/ShareBar";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import { GiscusComments } from "@/components/post/GiscusComments";
import { TopicPoll } from "@/components/post/TopicPoll";
import { NewsletterForm } from "@/components/NewsletterForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `https://reading-frame.com/posts/${slug}/`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url,
      images: [{ url: post.image }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);
  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);
  const { author } = getSiteConfig();
  const url = `https://reading-frame.com/posts/${slug}/`;
  const readMin = post.readingMinutes ?? 8;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: author.name,
    },
    image: `https://reading-frame.com${post.image}`,
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <article>
        <header className="relative border-b border-[var(--rf-border)]">
          <div className="relative h-48 md:h-64">
            <Image src={post.image} alt="" fill className="object-cover opacity-90" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--rf-bg)] to-transparent" />
          </div>
          <div className="rf-container -mt-16 relative pb-8">
            <Link
              href="/posts/"
              className="text-sm text-[var(--rf-accent)] no-underline hover:underline"
            >
              ← All posts
            </Link>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <CategoryChip key={c} name={c} />
              ))}
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold md:text-4xl">{post.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-[var(--rf-text-muted)]">{post.excerpt}</p>
            <p className="mt-4 text-sm text-[var(--rf-text-muted)]">
              By {author.name} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · ~
              {readMin} min read
            </p>
          </div>
        </header>

        <div className="rf-container grid gap-10 py-10 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_minmax(0,680px)_1fr]">
          <PostSidebar toc={post.toc} takeaways={post.takeaways} />

          <div className="min-w-0 xl:col-start-2">
            <ShareBar post={post} url={url} />
            <div
              id="post-content"
              className="prose-rf"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <TopicPoll topic={slug} />
            <ShareBar post={post} url={url} />

            <section className="mt-10 rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-6">
              <div className="flex gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-lg font-bold text-white"
                  aria-hidden="true"
                >
                  {author.initials}
                </div>
                <div>
                  <p className="font-semibold">{author.name}</p>
                  <p className="text-sm text-[var(--rf-text-muted)]">{author.role}</p>
                  <p className="mt-2 text-sm text-[var(--rf-text-muted)]">{author.bio}</p>
                  <Link href="/about/" className="mt-2 inline-block text-sm font-semibold text-[var(--rf-accent)]">
                    More about me →
                  </Link>
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-[var(--rf-radius)] bg-gradient-to-br from-sky-500/10 to-emerald-500/15 p-8 text-center">
              <h2 className="text-xl font-semibold">Get the next breakdown</h2>
              <p className="mt-2 text-sm text-[var(--rf-text-muted)]">
                Subscribe for one monthly email — methods, limits, and what it actually means.
              </p>
              <div className="mt-4">
                <NewsletterForm compact />
              </div>
            </section>

            <RelatedPosts posts={related} />

            <GiscusComments />

            <nav className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--rf-border)] pt-8">
              {prev ? (
                <Link href={`/posts/${prev.slug}/`} className="rf-btn rf-btn-ghost text-sm">
                  ← {prev.title.slice(0, 40)}
                  {prev.title.length > 40 ? "…" : ""}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/posts/${next.slug}/`} className="rf-btn rf-btn-ghost text-sm">
                  {next.title.slice(0, 40)}
                  {next.title.length > 40 ? "…" : ""} →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </div>
      </article>
    </>
  );
}
