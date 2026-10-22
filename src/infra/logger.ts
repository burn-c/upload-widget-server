import pino from 'pino'

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * Logger da aplicação.
 *
 * - dev: saída colorida e legível (pino-pretty)
 * - produção: JSON puro no stdout (CloudWatch), sem worker de transport
 */
export const log = pino({
  level: process.env.LOG_LEVEL ?? 'debug',
  ...(isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          level: process.env.LOG_LEVEL ?? 'debug',
          options: {
            name: 'dev-terminal',
            colorize: true,
            levelFirst: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss Z',
          },
        },
      }
    : {}),
})
