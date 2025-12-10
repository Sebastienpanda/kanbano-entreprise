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
    encode gzip zstd

    # ===========================
    # Routes Angular SPA
    # ===========================
    try_files {path} {path}.html {path}/ /index.html

    file_server

    # ===========================
    # Cache long-term pour assets
    # ===========================
    @assets {
        path /assets/*
    }
    handle @assets {
        header Cache-Control "public, max-age=31536000, immutable"
        file_server
    }

    # ===========================
    # Headers de sécurité
    # ===========================
    header {

        # ---- Sécurité HTTPS (Traefik termine le TLS)
        Strict-Transport-Security "max-age=31536000; includeSubDomains"

        # ---- Anti sniffing & framing
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"

        # ---- Permissions Policy (anti-espionnage)
        Permissions-Policy "
            geolocation=(),
            microphone=(),
            camera=(),
            fullscreen=(self),
            payment=(),
            usb=(),
            bluetooth=()
        "

        # ---- Content Security Policy compatible Angular
        Content-Security-Policy "
            default-src 'self';
            img-src 'self' data:;
            script-src 'self' 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            font-src 'self' data:;
            connect-src 'self' https:;
            object-src 'none';
            frame-ancestors 'none';
            base-uri 'self';
        "
    }

    # ===========================
    # Gestion des erreurs
    # ===========================
    handle_errors {
        rewrite * /404.html
        file_server
    }
}
EOF

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
