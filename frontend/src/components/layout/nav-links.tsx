"use client";

import { navLinks } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksVariant = "header" | "footer";

const variants: Record<NavLinksVariant, { landmark: string; list: string }> = {
  header: {
    landmark: "Main",
    list: "flex gap-x-8.5",
  },
  footer: {
    landmark: "Footer",
    list: "flex flex-col items-center gap-4 md:flex-row md:gap-x-8.5",
  },
};

export default function NavLinks({ variant }: { variant: NavLinksVariant }) {
  const pathname = usePathname();
  const { landmark, list } = variants[variant];
  const current = pathname.replace(/(.)\/$/, "$1");

  return (
    <nav aria-label={landmark}>
      <ul className={list}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={current === href ? "page" : undefined}
              className="v-nav-link"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
