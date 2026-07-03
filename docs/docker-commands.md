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

## Logs e inspeção

- `docker logs <container>`
  - Exibe os logs de um contêiner.
- `docker inspect <container>`
  - Mostra detalhes de configuração e rede do contêiner.
- `docker exec -it <container> sh`
  - Abre um shell interativo dentro do contêiner.

## Rede e volumes

- `docker network ls`
  - Lista redes Docker.
- `docker volume ls`
  - Lista volumes Docker.

## Limpeza

- `docker system prune -f`
  - Remove contêineres parados, redes não utilizadas, imagens pendentes e caches.
- `docker volume prune -f`
  - Remove volumes não usados.

## Exemplo rápido

```bash
docker build -t minha-app .
docker run --name minha-app -d -p 3000:3000 minha-app
```

