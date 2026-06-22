// Generates raster social/Open Graph + schema images from the brand fonts.
// Run with: npm run og   (after adding/renaming a post)
//
// Why this exists: Google structured-data images and most social-card scrapers
// do NOT support SVG. The site's illustrations are SVG, so we render proper
// 1200x630 PNG cards (post title + wordmark in the real Fraunces/Source Sans
// fonts), a square Organization logo, and a rasterized author portrait.
//
// Output PNGs are committed to the repo, so the production build never depends
// on this toolchain. Post pages fall back to the SVG when a card is missing
// (see src/lib/og.ts), so a freshly added post still builds before `npm run og`.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const postsDir = path.join(root, "content/posts");
const imagesDir = path.join(root, "public/images");
const ogDir = path.join(imagesDir, "og");
fs.mkdirSync(ogDir, { recursive: true });

const site = JSON.parse(fs.readFileSync(path.join(root, "content/site.json"), "utf8"));

const fontFile = (p) => fs.readFileSync(path.join(root, "node_modules/@fontsource", p));
const fonts = [
  { name: "Fraunces", data: fontFile("fraunces/files/fraunces-latin-700-normal.woff"), weight: 700, style: "normal" },
  { name: "SourceSans", data: fontFile("source-sans-3/files/source-sans-3-latin-600-normal.woff"), weight: 600, style: "normal" },
  { name: "SourceSans", data: fontFile("source-sans-3/files/source-sans-3-latin-400-normal.woff"), weight: 400, style: "normal" },
];

const BG = "linear-gradient(135deg, #0b3a57 0%, #052f49 55%, #04263b 100%)";
const ACCENT = "#5eead4";

const div = (style, children) => ({ type: "div", props: { style, children } });
const text = (style, value) => ({ type: "div", props: { style, children: value } });
// Childless decorative element — satori miscounts children if you pass [].
const box = (style) => ({ type: "div", props: { style: { display: "flex", ...style } } });

function wordmark() {
  return div({ display: "flex", alignItems: "center", gap: 16 }, [
    box({ width: 28, height: 28, borderRadius: 999, background: "linear-gradient(135deg,#38bdf8,#2dd4bf)" }),
    text({ fontFamily: "Fraunces", fontSize: 32, color: "#e2f3fb" }, "ReadingFrame"),
  ]);
}

function titleSize(title) {
  if (title.length > 64) return 50;
  if (title.length > 46) return 58;
  return 68;
}

function card({ eyebrow, title, subtitle, footerRight }) {
  const middle = [
    eyebrow &&
      text(
        { fontSize: 24, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: ACCENT },
        eyebrow
      ),
    text(
      { fontFamily: "Fraunces", fontSize: titleSize(title), color: "#f8fbff", lineHeight: 1.12, overflow: "hidden" },
      title
    ),
    subtitle && text({ fontSize: 27, color: "#9fb8cc", lineHeight: 1.4 }, subtitle),
  ].filter(Boolean);

  return div(
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: BG,
      padding: "60px 72px",
      fontFamily: "SourceSans",
      position: "relative",
    },
    [
      box({ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "linear-gradient(90deg,#0284c7,#0d9488)" }),
      wordmark(),
      div({ display: "flex", flexDirection: "column", gap: 20 }, middle),
      div({ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#7fa0b8" }, [
        text({}, "reading-frame.com"),
        text({}, footerRight || ""),
      ]),
    ]
  );
}

function logo() {
  return div(
    { width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, background: "#04263b" },
    [
      div(
        { width: 232, height: 232, borderRadius: 52, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0284c7,#0d9488)" },
        [text({ fontFamily: "Fraunces", fontSize: 132, color: "#ffffff" }, "RF")]
      ),
      text({ fontFamily: "Fraunces", fontSize: 46, color: "#e2f3fb" }, "ReadingFrame"),
    ]
  );
}

async function toPng(element, width, height) {
  const svg = await satori(element, { width, height, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}

function fmtDate(value) {
  const d = new Date(value);
  return d.toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" });
}

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => matter(fs.readFileSync(path.join(postsDir, f), "utf8")).data);

let count = 0;
for (const p of posts) {
  const png = await toPng(
    card({ eyebrow: (p.topics ?? [])[0] ?? "Breakdown", title: p.title, footerRight: fmtDate(p.date) }),
    1200,
    630
  );
  fs.writeFileSync(path.join(ogDir, `${p.slug}.png`), png);
  count++;
}

// Homepage card
fs.writeFileSync(
  path.join(ogDir, "home.png"),
  await toPng(card({ eyebrow: site.brandLine, title: site.tagline, subtitle: site.seoDescription }), 1200, 630)
);

// Organization logo (square)
fs.writeFileSync(path.join(imagesDir, "logo.png"), await toPng(logo(), 512, 512));

// Author portrait — rasterize the existing SVG for Person schema image
const portraitSvg = fs.readFileSync(path.join(imagesDir, "author-portrait.svg"), "utf8");
fs.writeFileSync(
  path.join(imagesDir, "author.png"),
  new Resvg(portraitSvg, { fitTo: { mode: "width", value: 512 } }).render().asPng()
);

console.log(`Wrote ${count} post OG cards + home.png + logo.png + author.png`);
