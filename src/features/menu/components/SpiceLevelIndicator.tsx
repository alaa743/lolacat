import { Flame } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { SpiceLevel } from "@/types";

export function SpiceLevelIndicator({
  level,
  showLabel = true,
  className,
}: {
  level?: SpiceLevel;
  showLabel?: boolean;
  className?: string;
}) {
  const { t } = useTranslation("menu");
  if (!level || level === "none") {
    return showLabel ? (
      <span className={cn("text-xs text-brand-muted", className)}>{t("spice.none")}</span>
    ) : null;
  }

  const count = level === "mild" ? 1 : level === "medium" ? 2 : 3;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700",
        className,
      )}
    >
      <span className="inline-flex items-center" aria-hidden="true">
        {Array.from({ length: count }).map((_, idx) => (
          <Flame key={idx} className="h-3 w-3 fill-rose-500 text-rose-600" />
        ))}
      </span>
      {showLabel && <span>{t(`spice.${level}`)}</span>}
    </span>
  );
}
