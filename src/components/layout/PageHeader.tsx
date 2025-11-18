
import type { ReactNode } from "react";
import { Container } from "./Container";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /**
   * Espaço para botões, filtros, etc.
   * Ex.: <Button>Novo projeto</Button>
   */
  actions?: ReactNode;
  /**
   * Se true, não usa o Container interno (caso já esteja dentro de um).
   */
  naked?: boolean;
  className?: string;
}

/**
 * Cabeçalho de página, usado principalmente no painel admin.
 */
export function PageHeader({
  title,
  subtitle,
  actions,
  naked = false,
  className,
}: PageHeaderProps) {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6",
        className
      )}
    >
      <div>
        <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );

  if (naked) {
    return content;
  }

  return <Container>{content}</Container>;
} 
