import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-xs font-medium text-text-secondary"
        >
          {label}
          {required && <span className="ml-0.5 text-[11px] text-danger-text">*</span>}
        </label>
      )}

      {children}

      {helperText && !hasError && (
        <p className="text-[11px] text-text-muted">{helperText}</p>
      )}

      {hasError && (
        <p className="text-[11px] text-danger-text">{error}</p>
      )}
    </div>
  );
}