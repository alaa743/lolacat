import { format, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import type { SupportedLanguage } from "@/types";

export function formatPrice(
  amount: number,
  currency = "EGP",
  lang: SupportedLanguage = "en",
): string {
  const formattedNumber = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (lang === "ar" && currency === "EGP") {
    return `${formattedNumber} ج.م`;
  }
  return `${formattedNumber} ${currency}`;
}

export function formatDateTime(isoString: string, lang: SupportedLanguage = "en"): string {
  try {
    const date = parseISO(isoString);
    return format(date, "MMM d, yyyy", {
      locale: lang === "ar" ? ar : enUS,
    });
  } catch {
    return isoString;
  }
}

export function formatPrepTime(minutes: number, lang: SupportedLanguage): string {
  if (lang === "ar") {
    return `${minutes} دقيقة`;
  }
  return `${minutes} min`;
}
