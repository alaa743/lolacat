import { normalizeSearchText } from "@/lib/utils";
import type { MenuCategory, MenuFilters, MenuItem, MenuSortOption } from "@/types";

export const DEFAULT_MENU_FILTERS: MenuFilters = {
  search: "",
  categoryId: undefined,
  dietaryLabels: [],
  spiceLevel: undefined,
  availableOnly: false,
  popularOnly: false,
  sortBy: "default",
};

export function matchesMenuSearch(
  item: MenuItem,
  query: string,
  categoryMap: Map<string, MenuCategory>,
): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const category = categoryMap.get(item.categoryId);
  const searchableFields = [
    item.name.en,
    item.name.ar,
    item.description.en,
    item.description.ar,
    category?.name.en ?? "",
    category?.name.ar ?? "",
    ...item.ingredients.flatMap((ing) => [ing.en, ing.ar]),
  ];

  return searchableFields.some((field) => normalizeSearchText(field).includes(normalizedQuery));
}

export function sortMenuItems(items: MenuItem[], sortBy: MenuSortOption): MenuItem[] {
  const copy = [...items];
  switch (sortBy) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price_desc":
      return copy.sort((a, b) => b.price - a.price);
    case "popular":
      return copy.sort((a, b) => {
        if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return a.price - b.price;
      });
    case "default":
    default:
      return copy.sort((a, b) => {
        if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1;
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
        return 0;
      });
  }
}

export function filterAndSortMenuItems(
  items: MenuItem[],
  categories: MenuCategory[],
  filters: MenuFilters,
  onlyActiveCategories = true,
): MenuItem[] {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  const filtered = items.filter((item) => {
    const category = categoryMap.get(item.categoryId);
    if (onlyActiveCategories && (!category || !category.isActive)) {
      return false;
    }
    if (filters.categoryId && item.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.availableOnly && !item.isAvailable) {
      return false;
    }
    if (filters.popularOnly && !item.isPopular) {
      return false;
    }
    if (filters.spiceLevel && item.spiceLevel !== filters.spiceLevel) {
      return false;
    }
    if (
      filters.dietaryLabels.length > 0 &&
      !filters.dietaryLabels.every((label) => item.dietaryLabels.includes(label))
    ) {
      return false;
    }
    if (filters.search.trim() && !matchesMenuSearch(item, filters.search, categoryMap)) {
      return false;
    }
    return true;
  });

  return sortMenuItems(filtered, filters.sortBy);
}

export function countActiveItemsByCategory(
  items: MenuItem[],
  categoryId: string,
  onlyAvailable = false,
): number {
  return items.filter(
    (item) => item.categoryId === categoryId && (!onlyAvailable || item.isAvailable),
  ).length;
}
