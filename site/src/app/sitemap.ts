import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://reading-frame.com";
  const posts = getAllPosts();
  const topics = getSiteConfig().topics;

  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/posts/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/topics/`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/resources/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/search/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about/`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact/`, changeFrequency: "yearly", priority: 0.5 },
    ...topics.map((t) => ({
      url: `${base}/topics/${t.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/posts/${p.slug}/`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
