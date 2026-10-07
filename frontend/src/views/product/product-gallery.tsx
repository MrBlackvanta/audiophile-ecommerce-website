import type { Product, ResponsiveImage } from "@/data";

type GalleryImageProps = {
  image: ResponsiveImage;
  alt: string;
  className: string;
};

function GalleryImage({ image, alt, className }: GalleryImageProps) {
  return (
    <picture className={className}>
      <source
        media="(min-width: 64rem)"
        srcSet={image.desktop.src}
        width={image.desktop.width}
        height={image.desktop.height}
      />
      <source
        media="(min-width: 48rem)"
        srcSet={image.tablet.src}
        width={image.tablet.width}
        height={image.tablet.height}
      />
      <img
        src={image.mobile.src}
        width={image.mobile.width}
        height={image.mobile.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    </picture>
  );
}

type ProductGalleryProps = {
  images: Product["images"];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  return (
    <section
      aria-label={`${name} gallery`}
      className="v-container grid gap-5 md:grid-cols-[17.3125rem_1fr] md:gap-x-4.5 lg:grid-cols-[27.8125rem_1fr] lg:gap-x-7.5 lg:gap-y-8"
    >
      <GalleryImage
        image={images.galleryOne}
        alt=""
        className="h-43.5 overflow-hidden rounded-lg md:col-start-1 md:row-start-1 lg:h-70"
      />
      <GalleryImage
        image={images.galleryTwo}
        alt=""
        className="h-43.5 overflow-hidden rounded-lg md:col-start-1 md:row-start-2 lg:h-70"
      />
      <GalleryImage
        image={images.galleryThree}
        alt=""
        className="h-92 overflow-hidden rounded-lg md:col-start-2 md:row-span-2 md:row-start-1 md:h-full"
      />
    </section>
  );
}
