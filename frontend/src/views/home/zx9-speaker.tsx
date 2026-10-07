import speakerDesktop from "@/assets/home/desktop/zx9-speaker.webp";
import speakerMobile from "@/assets/home/mobile/zx9-speaker.webp";
import speakerTablet from "@/assets/home/tablet/zx9-speaker.webp";
import { CirclesPattern } from "@/components/icons";
import Link from "next/link";

export default function Zx9Speaker() {
  return (
    <section className="v-container">
      <div className="v-on-dark bg-brand relative overflow-hidden rounded-lg px-6 pt-73.5 pb-13.75 text-center text-white md:px-10 md:pt-88.25 md:pb-16 lg:pt-33.25 lg:pr-23.75 lg:pb-31 lg:pl-[calc(100%-27.75rem)] lg:text-left">
        <CirclesPattern className="absolute -top-30.25 left-1/2 w-139.5 -translate-x-1/2 md:-top-72 md:w-236 lg:-top-9 lg:left-[29.06%]" />

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
            className="absolute top-13.75 left-1/2 w-43 -translate-x-1/2 md:top-13 md:w-49.25 lg:top-24 lg:left-[29.06%] lg:w-102.5"
          />
        </picture>

        <div className="relative mx-auto max-w-87.25 lg:mx-0">
          <h2 className="text-h1-sm md:text-h1 uppercase">
            ZX9
            <br />
            Speaker
          </h2>
          <p className="text-body mt-6">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Link
            href="/speakers/zx9-speaker"
            className="v-btn-dark mt-6 w-40 md:mt-10"
          >
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
}
