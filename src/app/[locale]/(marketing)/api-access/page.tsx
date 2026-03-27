import type { Locale } from "@/config/i18n-config";
import { LocaleLink } from "@/i18n/navigation";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/api-access", locale);

  return {
    title: "API for AI Product Video Generation | Seedance 2.0",
    description:
      "Integrate Seedance 2.0 into your ecommerce stack to generate product video ads at scale for listings, social campaigns, and storefront automation.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default function ApiAccessPage() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/60 bg-white/70 p-8 md:p-12 backdrop-blur-md shadow-[0_10px_40px_rgba(30,42,120,0.08)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">API</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Use Seedance 2.0 APIs to automate ecommerce video ad production for catalog updates,
            product launches, and paid social creatives.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/70 bg-white/65 p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold">Use Cases</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Bulk-generate product listing videos</li>
                <li>Create UGC-style ad variants per SKU</li>
                <li>Automate seasonal and promo creatives</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/65 p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold">What You Get</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>REST endpoints for generation and status</li>
                <li>Webhook callbacks for async completion</li>
                <li>Credit-based usage model for predictable costs</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://docs.videofly.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Open API Docs
            </a>
            <LocaleLink
              href="/pricing"
              className="inline-flex items-center rounded-full border border-primary/30 bg-white/70 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-white"
            >
              View Pricing
            </LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
