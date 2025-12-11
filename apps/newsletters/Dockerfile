# -----------------------------------
# 1) BUILDER — Compile NestJS
# -----------------------------------
FROM node:24-alpine AS builder

WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=development

# Installer corepack proprement sous Alpine
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier uniquement ce qui est nécessaire pour installer les deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

# Pré-fetch → permet un cache intelligent
RUN pnpm fetch

# Copier le reste du repo
COPY . .

# Installer toutes les dépendances (sans prune)
RUN pnpm install --frozen-lockfile

# Compilation NX de l'app NestJS
RUN pnpm nx build newsletters --configuration production


# -----------------------------------
# 2) RUNNER — Image finale minimale
# -----------------------------------
FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Installer uniquement les deps de production
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --prod --frozen-lockfile

# Copier le build final
COPY --from=builder /app/dist/apps/newsletters ./dist

# Exposer le port NestJS
EXPOSE 3000

CMD ["node", "dist/main.js"]
