import { findProduct, productThumbnails, type RelatedSlug } from "@/data";
import Link from "next/link";

type RelatedProductsProps = {
  slugs: RelatedSlug[];
};

export default function RelatedProducts({ slugs }: RelatedProductsProps) {
  const items = slugs.flatMap((slug) => {
    const product = findProduct(slug);
    return product ? [{ ...product, thumbnail: productThumbnails[slug] }] : [];
  });

  return (
    <section className="v-container">
      <h2 className="text-h3-sm md:text-h3 text-center uppercase">
        You may also like
      </h2>

      <ul className="mt-10 grid gap-y-14 text-center md:mt-14 md:grid-cols-3 md:gap-x-2.5 md:gap-y-0 lg:mt-16 lg:gap-x-7.5">
        {items.map(({ slug, category, shortName, thumbnail }) => (
          <li key={slug}>
            <picture className="bg-haze block h-30 overflow-hidden rounded-lg md:h-79.5">
              <source
                media="(min-width: 64rem)"
                srcSet={thumbnail.desktop.src}
                width={thumbnail.desktop.width}
                height={thumbnail.desktop.height}
              />
              <source
                media="(min-width: 48rem)"
                srcSet={thumbnail.tablet.src}
                width={thumbnail.tablet.width}
                height={thumbnail.tablet.height}
              />
              <img
                src={thumbnail.mobile.src}
                width={thumbnail.mobile.width}
                height={thumbnail.mobile.height}
                alt={shortName}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </picture>
            <h3 className="text-h5 mt-8 uppercase md:mt-10">{shortName}</h3>
            <Link
              href={`/${category}/${slug}`}
              className="v-btn-brand mt-8 w-40"
            >
              See Product
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
