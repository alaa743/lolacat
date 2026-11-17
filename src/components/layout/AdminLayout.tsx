import { useState } from "react";
import {
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  Menu,
  QrCode,
  Settings,
  Utensils,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { RestaurantLogo } from "@/components/common/RestaurantLogo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function AdminSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation(["admin", "common"]);

  const navItems = [
    { to: "/admin", label: t("admin:sidebar.overview"), icon: LayoutDashboard, end: true },
    { to: "/admin/items", label: t("admin:sidebar.items"), icon: Utensils },
    { to: "/admin/categories", label: t("admin:sidebar.categories"), icon: FolderKanban },
    { to: "/admin/qr-code", label: t("admin:sidebar.qrCode"), icon: QrCode },
    { to: "/admin/settings", label: t("admin:sidebar.settings"), icon: Settings },
  ];

  const content = (
    <div className="flex h-full flex-col justify-between p-5">
      <div>
        <div className="flex items-center justify-between pb-6">
          <Link to="/admin" onClick={onClose}>
            <RestaurantLogo size="md" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common:common.close")}
            className="rounded-lg p-1.5 text-brand-muted hover:bg-brand-pink-soft lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Badge variant="pink" className="mb-5">
          {t("admin:sidebar.demoBadge")}
        </Badge>

        <nav aria-label="Admin sidebar" className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-brand-burgundy text-white shadow-sm"
                      : "text-brand-ink hover:bg-brand-pink-soft hover:text-brand-burgundy",
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-brand-pink-border pt-4">
        <Button asChild variant="outline" className="w-full justify-between">
          <Link to="/">
            <span>{t("common:nav.viewPublicMenu")}</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-e border-brand-pink-border bg-white lg:block">
        <div className="sticky top-0 h-screen">{content}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="bg-brand-ink/40 backdrop-blur-xs fixed inset-0"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-72 max-w-[85vw] bg-white shadow-2xl">{content}</aside>
        </div>
      )}
    </>
  );
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation(["admin", "common"]);

  return (
    <div className="bg-brand-pink-soft/50 flex min-h-screen text-brand-ink">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-brand-pink-border bg-white/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-display text-lg font-bold text-brand-burgundy">
              {t("admin:sidebar.title")}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher compact />
            <Button asChild variant="secondary" size="sm">
              <Link to="/">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("common:nav.previewMenu")}</span>
              </Link>
            </Button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
