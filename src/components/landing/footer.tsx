"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { LocaleLink } from "@/i18n/navigation";

export function LandingFooter() {
  const tFooter = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: tFooter("product"),
      links: [
        { title: tHeader("generate"), href: "/#generator" },
        { title: tHeader("templates"), href: "/templates" },
        { title: tHeader("examples"), href: "/examples" },
        { title: tHeader("pricing"), href: "/pricing" },
        { title: tHeader("api"), href: "/api-access" },
      ],
    },
    {
      title: tFooter("legal"),
      links: [
        { title: tFooter("privacy"), href: "/privacy" },
        { title: tFooter("terms"), href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F5F7FB]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <LocaleLink href="/" className="inline-flex items-center gap-2 text-lg font-semibold text-[#0B0F1A]">
              <Image src="/logo.svg" alt="Seedance" width={24} height={24} className="rounded" />
              Seedance
            </LocaleLink>
            <p className="mt-4 max-w-md text-sm text-[#0B0F1A]/65">{tFooter("description")}</p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-[#0B0F1A]">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-[#0B0F1A]/65 transition-colors hover:text-[#1E2A78]"
                    >
                      {link.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#E5E7EB] pt-6 text-sm text-[#0B0F1A]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{tFooter("copyright", { year: currentYear })}</p>
          <p>{tFooter("madeBy")}</p>
        </div>
      </div>
    </footer>
  );
}
