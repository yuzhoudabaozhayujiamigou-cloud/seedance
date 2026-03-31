export const THREE_D_CAMERA_DEFAULTS = {
  viewCount: 8,
  yawMin: -45,
  yawMax: 45,
  pitch: 0,
} as const;

export interface ThreeDCameraParams {
  viewCount: number;
  yawMin: number;
  yawMax: number;
  pitch: number;
}

export interface ThreeDCameraView {
  index: number;
  yaw: number;
  pitch: number;
  imageDataUrl: string;
  suggestedFileName: string;
}

export interface ThreeDCameraJobResult {
  jobId: string;
  status: "completed";
  provider: string;
  createdAt: string;
  params: ThreeDCameraParams;
  views: ThreeDCameraView[];
}

export interface ThreeDCameraApiSuccess {
  success: true;
  data: ThreeDCameraJobResult;
}

export interface ThreeDCameraApiFailure {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
}

export type ThreeDCameraApiResponse =
  | ThreeDCameraApiSuccess
  | ThreeDCameraApiFailure;
