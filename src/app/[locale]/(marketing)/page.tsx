import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ShowcaseSection } from "@/components/landing/showcase-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { HowItWorks } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";

import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { i18n } from "@/config/i18n-config";
import { buildAlternates, resolveOgImage } from "@/lib/seo";
import { getConfiguredAIProvider } from "@/ai";

interface PageMetadataProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: PageMetadataProps) {
  const { locale } = await params;

  const titles = {
    en: "AI Product Video Generator for Ecommerce Ads | Seedance 2.0",
    zh: "AI视频生成器 - 使用Sora 2和Veo 3.1创建精彩视频",
  };

  const descriptions = {
    en: "Create high-converting ecommerce video ads for Shopify, Amazon, and Etsy products with Seedance 2.0. Turn product photos into TikTok, Reels, and listing-ready ad videos in minutes.",
    zh: "用AI将您的想法转化为精彩视频。访问Sora 2、Veo 3.1、Wan 2.6等模型。快速、简单、专业品质的视频生成，几分钟内完成。立即开始创作！",
  };

  const canonicalUrl = `${siteConfig.url}${locale === i18n.defaultLocale ? "" : `/${locale}`}`;
  const alternates = buildAlternates("/", locale);
  const ogImage = resolveOgImage();

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function HomePage() {
  return (
    <>
      <HeroSection currentProvider={getConfiguredAIProvider()} />
      <HowItWorks />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
