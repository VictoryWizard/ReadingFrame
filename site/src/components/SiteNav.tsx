"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useSearch } from "./SearchProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts/", label: "Posts" },
  { href: "/topics/", label: "Topics" },
  { href: "/resources/", label: "Resources" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { openSearch } = useSearch();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] h-[var(--rf-nav-h)] border-b border-[var(--rf-border)] bg-[color-mix(in_srgb,var(--rf-bg)_92%,transparent)] backdrop-blur-md">
      <div className="rf-container flex h-full items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium no-underline ${
                isActive(l.href)
                  ? "text-[var(--rf-accent)]"
                  : "text-[var(--rf-text-muted)] hover:text-[var(--rf-accent)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-full border border-[var(--rf-border)] px-3 py-1.5 text-sm text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)] md:inline-flex"
            onClick={openSearch}
            aria-label="Open search"
          >
            Search ⌘K
          </button>
          <button
            type="button"
            className="rounded-full border border-[var(--rf-border)] p-2 text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)]"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
          >
            {mounted && (resolvedTheme === "dark" ? "☀️" : "🌙")}
          </button>
          <button
            type="button"
            className="rounded-full border border-[var(--rf-border)] p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] px-4 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-[var(--rf-text)] no-underline"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-[var(--rf-border)] py-2 text-sm"
            onClick={() => {
              setOpen(false);
              openSearch();
            }}
          >
            Search
          </button>
        </nav>
      )}
    </header>
  );
}
