import { STORAGE_KEYS } from "@/config/app.config";
import { DEFAULT_RESTAURANT_SETTINGS } from "@/config/restaurant.config";
import { safeReadStorage, safeWriteStorage } from "@/lib/storage";
import { restaurantSettingsSchema } from "@/schemas/menu.schema";
import type { RepositoryResult, RestaurantSettings } from "@/types";

export const settingsRepository = {
  get(): RepositoryResult<RestaurantSettings> {
    const result = safeReadStorage(STORAGE_KEYS.SETTINGS, restaurantSettingsSchema);
    if (!result.success || result.data === null) {
      safeWriteStorage(STORAGE_KEYS.SETTINGS, DEFAULT_RESTAURANT_SETTINGS);
      return { success: true, data: DEFAULT_RESTAURANT_SETTINGS };
    }
    return { success: true, data: result.data };
  },

  save(settings: RestaurantSettings): RepositoryResult<RestaurantSettings> {
    const updated: RestaurantSettings = {
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    return safeWriteStorage(STORAGE_KEYS.SETTINGS, updated);
  },

  reset(): RepositoryResult<RestaurantSettings> {
    return safeWriteStorage(STORAGE_KEYS.SETTINGS, DEFAULT_RESTAURANT_SETTINGS);
  },
};
