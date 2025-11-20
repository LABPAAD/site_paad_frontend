"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { apiFetch, LoginResponse } from "@/lib/api";
import { useAuth, AuthUser } from "@/components/auth/AuthProvider";

export default function Verify2FAPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = searchParams.get("email");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email) {
      setError(
        "Sessão de login 2FA inválida. Volte para a tela de login e tente novamente."
      );
      return;
    }

    const cleanedCode = code.replace(/\D/g, "");

    if (cleanedCode.length !== 6) {
      setError("Informe o código de 6 dígitos.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch<LoginResponse>(
        "/api/auth/2fa/login-verify",
        {
          method: "POST",
          body: { email, code: cleanedCode },
        }
      );

      if (!response.user) {
        setError("Resposta inesperada da API de verificação 2FA.");
        return;
      }

      const authUser: AuthUser = {
        id: response.user.id,
        name: response.user.fullName,
        email: response.user.email,
        role: response.user.role,
        status: response.user.status,
        twoFactorEnabled: response.user.twoFactorEnabled,
      };

      login(authUser);
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Código inválido ou expirado. Tente novamente.";
      setError(message || "Código inválido ou expirado. Tente novamente.");
      setCode("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Verificar código 2FA
          </h1>
          <p className="text-sm text-text-secondary">
            Enviamos a solicitação de login para o seu aplicativo autenticador.
            Insira o código de 6 dígitos para concluir o acesso.
          </p>
        </div>

        {error && (
          <Alert variant="danger" title="Não foi possível validar o código.">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="code"
            label="Código de verificação"
            placeholder="••••••"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setCode(value);
            }}
          />

          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Códigos mudam a cada 30 segundos.</span>
            <Link
              href="/login"
              className="text-link hover:text-link-hover underline-offset-2 hover:underline"
            >
              Voltar para o login
            </Link>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting && <Spinner size="sm" className="mr-2" />}
              Confirmar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}