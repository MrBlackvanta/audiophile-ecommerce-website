"use client";

import { findCategory } from "@/data";
import { CategorySkeleton } from "@/views/category";
import { ProductSkeleton } from "@/views/product";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const commitTimeout = 400;
const skeletonDelay = 600;

type Shape = "category" | "product";
type Target = { pathname: string; shape: Shape };

function shapeFor(pathname: string): Shape | null {
  const [category, product, ...rest] = pathname.split("/").filter(Boolean);

  if (rest.length > 0 || !category || !findCategory(category)) return null;

  return product ? "product" : "category";
}

function linkFrom(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }

  const target = event.target;
  if (!(target instanceof Element)) return null;

  const link = target.closest("a");
  if (!link || link.target || link.hasAttribute("download")) return null;

  const url = new URL(link.href);
  if (url.origin !== location.origin) return null;
  if (url.pathname === location.pathname) return null;

  return url;
}

export default function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const commit = useRef<(() => void) | null>(null);
  const countdown = useRef<number | undefined>(undefined);
  const [target, setTarget] = useState<Target | null>(null);

  useEffect(() => {
    commit.current?.();
    commit.current = null;
    clearTimeout(countdown.current);
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const claim = (event: MouseEvent) => {
      const url = linkFrom(event);
      if (!url) return;

      event.preventDefault();
      commit.current?.();
      clearTimeout(countdown.current);

      const shape = shapeFor(url.pathname);
      if (shape) {
        countdown.current = window.setTimeout(
          () => setTarget({ pathname: url.pathname, shape }),
          skeletonDelay,
        );
      }

      const navigate = () => {
        router.push(`${url.pathname}${url.search}${url.hash}`);

        return Promise.race([
          new Promise<void>((resolve) => {
            commit.current = resolve;
          }),
          new Promise<void>((give) => setTimeout(give, commitTimeout)),
        ]);
      };

      if (reduced.matches || !("startViewTransition" in document)) {
        navigate();
        return;
      }

      document.startViewTransition(navigate).ready.catch(() => {});
    };

    document.addEventListener("click", claim, true);
    return () => document.removeEventListener("click", claim, true);
  }, [router]);

  const loading = target?.pathname === pathname ? null : target?.shape;

  if (!loading) return null;

  return (
    <div className="bg-page fixed inset-0 z-30 overflow-hidden">
      {loading === "category" ? <CategorySkeleton /> : <ProductSkeleton />}
    </div>
  );
}
