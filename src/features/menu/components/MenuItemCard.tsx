import { Clock, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { Badge } from "@/components/ui/Badge";
import { formatPrepTime } from "@/lib/formatters";
import { cn, getLocalizedText } from "@/lib/utils";
import type { MenuItem, SupportedLanguage } from "@/types";
import { DietaryBadge } from "./DietaryBadge";
import { PriceDisplay } from "./PriceDisplay";
import { SpiceLevelIndicator } from "./SpiceLevelIndicator";

export function MenuItemCard({ item, currency = "EGP" }: { item: MenuItem; currency?: string }) {
  const { t, i18n } = useTranslation("menu");
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
  const name = getLocalizedText(item.name, lang);
  const description = getLocalizedText(item.description, lang);

  return (
    <Link
      to={`/menu/item/${item.id}`}
      data-testid={`menu-item-card-${item.slug}`}
      className={cn(
        "border-brand-pink-border/80 group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        !item.isAvailable && "opacity-75",
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <SafeFoodImage
          src={item.image}
          alt={name}
          className={cn(
            "h-full w-full transition-transform duration-500 group-hover:scale-105",
            !item.isAvailable && "grayscale-[45%]",
          )}
        />

        <div className="absolute start-2.5 top-2.5 flex flex-wrap gap-1.5">
          {item.isPopular && (
            <Badge variant="burgundy" className="shadow-xs">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              <span>{t("item.popular")}</span>
            </Badge>
          )}
          {!item.isAvailable && (
            <Badge variant="danger" data-testid="unavailable-badge" className="shadow-xs">
              {t("item.unavailable")}
            </Badge>
          )}
        </div>

        {item.spiceLevel && item.spiceLevel !== "none" && (
          <div className="absolute bottom-2.5 end-2.5">
            <SpiceLevelIndicator level={item.spiceLevel} showLabel={false} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 text-start">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-bold leading-snug text-brand-ink transition-colors group-hover:text-brand-burgundy">
              {name}
            </h3>
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-brand-muted">
            {description}
          </p>

          {item.dietaryLabels.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {item.dietaryLabels.map((label) => (
                <DietaryBadge key={label} label={label} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-brand-pink-soft pt-3">
          <PriceDisplay price={item.price} originalPrice={item.originalPrice} currency={currency} />
          {item.preparationTime && (
            <span className="inline-flex items-center gap-1 text-xs text-brand-muted">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{formatPrepTime(item.preparationTime, lang)}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
