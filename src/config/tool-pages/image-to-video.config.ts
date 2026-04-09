import { ToolPageConfig } from "./types";
import { NEW_USER_GIFT } from "@/config/pricing-user";

/**
 * Image to Video 工具页面配置
 */
export const imageToVideoConfig: ToolPageConfig = {
  // SEO 配置
  seo: {
    title: "Image to Video - Transform Photos into AI Videos",
    description: "Generate motion clips from a source image using Seedance AI models. Generation speed and output options depend on model and queue load.",
    keywords: [
      "image to video",
      "photo animation",
      "ai video generator",
      "picture to video",
      "image animation",
      "seedance",
      "seedance 1.5",
    ],
    ogImage: "/og-image-to-video.jpg",
  },

  // 生成器配置
  generator: {
    mode: "image-to-video",
    uiMode: "compact",

    defaults: {
      model: "seedance-1.5-pro",
      duration: 5,
      aspectRatio: "16:9",
      outputNumber: 1,
    },

    models: {
      available: ["seedance-1.5-pro", "seedance-1.0-pro-fast", "seedance-1.0-pro-quality"],
      default: "seedance-1.5-pro",
    },

    features: {
      showImageUpload: true,
      showPromptInput: true,
      showModeSelector: false,
    },

    promptPlaceholder: "Describe the video you want to create from this image...",

    settings: {
      showDuration: true,
      showAspectRatio: true,
      showQuality: false,
      showOutputNumber: false,
      showAudioGeneration: false,

      durations: [2, 4, 5, 6, 8, 10, 12],
      aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"],
    },
  },

  // Landing Page 配置
  landing: {
    hero: {
      title: "Turn Images into Motion Clip Drafts",
      description: "Upload a source image and generate short motion variations quickly. Output settings and turnaround depend on model capabilities and queue status.",
      ctaText: "Get Started Free",
      ctaSubtext: `${NEW_USER_GIFT.credits} free credits to try`,
    },

    examples: [
      {
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        title: "Photo to Living Scene",
        prompt: "A girl walking on the beach, hair flowing in the wind, golden sunset",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
        title: "Product Animation",
        prompt: "Smartphone rotating on white background with floating particles",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
        title: "Abstract Art Animation",
        prompt: "Swirling colors and shapes morphing smoothly, psychedelic style",
      },
    ],

    features: [
      "Upload any photo (JPG, PNG, WEBP up to 10MB)",
      "Choose supported Seedance models and durations",
      "Aspect ratio and quality options depend on model capabilities",
      "Generation time depends on queue and selected model",
      "Commercial use follows your active plan terms",
    ],

    supportedModels: [
      { name: "Seedance 1.5 Pro", provider: "ByteDance", color: "#10b981" },
      { name: "Seedance 1.0 Fast", provider: "ByteDance", color: "#34d399" },
      { name: "Seedance 1.0 Quality", provider: "ByteDance", color: "#059669" },
    ],

  },

  // 多语言 key 前缀
  i18nPrefix: "ToolPage.ImageToVideo",
};
