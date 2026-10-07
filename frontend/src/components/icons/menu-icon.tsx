import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
    </svg>
  );
}
