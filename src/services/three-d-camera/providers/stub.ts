import { nanoid } from "nanoid";

import type {
  ThreeDCameraJobResult,
  ThreeDCameraView,
} from "@/lib/three-d-camera/types";
import type {
  ThreeDCameraProvider,
  ThreeDCameraProviderInput,
} from "@/services/three-d-camera/types";

function buildYawAngles(viewCount: number, yawMin: number, yawMax: number): number[] {
  if (viewCount <= 1) {
    return [Number(yawMin.toFixed(2))];
  }

  const step = (yawMax - yawMin) / (viewCount - 1);
  return Array.from({ length: viewCount }, (_, index) =>
    Number((yawMin + step * index).toFixed(2))
  );
}

function inferFileExtension(mimeType: string): string {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/gif") return "gif";
  return "jpg";
}

function normalizeFileStem(originalName: string): string {
  const withoutExtension = originalName.replace(/\.[^.]+$/, "");
  const safe = withoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return safe || "camera-view";
}

export const stubThreeDCameraProvider: ThreeDCameraProvider = {
  name: "stub",
  async generateViews({ sourceImage, params }: ThreeDCameraProviderInput): Promise<ThreeDCameraJobResult> {
    const base64 = sourceImage.buffer.toString("base64");
    const imageDataUrl = `data:${sourceImage.mimeType};base64,${base64}`;
    const extension = inferFileExtension(sourceImage.mimeType);
    const stem = normalizeFileStem(sourceImage.originalName);
    const yawAngles = buildYawAngles(params.viewCount, params.yawMin, params.yawMax);

    const views: ThreeDCameraView[] = yawAngles.map((yaw, index) => ({
      index,
      yaw,
      pitch: Number(params.pitch.toFixed(2)),
      imageDataUrl,
      suggestedFileName: `${stem}-yaw-${yaw >= 0 ? `plus-${yaw}` : `minus-${Math.abs(yaw)}`}-pitch-${params.pitch}.${extension}`,
    }));

    return {
      jobId: `three-d-camera-${nanoid(10)}`,
      status: "completed",
      provider: this.name,
      createdAt: new Date().toISOString(),
      params,
      views,
    };
  },
};
