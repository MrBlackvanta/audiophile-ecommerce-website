import type { Product } from "@/data";
import { cn, productNameLines } from "@/lib";
import Link from "next/link";

type CategoryProductProps = {
  product: Product;
  reversed: boolean;
};

export default function CategoryProduct({
  product,
  reversed,
}: CategoryProductProps) {
  const { slug, name, category, isNew, description, images } = product;
  const [model, kind] = productNameLines(name);

  return (
    <article
      className={cn(
        "v-container grid items-center gap-y-8 text-center md:gap-y-13 lg:grid-cols-[33.75rem_1fr] lg:gap-x-31.25 lg:gap-y-0 lg:text-left",
        reversed && "lg:grid-cols-[1fr_33.75rem]",
      )}
    >
      <picture
        className={cn(
          "bg-haze h-88 overflow-hidden rounded-lg lg:h-140",
          reversed && "lg:col-start-2 lg:row-start-1",
        )}
      >
        <source
          media="(min-width: 64rem)"
          srcSet={images.preview.desktop.src}
          width={images.preview.desktop.width}
          height={images.preview.desktop.height}
        />
        <source
          media="(min-width: 48rem)"
          srcSet={images.preview.tablet.src}
          width={images.preview.tablet.width}
          height={images.preview.tablet.height}
        />
        <img
          src={images.preview.mobile.src}
          width={images.preview.mobile.width}
          height={images.preview.mobile.height}
          alt={name}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </picture>

      <div
        className={cn(
          "mx-auto md:max-w-143 lg:mx-0 lg:max-w-none",
          reversed && "lg:col-start-1 lg:row-start-1",
        )}
      >
        {isNew && (
          <p className="text-overline text-brand uppercase">New Product</p>
        )}
        <h2
          className={cn(
            "text-h2-sm md:text-h2 uppercase",
            isNew && "mt-6 md:mt-4",
          )}
        >
          {model}
          <br />
          {kind}
        </h2>
        <p className="text-body text-muted mt-6 md:mt-8">{description}</p>
        <Link
          href={`/${category}/${slug}`}
          className="v-btn-brand mt-6 w-40 lg:mt-10"
        >
          See Product
        </Link>
      </div>
    </article>
  );
}
