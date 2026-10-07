import { findProduct, type Product } from "@/data";
import type { PlacedOrder } from "./api";
import type { CartLine } from "./cart";

export const shippingFee = 50;
const vatRate = 0.2;

export type CartItem = CartLine & { product: Product };

export function summariseCart(lines: CartLine[]) {
  const items: CartItem[] = lines.flatMap((line) => {
    const product = findProduct(line.slug);
    return product ? [{ ...line, product }] : [];
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const units = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = items.length > 0 ? shippingFee : 0;

  return {
    items,
    units,
    total,
    shipping,
    vat: Math.round(total * vatRate),
    grandTotal: total + shipping,
  };
}

export type CartSummary = ReturnType<typeof summariseCart>;

export function confirmedOrder(placed: PlacedOrder): CartSummary {
  const items: CartItem[] = placed.items.flatMap(({ slug, quantity }) => {
    const product = findProduct(slug);
    return product ? [{ slug: product.slug, quantity, product }] : [];
  });

  return {
    items,
    units: items.reduce((sum, item) => sum + item.quantity, 0),
    total: placed.total,
    shipping: placed.shipping,
    vat: placed.includedVat,
    grandTotal: placed.grandTotal,
  };
}
