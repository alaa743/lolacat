import { describe, expect, it } from "vitest";
import { STORAGE_KEYS } from "@/config/app.config";
import { SEED_CATEGORIES, SEED_ITEMS } from "@/data/seed";
import { formatPrice } from "@/lib/formatters";
import { getLocalizedText, normalizeSearchText } from "@/lib/utils";
import { categoryRepository } from "@/repositories/category.repository";
import { menuRepository } from "@/repositories/menu.repository";
import { settingsRepository } from "@/repositories/settings.repository";
import {
  countActiveItemsByCategory,
  DEFAULT_MENU_FILTERS,
  filterAndSortMenuItems,
} from "@/services/menu.service";
import { buildPublicMenuUrl, getDefaultQrSettings, isValidQrUrl } from "@/services/qr.service";

describe("Localization & Arabic Normalization", () => {
  it("selects localized text and falls back cleanly", () => {
    const label = { en: "Tonkotsu Ramen", ar: "تونكوتسو رامن" };
    expect(getLocalizedText(label, "en")).toBe("Tonkotsu Ramen");
    expect(getLocalizedText(label, "ar")).toBe("تونكوتسو رامن");
    expect(getLocalizedText({ en: "Matcha", ar: "" }, "ar")).toBe("Matcha");
  });

  it("normalizes Arabic alef, teh marbuta, alef maksura, and diacritics", () => {
    expect(normalizeSearchText("أرز السُّوشي بالتونة")).toBe("ارز السوشي بالتونه");
    expect(normalizeSearchText("إيدامامي")).toBe("ايدامامي");
    expect(normalizeSearchText("مقرمشة")).toBe("مقرمشه");
  });
});

describe("Price Formatting", () => {
  it("formats EGP prices in English and Arabic", () => {
    expect(formatPrice(275, "EGP", "en")).toContain("275");
    expect(formatPrice(275, "EGP", "en")).toContain("EGP");
    expect(formatPrice(275, "EGP", "ar")).toContain("ج.م");
  });
});

describe("Menu Search, Filtering, and Sorting", () => {
  it("searches across English, Arabic, and ingredients", () => {
    const byEn = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      search: "dragon",
    });
    expect(byEn.some((i) => i.slug === "dragon-roll")).toBe(true);

    const byAr = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      search: "السلمون",
    });
    expect(byAr.length).toBeGreaterThan(0);

    const byIngredient = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      search: "ajitama",
    });
    expect(byIngredient.some((i) => i.slug === "tonkotsu-ramen")).toBe(true);
  });

  it("filters by category, dietary label, spice level, and availability", () => {
    const vegan = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      dietaryLabels: ["vegan"],
    });
    expect(vegan.every((i) => i.dietaryLabels.includes("vegan"))).toBe(true);

    const sushi = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      categoryId: "cat-sushi-rolls",
    });
    expect(sushi).toHaveLength(6);

    const hot = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      spiceLevel: "hot",
    });
    expect(hot.every((i) => i.spiceLevel === "hot")).toBe(true);
  });

  it("sorts by price ascending and descending", () => {
    const asc = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      sortBy: "price_asc",
    });
    expect(asc[0]!.price).toBeLessThanOrEqual(asc[1]!.price);

    const desc = filterAndSortMenuItems(SEED_ITEMS, SEED_CATEGORIES, {
      ...DEFAULT_MENU_FILTERS,
      sortBy: "price_desc",
    });
    expect(desc[0]!.price).toBeGreaterThanOrEqual(desc[1]!.price);
  });

  it("counts available items per category accurately", () => {
    expect(countActiveItemsByCategory(SEED_ITEMS, "cat-sushi-rolls", true)).toBe(6);
  });
});

describe("Repositories & Corrupted LocalStorage Recovery", () => {
  it("recovers safely when LocalStorage contains corrupted JSON", () => {
    window.localStorage.setItem(STORAGE_KEYS.CATEGORIES, "{broken-json");
    window.localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, "not-an-array");
    window.localStorage.setItem(STORAGE_KEYS.SETTINGS, "null");

    const cats = categoryRepository.getAll();
    const items = menuRepository.getAll();
    const settings = settingsRepository.get();

    expect(cats.success && cats.data.length).toBe(SEED_CATEGORIES.length);
    expect(items.success && items.data.length).toBe(SEED_ITEMS.length);
    expect(settings.success && settings.data.name).toBe("Lolacat><");
  });

  it("supports full CRUD on menu items and categories", () => {
    const createdCat = categoryRepository.create({
      name: { en: "Bento Boxes", ar: "صناديق بنتو" },
      description: { en: "Chef curated bento", ar: "بنتو من اختيار الشيف" },
      image: "/images/categories/rice-bowls.jpg",
      displayOrder: 8,
      isActive: true,
    });
    expect(createdCat.success).toBe(true);
    if (!createdCat.success) return;

    const createdItem = menuRepository.create({
      categoryId: createdCat.data.id,
      name: { en: "Kawaii Bento", ar: "كاواي بنتو" },
      description: { en: "Salmon and rice", ar: "سلمون وأرز" },
      price: 390,
      image: "/images/dishes/salmon-poke-bowl.jpg",
      ingredients: [{ en: "Salmon", ar: "سلمون" }],
      spiceLevel: "none",
      dietaryLabels: [],
      isAvailable: true,
      isFeatured: false,
      isPopular: true,
    });
    expect(createdItem.success).toBe(true);
    if (!createdItem.success) return;

    const toggled = menuRepository.toggleField(createdItem.data.id, "isAvailable");
    expect(toggled.success && toggled.data.isAvailable).toBe(false);

    const deleted = menuRepository.delete(createdItem.data.id);
    expect(deleted.success).toBe(true);
  });
});

describe("QR Code Service", () => {
  it("builds dynamic public menu URL and validates URLs", () => {
    expect(buildPublicMenuUrl("https://lolacat.example.com/")).toBe("https://lolacat.example.com/");
    expect(isValidQrUrl("https://lolacat.example.com/")).toBe(true);
    expect(isValidQrUrl("not-a-url")).toBe(false);

    const defaults = getDefaultQrSettings("http://localhost:5173");
    expect(defaults.value).toBe("http://localhost:5173/");
    expect(defaults.foregroundColor).toBe("#6e142d");
    expect(defaults.includeLogo).toBe(true);
  });
});
