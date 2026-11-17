import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { STORAGE_KEYS } from "@/config/app.config";
import arAdmin from "./locales/ar/admin.json";
import arCommon from "./locales/ar/common.json";
import arMenu from "./locales/ar/menu.json";
import enAdmin from "./locales/en/admin.json";
import enCommon from "./locales/en/common.json";
import enMenu from "./locales/en/menu.json";

export const resources = {
  en: {
    common: enCommon,
    menu: enMenu,
    admin: enAdmin,
  },
  ar: {
    common: arCommon,
    menu: arMenu,
    admin: arAdmin,
  },
} as const;

export function applyDocumentDirection(lang: string): void {
  const isArabic = lang.startsWith("ar");
  const normalized = isArabic ? "ar" : "en";
  if (typeof document !== "undefined") {
    document.documentElement.lang = normalized;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    defaultNS: "common",
    ns: ["common", "menu", "admin"],
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: STORAGE_KEYS.LANGUAGE,
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

applyDocumentDirection(i18n.language || "en");
i18n.on("languageChanged", (lng) => {
  applyDocumentDirection(lng);
});

export default i18n;
