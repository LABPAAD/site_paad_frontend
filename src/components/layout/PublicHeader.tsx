
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

type UserRole =
  | "VISITANTE"
  | "DISCENTE"
  | "MONITOR"
  | "ADMINISTRADOR"
  | "COORDENADOR";

export interface PublicHeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  userRole?: UserRole;
  loginHref?: string;
  profileHref?: string;
  adminHref?: string;
}

export function PublicHeader({
  isAuthenticated = false,
  userName,
  userRole,
  loginHref = "/login",
  profileHref = "/meu-perfil",
  adminHref = "/admin",
}: PublicHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme } = useTheme();

  const canAccessAdminPanel =
    userRole === "ADMINISTRADOR" || userRole === "COORDENADOR";

  const displayName = userName || "Meu perfil";

  const logoSrc =
    theme === "dark" ? "/logo_paad_branca.png" : "/logo_paad.png";

  return (
    // header relativo para o menu mobile absoluto
    <header className="relative border-b border-border-subtle bg-background-secondary text-text-primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo / marca */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoSrc}
              alt="Logo do PAAD"
              width={80}
              height={80}
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-semibold tracking-tight">
                PAAD
              </span>
            </div>
          </Link>
        </div>

        {/* Navegação desktop (a partir de sm) */}
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link
            href="/pessoas"
            className="transition-colors hover:text-link"
          >
            Pessoas
          </Link>
          <Link
            href="/projetos"
            className="transition-colors hover:text-link"
          >
            Projetos
          </Link>
          <Link
            href="/publicacoes"
            className="transition-colors hover:text-link"
          >
            Publicações
          </Link>
        </nav>

        {/* Ações – desktop (a partir de sm) */}
        <div className="hidden items-center gap-3 sm:flex">
          {!isAuthenticated && (
            <Link href={loginHref}>
              <Button variant="primary" size="md">
                Entrar
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="rounded-full bg-surface px-3 py-2 shadow-md hover:bg-surface-alt"
                onClick={() => setIsUserMenuOpen((open) => !open)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-[12px] font-semibold text-text-inverse">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-24 truncate text-xs font-medium">
                    {displayName}
                  </span>
                  <span className="material-symbols-outlined text-sm text-text-muted">
                    keyboard_arrow_down
                  </span>
                </div>
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-border-subtle bg-surface py-1 text-sm shadow-lg">
                  {canAccessAdminPanel && (
                    <Link
                      href={adminHref}
                      className="flex w-full items-center px-3 py-2 text-xs text-text-primary transition-colors hover:bg-surface-alt"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Acessar painel
                    </Link>
                  )}
                  <Link
                    href={profileHref}
                    className="flex w-full items-center px-3 py-2 text-xs text-text-primary transition-colors hover:bg-surface-alt"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Meu perfil
                  </Link>

                  <ThemeToggle />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botão de menu mobile (somente em xs) */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="sm:hidden border-border-subtle"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Abrir menu de navegação"
        >
          <span className="material-symbols-outlined text-text-primary text-[18px]">
            menu
          </span>
        </Button>
      </div>

      {/* Menu mobile – absoluto e sobrepondo o conteúdo */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-full z-30 border-t border-border-subtle bg-background-secondary px-4 pb-4 pt-2 sm:hidden shadow-lg">
          <nav className="flex flex-col gap-3 text-sm">
            <Link
              href="/pessoas"
              className="transition-colors hover:text-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pessoas
            </Link>
            <Link
              href="/projetos"
              className="transition-colors hover:text-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projetos
            </Link>
            <Link
              href="/publicacoes"
              className="transition-colors hover:text-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Publicações
            </Link>
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            {!isAuthenticated && (
              <Link href={loginHref}>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Entrar
                </Button>
              </Link>
            )}

            {isAuthenticated && (
              <>
                {canAccessAdminPanel && (
                  <Link href={adminHref}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Acessar painel
                    </Button>
                  </Link>
                )}

                <Link href={profileHref}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Meu perfil
                  </Button>
                </Link>

                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 
