"use client";

import { motion } from "framer-motion";
import { Rocket, SlidersHorizontal, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { LocaleLink } from "@/i18n/navigation";

const featureItems = [
  { key: "quality", icon: Sparkles },
  { key: "workflow", icon: SlidersHorizontal },
  { key: "delivery", icon: Rocket },
] as const;

export function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex rounded-full border border-[#E5E7EB] bg-[#F5F7FB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1E2A78]">
            {t("badge")}
          </p>
          <h2 className="mt-6 text-balance text-3xl font-semibold text-[#0B0F1A] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-[#0B0F1A]/70 md:text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          {featureItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F5F7FB] p-6 shadow-[0_10px_28px_rgba(11,15,26,0.04)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E2A78]/10 text-[#1E2A78]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#0B0F1A]">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0B0F1A]/70">
                  {t(`items.${item.key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <LocaleLink
            href="/templates"
            className="inline-flex items-center rounded-full border border-[#1E2A78]/20 bg-white px-6 py-3 text-sm font-medium text-[#1E2A78] transition-colors hover:bg-[#F5F7FB]"
          >
            {t("browseAll")}
          </LocaleLink>
        </motion.div>
      </div>
    </section>
  );
}
