# ----------- BUILDER -----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copier uniquement ce qui est utile pour Nx + Nest
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./
COPY ../../nx.json ../../tsconfig.base.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm fetch

# Copier seulement l'app newsletters et les libs Nx
COPY . .

RUN pnpm install --frozen-lockfile --prod=false
RUN pnpm nx build newsletters --configuration production

# ----------- RUNNER -----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist/apps/newsletters ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
