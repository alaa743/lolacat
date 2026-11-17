import type { DietaryLabel, SpiceLevel } from "./menu.types";

export type MenuSortOption = "default" | "price_asc" | "price_desc" | "popular";

export type MenuFilters = {
  search: string;
  categoryId?: string;

  dietaryLabels: DietaryLabel[];

  spiceLevel?: SpiceLevel;

  availableOnly: boolean;
  popularOnly: boolean;

  sortBy: MenuSortOption;
};
