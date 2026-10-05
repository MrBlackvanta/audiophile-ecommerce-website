import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1-sm",
            "h1",
            "h2-sm",
            "h2",
            "h3-sm",
            "h3",
            "h4",
            "h5",
            "h6-sm",
            "h6",
            "overline",
            "subtitle",
            "body",
            "price",
            "price-sm",
            "button",
            "nav",
            "field",
            "label",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
