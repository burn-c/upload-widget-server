# Segurança da aplicação

## Ferammentas/Tools

- Link: https://trivy.dev/docs/latest/getting-started/

#### O que é Trivy?

Trivy é um scanner de segurança de código aberto que detecta vulnerabilidades, secrets, e misconfigurations em:
- Imagens Docker
- Repositórios Git
- Filesystems
- Kubernetes clusters
- Pacotes de dependências

#### Instalação

```bash
# macOS
brew install trivy

# Linux
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update && sudo apt-get install trivy
```

#### Exemplos de uso

##### 1. Verificar vulnerabilidades em imagem Docker

```bash
# Escanear uma imagem local
trivy image minha-app:latest

# Com output em JSON
trivy image -f json -o resultado.json minha-app:latest

# Apenas vulnerabilidades críticas
trivy image --severity CRITICAL minha-app:latest

# Imagem remota (Docker Hub)
trivy image node:18-alpine
```

##### 2. Verificar o filesystem atual

```bash
# Escanear diretório atual
trivy fs .

# Escanear diretório específico
trivy fs /caminho/para/projeto

# Com filtro de severidade
trivy fs --severity HIGH,CRITICAL .
```

##### 3. Buscar Secrets (chaves, tokens, senhas)

```bash
# Escanear por secrets no código
trivy fs --scanners secret .

# Em uma imagem Docker
trivy image --scanners secret minha-app:latest
```

##### 4. Verificar misconfigurations (Dockerfile, K8s, etc)

```bash
# Escanear Dockerfile
trivy fs --scanners misconfig ./Dockerfile

# Projeto inteiro
trivy fs --scanners config,secret .
```

##### 5. Formato de output

```bash
# Tabela (padrão)
trivy image minha-app:latest

# JSON
trivy image -f json minha-app:latest

# SARIF (compatível com GitHub)
trivy image -f sarif -o resultado.sarif minha-app:latest

# Template customizado
trivy image -f template --template '{{range .}}{{.VulnerabilityID}}: {{.Title}}{{end}}' minha-app:latest
```

##### 6. Severidades disponíveis

```bash
# CRITICAL - Críticas
# HIGH - Altas
# MEDIUM - Médias
# LOW - Baixas
# UNKNOWN - Desconhecidas

trivy image --severity CRITICAL,HIGH minha-app:latest
```

#### Exemplo prático

```bash
# Verificar imagem e salvar resultado em JSON
trivy image -f json -o vulnerabilities.json minha-app:latest

# Verificar apenas vulnerabilidades críticas e altas
trivy image --severity HIGH,CRITICAL minha-app:latest

# Verificar código-fonte por secrets
trivy fs --scanners secret ./src

# Verificar Dockerfile
trivy fs --scanners misconfig ./Dockerfile
```

#### Interpretando resultados

```
✔ No vulnerabilities found
(OK - nenhuma vulnerabilidade)

⚠ Vulnerabilities found
(AVISO - vulnerabilidades encontradas)

HIGH: medium has 2 vulnerabilities
(ALTA: pacote medium tem 2 vulnerabilidades)

CVE-2024-XXXXX - CRITICAL: Remote Code Execution
(Identificador da vulnerabilidade - Nível - Descrição)
```
