import type { StaticImageData } from "next/image";
import type { RelatedSlug } from "./product-thumbnails";

export type ResponsiveImage = {
  mobile: StaticImageData;
  tablet: StaticImageData;
  desktop: StaticImageData;
};

export type CategorySlug = "headphones" | "speakers" | "earphones";

export type Category = {
  slug: CategorySlug;
  name: string;
  thumbnail: StaticImageData;
};

export type ProductSlug =
  | "xx99-mark-two-headphones"
  | "xx99-mark-one-headphones"
  | "xx59-headphones"
  | "zx9-speaker"
  | "zx7-speaker"
  | "yx1-earphones";

export type ProductImages = {
  hero: ResponsiveImage;
  preview: ResponsiveImage;
  galleryOne: ResponsiveImage;
  galleryTwo: ResponsiveImage;
  galleryThree: ResponsiveImage;
  cart: StaticImageData;
};

export type ProductInclude = {
  quantity: number;
  item: string;
};

export type Product = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  cartName: string;
  category: CategorySlug;
  isNew: boolean;
  price: number;
  description: string;
  features: string[];
  includes: ProductInclude[];
  related: RelatedSlug[];
  images: ProductImages;
};
