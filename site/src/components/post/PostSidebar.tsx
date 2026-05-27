"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/types";

export function PostSidebar({
  toc,
  takeaways,
}: {
  toc: TocItem[];
  takeaways: string[];
}) {
  const [tocOpen, setTocOpen] = useState(true);
  const [takeOpen, setTakeOpen] = useState(true);

  return (
    <aside className="space-y-4 lg:sticky lg:top-[calc(var(--rf-nav-h)+1.5rem)] lg:self-start">
      <details
        open={tocOpen}
        onToggle={(e) => setTocOpen((e.target as HTMLDetailsElement).open)}
        className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)]"
      >
        <summary className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--rf-text-muted)]">
          In this article
        </summary>
        <nav className="border-t border-[var(--rf-border)] px-4 py-3" aria-label="Table of contents">
          <ol className="list-none space-y-2 text-sm">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[var(--rf-text-muted)] no-underline hover:text-[var(--rf-accent)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </details>

      <details
        open={takeOpen}
        onToggle={(e) => setTakeOpen((e.target as HTMLDetailsElement).open)}
        className="rounded-[var(--rf-radius)] border border-[color-mix(in_srgb,var(--rf-accent)_35%,var(--rf-border))] bg-[color-mix(in_srgb,var(--rf-accent)_8%,var(--rf-bg-elevated))]"
      >
        <summary className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--rf-accent)]">
          ✦ Key takeaways
        </summary>
        <ul className="list-none space-y-2 border-t border-[var(--rf-border)] px-4 py-3 text-sm">
          {takeaways.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-[var(--rf-accent)]" aria-hidden="true">
                •
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </details>
    </aside>
  );
}
