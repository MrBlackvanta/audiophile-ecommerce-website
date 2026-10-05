import earphonesThumbnail from "@/assets/categories/earphones.webp";
import headphonesThumbnail from "@/assets/categories/headphones.webp";
import speakersThumbnail from "@/assets/categories/speakers.webp";
import type { Category } from "./types";

export const categories: Category[] = [
  { slug: "headphones", name: "Headphones", thumbnail: headphonesThumbnail },
  { slug: "speakers", name: "Speakers", thumbnail: speakersThumbnail },
  { slug: "earphones", name: "Earphones", thumbnail: earphonesThumbnail },
];

export function findCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
