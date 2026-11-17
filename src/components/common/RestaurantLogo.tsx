import { BRAND } from "@/config/brand.config";
import { cn } from "@/lib/utils";

type RestaurantLogoProps = {
  variant?: "full" | "compact" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Brand mark & wordmark for Lolacat>< featuring subtle cat ears,
 * rounded typography, and signature >< whiskers.
 */
export function RestaurantLogo({ variant = "full", size = "md", className }: RestaurantLogoProps) {
  const isLight = variant === "light";
  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };
  const textSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <span dir="ltr" className={cn("inline-flex select-none items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className={cn(iconSizes[size], "shrink-0")}
        fill="none"
      >
        {/* Cat-ear circular badge */}
        <path
          d="M14 25L12 10L25 18C27.2 17.3 29.6 17 32 17C34.4 17 36.8 17.3 39 18L52 10L50 25C53.2 28.8 55 33.7 55 39C55 50.6 44.7 57 32 57C19.3 57 9 50.6 9 39C9 33.7 10.8 28.8 14 25Z"
          fill={isLight ? "#fce3eb" : "#6e142d"}
        />
        {/* Inner ear blush */}
        <path d="M16.5 22L15.5 14.5L22.5 19Z" fill={isLight ? "#6e142d" : "#fce3eb"} />
        <path d="M47.5 22L48.5 14.5L41.5 19Z" fill={isLight ? "#6e142d" : "#fce3eb"} />
        {/* Happy >< eyes */}
        <path
          d="M19 34L25 37.5L19 41"
          stroke={isLight ? "#6e142d" : "#fce3eb"}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45 34L39 37.5L45 41"
          stroke={isLight ? "#6e142d" : "#fce3eb"}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cute cat nose & mouth */}
        <path
          d="M30 41.5C31 40.5 33 40.5 34 41.5L32 43.8L30 41.5Z"
          fill={isLight ? "#6e142d" : "#fce3eb"}
        />
        <path
          d="M27.5 45.5C29 47.5 31 47.5 32 45.5C33 47.5 35 47.5 36.5 45.5"
          stroke={isLight ? "#6e142d" : "#fce3eb"}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      {variant !== "compact" && (
        <span
          className={cn(
            "font-display font-bold tracking-tight",
            textSizes[size],
            isLight ? "text-white" : "text-brand-burgundy",
          )}
        >
          {BRAND.NAME}
        </span>
      )}
    </span>
  );
}
