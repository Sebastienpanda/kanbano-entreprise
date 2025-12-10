# ============================
# Stage 1: Build Angular
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Installer pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Copier tout le code source
COPY . .

# Build Angular
RUN pnpm exec nx run kanbano:build --configuration=production

# ============================
# Stage 2: Serveur Node HTTP simple
# ============================
FROM node:20-alpine

WORKDIR /app

# Installer un serveur http léger
RUN npm install -g http-server

# Copier les fichiers buildés
COPY --from=builder /app/dist/apps/kanbano/browser ./dist

EXPOSE 8080

CMD ["http-server", "dist", "-p", "8080", "-c-1"]
