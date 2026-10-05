import heroDesktop from "@/assets/home/desktop/hero.webp";
import heroMobile from "@/assets/home/mobile/hero.webp";
import heroTablet from "@/assets/home/tablet/hero.webp";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-matte v-on-dark relative min-h-150 overflow-hidden md:min-h-182.25">
      <picture className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 md:max-w-3xl lg:max-w-360">
        <source
          media="(min-width: 64rem)"
          srcSet={heroDesktop.src}
          width={heroDesktop.width}
          height={heroDesktop.height}
        />
        <source
          media="(min-width: 48rem)"
          srcSet={heroTablet.src}
          width={heroTablet.width}
          height={heroTablet.height}
        />
        <img
          src={heroMobile.src}
          width={heroMobile.width}
          height={heroMobile.height}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-black/10" />

      <div className="v-container relative flex flex-col items-center pt-49.5 text-center text-white md:pt-54 lg:items-start lg:pt-56.25 lg:text-left">
        <p className="text-overline -mr-2.5 uppercase lg:mr-0">New Product</p>
        <h1 className="text-h1-sm md:text-h1 mt-4 uppercase md:mt-6 md:max-w-99">
          XX99 Mark II Headphones
        </h1>
        <p className="text-body mt-6 max-w-87.25">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Link
          href="/headphones/xx99-mark-two-headphones"
          className="v-btn-brand mt-7 w-40 md:mt-10"
        >
          See Product
        </Link>
      </div>
    </section>
  );
}
