import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type DropdownSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: DropdownOption[];
  ariaLabel?: string;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  align?: "start" | "end";
  isActive?: boolean;
  className?: string;
  triggerClassName?: string;
  testId?: string;
};

export function DropdownSelect({
  value,
  onValueChange,
  options,
  ariaLabel,
  placeholder,
  leadingIcon,
  align = "start",
  isActive = false,
  className,
  triggerClassName,
  testId,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const shouldReduceMotion = useReducedMotion();

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const openMenu = () => {
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        setHighlightedIndex((prev) => (prev + 1) % Math.max(1, options.length));
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        setHighlightedIndex((prev) => (prev - 1 + options.length) % Math.max(1, options.length));
      }
    } else if (event.key === "Home" && open) {
      event.preventDefault();
      setHighlightedIndex(0);
    } else if (event.key === "End" && open) {
      event.preventDefault();
      setHighlightedIndex(options.length - 1);
    } else if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      const target = options[highlightedIndex];
      if (target) {
        handleSelect(target.value);
      }
    }
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        data-testid={testId}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "focus-visible:ring-brand-burgundy/25 inline-flex h-10 w-full items-center justify-between gap-2.5 rounded-full border px-3.5 text-start text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 sm:text-sm",
          open
            ? "bg-brand-pink-soft/70 ring-brand-burgundy/15 border-brand-burgundy text-brand-burgundy ring-2"
            : isActive
              ? "border-brand-burgundy/60 bg-brand-pink/70 text-brand-burgundy hover:bg-brand-pink"
              : "hover:border-brand-burgundy/40 hover:bg-brand-pink-soft/50 border-brand-pink-border bg-white text-brand-ink",
          triggerClassName,
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          {(selectedOption?.icon || leadingIcon) && (
            <span className="shrink-0 text-brand-burgundy" aria-hidden="true">
              {selectedOption?.icon ?? leadingIcon}
            </span>
          )}
          <span className="truncate">{selectedOption?.label ?? placeholder ?? ""}</span>
        </span>
        <ChevronDown
          className={cn(
            "text-brand-burgundy/80 h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className={cn(
              "absolute top-[calc(100%+6px)] z-50 max-h-64 w-max min-w-full max-w-[260px] overflow-y-auto rounded-2xl border border-brand-pink-border bg-white p-1.5 shadow-card-hover focus:outline-none",
              align === "end" ? "end-0" : "start-0",
            )}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-start text-xs font-medium transition-colors sm:text-sm",
                    isSelected
                      ? "bg-brand-pink font-bold text-brand-burgundy"
                      : isHighlighted
                        ? "bg-brand-pink-soft text-brand-burgundy"
                        : "hover:bg-brand-pink-soft/80 text-brand-ink hover:text-brand-burgundy",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {option.icon && (
                      <span className="shrink-0" aria-hidden="true">
                        {option.icon}
                      </span>
                    )}
                    <span className="truncate">{option.label}</span>
                  </span>
                  {isSelected && (
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-brand-burgundy"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
