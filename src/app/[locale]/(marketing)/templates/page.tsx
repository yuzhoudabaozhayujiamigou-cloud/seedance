import type { Locale } from "@/config/i18n-config";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/templates", locale);

  return {
    title: "Product Video Templates for Ecommerce Ads | Seedance 2.0",
    description:
      "Browse ready-to-use AI product video templates for TikTok UGC, Instagram Reels, Amazon listings, demos, and before/after ads.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default function TemplatesPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Templates</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Launch product ad videos faster with template blocks built for ecommerce channels.
        </p>
      </section>
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
