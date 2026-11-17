import { useCallback, useMemo, useState } from "react";
import { Clock, Globe, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { getLocalizedText } from "@/lib/utils";
import { DEFAULT_MENU_FILTERS, filterAndSortMenuItems } from "@/services/menu.service";
import type { MenuFilters as MenuFiltersType, SupportedLanguage } from "@/types";
import { CategoryNavigation } from "../components/CategoryNavigation";
import { FeaturedItems } from "../components/FeaturedItems";
import { HeroSection } from "../components/HeroSection";
import { MenuFilters } from "../components/MenuFilters";
import { MenuItemGrid } from "../components/MenuItemGrid";
import { MenuSearch } from "../components/MenuSearch";

export default function MainMenuPage() {
  const { t, i18n } = useTranslation(["menu", "common"]);
  const { categories, items, settings } = useAppData();
  const [filters, setFilters] = useState<MenuFiltersType>(DEFAULT_MENU_FILTERS);
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const filteredItems = useMemo(
    () => filterAndSortMenuItems(items, categories, filters, true),
    [items, categories, filters],
  );

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_MENU_FILTERS);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <HeroSection
        onExploreClick={() => scrollTo("full-menu")}
        onFeaturedClick={() => scrollTo("featured")}
      />

      <CategoryNavigation categories={categories} items={items} />

      <FeaturedItems items={items} categories={categories} currency={settings.currency} />

      <section id="full-menu" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-1 text-start">
          <h2 className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">
            {t("menu:sections.fullMenuTitle")}
          </h2>
          <p className="text-sm text-brand-muted">{t("menu:sections.fullMenuSubtitle")}</p>
        </div>

        <div className="mb-6 space-y-4 rounded-3xl border border-brand-pink-border bg-white p-4 shadow-card sm:p-5">
          <MenuSearch value={filters.search} onChange={handleSearchChange} />
          <MenuFilters filters={filters} categories={categories} onChange={setFilters} />
        </div>

        <div className="mb-4 flex items-center justify-between text-sm font-medium text-brand-muted">
          <span>{t("menu:filters.resultsCount", { count: filteredItems.length })}</span>
        </div>

        <MenuItemGrid
          items={filteredItems}
          currency={settings.currency}
          onResetFilters={handleResetFilters}
        />
      </section>

      {/* Restaurant Information Section */}
      <section id="restaurant-info" className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="bg-brand-pink-soft/80 rounded-3xl border border-brand-pink-border p-6 sm:p-8">
          <div className="mb-6 text-start">
            <h2 className="font-display text-2xl font-bold text-brand-ink">
              {t("menu:sections.restaurantInfoTitle")}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-brand-muted">
              {getLocalizedText(settings.description, lang)}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Opening Hours */}
            <div className="rounded-2xl border border-brand-pink-border bg-white p-5">
              <div className="mb-3 flex items-center gap-2 font-display text-base font-bold text-brand-burgundy">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <h3>{t("menu:sections.openingHours")}</h3>
              </div>
              <dl className="divide-y divide-brand-pink-soft text-sm">
                {settings.openingHours.map((slot) => (
                  <div key={slot.day} className="flex items-center justify-between py-2">
                    <dt className="font-medium text-brand-ink">{t(`common:days.${slot.day}`)}</dt>
                    <dd dir="ltr" className="text-brand-muted">
                      {slot.isClosed
                        ? t("menu:item.closed")
                        : `${slot.openTime} – ${slot.closeTime}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Contact & Social */}
            <div className="flex flex-col justify-between rounded-2xl border border-brand-pink-border bg-white p-5">
              <div className="space-y-4">
                <h3 className="font-display text-base font-bold text-brand-burgundy">
                  {t("menu:sections.contactUs")}
                </h3>
                <ul className="space-y-3 text-sm text-brand-ink">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-burgundy" />
                    <span>{getLocalizedText(settings.address, lang)}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-brand-burgundy" />
                    <a href={`tel:${settings.phone}`} dir="ltr" className="hover:underline">
                      {settings.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-brand-burgundy" />
                    <a href={`mailto:${settings.email}`} className="hover:underline">
                      {settings.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-brand-pink-soft pt-4">
                <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-brand-muted">
                  {t("menu:sections.followUs")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {settings.socialLinks.instagram && (
                    <a
                      href={settings.socialLinks.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink px-3 py-1.5 text-xs font-semibold text-brand-burgundy hover:bg-[#f8d0dd]"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {settings.socialLinks.website && (
                    <a
                      href={settings.socialLinks.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink px-3 py-1.5 text-xs font-semibold text-brand-burgundy hover:bg-[#f8d0dd]"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
