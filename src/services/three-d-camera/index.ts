import type { ThreeDCameraJobResult } from "@/lib/three-d-camera/types";
import { getThreeDCameraProvider } from "@/services/three-d-camera/provider";
import type { ThreeDCameraProviderInput } from "@/services/three-d-camera/types";

/**
 * Main entry for 3D camera generation.
 * Replace or extend providers in ./provider.ts to integrate real image-edit backends.
 */
export async function generateThreeDCameraViews(
  input: ThreeDCameraProviderInput
): Promise<ThreeDCameraJobResult> {
  const provider = getThreeDCameraProvider();
  return provider.generateViews(input);
}
