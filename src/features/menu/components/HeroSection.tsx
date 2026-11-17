import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { SafeFoodImage } from "@/components/common/SafeFoodImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand.config";
import { getLocalizedText } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";

export function HeroSection({
  onExploreClick,
  onFeaturedClick,
}: {
  onExploreClick: () => void;
  onFeaturedClick: () => void;
}) {
  const { t, i18n } = useTranslation("menu");
  const { settings } = useAppData();
  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const headline = getLocalizedText(settings.tagline, lang) || t("hero.headline");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-pink via-brand-pink-soft to-brand-cream pb-10 pt-8 sm:pb-14 sm:pt-12">
      {/* Subtle decorative cat-ear / Japanese pattern backdrop */}
      <div
        aria-hidden="true"
        className="bg-brand-burgundy/5 pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-5 text-start lg:col-span-6"
        >
          <div className="inline-flex flex-wrap items-center gap-2">
            <Badge variant="burgundy" className="px-3 py-1 text-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{BRAND.NAME}</span>
            </Badge>
            <Badge variant="cream" className="px-3 py-1 text-xs">
              {t("hero.badge")}
            </Badge>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-brand-ink sm:text-5xl">
            {headline}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button size="lg" onClick={onExploreClick} className="gap-2">
              <span>{t("hero.cta")}</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={onFeaturedClick}>
              {t("hero.secondaryCta")}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="relative lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-card">
            <SafeFoodImage
              src="/images/hero-feast.jpg"
              alt="Lolacat>< Japanese sushi rolls, ramen, and matcha spread"
              className="aspect-[16/10] w-full"
              priority
            />
            {/* Floating kawaii cat badge */}
            <div
              dir="ltr"
              className="absolute bottom-3 end-3 rounded-2xl border border-brand-pink-border bg-white/95 px-3.5 py-2 shadow-md backdrop-blur-sm"
            >
              <span className="font-display text-sm font-bold text-brand-burgundy">
                Lolacat&gt;&lt; Tokyo Craft
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
