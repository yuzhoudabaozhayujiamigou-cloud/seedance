"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  PlayCircle,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { BlurFade } from "@/components/magicui/blur-fade";
import { LocaleLink } from "@/i18n/navigation";

const categories = [
  { key: "tiktok", icon: Smartphone },
  { key: "reels", icon: PlayCircle },
  { key: "amazon", icon: ShoppingBag },
  { key: "demo", icon: Clapperboard },
  { key: "beforeAfter", icon: Sparkles },
] as const;

export function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(30,42,120,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,106,0,0.08),transparent_45%)]" />

      <div className="container mx-auto px-4">
        <BlurFade inView>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{t("title")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <BlurFade key={category.key} delay={index * 0.08} inView>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="h-full rounded-2xl border border-white/60 bg-white/72 p-5 backdrop-blur-md shadow-[0_10px_30px_rgba(30,42,120,0.07)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{t(`categories.${category.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`categories.${category.key}.description`)}
                  </p>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade delay={0.35} inView>
          <div className="mt-12 text-center">
            <LocaleLink
              href="/templates"
              className="inline-flex items-center rounded-full border border-primary/30 bg-white/70 px-6 py-3 text-sm font-medium text-primary transition hover:bg-white"
            >
              {t("browseAll")}
            </LocaleLink>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
