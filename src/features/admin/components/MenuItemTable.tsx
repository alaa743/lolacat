import { Pencil, Sparkles, Star, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { EmptyState } from "@/components/feedback/Feedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/features/menu/components/PriceDisplay";
import { formatDateTime } from "@/lib/formatters";
import { cn, getLocalizedText } from "@/lib/utils";
import type { MenuCategory, MenuItem, SupportedLanguage } from "@/types";
import { AvailabilityToggle } from "./AvailabilityToggle";

export function MenuItemTable({
  items,
  categories,
  currency,
  onEdit,
  onDelete,
  onToggleField,
}: {
  items: MenuItem[];
  categories: MenuCategory[];
  currency: string;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onToggleField: (id: string, field: "isAvailable" | "isFeatured" | "isPopular") => void;
}) {
  const { t, i18n } = useTranslation(["admin", "menu", "common"]);
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  if (items.length === 0) {
    return (
      <EmptyState
        title={t("menu:empty.noDishesTitle")}
        description={t("menu:empty.noDishesDesc")}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {items.map((item) => {
          const name = getLocalizedText(item.name, lang);
          const category = categoryMap.get(item.categoryId);
          return (
            <div
              key={item.id}
              data-testid={`admin-item-card-${item.slug}`}
              className="rounded-2xl border border-brand-pink-border bg-white p-4 shadow-card"
            >
              <div className="flex gap-3">
                <SafeFoodImage
                  src={item.image}
                  alt={name}
                  className="h-20 w-20 shrink-0 rounded-xl"
                />
                <div className="min-w-0 flex-1 text-start">
                  <h3 className="truncate font-display text-base font-bold text-brand-ink">
                    {name}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    {category ? getLocalizedText(category.name, lang) : "—"}
                  </p>
                  <div className="mt-1.5">
                    <PriceDisplay
                      price={item.price}
                      originalPrice={item.originalPrice}
                      currency={currency}
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-brand-pink-soft pt-3">
                <div className="flex items-center gap-2">
                  <AvailabilityToggle
                    checked={item.isAvailable}
                    onChange={() => onToggleField(item.id, "isAvailable")}
                    label={t("admin:items.availability")}
                    testId={`toggle-avail-${item.slug}`}
                  />
                  <span className="text-xs font-medium text-brand-ink">
                    {item.isAvailable ? t("admin:items.available") : t("admin:items.unavailable")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    aria-label={t("common:common.edit")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item)}
                    aria-label={t("common:common.delete")}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-brand-pink-border bg-white shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-brand-pink-soft/70 border-b border-brand-pink-border text-xs font-bold uppercase tracking-wider text-brand-burgundy">
              <tr>
                <th className="px-4 py-3.5 text-start">{t("admin:items.dish")}</th>
                <th className="px-4 py-3.5 text-start">{t("admin:items.category")}</th>
                <th className="px-4 py-3.5 text-start">{t("admin:items.price")}</th>
                <th className="px-4 py-3.5 text-start">{t("admin:items.availability")}</th>
                <th className="px-4 py-3.5 text-start">
                  {t("admin:items.featured")} / {t("admin:items.popular")}
                </th>
                <th className="px-4 py-3.5 text-start">{t("admin:items.lastUpdated")}</th>
                <th className="px-4 py-3.5 text-end">{t("common:common.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-pink-soft">
              {items.map((item) => {
                const name = getLocalizedText(item.name, lang);
                const category = categoryMap.get(item.categoryId);
                return (
                  <tr
                    key={item.id}
                    data-testid={`admin-item-row-${item.slug}`}
                    className="hover:bg-brand-pink-soft/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <SafeFoodImage
                          src={item.image}
                          alt={name}
                          className="h-12 w-12 shrink-0 rounded-xl"
                        />
                        <div className="min-w-0">
                          <p className="font-display font-bold text-brand-ink">{name}</p>
                          <p className="max-w-xs truncate text-xs text-brand-muted">
                            {getLocalizedText(item.description, lang)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="pink">
                        {category ? getLocalizedText(category.name, lang) : "—"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <PriceDisplay
                        price={item.price}
                        originalPrice={item.originalPrice}
                        currency={currency}
                        size="sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <AvailabilityToggle
                          checked={item.isAvailable}
                          onChange={() => onToggleField(item.id, "isAvailable")}
                          label={`${name} ${t("admin:items.availability")}`}
                          testId={`toggle-avail-${item.slug}`}
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            item.isAvailable ? "text-emerald-700" : "text-rose-700",
                          )}
                        >
                          {item.isAvailable
                            ? t("admin:items.available")
                            : t("admin:items.unavailable")}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onToggleField(item.id, "isFeatured")}
                          title={t("admin:items.featured")}
                          className={cn(
                            "rounded-lg p-1.5 transition-colors",
                            item.isFeatured
                              ? "bg-brand-pink text-brand-burgundy"
                              : "text-stone-400 hover:bg-stone-100",
                          )}
                        >
                          <Sparkles className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleField(item.id, "isPopular")}
                          title={t("admin:items.popular")}
                          className={cn(
                            "rounded-lg p-1.5 transition-colors",
                            item.isPopular
                              ? "bg-amber-100 text-amber-600"
                              : "text-stone-400 hover:bg-stone-100",
                          )}
                        >
                          <Star className={cn("h-4 w-4", item.isPopular && "fill-current")} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-brand-muted">
                      {formatDateTime(item.updatedAt, lang)}
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          aria-label={`${t("common:common.edit")} ${name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                          aria-label={`${t("common:common.delete")} ${name}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
