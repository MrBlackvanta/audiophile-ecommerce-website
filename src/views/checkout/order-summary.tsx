import { cn, formatPrice, type CartSummary } from "@/lib";

type SummaryRowProps = {
  label: string;
  value: number;
  className?: string;
};

function SummaryRow({ label, value, className }: SummaryRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <dt className="text-body text-muted uppercase">{label}</dt>
      <dd className="text-price">{formatPrice(value)}</dd>
    </div>
  );
}

type OrderSummaryProps = {
  summary: CartSummary;
  placing: boolean;
  failure: string | null;
};

export default function OrderSummary({
  summary,
  placing,
  failure,
}: OrderSummaryProps) {
  const { items, total, shipping, vat, grandTotal } = summary;

  return (
    <section
      aria-labelledby="order-summary"
      className="rounded-lg bg-white px-6 py-8 md:px-8.25"
    >
      <h2 id="order-summary" className="text-h6 uppercase">
        Summary
      </h2>

      {items.length === 0 ? (
        <p className="text-body text-muted mt-8">Your cart is empty.</p>
      ) : (
        <ul className="mt-8 space-y-6">
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
              <p className="text-body text-muted font-bold">x{quantity}</p>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-8">
        <SummaryRow label="Total" value={total} />
        <SummaryRow label="Shipping" value={shipping} className="mt-2" />
        <SummaryRow label="VAT (included)" value={vat} className="mt-2" />
        <div className="mt-6 flex items-center justify-between gap-4">
          <dt className="text-body text-muted uppercase">Grand total</dt>
          <dd className="text-price text-brand">{formatPrice(grandTotal)}</dd>
        </div>
      </dl>

      <button
        type="submit"
        form="checkout"
        disabled={items.length === 0 || placing}
        className="v-btn-brand mt-8 w-full disabled:opacity-50"
      >
        {placing ? "Placing order…" : "Continue & Pay"}
      </button>

      {failure && (
        <p role="alert" className="text-label text-danger mt-4 font-medium">
          {failure}
        </p>
      )}
    </section>
  );
}
