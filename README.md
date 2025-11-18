# 🧬 PAAD — Site Dinâmico (Frontend)

> Repositório do frontend oficial do **Portal do Laboratório de Aplicações e Software – PAAD** da Universidade.

Construído em **Next.js 16**, **React 19**, **Tailwind v4** e com suporte completo a tema claro/escuro, componentes próprios, layouts dinâmicos e Docker.

---

## 📁 Visão Geral do Projeto

Este frontend foi desenvolvido para oferecer:

- **Página pública institucional** do PAAD.
- **Área administrativa protegida** (painel de coordenadores e administradores).
- **Componentes de UI reutilizáveis** e consistentes.
- **Sistema de temas** com persistência local (light/dark).
- **Tipagens TypeScript** completas.
- **Arquitetura organizada** por layout, páginas, componentes globais, ui-kit e temas.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão |
| :--- | :--- |
| **Next.js** | `16.0.3` |
| **React** | `19.2.0` |
| **Tailwind CSS** | `4.x` |
| **TypeScript** | `5.x` |
| **ESLint** | `9.x` |
| **Docker / Compose** | `Latest` |

---

## 📦 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js**: 20+
- **npm**: 10+
- **(Opcional)**: Docker e Docker Compose

---

## 🛠 Instalação e Execução Local (sem Docker)

**1. Clone o repositório**

```bash
git clone [https://github.com/SEU-USUARIO/site-paad-frontend.git](https://github.com/SEU-USUARIO/site-paad-frontend.git)
cd site-paad-frontend
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

**4. Acesse no navegador**

Abra http://localhost:3000. O servidor fará hot reload automaticamente ao editar qualquer arquivo.


---


## 🐳 Execução com Docker (Dev Environment)

Este projeto possui uma configuração Docker otimizada para desenvolvimento, com *hot reload* ativo.

**1. Subir o container**

```bash
docker compose up --build
```

**2. Acesse o projeto** http://localhost:3000

**3. Encerrar execução**
```bash
docker compose down
```


### 🔁 Hot Reload no Docker

No ambiente Docker, utilizamos as seguintes flags para garantir a detecção de mudanças (mesmo em Windows/WSL):

- `next dev --webpack`
- `WATCHPACK_POLLING=true`
- `CHOKIDAR_USEPOLLING=1`

---

## 🧱 Estrutura do Projeto

```text
src/
├── app/                 # Páginas e layouts do Next.js (App Router)
│   ├── (public)/        # Layout público
│   ├── (admin)/         # Layout da área administrativa
│   └── globals.css      # Estilos globais + design tokens CSS
│
├── components/
│   ├── layout/          # Header, Footer, PageHeader, Containers, Layouts
│   ├── ui/              # Componentes de UI customizados (inputs, cards, alerts)
│   └── theme/           # ThemeProvider, Switch theme
│
├── lib/                 # Funções auxiliares
└── ...
```

---


## 🎨 Tema Claro/Escuro

O projeto possui alternância automática entre *light* e *dark mode*, utilizando:

* **ThemeProvider** próprio.
* Token CSS global via `data-theme="light"` ou `data-theme="dark"`.
* Persistência automática via `localStorage`.
* Botão de alternância disponível junto ao Header (público e admin).

---

## 🧩 Componentes Globais (UI Kit)

O projeto conta com uma biblioteca de componentes interna, acessível e tipada:

* **Buttons:** primary, outline, ghost.
* **Forms:** Input, Select, Textarea, Checkbox, DateInput.
* **Display:** Card, Badge, Avatar.
* **Feedback:** Alert, EmptyState, Spinner (com variações), Skeleton.
* **Layouts:** `PublicLayout`, `AdminLayout`.

> Todos configurados com acessibilidade, foco visível e tokens de design consistentes.

---

## 🧪 Scripts Disponíveis

| Script | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa o ESLint para verificação de código |

---

## 🐙 Fluxo de Desenvolvimento

As branches seguem o seguinte padrão de nomenclatura:

* `feat/{codigo-da-task}-{descricao}`
* `fix/{descricao}`
* `chore/{descricao}`
* `dv/{codigo-da-task}-docker`

Os commits devem seguir convenções claras (**Conventional Commits**) e os Pull Requests (PRs) são realizados no GitHub.

---

## 🪪 Licença

Este projeto é de **uso interno** do **PAAD — Laboratório de Aplicações e Software**.
A distribuição e modificação externas dependem de autorização prévia.
