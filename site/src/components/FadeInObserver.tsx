"use client";

import { useEffect } from "react";
import { revealFadeInElements } from "@/lib/fade-in";

export function FadeInObserver() {
  useEffect(() => {
    revealFadeInElements();

    const observer = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some((m) => m.addedNodes.length > 0);
      if (hasNewNodes) revealFadeInElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
