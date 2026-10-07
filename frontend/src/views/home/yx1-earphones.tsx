import earphonesDesktop from "@/assets/home/desktop/yx1-earphones.webp";
import earphonesMobile from "@/assets/home/mobile/yx1-earphones.webp";
import earphonesTablet from "@/assets/home/tablet/yx1-earphones.webp";
import Link from "next/link";

export default function Yx1Earphones() {
  return (
    <section className="v-container grid gap-6 md:grid-cols-2 md:gap-2.75 lg:gap-7.5">
      <picture className="h-50 overflow-hidden rounded-lg md:h-80">
        <source
          media="(min-width: 64rem)"
          srcSet={earphonesDesktop.src}
          width={earphonesDesktop.width}
          height={earphonesDesktop.height}
        />
        <source
          media="(min-width: 48rem)"
          srcSet={earphonesTablet.src}
          width={earphonesTablet.width}
          height={earphonesTablet.height}
        />
        <img
          src={earphonesMobile.src}
          width={earphonesMobile.width}
          height={earphonesMobile.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </picture>

      <div className="bg-haze flex flex-col items-start justify-center rounded-lg px-6 py-10.25 md:px-10.25 md:py-25.25 lg:px-23.75">
        <h2 className="text-h4 uppercase">YX1 Earphones</h2>
        <Link
          href="/earphones/yx1-earphones"
          className="v-btn-outline mt-8 w-40"
        >
          See Product
        </Link>
      </div>
    </section>
  );
}
