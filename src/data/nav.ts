import { categories } from "./categories";

export const navLinks = [
  { href: "/", label: "Home" },
  ...categories.map(({ slug, name }) => ({ href: `/${slug}`, label: name })),
];
