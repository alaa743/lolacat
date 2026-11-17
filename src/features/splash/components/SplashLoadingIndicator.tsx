import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function SplashLoadingIndicator() {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-display text-base font-semibold text-brand-burgundy sm:text-lg">
        {t("brand.splashMessage")}
      </p>
      <div className="flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((idx) => (
          <motion.span
            key={idx}
            className="h-2.5 w-2.5 rounded-full bg-brand-burgundy"
            animate={{
              scale: [0.85, 1.25, 0.85],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: idx * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
