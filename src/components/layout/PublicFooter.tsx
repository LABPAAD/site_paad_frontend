import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-border-subtle bg-footer-bg text-footer-text">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        {/* Bloco esquerdo: texto institucional */}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[11px] tracking-wide uppercase text-text-muted">
            PAAD • UFPI
          </span>
          <p className="text-[12px] text-text-muted">
            Plataforma para gestão e divulgação de projetos, pessoas e
            publicações do Laboratório PAAD.
          </p>
        </div>

        {/* Bloco direito: navegação de rodapé */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]">
          <Link
            href="/sobre"
            className="transition-colors hover:text-link"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="transition-colors hover:text-link"
          >
            Contato
          </Link>
          <Link
            href="/politica-de-privacidade"
            className="transition-colors hover:text-link"
          >
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
