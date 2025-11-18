
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  helperText?: string;
  error?: string;
}

export function Checkbox({
  id,
  label,
  helperText,
  error,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-center gap-2 text-xs text-text-secondary",
          disabled && "cursor-not-allowed opacity-70"
        )}
      >
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "h-4 w-4 rounded border border-input-border bg-input-bg",
            "text-brand-600 outline-none focus:ring-2 focus:ring-focus-ring focus:border-focus-ring",
            disabled &&
              "cursor-not-allowed bg-disabled-bg border-disabled-border",
            className
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>

      {helperText && !hasError && (
        <p className="text-[11px] text-text-muted">{helperText}</p>
      )}

      {hasError && (
        <p className="text-[11px] text-danger-text">{error}</p>
      )}
    </div>
  );
} 
