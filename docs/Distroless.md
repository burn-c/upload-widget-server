# Introduzindo o Conceito de Distroless

- Introduzimos o conceito de Distroless, que visa criar containers focados apenas na execução da aplicação, sem incluir sistemas operacionais desnecessários. Exploramos como usar imagens do Google Container Tools e Chain Guard, destacando a importância de especificar corretamente os repositórios. Também discutimos a segurança e a eficiência das imagens, mostrando como elas podem ser mais leves e com menos vulnerabilidades. Por fim, abordamos a preparação para enviar essas imagens para repositórios online nas próximas aulas.

### Links de referencias:
- https://github.com/googlecontainertools/distroless
- https://www.chainguard.dev/

## Google Container Tools - Distroless

#### O que é?

Distroless são imagens Docker criadas pelo Google que contêm **apenas sua aplicação e suas dependências**. Não incluem gerenciadores de pacotes, shell ou outros programas do sistema operacional.

**Vantagens:**
- Imagens muito menores (até 10x menor)
- Menos vulnerabilidades de segurança
- Menor superfície de ataque
- Mais rápido para fazer deploy

#### Exemplo simples de uso

```dockerfile
# Antes: imagem grande com tudo
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]

# Depois: imagem distroless pequena e segura
FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /app
COPY --from=build-stage /app/node_modules ./node_modules
COPY . .
CMD ["server.js"]
```

Build multi-stage com distroless:
```dockerfile
# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

# Stage 2: Runtime distroless
FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
CMD ["server.js"]
```

#### Tipos de imagens distroless disponíveis

- `gcr.io/distroless/nodejs18-debian11` - Node.js 18
- `gcr.io/distroless/python3` - Python 3
- `gcr.io/distroless/java17` - Java 17
- `gcr.io/distroless/base` - Base pura (para binários compilados)

---

## Chainguard

#### O que é?

Chainguard fornece **imagens de containers seguros e otimizados** pré-construídas. São imagens distroless mantidas profissionalmente com atualizações de segurança contínuas.

**Vantagens:**
- Imagens distroless prontas para usar
- Garantia de segurança e manutenção
- Atualizações regulares de vulnerabilidades
- Suporte profissional disponível

#### Exemplo simples de uso

```dockerfile
# Imagem Node.js do Chainguard
FROM cgr.dev/chainguard/node:latest
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY . .
CMD ["node", "server.js"]
```

Comparação de tamanho:
```bash
# Imagem padrão Node
node:18                                    # ~900MB

# Imagem Distroless do Google
gcr.io/distroless/nodejs18-debian11       # ~150MB

# Imagem Chainguard
cgr.dev/chainguard/node:latest            # ~40MB
```

#### Imagens Chainguard populares

- `cgr.dev/chainguard/node` - Node.js
- `cgr.dev/chainguard/python` - Python
- `cgr.dev/chainguard/go` - Go
- `cgr.dev/chainguard/static` - Base minimalista

#### Usar Chainguard com sigstore (verificação de assinatura)

```bash
# Puxar e verificar imagem assinada
docker pull cgr.dev/chainguard/node:latest

# Verificar imagem (requer cosign)
cosign verify cgr.dev/chainguard/node:latest
```

---

## Comparação rápida

| Aspecto | Node padrão | Google Distroless | Chainguard |
|---------|------------|-------------------|-----------|
| **Tamanho** | ~900MB | ~150MB | ~40MB |
| **Shell** | Sim | Não | Não |
| **Vulnerabilidades** | Muitas | Poucas | Poucas |
| **Mantém segurança** | Ocasional | Não garantido | Profissional |
| **Uso** | Desenvolvimento | Produção simples | Produção alta segurança |
