import type { SVGProps } from "react";

export function OrderConfirmationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="32" cy="32" r="32" fill="currentColor" />
      <path
        d="m20.754 33.333 6.751 6.751 15.804-15.803"
        stroke="#fff"
        strokeWidth="4"
      />
    </svg>
  );
}
