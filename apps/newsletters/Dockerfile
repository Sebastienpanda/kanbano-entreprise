FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

RUN pnpm install --frozen-lockfile

# Copie tout le monorepo
COPY . .

# Build NestJS
RUN pnpm exec nx build newsletters --production

# =============================
# Production image
# =============================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Installer seulement les dépendances de production
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier les fichiers nécessaires
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Installer uniquement les dépendances de production
RUN pnpm install --prod --frozen-lockfile

# Copier le build
COPY --from=builder /app/dist/apps/newsletters ./

EXPOSE 3000

# Démarrer l'application
CMD ["node", "main.js"]
