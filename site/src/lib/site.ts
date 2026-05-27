import site from "../../content/site.json";
import type { CategoryMeta } from "./types";

export type SiteConfig = typeof site;

export function getSiteConfig(): SiteConfig {
  return site;
}

export function getCategoryMeta(slug: string): CategoryMeta | undefined {
  return site.categories.find((c) => c.slug === slug);
}

export function categorySlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
