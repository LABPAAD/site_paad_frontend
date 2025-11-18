
import type { HTMLAttributes, ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Botões, links etc. */
  actions?: ReactNode;
  /** Versão mais compacta (sem borda grande) */
  compact?: boolean;
}

export function EmptyState({
  title,
  description,
  icon,
  actions,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center text-xs text-text-secondary",
        compact
          ? "rounded-xl border border-border-subtle bg-surface px-4 py-6"
          : "rounded-2xl border border-border-subtle bg-panel-bg px-6 py-10 sm:px-8",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-brand-600">
          {icon}
        </div>
      )}

      <h3 className="text-sm font-semibold text-text-primary">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-md text-[11px] leading-relaxed text-text-secondary">
          {description}
        </p>
      )}

      {actions && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
} 
