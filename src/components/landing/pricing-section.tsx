import { Check } from "lucide-react";

import { LocaleLink } from "@/i18n/navigation";

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "/month",
    videos: "3 videos/month",
    description: "Perfect for testing product concepts",
    featured: false,
  },
  {
    name: "Starter",
    price: "$9",
    cadence: "/month",
    videos: "15 videos/month",
    description: "For solo Shopify, Amazon, or Etsy sellers",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/month",
    videos: "30 videos/month",
    description: "For growth-stage stores running ad tests weekly",
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    cadence: "/month",
    videos: "80 videos/month",
    description: "For teams managing larger product catalogs",
    featured: false,
  },
] as const;

export function PricingSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">Credit-Based Pricing for Ecommerce Video Ads</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, scale as you grow, and only pay for the video volume you need.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-6 backdrop-blur-md ${
                plan.featured
                  ? "border-primary/40 bg-white/78 shadow-[0_14px_40px_rgba(30,42,120,0.14)]"
                  : "border-white/65 bg-white/72 shadow-[0_10px_30px_rgba(30,42,120,0.08)]"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{plan.name}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="pb-1 text-sm text-muted-foreground">{plan.cadence}</span>
              </div>
              <p className="mt-2 text-sm font-medium">{plan.videos}</p>
              <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

              <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Seedance 2.0 product video generation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  TikTok, Reels, and listing-ready formats
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Commercial usage included
                </li>
              </ul>

              <LocaleLink
                href="/#generator"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Start Generating
              </LocaleLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/20 bg-white/70 p-4 text-center text-sm backdrop-blur-md">
          <span className="font-semibold text-primary">Need more volume?</span>{" "}
          Buy extra credits at <span className="font-semibold">$0.99 per extra video</span>.
        </div>
      </div>
    </section>
  );
}
