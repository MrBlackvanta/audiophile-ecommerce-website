import { HeaderRule } from "@/components/layout";
import { cn } from "@/lib";

function Row({ reversed }: { reversed: boolean }) {
  return (
    <div
      className={cn(
        "v-container grid items-center gap-y-8 md:gap-y-13 lg:grid-cols-[33.75rem_1fr] lg:gap-x-31.25 lg:gap-y-0",
        reversed && "lg:grid-cols-[1fr_33.75rem]",
      )}
    >
      <div
        className={cn(
          "v-skeleton h-88 rounded-lg lg:h-140",
          reversed && "lg:col-start-2 lg:row-start-1",
        )}
      />

      <div
        className={cn(
          "mx-auto flex w-full flex-col items-center md:max-w-143 lg:mx-0 lg:max-w-none lg:items-start",
          reversed && "lg:col-start-1 lg:row-start-1",
        )}
      >
        <div className="v-skeleton h-4.75 w-36 rounded-sm" />
        <div className="v-skeleton mt-6 h-19 w-64 rounded-sm md:mt-4 md:h-22 md:w-80" />
        <div className="mt-6 w-full space-y-2 md:mt-8">
          <div className="v-skeleton h-4 rounded-sm" />
          <div className="v-skeleton h-4 rounded-sm" />
          <div className="v-skeleton mx-auto h-4 w-3/4 rounded-sm lg:mx-0" />
        </div>
        <div className="v-skeleton mt-6 h-12 w-40 lg:mt-10" />
      </div>
    </div>
  );
}

export default function CategorySkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading products
      </p>

      <div aria-hidden="true">
        <section className="v-on-dark relative bg-black pt-30.5 pb-8 text-center md:pt-48.75 md:pb-24.25">
          <HeaderRule />
          <div className="v-container">
            <div className="v-skeleton mx-auto h-9.5 w-56 rounded-sm md:h-11 md:w-72" />
          </div>
        </section>

        <div className="space-y-30 pt-16 md:pt-30 lg:space-y-40 lg:pt-40">
          <Row reversed={false} />
          <Row reversed />
          <Row reversed={false} />
        </div>
      </div>
    </>
  );
}
