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

    # Compression optimisée
    encode zstd gzip {
        match {
            header Content-Type text/*
            header Content-Type application/json*
            header Content-Type application/javascript*
            header Content-Type application/xml*
            header Content-Type application/xhtml+xml*
            header Content-Type image/svg+xml*
        }
    }

    # Fichiers statiques
    file_server {
        index index.html
    }

    # Routing Angular + fallback
    try_files {path} {path}.html {path}/ /index.html

    # Cache long pour /assets
    @assets {
        path /assets/*
    }
    handle @assets {
        header Cache-Control "public, max-age=31536000, immutable"
        header Expires "max-age=31536000"
        file_server
    }

    # Headers sécurité
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
    }

    # Page 404
    handle_errors {
        rewrite * /404.html
        file_server
    }
}
EOF

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
