import type {
  ThreeDCameraJobResult,
  ThreeDCameraParams,
} from "@/lib/three-d-camera/types";

export interface ThreeDCameraSourceImage {
  buffer: Buffer;
  mimeType: string;
  originalName: string;
}

export interface ThreeDCameraProviderInput {
  sourceImage: ThreeDCameraSourceImage;
  params: ThreeDCameraParams;
}

export interface ThreeDCameraProvider {
  readonly name: string;
  generateViews(input: ThreeDCameraProviderInput): Promise<ThreeDCameraJobResult>;
}
