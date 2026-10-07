import { BestGear, CategoryCards } from "@/components/sections";
import { categories, findCategory, productsInCategory } from "@/data";
import { pageMetadata } from "@/lib";
import { CategoryBanner, CategoryProduct } from "@/views/category";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}

function describe(name: string) {
  return `Browse every ${name.toLowerCase()} model in the audiophile range, compare the specs and add your pick to the cart.`;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const found = findCategory(category);

  if (!found) return {};

  return pageMetadata({
    title: found.name,
    shareTitle: found.name,
    description: describe(found.name),
    path: `/${found.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const found = findCategory(category);

  if (!found) notFound();

  return (
    <>
      <CategoryBanner name={found.name} />

      <div className="space-y-30 pt-16 md:pt-30 lg:space-y-40 lg:pt-40">
        {productsInCategory(found.slug).map((product, index) => (
          <CategoryProduct
            key={product.slug}
            product={product}
            reversed={index % 2 === 1}
          />
        ))}
      </div>

      <nav aria-label="Categories" className="v-container mt-30 lg:mt-40">
        <CategoryCards />
      </nav>

      <div className="mt-30 pb-30 lg:mt-40 lg:pb-40">
        <BestGear />
      </div>
    </>
  );
}
