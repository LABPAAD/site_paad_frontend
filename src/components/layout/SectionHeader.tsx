
import type { ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface SectionHeaderProps {
  /**
   * Pequeno rótulo acima do título
   * Ex.: "Projetos", "Publicações recentes"
   */
  eyebrow?: string;
  title: string;
  description?: string;
  /**
   * Ações à direita: link "Ver todos", botões, etc.
   */
  actions?: ReactNode;
  /**
   * Alinhamento do texto principal
   */
  align?: "left" | "center";
  className?: string;
}

/**
 * Cabeçalho de seção para páginas públicas
 * (ex.: seção de projetos em destaque).
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between",
        isCentered && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cn("space-y-1", isCentered && "sm:max-w-2xl")}>
        {eyebrow && (
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
            {eyebrow}
          </span>
        )}

        <h2 className="text-lg font-semibold text-text-primary sm:text-xl">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div
          className={cn(
            "mt-2 flex flex-wrap items-center gap-2 sm:mt-0",
            isCentered && "sm:justify-center"
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
} 
