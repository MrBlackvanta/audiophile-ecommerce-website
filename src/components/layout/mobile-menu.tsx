"use client";

import { MenuIcon } from "@/components/icons";
import { CategoryCards } from "@/components/sections";
import { cn, useOverlay } from "@/lib";
import { useEffect, useRef } from "react";
import { useHeaderPanel } from "./header-panels";

export default function MobileMenu() {
  const { open, toggle, close } = useHeaderPanel("menu");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlay(open, panelRef, toggleRef);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) close();
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open, close]);

  const closeOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") close();
  };

  const closeOnBackdrop = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={toggle}
        className="v-tap flex text-white"
      >
        <MenuIcon />
        <span className="sr-only">Menu</span>
      </button>

      <div
        id="site-menu"
        inert={!open}
        onKeyDown={closeOnEscape}
        onClick={closeOnBackdrop}
        className={cn(
          "invisible fixed inset-x-0 top-22.5 bottom-0 z-40 overflow-y-auto overscroll-contain bg-black/40 opacity-0 transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
          open && "visible opacity-100",
        )}
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          className="rounded-b-lg bg-white px-6 pt-8 pb-9 text-black outline-none md:px-10 md:pt-14 md:pb-17"
        >
          <nav aria-label="Menu">
            <CategoryCards onNavigate={close} />
          </nav>
        </div>
      </div>
    </div>
  );
}
