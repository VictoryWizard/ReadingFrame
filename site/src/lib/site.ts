import site from "../../content/site.json";
import type { TopicMeta } from "./types";

export type SiteConfig = typeof site;

export function getSiteConfig(): SiteConfig {
  return site;
}

export function getTopicMeta(slug: string): TopicMeta | undefined {
  return site.topics.find((t) => t.slug === slug);
}

export function topicSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
