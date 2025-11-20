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

// Resposta quando o login exige 2FA
interface Login2FARequiredResponse {
  user?: undefined;
  "2fa_required": true;
  email: string;
  userId?: string;
}

// A API pode responder:
// - login normal: { user: {...} }
// - login com 2FA pendente: { "2fa_required": true, email, userId? }
type LoginApiResponse = LoginResponse | Login2FARequiredResponse;

// Type guard para saber se a resposta é do tipo "2FA pendente"
function isTwoFactorRequired(
  response: LoginApiResponse
): response is Login2FARequiredResponse {
  return (
    "2fa_required" in response &&
    response["2fa_required"] === true &&
    typeof response.email === "string"
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetSuccess = searchParams.get("reset") === "success";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await apiFetch<LoginApiResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      // Caso 2FA seja obrigatório
      if (isTwoFactorRequired(result)) {
        const emailFor2FA = result.email;
        router.push(
          `/login/verify-2fa?email=${encodeURIComponent(emailFor2FA)}`
        );
        return;
      }

      // Login normal: backend retorna { user }
      if ("user" in result && result.user) {
        const authUser: AuthUser = {
          id: result.user.id,
          name: result.user.fullName,
          email: result.user.email,
          role: result.user.role,
          status: result.user.status,
          twoFactorEnabled: result.user.twoFactorEnabled,
        };

        login(authUser);
        router.push("/");
        return;
      }

      setError("Resposta inesperada da API de login.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível entrar. Tente novamente.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Entrar
          </h1>
          <p className="text-sm text-text-secondary">
            Acesse sua conta do PAAD para gerenciar projetos, pessoas e
            publicações.
          </p>
        </div>

        {resetSuccess && !error && (
          <Alert
            variant="success"
            title="Senha alterada com sucesso."
            description="Faça login com sua nova senha."
          />
        )}

        {error && (
          <Alert variant="danger" title="Não foi possível entrar.">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="E-mail"
            type="email"
            autoComplete="email"
            placeholder="seu.email@ufpi.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            requiredLabel
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            requiredLabel
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">
              Dois fatores podem ser solicitados caso seu usuário exija 2FA.
            </span>
            <Link
              href="/forgot-password"
              className="text-link hover:text-link-hover underline-offset-2 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting && <Spinner size="sm" className="mr-2" />}
              Entrar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}