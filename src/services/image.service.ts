import { APP_CONFIG } from "@/config/app.config";
import type { RepositoryResult } from "@/types";

export function validateImageFile(file: File): RepositoryResult<File> {
  const accepted: readonly string[] = APP_CONFIG.ACCEPTED_IMAGE_TYPES;
  if (!accepted.includes(file.type)) {
    return {
      success: false,
      error: "Only JPG, PNG, and WebP images are supported.",
    };
  }
  if (file.size > APP_CONFIG.MAX_IMAGE_SIZE_BYTES) {
    return {
      success: false,
      error: "Image file size must be 2MB or less.",
    };
  }
  return { success: true, data: file };
}

/**
 * Converts an uploaded image file to a compressed Data URL so it persists
 * safely in LocalStorage across page reloads without temporary blob URLs expiring.
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxDimension = 720,
  quality = 0.82,
): Promise<RepositoryResult<string>> {
  const validation = validateImageFile(file);
  if (!validation.success) {
    return validation;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve({ success: false, error: "Could not read image file." });
    reader.onload = () => {
      const rawDataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!rawDataUrl) {
        resolve({ success: false, error: "Empty image data." });
        return;
      }

      const img = new Image();
      img.onerror = () => resolve({ success: true, data: rawDataUrl });
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
          const targetW = Math.max(1, Math.round(img.width * scale));
          const targetH = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve({ success: true, data: rawDataUrl });
            return;
          }
          ctx.drawImage(img, 0, 0, targetW, targetH);
          const compressed = canvas.toDataURL("image/jpeg", quality);
          resolve({ success: true, data: compressed });
        } catch {
          resolve({ success: true, data: rawDataUrl });
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}
