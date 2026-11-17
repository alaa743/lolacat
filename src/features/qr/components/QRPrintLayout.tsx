import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { RestaurantLogo } from "@/components/common/RestaurantLogo";
import { getLocalizedText } from "@/lib/utils";
import { isValidQrUrl } from "@/services/qr.service";
import type { QRCodeSettings, RestaurantSettings, SupportedLanguage } from "@/types";

export function QRPrintLayout({
  qrSettings,
  restaurantSettings,
}: {
  qrSettings: QRCodeSettings;
  restaurantSettings: RestaurantSettings;
}) {
  const { t, i18n } = useTranslation("admin");
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  if (!isValidQrUrl(qrSettings.value)) return null;

  return (
    <div
      data-testid="qr-print-card"
      className="mx-auto max-w-md rounded-3xl border-2 border-brand-burgundy bg-gradient-to-b from-brand-pink-soft to-white p-8 text-center shadow-card print:border-2 print:shadow-none"
    >
      <div className="mb-4 flex justify-center">
        <RestaurantLogo size="lg" />
      </div>

      <p className="mb-5 text-sm font-semibold text-brand-muted">
        {getLocalizedText(restaurantSettings.tagline, lang)}
      </p>

      <div className="mx-auto inline-flex rounded-2xl border border-brand-pink-border bg-white p-4 shadow-sm">
        <QRCodeSVG
          value={qrSettings.value}
          size={200}
          bgColor={qrSettings.backgroundColor}
          fgColor={qrSettings.foregroundColor}
          level="H"
          marginSize={4}
        />
      </div>

      <div className="mt-5 space-y-1">
        <p className="font-display text-lg font-bold text-brand-burgundy">{t("qr.scanCtaEn")}</p>
        <p dir="rtl" className="font-arabic text-base font-bold text-brand-ink">
          {t("qr.scanCtaAr")}
        </p>
      </div>

      <p dir="ltr" className="mt-4 truncate text-xs text-brand-muted">
        {qrSettings.value}
      </p>
    </div>
  );
}
