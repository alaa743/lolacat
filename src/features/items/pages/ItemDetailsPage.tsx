import { useMemo } from "react";
import { AlertCircle, ArrowLeft, Clock, Flame, Scale, Star, Utensils } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useAppData } from "@/app/providers/AppProvider";
import { Breadcrumbs } from "@/components/common/PageHeader";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { ErrorState } from "@/components/feedback/Feedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DietaryBadge } from "@/features/menu/components/DietaryBadge";
import { MenuItemCard } from "@/features/menu/components/MenuItemCard";
import { PriceDisplay } from "@/features/menu/components/PriceDisplay";
import { SpiceLevelIndicator } from "@/features/menu/components/SpiceLevelIndicator";
import { formatPrepTime } from "@/lib/formatters";
import { getLocalizedText } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";

export default function ItemDetailsPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const { t, i18n } = useTranslation(["menu", "common"]);
  const { items, categories, settings } = useAppData();
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const item = useMemo(
    () => items.find((i) => i.id === itemId || i.slug === itemId),
    [items, itemId],
  );

  const category = useMemo(
    () => categories.find((c) => c.id === item?.categoryId),
    [categories, item],
  );

  const relatedDishes = useMemo(() => {
    if (!item) return [];
    return items
      .filter(
        (other) =>
          other.id !== item.id && other.categoryId === item.categoryId && other.isAvailable,
      )
      .slice(0, 3);
  }, [items, item]);

  if (!item) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <ErrorState
          title={t("menu:empty.missingItemTitle")}
          description={t("menu:empty.missingItemDesc")}
          action={
            <Button asChild>
              <Link to="/">{t("common:nav.browseFullMenu")}</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const itemName = getLocalizedText(item.name, lang);
  const itemDesc = getLocalizedText(item.description, lang);
  const categoryName = category ? getLocalizedText(category.name, lang) : "";
  const portionSize = item.portionSize ? getLocalizedText(item.portionSize, lang) : "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumbs
          items={[
            { label: t("common:nav.menu"), to: "/" },
            ...(category ? [{ label: categoryName, to: `/menu/category/${category.id}` }] : []),
            { label: itemName },
          ]}
        />
        {category && (
          <Button asChild variant="ghost" size="sm">
            <Link to={`/menu/category/${category.id}`}>
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              <span>{t("common:nav.backToCategory")}</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Main Item Card */}
      <article className="overflow-hidden rounded-3xl border border-brand-pink-border bg-white shadow-card">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SafeFoodImage
              src={item.image}
              alt={itemName}
              className="aspect-[4/3] w-full lg:h-full"
              priority
            />
          </div>

          <div className="flex flex-col justify-between p-6 text-start sm:p-8 lg:col-span-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <Link to={`/menu/category/${category.id}`}>
                    <Badge variant="pink">{categoryName}</Badge>
                  </Link>
                )}
                {item.isPopular && (
                  <Badge variant="burgundy">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                    <span>{t("menu:item.popular")}</span>
                  </Badge>
                )}
                <Badge variant={item.isAvailable ? "success" : "danger"}>
                  {item.isAvailable ? t("menu:item.available") : t("menu:item.unavailable")}
                </Badge>
              </div>

              <div>
                <h1 className="font-display text-2xl font-bold text-brand-ink sm:text-4xl">
                  {itemName}
                </h1>
                <div className="mt-3">
                  <PriceDisplay
                    price={item.price}
                    originalPrice={item.originalPrice}
                    currency={settings.currency}
                    size="lg"
                  />
                </div>
              </div>

              <p className="text-sm leading-relaxed text-brand-muted sm:text-base">{itemDesc}</p>

              {/* Dietary & Spice */}
              {(item.dietaryLabels.length > 0 ||
                (item.spiceLevel && item.spiceLevel !== "none")) && (
                <div className="flex flex-wrap items-center gap-2">
                  {item.dietaryLabels.map((label) => (
                    <DietaryBadge key={label} label={label} />
                  ))}
                  {item.spiceLevel && item.spiceLevel !== "none" && (
                    <SpiceLevelIndicator level={item.spiceLevel} />
                  )}
                </div>
              )}

              {/* Quick Facts */}
              <div className="bg-brand-pink-soft/80 grid grid-cols-2 gap-3 rounded-2xl p-4 sm:grid-cols-3">
                {item.preparationTime && (
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Clock className="h-3.5 w-3.5 text-brand-burgundy" />
                      <span>{t("menu:item.prepTime")}</span>
                    </span>
                    <p className="text-sm font-bold text-brand-ink">
                      {formatPrepTime(item.preparationTime, lang)}
                    </p>
                  </div>
                )}

                {item.calories && (
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Flame className="h-3.5 w-3.5 text-brand-burgundy" />
                      <span>{t("menu:item.calories")}</span>
                    </span>
                    <p className="text-sm font-bold text-brand-ink">
                      {t("menu:item.kcal", { count: item.calories })}
                    </p>
                  </div>
                )}

                {portionSize && (
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Scale className="h-3.5 w-3.5 text-brand-burgundy" />
                      <span>{t("menu:item.portionSize")}</span>
                    </span>
                    <p className="text-sm font-bold text-brand-ink">{portionSize}</p>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              {item.ingredients.length > 0 && (
                <div>
                  <h2 className="mb-2 flex items-center gap-1.5 font-display text-sm font-bold text-brand-ink">
                    <Utensils className="h-4 w-4 text-brand-burgundy" />
                    <span>{t("menu:item.ingredients")}</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-brand-pink-border bg-brand-cream px-3 py-1 text-xs font-medium text-brand-ink"
                      >
                        {getLocalizedText(ing, lang)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergens (only rendered when provided) */}
              {item.allergens && item.allergens.length > 0 && (
                <div>
                  <h2 className="mb-2 flex items-center gap-1.5 font-display text-sm font-bold text-brand-ink">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span>{t("menu:item.allergens")}</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((allergen, idx) => (
                      <Badge key={idx} variant="warning">
                        {getLocalizedText(allergen, lang)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-brand-pink-soft pt-5">
              {category && (
                <Button asChild variant="secondary">
                  <Link to={`/menu/category/${category.id}`}>{t("common:nav.backToCategory")}</Link>
                </Button>
              )}
              <Button asChild>
                <Link to="/">{t("common:nav.browseFullMenu")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Explore More Dishes */}
      {relatedDishes.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 font-display text-2xl font-bold text-brand-ink">
            {t("common:nav.exploreMoreDishes")}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedDishes.map((dish) => (
              <MenuItemCard key={dish.id} item={dish} currency={settings.currency} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
