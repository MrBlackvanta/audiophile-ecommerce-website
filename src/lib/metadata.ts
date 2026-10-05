import { siteName } from "@/data";
import type { Metadata } from "next";

const images = [
  {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
    alt: "The audiophile share card, headlined “High-end headphones, speakers and earphones”, beside the XX99 Mark II.",
  },
];

type PageMetadata = {
  title: Metadata["title"];
  shareTitle: string;
  description: string;
  path: string;
};

export function pageMetadata({
  title,
  shareTitle,
  description,
  path,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  };
}
