"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Footer
 * Self-contained agriculture-themed site footer for Farm-Pilot.
 */

const SERVICES = [
  { label: "Crop Management", href: "/services/crop-management" },
  { label: "Soil Testing", href: "/services/soil-testing" },
  { label: "Irrigation Solutions", href: "/services/irrigation-solutions" },
  { label: "Farm Consultancy", href: "/services/farm-consultancy" },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: "f" },
  { label: "Instagram", href: "https://instagram.com", icon: "◎" },
  { label: "YouTube", href: "https://youtube.com", icon: "▶" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#EDE6D6] text-[#2B2A25]">

      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#6B8E4E] via-[#9CB86B] to-[#D7A13B]" />

      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">

          {/* Brand column */}
          <div>

            {/* Logo */}
            <div className="flex items-center gap-2">

              <Image
                src={"/image.png"}
                alt="Farm-Pilot logo"
                height={52}
                width={52}
                className="h-[52px] w-auto"
              />

              <span className="text-2xl font-semibold tracking-tight text-[#2B2A25]">
                Farm-Pilot
              </span>

            </div>

            <p className="mt-3 text-sm font-medium uppercase tracking-wide text-[#6B8E4E]">
              Growing today, sustaining tomorrow
            </p>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#5B594F]">
              Agriculture platform focused on modern, sustainable, and efficient
              farming solutions — built to help growers plan, monitor, and
              improve every season.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex flex-wrap items-center gap-3">

              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C9BD9F] bg-[#F6F1E3] text-sm font-bold text-[#4A6B3A] transition-colors hover:border-[#4A6B3A] hover:bg-[#4A6B3A] hover:text-white"
                >
                  {icon}
                </a>
              ))}

            </div>

          </div>


          {/* Links columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">

            {/* Services */}
            <div>

              <h3 className="text-sm font-semibold text-[#2B2A25]">
                Our Services
              </h3>

              <ul className="mt-4 space-y-2.5">

                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[#5B594F] transition-colors hover:text-[#4A6B3A]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}

              </ul>

            </div>


            {/* Contact */}
            <div>

              <h3 className="text-sm font-semibold text-[#2B2A25]">
                Contact Us
              </h3>

              <ul className="mt-4 space-y-3">

                {/* Address */}
                <li className="flex items-start gap-2.5 text-sm text-[#5B594F]">

                  <span className="mt-0.5 text-[#4A6B3A]">
                    ⌖
                  </span>

                  <span>
                    Your Address, City, Country
                  </span>

                </li>


                {/* Phone */}
                <li className="flex items-center gap-2.5 text-sm text-[#5B594F]">

                  <span className="text-[#4A6B3A]">
                    ☎
                  </span>

                  <a
                    href="tel:+92XXXXXXXXX"
                    className="hover:text-[#4A6B3A]"
                  >
                    +92 XXX XXXXXXX
                  </a>

                </li>


                {/* Email */}
                <li className="flex items-center gap-2.5 text-sm text-[#5B594F]">

                  <span className="text-[#4A6B3A]">
                    ✉
                  </span>

                  <a
                    href="mailto:info@agrigrow.com"
                    className="hover:text-[#4A6B3A]"
                  >
                    info@agrigrow.com
                  </a>

                </li>


                {/* Website */}
                <li className="flex items-center gap-2.5 text-sm text-[#5B594F]">

                  <span className="text-[#4A6B3A]">
                    ◉
                  </span>

                  <a
                    href="https://www.agrigrow.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#4A6B3A]"
                  >
                    www.agrigrow.com

                    <span className="text-xs">
                      ↗
                    </span>

                  </a>

                </li>

              </ul>

            </div>

          </div>

        </div>


        {/* Divider */}
        <div
          className="my-10 h-px w-full bg-[#C9BD9F]"
          aria-hidden="true"
        />


        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          <p className="text-sm text-[#5B594F]">
            © {year} Farm-Pilot. All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-[#5B594F] transition-colors hover:text-[#4A6B3A]"
              >
                {label}
              </Link>
            ))}

          </div>

        </div>

      </div>

    </footer>
  );
}
