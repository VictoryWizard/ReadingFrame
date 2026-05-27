"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { getSiteConfig } from "@/lib/site";

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const giscus = getSiteConfig().giscus;

  useEffect(() => {
    if (!ref.current || giscus.repoId === "REPLACE") return;
    ref.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", giscus.repo);
    script.setAttribute("data-repo-id", giscus.repoId);
    script.setAttribute("data-category", giscus.category);
    script.setAttribute("data-category-id", giscus.categoryId);
    script.setAttribute("data-mapping", giscus.mapping);
    script.setAttribute("data-reactions-enabled", String(giscus.reactionsEnabled));
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark_dimmed" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;
    ref.current.appendChild(script);
  }, [resolvedTheme, giscus]);

  if (giscus.repoId === "REPLACE") {
    return (
      <section className="rounded-[var(--rf-radius)] border border-dashed border-[var(--rf-border)] p-6 text-center text-sm text-[var(--rf-text-muted)]">
        <p>
          Comments powered by{" "}
          <a href="https://giscus.app" target="_blank" rel="noopener noreferrer">
            giscus
          </a>
          . Add your GitHub repo IDs in <code>content/site.json</code> to enable.
        </p>
      </section>
    );
  }

  return <div ref={ref} className="giscus mt-10" />;
}
