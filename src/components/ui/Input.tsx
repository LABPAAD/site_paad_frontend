
import type { InputHTMLAttributes } from "react";
import { FormField } from "./FormField";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  requiredLabel?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  requiredLabel,
  id,
  className,
  disabled,
  ...props
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <FormField
      label={label}
      htmlFor={id}
      helperText={helperText}
      error={error}
      required={requiredLabel}
    >
      <input
        id={id}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border bg-input-bg px-3 py-2 text-sm text-input-text placeholder:text-input-placeholder",
          "outline-none focus:ring-2 focus:ring-focus-ring focus:border-focus-ring",
          "border-input-border",
          disabled &&
            "cursor-not-allowed bg-disabled-bg text-disabled-text border-disabled-border",
          hasError &&
            "border-danger-bg focus:ring-danger-bg focus:border-danger-bg",
          className
        )}
        {...props}
      />
    </FormField>
  );
} 
