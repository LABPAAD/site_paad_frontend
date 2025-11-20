
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

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

  const router = useRouter();
  const { theme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const logoSrc =
    theme === "dark" ? "/logo_paad_branca.png" : "/logo_paad.png";

  const displayName = user?.name || user?.email || "Usuário";
  const roleLabel = user?.role || "Conta PAAD";

  async function handleLogout() {
    await logout();
    setIsSidebarOpen(false);
    router.push("/"); // depois do logout, volta pra home pública
  }

  const UserBlock = (
    <div className="mt-6 rounded-2xl bg-surface-alt px-3 py-3 text-xs shadow-sm">
      {isAuthenticated ? (
        <>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-[13px] font-semibold text-text-inverse">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-medium text-text-primary">
                {displayName}
              </span>
              <span className="truncate text-[11px] uppercase tracking-wide text-text-muted">
                {roleLabel}
              </span>
            </div>
          </div>

          {/* Botões Perfil / Sair alinhados */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/meu-perfil">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
              >
                Perfil
              </Button>
            </Link>

            <Button
              type="button"
              variant="dangerGhost"
              size="sm"
              fullWidth
              onClick={handleLogout}
              leftIcon={
                <span className="material-symbols-outlined text-[16px] leading-none">
                  logout
                </span>
              }
            >
              Sair
            </Button>
          </div>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium text-link hover:text-link-hover"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">
              home
            </span>
            <span className="leading-none">Ir para o site público</span>
          </Link>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-[11px] text-text-muted">
            Você não está autenticado.
          </span>
          <Link href="/login">
            <Button
              variant="primary"
              size="sm"
              fullWidth
            >
              Entrar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );

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
            />
            <div className="flex flex-col">
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

        {/* Bloco do usuário na sidebar */}
        {UserBlock}
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

            {UserBlock}
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

          <div className="hidden text-[11px] text-text-muted md:block">
            {isAuthenticated
              ? `Logado como ${displayName}`
              : "Não autenticado"}
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
