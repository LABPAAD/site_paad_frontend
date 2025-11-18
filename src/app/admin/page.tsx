import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export default function AdminHomePage() {
  return (
    <>
      <PageHeader
        title="Visão geral"
        subtitle="Acompanhe pessoas, projetos e produções do PAAD."
        actions={
          <Button variant="primary" size="sm">
            Ver relatórios
          </Button>
        }
      />

      {/* resto do conteúdo */}
    </>
  );
}