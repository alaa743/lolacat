import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/Input";
import { APP_CONFIG } from "@/config/app.config";

export function MenuSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const { t } = useTranslation("menu");
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, APP_CONFIG.SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [localValue, value, onChange]);

  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={t("filters.searchPlaceholder")}
        aria-label={t("filters.searchPlaceholder")}
        data-testid="menu-search-input"
        className="pe-10 ps-10"
      />
      {localValue && (
        <button
          type="button"
          onClick={() => {
            setLocalValue("");
            onChange("");
          }}
          aria-label={t("filters.clearSearch")}
          className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-brand-muted hover:bg-brand-pink-soft hover:text-brand-burgundy"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
