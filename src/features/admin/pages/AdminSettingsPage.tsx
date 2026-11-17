import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { FormField, PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { DropdownSelect } from "@/components/ui/DropdownSelect";
import { Input, Textarea } from "@/components/ui/Input";
import { restaurantSettingsSchema } from "@/schemas/menu.schema";
import type { RestaurantSettings, SupportedLanguage } from "@/types";

export default function AdminSettingsPage() {
  const { t } = useTranslation(["admin", "common"]);
  const { settings, updateSettings, showToast } = useAppData();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RestaurantSettings>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: settings,
  });

  const watchedHours = watch("openingHours");

  const onSubmit = (values: RestaurantSettings) => {
    const res = updateSettings(values);
    if (res.success) {
      showToast(t("admin:settings.savedToast"));
    } else {
      showToast(res.error, "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("admin:settings.title")} subtitle={t("admin:settings.subtitle")} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile */}
        <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
            {t("admin:settings.profile")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label={t("admin:settings.restaurantName")}
              required
              error={errors.name?.message}
              className="sm:col-span-2"
            >
              <Input {...register("name")} />
            </FormField>

            <FormField
              label={t("admin:settings.taglineEn")}
              required
              error={errors.tagline?.en?.message}
            >
              <Input {...register("tagline.en")} />
            </FormField>

            <FormField
              label={t("admin:settings.taglineAr")}
              required
              error={errors.tagline?.ar?.message}
            >
              <Input dir="rtl" {...register("tagline.ar")} />
            </FormField>

            <FormField
              label={t("admin:settings.descEn")}
              required
              error={errors.description?.en?.message}
            >
              <Textarea {...register("description.en")} rows={3} />
            </FormField>

            <FormField
              label={t("admin:settings.descAr")}
              required
              error={errors.description?.ar?.message}
            >
              <Textarea dir="rtl" {...register("description.ar")} rows={3} />
            </FormField>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
            {t("admin:settings.contact")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label={t("admin:settings.email")} required error={errors.email?.message}>
              <Input type="email" {...register("email")} />
            </FormField>
            <FormField label={t("admin:settings.phone")} required error={errors.phone?.message}>
              <Input dir="ltr" {...register("phone")} />
            </FormField>
            <FormField
              label={t("admin:settings.addressEn")}
              required
              error={errors.address?.en?.message}
            >
              <Input {...register("address.en")} />
            </FormField>
            <FormField
              label={t("admin:settings.addressAr")}
              required
              error={errors.address?.ar?.message}
            >
              <Input dir="rtl" {...register("address.ar")} />
            </FormField>
          </div>
        </section>

        {/* Opening Hours */}
        <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
            {t("admin:settings.openingHours")}
          </h2>
          <div className="space-y-3">
            {settings.openingHours.map((slot, idx) => {
              const isClosed = watchedHours?.[idx]?.isClosed ?? slot.isClosed;
              return (
                <div
                  key={slot.day}
                  className="bg-brand-pink-soft/30 grid items-center gap-3 rounded-xl border border-brand-pink-soft p-3 sm:grid-cols-4"
                >
                  <span className="font-semibold text-brand-ink">
                    {t(`common:days.${slot.day}`)}
                  </span>
                  <Input
                    type="time"
                    disabled={isClosed}
                    {...register(`openingHours.${idx}.openTime`)}
                    aria-label={`${slot.day} open`}
                  />
                  <Input
                    type="time"
                    disabled={isClosed}
                    {...register(`openingHours.${idx}.closeTime`)}
                    aria-label={`${slot.day} close`}
                  />
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      {...register(`openingHours.${idx}.isClosed`)}
                      className="h-4 w-4 accent-brand-burgundy"
                    />
                    <span>{t("admin:settings.closed")}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </section>

        {/* Social Media & Menu Preferences */}
        <section className="rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
            {t("admin:settings.socialMedia")} &amp; {t("admin:settings.menuPreferences")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Instagram">
              <Input {...register("socialLinks.instagram")} />
            </FormField>
            <FormField label="Facebook">
              <Input {...register("socialLinks.facebook")} />
            </FormField>
            <FormField label="TikTok">
              <Input {...register("socialLinks.tiktok")} />
            </FormField>
            <FormField label="Website">
              <Input {...register("socialLinks.website")} />
            </FormField>
            <FormField
              label={t("admin:settings.currency")}
              required
              error={errors.currency?.message}
            >
              <Input {...register("currency")} />
            </FormField>
            <FormField label={t("admin:settings.defaultLanguage")}>
              <DropdownSelect
                ariaLabel={t("admin:settings.defaultLanguage")}
                value={watch("defaultLanguage")}
                onValueChange={(next) =>
                  setValue("defaultLanguage", next as SupportedLanguage, {
                    shouldValidate: true,
                  })
                }
                options={[
                  { value: "en", label: t("common:language.english") },
                  { value: "ar", label: t("common:language.arabic") },
                ]}
                className="w-full"
                triggerClassName="h-11 rounded-xl"
              />
            </FormField>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" size="lg" data-testid="save-settings-btn">
            {t("common:common.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
