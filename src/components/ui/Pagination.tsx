"use client";

import type { ButtonHTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function PageButton({ active, className, children, ...props }: PageButtonProps) {
  return (
    <button
      className={cn(
        "h-8 min-w-8 rounded-full border text-[11px] px-2 flex items-center justify-center cursor-pointer",
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-border-subtle bg-surface text-text-secondary hover:bg-surface-alt",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let p = 1; p <= totalPages; p++) {
    // se quiser encurtar (1 ... 4 5 6 ... 10) dá pra melhorar depois
    pages.push(p);
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-2 text-[11px] text-text-muted">
      <span>
        Página <span className="font-medium">{currentPage}</span> de{" "}
        <span className="font-medium">{totalPages}</span>
      </span>

      <div className="flex items-center gap-1">
        <PageButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_left
          </span>
        </PageButton>

        {pages.map((page) => (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ))}

        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </PageButton>
      </div>
    </div>
  );
} 
