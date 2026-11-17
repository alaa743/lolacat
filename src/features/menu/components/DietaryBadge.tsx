import { Leaf, Sprout, WheatOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import type { DietaryLabel } from "@/types";

export function DietaryBadge({ label }: { label: DietaryLabel }) {
  const { t } = useTranslation("menu");

  const config: Record<DietaryLabel, { icon: typeof Leaf; variant: "success" | "cream" }> = {
    vegetarian: { icon: Leaf, variant: "success" },
    vegan: { icon: Sprout, variant: "success" },
    gluten_free: { icon: WheatOff, variant: "cream" },
  };

  const { icon: Icon, variant } = config[label];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span>{t(`dietary.${label}`)}</span>
    </Badge>
  );
}
