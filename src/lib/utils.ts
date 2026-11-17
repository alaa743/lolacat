import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LocalizedText, SupportedLanguage } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getLocalizedText(
  text: LocalizedText | undefined,
  lang: SupportedLanguage,
  fallbackLang: SupportedLanguage = "en",
): string {
  if (!text) return "";
  const primary = text[lang]?.trim();
  if (primary) return primary;
  const fallback = text[fallbackLang]?.trim();
  return fallback || text.en || text.ar || "";
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Normalizes Arabic text for accent-insensitive search:
 * - removes tashkeel/diacritics and tatweel
 * - normalizes alef variants (أ إ آ -> ا)
 * - normalizes teh marbuta (ة -> ه) and alef maksura (ى -> ي)
 */
export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ");
}
