
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { apiFetch, MeResponse } from "@/lib/api";

export type UserRole =
  | "VISITANTE"
  | "DISCENTE"
  | "MONITOR"
  | "ADMINISTRADOR"
  | "COORDENADOR";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  status: string;
  twoFactorEnabled: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrating: boolean;
  login: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  const handleLogin = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await apiFetch<{ message: string }>("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("[PAAD] Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  }, []);

  // 🔄 Hidratação inicial a partir do cookie (via /api/auth/me)
  useEffect(() => {
    let isMounted = true;

    async function hydrateUser() {
      try {
        const response = await apiFetch<MeResponse>("/api/auth/me", {
          method: "GET",
        });

        if (!isMounted || !response.user) return;

        const authUser: AuthUser = {
          id: response.user.id,
          name: response.user.fullName,
          email: response.user.email,
          role: response.user.role,
          status: response.user.status,
          twoFactorEnabled: response.user.twoFactorEnabled,
        };

        setUser(authUser);
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    }

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isHydrating,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider />");
  }

  return context;
} 
