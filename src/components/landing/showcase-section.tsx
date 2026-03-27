"use client";

import { Play, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { LocaleLink } from "@/i18n/navigation";

/**
 * Showcase Section - 视频示例展示区域
 *
 * 设计模式: Video Gallery with Preview Cards
 * - 展示 AI 生成的视频示例
 * - 悬停播放预览
 * - Glassmorphism 风格卡片
 * - 参考 Linear/Vercel 的产品展示风格
 */

// 示例视频数据
const showcaseVideos = [
  {
    id: 1,
    title: "Portable Blender - TikTok UGC Hook",
    description: "9:16 creator-style ad with first 3-second hook",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    gradient: "from-[#1E2A78] to-[#3A4AB0]",
    tag: "TikTok UGC",
  },
  {
    id: 2,
    title: "Skincare Bundle - Reels Promo",
    description: "Vertical ad cut with social proof captions",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    gradient: "from-[#FF6A00] to-[#FF8F3F]",
    tag: "Instagram Reels",
  },
  {
    id: 3,
    title: "Pet Brush - Amazon Listing Video",
    description: "Feature-focused product listing sequence",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    gradient: "from-[#1E2A78] to-[#FF6A00]",
    tag: "Amazon Listing",
  },
  {
    id: 4,
    title: "Standing Desk - Product Demo",
    description: "Use-case walkthrough with scene transitions",
    thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    gradient: "from-[#1E2A78] to-[#5665C8]",
    tag: "Product Demo",
  },
  {
    id: 5,
    title: "Whitening Pen - Before / After",
    description: "Benefit-led side-by-side comparison edit",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    gradient: "from-[#FF6A00] to-[#FF9C57]",
    tag: "Before/After",
  },
  {
    id: 6,
    title: "Phone Grip - Multi-Variant Batch",
    description: "Six ad hooks generated from one product photo",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    gradient: "from-[#1E2A78] to-[#FF6A00]",
    tag: "Batch Creative",
  },
];

export function ShowcaseSection() {
  const t = useTranslations("Showcase");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      </div>

      <div className="container mx-auto px-4">
        {/* 区域标题 */}
        <BlurFade inView>
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* 徽章 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t("badge")}
              </span>
            </motion.div>

            {/* 主标题 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              {t("title")}
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                {t("subtitle")}
              </span>
            </motion.h2>

            {/* 描述 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t("description")}
            </motion.p>
          </div>
        </BlurFade>

        {/* 视频展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {showcaseVideos.map((video, index) => (
            <BlurFade key={video.id} delay={index * 0.05} inView>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                {/* 视频卡片 */}
                <div className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/60 bg-white/72 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
                  {/* 边框光效 - 仅第一个大卡片 */}
                  {index === 0 && (
                    <BorderBeam
                      size={300}
                      duration={15}
                      anchor={90}
                      borderWidth={2}
                      colorFrom="#3B82F6"
                      colorTo="#A855F7"
                    />
                  )}

                  {/* 缩略图 */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={video.thumbnail}
                      alt={`${video.title} - ${video.description}. AI-generated video example showing ${video.tag} capabilities.`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* 悬停时的遮罩 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                    {/* 播放按钮 */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="h-6 w-6 text-foreground group-hover:text-white transition-colors ml-1" />
                        </motion.div>
                        {/* 波纹动画 */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-ping opacity-0 group-hover:opacity-30" />
                      </div>
                    </motion.div>

                    {/* 标签 */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20"
                    >
                      <span className="text-xs font-medium text-white">{video.tag}</span>
                    </motion.div>
                  </div>

                  {/* 视频信息 */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* 底部 CTA */}
        <BlurFade delay={0.4} inView>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6">{t("ctaText")}</p>
            <LocaleLink href="/examples">
              <ShimmerButton
                shimmerColor="#ffffff"
                shimmerSize="0.05em"
                shimmerDuration="3s"
                borderRadius="100px"
                background="linear-gradient(135deg, #1E2A78 0%, #FF6A00 100%)"
                className="px-8 py-3 text-base font-medium shadow-lg shadow-primary/25"
              >
                {t("ctaButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </ShimmerButton>
            </LocaleLink>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  );
}
