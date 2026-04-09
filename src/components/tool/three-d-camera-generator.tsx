"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type {
  ThreeDCameraApiResponse,
  ThreeDCameraJobResult,
  ThreeDCameraParams,
} from "@/lib/three-d-camera/types";
import { THREE_D_CAMERA_DEFAULTS } from "@/lib/three-d-camera/types";

const PRESETS: Array<{
  id: string;
  label: string;
  values: Pick<ThreeDCameraParams, "yawMin" | "yawMax" | "viewCount">;
}> = [
  {
    id: "default",
    label: "Default ±45°",
    values: { yawMin: -45, yawMax: 45, viewCount: 8 },
  },
  {
    id: "wide",
    label: "Wide ±70°",
    values: { yawMin: -70, yawMax: 70, viewCount: 8 },
  },
  {
    id: "tight",
    label: "Tight ±30°",
    values: { yawMin: -30, yawMax: 30, viewCount: 8 },
  },
];

function formatSignedAngle(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}°`;
}

function getResponseError(response: ThreeDCameraApiResponse): string {
  if (response.success) {
    return "";
  }
  return response.error.message || "3D camera generation failed";
}

export function ThreeDCameraGenerator() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [viewCount, setViewCount] = useState<number>(THREE_D_CAMERA_DEFAULTS.viewCount);
  const [yawMin, setYawMin] = useState<number>(THREE_D_CAMERA_DEFAULTS.yawMin);
  const [yawMax, setYawMax] = useState<number>(THREE_D_CAMERA_DEFAULTS.yawMax);
  const [pitch, setPitch] = useState<number>(THREE_D_CAMERA_DEFAULTS.pitch);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ThreeDCameraJobResult | null>(null);

  useEffect(() => {
    if (!sourceImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(sourceImage);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [sourceImage]);

  const yawRangeInvalid = useMemo(() => yawMin >= yawMax, [yawMin, yawMax]);

  const canGenerate = Boolean(sourceImage) && !isGenerating && !yawRangeInvalid;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSourceImage(file);
    setError(null);
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((item) => item.id === presetId);
    if (!preset) {
      return;
    }

    setYawMin(preset.values.yawMin);
    setYawMax(preset.values.yawMax);
    setViewCount(preset.values.viewCount);
  };

  const resetToDefaults = () => {
    setViewCount(THREE_D_CAMERA_DEFAULTS.viewCount);
    setYawMin(THREE_D_CAMERA_DEFAULTS.yawMin);
    setYawMax(THREE_D_CAMERA_DEFAULTS.yawMax);
    setPitch(THREE_D_CAMERA_DEFAULTS.pitch);
  };

  const handleGenerate = async () => {
    if (!sourceImage) {
      setError("Please upload an image first.");
      return;
    }

    if (yawRangeInvalid) {
      setError("Yaw start must be smaller than yaw end.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", sourceImage);
      formData.append("viewCount", String(viewCount));
      formData.append("yawMin", String(yawMin));
      formData.append("yawMax", String(yawMax));
      formData.append("pitch", String(pitch));

      const response = await fetch("/api/v1/tools/3d-camera/generate", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as ThreeDCameraApiResponse;
      if (!response.ok || !payload.success) {
        throw new Error(getResponseError(payload));
      }

      setResult(payload.data);
    } catch (cause) {
      const message =
        cause instanceof Error
          ? cause.message
          : "3D camera generation failed. Please try again.";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl p-6 lg:p-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">3D Camera / Multi-angle View Generator</h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Upload one image and generate yaw-based camera views. MVP currently uses a stub provider
            that duplicates the original image while preserving per-view metadata.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Defaults: 8 views, yaw -45° to +45°, pitch 0°
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="three-d-camera-source">Source image</Label>
                <Input
                  id="three-d-camera-source"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="3D camera source preview"
                    className="mt-2 h-44 w-full rounded-md border object-cover"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <Button
                      key={preset.id}
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => applyPreset(preset.id)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                  <Button type="button" size="sm" variant="ghost" onClick={resetToDefaults}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Yaw start: {formatSignedAngle(yawMin)}</Label>
                  <Slider
                    value={[yawMin]}
                    min={-180}
                    max={180}
                    step={1}
                    onValueChange={(values) => setYawMin(values[0] ?? yawMin)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Yaw end: {formatSignedAngle(yawMax)}</Label>
                  <Slider
                    value={[yawMax]}
                    min={-180}
                    max={180}
                    step={1}
                    onValueChange={(values) => setYawMax(values[0] ?? yawMax)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pitch: {formatSignedAngle(pitch)}</Label>
                  <Slider
                    value={[pitch]}
                    min={-90}
                    max={90}
                    step={1}
                    onValueChange={(values) => setPitch(values[0] ?? pitch)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Views: {viewCount}</Label>
                  <Slider
                    value={[viewCount]}
                    min={2}
                    max={24}
                    step={1}
                    onValueChange={(values) => setViewCount(values[0] ?? viewCount)}
                  />
                </div>

                {yawRangeInvalid && (
                  <p className="text-sm text-destructive">Yaw start must be lower than yaw end.</p>
                )}
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="button" className="w-full" onClick={handleGenerate} disabled={!canGenerate}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating views...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                {result
                  ? `${result.views.length} view(s) generated with provider \"${result.provider}\".`
                  : "Generated views will appear here."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {result.views.map((view) => (
                    <article
                      key={`${view.index}-${view.yaw}-${view.pitch}`}
                      className="overflow-hidden rounded-lg border bg-background"
                    >
                      <img
                        src={view.imageDataUrl}
                        alt={`Generated view ${view.index + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                      <div className="space-y-3 p-3">
                        <p className="text-xs text-muted-foreground">
                          View {view.index + 1} · yaw {formatSignedAngle(view.yaw)} · pitch {formatSignedAngle(view.pitch)}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <a href={view.imageDataUrl} download={view.suggestedFileName}>
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                  Upload an image and click Generate.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
