# Comandos de push para o AWS ECR

## Comandos de push para burnc/widget-server

- macOS / Linux

Certifique-se de ter a versão mais recente da AWS CLI e do Docker instalada. Para mais informações, consulte [Getting Started with Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html).

Siga os passos abaixo para autenticar e fazer o push de uma imagem para o seu repositório. Para métodos adicionais de autenticação de registro, incluindo o assistente de credenciais do Amazon ECR, consulte [Registry Authentication](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry_auth).

1. Recupere um token de autenticação e autentique o cliente Docker no seu registro. Use a AWS CLI:

  `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com`

  Observação: se você receber um erro ao usar a AWS CLI, certifique-se de ter a versão mais recente da AWS CLI e do Docker instalada.

2. Construa sua imagem Docker usando o comando a seguir. Para informações sobre como criar um arquivo Docker do zero, consulte as instruções [aqui](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html). Você pode pular esta etapa se a sua imagem já estiver construída:

  `docker build -t burnc/widget-server .`

3. Depois que a construção for concluída, marque sua imagem para que você possa fazer o push da imagem para este repositório:

  `docker tag burnc/widget-server:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/burnc/widget-server:latest`

4. Execute o comando a seguir para fazer o push desta imagem para o seu novo repositório no AWS:

  `docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/burnc/widget-server:latest`
