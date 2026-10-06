import { HeaderRule } from "@/components/layout";

type CategoryBannerProps = {
  name: string;
};

export default function CategoryBanner({ name }: CategoryBannerProps) {
  return (
    <section className="v-on-dark relative bg-black pt-30.5 pb-8 text-center md:pt-48.75 md:pb-24.25">
      <HeaderRule />
      <h1 className="text-h2-sm md:text-h2 text-white uppercase">{name}</h1>
    </section>
  );
}
