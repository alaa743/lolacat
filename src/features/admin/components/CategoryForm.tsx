import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormField } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { menuCategoryFormSchema } from "@/schemas/menu.schema";
import type { MenuCategory, MenuCategoryFormValues } from "@/types";
import { ImageUploader } from "./ImageUploader";

export function CategoryForm({
  initialCategory,
  nextOrder,
  onSubmit,
  onCancel,
}: {
  initialCategory?: MenuCategory;
  nextOrder: number;
  onSubmit: (values: MenuCategoryFormValues) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation(["admin", "common"]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuCategoryFormValues>({
    resolver: zodResolver(menuCategoryFormSchema),
    defaultValues: {
      name: initialCategory?.name ?? { en: "", ar: "" },
      description: initialCategory?.description ?? { en: "", ar: "" },
      image: initialCategory?.image ?? "/images/categories/sushi-rolls.jpg",
      displayOrder: initialCategory?.displayOrder ?? nextOrder,
      isActive: initialCategory?.isActive ?? true,
    },
  });

  const imageValue = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("admin:categoryForm.nameEn")} required error={errors.name?.en?.message}>
          <Input {...register("name.en")} placeholder="e.g. Signature Bento" />
        </FormField>

        <FormField label={t("admin:categoryForm.nameAr")} required error={errors.name?.ar?.message}>
          <Input dir="rtl" {...register("name.ar")} placeholder="مثال: أطباق بنتو" />
        </FormField>

        <FormField
          label={t("admin:categoryForm.descEn")}
          required
          error={errors.description?.en?.message}
        >
          <Textarea {...register("description.en")} rows={3} />
        </FormField>

        <FormField
          label={t("admin:categoryForm.descAr")}
          required
          error={errors.description?.ar?.message}
        >
          <Textarea dir="rtl" {...register("description.ar")} rows={3} />
        </FormField>
      </div>

      <FormField label={t("admin:categoryForm.image")} required error={errors.image?.message}>
        <ImageUploader
          value={imageValue}
          onChange={(next) => setValue("image", next, { shouldValidate: true })}
          error={errors.image?.message}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={t("admin:categoryForm.displayOrder")}
          required
          error={errors.displayOrder?.message}
        >
          <Input type="number" min="0" {...register("displayOrder")} />
        </FormField>

        <div className="flex items-end pb-2">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
            <input
              type="checkbox"
              {...register("isActive")}
              className="h-4 w-4 accent-brand-burgundy"
            />
            <span>{t("admin:categoryForm.isActive")}</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-brand-pink-soft pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t("common:common.cancel")}
        </Button>
        <Button type="submit" data-testid="save-category-btn">
          {initialCategory ? t("common:common.update") : t("common:common.create")}
        </Button>
      </div>
    </form>
  );
}
