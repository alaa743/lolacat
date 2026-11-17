import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DropdownSelect } from "@/components/ui/DropdownSelect";
import { Input } from "@/components/ui/Input";
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

      <DropdownSelect
        ariaLabel={t("admin:items.category")}
        value={filters.categoryId}
        isActive={Boolean(filters.categoryId)}
        onValueChange={(next) => onChange({ ...filters, categoryId: next })}
        options={[
          { value: "", label: t("admin:items.allCategories") },
          ...categories.map((cat) => ({
            value: cat.id,
            label: getLocalizedText(cat.name, lang),
          })),
        ]}
        className="w-full"
        triggerClassName="h-11 rounded-xl"
      />

      <DropdownSelect
        ariaLabel={t("admin:items.availability")}
        value={filters.availability}
        isActive={filters.availability !== "all"}
        onValueChange={(next) =>
          onChange({
            ...filters,
            availability: next as AdminFilterValues["availability"],
          })
        }
        options={[
          { value: "all", label: t("admin:items.allAvailability") },
          { value: "available", label: t("admin:items.available") },
          { value: "unavailable", label: t("admin:items.unavailable") },
        ]}
        className="w-full"
        triggerClassName="h-11 rounded-xl"
      />

      <DropdownSelect
        ariaLabel={t("menu:filters.sortBy")}
        value={filters.sortBy}
        isActive={filters.sortBy !== "updated"}
        align="end"
        onValueChange={(next) =>
          onChange({
            ...filters,
            sortBy: next as AdminFilterValues["sortBy"],
          })
        }
        options={[
          { value: "updated", label: t("admin:items.lastUpdated") },
          { value: "price_asc", label: t("menu:filters.sortPriceAsc") },
          { value: "price_desc", label: t("menu:filters.sortPriceDesc") },
        ]}
        className="w-full"
        triggerClassName="h-11 rounded-xl"
      />
    </div>
  );
}
