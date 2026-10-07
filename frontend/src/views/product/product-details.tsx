import type { Product } from "@/data";

type ProductDetailsProps = {
  features: Product["features"];
  includes: Product["includes"];
};

export default function ProductDetails({
  features,
  includes,
}: ProductDetailsProps) {
  return (
    <section className="v-container lg:grid lg:grid-cols-[39.6875rem_1fr] lg:gap-x-31.25">
      <div>
        <h2 className="text-h3-sm md:text-h3 uppercase">Features</h2>
        <div className="text-body text-muted mt-6 space-y-6.25 md:mt-8">
          {features.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-22 md:mt-30 md:grid md:grid-cols-[21.875rem_1fr] lg:mt-0 lg:block">
        <h2 className="text-h3-sm md:text-h3 uppercase">In the box</h2>
        <ul className="mt-6 space-y-2 md:mt-0 lg:mt-8">
          {includes.map(({ quantity, item }) => (
            <li key={item} className="text-body flex">
              <span className="text-brand w-9.75 shrink-0 font-bold">
                {quantity}x
              </span>
              <span className="text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
