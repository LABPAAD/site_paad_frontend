
import type { HTMLAttributes, ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Se o card deve parecer clicável (hover, cursor-pointer) */
  clickable?: boolean;
  /** Se deve usar um estilo mais "flat" (sem sombra) */
  muted?: boolean;
}

export function Card({
  clickable = false,
  muted = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-surface text-text-primary",
        muted ? "shadow-none" : "shadow-soft",
        clickable &&
          "cursor-pointer transition-transform transition-shadow hover:-translate-y-[1px] hover:shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-border-subtle px-4 py-3 sm:px-5 sm:py-4",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardSectionProps) {
  return (
    <h3
      className={cn(
        "text-sm font-semibold leading-tight text-text-primary",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardSectionProps) {
  return (
    <p
      className={cn(
        "text-xs text-text-secondary leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn(
        "px-4 py-3 text-sm sm:px-5 sm:py-4",
        className
      )}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border-subtle px-4 py-3 sm:px-5 sm:py-3",
        className
      )}
      {...props}
    />
  );
} 
