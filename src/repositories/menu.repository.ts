import { v4 as uuidv4 } from "uuid";
import { STORAGE_KEYS } from "@/config/app.config";
import { SEED_ITEMS } from "@/data/seed";
import { safeReadStorage, safeWriteStorage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { menuItemListSchema } from "@/schemas/menu.schema";
import type { MenuItem, MenuItemFormValues, RepositoryResult } from "@/types";

export const menuRepository = {
  getAll(): RepositoryResult<MenuItem[]> {
    const result = safeReadStorage(STORAGE_KEYS.MENU_ITEMS, menuItemListSchema);
    if (!result.success || result.data === null) {
      safeWriteStorage(STORAGE_KEYS.MENU_ITEMS, SEED_ITEMS);
      return { success: true, data: SEED_ITEMS };
    }
    return { success: true, data: result.data };
  },

  saveAll(items: MenuItem[]): RepositoryResult<MenuItem[]> {
    return safeWriteStorage(STORAGE_KEYS.MENU_ITEMS, items);
  },

  create(values: MenuItemFormValues): RepositoryResult<MenuItem> {
    const existingRes = this.getAll();
    const existing = existingRes.success ? existingRes.data : [];

    const baseSlug = slugify(values.name.en) || "dish";
    const duplicate = existing.some((item) => item.slug === baseSlug);
    const finalSlug = duplicate ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    const now = new Date().toISOString();
    const created: MenuItem = {
      id: `item-${uuidv4().slice(0, 8)}`,
      slug: finalSlug,
      categoryId: values.categoryId,
      name: values.name,
      description: values.description,
      price: values.price,
      originalPrice: values.originalPrice,
      image: values.image,
      ingredients: values.ingredients,
      allergens: values.allergens,
      preparationTime: values.preparationTime,
      spiceLevel: values.spiceLevel,
      dietaryLabels: values.dietaryLabels,
      calories: values.calories,
      portionSize: values.portionSize,
      isAvailable: values.isAvailable,
      isFeatured: values.isFeatured,
      isPopular: values.isPopular,
      createdAt: now,
      updatedAt: now,
    };

    const next = [created, ...existing];
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: created };
  },

  update(id: string, values: MenuItemFormValues): RepositoryResult<MenuItem> {
    const existingRes = this.getAll();
    const existing = existingRes.success ? existingRes.data : [];
    const target = existing.find((item) => item.id === id);
    if (!target) {
      return { success: false, error: "Menu item not found" };
    }

    const updated: MenuItem = {
      ...target,
      categoryId: values.categoryId,
      name: values.name,
      description: values.description,
      price: values.price,
      originalPrice: values.originalPrice,
      image: values.image,
      ingredients: values.ingredients,
      allergens: values.allergens,
      preparationTime: values.preparationTime,
      spiceLevel: values.spiceLevel,
      dietaryLabels: values.dietaryLabels,
      calories: values.calories,
      portionSize: values.portionSize,
      isAvailable: values.isAvailable,
      isFeatured: values.isFeatured,
      isPopular: values.isPopular,
      updatedAt: new Date().toISOString(),
    };

    const next = existing.map((item) => (item.id === id ? updated : item));
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: updated };
  },

  delete(id: string): RepositoryResult<string> {
    const existingRes = this.getAll();
    const existing = existingRes.success ? existingRes.data : [];
    const next = existing.filter((item) => item.id !== id);
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: id };
  },

  toggleField(
    id: string,
    field: "isAvailable" | "isFeatured" | "isPopular",
  ): RepositoryResult<MenuItem> {
    const existingRes = this.getAll();
    const existing = existingRes.success ? existingRes.data : [];
    const target = existing.find((item) => item.id === id);
    if (!target) {
      return { success: false, error: "Menu item not found" };
    }
    const updated: MenuItem = {
      ...target,
      [field]: !target[field],
      updatedAt: new Date().toISOString(),
    };
    const next = existing.map((item) => (item.id === id ? updated : item));
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: updated };
  },

  reassignCategory(fromCategoryId: string, toCategoryId: string): RepositoryResult<MenuItem[]> {
    const existingRes = this.getAll();
    const existing = existingRes.success ? existingRes.data : [];
    const now = new Date().toISOString();
    const next = existing.map((item) =>
      item.categoryId === fromCategoryId
        ? { ...item, categoryId: toCategoryId, updatedAt: now }
        : item,
    );
    return this.saveAll(next);
  },

  deleteByCategory(categoryId: string): RepositoryResult<MenuItem[]> {
    const existingRes = this.getAll();
    const existing = existingRes.success ? existingRes.data : [];
    const next = existing.filter((item) => item.categoryId !== categoryId);
    return this.saveAll(next);
  },

  reset(): RepositoryResult<MenuItem[]> {
    return safeWriteStorage(STORAGE_KEYS.MENU_ITEMS, SEED_ITEMS);
  },
};
