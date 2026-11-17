import type { LocalizedText } from "./common.types";

export type MenuCategory = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MenuCategoryFormValues = {
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  displayOrder: number;
  isActive: boolean;
};
