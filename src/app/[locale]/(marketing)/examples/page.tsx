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
    title: "Gaming Clip Examples | AI Game Video Editor",
    description:
      "Explore reference styles and prompt directions for stream recaps, esports moments, and short-form creator clips.",
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Clip Examples</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse reference styles and prompt directions for your next gaming clip.
        </p>
      </section>
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
