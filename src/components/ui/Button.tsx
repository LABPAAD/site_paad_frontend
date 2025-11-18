
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * Pequeno util pra juntar classes sem depender de libs externas.
 */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full text-xs font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60";
  
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-button-primary-bg text-button-primary-text shadow-md hover:bg-button-primary-hover",
    secondary:
      "bg-button-secondary-bg text-button-secondary-text hover:bg-button-secondary-hover",
    outline:
      "border border-button-outline-border text-text-primary bg-transparent hover:bg-surface-alt",
    ghost:
      "bg-transparent text-text-secondary hover:bg-surface-alt",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
    icon: "h-9 w-9 rounded-full p-0",
  };

  const loadingClasses = isLoading ? "cursor-wait" : "";

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        loadingClasses,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <span className="material-symbols-outlined text-[16px] animate-spin-slow">
          progress_activity
        </span>
      )}

      {!isLoading && leftIcon && (
        <span className="flex items-center justify-center">{leftIcon}</span>
      )}

      {children && <span className="truncate">{children}</span>}

      {!isLoading && rightIcon && (
        <span className="flex items-center justify-center">{rightIcon}</span>
      )}
    </button>
  );
}
