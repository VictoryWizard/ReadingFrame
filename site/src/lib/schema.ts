import { getSiteConfig } from "./site";
import { postOgImagePath } from "./og";
import type { Post } from "./types";

/** Canonical origin for the site. Keep in sync with metadataBase in layout.tsx. */
export const SITE_URL = "https://reading-frame.com";

/** Stable @id anchors so schema nodes on different pages reference the same entities. */
const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type Crumb = { name: string; url: string };

function socialProfiles(): string[] {
  const { social } = getSiteConfig();
  return [social.github, social.linkedin, social.instagram, social.x].filter(
    (v): v is string => Boolean(v)
  );
}

/** Person node for the author — used on About + referenced from every BlogPosting. */
export function personSchema() {
  const { author } = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: author.name,
    url: `${SITE_URL}/about/`,
    jobTitle: "Student researcher",
    description: author.bio,
    image: `${SITE_URL}/images/author.png`,
    knowsAbout: author.interests,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bentonville",
      addressRegion: "AR",
      addressCountry: "US",
    },
    sameAs: socialProfiles(),
  };
}

/** Organization node for the publisher (the blog as a brand). */
export function organizationSchema() {
  const { name, seoDescription } = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name,
    url: SITE_URL,
    description: seoDescription,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    founder: { "@id": PERSON_ID },
    sameAs: socialProfiles(),
  };
}

/** WebSite node with a SearchAction wired to the on-site search page. */
export function websiteSchema() {
  const { name, seoDescription } = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    url: SITE_URL,
    description: seoDescription,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** BreadcrumbList from an ordered list of { name, url } crumbs. */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Article (BlogPosting) node for an individual post. */
export function blogPostingSchema(post: Post) {
  const { author, name } = getSiteConfig();
  const url = `${SITE_URL}/posts/${post.slug}/`;
  const readMin = post.readingMinutes ?? 8;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: author.name,
      url: `${SITE_URL}/about/`,
      sameAs: socialProfiles(),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name,
      url: SITE_URL,
    },
    image: `${SITE_URL}${postOgImagePath(post.slug, post.image)}`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": WEBSITE_ID },
    articleSection: post.topics,
    keywords: post.topics.join(", "),
    timeRequired: `PT${readMin}M`,
    inLanguage: "en-US",
  };
}
