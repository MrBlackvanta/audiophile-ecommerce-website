import xx59HeadphonesDesktop from "@/assets/shared/desktop/xx59-headphones.webp";
import xx59HeadphonesMobile from "@/assets/shared/mobile/xx59-headphones.webp";
import xx59HeadphonesTablet from "@/assets/shared/tablet/xx59-headphones.webp";
import xx99MarkOneHeadphonesDesktop from "@/assets/shared/desktop/xx99-mark-one-headphones.webp";
import xx99MarkOneHeadphonesMobile from "@/assets/shared/mobile/xx99-mark-one-headphones.webp";
import xx99MarkOneHeadphonesTablet from "@/assets/shared/tablet/xx99-mark-one-headphones.webp";
import xx99MarkTwoHeadphonesDesktop from "@/assets/shared/desktop/xx99-mark-two-headphones.webp";
import xx99MarkTwoHeadphonesMobile from "@/assets/shared/mobile/xx99-mark-two-headphones.webp";
import xx99MarkTwoHeadphonesTablet from "@/assets/shared/tablet/xx99-mark-two-headphones.webp";
import zx7SpeakerDesktop from "@/assets/shared/desktop/zx7-speaker.webp";
import zx7SpeakerMobile from "@/assets/shared/mobile/zx7-speaker.webp";
import zx7SpeakerTablet from "@/assets/shared/tablet/zx7-speaker.webp";
import zx9SpeakerDesktop from "@/assets/shared/desktop/zx9-speaker.webp";
import zx9SpeakerMobile from "@/assets/shared/mobile/zx9-speaker.webp";
import zx9SpeakerTablet from "@/assets/shared/tablet/zx9-speaker.webp";
import type { ResponsiveImage } from "./types";

export const productThumbnails = {
  "xx99-mark-two-headphones": {
    mobile: xx99MarkTwoHeadphonesMobile,
    tablet: xx99MarkTwoHeadphonesTablet,
    desktop: xx99MarkTwoHeadphonesDesktop,
  },
  "xx99-mark-one-headphones": {
    mobile: xx99MarkOneHeadphonesMobile,
    tablet: xx99MarkOneHeadphonesTablet,
    desktop: xx99MarkOneHeadphonesDesktop,
  },
  "xx59-headphones": {
    mobile: xx59HeadphonesMobile,
    tablet: xx59HeadphonesTablet,
    desktop: xx59HeadphonesDesktop,
  },
  "zx9-speaker": {
    mobile: zx9SpeakerMobile,
    tablet: zx9SpeakerTablet,
    desktop: zx9SpeakerDesktop,
  },
  "zx7-speaker": {
    mobile: zx7SpeakerMobile,
    tablet: zx7SpeakerTablet,
    desktop: zx7SpeakerDesktop,
  },
} satisfies Record<string, ResponsiveImage>;

export type RelatedSlug = keyof typeof productThumbnails;
