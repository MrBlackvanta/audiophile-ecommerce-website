import { categories, products, siteUrl } from "@/data";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...categories.map((category) => ({
      url: `${siteUrl}/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/${product.category}/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/checkout`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
