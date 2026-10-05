import {
  FacebookIcon,
  InstagramIcon,
  Logo,
  TwitterIcon,
} from "@/components/icons";
import Link from "next/link";
import Attribution from "./attribution";
import NavLinks from "./nav-links";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com", Icon: FacebookIcon },
  { label: "Twitter", href: "https://www.twitter.com", Icon: TwitterIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    Icon: InstagramIcon,
  },
];

export default function SiteFooter() {
  return (
    <footer className="v-on-dark bg-ink relative text-white">
      <div className="v-container grid justify-items-center pb-9.5 text-center md:grid-cols-[1fr_auto] md:justify-items-start md:pb-11.5 md:text-left lg:pb-12">
        <span className="bg-brand h-1 w-25.25 md:col-span-2" />

        <Link
          href="/"
          aria-label="audiophile home"
          className="v-tap mt-12 flex md:col-span-2 md:mt-14 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:mt-17.75"
        >
          <Logo />
        </Link>

        <div className="mt-12 md:col-span-2 md:mt-8 lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:mt-17.75 lg:justify-self-end">
          <NavLinks variant="footer" />
        </div>

        <p className="text-body mt-12 text-white/50 md:col-span-2 md:mt-8 lg:col-span-1 lg:col-start-1 lg:row-start-3 lg:mt-9 lg:max-w-135">
          Audiophile is an all in one stop to fulfill your audio needs.
          We&rsquo;re a small team of music lovers and sound specialists who are
          devoted to helping you get the most out of personal audio. Come and
          visit our demo facility &mdash; we&rsquo;re open 7 days a week.
        </p>

        <p className="text-body mt-12 font-bold text-white/50 md:mt-20 lg:col-start-1 lg:row-start-4 lg:mt-14">
          Copyright 2021. All Rights Reserved
        </p>

        <ul className="mt-12 flex gap-4 md:mt-20 md:justify-self-end lg:col-start-2 lg:row-start-3 lg:mt-0 lg:mb-2 lg:self-end">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-on-dark flex transition-[color] duration-200"
              >
                <Icon />
                <span className="sr-only">audiophile on {label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Attribution />
    </footer>
  );
}
