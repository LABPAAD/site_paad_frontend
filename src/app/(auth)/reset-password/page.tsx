"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { apiFetch, ApiMessageResponse } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasToken = Boolean(token);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!hasToken) {
      setError(
        "Link de redefinição inválido ou expirado. Solicite uma nova recuperação de senha."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Preencha os dois campos de senha.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch<ApiMessageResponse>("/api/auth/reset-password", {
        method: "POST",
        body: {
          token,
          newPassword, // precisa ser exatamente esse nome, como o backend espera
        },
      });

      // Sucesso → volta para o login com flag de sucesso
      router.push("/login?reset=success");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível redefinir a senha. Tente novamente.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const showTokenError = !hasToken;

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Redefinir senha
          </h1>
          <p className="text-sm text-text-secondary">
            Defina uma nova senha para acessar sua conta do PAAD.
          </p>
        </div>

        {showTokenError && (
          <Alert
            variant="danger"
            title="Link inválido ou expirado."
            description="O link de redefinição não é válido. Solicite uma nova recuperação de senha."
          />
        )}

        {error && !showTokenError && (
          <Alert variant="danger" title="Não foi possível redefinir a senha.">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="new-password"
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            placeholder="Digite a nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            requiredLabel
          />

          <Input
            id="confirm-password"
            label="Confirmar nova senha"
            type="password"
            autoComplete="new-password"
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            requiredLabel
          />

          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>
              Use uma senha forte, com letras maiúsculas, minúsculas, números e
              símbolos.
            </span>
            <Link
              href="/forgot-password"
              className="text-link hover:text-link-hover underline-offset-2 hover:underline"
            >
              Solicitar novo link
            </Link>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !hasToken}
            >
              {isSubmitting && <Spinner size="sm" className="mr-2" />}
              Redefinir senha
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 
