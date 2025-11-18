
import type { HTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerVariant = "primary" | "secondary" | "muted" | "inverse";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-[2px]",
  md: "h-5 w-5 border-[2px]",
  lg: "h-6 w-6 border-[3px]",
};

const variantClasses: Record<SpinnerVariant, string> = {
  primary: "border-t-brand-600",
  secondary: "border-t-text-secondary",
  muted: "border-t-border-subtle",
  inverse: "border-t-text-inverse",
};

export function Spinner({
  size = "md",
  variant = "primary",
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block rounded-full border-solid border-transparent animate-spin",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Carregando"
      {...props}
    />
  );
} 
