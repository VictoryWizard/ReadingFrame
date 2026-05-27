"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("post-content");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight * 0.3;
      const scrolled = window.innerHeight - rect.top;
      setWidth(Math.min(Math.max(scrolled / total, 0), 1) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${width}%` }}
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
