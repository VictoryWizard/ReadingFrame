import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 no-underline ${className}`}>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-sm font-bold text-white shadow-md"
        aria-hidden="true"
      >
        RF
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--rf-text)] group-hover:text-[var(--rf-accent)]">
          ReadingFrame
        </span>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--rf-text-muted)]">
          Bio / AI breakdowns
        </span>
      </span>
    </Link>
  );
}
