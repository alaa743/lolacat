import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "@/config/app.config";
import { DEFAULT_RESTAURANT_SETTINGS } from "@/config/restaurant.config";
import { categoryRepository } from "@/repositories/category.repository";
import { menuRepository } from "@/repositories/menu.repository";
import { settingsRepository } from "@/repositories/settings.repository";
import type {
  MenuCategory,
  MenuCategoryFormValues,
  MenuItem,
  MenuItemFormValues,
  RepositoryResult,
  RestaurantSettings,
} from "@/types";

type ToastMessage = {
  id: string;
  message: string;
  variant: "success" | "error" | "info";
};

type AppContextValue = {
  categories: MenuCategory[];
  items: MenuItem[];
  settings: RestaurantSettings;
  toasts: ToastMessage[];
  showToast: (message: string, variant?: ToastMessage["variant"]) => void;
  dismissToast: (id: string) => void;
  createCategory: (values: MenuCategoryFormValues) => RepositoryResult<MenuCategory>;
  updateCategory: (id: string, values: MenuCategoryFormValues) => RepositoryResult<MenuCategory>;
  deleteCategory: (
    id: string,
    strategy: { mode: "delete_items" } | { mode: "reassign"; targetCategoryId: string },
  ) => RepositoryResult<string>;
  toggleCategoryActive: (id: string) => RepositoryResult<MenuCategory>;
  createItem: (values: MenuItemFormValues) => RepositoryResult<MenuItem>;
  updateItem: (id: string, values: MenuItemFormValues) => RepositoryResult<MenuItem>;
  deleteItem: (id: string) => RepositoryResult<string>;
  toggleItemField: (
    id: string,
    field: "isAvailable" | "isFeatured" | "isPopular",
  ) => RepositoryResult<MenuItem>;
  updateSettings: (next: RestaurantSettings) => RepositoryResult<RestaurantSettings>;
  resetDemoData: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function loadInitialCategories(): MenuCategory[] {
  const res = categoryRepository.getAll();
  return res.success ? res.data : [];
}

function loadInitialItems(): MenuItem[] {
  const res = menuRepository.getAll();
  return res.success ? res.data : [];
}

function loadInitialSettings(): RestaurantSettings {
  const res = settingsRepository.get();
  if (res.success) return res.data;
  const resetRes = settingsRepository.reset();
  return resetRes.success ? resetRes.data : DEFAULT_RESTAURANT_SETTINGS;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>(loadInitialCategories);
  const [items, setItems] = useState<MenuItem[]>(loadInitialItems);
  const [settings, setSettings] = useState<RestaurantSettings>(loadInitialSettings);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastMessage["variant"] = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 3400);
    },
    [dismissToast],
  );

  // Keep tabs in sync if LocalStorage changes externally
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.CATEGORIES) {
        setCategories(loadInitialCategories());
      } else if (event.key === STORAGE_KEYS.MENU_ITEMS) {
        setItems(loadInitialItems());
      } else if (event.key === STORAGE_KEYS.SETTINGS) {
        setSettings(loadInitialSettings());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const createCategory = useCallback((values: MenuCategoryFormValues) => {
    const res = categoryRepository.create(values);
    if (res.success) {
      setCategories(loadInitialCategories());
    }
    return res;
  }, []);

  const updateCategory = useCallback((id: string, values: MenuCategoryFormValues) => {
    const res = categoryRepository.update(id, values);
    if (res.success) {
      setCategories(loadInitialCategories());
    }
    return res;
  }, []);

  const deleteCategory = useCallback(
    (
      id: string,
      strategy: { mode: "delete_items" } | { mode: "reassign"; targetCategoryId: string },
    ): RepositoryResult<string> => {
      if (strategy.mode === "reassign") {
        const reassignRes = menuRepository.reassignCategory(id, strategy.targetCategoryId);
        if (!reassignRes.success) return { success: false, error: reassignRes.error };
      } else {
        const delItemsRes = menuRepository.deleteByCategory(id);
        if (!delItemsRes.success) return { success: false, error: delItemsRes.error };
      }
      const res = categoryRepository.delete(id);
      if (res.success) {
        setCategories(loadInitialCategories());
        setItems(loadInitialItems());
      }
      return res;
    },
    [],
  );

  const toggleCategoryActive = useCallback((id: string) => {
    const res = categoryRepository.toggleActive(id);
    if (res.success) {
      setCategories(loadInitialCategories());
    }
    return res;
  }, []);

  const createItem = useCallback((values: MenuItemFormValues) => {
    const res = menuRepository.create(values);
    if (res.success) {
      setItems(loadInitialItems());
    }
    return res;
  }, []);

  const updateItem = useCallback((id: string, values: MenuItemFormValues) => {
    const res = menuRepository.update(id, values);
    if (res.success) {
      setItems(loadInitialItems());
    }
    return res;
  }, []);

  const deleteItem = useCallback((id: string) => {
    const res = menuRepository.delete(id);
    if (res.success) {
      setItems(loadInitialItems());
    }
    return res;
  }, []);

  const toggleItemField = useCallback(
    (id: string, field: "isAvailable" | "isFeatured" | "isPopular") => {
      const res = menuRepository.toggleField(id, field);
      if (res.success) {
        setItems(loadInitialItems());
      }
      return res;
    },
    [],
  );

  const updateSettings = useCallback((next: RestaurantSettings) => {
    const res = settingsRepository.save(next);
    if (res.success) {
      setSettings(res.data);
    }
    return res;
  }, []);

  const resetDemoData = useCallback(() => {
    categoryRepository.reset();
    menuRepository.reset();
    settingsRepository.reset();
    setCategories(loadInitialCategories());
    setItems(loadInitialItems());
    setSettings(loadInitialSettings());
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      categories,
      items,
      settings,
      toasts,
      showToast,
      dismissToast,
      createCategory,
      updateCategory,
      deleteCategory,
      toggleCategoryActive,
      createItem,
      updateItem,
      deleteItem,
      toggleItemField,
      updateSettings,
      resetDemoData,
    }),
    [
      categories,
      items,
      settings,
      toasts,
      showToast,
      dismissToast,
      createCategory,
      updateCategory,
      deleteCategory,
      toggleCategoryActive,
      createItem,
      updateItem,
      deleteItem,
      toggleItemField,
      updateSettings,
      resetDemoData,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppData must be used inside AppProvider");
  }
  return ctx;
}
