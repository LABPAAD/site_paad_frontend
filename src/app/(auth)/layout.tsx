import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* largura máxima dos cards de auth */}
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}