import { useTranslation } from "react-i18next";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";

export function PriceDisplay({
  price,
  originalPrice,
  currency = "EGP",
  size = "md",
  className,
}: {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { i18n } = useTranslation();
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };

  return (
    <div className={cn("inline-flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-display font-bold text-brand-burgundy", sizeClasses[size])}>
        {formatPrice(price, currency, lang)}
      </span>
      {hasDiscount && (
        <span className="text-xs font-medium text-brand-muted line-through">
          {formatPrice(originalPrice, currency, lang)}
        </span>
      )}
    </div>
  );
}
