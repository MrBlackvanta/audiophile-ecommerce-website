import { siteName } from "@/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you were looking for is not part of ${siteName}.`,
};

export default function NotFound() {
  return (
    <>
      <div className="h-22.5 bg-black lg:h-24.25" />

      <div className="v-container py-30 text-center lg:py-40">
        <h1 className="text-h2-sm md:text-h2 uppercase">Page not found</h1>
        <p className="text-body text-muted mx-auto mt-6 max-w-87.25">
          The page you were looking for has moved or never existed. The whole
          range is still a click away.
        </p>
        <Link href="/" className="v-btn-brand mt-8 w-40">
          Go Home
        </Link>
      </div>
    </>
  );
}
