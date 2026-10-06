"use client";

import { QuantityStepper } from "@/components/cart";
import type { ProductSlug } from "@/data";
import { addToCart, useCartLines } from "@/lib";
import { useState } from "react";

type AddToCartProps = {
  slug: ProductSlug;
  name: string;
};

export default function AddToCart({ slug, name }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const lines = useCartLines();
  const inCart = lines.find((line) => line.slug === slug)?.quantity ?? 0;

  const add = () => {
    addToCart(slug, quantity);
    setAdded(true);
    setQuantity(1);
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
        Add to cart
      </button>
      <p aria-live="polite" className="sr-only">
        {added && `${name}: ${inCart} in your cart.`}
      </p>
    </div>
  );
}
