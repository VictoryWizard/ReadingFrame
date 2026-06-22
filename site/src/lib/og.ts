import fs from "fs";
import path from "path";

/**
 * Returns the public path to a post's raster OG card (1200x630 PNG) generated
 * by `npm run og`, or the provided fallback (the post's SVG) when the card
 * doesn't exist yet. This lets a freshly added post build before its card is
 * generated — server-only (uses fs), called during the static build.
 */
export function postOgImagePath(slug: string, fallback: string): string {
  const abs = path.join(process.cwd(), "public", "images", "og", `${slug}.png`);
  try {
    return fs.existsSync(abs) ? `/images/og/${slug}.png` : fallback;
  } catch {
    return fallback;
  }
}
