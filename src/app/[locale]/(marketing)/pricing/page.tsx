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
    title: "Gaming Clip Pricing | Seedance AI Video Workflow",
    description:
      "Simple credit-based pricing for Seedance AI video generation workflows. Start with a $1 trial clip, then scale with Starter, Pro, or Business.",
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
