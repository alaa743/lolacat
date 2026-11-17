import { useRef, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fileToCompressedDataUrl } from "@/services/image.service";
import type { ImageUploadState } from "@/types";

export function ImageUploader({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (nextValue: string) => void;
  error?: string;
}) {
  const { t } = useTranslation("admin");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<ImageUploadState>({
    file: null,
    previewUrl: value || null,
    status: "idle",
    error: null,
  });

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadState({
      file,
      previewUrl: value || null,
      status: "uploading",
      error: null,
    });

    const result = await fileToCompressedDataUrl(file);
    if (!result.success) {
      setUploadState({
        file: null,
        previewUrl: value || null,
        status: "error",
        error: result.error,
      });
      return;
    }

    setUploadState({
      file,
      previewUrl: result.data,
      status: "success",
      error: null,
    });
    onChange(result.data);
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadState({
      file: null,
      previewUrl: null,
      status: "idle",
      error: null,
    });
    onChange("");
  };

  return (
    <div className="bg-brand-pink-soft/40 space-y-3 rounded-2xl border border-brand-pink-border p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-28 w-36 shrink-0 overflow-hidden rounded-xl border border-brand-pink-border bg-white">
          {value ? (
            <SafeFoodImage src={value} alt="Food preview" className="h-full w-full" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-brand-muted">
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelected}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadState.status === "uploading"}
            >
              <Upload className="h-3.5 w-3.5" />
              <span>{value ? t("itemForm.replaceImage") : t("itemForm.chooseFile")}</span>
            </Button>

            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={handleRemove}>
                <Trash2 className="h-3.5 w-3.5 text-red-600" />
                <span className="text-red-600">{t("itemForm.removeImage")}</span>
              </Button>
            )}
          </div>

          <p className="text-xs text-brand-muted">{t("itemForm.uploadHint")}</p>

          <div>
            <label className="mb-1 block text-xs font-medium text-brand-muted">
              {t("itemForm.imageUrlLabel")}
            </label>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/images/dishes/salmon-nigiri.jpg"
              className="h-9 text-xs"
            />
          </div>
        </div>
      </div>

      {(uploadState.error || error) && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {uploadState.error || error}
        </p>
      )}
    </div>
  );
}
