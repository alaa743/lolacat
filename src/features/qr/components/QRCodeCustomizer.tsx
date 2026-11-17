import { useTranslation } from "react-i18next";
import { FormField } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BRAND } from "@/config/brand.config";
import type { QRCodeSettings } from "@/types";

export function QRCodeCustomizer({
  settings,
  onChange,
}: {
  settings: QRCodeSettings;
  onChange: (next: QRCodeSettings) => void;
}) {
  const { t } = useTranslation("admin");

  return (
    <div className="space-y-5 rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card">
      <h2 className="font-display text-lg font-bold text-brand-ink">{t("qr.customization")}</h2>

      <FormField label={t("qr.targetUrl")} hint={t("qr.urlHint")}>
        <Input
          dir="ltr"
          value={settings.value}
          onChange={(e) => onChange({ ...settings, value: e.target.value })}
          data-testid="qr-url-input"
        />
      </FormField>

      <FormField label={`${t("qr.size")}: ${settings.size}px`}>
        <input
          type="range"
          min={180}
          max={360}
          step={20}
          value={settings.size}
          onChange={(e) => onChange({ ...settings, size: Number(e.target.value) })}
          className="w-full accent-brand-burgundy"
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("qr.foregroundColor")}>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.foregroundColor}
              onChange={(e) => onChange({ ...settings, foregroundColor: e.target.value })}
              className="h-10 w-14 cursor-pointer rounded-lg border border-brand-pink-border p-1"
            />
            <Input
              dir="ltr"
              value={settings.foregroundColor}
              onChange={(e) => onChange({ ...settings, foregroundColor: e.target.value })}
              className="h-10 font-mono text-xs"
            />
          </div>
        </FormField>

        <FormField label={t("qr.backgroundColor")}>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => onChange({ ...settings, backgroundColor: e.target.value })}
              className="h-10 w-14 cursor-pointer rounded-lg border border-brand-pink-border p-1"
            />
            <Input
              dir="ltr"
              value={settings.backgroundColor}
              onChange={(e) => onChange({ ...settings, backgroundColor: e.target.value })}
              className="h-10 font-mono text-xs"
            />
          </div>
        </FormField>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-ink">
          <input
            type="checkbox"
            checked={settings.includeLogo}
            onChange={(e) => onChange({ ...settings, includeLogo: e.target.checked })}
            className="h-4 w-4 accent-brand-burgundy"
          />
          <span>{t("qr.includeLogo")}</span>
        </label>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange({
              ...settings,
              foregroundColor: BRAND.COLORS.BURGUNDY,
              backgroundColor: "#ffffff",
            })
          }
        >
          {t("qr.resetBrandColors")}
        </Button>
      </div>

      <p className="rounded-xl bg-brand-pink-soft px-3.5 py-2.5 text-xs text-brand-muted">
        {t("qr.contrastWarning")}
      </p>
    </div>
  );
}
