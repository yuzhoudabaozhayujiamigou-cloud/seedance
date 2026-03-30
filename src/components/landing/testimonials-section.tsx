"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonialKeys = ["seller", "brand", "team"] as const;

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");

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
          {testimonialKeys.map((item, index) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-[#E5E7EB] bg-[#F5F7FB] p-6 shadow-[0_10px_30px_rgba(11,15,26,0.05)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center gap-1 text-[#FF6A00]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[#0B0F1A]/85">
                “{t(`items.${item}.quote`)}”
              </p>
              <div className="mt-5 border-t border-[#E5E7EB] pt-4">
                <p className="font-semibold text-[#0B0F1A]">{t(`items.${item}.name`)}</p>
                <p className="text-xs text-[#0B0F1A]/60">{t(`items.${item}.role`)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
