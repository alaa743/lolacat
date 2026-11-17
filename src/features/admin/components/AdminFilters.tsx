import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input, Select } from "@/components/ui/Input";
import { getLocalizedText } from "@/lib/utils";
import type { MenuCategory, SupportedLanguage } from "@/types";

export type AdminFilterValues = {
  search: string;
  categoryId: string;
  availability: "all" | "available" | "unavailable";
  sortBy: "updated" | "price_asc" | "price_desc";
};

export function AdminFilters({
  filters,
  categories,
  onChange,
}: {
  filters: AdminFilterValues;
  categories: MenuCategory[];
  onChange: (next: AdminFilterValues) => void;
}) {
  const { t, i18n } = useTranslation(["admin", "menu"]);
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  return (
    <div className="grid gap-3 rounded-2xl border border-brand-pink-border bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
        <Input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t("admin:items.searchPlaceholder")}
          className="ps-9"
        />
      </div>

      <Select
        value={filters.categoryId}
        onChange={(e) => onChange({ ...filters, categoryId: e.target.value })}
        aria-label={t("admin:items.category")}
      >
        <option value="">{t("admin:items.allCategories")}</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {getLocalizedText(cat.name, lang)}
          </option>
        ))}
      </Select>

      <Select
        value={filters.availability}
        onChange={(e) =>
          onChange({
            ...filters,
            availability: e.target.value as AdminFilterValues["availability"],
          })
        }
        aria-label={t("admin:items.availability")}
      >
        <option value="all">{t("admin:items.allAvailability")}</option>
        <option value="available">{t("admin:items.available")}</option>
        <option value="unavailable">{t("admin:items.unavailable")}</option>
      </Select>

      <Select
        value={filters.sortBy}
        onChange={(e) =>
          onChange({
            ...filters,
            sortBy: e.target.value as AdminFilterValues["sortBy"],
          })
        }
        aria-label={t("menu:filters.sortBy")}
      >
        <option value="updated">{t("admin:items.lastUpdated")}</option>
        <option value="price_asc">{t("menu:filters.sortPriceAsc")}</option>
        <option value="price_desc">{t("menu:filters.sortPriceDesc")}</option>
      </Select>
    </div>
  );
}
