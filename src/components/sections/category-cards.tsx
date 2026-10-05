import { ArrowRightIcon } from "@/components/icons";
import { categories } from "@/data";
import Link from "next/link";

type CategoryCardsProps = {
  onNavigate?: () => void;
};

export default function CategoryCards({ onNavigate }: CategoryCardsProps) {
  return (
    <ul className="grid gap-x-2.5 gap-y-4 md:grid-cols-3 lg:gap-x-7.5">
      {categories.map(({ slug, name, thumbnail }) => (
        <li key={slug} className="relative pt-13 lg:pt-20">
          <img
            src={thumbnail.src}
            width={thumbnail.width}
            height={thumbnail.height}
            alt=""
            className="absolute top-0 left-1/2 w-38 -translate-x-1/2 lg:w-59"
          />
          <Link
            href={`/${slug}`}
            onClick={onNavigate}
            className="group/card bg-haze flex flex-col items-center rounded-lg pt-22 pb-5.5 lg:pt-29 lg:pb-7.5"
          >
            <span className="text-h6-sm lg:text-h6">{name}</span>
            <span className="v-link-shop group-hover/card:text-brand mt-4.25 lg:mt-4">
              Shop
              <ArrowRightIcon className="text-brand" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
