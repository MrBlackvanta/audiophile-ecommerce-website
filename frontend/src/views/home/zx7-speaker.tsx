import speakerDesktop from "@/assets/home/desktop/zx7-speaker.webp";
import speakerMobile from "@/assets/home/mobile/zx7-speaker.webp";
import speakerTablet from "@/assets/home/tablet/zx7-speaker.webp";
import Link from "next/link";

export default function Zx7Speaker() {
  return (
    <section className="v-container">
      <div className="relative overflow-hidden rounded-lg">
        <picture>
          <source
            media="(min-width: 64rem)"
            srcSet={speakerDesktop.src}
            width={speakerDesktop.width}
            height={speakerDesktop.height}
          />
          <source
            media="(min-width: 48rem)"
            srcSet={speakerTablet.src}
            width={speakerTablet.width}
            height={speakerTablet.height}
          />
          <img
            src={speakerMobile.src}
            width={speakerMobile.width}
            height={speakerMobile.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>

        <div className="relative flex flex-col items-start px-6 py-25.25 md:px-15.5 lg:px-23.75">
          <h2 className="text-h4 uppercase">ZX7 Speaker</h2>
          <Link
            href="/speakers/zx7-speaker"
            className="v-btn-outline mt-8 w-40"
          >
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
}
