
import type { HTMLAttributes, ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info-bg/70 bg-info-bg/12",
  success: "border-success-bg/70 bg-success-bg/12",
  warning: "border-warning-bg/70 bg-warning-bg/14",
  danger: "border-danger-bg/70 bg-danger-bg/14",
};

export function Alert({
  variant = "info",
  title,
  description,
  icon,
  className,
  children,
  ...props
}: AlertProps) {
  const showBody = description || children;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border px-3 py-2.5 text-xs sm:px-4 sm:py-3",
        variantClasses[variant],
        className
      )}
      role="alert"
      {...props}
    >
      {/* Ícone opcional */}
      {icon && (
        <div className="mt-0.5 shrink-0 text-base text-current">
          {icon}
        </div>
      )}

      <div className="space-y-1">
        {title && (
          <p className="font-semibold leading-snug text-text-primary">
            {title}
          </p>
        )}

        {showBody && (
          <div className="text-[11px] leading-relaxed text-text-primary/90">
            {description ?? children}
          </div>
        )}
      </div>
    </div>
  );
} 
