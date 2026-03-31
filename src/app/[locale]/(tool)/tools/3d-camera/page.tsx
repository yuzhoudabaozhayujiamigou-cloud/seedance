import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates } from "@/lib/seo";
import { ThreeDCameraGenerator } from "@/components/tool/three-d-camera-generator";

interface ThreeDCameraPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: ThreeDCameraPageProps) {
  const { locale } = await params;
  const alternates = buildAlternates("/tools/3d-camera", locale);

  const title = "3D Camera View Generator";
  const description =
    "Generate multi-angle camera views from a single image with controllable yaw and pitch.";

  return {
    title,
    description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ThreeDCameraPage() {
  return <ThreeDCameraGenerator />;
}
