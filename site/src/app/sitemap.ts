import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://reading-frame.com";
  const posts = getAllPosts();
  const categories = getSiteConfig().categories;

  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/posts/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about/`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact/`, changeFrequency: "yearly", priority: 0.5 },
    ...categories.map((c) => ({
      url: `${base}/category/${c.slug}/`,
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
