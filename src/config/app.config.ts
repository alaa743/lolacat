export const STORAGE_KEYS = {
  MENU_ITEMS: "lolacat_menu_items_v1",
  CATEGORIES: "lolacat_categories_v1",
  SETTINGS: "lolacat_settings_v1",
  LANGUAGE: "lolacat_language_v1",
} as const;

export const APP_CONFIG = {
  MAX_IMAGE_SIZE_BYTES: 2 * 1024 * 1024, // 2 MB
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
  DEFAULT_CURRENCY: "EGP",
  SEARCH_DEBOUNCE_MS: 220,
} as const;
