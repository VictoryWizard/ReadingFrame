"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a contact link whose real email address never appears in the static
 * HTML. The address is passed base64-encoded; on the client we decode it and
 * rewrite the anchor into a mailto. Without JS the link falls back to the
 * contact form, so it degrades gracefully and stays accessible.
 *
 * We mutate the DOM node via a ref rather than React state on purpose — that
 * keeps the decoded address out of the server-rendered markup (and out of the
 * react-hooks/set-state-in-effect lint rule).
 */
export function ObfuscatedEmail({
  data,
  className,
  label,
}: {
  data: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let addr = "";
    try {
      addr = atob(data);
    } catch {
      return;
    }
    if (!addr) return;
    el.setAttribute("href", `mailto:${addr}`);
    if (!label) el.textContent = addr;
  }, [data, label]);

  return (
    <a ref={ref} href="/contact/" className={className}>
      {label ?? "Email via the contact form"}
    </a>
  );
}
