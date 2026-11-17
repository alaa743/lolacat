import type React from "react";
import { cn } from "@/lib/utils";

export function AdminStatCard({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  tone?: "default" | "success" | "warning" | "burgundy";
}) {
  const iconToneClasses = {
    default: "bg-brand-pink text-brand-burgundy",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    burgundy: "bg-brand-burgundy text-white",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-brand-pink-border bg-white p-5 shadow-card">
      <div className="space-y-1 text-start">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</p>
        <p className="font-display text-3xl font-bold text-brand-ink">{value}</p>
      </div>
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl",
          iconToneClasses[tone],
        )}
      >
        {icon}
      </div>
    </div>
  );
}
