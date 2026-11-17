import { z } from "zod";
import { STORAGE_KEYS } from "@/config/app.config";
import { SEED_CATEGORIES } from "@/data/seed";
import { safeReadStorage, safeWriteStorage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { menuCategoryListSchema } from "@/schemas/menu.schema";
import type { MenuCategory, MenuCategoryFormValues, RepositoryResult } from "@/types";

export const categoryRepository = {
  getAll(): RepositoryResult<MenuCategory[]> {
    const result = safeReadStorage(STORAGE_KEYS.CATEGORIES, menuCategoryListSchema);
    if (!result.success) {
      safeWriteStorage(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
      return { success: true, data: SEED_CATEGORIES };
    }
    if (result.data === null) {
      safeWriteStorage(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
      return { success: true, data: SEED_CATEGORIES };
    }
    return {
      success: true,
      data: [...result.data].sort((a, b) => a.displayOrder - b.displayOrder),
    };
  },

  saveAll(categories: MenuCategory[]): RepositoryResult<MenuCategory[]> {
    return safeWriteStorage(STORAGE_KEYS.CATEGORIES, categories);
  },

  create(values: MenuCategoryFormValues): RepositoryResult<MenuCategory> {
    const existingResult = this.getAll();
    const existing = existingResult.success ? existingResult.data : [];

    const baseSlug = slugify(values.name.en) || `category-${Date.now()}`;
    const duplicate = existing.some((cat) => cat.slug === baseSlug);
    const finalSlug = duplicate ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    const now = new Date().toISOString();
    const created: MenuCategory = {
      id: `cat-${finalSlug}`,
      slug: finalSlug,
      name: values.name,
      description: values.description,
      image: values.image,
      displayOrder: values.displayOrder,
      isActive: values.isActive,
      createdAt: now,
      updatedAt: now,
    };

    const next = [...existing, created].sort((a, b) => a.displayOrder - b.displayOrder);
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: created };
  },

  update(id: string, values: MenuCategoryFormValues): RepositoryResult<MenuCategory> {
    const existingResult = this.getAll();
    const existing = existingResult.success ? existingResult.data : [];
    const target = existing.find((c) => c.id === id);
    if (!target) {
      return { success: false, error: "Category not found" };
    }

    const candidateSlug = slugify(values.name.en) || target.slug;
    const slugTaken = existing.some((c) => c.id !== id && c.slug === candidateSlug);
    const updated: MenuCategory = {
      ...target,
      slug: slugTaken ? target.slug : candidateSlug,
      name: values.name,
      description: values.description,
      image: values.image,
      displayOrder: values.displayOrder,
      isActive: values.isActive,
      updatedAt: new Date().toISOString(),
    };

    const next = existing
      .map((c) => (c.id === id ? updated : c))
      .sort((a, b) => a.displayOrder - b.displayOrder);
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: updated };
  },

  delete(id: string): RepositoryResult<string> {
    const existingResult = this.getAll();
    const existing = existingResult.success ? existingResult.data : [];
    const next = existing.filter((c) => c.id !== id);
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: id };
  },

  toggleActive(id: string): RepositoryResult<MenuCategory> {
    const existingResult = this.getAll();
    const existing = existingResult.success ? existingResult.data : [];
    const target = existing.find((c) => c.id === id);
    if (!target) {
      return { success: false, error: "Category not found" };
    }
    const updated: MenuCategory = {
      ...target,
      isActive: !target.isActive,
      updatedAt: new Date().toISOString(),
    };
    const next = existing.map((c) => (c.id === id ? updated : c));
    const saveRes = this.saveAll(next);
    if (!saveRes.success) return saveRes;
    return { success: true, data: updated };
  },

  reset(): RepositoryResult<MenuCategory[]> {
    return safeWriteStorage(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
  },
};

export const categorySlugCheckSchema = z.string().min(1);
