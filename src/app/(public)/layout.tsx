
"use client";

import type { ReactNode } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useAuth } from "@/components/auth/AuthProvider";

type HeaderUserRole =
  | "VISITANTE"
  | "DISCENTE"
  | "MONITOR"
  | "ADMINISTRADOR"
  | "COORDENADOR";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();

  const userRole: HeaderUserRole | undefined = (() => {
    if (!user?.role) return undefined;

    const roleUpper = String(user.role).toUpperCase() as HeaderUserRole;

    if (
      roleUpper === "VISITANTE" ||
      roleUpper === "DISCENTE" ||
      roleUpper === "MONITOR" ||
      roleUpper === "ADMINISTRADOR" ||
      roleUpper === "COORDENADOR"
    ) {
      return roleUpper;
    }

    return undefined;
  })();

  return (
    <div className="flex min-h-screen flex-col bg-background-primary text-text-primary">
      <PublicHeader
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        userRole={userRole}
      />

      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
