"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { getSiteConfig } from "@/lib/site";

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { comments, giscus } = getSiteConfig();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const useGiscus = giscus.categoryId && giscus.categoryId.length > 0;

    if (useGiscus) {
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
      return;
    }

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", comments.repo);
    script.setAttribute("issue-term", comments.issueTerm);
    script.setAttribute("label", comments.label);
    script.setAttribute("theme", resolvedTheme === "dark" ? "github-dark" : "github-light");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    ref.current.appendChild(script);
  }, [resolvedTheme, pathname, comments, giscus]);

  return (
    <section className="mt-10" aria-label="Comments">
      <h2 className="mb-4 text-xl font-semibold">Discussion</h2>
      <p className="mb-4 text-sm text-[var(--rf-text-muted)]">
        Comments are powered by GitHub. Sign in with GitHub to join the discussion on this
        breakdown.
      </p>
      <div ref={ref} />
    </section>
  );
}
