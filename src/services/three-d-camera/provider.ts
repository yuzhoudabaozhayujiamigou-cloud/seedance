import type { ThreeDCameraProvider } from "@/services/three-d-camera/types";
import { stubThreeDCameraProvider } from "@/services/three-d-camera/providers/stub";

const DEFAULT_PROVIDER = "stub";

const providers: Record<string, ThreeDCameraProvider> = {
  stub: stubThreeDCameraProvider,
};

export function getThreeDCameraProvider(): ThreeDCameraProvider {
  const requestedProvider =
    process.env.THREE_D_CAMERA_PROVIDER?.trim().toLowerCase() ||
    DEFAULT_PROVIDER;

  const provider = providers[requestedProvider];
  if (provider) {
    return provider;
  }

  console.warn(
    `[3d-camera] Unknown provider "${requestedProvider}", falling back to "${DEFAULT_PROVIDER}".`
  );
  return providers[DEFAULT_PROVIDER];
}

export function listThreeDCameraProviders(): string[] {
  return Object.keys(providers);
}
