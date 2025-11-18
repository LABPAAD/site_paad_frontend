
import type { HTMLAttributes, TableHTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* Tabela raiz */
export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface">
      <table
        className={cn(
          "min-w-full border-separate border-spacing-0 text-xs text-text-secondary",
          className
        )}
        {...props}
      />
    </div>
  );
}

/* Cabeçalho */
export function TableHeader({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-surface-alt text-[11px] uppercase tracking-[0.08em] text-text-muted",
        className
      )}
      {...props}
    />
  );
}

/* Corpo */
export function TableBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn(
        "bg-surface divide-y divide-border-subtle",
        className
      )}
      {...props}
    />
  );
}

/* Linha */
export function TableRow({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-surface-alt/60",
        className
      )}
      {...props}
    />
  );
}

/* Cabeçalho de coluna */
export function TableHead({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border-b border-border-subtle px-4 py-3 text-left text-[11px] font-semibold text-text-muted",
        "first:pl-5 last:pr-5",
        className
      )}
      {...props}
    />
  );
}

/* Célula */
export function TableCell({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "px-4 py-2.5 align-middle text-xs text-text-secondary",
        "first:pl-5 last:pr-5",
        className
      )}
      {...props}
    />
  );
}

/* Estado vazio dentro da tabela */
export function TableEmpty({
  colSpan,
  message = "Nenhum registro encontrado.",
}: {
  colSpan: number;
  message?: string;
}) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-6 text-center text-[11px] text-text-muted"
      >
        {message}
      </td>
    </tr>
  );
} 
