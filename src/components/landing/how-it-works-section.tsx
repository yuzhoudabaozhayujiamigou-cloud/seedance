"use client";

import { motion } from "framer-motion";
import { ArrowRight, Type, Upload, Video } from "lucide-react";
import { useTranslations } from "next-intl";

import { LocaleLink } from "@/i18n/navigation";

const steps = [
  { key: "prompt", icon: Type },
  { key: "upload", icon: Upload },
  { key: "generate", icon: Video },
] as const;

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

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
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_30px_rgba(11,15,26,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E2A78] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E2A78]/10 text-[#1E2A78]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#0B0F1A]">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0B0F1A]/70">
                  {t(`steps.${step.key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <LocaleLink
            href="/#generator"
            className="inline-flex items-center rounded-full bg-[#1E2A78] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#19235F]"
          >
            {t("cta")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </LocaleLink>
        </motion.div>
      </div>
    </section>
  );
}
