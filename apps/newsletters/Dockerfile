# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:24-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

# Télécharge toutes les dépendances sans les installer
RUN pnpm fetch

# Copie du source
COPY . .

# Installation complète (prod + dev) uniquement pour builder
RUN pnpm install --frozen-lockfile

# Build de l'app
RUN pnpm nx build newsletters --configuration production


# ============================
# 2️⃣ RUNTIME STAGE MINIMAL
# ============================
FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Installation des dépendances runtime uniquement
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm fetch
RUN pnpm install --prod --frozen-lockfile

# Copie du build NestJS
COPY --from=builder /app/dist/apps/newsletters ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
