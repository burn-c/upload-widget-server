/**
 * Ponto único de inicialização do OpenTelemetry (dev e produção).
 *
 * Precisa ser o PRIMEIRO import da aplicação (ver `src/server.ts`) para que os
 * hooks de instrumentação estejam registrados antes de qualquer outro módulo
 * (fastify, AWS SDK, http, etc.) ser carregado.
 *
 * Toda a configuração vem de variáveis de ambiente `OTEL_*`:
 * - dev: carregadas do `.env` via `tsx --env-file .env`
 * - produção: injetadas pelo container / ECS task definition
 */
import '@opentelemetry/auto-instrumentations-node/register'
