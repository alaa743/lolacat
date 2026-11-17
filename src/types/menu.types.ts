import type { LocalizedText } from "./common.types";

export type SpiceLevel = "none" | "mild" | "medium" | "hot";

export type DietaryLabel = "vegetarian" | "vegan" | "gluten_free";

export type MenuItem = {
  id: string;
  slug: string;
  categoryId: string;

  name: LocalizedText;
  description: LocalizedText;

  price: number;
  originalPrice?: number;

  image: string;

  ingredients: LocalizedText[];
  allergens?: LocalizedText[];

  preparationTime?: number;
  spiceLevel?: SpiceLevel;
  dietaryLabels: DietaryLabel[];

  calories?: number;
  portionSize?: LocalizedText;

  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;

  createdAt: string;
  updatedAt: string;
};

export type MenuItemFormValues = {
  categoryId: string;

  name: LocalizedText;
  description: LocalizedText;

  price: number;
  originalPrice?: number;

  image: string;

  ingredients: LocalizedText[];
  allergens?: LocalizedText[];

  preparationTime?: number;
  spiceLevel: SpiceLevel;
  dietaryLabels: DietaryLabel[];

  calories?: number;
  portionSize?: LocalizedText;

  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
};
