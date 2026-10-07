export default function ProductSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading product
      </p>

      <div aria-hidden="true">
        <div className="h-22.5 bg-black lg:h-24.25" />

        <div className="v-container mt-4 md:mt-8.25 lg:mt-19.75">
          <div className="v-skeleton h-6.25 w-20 rounded-sm" />
        </div>

        <section className="v-container mt-6 grid items-center gap-y-8 md:grid-cols-[17.5625rem_1fr] md:gap-x-17.25 md:gap-y-0 lg:mt-14 lg:grid-cols-[33.75rem_1fr] lg:gap-x-31.25">
          <div className="v-skeleton h-81.75 rounded-lg md:h-120 lg:h-140" />

          <div>
            <div className="v-skeleton h-4.75 w-36 rounded-sm md:h-4 lg:h-4.75" />
            <div className="v-skeleton mt-6 h-19 w-64 rounded-sm md:mt-4.25 md:h-16 lg:mt-4 lg:h-22 lg:w-80" />
            <div className="mt-6 space-y-2 md:mt-8">
              <div className="v-skeleton h-4 rounded-sm" />
              <div className="v-skeleton h-4 rounded-sm" />
              <div className="v-skeleton h-4 w-2/3 rounded-sm" />
            </div>
            <div className="v-skeleton mt-6 h-6 w-28 rounded-sm md:mt-8" />
            <div className="mt-8 flex gap-4 lg:mt-12">
              <div className="v-skeleton h-12 w-30" />
              <div className="v-skeleton h-12 w-40" />
            </div>
          </div>
        </section>

        <section className="v-container mt-22 md:mt-30 lg:mt-40 lg:grid lg:grid-cols-[39.6875rem_1fr] lg:gap-x-31.25">
          <div>
            <div className="v-skeleton h-9 w-44 rounded-sm" />
            <div className="mt-6 space-y-2 md:mt-8">
              <div className="v-skeleton h-4 rounded-sm" />
              <div className="v-skeleton h-4 rounded-sm" />
              <div className="v-skeleton h-4 rounded-sm" />
              <div className="v-skeleton h-4 w-5/6 rounded-sm" />
            </div>
          </div>

          <div className="mt-22 md:mt-30 md:grid md:grid-cols-[21.875rem_1fr] lg:mt-0 lg:block">
            <div className="v-skeleton h-9 w-44 rounded-sm" />
            <div className="space-y-2 max-md:mt-6 lg:mt-8">
              <div className="v-skeleton h-6.25 w-40 rounded-sm" />
              <div className="v-skeleton h-6.25 w-32 rounded-sm" />
              <div className="v-skeleton h-6.25 w-36 rounded-sm" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
