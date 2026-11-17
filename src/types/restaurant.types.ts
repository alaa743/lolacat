import type { LocalizedText, SupportedLanguage } from "./common.types";
import type { MenuCategory } from "./category.types";
import type { MenuItem } from "./menu.types";

export type WeekDay =
  "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type OpeningHours = {
  day: WeekDay;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
};

export type RestaurantSettings = {
  name: string;

  tagline: LocalizedText;
  description: LocalizedText;

  logo?: string;

  email: string;
  phone: string;

  address: LocalizedText;

  openingHours: OpeningHours[];

  socialLinks: SocialLinks;

  currency: string;
  defaultLanguage: SupportedLanguage;

  updatedAt: string;
};

export type AppData = {
  categories: MenuCategory[];
  items: MenuItem[];
  settings: RestaurantSettings;
};
