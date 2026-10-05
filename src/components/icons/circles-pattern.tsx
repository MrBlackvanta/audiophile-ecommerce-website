import type { SVGProps } from "react";

export function CirclesPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 944 944"
      fill="none"
      stroke="currentColor"
      opacity="0.202"
      aria-hidden="true"
      {...props}
    >
      <circle cx="472" cy="472" r="235.5" />
      <circle cx="472" cy="472" r="270.5" />
      <circle cx="472" cy="472" r="471.5" />
    </svg>
  );
}
