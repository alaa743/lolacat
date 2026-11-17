import { Globe, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppData } from "@/app/providers/AppProvider";
import { RestaurantLogo } from "@/components/common/RestaurantLogo";
import { getLocalizedText } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";

export function RestaurantFooter() {
  const { t, i18n } = useTranslation(["common", "menu"]);
  const { settings } = useAppData();
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  return (
    <footer className="mt-16 border-t border-brand-pink-border bg-brand-burgundy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <RestaurantLogo variant="light" size="lg" />
            <p className="text-sm font-medium text-brand-pink">
              {getLocalizedText(settings.tagline, lang)}
            </p>
            <p className="text-sm leading-relaxed text-white/80">
              {getLocalizedText(settings.description, lang)}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-brand-pink">
              {t("menu:sections.contactUs")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                <span>{getLocalizedText(settings.address, lang)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-pink" />
                <a href={`tel:${settings.phone}`} dir="ltr" className="hover:underline">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-pink" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-brand-pink">
              {t("common:nav.menu")}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-white/85">
              <Link to="/" className="hover:text-brand-pink">
                {t("common:nav.browseFullMenu")}
              </Link>
              <Link to="/menu/category/cat-sushi-rolls" className="hover:text-brand-pink">
                {lang === "ar" ? "لفائف السوشي" : "Sushi Rolls"}
              </Link>
              <Link to="/menu/category/cat-ramen-noodles" className="hover:text-brand-pink">
                {lang === "ar" ? "رامن ونودلز" : "Ramen & Noodles"}
              </Link>
              <Link to="/admin" className="hover:text-brand-pink">
                {t("common:nav.admin")}
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="rounded-full bg-white/10 p-2 text-brand-pink transition-colors hover:bg-white/20"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {settings.socialLinks.website && (
                <a
                  href={settings.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Website"
                  className="rounded-full bg-white/10 p-2 text-brand-pink transition-colors hover:bg-white/20"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-white/15 pt-6 text-center text-xs text-white/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t("common:common.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
