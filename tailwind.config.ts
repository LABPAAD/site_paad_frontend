import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
        },

        // Fundos / superfícies
        background: "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",

        // Texto
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-inverse": "var(--text-inverse)",

        // Bordas
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",

        // Links
        link: "var(--link)",
        "link-hover": "var(--link-hover)",
        highlight: "var(--highlight)",

        // Header/Footer
        "header-bg": "var(--header-bg)",
        "header-text": "var(--header-text)",
        "footer-bg": "var(--footer-bg)",
        "footer-text": "var(--footer-text)",

        // Botões
        "button-primary-bg": "var(--button-primary-bg)",
        "button-primary-hover": "var(--button-primary-hover)",
        "button-primary-text": "var(--button-primary-text)",
        "button-secondary-bg": "var(--button-secondary-bg)",
        "button-secondary-hover": "var(--button-secondary-hover)",
        "button-secondary-text": "var(--button-secondary-text)",
        "button-outline-border": "var(--button-outline-border)",

        // Estados
        "success-bg": "var(--success-bg)",
        "success-text": "var(--success-text)",
        "warning-bg": "var(--warning-bg)",
        "warning-text": "var(--warning-text)",
        "danger-bg": "var(--danger-bg)",
        "danger-text": "var(--danger-text)",
        "info-bg": "var(--info-bg)",
        "info-text": "var(--info-text)",

        // Disabled
        "disabled-bg": "var(--disabled-bg)",
        "disabled-text": "var(--disabled-text)",
        "disabled-border": "var(--disabled-border)",

        // Focus
        "focus-ring": "var(--focus-ring)",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(var(--shadow-color), 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
