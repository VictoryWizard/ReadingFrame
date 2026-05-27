"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";
import { getSiteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts/", label: "Posts" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const categoryLinks = getSiteConfig().categories.map((c) => ({
  href: `/category/${c.slug}/`,
  label: c.name,
}));

export function SiteNav() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] h-[var(--rf-nav-h)] border-b border-[var(--rf-border)] bg-[color-mix(in_srgb,var(--rf-bg)_92%,transparent)] backdrop-blur-md">
        <div className="rf-container flex h-full items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
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
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                type="button"
                className="text-sm font-medium text-[var(--rf-text-muted)] hover:text-[var(--rf-accent)]"
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                Categories ▾
              </button>
              {catOpen && (
                <ul
                  className="absolute left-0 top-full mt-1 min-w-[200px] rounded-lg border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] py-2 shadow-lg"
                  role="menu"
                >
                  {categoryLinks.map((c) => (
                    <li key={c.href} role="none">
                      <Link
                        href={c.href}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-[var(--rf-text)] no-underline hover:bg-[var(--rf-bg-muted)]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden rounded-full border border-[var(--rf-border)] px-3 py-1.5 text-sm text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)] md:inline-flex"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              Search ⌘K
            </button>
            <button
              type="button"
              className="rounded-full border border-[var(--rf-border)] p-2 text-[var(--rf-text-muted)] hover:border-[var(--rf-accent)]"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
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
            aria-label="Mobile"
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
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--rf-text-muted)]">
              Categories
            </p>
            {categoryLinks.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block py-1.5 text-sm text-[var(--rf-text)] no-underline"
                onClick={() => setOpen(false)}
              >
                {c.label}
              </Link>
            ))}
            <button
              type="button"
              className="mt-3 w-full rounded-lg border border-[var(--rf-border)] py-2 text-sm"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
            >
              Search
            </button>
          </nav>
        )}
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
