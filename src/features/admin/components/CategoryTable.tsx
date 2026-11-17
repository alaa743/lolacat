import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { EmptyState } from "@/components/feedback/Feedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getLocalizedText } from "@/lib/utils";
import type { MenuCategory, MenuItem, SupportedLanguage } from "@/types";
import { AvailabilityToggle } from "./AvailabilityToggle";

export function CategoryTable({
  categories,
  items,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
  onEdit: (category: MenuCategory) => void;
  onDelete: (category: MenuCategory) => void;
  onToggleActive: (id: string) => void;
}) {
  const { t, i18n } = useTranslation(["admin", "common"]);
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  if (categories.length === 0) {
    return (
      <EmptyState
        title={t("admin:categories.title")}
        description={t("admin:categories.subtitle")}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-pink-border bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-brand-pink-soft/70 border-b border-brand-pink-border text-xs font-bold uppercase tracking-wider text-brand-burgundy">
            <tr>
              <th className="px-4 py-3.5 text-start">{t("admin:categories.categoryName")}</th>
              <th className="px-4 py-3.5 text-start">{t("admin:categories.itemsCount")}</th>
              <th className="px-4 py-3.5 text-start">{t("admin:categories.displayOrder")}</th>
              <th className="px-4 py-3.5 text-start">{t("admin:categories.visibility")}</th>
              <th className="px-4 py-3.5 text-end">{t("common:common.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-pink-soft">
            {categories.map((cat) => {
              const name = getLocalizedText(cat.name, lang);
              const count = items.filter((item) => item.categoryId === cat.id).length;

              return (
                <tr key={cat.id} className="hover:bg-brand-pink-soft/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <SafeFoodImage
                        src={cat.image}
                        alt={name}
                        className="h-12 w-12 shrink-0 rounded-xl"
                      />
                      <div>
                        <p className="font-display font-bold text-brand-ink">{name}</p>
                        <p className="max-w-xs truncate text-xs text-brand-muted">
                          {getLocalizedText(cat.description, lang)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="pink">{count}</Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-ink">{cat.displayOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <AvailabilityToggle
                        checked={cat.isActive}
                        onChange={() => onToggleActive(cat.id)}
                        label={`${name} ${t("admin:categories.visibility")}`}
                      />
                      <span className="text-xs font-semibold text-brand-muted">
                        {cat.isActive ? t("admin:categories.active") : t("admin:categories.hidden")}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(cat)}
                        aria-label={`${t("common:common.edit")} ${name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(cat)}
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
  );
}
