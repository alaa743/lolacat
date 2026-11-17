import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { STORAGE_KEYS } from "@/config/app.config";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";

type LanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({ className, compact = false }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation("common");
  const currentLang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const switchLanguage = (next: SupportedLanguage) => {
    void i18n.changeLanguage(next);
    try {
      window.localStorage.setItem(STORAGE_KEYS.LANGUAGE, next);
    } catch {
      // Ignore storage error
    }
  };

  return (
    <div
      role="group"
      aria-label={t("language.switchTo")}
      className={cn(
        "inline-flex items-center rounded-full border border-brand-pink-border bg-brand-pink-soft p-1",
        className,
      )}
    >
      {!compact && <Globe className="mx-1.5 h-3.5 w-3.5 text-brand-burgundy" aria-hidden="true" />}
      <button
        type="button"
        onClick={() => switchLanguage("en")}
        aria-pressed={currentLang === "en"}
        data-testid="lang-btn-en"
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-bold transition-all",
          currentLang === "en"
            ? "bg-brand-burgundy text-white shadow-sm"
            : "text-brand-burgundy hover:bg-brand-pink",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLanguage("ar")}
        aria-pressed={currentLang === "ar"}
        data-testid="lang-btn-ar"
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-bold transition-all",
          currentLang === "ar"
            ? "bg-brand-burgundy text-white shadow-sm"
            : "text-brand-burgundy hover:bg-brand-pink",
        )}
      >
        AR
      </button>
    </div>
  );
}
