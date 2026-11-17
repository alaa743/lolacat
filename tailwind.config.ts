import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "var(--color-brand-burgundy)",
          "burgundy-hover": "var(--color-brand-burgundy-hover)",
          "burgundy-soft": "var(--color-brand-burgundy-soft)",
          pink: "var(--color-brand-pink)",
          "pink-soft": "var(--color-brand-pink-soft)",
          "pink-border": "var(--color-brand-pink-border)",
          cream: "var(--color-brand-cream)",
          ink: "var(--color-text-primary)",
          muted: "var(--color-text-secondary)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          card: "var(--color-surface-card)",
          pink: "var(--color-surface-pink)",
        },
      },
      fontFamily: {
        display: ["'Fredoka'", "'Plus Jakarta Sans'", "'Cairo'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Cairo'", "system-ui", "sans-serif"],
        arabic: ["'Cairo'", "'Tajawal'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 8px 28px -6px rgba(110, 20, 45, 0.08)",
        "card-hover": "0 14px 36px -8px rgba(110, 20, 45, 0.16)",
      },
      keyframes: {
        steamRise: {
          "0%": {
            transform: "translateY(8px) scaleX(0.95)",
            opacity: "0",
          },
          "30%": {
            opacity: "0.75",
          },
          "100%": {
            transform: "translateY(-28px) scaleX(1.08)",
            opacity: "0",
          },
        },
        floatSlow: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-8px) rotate(4deg)",
          },
        },
      },
      animation: {
        "steam-1": "steamRise 2.6s ease-out infinite",
        "steam-2": "steamRise 2.6s ease-out 0.8s infinite",
        "steam-3": "steamRise 2.6s ease-out 1.5s infinite",
        "float-slow": "floatSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
