import { useCallback, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useAppData } from "@/app/providers/AppProvider";
import { Breadcrumbs } from "@/components/common/PageHeader";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { ErrorState } from "@/components/feedback/Feedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MenuFilters } from "@/features/menu/components/MenuFilters";
import { MenuItemGrid } from "@/features/menu/components/MenuItemGrid";
import { MenuSearch } from "@/features/menu/components/MenuSearch";
import { getLocalizedText } from "@/lib/utils";
import {
  countActiveItemsByCategory,
  DEFAULT_MENU_FILTERS,
  filterAndSortMenuItems,
} from "@/services/menu.service";
import type { MenuFilters as MenuFiltersType, SupportedLanguage } from "@/types";

export default function CategoryDetailsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t, i18n } = useTranslation(["menu", "common"]);
  const { categories, items, settings } = useAppData();
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId || c.slug === categoryId),
    [categories, categoryId],
  );

  const [filters, setFilters] = useState<MenuFiltersType>(DEFAULT_MENU_FILTERS);

  const categoryItems = useMemo(() => {
    if (!category) return [];
    return filterAndSortMenuItems(
      items,
      categories,
      { ...filters, categoryId: category.id },
      false,
    );
  }, [category, items, categories, filters]);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  if (!category) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <ErrorState
          title={t("menu:empty.missingCategoryTitle")}
          description={t("menu:empty.missingCategoryDesc")}
          action={
            <Button asChild>
              <Link to="/">{t("common:nav.backToMenu")}</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const categoryName = getLocalizedText(category.name, lang);
  const categoryDesc = getLocalizedText(category.description, lang);
  const availableCount = countActiveItemsByCategory(items, category.id, true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumbs items={[{ label: t("common:nav.menu"), to: "/" }, { label: categoryName }]} />
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t("common:nav.backToMenu")}</span>
          </Link>
        </Button>
      </div>

      {/* Category Hero Banner */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-brand-pink-border bg-white shadow-card">
        <div className="grid items-center md:grid-cols-12">
          <div className="md:col-span-5">
            <SafeFoodImage
              src={category.image}
              alt={categoryName}
              className="aspect-[16/10] w-full md:aspect-[4/3]"
              priority
            />
          </div>
          <div className="space-y-3 p-6 text-start md:col-span-7 md:p-8">
            <Badge variant="pink">{t("menu:item.dishesCount", { count: availableCount })}</Badge>
            <h1 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
              {categoryName}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
              {categoryDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Category Search & Filters */}
      <div className="mb-6 space-y-4 rounded-3xl border border-brand-pink-border bg-white p-4 shadow-card sm:p-5">
        <MenuSearch value={filters.search} onChange={handleSearchChange} />
        <MenuFilters filters={filters} onChange={setFilters} hideCategoryFilter />
      </div>

      <MenuItemGrid
        items={categoryItems}
        currency={settings.currency}
        emptyTitle={t("menu:empty.emptyCategoryTitle")}
        emptyDescription={t("menu:empty.emptyCategoryDesc")}
        onResetFilters={() => setFilters(DEFAULT_MENU_FILTERS)}
      />
    </div>
  );
}
