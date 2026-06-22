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

/** Base64-encode an email so it can be passed to <ObfuscatedEmail> and kept
 *  out of the rendered HTML (defeats HTML-scraping address harvesters).
 *  Note: the raw address still lives in content/site.json and is currently
 *  bundled into client JS because some client components import the full
 *  config — so a JS-parsing scraper could still recover it. Fully removing it
 *  would require feeding client components only the fields they need. */
export function encodeEmail(email: string): string {
  return Buffer.from(email, "utf8").toString("base64");
}
