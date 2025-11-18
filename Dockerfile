FROM node:20-alpine AS base
WORKDIR /app

# Etapa de dependências (para reaproveitar cache)
FROM base AS deps

# Em Alpine é útil ter essa lib para algumas dependências nativas
RUN apk add --no-cache libc6-compat

# Copia apenas arquivos de dependências
COPY package.json package-lock.json* ./

# Instala dependências com npm (seu projeto usa npm)
RUN npm ci

# ================================
# Etapa de desenvolvimento
# ================================
FROM base AS dev

WORKDIR /app

# Copia node_modules instalados
COPY --from=deps /app/node_modules ./node_modules

# Copia o restante do código
COPY . .

# Porta padrão do Next.js
EXPOSE 3000

# Comando default (pode ser sobrescrito no docker-compose)
CMD ["npm", "run", "dev"]

# ================================
# (Opcional) Etapas para produção
# ================================
FROM base AS builder

ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilitar telemetria durante o build (opcional)
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Usuário não-root
RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001

# Copia somente o necessário pra rodar
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"] 
