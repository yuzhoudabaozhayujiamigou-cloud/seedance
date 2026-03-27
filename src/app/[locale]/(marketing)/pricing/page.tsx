import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import type { Locale } from "@/config/i18n-config";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/pricing", locale);

  return {
    title: "Ecommerce Video Ads Pricing | AI Product Video Generator",
    description:
      "Simple credit-based pricing for AI product video ads powered by Seedance 2.0. Start free, scale with Starter, Pro, or Business.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function PricingPage() {
  return (
    <div className="flex w-full flex-col gap-0">
      <PricingSection />
      <FAQSection />
    </div>
  );
}
