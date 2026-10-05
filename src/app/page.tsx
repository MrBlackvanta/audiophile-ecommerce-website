import { CategoryCards } from "@/components/sections";
import { siteName } from "@/data";
import { pageMetadata } from "@/lib";
import { Hero } from "@/views/home";
import type { Metadata } from "next";

const title = `${siteName} | High-end headphones, speakers and earphones`;
const description =
  "High-end headphones, speakers and earphones from a New York showroom. Browse the range, compare the gear and check out in a few steps.";

export const metadata: Metadata = pageMetadata({
  title: { absolute: title },
  shareTitle: title,
  description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <nav
        aria-label="Categories"
        className="v-container pt-10 md:pt-24 lg:pt-30"
      >
        <CategoryCards />
      </nav>
    </>
  );
}
