
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

/* eslint-disable react-hooks/set-state-in-effect */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 1º render (server e client) -> sempre "light"
  const [theme, setTheme] = useState<Theme>("light");

  // Depois que montar no client, sincroniza com localStorage e DOM
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("paad-theme") as Theme | null;
    const initial = stored ?? "light";

    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";

      if (typeof window !== "undefined") {
        window.localStorage.setItem("paad-theme", next);
        document.documentElement.setAttribute("data-theme", next);
      }

      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
/* eslint-enable react-hooks/set-state-in-effect */

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
} 
