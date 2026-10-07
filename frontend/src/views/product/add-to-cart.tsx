"use client";

import { QuantityStepper } from "@/components/cart";
import type { ProductSlug } from "@/data";
import { addToCart, useCartLines } from "@/lib";
import { useEffect, useRef, useState } from "react";

const confirmationHold = 1800;

type AddToCartProps = {
  slug: ProductSlug;
  name: string;
};

export default function AddToCart({ slug, name }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [adds, setAdds] = useState(0);
  const holding = useRef<number | undefined>(undefined);
  const lines = useCartLines();
  const inCart = lines.find((line) => line.slug === slug)?.quantity ?? 0;

  useEffect(() => () => clearTimeout(holding.current), []);

  const add = () => {
    addToCart(slug, quantity);
    setQuantity(1);
    setAdds((count) => count + 1);
    clearTimeout(holding.current);
    holding.current = window.setTimeout(() => setAdds(0), confirmationHold);
  };

  return (
    <div className="flex gap-4">
      <QuantityStepper
        value={quantity}
        label={name}
        onChange={setQuantity}
        size="lg"
      />
      <button type="button" onClick={add} className="v-btn-brand w-40">
        {adds > 0 ? (
          <span key={adds} className="v-add-confirm">
            Added to cart
          </span>
        ) : (
          <span>Add to cart</span>
        )}
      </button>
      <p aria-live="polite" className="sr-only">
        {adds > 0 && `${name}: ${inCart} in your cart.`}
      </p>
    </div>
  );
}
