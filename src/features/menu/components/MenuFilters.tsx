import { ArrowUpDown, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DropdownSelect } from "@/components/ui/DropdownSelect";
import { cn, getLocalizedText } from "@/lib/utils";
import type {
  DietaryLabel,
  MenuCategory,
  MenuFilters as MenuFiltersType,
  MenuSortOption,
  SpiceLevel,
  SupportedLanguage,
} from "@/types";

export function MenuFilters({
  filters,
  categories,
  onChange,
  hideCategoryFilter = false,
}: {
  filters: MenuFiltersType;
  categories?: MenuCategory[];
  onChange: (next: MenuFiltersType) => void;
  hideCategoryFilter?: boolean;
}) {
  const { t, i18n } = useTranslation("menu");
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const toggleDietary = (label: DietaryLabel) => {
    const exists = filters.dietaryLabels.includes(label);
    const dietaryLabels = exists
      ? filters.dietaryLabels.filter((l) => l !== label)
      : [...filters.dietaryLabels, label];
    onChange({ ...filters, dietaryLabels });
  };

  return (
    <div className="space-y-3">
      {/* Category pills */}
      {!hideCategoryFilter && categories && categories.length > 0 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => onChange({ ...filters, categoryId: undefined })}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              !filters.categoryId
                ? "bg-brand-burgundy text-white"
                : "border border-brand-pink-border bg-white text-brand-ink hover:bg-brand-pink-soft",
            )}
          >
            {t("filters.allCategories")}
          </button>
          {categories
            .filter((c) => c.isActive)
            .map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange({ ...filters, categoryId: cat.id })}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  filters.categoryId === cat.id
                    ? "bg-brand-burgundy text-white"
                    : "border border-brand-pink-border bg-white text-brand-ink hover:bg-brand-pink-soft",
                )}
              >
                {getLocalizedText(cat.name, lang)}
              </button>
            ))}
        </div>
      )}

      {/* Quick toggle chips + sort + spice */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...filters, popularOnly: !filters.popularOnly })}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              filters.popularOnly
                ? "bg-brand-burgundy text-white"
                : "bg-brand-pink text-brand-burgundy hover:bg-[#f8d0dd]",
            )}
          >
            {t("filters.popularOnly")}
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...filters, availableOnly: !filters.availableOnly })}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              filters.availableOnly
                ? "bg-brand-burgundy text-white"
                : "bg-brand-pink text-brand-burgundy hover:bg-[#f8d0dd]",
            )}
          >
            {t("filters.availableOnly")}
          </button>

          {(["vegetarian", "vegan", "gluten_free"] as DietaryLabel[]).map((label) => {
            const active = filters.dietaryLabels.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleDietary(label)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "bg-brand-burgundy text-white"
                    : "border border-brand-pink-border bg-white text-brand-ink hover:bg-brand-pink-soft",
                )}
              >
                {t(`filters.${label}`)}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownSelect
            ariaLabel={t("filters.spicyFilter")}
            value={filters.spiceLevel ?? ""}
            isActive={Boolean(filters.spiceLevel)}
            leadingIcon={<Flame className="h-3.5 w-3.5" />}
            onValueChange={(next) =>
              onChange({
                ...filters,
                spiceLevel: (next || undefined) as SpiceLevel | undefined,
              })
            }
            options={[
              { value: "", label: t("filters.allSpice") },
              {
                value: "mild",
                label: t("spice.mild"),
                icon: <Flame className="h-3.5 w-3.5 text-amber-500" />,
              },
              {
                value: "medium",
                label: t("spice.medium"),
                icon: <Flame className="h-3.5 w-3.5 text-orange-500" />,
              },
              {
                value: "hot",
                label: t("spice.hot"),
                icon: <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-600" />,
              },
            ]}
            triggerClassName="h-9 min-w-[140px]"
            testId="filter-spice-dropdown"
          />

          <DropdownSelect
            ariaLabel={t("filters.sortBy")}
            value={filters.sortBy}
            isActive={filters.sortBy !== "default"}
            leadingIcon={<ArrowUpDown className="h-3.5 w-3.5" />}
            align="end"
            onValueChange={(next) =>
              onChange({
                ...filters,
                sortBy: next as MenuSortOption,
              })
            }
            options={[
              { value: "default", label: t("filters.sortDefault") },
              { value: "price_asc", label: t("filters.sortPriceAsc") },
              { value: "price_desc", label: t("filters.sortPriceDesc") },
              { value: "popular", label: t("filters.sortPopular") },
            ]}
            triggerClassName="h-9 min-w-[175px]"
            testId="filter-sort-dropdown"
          />
        </div>
      </div>
    </div>
  );
}
