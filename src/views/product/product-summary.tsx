import type { Product } from "@/data";
import { cn, formatPrice, productNameLines } from "@/lib";
import AddToCart from "./add-to-cart";

type ProductSummaryProps = {
  product: Product;
};

export default function ProductSummary({ product }: ProductSummaryProps) {
  const { slug, name, isNew, price, description, images } = product;
  const [model, kind] = productNameLines(name);

  return (
    <section className="v-container grid items-center gap-y-8 md:grid-cols-[17.5625rem_1fr] md:gap-x-17.25 md:gap-y-0 lg:grid-cols-[33.75rem_1fr] lg:gap-x-31.25">
      <picture className="bg-haze h-81.75 overflow-hidden rounded-lg md:h-120 lg:h-140">
        <source
          media="(min-width: 64rem)"
          srcSet={images.hero.desktop.src}
          width={images.hero.desktop.width}
          height={images.hero.desktop.height}
        />
        <source
          media="(min-width: 48rem)"
          srcSet={images.hero.tablet.src}
          width={images.hero.tablet.width}
          height={images.hero.tablet.height}
        />
        <img
          src={images.hero.mobile.src}
          width={images.hero.mobile.width}
          height={images.hero.mobile.height}
          alt={name}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
      </picture>

      <div>
        {isNew && (
          <p className="text-overline md:text-overline-sm lg:text-overline text-brand uppercase">
            New Product
          </p>
        )}
        <h1
          className={cn(
            "text-h2-sm md:text-h2-md lg:text-h2 uppercase",
            isNew && "mt-6 md:mt-4.25 lg:mt-4",
          )}
        >
          {model}
          <br />
          {kind}
        </h1>
        <p className="text-body text-muted mt-6 md:mt-8">{description}</p>
        <p className="text-h6 mt-6 md:mt-8">{formatPrice(price)}</p>
        <div className="mt-8 lg:mt-12">
          <AddToCart slug={slug} name={name} />
        </div>
      </div>
    </section>
  );
}
