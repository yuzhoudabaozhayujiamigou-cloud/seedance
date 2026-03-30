"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { LocaleLink } from "@/i18n/navigation";

const benefits = ["free", "noCard", "cancel", "support"] as const;

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <div className="absolute inset-0 -z-20 bg-[#0B0F1A]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(30,42,120,0.6),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,106,0,0.28),transparent_45%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage: "url('/images/noise.webp')",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-white/20 bg-white/10 p-8 text-[#F5F7FB] backdrop-blur md:grid-cols-2 md:p-12"
        >
          <div>
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#F5F7FB]">
              {t("badge")}
            </p>
            <h2 className="mt-6 text-balance text-3xl font-semibold md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base text-[#F5F7FB]/80 md:text-lg">
              {t("description")}
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-[#F5F7FB]/85">
                  <Check className="h-4 w-4 text-[#FF6A00]" />
                  <span>{t(`benefits.${benefit}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink
                href="/#generator"
                className="inline-flex items-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E55F00]"
              >
                {t("getStarted")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </LocaleLink>
              <LocaleLink
                href="/pricing"
                className="inline-flex items-center rounded-full border border-white/35 px-6 py-3 text-sm font-medium text-[#F5F7FB] transition-colors hover:bg-white/10"
              >
                {t("viewPricing")}
              </LocaleLink>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <p className="text-sm font-medium uppercase tracking-wide text-[#F5F7FB]/70">
              {t("panel.title")}
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">{t("panel.headline")}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#F5F7FB]/80">{t("panel.description")}</p>
            <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-[#F5F7FB]/85">
              {t("panel.note")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
