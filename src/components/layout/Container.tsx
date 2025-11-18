
import type { HTMLAttributes, ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Se true, o container ocupa 100% da largura disponível,
   * mas ainda respeita o padding lateral.
   */
  fullWidth?: boolean;
  children: ReactNode;
}

/**
 * Container padrão do projeto.
 * Centraliza conteúdo em max-w-6xl com paddings responsivos.
 */
export function Container({
  fullWidth = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        !fullWidth && "max-w-6xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
