import { useTranslation } from "react-i18next";
import { countActiveItemsByCategory } from "@/services/menu.service";
import type { MenuCategory, MenuItem } from "@/types";
import { CategoryCard } from "./CategoryCard";

export function CategoryNavigation({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const { t } = useTranslation("menu");
  const activeCategories = categories.filter((cat) => cat.isActive);

  if (activeCategories.length === 0) return null;

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-1 text-start">
        <h2 className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">
          {t("sections.categoriesTitle")}
        </h2>
        <p className="text-sm text-brand-muted">{t("sections.categoriesSubtitle")}</p>
      </div>

      {/* Horizontal scroll on mobile, responsive grid on tablet/desktop */}
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4">
        {activeCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            itemCount={countActiveItemsByCategory(items, category.id, true)}
          />
        ))}
      </div>
    </section>
  );
}
