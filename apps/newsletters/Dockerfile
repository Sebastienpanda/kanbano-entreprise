FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package*.json pnpm-lock.yaml nx.json tsconfig.base.json ./
COPY apps ./apps
COPY libs ./libs

RUN pnpm install --frozen-lockfile
RUN pnpm nx build newsletters --configuration=production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/apps/newsletters/main.js"]
