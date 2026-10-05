"use client";

import { findProduct } from "@/data";
import type { ProductSlug } from "@/data";
import { useSyncExternalStore } from "react";

export type CartLine = {
  slug: ProductSlug;
  quantity: number;
};

export const maxQuantity = 99;

const storageKey = "audiophile-cart";
const empty: CartLine[] = [];
const listeners = new Set<() => void>();

function toLine(value: unknown): CartLine[] {
  if (typeof value !== "object" || value === null) return [];
  const { slug, quantity } = value as Record<string, unknown>;
  if (typeof slug !== "string" || !findProduct(slug)) return [];
  if (typeof quantity !== "number" || !Number.isInteger(quantity)) return [];
  if (quantity < 1) return [];
  return [
    { slug: slug as ProductSlug, quantity: Math.min(quantity, maxQuantity) },
  ];
}

function readStoredLines(): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(storageKey) ?? "",
    );
    if (!Array.isArray(parsed)) return empty;
    const lines = parsed.flatMap(toLine);
    return lines.length > 0 ? lines : empty;
  } catch {
    return empty;
  }
}

let lines: CartLine[] =
  typeof window === "undefined" ? empty : readStoredLines();

function persist(next: CartLine[]) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {}
}

function publish(next: CartLine[]) {
  lines = next.length > 0 ? next : empty;
  listeners.forEach((notify) => notify());
  persist(lines);
}

function adoptStoredLines() {
  lines = readStoredLines();
  listeners.forEach((notify) => notify());
}

function subscribe(listener: () => void) {
  if (listeners.size === 0)
    window.addEventListener("storage", adoptStoredLines);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", adoptStoredLines);
    }
  };
}

export function useCartLines() {
  return useSyncExternalStore(
    subscribe,
    () => lines,
    () => empty,
  );
}

export function addToCart(slug: ProductSlug, quantity: number) {
  const current = lines.find((line) => line.slug === slug);
  const total = Math.min((current?.quantity ?? 0) + quantity, maxQuantity);

  publish(
    current
      ? lines.map((line) =>
          line.slug === slug ? { ...line, quantity: total } : line,
        )
      : [...lines, { slug, quantity: total }],
  );
}

export function setCartQuantity(slug: ProductSlug, quantity: number) {
  publish(
    quantity < 1
      ? lines.filter((line) => line.slug !== slug)
      : lines.map((line) =>
          line.slug === slug
            ? { ...line, quantity: Math.min(quantity, maxQuantity) }
            : line,
        ),
  );
}

export function clearCart() {
  publish(empty);
}
