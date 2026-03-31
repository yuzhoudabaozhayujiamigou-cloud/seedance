import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { LocaleLink } from "@/i18n/navigation";

type PlanKey = "trial" | "starter" | "pro" | "business";

const plans: Array<{
  key: PlanKey;
  price: string;
  cadenceKey: "oneTime" | "perMonth";
  featured?: boolean;
}> = [
  { key: "trial", price: "$1", cadenceKey: "oneTime" },
  { key: "starter", price: "$9", cadenceKey: "perMonth" },
  { key: "pro", price: "$19", cadenceKey: "perMonth", featured: true },
  { key: "business", price: "$49", cadenceKey: "perMonth" },
];

export async function PricingSection() {
  const t = await getTranslations("PricingLanding");

  return (
    <section className="bg-[#F5F7FB] py-24 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1E2A78]">
            {t("badge")}
          </p>
          <h2 className="mt-6 text-balance text-3xl font-semibold text-[#0B0F1A] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-[#0B0F1A]/70 md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.key}
              className={`rounded-2xl border p-6 shadow-[0_10px_30px_rgba(11,15,26,0.05)] transition-transform duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-[#1E2A78]/30 bg-white"
                  : "border-[#E5E7EB] bg-[#F5F7FB]"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#1E2A78]">
                {t(`plans.${plan.key}.name`)}
              </p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-semibold text-[#0B0F1A]">{plan.price}</span>
                <span className="pb-1 text-sm text-[#0B0F1A]/60">{t(plan.cadenceKey)}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-[#0B0F1A]/80">
                {t(`plans.${plan.key}.meta`)}
              </p>
              <p className="mt-3 text-sm text-[#0B0F1A]/70">
                {t(`plans.${plan.key}.description`)}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-[#0B0F1A]/85">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#1E2A78]" />
                  {plan.key === "trial" ? t("features.trialLimit") : t("features.modelAccess")}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#1E2A78]" />
                  {t("features.commercial")}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#1E2A78]" />
                  {t("features.flexible")}
                </li>
              </ul>

              <LocaleLink
                href="/#generator"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1E2A78] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#19235F]"
              >
                {t("startGenerating")}
              </LocaleLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#E5E7EB] bg-white p-4 text-center text-sm text-[#0B0F1A]/70">
          {t("note")}
        </div>
      </div>
    </section>
  );
}
