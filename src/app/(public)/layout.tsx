import type { ReactNode } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary flex flex-col">
      <PublicHeader
        // Temporário: depois isso vem do contexto de autenticação
        isAuthenticated
        userName="Carlos Henrique do Vale"
        userRole="COORDENADOR"
      />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
