import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { FormField } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { getLocalizedText } from "@/lib/utils";
import type {
  DietaryLabel,
  MenuCategory,
  MenuItem,
  MenuItemFormValues,
  SpiceLevel,
  SupportedLanguage,
} from "@/types";
import { ImageUploader } from "./ImageUploader";

const itemEditorSchema = z
  .object({
    categoryId: z.string().min(1, "Category is required"),
    nameEn: z.string().trim().min(1, "English name is required"),
    nameAr: z.string().trim().min(1, "Arabic name is required"),
    descEn: z.string().trim().min(1, "English description is required"),
    descAr: z.string().trim().min(1, "Arabic description is required"),
    price: z.coerce.number().positive("Price must be greater than zero"),
    originalPrice: z.string().optional(),
    image: z.string().trim().min(1, "Food image is required"),
    ingredientsEn: z.string().trim().min(1, "Enter at least one ingredient in English"),
    ingredientsAr: z.string().trim().min(1, "Enter at least one ingredient in Arabic"),
    allergensEn: z.string().optional(),
    allergensAr: z.string().optional(),
    preparationTime: z.string().optional(),
    spiceLevel: z.enum(["none", "mild", "medium", "hot"]),
    calories: z.string().optional(),
    portionEn: z.string().optional(),
    portionAr: z.string().optional(),
    isAvailable: z.boolean(),
    isFeatured: z.boolean(),
    isPopular: z.boolean(),
  })
  .superRefine((vals, ctx) => {
    if (vals.originalPrice && vals.originalPrice.trim() !== "") {
      const num = Number(vals.originalPrice);
      if (Number.isNaN(num) || num < vals.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["originalPrice"],
          message: "Original price must be greater than or equal to current price",
        });
      }
    }
    if (vals.preparationTime && vals.preparationTime.trim() !== "") {
      const num = Number(vals.preparationTime);
      if (Number.isNaN(num) || num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["preparationTime"],
          message: "Preparation time must be a positive number",
        });
      }
    }
    if (vals.calories && vals.calories.trim() !== "") {
      const num = Number(vals.calories);
      if (Number.isNaN(num) || num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["calories"],
          message: "Calories must be a positive number",
        });
      }
    }
  });

type ItemEditorFields = z.infer<typeof itemEditorSchema>;

function splitCommaPair(enText: string, arText: string) {
  const enArr = enText
    .split(/[,،]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const arArr = arText
    .split(/[,،]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const maxLen = Math.max(enArr.length, arArr.length);
  return Array.from({ length: maxLen }, (_, idx) => ({
    en: enArr[idx] ?? arArr[idx] ?? "",
    ar: arArr[idx] ?? enArr[idx] ?? "",
  })).filter((pair) => pair.en || pair.ar);
}

export function MenuItemForm({
  initialItem,
  categories,
  onSubmit,
  onCancel,
}: {
  initialItem?: MenuItem;
  categories: MenuCategory[];
  onSubmit: (values: MenuItemFormValues) => void;
  onCancel: () => void;
}) {
  const { t, i18n } = useTranslation(["admin", "menu", "common"]);
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [dietaryLabels, setDietaryLabels] = useState<DietaryLabel[]>(
    initialItem?.dietaryLabels ?? [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ItemEditorFields>({
    resolver: zodResolver(itemEditorSchema),
    defaultValues: {
      categoryId: initialItem?.categoryId ?? categories[0]?.id ?? "",
      nameEn: initialItem?.name.en ?? "",
      nameAr: initialItem?.name.ar ?? "",
      descEn: initialItem?.description.en ?? "",
      descAr: initialItem?.description.ar ?? "",
      price: initialItem?.price ?? 150,
      originalPrice: initialItem?.originalPrice ? String(initialItem.originalPrice) : "",
      image: initialItem?.image ?? "/images/dishes/salmon-nigiri.jpg",
      ingredientsEn: initialItem?.ingredients.map((i) => i.en).join(", ") ?? "",
      ingredientsAr: initialItem?.ingredients.map((i) => i.ar).join("، ") ?? "",
      allergensEn: initialItem?.allergens?.map((a) => a.en).join(", ") ?? "",
      allergensAr: initialItem?.allergens?.map((a) => a.ar).join("، ") ?? "",
      preparationTime: initialItem?.preparationTime ? String(initialItem.preparationTime) : "12",
      spiceLevel: initialItem?.spiceLevel ?? "none",
      calories: initialItem?.calories ? String(initialItem.calories) : "",
      portionEn: initialItem?.portionSize?.en ?? "",
      portionAr: initialItem?.portionSize?.ar ?? "",
      isAvailable: initialItem?.isAvailable ?? true,
      isFeatured: initialItem?.isFeatured ?? false,
      isPopular: initialItem?.isPopular ?? false,
    },
  });

  const imageValue = watch("image");

  const toggleDietary = (label: DietaryLabel) => {
    setDietaryLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const handleValidSubmit = (data: ItemEditorFields) => {
    const allergens =
      data.allergensEn?.trim() || data.allergensAr?.trim()
        ? splitCommaPair(data.allergensEn ?? "", data.allergensAr ?? "")
        : undefined;

    const portionSize =
      data.portionEn?.trim() || data.portionAr?.trim()
        ? {
            en: data.portionEn?.trim() || data.portionAr?.trim() || "",
            ar: data.portionAr?.trim() || data.portionEn?.trim() || "",
          }
        : undefined;

    const payload: MenuItemFormValues = {
      categoryId: data.categoryId,
      name: { en: data.nameEn.trim(), ar: data.nameAr.trim() },
      description: { en: data.descEn.trim(), ar: data.descAr.trim() },
      price: Number(data.price),
      originalPrice:
        data.originalPrice && data.originalPrice.trim() !== ""
          ? Number(data.originalPrice)
          : undefined,
      image: data.image.trim(),
      ingredients: splitCommaPair(data.ingredientsEn, data.ingredientsAr),
      allergens: allergens && allergens.length > 0 ? allergens : undefined,
      preparationTime:
        data.preparationTime && data.preparationTime.trim() !== ""
          ? Number(data.preparationTime)
          : undefined,
      spiceLevel: data.spiceLevel as SpiceLevel,
      dietaryLabels,
      calories: data.calories && data.calories.trim() !== "" ? Number(data.calories) : undefined,
      portionSize,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured,
      isPopular: data.isPopular,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("admin:itemForm.nameEn")} required error={errors.nameEn?.message}>
          <Input {...register("nameEn")} placeholder="e.g. Matcha Ramen Roll" />
        </FormField>

        <FormField label={t("admin:itemForm.nameAr")} required error={errors.nameAr?.message}>
          <Input dir="rtl" {...register("nameAr")} placeholder="مثال: رول ماتشا" />
        </FormField>

        <FormField label={t("admin:itemForm.descEn")} required error={errors.descEn?.message}>
          <Textarea {...register("descEn")} rows={3} />
        </FormField>

        <FormField label={t("admin:itemForm.descAr")} required error={errors.descAr?.message}>
          <Textarea dir="rtl" {...register("descAr")} rows={3} />
        </FormField>

        <FormField label={t("admin:itemForm.category")} required error={errors.categoryId?.message}>
          <Select {...register("categoryId")}>
            <option value="">{t("admin:itemForm.selectCategory")}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getLocalizedText(cat.name, lang)}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label={t("admin:itemForm.spiceLevel")}>
          <Select {...register("spiceLevel")}>
            <option value="none">{t("menu:spice.none")}</option>
            <option value="mild">{t("menu:spice.mild")}</option>
            <option value="medium">{t("menu:spice.medium")}</option>
            <option value="hot">{t("menu:spice.hot")}</option>
          </Select>
        </FormField>

        <FormField label={t("admin:itemForm.price")} required error={errors.price?.message}>
          <Input type="number" step="0.5" min="1" {...register("price")} />
        </FormField>

        <FormField label={t("admin:itemForm.originalPrice")} error={errors.originalPrice?.message}>
          <Input type="number" step="0.5" min="1" {...register("originalPrice")} />
        </FormField>
      </div>

      <FormField label={t("admin:itemForm.media")} required error={errors.image?.message}>
        <ImageUploader
          value={imageValue}
          onChange={(next) => setValue("image", next, { shouldValidate: true })}
          error={errors.image?.message}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={t("admin:itemForm.ingredientsEn")}
          hint={t("admin:itemForm.ingredientsLabel")}
          required
          error={errors.ingredientsEn?.message}
        >
          <Input {...register("ingredientsEn")} placeholder="Salmon, Sushi Rice, Avocado" />
        </FormField>

        <FormField
          label={t("admin:itemForm.ingredientsAr")}
          hint={t("admin:itemForm.ingredientsLabel")}
          required
          error={errors.ingredientsAr?.message}
        >
          <Input dir="rtl" {...register("ingredientsAr")} placeholder="سلمون، أرز سوشي، أفوكادو" />
        </FormField>

        <FormField label={t("admin:itemForm.allergensEn")}>
          <Input {...register("allergensEn")} placeholder="Fish, Soy" />
        </FormField>

        <FormField label={t("admin:itemForm.allergensAr")}>
          <Input dir="rtl" {...register("allergensAr")} placeholder="أسماك، صويا" />
        </FormField>

        <FormField label={t("admin:itemForm.prepTime")} error={errors.preparationTime?.message}>
          <Input type="number" min="1" {...register("preparationTime")} />
        </FormField>

        <FormField label={t("admin:itemForm.calories")} error={errors.calories?.message}>
          <Input type="number" min="1" {...register("calories")} />
        </FormField>

        <FormField label={t("admin:itemForm.portionEn")}>
          <Input {...register("portionEn")} placeholder="8 pieces" />
        </FormField>

        <FormField label={t("admin:itemForm.portionAr")}>
          <Input dir="rtl" {...register("portionAr")} placeholder="٨ قطع" />
        </FormField>
      </div>

      {/* Dietary labels */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-brand-ink">{t("admin:itemForm.dietaryLabels")}</p>
        <div className="flex flex-wrap gap-3">
          {(["vegetarian", "vegan", "gluten_free"] as DietaryLabel[]).map((label) => (
            <label
              key={label}
              className="bg-brand-pink-soft/50 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-brand-pink-border px-3 py-2 text-sm font-medium"
            >
              <input
                type="checkbox"
                checked={dietaryLabels.includes(label)}
                onChange={() => toggleDietary(label)}
                className="h-4 w-4 accent-brand-burgundy"
              />
              <span>{t(`menu:dietary.${label}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Display settings */}
      <div className="bg-brand-pink-soft/40 flex flex-wrap gap-4 rounded-2xl border border-brand-pink-border p-4">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            {...register("isAvailable")}
            className="h-4 w-4 accent-brand-burgundy"
          />
          <span>{t("admin:itemForm.isAvailable")}</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            {...register("isFeatured")}
            className="h-4 w-4 accent-brand-burgundy"
          />
          <span>{t("admin:itemForm.isFeatured")}</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            {...register("isPopular")}
            className="h-4 w-4 accent-brand-burgundy"
          />
          <span>{t("admin:itemForm.isPopular")}</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 border-t border-brand-pink-soft pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t("common:common.cancel")}
        </Button>
        <Button type="submit" data-testid="save-item-btn">
          {initialItem ? t("common:common.update") : t("common:common.create")}
        </Button>
      </div>
    </form>
  );
}
