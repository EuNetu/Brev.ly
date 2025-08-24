# ---- 1. Stage: Instalar dependências de produção ----
FROM node:22-alpine AS deps
WORKDIR /app

# Usar pnpm
RUN npm install -g pnpm

# Copiar os ficheiros de manifesto
COPY package.json pnpm-lock.yaml ./

# Instalar apenas as dependências de produção
RUN pnpm install --prod --frozen-lockfile

# ---- 2. Stage: Construir a aplicação ----
FROM node:22-alpine AS builder
WORKDIR /app

# Usar pnpm
RUN npm install -g pnpm

# CORREÇÃO AQUI: Instalar TODAS as dependências para ter acesso ao tsup
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar o resto dos ficheiros do projeto
COPY . .

# Executar o build do TypeScript para JavaScript
RUN pnpm build

# ---- 3. Stage: Imagem final de produção ----
FROM node:22-alpine AS runner
WORKDIR /app

# Copiar as dependências de produção do stage 'deps'
COPY --from=deps /app/node_modules ./node_modules
# Copiar o código transpilado do stage 'builder'
COPY --from=builder /app/dist ./dist
# Copiar o package.json
COPY package.json .

# Expor a porta
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["node", "dist/server.mjs"]