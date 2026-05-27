"use client";

import { useAccessibility } from "./providers/AccessibilityProvider";

export function AccessibilityToolbar() {
  const { highContrast, fontSize, setHighContrast, setFontSize } = useAccessibility();

  return (
    <div
      className="fixed bottom-4 right-4 z-[90] flex flex-col gap-1 rounded-lg border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-2 shadow-lg"
      role="region"
      aria-label="Accessibility options"
    >
      <button
        type="button"
        className="rounded px-2 py-1 text-xs font-medium text-[var(--rf-text-muted)] hover:bg-[var(--rf-bg-muted)]"
        onClick={() => setHighContrast(!highContrast)}
        aria-pressed={highContrast}
      >
        {highContrast ? "Normal contrast" : "High contrast"}
      </button>
      <button
        type="button"
        className="rounded px-2 py-1 text-xs font-medium text-[var(--rf-text-muted)] hover:bg-[var(--rf-bg-muted)]"
        onClick={() =>
          setFontSize(
            fontSize === "normal" ? "large" : fontSize === "large" ? "xlarge" : "normal"
          )
        }
      >
        Text: {fontSize}
      </button>
    </div>
  );
}
