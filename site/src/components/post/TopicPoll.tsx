"use client";

import { useEffect, useState } from "react";

const options = [
  { id: "clear", label: "The methods section made sense." },
  { id: "partial", label: "I understood the headline, not the details." },
  { id: "lost", label: "I need more background on this topic." },
];

export function TopicPoll({ topic }: { topic: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const storageKey = `rf-poll-${topic}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setSelected(saved);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

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
      <p id="poll-question" className="mt-1 font-medium">
        After reading, how clear was this breakdown?
      </p>
      <fieldset className="mt-3 space-y-2 border-0 p-0" aria-labelledby="poll-question">
        <legend className="sr-only">Choose one response</legend>
        {options.map((o) => (
          <label
            key={o.id}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
              selected === o.id
                ? "border-[var(--rf-accent)] bg-[color-mix(in_srgb,var(--rf-accent)_12%,transparent)]"
                : "border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] hover:border-[var(--rf-accent)]"
            } ${selected && selected !== o.id ? "opacity-60" : ""}`}
          >
            <input
              type="radio"
              name={`poll-${topic}`}
              value={o.id}
              checked={selected === o.id}
              disabled={Boolean(selected)}
              onChange={() => vote(o.id)}
              className="mt-1 shrink-0 accent-[var(--rf-accent)]"
            />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>
      {selected && (
        <p className="mt-3 text-xs text-[var(--rf-text-muted)]" role="status">
          Thanks — your response is saved locally only.
        </p>
      )}
    </aside>
  );
}
