
import type { HTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium";

  const variants: Record<BadgeVariant, string> = {
    neutral: "bg-surface-alt text-text-secondary",
    primary: "bg-brand-600/10 text-brand-700",
    success: "bg-success-bg/10 text-success-bg",
    warning: "bg-warning-bg/10 text-warning-bg",
    danger: "bg-danger-bg/10 text-danger-bg",
    info: "bg-info-bg/10 text-info-bg",
    outline:
      "border border-border-subtle text-text-secondary bg-transparent",
  };

  return (
    <span
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
} 
