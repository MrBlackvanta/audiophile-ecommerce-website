import { GoBack } from "@/components/layout";
import { siteName } from "@/data";
import { pageMetadata } from "@/lib";
import { CheckoutForm } from "@/views/checkout";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Checkout",
  shareTitle: `Checkout | ${siteName}`,
  description:
    "Confirm your billing and shipping details, choose a payment method and place your audiophile order.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return (
    <div className="bg-haze pb-24.25 md:pb-29 lg:pb-35.25">
      <div className="h-22.5 bg-black lg:h-24.25" />

      <div className="mt-4 md:mt-12 lg:mt-19.75">
        <GoBack href="/" />
      </div>

      <div className="mt-6 lg:mt-9.5">
        <CheckoutForm />
      </div>
    </div>
  );
}
