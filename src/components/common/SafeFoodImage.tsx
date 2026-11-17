import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

type SafeFoodImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function SafeFoodImage({ src, alt, className, priority = false }: SafeFoodImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "text-brand-burgundy/60 flex flex-col items-center justify-center gap-2 bg-brand-pink-soft",
          className,
        )}
      >
        <UtensilsCrossed className="h-8 w-8" />
        <span className="px-3 text-center text-xs font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-brand-pink-soft", className)}>
      {!isLoaded && (
        <div aria-hidden="true" className="bg-brand-pink/50 absolute inset-0 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-500",
          isLoaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
        )}
      />
    </div>
  );
}
