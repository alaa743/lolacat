import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BRAND } from "@/config/brand.config";
import { NoodleBowlIllustration } from "./NoodleBowlIllustration";
import { SplashLoadingIndicator } from "./SplashLoadingIndicator";
import { SteamAnimation } from "./SteamAnimation";

type NoodleSplashScreenProps = {
  visible: boolean;
  onFinish: () => void;
};

export function NoodleSplashScreen({ visible, onFinish }: NoodleSplashScreenProps) {
  const { t } = useTranslation("common");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const duration = shouldReduceMotion ? 450 : BRAND.SPLASH.MIN_DURATION_MS + 350;
    const timer = window.setTimeout(() => {
      onFinish();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [visible, shouldReduceMotion, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Lolacat>< Splash Screen"
          data-testid="noodle-splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0.15 : 0.45 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#fce3eb] px-6 text-center"
        >
          {/* Floating subtle decorative elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mx-auto max-w-2xl"
          >
            <Sparkles className="text-brand-burgundy/30 absolute start-8 top-16 h-6 w-6 animate-float-slow" />
            <Sparkles className="text-brand-burgundy/25 absolute end-10 top-24 h-5 w-5 animate-float-slow" />
            <span className="text-brand-burgundy/25 absolute bottom-24 start-12 animate-float-slow text-xl">
              &gt;&lt;
            </span>
            <span className="text-brand-burgundy/25 absolute bottom-20 end-14 animate-float-slow text-lg font-bold">
              ✿
            </span>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.55, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <SteamAnimation />
            <NoodleBowlIllustration className="-mt-3" />

            <div className="mt-2">
              <SplashLoadingIndicator />
            </div>

            <button
              type="button"
              onClick={onFinish}
              className="border-brand-burgundy/25 mt-6 rounded-full border bg-white/70 px-4 py-1.5 text-xs font-semibold text-brand-burgundy transition-colors hover:bg-white"
            >
              {t("brand.skipSplash")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
