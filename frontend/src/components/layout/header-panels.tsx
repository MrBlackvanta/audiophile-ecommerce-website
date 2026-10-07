"use client";

import { createContext, use, useState, type ReactNode } from "react";

type PanelName = "menu" | "cart";

const PanelContext = createContext<{
  current: PanelName | null;
  toggle: (name: PanelName) => void;
  close: () => void;
} | null>(null);

export default function HeaderPanels({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PanelName | null>(null);

  return (
    <PanelContext
      value={{
        current,
        toggle: (name) => setCurrent((open) => (open === name ? null : name)),
        close: () => setCurrent(null),
      }}
    >
      {children}
    </PanelContext>
  );
}

export function useHeaderPanel(name: PanelName) {
  const panels = use(PanelContext);

  if (!panels) {
    throw new Error("useHeaderPanel must be used within HeaderPanels");
  }

  return {
    open: panels.current === name,
    toggle: () => panels.toggle(name),
    close: panels.close,
  };
}
