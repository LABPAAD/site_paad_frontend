
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "dangerGhost";

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
    "inline-flex items-center justify-center gap-2 rounded-full text-xs font-medium cursor-pointer leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-button-primary-bg text-button-primary-text shadow-md hover:bg-button-primary-hover",
    secondary:
      "bg-button-secondary-bg text-button-secondary-text hover:bg-button-secondary-hover",
    outline:
      "border border-button-outline-border text-text-primary bg-transparent hover:bg-surface-alt",
    ghost: "bg-transparent text-text-secondary hover:bg-surface-alt",
    danger:
      "bg-danger-bg text-danger-text shadow-md hover:brightness-95",
    dangerGhost:
      "text-danger-bg bg-transparent hover:bg-danger-bg/10 dark:hover:bg-danger-bg/15",
  };

  // 👉 Agora cada tamanho tem altura fixa: se dois botões usam o mesmo size,
  // eles terão exatamente a mesma altura (com ou sem ícone).
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-xs",   // ~36px
    md: "h-10 px-4 text-sm",  // ~40px
    lg: "h-11 px-5 text-sm",  // ~44px
    icon: "h-9 w-9 rounded-full p-0",
  };

  const loadingClasses = isLoading ? "cursor-wait" : "";

  const isSimpleTextChild = typeof children === "string";

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
        <span className="flex items-center justify-center leading-none">
          {leftIcon}
        </span>
      )}

      {children &&
        (isSimpleTextChild ? (
          <span className="truncate">{children}</span>
        ) : (
          children
        ))}

      {!isLoading && rightIcon && (
        <span className="flex items-center justify-center leading-none">
          {rightIcon}
        </span>
      )}
    </button>
  );
} 
