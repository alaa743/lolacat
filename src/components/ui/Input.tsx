import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "placeholder:text-brand-muted/60 focus-visible:ring-brand-burgundy/20 flex h-11 w-full rounded-xl border border-brand-pink-border bg-white px-3.5 py-2 text-sm text-brand-ink transition-colors focus-visible:border-brand-burgundy focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "placeholder:text-brand-muted/60 focus-visible:ring-brand-burgundy/20 flex min-h-[90px] w-full rounded-xl border border-brand-pink-border bg-white px-3.5 py-2.5 text-sm text-brand-ink transition-colors focus-visible:border-brand-burgundy focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "focus-visible:ring-brand-burgundy/20 flex h-11 w-full rounded-xl border border-brand-pink-border bg-white px-3.5 py-2 text-sm text-brand-ink transition-colors focus-visible:border-brand-burgundy focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
