"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type FontSize = "normal" | "large" | "xlarge";

type A11yContextValue = {
  highContrast: boolean;
  fontSize: FontSize;
  setHighContrast: (v: boolean) => void;
  setFontSize: (v: FontSize) => void;
};

const A11yContext = createContext<A11yContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-contrast",
      highContrast ? "high" : "normal"
    );
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [highContrast, fontSize]);

  return (
    <A11yContext.Provider
      value={{ highContrast, fontSize, setHighContrast, setFontSize }}
    >
      {children}
    </A11yContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
