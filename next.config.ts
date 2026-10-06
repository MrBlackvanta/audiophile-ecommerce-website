import { PHASE_PRODUCTION_BUILD } from "next/constants";
import type { NextConfig } from "next";

const missingApiUrl =
  "NEXT_PUBLIC_API_URL is not set. Building without it ships a checkout that can never place " +
  "an order: the button fails with a network message and nothing says why at build time. Set " +
  "it to the orders API origin — see README.md.";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactCompiler: true,
  turbopack: { root: import.meta.dirname },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(missingApiUrl);
  }

  return nextConfig;
}
