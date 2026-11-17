import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { MenuCategory, MenuItem } from "@/types";
import { MenuItemCard } from "./MenuItemCard";

export function FeaturedItems({
  items,
  categories,
  currency,
}: {
  items: MenuItem[];
  categories: MenuCategory[];
  currency: string;
}) {
  const { t } = useTranslation("menu");
  const activeCategoryIds = new Set(categories.filter((c) => c.isActive).map((c) => c.id));
  const featured = items.filter(
    (item) => item.isFeatured && item.isAvailable && activeCategoryIds.has(item.categoryId),
  );

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="bg-brand-pink-soft/70 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-1 text-start">
          <div className="inline-flex items-center gap-2 text-brand-burgundy">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">Lolacat&gt;&lt;</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">
            {t("sections.featuredTitle")}
          </h2>
          <p className="text-sm text-brand-muted">{t("sections.featuredSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.slice(0, 4).map((item) => (
            <MenuItemCard key={item.id} item={item} currency={currency} />
          ))}
        </div>
      </div>
    </section>
  );
}
