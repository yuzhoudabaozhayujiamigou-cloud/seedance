"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  VideoGeneratorInput,
  type SubmitData,
  DEFAULT_CONFIG,
  DEFAULT_DEFAULTS,
} from "@/components/video-generator";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { calculateModelCredits, getAvailableModels } from "@/config/credits";
import { uploadImage } from "@/lib/video-api";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { videoTaskStorage } from "@/lib/video-task-storage";
import { LocaleLink } from "@/i18n/navigation";
import type { ProviderType } from "@/ai";
import {
  isModelModeSupported,
  type GenerationMode,
} from "@/ai/model-mapping";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PENDING_PROMPT_KEY = "videofly_pending_prompt";
const PENDING_IMAGE_KEY = "videofly_pending_image";
const NOTIFICATION_ASKED_KEY = "videofly_notification_asked";
const TOOL_PREFILL_KEY = "videofly_tool_prefill";

function normalizeGeneratorMode(mode?: string): GenerationMode {
  if (mode === "image-to-video" || mode === "i2v") {
    return "image-to-video";
  }
  if (mode === "reference-to-video" || mode === "r2v") {
    return "reference-to-video";
  }
  if (mode === "frames-to-video") {
    return "frames-to-video";
  }
  return "text-to-video";
}

interface HeroSectionProps {
  currentProvider?: ProviderType;
}

export function HeroSection({ currentProvider }: HeroSectionProps) {
  const t = useTranslations("Hero");
  const tNotify = useTranslations("Notifications");
  const locale = useLocale();
  const router = useRouter();
  const signInModal = useSigninModal();
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotifyDialog, setShowNotifyDialog] = useState(false);
  const [pendingSubmitData, setPendingSubmitData] = useState<SubmitData | null>(null);

  const generatorConfig = useMemo(() => {
    const availableModels = getAvailableModels({
      provider: currentProvider,
    });
    const availableIds = new Set(availableModels.map((model) => model.id));
    const providerByModel = new Map(
      availableModels.map((model) => [model.id, currentProvider || model.provider])
    );
    const videoModels = DEFAULT_CONFIG.videoModels ?? [];
    const filteredVideoModels = videoModels.filter((model) => availableIds.has(model.id));
    const filteredVideoModes = (DEFAULT_CONFIG.videoModes ?? [])
      .map((mode) => {
        const normalizedMode = normalizeGeneratorMode(mode.id);
        const supportedModels = (mode.supportedModels ?? []).filter((modelId) => {
          if (!availableIds.has(modelId)) return false;
          const provider = providerByModel.get(modelId);
          if (!provider) return false;
          return isModelModeSupported(modelId, provider, normalizedMode);
        });
        return {
          ...mode,
          supportedModels,
        };
      })
      .filter((mode) => mode.supportedModels.length > 0);

    return {
      ...DEFAULT_CONFIG,
      videoModels: filteredVideoModels,
      videoModes: filteredVideoModes,
    };
  }, [currentProvider]);

  const generatorDefaults = useMemo(() => {
    const preferredModel = (generatorConfig.videoModels ?? [])[0]?.id ?? DEFAULT_DEFAULTS.videoModel;
    return {
      ...DEFAULT_DEFAULTS,
      videoModel: preferredModel,
    };
  }, [generatorConfig.videoModels]);

  const defaultDuration = useMemo(() => {
    const rawDuration = generatorDefaults.duration ?? generatorConfig.durations?.[0];
    if (!rawDuration) return 10;
    const parsed = Number.parseInt(String(rawDuration), 10);
    return Number.isNaN(parsed) ? 10 : parsed;
  }, [generatorDefaults.duration, generatorConfig.durations]);

  const parseDuration = (duration?: string | number) => {
    if (typeof duration === "number") return duration;
    if (!duration) return undefined;
    const parsed = Number.parseInt(duration, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const calculateCredits = useCallback((params: {
    type: "video" | "image";
    model: string;
    outputNumber: number;
    duration?: string;
    resolution?: string;
  }) => {
    if (params.type !== "video") return 0;
    const parsedDuration = parseDuration(params.duration) ?? defaultDuration;
    const baseCredits = calculateModelCredits(params.model, {
      duration: parsedDuration,
      quality: params.resolution,
    });
    return baseCredits * params.outputNumber;
  }, [defaultDuration]);

  const resolveImageUrls = async (data: SubmitData) => {
    if (data.images && data.images.length > 0) {
      return Promise.all(data.images.map((file) => uploadImage(file)));
    }
    return data.imageUrls;
  };

  const getToolRouteByMode = (mode: string) => {
    const normalized = normalizeGeneratorMode(mode);
    if (normalized === "image-to-video") {
      return "image-to-video";
    }
    if (normalized === "reference-to-video") {
      return "reference-to-video";
    }
    return "text-to-video";
  };

  const processSubmission = async (data: SubmitData) => {
    setIsSubmitting(true);
    try {
      const normalizedMode = normalizeGeneratorMode(data.mode);
      const hasImages = (data.images && data.images.length > 0) || (data.imageUrls && data.imageUrls.length > 0);
      const resolvedImageUrls = hasImages ? await resolveImageUrls(data) : undefined;
      const response = await fetch("/api/v1/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: data.prompt,
          model: data.model,
          mode: normalizedMode,
          duration: parseDuration(data.duration),
          aspectRatio: data.aspectRatio,
          quality: data.quality ?? data.resolution,
          outputNumber: data.outputNumber,
          generateAudio: data.generateAudio,
          imageUrls: resolvedImageUrls,
          imageUrl: resolvedImageUrls?.[0],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error?.error?.message || error?.message || "Failed to generate video"
        );
      }

      const result = await response.json();
      const toolRoute = getToolRouteByMode(normalizedMode);
      toast.success("Generation started");
      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            TOOL_PREFILL_KEY,
            JSON.stringify({
              prompt: data.prompt,
              model: data.model,
              mode: normalizedMode,
              duration: parseDuration(data.duration),
              aspectRatio: data.aspectRatio,
              quality: data.quality ?? data.resolution,
              imageUrl: resolvedImageUrls?.[0],
            })
          );
        }
      } catch (storageError) {
        console.warn("Failed to store tool prefill data:", storageError);
      }
      if (session?.user?.id) {
        videoTaskStorage.addTask({
          userId: session.user.id,
          videoId: result.data.videoUuid,
          taskId: result.data.taskId,
          prompt: data.prompt,
          model: data.model,
          mode: normalizedMode,
          status: "generating",
          createdAt: Date.now(),
          notified: false,
        });
      }
      router.push(`/${locale}/${toolRoute}?id=${result.data.videoUuid}`);
    } catch (error) {
      console.error("Generation error:", error);
      const message = error instanceof Error ? error.message : "Failed to generate video. Please try again.";
      if (message.includes("credits") || message.includes("Credit")) {
        toast.error("Insufficient credits. Please top up and try again.");
      } else if (message.includes("database") || message.includes("DATABASE_URL")) {
        toast.error("Service temporarily unavailable. Please try again later.");
      } else {
        toast.error(message || "Failed to generate video. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setPendingSubmitData(null);
    }
  };

  const handleAllowNotify = () => {
    setShowNotifyDialog(false);
    Notification.requestPermission().then(() => {
      localStorage.setItem(NOTIFICATION_ASKED_KEY, "1");
      if (pendingSubmitData) {
        processSubmission(pendingSubmitData);
      }
    });
  };

  const handleSkipNotify = () => {
    setShowNotifyDialog(false);
    localStorage.setItem(NOTIFICATION_ASKED_KEY, "1");
    if (pendingSubmitData) {
      processSubmission(pendingSubmitData);
    }
  };

  const handleSubmit = async (data: SubmitData) => {
    let activeUser = session?.user ?? null;
    if (!activeUser) {
      try {
        const fresh = await authClient.getSession();
        activeUser = fresh?.data?.user ?? null;
      } catch (error) {
        console.warn("Failed to refresh session:", error);
      }
    }

    if (!activeUser) {
      try {
        sessionStorage.setItem(PENDING_PROMPT_KEY, data.prompt);
        if (data.images?.[0]) {
          const reader = new FileReader();
          reader.onloadend = () => {
            sessionStorage.setItem(PENDING_IMAGE_KEY, reader.result as string);
          };
          reader.readAsDataURL(data.images[0]);
        }
      } catch (error) {
        console.warn("Failed to store pending input:", error);
      }
      signInModal.onOpen();
      return;
    }

    if (typeof window !== "undefined" && "Notification" in window) {
      const asked = localStorage.getItem(NOTIFICATION_ASKED_KEY);
      if (!asked && Notification.permission === "default") {
        setPendingSubmitData(data);
        setShowNotifyDialog(true);
        return;
      }
    }

    processSubmission(data);
  };

  return (
    <section id="generator" className="relative min-h-[100svh] overflow-hidden">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/og.png"
      >
        <source
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(11,15,26,0.58),rgba(11,15,26,0.78))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(245,247,251,0.12),rgba(11,15,26,0.82)_70%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage: "url('/images/noise.webp')",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center text-[#F5F7FB]"
        >
          <p className="mx-auto inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]">
            {t("badge")}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-[#F5F7FB]/85 md:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LocaleLink href="/#generator">
              <Button
                size="lg"
                className="rounded-full bg-[#FF6A00] px-7 text-white hover:bg-[#E55F00]"
              >
                {t("startCreating")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </LocaleLink>

            <LocaleLink href="/templates">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/50 bg-white/10 px-7 text-[#F5F7FB] hover:bg-white/20 hover:text-[#F5F7FB]"
              >
                {t("viewExamples")}
              </Button>
            </LocaleLink>
          </div>

          <p className="mt-4 text-sm text-[#F5F7FB]/80">
            {t("creditsHint")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-5xl rounded-3xl border border-white/35 bg-[#F5F7FB]/92 p-2 shadow-[0_30px_120px_rgba(11,15,26,0.35)] backdrop-blur"
        >
          {generatorConfig.videoModels.length > 0 ? (
            <VideoGeneratorInput
              config={generatorConfig}
              defaults={generatorDefaults}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              calculateCredits={calculateCredits}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center text-sm text-[#0B0F1A]/70">
              {t("noModels")}
            </div>
          )}
        </motion.div>
      </div>

      <AlertDialog open={showNotifyDialog} onOpenChange={setShowNotifyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tNotify("enableNotifications")}</AlertDialogTitle>
            <AlertDialogDescription>
              {tNotify("notificationDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSkipNotify}>{tNotify("maybeLater")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleAllowNotify}>{tNotify("allow")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
