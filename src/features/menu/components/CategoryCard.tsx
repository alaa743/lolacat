import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { getLocalizedText } from "@/lib/utils";
import type { MenuCategory, SupportedLanguage } from "@/types";

export function CategoryCard({
  category,
  itemCount,
}: {
  category: MenuCategory;
  itemCount: number;
}) {
  const { t, i18n } = useTranslation("menu");
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
  const name = getLocalizedText(category.name, lang);
  const description = getLocalizedText(category.description, lang);

  return (
    <Link
      to={`/menu/category/${category.id}`}
      data-testid={`category-card-${category.slug}`}
      className="border-brand-pink-border/80 group flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:w-auto"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <SafeFoodImage
          src={category.image}
          alt={name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="backdrop-blur-xs absolute bottom-2.5 start-2.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand-burgundy shadow-sm">
          {t("item.dishesCount", { count: itemCount })}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 text-start">
        <div>
          <h3 className="font-display text-base font-bold text-brand-ink transition-colors group-hover:text-brand-burgundy">
            {name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-brand-muted">
            {description}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs font-bold text-brand-burgundy">
          <span>{t("item.viewDetails")}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
