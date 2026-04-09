"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { LocaleLink } from "@/i18n/navigation";

const showcaseVideos = [
  {
    key: "stardew",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "league",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "cs2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export function ShowcaseSection() {
  const t = useTranslations("Showcase");

  return (
    <section className="bg-[#F5F7FB] py-24 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1E2A78]">
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
          {showcaseVideos.map((item, index) => (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_14px_30px_rgba(11,15,26,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,15,26,0.55),rgba(11,15,26,0.02))]" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0B0F1A]">
                  {t(`items.${item.key}.tag`)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1E2A78] shadow-lg">
                    <Play className="ml-0.5 h-5 w-5" />
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#0B0F1A]">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-[#0B0F1A]/70">
                  {t(`items.${item.key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="mb-5 text-sm text-[#0B0F1A]/65">{t("ctaText")}</p>
          <LocaleLink
            href="/examples"
            className="inline-flex items-center rounded-full bg-[#1E2A78] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#19235F]"
          >
            {t("ctaButton")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </LocaleLink>
        </motion.div>
      </div>
    </section>
  );
}
