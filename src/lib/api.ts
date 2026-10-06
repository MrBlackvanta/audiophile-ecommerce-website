"use client";

import type { ProductSlug } from "@/data";
import type { CartLine } from "./cart";

const configuredApi = process.env.NEXT_PUBLIC_API_URL ?? "";
const devApi = "http://localhost:5190";
const devHosts = ["localhost", "127.0.0.1"];

const unreachable =
  "We could not reach the order service. Check your connection and try again.";
const unexpected = "Something went wrong placing your order. Please try again.";
const busy =
  "Too many orders from this address. Give it a minute and try again.";

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
};

export type PlacedOrder = {
  items: { slug: ProductSlug; quantity: number }[];
  total: number;
  shipping: number;
  includedVat: number;
  grandTotal: number;
};

export type OrderResult =
  { ok: true; order: PlacedOrder } | { ok: false; message: string };

function apiBase() {
  if (configuredApi) return configuredApi.replace(/\/$/, "");

  return devHosts.includes(window.location.hostname) ? devApi : "";
}

async function rejection(response: Response) {
  if (response.status === 429) return busy;

  try {
    const problem = (await response.json()) as { detail?: unknown };

    return typeof problem.detail === "string" && problem.detail.length > 0
      ? problem.detail
      : unexpected;
  } catch {
    return unexpected;
  }
}

export async function placeOrder(
  lines: CartLine[],
  customer: OrderCustomer,
  paymentMethod: string,
): Promise<OrderResult> {
  const base = apiBase();

  if (!base) return { ok: false, message: unreachable };

  let response: Response;

  try {
    response = await fetch(`${base}/api/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        customer,
        paymentMethod,
        items: lines.map(({ slug, quantity }) => ({ slug, quantity })),
      }),
    });
  } catch {
    return { ok: false, message: unreachable };
  }

  if (!response.ok) return { ok: false, message: await rejection(response) };

  try {
    return { ok: true, order: (await response.json()) as PlacedOrder };
  } catch {
    return { ok: false, message: unexpected };
  }
}
