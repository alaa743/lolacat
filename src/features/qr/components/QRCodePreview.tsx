import type React from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { isValidQrUrl } from "@/services/qr.service";
import type { QRCodeSettings } from "@/types";

// Embedded cat emblem SVG data URI for center QR logo (high-contrast, compact, clean)
const LOLACAT_QR_EMBLEM =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#ffffff"/>
      <path d="M14 25L12 10L25 18C27.2 17.3 29.6 17 32 17C34.4 17 36.8 17.3 39 18L52 10L50 25C53.2 28.8 55 33.7 55 39C55 50.6 44.7 57 32 57C19.3 57 9 50.6 9 39C9 33.7 10.8 28.8 14 25Z" fill="#6e142d"/>
      <path d="M19 34L25 37.5L19 41" stroke="#fce3eb" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M45 34L39 37.5L45 41" stroke="#fce3eb" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M27.5 45.5C29 47.5 31 47.5 32 45.5C33 47.5 35 47.5 36.5 45.5" stroke="#fce3eb" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    </svg>`,
  );

export function QRCodePreview({
  settings,
  canvasRef,
  svgRef,
}: {
  settings: QRCodeSettings;
  canvasRef: React.RefObject<HTMLDivElement>;
  svgRef: React.RefObject<HTMLDivElement>;
}) {
  const { t } = useTranslation("admin");
  const valid = isValidQrUrl(settings.value);

  if (!valid) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm font-medium text-rose-700">
        {t("qr.invalidUrlError")}
      </div>
    );
  }

  const logoSize = Math.round(settings.size * 0.18);
  const imageSettings = settings.includeLogo
    ? {
        src: LOLACAT_QR_EMBLEM,
        height: logoSize,
        width: logoSize,
        excavate: true,
      }
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        ref={canvasRef}
        data-testid="qr-canvas-wrapper"
        className="inline-flex rounded-3xl border border-brand-pink-border bg-white p-4 shadow-card"
      >
        <QRCodeCanvas
          value={settings.value}
          size={settings.size}
          bgColor={settings.backgroundColor}
          fgColor={settings.foregroundColor}
          level="H"
          marginSize={4}
          imageSettings={imageSettings}
        />
      </div>

      {/* Off-screen SVG mirror for crisp SVG download */}
      <div ref={svgRef} className="sr-only" aria-hidden="true">
        <QRCodeSVG
          value={settings.value}
          size={settings.size}
          bgColor={settings.backgroundColor}
          fgColor={settings.foregroundColor}
          level="H"
          marginSize={4}
          imageSettings={imageSettings}
        />
      </div>
    </div>
  );
}
