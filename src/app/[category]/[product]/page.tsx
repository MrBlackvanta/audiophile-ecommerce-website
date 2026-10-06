import { GoBack } from "@/components/layout";
import { BestGear, CategoryCards } from "@/components/sections";
import { findProduct, products } from "@/data";
import { pageMetadata } from "@/lib";
import {
  ProductDetails,
  ProductGallery,
  ProductSummary,
  RelatedProducts,
} from "@/views/product";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ category: string; product: string }>;
};

export function generateStaticParams() {
  return products.map(({ category, slug }) => ({
    category,
    product: slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { category, product } = await params;
  const found = findProduct(product);

  if (!found || found.category !== category) return {};

  return pageMetadata({
    title: found.name,
    shareTitle: found.name,
    description: found.description,
    path: `/${found.category}/${found.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, product } = await params;
  const found = findProduct(product);

  if (!found || found.category !== category) notFound();

  return (
    <>
      <div className="h-22.5 bg-black lg:h-24.25" />

      <div className="mt-4 md:mt-8.25 lg:mt-19.75">
        <GoBack href={`/${found.category}`} />
      </div>

      <div className="mt-6 lg:mt-14">
        <ProductSummary product={found} />
      </div>

      <div className="mt-22 md:mt-30 lg:mt-40">
        <ProductDetails features={found.features} includes={found.includes} />
      </div>

      <div className="mt-22 md:mt-30 lg:mt-40">
        <ProductGallery images={found.images} name={found.name} />
      </div>

      <div className="mt-30 lg:mt-40">
        <RelatedProducts slugs={found.related} />
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
