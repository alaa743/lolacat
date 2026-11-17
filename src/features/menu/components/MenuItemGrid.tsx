import { useTranslation } from "react-i18next";
import { EmptyState } from "@/components/feedback/Feedback";
import { Button } from "@/components/ui/Button";
import type { MenuItem } from "@/types";
import { MenuItemCard } from "./MenuItemCard";

export function MenuItemGrid({
  items,
  currency,
  emptyTitle,
  emptyDescription,
  onResetFilters,
}: {
  items: MenuItem[];
  currency: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
}) {
  const { t } = useTranslation("menu");

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle ?? t("empty.noDishesTitle")}
        description={emptyDescription ?? t("empty.noDishesDesc")}
        action={
          onResetFilters ? (
            <Button variant="secondary" onClick={onResetFilters}>
              {t("filters.resetFilters")}
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} currency={currency} />
      ))}
    </div>
  );
}
