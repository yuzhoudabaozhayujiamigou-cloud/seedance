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
    title: "Game Clip Templates | AI Video Editor for Gaming Creators",
    description:
      "Browse reusable prompt templates for Stardew Valley recaps, League teamfights, CS2 montages, and short-form creator clips.",
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Game Templates</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Start faster with reusable prompt templates for gameplay recaps, creator intros, and montage-style drafts.
        </p>
      </section>
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
