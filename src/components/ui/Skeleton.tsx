
import type { HTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Bloco de loading com animação de brilho suave.
 * Use width/height via className (w-..., h-...).
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        // cinza mais marcante + animação
        "animate-pulse rounded-md bg-border",
        className
      )}
      {...props}
    />
  );
} 
