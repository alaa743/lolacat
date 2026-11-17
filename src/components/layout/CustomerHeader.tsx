import { Search, Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { RestaurantLogo } from "@/components/common/RestaurantLogo";
import { Button } from "@/components/ui/Button";

export function CustomerHeader() {
  const { t } = useTranslation("common");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionScroll = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="border-brand-pink-border/80 bg-brand-cream/95 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Lolacat>< Home" className="shrink-0">
          <RestaurantLogo size="md" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={() => handleSectionScroll("categories")}
            className="text-sm font-semibold text-brand-ink transition-colors hover:text-brand-burgundy"
          >
            {t("nav.categories")}
          </button>
          <button
            type="button"
            onClick={() => handleSectionScroll("featured")}
            className="text-sm font-semibold text-brand-ink transition-colors hover:text-brand-burgundy"
          >
            {t("nav.featured")}
          </button>
          <button
            type="button"
            onClick={() => handleSectionScroll("full-menu")}
            className="text-sm font-semibold text-brand-ink transition-colors hover:text-brand-burgundy"
          >
            {t("nav.menu")}
          </button>
          <button
            type="button"
            onClick={() => handleSectionScroll("restaurant-info")}
            className="text-sm font-semibold text-brand-ink transition-colors hover:text-brand-burgundy"
          >
            {t("nav.about")}
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("common.search")}
            onClick={() => handleSectionScroll("full-menu")}
            className="text-brand-burgundy"
          >
            <Search className="h-4 w-4" />
          </Button>
          <LanguageSwitcher compact />
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <Link to="/admin">
              <Settings2 className="h-3.5 w-3.5" />
              <span>{t("nav.admin")}</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="icon"
            aria-label={t("nav.admin")}
            className="sm:hidden"
          >
            <Link to="/admin">
              <Settings2 className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
