export type SupportedLanguage = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type ImageUploadStatus = "idle" | "uploading" | "success" | "error";

export type ImageUploadState = {
  file: File | null;
  previewUrl: string | null;
  status: ImageUploadStatus;
  error: string | null;
};

export type RepositoryResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
