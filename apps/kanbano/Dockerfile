# ============================================
# Stage 1: Build
# ============================================
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

# Build l'application
RUN pnpm exec nx run kanbano:build --configuration=production

# ============================================
# Stage 2: Production avec Caddy
# ============================================
FROM caddy:2-alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist/apps/kanbano/browser /srv

# Configuration Caddy pour SPA
RUN echo ':80 {
    root * /srv
    encode gzip
    file_server
    try_files {path} /index.html
}' > /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
