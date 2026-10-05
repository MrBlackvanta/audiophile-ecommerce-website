"use client";

import { useEffect, type RefObject } from "react";
import { lockPageScroll } from "./scroll-lock";

function focusWhenVisible(element: HTMLElement | null) {
  return requestAnimationFrame(() =>
    requestAnimationFrame(() => element?.focus()),
  );
}

export function useOverlay(
  open: boolean,
  panelRef: RefObject<HTMLElement | null>,
  toggleRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    const behind = document.querySelectorAll("main, footer");
    behind.forEach((element) => element.setAttribute("inert", ""));

    const unlock = lockPageScroll();
    const frame = focusWhenVisible(panelRef.current);
    const toggle = toggleRef.current;

    return () => {
      behind.forEach((element) => element.removeAttribute("inert"));
      cancelAnimationFrame(frame);
      unlock();
      toggle?.focus({ preventScroll: true });
    };
  }, [open, panelRef, toggleRef]);
}
