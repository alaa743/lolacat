import { z } from "zod";

export const localizedTextSchema = z.object({
  en: z.string().trim().min(1, "English text is required"),
  ar: z.string().trim().min(1, "Arabic text is required"),
});

export const optionalLocalizedTextSchema = z
  .object({
    en: z.string().trim(),
    ar: z.string().trim(),
  })
  .optional();

export const spiceLevelSchema = z.enum(["none", "mild", "medium", "hot"]);
export const dietaryLabelSchema = z.enum(["vegetarian", "vegan", "gluten_free"]);
export const supportedLanguageSchema = z.enum(["en", "ar"]);
export const weekDaySchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const menuCategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: localizedTextSchema,
  description: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  image: z.string(),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const menuCategoryListSchema = z.array(menuCategorySchema);

export const menuCategoryFormSchema = z.object({
  name: localizedTextSchema,
  description: z.object({
    en: z.string().trim().min(1, "English description is required"),
    ar: z.string().trim().min(1, "Arabic description is required"),
  }),
  image: z.string().trim().min(1, "Category image is required"),
  displayOrder: z.coerce.number().int().min(0, "Display order must be 0 or greater"),
  isActive: z.boolean(),
});

export const menuItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  name: localizedTextSchema,
  description: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string(),
  ingredients: z.array(
    z.object({
      en: z.string(),
      ar: z.string(),
    }),
  ),
  allergens: z
    .array(
      z.object({
        en: z.string(),
        ar: z.string(),
      }),
    )
    .optional(),
  preparationTime: z.number().int().positive().optional(),
  spiceLevel: spiceLevelSchema.optional(),
  dietaryLabels: z.array(dietaryLabelSchema),
  calories: z.number().int().positive().optional(),
  portionSize: z
    .object({
      en: z.string(),
      ar: z.string(),
    })
    .optional(),
  isAvailable: z.boolean(),
  isFeatured: z.boolean(),
  isPopular: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const menuItemListSchema = z.array(menuItemSchema);

export const menuItemFormSchema = z
  .object({
    categoryId: z.string().min(1, "Category is required"),
    name: localizedTextSchema,
    description: z.object({
      en: z.string().trim().min(1, "English description is required"),
      ar: z.string().trim().min(1, "Arabic description is required"),
    }),
    price: z.coerce.number().positive("Price must be greater than zero"),
    originalPrice: z.preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
      z.number().positive("Original price must be positive").optional(),
    ),
    image: z.string().trim().min(1, "Food image is required"),
    ingredients: z
      .array(
        z.object({
          en: z.string().trim().min(1),
          ar: z.string().trim().min(1),
        }),
      )
      .min(1, "At least one ingredient is required"),
    allergens: z
      .array(
        z.object({
          en: z.string().trim().min(1),
          ar: z.string().trim().min(1),
        }),
      )
      .optional(),
    preparationTime: z.preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
      z.number().int().positive("Preparation time must be positive").optional(),
    ),
    spiceLevel: spiceLevelSchema,
    dietaryLabels: z.array(dietaryLabelSchema),
    calories: z.preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
      z.number().int().positive("Calories must be positive").optional(),
    ),
    portionSize: z
      .object({
        en: z.string().trim(),
        ar: z.string().trim(),
      })
      .optional(),
    isAvailable: z.boolean(),
    isFeatured: z.boolean(),
    isPopular: z.boolean(),
  })
  .refine((data) => data.originalPrice === undefined || data.originalPrice >= data.price, {
    message: "Original price must be greater than or equal to the current price",
    path: ["originalPrice"],
  });

export const openingHoursSchema = z.object({
  day: weekDaySchema,
  openTime: z.string(),
  closeTime: z.string(),
  isClosed: z.boolean(),
});

export const socialLinksSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().optional(),
});

export const restaurantSettingsSchema = z.object({
  name: z.string().trim().min(1, "Restaurant name is required"),
  tagline: localizedTextSchema,
  description: localizedTextSchema,
  logo: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().trim().min(5, "Phone number is required"),
  address: localizedTextSchema,
  openingHours: z.array(openingHoursSchema).length(7),
  socialLinks: socialLinksSchema,
  currency: z.string().trim().min(1, "Currency is required"),
  defaultLanguage: supportedLanguageSchema,
  updatedAt: z.string(),
});
