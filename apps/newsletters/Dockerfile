FROM node:24-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

RUN pnpm fetch

COPY . .

RUN pnpm install --frozen-lockfile --prod=false

RUN pnpm nx build newsletters --configuration production


FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copier uniquement ce qui est nécessaire
COPY --from=builder /app/dist/apps/newsletters ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
