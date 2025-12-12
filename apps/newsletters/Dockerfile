FROM node:24-alpine AS base

# =============================
# Deps (dev + prod)
# =============================
FROM base AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

RUN pnpm install --frozen-lockfile


# =============================
# Production deps only
# =============================
FROM base AS production-deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --prod --frozen-lockfile


# =============================
# Build
# =============================
FROM base AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm exec nx build newsletters --configuration=production


# =============================
# Runtime
# =============================
FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/dist/apps/newsletters ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
