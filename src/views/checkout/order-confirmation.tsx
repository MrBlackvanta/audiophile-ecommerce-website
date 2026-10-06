"use client";

import { OrderConfirmationIcon } from "@/components/icons";
import {
  formatPrice,
  lockPageScroll,
  type CartItem,
  type CartSummary,
} from "@/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type OrderConfirmationProps = {
  order: CartSummary | null;
};

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    const unlock = lockPageScroll();

    return () => {
      dialog.close();
      unlock();
    };
  }, [order]);

  const [headline, ...rest] = order?.items ?? [];

  if (!order || !headline) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="order-confirmed"
      onCancel={() => router.push("/")}
      className="m-auto max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] max-w-81.75 overflow-y-auto rounded-lg bg-white p-8 text-black backdrop:bg-black/40 md:max-w-135 md:p-12"
    >
      <OrderConfirmationIcon className="text-brand-on-dark size-16" />
      <h2
        id="order-confirmed"
        className="text-h3-sm md:text-h3 mt-5.75 leading-7 uppercase md:mt-8.25 md:leading-9"
      >
        Thank you
        <br />
        for your order
      </h2>
      <p className="text-body text-muted mt-4 md:mt-6">
        You will receive an email confirmation shortly.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg md:mt-8.25 md:grid md:grid-cols-[15.375rem_12.375rem]">
        <div className="bg-haze p-6">
          <CartItemRow item={headline} />
          {rest.length > 0 && (
            <>
              <hr className="mt-3 border-t border-black/8" />
              <p className="text-label text-muted mt-3 text-center font-medium">
                and {rest.length} other item(s)
              </p>
            </>
          )}
        </div>

        <div className="v-on-dark flex h-23 flex-col justify-center bg-black px-6 md:h-auto md:px-8">
          <p className="text-body text-white/50 uppercase">Grand total</p>
          <p className="text-price mt-2 text-white">
            {formatPrice(order.grandTotal)}
          </p>
        </div>
      </div>

      <Link href="/" className="v-btn-brand mt-5.75 w-full md:mt-11.5">
        Back to home
      </Link>
    </dialog>
  );
}

function CartItemRow({ item: { product, quantity } }: { item: CartItem }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={product.images.cart.src}
        width={product.images.cart.width}
        height={product.images.cart.height}
        alt=""
        className="size-12.5 rounded-lg"
      />
      <div className="min-w-0 flex-1">
        <p className="text-body truncate font-bold">{product.cartName}</p>
        <p className="text-price-sm text-muted">{formatPrice(product.price)}</p>
      </div>
      <p className="text-body text-muted font-bold">x{quantity}</p>
    </div>
  );
}
