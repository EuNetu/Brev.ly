# Brev.ly - Encurtador de URLs

Projeto FullStack desenvolvido como parte do desafio do curso. O Brev.ly é uma aplicação completa para encurtar, gerir e analisar links.

### Tabela de Conteúdos

- Sobre o Projeto
- Funcionalidades
- Tecnologias Utilizadas
- Como Executar o Projeto
  - Pré-requisitos
  - Executando o Back-end
  - Executando o Front-end
- Executando com Docker

---

### Sobre o Projeto

O Brev.ly foi concebido para ser uma solução robusta e performática para o encurtamento de URLs. A aplicação permite o cadastro, listagem e remoção de links, geração de relatórios de acessos em CSV e o redirecionamento otimizado do link encurtado para o link original.

Este repositório contém a solução completa para os desafios de **Back-end**, **DevOps** e **Front-end**, organizados nas pastas `/server` e `/web`, respetivamente.

---

### Funcionalidades

A aplicação cumpre todos os requisitos propostos no desafio:

#### Back-end & DevOps

- [✔] **Criação de Links:** API para criar novos links encurtados.
- [✔] **Validação Avançada:** Impede a criação de links com URLs mal formatadas ou com códigos já existentes.
- [✔] **Exclusão de Links:** Endpoint para apagar links.
- [✔] **Redirecionamento Inteligente:** Rota que obtém a URL original, incrementa a contagem de acessos e redireciona o utilizador.
- [✔] **Listagem de Links:** Endpoint para listar todos os links cadastrados.
- [✔] **Exportação de Relatórios:** Geração de relatórios em CSV de forma performática utilizando *streams*.
- [✔] **Upload para CDN:** O relatório CSV é enviado para um serviço de armazenamento (Cloudflare R2) e fica acessível por uma URL única e aleatória.
- [✔] **Ambiente Dockerizado:** `Dockerfile` com *multi-stage builds* para uma imagem de produção otimizada e `docker-compose.yml` para o banco de dados.

#### Front-end

- [✔] **Interface Reativa:** Aplicação SPA (Single Page Application) construída com React e Vite.
- [✔] **Criação e Gestão de Links:** Interface para criar, listar e apagar links.
- [✔] **Download de Relatórios:** Funcionalidade para baixar o relatório em CSV gerado pelo back-end.
- [✔] **Redirecionamento Transparente:** Página de redirecionamento que informa o utilizador antes de o enviar para o destino final.
- [✔] **Página 404:** Página amigável para links não encontrados ou rotas inválidas.
- [✔] **Fidelidade ao Design (Pixel Perfect):** A interface segue fielmente o layout proposto no Figma.
- [✔] **Excelente UX:** A aplicação inclui estados de carregamento, desativação de botões durante ações e um estado de "lista vazia".
- [✔] **Responsividade (Mobile First):** O layout adapta-se perfeitamente a ecrãs de todos os tamanhos.

---

### 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

| Categoria      | Tecnologia                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| **Back-end** | **Node.js**, **Fastify**, **TypeScript**, **Drizzle ORM**, **PostgreSQL**, **Zod** |
| **Front-end** | **React**, **Vite**, **TypeScript**, **Tailwind**|
| **DevOps** | **Docker** |
| **Serviços** | **Cloudflare R2** (para armazenamento de relatórios)                                                        |

---

### Como Executar o Projeto

Siga os passos abaixo para executar o projeto localmente.

#### Pré-requisitos

- **Node.js** (v22.x ou superior)
- **pnpm** (v10.x ou superior)
- **Docker** e **Docker Compose**

#### Executando o Back-end (`/server`)

1.  **Navegue até à pasta do servidor:**
    ```bash
    cd server
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
3.  **Inicie o banco de dados com Docker:**
    ```bash
    docker compose up -d
    ```
4.  **Crie o ficheiro de ambiente:**
    Copie o ficheiro de exemplo e preencha com as tuas credenciais (especialmente as do Cloudflare R2).
    ```bash
    cp .env.example .env
    ```
5.  **Execute as migrações do banco de dados:**
    ```bash
    pnpm db:migrate
    ```
6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    O servidor back-end estará a ser executado em `http://localhost:3333`.

#### Executando o Front-end (`/web`)

1.  **Navegue até à pasta do front-end (a partir da raiz):**
    ```bash
    cd web
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
3.  **Crie o ficheiro de ambiente local:**
    ```bash
    cp .env.example .env.local
    ```
    *O valor `VITE_API_URL=http://localhost:3333` já está correto para o ambiente de desenvolvimento.*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    A aplicação front-end estará acessível em `http://localhost:5173`.

---

### Executando com Docker

A aplicação back-end está preparada para ser executada num contentor Docker em produção.

1.  **Navegue até à pasta do servidor:**
    ```bash
    cd server
    ```
2.  **Construa a imagem Docker:**
    ```bash
    docker build -t brevly-backend .
    ```
3.  **Execute o contentor:**
    Lembre-se de passar todas as variáveis de ambiente necessárias.
    ```bash
    docker run -p 3333:3333 \
      -e DATABASE_URL="URL_DO_SEU_BANCO_DE_DADOS_DE_PRODUCAO" \
      -e CLOUDFLARE_ACCOUNT_ID="SEU_ID" \
      -e CLOUDFLARE_ACCESS_KEY_ID="SUA_CHAVE" \
      -e CLOUDFLARE_SECRET_ACCESS_KEY="SEU_SEGREDO" \
      -e CLOUDFLARE_BUCKET="SEU_BUCKET" \
      -e CLOUDFLARE_PUBLIC_URL="SUA_URL_PUBLICA" \
      brevly-backend
    ```

---
