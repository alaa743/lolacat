import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  Plus,
  QrCode,
  RotateCcw,
  Star,
  Utensils,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppData } from "@/app/providers/AppProvider";
import { PageHeader } from "@/components/common/PageHeader";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { ConfirmDialog } from "@/components/feedback/Feedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/features/menu/components/PriceDisplay";
import { formatDateTime } from "@/lib/formatters";
import { getLocalizedText } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";
import { AdminStatCard } from "../components/AdminStatCard";

export default function AdminOverviewPage() {
  const { t, i18n } = useTranslation(["admin", "common"]);
  const { categories, items, settings, resetDemoData, showToast } = useAppData();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const stats = useMemo(() => {
    const availableCount = items.filter((i) => i.isAvailable).length;
    return {
      totalItems: items.length,
      totalCategories: categories.length,
      availableItems: availableCount,
      unavailableItems: items.length - availableCount,
    };
  }, [items, categories]);

  const recentItems = useMemo(
    () => [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5),
    [items],
  );

  const popularItems = useMemo(() => items.filter((i) => i.isPopular).slice(0, 5), [items]);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("admin:overview.title")}
        subtitle={t("admin:overview.subtitle")}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setConfirmResetOpen(true)}>
              <RotateCcw className="h-4 w-4" />
              <span>{t("admin:overview.resetDemoData")}</span>
            </Button>
            <Button asChild size="sm">
              <Link to="/admin/items">
                <Plus className="h-4 w-4" />
                <span>{t("admin:overview.addDish")}</span>
              </Link>
            </Button>
          </>
        }
      />

      {/* Live Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label={t("admin:overview.totalItems")}
          value={stats.totalItems}
          icon={<Utensils className="h-6 w-6" />}
          tone="burgundy"
        />
        <AdminStatCard
          label={t("admin:overview.totalCategories")}
          value={stats.totalCategories}
          icon={<FolderKanban className="h-6 w-6" />}
        />
        <AdminStatCard
          label={t("admin:overview.availableItems")}
          value={stats.availableItems}
          icon={<CheckCircle2 className="h-6 w-6" />}
          tone="success"
        />
        <AdminStatCard
          label={t("admin:overview.unavailableItems")}
          value={stats.unavailableItems}
          icon={<XCircle className="h-6 w-6" />}
          tone="warning"
        />
      </div>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card">
        <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
          {t("admin:overview.quickActions")}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <Link to="/admin/items">
              <Plus className="h-4 w-4" />
              <span>{t("admin:overview.addDish")}</span>
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/admin/categories">
              <FolderKanban className="h-4 w-4" />
              <span>{t("admin:overview.manageCategories")}</span>
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/admin/qr-code">
              <QrCode className="h-4 w-4" />
              <span>{t("admin:overview.generateQr")}</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              <ExternalLink className="h-4 w-4" />
              <span>{t("admin:overview.openPublicMenu")}</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Recently Updated & Popular */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
            {t("admin:overview.recentlyUpdated")}
          </h2>
          <div className="divide-y divide-brand-pink-soft">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <SafeFoodImage
                    src={item.image}
                    alt={getLocalizedText(item.name, lang)}
                    className="h-11 w-11 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 text-start">
                    <p className="truncate font-semibold text-brand-ink">
                      {getLocalizedText(item.name, lang)}
                    </p>
                    <p className="text-xs text-brand-muted">
                      {formatDateTime(item.updatedAt, lang)}
                    </p>
                  </div>
                </div>
                <PriceDisplay price={item.price} currency={settings.currency} size="sm" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
            {t("admin:overview.popularItems")}
          </h2>
          <div className="divide-y divide-brand-pink-soft">
            {popularItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <SafeFoodImage
                    src={item.image}
                    alt={getLocalizedText(item.name, lang)}
                    className="h-11 w-11 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 text-start">
                    <p className="truncate font-semibold text-brand-ink">
                      {getLocalizedText(item.name, lang)}
                    </p>
                    <Badge variant={item.isAvailable ? "success" : "danger"} className="mt-0.5">
                      {item.isAvailable ? t("admin:items.available") : t("admin:items.unavailable")}
                    </Badge>
                  </div>
                </div>
                <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-500" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={confirmResetOpen}
        onOpenChange={setConfirmResetOpen}
        title={t("admin:overview.resetConfirmTitle")}
        description={t("admin:overview.resetConfirmDesc")}
        onConfirm={() => {
          resetDemoData();
          showToast(t("admin:settings.savedToast"), "info");
        }}
      />
    </div>
  );
}
