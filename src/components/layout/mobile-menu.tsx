"use client";

import { MenuIcon } from "@/components/icons";
import { CategoryCards } from "@/components/sections";
import { cn, lockPageScroll } from "@/lib";
import { useEffect, useRef, useState } from "react";

function focusWhenVisible(element: HTMLElement | null) {
  return requestAnimationFrame(() =>
    requestAnimationFrame(() => element?.focus()),
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);

    const behind = document.querySelectorAll("main, footer");
    behind.forEach((element) => element.setAttribute("inert", ""));

    const unlock = lockPageScroll();
    const frame = focusWhenVisible(panelRef.current);
    const toggle = toggleRef.current;

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      behind.forEach((element) => element.removeAttribute("inert"));
      cancelAnimationFrame(frame);
      unlock();
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);

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
        onClick={() => setOpen(!open)}
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
