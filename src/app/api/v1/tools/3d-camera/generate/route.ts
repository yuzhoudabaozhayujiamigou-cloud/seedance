import { z } from "zod";

import { ApiError } from "@/lib/api/error";
import { apiError, apiSuccess, handleApiError } from "@/lib/api/response";
import { THREE_D_CAMERA_DEFAULTS } from "@/lib/three-d-camera/types";
import { generateThreeDCameraViews } from "@/services/three-d-camera";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const paramsSchema = z
  .object({
    viewCount: z.coerce.number().int().min(2).max(24).default(THREE_D_CAMERA_DEFAULTS.viewCount),
    yawMin: z.coerce.number().min(-180).max(180).default(THREE_D_CAMERA_DEFAULTS.yawMin),
    yawMax: z.coerce.number().min(-180).max(180).default(THREE_D_CAMERA_DEFAULTS.yawMax),
    pitch: z.coerce.number().min(-90).max(90).default(THREE_D_CAMERA_DEFAULTS.pitch),
  })
  .superRefine((value, context) => {
    if (value.yawMin >= value.yawMax) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["yawMin"],
        message: "yawMin must be less than yawMax",
      });
    }
  });

function formValueToString(entry: FormDataEntryValue | null): string | undefined {
  if (typeof entry !== "string") {
    return undefined;
  }

  const trimmed = entry.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      throw new ApiError("Missing image file", 400);
    }

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      throw new ApiError(
        `Invalid image type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        400
      );
    }

    if (image.size > MAX_FILE_SIZE) {
      throw new ApiError("Image file is too large (max 10MB)", 400);
    }

    const params = paramsSchema.parse({
      viewCount: formValueToString(formData.get("viewCount")),
      yawMin: formValueToString(formData.get("yawMin")),
      yawMax: formValueToString(formData.get("yawMax")),
      pitch: formValueToString(formData.get("pitch")),
    });

    const buffer = Buffer.from(await image.arrayBuffer());

    const result = await generateThreeDCameraViews({
      sourceImage: {
        buffer,
        mimeType: image.type,
        originalName: image.name || "upload.jpg",
      },
      params,
    });

    return apiSuccess(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Invalid 3D camera parameters", 400, error.flatten());
    }
    return handleApiError(error);
  }
}
