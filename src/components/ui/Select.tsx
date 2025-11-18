
import type { SelectHTMLAttributes, ReactNode } from "react";
import { FormField } from "./FormField";
import { cn } from "@/lib/cn";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  requiredLabel?: boolean;
  children: ReactNode;
}

export function Select({
  label,
  helperText,
  error,
  requiredLabel,
  id,
  className,
  disabled,
  children,
  ...props
}: SelectProps) {
  const hasError = Boolean(error);

  return (
    <FormField
      label={label}
      htmlFor={id}
      helperText={helperText}
      error={error}
      required={requiredLabel}
    >
      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          className={cn(
            "w-full appearance-none rounded-lg border bg-input-bg px-3 py-2 text-sm text-text-secondary",
            "outline-none focus:ring-2 focus:ring-focus-ring focus:border-focus-ring",
            "border-input-border pr-8", // espaço pro ícone
            "placeholder:text-input-placeholder",
            disabled &&
              "cursor-not-allowed bg-disabled-bg text-disabled-text border-disabled-border",
            hasError &&
              "border-danger-bg focus:ring-danger-bg focus:border-danger-bg",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Ícone de seta */}
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-text-muted text-[18px]">
          <span className="material-symbols-outlined text-[18px]">
            expand_more
          </span>
        </span>
      </div>
    </FormField>
  );
} 
