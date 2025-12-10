# ============================
# Stage 1 : Build Angular
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm exec nx run kanbano:build --configuration=production

# ============================
# Stage 2 : Caddy (HTTP only)
# ============================
FROM caddy:2-alpine

WORKDIR /srv

# Copier les fichiers Angular
COPY --from=builder /app/dist/apps/kanbano/browser .

# Désactiver HTTPS automatique de Caddy !!!
COPY <<EOF /etc/caddy/Caddyfile
{
  auto_https off
}

:80 {
    root * /srv
    encode gzip
    file_server
    try_files {path} /index.html
}
EOF

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
