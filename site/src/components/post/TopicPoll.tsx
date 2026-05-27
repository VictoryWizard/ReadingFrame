"use client";

import { useState } from "react";

const options = [
  { id: "clear", label: "The methods section made sense" },
  { id: "partial", label: "I understood the headline, not the details" },
  { id: "lost", label: "I need more background on this topic" },
];

export function TopicPoll({ topic }: { topic: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const storageKey = `rf-poll-${topic}`;

  const vote = (id: string) => {
    setSelected(id);
    try {
      localStorage.setItem(storageKey, id);
    } catch {
      /* ignore */
    }
  };

  return (
    <aside
      className="my-10 rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-muted)] p-5"
      aria-label="Quick comprehension poll"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--rf-accent)]">
        Quick check
      </p>
      <p className="mt-1 font-medium">After reading, how clear was this breakdown?</p>
      <div className="mt-3 flex flex-col gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            disabled={Boolean(selected)}
            onClick={() => vote(o.id)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
              selected === o.id
                ? "border-[var(--rf-accent)] bg-[color-mix(in_srgb,var(--rf-accent)_12%,transparent)]"
                : "border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] hover:border-[var(--rf-accent)]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-3 text-xs text-[var(--rf-text-muted)]">Thanks — stored locally only.</p>
      )}
    </aside>
  );
}
