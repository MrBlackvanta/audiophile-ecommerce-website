import { Logo } from "@/components/icons";
import Link from "next/link";
import CartMenu from "./cart-menu";
import HeaderPanels from "./header-panels";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";

export default function SiteHeader() {
  return (
    <header className="v-on-dark absolute inset-x-0 top-0 z-50">
      <div className="v-container">
        <HeaderPanels>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-10.5 py-8 text-white md:grid-cols-[auto_auto_1fr] lg:grid-cols-[1fr_auto_1fr] lg:pt-8.75 lg:pb-9">
            <MobileMenu />
            <Link
              href="/"
              aria-label="audiophile home"
              className="v-tap flex justify-self-start"
            >
              <Logo />
            </Link>
            <div className="hidden lg:block">
              <NavLinks variant="header" />
            </div>
            <CartMenu />
          </div>
        </HeaderPanels>
      </div>
    </header>
  );
}
