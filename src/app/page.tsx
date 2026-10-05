import { BestGear, CategoryCards } from "@/components/sections";
import { siteName } from "@/data";
import { pageMetadata } from "@/lib";
import { Hero, Yx1Earphones, Zx7Speaker, Zx9Speaker } from "@/views/home";
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

      <div className="mt-30 space-y-6 md:mt-24 md:space-y-8 lg:mt-42 lg:space-y-12">
        <Zx9Speaker />
        <Zx7Speaker />
        <Yx1Earphones />
      </div>

      <div className="mt-30 pb-30 md:mt-24 md:pb-24 lg:mt-50 lg:pb-50">
        <BestGear />
      </div>
    </>
  );
}
