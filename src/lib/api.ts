
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn(
    "[PAAD] NEXT_PUBLIC_API_URL não definida. Configure em .env.local."
  );
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Wrapper básico para chamadas à API do backend do PAAD.
 * Usa NEXT_PUBLIC_API_URL como base.
 */
export async function apiFetch<TResponse>(
  path: string,
  { method = "GET", body, headers }: RequestOptions = {}
): Promise<TResponse> {
  const url = `${API_URL}${path}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    // Se o backend usar cookies de sessão:
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Erro na requisição: ${response.status}`;
    throw new Error(message);
  }

  return data as TResponse;
}

// ---- Tipagens específicas para auth ----

/**
 * Shape que o backend retorna em /auth/login e /auth/me
 */
export interface BackendUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
}

export interface LoginResponse {
  user: BackendUser;
}

export interface MeResponse {
  user: BackendUser;
}

// Resposta genérica de sucesso simples
export interface ApiMessageResponse {
  message: string;
} 
