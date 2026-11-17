import type React from "react";
import { AlertTriangle, CheckCircle2, Info, SearchX, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-brand-pink-soft/60 flex flex-col items-center justify-center rounded-3xl border border-brand-pink-border px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-pink text-brand-burgundy">
        {icon ?? <SearchX className="h-7 w-7" />}
      </div>
      <h3 className="font-display text-lg font-bold text-brand-ink">{title}</h3>
      {description && <p className="mt-1.5 max-w-md text-sm text-brand-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <EmptyState
      icon={<AlertTriangle className="h-7 w-7" />}
      title={title}
      description={description}
      action={action}
    />
  );
}

export function LoadingState({ label }: { label?: string }) {
  const { t } = useTranslation("common");
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-brand-burgundy"
    >
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-brand-pink border-t-brand-burgundy" />
      <p className="text-sm font-medium text-brand-muted">{label ?? t("common.loading")}</p>
    </div>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  destructive = true,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children && <div className="mb-5">{children}</div>}
        <div className="flex flex-wrap justify-end gap-2.5">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {cancelLabel ?? t("common.cancel")}
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel ?? t("common.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useAppData();
  if (toasts.length === 0) return null;

  return (
    <div aria-live="polite" className="fixed bottom-4 end-4 z-[60] flex max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg",
            toast.variant === "success" && "border-emerald-200 bg-emerald-50 text-emerald-900",
            toast.variant === "error" && "border-rose-200 bg-rose-50 text-rose-900",
            toast.variant === "info" && "border-brand-pink-border bg-white text-brand-ink",
          )}
        >
          {toast.variant === "success" && (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          )}
          {toast.variant === "error" && (
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
          )}
          {toast.variant === "info" && <Info className="h-4 w-4 shrink-0 text-brand-burgundy" />}
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismissToast(toast.id)}
            className="rounded-full p-1 opacity-70 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
