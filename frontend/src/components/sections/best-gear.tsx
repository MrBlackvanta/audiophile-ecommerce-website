import bestGearDesktop from "@/assets/shared/desktop/best-gear.webp";
import bestGearMobile from "@/assets/shared/mobile/best-gear.webp";
import bestGearTablet from "@/assets/shared/tablet/best-gear.webp";

export default function BestGear() {
  return (
    <section className="v-container grid items-center gap-y-10 text-center md:gap-y-15.75 lg:grid-cols-[1fr_33.75rem] lg:text-left">
      <picture className="h-75 overflow-hidden rounded-lg lg:col-start-2 lg:row-start-1 lg:h-147">
        <source
          media="(min-width: 64rem)"
          srcSet={bestGearDesktop.src}
          width={bestGearDesktop.width}
          height={bestGearDesktop.height}
        />
        <source
          media="(min-width: 48rem)"
          srcSet={bestGearTablet.src}
          width={bestGearTablet.width}
          height={bestGearTablet.height}
        />
        <img
          src={bestGearMobile.src}
          width={bestGearMobile.width}
          height={bestGearMobile.height}
          alt="A man wearing XX99 Mark II headphones"
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </picture>

      <div className="mx-auto md:max-w-143.25 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:max-w-111.25">
        <h2 className="text-h2-sm md:text-h2 uppercase">
          Bringing you the <span className="text-brand">best</span> audio gear
        </h2>
        <p className="text-body text-muted mt-8">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
}
