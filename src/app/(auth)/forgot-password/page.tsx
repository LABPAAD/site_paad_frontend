"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { apiFetch, ApiMessageResponse } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email) {
      setError("Informe seu e-mail para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch<ApiMessageResponse>(
        "/api/auth/forgot-password",
        {
          method: "POST",
          body: { email },
        }
      );

      // O backend já manda uma mensagem genérica segura
      setSuccessMessage(
        response.message ??
          "Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha."
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível enviar o link de recuperação. Tente novamente.";
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
            Recuperar senha
          </h1>
          <p className="text-sm text-text-secondary">
            Informe o e-mail cadastrado. Se encontrarmos sua conta, enviaremos
            um link para redefinir sua senha.
          </p>
        </div>

        {successMessage && (
          <Alert variant="success" title="Verifique sua caixa de entrada.">
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert variant="danger" title="Não foi possível enviar o link.">
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

          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>
              Você receberá um e-mail com instruções se o endereço estiver
              cadastrado.
            </span>
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
              Enviar link de recuperação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}