"use client";

import { QuantityStepper } from "@/components/cart";
import { CartIcon } from "@/components/icons";
import {
  clearCart,
  cn,
  formatPrice,
  summariseCart,
  updateCartQuantity,
  useCartLines,
  useOverlay,
} from "@/lib";
import Link from "next/link";
import { useRef } from "react";
import { useHeaderPanel } from "./header-panels";

export default function CartMenu() {
  const { open, toggle, close } = useHeaderPanel("cart");
  const { items, total } = summariseCart(useCartLines());
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlay(open, panelRef, toggleRef);

  const closeOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") close();
  };

  const closeOnBackdrop = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <div className="justify-self-end">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-cart"
        onClick={toggle}
        className="v-tap flex text-white"
      >
        <CartIcon />
        {items.length > 0 && (
          <span key={items.length} aria-hidden="true" className="v-cart-badge">
            {items.length}
          </span>
        )}
        <span className="sr-only">
          Cart,{" "}
          {items.length === 0
            ? "empty"
            : `${items.length} item${items.length === 1 ? "" : "s"}`}
        </span>
      </button>

      <div
        id="site-cart"
        inert={!open}
        onKeyDown={closeOnEscape}
        onClick={closeOnBackdrop}
        className={cn(
          "invisible fixed inset-x-0 top-22.5 bottom-0 z-40 overflow-y-auto overscroll-contain bg-black/40 opacity-0 transition-[opacity,visibility] duration-300 motion-reduce:transition-none lg:top-24.25",
          open && "visible opacity-100",
        )}
      >
        <div className="v-container flex justify-end pt-6 pb-6 lg:pt-8">
          <div
            ref={panelRef}
            tabIndex={-1}
            className={cn(
              "w-full rounded-lg bg-white px-7 py-8 text-black transition-[translate] duration-300 outline-none motion-reduce:transition-none md:w-94.25 md:px-8",
              open ? "translate-y-0" : "-translate-y-4",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-h6 uppercase">Cart ({items.length})</h2>
              <button
                type="button"
                disabled={items.length === 0}
                onClick={clearCart}
                className="text-body text-muted hover:text-brand underline underline-offset-2 transition-[color] duration-200 disabled:no-underline disabled:opacity-50"
              >
                Remove all
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-body text-muted mt-7.75">
                Your cart is empty.
              </p>
            ) : (
              <>
                <ul className="mt-7.75 space-y-6">
                  {items.map(({ slug, quantity, product }) => (
                    <li key={slug} className="flex items-center gap-4">
                      <img
                        src={product.images.cart.src}
                        width={product.images.cart.width}
                        height={product.images.cart.height}
                        alt=""
                        className="size-16 rounded-lg"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-body truncate font-bold">
                          {product.cartName}
                        </p>
                        <p className="text-price-sm text-muted">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <QuantityStepper
                        value={quantity}
                        min={0}
                        label={product.cartName}
                        onChange={(update) => updateCartQuantity(slug, update)}
                      />
                    </li>
                  ))}
                </ul>

                <p className="mt-8 flex items-center justify-between">
                  <span className="text-body text-muted uppercase">Total</span>
                  <span className="text-price">{formatPrice(total)}</span>
                </p>

                <Link
                  href="/checkout"
                  onClick={close}
                  className="v-btn-brand mt-6 w-full"
                >
                  Checkout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
