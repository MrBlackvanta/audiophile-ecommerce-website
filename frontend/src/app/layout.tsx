import { PageTransitions } from "@/components/effects";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { siteName, siteUrl } from "@/data";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | High-end headphones, speakers and earphones`,
    template: `%s | ${siteName}`,
  },
  description:
    "High-end headphones, speakers and earphones from a New York showroom. Browse the range, compare the gear and check out in a few steps.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} antialiased`}
    >
      <body className="bg-page flex min-h-dvh flex-col">
        <PageTransitions />
        <SiteHeader />
        <main className="grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
