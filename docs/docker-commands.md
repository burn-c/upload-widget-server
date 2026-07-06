# Lista básica de comando docker CLI

Comandos essenciais para uso diário do Docker.

## Imagens

- `docker build -t <nome> .`
  - Cria uma imagem a partir do Dockerfile no diretório atual.
- `docker images`
  - Lista as imagens locais.
- `docker history <imagem>`
  - Mostra o histórico de camadas de uma imagem.
- `docker rmi <imagem>`
  - Remove uma imagem local.

## Contêineres

- `docker run --name <nome> -d <imagem>`
  - Executa um contêiner em segundo plano.
- `docker ps`
  - Mostra contêineres em execução.
- `docker ps -a`
  - Mostra todos os contêineres, incluindo os parados.
- `docker stop <container>`
  - Para um contêiner em execução.
- `docker start <container>`
  - Inicia um contêiner parado.
- `docker restart <container>`
  - Reinicia um contêiner.
- `docker rm <container>`
  - Remove um contêiner parado.

### Executar em segundo plano

A flag `-d` (detach) executa o contêiner em background:

```bash
# Simples - executa em segundo plano
docker run -d --name meu-app minha-app

# Com porta mapeada
docker run -d --name meu-app -p 3000:3000 minha-app

# Com variáveis de ambiente
docker run -d --name meu-app -e PORT=3000 minha-app

# Com volume mapeado
docker run -d --name meu-app -v /app/data:/data minha-app

# Combinado
docker run -d --name api-server -p 8080:3000 -e NODE_ENV=production -v logs:/app/logs minha-api
```

Ver logs do contêiner rodando em background:
```bash
docker logs meu-app        # Mostra logs
docker logs -f meu-app     # Segue os logs em tempo real (like tail -f)
docker logs --tail 50 meu-app  # Mostra últimas 50 linhas
```

## Logs e inspeção

- `docker logs <container>`
  - Exibe os logs de um contêiner.
- `docker inspect <container>`
  - Mostra detalhes de configuração, rede, variáveis de ambiente, volumes e outras propriedades do contêiner.
- `docker inspect <container> | grep -i "ipaddress\|port\|mount"`
  - Filtra informações específicas do inspect para facilitar a leitura.
- `docker exec -it <container> sh`
  - Abre um shell interativo dentro do contêiner.

Exemplo:

```bash
# Verificar detalhes de um contêiner
 docker inspect meu-app

# Mostrar apenas informações de rede e portas
 docker inspect meu-app | grep -i "ipaddress\|port"
```

## Rede e volumes

- `docker network ls`
  - Lista redes Docker.
- `docker volume ls`
  - Lista volumes Docker.

### Volumes

Volumes são usados para persistir dados fora do ciclo de vida de um contêiner.

- `docker volume create <nome>`
  - Cria um volume novo.
- `docker volume ls`
  - Lista os volumes existentes.
- `docker volume inspect <nome>`
  - Mostra detalhes de um volume, incluindo o ponto de montagem.
- `docker volume rm <nome>`
  - Remove um volume.
- `docker volume prune`
  - Remove volumes não utilizados.

Exemplo de uso:

```bash
# Criar um volume
docker volume create dados-app

# Rodar um container usando esse volume
docker run -d --name app -v dados-app:/data nginx

# Verificar onde o volume está montado
docker volume inspect dados-app
```

## Docker Compose

O Docker Compose é usado para subir e gerenciar múltiplos contêineres a partir de um arquivo `docker-compose.yml`.

- `docker compose up`
  - Sobe os serviços definidos no arquivo `docker-compose.yml`.
- `docker compose up -d`
  - Sobe os serviços em segundo plano.
- `docker compose down`
  - Para e remove os contêineres, redes e volumes criados pelo Compose.
- `docker compose ps`
  - Lista os contêineres gerenciados pelo Compose.
- `docker compose logs`
  - Mostra os logs de todos os serviços.
- `docker compose logs <serviço>`
  - Mostra os logs de um serviço específico.
- `docker compose build`
  - Constrói ou reconstrói as imagens dos serviços.
- `docker compose restart`
  - Reinicia os serviços definidos no Compose.
- `docker compose stop`
  - Para os serviços sem removê-los.
- `docker compose start`
  - Inicia serviços previamente parados.
- `docker compose exec <serviço> sh`
  - Abre um shell dentro de um contêiner do serviço.

Exemplos úteis:

```bash
# Subir tudo em background
docker compose up -d

# Ver logs
docker compose logs -f

# Reiniciar um serviço específico
docker compose restart app

# Parar tudo
docker compose down
```

## Limpeza

- `docker system prune -f`
  - Remove contêineres parados, redes não utilizadas, imagens pendentes e caches.
- `docker volume prune -f`
  - Remove volumes não usados.

## CMD vs ENTRYPOINT

### CMD (Command)

Define o comando **padrão** a executar. Pode ser **sobrescrito** facilmente pelo usuário.

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
CMD ["node", "server.js"]
```

Uso:
```bash
docker run minha-app                    # Executa: node server.js
docker run minha-app npm start          # Executa: npm start (sobrescreve CMD)
```

### ENTRYPOINT (Ponto de entrada)

Define o comando **principal** que sempre é executado. Argumentos são passados **após** o ENTRYPOINT.

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
ENTRYPOINT ["node", "server.js"]
```

Uso:
```bash
docker run minha-app                    # Executa: node server.js
docker run minha-app --port 3001        # Executa: node server.js --port 3001
```

### CMD + ENTRYPOINT (Combinação comum)

Usa ENTRYPOINT para o comando principal e CMD para argumentos padrão.

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
ENTRYPOINT ["node"]
CMD ["server.js"]
```

Uso:
```bash
docker run minha-app                    # Executa: node server.js
docker run minha-app app.js             # Executa: node app.js (CMD é substituído)
```

### Resumo

| Aspecto | CMD | ENTRYPOINT |
|--------|-----|-----------|
| **Pode ser sobrescrito?** | Sim, facilmente | Não, argumentos são passados |
| **Usar para** | Comando padrão flexível | Comando fixo, sempre executado |
| **Exemplo** | `CMD ["npm", "start"]` | `ENTRYPOINT ["node"]` |

## Exemplo rápido

```bash
docker build -t minha-app .
docker run --name minha-app -d -p 3000:3000 minha-app
```

