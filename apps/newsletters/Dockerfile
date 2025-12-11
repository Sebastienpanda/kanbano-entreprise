FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

RUN pnpm install --frozen-lockfile

# Copie TOUT le monorepo, comme pour Angular
COPY . .

# Build NestJS
RUN pnpm exec nx build newsletters

# =============================
# Production image
# =============================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copies uniquement le build final
COPY --from=builder /app/dist/apps/newsletters ./dist

# Copies node_modules du builder (optimisé)
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main.js"]
