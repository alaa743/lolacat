import { useRef, useState } from "react";
import { Copy, Download, FileCode2, Printer } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { QRCodeCustomizer } from "@/features/qr/components/QRCodeCustomizer";
import { QRCodePreview } from "@/features/qr/components/QRCodePreview";
import { QRPrintLayout } from "@/features/qr/components/QRPrintLayout";
import {
  downloadCanvasAsPng,
  downloadSvgElement,
  getDefaultQrSettings,
  isValidQrUrl,
} from "@/services/qr.service";
import type { QRCodeSettings } from "@/types";

export default function AdminQrCodePage() {
  const { t } = useTranslation("admin");
  const { settings, showToast } = useAppData();
  const [qrSettings, setQrSettings] = useState<QRCodeSettings>(() => getDefaultQrSettings());

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  const validUrl = isValidQrUrl(qrSettings.value);

  const handleDownloadPng = () => {
    const canvas = canvasWrapperRef.current?.querySelector("canvas");
    if (!canvas) return;
    downloadCanvasAsPng(canvas, "lolacat-menu-qr.png");
  };

  const handleDownloadSvg = () => {
    const svg = svgWrapperRef.current?.querySelector("svg");
    if (!svg) return;
    downloadSvgElement(svg, "lolacat-menu-qr.svg");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrSettings.value);
      showToast(t("qr.copiedToast"));
    } catch {
      showToast(qrSettings.value, "info");
    }
  };

  return (
    <div className="space-y-8">
      <div className="no-print">
        <PageHeader title={t("qr.title")} subtitle={t("qr.subtitle")} />
      </div>

      <div className="no-print grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <QRCodeCustomizer settings={qrSettings} onChange={setQrSettings} />
        </div>

        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand-pink-border bg-white p-6 shadow-card lg:col-span-6">
          <h2 className="font-display text-lg font-bold text-brand-ink">{t("qr.previewTitle")}</h2>

          <QRCodePreview
            settings={qrSettings}
            canvasRef={canvasWrapperRef}
            svgRef={svgWrapperRef}
          />

          <div className="flex flex-wrap justify-center gap-2.5">
            <Button onClick={handleDownloadPng} disabled={!validUrl} data-testid="download-qr-png">
              <Download className="h-4 w-4" />
              <span>{t("qr.downloadPng")}</span>
            </Button>

            <Button
              variant="secondary"
              onClick={handleDownloadSvg}
              disabled={!validUrl}
              data-testid="download-qr-svg"
            >
              <FileCode2 className="h-4 w-4" />
              <span>{t("qr.downloadSvg")}</span>
            </Button>

            <Button variant="outline" onClick={handleCopyUrl} disabled={!validUrl}>
              <Copy className="h-4 w-4" />
              <span>{t("qr.copyUrl")}</span>
            </Button>

            <Button variant="ghost" onClick={() => window.print()} disabled={!validUrl}>
              <Printer className="h-4 w-4" />
              <span>{t("qr.printCard")}</span>
            </Button>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="no-print text-center font-display text-lg font-bold text-brand-ink">
          {t("qr.printPreviewTitle")}
        </h2>
        <QRPrintLayout qrSettings={qrSettings} restaurantSettings={settings} />
      </section>
    </div>
  );
}
