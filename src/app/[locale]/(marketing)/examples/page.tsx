import type { Locale } from "@/config/i18n-config";
import { ShowcaseSection } from "@/components/landing/showcase-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/examples", locale);

  return {
    title: "Ecommerce Video Ad Examples | AI Product Video Generator",
    description:
      "See AI-generated ecommerce video ad examples for Shopify, Amazon, and Etsy product campaigns built with Seedance 2.0.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default function ExamplesPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Examples</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore high-converting ecommerce ad styles generated in minutes with Seedance 2.0.
        </p>
      </section>
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
