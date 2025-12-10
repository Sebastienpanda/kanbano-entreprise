# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec nx run kanbano:build --configuration=production

# ============================================
# Stage 2: Production via Caddy
# ============================================
FROM caddy:2-alpine

COPY --from=builder /app/dist/apps/kanbano/browser /srv

RUN printf 'kanbano.fr {\n\
    root * /srv\n\
    encode gzip\n\
    file_server\n\
    try_files {path} /index.html\n\
}\n' > /etc/caddy/Caddyfile

EXPOSE 80
EXPOSE 443

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
