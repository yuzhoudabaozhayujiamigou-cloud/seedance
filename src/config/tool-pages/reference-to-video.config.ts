import { ToolPageConfig } from "./types";
import { NEW_USER_GIFT } from "@/config/pricing-user";

/**
 * Reference to Video 工具页面配置
 */
export const referenceToVideoConfig: ToolPageConfig = {
  // SEO 配置
  seo: {
    title: "Reference to Video - Generate Variations from References",
    description: "Upload reference frames/images and generate guided video variations with AI. Direct reference-video ingestion is in development.",
    keywords: [
      "reference to video",
      "video to video",
      "ai video transformation",
      "reference frames to video",
      "video variation",
      "reference guided video generation",
    ],
    ogImage: "/og-reference-to-video.jpg",
  },

  // 生成器配置
  generator: {
    mode: "reference-to-video",
    uiMode: "compact",

    defaults: {
      model: "seedance-1.5-pro",
      duration: 5,
      aspectRatio: "16:9",
      outputNumber: 1,
    },

    models: {
      available: ["seedance-1.5-pro"],
      default: "seedance-1.5-pro",
    },

    features: {
      showImageUpload: true, // 用于上传参考视频帧
      showPromptInput: true,
      showModeSelector: false,
    },

    promptPlaceholder: "Describe how you want to vary the output while keeping key subjects consistent...",

    settings: {
      showDuration: false, // 使用原始视频时长
      showAspectRatio: true, // 可以保持原始或修改
      showQuality: false,
      showOutputNumber: false,
      showAudioGeneration: false,

      aspectRatios: ["same-as-original", "16:9", "9:16", "1:1", "4:3"],
    },
  },

  // Landing Page 配置
  landing: {
    hero: {
      title: "Generate Guided Variations from References",
      description: "Use reference frames/images plus prompts to guide style and motion. Direct reference-video upload support is still in development.",
      ctaText: "Try It Now",
      ctaSubtext: `${NEW_USER_GIFT.credits} free credits to start`,
    },

    examples: [
      {
        thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
        title: "Style Transfer",
        prompt: "Transform video into anime style with vibrant colors",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&q=80",
        title: "Add Weather Effects",
        prompt: "Add rain and fog atmosphere to the scene",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
        title: "Change Season",
        prompt: "Convert summer scene to winter with snow",
      },
    ],

    features: [
      "Upload reference images/frames (JPG, PNG, WEBP up to 10MB each)",
      "Prompt-guided variation generation (experimental)",
      "Keep key visual elements consistent across outputs",
      "Aspect ratio options depend on active model",
      "Reference-video upload pipeline is in development",
    ],

    supportedModels: [
      { name: "Seedance 1.5 Pro", provider: "ByteDance", color: "#10b981" },
    ],

  },

  // 多语言 key 前缀
  i18nPrefix: "ToolPage.ReferenceToVideo",
};
