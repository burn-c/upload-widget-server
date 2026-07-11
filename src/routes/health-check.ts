import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { FastifyInstance } from 'fastify'

const packageJsonPath = resolve(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as { version?: string }

const API_VERSION = packageJson.version

export async function healthCheckRoute(app: FastifyInstance) {
  app.get('/health', async (_request, reply) => {
    await reply.status(200).send({
      status: 'healthy',
      apiVersion: API_VERSION,
      timestamp: new Date().toISOString(),
    })
  })
}
