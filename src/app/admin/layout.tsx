"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/pessoas", label: "Pessoas" },
  { href: "/admin/projetos", label: "Projetos" },
  { href: "/admin/publicacoes", label: "Publicações" },
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/configuracoes", label: "Configurações" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const logoSrc =
    theme === "dark" ? "/logo_paad_branca.png" : "/logo_paad.png";

  return (
    <div className="flex min-h-screen bg-background-primary text-text-primary">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 flex-col border-r border-border-subtle bg-surface px-4 py-4 md:flex">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logoSrc}
              alt="Logo do PAAD"
              width={60}
              height={60}
            />            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                PAAD
              </span>
              <span className="text-[11px] text-text-muted">
                Painel administrativo
              </span>
            </div>
          </Link>
        </div>

        {/* Navegação */}
        <nav className="flex flex-1 flex-col gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-text-secondary transition-colors hover:bg-surface-alt hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Rodapé da sidebar (opcional) */}
        <div className="mt-6 border-t border-border-subtle pt-3 text-[11px] text-text-muted">
          Coordenador: <span className="font-medium">Carlos Henrique</span>
        </div>
      </aside>

      {/* Sidebar móvel (overlay) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* backdrop */}
          <button
            type="button"
            className="h-full w-full bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Fechar menu de navegação"
          />
          {/* drawer */}
          <aside className="relative z-50 flex w-64 flex-col border-r border-border-subtle bg-surface px-4 py-4">
            <div className="mb-6 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={logoSrc}
                  alt="Logo do PAAD"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight">
                    PAAD
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Painel administrativo
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Fechar menu"
              >
                <span className="material-symbols-outlined text-sm">
                  close
                </span>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-text-secondary transition-colors hover:bg-surface-alt hover:text-text-primary"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-border-subtle bg-background-secondary px-4 py-3 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border-subtle p-2"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <span className="material-symbols-outlined text-sm">
                menu
              </span>
            </button>
            <span className="text-sm font-semibold">PAAD • Admin</span>
          </div>

          <div className="hidden text-sm font-semibold md:block">
            Painel administrativo
          </div>

          {/* Aqui no futuro entra o menu do usuário/admin */}
          <div className="text-xs text-text-muted">
            Logado como{" "}
            <span className="font-medium">Carlos Henrique do Vale</span>
          </div>
        </header>

        {/* Área de conteúdo */}
        <main className="flex-1 bg-background-primary px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
